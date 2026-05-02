#!/usr/bin/env python3
"""
MASTER AUDIOCAST PIPELINE — All 75 SAPM papers + 6 books = 81 items.

Generates two-host dialogue audiocasts (Alex + Jordan) via Gemini API,
renders with macOS `say` (Samantha/Tom voices), outputs M4A.

Target: ~10,000-word dialogue ≈ 75-80 minutes spoken audio (long format).

Usage:
    python3 scripts/generate_all_audiocasts.py [--all] [--papers] [--books] [--slug firearms]
    python3 scripts/generate_all_audiocasts.py --all              # all 81
    python3 scripts/generate_all_audiocasts.py --papers           # 75 papers only
    python3 scripts/generate_all_audiocasts.py --books            # 6 books only
    python3 scripts/generate_all_audiocasts.py --slug firearms    # one specific item
    python3 scripts/generate_all_audiocasts.py --all --force      # overwrite existing

Cost estimate:
    Gemini API (dialogue generation): ~$0.50 total for all 81 items
    macOS say (TTS rendering):        $0.00 (local, built-in)
    Total wall time:                  ~6-10 hours (can run overnight)

Requires:
    macOS `say` (built-in)
    ffmpeg (`brew install ffmpeg`)
    Gemini API key (set in GEMINI_API_KEY env or hard-coded below)
"""

import os, sys, re, json, subprocess, tempfile, time, argparse, shutil
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

# ── CONFIG ─────────────────────────────────────────────────────
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("ERROR: GEMINI_API_KEY env var not set")
    sys.exit(1)
GEMINI_MODEL = "gemini-3.1-pro-preview"
GEMINI_URL = (
    f"https://generativelanguage.googleapis.com/v1beta/models/"
    f"{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
)

BASE = Path("/Users/erikpostnieks/Projects")
OUTPUT_DIR = BASE / "ppt-companion/public/audio"
PAPER_DATA_DIR = BASE / "ppt-companion/src/paperData"
DEEP_RESEARCH_OUTPUT = BASE / "deep-research/output"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Voices: Alex = Samantha (female), Jordan = Tom (male)
VOICE_A = "Samantha"   # Alex
VOICE_B = "Tom"        # Jordan

# ── PAPER SOURCE RESOLUTION ────────────────────────────────────
# Maps paperData slug → current.md path (or None to use JSON)
def find_paper_source(slug: str):
    """Find the current.md source file for a paper slug."""
    # Direct match
    p = DEEP_RESEARCH_OUTPUT / slug / f"{slug}-current.md"
    if p.exists(): return p
    # Underscored variant
    us = slug.replace("-", "_")
    p = DEEP_RESEARCH_OUTPUT / us / f"{us}-current.md"
    if p.exists(): return p
    # Partial match (e.g. "fx-fixing" might be under "libor")
    SLUG_OVERRIDES = {
        "fx-fixing": "libor",
    }
    if slug in SLUG_OVERRIDES:
        alt = SLUG_OVERRIDES[slug]
        p = DEEP_RESEARCH_OUTPUT / alt / f"{alt}-current.md"
        if p.exists(): return p
    return None

def load_paper_content(slug: str) -> str:
    """Load paper content from current.md or fall back to paperData JSON."""
    # Try source file first
    src = find_paper_source(slug)
    if src:
        text = src.read_text(errors="ignore")
        return text[:120_000]  # cap at 120K chars

    # Fall back to structured paperData JSON
    json_path = PAPER_DATA_DIR / f"{slug}.json"
    if json_path.exists():
        data = json.loads(json_path.read_text())
        parts = []
        if data.get("title"):
            parts.append(f"# {data['title']}\n")
        if data.get("epigraph"):
            parts.append(f"> {data['epigraph']}\n")
        if data.get("executiveSummary"):
            parts.append(f"## Executive Summary\n{data['executiveSummary']}\n")
        for k in ["abstractText", "theoremStatement", "keyFindings", "methodology",
                  "results", "implications", "conclusion"]:
            if v := data.get(k):
                if isinstance(v, list):
                    parts.append(f"## {k}\n" + "\n".join(f"- {x}" for x in v))
                else:
                    parts.append(f"## {k}\n{v}\n")
        return "\n\n".join(parts)[:120_000]

    return f"Paper on {slug} — no source text found."

