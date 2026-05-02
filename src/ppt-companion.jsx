"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, ReferenceLine, Label } from "recharts";

// ══════════════════════════════════════════════════════════════
// System Asset Pricing Model Program Hub — Private Pareto Theorem Companion
// Postnieks (2026a) Working Paper
// ══════════════════════════════════════════════════════════════

// === COMPLETE System Asset Pricing Model βW CALIBRATION — 59 DOMAINS + 2 CONTROLS ===
// Source: CLAUDE.md canonical table (2026-04-12, revenue-basis Iron Law corrected)
// I = Impossibility (physical/chemical/biological/informational floor), T = Intractability (policy/rule-change path exists)
const ALL_BETAS = [
  { key: "firearms", domain: "Firearms", beta: 50.99, type: "T", slug: "sapm-firearms" },
  { key: "cybercrime", domain: "Cybercrime & Ransomware", beta: 31.10, type: "T", slug: "sapm-cybercrime" },
  { key: "humanTrafficking", domain: "Human Trafficking", beta: 22.62, type: "T", slug: "sapm-human-trafficking" },
  { key: "wmd", domain: "Weapons of Mass Destruction", beta: 21.92, type: "I", slug: "sapm-wmd" },
  { key: "childLabor", domain: "Child Labor", beta: 21.83, type: "T", slug: "sapm-child-labor" },
  { key: "opioid", domain: "Opioid Ecosystem", beta: 14.96, type: "T", slug: "sapm-opioids" },
  { key: "conflictMinerals", domain: "Conflict Minerals", beta: 12.60, type: "T", slug: "sapm-conflict-minerals" },
  { key: "privatePrisons", domain: "Private Prisons", beta: 12.08, type: "T", slug: "sapm-private-prisons" },
  { key: "creditRating", domain: "Credit Rating Agencies", beta: 11.21, type: "T", slug: "sapm-credit-rating" },
  { key: "miningRareEarth", domain: "Mining & Rare Earth", beta: 11.15, type: "I", slug: "sapm-mining-rare-earth" },
  { key: "bigTech", domain: "Big Tech Acquisitions", beta: 7.81, type: "T", slug: "sapm-big-tech" },
  { key: "cre", domain: "Commercial Real Estate", beta: 7.78, type: "T", slug: "sapm-cre" },
  { key: "frontierAI", domain: "Frontier AI", beta: 7.51, type: "T", slug: "sapm-frontier-ai" },
  { key: "indAgMethane", domain: "Industrial Agriculture Methane", beta: 7.36, type: "I", slug: "sapm-industrial-ag-methane" },
  { key: "monoculture", domain: "Monoculture / Crop Diversity", beta: 7.36, type: "I", slug: "sapm-monoculture" },
  { key: "gambling", domain: "Gambling & Casinos", beta: 7.30, type: "T", slug: "sapm-gambling" },
  { key: "deforestation", domain: "Deforestation & Logging", beta: 7.21, type: "I", slug: "sapm-deforestation" },
  { key: "illicitDrugs", domain: "Illicit Drug Trade", beta: 7.16, type: "T", slug: "sapm-illicit-drugs" },
  { key: "paydayLending", domain: "Payday Lending", beta: 7.08, type: "T", slug: "sapm-payday-lending" },
  { key: "fastFashion", domain: "Fast Fashion", beta: 7.01, type: "I", slug: "sapm-fast-fashion" },
  { key: "coal", domain: "Coal", beta: 6.95, type: "I", slug: "sapm-coal" },
  { key: "deepSeaMining", domain: "Deep-Sea Mining", beta: 6.90, type: "I", slug: "sapm-deep-sea-mining" },
  { key: "cement", domain: "Cement & Concrete", beta: 6.74, type: "I", slug: "sapm-cement" },
  { key: "plastics", domain: "Plastics", beta: 6.67, type: "I", slug: "sapm-plastics" },
  { key: "ewaste", domain: "Electronic Waste Export", beta: 6.59, type: "T", slug: "sapm-ewaste" },
  { key: "tobacco", domain: "Tobacco", beta: 6.50, type: "T", slug: "sapm-tobacco" },
  { key: "studentLoans", domain: "Student Loan Securitization", beta: 6.36, type: "T", slug: "sapm-student-loans" },
  { key: "pbm", domain: "Pharmacy Benefit Management", beta: 6.35, type: "T", slug: "sapm-pbm" },
  { key: "platformMonopoly", domain: "Platform Monopoly", beta: 6.33, type: "T", slug: "sapm-platform-monopoly" },
  { key: "palmOil", domain: "Palm Oil", beta: 6.30, type: "I", slug: "sapm-palm-oil" },
  { key: "taxHavens", domain: "Tax Havens", beta: 6.27, type: "T", slug: "sapm-tax-havens" },
  { key: "pops", domain: "Persistent Organic Pollutants", beta: 6.23, type: "I", slug: "sapm-pops" },
  { key: "dataBrokerage", domain: "Data Brokerage / Surveillance", beta: 6.13, type: "T", slug: "sapm-data-brokerage" },
  { key: "amr", domain: "Antimicrobial Resistance", beta: 5.84, type: "I", slug: "sapm-amr" },
  { key: "socialMedia", domain: "Social Media / Youth Mental Health", beta: 5.79, type: "I", slug: "sapm-social-media" },
  { key: "geneDrives", domain: "Gene Drives", beta: 5.77, type: "I", slug: "sapm-gene-drives" },
  { key: "water", domain: "Water Privatization", beta: 5.61, type: "T", slug: "sapm-water-privatization" },
  { key: "algoPricing", domain: "Algorithmic Pricing", beta: 5.38, type: "T", slug: "sapm-algorithmic-pricing" },
  { key: "pfas", domain: "Forever Chemicals (PFAS)", beta: 5.31, type: "I", slug: "sapm-pfas" },
  { key: "peHealthcare", domain: "Private Equity Healthcare", beta: 5.24, type: "T", slug: "sapm-pe-healthcare" },
  { key: "fxFixing", domain: "Benchmark Rate Fixing", beta: 5.13, type: "T", slug: "sapm-fx-fixing" },
  { key: "bitcoin", domain: "Bitcoin / Proof-of-Work", beta: 5.00, type: "T", slug: "sapm-bitcoin" },
  { key: "aviation", domain: "Aviation Emissions", beta: 4.97, type: "I", slug: "sapm-aviation" },
  { key: "defenseProcurement", domain: "Defense Procurement", beta: 4.88, type: "T", slug: "sapm-defense-procurement" },
  { key: "orbitalDebris", domain: "Orbital Debris", beta: 4.82, type: "T", slug: "sapm-orbital-debris" },
  { key: "fisheries", domain: "Fisheries / Coral", beta: 4.70, type: "T", slug: "sapm-fisheries" },
  { key: "sovereignDebt", domain: "Sovereign Debt", beta: 4.67, type: "T", slug: "sapm-sovereign-debt" },
  { key: "insuranceClimate", domain: "Insurance & Climate Risk", beta: 4.57, type: "T", slug: "sapm-insurance-climate" },
  { key: "topsoil", domain: "Topsoil Erosion", beta: 4.41, type: "I", slug: "sapm-topsoil" },
  { key: "upf", domain: "Ultra-Processed Food", beta: 4.06, type: "T", slug: "sapm-upf" },
  { key: "groundwater", domain: "Groundwater (Ogallala)", beta: 3.46, type: "I", slug: "sapm-groundwater" },
  { key: "pos", domain: "Proof-of-Stake", beta: 3.14, type: "T", slug: "sapm-pos" },
  { key: "nuclear", domain: "Nuclear Power", beta: 0.54, type: "C", slug: "sapm-nuclear" },
  { key: "armsExports", domain: "Arms Exports", beta: 2.54, type: "T", slug: "sapm-arms-exports" },
  { key: "stablecoins", domain: "Stablecoins / Shadow Banking", beta: 2.53, type: "T", slug: "sapm-stablecoins" },
  { key: "privateMilitary", domain: "Private Military Contractors", beta: 2.06, type: "T", slug: "sapm-private-military" },
  { key: "oilGas", domain: "Oil & Gas", beta: 1.63, type: "I", slug: "sapm-oil-gas" },
  { key: "shipping", domain: "Shipping & Maritime", beta: 1.34, type: "T", slug: "sapm-shipping" },
  { key: "alcohol", domain: "Alcohol", beta: 1.33, type: "T", slug: "sapm-alcohol" },
  { key: "factoryFarming", domain: "Factory Farming", beta: 1.02, type: "I", slug: "sapm-factory-farming" },
  { key: "gigEconomy", domain: "Gig Economy", beta: 0.76, type: "C", slug: "sapm-gig-economy" },
];

