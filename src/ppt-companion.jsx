import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, ReferenceLine, Label } from "recharts";

// ══════════════════════════════════════════════════════════════
// SAPM Program Hub — Private Pareto Theorem Companion
// Postnieks (2026a) Working Paper
// ══════════════════════════════════════════════════════════════

// === COMPLETE SAPM β_W CALIBRATION (30 domains) ===
const ALL_BETAS = [
  { key: "pfas", domain: "PFAS / Forever Chemicals", beta: 35.2, type: "I", slug: "sapm-pfas" },
  { key: "geneDrives", domain: "Gene Drive Deployment", beta: 12.4, type: "I", slug: "sapm-gene-drives" },
  { key: "opioid", domain: "Opioid Ecosystem", beta: 10.2, type: "II", slug: "sapm-opioids" },
  { key: "monoculture", domain: "Industrial Monoculture", beta: 8.6, type: "I", slug: "sapm-monoculture" },
  { key: "cre", domain: "Commercial Real Estate", beta: 8.4, type: "II", slug: "sapm-commercial-real-estate" },
  { key: "pops", domain: "Persistent Organic Pollutants", beta: 8.4, type: "I", slug: "sapm-pops-beyond-pfas" },
  { key: "bigTech", domain: "Big Tech Platform Monopoly", beta: 7.4, type: "II", slug: "sapm-big-tech-platform-monopoly" },
  { key: "frontierAI", domain: "Frontier AI", beta: 7.4, type: "I", slug: "sapm-frontier-ai" },
  { key: "vw", domain: "VW Dieselgate", beta: 6.8, type: "case", slug: null },
  { key: "tobacco", domain: "Tobacco", beta: 6.5, type: "II", slug: "sapm-tobacco" },
  { key: "studentLoans", domain: "Student Loan Securitization", beta: 6.3, type: "II", slug: "sapm-student-loans" },
  { key: "gambling", domain: "Commercial Gambling", beta: 6.3, type: "II", slug: "sapm-gambling" },
  { key: "pbm", domain: "Pharmacy Benefit Management", beta: 6.3, type: "II", slug: "sapm-pharmacy-benefit-management" },
  { key: "oilGas", domain: "Oil & Gas Extraction", beta: 6.2, type: "I", slug: "sapm-oil-gas" },
  { key: "palmOil", domain: "Palm Oil", beta: 6.2, type: "I", slug: "sapm-palm-oil" },
  { key: "upf", domain: "Ultra-Processed Food", beta: 6.2, type: "II", slug: "sapm-ultra-processed-food" },
  { key: "coal", domain: "Global Coal Combustion", beta: 6.1, type: "I", slug: "sapm-coal" },
  { key: "bitcoin", domain: "Bitcoin PoW", beta: 5.0, type: "II", slug: "sapm-bitcoin" },
  { key: "fisheries", domain: "Global Fisheries", beta: 4.72, type: "II", slug: "sapm-fisheries" },
  { key: "dsm", domain: "Deep-Sea Mining", beta: 4.7, type: "I", slug: "sapm-deep-sea-mining-abyssal-recovery" },
  { key: "aviation", domain: "Commercial Aviation Emissions", beta: 4.6, type: "I", slug: "sapm-aviation-emissions" },
  { key: "topsoil", domain: "Topsoil Erosion", beta: 4.3, type: "I", slug: "sapm-topsoil-erosion" },
  { key: "algoPricing", domain: "Algorithmic Pricing", beta: 4.2, type: "II", slug: "sapm-algorithmic-pricing" },
  { key: "gigEconomy", domain: "Gig Economy Platforms", beta: 4.2, type: "II", slug: "sapm-gig-economy" },
  { key: "water", domain: "Water Privatization", beta: 4.2, type: "II", slug: "sapm-water-privatization" },
  { key: "wmd", domain: "WMD Capability Diffusion", beta: 3.0, type: "I", slug: "sapm-wmd-capability-diffusion" },
  { key: "arms", domain: "International Arms Exports", beta: 2.4, type: "II", slug: "sapm-arms-exports" },
  { key: "altcoins", domain: "Altcoins / PoS Protocols", beta: 2.4, type: "II", slug: null },
  { key: "amr", domain: "Antimicrobial Resistance", beta: 2.1, type: "I", slug: "sapm-amr" },
  { key: "cement", domain: "Cement Calcination", beta: 1.35, type: "I", slug: "sapm-cement-calcination-floor" },
  { key: "nuclear", domain: "Nuclear Fission", beta: 0.53, type: "I", slug: "sapm-nuclear" },
];

