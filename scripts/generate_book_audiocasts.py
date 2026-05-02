#!/usr/bin/env python3
"""
BOOK AUDIOCAST PIPELINE — Generate long-form audiocasts for 6 books.

Steps per book:
1. Read chapter files from chapters/ directory
2. Generate a ~10,000-word two-host dialogue via Gemini 2.5 Flash Preview
3. Cache dialogue to scripts/dialogue_cache/book-{slug}.txt
4. Render with Kokoro TTS (af_heart=Alex, am_michael=Jordan) → WAV → M4A
5. Output: public/audio/book-{slug}.m4a

Usage:
    python3 scripts/generate_book_audiocasts.py --book csuite
    python3 scripts/generate_book_audiocasts.py --all
    python3 scripts/generate_book_audiocasts.py --all --force   # overwrite existing
"""

import os, sys, re, json, subprocess, tempfile, time, argparse, shutil, requests
from pathlib import Path
import soundfile as sf
import numpy as np

try:
    from kokoro import KPipeline, KModel
except ImportError:
    print("ERROR: kokoro not installed. Run: pip install kokoro")
    sys.exit(1)

# ── CONFIG ─────────────────────────────────────────────────────
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-2.5-flash-preview"
GEMINI_URL = (
    f"https://generativelanguage.googleapis.com/v1beta/models/"
    f"{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
)

BASE      = Path("/Users/erikpostnieks/Projects")
AUDIO_OUT = BASE / "ppt-companion/public/audio"
CACHE_DIR = BASE / "ppt-companion/scripts/dialogue_cache"
AUDIO_OUT.mkdir(parents=True, exist_ok=True)
CACHE_DIR.mkdir(parents=True, exist_ok=True)

VOICE_ALEX   = "af_heart"    # female — Alex
VOICE_JORDAN = "am_michael"  # male   — Jordan

# ── BOOK REGISTRY ──────────────────────────────────────────────
BOOKS = {
    "ppt": {
        "title":       "The Hollow Win",
        "subtitle":    "How Private Profits Destroy the Systems They Depend On",
        "chapters_dir": BASE / "book-ppt/manuscript",
        "audience":    "general educated reader, business leaders, policymakers",
        "slug":        "book-ppt",
    },
    "da-textbook": {
        "title":       "Decision Accounting",
        "subtitle":    "The Architecture of Reconstruction-Capable Governance",
        "chapters_dir": BASE / "book-da-textbook/chapters",
        "audience":    "MBA students, law students, economists",
        "slug":        "book-da-textbook",
    },
    "da-banking": {
        "title":       "Prove It: Banking",
        "subtitle":    "Decision Accounting for BSA/AML Governance",
        "chapters_dir": BASE / "book-da-banking/chapters",
        "audience":    "banking professionals, BSA/AML officers, risk managers, regulators",
        "slug":        "book-da-banking",
    },
    "da-global": {
        "title":       "Prove It: Global",
        "subtitle":    "Decision Accounting Across Industries and Jurisdictions",
        "chapters_dir": BASE / "book-da-global-business/chapters",
        "audience":    "global business executives, international lawyers, policy analysts",
        "slug":        "book-da-global",
    },
    "csuite": {
        "title":       "Prove It: Executive",
        "subtitle":    "Your Name Is on the Decision",
        "chapters_dir": BASE / "book-csuite-liability/chapters",
        "audience":    "CEOs, CFOs, General Counsel, board members",
        "slug":        "book-csuite",
    },
    "new-goal": {
        "title":       "The New Goal",
        "subtitle":    "a novel",
        "chapters_dir": BASE / "book-the-new-goal/chapters",
        "audience":    "general readers, business fiction fans, executives who won't read a textbook",
        "slug":        "book-new-goal",
    },
}

# ── CHAPTER READER ─────────────────────────────────────────────
def read_chapters(chapters_dir: Path, max_chars: int = 120000) -> str:
    """Read all chapter .md files, concatenate up to max_chars."""
    if not chapters_dir.exists():
        return ""
    files = sorted([
        f for f in chapters_dir.glob("*.md")
        if f.name not in {"bibliography.md", "glossary.md", "notes_and_sources.md", "voice.md"}
    ])
    chunks, total = [], 0
    for f in files:
        content = f.read_text(errors="ignore")
        if total + len(content) > max_chars:
            chunks.append(content[:max_chars - total])
            break
        chunks.append(content)
        total += len(content)
    return "\n\n---\n\n".join(chunks)

