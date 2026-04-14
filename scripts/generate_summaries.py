#!/usr/bin/env python3
"""
Generate paper summaries (~40% of source length) using Gemini 2.5 Flash.
Reads each paper's -current.md file, sends to Gemini with JSON mode, writes structured JSON.
Output is consumed by PaperSummaries.jsx.

Usage: python3 scripts/generate_summaries.py [--slug firearms] [--workers 4]
"""

import os, sys, json, glob, time, re, argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from google import genai
from google.genai import types
from json_repair import repair_json

API_KEY = "AIzaSyCKbALOdFD7-7-Ycn3pkoSd7xIOXM8Q5ts"
MODEL = "gemini-2.5-flash"
BASE = "/Users/erikpostnieks/Projects"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "paperData")

def build_prompt(word_count):
    """Build prompt with target word count based on 40% of source."""
    target = max(5000, int(word_count * 0.40))
    return f"""You are generating a comprehensive web summary of an academic economics paper for a public-facing companion website. The website needs extensive text content for SEO purposes and to serve as a standalone resource for readers who have not read the full paper.

READ THE ENTIRE PAPER BELOW, then generate a structured JSON summary. The total output should be approximately {target:,} words (40% of the source paper's {word_count:,} words, minimum 5,000 words). Write in a direct, declarative voice — no hedging, no "it's important to note," no "let's dive in." Prosecutorial tone. Concrete before abstract. Every claim must be traceable to the paper.

IMPORTANT: Do NOT use any abbreviations. Spell out every acronym in full every time it appears. For example: "Environmental Protection Agency" not "EPA", "Digital Markets Act" not "DMA", "Proof-of-Stake" not "PoS". The only exceptions are chemical formulas (CO₂, PFAS compound names like PFOA) and the welfare beta symbol (βW).

IMPORTANT: Include HTML tables where data is presented in the paper. Use <table>, <thead>, <tbody>, <tr>, <th>, <td> tags. Reproduce key data tables from the paper — welfare channel breakdowns, Monte Carlo results, cross-domain comparisons, timeline tables, axiom summaries. Tables improve readability and SEO. Style them with inline CSS: border-collapse: collapse, 1px solid #ddd borders, 8px padding, left-aligned text.

Return valid JSON with this exact structure:

{{
  "slug": "<paper-slug>",
  "title": "<full paper title>",
  "theoremName": "<formal theorem name>",
  "theoremType": "Impossibility" or "Intractability",
  "epigraph": "<a provocative one-sentence quote that captures the paper's core tension>",

  "executiveSummary": "<2,000 words. What this paper proves, why it matters, what the numbers show. Written for a policymaker who has 10 minutes. Include an HTML table summarizing the key metrics: βW, 90% CI, Π, ΔW, theorem type.>",

  "keyFindings": [
    "<finding 1 — 200-300 words each, with specific numbers from the paper>",
    "<finding 2>",
    "<...at least 10 findings>"
  ],

  "theorem": {{
    "formal": "<500 words. The formal statement of the impossibility/intractability theorem, including all axioms, the proof structure, and the mathematical result.>",
    "plain": "<500 words. The same theorem explained so a college freshman can understand it. Use analogies. Make it vivid.>",
    "axioms": [
      {{"id": "A1", "name": "<axiom name>", "statement": "<formal statement>", "evidence": "<what evidence from the paper supports this axiom>"}},
      {{"id": "A2", "name": "<axiom name>", "statement": "<formal statement>", "evidence": "<evidence>"}},
      {{"id": "A3", "name": "<axiom name>", "statement": "<formal statement>", "evidence": "<evidence>"}}
    ],
    "proofSketch": "<1,000 words. Walk through the proof step by step, explaining what each step does and why it matters.>"
  }},

  "welfareAnalysis": {{
    "betaW": "<the βW value>",
    "ci90": "<90% confidence interval>",
    "pi": "<Π value and what it represents>",
    "deltaW": "<ΔW value and what it represents>",
    "channels": [
      {{"name": "<channel name>", "value": "<dollar value>", "description": "<200 words explaining this welfare channel, how it was measured, what it captures>"}}
    ],
    "channelTable": "<An HTML table with columns: Channel | Annual Cost ($B) | Attribution Rate | Channel βW | Share of Total ΔW. Include all welfare channels from the paper.>",
    "monteCarlo": "<1,000 words. Describe the Monte Carlo methodology: number of draws, seed, distribution types tested, sensitivity analysis results, what drives the uncertainty. Include an HTML table showing MC results across distribution types if available.>"
  }},

  "caseStudies": [
    {{"title": "<case study title>", "content": "<500 words per case study. Real-world examples from the paper that illustrate the theorem in action. Include dates, names, dollar amounts."}}
  ],

  "policyAnalysis": {{
    "currentFramework": "<1,000 words. What regulatory/legal framework currently exists. Which agencies have jurisdiction. What laws apply. Include an HTML table listing key statutes/regulations.>",
    "failures": "<1,000 words. Why the current framework fails. Specific examples of regulatory capture, enforcement gaps, jurisdictional arbitrage.>",
    "reform": "<1,000 words. What reforms would work. Which country/program has proven it works (for intractability theorems). Why most jurisdictions haven't adopted the proven solution.>"
  }},

  "agents": {{
    "insider": "<800 words. What an insider/whistleblower can do. Specific statutes, protection mechanisms, evidence to document, agencies to contact.>",
    "plaintiff": "<800 words. Litigation pathways. Causes of action, discovery targets, precedent cases, likely damages.>",
    "regulator": "<800 words. Which regulators have jurisdiction. What enforcement tools exist. Where the gaps are.>",
    "legislator": "<800 words. Which committees have jurisdiction. What bills exist or are needed. The structural intervention.>",
    "investor": "<800 words. Financial exposure. Portfolio screening criteria. Stranded asset risk. Which companies are most exposed.>",
    "supranational": "<800 words. International treaties and frameworks. Which ones work, which don't, what's missing.>"
  }},

  "crossDomainConnections": [
    {{"domain": "<related domain>", "connection": "<300 words explaining how this domain connects to the related one — shared axioms, common mechanisms, policy spillovers>"}}
  ],

  "faq": [
    {{"q": "<question a skeptical reader would ask>", "a": "<400 words. Answer with evidence from the paper. Anticipate the follow-up objection and address it."}}
  ],

  "methodology": "<1,500 words. How the paper was researched and written. Data sources. Calibration methodology. Limitations acknowledged by the author. What would change the result.>",

  "timeline": [
    {{"year": "<year>", "event": "<what happened>", "significance": "<why it matters for the theorem>"}}
  ],

  "literatureContext": "<1,500 words. Where this paper sits in the academic literature. Which prior results it extends. How it differs from conventional analysis of this domain. Key citations.>"
}}

IMPORTANT RULES:
1. Every number must come from the paper. Do not fabricate statistics.
2. No abbreviations — spell everything out every time.
3. Write approximately {target:,} words total. This is for SEO. More substantive text = better.
4. Prosecutorial, declarative voice. No hedging. No "it should be noted."
5. If the paper does not contain enough information for a section, say "Data not available in source paper" rather than making something up.
6. Include HTML tables wherever the paper presents tabular data. Reproduce the data faithfully.
7. Do NOT use markdown bold (**text**). Use plain text only.

THE PAPER:
"""


