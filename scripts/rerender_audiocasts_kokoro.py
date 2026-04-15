#!/usr/bin/env python3
"""
Re-render all audiocasts using Kokoro TTS instead of macOS `say`.

Voices:
  Alex (female host):  af_heart   — warmest, most expressive
  Jordan (male host):  am_michael — smoothest male voice

Dialogue is regenerated via Gemini (cached to scripts/dialogue_cache/{slug}.txt
on first run — subsequent runs reuse cache, zero Gemini cost).

Usage:
    python3 scripts/rerender_audiocasts_kokoro.py --all           # all 75
    python3 scripts/rerender_audiocasts_kokoro.py --slug bitcoin  # one paper
    python3 scripts/rerender_audiocasts_kokoro.py --all --force   # overwrite existing
    python3 scripts/rerender_audiocasts_kokoro.py --all --cache-only  # use cached dialogues only (no Gemini)
"""

import os, sys, re, json, subprocess, tempfile, time, argparse, shutil, requests
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

import soundfile as sf
import numpy as np

try:
    from kokoro import KPipeline, KModel
except ImportError:
    print("ERROR: kokoro not installed. Run: pip install kokoro")
    sys.exit(1)

# ── CONFIG ──────────────────────────────────────────────────────
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL   = "gemini-3.1-pro-preview"
GEMINI_URL     = (f"https://generativelanguage.googleapis.com/v1beta/models/"
                  f"{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}")

BASE           = Path("/Users/erikpostnieks/Projects")
OUTPUT_DIR     = BASE / "ppt-companion/public/audio"
CACHE_DIR      = BASE / "ppt-companion/scripts/dialogue_cache"
PAPER_DATA_DIR = BASE / "ppt-companion/src/paperData"
DEEP_RESEARCH  = BASE / "deep-research/output"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
CACHE_DIR.mkdir(parents=True, exist_ok=True)

VOICE_ALEX   = "af_heart"    # female — Alex
VOICE_JORDAN = "am_michael"  # male   — Jordan

# ── PAPER SLUGS (all 75) ─────────────────────────────────────────
DOMAIN_SLUGS = [
    "alcohol","algorithmic-pricing","amr","arms-exports","aviation",
    "big-tech","bitcoin","cement","child-labor","coal","conflict-minerals",
    "cre","credit-rating","cybercrime","data-brokerage","deep-sea-mining",
    "defense-procurement","deforestation","ewaste","factory-farming",
    "fast-fashion","firearms","fisheries","frontier-ai","fx-fixing",
    "gambling","gene-drives","gig-economy","groundwater","human-trafficking",
    "illicit-drugs","industrial-ag-methane","insurance-climate",
    "mining-rare-earth","monoculture","nuclear","oil-gas","opioids",
    "orbital-debris","palm-oil","payday-lending","pbm","pe-healthcare",
    "plastics","platform-monopoly","pops","pos","private-military",
    "private-prisons","shipping","social-media","sovereign-debt","stablecoins",
    "student-loans","tax-havens","tobacco","topsoil","upf","water-privatization",
    "wmd",
]
FOUNDATIONAL_SLUGS = [
    "ppt","hollow-win","conflictoring","reform-dividend","disclosure-futility",
    "fiscal-capture","postnieks-law","substitution-trap",
]
DA_SLUGS = ["da-1","da-2","da-3","da-4"]
OT_SLUGS = ["ot-da-chapter1","ot-da-chapter5","ot-da-chapter9"]
ALL_SLUGS = DOMAIN_SLUGS + FOUNDATIONAL_SLUGS + DA_SLUGS + OT_SLUGS