# ── DIALOGUE GENERATION ─────────────────────────────────────────
SYSTEM_PROMPT = """You are generating a long-form podcast dialogue between two hosts.
Alex (female, incisive, data-driven, asks sharp probing questions) and Jordan (male, analytical, drives structural insights).
Natural banter: interruptions, "Right—", "Exactly, and—", "Wait, hold on—", "That's the key point".
Go deep on the arguments, data, mechanisms, implications. ~10,000 words. No truncation. No stage directions. Pure dialogue."""

def generate_dialogue(book_key: str, book: dict) -> str:
    """Generate dialogue via Gemini 2.5 Flash Preview or load from cache."""
    cache_file = CACHE_DIR / f"{book['slug']}.txt"
    if cache_file.exists() and cache_file.stat().st_size > 5000:
        return cache_file.read_text()

    chapters_text = read_chapters(book["chapters_dir"])
    if not chapters_text:
        raise RuntimeError(f"No chapter content found in {book['chapters_dir']}")

    prompt = f"""{SYSTEM_PROMPT}

BOOK: {book['title']}
SUBTITLE: {book['subtitle']}
PRIMARY AUDIENCE: {book['audience']}

BOOK CONTENT:
{chapters_text}

Generate a complete 10,000-word long-form podcast dialogue between Alex and Jordan covering this book.
Cover the core thesis, key arguments, surprising data, mechanisms, implications, and what readers should take away.
Begin immediately with ALEX: and alternate ALEX:/JORDAN: throughout. No markdown, no asterisks."""

    resp = requests.post(GEMINI_URL, json={
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {"maxOutputTokens": 16384, "temperature": 0.85},
    }, timeout=180)
    resp.raise_for_status()
    data = resp.json()
    dialogue = data["candidates"][0]["content"]["parts"][0]["text"]
    cache_file.write_text(dialogue)
    return dialogue

# ── DIALOGUE PARSING ────────────────────────────────────────────
def parse_segments(dialogue: str) -> list[tuple[str, str]]:
    """Parse ALEX:/JORDAN: lines → (voice, text) pairs."""
    segments = []
    current_voice, current_lines = None, []
    for line in dialogue.split("\n"):
        line = line.strip()
        if line.upper().startswith("ALEX:"):
            if current_voice and current_lines:
                segments.append((current_voice, " ".join(current_lines)))
            current_voice = VOICE_ALEX
            current_lines = [line[5:].strip()]
        elif line.upper().startswith("JORDAN:"):
            if current_voice and current_lines:
                segments.append((current_voice, " ".join(current_lines)))
            current_voice = VOICE_JORDAN
            current_lines = [line[7:].strip()]
        elif line and current_voice:
            current_lines.append(line)
    if current_voice and current_lines:
        segments.append((current_voice, " ".join(current_lines)))
    return [(v, t) for v, t in segments if t.strip()]

def clean_text(text: str) -> str:
    """Clean text for TTS."""
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r'\*+', '', text)
    text = re.sub(r'#+\s*', '', text)
    text = re.sub(r'`+', '', text)
    text = re.sub(r'https?://\S+', 'the linked source', text)
    text = text.replace('—', ', ').replace('–', ', ').replace('...', '. ')
    text = text.replace('βW', 'beta W').replace('β', 'beta ').replace('ΔW', 'delta W')
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

# ── KOKORO RENDERING ────────────────────────────────────────────
_model = None
_pipeline_cache = {}

def get_pipeline(voice: str) -> KPipeline:
    global _model
    if _model is None:
        _model = KModel().eval()
    if voice not in _pipeline_cache:
        _pipeline_cache[voice] = KPipeline(lang_code='a', model=_model)
    return _pipeline_cache[voice]