// Case study domains (original Private Pareto Theorem paper)
const CASE_STUDIES = [
  { domain: "Benchmark Rate", beta: 12, classification: "Extreme", note: "δ=$9B, T*≤0" },
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
  { id: 2, c: 0, a: 1, b: 0, name: "Corrosive Win-Lose", desc: "A extracts; system degrades", color: "#991B1B" },
  { id: 3, c: 0, a: 0, b: 1, name: "Corrosive Lose-Win", desc: "B extracts; system degrades", color: "#B91C1C" },
  { id: 4, c: 1, a: 0, b: 0, name: "Stable Misery", desc: "System preserved; both lose", color: "#6B7280" },
  { id: 5, c: 0, a: 1, b: 1, name: "Hollow Win", desc: "Both gain; system degrades. Temporally unstable.", color: "#DC2626" },
  { id: 6, c: 1, a: 0, b: 1, name: "Sustainable Lose-Win", desc: "A loses for the benefit of the system and B", color: "#D97706" },
  { id: 7, c: 1, a: 1, b: 0, name: "Sustainable Win-Lose", desc: "B loses for the benefit of the system and A", color: "#F59E0B" },
  { id: 8, c: 1, a: 1, b: 1, name: "Win, Win, Win", desc: "All dimensions satisfied", color: "#059669" },
];

