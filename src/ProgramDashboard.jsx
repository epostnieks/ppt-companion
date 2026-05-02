"use client";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import VIEW_PATHS from "./routes";
import { Tip } from "./Glossary";
import SystemWelfareExhibit from "./SystemWelfareExhibit";

// ══════════════════════════════════════════════════════════════
// PROGRAM DASHBOARD — The Scale of the Effort
// Erik Postnieks © 2026
// ══════════════════════════════════════════════════════════════

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const BG = "#0D0D0D";
const SURFACE = "#1A1A1A";
const TEXT = "#F5F0E8";
const GOLD = "#F59E0B";
const RED = "#EF4444";
const GREEN = "#22C55E";
const CYAN = "#22D3EE";
const PURPLE = "#A78BFA";
const MUTED = "#C8C8C8";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "#C8C8C8";

// ─── PROGRAM STATISTICS ──────────────────────────────────────
const STATS = {
  // Papers
  workingPapers: 179,
  publicLaunchSlate: 71,
  domainPapers: 59,
  frameworkPapers: 14,
  foundationalPapers: 4, // PPT, Disclosure Futility, Game-Change, Accountability Reconstruction
  daChapters: 5, // Decision Accounting chapters
  totalWords: 4000000,
  totalPages: Math.round(4000000 / 300), // ~300 words/page

  // Theorems
  impossibilityTheorems: 21,
  intractabilityTheorems: 38,
  foundationalTheorem: 1, // Private Pareto Theorem
  totalTheorems: 60, // public market-failure slate + foundational theorem

  // Figures & tables (estimated from completed papers)
  estimatedFigures: 450,
  estimatedTables: 200,

  // MC simulations
  monteCarloRepos: 59,
  drawsPerDomain: 10000,
  totalDraws: 590000,
  distributionTypes: 3, // triangular, lognormal, uniform

  // Coverage
  countries: 190,
  languages: 22,
  sectors: 11,
  marketFailures: 59,
  agents: 6,

  // PolicyLab
  policyLabDomains: 59,
  policyLabAgents: 6,
  policyLabCountries: 190,
  policyLabStatements: 59 * 6 * 190, // 67,260

  // Welfare
  totalDeltaW: 89.2, // $T (MC-verified Apr 2026)
  reformedGdpGain: 3.2, // $T
  preventableDeaths: "10-15M", // per year

  // Curriculum
  curriculumChapters: 17,
  curriculumMinutes: 510,
  impossibilityCanon: 17, // prior theorems

  // Website
  websitePages: 380, // papers + countries + curriculum + policy pages
  websitePagesLocalized: 260 * 22, // 6,490 pages across 22 languages
};