# ── SOURCE RESOLUTION ───────────────────────────────────────────
def find_source(slug: str) -> str:
    """Find best source text for a slug."""
    candidates = [
        DEEP_RESEARCH / slug / f"{slug}-current.md",
        BASE / f"sapm-{slug}" / "paper" / f"{slug}-current.md",
        BASE / f"sapm-{slug}" / "paper" / f"{slug.replace('-','_')}-current.md",
        # DA papers: da-1 → sapm-decision-accounting/paper/da-1/da1-current.md
        BASE / "sapm-decision-accounting" / "paper" / slug / f"{slug.replace('-','')}-current.md" if slug.startswith("da-") else None,
        # OT chapters map to book-da-textbook chapters
        BASE / "book-da-textbook" / "chapters" / f"{slug.replace('ot-da-','appendix_')}.md" if slug.startswith("ot-") else None,
        BASE / "book-da-textbook" / "da-textbook-manuscript.md" if slug.startswith("ot-") else None,
        # Hollow-win in sapm-hollow-win or deep-research
        DEEP_RESEARCH / "hollow-win" / "hollow-win-current.md",
    ]
    for c in candidates:
        if c and c.exists():
            text = c.read_text(errors="ignore")
            if len(text) > 5000:
                return text[:120000]
    # Fallback: paperData JSON
    for f in PAPER_DATA_DIR.rglob("*.js"):
        content = f.read_text(errors="ignore")
        if f'slug: "{slug}"' in content or f"slug: '{slug}'" in content:
            return content[:40000]
    return ""

# ── DIALOGUE GENERATION ─────────────────────────────────────────
SYSTEM_PROMPT = """You are generating a long-form podcast dialogue between two hosts.
Alex (female, curious, asks probing questions) and Jordan (male, analytical, drives insights).
Natural banter: interruptions, "Right—", "Exactly, and—", "Wait, hold on—", "That's the key point".
Go deep on the data, mechanisms, implications. ~10,000 words. No truncation."""

def generate_dialogue(slug: str, content: str) -> str:
    """Generate dialogue via Gemini or load from cache."""
    cache_file = CACHE_DIR / f"{slug}.txt"
    if cache_file.exists() and cache_file.stat().st_size > 5000:
        return cache_file.read_text()

    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY not set and no cached dialogue found")

    prompt = f"""{SYSTEM_PROMPT}

SOURCE PAPER:
{content}

Generate a complete 10,000-word long-form podcast dialogue between Alex and Jordan.
Begin immediately with ALEX: and alternate ALEX:/JORDAN: throughout."""

    resp = requests.post(GEMINI_URL, json={
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {"maxOutputTokens": 16384, "temperature": 0.85},
    }, timeout=120)
    resp.raise_for_status()
    data = resp.json()
    dialogue = data["candidates"][0]["content"]["parts"][0]["text"]
    cache_file.write_text(dialogue)
    return dialogue

# ── DIALOGUE PARSING ─────────────────────────────────────────────
def parse_segments(dialogue: str) -> list[tuple[str, str]]:
    """Parse ALEX:/JORDAN: lines → (voice, text) pairs."""
    segments = []
    current_voice = None
    current_lines = []
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
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

# ── KOKORO RENDERING ─────────────────────────────────────────────
_model = None
_pipeline_cache = {}

def get_pipeline(voice: str) -> KPipeline:
    global _model
    if _model is None:
        _model = KModel().eval()
    if voice not in _pipeline_cache:
        pipeline = KPipeline(lang_code='a', model=_model)
        _pipeline_cache[voice] = pipeline
    return _pipeline_cache[voice]