// Additional dashboards not in β_W table
const EXTRA_DASHBOARDS = [
  { slug: "sapm-orbital-debris", title: "Orbital Debris & LEO Congestion" },
  { slug: "sapm-upf-impossibility-frontier", title: "UPF: The Impossibility Frontier" },
];

// Case study domains (original PPT paper)
const CASE_STUDIES = [
  { domain: "LIBOR", beta: 12, classification: "Extreme", note: "δ=$9B, T*≤0" },
  { domain: "ERCOT Grid", beta: 2053, classification: "Catastrophic", note: "δ=$95M, off-scale" },
];

// === T* COMPUTATION DATA ===
const VW_PARAMS = {
  delta: 3.7e9,
  eta: 0.3,
  lambda: {
    health: { low: 500e6, mid: 750e6, high: 1.0e9, source: "Barrett et al. 2015; Oldenkamp et al. 2016; EPA BenMAP $7,300/ton × 81 ktonnes/yr" },
    regulatory: { low: 200e6, mid: 350e6, high: 500e6, source: "RDE reform costs; ICCT monitoring; EU type-approval overhaul" },
    competitive: { low: 100e6, mid: 200e6, high: 300e6, source: "$335/vehicle competitive disadvantage to honest manufacturers" },
    environmental: { low: 100e6, mid: 200e6, high: 300e6, source: "Ozone crop damage (~$500/ton NOx); ecosystem NOx deposition" },
  },
  observed_crossover: 6,
};

const computeT = (delta, eta, lambda) => delta / (eta * lambda);
const sumLambda = (channels, scenario) => Object.values(channels).reduce((s, c) => s + c[scenario], 0);
const VW_LOW = sumLambda(VW_PARAMS.lambda, "low");
const VW_MID = sumLambda(VW_PARAMS.lambda, "mid");
const VW_HIGH = sumLambda(VW_PARAMS.lambda, "high");

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

