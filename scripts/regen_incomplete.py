#!/usr/bin/env python3
"""Re-generate the 19 incomplete SAPM paper summaries via Gemini."""

import os, sys, json, glob, time
from concurrent.futures import ThreadPoolExecutor, as_completed

# Import the existing generate_summaries module
sys.path.insert(0, os.path.dirname(__file__))
from generate_summaries import find_paper, generate_summary, OUTPUT_DIR, API_KEY

from google import genai

INCOMPLETE = [
    "alcohol", "aviation", "credit-rating", "data-brokerage",
    "defense-procurement", "ewaste", "factory-farming", "fast-fashion",
    "firearms", "frontier-ai", "groundwater", "human-trafficking",
    "industrial-ag-methane", "nuclear", "opioids", "pos",
    "private-military", "tax-havens", "upf"
]

def main():
    client = genai.Client(api_key=API_KEY)

    papers = {}
    for slug in INCOMPLETE:
        path = find_paper(slug)
        if path:
            papers[slug] = path
            wc = len(open(path).read().split())
            print(f"  Found {slug}: {wc} words")
        else:
            print(f"  MISSING {slug}: no source file")

    print(f"\nRegenerating {len(papers)} papers with 4 workers...")

    ok = 0
    fail = 0

    def process(slug_path):
        slug, path = slug_path
        wc = len(open(path).read().split())
        target = max(5000, int(wc * 0.40))
        print(f"  START {slug} ({wc} words -> target {target})")
        slug, data, error = generate_summary(slug, path, client)
        if error:
            print(f"  FAIL  {slug}: {error[:120]}")
            return False

        out_path = os.path.join(OUTPUT_DIR, f"{slug}.json")
        with open(out_path, 'w') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        actual_wc = data.get("_wordCount", 0)
        keys = len([k for k in data.keys() if not k.startswith('_')])
        print(f"  OK    {slug}: {actual_wc} words, {keys} keys")
        return True

    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = {executor.submit(process, (s, p)): s for s, p in papers.items()}
        for future in as_completed(futures):
            if future.result():
                ok += 1
            else:
                fail += 1

    print(f"\nDone: {ok} OK, {fail} failed")

if __name__ == "__main__":
    main()
