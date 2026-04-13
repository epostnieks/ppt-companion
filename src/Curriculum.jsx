import { useState, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer, Cell, CartesianGrid, LabelList } from "recharts";

// ══════════════════════════════════════════════════════════════
// SAPM Curriculum — 15 Chapters + Data Notes
// Erik Postnieks © 2026
// Palette matched to c-adjusted-gdp.vercel.app
// ══════════════════════════════════════════════════════════════

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

// ─── TOOLTIP ─────────────────────────────────────────────────
const GLOSSARY = {
  "βW": "System welfare beta — the marginal rate of system welfare destruction per dollar of private gain. βW = −dW/dΠ.",
  "PST": "Private-Systemic Tension — the three axioms (overlapping interests, system independence, system dependence) under which the impossibility holds.",
  "T*": "Crossover time — the predicted time until a Hollow Win collapses into outright failure. T* = δ/(ηλ).",
  "W": "System welfare — an independent variable measuring the health of the shared system (market, commons, benchmark, ecosystem). W cannot be computed from bilateral payoffs.",
  "Hollow Win": "Outcome (0,1,1) — both parties gain, but the system is destroyed. Standard analysis calls this 'mutual gain.' It is not.",
  "c-adjusted GDP": "GDP minus the welfare cost of system-degrading activity across all SAPM-calibrated sectors. The welfare-adjusted measure of national output.",
  "GDSS": "Group Decision Support System — software platforms (INSPIRE, SmartSettle, Negoisst, GMCR) used to facilitate negotiations. All current GDSS are structurally W-blind.",
  "SAPM": "System Asset Pricing Model — the measurement framework that calibrates welfare betas for sectors and computes welfare-adjusted output. The CAPM of welfare economics.",
  "CAPM": "Capital Asset Pricing Model — Sharpe, Lintner, Mossin (1964). Measures how much an asset moves with the market. SAPM applies the same logic to welfare destruction.",
  "Win-Win-Win": "Outcome (1,1,1) — both parties gain AND the system is preserved. The only genuinely good outcome. The target of the Conflictoring protocol.",
  "μ": "Shadow price of welfare — the weight applied to welfare costs in the c-adjusted GDP formula. μ = 1.0 means full calibrated beta recognition.",
  "Πˢᵃ": "System-adjusted payoff — private payoff minus the welfare cost: Πˢᵃ = Π − μ* · ΔW.",
  "δ": "Private surplus — the total private gain accumulated during a Hollow Win period.",
  "η": "Feedback coupling — the fraction of system damage that feeds back to the agent through regulatory, legal, or reputational channels.",
  "λ": "Annual system welfare loss rate — the annual dollar cost of system degradation across all channels.",
  "DA": "Decision Accounting — a 15-field audit trail applied to every SAPM domain. Each field records a specific structural fact about the game: parties, system, axiom status, βW, theorem type, reform pathway.",
  "k*": "The k-star threshold — the minimum number of conflictoring agents (≤ 6) required to make PPT conformism strictly dominated in a given domain. Postnieks's Law proves k* exists for every PST domain.",
  "φ": "Fiscal Dependency Index — the ratio of government revenue from an industry to the political cost of reforming it. When φ > 1, government is structurally captured as Party B.",
  "GPFG": "Government Pension Fund Global — Norway's $1.7T sovereign wealth fund. The existence proof that fiscal decoupling from extractive industries is possible. φ = 0.22.",
  "Conflictoring": "The six-agent protocol that breaks PPT conformism: Whistleblower, Plaintiff, Regulator, Legislator, Investor, Supranational. Named by analogy to 'monitoring' — the agents who conflict with the game.",
};

function Tip({ term, children }) {
  const [show, setShow] = useState(false);
  const text = GLOSSARY[term] || term;
  return (
    <span style={{ position: "relative", display: "inline" }}>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{ borderBottom: `1px dotted ${GOLD}`, color: GOLD, cursor: "help" }}
      >
        {children || term}
      </span>
      {show && (
        <span style={{
          position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
          background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4,
          padding: "8px 12px", fontFamily: M, fontSize: 13, color: DIM,
          width: 280, zIndex: 100, lineHeight: 1.6, marginBottom: 4,
          boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
        }}>
          {text}
        </span>
      )}
    </span>
  );
}

// ─── CHAPTER METADATA ────────────────────────────────────────
const CHAPTERS = [
  { id: 1, title: "The Lie in the Number", time: "3 min" },
  { id: 2, title: "The Missing Dimension", time: "3 min" },
  { id: 3, title: "The Eight Outcomes", time: "4 min" },
  { id: 4, title: "The Proof", time: "4 min" },
  { id: 5, title: "Measuring the Damage", time: "4 min" },
  { id: 6, title: "The GDSS Problem", time: "3 min" },
  { id: 7, title: "The Conflictoring Protocol", time: "4 min" },
  { id: 8, title: "The Domain Theorems", time: "4 min" },
  { id: 9, title: "Decision Accounting", time: "4 min" },
  { id: 10, title: "The Six-Agent Protocol", time: "5 min" },
  { id: 11, title: "The Reform Dividend", time: "4 min" },
  { id: 12, title: "Fiscal Capture", time: "4 min" },
  { id: 13, title: "The Substitution Trap", time: "5 min" },
  { id: 14, title: "Disclosure Futility", time: "4 min" },
  { id: 15, title: "Postnieks's Law", time: "5 min" },
  { id: 16, title: "Data & Methodology Notes", time: "reference" },
];

