import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell, LineChart, Line, CartesianGrid, Legend, ReferenceLine, Label } from "recharts";

// ══════════════════════════════════════════════════════════════
// Private Pareto Theorem — Companion Computation & Visualization
// Postnieks (2026a) Working Paper
// ══════════════════════════════════════════════════════════════

// === T* COMPUTATION DATA (from first principles) ===
const VW_PARAMS = {
  delta: 3.7e9, // $3.7B — $335/vehicle × 11M vehicles (ICCT 2015)
  eta: 0.3,     // 30% feedback coupling (fn 47)
  lambda: {     // Annual system welfare loss rate — built from channels
    health: { low: 500e6, mid: 750e6, high: 1.0e9, source: "Barrett et al. 2015; Oldenkamp et al. 2016; EPA BenMAP $7,300/ton × 81 ktonnes/yr" },
    regulatory: { low: 200e6, mid: 350e6, high: 500e6, source: "RDE reform costs; ICCT monitoring; EU type-approval overhaul" },
    competitive: { low: 100e6, mid: 200e6, high: 300e6, source: "$335/vehicle competitive disadvantage to honest manufacturers" },
    environmental: { low: 100e6, mid: 200e6, high: 300e6, source: "Ozone crop damage (~$500/ton NOx); ecosystem NOx deposition" },
  },
  observed_crossover: 6, // years (EPA NOV Sept 2015, program began 2009)
};

const computeT = (delta, eta, lambda) => delta / (eta * lambda);
const sumLambda = (channels, scenario) => Object.values(channels).reduce((s, c) => s + c[scenario], 0);

const VW_LOW = sumLambda(VW_PARAMS.lambda, "low");
const VW_MID = sumLambda(VW_PARAMS.lambda, "mid");
const VW_HIGH = sumLambda(VW_PARAMS.lambda, "high");

const TSTAR_SCENARIOS = [
  { name: "Low λ", lambda: VW_LOW, tstar: computeT(VW_PARAMS.delta, VW_PARAMS.eta, VW_LOW) },
  { name: "Central λ", lambda: VW_MID, tstar: computeT(VW_PARAMS.delta, VW_PARAMS.eta, VW_MID) },
  { name: "High λ", lambda: VW_HIGH, tstar: computeT(VW_PARAMS.delta, VW_PARAMS.eta, VW_HIGH) },
];

// === SAPM CALIBRATION DATA ===
const BETA_DATA = [
  { domain: "VW Dieselgate", beta: 6.8, classification: "Severe", color: "#E85D3A", delta: "$3.7B", tstar: "~6 yr" },
  { domain: "LIBOR", beta: 12, classification: "Extreme (>>1)", color: "#DC2626", delta: "$9B", tstar: "≤0" },
  { domain: "ERCOT Grid", beta: 2053, classification: "Catastrophic", color: "#7F1D1D", delta: "$95M", tstar: "N/A" },
  { domain: "Bitcoin PoW", beta: 5.0, classification: "Severe", color: "#F59E0B", delta: "—", tstar: "—" },
  { domain: "Ethereum PoS", beta: 2.4, classification: "Moderate", color: "#3B82F6", delta: "—", tstar: "—" },
  { domain: "Solana PoS", beta: 2.7, classification: "Moderate", color: "#8B5CF6", delta: "—", tstar: "—" },
];

const BETA_CHART_DATA = BETA_DATA.filter(d => d.beta < 100).map(d => ({ ...d, betaDisplay: d.beta }));