def render_segments_kokoro(segments: list[tuple[str, str]], output_path: Path) -> None:
    """Render (voice, text) segments → WAV chunks → concatenate → M4A."""
    if not segments:
        raise ValueError("No segments")

    all_audio = []
    silence_short = np.zeros(int(24000 * 0.3), dtype=np.float32)
    silence_long  = np.zeros(int(24000 * 0.6), dtype=np.float32)

    for i, (voice, text) in enumerate(segments):
        text = clean_text(text)
        if not text:
            continue
        pipeline = get_pipeline(voice)
        sentences = re.split(r'(?<=[.!?])\s+', text)
        seg_audio = []
        for sentence in sentences:
            if not sentence.strip():
                continue
            try:
                for _, _, audio in pipeline(sentence, voice=voice, speed=1.0):
                    seg_audio.append(audio)
                    break
            except Exception as e:
                print(f"    Warning: TTS failed: {str(e)[:60]}")
                continue

        if seg_audio:
            all_audio.extend(seg_audio)
            if i < len(segments) - 1:
                next_voice = segments[i + 1][0]
                all_audio.append(silence_long if next_voice != voice else silence_short)

    if not all_audio:
        raise RuntimeError("No audio rendered")

    combined = np.concatenate(all_audio)

    with tempfile.TemporaryDirectory() as tmp:
        wav_path = os.path.join(tmp, "combined.wav")
        sf.write(wav_path, combined, 24000)

        result = subprocess.run([
            "ffmpeg", "-y", "-i", wav_path,
            "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
            str(output_path)
        ], capture_output=True, timeout=3600)

        if result.returncode != 0:
            raise RuntimeError(f"ffmpeg: {result.stderr.decode()[:500]}")

# ── MAIN PIPELINE ───────────────────────────────────────────────
def process_book(book_key: str, force: bool = False) -> dict:
    book = BOOKS[book_key]
    output_path = AUDIO_OUT / f"{book['slug']}.m4a"

    if output_path.exists() and not force:
        return {"book": book_key, "status": "skipped"}

    try:
        cached = (CACHE_DIR / f"{book['slug']}.txt").exists()
        print(f"  [{book_key}] {'Loading cached' if cached else 'Generating'} dialogue...")
        dialogue = generate_dialogue(book_key, book)
        segments = parse_segments(dialogue)
        word_count = sum(len(t.split()) for _, t in segments)

        print(f"  [{book_key}] {word_count:,} words → {len(segments)} segments → rendering Kokoro...")
        render_segments_kokoro(segments, output_path)

        size_mb = output_path.stat().st_size / 1024 / 1024
        print(f"  [{book_key}] DONE — {size_mb:.0f} MB, {word_count:,} words")
        return {"book": book_key, "status": "done", "words": word_count, "segments": len(segments), "mb": size_mb}

    except Exception as e:
        print(f"  [{book_key}] ERROR: {e}")
        return {"book": book_key, "status": "error", "msg": str(e)}

# ── CLI ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", help="Specific book slug")
    parser.add_argument("--all", action="store_true", help="All 6 books")
    parser.add_argument("--force", action="store_true", help="Overwrite existing M4A files")
    args = parser.parse_args()

    if not args.book and not args.all:
        parser.print_help()
        sys.exit(1)

    books_to_run = [args.book] if args.book else list(BOOKS.keys())
    invalid = [b for b in books_to_run if b not in BOOKS]
    if invalid:
        print(f"ERROR: Unknown book(s): {invalid}. Valid: {list(BOOKS.keys())}")
        sys.exit(1)

    print(f"\nBook audiocast pipeline (Kokoro + Gemini {GEMINI_MODEL}): {len(books_to_run)} books")
    print(f"Voices: Alex={VOICE_ALEX}, Jordan={VOICE_JORDAN}\n")

    results = [process_book(k, force=args.force) for k in books_to_run]

    done    = [r for r in results if r["status"] == "done"]
    skipped = [r for r in results if r["status"] == "skipped"]
    errors  = [r for r in results if r["status"] == "error"]

    print(f"\n{'='*60}")
    print(f"DONE: {len(done)} | SKIPPED: {len(skipped)} | FAILED: {len(errors)}")
    if errors:
        for r in errors:
            print(f"  {r['book']}: {r.get('msg', '')}")
