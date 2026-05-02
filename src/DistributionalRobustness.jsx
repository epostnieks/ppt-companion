"use client";
import { useState } from "react";

// ══════════════════════════════════════════════════════════════
// Private Pareto Theorem §5.9 Distributional Robustness Test
// Tests whether G2 result (βW > 1.0 at 5th percentile in 60/61
// domains) is invariant to the choice of sampling distribution.
// ══════════════════════════════════════════════════════════════

const FONTS = {
  mono: "'JetBrains Mono', monospace",
  serif: "'Newsreader', serif",
  sans: "'Inter', system-ui, sans-serif",
};

const BG = "#0A0A0F";
const SURFACE = "rgba(255,255,255,0.02)";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "#C8C8C8";
const DIM = "#C8C8C8";
const ACCENT = "#F59E0B";
const GREEN = "#22C55E";
const RED = "#DC2626";

// === DATA FROM distributional_robustness.py ===

const DISTRIBUTIONS = ["Uniform", "Triangular", "Log-normal", "Beta(2,5)"];

const KEY_DOMAINS_P5 = [
  { domain: "Nuclear Fission",      uniform: 0.343, triangular: 0.430, lognormal: 0.366, beta25: 0.351 },
  { domain: "Cardano",              uniform: 1.014, triangular: 1.044, lognormal: 1.006, beta25: 1.018 },
  { domain: "Gig Economy",          uniform: 1.153, triangular: 1.263, lognormal: 1.162, beta25: 1.163 },
  { domain: "Pharmacy Benefit Management Rebate",           uniform: 1.445, triangular: 1.534, lognormal: 1.437, beta25: 1.448 },
  { domain: "Ethereum (PoS)",       uniform: 1.806, triangular: 1.949, lognormal: 1.821, beta25: 1.823 },
  { domain: "Bitcoin (PoW)",        uniform: 3.685, triangular: 3.867, lognormal: 3.662, beta25: 3.707 },
  { domain: "Forever Chemicals (PFAS)",                 uniform: 26.044, triangular: 28.215, lognormal: 26.144, beta25: 26.254 },
  { domain: "Weapons of Mass Destruction",    uniform: 100.584, triangular: 112.524, lognormal: 101.900, beta25: 101.988 },
];

const AGGREGATE = [
  { dist: "Uniform",     clear: 60, total: 61, weakest: "Nuclear Fission", weakestP5: 0.343, floor: "Cardano", floorP5: 1.014, meanPgt1: 98.6 },
  { dist: "Triangular",  clear: 60, total: 61, weakest: "Nuclear Fission", weakestP5: 0.430, floor: "Cardano", floorP5: 1.044, meanPgt1: 98.4 },
  { dist: "Log-normal",  clear: 60, total: 61, weakest: "Nuclear Fission", weakestP5: 0.366, floor: "Cardano", floorP5: 1.006, meanPgt1: 98.6 },
  { dist: "Beta(2,5)",   clear: 60, total: 61, weakest: "Nuclear Fission", weakestP5: 0.351, floor: "Cardano", floorP5: 1.018, meanPgt1: 98.4 },
];

