"use client";
import { useMemo } from "react";
import { COUNTRIES, AXIOMS } from "../../../src/pstBreakerData";

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const BG = "#0D0D0D";
const SURFACE = "#1A1A1A";
const TEXT = "#F5F0E8";
const GOLD = "#F59E0B";
const RED = "#EF4444";
const GREEN = "#22C55E";
const MUTED = "rgba(255,255,255,0.35)";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "rgba(255,255,255,0.55)";

function AxiomDot({ holds }) {
  return (
    <span style={{
      display: "inline-block", width: 10, height: 10, borderRadius: "50%",
      background: holds ? RED : GREEN, marginRight: 4,
    }} />
  );
}

export default function CountryPage({ code }) {
  const country = useMemo(() => COUNTRIES.find(c => c.code.toLowerCase() === code), [code]);

  if (!country) {
    return (
      <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px 80px" }}>
          <h1 style={{ fontFamily: S, fontSize: 28, fontWeight: 300 }}>Country not found</h1>
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
            <a href="/pst-breaker/" style={{ color: GOLD, textDecoration: "none" }}>Reform Pathfinder</a>
            <span style={{ margin: "0 8px" }}>/</span>
            <span>{country.name}</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 8 }}>
            {country.region?.toUpperCase()}
          </div>
          <h1 style={{ fontFamily: S, fontSize: 32, fontWeight: 300, color: TEXT, margin: "0 0 12px", lineHeight: 1.3 }}>
            {country.name}
          </h1>
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED }}>
            {country.sectors?.length || 0} sectors mapped {"\u00B7"} Code: {country.code}
          </div>
        </div>

        {/* Summary */}
        {country.summary && (
          <div style={{
            fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.8,
            marginBottom: 32, paddingBottom: 24, borderBottom: `1px solid ${BORDER}`,
          }}>
            {country.summary}
          </div>
        )}

        {/* Sectors */}
        <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 16 }}>
          SECTORS ({country.sectors?.length || 0})
        </div>
        {country.sectors?.map((sector, i) => (
          <div key={i} style={{
            background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 6,
            padding: "16px 20px", marginBottom: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontFamily: M, fontSize: 13, color: TEXT, fontWeight: 600 }}>
                {sector.name}
              </div>
              {sector.beta != null && (
                <div style={{ fontFamily: M, fontSize: 12, color: sector.beta >= 10 ? RED : GOLD, fontWeight: 700 }}>
                  {"\u03B2"}W = {sector.beta}
                </div>
              )}
            </div>

            {/* Axiom status */}
            <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
              {AXIOMS.map((ax, j) => (
                <div key={j} style={{ fontFamily: M, fontSize: 10, color: MUTED, display: "flex", alignItems: "center", gap: 4 }}>
                  <AxiomDot holds={sector.pst?.[j]} />
                  {ax.short}
                </div>
              ))}
            </div>

            {/* Most breakable */}
            {sector.whyBreakable && (
              <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.6, marginBottom: 8 }}>
                <span style={{ fontFamily: M, fontSize: 10, color: GREEN, marginRight: 6 }}>MOST BREAKABLE:</span>
                {sector.whyBreakable}
              </div>
            )}

            {/* Actor count */}
            {sector.actors && (
              <div style={{ fontFamily: M, fontSize: 10, color: MUTED, marginTop: 8 }}>
                {sector.actors.length} agent pathways mapped
              </div>
            )}
          </div>
        ))}

        {/* Links to tools */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24,
        }}>
          <a href="/pst-breaker/" style={{
            padding: "20px", textAlign: "center", textDecoration: "none",
            background: "rgba(245,158,11,0.04)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 6,
          }}>
            <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>REFORM PATHFINDER</div>
            <div style={{ fontFamily: S, fontSize: 14, color: DIM }}>
              Agent-level actions and institutional infrastructure for {country.name}
            </div>
          </a>
          <a href="/policylab/" style={{
            padding: "20px", textAlign: "center", textDecoration: "none",
            background: "rgba(34,197,94,0.04)", border: `1px solid rgba(34,197,94,0.15)`, borderRadius: 6,
          }}>
            <div style={{ fontFamily: M, fontSize: 11, color: GREEN, letterSpacing: 1, marginBottom: 6 }}>POLICYLAB</div>
            <div style={{ fontFamily: S, fontSize: 14, color: DIM }}>
              Detailed policy options across 61 domains for {country.name}
            </div>
          </a>
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
