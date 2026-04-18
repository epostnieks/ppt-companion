#!/usr/bin/env python3

def _load_gemini_key() -> str:
    import os
    k = os.environ.get("GEMINI_API_KEY")
    if k:
        return k
    for env_path in [
        "/Users/erikpostnieks/Projects/ppt-companion/.env",
        "/Users/erikpostnieks/Projects/deep-research/.env",
    ]:
        try:
            for line in open(env_path):
                line = line.strip()
                if line.startswith("GEMINI_API_KEY="):
                    return line.split("=", 1)[1].strip()
        except FileNotFoundError:
            pass
    raise RuntimeError("GEMINI_API_KEY not set and not found in .env files")


"""
Render all audiocasts using Gemini TTS (multi-speaker, NotebookLM-quality).

Voices:
  Alex (female host):  Aoede  — bright, natural female
  Jordan (male host):  Charon — deep, authoritative male

Dialogue loaded from scripts/dialogue_cache/{slug}.txt.
Missing caches are regenerated via Gemini Flash (same as before).

Usage:
    python3 scripts/render_audiocasts_gemini_tts.py --all
    python3 scripts/render_audiocasts_gemini_tts.py --slug alcohol
    python3 scripts/render_audiocasts_gemini_tts.py --all --force
"""

import os, sys, re, json, subprocess, tempfile, time, argparse, base64, requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import soundfile as sf
import numpy as np

GEMINI_API_KEY = _load_gemini_key()

DIALOGUE_MODEL = "gemini-2.5-flash"
TTS_MODEL      = "gemini-3.1-flash-tts-preview"

DIALOGUE_URL = (f"https://generativelanguage.googleapis.com/v1beta/models/"
                f"{DIALOGUE_MODEL}:generateContent?key={GEMINI_API_KEY}")
TTS_URL      = (f"https://generativelanguage.googleapis.com/v1beta/models/"
                f"{TTS_MODEL}:generateContent?key={GEMINI_API_KEY}")

BASE       = Path("/Users/erikpostnieks/Projects")
OUTPUT_DIR = BASE / "ppt-companion/out/audio-gemini"
CACHE_DIR  = BASE / "ppt-companion/scripts/dialogue_cache"
PAPER_DATA_DIR = BASE / "ppt-companion/src/paperData"
DEEP_RESEARCH  = BASE / "deep-research/output"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
CACHE_DIR.mkdir(parents=True, exist_ok=True)

VOICE_ALEX   = "Kore"    # Gemini female
VOICE_JORDAN = "Charon"  # Gemini male
SAMPLE_RATE  = 24000

# ── SLUG LISTS ───────────────────────────────────────────────────
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
DA_SLUGS = ["da-1","da-2","da-3","da-4","da-5"]
OT_SLUGS = ["ot-da-chapter1","ot-da-chapter5","ot-da-chapter9"]
ALL_SLUGS = DOMAIN_SLUGS + FOUNDATIONAL_SLUGS + DA_SLUGS + OT_SLUGS

# ── SOURCE RESOLUTION ────────────────────────────────────────────
def find_source(slug: str) -> str:
    candidates = [
        DEEP_RESEARCH / slug / f"{slug}-current.md",
        BASE / f"sapm-{slug}" / "paper" / f"{slug}-current.md",
        BASE / f"sapm-{slug}" / "paper" / f"{slug.replace('-','_')}-current.md",
        BASE / "sapm-decision-accounting" / "paper" / slug / f"{slug.replace('-','')}-current.md" if slug.startswith("da-") else None,
        BASE / "book-da-textbook" / "chapters" / f"{slug.replace('ot-da-','appendix_')}.md" if slug.startswith("ot-") else None,
        BASE / "book-da-textbook" / "da-textbook-manuscript.md" if slug.startswith("ot-") else None,
        DEEP_RESEARCH / "hollow-win" / "hollow-win-current.md",
    ]
    for c in candidates:
        if c and c.exists():
            text = c.read_text(errors="ignore")
            if len(text) > 5000:
                return text
    for f in PAPER_DATA_DIR.rglob("*.js"):
        content = f.read_text(errors="ignore")
        if f'slug: "{slug}"' in content or f"slug: '{slug}'" in content:
            return content[:40000]
    return ""