// === 16 IMPOSSIBILITY THEOREMS (from research_context.md canon) ===
const THEOREMS = [
  { num: 1, year: 1785, name: "Condorcet Voting Paradox", authors: "Condorcet", nobel: null,
    statement: "Majority voting can produce cycles — A beats B, B beats C, C beats A — even when every voter has rational, transitive preferences.",
    impossible: "A transitive social ordering from majority rule",
    connection: "First proof that aggregation of rational individual preferences need not be rational. Private Pareto Theorem extends this from preferences to welfare." },
  { num: 2, year: 1951, name: "Arrow's Impossibility", authors: "Arrow", nobel: 1972,
    statement: "No rank-order voting system can convert individual preferences into a community-wide ranking while satisfying unrestricted domain, Pareto, independence of irrelevant alternatives, and non-dictatorship simultaneously.",
    impossible: "A fair social welfare function that satisfies all four axioms",
    connection: "Arrow showed preference aggregation is impossible under fairness constraints. Private Pareto Theorem shows welfare preservation is impossible under bilateral rationality." },
  { num: 3, year: 1970, name: "Sen's Liberal Paradox", authors: "Sen", nobel: 1998,
    statement: "No social welfare function can simultaneously respect individual liberty — each person being decisive over at least one personal choice — and the Pareto principle.",
    impossible: "Simultaneous respect for individual rights and Pareto efficiency",
    connection: "Sen showed individual rights conflict with efficiency. Private Pareto Theorem shows bilateral efficiency conflicts with system welfare." },
  { num: 4, year: 1972, name: "Hurwicz Impossibility", authors: "Hurwicz", nobel: 2007,
    statement: "No mechanism can simultaneously achieve Pareto efficiency, incentive compatibility, and individual rationality across all preference environments.",
    impossible: "A mechanism that is efficient, truthful, and individually rational in all settings",
    connection: "Hurwicz showed mechanisms can't achieve all desirable properties. Private Pareto Theorem shows bilateral negotiation can't preserve system welfare." },
  { num: 5, year: 1973, name: "Gibbard's Theorem", authors: "Gibbard", nobel: null,
    statement: "Any non-dictatorial voting scheme with at least three possible outcomes is manipulable — some voter can always improve their outcome by misreporting preferences.",
    impossible: "A non-dictatorial, strategy-proof social choice function over 3+ outcomes",
    connection: "Gibbard showed honest reporting is not incentive-compatible. Private Pareto Theorem shows bilateral honesty cannot protect system welfare." },
  { num: 6, year: 1975, name: "Gibbard–Satterthwaite", authors: "Gibbard, Satterthwaite", nobel: null,
    statement: "Every non-dictatorial, surjective social choice function over three or more alternatives is susceptible to strategic manipulation by at least one voter.",
    impossible: "A non-dictatorial, onto, strategy-proof voting rule",
    connection: "Extends Gibbard to deterministic mechanisms. Private Pareto Theorem extends the impossibility from manipulation to welfare blindness." },
  { num: 7, year: 1977, name: "Green–Laffont", authors: "Green, Laffont", nobel: null,
    statement: "In a general preference domain, the only incentive-compatible and efficient mechanisms are Groves mechanisms — and none of them balance the budget.",
    impossible: "Incentive compatibility, allocative efficiency, and budget balance simultaneously",
    connection: "Budget balance and efficiency are incompatible. Private Pareto Theorem proves welfare preservation and bilateral efficiency are incompatible." },
  { num: 8, year: 1979, name: "Holmström Budget-Balance", authors: "Holmström", nobel: 2016,
    statement: "No budget-balanced sharing rule can make every team member's marginal contribution equal to their marginal reward. Free-riding is structurally unavoidable in teams.",
    impossible: "Efficient incentives in teams without an outside budget-breaker",
    connection: "Teams can't perfectly incentivize members. Private Pareto Theorem shows bilateral deals can't internalize system costs." },
  { num: 9, year: 1982, name: "Balinski–Young", authors: "Balinski, Young", nobel: null,
    statement: "No apportionment method can simultaneously satisfy quota — each state's share rounded up or down — and avoid the Alabama paradox, where adding a seat causes a state to lose representation.",
    impossible: "A fair apportionment method free of paradoxes",
    connection: "Fair division requires unavoidable trade-offs. Private Pareto Theorem reveals a trade-off that was invisible to bilateral analysis." },
  { num: 10, year: 1982, name: "Roth's Matching", authors: "Roth", nobel: 2012,
    statement: "No stable matching mechanism can be strategy-proof for all participants on both sides of the market. At least one side can always gain by misreporting.",
    impossible: "A stable, two-sided strategy-proof matching",
    connection: "Matching markets face strategic impossibilities. Private Pareto Theorem shows bilateral matches can succeed while destroying the system they operate in." },
  { num: 11, year: 1983, name: "Myerson–Satterthwaite", authors: "Myerson, Satterthwaite", nobel: 2007,
    statement: "No mechanism can guarantee efficient bilateral trade under private information about valuations while maintaining individual rationality and budget balance.",
    impossible: "Efficient bilateral trade under private information without subsidy",
    connection: "Bilateral efficiency under private info requires external subsidy. Private Pareto Theorem shows bilateral efficiency under system independence requires welfare destruction." },
  { num: 12, year: 1988, name: "Moulin's No-Show Paradox", authors: "Moulin", nobel: null,
    statement: "No Condorcet-consistent voting rule can be immune to the no-show paradox — a voter can sometimes obtain a better outcome by not participating at all.",
    impossible: "A Condorcet method where voting is always weakly better than abstaining",
    connection: "Even non-participation is strategically relevant. Private Pareto Theorem shows even successful bilateral participation can be system-destructive." },
  { num: 13, year: 2000, name: "Laffont–Maskin Collusion", authors: "Laffont, Maskin", nobel: 2007,
    statement: "When agents can form side-agreements, no mechanism can simultaneously achieve allocative efficiency, incentive compatibility, and collusion-proofness.",
    impossible: "An efficient, incentive-compatible, collusion-proof mechanism",
    connection: "Collusion-proofness is incompatible with efficiency. Private Pareto Theorem shows collusive outcomes are precisely where bilateral efficiency lives." },
  { num: 14, year: 2001, name: "Kaplow–Shavell", authors: "Kaplow, Shavell", nobel: null,
    statement: "Any legal rule that gives weight to fairness considerations beyond welfare will, in some cases, make every individual worse off compared to a pure welfarist rule.",
    impossible: "Non-welfarist legal criteria that are Pareto-compatible",
    connection: "Non-welfarist criteria impose costs on all. Private Pareto Theorem shows bilaterally welfarist criteria impose costs on the system." },
  { num: 15, year: 2002, name: "List–Pettit Judgment Aggregation", authors: "List, Pettit", nobel: null,
    statement: "No group can maintain logically consistent collective judgments across interconnected propositions while satisfying universal domain, systematicity, and anonymity.",
    impossible: "Consistent collective judgment under minimal democratic requirements",
    connection: "Judgment aggregation fails at the group level. Private Pareto Theorem shows welfare aggregation fails at the bilateral level." },
  { num: 16, year: 2026, name: "Private Pareto Theorem", authors: "Postnieks", nobel: null,
    statement: "For any bilateral interaction satisfying three axioms — overlapping interests, system independence, and system dependence — no Nash equilibrium exists in which both private parties gain and system welfare is preserved. The cooperative surplus visible to bilateral analysis is temporally unstable when βW > 1.",
    impossible: "Bilateral Pareto efficiency that preserves system welfare under Private-Systemic Tension axioms",
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
const MUTED = "#C8C8C8";
const DIM = "#C8C8C8";
const ACCENT = "#F59E0B";
const GOLD = "#F59E0B";
const CRIMSON = "#DC2626";

const Section = ({ number, title, subtitle }) => (
  <div style={{ marginTop: 48, marginBottom: 24 }}>
    {number && <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, letterSpacing: 2, marginBottom: 6 }}>{number}</div>}
    <h2 style={{ fontFamily: FONTS.serif, fontSize: 24, fontWeight: 400, color: "rgba(255,255,255,0.9)", margin: 0 }}>{title}</h2>
    {subtitle && <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: MUTED, marginTop: 4 }}>{subtitle}</div>}
  </div>
);