// ─── CONTRIBUTION SUMMARY ────────────────────────────────────
const CONTRIBUTIONS = [
  {
    title: "The Private Pareto Theorem",
    status: "Proposed theorem",
    desc: "A proposed foundational theorem, pending peer review, that addresses a question earlier impossibility results (Arrow 1951, Sen 1970, Myerson–Satterthwaite 1983) did not pose in this form. Under three stated axioms — overlapping interests, system independence, and system dependence — bilateral Pareto efficiency and system welfare preservation cannot be simultaneously satisfied. The theorem does not claim a universal law of economics; it identifies the conditions under which bilateral optimization and systemic preservation are structurally incompatible. Breaking any one of the three axioms lifts the impossibility, which is why certain cooperative forms and well-designed regulation avoid the trap.",
  },
  {
    title: "System Welfare Beta (βW)",
    status: "Working metric",
    desc: "For every dollar of revenue, how many dollars of system welfare are destroyed? The welfare-beta βW = ΔW/Π is estimated for 59 market-failure domains via Monte Carlo simulation under three distributional families (10,000 draws per family, seed 42). Firearms: βW ≈ 51 (90% CI [40.5, 62.5]). Shipping: βW ≈ 1.34 (90% CI [1.10, 1.60]). Channel sources and sensitivity analyses are reported in each domain paper.",
  },
  {
    title: "59 Market-Failure Domain Theorems",
    status: "Public slate",
    desc: "The public market-failure slate separates binding physical, chemical, biological, or orbital constraints from institutional, jurisdictional, financial, or political constraints where at least one jurisdiction has demonstrated a proven policy solution. Each domain paper states its own axioms, proof sketch, Monte Carlo calibration, and falsification criteria.",
  },
  {
    title: "Six-Agent Conflictoring Protocol",
    status: "Proposed governance tool",
    desc: "A governance architecture in which six agents — Whistleblower, Plaintiff, Regulator, Legislator, Investor, and Supranational — each impose separate costs on system-degrading activity. The protocol is proposed, not empirically validated across jurisdictions; its role in the program is methodological, requiring each sub-agent to hold an adversarial prior so that the overall analysis is not optimized toward any pre-specified conclusion.",
  },
  {
    title: "C-Adjusted GDP",
    status: "Preliminary extension",
    desc: "A preliminary adjustment of national GDP that subtracts an estimate of the welfare cost of system-degrading activity. At the program's current full-panel aggregation, the adjustment is on the order of tens of trillions of dollars at the global level. The methodology, limitations, and sensitivity to channel definitions are documented in the reference papers.",
  },
  {
    title: "Four Core Theory Papers plus the Bridge Layer",
    status: "Program architecture",
    desc: "The core theory block now has four legs: the Private Pareto Trap, Disclosure Futility, Game-Change / Institutional Transformation, and Accountability Reconstruction. The bridge layer — the Reform Dividend, Fiscal Capture, the Substitution Trap, Postnieks's Law, and Conflictoring — translates those results into reform arithmetic and institutional design.",
  },
];

// ─── LEARNING PATHS ──────────────────────────────────────────
const LEARNING_PATHS = [
  {
    icon: "📄",
    title: "Ranked Publication Corpus",
    audience: "Academics & Researchers",
    desc: "A ranked corpus of SAPM papers, scholar extensions, and bridge papers with formal claims, Monte Carlo simulations where applicable, bibliographies, source packages, and publication-order triage.",
    time: "200+ hours",
    status: "Available",
    color: RED,
  },
  {
    icon: "📊",
    title: "Interactive Dashboards",
    audience: "Visual Learners & Analysts",
    desc: "Interactive dashboards with welfare beta rankings, domain breakdowns, simulation histograms, and policy tools. Drill into the 59 market-failure domains.",
    time: "Self-paced",
    status: "Available",
    color: GOLD,
  },
  {
    icon: "📖",
    title: "Paper Summaries",
    audience: "College-Level Readers",
    desc: "Section-by-section summaries for papers. Each entry should identify the core contribution, source base, policy instrument, DA mechanism, and publication priority.",
    time: "15-30 min each",
    status: "Available",
    color: PURPLE,
  },
  {
    icon: "🎧",
    title: "NotebookLM Podcasts",
    audience: "Audio & Casual Learners",
    desc: "Podcast discussions of each paper. Listen on your commute. Covers the core argument, key data, and implications.",
    time: "20-40 min each",
    status: "In Development",
    color: CYAN,
  },
  {
    icon: "🎬",
    title: "Narrated Slideshows",
    audience: "Visual Learners",
    desc: "45-60 minute narrated walkthroughs with every figure from the papers. Text-to-speech synthesis over the actual working paper figures.",
    time: "45-60 min each",
    status: "In Development",
    color: GREEN,
  },
  {
    icon: "🎓",
    title: "Expanded Core Curriculum",
    audience: "Everyone",
    desc: "The current core path is a compact introduction to theorem foundations, SAPM measurement, Decision Accounting, public policy, global jurisdictions, source packages, and publication strategy.",
    time: "~8-hour core",
    status: "Available",
    color: GOLD,
  },
];