# ── DIALOGUE GENERATION (for missing/deleted caches) ─────────────
SYSTEM_PROMPT = """IDENTITY:
You are an international Oscar-winning screenwriter who has spent years working with
award-winning podcast producers. You know exactly how to turn dense academic research
into conversations that feel alive — where two people are genuinely discovering something
together, not reading from a script.

INSTRUCTION:
Transform the provided research paper into a long-form podcast conversation between
two hosts: ALEX (female) and JORDAN (male). They are unnamed experts — they do not
introduce themselves by name or say they are summarizing anything. They simply talk,
like two brilliant people who just read something fascinating and cannot stop discussing it.

<scratchpad>
Before writing the dialogue:
- Identify the 5-7 most surprising, counterintuitive, or emotionally resonant facts
- Find the best real-world analogy for the core mechanism
- Plan the arc: hook → mechanism → scale → who pays → what would fix it → lingering question
- Note any statistics that will make the listener stop and rewind
</scratchpad>

DIALOGUE RULES:
- Each speaker turn: maximum 600 characters. Keep turns short. Break up monologues.
- Introduce disfluencies: "um," "uh," "you know," "I mean," "well," "like"
- Make speakers interrupt each other and anticipate what the other will say
- Make speakers react naturally: "Oh?", "Yeah?", "Wait—", "Huh.", "Okay that's wild.",
  "Hold on, back up—", "That's... yeah that's a lot."
- Make speakers sometimes complete each other's sentences
- AVOID overusing: "absolutely," "exactly," "definitely," "fascinating" — use sparingly
- ALEX asks the questions the listener is thinking. She expresses genuine surprise.
- JORDAN builds to punchlines. He leads with the number that stopped him cold.
- Neither host ever sounds like they are reading. They are discovering this together.

STRUCTURE:
- Open with a strong hook — the most shocking fact or implication, not a summary
- Gradually build complexity: hook → mechanism → scale → systemic implications
- Include a "breather" moment where they pause and absorb something heavy
- Close with 2-3 casual takeaways, then leave the listener with ONE genuinely
  thought-provoking open question that will linger after they stop listening
- End with a warm, natural sign-off

CONTENT RULES:
- Every statistic must come directly from the source paper. No fabrication.
- Translate every piece of jargon into plain English immediately
- Use at least one concrete real-world analogy for the core mechanism
- Cover: why this happens, how big it is, who actually pays, what would fix it

LENGTH: Aim for a very long conversation. Use maximum output tokens. Do not truncate.

OUTPUT FORMAT:
Write the full script using only ALEX: and JORDAN: speaker labels.
Begin immediately with ALEX: — no preamble, no scratchpad in output, no markdown."""

def _gemini_call(messages: list) -> str:
    resp = requests.post(DIALOGUE_URL, json={
        "contents": messages,
        "generationConfig": {"maxOutputTokens": 65536, "temperature": 0.85},
    }, timeout=600)
    resp.raise_for_status()
    return resp.json()["candidates"][0]["content"]["parts"][0]["text"]

def generate_dialogue(slug: str) -> str:
    cache_file = CACHE_DIR / f"{slug}.txt"
    if cache_file.exists() and cache_file.stat().st_size > 5000:
        return cache_file.read_text()

    print(f"  [{slug}] Generating dialogue via Gemini...")
    content = find_source(slug)
    if not content:
        raise RuntimeError(f"No source found for {slug}")

    prompt = f"""{SYSTEM_PROMPT}

SOURCE PAPER:
{content}

Generate a complete 10,000-word long-form podcast dialogue between Alex and Jordan.
Begin immediately with ALEX: and alternate ALEX:/JORDAN: throughout."""

    messages = [{"role": "user", "parts": [{"text": prompt}]}]
    dialogue = _gemini_call(messages)
    word_count = len(dialogue.split())

    turn = 0
    while word_count < 9000 and turn < 4:
        turn += 1
        tail = " ".join(dialogue.split()[-2000:])
        cont = [{"role": "user", "parts": [{"text": f"Continue the dialogue from exactly where it left off. ALEX:/JORDAN: format. At least 3,000 more words.\n\n{tail}"}]}]
        dialogue = dialogue.rstrip() + "\n" + _gemini_call(cont).lstrip()
        word_count = len(dialogue.split())

    # ── REWRITE PASS (podcastfy technique) ──────────────────────────
    # A second pass enforces naturalness, turn length, and disfluencies
    print(f"  [{slug}] Rewriting for naturalness...")
    rewrite_prompt = f"""You are an Oscar-winning screenwriter. Rewrite the podcast script below
to sound more natural and engaging. Keep ALL content and facts — just improve the delivery.

Rules:
- Each speaker turn: max 600 characters. Break up any long turns.
- AVOID overusing: "absolutely," "exactly," "definitely," "fascinating" — cut or vary them.
- Add disfluencies: "um," "uh," "you know," "I mean" where natural.
- Make speakers interrupt and complete each other's sentences more.
- Add short reactions: "Oh?", "Yeah?", "Huh.", "Wait—" between turns.
- Keep ALEX:/JORDAN: format exactly. No other changes to structure.

SCRIPT:
{dialogue}"""

    rewrite_messages = [{"role": "user", "parts": [{"text": rewrite_prompt}]}]
    try:
        rewritten = _gemini_call(rewrite_messages)
        # Only use rewrite if it kept the format and is substantial
        if rewritten.count("ALEX:") > 10 and rewritten.count("JORDAN:") > 10:
            dialogue = rewritten
    except Exception as e:
        print(f"  [{slug}] Rewrite pass failed ({e}), using original")

    cache_file.write_text(dialogue)
    return dialogue

