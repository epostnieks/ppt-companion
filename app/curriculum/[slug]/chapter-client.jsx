"use client";
import { useMemo } from "react";
import { CHAPTERS } from "../../../src/curriculumData";

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const BG = "#0D0D0D";
const TEXT = "#F5F0E8";
const GOLD = "#F59E0B";
const MUTED = "rgba(255,255,255,0.35)";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "rgba(255,255,255,0.55)";

export default function ChapterPage({ slug }) {
  const chapter = useMemo(() => CHAPTERS.find(c => c.slug === slug), [slug]);
  const chIdx = chapter ? CHAPTERS.indexOf(chapter) : -1;
  const prev = chIdx > 0 ? CHAPTERS[chIdx - 1] : null;
  const next = chIdx < CHAPTERS.length - 1 ? CHAPTERS[chIdx + 1] : null;

  if (!chapter) {
    return (
      <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px 80px" }}>
          <h1 style={{ fontFamily: S, fontSize: 28, fontWeight: 300, color: TEXT }}>Chapter not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>
        {/* Breadcrumb */}
        <div style={{ paddingTop: 72, marginBottom: 16 }}>
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED }}>
            <a href="/curriculum/" style={{ color: GOLD, textDecoration: "none" }}>Curriculum</a>
            <span style={{ margin: "0 8px" }}>/</span>
            <span>Chapter {chapter.id}</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 8 }}>
            CHAPTER {chapter.id} OF {CHAPTERS.length}
          </div>
          <h1 style={{ fontFamily: S, fontSize: 32, fontWeight: 300, color: TEXT, margin: "0 0 12px", lineHeight: 1.3 }}>
            {chapter.title}
          </h1>
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED }}>
            {chapter.time === "reference" ? "Reference material" : `Estimated reading time: ${chapter.time}`}
          </div>
        </div>

        {/* Content placeholder — links to full curriculum */}
        <div style={{
          padding: "32px 24px", background: "rgba(245,158,11,0.04)",
          border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 6, marginBottom: 32,
        }}>
          <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.8 }}>
            This chapter is part of the interactive System Asset Pricing Model Curriculum.
            For the full experience with charts, glossary tooltips, and progressive navigation,{" "}
            <a href={`/curriculum/#ch${chapter.id}`} style={{ color: GOLD, textDecoration: "none" }}>
              open Chapter {chapter.id} in the full curriculum
            </a>.
          </div>
        </div>

        {/* Chapter navigation */}
        <div style={{
          display: "flex", justifyContent: "space-between", gap: 16,
          paddingTop: 24, borderTop: `1px solid ${BORDER}`,
        }}>
          {prev ? (
            <a href={`/curriculum/${prev.slug}/`} style={{
              fontFamily: M, fontSize: 11, color: DIM, textDecoration: "none",
              padding: "10px 16px", border: `1px solid ${BORDER}`, borderRadius: 4,
              flex: 1, maxWidth: "45%",
            }}>
              <div style={{ color: MUTED, fontSize: 10, marginBottom: 4 }}>{"\u2190"} PREVIOUS</div>
              <div style={{ color: TEXT }}>Ch. {prev.id}: {prev.title}</div>
            </a>
          ) : <div />}
          {next ? (
            <a href={`/curriculum/${next.slug}/`} style={{
              fontFamily: M, fontSize: 11, color: DIM, textDecoration: "none",
              padding: "10px 16px", border: `1px solid ${BORDER}`, borderRadius: 4,
              flex: 1, maxWidth: "45%", textAlign: "right",
            }}>
              <div style={{ color: MUTED, fontSize: 10, marginBottom: 4 }}>NEXT {"\u2192"}</div>
              <div style={{ color: TEXT }}>Ch. {next.id}: {next.title}</div>
            </a>
          ) : <div />}
        </div>

        {/* Footer */}
        <div style={{ padding: "32px 0", borderTop: `1px solid ${BORDER}`, textAlign: "center", marginTop: 24 }}>
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED }}>
            {"\u00A9"} 2026 Erik Postnieks {"\u00B7"} Independent Researcher {"\u00B7"} Salt Lake City
          </div>
        </div>
      </main>
    </div>
  );
}