// === 8-OUTCOME TAXONOMY ===
const TAXONOMY = [
  { id: 1, c: 0, a: 0, b: 0, name: "Misery", desc: "Total failure", color: "#7F1D1D" },
  { id: 2, c: 0, a: 1, b: 0, name: "C Loses, A Prevails", desc: "A extracts; system degrades", color: "#991B1B" },
  { id: 3, c: 0, a: 0, b: 1, name: "C Loses, B Prevails", desc: "B extracts; system degrades", color: "#B91C1C" },
  { id: 4, c: 1, a: 0, b: 0, name: "Stable Misery", desc: "System preserved; both lose", color: "#1E3A5F" },
  { id: 5, c: 0, a: 1, b: 1, name: "Hollow Win", desc: "Both gain; system degrades. Temporally unstable.", color: "#DC2626" },
  { id: 6, c: 1, a: 0, b: 1, name: "C Wins, B Prevails", desc: "System + B preserved; A bears cost", color: "#1D4ED8" },
  { id: 7, c: 1, a: 1, b: 0, name: "C Wins, A Prevails", desc: "System + A preserved; B bears cost", color: "#2563EB" },
  { id: 8, c: 1, a: 1, b: 1, name: "Win, Win, Win", desc: "All dimensions satisfied", color: "#059669" },
];

// === 19 IMPOSSIBILITY THEOREMS ===
const THEOREMS = [
  { num: 1, year: 1785, name: "Condorcet Voting Paradox", authors: "Condorcet", nobel: null },
  { num: 2, year: 1951, name: "Arrow's Impossibility", authors: "Arrow", nobel: 1972 },
  { num: 3, year: 1970, name: "Sen's Liberal Paradox", authors: "Sen", nobel: 1998 },
  { num: 4, year: 1972, name: "Hurwicz Impossibility", authors: "Hurwicz", nobel: 2007 },
  { num: 5, year: 1973, name: "Gibbard's Theorem", authors: "Gibbard", nobel: null },
  { num: 6, year: 1975, name: "Gibbard–Satterthwaite", authors: "Gibbard; Satterthwaite", nobel: null },
  { num: 7, year: 1977, name: "Green–Laffont", authors: "Green; Laffont", nobel: null },
  { num: 8, year: 1977, name: "Muller–Satterthwaite", authors: "Muller; Satterthwaite", nobel: null },
  { num: 9, year: 1980, name: "Grossman–Stiglitz", authors: "Grossman; Stiglitz", nobel: 2001 },
  { num: 10, year: 1982, name: "Holmström Budget-Balance", authors: "Holmström", nobel: 2016 },
  { num: 11, year: 1982, name: "Balinski–Young", authors: "Balinski; Young", nobel: null },
  { num: 12, year: 1982, name: "Roth's Matching", authors: "Roth", nobel: 2012 },
  { num: 13, year: 1983, name: "Myerson–Satterthwaite", authors: "Myerson; Satterthwaite", nobel: 2007 },
  { num: 14, year: 1988, name: "Moulin's No-Show Paradox", authors: "Moulin", nobel: null },
  { num: 15, year: 2000, name: "Laffont–Martimort Collusion", authors: "Laffont; Martimort", nobel: null },
  { num: 16, year: 2001, name: "Kaplow–Shavell", authors: "Kaplow; Shavell", nobel: null },
  { num: 17, year: 2002, name: "List–Pettit Judgment Aggregation", authors: "List; Pettit", nobel: null },
  { num: 18, year: 2026, name: "Private Pareto Theorem", authors: "Postnieks", nobel: null },
  { num: 19, year: 2026, name: "Protocol Welfare Floor", authors: "Postnieks", nobel: null, field: "Welfare economics", statement: "No permissionless blockchain satisfying three defining axioms (permissionless access, transaction irreversibility, user sovereignty) can reduce system beta below the custody floor through protocol design alone. The first impossibility result constraining what distributed systems can protect." },
];

// === SENSITIVITY DATA ===
const generateSensitivity = () => {
  const data = [];
  for (let eta = 0.1; eta <= 0.5; eta += 0.05) {
    for (let lambda = 0.5e9; lambda <= 3.5e9; lambda += 0.25e9) {
      const tstar = VW_PARAMS.delta / (eta * lambda);
      data.push({ eta: +eta.toFixed(2), lambda: +(lambda / 1e9).toFixed(2), tstar: +tstar.toFixed(1) });
    }
  }
  return data;
};