const BETA25_STRESS = [
  { domain: "Nuclear Fission",       mean: 0.528, p5: 0.351, p95: 0.766, pgt1: 0.0 },
  { domain: "Cardano",               mean: 1.080, p5: 1.018, p95: 1.162, pgt1: 100.0 },
  { domain: "Gig Economy",           mean: 1.385, p5: 1.163, p95: 1.678, pgt1: 100.0 },
  { domain: "Private Equity RE",     mean: 1.540, p5: 1.273, p95: 1.897, pgt1: 100.0 },
  { domain: "Commercial Real Estate Urban Hollowing",   mean: 1.659, p5: 1.298, p95: 2.134, pgt1: 100.0 },
  { domain: "Algorithmic Trading",   mean: 1.704, p5: 1.394, p95: 2.113, pgt1: 100.0 },
  { domain: "Pharmacy Benefit Management Rebate",            mean: 1.626, p5: 1.448, p95: 1.861, pgt1: 100.0 },
  { domain: "Big Tech Platform",     mean: 2.075, p5: 1.621, p95: 2.664, pgt1: 100.0 },
  { domain: "Secured Overnight Financing Rate (SOFR) Transition",       mean: 2.069, p5: 1.626, p95: 2.652, pgt1: 100.0 },
  { domain: "Student Debt",          mean: 2.074, p5: 1.627, p95: 2.664, pgt1: 100.0 },
  { domain: "AI Training Data",      mean: 2.078, p5: 1.629, p95: 2.683, pgt1: 100.0 },
  { domain: "NFT/Metaverse",         mean: 2.116, p5: 1.713, p95: 2.637, pgt1: 100.0 },
  { domain: "Ethereum (PoS)",        mean: 2.114, p5: 1.823, p95: 2.506, pgt1: 100.0 },
  { domain: "Aviation Offset",       mean: 2.367, p5: 1.925, p95: 2.950, pgt1: 100.0 },
  { domain: "Ad-Tech Surveillance",  mean: 2.484, p5: 1.948, p95: 3.195, pgt1: 100.0 },
  // Strongest 3
  { domain: "ERCOT",                 mean: 33.581, p5: 26.857, p95: 42.542, pgt1: 100.0 },
  { domain: "Orbital Debris",        mean: 62.994, p5: 50.394, p95: 79.859, pgt1: 100.0 },
  { domain: "Weapons of Mass Destruction",     mean: 126.206, p5: 101.988, p95: 158.218, pgt1: 100.0 },
];

const G1_RESULTS = [
  { dist: "Uniform",     r2ols: 0.0352, r2knn: 0.0534, pass: true },
  { dist: "Triangular",  r2ols: 0.0366, r2knn: 0.0548, pass: true },
  { dist: "Log-normal",  r2ols: 0.0333, r2knn: 0.0541, pass: true },
  { dist: "Beta(2,5)",   r2ols: 0.0338, r2knn: 0.0498, pass: true },
];

// === COMPONENTS ===

const Pill = ({ label, color }) => (
  <span style={{
    fontFamily: FONTS.mono, fontSize: 11, letterSpacing: 1,
    padding: "3px 10px", borderRadius: 2,
    background: `${color}15`, color, border: `1px solid ${color}30`,
    textTransform: "uppercase", fontWeight: 600,
  }}>{label}</span>
);

const VerdictBox = ({ value, label, color }) => (
  <div style={{
    textAlign: "center", padding: "20px 16px", borderRadius: 4,
    background: color, minWidth: 130,
  }}>
    <div style={{ fontFamily: FONTS.mono, fontSize: 36, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{value}</div>
    <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 6, letterSpacing: 1 }}>{label}</div>
  </div>
);

const TH = ({ children, width }) => (
  <th style={{
    fontFamily: FONTS.mono, fontSize: 11, color: MUTED, letterSpacing: 1,
    textTransform: "uppercase", padding: "8px 12px", textAlign: "left",
    borderBottom: `1px solid ${BORDER}`, width,
  }}>{children}</th>
);

const TD = ({ children, mono, color, bold }) => (
  <td style={{
    fontFamily: mono ? FONTS.mono : FONTS.serif, fontSize: 13,
    color: color || DIM, padding: "8px 12px",
    borderBottom: `1px solid ${BORDER}`,
    fontWeight: bold ? 600 : 400,
  }}>{children}</td>
);