# ── BOOK CONFIG ─────────────────────────────────────────────────
BOOKS = {
    "book-ppt": {
        "title": "The Private Pareto Theorem",
        "subtitle": "Why Every Deal That Looks Like a Win Is Destroying the World",
        "chapters_dir": BASE / "book-ppt/manuscript",
        "audience": "general educated reader, business leaders, policymakers",
        "type": "book",
    },
    "book-da-textbook": {
        "title": "Decision Accounting: A Framework for Measuring What Bilateral Negotiation Cannot See",
        "subtitle": "Academic Textbook — 3rd edition",
        "chapters_dir": BASE / "book-da-textbook/chapters",
        "audience": "MBA students, law students, economists, business analysts",
        "type": "book",
    },
    "book-da-banking": {
        "title": "Decision Accounting for Banking",
        "subtitle": "A Practitioner's Guide to Systemic Welfare Measurement",
        "chapters_dir": BASE / "book-da-banking/chapters",
        "audience": "banking professionals, risk managers, compliance officers, regulators",
        "type": "book",
    },
    "book-da-global": {
        "title": "Decision Accounting for Global Business",
        "subtitle": "Cross-Border Welfare Cost Measurement and Institutional Reform",
        "chapters_dir": BASE / "book-da-global-business/chapters",
        "audience": "global business executives, international lawyers, policy analysts",
        "type": "book",
    },
    "book-csuite": {
        "title": "Decision Accounting: The C-Suite Guide",
        "subtitle": "What Every Executive Must Know About Systemic Liability",
        "chapters_dir": BASE / "book-csuite-liability/chapters",
        "audience": "CEOs, CFOs, General Counsel, board directors, senior executives",
        "type": "book",
    },
    "book-new-goal": {
        "title": "The New Goal",
        "subtitle": "A Novel",
        "chapters_dir": BASE / "book-the-new-goal/chapters",
        "audience": "general readers, business fiction fans, anyone curious about corporate ethics",
        "type": "book",
    },
}

def load_book_content(book: dict) -> str:
    """Read first ~120K chars from book chapters."""
    chapters_dir = book["chapters_dir"]
    skip = {"bibliography.md", "glossary.md", "notes_and_sources.md",
            "voice.md", "readme.md"}
    files = sorted([f for f in chapters_dir.glob("*.md")
                    if f.name.lower() not in skip])
    parts, total = [], 0
    for f in files:
        txt = f.read_text(errors="ignore")
        remaining = 120_000 - total
        if remaining <= 0: break
        parts.append(txt[:remaining])
        total += len(txt)
    return "\n\n---\n\n".join(parts)

# ── GEMINI DIALOGUE GENERATION ──────────────────────────────────
import urllib.request

SYSTEM_PROMPT = """You are generating a long-form podcast audiocast dialogue between two hosts.
Alex (incisive, data-driven, challenges assumptions with sharp questions)
Jordan (structural analyst, brings deep institutional insight and historical context)

TARGET: approximately 10,000 words — this is a LONG-FORM audiocast (~75 minutes spoken).
The dialogue must be substantive, not superficial. Go deep on the data, the mechanisms, the implications.
Cover: core thesis, key evidence, surprising findings, mechanisms of harm, what can be done, why it matters NOW.
Format: alternating ALEX: / JORDAN: lines. No stage directions. No asterisks. No markdown formatting.
Do not truncate — write the complete 10,000-word dialogue from start to finish."""

def generate_dialogue(item_id: str, title: str, content: str,
                      audience: str = "general educated reader") -> str:
    """Generate ~10,000-word two-host dialogue via Gemini."""
    import urllib.error

    user_prompt = f"""Item: {item_id}
Title: {title}
Primary audience: {audience}

SOURCE CONTENT (up to 120,000 characters):
{content}

Generate a complete 10,000-word long-form podcast dialogue between Alex and Jordan.
Alex and Jordan should deeply engage with the material — cite specific numbers, explain mechanisms,
challenge each other's framings, and leave the listener with a thorough understanding.
Begin immediately with ALEX: and alternate ALEX:/JORDAN: throughout. Write the full dialogue now."""

    payload = json.dumps({
        "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        "contents": [{"parts": [{"text": user_prompt}]}],
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 32768,
            "topP": 0.95,
        }
    }).encode("utf-8")

    req = urllib.request.Request(
        GEMINI_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=180) as resp:
                data = json.loads(resp.read())
                return data["candidates"][0]["content"]["parts"][0]["text"]
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = 30 * (attempt + 1)
                print(f"    Rate limit, waiting {wait}s...")
                time.sleep(wait)
            elif attempt == 3:
                raise
            else:
                time.sleep(10)
        except Exception as e:
            if attempt == 3:
                raise
            time.sleep(10)