const STATUS_OVERVIEW = [
  {
    eyebrow: "PUBLIC NOW",
    title: "59 calibrated domains",
    body: "The site publishes the market-failure slate, domain summaries, rankings, and policy tooling already exposed on the public routes.",
    color: GOLD,
  },
  {
    eyebrow: "PROPOSED",
    title: "Private Pareto Theorem",
    body: "The theorem is presented as a proposed contribution with peer review pending, not as settled canon.",
    color: RED,
  },
  {
    eyebrow: "METHOD",
    title: "Source-first calibration",
    body: "Each domain is meant to connect the claim, the Monte Carlo estimate, and the underlying source package rather than asking readers to trust a black box.",
    color: CYAN,
  },
  {
    eyebrow: "TRANSLATION",
    title: "190-country policy layer",
    body: "PolicyLab and Reform Pathfinder are the program's country-translation layer, with route coverage expanding as papers and policy paths are completed.",
    color: GREEN,
  },
];

const FIRST_CLICK_PATHS = [
  {
    title: "New to the thesis",
    desc: "Take the 8-hour core path if you need the theorem, the taxonomy, and the measurement logic in order.",
    cta: "Start with Curriculum",
    href: VIEW_PATHS.curriculum,
    color: GOLD,
  },
  {
    title: "Testing the numbers",
    desc: "Use the tables, deep-dive dashboard, and academic hub if you want rankings, theorem types, and falsification hooks before narrative.",
    cta: "Open Data Routes",
    href: VIEW_PATHS.tables,
    color: CYAN,
  },
  {
    title: "Looking for action",
    desc: "Go to PolicyLab or Reform Pathfinder if your question is which reforms travel across countries and which domains remain addressable.",
    cta: "See Policy Tools",
    href: VIEW_PATHS.policylab,
    color: GREEN,
  },
  {
    title: "Time-constrained reviewer",
    desc: "Read the paper summaries if you want a quick pass on claims, evidence, and publication priority before committing to full papers.",
    cta: "Browse Summaries",
    href: VIEW_PATHS.summaries,
    color: PURPLE,
  },
];

const TRUST_SIGNALS = [
  {
    title: "What the claim is",
    body: "A narrower claim than 'all markets fail': under stated conditions, bilateral optimization can degrade the shared system both parties rely on.",
  },
  {
    title: "What can be checked",
    body: "Domain routes expose theorem type, welfare beta, policy status, summaries, and navigation into the underlying paper stack.",
  },
  {
    title: "What is still contested",
    body: "Peer-review status, aggregation choices, and cross-domain welfare assumptions remain live questions and should be read that way.",
  },
];

const REVIEW_LANES = [
  {
    title: "Academics",
    detail: "Formal claims, falsification criteria, canon placement, and peer-review status.",
  },
  {
    title: "Policymakers",
    detail: "Which domains are institutionally reformable, where proven models exist, and how reforms translate by country.",
  },
  {
    title: "Operators and executives",
    detail: "Where private gain becomes systemic fragility, which sectors screen as exposed, and what governance changes alter the payoff structure.",
  },
];