def render_segments_kokoro(segments: list[tuple[str, str]], output_path: Path) -> None:
    """Render (voice, text) segments → WAV chunks → concatenate → M4A."""
    if not segments:
        raise ValueError("No segments")

    all_audio = []
    silence_short = np.zeros(int(24000 * 0.3), dtype=np.float32)  # 0.3s between turns
    silence_long  = np.zeros(int(24000 * 0.6), dtype=np.float32)  # 0.6s between paragraphs

    for i, (voice, text) in enumerate(segments):
        text = clean_text(text)
        if not text:
            continue
        pipeline = get_pipeline(voice)
        # Split long text into sentences for more natural rendering
        sentences = re.split(r'(?<=[.!?])\s+', text)
        seg_audio = []
        for sentence in sentences:
            if not sentence.strip():
                continue
            try:
                for _, _, audio in pipeline(sentence, voice=voice, speed=1.0):
                    seg_audio.append(audio)
                    break  # one segment per sentence
            except Exception as e:
                print(f"    Warning: TTS failed for segment: {str(e)[:60]}")
                continue

        if seg_audio:
            all_audio.extend(seg_audio)
            # Pause between speaker turns
            if i < len(segments) - 1:
                next_voice = segments[i + 1][0]
                pause = silence_long if next_voice != voice else silence_short
                all_audio.append(pause)

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

# ── MAIN PIPELINE ────────────────────────────────────────────────
def process_slug(slug: str, force: bool = False, cache_only: bool = False) -> dict:
    output = OUTPUT_DIR / f"{slug}.m4a"
    if output.exists() and not force:
        return {"id": slug, "status": "skipped"}

    try:
        content = find_source(slug)
        if not content:
            return {"id": slug, "status": "error", "msg": "no source found"}

        word_count_source = len(content.split())
        print(f"  [{slug}] {'Loading cached' if (CACHE_DIR / f'{slug}.txt').exists() else 'Generating'} dialogue ({word_count_source:,} words source)...")

        dialogue = generate_dialogue(slug, content)
        segments = parse_segments(dialogue)
        word_count = sum(len(t.split()) for _, t in segments)

        print(f"  [{slug}] {word_count:,} words → {len(segments)} segments → rendering with Kokoro...")
        render_segments_kokoro(segments, output)

        size_mb = output.stat().st_size / 1024 / 1024
        print(f"  [{slug}] DONE — {size_mb:.0f} MB, {word_count:,} words, {len(segments)} segments")
        return {"id": slug, "status": "done", "words": word_count, "segments": len(segments), "mb": size_mb}

    except Exception as e:
        print(f"  [{slug}] ERROR: {e}")
        return {"id": slug, "status": "error", "msg": str(e)}

# ── CLI ──────────────────────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--slug")
    parser.add_argument("--force", action="store_true", help="Overwrite existing M4A files")
    parser.add_argument("--cache-only", action="store_true", help="Use cached dialogues only, no Gemini")
    parser.add_argument("--workers", type=int, default=1,
                        help="Parallel workers (default 1; Kokoro is CPU-heavy)")
    args = parser.parse_args()

    slugs = []
    if args.slug:
        slugs = [args.slug]
    elif args.all:
        slugs = ALL_SLUGS
    else:
        parser.print_help()
        sys.exit(1)

    print(f"\nKokoro audiocast pipeline: {len(slugs)} items")
    print(f"Voices: Alex={VOICE_ALEX}, Jordan={VOICE_JORDAN}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Force: {args.force}\n")

    # Kokoro is CPU-bound — default to 1 worker to avoid OOM
    # Use --workers 2 if you have 32GB+ RAM
    results = []
    for slug in slugs:
        result = process_slug(slug, force=args.force, cache_only=args.cache_only)
        results.append(result)

    done    = [r for r in results if r["status"] == "done"]
    skipped = [r for r in results if r["status"] == "skipped"]
    errors  = [r for r in results if r["status"] == "error"]

    total_mb = sum(r.get("mb", 0) for r in done)
    avg_words = sum(r.get("words", 0) for r in done) / max(len(done), 1)

    print(f"\n{'='*60}")
    print(f"DONE: {len(done)} | SKIPPED: {len(skipped)} | FAILED: {len(errors)}")
    print(f"Total audio: {total_mb:.0f} MB | Avg script: {avg_words:.0f} words")
    if errors:
        print("\nErrors:")
        for r in errors:
            print(f"  {r['id']}: {r.get('msg','')}")