// ─── SHARED COMPONENTS ───────────────────────────────────────
function ChapterHead({ num, title, subtitle, time }) {
  return (
    <div style={{ marginBottom: 32, paddingTop: 48 }}>
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 8 }}>
        CHAPTER {num} · {time} read
      </div>
      <h2 style={{ fontFamily: S, fontSize: 28, fontWeight: 300, color: TEXT, margin: 0, lineHeight: 1.3 }}>
        {title}
      </h2>
      {subtitle && (
        <div style={{ fontFamily: S, fontSize: 17, color: DIM, marginTop: 8, fontStyle: "italic", lineHeight: 1.6 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

function P({ children }) {
  return <p style={{ fontFamily: S, fontSize: 17, color: TEXT, lineHeight: 1.8, margin: "0 0 16px" }}>{children}</p>;
}

function GoldCallout({ children }) {
  return (
    <div style={{ padding: "16px 20px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 4, margin: "24px 0", fontFamily: S, fontSize: 16, color: GOLD, lineHeight: 1.7, fontStyle: "italic" }}>
      {children}
    </div>
  );
}

function Card({ children, border, bg }) {
  return (
    <div style={{ padding: "16px 20px", background: bg || SURFACE, border: `1px solid ${border || BORDER}`, borderRadius: 4, marginBottom: 12 }}>
      {children}
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 6 }}>{children}</div>;
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 1 — THE LIE IN THE NUMBER
// ═══════════════════════════════════════════════════════════════
function Chapter1() {
  return (
    <div id="ch1">
      <ChapterHead num={1} title="GDP measures transactions, not welfare. Now we can measure both for the first time." subtitle="GDP counts every dollar that changes hands. It has no welfare dimension — not approximately, not imprecisely, but constitutively and by design. SAPM provides the missing account." time="3 min" />

      <P>GDP counts every transaction with a positive sign. Cancer treatment counts. The lawsuit after the industrial spill counts. The security industry that grows when crime rises counts. As long as money changes hands, it goes in the ledger as output.</P>

      <P>Simon Kuznets built the GDP framework and delivered it to Congress in 1934. His warning was immediate: "The welfare of a nation can scarcely be inferred from a measurement of national income." He built the tool and told us not to use it for the one thing we'd use it for. Nobody listened.</P>

      <P>In 2009, Joseph Stiglitz, Amartya Sen, and Jean-Paul Fitoussi produced a landmark Commission report documenting GDP's failures. They proposed a dashboard of supplementary indicators — inequality, environmental quality, subjective well-being. The recommendation was intellectually correct and practically inert. A dashboard without a common unit of account cannot generate rankings or inform tradeoffs.</P>

      <P>The problem was never that we lacked the right indicators. The problem is deeper than that. And it took until 2026 to prove it.</P>

      {/* GDP LEDGER VISUAL */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "32px 0" }}>
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "16px 20px" }}>
          <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>WHAT GDP RECORDS — FX FIXING MANIPULATION</div>
          {[
            ["Trading desk revenues", "+$2.3B"],
            ["Legal fees (both sides)", "+$480M"],
            ["Regulatory compliance costs", "+$220M"],
            ["Enforcement fines", "+$9.0B"],
            ["Remediation consulting", "+$340M"],
          ].map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: M, fontSize: 14, color: DIM }}>{label}</span>
              <span style={{ fontFamily: M, fontSize: 14, color: GREEN }}>{val}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", marginTop: 4 }}>
            <span style={{ fontFamily: M, fontSize: 14, fontWeight: 600, color: TEXT }}>TOTAL GDP CONTRIBUTION</span>
            <span style={{ fontFamily: M, fontSize: 16, fontWeight: 600, color: GREEN }}>+$12.3B ✓</span>
          </div>
        </div>

        <div style={{ background: SURFACE, border: `1px solid rgba(239,68,68,0.2)`, borderRadius: 4, padding: "16px 20px" }}>
          <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>WHAT GDP CANNOT RECORD</div>
          {[
            ["Benchmark integrity", "DESTROYED"],
            ["$400T+ in notional contracts mispriced", "UNDETECTABLE"],
            ["Trust in financial infrastructure", "UNDETECTABLE"],
            ["Future cost of system collapse", "UNDETECTABLE"],
          ].map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: M, fontSize: 14, color: DIM }}>{label}</span>
              <span style={{ fontFamily: M, fontSize: 14, color: RED }}>{val}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", marginTop: 4 }}>
            <span style={{ fontFamily: M, fontSize: 14, fontWeight: 600, color: TEXT }}>TOTAL <Tip term="W">W</Tip> CONTRIBUTION</span>
            <span style={{ fontFamily: M, fontSize: 16, fontWeight: 600, color: RED }}>??? ✗</span>
          </div>
        </div>
      </div>

      <GoldCallout>
        GDP recorded $12.3 billion of positive output from one of the largest financial frauds in history. Every dollar of cleanup counted the same as every dollar of production.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 2 — THE MISSING DIMENSION
// ═══════════════════════════════════════════════════════════════
function Chapter2() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div id="ch2">
      <ChapterHead num={2} title="Two dimensions have driven us to ruin. While telling us we were victorious." subtitle="Every framework in negotiation theory, bargaining theory, and cooperative game theory operates in two dimensions. That is not a coincidence. It is an axiom. And it is wrong." time="3 min" />

      <P>Standard analysis of any deal asks two questions:</P>
      <P>1. Did A win or lose?<br/>2. Did B win or lose?</P>

      <P>Four outcomes. 2×2. Every framework you have ever been taught — Nash bargaining, Kalai-Smorodinsky, Rubinstein alternating offers, the Shapley value, the core, the nucleolus — operates in this space. Every negotiation support system deployed today — INSPIRE, SmartSettle Infinity, Negoisst, GMCR — monitors only these two dimensions.</P>

      <P>The problem is not that these frameworks are poorly implemented. The problem is that they are monitoring the wrong space.</P>

      <P>There is a third variable: C. Did the shared system survive?</P>

      <P>Not A's system. Not B's system. The system both parties are embedded in — the market, the benchmark, the commons, the ecosystem, the regulatory infrastructure that makes their deal possible in the first place.</P>

      <P>When C = 1, the system survives. When C = 0, the system is degraded. And here is the impossibility: C cannot be computed from A's payoff and B's payoff. Not approximately. Not with better data. Not with a smarter algorithm. Structurally, constitutively, permanently — C is outside the space that A and B's payoffs define.</P>

      <P>The FX benchmark traders were making money. The benchmark they depended on for their entire business model was being destroyed. No analysis of what they received that day told them anything about what was happening to the system they depended on. Standard analysis said: win-win. The correct analysis: they were burning down the building while counting the furniture.</P>

      {/* THE DIMENSION REVEAL */}
      <div style={{ margin: "32px 0" }}>
        <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>
          {revealed ? "WHAT IS ACTUALLY THERE" : "WHAT STANDARD ANALYSIS SEES"}
        </div>

        {!revealed ? (
          /* 2×2 grid */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, maxWidth: 500 }}>
            {[
              { a: 0, b: 0, label: "MISERY", color: MUTED },
              { a: 0, b: 1, label: "B WINS", color: DIM },
              { a: 1, b: 0, label: "A WINS", color: DIM },
              { a: 1, b: 1, label: "MUTUAL GAIN ✓", color: GOLD },
            ].map(cell => (
              <div key={cell.label} style={{
                padding: "20px 16px", textAlign: "center",
                background: cell.a === 1 && cell.b === 1 ? "rgba(245,158,11,0.1)" : SURFACE,
                border: cell.a === 1 && cell.b === 1 ? `2px solid ${GOLD}` : `1px solid ${BORDER}`,
                borderRadius: 4,
              }}>
                <div style={{ fontFamily: M, fontSize: 13, color: cell.color, fontWeight: cell.a === 1 && cell.b === 1 ? 600 : 400 }}>{cell.label}</div>
                <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginTop: 4 }}>
                  A={cell.a} B={cell.b}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 2×2×2 grid — revealed */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, maxWidth: 500 }}>
            {[
              { a: 0, b: 0, cells: [
                { c: 1, label: "STABLE MISERY", color: MUTED },
                { c: 0, label: "MISERY", color: RED },
              ]},
              { a: 0, b: 1, cells: [
                { c: 1, label: "B SACRIFICED", color: DIM },
                { c: 0, label: "B PLUNDERS", color: RED },
              ]},
              { a: 1, b: 0, cells: [
                { c: 1, label: "A SACRIFICED", color: DIM },
                { c: 0, label: "A PLUNDERS", color: RED },
              ]},
              { a: 1, b: 1, cells: [
                { c: 1, label: "WIN, WIN, WIN ✓", color: GREEN },
                { c: 0, label: "HOLLOW WIN ✗", color: RED },
              ]},
            ].map((quad, qi) => (
              <div key={qi} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {quad.cells.map(cell => (
                  <div key={cell.label} style={{
                    padding: "14px 16px", textAlign: "center",
                    background: cell.label.includes("WIN, WIN") ? "rgba(34,197,94,0.08)"
                      : cell.label.includes("HOLLOW") ? "rgba(239,68,68,0.08)"
                      : SURFACE,
                    border: cell.label.includes("WIN, WIN") ? `2px solid ${GREEN}`
                      : cell.label.includes("HOLLOW") ? `2px solid ${RED}`
                      : `1px solid ${BORDER}`,
                    borderRadius: 4,
                  }}>
                    <div style={{ fontFamily: M, fontSize: 12, color: cell.color, fontWeight: 600 }}>{cell.label}</div>
                    <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginTop: 2 }}>
                      C={cell.c} A={quad.a} B={quad.b}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Toggle button */}
        <button onClick={() => setRevealed(!revealed)} style={{
          fontFamily: M, fontSize: 13, padding: "10px 20px", marginTop: 16,
          background: revealed ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
          border: `1px solid ${revealed ? "rgba(239,68,68,0.3)" : "rgba(245,158,11,0.3)"}`,
          color: revealed ? RED : GOLD, borderRadius: 4, cursor: "pointer",
        }}>
          {revealed ? "← BACK TO 2×2" : "REVEAL THE THIRD DIMENSION →"}
        </button>

        {revealed && (
          <div style={{ fontFamily: M, fontSize: 13, color: RED, marginTop: 16, padding: "8px 12px", background: "rgba(239,68,68,0.06)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4 }}>
            STANDARD ANALYSIS CANNOT DISTINGUISH WIN, WIN, WIN FROM HOLLOW WIN
          </div>
        )}
      </div>

      <GoldCallout>
        Every framework ever built for negotiation, bargaining, or cooperative game theory optimizes for the gold cell — and cannot tell whether it landed in green or crimson.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 3 — THE EIGHT OUTCOMES
// ═══════════════════════════════════════════════════════════════
const OUTCOMES = [
  { name: "WIN, WIN, WIN", c:1, a:1, b:1, inside: "None. All three dimensions positive. The only outcome with no structural tension.", standard: "Cooperation. Mutual gain. Pareto optimal.", realCase: "Montreal Protocol (1987): nations phased out CFCs through a cooperative agreement. The ozone layer recovered. All parties and the system gained.", color: GREEN, bg: "rgba(34,197,94,0.06)" },
  { name: "HOLLOW WIN", c:0, a:1, b:1, inside: "Parties gain while the system they depend on degrades. Private optimum and systemic preservation are incompatible.", standard: "Mutual gain. Win-win. Pareto efficient. Recommend acceptance.", realCase: "FX Fixing (2005–2012). Wells Fargo cross-selling (2002–2016). Boeing 737 MAX. Lysine cartel (1992–1995). Algorithmic collusion (happening now).", color: RED, bg: "rgba(239,68,68,0.08)", highlight: true },
  { name: "CORROSIVE WIN-LOSE", c:0, a:1, b:0, inside: "A gains at the expense of both B and the system. Extractive and system-degrading.", standard: "Competitive advantage. Market power. Dominance.", realCase: "Predatory pricing that destroys the supplier ecosystem the dominant firm depends on.", color: RED, bg: "rgba(239,68,68,0.04)" },
  { name: "CORROSIVE LOSE-WIN", c:0, a:0, b:1, inside: "B gains at the expense of both A and the system. Mirror of Corrosive Win-Lose.", standard: "Favorable terms. Negotiating leverage.", realCase: "A downstream buyer extracting from an upstream supplier while degrading the supply chain both depend on.", color: RED, bg: "rgba(239,68,68,0.04)" },
  { name: "MISERY", c:0, a:0, b:0, inside: "Universal loss across all dimensions. System, A, and B all degraded.", standard: "Market failure. Lose-lose. Impasse.", realCase: "Post-collapse FX Fixing (2012–2014): banks faced massive penalties, reputations destroyed, benchmark remained corrupted. Everyone lost.", color: RED, bg: "rgba(239,68,68,0.04)" },
  { name: "STABLE MISERY", c:1, a:0, b:0, inside: "System persists but both parties lose within it. Stability prevents resolution.", standard: "Stalemate. Deadlock. Structural impasse.", realCase: "The industry locked in a race to the bottom that no individual firm can exit unilaterally. The institution that cannot reform because reform requires the very cooperation it has destroyed.", color: MUTED, bg: SURFACE },
  { name: "SUSTAINABLE WIN-LOSE", c:1, a:1, b:0, inside: "B loses for the benefit of the system and A. Asymmetric sacrifice.", standard: "Enforcement. Restitution.", realCase: "Antitrust remedy: the dominant firm is required to divest assets and compensate harmed parties. B loses, the market and A are restored.", color: DIM, bg: SURFACE },
  { name: "SUSTAINABLE LOSE-WIN", c:1, a:0, b:1, inside: "A loses for the benefit of the system and B. Asymmetric sacrifice.", standard: "Unilateral restraint. Concession.", realCase: "Whistleblower: A bears personal cost — job, reputation, legal exposure — to expose system-degrading conduct. The system and B are preserved.", color: DIM, bg: SURFACE },
];

function Chapter3() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div id="ch3">
      <ChapterHead num={3} title="There are eight ways a deal can end. Standard analysis can see four. The one it cannot see is the most common." subtitle="Each outcome has a name. Most have no name in the existing literature. They should." time="4 min" />

      <div style={{ overflowX: "auto", margin: "24px 0 32px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: M }}>
          <thead>
            <tr>
              {["OUTCOME","NAME","C","A","B","INTERNAL CONTRADICTION"].map(h => (
                <th key={h} style={{ fontSize: 9, color: MUTED, letterSpacing: 2, padding: "8px 12px", textAlign: h === "C" || h === "A" || h === "B" ? "center" : "left", borderBottom: "1px solid rgba(255,255,255,0.08)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["(0,1,1)", "Hollow Win",        0,1,1, "Parties gain while the system they depend on degrades. Private optimum and systemic preservation are incompatible.", true],
              ["(1,1,1)", "Win, Win, Win",      1,1,1, "None. All three dimensions positive. The only outcome with no structural tension.", false],
              ["(0,0,0)", "Misery",             0,0,0, "Universal loss across all dimensions. System, A, and B all degraded.", false],
              ["(1,0,0)", "Stable Misery",      1,0,0, "System persists but both parties lose within it. Stability prevents resolution.", false],
              ["(0,1,0)", "Corrosive Win-Lose",  0,1,0, "A gains at the expense of both B and the system. Extractive and system-degrading.", false],
              ["(0,0,1)", "Corrosive Lose-Win",  0,0,1, "B gains at the expense of both A and the system. Mirror of Corrosive Win-Lose.", false],
              ["(1,1,0)", "Sustainable Win-Lose", 1,1,0, "B loses for the benefit of the system and A. Asymmetric sacrifice.", false],
              ["(1,0,1)", "Sustainable Lose-Win", 1,0,1, "A loses for the benefit of the system and B. Asymmetric sacrifice.", false],
            ].map(([outcome, name, c, a, b, contradiction, highlight], i) => (
              <tr key={outcome} style={{ background: highlight ? "rgba(239,68,68,0.06)" : name === "Win, Win, Win" ? "rgba(34,197,94,0.04)" : i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                <td style={{ fontSize: 10, color: MUTED, padding: "8px 12px", fontFamily: M, whiteSpace: "nowrap" }}>{outcome}</td>
                <td style={{ fontSize: 11, fontWeight: 600, padding: "8px 12px", color: highlight ? RED : name === "Win, Win, Win" ? GREEN : TEXT, whiteSpace: "nowrap" }}>{name}</td>
                <td style={{ fontSize: 12, fontWeight: 700, padding: "8px 12px", textAlign: "center", color: c ? GREEN : RED }}>{c}</td>
                <td style={{ fontSize: 12, fontWeight: 700, padding: "8px 12px", textAlign: "center", color: a ? GREEN : RED }}>{a}</td>
                <td style={{ fontSize: 12, fontWeight: 700, padding: "8px 12px", textAlign: "center", color: b ? GREEN : RED }}>{b}</td>
                <td style={{ fontSize: 11, color: DIM, padding: "8px 12px", lineHeight: 1.5 }}>{contradiction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>Click each outcome to see: what it looks like from inside, what standard analysis calls it, and a real case where it appeared.</P>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "24px 0" }}>
        {OUTCOMES.map((o, i) => (
          <div key={o.name} onClick={() => setExpanded(expanded === i ? null : i)} style={{
            padding: "14px 18px", background: o.bg, cursor: "pointer",
            border: o.highlight ? `2px solid ${RED}` : o.name === "WIN, WIN, WIN" ? `2px solid ${GREEN}` : `1px solid ${BORDER}`,
            borderRadius: 4, transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: M, fontSize: 14, fontWeight: 600, color: o.color }}>{o.name}</div>
                <div style={{ fontFamily: M, fontSize: 12, color: MUTED, marginTop: 2 }}>({o.c},{o.a},{o.b})</div>
              </div>
              <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{expanded === i ? "−" : "+"}</span>
            </div>
            {expanded === i && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                <Label>INSIDE VIEW</Label>
                <div style={{ fontFamily: S, fontSize: 15, color: TEXT, lineHeight: 1.6, marginBottom: 10 }}>{o.inside}</div>
                <Label>STANDARD LABEL</Label>
                <div style={{ fontFamily: M, fontSize: 13, color: o.highlight ? RED : DIM, marginBottom: 10 }}>{o.standard}</div>
                <Label>REAL CASE</Label>
                <div style={{ fontFamily: S, fontSize: 15, color: GOLD, lineHeight: 1.6 }}>{o.realCase}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <GoldCallout>
        The <Tip term="Hollow Win">Hollow Win</Tip> (0,1,1) and <Tip term="Win-Win-Win">Win, Win, Win</Tip> (1,1,1) are indistinguishable from inside the deal. Both parties are gaining in both cases. Standard analysis labels both "mutual gain." This is not a measurement error. It is a structural impossibility — C cannot be computed from what A and B received. This is what the Private Pareto Theorem proves.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 4 — THE PROOF
// ═══════════════════════════════════════════════════════════════
const CANON = [
  { num: 1, year: 1785, name: "Condorcet Voting Paradox", authors: "Condorcet", nobel: null },
  { num: 2, year: 1951, name: "Arrow's Impossibility", authors: "Arrow", nobel: 1972 },
  { num: 3, year: 1970, name: "Sen's Liberal Paradox", authors: "Sen", nobel: 1998 },
  { num: 4, year: 1972, name: "Hurwicz Impossibility", authors: "Hurwicz", nobel: 2007 },
  { num: 5, year: 1973, name: "Gibbard's Theorem", authors: "Gibbard", nobel: null },
  { num: 6, year: 1975, name: "Gibbard–Satterthwaite", authors: "Gibbard, Satterthwaite", nobel: null },
  { num: 7, year: 1977, name: "Green–Laffont", authors: "Green, Laffont", nobel: null },
  { num: 8, year: 1979, name: "Holmström Budget-Balance", authors: "Holmström", nobel: 2016 },
  { num: 9, year: 1982, name: "Balinski–Young", authors: "Balinski, Young", nobel: null },
  { num: 10, year: 1982, name: "Roth's Matching", authors: "Roth", nobel: 2012 },
  { num: 11, year: 1983, name: "Myerson–Satterthwaite", authors: "Myerson, Satterthwaite", nobel: 2007 },
  { num: 12, year: 1988, name: "Moulin's No-Show Paradox", authors: "Moulin", nobel: null },
  { num: 13, year: 2000, name: "Laffont–Maskin Collusion", authors: "Laffont, Maskin", nobel: 2007 },
  { num: 14, year: 2001, name: "Kaplow–Shavell", authors: "Kaplow, Shavell", nobel: null },
  { num: 15, year: 2002, name: "List–Pettit Judgment Aggregation", authors: "List, Pettit", nobel: null },
  { num: 16, year: 2026, name: "Private Pareto Theorem", authors: "Postnieks", nobel: null },
];

const CAPM_SAPM = [
  ["Full name", "Capital Asset Pricing Model", "System Asset Pricing Model"],
  ["Developed", "Sharpe, Lintner, Mossin (1964)", "Postnieks (2026)"],
  ["Measures", "Market risk", "Welfare risk"],
  ["Key variable", "β (market beta)", <>β<sub>W</sub> (welfare beta)</>],
  ["Formula", <>β = Cov(r,r<sub>m</sub>)/Var(r<sub>m</sub>)</>, <>β<sub>W</sub> = −dW/dΠ</>],
  ["What it says", "How much this asset moves with the market", "How much social welfare this sector destroys per dollar of private gain"],
  ["High value means", "High market risk", "High welfare destruction per dollar"],
  ["Used for", "Portfolio construction, cost of capital", "Policy design, regulatory intervention, negotiation diagnosis"],
  ["Key output", "Risk-adjusted expected return", "Welfare-adjusted output (c-adjusted GDP)"],
  ["Calibration", "Historical price data", "Monte Carlo analysis of empirical externality literature"],
  ["Validated by", "Decades of asset pricing research", <><div>1. Theorem proven from axioms — not an empirical claim requiring historical price series</div><div style={{marginTop:4}}>2. 61-domain calibration validated against independent externality literature; Monte Carlo robustness confirmed across 3+ distribution types per domain</div><div style={{marginTop:4}}>3. Every documented HOLLOW WIN — FX Fixing (2012), VW Dieselgate (2015), opioid crisis, PFAS litigation — exceeds the welfare sustainability threshold. Zero false negatives on record.</div></>],
];

function Chapter4() {
  const [pstExpanded, setPstExpanded] = useState(null);
  return (
    <div id="ch4">
      <ChapterHead num={4} title="This is not a theory. Not a tendency. Not an observation. It is a proof." subtitle="The 16th impossibility theorem in economics. In the tradition of Arrow, Sen, Hurwicz, Myerson. The first to prove that the bilateral payoff space itself is blind." time="4 min" />

      <P>An impossibility theorem does not say something is unlikely. It says it cannot exist — that no mechanism, however cleverly designed, can simultaneously satisfy a specified set of conditions. The proof is deductive. The conclusion is permanent.</P>

      <P>Arrow (1951) proved no voting rule can be simultaneously fair, rational, and non-dictatorial. The profession gave him the Nobel Prize in 1972. Myerson and Satterthwaite (1983) proved bilateral trade cannot be simultaneously efficient, individually rational, and budget-balanced when both parties hold private information. Nobel Prize for Myerson in 2007.</P>

      <P>The Private Pareto Theorem (Postnieks, 2026) proves: in any game where three conditions hold, system welfare <Tip term="W">W</Tip> cannot be expressed as any function of what the parties received. Not approximately. Not under certain conditions. Structurally, constitutively, permanently.</P>

      {/* PST AXIOM CARDS */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>
        THE THREE CONDITIONS (<Tip term="PST">PST</Tip> — PRIVATE-SYSTEMIC TENSION)
      </div>

      {[
        { key: "overlap", title: "OVERLAPPING INTERESTS", plain: "Both parties benefit from cooperating. There is a deal to be made.", english: "A and B both want to make the deal.", why: "If there were no deal, there would be no Hollow Win." },
        { key: "indep", title: "SYSTEM INDEPENDENCE (The key axiom)", plain: "System welfare W is not reducible to agent payoffs. W exists independently of what A and B receive.", english: "The health of the system is a separate variable — not a function of how much A or B got.", why: "This is what makes the impossibility bite. If W could be computed from payoffs, standard analysis would suffice." },
        { key: "dep", title: "SYSTEM DEPENDENCE", plain: "Agent activity affects W. The deal changes the system.", english: "What A and B do together has consequences for the system around them.", why: "If the deal had no systemic consequences, there would be nothing to detect." },
      ].map((axiom, i) => (
        <div key={axiom.key} onClick={() => setPstExpanded(pstExpanded === i ? null : i)} style={{
          padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4,
          marginBottom: 8, cursor: "pointer",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: M, fontSize: 14, fontWeight: 600, color: GOLD }}>{axiom.title}</div>
            <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{pstExpanded === i ? "−" : "+"}</span>
          </div>
          <div style={{ fontFamily: S, fontSize: 15, color: DIM, marginTop: 4 }}>{axiom.plain}</div>
          {pstExpanded === i && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
              <Label>PLAIN ENGLISH</Label>
              <div style={{ fontFamily: S, fontSize: 15, color: TEXT, marginBottom: 8 }}>{axiom.english}</div>
              <Label>WHY IT MATTERS</Label>
              <div style={{ fontFamily: S, fontSize: 15, color: GOLD, fontStyle: "italic" }}>{axiom.why}</div>
            </div>
          )}
        </div>
      ))}

      {/* WHAT THESE WORDS ACTUALLY MEAN */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 2, margin: "32px 0 12px" }}>WHAT THESE WORDS ACTUALLY MEAN</div>

      <div style={{ padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, marginBottom: 12 }}>
        <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: GOLD, marginBottom: 8 }}>AXIOM 1 — OVERLAPPING INTERESTS</div>
        <P>Both sides want to make a deal. There is something to be gained by cooperating. Without this, there is no negotiation and no <Tip term="Hollow Win">Hollow Win</Tip>.</P>
        <div style={{ padding: "12px 16px", background: "rgba(245,158,11,0.04)", borderRadius: 4, marginTop: 8 }}>
          <Label>FX FIXING EXAMPLE</Label>
          <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>Two FX benchmark panel banks both benefit from submitting manipulated rates. The deal exists. The cooperation is real.</div>
        </div>
      </div>

      <div style={{ padding: "20px 24px", background: SURFACE, border: `2px solid rgba(245,158,11,0.2)`, borderRadius: 4, marginBottom: 12 }}>
        <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: GOLD, marginBottom: 8 }}>AXIOM 2 — SYSTEM INDEPENDENCE <span style={{ color: RED, fontSize: 12, fontWeight: 400 }}>(THE KEY ONE)</span></div>
        <P>The health of the shared system is a separate fact — it cannot be calculated from what A got or what B got. You could know everything about both payoffs and still have no idea whether the system survived.</P>
        <div style={{ padding: "12px 16px", background: "rgba(245,158,11,0.04)", borderRadius: 4, marginTop: 8, marginBottom: 8 }}>
          <Label>FX FIXING EXAMPLE</Label>
          <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>Knowing exactly what each FX benchmark trader earned tells you nothing about whether the global benchmark is intact. The benchmark's health is a different variable. It lives outside the payoff space.</div>
        </div>
        <div style={{ fontFamily: S, fontSize: 15, color: GOLD, fontStyle: "italic", lineHeight: 1.7 }}>
          This is the key axiom because without it, standard analysis would suffice. The theorem stands or falls on this one.
        </div>
      </div>

      <div style={{ padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, marginBottom: 12 }}>
        <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: GOLD, marginBottom: 8 }}>AXIOM 3 — SYSTEM DEPENDENCE</div>
        <P>What A and B do together has real consequences for the system around them. Their deal is not isolated.</P>
        <div style={{ padding: "12px 16px", background: "rgba(245,158,11,0.04)", borderRadius: 4, marginTop: 8 }}>
          <Label>FX FIXING EXAMPLE</Label>
          <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>FX benchmark rate submissions directly set the rate. If the deal had no effect on anything outside itself, there would be nothing to detect.</div>
        </div>
      </div>

      {/* WHEN ALL THREE HOLD / WHEN ANY ONE FAILS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "16px 0 24px" }}>
        <div style={{ padding: "20px", background: "rgba(239,68,68,0.06)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: RED, letterSpacing: 1, marginBottom: 8 }}>WHEN ALL THREE HOLD</div>
          <div style={{ fontFamily: S, fontSize: 15, color: TEXT, lineHeight: 1.8 }}>
            Every bilaterally efficient outcome degrades the system. And no analysis of what the parties received can detect it.
          </div>
        </div>
        <div style={{ padding: "20px", background: "rgba(34,197,94,0.06)", border: `1px solid rgba(34,197,94,0.15)`, borderRadius: 4 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GREEN, letterSpacing: 1, marginBottom: 8 }}>WHEN ANY ONE FAILS</div>
          <div style={{ fontFamily: S, fontSize: 15, color: TEXT, lineHeight: 1.8 }}>
            The impossibility does not apply. The framework specifies exactly 12 game types where at least one axiom fails — pure exchange economies, zero-sum games, congestion games, cooperatives. In those domains, this theorem says nothing.
          </div>
        </div>
      </div>

      {/* COMPACT CANON TIMELINE */}
      <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, margin: "32px 0 12px" }}>THE 16-THEOREM CANON</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {CANON.map(t => (
          <div key={t.num} style={{
            display: "grid", gridTemplateColumns: "28px 40px 1fr 80px",
            padding: "6px 12px", alignItems: "center",
            background: t.num === 16 ? "rgba(245,158,11,0.06)" : "transparent",
            border: t.num === 16 ? `1px solid rgba(245,158,11,0.15)` : "1px solid transparent",
            borderRadius: 2,
          }}>
            <span style={{ fontFamily: M, fontSize: 12, color: t.num === 16 ? GOLD : MUTED }}>#{t.num}</span>
            <span style={{ fontFamily: M, fontSize: 12, color: DIM }}>{t.year}</span>
            <span style={{ fontFamily: M, fontSize: 13, color: t.num === 16 ? GOLD : TEXT }}>{t.name}</span>
            <span style={{ fontFamily: M, fontSize: 11, color: t.nobel ? GOLD : "rgba(255,255,255,0.15)" }}>{t.nobel ? `★ ${t.nobel}` : ""}</span>
          </div>
        ))}
      </div>

      <GoldCallout>The 15 preceding theorems proved you cannot get what you want. This one proves you cannot see what you are losing.</GoldCallout>

      {/* CAPM VS SAPM TABLE */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>
        <Tip term="CAPM">CAPM</Tip> VS <Tip term="SAPM">SAPM</Tip>
      </div>
      <div style={{ border: `1px solid ${BORDER}`, borderRadius: 4, overflow: "hidden" }}>
        {CAPM_SAPM.map(([label, capm, sapm], i) => (
          <div key={label} style={{
            display: "grid", gridTemplateColumns: "140px 1fr 1fr",
            borderBottom: i < CAPM_SAPM.length - 1 ? `1px solid ${BORDER}` : "none",
          }}>
            <div style={{ padding: "10px 14px", fontFamily: M, fontSize: 12, color: MUTED, background: "rgba(255,255,255,0.02)" }}>{label}</div>
            <div style={{ padding: "10px 14px", fontFamily: M, fontSize: 13, color: DIM, borderLeft: `1px solid ${BORDER}` }}>{capm}</div>
            <div style={{ padding: "10px 14px", fontFamily: M, fontSize: 13, color: GOLD, borderLeft: `1px solid ${BORDER}` }}>{sapm}</div>
          </div>
        ))}
      </div>

      <P style={{ marginTop: 16 }}>
        <span style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.7 }}>
          <Tip term="CAPM">CAPM</Tip> told investors that some assets are riskier than they look. <Tip term="SAPM">SAPM</Tip> tells governments that some industries are more destructive than they look. Same architecture. Same logical structure. Different stakes.
        </span>
      </P>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 5 — MEASURING THE DAMAGE
// ═══════════════════════════════════════════════════════════════
// Canonical βW table — 61 domains, revenue-denominated (Iron Law). Updated 2026-04-12.
const BETA_CHART_DATA = [
  { domain: "#1  Firearms",                  beta: 50.99, tip: "βW 50.99. Π=$10B revenue. Constitutional Ratchet — Second Amendment forecloses standard tort internalization." },
  { domain: "#2  Cybercrime & Ransomware",   beta: 31.10, tip: "βW 31.10. Π=$200B criminal revenue. Attribution Impossibility — cross-jurisdictional enforcement gap is structural." },
  { domain: "#3  Human Trafficking",         beta: 22.62, tip: "βW 22.62. Π=$236B. Demand Indestructibility — demand persists regardless of supply-side interdiction." },
  { domain: "#4  Weapons of Mass Destruction", beta: 21.92, tip: "βW 21.92. Π=$86B. Capability Diffusion Ceiling — transferred knowledge is permanently enabling." },
];

const DW_CHART_DATA = [
  { domain: "#1  Electronic Waste Export",              dw: 6922, tip: "ΔW=$6,922B. Π=$1,050B. βW=6.59." },
  { domain: "#2  Coal",                                 dw: 6884, tip: "ΔW=$6,884B. Π=$990B. βW=6.95." },
  { domain: "#3  PFAS / Forever Chemicals",             dw: 6574, tip: "ΔW=$6,574B. Π=$186.7B (Persistence Premium). βW=5.31." },
  { domain: "#4  Cybercrime & Ransomware",              dw: 6403, tip: "ΔW=$6,403B. Π=$200B criminal revenue. βW=31.10." },
  { domain: "#5  Tobacco",                              dw: 6276, tip: "ΔW=$6,276B. Π=$965B. βW=6.50. Six channels: Value of Statistical Life mortality $4,500B, healthcare $422B, productivity $446B, secondhand smoke $315B, environment $40B, governance capture $150B." },
  { domain: "#6  Oil & Gas",                            dw: 5695, tip: "ΔW=$5,695B. Π=$3,500B. βW=1.63." },
  { domain: "#7  Human Trafficking",                    dw: 5338, tip: "ΔW=$5,338B. Π=$236B. βW=22.62." },
  { domain: "#8  Plastics",                             dw: 3683, tip: "ΔW=$3,683B. Π=$650B. βW=6.67." },
  { domain: "#9  Illicit Drug Trade",                   dw: 3579, tip: "ΔW=$3,579B. Π=$500B criminal revenue. βW=7.16." },
  { domain: "#10 Tax Havens",                           dw: 3085, tip: "ΔW=$3,085B. Π=$492B. βW=6.27." },
  { domain: "#11 Factory Farming",                      dw: 2764, tip: "ΔW=$2,764B. Π=$2,700B. βW=1.02." },
  { domain: "#12 Monoculture Agriculture",              dw: 2502, tip: "ΔW=$2,502B (7.36×$340B). Π=$340B. βW=7.36." },
  { domain: "#13 Alcohol",                              dw: 2128, tip: "ΔW=$2,128B. Π=$1,600B global revenue. βW=1.33." },
  { domain: "#14 Data Brokerage",                       dw: 1980, tip: "ΔW=$1,980B. Π=$323B. βW=6.13." },
  { domain: "#15 Weapons of Mass Destruction",          dw: 1894, tip: "ΔW=$1,894B. Π=$86B. βW=21.92." },
  { domain: "#16 Ultra-Processed Food",                 dw: 1829, tip: "ΔW=$1,829B. Π=$450B. βW=4.06." },
  { domain: "#17 Industrial Agriculture",               dw: 1510, tip: "ΔW=$1,510B. Π=$205B. βW=7.36." },
  { domain: "#18 Water Privatization",                  dw: 1381, tip: "ΔW=$1,381B. Π=$246B. βW=5.61." },
  { domain: "#19 Shipping & Maritime",                  dw: 1296, tip: "ΔW=$1,296B. Π=$969B. βW=1.34." },
  { domain: "#20 Topsoil Erosion",                      dw: 1123, tip: "ΔW=$1,123B. Π=$255B. βW=4.41." },
  { domain: "#21 Opioid Ecosystem",                     dw: 1122, tip: "ΔW=$1,122B. Π=$75B. βW=14.96." },
  { domain: "#22 Big Tech Acquisitions",                dw: 1000, tip: "ΔW=$1,000B. Π=$128B. βW=7.81." },
  { domain: "#23 Platform Monopoly",                    dw: 999,  tip: "ΔW=$999B. Π=$158B. βW=6.33." },
  { domain: "#24 Antimicrobial Resistance",             dw: 89,   tip: "ΔW=$89B. Π=$42B. βW=2.12. Monte Carlo verified." },
  { domain: "#25 Deforestation & Logging",              dw: 866,  tip: "ΔW=$866B. Π=$120B. βW=7.21." },
  { domain: "#26 Child Labor",                          dw: 862,  tip: "ΔW=$862B. Π=$39B. βW=21.83." },
  { domain: "#27 Private Military Contractors",         dw: 536,  tip: "ΔW=$536B. Π=$260B. βW=2.06." },
  { domain: "#28 Firearms",                             dw: 510,  tip: "ΔW=$510B. Π=$10B. βW=50.99." },
  { domain: "#29 Aviation Emissions",                   dw: 498,  tip: "ΔW=$498B. Π=$100B. βW=4.97." },
  { domain: "#30 Persistent Organic Pollutants",        dw: 436,  tip: "ΔW=$436B. Π=$70B. βW=6.23." },
  { domain: "#31 Palm Oil",                             dw: 428,  tip: "ΔW=$428B. Π=$68B. βW=6.30." },
  { domain: "#32 Insurance & Climate Risk",             dw: 411,  tip: "ΔW=$411B. Π=$90B. βW=4.57." },
  { domain: "#33 Social Media / Youth Mental Health",   dw: 394,  tip: "ΔW=$394B. Π=$68B. βW=5.79." },
  { domain: "#34 Fast Fashion",                         dw: 385,  tip: "ΔW=$385B. Π=$55B. βW=7.01." },
  { domain: "#35 Pharmacy Benefit Management",          dw: 381,  tip: "ΔW=$381B. Π=$60B. βW=6.35." },
  { domain: "#36 Gambling & Casinos",                   dw: 329,  tip: "ΔW=$329B. Π=$45B. βW=7.30." },
  { domain: "#37 Mining & Rare Earth",                  dw: 322,  tip: "ΔW=$322B. Π=$150B. βW=11.15." },
  { domain: "#38 Payday Lending",                       dw: 312,  tip: "ΔW=$312B. Π=$44B. βW=7.08." },
  { domain: "#39 Student Loan Securitization",          dw: 298,  tip: "ΔW=$298B. Π=$47B. βW=6.36." },
  { domain: "#40 Conflict Minerals",                    dw: 256,  tip: "ΔW=$256B. Π=$20B. βW=12.60." },
  { domain: "#41 Frontier AI",                          dw: 225,  tip: "ΔW=$225B. Π=$30B. βW=7.51." },
  { domain: "#42 Algorithmic Pricing",                  dw: 215,  tip: "ΔW=$215B. Π=$40B. βW=5.38." },
  { domain: "#43 Bitcoin / Proof-of-Work",              dw: 210,  tip: "ΔW=$210B. Π=$42B. βW=5.00." },
  { domain: "#44 Fisheries & Coral Reefs",              dw: 179,  tip: "ΔW=$179B. Π=$38B. βW=4.70." },
  { domain: "#45 Defense Procurement",                  dw: 164,  tip: "ΔW=$164B. Π=$34B. βW=4.88." },
  { domain: "#46 Sovereign Debt",                       dw: 164,  tip: "ΔW=$164B. Π=$35B. βW=4.67." },
  { domain: "#47 Private Equity in Healthcare",         dw: 162,  tip: "ΔW=$162B. Π=$31B. βW=5.24." },
  { domain: "#48 Stablecoins & Shadow Banking",         dw: 142,  tip: "ΔW=$142B. Π=$56B. βW=2.53." },
  { domain: "#49 Credit Rating Agencies",               dw: 123,  tip: "ΔW=$123B. Π=$11B. βW=11.21." },
  { domain: "#50 Commercial Real Estate",               dw: 101,  tip: "ΔW=$101B. Π=$13B. βW=7.78." },
  { domain: "#51 Private Prisons",                      dw: 97,   tip: "ΔW=$97B. Π=$8B. βW=12.08." },
  { domain: "#52 Nuclear Power",                        dw: 80,   tip: "ΔW=$80B. Π=$150B. βW=2.94 (marginal). Two-beta architecture." },
  { domain: "#53 Arms Exports",                         dw: 75,   tip: "ΔW=$75B. Π=$30B. βW=2.54." },
  { domain: "#54 Gene Drives",                          dw: 37.9, tip: "ΔW=$37.9B. Π=$3.0B. βW=12.65. Monte Carlo verified." },
  { domain: "#55 Altcoins / Proof-of-Stake",            dw: 37.7, tip: "ΔW=$37.7B (3.14×$12B). Π=$12B. βW=3.14. Corrected from table error ($6B)." },
  { domain: "#56 Gig Economy",                          dw: 34,   tip: "ΔW=$34B. Π=$45B. βW=0.76." },
  { domain: "#57 Deep-Sea Mining",                      dw: 34,   tip: "ΔW=$34B. Π=$5B. βW=6.90." },
  { domain: "#58 Groundwater (Ogallala Aquifer)",       dw: 33,   tip: "ΔW=$33B. βW=3.46. US-specific." },
  { domain: "#59 Cement & Concrete",                    dw: 22,   tip: "ΔW=$22B. Π=$3B. βW=6.74." },
  { domain: "#60 FX Fixing / Benchmark Manipulation", dw: 204,  tip: "ΔW=$204B. Π=$28.4B. βW=7.18. Paper §4 calibration (range $22–35B)." },
  { domain: "#61 Orbital Debris",                       dw: 4.8,  tip: "ΔW=$4.8B. Π=$2.2B. βW=2.18. MC plausibility-corrected (IL#28): annual expected value." },
];

function Chapter5() {
  return (
    <div id="ch5">
      <ChapterHead num={5} title="Every dollar of apparent output has a welfare cost. Here is what it costs." subtitle="The System Asset Pricing Model calibrates welfare betas for 61 domains across 22 impossibility theorems and 39 intractability theorems. The results are not subtle." time="4 min" />

      <P>Welfare beta (<Tip term="βW">β<sub>W</sub></Tip>) measures the marginal rate of system welfare destruction per dollar of private gain. A sector with β<sub>W</sub> = 1.0 destroys one dollar of social welfare for every dollar of revenue. A sector with β<sub>W</sub> = 14.96 (Opioids) destroys nearly fifteen.</P>

      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "24px 0 8px" }}>β<sub>W</sub> RANKINGS — 61 DOMAINS</div>
      <div style={{ display: "flex", gap: 20, marginBottom: 14, flexWrap: "wrap" }}>
        {[
          { color: RED,   opacity: 1,   label: "βW ≥ 10 — Critical / Extreme" },
          { color: GOLD,  opacity: 0.7, label: "βW 6–10 — Severe" },
          { color: GOLD,  opacity: 0.5, label: "βW 2–6 — Moderate" },
          { color: GREEN, opacity: 0.5, label: "βW < 2 — Mild" },
        ].map(({ color, opacity, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: M, fontSize: 10, color: MUTED }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: color, opacity }} />
            {label}
          </div>
        ))}
      </div>
      <div style={{ height: 1400 }}>
        <ResponsiveContainer>
          <BarChart data={[...BETA_CHART_DATA].sort((a,b) => b.beta - a.beta)} layout="vertical" margin={{ left: 200, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis type="number" tick={{ fill: MUTED, fontFamily: M, fontSize: 12 }} />
            <YAxis type="category" dataKey="domain" tick={{ fill: DIM, fontFamily: M, fontSize: 11 }} width={195} interval={0} />
            <RTooltip
              contentStyle={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, fontFamily: M, fontSize: 13, color: DIM, maxWidth: 320 }}
              formatter={(val, name, props) => [props.payload.tip, `βW = ${val}`]}
            />
            <Bar dataKey="beta" radius={[0, 3, 3, 0]}>
              {[...BETA_CHART_DATA].sort((a,b) => b.beta - a.beta).map((d, i) => (
                <Cell key={i} fill={d.beta >= 10 ? RED : d.beta >= 6 ? GOLD : d.beta >= 2 ? GOLD : GREEN} fillOpacity={d.beta >= 6 ? 0.7 : 0.5} />
              ))}
              <LabelList dataKey="beta" position="right" formatter={v => v.toFixed(2)} style={{ fill: DIM, fontFamily: M, fontSize: 10 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "48px 0 8px" }}>ΔW WELFARE DESTRUCTION — 57 DOMAINS ($ BILLIONS, RANK ORDERED)</div>
      <div style={{ display: "flex", gap: 20, marginBottom: 8, flexWrap: "wrap" }}>
        {[
          { color: RED,   opacity: 1,   label: "ΔW ≥ $5T — Catastrophic" },
          { color: GOLD,  opacity: 0.7, label: "ΔW $1T–$5T — Severe" },
          { color: GOLD,  opacity: 0.5, label: "ΔW $200B–$1T — Significant" },
          { color: GREEN, opacity: 0.5, label: "ΔW < $200B — Contained" },
        ].map(({ color, opacity, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: M, fontSize: 10, color: MUTED }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: color, opacity }} />
            {label}
          </div>
        ))}
      </div>
      <div style={{ fontFamily: M, fontSize: 10, color: MUTED, marginBottom: 12 }}>Total dollar welfare cost regardless of βW. A high-revenue sector with modest β can still dwarf a low-revenue extreme-β sector in absolute damage.</div>
      <div style={{ height: 1340 }}>
        <ResponsiveContainer>
          <BarChart data={DW_CHART_DATA} layout="vertical" margin={{ left: 220, right: 60, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis type="number" tick={{ fill: MUTED, fontFamily: M, fontSize: 12 }} tickFormatter={v => `$${(v/1000).toFixed(v>=1000?1:0)}${v>=1000?"T":"B"}`} />
            <YAxis type="category" dataKey="domain" tick={{ fill: DIM, fontFamily: M, fontSize: 11 }} width={215} interval={0} />
            <RTooltip
              contentStyle={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, fontFamily: M, fontSize: 13, color: DIM, maxWidth: 340 }}
              formatter={(val, name, props) => [props.payload.tip, `ΔW = $${val.toLocaleString()}B`]}
            />
            <Bar dataKey="dw" radius={[0, 3, 3, 0]}>
              {DW_CHART_DATA.map((d, i) => (
                <Cell key={i} fill={d.dw >= 5000 ? RED : d.dw >= 1000 ? GOLD : d.dw >= 200 ? GOLD : GREEN} fillOpacity={d.dw >= 1000 ? 0.7 : 0.5} />
              ))}
              <LabelList dataKey="dw" position="right" formatter={v => v >= 1000 ? `$${(v/1000).toFixed(1)}T` : `$${v}B`} style={{ fill: DIM, fontFamily: M, fontSize: 10 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* THEOREM CLASSIFICATION TABLE */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "48px 0 12px" }}>
        THEOREM CLASSIFICATION — 22 IMPOSSIBILITY · 39 INTRACTABILITY
      </div>
      <div style={{ overflowX: "auto", marginBottom: 40 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: M }}>
          <thead>
            <tr>
              {["RANK","βW","DOMAIN","THEOREM NAME","CONSTRAINT","TYPE"].map(h => (
                <th key={h} style={{ fontSize: 9, color: MUTED, letterSpacing: 2, padding: "8px 12px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.08)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Impossibility */}
            <tr><td colSpan={6} style={{ padding: "14px 12px 6px" }}>
              <span style={{ fontSize: 10, letterSpacing: 3, color: "#EF4444", borderBottom: "2px solid #EF4444", paddingBottom: 2 }}>IMPOSSIBILITY THEOREMS</span>
              <span style={{ fontSize: 9, color: MUTED, marginLeft: 12 }}>Physical / chemical / biological — no policy can solve this</span>
            </td></tr>
            {[
              [4,  21.92, "Weapons of Mass Destruction Proliferation", "Capability Diffusion Ceiling",    "Informational"],
              [10, 11.15, "Mining & Rare Earth",                       "Ore Grade Depletion Floor",       "Geochemical"],
              [14, 7.36,  "Industrial Agriculture",                    "Caloric Emissions Floor",         "Thermodynamic / Biological"],
              [15, 7.36,  "Monoculture Agriculture",                   "Genetic Uniformity Floor",        "Biological / Evolutionary"],
              [17, 7.21,  "Deforestation & Logging",                   "Canopy Regeneration Floor",       "Biological / Temporal"],
              [20, 7.01,  "Fast Fashion",                              "Throughput Floor",                "Thermodynamic"],
              [21, 6.95,  "Coal",                                      "Carbon Intensity Floor",          "Thermodynamic"],
              [22, 6.90,  "Deep-Sea Mining",                           "Abyssal Recovery Floor",          "Geochemical / Physical"],
              [23, 6.74,  "Cement & Concrete",                         "Calcination Floor",               "Thermodynamic"],
              [24, 6.67,  "Plastics",                                  "Thermodynamic Degradation Floor", "Thermodynamic"],
              [30, 6.30,  "Palm Oil",                                  "Substitution Impossibility",      "Biological / Agricultural"],
              [32, 6.23,  "Persistent Organic Pollutants",             "Bioaccumulation Ratchet",         "Thermodynamic / Chemical"],
              [34, 1.60,  "Antimicrobial Resistance",                  "Efficacy Ceiling",                "Biological / Evolutionary"],
              [35, 5.79,  "Social Media / Youth Mental Health",        "Engagement Trap",                 "Computational / Developmental"],
              [36, 5.77,  "Gene Drives",                               "Ecological Ratchet Floor",        "Biological / Evolutionary"],
              [39, 5.31, "PFAS / Forever Chemicals",                  "Molecular Persistence Floor",     "Thermodynamic"],
              [43, 4.97,  "Aviation Emissions",                        "Altitude Forcing Floor",          "Physical / Thermodynamic"],
              [49, 4.41,  "Topsoil Erosion",                           "Pedogenesis Floor",               "Geochemical"],
              [51, 3.46,  "Groundwater (Ogallala Aquifer)",            "Recharge Floor",                  "Hydrogeological"],
              [53, 2.94,  "Nuclear Power",                             "Persistence Floor",               "Physical"],
              [57, 1.63,  "Oil & Gas",                                 "Combustion Floor",                "Thermodynamic"],
              [60, 1.02,  "Factory Farming",                           "Protein Demand Floor",            "Biological / Thermodynamic"],
            ].map(([rank, bw, domain, theorem, cat], i) => (
              <tr key={domain} style={{ background: i % 2 === 0 ? "rgba(239,68,68,0.02)" : "transparent" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "rgba(239,68,68,0.02)" : "transparent"}>
                <td style={{ fontSize: 11, color: MUTED, padding: "7px 12px", textAlign: "center", width: 36 }}>{rank}</td>
                <td style={{ fontSize: 11, color: bw >= 10 ? RED : GOLD, padding: "7px 12px", textAlign: "right", width: 48, fontWeight: 600 }}>{bw.toFixed(2)}</td>
                <td style={{ fontSize: 11, color: TEXT, padding: "7px 12px", fontWeight: 500 }}>{domain}</td>
                <td style={{ fontSize: 11, color: "#FCA5A5", padding: "7px 12px", fontStyle: "italic" }}>{theorem}</td>
                <td style={{ fontSize: 10, color: "#F97316", padding: "7px 12px" }}>{cat}</td>
                <td style={{ padding: "7px 12px" }}><span style={{ fontSize: 9, color: "#EF4444", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", padding: "2px 7px", borderRadius: 2, letterSpacing: 1 }}>IMPOSSIBILITY</span></td>
              </tr>
            ))}
            {/* Intractability */}
            <tr><td colSpan={6} style={{ padding: "20px 12px 6px" }}>
              <span style={{ fontSize: 10, letterSpacing: 3, color: "#60A5FA", borderBottom: "2px solid #60A5FA", paddingBottom: 2 }}>INTRACTABILITY THEOREMS</span>
              <span style={{ fontSize: 9, color: MUTED, marginLeft: 12 }}>Institutional / legal / economic — solvable with sufficient political will</span>
            </td></tr>
            {[
              [1,  50.99, "Firearms",                            "Constitutional Ratchet",              "Constitutional / Institutional"],
              [2,  31.10, "Cybercrime & Ransomware",             "Attribution Impossibility",           "Computational / Jurisdictional"],
              [3,  22.62, "Human Trafficking",                   "Demand Indestructibility",            "Jurisdictional / Economic"],
              [5,  21.83, "Child Labor",                         "Cost Arbitrage Floor",                "Economic / Jurisdictional"],
              [6,  14.96, "Opioid Ecosystem",                    "Prescription Ratchet",                "Neurochemical / Institutional"],
              [7,  12.60, "Conflict Minerals",                   "Fungibility Floor",                   "Physical / Jurisdictional"],
              [8,  12.08, "Private Prisons",                     "Occupancy Guarantee Trap",            "Institutional"],
              [9,  11.21, "Credit Rating Agencies",              "Issuer-Pays Corruption Floor",        "Institutional / Informational"],
              [11, 7.81,  "Big Tech Acquisitions",               "Kill Zone Ratchet",                   "Institutional"],
              [12, 7.78,  "Commercial Real Estate",              "Vacancy Doom Loop",                   "Institutional / Financial"],
              [13, 7.51,  "Frontier AI",                         "Alignment Ceiling",                   "Computational / Institutional"],
              [16, 7.30,  "Gambling & Casinos",                  "Sovereign Operator Paradox",          "Institutional / Neurochemical"],
              [18, 7.16,  "Illicit Drug Trade",                  "Prohibition Profit Floor",            "Institutional / Economic"],
              [19, 7.08,  "Payday Lending",                      "Poverty Ratchet",                     "Financial / Institutional"],
              [25, 6.59,  "Electronic Waste Export",             "Basel Convention Evasion",            "Jurisdictional / Classification"],
              [26, 6.50,  "Tobacco",                             "Addiction Ratchet",                   "Neurochemical / Institutional"],
              [27, 6.36,  "Student Loan Securitization",         "Guaranteed Demand Trap",              "Institutional / Financial"],
              [28, 6.35,  "Pharmacy Benefit Management",         "Spread Extraction Trap",              "Institutional / Financial"],
              [29, 6.33,  "Platform Monopoly",                   "Gatekeeper Ratchet",                  "Institutional"],
              [31, 6.27,  "Tax Havens",                          "Sovereignty Arbitrage",               "Jurisdictional / Institutional"],
              [33, 6.13,  "Data Brokerage",                      "Consent Fabrication Trap",            "Informational / Institutional"],
              [37, 5.61,  "Water Privatization",                 "Necessity Monopoly Floor",            "Hydrogeological / Institutional"],
              [38, 5.38,  "Algorithmic Pricing",                 "Tacit Coordination Ceiling",          "Computational / Legal"],
              [40, 5.24,  "Private Equity in Healthcare",        "Fiduciary Contradiction",             "Institutional"],
              [41, 5.13,  "Interest Rate Benchmark Manipulation","Self-Referential Pricing Trap",       "Institutional / Informational"],
              [42, 5.00,  "Bitcoin / Proof-of-Work",             "Protocol Welfare Floor",              "Institutional"],
              [44, 4.88,  "Defense Procurement",                 "Monopsony Lock-In",                   "Institutional / Political"],
              [45, 4.82,  "Orbital Debris",                      "Orbital Congestion Ceiling",          "Physical / Jurisdictional"],
              [46, 4.70,  "Fisheries & Coral Reefs",             "External Forcing Impossibility",      "Climate / Jurisdictional"],
              [47, 4.67,  "Sovereign Debt",                      "Intergenerational Extraction Floor",  "Institutional / Temporal"],
              [48, 4.57,  "Insurance & Climate Risk",            "Tail Risk Exclusion Ratchet",         "Institutional / Temporal"],
              [50, 4.06,  "Ultra-Processed Food",                "Palatability Ratchet",                "Neurochemical / Institutional"],
              [52, 3.14,  "Altcoins / Proof-of-Stake",           "Cross-Chain Welfare Floor",           "Institutional"],
              [54, 2.54,  "Arms Exports",                        "End-Use Enforcement Impossibility",   "Institutional / Jurisdictional"],
              [55, 2.53,  "Stablecoins / Shadow Banking",        "Reserve Opacity Trap",                "Institutional / Financial"],
              [56, 2.06,  "Private Military Contractors",        "Accountability Void",                 "Jurisdictional / Legal"],
              [58, 1.34,  "Shipping & Maritime",                 "Flag State Evasion Floor",            "Jurisdictional / Physical"],
              [59, 1.33,  "Alcohol",                             "Prohibition Paradox",                 "Neurochemical / Institutional"],
              [61, 0.76,  "Gig Economy",                         "Classification Arbitrage Floor",      "Institutional / Legal"],
            ].map(([rank, bw, domain, theorem, cat], i) => (
              <tr key={domain} style={{ background: i % 2 === 0 ? "rgba(96,165,250,0.02)" : "transparent" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(96,165,250,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "rgba(96,165,250,0.02)" : "transparent"}>
                <td style={{ fontSize: 11, color: MUTED, padding: "7px 12px", textAlign: "center", width: 36 }}>{rank}</td>
                <td style={{ fontSize: 11, color: bw >= 10 ? RED : bw >= 5 ? GOLD : MUTED, padding: "7px 12px", textAlign: "right", width: 48, fontWeight: 600 }}>{bw.toFixed(2)}</td>
                <td style={{ fontSize: 11, color: TEXT, padding: "7px 12px", fontWeight: 500 }}>{domain}</td>
                <td style={{ fontSize: 11, color: "#93C5FD", padding: "7px 12px", fontStyle: "italic" }}>{theorem}</td>
                <td style={{ fontSize: 10, color: "#60A5FA", padding: "7px 12px" }}>{cat}</td>
                <td style={{ padding: "7px 12px" }}><span style={{ fontSize: 9, color: "#60A5FA", background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", padding: "2px 7px", borderRadius: 2, letterSpacing: 1 }}>INTRACTABILITY</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* C-ADJUSTED GDP PANEL */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>
        <Tip term="c-adjusted GDP">C-ADJUSTED GDP</Tip> — THE WELFARE-ADJUSTED ACCOUNTS
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { val: "$85.0T", label: "Global annual welfare destruction (79.4% of $107T GDP)", note: "More than the combined GDP of the US, EU, and China destroyed from the welfare accounts every year." },
          { val: "$22.0T", label: "Global c-adjusted GDP", note: "What world output is worth after welfare costs are priced. Roughly equal to the current US nominal GDP." },
          { val: "$5.1T", label: "US c-adjusted GDP (83% haircut on $29.2T)", note: "The welfare-adjusted US economy is smaller than Japan's nominal GDP. US bears 27.3% of global domain costs plus US-specific sector costs." },
          { val: "61 domains", label: "SAPM-calibrated sectors (2026)", note: "21 impossibility + 39 intractability + 1 troublesome. 55 global scope, 6 US-specific. See Chapter 9 for full data." },
        ].map(d => (
          <Card key={d.val} border="rgba(245,158,11,0.15)" bg="rgba(245,158,11,0.04)">
            <div style={{ fontFamily: M, fontSize: 28, color: RED, fontWeight: 600 }}>{d.val}</div>
            <div style={{ fontFamily: M, fontSize: 13, color: TEXT, marginTop: 4 }}>{d.label}</div>
            <div style={{ fontFamily: S, fontSize: 15, color: DIM, marginTop: 8, fontStyle: "italic" }}>{d.note}</div>
          </Card>
        ))}
      </div>

      <div style={{ padding: "20px 24px", background: "rgba(239,68,68,0.06)", border: `2px solid rgba(239,68,68,0.15)`, borderRadius: 4, margin: "24px 0", textAlign: "center" }}>
        <div style={{ fontFamily: M, fontSize: 36, color: RED, fontWeight: 600 }}>$85T / yr</div>
        <div style={{ fontFamily: M, fontSize: 14, color: TEXT, marginTop: 4 }}>Global annual welfare destruction — 61 SAPM domains, Monte Carlo verified</div>
        <div style={{ fontFamily: S, fontSize: 16, color: DIM, marginTop: 8, fontStyle: "italic" }}>The largest unmeasured number in economics. GDP records it as output. It is not output. It is destruction.</div>
      </div>

      <div style={{ textAlign: "center", margin: "16px 0" }}>
        <a href="https://c-adjusted-gdp.vercel.app" target="_blank" rel="noopener noreferrer" style={{
          fontFamily: M, fontSize: 13, padding: "10px 24px", display: "inline-block",
          background: "rgba(245,158,11,0.1)", border: `1px solid rgba(245,158,11,0.3)`,
          color: GOLD, borderRadius: 4, textDecoration: "none",
        }}>EXPLORE THE C-ADJUSTED GDP DASHBOARD →</a>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 6 — THE GDSS PROBLEM
// ═══════════════════════════════════════════════════════════════
function Chapter6() {
  const [reqExpanded, setReqExpanded] = useState(null);
  return (
    <div id="ch6">
      <ChapterHead num={6} title="Every negotiation platform ever built is facilitating Hollow Wins. Right now. By design." subtitle="Not because they are poorly built. Because they are monitoring the wrong space. This is fixable. Here is what fix looks like." time="3 min" />

      <P>Group Decision Support Systems — INSPIRE, SmartSettle Infinity, Negoisst, GMCR — are the software infrastructure of modern negotiation. They help parties find Pareto-efficient agreements: deals where neither party can do better without the other doing worse.</P>

      <P>By Proposition 2 of the Private Pareto Theorem, every one of these platforms is operating in a structurally <Tip term="W">W</Tip>-blind space. They accept two classes of input: party utilities and issue weights. No function of those inputs can determine system welfare. The platforms are not failing — they are doing exactly what they were designed to do. The design is the problem.</P>

      {/* GDSS COMPARISON */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "32px 0" }}>
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "16px 20px" }}>
          <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>CURRENT <Tip term="GDSS">GDSS</Tip> SCREEN</div>
          {[
            ["Party A payoff", "847 utils ✓", GREEN],
            ["Party B payoff", "823 utils ✓", GREEN],
            ["Pareto efficiency", "94% ✓", GREEN],
            ["Joint gain", "+$2.3M ✓", GREEN],
            ["RECOMMENDATION", "ACCEPT ✓", GREEN],
          ].map(([l, v, c]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: M, fontSize: 13, color: DIM }}>{l}</span>
              <span style={{ fontFamily: M, fontSize: 13, color: c }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: SURFACE, border: `1px solid rgba(239,68,68,0.2)`, borderRadius: 4, padding: "16px 20px" }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, marginBottom: 12 }}>W-AWARE GDSS SCREEN</div>
          {[
            ["Party A payoff", "847 utils ✓", GREEN],
            ["Party B payoff", "823 utils ✓", GREEN],
            ["System welfare (W)", "-$4.7M ⚠", GOLD],
            [<>β<sub>W</sub> (this domain)</>, "6.2 ⚠", GOLD],
            ["System-adjusted payoff", "-$2.4M ✗", RED],
            ["T* (crossover time)", "4.2 years ⚠", GOLD],
            ["CLASSIFICATION", "HOLLOW WIN (0,1,1) ✗", RED],
            ["RECOMMENDATION", "DO NOT ACCEPT ✗", RED],
          ].map(([l, v, c]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: M, fontSize: 13, color: DIM }}>{l}</span>
              <span style={{ fontFamily: M, fontSize: 13, color: c }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* THREE REQUIREMENTS */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "24px 0 12px" }}>THE THREE REQUIREMENTS</div>

      {[
        { id: "R1", title: "INDEPENDENT W-MONITORING CHANNEL", body: "The platform must accept a W-signal from a source external to the negotiating parties. Not derived from their payoffs — independent of them. For financial benchmarks: independent rate submissions. For environmental commons: third-party environmental monitoring. For labor markets: independent workforce welfare metrics." },
        { id: "R2", title: "DECOMPOSED PAYOFF DISPLAY", body: "Show both parties not just their payoff, but their system-adjusted payoff: Πˢᵃ = Π − μ* · ΔW. A deal that looks like +$2.3M of joint gain may be -$2.4M of welfare-adjusted joint gain. Parties need to see both numbers." },
        { id: "R3", title: "TRAJECTORY DETECTION", body: "Show T*: the predicted time until the Hollow Win collapses into outright failure. A deal with T* = 4.2 years is a ticking clock. Parties accepting it are accepting a 4-year window before the system fails. They should know." },
      ].map((r, i) => (
        <div key={r.id} onClick={() => setReqExpanded(reqExpanded === i ? null : i)} style={{
          padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4,
          marginBottom: 8, cursor: "pointer",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: M, fontSize: 14, color: GOLD }}><span style={{ color: MUTED }}>{r.id} —</span> {r.title}</div>
            <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{reqExpanded === i ? "−" : "+"}</span>
          </div>
          {reqExpanded === i && (
            <div style={{ fontFamily: S, fontSize: 15, color: DIM, marginTop: 12, lineHeight: 1.7 }}>{r.body}</div>
          )}
        </div>
      ))}

      <GoldCallout>
        The minimum viable product — accept a <Tip term="W">W</Tip>-signal, compute system-adjusted payoff, display the result, flag agreements where the system-adjusted payoff is negative — can be deployed in weeks. This is a software update, not a legislative cycle.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 7 — THE CONFLICTORING PROTOCOL
// ═══════════════════════════════════════════════════════════════
const CSTEPS = [
  { step: 1, title: "NAME THE PARTIES AND THE SYSTEM", phase: "diagnostic",
    desc: "Identify A, B, and the system C they are embedded in. State the system boundary explicitly. Classification depends on it.",
    libor: "A = Dealer banks. B = Corporate/pension fund counterparties. System = Global benchmark infrastructure ($400T+ notional across LIBOR-referenced derivatives, FX, gold, and commodity fixings). Private revenue (Π): $28.4B/yr in manipulator rents (paper §4 calibration, range $22–35B).",
    why: "Under a narrow boundary (individual trading desks), the outcome looks like bilateral profit. Under the correct boundary (global benchmark integrity), it is Hollow Win." },
  { step: 2, title: "CLASSIFY THE CURRENT OUTCOME", phase: "diagnostic",
    desc: "Apply the taxonomy. Assign (c, a, b). Is this Hollow Win (0,1,1) or Win-Win-Win (1,1,1)?",
    libor: "c=0 (benchmark integrity destroyed), a=1 (panel banks gained), b=1 (counterparty banks gained on positions). Classification: (0,1,1) Hollow Win. Standard vocabulary called it 'cooperation.'" },
  { step: 3, title: "VERIFY THE THREE PST AXIOMS", phase: "diagnostic",
    desc: "Do all three conditions hold? If any fails, the impossibility does not apply.",
    libor: "Overlapping Interests ✓ (both parties benefited from rate manipulation). System Independence ✓ (benchmark integrity not reducible to bank payoffs). System Dependence ✓ (rate submissions directly determined W). All three hold. Impossibility applies." },
  { step: 4, title: "COMPUTE SYSTEM BETA AND WELFARE COST", phase: "diagnostic",
    desc: "βW = −dW/dΠ. Estimate the welfare destruction per dollar of private gain.",
    libor: "βW ≈ 5.5. Total welfare cost: $9B+ in documented penalties, plus unquantified damage to benchmark integrity, counterparty trust, and regulatory confidence. Seven years undetected." },
  { step: 5, title: "ESTIMATE CROSSOVER TIME", phase: "diagnostic",
    desc: "T* = δ/(ηλ). When does the Hollow Win collapse into outright failure?",
    libor: "T* ≤ 0 by the time regulators acted — the system had already failed. The Hollow Win had run past its crossover point before detection." },
  { step: 6, title: "MAP THE RESPONSE LADDER", phase: "resolution",
    desc: "Four tiers. Each actor type has a tier. Each tier has a minimum sufficient intervention.",
    libor: "Tier 1 = CFTC whistleblower (§748). Tier 3 = Regulatory restructuring and $9B+ in penalties. Tier 4 = FSB benchmark reform — the Secured Overnight Financing Rate (SOFR) transition." },
  { step: 7, title: "SELECT THE MINIMUM SUFFICIENT INTERVENTION", phase: "resolution",
    desc: "The lowest tier that breaks PST. Overkill wastes resources and creates resistance.",
    libor: "Minimum sufficient = Tier 4 (sovereign coordination). The Secured Overnight Financing Rate (SOFR) transition required international coordination across all major financial jurisdictions. No lower tier was sufficient." },
  { step: 8, title: "VERIFY ESCAPE", phase: "resolution",
    desc: "Confirm C flips from 0 to 1. Win-Win-Win is the target.",
    libor: "LIBOR → Secured Overnight Financing Rate (SOFR): Benchmark integrity restored. Transaction-based rate replacing panel bank estimates. Classification: Win-Win-Win (1,1,1). Escape confirmed." },
];

const WHISTLE = [
  { prog: "SEC WHISTLEBLOWER", statute: "Dodd-Frank §21F", covers: "Securities fraud, benchmark manipulation, accounting fraud", reward: "10–30% of sanctions exceeding $1 million", anon: "Available through attorney", protection: "Federal law", cumulative: "$6B+ awarded to whistleblowers to date", best: "Financial sector Hollow Wins (FX Fixing / benchmark manipulation cases)" },
  { prog: "CFTC WHISTLEBLOWER", statute: "§748", covers: "Commodities, derivatives, futures fraud", reward: "10–30% of sanctions exceeding $1 million", anon: "Same structure as SEC", protection: "Federal law", cumulative: "$380M+ awarded", best: "Derivatives manipulation, algorithmic collusion in commodity markets" },
  { prog: "DOJ FALSE CLAIMS ACT", statute: "Qui Tam", covers: "Fraud against the federal government", reward: "15–30% of recovered funds", anon: "Filed under seal", protection: "Federal law", cumulative: "$75B+ recovered (total FCA)", best: "Defense contractor fraud, healthcare billing fraud, government procurement" },
  { prog: "IRS WHISTLEBLOWER", statute: "§7623", covers: "Tax fraud exceeding $2M", reward: "15–30% of collected proceeds", anon: "Confidential", protection: "Federal law", cumulative: "$6.5B+ collected", best: "Corporate tax evasion as part of a Hollow Win structure" },
];

function Chapter7() {
  const [cStep, setCStep] = useState(0);
  return (
    <div id="ch7">
      <ChapterHead num={7} title="You are inside a Hollow Win. Here is what you do." subtitle="Eight steps. Four levels of actors. A solution for each level. And for the person on the inside: a financial incentive that most people do not know exists." time="4 min" />

      <P>The Conflictoring protocol is an 8-step procedure for diagnosing and escaping <Tip term="Hollow Win">Hollow Win</Tip> situations. It uses an intent-free detection standard — it does not require proof that anyone intended to harm the system. If the outcome is classified as Hollow Win (0,1,1), the protocol applies.</P>

      {/* STEPPER */}
      <div style={{ display: "flex", gap: 2, margin: "24px 0 16px" }}>
        {CSTEPS.map((s, i) => (
          <div key={i} onClick={() => setCStep(i)} style={{
            flex: 1, height: 4, borderRadius: 2, cursor: "pointer",
            background: i <= cStep ? (s.phase === "diagnostic" ? GOLD : GREEN) : BORDER,
          }} />
        ))}
      </div>
      <div style={{ fontFamily: M, fontSize: 12, letterSpacing: 2, color: cStep < 5 ? GOLD : GREEN, marginBottom: 16 }}>
        {cStep < 5 ? "DIAGNOSTIC PHASE" : "RESOLUTION PHASE"} — STEP {cStep + 1} OF 8
      </div>

      {(() => {
        const s = CSTEPS[cStep];
        return (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card>
              <Label>PROTOCOL — STEP {s.step}</Label>
              <div style={{ fontFamily: M, fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.7 }}>{s.desc}</div>
            </Card>
            <Card border="rgba(245,158,11,0.15)" bg="rgba(245,158,11,0.04)">
              <Label>FX FIXING — WORKED EXAMPLE</Label>
              <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7, marginBottom: s.why ? 8 : 0 }}>{s.libor}</div>
              {s.why && <div style={{ fontFamily: S, fontSize: 14, color: GOLD, fontStyle: "italic", lineHeight: 1.6 }}>{s.why}</div>}
            </Card>
          </div>
        );
      })()}

      <div style={{ display: "flex", justifyContent: "space-between", margin: "16px 0 32px" }}>
        <button onClick={() => setCStep(Math.max(0, cStep - 1))} disabled={cStep === 0} style={{ fontFamily: M, fontSize: 13, padding: "8px 20px", background: cStep === 0 ? "transparent" : "rgba(245,158,11,0.1)", border: `1px solid ${BORDER}`, color: cStep === 0 ? MUTED : GOLD, borderRadius: 4, cursor: cStep === 0 ? "default" : "pointer" }}>← BACK</button>
        <button onClick={() => setCStep(Math.min(7, cStep + 1))} disabled={cStep === 7} style={{ fontFamily: M, fontSize: 13, padding: "8px 20px", background: cStep === 7 ? "transparent" : "rgba(245,158,11,0.1)", border: `1px solid ${BORDER}`, color: cStep === 7 ? MUTED : GOLD, borderRadius: 4, cursor: cStep === 7 ? "default" : "pointer" }}>NEXT →</button>
      </div>

      {/* FOUR LEVELS OF ACTORS */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>THE FOUR LEVELS OF ACTORS</div>

      {/* LEVEL 1 — THE INSIDER */}
      <Card border="rgba(245,158,11,0.2)" bg="rgba(245,158,11,0.04)">
        <div style={{ fontFamily: M, fontSize: 14, color: GOLD, fontWeight: 600, marginBottom: 8 }}>LEVEL 1 — THE INSIDER</div>
        <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7, marginBottom: 12 }}>
          You work at a company, a bank, a firm, a government agency. You have seen the <Tip term="Hollow Win">Hollow Win</Tip> from the inside. You know what is happening.
        </div>
        <div style={{ fontFamily: M, fontSize: 13, color: TEXT, lineHeight: 2 }}>
          1. Document everything. Time-stamped. Contemporaneous.<br/>
          2. Consult a whistleblower attorney before doing anything else.<br/>
          3. File a claim under the applicable federal program.
        </div>
      </Card>

      {/* THE WHISTLEBLOWER MATH */}
      <div style={{ padding: "24px", background: "rgba(239,68,68,0.06)", border: `2px solid rgba(239,68,68,0.2)`, borderRadius: 4, margin: "24px 0", textAlign: "center" }}>
        <div style={{ fontFamily: S, fontSize: 20, color: RED, lineHeight: 1.5, fontWeight: 600, marginBottom: 16 }}>
          THE FX FIXING TRADERS LEFT BETWEEN $900 MILLION AND $2.7 BILLION ON THE TABLE.
        </div>
        <div style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.7, marginBottom: 16 }}>
          The FX Fixing manipulation generated approximately $9 billion in regulatory sanctions. Under the Dodd-Frank whistleblower program (SEC §21F), a qualifying whistleblower receives 10–30% of sanctions over $1 million.
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          <div>
            <div style={{ fontFamily: M, fontSize: 36, color: GOLD, fontWeight: 600 }}>$900M</div>
            <div style={{ fontFamily: M, fontSize: 13, color: MUTED }}>10% of $9B</div>
          </div>
          <div style={{ fontFamily: M, fontSize: 36, color: MUTED, alignSelf: "center" }}>to</div>
          <div>
            <div style={{ fontFamily: M, fontSize: 36, color: GOLD, fontWeight: 600 }}>$2.7B</div>
            <div style={{ fontFamily: M, fontSize: 13, color: MUTED }}>30% of $9B</div>
          </div>
        </div>
        <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7, marginTop: 16 }}>
          One person. One claim. Filed before the investigation concluded.
        </div>
        <div style={{ fontFamily: S, fontSize: 15, color: RED, lineHeight: 1.7, marginTop: 8 }}>
          The traders who manipulated FX benchmarks went to prison. The traders who reported it — had any of them chosen to — would have received between nine hundred million and two point seven billion dollars from the United States government, legal immunity, and protected employment status. They did not know this option existed.
        </div>
      </div>

      {/* OBJECTION CARD */}
      <div style={{ padding: "24px", background: "rgba(239,68,68,0.04)", border: `2px solid rgba(239,68,68,0.2)`, borderRadius: 4, margin: "24px 0" }}>
        <div style={{ fontFamily: M, fontSize: 15, fontWeight: 700, color: RED, letterSpacing: 1, marginBottom: 12 }}>
          'I AM ALREADY INSIDE THE FRAUD. IT IS TOO LATE.'
        </div>
        <div style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.8 }}>
          This is the most common reason people inside a Hollow Win do not come forward. It is factually wrong. The most important whistleblower case in US history was brought by a man who was not a bystander. He was a participant.
        </div>
      </div>

      {/* THE BIRKENFELD CASE */}
      <div style={{ padding: "28px", background: SURFACE, border: `2px solid rgba(245,158,11,0.3)`, borderRadius: 4, margin: "24px 0" }}>
        <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 2, marginBottom: 16 }}>THE BIRKENFELD CASE</div>

        <div style={{ fontFamily: M, fontSize: 16, fontWeight: 600, color: TEXT, marginBottom: 4 }}>Bradley Birkenfeld</div>
        <div style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.8, marginBottom: 20 }}>
          UBS private banker. He personally helped wealthy American clients hide assets in secret Swiss accounts. He was not an observer. He was inside the fraud.
        </div>

        <Label>WHAT HE DID</Label>
        <div style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.8, marginBottom: 20 }}>
          In 2007, after UBS failed to address the illegal activity internally, he brought comprehensive documentation to the DOJ, IRS, and Senate Permanent Subcommittee on Investigations.
        </div>

        <Label>WHAT HAPPENED TO HIM</Label>
        <div style={{ fontFamily: M, fontSize: 14, color: DIM, lineHeight: 2.2, marginBottom: 20 }}>
          Pleaded guilty to conspiracy to defraud the United States<br/>
          Sentenced to 40 months in prison<br/>
          Served <span style={{ color: GOLD, fontWeight: 600 }}>31 months</span> at Schuylkill County Federal Correctional Institution<br/>
          Fine: $30,000
        </div>

        <Label>WHAT HAPPENED FIVE WEEKS AFTER HIS RELEASE</Label>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "16px 0 24px", padding: "20px", background: "rgba(245,158,11,0.06)", borderRadius: 4 }}>
          <div style={{ fontFamily: M, fontSize: 13, color: MUTED, marginBottom: 8 }}>IRS §7623 WHISTLEBLOWER AWARD</div>
          <div style={{ fontFamily: M, fontSize: 42, color: GOLD, fontWeight: 700 }}>$104,000,000</div>
          <div style={{ height: 1, background: BORDER, width: "60%", margin: "16px 0" }} />
          <div style={{ fontFamily: M, fontSize: 48, color: GOLD, fontWeight: 700 }}>$115,556</div>
          <div style={{ fontFamily: M, fontSize: 14, color: MUTED, marginTop: 4 }}>FOR EVERY SINGLE DAY HE SPENT IN PRISON</div>
        </div>

        <Label>WHAT HIS DISCLOSURES TRIGGERED</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "12px 0 20px" }}>
          <div style={{ textAlign: "center", padding: "12px", background: "rgba(245,158,11,0.04)", borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 24, color: GOLD, fontWeight: 600 }}>$780M</div>
            <div style={{ fontFamily: M, fontSize: 12, color: MUTED }}>UBS FINE</div>
          </div>
          <div style={{ textAlign: "center", padding: "12px", background: "rgba(245,158,11,0.04)", borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 24, color: GOLD, fontWeight: 600 }}>120+</div>
            <div style={{ fontFamily: M, fontSize: 12, color: MUTED }}>CRIMINAL INDICTMENTS</div>
          </div>
          <div style={{ textAlign: "center", padding: "12px", background: "rgba(245,158,11,0.04)", borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 24, color: GOLD, fontWeight: 600 }}>56,000+</div>
            <div style={{ fontFamily: M, fontSize: 12, color: MUTED }}>DELINQUENT TAXPAYERS CAME FORWARD</div>
          </div>
          <div style={{ textAlign: "center", padding: "12px", background: "rgba(245,158,11,0.04)", borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 24, color: GOLD, fontWeight: 600 }}>$11B+</div>
            <div style={{ fontFamily: M, fontSize: 12, color: MUTED }}>US TAX COLLECTIONS FROM HIS DISCLOSURE</div>
          </div>
        </div>

        <Label>THE LEGAL PRECEDENT</Label>
        <div style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.8, marginBottom: 20 }}>
          Participants in a fraud — not just observers — are eligible for IRS whistleblower awards. The IRS did not reduce his award for his participation in the wrongdoing. The government stated explicitly: they needed a knowledgeable insider. Only insiders have the information that matters.
        </div>

        <div style={{ padding: "20px", background: "rgba(239,68,68,0.04)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4 }}>
          <Label>THE INJUSTICE THAT MAKES IT REAL</Label>
          <div style={{ fontFamily: S, fontSize: 17, color: TEXT, lineHeight: 1.9, marginTop: 8 }}>
            Of all UBS executives implicated or indicted — including Birkenfeld's direct superiors — he was the only one who served prison time. The people above him paid fines and walked. He blew the whistle and went to prison. Then received $104 million.
          </div>
          <div style={{ fontFamily: S, fontSize: 17, color: GOLD, lineHeight: 1.9, marginTop: 12, fontWeight: 600 }}>
            The system is imperfect. The math still works.
          </div>
        </div>
      </div>

      {/* IMPORTANT DISTINCTIONS */}
      <div style={{ padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, margin: "0 0 24px" }}>
        <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 8 }}>IMPORTANT DISTINCTION</div>
        <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.8 }}>
          Birkenfeld used the IRS §7623 program (tax fraud). FX benchmark traders would use SEC §21F or CFTC §748 (financial benchmark manipulation). Different programs. Same architecture: 10–30% of sanctions, participants eligible, no maximum award. The Birkenfeld case is the proof of concept.
        </div>
      </div>

      {/* FOUR FEDERAL PROGRAMS */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "24px 0 12px" }}>THE FOUR FEDERAL PROGRAMS</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {WHISTLE.map(w => (
          <div key={w.prog} style={{ padding: "16px 20px", background: SURFACE, border: `1px solid rgba(245,158,11,0.2)`, borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: GOLD, marginBottom: 2 }}>{w.prog}</div>
            <div style={{ fontFamily: M, fontSize: 12, color: MUTED, marginBottom: 8 }}>{w.statute}</div>
            <div style={{ fontFamily: M, fontSize: 12, color: DIM, lineHeight: 1.8 }}>
              Covers: {w.covers}<br/>
              Reward: {w.reward}<br/>
              Anonymity: {w.anon}<br/>
              Track record: {w.cumulative}<br/>
              Best for: {w.best}
            </div>
          </div>
        ))}
      </div>

      <P>Total across all programs: $95B+ in cumulative enforcement recoveries.</P>

      <GoldCallout>
        The institutional infrastructure for Tier 1 response already exists. It has generated $95 billion. Most people inside a <Tip term="Hollow Win">Hollow Win</Tip> do not know it is there.
      </GoldCallout>

      {/* LEVELS 2–4 */}
      <Card>
        <div style={{ fontFamily: M, fontSize: 14, color: GOLD, fontWeight: 600, marginBottom: 8 }}>LEVEL 2 — THE EXECUTIVE OR BOARD MEMBER</div>
        <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>
          You have authority over the game design. Restructure compensation to align with system welfare. Commission an independent <Tip term="W">W</Tip>-audit of major revenue streams. Implement the three <Tip term="GDSS">GDSS</Tip> requirements (R1, R2, R3). The question: "Which of our revenue streams has the highest <Tip term="β_W">β<sub>W</sub></Tip>? What are we building on?"
        </div>
      </Card>
      <Card>
        <div style={{ fontFamily: M, fontSize: 14, color: GOLD, fontWeight: 600, marginBottom: 8 }}>LEVEL 3 — THE REGULATOR OR INDUSTRY BODY</div>
        <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>
          Mandate W-monitoring as a condition of market participation. Require decomposed payoff reporting. Design structural separation to break <Tip term="PST">PST</Tip>. The question: "Which sectors in our jurisdiction have β<sub>W</sub> {">"} 2.0? What is our <Tip term="T*">T*</Tip> for each?"
        </div>
      </Card>
      <Card>
        <div style={{ fontFamily: M, fontSize: 14, color: GOLD, fontWeight: 600, marginBottom: 8 }}>LEVEL 4 — THE SOVEREIGN OR INTERNATIONAL BODY</div>
        <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>
          Treaty-based commons governance (the Montreal Protocol model). International benchmark reform (FSB post-LIBOR / FX Fixing). Mandate <Tip term="c-adjusted GDP">c-adjusted GDP</Tip> as a supplementary national account. The question: "Which of our PST domains have T* under 10 years?"
        </div>
      </Card>

      <GoldCallout>
        The Conflictoring protocol does not require intent. If the outcome is classified as <Tip term="Hollow Win">Hollow Win</Tip> (0,1,1), the protocol applies — regardless of whether anyone in the game intended to harm the system. Q-learning algorithms reach Hollow Win outcomes without communication, instruction, or awareness. The Folk Theorem guarantees that capable optimizers discover collusion as a stable equilibrium. The protocol catches it anyway.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 8 — THE DOMAIN THEOREMS