// ─── STAT CARD ───────────────────────────────────────────────
function StatCard({ value, label, sublabel, color = GOLD, large = false }) {
  return (
    <div style={{
      padding: large ? "24px 20px" : "16px 14px",
      background: SURFACE,
      border: `1px solid ${BORDER}`,
      borderRadius: 4,
      borderTop: `3px solid ${color}`,
      textAlign: "center",
      minWidth: 0,
    }}>
      <div style={{
        fontFamily: M,
        fontSize: large ? 36 : 28,
        fontWeight: 700,
        color: color,
        lineHeight: 1.1,
        marginBottom: 6,
      }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div style={{ fontFamily: M, fontSize: 11, color: TEXT, letterSpacing: 1, lineHeight: 1.3 }}>
        {label}
      </div>
      {sublabel && (
        <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginTop: 4 }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

// ─── THEOREM TYPE BAR CHART DATA ─────────────────────────────
const theoremBarData = [
  { name: "Impossibility", count: STATS.impossibilityTheorems, color: RED },
  { name: "Intractability", count: STATS.intractabilityTheorems, color: GOLD },
  { name: "Foundational", count: 1, color: CYAN },
];

const theoremPieData = [
  { name: "Physical / Chemical", value: 10, fill: "#F472B6" },
  { name: "Biological / Ecological", value: 7, fill: "#34D399" },
  { name: "Thermodynamic", value: 5, fill: "#22D3EE" },
  { name: "Institutional / Economic", value: 22, fill: "#A78BFA" },
  { name: "Jurisdictional / Legal", value: 10, fill: "#FB923C" },
  { name: "Financial / Informational", value: 7, fill: "#FCD34D" },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────
export default function ProgramDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* HEADER */}
        <div style={{ paddingTop: 72, marginBottom: 48, textAlign: "center" }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 4, marginBottom: 12 }}>
            System Asset Pricing Model RESEARCH PROGRAM
          </div>
          <h1 style={{ fontFamily: S, fontSize: 36, fontWeight: 300, color: TEXT, margin: "0 0 16px", lineHeight: 1.3 }}>
            When privately efficient deals damage the systems they rely on
          </h1>
          <div style={{ fontFamily: S, fontSize: 20, color: DIM, lineHeight: 1.7, maxWidth: 700, margin: "0 auto" }}>
            A source-first research program on a specific question: when can a privately efficient deal degrade the system both parties depend on? This site packages the proposed theorem, 59 calibrated market-failure domains, policy translation across 190 countries, and guided entry points for readers who want the argument, the evidence, or the reform layer first.
          </div>
          <div style={{ fontFamily: M, fontSize: 12, color: MUTED, marginTop: 16 }}>
            Erik Postnieks · Independent Researcher · Salt Lake City · Core theorem claims presented as proposed, with peer review pending
          </div>

          {/* ═══ START HERE CTA ═══ */}
          <div className="hero-actions" style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
            <Link href="/curriculum" style={{
              fontFamily: M, fontSize: 13, letterSpacing: 1, fontWeight: 700,
              color: "#0D0D0D", background: GOLD,
              padding: "14px 32px", borderRadius: 4, textDecoration: "none",
              border: "none", cursor: "pointer",
            }}>
              START HERE — 8-HOUR CORE
            </Link>
            <Link href="/academic" style={{
              fontFamily: M, fontSize: 13, letterSpacing: 1, fontWeight: 600,
              color: GOLD, background: "transparent",
              padding: "14px 32px", borderRadius: 4, textDecoration: "none",
              border: `1px solid rgba(245,158,11,0.3)`, cursor: "pointer",
            }}>
              AUDIT THE THESIS
            </Link>
            <Link href="/summaries" style={{
              fontFamily: M, fontSize: 13, letterSpacing: 1, fontWeight: 600,
              color: TEXT, background: "transparent",
              padding: "14px 32px", borderRadius: 4, textDecoration: "none",
              border: `1px solid ${BORDER}`, cursor: "pointer",
            }}>
              BROWSE SUMMARIES
            </Link>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 12,
            textAlign: "left",
            marginTop: 28,
          }}>
            {STATUS_OVERVIEW.map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "18px 18px 16px",
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderTop: `3px solid ${item.color}`,
                  borderRadius: 4,
                }}
              >
                <div style={{ fontFamily: M, fontSize: 11, color: item.color, letterSpacing: 1.5, marginBottom: 8 }}>
                  {item.eyebrow}
                </div>
                <div style={{ fontFamily: M, fontSize: 14, color: TEXT, marginBottom: 8 }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.65 }}>
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        <SystemWelfareExhibit />

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 16 }}>
            STARTING ROUTES
          </div>
          <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7, marginBottom: 18 }}>
            The site is broad enough to overwhelm first-time visitors. Pick the route that matches the question you are actually trying to answer.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {FIRST_CLICK_PATHS.map((path) => (
              <Link
                key={path.title}
                href={path.href}
                style={{
                  padding: "18px 18px 16px",
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderLeft: `3px solid ${path.color}`,
                  borderRadius: 4,
                  textDecoration: "none",
                }}
              >
                <div style={{ fontFamily: M, fontSize: 14, color: TEXT, marginBottom: 8 }}>
                  {path.title}
                </div>
                <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.65, marginBottom: 12 }}>
                  {path.desc}
                </div>
                <div style={{ fontFamily: M, fontSize: 11, color: path.color, letterSpacing: 1.2 }}>
                  {path.cta}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 16 }}>
            HOW TO READ THIS PROGRAM
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            <div style={{ padding: "20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
              <div style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1.4, marginBottom: 10 }}>
                WHAT IS PUBLIC, WHAT IS PROVISIONAL
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {TRUST_SIGNALS.map((signal) => (
                  <div key={signal.title}>
                    <div style={{ fontFamily: M, fontSize: 13, color: GOLD, marginBottom: 4 }}>
                      {signal.title}
                    </div>
                    <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.65 }}>
                      {signal.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
              <div style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1.4, marginBottom: 10 }}>
                REVIEW LENSES
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {REVIEW_LANES.map((lane) => (
                  <div key={lane.title} style={{ paddingBottom: 12, borderBottom: `1px solid ${BORDER}` }}>
                    <div style={{ fontFamily: M, fontSize: 13, color: TEXT, marginBottom: 4 }}>
                      {lane.title}
                    </div>
                    <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.65 }}>
                      {lane.detail}
                    </div>
                  </div>
                ))}
                <div style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1.1 }}>
                  Search is available from the left rail. On smaller screens, open the menu first, then launch search with the on-screen control or <span style={{ color: TEXT }}>Ctrl/Cmd + K</span>.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ HERO STATS ═══ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
          marginBottom: 48,
        }}>
          <StatCard value={STATS.publicLaunchSlate} label="WAVE 1 SLATE" sublabel="59 SAPM + 12 theory/bridge" color={GOLD} large />
          <StatCard value="4M+" label="WORDS" sublabel="source-first corpus" color={TEXT} large />
          <StatCard value={60} label="THEOREMS" sublabel="market-failure slate + 1 foundational" color={RED} large />
          <StatCard value="$89.2T" label="ANNUAL WELFARE COST" sublabel="working market-failure aggregate" color={RED} large />
          <StatCard value={190} label="COUNTRIES" sublabel="jurisdiction target" color={GREEN} large />
          <StatCard value={22} label="LANGUAGES" sublabel="translation target" color={CYAN} large />
        </div>

        {/* ═══ BY THE NUMBERS ═══ */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 16 }}>
            BY THE NUMBERS
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 10,
          }}>
            <StatCard value={59} label="MARKET-FAILURE PAPERS" color={GOLD} />
            <StatCard value={14} label="FOUNDATIONAL / BRIDGE PAPERS" color={PURPLE} />
            <StatCard value={59} label="CALIBRATIONS" sublabel="market-failure domains" color={CYAN} />
            <StatCard value="590K" label="SIMULATION DRAWS" sublabel="seed=42, reproducible" color={CYAN} />
            <StatCard value={3} label="DISTRIBUTION TYPES" sublabel="triangular, lognormal, uniform" color={DIM} />
            <StatCard value={59} label="REPLICATION REPOS" sublabel="market-failure domains" color={GREEN} />
            <StatCard value={11} label="SECTORS" color={DIM} />
            <StatCard value={6} label="AGENT TYPES" sublabel="Conflictoring Protocol" color={PURPLE} />
            <StatCard value={STATS.curriculumChapters} label="CURRICULUM CHAPTERS" sublabel="~8-hour core" color={GREEN} />
            <StatCard value="LATER" label="BOOKS" sublabel="announced only when published" color={GOLD} />
            <StatCard value="67K" label="POLICYLAB STATEMENTS" sublabel="planned grid: 59 × 6 × 190" color={GREEN} />
            <StatCard value={STATS.impossibilityCanon} label="PRIOR IMPOSSIBILITY THEOREMS" sublabel="1785-2013 canon, proposed extension pending" color={MUTED} />
            <StatCard value="PENDING" label="PRIVATE PARETO THEOREM" sublabel="proposed canon addition, peer review pending" color={RED} />
          </div>
        </div>

        {/* ═══ THEOREM BREAKDOWN ═══ */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 16 }}>
            THEOREM CLASSIFICATION
          </div>
          <div className="theorem-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Bar chart */}
            <div style={{ padding: 20, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
              <div style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>PUBLIC THEOREMS BY TYPE</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={theoremBarData} layout="vertical" margin={{ left: 90, right: 30 }}>
                  <XAxis type="number" tick={{ fontFamily: M, fontSize: 11, fill: DIM }} label={{ value: "Number of Theorems", position: "insideBottom", offset: -2, style: { fontFamily: M, fontSize: 11, fill: MUTED } }} />
                  <YAxis type="category" dataKey="name" tick={{ fontFamily: M, fontSize: 12, fill: DIM }} width={80} label={{ value: "Theorem Type", angle: -90, position: "insideLeft", offset: -75, style: { fontFamily: M, fontSize: 11, fill: MUTED } }} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} label={{ position: "right", fontFamily: M, fontSize: 13, fill: TEXT }}>
                    {theoremBarData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                  <Tooltip
                    contentStyle={{ background: SURFACE, border: `1px solid ${BORDER}`, fontFamily: M, fontSize: 12, color: TEXT }}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.6, marginTop: 8 }}>
                <span style={{ color: RED }}>Impossibility</span>: physical/chemical/biological/informational — no policy path escapes the binding floor.{" "}
                <span style={{ color: GOLD }}>Intractability</span>: policy/rule-change path exists.{" "}
                <span style={{ color: CYAN }}>Foundational</span>: the Private Pareto Theorem.
              </div>
            </div>

            {/* Constraint pie */}
            <div style={{ padding: 20, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
              <div style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>CONSTRAINT CATEGORIES</div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={theoremPieData} dataKey="value" cx="50%" cy="50%" outerRadius={65} innerRadius={30}
                    label={({ value }) => value}
                    labelLine={false}
                  >
                    {theoremPieData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: SURFACE, border: `1px solid ${BORDER}`, fontFamily: M, fontSize: 12, color: TEXT }}
                    formatter={(value, name) => [`${value} theorems`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1, marginTop: 8, marginBottom: 4 }}>LEGEND</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px" }}>
                {theoremPieData.map(d => (
                  <span key={d.name} style={{ fontFamily: M, fontSize: 11, color: d.fill, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: d.fill, display: "inline-block" }} />
                    {d.name} ({d.value})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ CONTRIBUTION TO ECONOMICS ═══ */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 16 }}>
            CORE CLAIMS AND TOOLS
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {CONTRIBUTIONS.map((c, i) => (
              <div key={i} style={{
                padding: "16px 20px",
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: 4,
                borderLeft: `3px solid ${GOLD}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                  <div style={{ fontFamily: M, fontSize: 15, color: GOLD, fontWeight: 600 }}>
                    {c.title}
                  </div>
                  <div style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1.2, whiteSpace: "nowrap" }}>
                    {c.status.toUpperCase()}
                  </div>
                </div>
                <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7 }}>
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ LEARNING PATHS ═══ */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 8 }}>
            LEARNING PATHS
          </div>
          <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7, marginBottom: 16 }}>
            Four million-plus words of content, made accessible through core curriculum, summaries, policy paths, and source-first research packages.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {LEARNING_PATHS.map((p, i) => (
              <div key={i} style={{
                padding: "20px",
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: 4,
                borderTop: `3px solid ${p.color}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 24 }}>{p.icon}</span>
                  <span style={{
                    fontFamily: M, fontSize: 11, letterSpacing: 1,
                    color: p.status === "Available" ? GREEN : MUTED,
                    padding: "2px 8px",
                    background: p.status === "Available" ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.03)",
                    borderRadius: 3,
                  }}>
                    {p.status.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontFamily: M, fontSize: 14, color: TEXT, fontWeight: 600, marginBottom: 4 }}>
                  {p.title}
                </div>
                <div style={{ fontFamily: M, fontSize: 11, color: p.color, marginBottom: 8 }}>
                  {p.audience} · {p.time}
                </div>
                <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.6 }}>
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ WELFARE IMPACT ═══ */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 16 }}>
            WELFARE IMPACT
          </div>
          <div className="impact-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}>
            <div style={{
              padding: "24px 20px", background: "rgba(239,68,68,0.06)",
              border: `1px solid rgba(239,68,68,0.2)`, borderRadius: 4, textAlign: "center",
            }}>
              <div style={{ fontFamily: M, fontSize: 36, fontWeight: 700, color: RED }}>$89.2T</div>
              <div style={{ fontFamily: M, fontSize: 11, color: TEXT, letterSpacing: 1 }}>ANNUAL WELFARE DESTRUCTION</div>
              <div style={{ fontFamily: S, fontSize: 14, color: DIM, marginTop: 8 }}>
                Working aggregate across the market-failure slate. ~83% of global GDP.
              </div>
            </div>
            <div style={{
              padding: "24px 20px", background: "rgba(34,197,94,0.06)",
              border: `1px solid rgba(34,197,94,0.2)`, borderRadius: 4, textAlign: "center",
            }}>
              <div style={{ fontFamily: M, fontSize: 36, fontWeight: 700, color: GREEN }}>$3.2T</div>
              <div style={{ fontFamily: M, fontSize: 11, color: TEXT, letterSpacing: 1 }}>REFORMED GDP GAIN</div>
              <div style={{ fontFamily: S, fontSize: 14, color: DIM, marginTop: 8 }}>
                Cleanup savings + productivity recovery. Lower bound.
              </div>
            </div>
            <div style={{
              padding: "24px 20px", background: "rgba(245,158,11,0.06)",
              border: `1px solid rgba(245,158,11,0.2)`, borderRadius: 4, textAlign: "center",
            }}>
              <div style={{ fontFamily: M, fontSize: 36, fontWeight: 700, color: GOLD }}>10-15M</div>
              <div style={{ fontFamily: M, fontSize: 11, color: TEXT, letterSpacing: 1 }}>PREVENTABLE DEATHS / YEAR</div>
              <div style={{ fontFamily: S, fontSize: 14, color: DIM, marginTop: 8 }}>
                Tobacco, opioids, Ultra-Processed Food, pollution, Antimicrobial Resistance, alcohol combined.
              </div>
            </div>
          </div>
        </div>

        {/* ═══ NAVIGATE ═══ */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 16 }}>
            EXPLORE
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
            {[
              { label: "Curriculum", desc: "Expanded ~8-hour core path", view: "curriculum" },
              { label: "Publication Roadmap", desc: "Wave 1 launch slate by intended order", view: "roadmap" },
              { label: "Deep Dive", desc: "Interactive βW dashboard", view: "deepdive" },
              { label: "Domain Tables", desc: "59 market-failure domains", view: "tables" },
              { label: "Academic Hub", desc: "Formal propositions & falsification", view: "academic" },
              { label: "Impossibility Canon", desc: "Prior canon plus proposed SAPM results", view: "impossibility" },
              { label: "PolicyLab", desc: "190 countries × 59 domains", view: "policylab" },
              { label: "Reform Pathfinder", desc: "190 countries, proven models", view: "pstbreaker" },
              { label: "Executive Brief", desc: "Corporate exposure analysis", view: "executive" },
              { label: "Sovereign Brief", desc: "National policy analysis", view: "sovereign" },
              { label: "Paper Summaries", desc: "Ranked paper summaries", view: "summaries" },
            ].map(nav => (
              <Link
                key={nav.view}
                href={VIEW_PATHS[nav.view] || "/"}
                style={{
                  padding: "14px 16px", background: SURFACE, border: `1px solid ${BORDER}`,
                  borderRadius: 4, cursor: "pointer", textAlign: "left",
                  transition: "border-color 0.2s", textDecoration: "none",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
                onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
              >
                <div style={{ fontFamily: M, fontSize: 13, color: GOLD, marginBottom: 4 }}>{nav.label}</div>
                <div style={{ fontFamily: S, fontSize: 14, color: DIM }}>{nav.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: "32px 0", borderTop: `1px solid ${BORDER}`, textAlign: "center" }}>
          <div style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.7, marginBottom: 12 }}>
            A source-first research program in welfare economics, system design, and policy translation.
          </div>
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED }}>
            © 2026 Erik Postnieks · Independent Researcher · Salt Lake City
          </div>
        </div>
      </main>

      <style jsx>{`
        @media (max-width: 920px) {
          .theorem-grid,
          .impact-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 680px) {
          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}