# ── TTS RENDERING ───────────────────────────────────────────────
def clean_for_tts(text: str) -> str:
    """Sanitize text for macOS say command."""
    text = re.sub(r'["\u201c\u201d\u201e\u201f]', '"', text)
    text = re.sub(r"[\u2018\u2019\u201a\u201b]", "'", text)
    text = re.sub(r'[\u2013\u2014]', ' -- ', text)  # em/en dash
    text = re.sub(r'\*+', '', text)
    text = re.sub(r'#+\s*', '', text)
    text = re.sub(r'\[.*?\]|\(.*?\)', '', text)  # remove markdown links
    # Math/symbol substitutions
    replacements = {
        "βW": "beta-W", "β": "beta", "ΔW": "delta-W", "Δ": "delta",
        "Π": "Pi", "≥": " greater than or equal to ", "≤": " less than or equal to ",
        "→": " leads to ", "≈": " approximately ", "×": " times ",
        "$": " dollars ", "%": " percent ", "&": " and ",
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    # Remove control characters
    text = re.sub(r'[\x00-\x1f\x7f]', ' ', text)
    # Collapse whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def parse_dialogue_segments(dialogue: str) -> list[tuple[str, str]]:
    """Parse ALEX:/JORDAN: lines into (voice, text) pairs."""
    segments = []
    current_voice = None
    current_lines = []

    for line in dialogue.split("\n"):
        line = line.strip()
        if line.startswith("ALEX:"):
            if current_voice and current_lines:
                segments.append((current_voice, " ".join(current_lines)))
            current_voice = VOICE_A
            current_lines = [line[5:].strip()]
        elif line.startswith("JORDAN:"):
            if current_voice and current_lines:
                segments.append((current_voice, " ".join(current_lines)))
            current_voice = VOICE_B
            current_lines = [line[7:].strip()]
        elif line and current_voice:
            current_lines.append(line)

    if current_voice and current_lines:
        segments.append((current_voice, " ".join(current_lines)))

    return [(v, clean_for_tts(t)) for v, t in segments if t.strip()]

def render_segments_to_m4a(segments: list[tuple[str, str]],
                            output_path: Path) -> None:
    """Render voice segments → AIFF files → concatenate → M4A."""
    if not segments:
        raise ValueError("No segments to render")

    with tempfile.TemporaryDirectory() as tmp:
        aiff_files = []
        for i, (voice, text) in enumerate(segments):
            if not text:
                continue
            # Split long segments (say has a ~10KB limit per call)
            chunks = [text[j:j+3000] for j in range(0, len(text), 3000)]
            for ci, chunk in enumerate(chunks):
                if not chunk.strip():
                    continue
                aiff = os.path.join(tmp, f"seg_{i:04d}_{ci:02d}.aiff")
                result = subprocess.run(
                    ["say", "-v", voice, "-o", aiff, chunk],
                    capture_output=True, timeout=180
                )
                if result.returncode == 0 and os.path.getsize(aiff) > 0:
                    aiff_files.append(aiff)

        if not aiff_files:
            raise RuntimeError("No audio segments rendered")

        # Write concat list
        concat_list = os.path.join(tmp, "concat.txt")
        with open(concat_list, "w") as f:
            for p in sorted(aiff_files):
                f.write(f"file '{p}'\n")

        # ffmpeg: concat AIFF → M4A
        tmp_m4a = os.path.join(tmp, "output.m4a")
        result = subprocess.run([
            "ffmpeg", "-y",
            "-f", "concat", "-safe", "0",
            "-i", concat_list,
            "-c:a", "aac", "-b:a", "128k",
            "-movflags", "+faststart",
            tmp_m4a
        ], capture_output=True, timeout=3600)

        if result.returncode != 0:
            raise RuntimeError(f"ffmpeg failed:\n{result.stderr.decode()[:1000]}")
        if not os.path.exists(tmp_m4a) or os.path.getsize(tmp_m4a) == 0:
            raise RuntimeError("ffmpeg produced empty file")

        shutil.copy2(tmp_m4a, str(output_path))

# ── MAIN PROCESSING ─────────────────────────────────────────────
def process_item(item_id: str, force: bool = False) -> dict:
    """Full pipeline for one paper or book."""
    output_path = OUTPUT_DIR / f"{item_id}.m4a"

    result = {"id": item_id, "status": "pending"}

    try:
        if output_path.exists() and not force:
            size_mb = output_path.stat().st_size / 1_048_576
            print(f"  [{item_id}] already exists ({size_mb:.0f} MB) — skipping (use --force to overwrite)")
            result["status"] = "skipped"
            return result

        # Determine type and load content
        if item_id in BOOKS:
            book = BOOKS[item_id]
            title = f"{book['title']}: {book['subtitle']}"
            content = load_book_content(book)
            audience = book["audience"]
        else:
            # SAPM paper
            json_path = PAPER_DATA_DIR / f"{item_id}.json"
            if json_path.exists():
                meta = json.loads(json_path.read_text())
                title = meta.get("title", item_id)
            else:
                title = item_id
            content = load_paper_content(item_id)
            audience = "general educated reader, policymakers, business leaders, researchers"

        print(f"  [{item_id}] Generating dialogue ({len(content):,} chars source)...")
        dialogue = generate_dialogue(item_id, title, content, audience)
        words = len(dialogue.split())

        print(f"  [{item_id}] {words:,} words → parsing {len(parse_dialogue_segments(dialogue))} segments → rendering...")
        segments = parse_dialogue_segments(dialogue)

        render_segments_to_m4a(segments, output_path)

        size_mb = output_path.stat().st_size / 1_048_576
        print(f"  [{item_id}] DONE — {size_mb:.0f} MB, {words:,} words, {len(segments)} segments")

        result.update({"status": "done", "words": words,
                       "segments": len(segments), "size_mb": size_mb})

    except Exception as e:
        print(f"  [{item_id}] FAILED — {e}")
        result.update({"status": "failed", "error": str(e)})

    return result

def main():
    parser = argparse.ArgumentParser(description="Generate all SAPM + book audiocasts")
    parser.add_argument("--all", action="store_true", help="All 81 items")
    parser.add_argument("--papers", action="store_true", help="75 SAPM papers only")
    parser.add_argument("--books", action="store_true", help="6 books only")
    parser.add_argument("--slug", help="One specific slug")
    parser.add_argument("--force", action="store_true", help="Overwrite existing files")
    parser.add_argument("--workers", type=int, default=3,
                        help="Parallel Gemini workers (default 3; audio rendering is sequential per item)")
    args = parser.parse_args()

    if not any([args.all, args.papers, args.books, args.slug]):
        parser.print_help()
        sys.exit(1)

    # Check dependencies
    for dep in ["ffmpeg", "say"]:
        if subprocess.run(["which", dep], capture_output=True).returncode != 0:
            if dep == "say":
                print("ERROR: `say` not found — requires macOS")
            else:
                print(f"ERROR: {dep} not found — install with: brew install {dep}")
            sys.exit(1)

    # Build work list
    paper_slugs = [f.stem for f in PAPER_DATA_DIR.glob("*.json")]
    book_slugs = list(BOOKS.keys())

    if args.slug:
        if args.slug in BOOKS:
            items = [args.slug]
        elif args.slug in paper_slugs:
            items = [args.slug]
        else:
            print(f"ERROR: unknown slug '{args.slug}'")
            print(f"Papers: {', '.join(sorted(paper_slugs[:5]))}...")
            print(f"Books: {', '.join(book_slugs)}")
            sys.exit(1)
    elif args.all:
        items = paper_slugs + book_slugs
    elif args.papers:
        items = paper_slugs
    elif args.books:
        items = book_slugs

    print(f"\nAudiocast pipeline: {len(items)} items, {args.workers} workers")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Force overwrite: {args.force}\n")

    results = []

    # Process in parallel (Gemini calls) but audio rendering is per-item
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(process_item, slug, args.force): slug
                   for slug in items}
        for fut in as_completed(futures):
            results.append(fut.result())

    # Summary
    done = [r for r in results if r["status"] == "done"]
    failed = [r for r in results if r["status"] == "failed"]
    skipped = [r for r in results if r["status"] == "skipped"]

    print(f"\n{'='*60}")
    print(f"DONE: {len(done)} | SKIPPED: {len(skipped)} | FAILED: {len(failed)}")
    if done:
        total_mb = sum(r.get("size_mb", 0) for r in done)
        avg_words = sum(r.get("words", 0) for r in done) // max(len(done), 1)
        print(f"Total audio generated: {total_mb:.0f} MB | Avg script: {avg_words:,} words")
    if failed:
        print("\nFailed items:")
        for r in failed:
            print(f"  {r['id']}: {r.get('error', '?')[:100]}")

    return 0 if not failed else 1

if __name__ == "__main__":
    sys.exit(main())