# ── TEXT CLEANING ────────────────────────────────────────────────
def _clean(text: str) -> str:
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r'\*+', '', text)
    text = re.sub(r'#+\s*', '', text)
    text = re.sub(r'`+', '', text)
    text = re.sub(r'https?://\S+', 'the linked source', text)
    text = text.replace('—', ', ').replace('–', ', ').replace('...', '. ')
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def clean_and_normalize(dialogue: str) -> list[str]:
    """Parse ALEX:/JORDAN: dialogue → clean list of 'Alex: ...' / 'Jordan: ...' lines."""
    lines = []
    current_speaker = None
    current_text = []

    for line in dialogue.split("\n"):
        line = line.strip()
        if line.upper().startswith("ALEX:"):
            if current_speaker and current_text:
                lines.append(f"{current_speaker}: {_clean(' '.join(current_text))}")
            current_speaker = "Alex"
            current_text = [line[5:].strip()]
        elif line.upper().startswith("JORDAN:"):
            if current_speaker and current_text:
                lines.append(f"{current_speaker}: {_clean(' '.join(current_text))}")
            current_speaker = "Jordan"
            current_text = [line[7:].strip()]
        elif line and current_speaker:
            current_text.append(line)

    if current_speaker and current_text:
        lines.append(f"{current_speaker}: {_clean(' '.join(current_text))}")

    return [l for l in lines if l.split(": ", 1)[-1].strip()]

# ── CHUNKING ─────────────────────────────────────────────────────
def chunk_lines(lines: list[str], max_words: int = 600) -> list[str]:
    """Group dialogue lines into ~max_words chunks for Gemini TTS API calls."""
    chunks = []
    current = []
    current_words = 0

    for line in lines:
        w = len(line.split())
        if current_words + w > max_words and current:
            chunks.append("\n".join(current))
            current = []
            current_words = 0
        current.append(line)
        current_words += w

    if current:
        chunks.append("\n".join(current))

    return chunks