def find_paper(slug):
    """Find the paper markdown file for a given slug."""
    patterns = [
        f"{BASE}/sapm-{slug}/paper/{slug}-current.md",
        f"{BASE}/sapm-{slug}/paper/*-current.md",
        f"{BASE}/sapm-{slug}/{slug}.md",
        f"{BASE}/sapm-{slug}/*.md",
    ]
    for pat in patterns:
        matches = glob.glob(pat)
        matches = [m for m in matches if 'CLAUDE' not in m and 'README' not in m]
        if matches:
            return matches[0]
    return None


def generate_summary(slug, paper_path, client):
    """Read paper and generate summary via Gemini."""
    response = None
    try:
        with open(paper_path, 'r') as f:
            paper_text = f.read()

        # Truncate if extremely long
        if len(paper_text) > 500000:
            paper_text = paper_text[:500000]

        word_count = len(paper_text.split())
        prompt = build_prompt(word_count) + paper_text

        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.3,
                max_output_tokens=65536,
                response_mime_type="application/json",
            )
        )

        text = response.text
        # Use json_repair to handle unescaped quotes and other LLM JSON issues
        repaired = repair_json(text, return_objects=False)
        data = json.loads(repaired)
        if isinstance(data, list):
            # Sometimes returns a list with one dict
            data = data[0] if data and isinstance(data[0], dict) else {"_raw": str(data)[:200]}
        data["slug"] = slug
        data["_source"] = paper_path
        data["_generated"] = time.strftime("%Y-%m-%d %H:%M:%S")
        data["_wordCount"] = len(text.split())
        data["_sourceWordCount"] = word_count
        data["_targetWordCount"] = max(5000, int(word_count * 0.40))

        return slug, data, None

    except Exception as e:
        # Save raw for debugging
        if response and hasattr(response, 'text') and response.text:
            raw_path = os.path.join(OUTPUT_DIR, f"{slug}_raw.txt")
            os.makedirs(OUTPUT_DIR, exist_ok=True)
            with open(raw_path, 'w') as f:
                f.write(response.text)
        return slug, None, str(e)[:200]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", help="Process single slug")
    parser.add_argument("--workers", type=int, default=4, help="Parallel workers")
    parser.add_argument("--skip-existing", action="store_true", help="Skip if output JSON exists")
    args = parser.parse_args()

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    client = genai.Client(api_key=API_KEY)

    # Build paper inventory
    papers = {}
    for d in sorted(os.listdir(BASE)):
        if d.startswith("sapm-") and not d.startswith("sapm-mc-") and d != "sapm-dashboards":
            slug = d.replace("sapm-", "")
            path = find_paper(slug)
            if path:
                papers[slug] = path

    if args.slug:
        if args.slug not in papers:
            print(f"ERROR: No paper found for slug '{args.slug}'")
            sys.exit(1)
        papers = {args.slug: papers[args.slug]}

    print(f"Found {len(papers)} papers")

    # Filter out existing if requested
    if args.skip_existing:
        filtered = {}
        for slug, path in papers.items():
            out = os.path.join(OUTPUT_DIR, f"{slug}.json")
            if not os.path.exists(out):
                filtered[slug] = path
            else:
                print(f"  SKIP {slug}: output exists")
        papers = filtered
        print(f"  {len(papers)} remaining after skip")

    if not papers:
        print("Nothing to process.")
        return

    print(f"Processing {len(papers)} papers with {args.workers} workers")

    results = {"ok": 0, "fail": 0, "fixed": 0}

    def process(slug_path):
        slug, path = slug_path
        size_kb = os.path.getsize(path) // 1024
        wc = len(open(path).read().split())
        target = max(5000, int(wc * 0.40))
        print(f"  START {slug} ({size_kb}KB, {wc} words -> target {target})")
        slug, data, error = generate_summary(slug, path, client)
        if error:
            print(f"  FAIL  {slug}: {error[:120]}")
            results["fail"] += 1
            return

        if data.get("_fixed"):
            results["fixed"] += 1

        # Write output
        out_path = os.path.join(OUTPUT_DIR, f"{slug}.json")
        with open(out_path, 'w') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        actual_wc = data.get("_wordCount", 0)
        ratio = actual_wc / wc * 100 if wc else 0
        fixed_tag = " [FIXED]" if data.get("_fixed") else ""
        print(f"  OK    {slug}: {actual_wc} words ({ratio:.0f}% of source){fixed_tag}")
        results["ok"] += 1

    # Process with ThreadPoolExecutor
    items = list(papers.items())
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = [pool.submit(process, item) for item in items]
        for f in as_completed(futures):
            try:
                f.result()
            except Exception as e:
                print(f"  EXCEPTION: {e}")
                results["fail"] += 1

    print(f"\nDone: {results['ok']} ok ({results['fixed']} fixed), {results['fail']} failed")
    print(f"Output: {OUTPUT_DIR}/")


if __name__ == "__main__":
    main()