// === 16 IMPOSSIBILITY THEOREMS (from research_context.md canon) ===
const THEOREMS = [
  { num: 1, year: 1785, name: "Condorcet Voting Paradox", authors: "Condorcet", nobel: null,
    statement: "Majority voting can produce cycles — A beats B, B beats C, C beats A — even when every voter has rational, transitive preferences.",
    impossible: "A transitive social ordering from majority rule",
    connection: "First proof that aggregation of rational individual preferences need not be rational. PPT extends this from preferences to welfare." },
  { num: 2, year: 1951, name: "Arrow's Impossibility", authors: "Arrow", nobel: 1972,
    statement: "No rank-order voting system can convert individual preferences into a community-wide ranking while satisfying unrestricted domain, Pareto, independence of irrelevant alternatives, and non-dictatorship simultaneously.",
    impossible: "A fair social welfare function that satisfies all four axioms",
    connection: "Arrow showed preference aggregation is impossible under fairness constraints. PPT shows welfare preservation is impossible under bilateral rationality." },
  { num: 3, year: 1970, name: "Sen's Liberal Paradox", authors: "Sen", nobel: 1998,
    statement: "No social welfare function can simultaneously respect individual liberty — each person being decisive over at least one personal choice — and the Pareto principle.",
    impossible: "Simultaneous respect for individual rights and Pareto efficiency",
    connection: "Sen showed individual rights conflict with efficiency. PPT shows bilateral efficiency conflicts with system welfare." },
  { num: 4, year: 1972, name: "Hurwicz Impossibility", authors: "Hurwicz", nobel: 2007,
    statement: "No mechanism can simultaneously achieve Pareto efficiency, incentive compatibility, and individual rationality across all preference environments.",
    impossible: "A mechanism that is efficient, truthful, and individually rational in all settings",
    connection: "Hurwicz showed mechanisms can't achieve all desirable properties. PPT shows bilateral negotiation can't preserve system welfare." },
  { num: 5, year: 1973, name: "Gibbard's Theorem", authors: "Gibbard", nobel: null,
    statement: "Any non-dictatorial voting scheme with at least three possible outcomes is manipulable — some voter can always improve their outcome by misreporting preferences.",
    impossible: "A non-dictatorial, strategy-proof social choice function over 3+ outcomes",
    connection: "Gibbard showed honest reporting is not incentive-compatible. PPT shows bilateral honesty cannot protect system welfare." },
  { num: 6, year: 1975, name: "Gibbard–Satterthwaite", authors: "Gibbard, Satterthwaite", nobel: null,
    statement: "Every non-dictatorial, surjective social choice function over three or more alternatives is susceptible to strategic manipulation by at least one voter.",
    impossible: "A non-dictatorial, onto, strategy-proof voting rule",
    connection: "Extends Gibbard to deterministic mechanisms. PPT extends the impossibility from manipulation to welfare blindness." },
  { num: 7, year: 1977, name: "Green–Laffont", authors: "Green, Laffont", nobel: null,
    statement: "In a general preference domain, the only incentive-compatible and efficient mechanisms are Groves mechanisms — and none of them balance the budget.",
    impossible: "Incentive compatibility, allocative efficiency, and budget balance simultaneously",
    connection: "Budget balance and efficiency are incompatible. PPT proves welfare preservation and bilateral efficiency are incompatible." },
  { num: 8, year: 1979, name: "Holmström Budget-Balance", authors: "Holmström", nobel: 2016,
    statement: "No budget-balanced sharing rule can make every team member's marginal contribution equal to their marginal reward. Free-riding is structurally unavoidable in teams.",
    impossible: "Efficient incentives in teams without an outside budget-breaker",
    connection: "Teams can't perfectly incentivize members. PPT shows bilateral deals can't internalize system costs." },
  { num: 9, year: 1982, name: "Balinski–Young", authors: "Balinski, Young", nobel: null,
    statement: "No apportionment method can simultaneously satisfy quota — each state's share rounded up or down — and avoid the Alabama paradox, where adding a seat causes a state to lose representation.",
    impossible: "A fair apportionment method free of paradoxes",
    connection: "Fair division requires unavoidable trade-offs. PPT reveals a trade-off that was invisible to bilateral analysis." },
  { num: 10, year: 1982, name: "Roth's Matching", authors: "Roth", nobel: 2012,
    statement: "No stable matching mechanism can be strategy-proof for all participants on both sides of the market. At least one side can always gain by misreporting.",
    impossible: "A stable, two-sided strategy-proof matching",
    connection: "Matching markets face strategic impossibilities. PPT shows bilateral matches can succeed while destroying the system they operate in." },
  { num: 11, year: 1983, name: "Myerson–Satterthwaite", authors: "Myerson, Satterthwaite", nobel: 2007,
    statement: "No mechanism can guarantee efficient bilateral trade under private information about valuations while maintaining individual rationality and budget balance.",
    impossible: "Efficient bilateral trade under private information without subsidy",
    connection: "Bilateral efficiency under private info requires external subsidy. PPT shows bilateral efficiency under system independence requires welfare destruction." },
  { num: 12, year: 1988, name: "Moulin's No-Show Paradox", authors: "Moulin", nobel: null,
    statement: "No Condorcet-consistent voting rule can be immune to the no-show paradox — a voter can sometimes obtain a better outcome by not participating at all.",
    impossible: "A Condorcet method where voting is always weakly better than abstaining",
    connection: "Even non-participation is strategically relevant. PPT shows even successful bilateral participation can be system-destructive." },
  { num: 13, year: 2000, name: "Laffont–Maskin Collusion", authors: "Laffont, Maskin", nobel: 2007,
    statement: "When agents can form side-agreements, no mechanism can simultaneously achieve allocative efficiency, incentive compatibility, and collusion-proofness.",
    impossible: "An efficient, incentive-compatible, collusion-proof mechanism",
    connection: "Collusion-proofness is incompatible with efficiency. PPT shows collusive outcomes are precisely where bilateral efficiency lives." },
  { num: 14, year: 2001, name: "Kaplow–Shavell", authors: "Kaplow, Shavell", nobel: null,
    statement: "Any legal rule that gives weight to fairness considerations beyond welfare will, in some cases, make every individual worse off compared to a pure welfarist rule.",
    impossible: "Non-welfarist legal criteria that are Pareto-compatible",
    connection: "Non-welfarist criteria impose costs on all. PPT shows bilaterally welfarist criteria impose costs on the system." },
  { num: 15, year: 2002, name: "List–Pettit Judgment Aggregation", authors: "List, Pettit", nobel: null,
    statement: "No group can maintain logically consistent collective judgments across interconnected propositions while satisfying universal domain, systematicity, and anonymity.",
    impossible: "Consistent collective judgment under minimal democratic requirements",
    connection: "Judgment aggregation fails at the group level. PPT shows welfare aggregation fails at the bilateral level." },
  { num: 16, year: 2026, name: "Private Pareto Theorem", authors: "Postnieks", nobel: null,
    statement: "For any bilateral interaction satisfying three axioms — overlapping interests, system independence, and system dependence — no Nash equilibrium exists in which both private parties gain and system welfare is preserved. The cooperative surplus visible to bilateral analysis is temporally unstable when β_W > 1.",
    impossible: "Bilateral Pareto efficiency that preserves system welfare under PST axioms",
    connection: null },
];

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
const GOLD = "#F59E0B";
const CRIMSON = "#DC2626";

