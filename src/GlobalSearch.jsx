"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { buildPaperList } from "./paperData";
import { CHAPTERS } from "./curriculumData";

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const GOLD = "#F59E0B";
const MUTED = "#C8C8C8";
const DIM = "#C8C8C8";
const TEXT = "#F5F0E8";
const BORDER = "rgba(255,255,255,0.1)";

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const papers = useMemo(() => buildPaperList(), []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const out = [];

    // Papers
    papers.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) ||
          (p.theoremName && p.theoremName.toLowerCase().includes(q))) {
        out.push({ type: "Paper", label: p.name, sublabel: p.beta ? `βW = ${p.beta}` : p.theoremType, href: `/papers/${p.slug}/` });
      }
    });

    // Chapters
    CHAPTERS.forEach(ch => {
      if (ch.title.toLowerCase().includes(q) || ch.slug.includes(q)) {
        out.push({ type: "Chapter", label: `Ch. ${ch.id}: ${ch.title}`, sublabel: ch.time, href: `/curriculum/${ch.slug}/` });
      }
    });

    // Static pages
    const statics = [
      { label: "Curriculum", href: "/curriculum/", keywords: "curriculum learn chapters course" },
      { label: "Paper Summaries", href: "/summaries/", keywords: "papers summaries browse all" },
      { label: "Domain Tables", href: "/tables/", keywords: "tables rankings beta domains" },
      { label: "PolicyLab", href: "/policylab/", keywords: "policy countries reform agents" },
      { label: "Reform Pathfinder", href: "/reform-pathfinder/", keywords: "reform pathfinder countries sectors axioms" },
      { label: "Executive Brief", href: "/executive/", keywords: "executive corporate exposure hollow win audit" },
      { label: "Academic Hub", href: "/academic/", keywords: "academic propositions falsification theorems" },
      { label: "Impossibility Canon", href: "/impossibility/", keywords: "impossibility intractability theorems canon" },
      { label: "About the Author", href: "/about/", keywords: "erik postnieks author cornell tuck" },
    ];
    statics.forEach(s => {
      if (s.label.toLowerCase().includes(q) || s.keywords.includes(q)) {
        out.push({ type: "Page", label: s.label, sublabel: "", href: s.href });
      }
    });

    return out.slice(0, 12);
  }, [query, papers]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        style={{
          fontFamily: M, fontSize: 11, color: MUTED, background: "transparent",
          border: `1px solid ${BORDER}`, borderRadius: 4, padding: "6px 12px",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%",
        }}
      >
        <span style={{ fontSize: 13 }}>⌕</span>
        <span>Search...</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>⌘K</span>
      </button>
    );
  }

  return (
    <>
      <div onClick={() => { setOpen(false); setQuery(""); }} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 2000,
      }} />
      <div style={{
        position: "fixed", top: "15%", left: "50%", transform: "translateX(-50%)",
        width: "min(560px, 90vw)", background: "#111", border: `1px solid ${BORDER}`,
        borderRadius: 8, zIndex: 2001, boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
        overflow: "hidden",
      }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${BORDER}` }}>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search papers, chapters, tools..."
            aria-label="Search"
            style={{
              width: "100%", fontFamily: M, fontSize: 15, color: TEXT,
              background: "transparent", border: "none", outline: "none",
            }}
          />
        </div>
        {results.length > 0 && (
          <div style={{ maxHeight: 400, overflowY: "auto" }}>
            {results.map((r, i) => (
              <a key={i} href={r.href} onClick={() => { setOpen(false); setQuery(""); }} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 20px",
                textDecoration: "none", borderBottom: `1px solid rgba(255,255,255,0.04)`,
                background: "transparent", cursor: "pointer",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 1, width: 50, flexShrink: 0 }}>
                  {r.type.toUpperCase()}
                </span>
                <span style={{ fontFamily: S, fontSize: 15, color: TEXT, flex: 1 }}>{r.label}</span>
                {r.sublabel && <span style={{ fontFamily: M, fontSize: 11, color: MUTED }}>{r.sublabel}</span>}
              </a>
            ))}
          </div>
        )}
        {query.trim() && results.length === 0 && (
          <div style={{ padding: "24px 20px", fontFamily: S, fontSize: 15, color: MUTED, textAlign: "center" }}>
            No results for "{query}"
          </div>
        )}
      </div>
    </>
  );
}