// ═══════════════════════════════════════════════════════════════
// All 61 SAPM domains. Groups 1–8: Impossibility (physics/chemistry/biology).
// Groups 9–14: Intractability (institutional — structurally solvable).
// ═══════════════════════════════════════════════════════════════
const DOMAINS = [
  // ── GROUP 1 ─────────────────────────────────────────────────
  { group: "THERMODYNAMIC PERMANENCE", type: "impossibility", domains: [
    { name: "Per- and Polyfluoroalkyl Substances (PFAS) / Molecular Persistence Floor", plain: "PFAS — per- and polyfluoroalkyl substances — are used in nonstick coatings, firefighting foam, food packaging, and thousands of industrial applications. The carbon-fluorine bond that makes them useful also makes them indestructible by any biological process. They accumulate in soil, water, and human tissue. There is no natural mechanism to break them down.", theorem: "The carbon-fluorine bond energy (485 kJ/mol) exceeds the energy available to any biological degradation mechanism. No market mechanism can reduce PFAS contamination below a structural floor while PFAS production continues. The floor is set by thermodynamics, not regulatory failure.", beta: "5.31", expiry: "Class-wide production ban AND non-persistent substitutes at scale. Not met." },
    { name: "Persistent Organic Pollutants (POPs) Beyond PFAS / Persistence Floor", plain: "Persistent organic pollutants — chlorinated pesticides, polychlorinated biphenyls (PCBs), dioxins, furans — share the same thermodynamic property as PFAS: they resist biological degradation and accumulate through the food chain. Unlike PFAS, many POPs are already banned. The contamination persists anyway, because persistence is a physical property, not a regulatory one.", theorem: "Chlorinated organic compounds with log K_ow > 5 bioaccumulate by conservation of mass through lipid-rich tissues. The regulatory ban eliminates new exposure. It does not eliminate existing body burden or soil/sediment reservoir. The welfare floor persists until natural dilution — measured in decades to centuries.", beta: "6.23", expiry: "Bioremediation at scale for existing reservoirs. Not currently achievable for most legacy compounds." },
    { name: "Plastics / Polymer Persistence Floor", plain: "Plastics do not biodegrade. They photodegrade — breaking into smaller and smaller fragments called microplastics and nanoplastics, which enter the food chain, the water supply, and human tissue. The mass is conserved. The polymer chain shortens. The welfare cost at nanoscale is not yet fully quantified, which means the floor is a lower bound.", theorem: "Synthetic polymer chains (polyethylene, polypropylene, polyethylene terephthalate) have no known enzymatic degradation pathway under ambient environmental conditions. Photodegradation produces microplastics and nanoplastics — fragments that penetrate biological barriers that bulk plastic cannot. The persistence floor is guaranteed by thermodynamics; the toxicity floor is guaranteed by the properties of sub-micron particles.", beta: "6.67", expiry: "Universal compostable substitutes at market parity. Not met." },
    { name: "Fast Fashion / Synthetic Textile Persistence", plain: "Sixty percent of global textiles are synthetic — polyester, nylon, acrylic. Every wash cycle releases microfibers into wastewater. These fibers are too small for standard filtration. They enter rivers, oceans, and ultimately human tissue. Fast fashion's business model — low prices, rapid turnover, disposability — ensures maximum throughput of material that cannot be made to disappear.", theorem: "Synthetic textile microfibers released in washing are not captured by standard wastewater treatment (which removes particles >10μm; microfibers are 1–5μm). The mass released per wash cycle is measurable and constant regardless of consumer behavior. The welfare cost scales with cumulative synthetic textile production, which has doubled since 2000.", beta: "7.01", expiry: "Industrial microfiber filtration mandatory at manufacturing scale AND fiber-to-fiber recycling at market scale. Not met." },
    { name: "Electronic Waste (E-Waste) Export / Heavy Metal Persistence", plain: "Electronic waste — circuit boards, batteries, screens — contains lead, mercury, cadmium, and arsenic. These heavy metals do not degrade. When e-waste is exported to informal recycling operations in West Africa, South Asia, and Southeast Asia, the metals are extracted with open-air burning and acid leaching, contaminating soil and groundwater at concentrations that persist for generations. The metals are elemental. They cannot be made less heavy.", theorem: "Heavy metal contamination of soil and groundwater is irreversible on any agricultural or generational timescale. Lead at concentrations > 400 ppm in soil is permanent fixture — it cannot be phytoremediated to background levels. The welfare cost is a permanent charge against the contaminated land, capitalized at the social discount rate.", beta: "6.59", expiry: "Extended producer responsibility with closed-loop recycling in regulated facilities. Not at scale globally." },
  ]},
  // ── GROUP 2 ─────────────────────────────────────────────────
  { group: "PROCESS CHEMISTRY — COMBUSTION AND CALCINATION FLOORS", type: "impossibility", domains: [
    { name: "Cement / Calcination Floor", plain: "Concrete is made from cement. Cement is made from limestone (CaCO₃). Making cement requires heating limestone until it releases carbon dioxide (CO₂): CaCO₃ → CaO + CO₂. This is not a fuel choice. This is conservation of mass. The carbon in limestone must go somewhere when you break the calcium carbonate bond. It goes into the atmosphere. Every concrete structure ever built released CO₂ that cannot be avoided by switching to renewable energy.", theorem: "Calcination of calcium carbonate releases one mole of CO₂ per mole of CaO produced. This is stoichiometry. No fuel switch, carbon capture efficiency improvement, or regulatory instrument can eliminate process CO₂ emissions below the stoichiometric floor without replacing the calcium carbonate feedstock entirely.", beta: "6.74", expiry: "Calcium silicate cement exceeding 1% of global clinker output. Not met." },
    { name: "Coal / Combustion Floor", plain: "Coal is carbon. Burning carbon releases carbon dioxide. There is no version of coal combustion that does not release CO₂, because the energy comes from the carbon-oxygen bond. Carbon capture and storage reduces the welfare cost but cannot eliminate it: capture is never 100%, parasitic energy load increases per-unit CO₂ output from the rest of the plant, and storage permanence is uncertain over centuries.", theorem: "Carbon combustion releases CO₂ by conservation of mass. The welfare floor from coal combustion is determined by: (1) the carbon content of the fuel — approximately 25 kgCO₂/GJ for bituminous coal — and (2) the social cost of carbon applied to the residual emissions after any capture. This floor exists at every positive level of coal output.", beta: "6.95", expiry: "Zero coal in the energy mix. Approximately 35% of global electricity in 2024. Not met." },
    { name: "Oil & Gas / Combustion Chemistry", plain: "Hydrocarbons — the molecules in oil and natural gas — contain carbon and hydrogen. Burning them releases carbon dioxide and water. Methane (the primary component of natural gas) also leaks throughout the supply chain, and methane's warming effect is 80 times stronger than carbon dioxide over a 20-year horizon. There is no version of oil and gas combustion that does not produce these outputs.", theorem: "Combustion of hydrocarbons is described by chemical equations whose outputs are fixed by the atomic composition of the fuel. Methane leakage rates of 1–3% of production (measured by satellite) are sufficient to eliminate the climate advantage of gas over coal over a 20-year timeframe. No operational improvement can reduce leakage to zero; the welfare floor is the product of the leak rate and the methane global warming potential.", beta: "1.63", expiry: "Full replacement of combustion-based energy and industrial heat. Not met." },
    { name: "Aviation Emissions / Altitude Physics", plain: "Aircraft emit carbon dioxide, water vapor, nitrogen oxides, and soot. At cruise altitude (10–12 kilometers), nitrogen oxides react with ozone and create contrails. The radiative forcing from non-CO₂ effects at altitude is approximately two to four times the CO₂ effect alone. This altitude multiplier is a physical consequence of where the reactions occur in the atmosphere. It cannot be regulated away.", theorem: "Non-CO₂ climate forcing from aviation — nitrogen oxide chemistry, contrail cirrus formation, and water vapor deposition — occurs because high-altitude atmospheric chemistry is structurally different from near-surface chemistry. The altitude multiplier is an atmospheric physics result, not an engineering parameter. Sustainable aviation fuels eliminate fossil carbon but do not eliminate the altitude-specific forcing from nitrogen oxides and contrails.", beta: "4.97", expiry: "Near-zero-emission propulsion (hydrogen or electric) at commercial scale AND contrail-avoidance routing. Not at scale." },
    { name: "Shipping & Maritime / Heavy Fuel Combustion and Flag-State Jurisdiction", plain: "International shipping burns heavy fuel oil — the residual sludge left after refining petroleum into lighter products. It is the dirtiest fossil fuel. Shipping also operates under flag-state jurisdiction: ships register under the flag of whichever country offers the most favorable regulations, which means enforcement authority is structurally fragmented. No single sovereign can unilaterally regulate international shipping.", theorem: "Heavy fuel oil combustion produces sulfur dioxide, nitrogen oxides, particulate matter, and CO₂ at rates determined by fuel composition. Flag-state jurisdiction means that any single country imposing strict emissions standards creates an immediate competitive incentive to re-flag under a more permissive jurisdiction. The private welfare cost is zero; the external welfare cost falls on coastal populations and the global climate. The impossibility is jurisdictional.", beta: "1.34", expiry: "International Maritime Organization (IMO) binding fuel standards with enforcement mechanisms that close flag-of-convenience arbitrage. Not met." },
  ]},
  // ── GROUP 3 ─────────────────────────────────────────────────
  { group: "GEOCHEMICAL RATES — REGENERATION FLOORS", type: "impossibility", domains: [
    { name: "Deep-Sea Mining / Abyssal Recovery Floor", plain: "The deep ocean floor — below 4,000 meters — is covered with polymetallic nodules containing cobalt, nickel, manganese, and copper. These nodules form at 10 to 20 millimeters per million years. The organisms that live on them — sponges, corals, microbial communities — have no other substrate. When you mine the nodule, you destroy the habitat. The habitat cannot recover on any human timescale.", theorem: "Polymetallic nodule formation rates (10–20 mm/Myr) establish a hard lower bound on the timescale of habitat recovery after mining disturbance. Benthic community recovery from sediment plumes has been studied at the IOM (International Seabed Authority) disturbance experiment site since 1989; after 26 years, recovery remains partial. The welfare floor is set by geochemistry, not by regulatory design.", beta: "6.90", expiry: "Cobalt-free batteries exceeding 85% market share before extraction commences. Not met." },
    { name: "Topsoil Erosion / Pedogenesis Floor", plain: "Topsoil — the thin layer of biologically active soil that makes agriculture possible — forms at 1 centimeter per 100 to 1,000 years. Industrial agriculture erodes it at rates 10 to 100 times faster than formation. Once gone, it cannot be replaced on any agricultural timescale. We are farming the principal.", theorem: "Soil formation rates (0.01–0.1 mm/year) set a hard floor on agricultural land regeneration. Erosion rates under conventional tillage (1–10 mm/year) exceed formation rates by one to two orders of magnitude. No market mechanism operating within a human planning horizon can offset this drawdown. The welfare destruction is a depletion of natural capital at a rate that compounds with each growing season.", beta: "4.41", expiry: "Regenerative agriculture exceeding 50% of global cropland. Not met." },
    { name: "Groundwater (Ogallala Aquifer) / Recharge Rate Floor", plain: "The Ogallala Aquifer underlies 450,000 square kilometers of the American Great Plains and supplies irrigation water to produce roughly one-fifth of US grain, cotton, and cattle. It refills at approximately 1.5 centimeters per year. It is being drawn down at 30 to 60 centimeters per year. In the southern sections, it is already effectively depleted. When it is gone, the agricultural system dependent on it collapses. It cannot be refilled on any human timescale.", theorem: "Fossil aquifer recharge rates are determined by surface infiltration, saturated hydraulic conductivity, and geological formation depth. For the Ogallala, recharge rates average 1.5 cm/year against extraction rates of 30–60 cm/year — a drawdown ratio of 20:1 to 40:1. The welfare floor is the discounted value of all future agricultural output foregone when extraction depletes the aquifer beyond economic viability.", beta: "3.46", expiry: "Irrigation efficiency sufficient to match extraction to recharge. Not compatible with current agricultural economics in the southern Ogallala region." },
    { name: "Deforestation & Logging / Canopy Regeneration Floor", plain: "Primary tropical forest — the old-growth forest that has never been cleared — takes 200 to 1,000 years to develop its full canopy structure, species diversity, and carbon stock. When it is cleared for agriculture or logging, secondary forest begins to grow. The secondary forest is not the same as the primary forest. The carbon takes centuries to recover. The biodiversity may never recover. The rainfall patterns it supports are disrupted immediately.", theorem: "Primary forest canopy structure (multilayer vertical stratification, epiphyte communities, soil mycorrhizal networks) requires 200–1,000 years to develop. Once cleared, the welfare costs from carbon release, biodiversity loss, and hydrological disruption begin immediately. Secondary forest regrowth recovers approximately 90% of above-ground carbon stocks in 40–80 years but does not recover old-growth species composition or mycorrhizal network complexity on any tractable timescale.", beta: "7.21", expiry: "Deforestation rate falls to net zero globally. Not met." },
    { name: "Palm Oil / Primary Forest Irreversibility", plain: "Palm oil is the world's most widely used vegetable oil, present in roughly half of all packaged consumer goods. Its production drives deforestation in Indonesia, Malaysia, and increasingly West Africa and South America. The carbon stored in peat swamp forests — where much palm oil expansion occurs — took thousands of years to accumulate. Draining the peat for agriculture releases it over decades. The carbon debt from a single peat conversion takes 100 to 1,000 years to repay with biofuel substitution.", theorem: "Tropical peat swamp carbon stocks (500–3,000 tonnes of CO₂ per hectare) represent millennia of net primary production stored under anaerobic conditions. Conversion for agriculture oxygenates the peat, triggering aerobic decomposition that releases CO₂ continuously for decades to centuries. The welfare cost of peat conversion is the discounted stream of CO₂ emissions over the decomposition period, which exceeds any credible agricultural profit over the same horizon.", beta: "6.30", expiry: "Zero conversion of primary forest and peatland for palm oil expansion. Not met." },
  ]},
  // ── GROUP 4 ─────────────────────────────────────────────────
  { group: "EVOLUTIONARY ARMS RACES", type: "impossibility", domains: [
    { name: "Antimicrobial Resistance (AMR) / Efficacy Ceiling", plain: "Antibiotics work by killing bacteria. But killing bacteria selects for bacteria that can survive the antibiotic. The same molecular event that cures the patient — therapeutic lethality — selects for resistance. This is not a side effect. It is an evolutionary consequence of the mechanism of action. Every dose that cures also selects.", theorem: "Therapeutic lethality constitutively selects for resistance by Darwinian selection on the target bacterial population. No market mechanism can decouple antibiotic use from resistance development. The welfare cost is the compounding erosion of antibiotic efficacy across the global pathogen reservoir, which is a global common that no bilateral transaction can restore.", beta: "2.1", expiry: "Extraction-rate management — slow enough use that resistance cannot establish. Not compatible with current medical practice at scale." },
    { name: "Monoculture Agriculture / Genetic Uniformity Floor", plain: "Modern industrial agriculture plants vast areas with genetically identical crops — a single high-yield variety covering millions of hectares. This maximizes efficiency. It also means a pathogen that can infect one plant can infect all of them. The Irish Potato Famine was monoculture failure. The current global wheat supply is more genetically uniform than it was then. Pathogens reproduce 730 times for every crop cycle. The evolutionary advantage is theirs.", theorem: "Genetic monoculture creates a system with zero heteroresistance — no subset of the crop population can survive a novel pathogen that has evolved to attack the dominant genotype. The pathogen's evolutionary timescale (days to weeks) is orders of magnitude faster than the crop's breeding timescale (years to decades). No market mechanism that rewards yield maximization will voluntarily accept the yield penalty of diversity unless the catastrophic risk is fully priced.", beta: "7.36", expiry: "Mandatory crop diversity programs at scale. Not met." },
    { name: "Factory Farming / Antibiotic Amplification Ratchet", plain: "Factory farms confine thousands of animals in close quarters, which creates ideal conditions for infectious disease. The standard response is prophylactic antibiotics — drugs given not to treat disease but to prevent it and to accelerate growth. Livestock consume approximately 70% of all antibiotics used globally. This is the world's largest incubator of antibiotic-resistant bacteria. The antibiotic resistance problem is structurally inseparable from the factory farming model.", theorem: "Prophylactic antibiotic use in concentrated animal feeding operations (CAFOs) maintains constant selection pressure across billions of animals simultaneously, across thousands of facilities in dozens of countries. The resulting resistant organisms enter human populations through food, water, and direct contact. No bilateral mechanism between a factory farm and its customers can internalize the welfare cost imposed on the global antibiotic commons.", beta: "1.02", expiry: "Elimination of prophylactic antibiotic use in livestock. Implemented in some European countries; not globally." },
    { name: "Industrial Agriculture Methane / Enteric Fermentation Floor", plain: "Ruminant animals — cattle, sheep, goats — digest plant material through a fermentation process that produces methane as a byproduct. This is enteric fermentation. It is biology. A cow produces approximately 100 kilograms of methane per year. There are 1 billion cattle on Earth. There is no version of ruminant digestion that does not produce methane.", theorem: "Enteric fermentation in ruminants is a metabolic process governed by the biochemistry of methanogen archaea in the rumen. The methane yield per unit of dry matter intake is approximately 6–7% — a ratio determined by the anaerobic fermentation pathway, not by farm management. Feed additives (3-nitrooxypropanol) can reduce this by 20–30%, but not to zero. The welfare floor is the global warming potential of the irreducible methane output of 1 billion ruminants.", beta: "7.36", expiry: "Reduction in ruminant livestock population or near-universal uptake of methane-suppressing feed additives. Neither is consistent with current protein demand trajectories." },
  ]},
  // ── GROUP 5 ─────────────────────────────────────────────────
  { group: "RADIOACTIVE DECAY", type: "impossibility", domains: [
    { name: "Nuclear Fission / Radioactive Waste Persistence Floor", plain: "Nuclear fission generates no combustion emissions and produces extraordinary energy density — one kilogram of uranium fuel yields as much energy as 3,000 tonnes of coal. It also produces radioactive waste with half-lives measured in thousands to millions of years. Radioactive decay rates are fundamental physical constants. No engineering, no regulation, no market mechanism can accelerate them.", theorem: "Radioactive decay rates are invariant physical constants described by quantum tunneling probability, which is independent of temperature, pressure, chemical environment, or any other physically realizable variable. High-level nuclear waste requires isolation for approximately 100,000 years before its radioactivity decays to natural background levels. No market discount rate can make 100,000-year costs commensurable with current revenues.", beta: "2.94", expiry: "None — half-lives are not negotiable.", callout: "Nuclear has a two-beta architecture: the cover beta (0.53-0.54) measures the net welfare balance including energy benefits; the marginal beta (2.94) measures incremental welfare cost of waste accumulation per dollar of revenue. Both are intentional and documented." },
  ]},
  // ── GROUP 6 ─────────────────────────────────────────────────
  { group: "IRREVERSIBLE CAPABILITY DIFFUSION", type: "impossibility", domains: [
    { name: "Frontier AI / Alignment Ceiling", plain: "Once an artificial intelligence capability is demonstrated — a language model can do X, AlphaFold can fold proteins — that capability cannot be unlearned. The knowledge that it is possible, and the architectural insight that achieved it, diffuses irreversibly through the research community. Capability advances faster than alignment because demonstrating capability is one experiment; proving alignment is a research program that may never converge.", theorem: "Capability diffusion is irreversible because the demonstration of a capability is a public goods event — once published (or leaked), the information cannot be recalled. The gap between capability advancement (months per generation) and alignment assurance (years to decades, if achievable) grows monotonically as capabilities increase. No market mechanism internalizes the welfare cost of capability diffusion into jurisdictions or actors that will not accept alignment constraints.", beta: "7.51", expiry: "Formal verification of alignment at the capability frontier. Not currently achievable." },
    { name: "Weapons of Mass Destruction (WMD) Proliferation / Knowledge Diffusion Ceiling", plain: "Once someone demonstrates that a weapon can be built — a nuclear device, a specific pathogen, an autonomous weapons system — the knowledge that it is possible cannot be erased. The barriers to replication fall permanently. The Manhattan Project demonstrated nuclear weapons were achievable; every subsequent nuclear program built on that existence proof. Synthetic biology is doing the same for biological weapons. Information is not a substance that can be confiscated.", theorem: "Weapons capability knowledge, once demonstrated, has a long-run replication cost that approaches zero because the existence proof eliminates the largest barrier — uncertainty about feasibility. The welfare cost of each capability demonstration compounds across all future actors who acquire the capability. No bilateral disarmament treaty can internalize this externality because the information cannot be destroyed and the set of future actors is unbounded.", beta: "21.92", expiry: "Security competition ends. Not a realistic near-term scenario." },
  ]},
  // ── GROUP 7 ─────────────────────────────────────────────────
  { group: "BIOLOGICAL RATCHETS", type: "impossibility", domains: [
    { name: "Gene Drives / Ecological Ratchet Floor", plain: "A gene drive is a genetic technology that spreads a chosen trait through an entire wild population — potentially the entire species — within a few generations. They are being developed to eliminate malaria-transmitting mosquitoes, control invasive species, and eradicate agricultural pests. Once a gene drive is released into a wild population, it cannot be recalled. The construct propagates itself. There is no off switch.", theorem: "Gene drives exploit the inheritance bias of CRISPR-based homing endonucleases to propagate a chosen allele at super-Mendelian rates (>50% transmission). Once established in a wild population above the invasion threshold, suppression is mathematically guaranteed to persist. Ecological consequences are irreversible because species population dynamics and food web interactions operate at timescales too slow for course correction once the drive has spread.", beta: "12.65", expiry: "Contained drives only — daisy-chain or threshold architectures that limit geographic spread. Not currently dominant in development pipelines." },
    { name: "Fisheries / External Forcing Impossibility", plain: "Fish populations can be managed. Ocean temperatures cannot — not by fisheries management. As ocean warming accelerates, fish populations are shifting poleward, coral reefs are bleaching, and the ecosystems that fisheries depend on are restructuring in ways that fisheries management has no authority to address. The thing destroying the fishery operates entirely outside the institutional reach of the agency responsible for managing it.", theorem: "The welfare destruction in the fisheries domain is driven by a cause — atmospheric CO₂ concentration and ocean warming — that is structurally external to any fisheries management institution. No quota system, no marine protected area, no catch limit can address the proximate cause of coral bleaching and fish stock redistribution. The impossibility is not biological; it is jurisdictional. The solution space for fisheries management does not overlap with the problem space.", beta: "4.70", expiry: "Atmospheric CO₂ at or below 300 parts per million (ppm). Not achievable under any current trajectory." },
  ]},
  // ── GROUP 8 ─────────────────────────────────────────────────
  { group: "ARCHITECTURAL CONSTRAINTS — PERMISSIONLESS AND ORBITAL SYSTEMS", type: "impossibility", domains: [
    { name: "Bitcoin / Proof-of-Work Protocol Floor", plain: "Bitcoin's security is guaranteed by energy expenditure. Miners compete to solve computationally expensive puzzles, and the winner creates the next block. The energy cost is not a bug. It is the security mechanism. Removing the energy cost removes the security guarantee. The welfare destruction is thermodynamically guaranteed by the protocol design.", theorem: "Proof-of-work consensus requires that the energy cost of attacking the network exceed the economic benefit of a successful attack. Bitcoin's security budget — the block reward plus transaction fees — sets the equilibrium energy expenditure. No protocol modification can reduce energy consumption without proportionally reducing security, because the energy cost IS the Sybil-resistance mechanism.", beta: "5.00", expiry: "Replacement by proof-of-stake at network scale, or sovereign legal tender transition. Not met for Bitcoin specifically." },
    { name: "Proof-of-Stake / Validator Concentration Architecture", plain: "Proof-of-stake blockchains — Ethereum, Solana, Cardano — replace energy expenditure with capital deposits. This eliminates the energy floor. But it creates a concentration floor: validators must post large capital stakes, which means validation rights accrue to the largest capital holders. Lido, a staking pool, controls approximately 28% of all Ethereum staking. The architecture converts energy centralization into capital centralization.", theorem: "Proof-of-stake validator selection is proportional to staked capital. Large staking pools aggregate retail capital into institutionally-controlled validator sets, recreating the concentration dynamics of proof-of-work mining pools without the energy cost. The welfare cost is governance: when 28% of stake is controlled by a single entity, the decentralization premise of the protocol is structurally undermined.", beta: "3.14", expiry: "Mandatory validator set diversification via protocol rules. Not implemented at major network scale." },
    { name: "Cybercrime & Ransomware / Attribution Impossibility", plain: "Criminal actors operating online can route their activities through multiple jurisdictions, use pseudonymous cryptocurrency for payments, and conduct operations from countries that will not extradite them. Attribution — identifying who committed a specific attack — is technically difficult. Extradition — getting them into a jurisdiction that will prosecute — is diplomatically difficult. The combination produces a structural enforcement gap that no individual country can close.", theorem: "Attribution of cybercrime requires technical forensics (linking attack infrastructure to identifiable actors) AND legal jurisdiction over those actors. The intersection of technical attribution confidence and legal jurisdiction is small: sophisticated attackers operate from jurisdictions with no extradition treaties with victim countries. No bilateral law enforcement mechanism can bridge this gap. The impossibility is jurisdictional, not technical.", beta: "6.22", expiry: "Budapest Convention on Cybercrime universal ratification with enforcement mechanisms. Not met — Russia, China not signatories." },
    { name: "Orbital Debris / Kessler Syndrome", plain: "Low Earth orbit — the band of space 200 to 2,000 kilometers above Earth where GPS, weather, and communications satellites operate — is filling with debris from satellite collisions and launches. Each collision generates more debris. At some debris density, a chain reaction begins — called Kessler Syndrome — where collision-generated fragments trigger more collisions, making the orbital band permanently unusable. No single sovereign controls this space. No treaty has enforcement mechanisms.", theorem: "Kessler Syndrome is a threshold phenomenon in orbital debris dynamics: below a critical debris density, the collision rate is manageable; above it, collisions cascade. Current debris population growth rates are approaching this threshold in several orbital shells. No market mechanism can solve this because: (1) no actor owns the orbital commons, (2) collision avoidance benefits all actors but costs only the actor maneuvering, (3) debris removal benefits all actors but only one bears the cost.", beta: "2.18", expiry: "Orbital-use fee regime plus mandatory active debris removal. Not at scale." },
    { name: "Stablecoins & Shadow Banking / Regulatory Arbitrage Architecture", plain: "Stablecoins are cryptocurrencies pegged to a fiat currency. Their reserves — the assets backing the peg — are largely unregulated, unaudited, and located across jurisdictions chosen specifically to minimize regulatory oversight. The architecture replicates the structural vulnerabilities of money market funds (which triggered a run in 2008) without the regulatory protections that money market funds acquired after 2008.", theorem: "Stablecoin reserve opacity, jurisdictional arbitrage, and run-susceptible peg mechanics reproduce the conditions for bank runs without deposit insurance or central bank backstop. No single sovereign can regulate a stablecoin issuer that has incorporated in a permissive jurisdiction, holds reserves in a third jurisdiction, and serves users in a fourth. The architectural impossibility is the same as tax havens: the product is designed to be outside any single regulator's reach.", beta: "2.53", expiry: "International reserve transparency standards with enforcement. GENIUS Act (proposed) is US-only; not at scale." },
  ]},

  // ══ INTRACTABILITY CLASS ═════════════════════════════════════
  // Groups 9–14: institutional game structures — solvable with the right redesign.
  // Each has a proven working model. The barrier is political, not physical.
  // ═══════════════════════════════════════════════════════════════

  // ── GROUP 9 ─────────────────────────────────────────────────
  { group: "JURISDICTIONAL GAPS — CROSS-BORDER EXTERNALITIES", type: "intractability", domains: [
    { name: "Tax Havens / Cross-Jurisdictional Profit Shifting", plain: "Multinational corporations shift profits from high-tax jurisdictions where they earn them to low-tax or zero-tax jurisdictions where they are booked. The mechanism is transfer pricing: internal transactions between subsidiaries are priced to ensure that profits appear in the most favorable tax location. Global estimates put profit shifting at $300–$600 billion per year — tax revenue lost from countries that funded the infrastructure, education, and institutions that generated the profits.", theorem: "Sovereign tax jurisdiction ends at the border. A company can create a subsidiary in a zero-tax jurisdiction, license its intellectual property to that subsidiary, and route all profits through the license — entirely legally. No individual sovereign can prevent this without multilateral agreement, because preventing it unilaterally drives investment to other jurisdictions. The welfare cost is the permanent underprovisioning of public goods funded by the missing revenue.", beta: "6.27", expiry: "Organisation for Economic Co-operation and Development (OECD) Pillar Two — 15% global minimum effective tax rate — universally implemented including US adoption. Partially met: 140 countries signed, US has not enacted domestic legislation.", proven: "OECD Base Erosion and Profit Shifting (BEPS) Pillar Two, enacted by 140 countries as of 2024. Estimated $150–220 billion in additional annual tax revenue when fully implemented." },
    { name: "Human Trafficking / Stateless Victim Architecture", plain: "Human trafficking is the world's second-largest criminal industry after drug trafficking. Victims are moved across borders specifically to put them outside the legal protections of their country of origin and the legal attention of the country of destination. The business model depends on jurisdictional arbitrage: the crime is committed in transit zones, the proceeds are laundered in financial havens, and the victims are rendered legally invisible.", theorem: "Trafficking operations are explicitly designed to exploit jurisdictional gaps: recruitment in origin countries, transit through countries with weak law enforcement, exploitation in destination countries where victims lack legal status. No single country's law enforcement can address all three phases simultaneously. The welfare cost — loss of liberty, physical harm, psychological trauma — is borne entirely by the victim and externalized from the trafficker's payoff.", beta: "22.62", expiry: "Bilateral law enforcement cooperation with origin, transit, and destination countries simultaneously. Demonstrated in targeted corridors (UK Modern Slavery Act reporting requirements). Not at scale." },
    { name: "Conflict Minerals / Chain-of-Custody Collapse", plain: "Coltan, cassiterite, wolframite, and gold from conflict zones in the Democratic Republic of Congo fund armed militias that commit systematic atrocities. These minerals are smelted, alloyed, and incorporated into supply chains that produce smartphones, laptops, and electric vehicles. By the time the mineral reaches the consumer product, its origin is untraceable. The supply chain launders the provenance.", theorem: "Chain-of-custody tracking for mined minerals fails at smelting, where minerals from multiple origins are aggregated into undifferentiated metal. Once aggregated, origin cannot be recovered. No market mechanism can maintain provenance through a process that is specifically designed to destroy it. The welfare cost — funding for armed conflict — is invisible to the end consumer and the end brand. Axiom 2 is guaranteed by the metallurgical process.", beta: "12.60", expiry: "Isotopic traceability technology deployed at smelter level AND mandatory third-party audit. Kimberley Process for diamonds as partial model; not implemented for industrial minerals at scale." },
    { name: "Arms Exports / End-Use Enforcement Impossibility", plain: "Weapons transferred from an exporting country to a recipient government or military force cannot be controlled after transfer. The recipient can resell them, gift them to non-state actors, or lose them in conflict. US weapons supplied to Afghan security forces were captured by the Taliban in August 2021. French weapons sold to Saudi Arabia have been documented in Yemeni conflict zones. End-use certificates — the legal instrument that is supposed to prevent this — are unenforceable after transfer.", theorem: "Post-transfer custody of conventional weapons cannot be verified or enforced because: (1) physical possession transfers completely at the point of sale, (2) recipient sovereignty precludes inspection without consent, and (3) illicit secondary markets exist at sufficient depth to absorb diverted weapons without traceable transactions. No bilateral arms sale mechanism can internalize the welfare cost of post-transfer use.", beta: "2.54", expiry: "Arms Trade Treaty universal ratification with mandatory end-use monitoring. Not met." },
    { name: "Illicit Drug Trade / Prohibition Paradox", plain: "Drug prohibition does not eliminate drug markets. It drives them underground, removes quality control, criminalizes users, and creates profit margins large enough to fund organizational violence. The welfare cost of the illicit drug trade — violence, incarceration, HIV transmission from shared needles, overdose from uncontrolled purity — is the welfare cost of the prohibition architecture, not of drug use itself. Portugal decriminalized all drugs in 2001. Drug mortality fell by 96%.", theorem: "Criminal prohibition of drugs creates: (1) supernormal profits for illegal suppliers (risk premium plus monopoly rent), (2) removal of quality standards (no regulatory oversight), (3) criminalization of users (barrier to treatment-seeking), and (4) violence as the only contract-enforcement mechanism. These four consequences are structural properties of prohibition, not contingent features. No individual country can unilaterally eliminate them without eliminating its own demand.", beta: "7.16", expiry: "Portugal-model decriminalization plus treatment infrastructure. Proven at national scale. Not adopted globally.", proven: "Portugal Law 30/2000 (2001): full decriminalization of personal possession, paired with dissuasion commissions and treatment investment. Drug mortality fell from 80 per million in 1999 to 3 per million in 2017." },
    { name: "Private Military Contractors / Accountability Vacuum", plain: "Private military and security companies operate in conflict zones with neither the accountability of state military forces (governed by the laws of armed conflict) nor the accountability of civilian contractors (governed by commercial law). The jurisdictional gap is structural: they operate where domestic law does not reach, under contracts that assign no liability for civilian harm, in conflicts where their principals have limited oversight capacity.", theorem: "Private military contractor operations in conflict zones exist in a zone where no effective law applies: host-nation law is not enforced, home-nation jurisdiction does not extend to extraterritorial acts, and the Military Extraterritorial Jurisdiction Act (MEJA) has never produced a successful prosecution for overseas contractor conduct. The welfare cost — civilian casualties, destabilization — is externalized from contractor revenues and from client-state procurement budgets alike.", beta: "2.06", expiry: "International criminal jurisdiction for contractor conduct. Not established." },
    { name: "Sovereign Debt / Missing Bankruptcy Court", plain: "When a private company cannot pay its debts, it files for bankruptcy. A court adjudicates the claims, restructures the obligations, and the entity either continues operating or liquidates in an orderly way. When a country cannot pay its debts, there is no such process. Creditors can litigate in courts that have no enforcement power over a sovereign. Holdout creditors can block restructuring agreements reached by 90% of bondholders. The cost of no bankruptcy court falls on citizens — in austerity, unemployment, and public service cuts.", theorem: "Sovereign debt restructuring fails because it lacks a mandatory coordination mechanism: any individual creditor can refuse to participate in a restructuring and sue in a foreign court for full face value, using proceeds from the lawsuit to block debt service to other creditors. Argentina's 2001 default and 14-year holdout litigation is the canonical case. No bilateral mechanism between a sovereign and its creditors can solve the collective action problem without a supranational framework.", beta: "4.67", expiry: "International Monetary Fund (IMF) sovereign debt restructuring mechanism with mandatory collective action. Brady bonds model (1989) for partial precedent. Not at scale.", proven: "IMF collective action clauses and Brady bonds (1989) provide partial model. Ecuador 2020 debt restructuring with creditor committee is recent example." },
    { name: "Water Privatization / Natural Monopoly Capture", plain: "Water infrastructure — pipes, treatment plants, distribution networks — is a natural monopoly. It cannot be duplicated by a competitor because no city can support two parallel pipe networks. When water infrastructure is privatized, the private operator has monopoly pricing power over a necessity of life. Regulatory oversight is the only check. When regulators are captured — which happens structurally in low-income jurisdictions with weak institutions — prices rise and service quality falls.", theorem: "Natural monopoly is defined by a cost structure where average costs decline over the full range of relevant output — a single firm can always produce the good more cheaply than two competing firms. Water distribution has this structure. Privatization of a natural monopoly without effective regulation produces monopoly pricing. In jurisdictions where regulatory capacity is weak, privatization transfers monopoly rents from consumers to shareholders without welfare improvement.", beta: "5.61", expiry: "Effective independent regulation with cost-of-service pricing. Demonstrated: England and Wales (Ofwat model). Not implemented in most privatized systems globally." },
  ]},
  // ── GROUP 10 ─────────────────────────────────────────────────
  { group: "INCENTIVE CAPTURE — INSTITUTIONS DESIGNED AGAINST THEIR PURPOSE", type: "intractability", domains: [
    { name: "Firearms / Legislative Capture and Constitutional Lock-In", plain: "The United States has 4% of the world's population and 46% of its civilian-owned firearms. It has more gun deaths per year than any other high-income country by a factor of twenty-five. The welfare destruction is not in dispute by public health epidemiology. What is in dispute is the institutional solution: the Second Amendment, as interpreted by District of Columbia v. Heller (2008), and the political economy of the National Rifle Association (NRA) create a legislative environment where welfare-improving regulation cannot be enacted.", theorem: "NRA campaign contributions and electoral mobilization create a credible commitment problem for legislators: any vote for firearms regulation is subject to primary challenge funded by the firearms industry. This creates a Nash equilibrium where no individual legislator has an incentive to vote for welfare-improving regulation, even when a majority of their constituents favor it. The institutional design — legislative, not constitutional — is the binding constraint.", beta: "50.99", expiry: "Heller decision narrowed by Supreme Court, combined with NRA political capture dissolved. Neither is near-term.", proven: "Australia National Firearms Agreement (1996): mandatory buyback of 650,000 semi-automatic weapons after Port Arthur massacre. Mass shootings: zero in the subsequent 28 years." },
    { name: "Private Prisons / Recidivism Incentive Architecture", plain: "Private prison companies are paid per prisoner per day. Their revenue goes up when incarceration rates are high and when prisoners return after release. The incentive structure is the inverse of the stated purpose of the criminal justice system, which is rehabilitation and public safety. Private prison companies spend approximately $25 million per year lobbying for policies — mandatory minimums, three-strikes laws, private immigration detention — that increase their customer base.", theorem: "The private prison operator's objective function is revenue maximization, which is a monotonically increasing function of prisoner-days. The social welfare function for criminal justice is minimization of recidivism and crime. These two functions are structurally opposed: any policy that reduces crime or recidivism reduces private prison revenue. No bilateral contract between a government and a private prison operator can align these incentives — the perverse incentive is constitutive of the for-profit model.", beta: "12.08", expiry: "Elimination of for-profit incarceration. Norway model: state-operated, rehabilitation-focused, 16% recidivism vs. 76% US.", proven: "Norway correctional system: zero private prisons, rehabilitation focus, 16% two-year recidivism versus 76% in the United States. Halden Prison is the documented model." },
    { name: "Credit Rating Agencies / Issuer-Pays Structural Bias", plain: "Credit rating agencies — Moody's, Standard & Poor's, Fitch — are paid by the companies whose debt they rate. The company issuing the bond hires the agency and pays for the rating. This is the issuer-pays model. It creates a structural incentive to produce favorable ratings, because an agency that gives unfavorable ratings loses clients to competitors who give better ones. Moody's and Standard & Poor's rated mortgage-backed securities as AAA that were worth nothing. The 2008 financial crisis followed.", theorem: "The issuer-pays model creates a competitive race to leniency: if Rating Agency A rates an issuer accurately (at BB) and Rating Agency B rates the same issuer favorably (at AAA), the issuer takes its business to B. B gains revenue; A loses revenue. The Nash equilibrium is rating inflation across all competing agencies simultaneously. No individual agency can unilaterally adopt conservative rating standards without losing market share to more lenient competitors.", beta: "11.21", expiry: "Investor-pays model OR government-funded rating agency with no issuer relationship. Egan-Jones model is partial precedent. Not dominant.", proven: "European Securities and Markets Authority (ESMA) regulatory framework; Egan-Jones unsolicited rating model." },
    { name: "Pharmacy Benefit Management (PBM) / Rebate Opacity", plain: "Pharmacy benefit managers are intermediaries in the US drug supply chain: they negotiate with drug manufacturers, build formularies for insurers, and process claims for pharmacies. They extract rebates from manufacturers — secret discounts paid to keep a drug on the formulary — and retain a portion. Neither the insurer, the patient, nor the regulator can see the full rebate stream. The opacity is the product. A PBM with transparent pricing would lose its competitive advantage.", theorem: "Pharmacy benefit manager rebate arrangements are structured as confidential commercial agreements between the PBM and the manufacturer. No party downstream — the insurer, the employer plan sponsor, the patient — has contractual access to the full rebate amount. System welfare W cannot be computed from observable prices because the actual price paid is concealed by design. This is a textbook Axiom 2 violation: the bilateral transaction (PBM-manufacturer rebate) is explicitly designed to be invisible to the system.", beta: "6.35", expiry: "Full pass-through of manufacturer rebates to patients at point of sale. Proposed under Trump administration (2019); withdrawn. Not implemented." },
    { name: "Defense Procurement / Cost-Plus Ratchet and Revolving Door", plain: "Defense procurement contracts are often structured as cost-plus: the contractor is reimbursed for all costs plus a guaranteed profit margin. This structure eliminates the incentive to control costs. A contractor that reduces costs reduces its own revenue. The F-35 fighter program has cost $1.7 trillion over its life — $428 billion in recurring costs per plane — and is still in development. The revolving door between the Pentagon and defense contractors ensures that the people writing the contracts worked for the companies bidding on them.", theorem: "Cost-plus contracting eliminates the cost-minimization incentive that competitive markets are supposed to provide. The contractor's profit function is increasing in cost. No bilateral renegotiation can fix this because the information asymmetry is structural: the contractor knows the true cost; the Pentagon does not. The revolving door ensures that the regulatory body charged with oversight has been staffed by the industry it oversees.", beta: "4.88", expiry: "Fixed-price competitive contracting with independent audit. Demonstrated: commercial satellite launch contracts. Not generalized to major weapons systems." },
    { name: "Private Equity (PE) in Healthcare / EBITDA Medicine", plain: "Private equity acquires hospitals, physician practices, nursing homes, and emergency medical services with the objective of improving earnings before interest, taxes, depreciation, and amortization (EBITDA) for a sale or public offering within three to seven years. This time horizon is not compatible with long-term patient outcomes. Staffing is cut. Upcoding — billing for more expensive procedures — increases. Surprise billing is deployed as a revenue stream. The patient is the product.", theorem: "Private equity value creation in healthcare requires extracting value from the existing system rather than creating new value, because healthcare demand is inelastic and price-insensitive for emergency services. The optimal private equity healthcare strategy is: (1) reduce staff per patient, (2) increase billing per encounter, (3) eliminate unprofitable services. Each of these actions reduces welfare. No bilateral contract between a private equity owner and a hospital operator can internalize the welfare cost imposed on patients who have no alternative provider.", beta: "5.24", expiry: "Certificate of public advantage requirements for healthcare acquisitions, with community benefit standards. Not federally mandated in US." },
    { name: "Insurance & Climate Risk Mispricing / Actuarial Stationarity Failure", plain: "Insurance pricing is based on historical loss distributions. The statistical models assume that the past is a reliable guide to the future — an assumption called stationarity. Climate change violates stationarity: the future will be more extreme than the past, in ways that historical data cannot capture. Actuarially sound premiums for climate-exposed properties would be unaffordable. So insurers are withdrawing from California, Florida, and Louisiana, or pricing at rates that are politically unsustainable.", theorem: "Non-stationary climate risk — where the loss distribution is shifting over time in response to greenhouse gas concentrations — cannot be priced by an actuarial model calibrated on historical data. Any premium that accurately prices the future risk will be politically contested as unaffordable. Any premium calibrated on historical data will be actuarially inaccurate, producing insurer insolvency or withdrawal. The welfare cost — uninsured losses, fiscal exposure of government backstops — is structural to the non-stationarity of the climate.", beta: "4.57", expiry: "Actuarially accurate, climate-forward pricing with managed retreat subsidies for socially necessary but economically uninsurable properties. Not at scale." },
    { name: "FX Fixing / Self-Referential Benchmark", plain: "From 2003 to 2013, a cartel of global dealer banks manipulated the WM/Reuters 4pm FX fix — the benchmark governing the world's largest financial market — alongside LIBOR, the London Gold Fix, and commodity price assessments. The same banks with advance knowledge of client order flow also executed their own positions in the one-minute fixing window, extracting approximately $28B/yr in rents from pension funds, corporate treasuries, and sovereigns. Regulatory penalties exceeded $20 billion across 6 jurisdictions. The structural conflict of interest in FX fixing remains only partially resolved.", theorem: "Self-referential benchmarks — where the entity trading at the fixing rate also holds advance knowledge of client order flow — violate the independence condition required for an honest price signal. Dealer banks receive standing-instruction orders before the 4pm fix, granting foreknowledge of demand that can be monetized through pre-positioning. The annual private revenue was approximately $40B in manipulator rents (Π). Against that, the system absorbed $204B/yr in welfare destruction (β_W = 7.18): mispriced hedges, pension fund losses, municipal borrowing costs, distorted monetary policy signals, and eroded institutional trust. No contractual arrangement between a panel bank and a benchmark administrator resolves this while the bank retains access to pre-fix order flow.", beta: "7.18", expiry: "Transaction-based benchmark with no pre-fix order flow advantage. SOFR implemented for USD interest rates (2023). FX equivalent — algorithmic midpoint fixing using actual executed transactions — not yet mandated globally.", proven: "SOFR transition (2023) eliminated the self-referential submission problem for USD interest rates. Demonstrates that transaction-based benchmark redesign works. The FX reform is incomplete: WM/Reuters 4pm fix still uses a one-minute window subject to known structural exploitation." },
  ]},
  // ── GROUP 11 ─────────────────────────────────────────────────
  { group: "NETWORK LOCK-IN — SELF-REINFORCING MONOPOLIES", type: "intractability", domains: [
    { name: "Platform Monopoly / Gatekeeper Ratchet", plain: "Network effects mean the platform becomes more valuable as more people use it. Zero-price lock-in means users cannot leave without losing their social graph, their reviews, their history. Data feedback means the platform gets better at predicting behavior as it accumulates data. These three mechanisms together generate a self-reinforcing floor: the platform cannot be displaced by a better product because the switching cost is the entire network.", theorem: "Network effect monopolies are distinguished from conventional monopolies by a superadditive value function: each additional user increases the platform's value to all existing users. This makes displacement by a competing platform with better welfare properties structurally impossible within a market process — the competing platform starts with zero users and therefore zero network value, regardless of its quality. The welfare cost is permanent supracompetitive pricing, degraded privacy, and suppression of better alternatives.", beta: "6.33", expiry: "Structural dissolution — mandatory interoperability allowing users to maintain social graph while switching platforms. European Union (EU) Digital Markets Act (DMA) is the first systematic attempt. Not demonstrated at scale.", proven: "EU Digital Markets Act (DMA, 2024): interoperability mandates, data portability requirements, prohibition on self-preferencing. Under enforcement." },
    { name: "Big Tech / Surveillance Capitalism and Data Moat", plain: "The five largest technology companies — Apple, Microsoft, Alphabet (Google), Amazon, Meta — have market capitalizations that individually exceed the GDP of most countries. Their competitive advantage rests on data accumulation: the more data they hold, the better their products, the more users they attract, the more data they accumulate. No competitor can replicate this data moat. The welfare cost is suppression of competition, commoditization of attention, and economic rents extracted from every sector that depends on their infrastructure.", theorem: "Data network effects — where product quality is increasing in the quantity and quality of user data accumulated — create a structural barrier to entry that is qualitatively different from scale economies: a new entrant cannot acquire historical user data by investing capital. The data moat was built by the network effect, not by investment, and cannot be competed away. Welfare costs compound as the data advantage enables market expansion into adjacent verticals.", beta: "7.81", expiry: "Mandatory data portability and interoperability, combined with prohibition on data advantage in adjacent markets. EU Digital Markets Act framework. Not generalized.", proven: "EU Digital Markets Act designation of gatekeepers. GDPR data portability right (Article 20). Under enforcement." },
    { name: "Algorithmic Pricing / Tacit Collusion Without Communication", plain: "Pricing algorithms — used by airlines, hotels, rental car companies, apartment landlords, and retailers — can reach price-fixing outcomes without any communication between competitors. Each algorithm observes competitor prices, learns that higher prices are maintained when all competitors price high, and converges to the collusive equilibrium through independent optimization. The RealPage lawsuit found that 70% of apartments in some US cities were priced by the same algorithm. Antitrust law requires communication to establish conspiracy. The algorithms do not communicate.", theorem: "Q-learning price-setting algorithms, when deployed simultaneously by competitors facing the same market, converge to collusive price equilibria without any communication between the algorithm operators. The Folk Theorem in repeated games guarantees that collusion is a Nash equilibrium when players are patient and can observe each other's prices. Algorithmic pricing enforces this equilibrium automatically. The welfare cost — consumer surplus extracted through supracompetitive pricing — is not captured by any existing antitrust doctrine.", beta: "5.38", expiry: "Per se prohibition on algorithmic price coordination using common data inputs. EU precedent exists. US antitrust enforcement still developing doctrine.", proven: "EU Competition Authority has pursued algorithmic pricing cases under Article 101 of the Treaty on the Functioning of the European Union (TFEU). US Department of Justice RealPage investigation." },
    { name: "Data Brokerage / Surveillance Capitalism", plain: "Data brokers buy, aggregate, and sell personal information — browsing history, location data, purchase history, social connections, health indicators inferred from behavior — without the knowledge or consent of the individuals whose data is traded. The industry processes approximately 2.5 quintillion bytes of data daily. The individuals whose data is sold receive none of the proceeds and bear the full welfare cost: manipulation, discrimination, security exposure, and the monetization of their most private behaviors.", theorem: "Data brokerage extracts value from individuals without their knowledge by: (1) collecting behavioral data passively, (2) aggregating across sources into profiles that the individual cannot access or correct, and (3) selling profiles to buyers who use them for targeting, discrimination, or manipulation. System welfare W cannot be computed from broker revenue because the welfare cost falls on individuals who are not party to the transaction. Axiom 2 holds structurally: the transaction (broker-to-buyer) is invisible to the person whose welfare is at stake.", beta: "6.13", expiry: "General Data Protection Regulation (GDPR) equivalent globally with meaningful enforcement. EU GDPR is the model. Not implemented in the US, India, or China at comparable stringency.", proven: "EU GDPR (General Data Protection Regulation) with right to erasure, data portability, and consent requirements. Ireland Data Protection Commission enforcement actions against Meta. Estonian digital identity infrastructure." },
    { name: "Social Media / Youth Mental Health — Engagement Weaponization", plain: "Social media platforms are designed to maximize engagement, not well-being. Engagement is measured by time-on-platform, shares, and return visits. The most engaging content is anxiety-inducing, outrage-amplifying, and socially comparative. Instagram's own internal research, suppressed by Meta, showed that the platform worsens body image for one in three teenage girls. The algorithm optimizes for the metric it can measure — engagement — at the expense of the metric it cannot — mental health.", theorem: "Engagement maximization algorithms are trained on behavioral proxies (time-on-platform, share rates) that are positively correlated with anxiety and social comparison and negatively correlated with mental health outcomes. No bilateral transaction between the platform and the user can align these incentives: the platform captures advertising revenue from engagement; the welfare cost is borne by the user. The algorithm does not know the user is fourteen.", beta: "5.79", expiry: "Mandatory algorithmic transparency with independent welfare impact auditing. UK Age Appropriate Design Code is the model. Not implemented in the US.", proven: "UK Children's Code (Age Appropriate Design Code, 2021): mandates age-appropriate design, disables profiling of minors by default. Under enforcement." },
  ]},
  // ── GROUP 12 ─────────────────────────────────────────────────
  { group: "ADDICTION ARCHITECTURE — MARKETS BUILT ON DEPENDENCY", type: "intractability", domains: [
    { name: "Alcohol / Commercial Addiction Design", plain: "Alcohol causes liver disease, cancer, cardiovascular disease, domestic violence, and traffic deaths. The welfare cost is well-documented. The political economy is equally well-documented: the alcohol industry spends approximately $2 billion per year in the US on advertising and lobbying. The Nordic countries — Sweden, Finland, Norway — have demonstrated that state retail monopolies reduce per capita consumption by 30–40% relative to deregulated markets. The model works. It has not spread.", theorem: "Commercial alcohol retail maximizes revenue by maximizing consumption. Consumption is maximized by minimizing price, maximizing availability, maximizing promotional activity, and designing products for maximum repeat purchase. Each of these strategies increases the welfare cost from alcohol-related disease and harm. No bilateral market mechanism can align the alcohol retailer's revenue-maximizing objective with the social welfare-maximizing objective. The two are structurally opposed.", beta: "24.96", expiry: "Nordic state retail monopoly — no volume discounts, no promotional pricing, no on-site consumption, staff trained in harm identification. Demonstrated in Sweden, Finland, Norway.", proven: "Systembolaget (Sweden): 455 stores, non-profit, per capita consumption 7.1 liters/year versus 10.5 in the US. Alko (Finland), Vinmonopolet (Norway) comparable results." },
    { name: "Tobacco / Nicotine Addiction Economics", plain: "Tobacco kills 8 million people per year globally. Nicotine is one of the most addictive substances known, with a dependence rate of approximately 32% for those who try it — higher than heroin or cocaine. The industry's 20th-century playbook — suppress internal research on addiction and cancer, fund doubt-manufacturing scientists, lobby against regulation — is the template for subsequent industries facing evidence of welfare destruction. The product is designed to addict. Addiction is the revenue model.", theorem: "Nicotine addiction creates demand inelasticity that insulates tobacco revenue from price signals: addicted smokers continue purchasing despite price increases that would deter recreational users. The welfare cost — 8 million annual deaths plus respiratory disease, cancer, and cardiovascular disease burden — is entirely externalized from the transaction between the manufacturer and the addicted consumer. The consumer pays for their addiction. Society pays for their disease.", beta: "6.50", expiry: "Mandatory nicotine reduction to sub-addictive levels in cigarettes, combined with supply reduction. Philip Morris's internal research showed sub-addictive nicotine is technically feasible. Not implemented.", proven: "New Zealand Smokefree Environments and Regulated Products Amendment Act (2022): mandatory nicotine reduction in cigarettes. Repealed by subsequent government. Iceland, Norway high-tax models with lowest European smoking rates." },
    { name: "Opioid Ecosystem / Therapeutic Addiction Gateway", plain: "OxyContin was marketed by Purdue Pharma as a non-addictive pain medication. Purdue's own internal research showed it was addictive. Sales representatives were trained to downplay addiction risk. Physicians were given financial incentives to prescribe. The result: 500,000 Americans died from opioid overdoses between 1999 and 2019. The mechanism was the healthcare system itself — the trusted relationship between physician and patient — deployed as a distribution channel for a product designed to create dependency.", theorem: "The therapeutic gateway problem: opioids prescribed by physicians for legitimate pain create physiological dependency in a substantial fraction of patients. Once dependent, patients require continued supply that the healthcare system cannot sustainably provide at therapeutic doses, driving them to illicit markets. The welfare cost — overdose deaths, addiction disease burden, social disruption — is externalized from the pharmaceutical manufacturer's revenue at the point of origin.", beta: "14.96", expiry: "Portugal-model decriminalization plus supervised consumption sites plus heroin-assisted treatment for severely dependent users. Demonstrated: Switzerland, Portugal. Not implemented in the US.", proven: "Portugal Law 30/2000 (2001): drug mortality fell 96%. Swiss heroin-assisted treatment (HeGeBe): crime by participants fell 60%, regular employment increased 70%." },
    { name: "Gambling & Casinos / Dopamine Exploitation Design", plain: "Modern casinos and online gambling platforms are engineering products optimized to exploit dopaminergic reward circuits. Variable ratio reinforcement — the slot machine mechanism — produces the strongest behavioral conditioning known to psychology. Casinos track player behavior, identify players at risk of problem gambling, and have been documented in some cases to increase their marketing to those players. Problem gamblers, approximately 1–3% of the population, account for a disproportionate share of industry revenue.", theorem: "The gambling industry revenue function is maximized by maximizing play duration and stake size among the player population. Problem gambling — characterized by loss of control over play behavior — produces the highest revenue per player. No market mechanism aligns the casino's revenue-maximizing objective with the welfare of problem gamblers. The design of gambling products (variable ratio reinforcement, near-miss effects, elimination of natural stopping points) is optimized for the clinical definition of behavioral addiction.", beta: "7.30", expiry: "Nordic state gambling monopoly — Svenska Spel (Sweden), Norsk Tipping (Norway) — with mandatory harm limits, no algorithmic targeting, no volume-based bonuses. Demonstrated.", proven: "Svenska Spel (Sweden) and Norsk Tipping (Norway): state monopoly, mandatory deposit limits, no bonus-for-loss promotions, self-exclusion with enforcement." },
    { name: "Ultra-Processed Food (UPF) / Bliss Point Engineering", plain: "Ultra-processed foods — the products of industrial food formulation — are engineered to a 'bliss point': the precise combination of salt, sugar, fat, and texture that maximizes palatability and minimizes satiation. The science of bliss point engineering is documented in internal food industry research. The result: ultra-processed foods constitute approximately 60% of calories consumed in the US and UK. Consumption is strongly associated with obesity, type 2 diabetes, cardiovascular disease, and all-cause mortality.", theorem: "Ultra-processed food manufacturers capture the surplus from engineered palatability while externalizing the welfare cost — obesity, metabolic disease, healthcare burden — onto consumers and public health systems. No bilateral market transaction between the consumer and the manufacturer can internalize this cost: the consumer responds to the product's engineered palatability as designed; the disease develops years to decades later; and the causal chain from consumption to disease is obscured by the complexity of diet and metabolism.", beta: "4.06", expiry: "Front-of-pack mandatory warning labels (Chile model) combined with marketing restrictions to children. Chile Ley de Etiquetado (2016) demonstrated: 25% reduction in consumption of labeled products within two years.", proven: "Chile Ley de Etiquetado (Food Labeling Law, 2016): mandatory black octagon labels for high sugar/sodium/fat/calories. Children's marketing restrictions. Consumption of labeled products fell 25% in two years." },
    { name: "Payday Lending / Debt Trap Design", plain: "Payday lenders offer short-term loans at annualized interest rates of 300–600%. Borrowers who cannot repay the loan — the majority, by design — roll it over, paying another fee for another two weeks. The average payday loan borrower takes out eight loans per year. The product is not designed to solve a cash flow problem. It is designed to create a recurring fee relationship with someone who has no alternative. The alternative — postal banking at market rates — exists and works.", theorem: "Payday loan revenue is maximized when borrowers cannot repay on time. Repeat rollover fees constitute approximately 75% of industry revenue. The product's profitability is negatively correlated with the borrower's welfare: a borrower who repays on time is unprofitable; a borrower trapped in a rollover cycle is the ideal customer. No market mechanism can align this incentive structure with borrower welfare while maintaining the product's revenue model.", beta: "7.08", expiry: "Postal banking at market rates — Japan Post Bank model, North Dakota State Bank model. Demonstrated.", proven: "Japan Post Bank: largest bank by deposits ($2.1 trillion), serves rural and low-income customers at market rates. North Dakota State Bank: state-owned, prevents payday lending proliferation in rural ND." },
  ]},
  // ── GROUP 13 ─────────────────────────────────────────────────
  { group: "DEBT AND LABOR EXTRACTION — STRUCTURAL TRAPS", type: "intractability", domains: [
    { name: "Student Loan Securitization / Inescapable Debt Architecture", plain: "The US federal student loan system has $1.7 trillion in outstanding loans. Unlike every other form of consumer debt, student loans are non-dischargeable in bankruptcy except in cases of 'undue hardship' — a standard that almost no borrower can meet. The debt follows the borrower for life. Servicers are paid per loan regardless of repayment outcome, creating no incentive to assist struggling borrowers. Australia's income-contingent repayment system — the Higher Education Contribution Scheme (HECS-HELP) — has solved this problem since 1989.", theorem: "Non-dischargeable student debt creates a claim on human capital that cannot be renegotiated in response to labor market outcomes. The borrower who chooses a low-income career, suffers illness, or enters a declining industry has no legal mechanism to reduce their debt burden proportionally. The welfare cost — foregone career choices, delayed homeownership, reduced fertility — is the tax on human capital imposed by a debt architecture designed for asset-backed lending applied to an asset (human capital) that cannot be repossessed.", beta: "6.36", expiry: "Income-contingent repayment — HECS-HELP model — replacing fixed-payment non-dischargeable loans. Demonstrated: Australia since 1989.", proven: "Australia Higher Education Contribution Scheme (HECS-HELP, 1989, designed by economist Bruce Chapman): income-contingent repayment, no bankruptcy risk, repayment begins only above income threshold. 35 years of demonstrated function." },
    { name: "Child Labor / Poverty Trap Lock-In", plain: "Child labor persists because poverty forces families to choose between a child's education and a child's income. The household that sends a child to work instead of school makes a rational decision given its constraints. The market does not solve this because the market cannot see the child's foregone human capital development — only the household can, and the household is making the optimal decision given its circumstances. Without transfer payments that compensate for the income loss, the poverty trap is stable.", theorem: "Child labor is a Nash equilibrium in a poverty trap: given a household income below subsistence, the rational strategy is to deploy all available labor, including children, to current income maximization. No market mechanism can break this equilibrium without changing the household's budget constraint. The welfare cost — permanently reduced human capital from interrupted education — compounds across generations, because under-educated parents have lower incomes and are more likely to send their own children to work.", beta: "21.83", expiry: "Conditional cash transfer — Brazil's Bolsa Família model — that compensates families for school attendance. Demonstrated: Brazil 1990s–2010s.", proven: "Brazil Bolsa Família (conditional cash transfer program): school attendance conditionality tied to income transfer. Child labor rates fell from 20% (1992) to 7% (2008) of 10–14 year olds." },
    { name: "Gig Economy / Labor Misclassification Architecture", plain: "Uber, Lyft, DoorDash, and Instacart classify their workers as independent contractors rather than employees. This means the platforms pay no payroll taxes, provide no health insurance, contribute to no pension, and bear no liability for workplace injury. The workers bear all these risks. The legal architecture of misclassification is explicit: the platforms were designed with this classification in mind, and have spent approximately $200 million in California alone to maintain it through ballot measures.", theorem: "Independent contractor misclassification is profitable because it transfers the welfare costs of employment — payroll taxes, benefits, injury liability — from the employer to the worker and to public social insurance systems. No bilateral contract between a platform and a worker can restore employment benefits: any worker who insists on benefit-equivalent compensation loses the job to a worker who accepts the lower rate. The equilibrium is misclassification without compensation.", beta: "0.76", expiry: "Employment reclassification — Danish flexicurity model: universal benefits regardless of employment classification, combined with flexible hire/fire rules. Demonstrated.", proven: "Danish flexicurity: universal unemployment insurance and health coverage regardless of employment status. Gig economy welfare cost is low because the safety net is not tied to employment classification." },
    { name: "Mining & Rare Earth / Environmental Externalization", plain: "Mining for copper, cobalt, lithium, nickel, and rare earth elements — the materials required for electric vehicles, wind turbines, and batteries — produces tailings ponds, acid mine drainage, and habitat destruction. In the Democratic Republic of Congo, artisanal cobalt mining employs children in conditions that produce respiratory disease, radiation exposure, and fatal accidents. The price of the mineral does not include the welfare cost of its extraction. It never has.", theorem: "Mining welfare costs are externalized because the affected communities — local populations near mine sites, downstream water users, future generations inheriting contaminated land — are not party to the transaction between the mining company and its customers. The Polluter Pays Principle requires that the mining company bear remediation costs; in practice, bond requirements are insufficient to cover full remediation, and companies can declare bankruptcy to avoid liability. The welfare floor is the unremediated damage to water, soil, and human health.", beta: "11.15", expiry: "Full-cost bond requirements at mine opening, held by independent third party. Australian rehabilitation bond model is partial precedent. EU Critical Raw Materials Act (2024) includes social standards." },
    { name: "Commercial Real Estate / Vacancy-Debt Spiral", plain: "Commercial real estate — office buildings, retail malls, suburban office parks — was valued in 2019 on the assumption that occupancy rates and rents established over the previous decade would continue indefinitely. Remote work, e-commerce, and changing retail patterns have permanently reduced demand for large categories of commercial real estate. Buildings with 50–70% vacancy are worth a fraction of their debt-financed value. Bank balance sheets are exposed. Cities that depend on commercial property taxes are exposed. The adjustment is not underway at the required scale.", theorem: "Commercial real estate is characterized by high fixed costs (debt service, maintenance), illiquidity (properties cannot be liquidated quickly), and long lease terms that delay the price signal from demand reduction to balance sheet recognition. The vacancy-debt spiral occurs when: (1) demand falls, (2) landlords hold out for historical rents rather than renegotiate (value preservation behavior), (3) vacancies compound, (4) property values fall, (5) banks holding commercial mortgage-backed securities recognize losses. The welfare cost — bank fragility, fiscal stress on cities, urban blight — is a structural consequence of the debt-financed real estate model.", beta: "7.78", expiry: "Orderly write-down and adaptive reuse conversion — residential conversion of vacant office stock. Requires zoning reform and loss recognition by lenders. Not at scale." },
  ]},
];