const Section = ({ number, title, subtitle }) => (
  <div style={{ marginTop: 48, marginBottom: 24 }}>
    {number && <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: ACCENT, letterSpacing: 2, marginBottom: 6 }}>{number}</div>}
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

// Beta color by severity
const betaColor = (b) => {
  if (b >= 10) return "#DC2626";
  if (b >= 6) return "#E85D3A";
  if (b >= 4) return "#F59E0B";
  if (b >= 2) return "#D97706";
  return "#059669";
};

const betaLabel = (b) => {
  if (b >= 10) return "Extreme";
  if (b >= 6) return "Severe";
  if (b >= 4) return "Elevated";
  if (b >= 2) return "Moderate";
  return "Low";
};

// === TABS ===
const TABS = [
  { id: "overview", label: "Program" },
  { id: "dashboards", label: "Dashboards" },
  { id: "betas", label: "β_W Rankings" },
  { id: "tstar", label: "T* Workbook" },
  { id: "taxonomy", label: "Taxonomy" },
  { id: "theorems", label: "Canon" },
];

// Chart data (exclude extreme outliers)
const BETA_CHART = ALL_BETAS.filter(d => d.beta <= 40).map(d => ({
  domain: d.domain.length > 25 ? d.domain.slice(0, 23) + "…" : d.domain,
  beta: d.beta,
  color: betaColor(d.beta),
}));

// Stats
const meanBeta = (ALL_BETAS.reduce((s, d) => s + d.beta, 0) / ALL_BETAS.length).toFixed(1);
const medianBeta = (() => {
  const sorted = [...ALL_BETAS].sort((a, b) => a.beta - b.beta);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid].beta : ((sorted[mid - 1].beta + sorted[mid].beta) / 2).toFixed(1);
})();
const typeI = ALL_BETAS.filter(d => d.type === "I").length;
const typeII = ALL_BETAS.filter(d => d.type === "II").length;

