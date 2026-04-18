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
Generate Gemini summaries for the 4 papers that lack dedicated source markdown.
Feeds actual DA papers + framework papers as context.
"""

import os, json, time, glob
from concurrent.futures import ThreadPoolExecutor, as_completed
from google import genai
from google.genai import types
from json_repair import repair_json

API_KEY = _load_gemini_key()
MODEL = "gemini-2.5-flash"
BASE = "/Users/erikpostnieks/Projects"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "paperData")

PROMPT_TEMPLATE = """You are generating a comprehensive web summary for a public-facing companion website. The website needs extensive text content for SEO purposes.

READ THE CONTEXT BELOW, then generate a structured JSON summary for the paper described. Write in a direct, declarative voice — prosecutorial tone, concrete before abstract. Every claim must be traceable to the source material.

IMPORTANT: Do NOT use abbreviations. Spell out every acronym in full. Include HTML tables wherever data supports it (border-collapse: collapse, 1px solid #ddd borders, 8px padding).

The total output should be approximately {target} words.

Return valid JSON with this exact structure:

{{
  "slug": "{slug}",
  "title": "{title}",
  "theoremName": "{theorem_name}",
  "theoremType": "{theorem_type}",
  "epigraph": "<a provocative one-sentence quote capturing the core tension>",
  "executiveSummary": "<2,000 words with HTML table of key metrics>",
  "keyFindings": ["<200-300 words each, at least 8 findings>"],
  "theorem": {{
    "formal": "<500 words formal statement>",
    "plain": "<500 words plain language explanation>",
    "axioms": [{{"id": "A1", "name": "<name>", "statement": "<statement>", "evidence": "<evidence>"}}],
    "proofSketch": "<1,000 words step-by-step proof walkthrough>"
  }},
  "welfareAnalysis": {welfare_note},
  "caseStudies": [{{"title": "<title>", "content": "<500 words>"}}],
  "policyAnalysis": {{
    "currentFramework": "<1,000 words>",
    "failures": "<1,000 words>",
    "reform": "<1,000 words>"
  }},
  "agents": {{
    "insider": "<800 words>",
    "plaintiff": "<800 words>",
    "regulator": "<800 words>",
    "legislator": "<800 words>",
    "investor": "<800 words>",
    "supranational": "<800 words>"
  }},
  "crossDomainConnections": [{{"domain": "<domain>", "connection": "<300 words>"}}],
  "faq": [{{"q": "<question>", "a": "<400 words>"}}],
  "methodology": "<1,500 words>",
  "timeline": [{{"year": "<year>", "event": "<event>", "significance": "<significance>"}}],
  "literatureContext": "<1,500 words>"
}}

RULES:
1. Every number must come from the source material. Do not fabricate.
2. Prosecutorial voice. No hedging.
3. If data unavailable, say "Data not available in source paper" — don't invent.
4. Include HTML tables. No markdown bold.
5. Write approximately {target} words total.

{special_instructions}

SOURCE MATERIAL:
"""

# Paper configs with source files and special instructions
PAPERS = [
    {
        "slug": "ot-da-chapter1",
        "title": "Domain Analysis Chapter 1: Channel Decomposition Methodology and Monte Carlo Protocol",
        "theorem_name": "Channel Decomposition Methodology",
        "theorem_type": "Methodology",
        "target": 7000,
        "welfare_note": '"Not applicable — methodology paper. Describe the methodology for computing welfare analysis across all 61 domains."',
        "special_instructions": "This is the METHODOLOGY chapter that establishes the analytical foundation for all 61 domain papers. Focus on: channel decomposition (mutual exclusivity, collective exhaustiveness), Monte Carlo protocol (N=10,000, seed=42, triangular/log-normal distributions), βW computation standards (revenue as denominator, NEVER profit), distribution robustness testing (3+ distribution types), cross-channel correlation handling, and the iron law corrections (firearms, alcohol, cybercrime, monoculture, factory farming). Extract all methodological details from the DA papers below.",
        "sources": [
            f"{BASE}/sapm-decision-accounting/paper/da-1/da1-current.md",
            f"{BASE}/sapm-decision-accounting/paper/da-4/da4-current.md",
        ]
    },
    {
        "slug": "ot-da-chapter5",
        "title": "Domain Analysis Chapter 5: Cross-Domain Patterns in System Beta",
        "theorem_name": "Cross-Domain Structural Patterns",
        "theorem_type": "Methodology",
        "target": 7000,
        "welfare_note": '"Not applicable — cross-domain analysis chapter. Contains aggregate welfare statistics across all 61 domains."',
        "special_instructions": "This is the CROSS-DOMAIN ANALYSIS chapter comparing all 61 βW estimates. Focus on: the full range (0.76 gig economy to 50.99 firearms), the impossibility vs intractability divide (22 impossibility, 39 intractability), the revenue-scale inverse pattern (larger revenue = lower βW), geographic concentration (12 of top 20 in US), aggregate welfare cost (~$80 trillion), and cross-domain amplification loops. Use the βW rankings from the source material.",
        "sources": [
            f"{BASE}/sapm-decision-accounting/paper/da-1/da1-current.md",
            f"{BASE}/sapm-decision-accounting/paper/da-2/da2-current.md",
        ]
    },
    {
        "slug": "ot-da-chapter9",
        "title": "Domain Analysis Chapter 9: The Six-Agent Conflictoring Architecture",
        "theorem_name": "Multi-Agent Activation Threshold",
        "theorem_type": "Methodology",
        "target": 7000,
        "welfare_note": '"Not applicable — agent architecture chapter."',
        "special_instructions": "This is the AGENT ARCHITECTURE chapter defining the six-agent Conflictoring protocol. The six agents are: Whistleblower (breaks information asymmetry), Plaintiff (monetizes liability), Regulator (redesigns the game), Legislator (changes the law), Investor (reprices capital), Supranational (coordinates jurisdictions). Focus on: the multi-agent activation threshold k* (typically 3-4), when each agent is most effective, coordination mechanisms, and domain-specific examples. Extract agent-related content from the DA papers.",
        "sources": [
            f"{BASE}/sapm-decision-accounting/paper/da-3/da3-current.md",
            f"{BASE}/sapm-decision-accounting/paper/da-1/da1-current.md",
        ]
    },
    {
        "slug": "ppt",
        "title": "The Private Pareto Theorem: Why Rational Bilateral Agreements Systematically Destroy Shared Resources",
        "theorem_name": "The Private Pareto Theorem",
        "theorem_type": "Foundational",
        "target": 10000,
        "welfare_note": '"Aggregate across 61 domains: βW range [0.76, 50.99], total ΔW ~$80 trillion/year. The PPT itself does not have a single-domain welfare analysis — it is the foundational theorem that all 61 domain analyses implement."',
        "special_instructions": "This is the FOUNDATIONAL paper — the Private Pareto Theorem. Three axioms: Bilateral Completeness, System Exclusion, Enforceable Agreement. The theorem proves bilateral optimization generically destroys system welfare. Eight-outcome taxonomy (Hollow Win most common). Five structural laws: Reform Dividend, Fiscal Capture, Substitution Trap, Disclosure Futility, Postnieks's Law. System beta βW = -dW/dΠ. 61 domain calibrations. C-Adjusted GDP. This is the paper that everything else derives from. Make it comprehensive and authoritative.",
        "sources": [
            f"{BASE}/sapm-decision-accounting/paper/da-1/da1-current.md",
            f"{BASE}/sapm-decision-accounting/paper/da-2/da2-current.md",
            f"{BASE}/sapm-decision-accounting/paper/da-3/da3-current.md",
        ]
    },
]


def generate_one(paper_config, client):
    slug = paper_config["slug"]
    try:
        # Read all source files
        source_text = ""
        for src in paper_config["sources"]:
            matches = glob.glob(src)
            for m in matches:
                with open(m, 'r') as f:
                    content = f.read()
                    # Truncate each source to 200K chars
                    if len(content) > 200000:
                        content = content[:200000]
                    source_text += f"\n\n--- SOURCE: {os.path.basename(m)} ---\n\n{content}"

        prompt = PROMPT_TEMPLATE.format(**paper_config) + source_text

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
        repaired = repair_json(text, return_objects=False)
        data = json.loads(repaired)
        if isinstance(data, list):
            data = data[0] if data and isinstance(data[0], dict) else {"_raw": str(data)[:200]}

        data["slug"] = slug
        data["_source"] = ", ".join(paper_config["sources"])
        data["_generated"] = time.strftime("%Y-%m-%d %H:%M:%S")
        data["_wordCount"] = len(text.split())
        data["_sourceWordCount"] = len(source_text.split())

        out_path = os.path.join(OUTPUT_DIR, f"{slug}.json")
        with open(out_path, 'w') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        return slug, len(data.get("keyFindings", [])), None

    except Exception as e:
        return slug, 0, str(e)


def main():
    client = genai.Client(api_key=API_KEY)
    print(f"Generating {len(PAPERS)} missing paper summaries via Gemini 2.5 Flash...")

    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = {executor.submit(generate_one, p, client): p["slug"] for p in PAPERS}
        for future in as_completed(futures):
            slug = futures[future]
            slug_out, findings, err = future.result()
            if err:
                print(f"  ✗ {slug}: {err}")
            else:
                print(f"  ✓ {slug}: {findings} findings")

    print("Done. Now rebuild PPTX and website content.")


if __name__ == "__main__":
    main()
