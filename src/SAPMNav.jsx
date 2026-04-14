"use client";
import { useState } from "react";

// ══════════════════════════════════════════════════════════════
// System Asset Pricing Model NAV — All 61 Domain Dashboards + Framework Papers
// βW values from CLAUDE.md canonical table (2026-04-12, revenue-basis)
// ══════════════════════════════════════════════════════════════

const SITES = [
  // ─── Hub Sites ─────────────────────────────────────────────
  { title: "Program Hub (Private Pareto Theorem)", url: "https://ppt-companion.vercel.app", beta: null, highlight: true, section: "hub" },
  { title: "C-Adjusted GDP", url: "https://c-adjusted-gdp.vercel.app", beta: null, highlight: true, section: "hub" },
  { title: "Hollow Win Theorem", url: "https://hw-companion.vercel.app", beta: null, section: "hub" },

  // ─── 61 Domain Papers (βW descending) ─────────────────────
  { title: "Firearms", beta: 50.99, slug: "firearms", type: "intract" },
  { title: "Cybercrime & Ransomware", beta: 31.10, slug: "cybercrime", type: "intract" },
  { title: "Human Trafficking", beta: 22.62, slug: "human-trafficking", type: "intract" },
  { title: "Weapons of Mass Destruction", beta: 21.92, slug: "wmd", type: "imposs" },
  { title: "Child Labor", beta: 21.83, slug: "child-labor", type: "intract" },
  { title: "Opioid Ecosystem", beta: 14.96, slug: "opioids", type: "intract" },
  { title: "Conflict Minerals", beta: 12.60, slug: "conflict-minerals", type: "intract" },
  { title: "Private Prisons", beta: 12.08, slug: "private-prisons", type: "intract" },
  { title: "Credit Rating Agencies", beta: 11.21, slug: "credit-rating", type: "intract" },
  { title: "Mining & Rare Earth", beta: 11.15, slug: "mining-rare-earth", type: "imposs" },
  { title: "Big Tech (legacy)", beta: 7.81, slug: "big-tech", type: "intract" },
  { title: "Commercial Real Estate", beta: 7.78, slug: "commercial-real-estate", type: "intract" },
  { title: "Frontier AI", beta: 7.51, slug: "frontier-ai", type: "intract" },
  { title: "Industrial Ag Methane", beta: 7.36, slug: "industrial-ag-methane", type: "imposs" },
  { title: "Monoculture / Crop Diversity", beta: 7.36, slug: "monoculture", type: "imposs" },
  { title: "Gambling & Casinos", beta: 7.30, slug: "gambling", type: "intract" },
  { title: "Deforestation & Logging", beta: 7.21, slug: "deforestation", type: "imposs" },
  { title: "Illicit Drug Trade", beta: 7.16, slug: "illicit-drugs", type: "intract" },
  { title: "Payday Lending", beta: 7.08, slug: "payday-lending", type: "intract" },
  { title: "Fast Fashion", beta: 7.01, slug: "fast-fashion", type: "imposs" },
  { title: "Coal", beta: 6.95, slug: "coal", type: "imposs" },
  { title: "Deep-Sea Mining", beta: 6.90, slug: "deep-sea-mining", type: "imposs" },
  { title: "Cement & Concrete", beta: 6.74, slug: "cement", type: "imposs" },
  { title: "Plastics", beta: 6.67, slug: "plastics", type: "imposs" },
  { title: "E-Waste Export", beta: 6.59, slug: "ewaste", type: "intract" },
  { title: "Tobacco", beta: 6.50, slug: "tobacco", type: "intract" },
  { title: "Student Loan Securitization", beta: 6.36, slug: "student-loans", type: "intract" },
  { title: "Pharmacy Benefit Mgmt", beta: 6.35, slug: "pbm", type: "intract" },
  { title: "Platform Monopoly", beta: 6.33, slug: "platform-monopoly", type: "intract" },
  { title: "Palm Oil", beta: 6.30, slug: "palm-oil", type: "imposs" },
  { title: "Tax Havens", beta: 6.27, slug: "tax-havens", type: "intract" },
  { title: "Persistent Organic Pollutants", beta: 6.23, slug: "pops", type: "imposs" },
  { title: "Data Brokerage", beta: 6.13, slug: "data-brokerage", type: "intract" },
  { title: "Antimicrobial Resistance", beta: 5.84, slug: "amr", type: "imposs" },
  { title: "Social Media / Youth MH", beta: 5.79, slug: "social-media", type: "imposs" },
  { title: "Gene Drives", beta: 5.77, slug: "gene-drives", type: "imposs" },
  { title: "Water Privatization", beta: 5.61, slug: "water-privatization", type: "intract" },
  { title: "Algorithmic Pricing", beta: 5.38, slug: "algorithmic-pricing", type: "intract" },
  { title: "Forever Chemicals (PFAS)", beta: 5.31, slug: "pfas", type: "imposs" },
  { title: "Private Equity Healthcare", beta: 5.24, slug: "pe-healthcare", type: "intract" },
  { title: "Benchmark Rate / FX Fixing", beta: 5.13, slug: "fx-fixing", type: "intract" },
  { title: "Bitcoin / Proof-of-Work", beta: 5.00, slug: "bitcoin", type: "intract" },
  { title: "Aviation Emissions", beta: 4.97, slug: "aviation", type: "imposs" },
  { title: "Defense Procurement", beta: 4.88, slug: "defense-procurement", type: "intract" },
  { title: "Orbital Debris", beta: 4.82, slug: "orbital-debris", type: "imposs" },
  { title: "Fisheries / Coral", beta: 4.70, slug: "fisheries", type: "intract" },
  { title: "Sovereign Debt", beta: 4.67, slug: "sovereign-debt", type: "intract" },
  { title: "Insurance & Climate Risk", beta: 4.57, slug: "insurance-climate", type: "intract" },
  { title: "Topsoil Erosion", beta: 4.41, slug: "topsoil", type: "imposs" },
  { title: "Ultra-Processed Food", beta: 4.06, slug: "upf", type: "intract" },
  { title: "Groundwater (Ogallala)", beta: 3.46, slug: "groundwater", type: "imposs" },
  { title: "Proof-of-Stake", beta: 3.14, slug: "proof-of-stake", type: "intract" },
  { title: "Nuclear Power", beta: 2.94, slug: "nuclear", type: "imposs" },
  { title: "Arms Exports", beta: 2.54, slug: "arms-exports", type: "intract" },
  { title: "Stablecoins / Shadow Banking", beta: 2.53, slug: "stablecoins", type: "intract" },
  { title: "Private Military", beta: 2.06, slug: "private-military", type: "intract" },
  { title: "Oil & Gas", beta: 1.63, slug: "oil-gas", type: "imposs" },
  { title: "Shipping & Maritime", beta: 1.34, slug: "shipping", type: "intract" },
  { title: "Alcohol", beta: 1.33, slug: "alcohol", type: "intract" },
  { title: "Factory Farming", beta: 1.02, slug: "factory-farming", type: "imposs" },
  { title: "Gig Economy", beta: 0.76, slug: "gig-economy", type: "intract" },
];