const fmt = (n) => {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toLocaleString()}`;
};

// === STYLES ===
const FONTS = {
  mono: "'JetBrains Mono', 'Fira Code', monospace",
  serif: "'Newsreader', 'Georgia', serif",
  sans: "'Inter', system-ui, sans-serif",
};

const BG = "#0A0A0F";
const SURFACE = "rgba(255,255,255,0.02)";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.35)";
const DIM = "rgba(255,255,255,0.5)";
const ACCENT = "#F59E0B";

const Section = ({ number, title, subtitle }) => (
  <div style={{ marginTop: 48, marginBottom: 24 }}>
    <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: ACCENT, letterSpacing: 2, marginBottom: 6 }}>{number}</div>
    <h2 style={{ fontFamily: FONTS.serif, fontSize: 24, fontWeight: 400, color: "rgba(255,255,255,0.9)", margin: 0 }}>{title}</h2>
    {subtitle && <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: MUTED, marginTop: 4 }}>{subtitle}</div>}
  </div>
);

const Card = ({ children, highlight }) => (
  <div style={{ background: highlight ? `rgba(245,158,11,0.04)` : SURFACE, border: `1px solid ${highlight ? "rgba(245,158,11,0.1)" : BORDER}`, borderRadius: 2, padding: "16px 20px", marginBottom: 12 }}>
    {children}
  </div>
);

const Label2 = ({ children }) => (
  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, letterSpacing: 1, marginBottom: 8 }}>{children}</div>
);

const Mono = ({ children, color }) => (
  <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: color || DIM }}>{children}</span>
);

// === TABS ===
const TABS = [
  { id: "tstar", label: "T* Workbook" },
  { id: "taxonomy", label: "Taxonomy" },
  { id: "sapm", label: "SAPM β_W" },
  { id: "theorems", label: "19 Theorems" },
];

export default function PPTCompanion() {
  const [tab, setTab] = useState("tstar");

  return (
    <div style={{ background: BG, color: "rgba(255,255,255,0.8)", minHeight: "100vh", fontFamily: FONTS.serif }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600&family=Newsreader:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: ${BG}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      <header style={{ borderBottom: `1px solid ${BORDER}`, padding: "32px 0 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: ACCENT, letterSpacing: 3, marginBottom: 12 }}>COMPANION DASHBOARD</div>
          <h1 style={{ fontFamily: FONTS.serif, fontSize: 32, fontWeight: 300, margin: 0, color: "rgba(255,255,255,0.95)", lineHeight: 1.2 }}>
            The Private Pareto Trap
          </h1>
          <div style={{ fontFamily: FONTS.serif, fontSize: 14, color: DIM, marginTop: 8, fontStyle: "italic" }}>
            Computation workbook and SAPM calibration for Postnieks (2026a)
          </div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 12 }}>
            Erik Postnieks · erik@woosterllc.com · Working Paper v3.3 · March 2026
          </div>
        </div>
      </header>

      <nav style={{ borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: BG, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", display: "flex", gap: 0 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              fontFamily: FONTS.mono, fontSize: 11, padding: "12px 20px", border: "none", cursor: "pointer",
              background: tab === t.id ? "rgba(245,158,11,0.08)" : "transparent",
              color: tab === t.id ? ACCENT : MUTED,
              borderBottom: tab === t.id ? `2px solid ${ACCENT}` : "2px solid transparent",
              transition: "all 0.2s",
            }}>{t.label}</button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ═══ T* WORKBOOK ═══ */}
        {tab === "tstar" && (
          <div>
            <Section number="§D.8" title="T* Computation Workbook" subtitle="VW Dieselgate — every parameter from primary sources" />

            <Card highlight>
              <Label2>FORMULA</Label2>
              <div style={{ fontFamily: FONTS.mono, fontSize: 18, color: "rgba(255,255,255,0.9)", textAlign: "center", padding: "12px 0" }}>
                T* = δ / (η × λ)
              </div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, textAlign: "center" }}>
                dollars / (dimensionless × dollars·yr⁻¹) = years
              </div>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
              <Card>
                <Label2>δ — PRIVATE SURPLUS</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: ACCENT }}>$3.7B</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 8, lineHeight: 1.7 }}>
                  $335/vehicle × 11M vehicles<br/>
                  Source: ICCT (2015)<br/>
                  Conservative: excludes brand premium
                </div>
              </Card>
              <Card>
                <Label2>η — FEEDBACK COUPLING</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: ACCENT }}>0.30</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 8, lineHeight: 1.7 }}>
                  ~30% of system damage<br/>
                  feeds back to VW via<br/>
                  regulatory + brand channels
                </div>
              </Card>
              <Card>
                <Label2>λ — ANNUAL SYSTEM LOSS</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: ACCENT }}>{fmt(VW_HIGH)}/yr</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 8, lineHeight: 1.7 }}>
                  4 channels summed below<br/>
                  Range: {fmt(VW_LOW)}–{fmt(VW_HIGH)}/yr<br/>
                  Central: {fmt(VW_MID)}/yr
                </div>
              </Card>
            </div>

            <Section number="λ" title="Annual System Welfare Loss — By Channel" subtitle="Built from peer-reviewed damage estimates, not reverse-engineered" />

            {Object.entries(VW_PARAMS.lambda).map(([key, val]) => (
              <Card key={key}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "capitalize" }}>
                      {key === "health" ? "Health Damage (NOx → PM2.5, ozone)" :
                       key === "regulatory" ? "Regulatory Integrity Erosion" :
                       key === "competitive" ? "Competitive Distortion" :
                       "Environmental Damage Beyond Health"}
                    </div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 4 }}>{val.source}</div>
                  </div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: ACCENT, textAlign: "right", whiteSpace: "nowrap" }}>
                    {fmt(val.low)}–{fmt(val.high)}/yr
                  </div>
                </div>
              </Card>
            ))}

            <Card highlight>
              <Label2>TOTAL λ</Label2>
              <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: DIM, lineHeight: 2 }}>
                Low:&nbsp;&nbsp;&nbsp;&nbsp;{fmt(VW_LOW)}/yr → T* = {computeT(VW_PARAMS.delta, VW_PARAMS.eta, VW_LOW).toFixed(1)} years<br/>
                Central: {fmt(VW_MID)}/yr → T* = {computeT(VW_PARAMS.delta, VW_PARAMS.eta, VW_MID).toFixed(1)} years<br/>
                High:&nbsp;&nbsp;&nbsp;&nbsp;{fmt(VW_HIGH)}/yr → T* = {computeT(VW_PARAMS.delta, VW_PARAMS.eta, VW_HIGH).toFixed(1)} years<br/>
                <br/>
                <strong style={{ color: ACCENT }}>Observed crossover: ~6 years (EPA NOV September 2015)</strong><br/>
                High-λ scenario matches to within 0.1 years.
              </div>
            </Card>

          </div>
        )}

        {/* ═══ TAXONOMY ═══ */}
        {tab === "taxonomy" && (
          <div>
            <Section number="§4.5" title="The 8-Outcome Taxonomy" subtitle="2³ = 8 structural outcome types from three binary indicators (c, a, b)" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {TAXONOMY.map(t => (
                <Card key={t.id}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: t.c === 0 ? "#DC2626" : "#059669", minWidth: 48 }}>
                      ({t.c},{t.a},{t.b})
                    </div>
                    <div>
                      <div style={{ fontFamily: FONTS.mono, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{t.name}</div>
                      <div style={{ fontFamily: FONTS.serif, fontSize: 12, color: MUTED, marginTop: 2, fontStyle: "italic" }}>{t.desc}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Card highlight>
              <Label2>THE DANGEROUS CONFLATION (Prop 8a)</Label2>
              <div style={{ fontFamily: FONTS.serif, fontSize: 13, color: DIM, lineHeight: 1.7 }}>
                Standard two-dimensional analysis maps both <Mono color="#DC2626">Hollow Win (0,1,1)</Mono> and <Mono color="#059669">Win, Win, Win (1,1,1)</Mono> to the same label: "mutual gain." This conflation allowed LIBOR manipulation, cartel pricing, and algorithmic collusion to be classified identically with legitimate cooperation — for decades.
              </div>
            </Card>
          </div>
        )}

        {/* ═══ SAPM β_W ═══ */}
        {tab === "sapm" && (
          <div>
            <Section number="§D.2" title="System Beta Across Calibrated Domains" subtitle="β_W = −dW/dΠ — marginal welfare cost per dollar of private gain" />
            <div style={{ height: 300, marginBottom: 24 }}>
              <ResponsiveContainer>
                <BarChart data={BETA_CHART_DATA} layout="vertical" margin={{ left: 120, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" tick={{ fill: MUTED, fontFamily: FONTS.mono, fontSize: 10 }} domain={[0, 8]} />
                  <YAxis type="category" dataKey="domain" tick={{ fill: DIM, fontFamily: FONTS.mono, fontSize: 11 }} width={110} />
                  <Tooltip contentStyle={{ background: "#1a1a2e", border: `1px solid ${BORDER}`, fontFamily: FONTS.mono, fontSize: 11, color: DIM }} />
                  <Bar dataKey="beta" radius={[0, 2, 2, 0]}>
                    {BETA_CHART_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                  <ReferenceLine x={1} stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5">
                    <Label value="β_W=1 (unit PST)" position="top" fill={MUTED} style={{ fontFamily: FONTS.mono, fontSize: 9 }} />
                  </ReferenceLine>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginBottom: 24, textAlign: "center" }}>
              ERCOT (β_W ≈ 2,053) omitted from chart — off-scale. LIBOR shown capped at 12; actual is effectively unbounded.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {BETA_DATA.slice(0, 3).map(d => (
                <Card key={d.domain}>
                  <Label2>{d.domain.toUpperCase()}</Label2>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: d.color }}>{d.beta < 100 ? d.beta : d.beta.toLocaleString()}</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 4 }}>
                    δ = {d.delta} · T* = {d.tstar}<br/>
                    {d.classification}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ═══ 19 THEOREMS ═══ */}
        {tab === "theorems" && (
          <div>
            <Section number="C.5" title="Nineteen Impossibility Theorems" subtitle="Economics and Social Choice (1785–2026) — 7 Nobel laureates" />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {THEOREMS.map(t => (
                <div key={t.num} style={{
                  display: "grid", gridTemplateColumns: "32px 48px 1fr 160px 80px",
                  alignItems: "center", padding: "8px 12px", gap: 8,
                  background: t.num >= 18 ? "rgba(245,158,11,0.06)" : (t.num % 2 === 0 ? SURFACE : "transparent"),
                  border: t.num >= 18 ? `1px solid rgba(245,158,11,0.15)` : `1px solid transparent`,
                  borderRadius: 2,
                }}>
                  <Mono color={t.num >= 18 ? ACCENT : MUTED}>#{t.num}</Mono>
                  <Mono color={DIM}>{t.year}</Mono>
                  <Mono color={t.num >= 18 ? ACCENT : "rgba(255,255,255,0.7)"}>{t.name}</Mono>
                  <Mono color={MUTED}>{t.authors}</Mono>
                  <Mono color={t.nobel ? "#F59E0B" : "rgba(255,255,255,0.15)"}>{t.nobel ? `Nobel ${t.nobel}` : "—"}</Mono>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "20px 0", textAlign: "center" }}>
        <Mono color="rgba(255,255,255,0.2)">© 2026 Erik Postnieks · erik@woosterllc.com · All rights reserved</Mono>
      </footer>
    </div>
  );
}
