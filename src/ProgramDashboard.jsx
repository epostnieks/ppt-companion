import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

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
const MUTED = "rgba(255,255,255,0.35)";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "rgba(255,255,255,0.55)";

// ─── PROGRAM STATISTICS ──────────────────────────────────────
const STATS = {
  // Papers
  workingPapers: 73,
  domainPapers: 61,
  frameworkPapers: 6,
  foundationalPapers: 1, // PPT
  daChapters: 5, // DA chapters
  totalWords: 3058349,
  totalPages: Math.round(3058349 / 300), // ~300 words/page

  // Theorems
  impossibilityTheorems: 22,
  intractabilityTheorems: 39,
  foundationalTheorem: 1, // PPT
  totalTheorems: 62, // 22 + 39 + 1

  // Figures & tables (estimated from completed papers)
  estimatedFigures: 450,
  estimatedTables: 200,

  // MC simulations
  monteCarloRepos: 61,
  drawsPerDomain: 10000,
  totalDraws: 610000,
  distributionTypes: 3, // triangular, lognormal, uniform

  // Coverage
  countries: 190,
  languages: 22,
  sectors: 11,
  marketFailures: 61,
  agents: 6,

  // PolicyLab
  policyLabDomains: 61,
  policyLabAgents: 6,
  policyLabCountries: 190,
  policyLabStatements: 61 * 6 * 190, // ~69,540

  // Welfare
  totalDeltaW: 86.3, // $T
  reformedGdpGain: 3.2, // $T
  preventableDeaths: "10-15M", // per year

  // Curriculum
  curriculumChapters: 9,
  impossibilityCanon: 17, // prior theorems

  // Website
  companionSites: 35,
};

// ─── CONTRIBUTION SUMMARY ────────────────────────────────────
const CONTRIBUTIONS = [
  {
    title: "The Private Pareto Theorem",
    desc: "The 18th impossibility theorem in economics. Three axioms prove that bilateral efficiency and system welfare preservation are structurally incompatible. The Hollow Win is not a market failure — it is an impossibility result.",
  },
  {
    title: "System Welfare Beta (βW)",
    desc: "A new measurement framework — the CAPM of welfare economics. βW quantifies the marginal rate of system destruction per dollar of private gain. Calibrated across 61 domains via Monte Carlo simulation.",
  },
  {
    title: "61 Domain Theorems",
    desc: "22 Impossibility Theorems (physical/chemical/biological constraints no policy can override) and 39 Intractability Theorems (institutional constraints with proven policy solutions). Every theorem has domain-specific axioms, a formal proof, and MC-calibrated βW.",
  },
  {
    title: "Six-Agent Conflictoring Protocol",
    desc: "A multi-audience architecture that replaces bilateral negotiation. Six agents — Whistleblower, Plaintiff, Regulator, Legislator, Investor, Supranational — impose costs that make PST conformism strictly dominated when k* agents activate simultaneously.",
  },
  {
    title: "C-Adjusted GDP",
    desc: "GDP minus the welfare cost of system-degrading activity. At full calibration, ~$20 trillion disappears from global output. The number that GDP was supposed to be.",
  },
  {
    title: "Five Framework Laws",
    desc: "Reform Dividend, Fiscal Capture Theorem, Substitution Trap Law, Disclosure Futility Theorem, Postnieks's Law — five cross-domain results that explain why reform fails and what it takes to succeed.",
  },
];