const bc = (b) => {
  if (b === null) return "#667";
  if (b >= 10) return "#DC2626";
  if (b >= 6) return "#E85D3A";
  if (b >= 4) return "#F59E0B";
  if (b >= 2) return "#D97706";
  return "#059669";
};

const typeBadge = (t) => {
  if (t === "imposs") return { label: "I", color: "#EF4444", bg: "rgba(239,68,68,0.12)" };
  if (t === "intract") return { label: "T", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" };
  return null;
};

export default function SAPMNav() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all"); // "all" | "imposs" | "intract"

  const filtered = SITES.filter(s => {
    if (s.section === "hub") return true;
    if (filter === "all") return true;
    return s.type === filter;
  });

  const hubs = filtered.filter(s => s.section === "hub");
  const domains = filtered.filter(s => !s.section);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 9999,
          width: 48, height: 48, borderRadius: "50%",
          background: open ? "#F59E0B" : "rgba(245,158,11,0.15)",
          border: "1px solid rgba(245,158,11,0.3)",
          color: open ? "#0A0A0F" : "#F59E0B",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s", letterSpacing: 1,
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#F59E0B"; e.currentTarget.style.color = "#0A0A0F"; }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.background = "rgba(245,158,11,0.15)"; e.currentTarget.style.color = "#F59E0B"; }}}
      >
        {open ? "\u2715" : "\u2261"}
      </button>

      {open && (
        <div style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: 380, zIndex: 9998,
          background: "#0A0A0F", borderLeft: "1px solid rgba(245,158,11,0.15)",
          overflowY: "auto", boxShadow: "-8px 0 40px rgba(0,0,0,0.6)",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}>
          {/* Header */}
          <div style={{ padding: "24px 20px 12px" }}>
            <div style={{ fontSize: 10, color: "#F59E0B", letterSpacing: 3, marginBottom: 8 }}>System Asset Pricing Model PROGRAM</div>
            <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 18, color: "rgba(255,255,255,0.9)", fontWeight: 300 }}>
              61 Domains · 62 Theorems
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>
              Erik Postnieks · 2026
            </div>
          </div>

          {/* Filter */}
          <div style={{ padding: "4px 20px 12px", display: "flex", gap: 6 }}>
            {[
              { id: "all", label: "ALL (61)" },
              { id: "imposs", label: "IMPOSSIBILITY (22)", color: "#EF4444" },
              { id: "intract", label: "INTRACTABILITY (39)", color: "#F59E0B" },
            ].map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 1,
                padding: "3px 8px", border: `1px solid ${filter === f.id ? (f.color || "#F59E0B") : "rgba(255,255,255,0.1)"}`,
                background: filter === f.id ? `${(f.color || "#F59E0B")}15` : "transparent",
                color: filter === f.id ? (f.color || "#F59E0B") : "rgba(255,255,255,0.3)",
                borderRadius: 3, cursor: "pointer",
              }}>{f.label}</button>
            ))}
          </div>

          {/* Hub links */}
          <div style={{ padding: "4px 0" }}>
            {hubs.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 20px", textDecoration: "none",
                  borderLeft: "3px solid #F59E0B",
                  background: "rgba(245,158,11,0.04)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(245,158,11,0.04)"}
              >
                <span style={{ width: 44, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#F59E0B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {s.title}
                </span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ padding: "0 20px", margin: "4px 0 4px" }}>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>

          {/* Domain links */}
          <div style={{ padding: "4px 0" }}>
            {domains.map((s, i) => {
              const badge = typeBadge(s.type);
              const paperUrl = `/papers/${s.slug}`;
              return (
                <a key={i} href={paperUrl}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "5px 20px", textDecoration: "none",
                    borderLeft: "3px solid transparent",
                    transition: "background 0.15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* Rank */}
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", width: 18, flexShrink: 0, textAlign: "right" }}>
                    {i + 1}
                  </span>
                  {/* βW */}
                  <span style={{ fontSize: 10, color: bc(s.beta), width: 38, flexShrink: 0, textAlign: "right", fontWeight: 600 }}>
                    {s.beta}
                  </span>
                  {/* Type badge */}
                  {badge && (
                    <span style={{
                      fontSize: 8, color: badge.color, background: badge.bg,
                      padding: "1px 4px", borderRadius: 2, fontWeight: 700, flexShrink: 0,
                    }}>
                      {badge.label}
                    </span>
                  )}
                  {/* Title */}
                  <span style={{
                    fontSize: 10, color: "rgba(255,255,255,0.6)",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {s.title}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
              {"\u00A9"} 2026 Erik Postnieks
            </div>
          </div>
        </div>
      )}

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", top: 0, left: 0, right: 380, bottom: 0,
            background: "rgba(0,0,0,0.3)", zIndex: 9997,
          }}
        />
      )}
    </>
  );
}