export default function PPTCompanion() {
  const [tab, setTab] = useState("overview");
  const [expandedTheorem, setExpandedTheorem] = useState(null);

  return (
    <div style={{ background: BG, color: "rgba(255,255,255,0.8)", minHeight: "100vh", fontFamily: FONTS.serif }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600&family=Newsreader:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: ${BG}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        a { text-decoration: none; }
        a:hover { opacity: 0.85; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .pulse { animation: pulse 3s ease-in-out infinite; }
      `}</style>

      <header style={{ borderBottom: `1px solid ${BORDER}`, padding: "32px 0 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: ACCENT, letterSpacing: 3, marginBottom: 12 }}>SYSTEM ASSET PRICING MODEL</div>
              <h1 style={{ fontFamily: FONTS.serif, fontSize: 32, fontWeight: 300, margin: 0, color: "rgba(255,255,255,0.95)", lineHeight: 1.2 }}>
                The Private Pareto Theorem
              </h1>
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 12 }}>
                Erik Postnieks · Postnieks Impossibility Program · 2025–2026
              </div>
            </div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: DIM, textAlign: "right", display: "flex", gap: 16, alignItems: "center", marginTop: 8 }}>
              <span><span className="pulse" style={{ color: ACCENT }}>32</span> DOMAINS</span>
              <span style={{ color: BORDER }}>·</span>
              <span><span className="pulse" style={{ color: ACCENT }}>16</span> THEOREMS</span>
              <span style={{ color: BORDER }}>·</span>
              <span>β̄_W = <span className="pulse" style={{ color: ACCENT }}>{meanBeta}</span></span>
            </div>
          </div>
        </div>
      </header>

      <nav style={{ borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: BG, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px", display: "flex", gap: 0, overflowX: "auto" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              fontFamily: FONTS.mono, fontSize: 11, padding: "12px 16px", border: "none", cursor: "pointer",
              background: tab === t.id ? "rgba(245,158,11,0.08)" : "transparent",
              color: tab === t.id ? ACCENT : MUTED,
              borderBottom: tab === t.id ? `2px solid ${ACCENT}` : "2px solid transparent",
              transition: "all 0.2s", whiteSpace: "nowrap",
            }}>{t.label}</button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ═══ PROGRAM OVERVIEW ═══ */}
        {tab === "overview" && (
          <div>
            <Section title="Program Overview" subtitle="The Postnieks Impossibility Program quantifies the welfare cost of private optimization" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
              <Card highlight>
                <Label2>CALIBRATED DOMAINS</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: ACCENT }}>32</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 4 }}>{typeI} Type I · {typeII} Type II · 3 case</div>
              </Card>
              <Card>
                <Label2>MEAN β_W</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: betaColor(parseFloat(meanBeta)) }}>{meanBeta}</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 4 }}>Median: {medianBeta}</div>
              </Card>
              <Card>
                <Label2>IMPOSSIBILITY THEOREMS</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: ACCENT }}>16</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 4 }}>1785–2026</div>
              </Card>
              <Card>
                <Label2>COMPANION DASHBOARDS</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: ACCENT }}>37</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 4 }}>+ C-Adjusted GDP</div>
              </Card>
            </div>

            <Card highlight>
              <Label2>CORE RESULT</Label2>
              <div style={{ fontFamily: FONTS.serif, fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.8 }}>
                For any game satisfying three axioms — bilateral rationality, system-welfare relevance, and
                non-dictatorial payoff structure — no Nash equilibrium exists in which both private parties
                gain and system welfare is preserved. The Private Pareto Theorem (Postnieks 2026a) establishes
                that the cooperative surplus visible to bilateral analysis is temporally unstable when β_W {">"} 1.
              </div>
            </Card>

            <Section number="β_W" title="System Beta Distribution" subtitle="β_W = −dW/dΠ — marginal welfare cost per dollar of private gain" />

            <div style={{ height: 520, marginBottom: 16 }}>
              <ResponsiveContainer>
                <BarChart data={BETA_CHART} layout="vertical" margin={{ left: 180, right: 30, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis type="number" tick={{ fill: MUTED, fontFamily: FONTS.mono, fontSize: 10 }} domain={[0, 'auto']} />
                  <YAxis type="category" dataKey="domain" tick={{ fill: DIM, fontFamily: FONTS.mono, fontSize: 10 }} width={170} interval={0} />
                  <Tooltip contentStyle={{ background: "#1a1a2e", border: `1px solid ${BORDER}`, fontFamily: FONTS.mono, fontSize: 11, color: DIM }} />
                  <Bar dataKey="beta" radius={[0, 2, 2, 0]}>
                    {BETA_CHART.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                  <ReferenceLine x={1} stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5">
                    <Label value="β=1" position="top" fill={MUTED} style={{ fontFamily: FONTS.mono, fontSize: 9 }} />
                  </ReferenceLine>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <Card>
              <Label2>KEY LINKS</Label2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <a href="https://c-adjusted-gdp.vercel.app" target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", padding: "12px 16px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 2 }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: ACCENT, letterSpacing: 1 }}>C-ADJUSTED GDP</div>
                  <div style={{ fontFamily: FONTS.serif, fontSize: 13, color: DIM, marginTop: 4 }}>Welfare-adjusted national output for 190+ countries</div>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setTab("dashboards"); }}
                  style={{ display: "block", padding: "12px 16px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2 }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: ACCENT, letterSpacing: 1 }}>ALL DASHBOARDS →</div>
                  <div style={{ fontFamily: FONTS.serif, fontSize: 13, color: DIM, marginTop: 4 }}>32 domain-specific companion dashboards</div>
                </a>
              </div>
            </Card>
          </div>
        )}

        {/* ═══ DASHBOARDS ═══ */}
        {tab === "dashboards" && (
          <div>
            <Section title="Companion Dashboards" subtitle="32 domain-specific SAPM dashboards + C-Adjusted GDP" />

            <a href="https://c-adjusted-gdp.vercel.app" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", marginBottom: 24 }}>
              <Card highlight>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: ACCENT, letterSpacing: 1, marginBottom: 4 }}>FLAGSHIP</div>
                    <div style={{ fontFamily: FONTS.serif, fontSize: 18, color: "rgba(255,255,255,0.9)" }}>C-Adjusted GDP Dashboard</div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: MUTED, marginTop: 4 }}>
                      Welfare-adjusted national output — 190+ countries, 27 SAPM channels, extraction ratio μ=0.15
                    </div>
                  </div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: ACCENT }}>→</div>
                </div>
              </Card>
            </a>

            <Label2>DOMAIN DASHBOARDS — SORTED BY β_W (DESCENDING)</Label2>

            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {ALL_BETAS.filter(d => d.slug).map((d, i) => (
                <a key={d.key} href={`https://${d.slug}.vercel.app`} target="_blank" rel="noopener noreferrer">
                  <div style={{
                    display: "flex", alignItems: "center", padding: "10px 16px",
                    background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                    borderLeft: `3px solid ${betaColor(d.beta)}`,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent"}
                  >
                    <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, width: 28, flexShrink: 0 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: betaColor(d.beta), width: 50, flexShrink: 0 }}>
                      {d.beta}
                    </span>
                    <span style={{ fontFamily: FONTS.serif, fontSize: 14, color: "rgba(255,255,255,0.8)", flex: 1 }}>
                      {d.domain}
                    </span>
                    <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED }}>
                      Type {d.type}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {EXTRA_DASHBOARDS.length > 0 && (
              <>
                <div style={{ marginTop: 24 }}>
                  <Label2>ADDITIONAL DASHBOARDS</Label2>
                </div>
                {EXTRA_DASHBOARDS.map((d, i) => (
                  <a key={d.slug} href={`https://${d.slug}.vercel.app`} target="_blank" rel="noopener noreferrer">
                    <div style={{
                      display: "flex", alignItems: "center", padding: "10px 16px",
                      background: SURFACE, borderLeft: `3px solid ${BORDER}`,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.04)"}
                    onMouseLeave={e => e.currentTarget.style.background = SURFACE}
                    >
                      <span style={{ fontFamily: FONTS.serif, fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{d.title}</span>
                    </div>
                  </a>
                ))}
              </>
            )}
          </div>
        )}

        {/* ═══ β_W RANKINGS ═══ */}
        {tab === "betas" && (
          <div>
            <Section number="§D.2" title="Complete β_W Calibration" subtitle="All 32 domains — marginal welfare cost per dollar of private gain" />

            <Card highlight>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, textAlign: "center" }}>
                <div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED }}>EXTREME (β≥10)</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: "#DC2626", marginTop: 4 }}>
                    {ALL_BETAS.filter(d => d.beta >= 10).length}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED }}>SEVERE (6–10)</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: "#E85D3A", marginTop: 4 }}>
                    {ALL_BETAS.filter(d => d.beta >= 6 && d.beta < 10).length}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED }}>ELEVATED (4–6)</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: "#F59E0B", marginTop: 4 }}>
                    {ALL_BETAS.filter(d => d.beta >= 4 && d.beta < 6).length}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED }}>MODERATE ({"<"}4)</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: "#D97706", marginTop: 4 }}>
                    {ALL_BETAS.filter(d => d.beta < 4).length}
                  </div>
                </div>
              </div>
            </Card>

            {/* Header row */}
            <div style={{
              display: "grid", gridTemplateColumns: "32px 60px 1fr 80px 80px",
              padding: "8px 12px", borderBottom: `1px solid ${BORDER}`,
            }}>
              <Mono color={MUTED}>#</Mono>
              <Mono color={MUTED}>β_W</Mono>
              <Mono color={MUTED}>DOMAIN</Mono>
              <Mono color={MUTED}>CLASS</Mono>
              <Mono color={MUTED}>TYPE</Mono>
            </div>

            {ALL_BETAS.map((d, i) => (
              <div key={d.key} style={{
                display: "grid", gridTemplateColumns: "32px 60px 1fr 80px 80px",
                alignItems: "center", padding: "8px 12px",
                background: i % 2 === 0 ? SURFACE : "transparent",
                borderRadius: 1,
              }}>
                <Mono color={MUTED}>{String(i + 1).padStart(2, "0")}</Mono>
                <Mono color={betaColor(d.beta)}>{d.beta}</Mono>
                <div>
                  {d.slug ? (
                    <a href={`https://${d.slug}.vercel.app`} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: FONTS.mono, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                      {d.domain}
                    </a>
                  ) : (
                    <Mono color="rgba(255,255,255,0.7)">{d.domain}</Mono>
                  )}
                </div>
                <Mono color={betaColor(d.beta)}>{betaLabel(d.beta)}</Mono>
                <Mono color={MUTED}>{d.type === "case" ? "Case" : `Type ${d.type}`}</Mono>
              </div>
            ))}

            <div style={{ marginTop: 24 }}>
              <Label2>ORIGINAL CASE STUDIES (PPT PAPER)</Label2>
              {CASE_STUDIES.map(d => (
                <Card key={d.domain}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <Mono color="rgba(255,255,255,0.8)">{d.domain}</Mono>
                      <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginTop: 4 }}>{d.note}</div>
                    </div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: "#DC2626" }}>
                      {d.beta.toLocaleString()}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

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

        {/* ═══ INTERACTIVE IMPOSSIBILITY CANON TIMELINE ═══ */}
        {tab === "theorems" && (
          <div>
            <Section number="C.5" title="The Impossibility Canon" subtitle="Economics and Social Choice — 1785 to 2026" />

            <div style={{ position: "relative", paddingLeft: 40 }}>
              {/* Vertical timeline line */}
              <div style={{ position: "absolute", left: 18, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${BORDER}, rgba(245,158,11,0.3))` }} />

              {THEOREMS.map((t, i) => {
                const isPPT = t.num === 16;
                const isExpanded = expandedTheorem === t.num;
                const isBeforeBreak = t.num === 15;

                return (
                  <div key={t.num}>
                    {/* The structural break separator — between #15 and #16 */}
                    {isPPT && (
                      <div style={{ position: "relative", margin: "32px 0 32px -40px", padding: "20px 0 20px 40px" }}>
                        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)` }} />
                        <div style={{ position: "relative", background: BG, display: "inline-block", padding: "8px 16px", marginLeft: 40, border: `1px solid rgba(245,158,11,0.2)`, borderRadius: 2 }}>
                          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: ACCENT, lineHeight: 1.6, maxWidth: 500 }}>
                            THE STRUCTURAL BREAK — Theorems 1–15 operate within the bilateral payoff space.<br/>
                            Theorem 16 proves the payoff space itself is blind.
                          </div>
                        </div>
                      </div>
                    )}

                    <div
                      onClick={() => setExpandedTheorem(isExpanded ? null : t.num)}
                      style={{
                        position: "relative", cursor: "pointer",
                        marginBottom: isPPT ? 0 : 8,
                        padding: isPPT ? "20px 20px 20px 32px" : "12px 16px 12px 32px",
                        background: isPPT ? "rgba(245,158,11,0.06)" : isExpanded ? SURFACE : "transparent",
                        border: isPPT ? `1px solid rgba(245,158,11,0.2)` : `1px solid transparent`,
                        borderRadius: 2,
                        transition: "all 0.2s",
                      }}
                    >
                      {/* Timeline node */}
                      <div style={{
                        position: "absolute",
                        left: isPPT ? -26 : -24,
                        top: isPPT ? 24 : 16,
                        width: isPPT ? 16 : 10,
                        height: isPPT ? 16 : 10,
                        borderRadius: "50%",
                        background: isPPT ? ACCENT : t.nobel ? "#F59E0B" : "rgba(255,255,255,0.15)",
                        border: isPPT ? `2px solid ${ACCENT}` : t.nobel ? "2px solid rgba(245,158,11,0.4)" : `2px solid ${BORDER}`,
                        boxShadow: isPPT ? "0 0 12px rgba(245,158,11,0.4)" : "none",
                      }} />

                      {/* Nobel medal indicator */}
                      {t.nobel && (
                        <div style={{
                          position: "absolute", left: isPPT ? -50 : -48, top: isPPT ? 22 : 12,
                          fontFamily: FONTS.mono, fontSize: 8, color: "#F59E0B",
                          background: "rgba(245,158,11,0.1)", padding: "1px 4px", borderRadius: 2,
                          whiteSpace: "nowrap",
                        }}>
                          ★ {t.nobel}
                        </div>
                      )}

                      {/* Header row */}
                      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                        <span style={{ fontFamily: FONTS.mono, fontSize: isPPT ? 13 : 11, color: isPPT ? ACCENT : MUTED, minWidth: 36 }}>
                          {t.year}
                        </span>
                        <span style={{ fontFamily: FONTS.mono, fontSize: isPPT ? 14 : 12, fontWeight: isPPT ? 600 : 400, color: isPPT ? ACCENT : "rgba(255,255,255,0.8)" }}>
                          {t.name}
                        </span>
                        <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED }}>
                          {t.authors}
                        </span>
                        <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: MUTED, marginLeft: "auto" }}>
                          {isExpanded ? "−" : "+"}
                        </span>
                      </div>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                          <div style={{ marginBottom: 10 }}>
                            <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>STATEMENT</div>
                            <div style={{ fontFamily: FONTS.serif, fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                              {t.statement}
                            </div>
                          </div>
                          <div style={{ marginBottom: 10 }}>
                            <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>PROVED IMPOSSIBLE</div>
                            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: CRIMSON }}>
                              {t.impossible}
                            </div>
                          </div>
                          {t.connection && (
                            <div>
                              <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>CONNECTION TO PPT</div>
                              <div style={{ fontFamily: FONTS.serif, fontSize: 12, color: ACCENT, fontStyle: "italic", lineHeight: 1.6 }}>
                                {t.connection}
                              </div>
                            </div>
                          )}
                          {isPPT && (
                            <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 2 }}>
                              <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: ACCENT, letterSpacing: 1, marginBottom: 4 }}>THE STRUCTURAL DIFFERENCE</div>
                              <div style={{ fontFamily: FONTS.serif, fontSize: 12, color: DIM, lineHeight: 1.7 }}>
                                Theorems 1–15 all operate within the bilateral payoff space — constraints on preference aggregation, mechanism design, information structure. Theorem 16 proves the bilateral payoff space itself is structurally blind to a variable that matters. That is a categorically different result.
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "20px 0", textAlign: "center" }}>
        <Mono color="rgba(255,255,255,0.2)">© 2026 Erik Postnieks · Postnieks Impossibility Program · All rights reserved</Mono>
      </footer>
    </div>
  );
}