const Card = ({ children, highlight }) => (
  <div style={{ background: highlight ? `rgba(245,158,11,0.04)` : SURFACE, border: `1px solid ${highlight ? "rgba(245,158,11,0.1)" : BORDER}`, borderRadius: 2, padding: "16px 20px", marginBottom: 12 }}>
    {children}
  </div>
);

const Label2 = ({ children }) => (
  <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 8 }}>{children}</div>
);

const Mono = ({ children, color }) => (
  <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: color || DIM }}>{children}</span>
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
  { id: "betas", label: "βW Rankings" },
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, letterSpacing: 3, marginBottom: 12 }}>SYSTEM ASSET PRICING MODEL</div>
              <h1 style={{ fontFamily: FONTS.serif, fontSize: 32, fontWeight: 300, margin: 0, color: "rgba(255,255,255,0.95)", lineHeight: 1.2 }}>
                The Private Pareto Theorem
              </h1>
              <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, marginTop: 12 }}>
                © 2026 Erik Postnieks
              </div>
            </div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: DIM, textAlign: "right", display: "flex", gap: 16, alignItems: "center", marginTop: 8 }}>
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
              fontFamily: FONTS.mono, fontSize: 13, padding: "12px 16px", border: "none", cursor: "pointer",
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
            <Section title="Program Overview" subtitle="The © 2026 Erik Postnieks quantifies the welfare cost of private optimization" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
              <Card highlight>
                <Label2>CALIBRATED DOMAINS</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: ACCENT }}>32</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, marginTop: 4 }}>{typeI} Type I · {typeII} Type II · 3 case</div>
              </Card>
              <Card>
                <Label2>MEAN β<sub>W</sub></Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: betaColor(parseFloat(meanBeta)) }}>{meanBeta}</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, marginTop: 4 }}>Median: {medianBeta}</div>
              </Card>
              <Card>
                <Label2>IMPOSSIBILITY THEOREMS</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: ACCENT }}>16</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, marginTop: 4 }}>1785–2026</div>
              </Card>
              <Card>
                <Label2>COMPANION DASHBOARDS</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: ACCENT }}>37</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, marginTop: 4 }}>+ C-Adjusted GDP</div>
              </Card>
            </div>

            <Card highlight>
              <Label2>CORE RESULT</Label2>
              <div style={{ fontFamily: FONTS.serif, fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.8 }}>
                For any game satisfying three axioms — bilateral rationality, system-welfare relevance, and
                non-dictatorial payoff structure — no Nash equilibrium exists in which both private parties
                gain and system welfare is preserved. The Private Pareto Theorem (Postnieks 2026a) establishes
                that the cooperative surplus visible to bilateral analysis is temporally unstable when β<sub>W</sub> {">"} 1.
              </div>
            </Card>

            <Section number={<>β<sub>W</sub></>} title="Welfare Beta Distribution" subtitle={<>β<sub>W</sub> = −dW/dΠ — marginal welfare cost per dollar of revenue</>} />

            <div style={{ height: BETA_CHART.length * 28 + 40, marginBottom: 16 }}>
              <ResponsiveContainer>
                <BarChart data={BETA_CHART} layout="vertical" margin={{ left: 200, right: 40, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis type="number" tick={{ fill: MUTED, fontFamily: FONTS.mono, fontSize: 12 }} domain={[0, 'auto']} />
                  <YAxis type="category" dataKey="domain" tick={{ fill: DIM, fontFamily: FONTS.mono, fontSize: 13 }} width={190} interval={0} />
                  <Tooltip contentStyle={{ background: "#1a1a2e", border: `1px solid ${BORDER}`, fontFamily: FONTS.mono, fontSize: 13, color: DIM }} />
                  <Bar dataKey="beta" radius={[0, 2, 2, 0]} barSize={18}>
                    {BETA_CHART.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                  <ReferenceLine x={1} stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5">
                    <Label value="β=1" position="top" fill={MUTED} style={{ fontFamily: FONTS.mono, fontSize: 11 }} />
                  </ReferenceLine>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <Card>
              <Label2>KEY LINKS</Label2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <a href="https://c-adjusted-gdp.vercel.app" target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", padding: "12px 16px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 2 }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, letterSpacing: 1 }}>C-ADJUSTED GDP</div>
                  <div style={{ fontFamily: FONTS.serif, fontSize: 15, color: DIM, marginTop: 4 }}>Welfare-adjusted national output for 190+ countries</div>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setTab("dashboards"); }}
                  style={{ display: "block", padding: "12px 16px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2 }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, letterSpacing: 1 }}>ALL DASHBOARDS →</div>
                  <div style={{ fontFamily: FONTS.serif, fontSize: 15, color: DIM, marginTop: 4 }}>59 market-failure dashboards</div>
                </a>
              </div>
            </Card>
          </div>
        )}

        {/* ═══ DASHBOARDS ═══ */}
        {tab === "dashboards" && (
          <div>
            <Section title="Companion Dashboards" subtitle="59 market-failure System Asset Pricing Model dashboards, 2 controls + C-Adjusted GDP" />

            <a href="https://c-adjusted-gdp.vercel.app" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", marginBottom: 24 }}>
              <Card highlight>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, letterSpacing: 1, marginBottom: 4 }}>FLAGSHIP</div>
                    <div style={{ fontFamily: FONTS.serif, fontSize: 18, color: "rgba(255,255,255,0.9)" }}>C-Adjusted GDP Dashboard</div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: MUTED, marginTop: 4 }}>
                      Welfare-adjusted national output — 190+ countries, 27 System Asset Pricing Model channels, extraction ratio μ=0.15
                    </div>
                  </div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT }}>→</div>
                </div>
              </Card>
            </a>

            <Label2>DOMAIN DASHBOARDS — SORTED BY β<sub>W</sub> (DESCENDING)</Label2>

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
                    <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, width: 28, flexShrink: 0 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: FONTS.mono, fontSize: 15, color: betaColor(d.beta), width: 50, flexShrink: 0 }}>
                      {d.beta}
                    </span>
                    <span style={{ fontFamily: FONTS.serif, fontSize: 16, color: "rgba(255,255,255,0.8)", flex: 1 }}>
                      {d.domain}
                    </span>
                    <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED }}>
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
                      <span style={{ fontFamily: FONTS.serif, fontSize: 16, color: "rgba(255,255,255,0.8)" }}>{d.title}</span>
                    </div>
                  </a>
                ))}
              </>
            )}
          </div>
        )}

        {/* ═══ βW RANKINGS ═══ */}
        {tab === "betas" && (
          <div>
            <Section number="§D.2" title={<>Complete β<sub>W</sub> Calibration</>} subtitle="59 market-failure domains — marginal welfare cost per dollar of revenue" />

            <Card highlight>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, textAlign: "center" }}>
                <div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED }}>EXTREME (β≥10)</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: "#DC2626", marginTop: 4 }}>
                    {ALL_BETAS.filter(d => d.beta >= 10).length}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED }}>SEVERE (6–10)</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: "#E85D3A", marginTop: 4 }}>
                    {ALL_BETAS.filter(d => d.beta >= 6 && d.beta < 10).length}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED }}>ELEVATED (4–6)</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: "#F59E0B", marginTop: 4 }}>
                    {ALL_BETAS.filter(d => d.beta >= 4 && d.beta < 6).length}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED }}>MODERATE ({"<"}4)</div>
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
              <Mono color={MUTED}>β<sub>W</sub></Mono>
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
                      style={{ fontFamily: FONTS.mono, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
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
                      <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, marginTop: 4 }}>{d.note}</div>
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, textAlign: "center" }}>
                dollars / (dimensionless × dollars·yr⁻¹) = years
              </div>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
              <Card>
                <Label2>δ — PRIVATE SURPLUS</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: ACCENT }}>$3.7B</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, marginTop: 8, lineHeight: 1.7 }}>
                  $335/vehicle × 11M vehicles<br/>
                  Source: ICCT (2015)<br/>
                  Conservative: excludes brand premium
                </div>
              </Card>
              <Card>
                <Label2>η — FEEDBACK COUPLING</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: ACCENT }}>0.30</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, marginTop: 8, lineHeight: 1.7 }}>
                  ~30% of system damage<br/>
                  feeds back to VW via<br/>
                  regulatory + brand channels
                </div>
              </Card>
              <Card>
                <Label2>λ — ANNUAL SYSTEM LOSS</Label2>
                <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: ACCENT }}>{fmt(VW_HIGH)}/yr</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, marginTop: 8, lineHeight: 1.7 }}>
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
                    <div style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "capitalize" }}>
                      {key === "health" ? "Health Damage (NOx → PM2.5, ozone)" :
                       key === "regulatory" ? "Regulatory Integrity Erosion" :
                       key === "competitive" ? "Competitive Distortion" :
                       "Environmental Damage Beyond Health"}
                    </div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, marginTop: 4 }}>{val.source}</div>
                  </div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 15, color: ACCENT, textAlign: "right", whiteSpace: "nowrap" }}>
                    {fmt(val.low)}–{fmt(val.high)}/yr
                  </div>
                </div>
              </Card>
            ))}

            <Card highlight>
              <Label2>TOTAL λ</Label2>
              <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: DIM, lineHeight: 2 }}>
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
                    <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: t.c === 0 ? "#DC2626" : "#059669", minWidth: 48 }}>
                      ({t.c},{t.a},{t.b})
                    </div>
                    <div>
                      <div style={{ fontFamily: FONTS.mono, fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{t.name}</div>
                      <div style={{ fontFamily: FONTS.serif, fontSize: 14, color: MUTED, marginTop: 2, fontStyle: "italic" }}>{t.desc}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Card highlight>
              <Label2>THE DANGEROUS CONFLATION (Prop 8a)</Label2>
              <div style={{ fontFamily: FONTS.serif, fontSize: 15, color: DIM, lineHeight: 1.7 }}>
                Standard two-dimensional analysis maps both <Mono color="#DC2626">Hollow Win (0,1,1)</Mono> and <Mono color="#059669">Win, Win, Win (1,1,1)</Mono> to the same label: "mutual gain." This conflation allowed Benchmark Rate manipulation, cartel pricing, and algorithmic collusion to be classified identically with legitimate cooperation — for decades.
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
                          <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: ACCENT, lineHeight: 1.6, maxWidth: 500 }}>
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
                          fontFamily: FONTS.mono, fontSize: 11, color: "#F59E0B",
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
                        <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED }}>
                          {t.authors}
                        </span>
                        <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: MUTED, marginLeft: "auto" }}>
                          {isExpanded ? "−" : "+"}
                        </span>
                      </div>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                          <div style={{ marginBottom: 10 }}>
                            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>STATEMENT</div>
                            <div style={{ fontFamily: FONTS.serif, fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                              {t.statement}
                            </div>
                          </div>
                          <div style={{ marginBottom: 10 }}>
                            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>PROVED IMPOSSIBLE</div>
                            <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: CRIMSON }}>
                              {t.impossible}
                            </div>
                          </div>
                          {t.connection && (
                            <div>
                              <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>CONNECTION TO Private Pareto Theorem</div>
                              <div style={{ fontFamily: FONTS.serif, fontSize: 14, color: ACCENT, fontStyle: "italic", lineHeight: 1.6 }}>
                                {t.connection}
                              </div>
                            </div>
                          )}
                          {isPPT && (
                            <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 2 }}>
                              <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: ACCENT, letterSpacing: 1, marginBottom: 4 }}>THE STRUCTURAL DIFFERENCE</div>
                              <div style={{ fontFamily: FONTS.serif, fontSize: 14, color: DIM, lineHeight: 1.7 }}>
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
        <Mono color="rgba(255,255,255,0.2)">© 2026 Erik Postnieks · © 2026 Erik Postnieks · All rights reserved</Mono>
      </footer>
    </div>
  );
}