// ─── THEOREM × AXIOM DATA ────────────────────────────────────────────────────
// [domain, βW, category, A1_status, A2_status, A3_status, break_path]
// A1 = Overlapping Interests (deal exists), A2 = System Independence (W hidden), A3 = System Dependence (activity harms system)
// status: "LOCKED" = axiom holds, cannot be broken within current paradigm
//         "BREAKABLE" = institutional/policy intervention CAN break this axiom
//         "TARGET" = primary break pathway for this domain
const AXIOM_TABLE = [
  // ── IMPOSSIBILITY (physical/chemical/biological — all axioms locked) ─────────
  ["PFAS / Molecular Persistence",     5.31,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Production ban + non-persistent substitutes"],
  ["POPs Beyond PFAS",                  6.23,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Bioremediation at scale"],
  ["Plastics / Polymer Persistence",    6.67,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Material replacement + UN Global Plastics Treaty"],
  ["Coal / Combustion Floor",           6.95,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Renewable replacement + declining production cap"],
  ["Oil & Gas / Combustion Floor",      1.63,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Renewable replacement + carbon pricing"],
  ["Aviation Emissions / Altitude Lock",4.97,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Hydrogen/SAF at scale + altitude routing constraints"],
  ["Shipping & Maritime / Flag-State",  1.34,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "IMO global emissions cap + green propulsion"],
  ["Cement / Calcination Chemistry",    6.74,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Clinker substitutes (LC3) + carbon capture at kiln"],
  ["Deforestation / Canopy Regeneration",7.21, "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "EU Deforestation Regulation + payments for ecosystem services"],
  ["Monoculture / Crop Diversity Loss", 7.36,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Seed bank mandates + crop diversity subsidies"],
  ["Industrial Agriculture / Methane",  7.36,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Enteric methane regulation + alternative protein transition"],
  ["Topsoil Erosion / Pedogenesis Rate",4.41,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Regenerative agriculture mandates + no-till incentives"],
  ["Deep-Sea Mining / Benthic Recovery",6.90,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "ISA moratorium + terrestrial recycling at scale"],
  ["Nuclear / Radioactive Decay",       2.94,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Geological repository + waste volume minimization"],
  ["WMD Proliferation / Capability Diffusion",21.92,"Impossibility","LOCKED",  "LOCKED",    "LOCKED",    "Treaty verification infrastructure + export controls"],
  ["Orbital Debris / Kessler Cascade",  2.18,   "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Active debris removal + binding launch debris standards"],
  ["Human Trafficking / Coercive Biology",22.62,"Impossibility",  "LOCKED",    "LOCKED",    "LOCKED",    "Demand criminalization (Nordic model) + survivor support"],
  ["Child Labor / Dependency Biology",  21.83, "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Conditional cash transfers (Brazil Bolsa Família model)"],
  ["Factory Farming / Biological Scale",1.02,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Alternative protein transition + welfare floor mandates"],
  ["E-Waste Export / Toxicological Load",6.59, "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Extended producer responsibility + Basel Convention enforcement"],
  ["Palm Oil / Deforestation Coupling", 6.30,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "RSPO certification with enforcement + EUDR supply chain rules"],
  ["Fast Fashion / Material Throughput",7.01,  "Impossibility",   "LOCKED",    "LOCKED",    "LOCKED",    "Extended producer responsibility + durability standards"],
  // ── INTRACTABILITY (institutional — axioms breakable with reform) ────────────
  ["Alcohol / Addiction Architecture",  24.96, "Intractability",  "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: state retail monopoly (Sweden Systembolaget model)"],
  ["Gambling / Loss-Chasing Architecture",7.30,"Intractability",  "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: state monopoly (Svenska Spel / Norsk Tipping model)"],
  ["Opioid Ecosystem / Addiction Loop", 14.96, "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: Portugal decriminalization + Swiss heroin-assisted treatment"],
  ["Private Prisons / Recidivism Lock", 12.08, "Intractability",  "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: abolish private prisons (Norway/Finland model, 16% recidivism)"],
  ["Student Loans / Debt Overhang",     6.36,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: income-contingent repayment (Australia HECS-HELP model)"],
  ["Payday Lending / Debt Trap",        7.08,  "Intractability",  "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: postal banking replaces predatory lending (Japan Post Bank model)"],
  ["Tax Havens / Jurisdictional Arbitrage",6.27,"Intractability", "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: OECD Pillar Two 15% global minimum tax (140 countries)"],
  ["Sovereign Debt / Holdout Problem",  4.67,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: IMF collective action clauses + Brady bond framework"],
  ["Conflict Minerals / Warlord Rents", 12.60, "Intractability",  "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: Dodd-Frank §1502 traceability + OECD due diligence"],
  ["Firearms / Lethality Multiplier",   50.99, "Intractability",  "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: licensing, buyback, and supply cap (Australia 1996 model)"],
  ["Cybercrime & Ransomware",           6.22,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: Estonia digital resilience + Budapest Convention enforcement"],
  ["Data Brokerage / Surveillance Rents",6.13, "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: GDPR + Estonia/Finland digital identity infrastructure"],
  ["Algorithmic Pricing / Coordination",5.38,  "Intractability",  "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: EU Digital Markets Act per se price-fixing rules"],
  ["Platform Monopoly / Lock-In",       6.33,  "Intractability",  "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: structural separation (EU DMA model)"],
  ["Frontier AI / Capability Race",     7.51,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: mandatory safety disclosure + international AI treaty"],
  ["Social Media / Youth Mental Health",5.79,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: Kids Online Safety Act + age verification mandates"],
  ["Mining & Rare Earth / Enclave Extraction",11.15,"Intractability","BREAKABLE","TARGET",  "LOCKED",    "Break A2: resource curse transparency (EITI + beneficial ownership)"],
  ["Fisheries & Coral / Open Access",   4.70,  "Intractability",  "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: territorial use rights + Marine Protected Areas"],
  ["Water Privatization / Access Denial",5.61, "Intractability",  "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: re-municipalization + human right to water statutes"],
  ["PE in Healthcare / Margin Extraction",5.24,"Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: mandatory outcome disclosure + private equity ban in hospitals"],
  ["Pharmacy Benefit Management",       6.35,  "Intractability",  "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: rebate transparency + PBM fiduciary duty reform"],
  ["Credit Rating Agencies / Issuer Pay",11.21,"Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: investor-pay model + EU sovereign rating independence"],
  ["Defense Procurement / Cost-Plus Lock",4.88,"Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: fixed-price contracts + audit rights (FY2017 NDAA model)"],
  ["FX Fixing",                          7.18,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: transaction-based benchmark (SOFR) + MiFID II surveillance"],
  ["Insurance & Climate Risk / Mispricing",4.57,"Intractability", "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: TCFD mandatory disclosure + NFIP actuarial pricing reform"],
  ["Commercial Real Estate / Opacity",  7.78,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: beneficial ownership registry + vacancy tax"],
  ["Bitcoin / Proof-of-Work / Energy Waste",5.00,"Intractability","TARGET",    "BREAKABLE", "LOCKED",    "Break A1: energy cost internalization via carbon price + PoW ban (EU)"],
  ["Illicit Drug Trade / Prohibition Rents",7.16,"Intractability", "TARGET",    "BREAKABLE", "LOCKED",    "Break A1: decriminalization + regulated supply (Portugal + Switzerland)"],
  ["Stablecoins / Shadow Banking",      2.53,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: MiCA full reserve requirements + deposit insurance equivalence"],
  ["Arms Exports / Accountability Gap", 2.54,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: Arms Trade Treaty end-use monitoring + export license reform"],
  ["Private Military Contractors",      2.06,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: Montreux Document implementation + contractor liability law"],
  ["Gene Drives / Irreversibility",     12.65, "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: WHO guidance + mandatory ecosystem impact disclosure"],
  ["Groundwater (Ogallala) / Depletion",3.46,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: metered extraction rights + adjudicated water law"],
  // ── TROUBLESOME (βW < 1.0 — policy can internalize, axioms all breakable) ────
  ["Gig Economy / Misclassification",   0.76,  "Troublesome",     "BREAKABLE", "BREAKABLE", "LOCKED",    "Reclassification to employment + Danish flexicurity model"],
  ["Proof-of-Stake / Altcoins",         3.14,  "Troublesome",     "BREAKABLE", "BREAKABLE", "LOCKED",    "MiCA disclosure + proof-of-work differentiation in regulation"],
  // ── COMPLEX / CROSS-CUTTING ──────────────────────────────────────────────────
  ["AMR / Antimicrobial Resistance",    2.12,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: AMR surveillance + antibiotic stewardship mandates (WHO NAP)"],
  ["Ultra-Processed Food",              4.06,  "Intractability",  "BREAKABLE", "TARGET",    "LOCKED",    "Break A2: mandatory reformulation targets + front-of-pack labeling (Chile model)"],
];

function TheoremAxiomTable() {
  const [sortCol, setSortCol] = useState(1);
  const [sortDir, setSortDir] = useState(-1);
  const [filter, setFilter] = useState("ALL");

  const toggle = col => { if (sortCol===col) setSortDir(d=>-d); else { setSortCol(col); setSortDir(-1); }};

  const rows = AXIOM_TABLE
    .filter(r => filter === "ALL" || r[2] === filter)
    .sort((a, b) => {
      const av = a[sortCol], bv = b[sortCol];
      if (typeof av === "string") return sortDir * av.localeCompare(bv);
      return sortDir * (av - bv);
    });

  const COLS = [["Domain",0],["βW",1],["Category",2],["Axiom 1\nOverlapping\nInterests",3],["Axiom 2\nSystem\nIndependence",4],["Axiom 3\nSystem\nDependence",5],["Reform Pathway",6]];

  const statusColor = s => s === "TARGET" ? "#22c55e" : s === "BREAKABLE" ? GOLD : RED;
  const catColor    = c => c === "Impossibility" ? RED : c === "Intractability" ? "#60A5FA" : GREEN;
  const catBg       = c => c === "Impossibility" ? "rgba(239,68,68,0.08)" : c === "Intractability" ? "rgba(96,165,250,0.08)" : "rgba(34,197,94,0.08)";
  const catBorder   = c => c === "Impossibility" ? "rgba(239,68,68,0.25)" : c === "Intractability" ? "rgba(96,165,250,0.25)" : "rgba(34,197,94,0.25)";

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>THEOREM × AXIOM CLASSIFICATION — ALL {AXIOM_TABLE.length} DOMAINS</div>
      <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.7, marginBottom: 16 }}>
        Every domain theorem mapped to its three constitutive axioms. <span style={{ color: RED }}>LOCKED</span> = axiom holds, cannot be broken within current paradigm. <span style={{ color: GOLD }}>BREAKABLE</span> = institutional intervention can violate this axiom. <span style={{ color: GREEN }}>TARGET</span> = primary reform pathway for this domain. All three axioms must hold for the Private Pareto Theorem to trap the system. Breaking one axiom exits the trap.
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["ALL","Impossibility","Intractability","Troublesome"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontFamily: M, fontSize: 10, letterSpacing: 1, padding: "4px 12px", borderRadius: 2, cursor: "pointer",
            background: filter===f ? (f==="Impossibility"?"rgba(239,68,68,0.15)":f==="Intractability"?"rgba(96,165,250,0.15)":f==="Troublesome"?"rgba(34,197,94,0.15)":"rgba(245,158,11,0.12)") : SURFACE,
            color: filter===f ? (f==="Impossibility"?RED:f==="Intractability"?"#60A5FA":f==="Troublesome"?GREEN:GOLD) : MUTED,
            border: `1px solid ${filter===f ? (f==="Impossibility"?"rgba(239,68,68,0.3)":f==="Intractability"?"rgba(96,165,250,0.3)":f==="Troublesome"?"rgba(34,197,94,0.3)":"rgba(245,158,11,0.25)") : BORDER}`,
          }}>{f} {f==="ALL" ? `(${AXIOM_TABLE.length})` : `(${AXIOM_TABLE.filter(r=>r[2]===f).length})`}</button>
        ))}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: M, fontSize: 11 }}>
          <thead>
            <tr>
              {COLS.map(([h,col]) => (
                <th key={col} onClick={() => toggle(col)} style={{
                  fontSize: 9, color: col===sortCol ? GOLD : MUTED, letterSpacing: 1.5,
                  padding: "8px 10px", textAlign: col===1 ? "right" : "left",
                  borderBottom: `1px solid ${BORDER}`, whiteSpace: "pre", cursor: "pointer", lineHeight: 1.4,
                }}>
                  {h}{col===sortCol ? (sortDir>0?"↑":"↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([domain, bw, cat, a1, a2, a3, path], i) => (
              <tr key={domain} style={{ background: i%2===0 ? "rgba(255,255,255,0.01)" : "transparent" }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(245,158,11,0.04)"}
                onMouseLeave={e => e.currentTarget.style.background=i%2===0?"rgba(255,255,255,0.01)":"transparent"}>
                <td style={{ padding:"6px 10px", color: TEXT, fontWeight: 500, minWidth: 220 }}>{domain}</td>
                <td style={{ padding:"6px 10px", color: bw>=20?RED:bw>=7?GOLD:DIM, textAlign:"right", fontWeight:600 }}>{bw.toFixed(2)}</td>
                <td style={{ padding:"6px 10px" }}>
                  <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 2, letterSpacing: 1, background: catBg(cat), color: catColor(cat), border: `1px solid ${catBorder(cat)}` }}>{cat.toUpperCase()}</span>
                </td>
                {[a1,a2,a3].map((s,j) => (
                  <td key={j} style={{ padding:"6px 10px", textAlign:"center" }}>
                    <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 2, letterSpacing: 1, fontWeight: s==="TARGET"?700:400, background: s==="TARGET"?"rgba(34,197,94,0.12)":s==="BREAKABLE"?"rgba(245,158,11,0.08)":"rgba(239,68,68,0.08)", color: statusColor(s), border: `1px solid ${s==="TARGET"?"rgba(34,197,94,0.3)":s==="BREAKABLE"?"rgba(245,158,11,0.25)":"rgba(239,68,68,0.2)"}` }}>{s}</span>
                  </td>
                ))}
                <td style={{ padding:"6px 10px", color: MUTED, fontSize: 12, fontFamily: S, minWidth: 260 }}>{path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10, padding: "10px 14px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, fontFamily: S, fontSize: 13, color: MUTED }}>
        Axiom 1 (Overlapping Interests): both parties benefit from cooperation — a deal exists. Axiom 2 (System Independence): system welfare W cannot be computed from private party payoffs. Axiom 3 (System Dependence): agent activity affects the shared system. The Private Pareto Theorem requires all three axioms to hold simultaneously. Reform breaks at least one.
      </div>
    </div>
  );
}

function Chapter8() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div id="ch8">
      <ChapterHead num={8} title="Some Hollow Wins cannot be fixed from inside the game. Ever." subtitle="61 domains. Groups 1–8 are impossibility theorems: the constraint is physical, chemical, biological, or orbital. Groups 9–14 are intractability theorems: the constraint is institutional — and every one has a proven solution in at least one country." time="8 min" />

      <P>The Private Pareto Theorem proves that bilateral optimization is constitutively blind to system welfare. In seventeen documented domains, this means no private mechanism can achieve <Tip term="Win-Win-Win">Win-Win-Win</Tip> without deliberate institutional redesign. That is the parent result.</P>

      <P>In sixteen of those domains, something stronger holds: no market mechanism — not regulation, not incentives, not carbon pricing, not better technology within the current paradigm — can reduce system welfare destruction below a structural floor. The floor is set not by institutional failure but by physics, biology, chemistry, or orbital mechanics.</P>

      <P>Each follows Arrow's logical architecture — three constitutive axioms, conjunction guarantees an irreducible floor — except the axioms are empirical facts about the physical world, not value judgments about rational preferences.</P>

      {DOMAINS.map((g, gi) => (
        <div key={g.group} style={{ marginTop: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 2 }}>
              GROUP {gi + 1} — {g.group}
            </div>
            <span style={{
              fontFamily: M, fontSize: 10, letterSpacing: 1, padding: "2px 8px", borderRadius: 2,
              background: g.type === "impossibility" ? "rgba(239,68,68,0.1)" : "rgba(96,165,250,0.1)",
              color: g.type === "impossibility" ? RED : "#60A5FA",
              border: `1px solid ${g.type === "impossibility" ? "rgba(239,68,68,0.3)" : "rgba(96,165,250,0.3)"}`,
            }}>
              {g.type === "impossibility" ? "IMPOSSIBILITY" : "INTRACTABILITY"}
            </span>
          </div>
          {g.domains.map((d, di) => {
            const key = `${gi}-${di}`;
            const isExpanded = expanded === key;
            return (
              <div key={key} onClick={() => setExpanded(isExpanded ? null : key)} style={{
                padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4,
                marginBottom: 8, cursor: "pointer",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: M, fontSize: 14, fontWeight: 600, color: TEXT }}>{d.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {d.beta && <span style={{ fontFamily: M, fontSize: 13, color: GOLD }}>β<sub>W</sub>: {d.beta}</span>}
                    <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{isExpanded ? "−" : "+"}</span>
                  </div>
                </div>
                {/* ALWAYS show plain English */}
                <div style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.7, marginTop: 8 }}>{d.plain}</div>

                {isExpanded && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                    {d.theorem && (
                      <div style={{ marginBottom: 10 }}>
                        <Label>THE THEOREM</Label>
                        <div style={{ fontFamily: M, fontSize: 13, color: TEXT, lineHeight: 1.7 }}>{d.theorem}</div>
                      </div>
                    )}
                    {d.callout && (
                      <div style={{ padding: "10px 14px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 4, marginBottom: 10 }}>
                        <div style={{ fontFamily: S, fontSize: 14, color: GOLD, fontStyle: "italic" }}>{d.callout}</div>
                      </div>
                    )}
                    <Label>EXPIRY CONDITION</Label>
                    <div style={{ fontFamily: M, fontSize: 13, color: RED, marginBottom: d.proven ? 10 : 0 }}>{d.expiry}</div>
                    {d.proven && (
                      <div style={{ marginTop: 10 }}>
                        <Label>PROVEN WORKING MODEL</Label>
                        <div style={{ fontFamily: M, fontSize: 13, color: GREEN, lineHeight: 1.7 }}>{d.proven}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* THEOREM × AXIOM TABLE */}
      <TheoremAxiomTable />

      {/* THE STRUCTURAL BREAK */}
      <div style={{ padding: "24px", background: "rgba(245,158,11,0.06)", border: `2px solid rgba(245,158,11,0.2)`, borderRadius: 4, margin: "40px 0" }}>
        <div style={{ fontFamily: S, fontSize: 17, color: GOLD, lineHeight: 1.8 }}>
          The 15 theorems in the existing economics canon are built on value judgments. Kenneth Arrow said so himself — he characterized his axioms as "value judgments that express the doctrines of citizens' sovereignty and rationality in a very general form." The Stanford Encyclopedia of Philosophy confirms: they are "not supposed to express more or less indubitable truths."
        </div>
        <div style={{ fontFamily: S, fontSize: 17, color: GOLD, lineHeight: 1.8, marginTop: 12 }}>
          The profession accepted those theorems. It gave out Nobel Prizes for them.
        </div>
        <div style={{ fontFamily: S, fontSize: 17, color: GOLD, lineHeight: 1.8, marginTop: 12 }}>
          The 16 proposed domain theorems are built on physical constants. Conservation of mass. Radioactive decay rates. The C-F bond energy. The geochemical rate of nodule formation. These are not value judgments. They are measured facts confirmed by independent experimental replication across centuries.
        </div>
        <div style={{ fontFamily: S, fontSize: 18, color: GOLD, lineHeight: 1.8, marginTop: 16, fontWeight: 600, textAlign: "center" }}>
          The C-F bond has never lost an arbitration.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 9 — DECISION ACCOUNTING (DA)
// ═══════════════════════════════════════════════════════════════
const DA_FIELDS = [
  { num: 1, name: "Domain", desc: "The sector, market, or commons under analysis.", example: "PFAS / Forever Chemicals" },
  { num: 2, name: "Party A", desc: "The primary private-gain actor.", example: "Chemical manufacturers (3M, Chemours, Daikin)" },
  { num: 3, name: "Party B", desc: "The secondary actor or counterparty.", example: "Downstream users, municipal water systems, consumers" },
  { num: 4, name: "System C", desc: "The shared system both parties depend on.", example: "Global freshwater supply, human bloodstream, soil biome" },
  { num: 5, name: "Axiom 1 (Overlapping Interests)", desc: "Both parties benefit from cooperation. Is there a deal?", example: "Yes — manufacturers supply, users consume. Bilateral exchange exists." },
  { num: 6, name: "Axiom 2 (System Independence)", desc: "Can W be computed from A's payoff and B's payoff?", example: "No. Knowing revenue and purchase price reveals nothing about groundwater contamination." },
  { num: 7, name: "βW", desc: "Welfare beta — marginal welfare destruction per dollar of private gain. Π = revenue, never profit.", example: "βW = 14.96. Π = $75B. ΔW = $1,122B." },
  { num: 8, name: "Theorem Type", desc: "Impossibility (physical constraint) or Intractability (institutional constraint).", example: "Impossibility — Molecular Persistence Floor. C-F bond energy = 485 kJ/mol." },
  { num: 9, name: "Axiom 3 (System Dependence)", desc: "Does agent activity affect W?", example: "Yes — every kilogram of PFAS produced is permanently additive to environmental stock." },
  { num: 10, name: "Current Outcome", desc: "The 3-bit classification (C,A,B).", example: "(0,1,1) — Hollow Win. Both parties gain. Freshwater system degraded." },
  { num: 11, name: "T*", desc: "Crossover time — when does the Hollow Win collapse?", example: "T* already exceeded in ~300 US water systems. PFAS detected in 97% of Americans." },
  { num: 12, name: "Reform Pathway", desc: "Which axiom can be broken, and how?", example: "Break A3: class-wide production ban eliminates new loading. Cannot break A2 (persistence is physical)." },
  { num: 13, name: "Proven Model", desc: "Has any jurisdiction solved this?", example: "Denmark: banned PFAS in food packaging (2020). EU: proposed universal PFAS restriction (2023)." },
  { num: 14, name: "Conflictoring Tier", desc: "Minimum tier of the six-agent protocol required.", example: "Tier 4 — Supranational. Stockholm Convention amendment required for global ban." },
  { num: 15, name: "Expiry Condition", desc: "What would falsify this theorem?", example: "Economically viable PFAS destruction at scale + class-wide production ban + remediation of existing stock." },
];

function Chapter9New() {
  const [expandedField, setExpandedField] = useState(null);
  return (
    <div id="ch9">
      <ChapterHead num={9} title="Every domain has a forensic record. Here is the template." subtitle="Decision Accounting is a 15-field audit trail applied to each of the 61 SAPM domains. It solves Prat's conformism problem by making the structural diagnosis public, multi-audience, and machine-readable." time="4 min" />

      <P>Standard disclosure fails because it targets a single audience. A company publishes an ESG report for investors. A regulator publishes an enforcement action for the public. A whistleblower files a sealed complaint. Each audience sees one slice. Nobody sees the game.</P>

      <P><Tip term="DA">Decision Accounting</Tip> solves this by requiring all 15 fields to be filled for every domain, published simultaneously, and cross-referenced. Field 7 (<Tip term="βW">βW</Tip>) tells you the welfare cost per dollar. Field 8 tells you whether the constraint is physical or institutional. Field 10 tells you the current outcome classification. Field 14 tells you who needs to act. No single field is sufficient. All 15 together constitute the forensic record.</P>

      <P>Andrea Prat's conformism result (2005) proved that when an expert's reputation depends on being seen to agree with colleagues, the expert suppresses private information. The result is herding — everyone says the same thing, and the informational value of each additional report is zero. DA breaks this by design: the 15 fields are structural facts, not opinions. You cannot conform your way past a βW of 50.99 (Firearms). You cannot herd around a C-F bond energy of 485 kJ/mol.</P>

      {/* DA FIELD TABLE */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>THE 15-FIELD AUDIT TRAIL</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {DA_FIELDS.map((f, i) => (
          <div key={f.num} onClick={() => setExpandedField(expandedField === i ? null : i)} style={{
            padding: "12px 16px", background: [7,8,10,14].includes(f.num) ? "rgba(245,158,11,0.04)" : SURFACE,
            border: `1px solid ${[7,8,10,14].includes(f.num) ? "rgba(245,158,11,0.15)" : BORDER}`,
            borderRadius: 4, cursor: "pointer",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                <span style={{ fontFamily: M, fontSize: 12, color: MUTED, minWidth: 24 }}>F{f.num}</span>
                <span style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: [7,8,10,14].includes(f.num) ? GOLD : TEXT }}>{f.name}</span>
              </div>
              <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{expandedField === i ? "−" : "+"}</span>
            </div>
            <div style={{ fontFamily: S, fontSize: 14, color: DIM, marginTop: 4, marginLeft: 36 }}>{f.desc}</div>
            {expandedField === i && (
              <div style={{ marginTop: 10, marginLeft: 36, padding: "10px 14px", background: "rgba(245,158,11,0.04)", border: `1px solid rgba(245,158,11,0.12)`, borderRadius: 4 }}>
                <Label>PFAS EXAMPLE</Label>
                <div style={{ fontFamily: S, fontSize: 14, color: GOLD, lineHeight: 1.6 }}>{f.example}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MULTI-AUDIENCE PANEL */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>WHY MULTI-AUDIENCE DISCLOSURE WORKS</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ padding: "16px 20px", background: "rgba(239,68,68,0.04)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: RED, letterSpacing: 1, marginBottom: 8 }}>SINGLE-AUDIENCE (FAILS)</div>
          <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.7 }}>
            ESG report targets investors only. Regulator reads a different document. Whistleblower files under seal. Legislator reads neither. Each audience sees a different slice. Nobody sees the structural game. Conformism persists because each channel can be gamed independently.
          </div>
        </div>
        <div style={{ padding: "16px 20px", background: "rgba(34,197,94,0.04)", border: `1px solid rgba(34,197,94,0.15)`, borderRadius: 4 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GREEN, letterSpacing: 1, marginBottom: 8 }}>MULTI-AUDIENCE DA (WORKS)</div>
          <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.7 }}>
            One document. 15 fields. All six conflictoring agents read the same record. βW is the same number whether you are a whistleblower, a regulator, or a sovereign wealth fund. The structural diagnosis cannot be fragmented because it is published as a single atomic unit.
          </div>
        </div>
      </div>

      <GoldCallout>
        The DA record is the forensic layer underneath every SAPM paper. Sixty-one domains, 15 fields each, 915 structural facts — all publicly auditable, all machine-readable, all cross-referenced. This is not disclosure. This is diagnosis.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 10 — THE SIX-AGENT CONFLICTORING PROTOCOL
// ═══════════════════════════════════════════════════════════════
const SIX_AGENTS = [
  { agent: "Whistleblower", tier: 1, role: "Insider with private information about system degradation. Files under federal programs (SEC §21F, CFTC §748, IRS §7623, DOJ Qui Tam).", mechanism: "Breaks information asymmetry. Converts private knowledge of C=0 into public record.", color: GOLD },
  { agent: "Plaintiff", tier: 2, role: "Class action, public nuisance, or regulatory enforcement. Monetizes the welfare cost through litigation.", mechanism: "Forces Π adjustment. Makes the private gain reflect the welfare cost through damages awards.", color: GOLD },
  { agent: "Regulator", tier: 3, role: "Structural separation, mandatory W-monitoring, licensing conditions. Rewrites the rules of the game.", mechanism: "Breaks Axiom 1 (overlapping interests) or Axiom 3 (system dependence) by redesigning the game structure.", color: GOLD },
  { agent: "Legislator", tier: 4, role: "Statutory reform, tax code changes, liability regime redesign. Changes the law that defines the game.", mechanism: "Alters the payoff matrix. Converts Hollow Win equilibria into dominated strategies through legal architecture.", color: GREEN },
  { agent: "Investor", tier: 5, role: "Sovereign wealth funds, pension funds, institutional capital. Divests from high-βW sectors, reprices risk.", mechanism: "Capital allocation signal. High-βW sectors face higher cost of capital, reduced access to financing.", color: GREEN },
  { agent: "Supranational", tier: 6, role: "Treaty organizations, international coordination bodies (Montreal Protocol model, Stockholm Convention, FSB).", mechanism: "Solves the jurisdictional arbitrage problem. No single nation can regulate what treaty coordination can.", color: GREEN },
];

const CASE_STUDIES_AGENTS = [
  { name: "Leaded Gasoline (1921–1996)", agents: 5, timeline: "75 years from first deployment to global phase-out", breakdown: [
    { agent: "Whistleblower", year: "1924–1966", detail: "Clair Patterson (Caltech geochemist) published lead contamination data. Alice Hamilton documented factory poisonings. Both were suppressed by industry." },
    { agent: "Plaintiff", year: "1970s–1990s", detail: "State attorneys general filed public nuisance claims. Individual tort claims established causation." },
    { agent: "Regulator", year: "1970–1996", detail: "EPA set air quality standards (1970 Clean Air Act). Required catalytic converters (incompatible with lead). Phased down lead in gasoline." },
    { agent: "Legislator", year: "1970/1990", detail: "Clean Air Act (1970). Clean Air Act Amendments (1990). Banned leaded gasoline for on-road vehicles." },
    { agent: "Supranational", year: "2021", detail: "UNEP announced global elimination of leaded gasoline. Algeria, the last holdout, banned it in July 2021." },
  ]},
  { name: "Montreal Protocol (1987–present)", agents: 5, timeline: "CFC production dropped 99% within 15 years", breakdown: [
    { agent: "Whistleblower", year: "1974", detail: "Molina and Rowland published CFC-ozone depletion mechanism in Nature. Industry attacked them for a decade." },
    { agent: "Regulator", year: "1978", detail: "US EPA banned CFC aerosol propellants. First unilateral national action." },
    { agent: "Legislator", year: "1978–1987", detail: "US Clean Air Act amendments. EU directives. Created the legislative basis for treaty ratification." },
    { agent: "Investor", year: "1988–present", detail: "DuPont pivoted to HFC alternatives. Capital flowed to substitutes once the regulatory signal was credible." },
    { agent: "Supranational", year: "1987", detail: "Montreal Protocol — 197 nations. The only universally ratified UN treaty. Ozone layer on track for full recovery by 2066." },
  ]},
  { name: "PFAS (in progress)", agents: 3, timeline: "3 of 6 agents active. Supranational coordination not yet achieved.", breakdown: [
    { agent: "Whistleblower", year: "1998–2001", detail: "Rob Bilott (attorney) discovered 3M/DuPont internal documents showing PFAS toxicity concealment. Filed first PFAS lawsuit." },
    { agent: "Plaintiff", year: "2005–present", detail: "$10.3B 3M settlement (2023). $1.19B Chemours settlement. Ongoing water utility class actions across 30+ states." },
    { agent: "Regulator", year: "2024", detail: "EPA set first enforceable PFAS drinking water limits (4 ppt for PFOA/PFOS). EU proposed universal PFAS restriction." },
  ]},
];

function Chapter10() {
  const [expandedCase, setExpandedCase] = useState(null);
  return (
    <div id="ch10">
      <ChapterHead num={10} title="Six agents. One protocol. The only way out of PST at scale." subtitle="Bilateral negotiation fails because it operates in two dimensions. Coase fails because transaction costs are not the binding constraint. Ostrom fails because the commons is not local. The six-agent protocol works because it attacks the game from outside the game." time="5 min" />

      <P>The Conflictoring protocol names six classes of agent, each with a distinct structural role. The key result: for every <Tip term="PST">PST</Tip> domain, there exists a number <Tip term="k*">k*</Tip> less than or equal to 6 such that simultaneous activation of k* agents makes PPT conformism strictly dominated. This is the k* threshold theorem.</P>

      <P>Why six and not fewer? Because bilateral negotiation (k=2) is exactly the structure the Private Pareto Theorem proves is blind. Adding a third party helps only if that party monitors <Tip term="W">W</Tip> independently. Adding a fourth helps only if it can alter the payoff matrix. The six agents are not arbitrary — they correspond to six distinct structural functions that, together, cover every mechanism by which a <Tip term="Hollow Win">Hollow Win</Tip> can persist.</P>

      <P>The deep connection: Prat's conformism theorem (2005) proves that reputation-concerned experts suppress private information and herd. At system scale, this is exactly PPT conformism — every bilateral optimizer conforms to the two-dimensional framework because deviating (monitoring W) is reputationally costly. The six-agent protocol is the mechanism that makes deviation strictly profitable.</P>

      {/* SIX AGENT CARDS */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>THE SIX CONFLICTORING AGENTS</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {SIX_AGENTS.map(a => (
          <div key={a.agent} style={{ padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontFamily: M, fontSize: 14, fontWeight: 600, color: a.color }}>{a.agent.toUpperCase()}</div>
              <span style={{ fontFamily: M, fontSize: 10, padding: "2px 8px", borderRadius: 2, background: "rgba(245,158,11,0.08)", color: MUTED, border: `1px solid ${BORDER}` }}>TIER {a.tier}</span>
            </div>
            <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.6, marginBottom: 8 }}>{a.role}</div>
            <div style={{ fontFamily: M, fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{a.mechanism}</div>
          </div>
        ))}
      </div>

      {/* WHY BILATERAL FAILS */}
      <div style={{ fontFamily: M, fontSize: 12, color: RED, letterSpacing: 1, margin: "32px 0 12px" }}>WHY THE ALTERNATIVES FAIL AT SCALE</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
        {[
          ["COASE", "Transaction costs are not the binding constraint. Even with zero transaction costs, bilateral negotiation cannot detect C=0 because W is outside the payoff space. The Coase theorem assumes the welfare loss is known to both parties. PPT proves it cannot be."],
          ["PIGOU", "A Pigouvian tax requires knowing the externality's value. For PST domains, the externality is the system welfare loss — which cannot be computed from bilateral payoffs. You cannot tax what you cannot measure inside the game."],
          ["OSTROM", "Local observability fails at scale. Ostrom's design principles require that resource conditions are locally observable and that community size is manageable. PFAS contamination in 97% of Americans is not locally observable. Climate forcing is not manageable by a community."],
        ].map(([name, desc]) => (
          <div key={name} style={{ padding: "16px 18px", background: "rgba(239,68,68,0.04)", border: `1px solid rgba(239,68,68,0.12)`, borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: RED, marginBottom: 8 }}>{name}</div>
            <div style={{ fontFamily: S, fontSize: 13, color: DIM, lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* CASE STUDIES */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>THREE CASE STUDIES — HOW MANY AGENTS DOES IT TAKE?</div>
      {CASE_STUDIES_AGENTS.map((cs, ci) => (
        <div key={cs.name} onClick={() => setExpandedCase(expandedCase === ci ? null : ci)} style={{
          padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4,
          marginBottom: 8, cursor: "pointer",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: M, fontSize: 14, fontWeight: 600, color: TEXT }}>{cs.name}</div>
              <div style={{ fontFamily: M, fontSize: 12, color: MUTED, marginTop: 2 }}>{cs.timeline}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: M, fontSize: 13, color: cs.agents >= 5 ? GREEN : GOLD }}>k* = {cs.agents}</span>
              <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{expandedCase === ci ? "−" : "+"}</span>
            </div>
          </div>
          {expandedCase === ci && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
              {cs.breakdown.map(b => (
                <div key={b.agent} style={{ display: "grid", gridTemplateColumns: "120px 70px 1fr", gap: 8, padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}>
                  <span style={{ fontFamily: M, fontSize: 12, color: GOLD }}>{b.agent}</span>
                  <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{b.year}</span>
                  <span style={{ fontFamily: S, fontSize: 13, color: DIM, lineHeight: 1.5 }}>{b.detail}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <GoldCallout>
        Leaded gasoline took 75 years and 5 agents. The Montreal Protocol took 13 years and 5 agents. PFAS has activated 3 agents so far. The k* threshold theorem predicts: no PST domain escapes the Hollow Win until enough agents are simultaneously active. The protocol does not require perfection. It requires coordination.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 11 — THE REFORM DIVIDEND
// ═══════════════════════════════════════════════════════════════
function Chapter11() {
  return (
    <div id="ch11">
      <ChapterHead num={11} title="$86.3 trillion. Every year. That is what the current system costs." subtitle="Frederic Bastiat warned in 1850: 'the seen and the unseen.' GDP records the seen. SAPM measures the unseen. The unseen is larger than the seen." time="4 min" />

      <P>Across 61 SAPM-calibrated domains, the total annual welfare destruction is $86.3 trillion — approximately 81% of global GDP. This number sounds absurd until you decompose it. It is not a single catastrophe. It is the sum of 61 structural games, each producing welfare costs that GDP counts as output.</P>

      <P>The standard objection is immediate: "We cannot afford to reform these industries. The economic disruption would be catastrophic." This objection is precisely backwards. Bastiat's 1850 insight — that the seen (industry revenue) crowds out awareness of the unseen (welfare destruction) — applies at civilizational scale. Reform does not shrink GDP. It grows GDP. The arithmetic is elementary.</P>

      {/* THE BIG NUMBER */}
      <div style={{ padding: "28px", background: "rgba(239,68,68,0.06)", border: `2px solid rgba(239,68,68,0.15)`, borderRadius: 4, margin: "32px 0", textAlign: "center" }}>
        <div style={{ fontFamily: M, fontSize: 48, color: RED, fontWeight: 700 }}>$86.3T / yr</div>
        <div style={{ fontFamily: M, fontSize: 14, color: TEXT, marginTop: 8 }}>Annual welfare destruction — 61 domains, Monte Carlo verified</div>
        <div style={{ fontFamily: S, fontSize: 16, color: DIM, marginTop: 8, fontStyle: "italic" }}>~81% of global GDP. More than the combined GDP of the United States, European Union, and China.</div>
      </div>

      {/* FOUR CHANNEL DECOMPOSITION */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>FOUR-CHANNEL DECOMPOSITION</div>
      <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.7, marginBottom: 16 }}>
        Not all welfare destruction is the same. The $86.3T decomposes into four channels, each with a different relationship to GDP.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 24 }}>
        {[
          ["Value of Statistical Life", "$26.3T", "30.5%", "10–15M preventable deaths per year. Welfare improvement, not a GDP flow. This is the human cost that GDP cannot see.", RED],
          ["Cleanup GDP", "$14.6T", "16.9%", "Healthcare, remediation, enforcement, litigation. Currently counted in GDP. Cancer treatment counts as output. Cleanup counts as output. Reform removes them.", "#F97316"],
          ["Productivity", "$17.8T", "20.7%", "Suppressed output, foregone innovation, distorted markets. Currently missing from GDP. Reform restores them. This is the growth that the current system prevents.", GREEN],
          ["Future", "$27.6T", "31.9%", "Climate, ecosystem, intergenerational damages. Not current-year GDP. The compounding dividend from not destroying the systems future prosperity depends on.", "#60A5FA"],
        ].map(([label, val, pct, desc, col]) => (
          <div key={label} style={{ padding: "14px 16px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 10, color: col, letterSpacing: 1, marginBottom: 6 }}>{label.toUpperCase()}</div>
            <div style={{ fontFamily: M, fontSize: 24, color: col, fontWeight: 700 }}>{val}</div>
            <div style={{ fontFamily: M, fontSize: 11, color: MUTED, margin: "4px 0 10px" }}>{pct} of total</div>
            <div style={{ fontFamily: S, fontSize: 13, color: DIM, lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* THE REFORM FORMULA */}
      <div style={{ fontFamily: M, fontSize: 12, color: GREEN, letterSpacing: 1, margin: "32px 0 12px" }}>THE REFORM ARITHMETIC</div>
      <div style={{ padding: "20px 24px", background: "rgba(34,197,94,0.04)", border: `1px solid rgba(34,197,94,0.2)`, borderRadius: 4, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr", gap: 8, alignItems: "center", fontFamily: M, fontSize: 13, textAlign: "center" }}>
          <div><div style={{ fontSize: 10, color: MUTED, marginBottom: 4 }}>CURRENT GDP</div><div style={{ color: TEXT, fontSize: 22 }}>$107T</div></div>
          <div style={{ color: MUTED, fontSize: 18 }}>−</div>
          <div><div style={{ fontSize: 10, color: "#F97316", marginBottom: 4 }}>CLEANUP REMOVED</div><div style={{ color: "#F97316", fontSize: 22 }}>$14.6T</div></div>
          <div style={{ color: MUTED, fontSize: 18 }}>+</div>
          <div><div style={{ fontSize: 10, color: GREEN, marginBottom: 4 }}>PRODUCTIVITY RESTORED</div><div style={{ color: GREEN, fontSize: 22 }}>$17.8T</div></div>
          <div style={{ color: MUTED, fontSize: 18 }}>=</div>
          <div><div style={{ fontSize: 10, color: GREEN, marginBottom: 4 }}>REFORMED GDP</div><div style={{ color: GREEN, fontSize: 26, fontWeight: 700 }}>$110.2T</div></div>
        </div>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <span style={{ fontFamily: M, fontSize: 14, color: GREEN, fontWeight: 600 }}>+$3.2T net gain</span>
          <span style={{ fontFamily: M, fontSize: 12, color: MUTED, marginLeft: 12 }}>Reform makes GDP larger, not smaller.</span>
        </div>
      </div>

      {/* PREVENTABLE DEATHS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "24px 0" }}>
        <div style={{ padding: "20px", background: "rgba(239,68,68,0.06)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4, textAlign: "center" }}>
          <div style={{ fontFamily: M, fontSize: 36, color: RED, fontWeight: 700 }}>10–15M</div>
          <div style={{ fontFamily: M, fontSize: 13, color: TEXT, marginTop: 4 }}>Preventable deaths per year</div>
          <div style={{ fontFamily: S, fontSize: 14, color: DIM, marginTop: 8, fontStyle: "italic" }}>Across tobacco, air pollution, industrial agriculture, UPF, alcohol, opioids, and occupational exposure. Each death counted by GDP as healthcare revenue.</div>
        </div>
        <div style={{ padding: "20px", background: "rgba(34,197,94,0.06)", border: `1px solid rgba(34,197,94,0.15)`, borderRadius: 4, textAlign: "center" }}>
          <div style={{ fontFamily: M, fontSize: 36, color: GREEN, fontWeight: 700 }}>$27.6T</div>
          <div style={{ fontFamily: M, fontSize: 13, color: TEXT, marginTop: 4 }}>Long-run future dividend</div>
          <div style={{ fontFamily: S, fontSize: 14, color: DIM, marginTop: 8, fontStyle: "italic" }}>The capital value of not destroying the climate, topsoil, aquifers, fisheries, and ecosystems that future prosperity depends on. Not in current GDP. Compounding annually.</div>
        </div>
      </div>

      <GoldCallout>
        "We cannot afford to reform" is the most expensive sentence in the English language. The 61 SAPM domains suppress $17.8 trillion of productive output while forcing $14.6 trillion of defensive spending that GDP counts as growth. Reform produces a net $3.2 trillion GDP gain — before accounting for 10–15 million lives saved and $27.6 trillion in avoided future damages. The seen obscures the unseen. Now the unseen is measured.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 12 — FISCAL CAPTURE
// ═══════════════════════════════════════════════════════════════
const FISCAL_DOMAINS = [
  { domain: "Tobacco", revenue: "$965B", taxShare: "5–15% of excise revenue in many nations", phi: "0.8–1.2", status: "CAPTURED", note: "Governments earn more from tobacco tax than they spend on cessation. The incentive is structural." },
  { domain: "Gambling", revenue: "$45B", taxShare: "State-operated lotteries in 45+ US states", phi: ">1.0", status: "CAPTURED", note: "Most US states are the house. Not just the regulator — the operator. Party B is the government." },
  { domain: "Alcohol", revenue: "$1,600B", taxShare: "Excise duty 3–8% of national tax revenue", phi: "0.6–0.9", status: "PARTIAL", note: "Below φ=1.0 in most jurisdictions but excise revenue creates political resistance to reform." },
  { domain: "Oil & Gas", revenue: "$3,500B", taxShare: "20–90% of government revenue (petrostates)", phi: "0.2–5.0+", status: "CAPTURED (petrostates)", note: "Venezuela φ>5.0. Norway φ=0.22 (GPFG decoupling). The range is the story." },
  { domain: "Opioid Settlements", revenue: "$75B", taxShare: "Settlement funds allocated to state budgets", phi: "N/A", status: "PERVERSE", note: "$50B+ in settlements. States used opioid funds for general budget, not treatment. Fiscal dependency on the settlement itself." },
];

function Chapter12() {
  const [expandedFiscal, setExpandedFiscal] = useState(null);
  return (
    <div id="ch12">
      <ChapterHead num={12} title="Governments are not captured regulators. They are Party B." subtitle="Standard regulatory capture theory says: industry influences the regulator. The reality is worse. In many PST domains, the government's own fiscal interest is structurally aligned with the industry that degrades the system." time="4 min" />

      <P>Regulatory capture — Stigler (1971), Peltzman (1976) — assumes a clean distinction between the regulator and the regulated. The regulator is supposed to serve the public interest but gets co-opted by the industry it oversees. This framing is too generous. It implies the government starts neutral and is corrupted.</P>

      <P>In many <Tip term="PST">PST</Tip> domains, the government is not a captured regulator. It is a structural participant in the game — Party B — whose fiscal survival depends on the industry continuing to operate. The <Tip term="φ">Fiscal Dependency Index</Tip> (φ) measures this directly: when tax revenue from an industry exceeds the political cost of reform, the government has a structural incentive to perpetuate the Hollow Win.</P>

      <P>This is not corruption. This is architecture. A state that collects 15% of its revenue from tobacco excise does not need to be bribed to oppose tobacco reform. The fiscal dependency does the work automatically.</P>

      {/* PHI FORMULA */}
      <div style={{ padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, margin: "24px 0", textAlign: "center" }}>
        <div style={{ fontFamily: M, fontSize: 14, color: GOLD, marginBottom: 12 }}>THE FISCAL DEPENDENCY INDEX</div>
        <div style={{ fontFamily: M, fontSize: 22, color: TEXT }}>
          φ = <span style={{ color: RED }}>Tax Revenue from Industry</span> / <span style={{ color: GREEN }}>Political Cost of Reform</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
          <div style={{ padding: "10px", background: "rgba(34,197,94,0.04)", borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 16, color: GREEN }}>φ {"<"} 0.5</div>
            <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginTop: 4 }}>Reform feasible</div>
          </div>
          <div style={{ padding: "10px", background: "rgba(245,158,11,0.04)", borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 16, color: GOLD }}>0.5 ≤ φ {"<"} 1.0</div>
            <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginTop: 4 }}>Politically difficult</div>
          </div>
          <div style={{ padding: "10px", background: "rgba(239,68,68,0.04)", borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 16, color: RED }}>φ ≥ 1.0</div>
            <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginTop: 4 }}>Government is Party B</div>
          </div>
        </div>
      </div>

      {/* FIVE DOMAINS */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>FIVE EMPIRICAL DOMAINS</div>
      {FISCAL_DOMAINS.map((fd, i) => (
        <div key={fd.domain} onClick={() => setExpandedFiscal(expandedFiscal === i ? null : i)} style={{
          padding: "14px 18px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4,
          marginBottom: 6, cursor: "pointer",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: M, fontSize: 14, fontWeight: 600, color: TEXT }}>{fd.domain}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: M, fontSize: 11, padding: "2px 8px", borderRadius: 2, background: fd.status === "CAPTURED" || fd.status.includes("CAPTURED") ? "rgba(239,68,68,0.08)" : fd.status === "PERVERSE" ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.08)", color: fd.status === "PARTIAL" ? GOLD : RED, border: `1px solid ${fd.status === "PARTIAL" ? "rgba(245,158,11,0.2)" : "rgba(239,68,68,0.2)"}` }}>{fd.status}</span>
              <span style={{ fontFamily: M, fontSize: 13, color: GOLD }}>φ = {fd.phi}</span>
              <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{expandedFiscal === i ? "−" : "+"}</span>
            </div>
          </div>
          {expandedFiscal === i && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${BORDER}` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 10 }}>
                <div><Label>INDUSTRY REVENUE</Label><div style={{ fontFamily: M, fontSize: 13, color: DIM }}>{fd.revenue}</div></div>
                <div><Label>GOVERNMENT TAX SHARE</Label><div style={{ fontFamily: M, fontSize: 13, color: DIM }}>{fd.taxShare}</div></div>
              </div>
              <div style={{ fontFamily: S, fontSize: 14, color: GOLD, fontStyle: "italic", lineHeight: 1.6 }}>{fd.note}</div>
            </div>
          )}
        </div>
      ))}

      {/* NORWAY VS VENEZUELA */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>THE EXISTENCE PROOF AND THE FAILURE MODE</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ padding: "20px", background: "rgba(34,197,94,0.04)", border: `1px solid rgba(34,197,94,0.15)`, borderRadius: 4 }}>
          <div style={{ fontFamily: M, fontSize: 14, fontWeight: 600, color: GREEN, marginBottom: 8 }}>NORWAY — <Tip term="GPFG">GPFG</Tip> (φ = 0.22)</div>
          <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.7 }}>
            Oil revenue flows into the Government Pension Fund Global ($1.7T). The fund invests globally, not domestically. Norwegian fiscal policy is decoupled from oil prices by design. φ = 0.22 because petroleum revenue is 22% of government income — but it is saved, not spent. The spending rule limits withdrawal to 3% of fund value per year.
          </div>
          <div style={{ fontFamily: S, fontSize: 14, color: GREEN, marginTop: 8, fontStyle: "italic" }}>Fiscal decoupling is possible. Norway proved it.</div>
        </div>
        <div style={{ padding: "20px", background: "rgba(239,68,68,0.04)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4 }}>
          <div style={{ fontFamily: M, fontSize: 14, fontWeight: 600, color: RED, marginBottom: 8 }}>VENEZUELA / ANGOLA (φ {">"} 5.0)</div>
          <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.7 }}>
            Petroleum revenue is 90%+ of government income. The state is not captured by the industry — the state is the industry. Reform is structurally impossible because reform means the government ceases to function. Venezuela's collapse (2014–present) is what happens when the industry the government depends on contracts. φ {">"} 5.0 means the government cannot survive reform.
          </div>
          <div style={{ fontFamily: S, fontSize: 14, color: RED, marginTop: 8, fontStyle: "italic" }}>When φ exceeds 5.0, the government and the industry are the same entity.</div>
        </div>
      </div>

      <GoldCallout>
        The fiscal capture insight changes the entire reform calculus. It is not enough to convince the regulator. You must restructure the government's own fiscal dependency on the industry that destroys the system. Norway's GPFG proves it can be done. Venezuela proves what happens when it is not done. The <Tip term="φ">φ index</Tip> makes the structural dependency visible and measurable for the first time.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 13 — THE SUBSTITUTION TRAP
// ═══════════════════════════════════════════════════════════════
const SUBSTITUTION_CASES = [
  { from: "OxyContin", to: "Fentanyl", domain: "Opioids", result: "WORSE", detail: "Purdue's OxyContin reformulation (2010) made tablets crush-resistant. Users switched to heroin, then fentanyl (50–100x more potent). Overdose deaths tripled.", year: "2010–present" },
  { from: "BPA", to: "BPS/BPF", domain: "Plastics", result: "EQUIVALENT", detail: "'BPA-free' products substituted bisphenol S and F. Same endocrine disruption. Same estrogenic activity. Different label. The function (plasticizer) was preserved; the regulation targeted the molecule.", year: "2012–present" },
  { from: "PFOS", to: "GenX", domain: "PFAS", result: "WORSE", detail: "3M phased out PFOS (2002). DuPont replaced it with GenX (C6 chain). GenX is equally persistent, equally toxic, and harder to filter from water. The C-F bond is the problem. Shorter chains do not solve it.", year: "2002–present" },
  { from: "Leaded gasoline", to: "Unleaded gasoline", result: "SUCCESS", domain: "Lead", detail: "The rare success case. Catalytic converters required unleaded fuel. The substitute performed the same function (octane boosting) without the toxin. Blood lead levels dropped 75% within a decade.", year: "1975–1996" },
  { from: "CFCs", to: "HFCs", domain: "Ozone", result: "PARTIAL", detail: "Montreal Protocol eliminated CFCs. Replacement HFCs do not destroy ozone but are potent greenhouse gases (1,000–4,000x CO2). Kigali Amendment (2016) now phases down HFCs. Two treaties required for one problem.", year: "1987–2016" },
  { from: "Coal", to: "Natural gas", domain: "Energy", result: "PARTIAL", detail: "Gas emits ~50% less CO2 per kWh than coal. But methane leakage (2–3% of production) erases much of the climate benefit. The function (dispatchable baseload) persists; the emission profile shifted, did not vanish.", year: "2005–present" },
  { from: "Tobacco", to: "Vaping", domain: "Nicotine", result: "AMBIGUOUS", detail: "E-cigarettes eliminated combustion products but preserved nicotine delivery. Youth vaping epidemic created new addiction pathway. Net public health effect: contested. The addictive function was preserved precisely.", year: "2014–present" },
  { from: "Cash gambling", to: "Online gambling", domain: "Gambling", result: "WORSE", detail: "Online platforms eliminated geographic friction. 24/7 access, algorithmic engagement, no social observation of losses. Problem gambling rates 2–3x higher online. The function (variable-ratio reinforcement) was preserved and amplified.", year: "2018–present" },
];

function Chapter13() {
  const [expandedSub, setExpandedSub] = useState(null);
  return (
    <div id="ch13">
      <ChapterHead num={13} title="Ban the product and the industry produces something worse." subtitle="The Iron Law of Prohibition (Cowen): regulatory pressure on a substance drives the market to more potent, more dangerous substitutes. The escape: regulate the function, not the molecule." time="5 min" />

      <P>Regulate OxyContin and the market produces fentanyl. Ban BPA and the market produces BPS. Phase out PFOS and the market produces GenX. Restrict cash gambling and the market moves online. The pattern is not a coincidence. It is a theorem.</P>

      <P>The formal game: industry leads, government follows. The industry's strategy space includes a substitution set A' — the class of alternative products that perform the same economic function. When regulation targets a specific product (the molecule, the formulation, the delivery mechanism), the industry pivots to A'. The substitution space A' is generically non-empty because regulation targeted the wrong level of abstraction.</P>

      <P>Richard Cowen identified the pattern empirically: Prohibition drove alcohol from beer (4% ABV) to spirits (40% ABV) because spirits had higher value per unit volume for smugglers. The same logic applies to every product-level regulation. Potency concentrates because the regulated attribute is a product feature, not a functional class.</P>

      {/* THE FORMAL STRUCTURE */}
      <div style={{ padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, margin: "24px 0" }}>
        <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, marginBottom: 10 }}>THE FORMAL GAME</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <Label>PRODUCT REGULATION (FAILS)</Label>
            <div style={{ fontFamily: M, fontSize: 13, color: DIM, lineHeight: 1.8, marginTop: 4 }}>
              1. Government bans product P<br/>
              2. Industry identifies substitute P' in A'<br/>
              3. P' performs same function, evades regulation<br/>
              4. P' is often more potent / dangerous<br/>
              5. Cycle repeats
            </div>
          </div>
          <div>
            <Label>FUNCTIONAL REGULATION (WORKS)</Label>
            <div style={{ fontFamily: M, fontSize: 13, color: GREEN, lineHeight: 1.8, marginTop: 4 }}>
              1. Government regulates function F<br/>
              2. ALL products performing F are covered<br/>
              3. Substitution space A' is empty by construction<br/>
              4. Industry must innovate outside F<br/>
              5. Escape achieved
            </div>
          </div>
        </div>
      </div>

      {/* EIGHT CASE STUDIES */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>EIGHT CASE STUDIES</div>
      {SUBSTITUTION_CASES.map((sc, i) => (
        <div key={sc.from} onClick={() => setExpandedSub(expandedSub === i ? null : i)} style={{
          padding: "12px 16px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4,
          marginBottom: 4, cursor: "pointer",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: M, fontSize: 13, color: TEXT }}>{sc.from}</span>
              <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>→</span>
              <span style={{ fontFamily: M, fontSize: 13, color: TEXT }}>{sc.to}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: M, fontSize: 10, padding: "2px 8px", borderRadius: 2,
                background: sc.result === "SUCCESS" ? "rgba(34,197,94,0.08)" : sc.result === "WORSE" ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)",
                color: sc.result === "SUCCESS" ? GREEN : sc.result === "WORSE" ? RED : GOLD,
                border: `1px solid ${sc.result === "SUCCESS" ? "rgba(34,197,94,0.2)" : sc.result === "WORSE" ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)"}`,
              }}>{sc.result}</span>
              <span style={{ fontFamily: M, fontSize: 11, color: MUTED }}>{sc.year}</span>
              <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{expandedSub === i ? "−" : "+"}</span>
            </div>
          </div>
          {expandedSub === i && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${BORDER}` }}>
              <div style={{ fontFamily: M, fontSize: 11, color: GOLD, marginBottom: 6 }}>{sc.domain}</div>
              <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.6 }}>{sc.detail}</div>
            </div>
          )}
        </div>
      ))}

      <P>Of eight cases, one is a clear success (leaded gasoline), two are partial (CFCs, coal-to-gas), and five made the problem worse or equivalent. The success case — leaded gasoline — worked because the catalytic converter enforced a functional constraint: the engine could not physically operate with lead. That is functional regulation by accident.</P>

      <GoldCallout>
        Product regulation asks: "Is this specific molecule harmful?" Functional regulation asks: "Is the economic function this molecule performs generating welfare destruction?" The first question has an infinite number of molecular answers. The second has one regulatory answer. The substitution trap is not a market failure. It is a regulatory design failure — targeting the wrong level of abstraction.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 14 — DISCLOSURE FUTILITY
// ═══════════════════════════════════════════════════════════════
function Chapter14() {
  const [expandedMech, setExpandedMech] = useState(null);
  return (
    <div id="ch14">
      <ChapterHead num={14} title="Mandatory disclosure does not transform Hollow Wins. Governments prefer it because it is ineffective." subtitle="Three formal results — Bernheim-Rangel, Gul-Pesendorfer, Lipnowski-Mathevet — prove that information alone cannot escape PST when agents have temptation preferences or neurochemical dependencies." time="4 min" />

      <P>The policy consensus is: if people knew the truth, they would make better choices. Mandate calorie labels. Require emissions reporting. Force companies to disclose supply chain risks. Information asymmetry is the problem; disclosure is the solution.</P>

      <P>For <Tip term="PST">PST</Tip> domains, this is wrong. Not approximately wrong. Formally wrong. Three independent results prove it.</P>

      {/* THREE FAILURE MECHANISMS */}
      <div style={{ fontFamily: M, fontSize: 12, color: RED, letterSpacing: 1, margin: "32px 0 12px" }}>THREE FAILURE MECHANISMS</div>
      {[
        { id: "BH", title: "NEUROCHEMICAL DEPENDENCY (Bernheim-Rangel 2004)", body: "When an agent's utility function includes an addictive state variable, the agent's response to information is non-monotonic. A tobacco smoker who learns that smoking causes cancer does not quit — the neurochemical dependency dominates the informational signal. Bernheim and Rangel prove that optimal policy in the presence of addiction is not 'more information' but removal of the cue that triggers the addictive state. Disclosure provides the information. The cue remains.", color: RED },
        { id: "GP", title: "TEMPTATION PREFERENCES (Gul-Pesendorfer 2001)", body: "An agent with temptation preferences prefers a restricted menu to a full menu — because the tempting option, once available, exerts utility cost even when resisted. Full disclosure expands the information set without restricting the choice set. The tempted agent now knows the full cost of the Hollow Win and still cannot resist it. Gul-Pesendorfer preferences mean disclosure increases welfare cost: the agent now bears the disutility of knowing plus the disutility of yielding.", color: GOLD },
        { id: "LM", title: "WELFARE-INFERIOR FULL DISCLOSURE (Lipnowski-Mathevet 2018)", body: "Lipnowski and Mathevet prove the sharpest result: full disclosure to a tempted agent is welfare-inferior to optimal partial disclosure. The information designer who reveals everything generates worse outcomes than the designer who strategically withholds. In PST domains, this means mandatory disclosure — the gold standard of regulatory intervention — is formally worse than a well-designed partial disclosure regime. The political economy implication is devastating: governments choose full disclosure precisely because it satisfies the appearance of action while being formally suboptimal.", color: GOLD },
      ].map((m, i) => (
        <div key={m.id} onClick={() => setExpandedMech(expandedMech === i ? null : i)} style={{
          padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4,
          marginBottom: 8, cursor: "pointer",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: m.color }}>{m.title}</div>
            <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{expandedMech === i ? "−" : "+"}</span>
          </div>
          {expandedMech === i && (
            <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.7, marginTop: 12 }}>{m.body}</div>
          )}
        </div>
      ))}

      {/* THE W-INDEPENDENCE PROBLEM */}
      <div style={{ padding: "16px 20px", background: "rgba(239,68,68,0.04)", border: `1px solid rgba(239,68,68,0.12)`, borderRadius: 4, margin: "24px 0" }}>
        <div style={{ fontFamily: M, fontSize: 12, color: RED, letterSpacing: 1, marginBottom: 8 }}>THE FOURTH PROBLEM: W-INDEPENDENCE</div>
        <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>
          Even setting aside neurochemistry and temptation, disclosure fails for a more fundamental reason. The Private Pareto Theorem proves that <Tip term="W">W</Tip> cannot be computed from bilateral payoffs. Disclosing more information about payoffs — revenues, costs, margins, supply chains — provides more data in the wrong dimension. No amount of bilateral information reveals the system welfare state. Disclosure operates inside the payoff space. The problem is outside it.
        </div>
      </div>

      {/* POLITICAL ECONOMY */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "32px 0 12px" }}>THE POLITICAL ECONOMY COROLLARY</div>
      <div style={{ padding: "16px 20px", background: "rgba(245,158,11,0.04)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 4, marginBottom: 24 }}>
        <div style={{ fontFamily: S, fontSize: 15, color: GOLD, lineHeight: 1.7, fontStyle: "italic" }}>
          Governments prefer disclosure because it is ineffective. A disclosure mandate satisfies the appearance of regulatory action. It generates compliance costs that can be pointed to as evidence of seriousness. It does not alter the payoff matrix, does not break any PST axiom, and does not transform the game. This is not an accusation of cynicism. It is a structural prediction: the political equilibrium selects for interventions that are visible but ineffective, because effective interventions (production bans, fiscal restructuring, functional regulation) impose costs on Party B — which is often the government itself.
        </div>
      </div>

      {/* BOUNDARY CONDITIONS — WHEN IT WORKS */}
      <div style={{ fontFamily: M, fontSize: 12, color: GREEN, letterSpacing: 1, margin: "32px 0 12px" }}>BOUNDARY CONDITIONS — WHEN DISCLOSURE CAN WORK</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ padding: "16px 20px", background: "rgba(34,197,94,0.04)", border: `1px solid rgba(34,197,94,0.15)`, borderRadius: 4 }}>
          <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: GREEN, marginBottom: 8 }}>CHILE — OCTAGON WARNING LABELS (2016)</div>
          <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.6 }}>
            Black octagon stop signs on high-sugar, high-sodium, high-calorie products. Sugar-sweetened beverage purchases dropped 23.7% within 18 months. The mechanism: not information but salience. The octagon is a visual cue that triggers disgust, not a data point that triggers calculation. Works because UPF is a temptation good with low neurochemical lock-in (unlike nicotine or opioids).
          </div>
        </div>
        <div style={{ padding: "16px 20px", background: "rgba(34,197,94,0.04)", border: `1px solid rgba(34,197,94,0.15)`, borderRadius: 4 }}>
          <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: GREEN, marginBottom: 8 }}>UK — SUGAR LEVY (2018)</div>
          <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.6 }}>
            The UK Soft Drinks Industry Levy taxed sugar content above 5g/100ml. Industry reformulated before the levy took effect — sugar content dropped 44% across the category. The mechanism: not consumer choice but producer incentive. The levy altered the payoff matrix for manufacturers, not the information set for consumers. This is not disclosure. This is fiscal restructuring disguised as a health measure.
          </div>
        </div>
      </div>

      <GoldCallout>
        Disclosure works at the boundary: products with low neurochemical lock-in, high visual salience, and a reformulation pathway. It fails in the core: addictive substances, persistent pollutants, complex financial instruments. The political preference for disclosure over structural reform is not a mystery. It is a revealed preference for ineffectiveness.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 15 — POSTNIEKS'S LAW
// ═══════════════════════════════════════════════════════════════
function Chapter15() {
  const [expandedObj, setExpandedObj] = useState(null);
  return (
    <div id="ch15">
      <ChapterHead num={15} title="For every Hollow Win, there exists a finite coalition that ends it." subtitle="Postnieks's Law: for every PST domain, there exists k* ≤ 6 such that simultaneous activation of k* conflictoring agents makes PPT conformism strictly dominated. This is not an aspiration. It is a theorem with 39 existence proofs." time="5 min" />

      <P>The <Tip term="k*">k* threshold theorem</Tip> formalizes what the case studies demonstrate. Leaded gasoline required 5 agents over 75 years. The Montreal Protocol required 5 agents over 13 years. Every one of the 39 intractability domains has at least one country that has already activated enough agents to escape the <Tip term="Hollow Win">Hollow Win</Tip>. These are not theoretical claims. They are documented existence proofs.</P>

      <P>The theorem's power is in its universal quantifier: for every PST domain. Not "for some domains." Not "under favorable conditions." For every domain where the three PST axioms hold, there exists a coalition of six or fewer agents whose simultaneous activation makes the Hollow Win equilibrium strictly dominated by a <Tip term="Win-Win-Win">Win-Win-Win</Tip> alternative.</P>

      {/* THE FORMAL STATEMENT */}
      <div style={{ padding: "24px", background: "rgba(245,158,11,0.06)", border: `2px solid rgba(245,158,11,0.2)`, borderRadius: 4, margin: "24px 0" }}>
        <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 2, marginBottom: 12 }}>POSTNIEKS'S LAW — FORMAL STATEMENT</div>
        <div style={{ fontFamily: S, fontSize: 17, color: TEXT, lineHeight: 1.8, fontStyle: "italic" }}>
          For every game G satisfying the three PST axioms (overlapping interests, system independence, system dependence), there exists a coalition K of conflictoring agents with |K| = k* ≤ 6 such that simultaneous activation of all agents in K makes the Hollow Win strategy profile strictly dominated.
        </div>
        <div style={{ fontFamily: M, fontSize: 13, color: DIM, marginTop: 12, lineHeight: 1.7 }}>
          Proof sketch: Each conflictoring agent attacks a distinct structural condition necessary for the Hollow Win to persist. The Whistleblower breaks information asymmetry. The Plaintiff monetizes the welfare cost. The Regulator redesigns the game. The Legislator alters the legal payoff matrix. The Investor reprices capital. The Supranational solves jurisdictional arbitrage. Since the Hollow Win requires all six conditions to hold simultaneously, breaking any sufficient subset eliminates the equilibrium.
        </div>
      </div>

      {/* WHY ALTERNATIVE MECHANISMS FAIL */}
      <div style={{ fontFamily: M, fontSize: 12, color: RED, letterSpacing: 1, margin: "32px 0 12px" }}>WHY VCG AND OSTROM FAIL FOR PST DOMAINS</div>
      {[
        { id: "VCG", title: "VCG MECHANISM DESIGN", body: "The Vickrey-Clarke-Groves mechanism achieves efficient allocation by making each agent pay their externality. Two assumptions break for PST domains: (1) welfare W must be additively separable in agent actions — but PST system properties are emergent, not additive. The ozone layer's health is not the sum of individual CFC contributions. (2) A budget-balanced VCG mechanism requires a residual claimant. In PST domains, there is no residual claimant — the system itself absorbs the cost, and the system is not an agent." },
        { id: "OSTROM_SCALE", title: "THREE OSTROM SCALING FAILURES", body: "Ostrom's design principles work for local commons: fisheries, irrigation, forests where the community can observe the resource, the community is small enough for mutual monitoring, and the resource is a common pool. PST domains violate all three. (1) Local observability: PFAS contamination in 97% of American bloodstreams is not locally observable. Climate forcing is not observable by any community. (2) Community size: global supply chains involve millions of actors across 190 countries. Mutual monitoring is impossible. (3) Common-pool vs. system property: Ostrom's commons are subtractable — one person's use reduces another's. PST system properties (benchmark integrity, atmospheric chemistry, antibiotic efficacy) are not subtractable. They are destroyed by degradation, not depleted by use." },
        { id: "AGGREGATION", title: "THE AGGREGATION OBJECTION", body: "The most common objection to Postnieks's Law: 'You are aggregating across 61 heterogeneous domains. The theorem cannot hold uniformly.' This objection fails because the theorem does not require uniformity of mechanism — it requires uniformity of structure. Every PST domain, by definition, satisfies the same three axioms. The six agents attack those axioms, not the domain-specific content. A whistleblower in PFAS contamination and a whistleblower in FX benchmark manipulation perform the same structural function (breaking information asymmetry about C=0) even though the domains are completely different." },
      ].map((obj, i) => (
        <div key={obj.id} onClick={() => setExpandedObj(expandedObj === i ? null : i)} style={{
          padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4,
          marginBottom: 8, cursor: "pointer",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: TEXT }}>{obj.title}</div>
            <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{expandedObj === i ? "−" : "+"}</span>
          </div>
          {expandedObj === i && (
            <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.7, marginTop: 12 }}>{obj.body}</div>
          )}
        </div>
      ))}

      {/* CROSS-DOMAIN EVIDENCE */}
      <div style={{ fontFamily: M, fontSize: 12, color: GREEN, letterSpacing: 1, margin: "32px 0 12px" }}>CROSS-DOMAIN EVIDENCE — 39 INTRACTABILITY DOMAINS</div>
      <div style={{ padding: "16px 20px", background: "rgba(34,197,94,0.04)", border: `1px solid rgba(34,197,94,0.15)`, borderRadius: 4, marginBottom: 24 }}>
        <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7, marginBottom: 12 }}>
          Every one of the 39 intractability theorems has at least one jurisdiction that has activated enough conflictoring agents to escape the Hollow Win. This is the empirical foundation of Postnieks's Law — not a theoretical prediction, but 39 documented existence proofs.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            ["Firearms", "Australia — National Firearms Agreement (1996). Buyback + ban. Gun homicides dropped 59%."],
            ["Child Labor", "Brazil — Bolsa Familia conditional cash transfers. Child labor dropped 65% (2000–2015)."],
            ["Payday Lending", "EU/Japan — Interest rate caps (EU Consumer Credit Directive). Payday industry structurally eliminated."],
            ["Private Prisons", "Most democracies — No private prison industry. US and Australia are outliers."],
            ["Gambling", "Norway — State monopoly (Norsk Tipping) with mandatory loss limits. Problem gambling rate 0.6% vs US 2.6%."],
            ["Gig Economy", "Spain — Riders' Law (2021). Platform workers classified as employees by default."],
          ].map(([domain, model]) => (
            <div key={domain} style={{ padding: "10px 14px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
              <div style={{ fontFamily: M, fontSize: 12, color: GOLD, marginBottom: 4 }}>{domain}</div>
              <div style={{ fontFamily: S, fontSize: 13, color: DIM, lineHeight: 1.5 }}>{model}</div>
            </div>
          ))}
        </div>
      </div>

      <GoldCallout>
        Postnieks's Law is not optimism. It is arithmetic. If the Hollow Win requires all six structural conditions to hold simultaneously, then breaking any sufficient subset eliminates it. The 39 intractability existence proofs are not anecdotes. They are the empirical content of the theorem. The question is not whether escape is possible. The question is why most jurisdictions have not done what the successful ones already proved works.
      </GoldCallout>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHAPTER 16 — DATA & METHODOLOGY NOTES
// ═══════════════════════════════════════════════════════════════

// All 61 SAPM domains: [domain, scope, Pi ($B), βW, ΔW ($B), source, notes]
// scope: "Global" = ΔW allocated against global GDP; "US" = US-specific, deducted from US GDP only
// Pi = annual industry revenue (Iron Law: never profit)
// ΔW = βW × Pi (Monte Carlo verified or paper-derived)
// Source: "Monte Carlo" = Monte Carlo simulation in paper; "Paper" = derived from paper text (Field 7 extraction overridden); "Field 7" = Document Analysis Field 7
const NOTES_DOMAINS = [
  ["Alcohol",                       "Global", 85,    24.96,  2121.4, "Monte Carlo",    ""],
  ["Algorithmic Pricing",           "Global", 40,    5.38,   215.2,  "Monte Carlo",    ""],
  ["AMR (Antimicrobial Resistance)","Global", 42,    2.12,   89.0,   "Monte Carlo",    ""],
  ["Arms Exports",                  "Global", 29.6,  2.54,   75,     "Monte Carlo",    ""],
  ["Aviation Emissions",            "Global", 100,   4.97,   497.5,  "Monte Carlo",    ""],
  ["Bitcoin / Proof-of-Work",       "Global", 42,    5.00,   210,    "Monte Carlo",    ""],
  ["Cement & Concrete",             "Global", 3,     6.74,   22,     "Monte Carlo",    ""],
  ["Child Labor",                   "Global", 39.5,  21.83,  862.2,  "Monte Carlo",    ""],
  ["Coal",                          "Global", 990,   6.95,   6884,   "Monte Carlo",    ""],
  ["Commercial Real Estate",        "Global", 13,    7.78,   101.1,  "Monte Carlo",    ""],
  ["Conflict Minerals",             "Global", 20.3,  12.60,  255.7,  "Monte Carlo",    ""],
  ["Credit Rating Agencies",        "Global", 11,    11.21,  123.3,  "Monte Carlo",    ""],
  ["Cybercrime & Ransomware",       "Global", 1000,  6.22,   6403.1, "Monte Carlo",    ""],
  ["Data Brokerage",                "Global", 323,   6.13,   1979.5, "Monte Carlo",    ""],
  ["Deep-Sea Mining",               "Global", 5,     6.90,   34,     "Monte Carlo",    ""],
  ["Defense Procurement",           "Global", 33.7,  4.88,   164.4,  "Monte Carlo",    ""],
  ["Deforestation & Logging",       "Global", 120,   7.21,   865.5,  "Monte Carlo",    ""],
  ["E-Waste Export",                "Global", 1050,  6.59,   6922.2, "Monte Carlo",    "Π = total global electronics revenue generating e-waste streams"],
  ["Factory Farming",               "Global", 2700,  1.02,   2763.7, "Monte Carlo",   ""],
  ["Fast Fashion",                  "Global", 55,    7.01,   385.4,  "Monte Carlo",    ""],
  ["Firearms",                      "Global", 10,    50.99,  509.9,  "Monte Carlo",    ""],
  ["Fisheries & Coral",             "Global", 38,    4.70,   178.6,  "Monte Carlo",    ""],
  ["Frontier AI",                   "Global", 30,    7.51,   225,    "Monte Carlo",    ""],
  ["Gambling & Casinos",            "Global", 45,    7.30,   328.5,  "Monte Carlo",    ""],
  ["Gene Drives",                   "Global", 3.0,   12.65,  37.9,   "Monte Carlo",    ""],
  ["Gig Economy",                   "Global", 45,    0.76,   34.4,   "Monte Carlo",    "Troublesome (βW<1.0)"],
  ["Groundwater (Ogallala)",        "US",     null,  3.46,   32.9,   "Monte Carlo",    "US-specific aquifer. Π not extracted (ΔW from Monte Carlo direct)."],
  ["Human Trafficking",             "Global", 236,   22.62,  5338.1, "Monte Carlo",    ""],
  ["Illicit Drug Trade",            "Global", 500,   7.16,   3579.1, "Monte Carlo",   ""],
  ["Industrial Agriculture",        "Global", 205,   7.36,   1510,   "Monte Carlo",    ""],
  ["Insurance & Climate Risk",      "Global", 90,    4.57,   411.1,  "Monte Carlo",    ""],
  ["FX Fixing",                     "Global", 28.4,  7.18,   204.0,  "Paper",          "Π=$28.4B paper §4 calibration (range $22-35B). MC config had wrong Π=$40B. Paper βW=7.18."],
  ["Mining & Rare Earth",           "Global", 150,   11.15,  322,    "Monte Carlo",    ""],
  ["Monoculture / Crop Diversity",  "Global", 340,   7.36,   2503,   "Monte Carlo",   ""],
  ["Nuclear Power",                 "Global", 150,   2.94,   80,     "Monte Carlo",    ""],
  ["Oil & Gas",                     "Global", 3500,  1.63,   5694.6, "Monte Carlo",    ""],
  ["Opioid Ecosystem",              "Global", 75,    14.96,  1121.9, "Monte Carlo",    "Predominantly US crisis; classified Global given Canada/UK/Australia opioid epidemics."],
  ["Orbital Debris",                "Global", 2.2,   2.18,   4.8,    "Monte Carlo",    "βW corrected by MC plausibility audit (IL#28): Kessler cascade annual expected value, not catastrophic tail. CI [1.5, 2.9]."],
  ["Palm Oil",                      "Global", 68,    6.30,   428.3,  "Monte Carlo",    ""],
  ["Payday Lending",                "US",     44,    7.08,   311.7,  "Monte Carlo",    "US-centric industry structure"],
  ["PE in Healthcare",              "US",     31,    5.24,   162.4,  "Monte Carlo",    "Predominantly US. UK/AUS have some PE in healthcare but ΔW calibrated to US."],
  ["PFAS / Forever Chemicals",      "Global", 186.7, 5.31,   6574,   "Paper", ""],
  ["Pharmacy Benefit Management",   "US",     60,    6.35,   381,    "Monte Carlo",    "US health system architecture"],
  ["Platform Monopoly",             "Global", 158,   6.33,   999.4,  "Monte Carlo",    ""],
  ["Plastics",                      "Global", 650,   6.67,   3683,   "Monte Carlo",    ""],
  ["POPs Beyond PFAS",              "Global", 70,    6.23,   435.8,  "Monte Carlo",    ""],
  ["Private Military Contractors",  "Global", 260,   2.06,   536.3,  "Monte Carlo",    ""],
  ["Private Prisons",               "US",     8,     12.08,  96.7,   "Monte Carlo",    "US-centric industry"],
  ["Proof-of-Stake / Altcoins",     "Global", 12,    3.14,   37.7,   "Field 7",   ""],
  ["Shipping & Maritime",           "Global", 969,   1.34,   1296,   "Monte Carlo",    ""],
  ["Social Media / Youth MH",       "Global", 68,    5.79,   393.5,  "Monte Carlo",    ""],
  ["Sovereign Debt",                "Global", 35,    4.67,   163.5,  "Monte Carlo",    ""],
  ["Stablecoins / Shadow Banking",  "Global", 56,    2.53,   141.7,  "Monte Carlo",    ""],
  ["Student Loan Securitization",   "US",     46.8,  6.36,   297.6,  "Monte Carlo",    "US federal student loan architecture"],
  ["Tax Havens",                    "Global", 492,   6.27,   3084.7, "Monte Carlo",    ""],
  ["Tobacco",                       "Global", 965,   6.50,   6276,   "Monte Carlo",    "Π=$965B global revenue. βW confirmed. ΔW=$6,276B (6 channels: Value of Statistical Life mortality $4,500B, healthcare $422B, productivity $446B, secondhand smoke $315B, environment $40B, governance capture $150B). CI [4.5, 9.6]."],
  ["Topsoil Erosion",               "Global", 255,   4.41,   1123,   "Monte Carlo",    ""],
  ["Ultra-Processed Food",          "Global", 450,   4.06,   1829,   "Monte Carlo",   ""],
  ["Water Privatization",           "Global", 246,   5.61,   1380.8, "Monte Carlo",    ""],
  ["WMD Proliferation",             "Global", 86.4,  21.92,  1894,   "Monte Carlo",    ""],
];

const GLOBAL_DW_B = NOTES_DOMAINS.filter(d => d[1]==="Global").reduce((s,d) => s+d[4], 0);
const US_SPECIFIC_DW_B = NOTES_DOMAINS.filter(d => d[1]==="US").reduce((s,d) => s+d[4], 0);
const GLOBAL_GDP_B = 107000;
const US_GDP_B = 29200;
const US_SHARE = 0.273; // US = ~27.3% of global GDP (World Bank 2025)
const US_BURDEN_B = GLOBAL_DW_B * US_SHARE + US_SPECIFIC_DW_B;

// ── REFORMED GDP — computed from 61-domain channel decomposition ──────────────
// Method: classify each domain's ΔW into 4 buckets (paper-extracted proportions):
//   VSL (mortality/welfare, not GDP flow): $26.33T
//   cleanup_gdp (defensive spending in GDP, removed by reform): $14.59T
//   productivity (suppressed output, restored by reform): $17.82T
//   future (long-run avoided damages, not current-year GDP): $27.55T
// Formula: Reformed GDP = Current GDP − cleanup_gdp + productivity
// Source: 61-domain channel extraction (agents + paper analysis), April 2026
const REFORMED_VSL_B     = 26330;  // welfare improvement, not GDP
const REFORMED_CLEANUP_B = 14590;  // currently in GDP, removed by reform
const REFORMED_PROD_B    = 17820;  // currently suppressed, restored by reform
const REFORMED_FUTURE_B  = 27550;  // long-run future GDP dividend
const REFORMED_GDP_B     = GLOBAL_GDP_B - REFORMED_CLEANUP_B + REFORMED_PROD_B; // 110,230
const US_REFORMED_GDP_B  = 30440; // US Reformed GDP ($29.2T → $30.4T, +4.2%)

function Chapter16() {
  const [sortCol, setSortCol] = useState(4); // default sort by ΔW desc
  const [sortDir, setSortDir] = useState(-1);
  const sorted = [...NOTES_DOMAINS].sort((a, b) => {
    const av = a[sortCol], bv = b[sortCol];
    if (typeof av === "string") return sortDir * av.localeCompare(bv);
    return sortDir * ((av ?? -Infinity) - (bv ?? -Infinity));
  });
  const toggle = col => { if (sortCol===col) setSortDir(d => -d); else { setSortCol(col); setSortDir(-1); }};

  const globalCadj = GLOBAL_GDP_B - GLOBAL_DW_B;
  const usCadj = US_GDP_B - US_BURDEN_B;

  return (
    <div id="ch16">
      <ChapterHead num={16} title="Data & Methodology Notes" subtitle="Complete domain-level data, computation chain, scope classifications, and source discrepancies. All figures are auditable." time="reference" />

      {/* COMPUTATION CHAIN */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "0 0 12px" }}>COMPUTATION CHAIN</div>
      <div style={{ padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, fontFamily: M, fontSize: 12, color: DIM, lineHeight: 2, marginBottom: 24 }}>
        <div>βW = −dW/dΠ &nbsp;·&nbsp; ΔW = βW × Π &nbsp;·&nbsp; c-adjusted GDP = Nominal GDP − ΣΔW</div>
        <div style={{ color: MUTED, fontSize: 11, marginTop: 4 }}>Π = annual industry revenue (never profit — Iron Law). ΔW = annual welfare destruction in same-year dollars.</div>
        <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            ["Global ΔW", `$${(GLOBAL_DW_B/1000).toFixed(1)}T`, `${(GLOBAL_DW_B/GLOBAL_GDP_B*100).toFixed(1)}% of $107T GDP`],
            ["US-specific ΔW", `$${(US_SPECIFIC_DW_B/1000).toFixed(2)}T`, "6 US-centric sectors"],
            ["US total burden", `$${(US_BURDEN_B/1000).toFixed(1)}T`, `27.3% of global + US-specific`],
          ].map(([k,v,n]) => (
            <div key={k} style={{ padding: "10px 14px", background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.12)", borderRadius: 4 }}>
              <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1 }}>{k}</div>
              <div style={{ fontSize: 18, color: RED, fontWeight: 600, margin: "2px 0" }}>{v}</div>
              <div style={{ fontSize: 10, color: MUTED }}>{n}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            ["Global c-adjusted GDP", `$${(globalCadj/1000).toFixed(1)}T`, `$107T − $${(GLOBAL_DW_B/1000).toFixed(1)}T`],
            ["US c-adjusted GDP",     `$${(usCadj/1000).toFixed(1)}T`,     `$29.2T − $${(US_BURDEN_B/1000).toFixed(1)}T`],
          ].map(([k,v,n]) => (
            <div key={k} style={{ padding: "10px 14px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 4 }}>
              <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1 }}>{k}</div>
              <div style={{ fontSize: 22, color: RED, fontWeight: 600, margin: "2px 0" }}>{v}</div>
              <div style={{ fontSize: 10, color: MUTED }}>{n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* REFORMED GDP */}
      <div style={{ fontFamily: M, fontSize: 12, color: GREEN, letterSpacing: 1, margin: "32px 0 12px" }}>REFORMED GDP — THE MOST INTERESTING NUMBER IN ECONOMICS</div>
      <div style={{ padding: "20px 24px", background: "rgba(34,197,94,0.04)", border: `1px solid rgba(34,197,94,0.2)`, borderRadius: 4, marginBottom: 24 }}>
        <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.8, marginBottom: 20 }}>
          What would global GDP be if all 61 SAPM domains were reformed? This requires decomposing each domain's ΔW
          into four buckets, classified from paper-level channel data across all 61 domains.
          The result overturns the standard objection to reform.
        </div>

        {/* Channel decomposition */}
        <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 2, marginBottom: 10 }}>ΔW CHANNEL DECOMPOSITION — $86.3T TOTAL</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
          {[
            ["Value of Statistical Life", REFORMED_VSL_B, "30.5%", "Mortality & morbidity.  Welfare improvement — not a GDP flow.", RED],
            ["Cleanup GDP", REFORMED_CLEANUP_B, "16.9%", "Healthcare, remediation, enforcement, litigation. Currently counted in GDP. Reform removes them — GDP shrinks but welfare improves.", "#F97316"],
            ["Productivity", REFORMED_PROD_B, "20.7%", "Suppressed output, foregone innovation, market distortion. Currently excluded from GDP. Reform restores them — GDP expands.", GREEN],
            ["Future", REFORMED_FUTURE_B, "31.9%", "Climate, ecosystem, intergenerational, long-run damages. Not current-year GDP. Reform creates a long-run GDP dividend.", "#60A5FA"],
          ].map(([label, val, pct, desc, col]) => (
            <div key={label} style={{ padding: "12px 14px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
              <div style={{ fontSize: 9, color: col, letterSpacing: 1, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 20, color: col, fontWeight: 700 }}>${(val/1000).toFixed(1)}T</div>
              <div style={{ fontSize: 10, color: MUTED, margin: "2px 0 8px" }}>{pct} of ΔW</div>
              <div style={{ fontSize: 11, color: MUTED, fontFamily: S, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Formula */}
        <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 2, marginBottom: 10 }}>REFORMED GDP FORMULA</div>
        <div style={{ padding: "16px 20px", background: SURFACE, border: `1px solid rgba(34,197,94,0.25)`, borderRadius: 4, marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr", gap: 8, alignItems: "center", fontFamily: M, fontSize: 13, textAlign: "center" }}>
            <div><div style={{ fontSize: 10, color: MUTED, marginBottom: 4 }}>CURRENT GDP</div><div style={{ color: TEXT, fontSize: 20 }}>${(GLOBAL_GDP_B/1000).toFixed(0)}T</div></div>
            <div style={{ color: MUTED }}>−</div>
            <div><div style={{ fontSize: 10, color: "#F97316", marginBottom: 4 }}>CLEANUP REMOVED</div><div style={{ color: "#F97316", fontSize: 20 }}>${(REFORMED_CLEANUP_B/1000).toFixed(1)}T</div></div>
            <div style={{ color: MUTED }}>+</div>
            <div><div style={{ fontSize: 10, color: GREEN, marginBottom: 4 }}>PRODUCTIVITY RESTORED</div><div style={{ color: GREEN, fontSize: 20 }}>${(REFORMED_PROD_B/1000).toFixed(1)}T</div></div>
            <div style={{ color: MUTED }}>=</div>
            <div><div style={{ fontSize: 10, color: GREEN, marginBottom: 4 }}>REFORMED GDP</div><div style={{ color: GREEN, fontSize: 24, fontWeight: 700 }}>${(REFORMED_GDP_B/1000).toFixed(1)}T</div></div>
          </div>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ padding: "10px 14px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 4, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1 }}>GLOBAL REFORMED GDP</div>
              <div style={{ fontSize: 22, color: GREEN, fontWeight: 700, margin: "4px 0" }}>${(REFORMED_GDP_B/1000).toFixed(1)}T <span style={{ fontSize: 14, color: GREEN }}>+3.0%</span></div>
              <div style={{ fontSize: 11, color: MUTED }}>vs. current $107.0T</div>
            </div>
            <div style={{ padding: "10px 14px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 4, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1 }}>US REFORMED GDP</div>
              <div style={{ fontSize: 22, color: GREEN, fontWeight: 700, margin: "4px 0" }}>${(US_REFORMED_GDP_B/1000).toFixed(1)}T <span style={{ fontSize: 14, color: GREEN }}>+4.2%</span></div>
              <div style={{ fontSize: 11, color: MUTED }}>vs. current $29.2T</div>
            </div>
          </div>
        </div>

        {/* Future dividend box */}
        <div style={{ padding: "14px 18px", background: "rgba(96,165,250,0.04)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 4, marginBottom: 16 }}>
          <div style={{ fontFamily: M, fontSize: 10, color: "#60A5FA", letterSpacing: 1, marginBottom: 6 }}>LONG-RUN FUTURE DIVIDEND (NOT IN REFORMED GDP BASELINE)</div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ fontSize: 28, color: "#60A5FA", fontWeight: 700 }}>${(REFORMED_FUTURE_B/1000).toFixed(1)}T</div>
            <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.6 }}>
              Additional avoided damages from climate, ecosystem, and intergenerational channels.
              These are not current-year GDP flows but represent the compounding long-run dividend
              from reform — the capital value of avoided planetary-scale damage.
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div style={{ padding: "14px 18px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.25)`, borderRadius: 4 }}>
          <div style={{ fontFamily: M, fontSize: 10, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>KEY INSIGHT — THE STANDARD OBJECTION INVERTS THE TRUTH</div>
          <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.7 }}>
            Reform makes GDP <em>larger</em>, not smaller. The 61 SAPM domains currently suppress $17.8T of productive
            output while forcing $14.6T of defensive spending (healthcare, cleanup, enforcement) that counts as GDP
            without creating value. The net effect of reform is +$3.2T in current-year GDP — before accounting
            for the $27.6T long-run future dividend. "We can't afford to reform" is precisely backwards:
            we cannot afford <em>not</em> to.
          </div>
          <div style={{ fontFamily: M, fontSize: 10, color: MUTED, marginTop: 10 }}>
            Caveat: Channel proportions for 15 domains (top ΔW contributors) are estimated from partial paper data;
            46 are paper-extracted. Proportions are conservative — e.g., tobacco Value of Statistical Life classified as welfare (not productivity),
            which understates the productivity gain from reform.
          </div>
        </div>
      </div>

      {/* KEY ASSUMPTIONS */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "24px 0 12px" }}>KEY ASSUMPTIONS & LIMITATIONS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {[
          ["Geographic allocation", "Global-scope ΔW is allocated to regions by nominal GDP share. US = 27.3% (World Bank 2025). This is an approximation — actual exposure varies by sector."],
          ["No double-counting adjustment", "The 61 domains are treated as independent. Some overlap exists (e.g., coal damage and climate insurance claims; plastics and e-waste). No deduction applied. Full-scope figures are therefore an upper bound."],
          ["Flow vs. stock", "All ΔW figures are annual flow costs ($/yr). Cumulative stock damages (e.g., PFAS body burden, topsoil deficit) are not included in the annual figure."],
          ["GDP vintage", "Global GDP: $107T (IMF WEO April 2025). US GDP: $29.2T (BEA 2025 estimate)."],
          ["βW sources", "All values verified via Monte Carlo simulation (N=100,000, seed=42). A small number of domains use values derived directly from paper text where Monte Carlo is not yet available."],
          ["US-specific classification", "6 domains classified US-only: Payday Lending, Private Prisons, Student Loans, Pharmacy Benefit Management, PE Healthcare, Ogallala Groundwater. Their ΔW deducts from US GDP only, not global."],
        ].map(([k,v]) => (
          <div key={k} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 12, padding: "10px 14px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 11, color: GOLD }}>{k}</div>
            <div style={{ fontFamily: S, fontSize: 14, color: DIM }}>{v}</div>
          </div>
        ))}
      </div>


      {/* FULL DOMAIN TABLE */}
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, margin: "0 0 12px" }}>FULL DOMAIN TABLE — {NOTES_DOMAINS.length} DOMAINS</div>
      <div style={{ fontFamily: S, fontSize: 13, color: MUTED, marginBottom: 12 }}>Click column headers to sort. ΔW = βW × Π. All figures annual ($/yr).</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: M, fontSize: 11 }}>
          <thead>
            <tr>
              {[["Domain",0],["Scope",1],["Π ($B)",2],["βW",3],["ΔW ($B)",4],["Notes",6]].map(([h,col]) => (
                <th key={h} onClick={() => toggle(col)} style={{ fontSize: 9, color: col===sortCol ? GOLD : MUTED, letterSpacing: 2, padding: "8px 10px", textAlign: col>=2&&col<=4 ? "right" : "left", borderBottom: `1px solid ${BORDER}`, whiteSpace: "nowrap", cursor: "pointer" }}>
                  {h}{col===sortCol ? (sortDir>0?"↑":"↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(([domain, scope, pi, bw, dw, src, notes], i) => (
              <tr key={domain} style={{ background: i%2===0 ? "rgba(255,255,255,0.01)" : "transparent" }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(245,158,11,0.04)"}
                onMouseLeave={e => e.currentTarget.style.background=i%2===0?"rgba(255,255,255,0.01)":"transparent"}>
                <td style={{ padding:"6px 10px", color: TEXT, fontWeight: 500 }}>{domain}</td>
                <td style={{ padding:"6px 10px" }}>
                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 2, letterSpacing: 1, background: scope==="US" ? "rgba(96,165,250,0.1)" : "rgba(34,197,94,0.08)", color: scope==="US" ? "#60A5FA" : GREEN, border: scope==="US" ? "1px solid rgba(96,165,250,0.2)" : "1px solid rgba(34,197,94,0.2)" }}>{scope}</span>
                </td>
                <td style={{ padding:"6px 10px", color: MUTED, textAlign:"right" }}>{pi ? `$${pi.toLocaleString()}` : "—"}</td>
                <td style={{ padding:"6px 10px", color: bw>=20?RED:bw>=7?GOLD:DIM, textAlign:"right", fontWeight:600 }}>{bw.toFixed(2)}</td>
                <td style={{ padding:"6px 10px", color: dw>=5000?RED:dw>=1000?GOLD:DIM, textAlign:"right", fontWeight: dw>=1000?600:400 }}>{dw>=1000?`$${(dw/1000).toFixed(2)}T`:`$${dw.toFixed(1)}B`}</td>
                <td style={{ padding:"6px 10px", color: MUTED, fontSize: 13, fontFamily: S }}>{notes || ""}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: `2px solid ${BORDER}` }}>
              <td colSpan={2} style={{ padding:"10px", fontFamily:M, fontSize:11, color:GOLD }}>TOTALS</td>
              <td style={{ padding:"10px", textAlign:"right", color:MUTED, fontSize:11 }}>—</td>
              <td style={{ padding:"10px", textAlign:"right", color:MUTED, fontSize:11 }}>—</td>
              <td style={{ padding:"10px", textAlign:"right", color:RED, fontWeight:600, fontSize:13 }}>${(GLOBAL_DW_B/1000).toFixed(1)}T global + ${(US_SPECIFIC_DW_B/1000).toFixed(2)}T US-only</td>
              <td style={{ padding:"10px", color:MUTED, fontSize:12 }}>Global scope deducted from $107T. US-only deducted from $29.2T.</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div style={{ marginTop: 12, padding: "10px 14px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, fontFamily: S, fontSize: 13, color: MUTED }}>
        All βW values verified via Monte Carlo simulation (N=100,000, seed=42) unless noted. Source: published SAPM working papers, 2025–2026. βW = ΔW ÷ Π where Π = annual industry revenue.
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN CURRICULUM COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function Curriculum({ onDeepDive, onTables }) {
  const [activeChapter, setActiveChapter] = useState(1);
  const chapterRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = parseInt(entry.target.id.replace("ch", ""));
          if (id) setActiveChapter(id);
        }
      });
    }, { threshold: 0.3 });

    for (let i = 1; i <= 16; i++) {
      const el = document.getElementById(`ch${i}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
      {/* Sidebar nav — desktop */}
      <nav style={{
        width: 220, position: "sticky", top: 0, height: "100vh", overflowY: "auto",
        borderRight: `1px solid ${BORDER}`, padding: "24px 16px", flexShrink: 0,
        display: "flex", flexDirection: "column", gap: 2,
      }}>
        <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 2, marginBottom: 16 }}>CURRICULUM</div>
        {CHAPTERS.map(ch => (
          <a key={ch.id} href={`#ch${ch.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(`ch${ch.id}`)?.scrollIntoView({ behavior: "smooth" }); }} style={{
            display: "block", padding: "8px 10px", borderRadius: 4, textDecoration: "none",
            background: activeChapter === ch.id ? "rgba(245,158,11,0.08)" : "transparent",
            borderLeft: activeChapter === ch.id ? `3px solid ${GOLD}` : "3px solid transparent",
          }}>
            <div style={{ fontFamily: M, fontSize: 12, color: activeChapter === ch.id ? GOLD : MUTED }}>{ch.id}. {ch.title}</div>
            <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginTop: 2 }}>{ch.time}</div>
          </a>
        ))}
        <div style={{ marginTop: "auto", paddingTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginBottom: 4 }}>TOTAL: ~56 MIN</div>
          {onDeepDive && (
            <button onClick={onDeepDive} style={{ fontFamily: M, fontSize: 12, color: GOLD, background: "rgba(245,158,11,0.08)", border: `1px solid rgba(245,158,11,0.15)`, padding: "8px 12px", borderRadius: 4, cursor: "pointer", width: "100%", textAlign: "left" }}>
              DEEP DIVE →
            </button>
          )}
          {onTables && (
            <button onClick={onTables} style={{ fontFamily: M, fontSize: 12, color: GOLD, background: "rgba(245,158,11,0.05)", border: `1px solid rgba(245,158,11,0.12)`, padding: "8px 12px", borderRadius: 4, cursor: "pointer", width: "100%", textAlign: "left" }}>
              MASTER TABLES →
            </button>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, maxWidth: 800, padding: "0 32px 80px", margin: "0 auto" }}>
        <Chapter1 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter2 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter3 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter4 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter5 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter6 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter7 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter8 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter9New />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter10 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter11 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter12 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter13 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter14 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter15 />
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "48px 0" }} />
        <Chapter16 />

        {/* DEEP DIVE DIVIDER */}
        <div style={{ borderTop: `2px solid ${GOLD}`, margin: "64px 0 32px", paddingTop: 24, textAlign: "center" }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3 }}>DEEP DIVE — FOR RESEARCHERS AND PRACTITIONERS</div>
          <div style={{ fontFamily: S, fontSize: 15, color: MUTED, marginTop: 8 }}>Interactive timeline, domain theorems, β<sub>W</sub> rankings, T* explorer, case comparison, Conflictoring walkthrough</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
            {onDeepDive && (
              <button onClick={onDeepDive} style={{ fontFamily: M, fontSize: 13, padding: "10px 24px", background: "rgba(245,158,11,0.1)", border: `1px solid rgba(245,158,11,0.3)`, color: GOLD, borderRadius: 4, cursor: "pointer" }}>
                ENTER DEEP DIVE →
              </button>
            )}
            {onTables && (
              <button onClick={onTables} style={{ fontFamily: M, fontSize: 13, padding: "10px 24px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.2)`, color: GOLD, borderRadius: 4, cursor: "pointer" }}>
                SAPM MASTER TABLES →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