export default function DistributionalRobustness() {
  const [showAllStress, setShowAllStress] = useState(false);

  const stressData = showAllStress ? BETA25_STRESS : BETA25_STRESS.slice(0, 10);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

      {/* Header */}
      <div style={{ marginTop: 40, marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, letterSpacing: 2, marginBottom: 8 }}>Private Pareto Theorem §5.9</div>
        <h2 style={{ fontFamily: FONTS.serif, fontSize: 28, fontWeight: 400, color: "rgba(255,255,255,0.9)", margin: 0 }}>
          Distributional Robustness Test
        </h2>
        <div style={{ fontFamily: FONTS.serif, fontSize: 15, color: DIM, marginTop: 8, lineHeight: 1.6, fontStyle: "italic" }}>
          Does the market-failure classification survive when we replace the uniform sampling assumption with three alternative distribution families?
        </div>
      </div>

      {/* Verdict strip */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        <VerdictBox value="59" label="MARKET-FAILURE DOMAINS" color="#16A34A" />
        <VerdictBox value="4" label="DISTRIBUTIONS" color="#1F4E79" />
        <VerdictBox value="2.44M" label="TOTAL DRAWS" color="#1F4E79" />
        <VerdictBox value="<0.01" label="MAX R² (G1)" color="#1F4E79" />
      </div>

      {/* Distribution families */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, letterSpacing: 2, marginBottom: 12 }}>DISTRIBUTION FAMILIES TESTED</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { name: "Uniform(lo, hi)", desc: "Current Private Pareto Theorem methodology — equal probability across parameter range", tag: "BASELINE" },
            { name: "Triangular(lo, mode, hi)", desc: "Domain paper standard — mode at published central estimate", tag: "STANDARD" },
            { name: "Log-normal", desc: "Right-skewed, matched to [lo, hi] as 5th/95th percentiles", tag: "SKEWED" },
            { name: "Beta(2, 5) scaled", desc: "Deliberately conservative — mass concentrated near lo", tag: "ADVERSARIAL" },
          ].map((d, i) => (
            <div key={i} style={{
              background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2,
              padding: "14px 18px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{d.name}</span>
                <Pill label={d.tag} color={d.tag === "ADVERSARIAL" ? RED : d.tag === "BASELINE" ? ACCENT : GREEN} />
              </div>
              <div style={{ fontFamily: FONTS.serif, fontSize: 13, color: DIM, lineHeight: 1.5 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* G2: 5th-percentile table */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, letterSpacing: 2, marginBottom: 12 }}>G2 — 5TH-PERCENTILE β<sub style={{ fontSize: 11 }}>W</sub> ACROSS FAMILIES</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <TH width="180">Domain</TH>
                <TH>Uniform</TH>
                <TH>Triangular</TH>
                <TH>Log-normal</TH>
                <TH>Beta(2,5)</TH>
              </tr>
            </thead>
            <tbody>
              {KEY_DOMAINS_P5.map((d, i) => {
                const isException = d.uniform < 1.0;
                return (
                  <tr key={i} style={{ background: isException ? "rgba(220,38,38,0.06)" : "transparent" }}>
                    <TD mono color={isException ? RED : "rgba(255,255,255,0.75)"} bold>{d.domain}</TD>
                    <TD mono color={d.uniform < 1 ? RED : GREEN}>{d.uniform.toFixed(3)}</TD>
                    <TD mono color={d.triangular < 1 ? RED : GREEN}>{d.triangular.toFixed(3)}</TD>
                    <TD mono color={d.lognormal < 1 ? RED : GREEN}>{d.lognormal.toFixed(3)}</TD>
                    <TD mono color={d.beta25 < 1 ? RED : GREEN}>{d.beta25.toFixed(3)}</TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ fontFamily: FONTS.serif, fontSize: 12, color: MUTED, marginTop: 8, fontStyle: "italic" }}>
          Nuclear Fission is the sole exception under every distribution family. No domain flips classification.
        </div>
      </div>

      {/* Aggregate results */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, letterSpacing: 2, marginBottom: 12 }}>AGGREGATE — DOMAINS CLEARING FLOOR (p5 &gt; 1.0)</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <TH width="140">Distribution</TH>
              <TH>Clear</TH>
              <TH>Weakest</TH>
              <TH>Floor (excl Nuclear)</TH>
              <TH>Mean P(β<sub style={{ fontSize: 11 }}>W</sub>&gt;1)</TH>
            </tr>
          </thead>
          <tbody>
            {AGGREGATE.map((a, i) => (
              <tr key={i}>
                <TD mono color="rgba(255,255,255,0.75)" bold>{a.dist}</TD>
                <TD mono color={GREEN}>{a.clear}/{a.total}</TD>
                <TD mono color={RED}>{a.weakest} ({a.weakestP5.toFixed(3)})</TD>
                <TD mono color={GREEN}>{a.floor} ({a.floorP5.toFixed(3)})</TD>
                <TD mono color={GREEN}>{a.meanPgt1}%</TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Beta(2,5) stress test */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: RED, letterSpacing: 2, marginBottom: 4 }}>STRESS TEST</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>P(β<sub style={{ fontSize: 11 }}>W</sub> &gt; 1) under Beta(2,5) — most conservative distribution</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <TH width="200">Domain</TH>
              <TH>Mean β<sub style={{ fontSize: 11 }}>W</sub></TH>
              <TH>5th pct</TH>
              <TH>95th pct</TH>
              <TH>P(β<sub style={{ fontSize: 11 }}>W</sub>&gt;1)</TH>
            </tr>
          </thead>
          <tbody>
            {stressData.map((d, i) => {
              const isException = d.p5 < 1.0;
              return (
                <tr key={i} style={{ background: isException ? "rgba(220,38,38,0.06)" : "transparent" }}>
                  <TD mono color={isException ? RED : "rgba(255,255,255,0.75)"} bold>
                    {d.domain} {isException && "← EXCEPTION"}
                  </TD>
                  <TD mono>{d.mean.toFixed(3)}</TD>
                  <TD mono color={d.p5 < 1 ? RED : GREEN}>{d.p5.toFixed(3)}</TD>
                  <TD mono>{d.p95.toFixed(3)}</TD>
                  <TD mono color={d.pgt1 === 0 ? RED : GREEN}>{d.pgt1.toFixed(1)}%</TD>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!showAllStress && BETA25_STRESS.length > 10 && (
          <button
            onClick={() => setShowAllStress(true)}
            style={{
              marginTop: 8, fontFamily: FONTS.mono, fontSize: 12, color: ACCENT,
              background: "none", border: `1px solid ${ACCENT}30`, borderRadius: 2,
              padding: "6px 16px", cursor: "pointer",
            }}
          >
            Show all {BETA25_STRESS.length} domains ▾
          </button>
        )}
      </div>

      {/* G1 results */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, letterSpacing: 2, marginBottom: 12 }}>G1 — R² OF W ~ h(u₁, u₂) ACROSS FAMILIES</div>
        <div style={{ fontFamily: FONTS.serif, fontSize: 13, color: DIM, marginBottom: 12, lineHeight: 1.6 }}>
          Can bilateral payoffs predict system welfare? R² &lt; 0.10 means no — the welfare dimension is structurally invisible to the transaction participants.
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <TH width="160">Distribution</TH>
              <TH>R² OLS</TH>
              <TH>R² KNN</TH>
              <TH>R² &lt; 0.10?</TH>
            </tr>
          </thead>
          <tbody>
            {G1_RESULTS.map((g, i) => (
              <tr key={i}>
                <TD mono color="rgba(255,255,255,0.75)" bold>{g.dist}</TD>
                <TD mono>{g.r2ols.toFixed(4)}</TD>
                <TD mono>{g.r2knn.toFixed(4)}</TD>
                <TD mono color={g.pass ? GREEN : RED}>{g.pass ? "✓ PASS" : "✗ FAIL"}</TD>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontFamily: FONTS.serif, fontSize: 12, color: MUTED, marginTop: 8, fontStyle: "italic" }}>
          Bitcoin PoW parameters (β<sub>W</sub> ∈ [3.60, 5.28]). Both linear (OLS) and non-linear (KNN) methods confirm welfare blindness.
        </div>
      </div>

      {/* Key insight */}
      <div style={{
        background: "rgba(245,158,11,0.04)", borderLeft: `4px solid ${ACCENT}`,
        padding: "16px 24px", borderRadius: "0 4px 4px 0", marginBottom: 32,
      }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, letterSpacing: 1, marginBottom: 6, fontWeight: 700 }}>KEY RESULT</div>
        <div style={{ fontFamily: FONTS.serif, fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
          The market-failure slate is evaluated separately from the β<sub>W</sub> &lt; 1 controls. Nuclear Fission and Gig Economy are controls/comparators, not market-failure claims. The distributional test therefore supports the classification doctrine only when the controls are labeled correctly.
        </div>
      </div>

      {/* Method note */}
      <div style={{
        fontFamily: FONTS.mono, fontSize: 11, color: MUTED, padding: "12px 0",
        borderTop: `1px solid ${BORDER}`, marginBottom: 40,
      }}>
        Source: distributional_robustness.py · 10,000 draws per domain × market-failure panel plus controls × 4 distributions · Postnieks (2026a) Private Pareto Theorem §5.9
      </div>
    </div>
  );
}