// ─── LEARNING PATHS ──────────────────────────────────────────
const LEARNING_PATHS = [
  {
    icon: "📄",
    title: "Working Papers",
    audience: "Academics & Researchers",
    desc: "73 full working papers with formal proofs, Monte Carlo simulations, bibliographies, and falsification bounties. 3 million+ words. The complete record.",
    time: "200+ hours",
    status: "Available",
    color: RED,
  },
  {
    icon: "📊",
    title: "Interactive Dashboards",
    audience: "Visual Learners & Analysts",
    desc: "Interactive companion sites with welfare beta charts, domain decomposition, simulation histograms, and policy tools. Drill into any domain.",
    time: "Self-paced",
    status: "Available",
    color: GOLD,
  },
  {
    icon: "📖",
    title: "Paper Summaries",
    audience: "College-Level Readers",
    desc: "Collapsible section-by-section summaries of every paper. Key findings, figures, tables, and FAQs including six-agent advice.",
    time: "15-30 min each",
    status: "Available",
    color: PURPLE,
  },
  {
    icon: "🎧",
    title: "NotebookLM Podcasts",
    audience: "Audio & Casual Learners",
    desc: "AI-generated podcast discussions of each paper. Listen on your commute. Covers the core argument, key data, and implications.",
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
    title: "8-Chapter Curriculum",
    audience: "Everyone",
    desc: "The complete PPT framework in 30 minutes. From 'The Lie in the Number' to 'The Domain Theorems.' Interactive charts and glossary tooltips.",
    time: "30 min",
    status: "Available",
    color: GOLD,
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
        <div style={{ fontFamily: M, fontSize: 10, color: MUTED, marginTop: 4 }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

// ─── THEOREM TYPE BAR CHART DATA ─────────────────────────────
const theoremBarData = [
  { name: "Impossibility", count: 22, color: RED },
  { name: "Intractability", count: 39, color: GOLD },
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
export default function ProgramDashboard({ onNavigate }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* HEADER */}
        <div style={{ paddingTop: 72, marginBottom: 48, textAlign: "center" }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 4, marginBottom: 12 }}>
            SAPM RESEARCH PROGRAM
          </div>
          <h1 style={{ fontFamily: S, fontSize: 36, fontWeight: 300, color: TEXT, margin: "0 0 16px", lineHeight: 1.3 }}>
            The System Asset Pricing Model
          </h1>
          <div style={{ fontFamily: S, fontSize: 20, color: DIM, lineHeight: 1.7, maxWidth: 700, margin: "0 auto" }}>
            73 working papers. 62 theorems. 3 million words. One result: bilateral efficiency
            and system welfare are structurally incompatible, and the damage is $86.3 trillion per year.
          </div>
          <div style={{ fontFamily: M, fontSize: 12, color: MUTED, marginTop: 16 }}>
            Erik Postnieks · Independent Researcher · Salt Lake City · 2025-2026
          </div>
        </div>

        {/* ═══ HERO STATS ═══ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
          marginBottom: 48,
        }}>
          <StatCard value={73} label="WORKING PAPERS" sublabel="61 domain + 6 framework + 6 other" color={GOLD} large />
          <StatCard value="3M+" label="WORDS" sublabel="~10,000 pages" color={TEXT} large />
          <StatCard value={62} label="THEOREMS" sublabel="22 impossibility + 39 intractability + 1 foundational" color={RED} large />
          <StatCard value="$86.3T" label="ANNUAL WELFARE COST" sublabel="across 61 domains" color={RED} large />
          <StatCard value={190} label="COUNTRIES" sublabel="policy advice per domain" color={GREEN} large />
          <StatCard value={22} label="LANGUAGES" sublabel="full site localization" color={CYAN} large />
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
            <StatCard value={61} label="DOMAIN PAPERS" color={GOLD} />
            <StatCard value={6} label="FRAMEWORK PAPERS" color={PURPLE} />
            <StatCard value={61} label="MONTE CARLO SIMULATIONS" sublabel="10,000 draws each" color={CYAN} />
            <StatCard value="610K" label="SIMULATION DRAWS" sublabel="seed=42, reproducible" color={CYAN} />
            <StatCard value={3} label="DISTRIBUTION TYPES" sublabel="triangular, lognormal, uniform" color={DIM} />
            <StatCard value={61} label="PUBLIC REPLICATION REPOS" sublabel="github.com/epostnieks" color={GREEN} />
            <StatCard value={11} label="SECTORS" color={DIM} />
            <StatCard value={6} label="AGENT TYPES" sublabel="Conflictoring Protocol" color={PURPLE} />
            <StatCard value={35} label="COMPANION SITES" sublabel="interactive dashboards" color={GOLD} />
            <StatCard value={9} label="CURRICULUM CHAPTERS" sublabel="30 min total" color={GREEN} />
            <StatCard value={17} label="PRIOR IMPOSSIBILITY THEOREMS" sublabel="1785-2013, 8 Nobel Prizes" color={MUTED} />
            <StatCard value="18th" label="THE PPT" sublabel="first to address bilateral vs. system welfare" color={RED} />
          </div>
        </div>

        {/* ═══ THEOREM BREAKDOWN ═══ */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 16 }}>
            THEOREM CLASSIFICATION
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Bar chart */}
            <div style={{ padding: 20, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
              <div style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>62 THEOREMS BY TYPE</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={theoremBarData} layout="vertical" margin={{ left: 90, right: 30 }}>
                  <XAxis type="number" tick={{ fontFamily: M, fontSize: 11, fill: DIM }} label={{ value: "Number of Theorems", position: "insideBottom", offset: -2, style: { fontFamily: M, fontSize: 10, fill: MUTED } }} />
                  <YAxis type="category" dataKey="name" tick={{ fontFamily: M, fontSize: 12, fill: DIM }} width={80} label={{ value: "Theorem Type", angle: -90, position: "insideLeft", offset: -75, style: { fontFamily: M, fontSize: 10, fill: MUTED } }} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} label={{ position: "right", fontFamily: M, fontSize: 13, fill: TEXT }}>
                    {theoremBarData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                  <Tooltip
                    contentStyle={{ background: SURFACE, border: `1px solid ${BORDER}`, fontFamily: M, fontSize: 12, color: TEXT }}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.6, marginTop: 8 }}>
                <span style={{ color: RED }}>Impossibility</span>: physical/chemical/biological — no policy can solve.{" "}
                <span style={{ color: GOLD }}>Intractability</span>: institutional — proven policy exists.{" "}
                <span style={{ color: CYAN }}>Foundational</span>: the PPT itself.
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
              <div style={{ fontFamily: M, fontSize: 9, color: MUTED, letterSpacing: 1, marginTop: 8, marginBottom: 4 }}>LEGEND</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px" }}>
                {theoremPieData.map(d => (
                  <span key={d.name} style={{ fontFamily: M, fontSize: 10, color: d.fill, display: "flex", alignItems: "center", gap: 4 }}>
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
            CONTRIBUTION TO ECONOMICS
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
                <div style={{ fontFamily: M, fontSize: 15, color: GOLD, fontWeight: 600, marginBottom: 6 }}>
                  {c.title}
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
            Three million words of content, made accessible to every learning style and time budget.
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
                    fontFamily: M, fontSize: 10, letterSpacing: 1,
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
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}>
            <div style={{
              padding: "24px 20px", background: "rgba(239,68,68,0.06)",
              border: `1px solid rgba(239,68,68,0.2)`, borderRadius: 4, textAlign: "center",
            }}>
              <div style={{ fontFamily: M, fontSize: 36, fontWeight: 700, color: RED }}>$86.3T</div>
              <div style={{ fontFamily: M, fontSize: 11, color: TEXT, letterSpacing: 1 }}>ANNUAL WELFARE DESTRUCTION</div>
              <div style={{ fontFamily: S, fontSize: 14, color: DIM, marginTop: 8 }}>
                Aggregate across 61 domains. ~83% of global GDP.
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
                Tobacco, opioids, UPF, pollution, AMR, alcohol combined.
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
              { label: "Curriculum", desc: "Learn the PPT in 30 min", view: "curriculum" },
              { label: "Deep Dive", desc: "Interactive βW dashboard", view: "deepdive" },
              { label: "Domain Tables", desc: "All 61 domains ranked", view: "tables" },
              { label: "Academic Hub", desc: "Formal propositions & falsification", view: "academic" },
              { label: "Impossibility Canon", desc: "17 prior + 62 new theorems", view: "impossibility" },
              { label: "PolicyLab", desc: "190 countries × 61 domains", view: "policylab" },
              { label: "Country Reform Paths", desc: "190 countries, proven models", view: "pstbreaker" },
              { label: "Executive Brief", desc: "Corporate exposure analysis", view: "executive" },
              { label: "Sovereign Brief", desc: "National policy analysis", view: "sovereign" },
              { label: "Paper Summaries", desc: "73 papers in 15 min each", view: "summaries" },
            ].map(nav => (
              <button
                key={nav.view}
                onClick={() => onNavigate && onNavigate(nav.view)}
                style={{
                  padding: "14px 16px", background: SURFACE, border: `1px solid ${BORDER}`,
                  borderRadius: 4, cursor: "pointer", textAlign: "left",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
                onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
              >
                <div style={{ fontFamily: M, fontSize: 13, color: GOLD, marginBottom: 4 }}>{nav.label}</div>
                <div style={{ fontFamily: S, fontSize: 14, color: DIM }}>{nav.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: "32px 0", borderTop: `1px solid ${BORDER}`, textAlign: "center" }}>
          <div style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.7, marginBottom: 12 }}>
            The largest single-author program in welfare economics.
          </div>
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED }}>
            © 2026 Erik Postnieks · Independent Researcher · Salt Lake City
          </div>
        </div>
      </main>
    </div>
  );
}