# ── GEMINI TTS RENDERING ─────────────────────────────────────────
def render_chunk(chunk_text: str) -> np.ndarray:
    payload = {
        "contents": [{"parts": [{"text": chunk_text}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "multiSpeakerVoiceConfig": {
                    "speakerVoiceConfigs": [
                        {
                            "speaker": "Alex",
                            "voiceConfig": {
                                "prebuiltVoiceConfig": {"voiceName": VOICE_ALEX}
                            }
                        },
                        {
                            "speaker": "Jordan",
                            "voiceConfig": {
                                "prebuiltVoiceConfig": {"voiceName": VOICE_JORDAN}
                            }
                        }
                    ]
                }
            }
        }
    }

    resp = requests.post(TTS_URL, json=payload, timeout=300)
    resp.raise_for_status()

    data = resp.json()
    part = data["candidates"][0]["content"]["parts"][0]
    pcm_bytes = base64.b64decode(part["inlineData"]["data"])
    audio = np.frombuffer(pcm_bytes, dtype=np.int16).astype(np.float32) / 32768.0
    return audio

CHUNK_WORKERS = 30   # parallel TTS calls per paper — Google has capacity

def render_chunk_with_retry(args: tuple) -> tuple[int, np.ndarray]:
    """Render one chunk with retries. Returns (index, audio_array)."""
    i, chunk = args
    for attempt in range(4):
        try:
            audio = render_chunk(chunk)
            return (i, audio)
        except Exception as e:
            if attempt == 3:
                raise RuntimeError(f"chunk {i} failed: {e}")
            time.sleep(2 ** attempt)

def render_dialogue_gemini(dialogue: str, output_path: Path, slug: str = "") -> None:
    lines  = clean_and_normalize(dialogue)
    chunks = chunk_lines(lines, max_words=600)
    total  = len(chunks)
    print(f"  [{slug}] {total} chunks → parallel TTS...", flush=True)

    results = {}
    with ThreadPoolExecutor(max_workers=min(CHUNK_WORKERS, total)) as ex:
        futures = {ex.submit(render_chunk_with_retry, (i, c)): i for i, c in enumerate(chunks)}
        for fut in as_completed(futures):
            i, audio = fut.result()  # raises on failure
            results[i] = audio
            print(f"    [{slug}] chunk {i+1}/{total} done ({len(audio)/SAMPLE_RATE:.1f}s)", flush=True)

    all_audio = [results[i] for i in range(total)]

    if not all_audio:
        raise RuntimeError("No audio rendered")

    combined = np.concatenate(all_audio)

    with tempfile.TemporaryDirectory() as tmp:
        wav_path = os.path.join(tmp, "combined.wav")
        sf.write(wav_path, combined, SAMPLE_RATE)

        result = subprocess.run([
            "ffmpeg", "-y", "-i", wav_path,
            "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
            str(output_path)
        ], capture_output=True, timeout=3600)

        if result.returncode != 0:
            raise RuntimeError(f"ffmpeg: {result.stderr.decode()[:500]}")

# ── MAIN PIPELINE ─────────────────────────────────────────────────
def process_slug(slug: str, force: bool = False) -> dict:
    output = OUTPUT_DIR / f"{slug}.m4a"
    if output.exists() and not force:
        return {"id": slug, "status": "skipped"}

    try:
        dialogue  = generate_dialogue(slug)
        words     = len(dialogue.split())
        print(f"  [{slug}] {words:,} words → Gemini TTS...")
        render_dialogue_gemini(dialogue, output, slug=slug)
        size_mb = output.stat().st_size / 1024 / 1024
        dur_min = size_mb * 8 / 0.128 / 60  # rough estimate from 128k AAC
        print(f"  [{slug}] DONE — {size_mb:.1f} MB, ~{dur_min:.0f} min")
        return {"id": slug, "status": "done", "words": words, "mb": size_mb}
    except Exception as e:
        print(f"  [{slug}] ERROR: {e}")
        return {"id": slug, "status": "error", "msg": str(e)}

# ── CLI ───────────────────────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--all",   action="store_true")
    parser.add_argument("--slug")
    parser.add_argument("--force", action="store_true", help="Overwrite existing M4A files")
    args = parser.parse_args()

    if args.slug:
        slugs = [args.slug]
    elif args.all:
        slugs = ALL_SLUGS
    else:
        parser.print_help()
        sys.exit(1)

    print(f"\nGemini TTS audiocast pipeline: {len(slugs)} items")
    print(f"Voices: Alex={VOICE_ALEX}, Jordan={VOICE_JORDAN}")
    print(f"Output: {OUTPUT_DIR}\n")

    # Phase 1: generate all dialogues sequentially (fast ~5s each, avoids 429 flood)
    print("Phase 1: generating dialogues...")
    dialogues = {}
    for slug in slugs:
        output = OUTPUT_DIR / f"{slug}.m4a"
        if output.exists() and not args.force:
            dialogues[slug] = None  # will be skipped
            continue
        try:
            dialogues[slug] = generate_dialogue(slug)
        except Exception as e:
            print(f"  [{slug}] dialogue ERROR: {e}")
            dialogues[slug] = None

    # Phase 2: render TTS for all papers in parallel (each paper parallelises its own chunks)
    print(f"\nPhase 2: rendering TTS ({sum(1 for v in dialogues.values() if v)} papers)...")
    PAPER_WORKERS = 8
    results = []

    def _render_slug(slug: str) -> dict:
        output = OUTPUT_DIR / f"{slug}.m4a"
        if output.exists() and not args.force:
            return {"id": slug, "status": "skipped"}
        dialogue = dialogues.get(slug)
        if not dialogue:
            return {"id": slug, "status": "error", "msg": "no dialogue"}
        try:
            render_dialogue_gemini(dialogue, output, slug=slug)
            size_mb = output.stat().st_size / 1024 / 1024
            dur_min = size_mb * 8 / 0.128 / 60
            print(f"  [{slug}] DONE — {size_mb:.1f} MB, ~{dur_min:.0f} min")
            return {"id": slug, "status": "done", "words": len(dialogue.split()), "mb": size_mb}
        except Exception as e:
            print(f"  [{slug}] ERROR: {e}")
            return {"id": slug, "status": "error", "msg": str(e)}

    with ThreadPoolExecutor(max_workers=PAPER_WORKERS) as ex:
        futures = {ex.submit(_render_slug, s): s for s in slugs}
        for fut in as_completed(futures):
            results.append(fut.result())

    done    = [r for r in results if r["status"] == "done"]
    skipped = [r for r in results if r["status"] == "skipped"]
    errors  = [r for r in results if r["status"] == "error"]

    print(f"\n{'='*60}")
    print(f"DONE: {len(done)} | SKIPPED: {len(skipped)} | FAILED: {len(errors)}")
    if errors:
        print("\nErrors:")
        for r in errors:
            print(f"  {r['id']}: {r.get('msg','')}")
