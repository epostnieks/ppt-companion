import { useState, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer, Cell, CartesianGrid, LabelList } from "recharts";

// ══════════════════════════════════════════════════════════════
// SAPM Curriculum — 8 Chapters
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
  { id: 9, title: "Data & Methodology Notes", time: "reference" },
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
          <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>WHAT GDP RECORDS — LIBOR MANIPULATION</div>
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
            ["$350 trillion in contracts mispriced", "UNDETECTABLE"],
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

      <P>The LIBOR traders were making money. The benchmark they depended on for their entire business model was being destroyed. No analysis of what they received that day told them anything about what was happening to the system they depended on. Standard analysis said: win-win. The correct analysis: they were burning down the building while counting the furniture.</P>

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
  { name: "HOLLOW WIN", c:0, a:1, b:1, inside: "Parties gain while the system they depend on degrades. Private optimum and systemic preservation are incompatible.", standard: "Mutual gain. Win-win. Pareto efficient. Recommend acceptance.", realCase: "LIBOR (2005–2012). Wells Fargo cross-selling (2002–2016). Boeing 737 MAX. Lysine cartel (1992–1995). Algorithmic collusion (happening now).", color: RED, bg: "rgba(239,68,68,0.08)", highlight: true },
  { name: "CORROSIVE WIN-LOSE", c:0, a:1, b:0, inside: "A gains at the expense of both B and the system. Extractive and system-degrading.", standard: "Competitive advantage. Market power. Dominance.", realCase: "Predatory pricing that destroys the supplier ecosystem the dominant firm depends on.", color: RED, bg: "rgba(239,68,68,0.04)" },
  { name: "CORROSIVE LOSE-WIN", c:0, a:0, b:1, inside: "B gains at the expense of both A and the system. Mirror of Corrosive Win-Lose.", standard: "Favorable terms. Negotiating leverage.", realCase: "A downstream buyer extracting from an upstream supplier while degrading the supply chain both depend on.", color: RED, bg: "rgba(239,68,68,0.04)" },
  { name: "MISERY", c:0, a:0, b:0, inside: "Universal loss across all dimensions. System, A, and B all degraded.", standard: "Market failure. Lose-lose. Impasse.", realCase: "Post-collapse LIBOR (2012–2014): banks faced massive penalties, reputations destroyed, benchmark remained corrupted. Everyone lost.", color: RED, bg: "rgba(239,68,68,0.04)" },
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
  ["Validated by", "Decades of asset pricing research", <><div>1. Theorem proven from axioms — not an empirical claim requiring historical price series</div><div style={{marginTop:4}}>2. 61-domain calibration validated against independent externality literature; Monte Carlo robustness confirmed across 3+ distribution types per domain</div><div style={{marginTop:4}}>3. Every documented HOLLOW WIN — LIBOR (2012), VW Dieselgate (2015), opioid crisis, PFAS litigation — exceeds the welfare sustainability threshold. Zero false negatives on record.</div></>],
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
          <Label>LIBOR EXAMPLE</Label>
          <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>Two LIBOR panel banks both benefit from submitting manipulated rates. The deal exists. The cooperation is real.</div>
        </div>
      </div>

      <div style={{ padding: "20px 24px", background: SURFACE, border: `2px solid rgba(245,158,11,0.2)`, borderRadius: 4, marginBottom: 12 }}>
        <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: GOLD, marginBottom: 8 }}>AXIOM 2 — SYSTEM INDEPENDENCE <span style={{ color: RED, fontSize: 12, fontWeight: 400 }}>(THE KEY ONE)</span></div>
        <P>The health of the shared system is a separate fact — it cannot be calculated from what A got or what B got. You could know everything about both payoffs and still have no idea whether the system survived.</P>
        <div style={{ padding: "12px 16px", background: "rgba(245,158,11,0.04)", borderRadius: 4, marginTop: 8, marginBottom: 8 }}>
          <Label>LIBOR EXAMPLE</Label>
          <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>Knowing exactly what each LIBOR trader earned tells you nothing about whether the global benchmark is intact. The benchmark's health is a different variable. It lives outside the payoff space.</div>
        </div>
        <div style={{ fontFamily: S, fontSize: 15, color: GOLD, fontStyle: "italic", lineHeight: 1.7 }}>
          This is the key axiom because without it, standard analysis would suffice. The theorem stands or falls on this one.
        </div>
      </div>

      <div style={{ padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, marginBottom: 12 }}>
        <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: GOLD, marginBottom: 8 }}>AXIOM 3 — SYSTEM DEPENDENCE</div>
        <P>What A and B do together has real consequences for the system around them. Their deal is not isolated.</P>
        <div style={{ padding: "12px 16px", background: "rgba(245,158,11,0.04)", borderRadius: 4, marginTop: 8 }}>
          <Label>LIBOR EXAMPLE</Label>
          <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>LIBOR rate submissions directly set the benchmark. If the deal had no effect on anything outside itself, there would be nothing to detect.</div>
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
  { domain: "#5  Child Labor",               beta: 21.83, tip: "βW 21.83. Π=$39B. Cost Arbitrage Floor — jurisdictional wage arbitrage is structurally self-reinforcing." },
  { domain: "#6  Opioid Ecosystem",          beta: 14.96, tip: "βW 14.96. Π=$75B. Prescription Ratchet — neurochemical dependency locks in demand regardless of legal supply." },
  { domain: "#7  Conflict Minerals",         beta: 12.60, tip: "βW 12.60. Π=$20B. Fungibility Floor — mineral fungibility defeats traceability at the smelter." },
  { domain: "#8  Private Prisons",           beta: 12.08, tip: "βW 12.08. Π=$8B. Occupancy Guarantee Trap — contractual occupancy floors invert the incentive to reduce incarceration." },
  { domain: "#9  Credit Rating Agencies",    beta: 11.21, tip: "βW 11.21. Π=$11B. Issuer-Pays Corruption Floor — the party being rated pays the rater." },
  { domain: "#10 Mining & Rare Earth",       beta: 11.15, tip: "βW 11.15. Π=$150B. Ore Grade Depletion Floor — extraction necessarily degrades the ore base." },
  { domain: "#11 Big Tech Acquisitions",     beta: 7.81,  tip: "βW 7.81. Π=$128B. Kill Zone Ratchet — acquisition-based suppression of competitive entry is self-reinforcing." },
  { domain: "#12 Commercial Real Estate",    beta: 7.78,  tip: "βW 7.78. Π=$13B. Vacancy Doom Loop — vacancy cascades into municipal fiscal contraction." },
  { domain: "#13 Frontier AI",               beta: 7.51,  tip: "βW 7.51. Π=$30B. Alignment Ceiling — capability can be demonstrated; alignment cannot be verified." },
  { domain: "#14 Industrial Agriculture",    beta: 7.36,  tip: "βW 7.36. Π=$205B. Caloric Emissions Floor — enteric fermentation and N₂O release are thermodynamically unavoidable." },
  { domain: "#15 Monoculture Agriculture",   beta: 7.36,  tip: "βW 7.36. Π=$340B. Genetic Uniformity Floor — pathogen reproduction rate exceeds crop cycle 730:1." },
  { domain: "#16 Gambling & Casinos",        beta: 7.30,  tip: "βW 7.30. Π=$45B. Sovereign Operator Paradox — the state both regulates and profits from addiction." },
  { domain: "#17 Deforestation & Logging",   beta: 7.21,  tip: "βW 7.21. Π=$120B. Canopy Regeneration Floor — old-growth canopy requires centuries to reconstitute." },
  { domain: "#18 Illicit Drug Trade",        beta: 7.16,  tip: "βW 7.16. Π=$500B criminal revenue. Prohibition Profit Floor — criminalization raises price and margin simultaneously." },
  { domain: "#19 Payday Lending",            beta: 7.08,  tip: "βW 7.08. Π=$44B. Poverty Ratchet — debt trap mechanics are self-reinforcing at the margin." },
  { domain: "#20 Fast Fashion",              beta: 7.01,  tip: "βW 7.01. Π=$55B. Throughput Floor — thermodynamic degradation is irreversible." },
  { domain: "#21 Coal",                      beta: 6.95,  tip: "βW 6.95. Π=$990B. Carbon Intensity Floor — coal's carbon-to-energy ratio is a fixed property of the fuel." },
  { domain: "#22 Deep-Sea Mining",           beta: 6.90,  tip: "βW 6.90. Π=$5B. Abyssal Recovery Floor — polymetallic nodules form at 10–20mm/million years." },
  { domain: "#23 Cement & Concrete",         beta: 6.74,  tip: "βW 6.74. Π=$3B. Calcination Floor — CaCO₃ → CaO + CO₂ is conservation of mass, not a design choice." },
  { domain: "#24 Plastics",                  beta: 6.67,  tip: "βW 6.67. Π=$650B. Thermodynamic Degradation Floor — polymer fragmentation is irreversible." },
  { domain: "#25 Electronic Waste Export",    beta: 6.59,  tip: "βW 6.59. Π=$1,050B. Basel Convention Evasion — classification arbitrage defeats treaty enforcement." },
  { domain: "#26 Tobacco",                   beta: 6.50,  tip: "βW 6.50. Π=$965B. Addiction Ratchet — neurochemical dependency is self-reinforcing by mechanism." },
  { domain: "#27 Student Loans",             beta: 6.36,  tip: "βW 6.36. Π=$47B. Guaranteed Demand Trap — non-dischargeability in bankruptcy removes market discipline." },
  { domain: "#28 Pharmacy Benefit Management",beta: 6.35,  tip: "βW 6.35. Π=$60B. Spread Extraction Trap — opaque rebate infrastructure concentrates pricing power." },
  { domain: "#29 Platform Monopoly",         beta: 6.33,  tip: "βW 6.33. Π=$158B. Gatekeeper Ratchet — network effects make displacement exponentially costly." },
  { domain: "#30 Palm Oil",                  beta: 6.30,  tip: "βW 6.30. Π=$68B. Substitution Impossibility — yield differential forecloses economically viable substitutes." },
  { domain: "#31 Tax Havens",                beta: 6.27,  tip: "βW 6.27. Π=$492B. Sovereignty Arbitrage — regulatory competition is self-reinforcing at the jurisdictional level." },
  { domain: "#32 Persistent Organic Pollutants",beta: 6.23,  tip: "βW 6.23. Π=$70B. Bioaccumulation Ratchet — lipid solubility and persistence guarantee trophic amplification." },
  { domain: "#33 Data Brokerage",            beta: 6.13,  tip: "βW 6.13. Π=$323B. Consent Fabrication Trap — notice-and-choice is structurally uninformed." },
  { domain: "#34 Antimicrobial Resistance",  beta: 1.60,  tip: "βW 1.60 (weighted avg; marginal 2.10). Π=$550B. Efficacy Ceiling — therapeutic lethality constitutively selects for resistance." },
  { domain: "#35 Social Media / Youth Mental Health",beta: 5.79,  tip: "βW 5.79. Π=$68B. Engagement Trap — attention maximization is not welfare maximization by design." },
  { domain: "#36 Gene Drives",               beta: 5.77,  tip: "βW 5.77. Π=$12B. Ecological Ratchet Floor — self-propagating constructs cannot be recalled post-release." },
  { domain: "#37 Water Privatization",       beta: 5.61,  tip: "βW 5.61. Π=$246B. Necessity Monopoly Floor — inelastic demand eliminates market discipline." },
  { domain: "#38 Algorithmic Pricing",       beta: 5.38,  tip: "βW 5.38. Π=$40B. Tacit Coordination Ceiling — independent optimization converges to supracompetitive pricing without intent." },
  { domain: "#39 PFAS / Forever Chemicals",  beta: 35.20, tip: "βW 35.20. Π=$186.7B (Persistence Premium). Molecular Persistence Floor — the C-F bond (485 kJ/mol) exceeds any biological degradation mechanism." },
  { domain: "#40 Private Equity in Healthcare",beta: 5.24,  tip: "βW 5.24. Π=$31B. Fiduciary Contradiction — private equity return horizon is structurally misaligned with patient outcomes." },
  { domain: "#41 Interest Rate Benchmark Manipulation",beta: 5.13,  tip: "βW 5.13. Π=$3B. Self-Referential Pricing Trap — benchmark submitters price the instrument they are submitting." },
  { domain: "#42 Bitcoin / Proof-of-Work",   beta: 5.00,  tip: "βW 5.00. Π=$42B. Protocol Welfare Floor — permissionless architecture structurally prevents welfare internalization." },
  { domain: "#43 Aviation Emissions",        beta: 4.97,  tip: "βW 4.97. Π=$100B. Altitude Forcing Floor — high-altitude non-CO₂ effects exceed ground-level equivalents." },
  { domain: "#44 Defense Procurement",       beta: 4.88,  tip: "βW 4.88. Π=$34B. Monopsony Lock-In — single-buyer markets eliminate competitive pricing discipline." },
  { domain: "#45 Orbital Debris",            beta: 4.82,  tip: "βW 4.82. Π=$2B. Orbital Congestion Ceiling — Kessler cascade is a physical threshold with no policy override." },
  { domain: "#46 Fisheries & Coral Reefs",    beta: 4.70,  tip: "βW 4.70. Π=$38B. External Forcing Impossibility — ocean warming operates outside fisheries management reach." },
  { domain: "#47 Sovereign Debt",            beta: 4.67,  tip: "βW 4.67. Π=$35B. Intergenerational Extraction Floor — creditors in future periods bear costs they did not incur." },
  { domain: "#48 Insurance & Climate Risk",  beta: 4.57,  tip: "βW 4.57. Π=$90B. Tail Risk Exclusion Ratchet — catastrophic risks exit coverage precisely when needed." },
  { domain: "#49 Topsoil Erosion",           beta: 4.41,  tip: "βW 4.41. Π=$255B. Pedogenesis Floor — topsoil forms at 1cm/100–1,000 years; erodes 10–100× faster." },
  { domain: "#50 Ultra-Processed Food",      beta: 4.06,  tip: "βW 4.06. Π=$450B. Palatability Ratchet — hyperpalatability engineering creates self-reinforcing demand." },
  { domain: "#51 Groundwater (Ogallala)",    beta: 3.46,  tip: "βW 3.46. Recharge Floor — Ogallala recharge rate is geologically negligible against extraction." },
  { domain: "#52 Altcoins / Proof-of-Stake", beta: 3.14,  tip: "βW 3.14. Π=$12B. Cross-Chain Welfare Floor — permissionless architecture persists across consensus mechanisms." },
  { domain: "#53 Nuclear Power",             beta: 2.94,  tip: "βW 2.94 (marginal beta). Persistence Floor — radioactive decay timescales are physical, not regulatory." },
  { domain: "#54 Arms Exports",              beta: 2.54,  tip: "βW 2.54. Π=$30B. End-Use Enforcement Impossibility — post-transfer custody cannot be verified." },
  { domain: "#55 Stablecoins & Shadow Banking",beta: 2.53,  tip: "βW 2.53. Π=$56B. Reserve Opacity Trap — reserve composition is unverifiable without regulatory access." },
  { domain: "#56 Private Military Contractors",beta: 2.06,  tip: "βW 2.06. Π=$260B. Accountability Void — flag-state and jurisdictional gaps create structural impunity." },
  { domain: "#57 Oil & Gas",                 beta: 1.63,  tip: "βW 1.63. Π=$3,500B. Combustion Floor — CO₂ release is stoichiometrically fixed to hydrocarbon combustion." },
  { domain: "#58 Shipping & Maritime",       beta: 1.34,  tip: "βW 1.34. Π=$969B. Flag State Evasion Floor — open-registry jurisdiction shopping is structurally available." },
  { domain: "#59 Alcohol",                   beta: 1.33,  tip: "βW 1.33. Π=$1,600B global revenue. Prohibition Paradox — prohibition raises black-market margin and violence simultaneously." },
  { domain: "#60 Factory Farming",           beta: 1.02,  tip: "βW 1.02. Π=$2,700B. Protein Demand Floor — thermodynamic conversion inefficiency is fixed by biology." },
  { domain: "#61 Gig Economy",               beta: 0.76,  tip: "βW 0.76. Π=$45B. Classification Arbitrage Floor — contractor misclassification is institutionally self-reinforcing." },
];

const DW_CHART_DATA = [
  { domain: "#1  Electronic Waste Export",              dw: 6922, tip: "ΔW=$6,922B. Π=$1,050B. βW=6.59." },
  { domain: "#2  Coal",                                 dw: 6884, tip: "ΔW=$6,884B. Π=$990B. βW=6.95." },
  { domain: "#3  PFAS / Forever Chemicals",             dw: 6574, tip: "ΔW=$6,574B. Π=$186.7B (Persistence Premium). βW=35.20. Paper-verified." },
  { domain: "#4  Cybercrime & Ransomware",              dw: 6403, tip: "ΔW=$6,403B. Π=$200B criminal revenue. βW=31.10." },
  { domain: "#5  Tobacco",                              dw: 6300, tip: "ΔW=$6,300B. Π=$965B. βW=6.50. Six channels: VSL mortality $4,500B, healthcare $422B, productivity $446B, secondhand smoke $315B, environment $40B, governance capture $150B." },
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
  { domain: "#24 Antimicrobial Resistance",             dw: 880,  tip: "ΔW=$880B. Π=$550B (broad ledger). βW=1.60 (weighted avg). Paper-verified." },
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
  { domain: "#52 Nuclear Power",                        dw: 80,   tip: "ΔW=$80B. Π=$150B. βW=0.53 (weighted). ΠSA=+$70B. Paper-verified." },
  { domain: "#53 Arms Exports",                         dw: 75,   tip: "ΔW=$75B. Π=$30B. βW=2.54." },
  { domain: "#54 Gene Drives",                          dw: 71.5, tip: "ΔW=$71.5B (5.77×$12.4B). Π=$12.4B. βW=5.77. Corrected from table error ($8B)." },
  { domain: "#55 Altcoins / Proof-of-Stake",            dw: 37.7, tip: "ΔW=$37.7B (3.14×$12B). Π=$12B. βW=3.14. Corrected from table error ($6B)." },
  { domain: "#56 Gig Economy",                          dw: 34,   tip: "ΔW=$34B. Π=$45B. βW=0.76." },
  { domain: "#57 Deep-Sea Mining",                      dw: 34,   tip: "ΔW=$34B. Π=$5B. βW=6.90." },
  { domain: "#58 Groundwater (Ogallala Aquifer)",       dw: 33,   tip: "ΔW=$33B. βW=3.46. US-specific." },
  { domain: "#59 Cement & Concrete",                    dw: 22,   tip: "ΔW=$22B. Π=$3B. βW=6.74." },
  { domain: "#60 Interest Rate Benchmark Manipulation", dw: 16,   tip: "ΔW=$16B. Π=$3B. βW=5.13." },
  { domain: "#61 Orbital Debris",                       dw: 8,    tip: "ΔW=$8B. Π=$2B. βW=4.82." },
];

function Chapter5() {
  return (
    <div id="ch5">
      <ChapterHead num={5} title="Every dollar of apparent output has a welfare cost. Here is what it costs." subtitle="The System Asset Pricing Model calibrates welfare betas for 61 domains across 22 impossibility theorems and 39 intractability theorems. The results are not subtle." time="4 min" />

      <P>Welfare beta (<Tip term="βW">β<sub>W</sub></Tip>) measures the marginal rate of system welfare destruction per dollar of private gain. A sector with β<sub>W</sub> = 1.0 destroys one dollar of social welfare for every dollar of revenue. A sector with β<sub>W</sub> = 35.2 destroys thirty-five.</P>

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
          <BarChart data={BETA_CHART_DATA} layout="vertical" margin={{ left: 200, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis type="number" tick={{ fill: MUTED, fontFamily: M, fontSize: 12 }} />
            <YAxis type="category" dataKey="domain" tick={{ fill: DIM, fontFamily: M, fontSize: 11 }} width={195} interval={0} />
            <RTooltip
              contentStyle={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, fontFamily: M, fontSize: 13, color: DIM, maxWidth: 320 }}
              formatter={(val, name, props) => [props.payload.tip, `βW = ${val}`]}
            />
            <Bar dataKey="beta" radius={[0, 3, 3, 0]}>
              {BETA_CHART_DATA.map((d, i) => (
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
              [39, 35.20, "PFAS / Forever Chemicals",                  "Molecular Persistence Floor",     "Thermodynamic"],
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
    libor: "A = Panel banks. B = Counterparty institutions. System = Global financial benchmark ($350 trillion in contracts referencing LIBOR).",
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
    libor: "Tier 1 = CFTC whistleblower (§748). Tier 3 = Regulatory restructuring and $9B+ in penalties. Tier 4 = FSB benchmark reform — the SOFR transition." },
  { step: 7, title: "SELECT THE MINIMUM SUFFICIENT INTERVENTION", phase: "resolution",
    desc: "The lowest tier that breaks PST. Overkill wastes resources and creates resistance.",
    libor: "Minimum sufficient = Tier 4 (sovereign coordination). The SOFR transition required international coordination across all major financial jurisdictions. No lower tier was sufficient." },
  { step: 8, title: "VERIFY ESCAPE", phase: "resolution",
    desc: "Confirm C flips from 0 to 1. Win-Win-Win is the target.",
    libor: "LIBOR → SOFR: Benchmark integrity restored. Transaction-based rate replacing panel bank estimates. Classification: Win-Win-Win (1,1,1). Escape confirmed." },
];

const WHISTLE = [
  { prog: "SEC WHISTLEBLOWER", statute: "Dodd-Frank §21F", covers: "Securities fraud, benchmark manipulation, accounting fraud", reward: "10–30% of sanctions exceeding $1 million", anon: "Available through attorney", protection: "Federal law", cumulative: "$6B+ awarded to whistleblowers to date", best: "Financial sector Hollow Wins (LIBOR-type cases)" },
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
              <Label>LIBOR — WORKED EXAMPLE</Label>
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
          THE LIBOR TRADERS LEFT BETWEEN $900 MILLION AND $2.7 BILLION ON THE TABLE.
        </div>
        <div style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.7, marginBottom: 16 }}>
          The LIBOR manipulation generated approximately $9 billion in regulatory sanctions. Under the Dodd-Frank whistleblower program (SEC §21F), a qualifying whistleblower receives 10–30% of sanctions over $1 million.
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
          The traders who manipulated LIBOR went to prison. The traders who reported it — had any of them chosen to — would have received between nine hundred million and two point seven billion dollars from the United States government, legal immunity, and protected employment status. They did not know this option existed.
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
          Birkenfeld used the IRS §7623 program (tax fraud). LIBOR traders would use SEC §21F or CFTC §748 (financial benchmark manipulation). Different programs. Same architecture: 10–30% of sanctions, participants eligible, no maximum award. The Birkenfeld case is the proof of concept.
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
          Treaty-based commons governance (the Montreal Protocol model). International benchmark reform (FSB post-LIBOR). Mandate <Tip term="c-adjusted GDP">c-adjusted GDP</Tip> as a supplementary national account. The question: "Which of our PST domains have T* under 10 years?"
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
const DOMAINS = [
  { group: "THERMODYNAMIC PERMANENCE", domains: [
    { name: "PFAS / MOLECULAR PERSISTENCE FLOOR", plain: "PFAS are 'forever chemicals' — per- and polyfluoroalkyl substances used in nonstick coatings, firefighting foam, food packaging, and thousands of industrial applications. The carbon-fluorine bond that makes them useful also makes them indestructible by any biological process. They accumulate in soil, water, and human tissue. There is no natural mechanism to break them down.", theorem: "The C-F bond energy (485 kJ/mol) exceeds the energy available to any biological degradation mechanism. No market mechanism can reduce PFAS contamination below a structural floor while PFAS production continues. The floor is set by thermodynamics, not regulatory failure.", beta: "≥ 2.5", expiry: "Class-wide production ban AND non-persistent substitutes at scale. Not met." },
  ]},
  { group: "EVOLUTIONARY ARMS RACES", domains: [
    { name: "AMR / EFFICACY CEILING", plain: "Antibiotics work by killing bacteria. But killing bacteria selects for bacteria that can survive the antibiotic. The same molecular event that cures the patient — therapeutic lethality — selects for resistance. This is not a side effect. It is an evolutionary consequence of the mechanism of action.", theorem: "Therapeutic lethality constitutively selects for resistance. No market mechanism can decouple antibiotic use from resistance development. Every dose that cures also selects.", beta: "2.1", expiry: "Extraction-rate management only — slow enough use that resistance cannot establish. Not compatible with current medical practice at scale." },
    { name: "MONOCULTURE AGRICULTURE / GENETIC UNIFORMITY FLOOR", plain: "Modern industrial agriculture plants vast areas with genetically identical crops. This maximizes yield efficiency. It also means a pathogen that can infect one plant can infect all of them. The Irish Potato Famine was monoculture failure. The current global wheat supply is more genetically uniform than it was then. The generational asymmetry is 730:1 — pathogens reproduce 730 times for every crop cycle.", theorem: null, beta: "8.6", expiry: "Mandatory diversification at scale. Not met." },
  ]},
  { group: "RADIOACTIVE DECAY", domains: [
    { name: "NUCLEAR FISSION / PERSISTENCE FLOOR", plain: "Nuclear fission generates no combustion emissions and produces extraordinary energy density. It also produces radioactive waste with half-lives measured in thousands to millions of years. Radioactive decay rates are fundamental physical constants. No engineering, no regulation, no market mechanism can accelerate them.", theorem: null, beta: "0.53 — THE ONLY DOMAIN BELOW 1.0", expiry: "None — half-lives are not negotiable.", callout: "Nuclear is not clean. But it is the least destructive per dollar of output of any energy sector examined. The SAPM does not presuppose that any sector is bad. It measures what it costs." },
  ]},
  { group: "IRREVERSIBLE CAPABILITY DIFFUSION", domains: [
    { name: "FRONTIER AI / ALIGNMENT CEILING", plain: "Once an AI capability is demonstrated — GPT-4 can do X, AlphaFold can fold proteins — that capability cannot be unlearned. The knowledge that it is possible, the architectural insight that achieved it, diffuses irreversibly through the research community. Capability advances faster than alignment because demonstrating capability is one experiment; proving alignment is a research program that may never converge.", theorem: null, beta: "7.40", expiry: "Formal verification at the capability frontier. Not currently achievable." },
  ]},
  { group: "ARCHITECTURAL CONSTRAINTS", domains: [
    { name: "BLOCKCHAIN / PROTOCOL WELFARE FLOOR", plain: "Permissionless blockchain networks — Bitcoin, Ethereum — allow anyone to participate without identity verification or accountability. This is the design feature. It is also why welfare costs cannot be internalized through protocol design alone: there is no mechanism to exclude actors who impose welfare costs, because exclusion requires permission, and the protocol is permissionless.", theorem: null, beta: "≥ 1.0", expiry: "Sovereign custody regulation. Not at scale." },
  ]},
  { group: "GEOCHEMICAL", domains: [
    { name: "DEEP-SEA MINING / ABYSSAL RECOVERY FLOOR", plain: "The deep ocean floor — below 4,000 meters — is covered with polymetallic nodules containing cobalt, nickel, manganese, and copper. These nodules form at 10 to 20 millimeters per million years. The organisms that live on them — sponges, corals, microbial communities — have no other substrate. When you mine the nodule, you destroy the habitat. The habitat cannot recover on any human timescale.", theorem: null, beta: "≥ 2.0", expiry: "Cobalt-free batteries exceeding 85% market share before extraction commences. Not met." },
    { name: "TOPSOIL EROSION / PEDOGENESIS FLOOR", plain: "Topsoil — the thin layer of biologically active soil that makes agriculture possible — forms at 1 centimeter per 100 to 1,000 years. Industrial agriculture erodes it at rates 10 to 100 times faster than formation. Once gone, it cannot be replaced on any agricultural timescale. We are farming the principal.", theorem: null, beta: "≥ 1.8", expiry: "Regenerative agriculture exceeding 50% of global cropland. Not met." },
  ]},
  { group: "PROCESS CHEMISTRY", domains: [
    { name: "CEMENT / CALCINATION FLOOR", plain: "Concrete is made from cement. Cement is made from limestone (CaCO₃). To make cement, you heat limestone until it releases CO₂: CaCO₃ → CaO + CO₂. This is not a fuel choice. This is conservation of mass. The carbon in limestone must go somewhere when you break the calcium carbonate bond. It goes into the atmosphere. Every concrete structure ever built released CO₂ that cannot be avoided by switching to renewable energy.", theorem: null, beta: "≥ 1.35", expiry: "Calcium silicate cement exceeding 1% of global clinker output. Not met." },
  ]},
  { group: "INFORMATIONAL", domains: [
    { name: "WMD / CAPABILITY DIFFUSION CEILING", plain: "Once someone demonstrates that a weapon can be built — a nuclear device, a specific pathogen, an autonomous weapons system — the knowledge that it is possible cannot be erased. The barrier to replication drops permanently. Transferred weapons knowledge is enabling in a way that persists regardless of what happens to the original weapon.", theorem: null, beta: null, expiry: "Security competition ends. Not a realistic near-term scenario." },
  ]},
  { group: "INSTITUTIONAL", domains: [
    { name: "PLATFORM MONOPOLY / GATEKEEPER RATCHET", plain: "Network effects mean the platform becomes more valuable as more people use it. Zero-price lock-in means users cannot leave without losing their social graph, their reviews, their history. Data feedback means the platform gets better at predicting behavior as it accumulates more data. These three mechanisms together generate a self-reinforcing floor: the platform cannot be displaced by a better product because the switching cost is the entire network.", theorem: null, beta: "≥ 2.8", expiry: "Structural dissolution (AT&T-class breakup)." },
  ]},
  { group: "JURISDICTIONAL", domains: [
    { name: "ORBITAL DEBRIS / CONGESTION CEILING", plain: "Low Earth orbit — the band of space 200 to 2,000 kilometers above Earth where GPS, weather, and communications satellites operate — is filling with debris from satellite collisions and launches. Each collision generates more debris. At some density, a chain reaction begins — Kessler Syndrome — where collision-generated debris triggers more collisions, making the entire orbital band unusable. No single sovereign controls this space. No treaty has enforcement mechanisms. The orbit cannot be cleaned once Kessler Syndrome begins.", theorem: null, beta: "≥ 12.0", expiry: "Orbital-use fee regime plus mandatory low-altitude deployment. Not at scale." },
    { name: "FISHERIES / EXTERNAL FORCING IMPOSSIBILITY", plain: "Fish populations can be managed. Ocean temperatures cannot — not by fisheries management. As ocean warming accelerates, fish populations are shifting poleward, coral reefs are bleaching, and the ecosystems that fisheries depend on are restructuring. The impossibility is jurisdictional: the thing destroying the fishery (atmospheric CO₂ concentration) operates entirely outside the institutional reach of fisheries management.", theorem: null, beta: null, expiry: "Atmospheric CO₂ ≤ 300 ppm. Not achievable under any current trajectory." },
  ]},
  { group: "BIOLOGICAL", domains: [
    { name: "GENE DRIVES / ECOLOGICAL RATCHET FLOOR", plain: "A gene drive is a genetic technology that spreads a chosen trait through an entire wild population — potentially the entire species — within a few generations. They are being developed to eliminate malaria mosquitoes, control invasive species, and eradicate agricultural pests. Once a gene drive is released into a wild population, it cannot be recalled. The construct propagates itself. There is no off switch.", theorem: null, beta: "≥ 4.2", expiry: "Contained drives only (daisy-chain or threshold architectures that limit spread). Not currently dominant in the field." },
  ]},
];

function Chapter8() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div id="ch8">
      <ChapterHead num={8} title="Some Hollow Wins cannot be fixed from inside the game. Ever." subtitle="In sixteen domains, the impossibility is not structural — it is physical. The C-F bond does not negotiate. Radioactive decay constants are not adjustable by regulation. Evolutionary selection pressure does not respond to market incentives." time="4 min" />

      <P>The Private Pareto Theorem proves that bilateral optimization is constitutively blind to system welfare. In seventeen documented domains, this means no private mechanism can achieve <Tip term="Win-Win-Win">Win-Win-Win</Tip> without deliberate institutional redesign. That is the parent result.</P>

      <P>In sixteen of those domains, something stronger holds: no market mechanism — not regulation, not incentives, not carbon pricing, not better technology within the current paradigm — can reduce system welfare destruction below a structural floor. The floor is set not by institutional failure but by physics, biology, chemistry, or orbital mechanics.</P>

      <P>Each follows Arrow's logical architecture — three constitutive axioms, conjunction guarantees an irreducible floor — except the axioms are empirical facts about the physical world, not value judgments about rational preferences.</P>

      {DOMAINS.map((g, gi) => (
        <div key={g.group} style={{ marginTop: 32 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 2, marginBottom: 12 }}>
            GROUP {gi + 1} — {g.group}
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
                    <div style={{ fontFamily: M, fontSize: 13, color: RED }}>{d.expiry}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

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
// CHAPTER 9 — DATA & METHODOLOGY NOTES
// ═══════════════════════════════════════════════════════════════

// All 61 SAPM domains: [domain, scope, Pi ($B), βW, ΔW ($B), source, notes]
// scope: "Global" = ΔW allocated against global GDP; "US" = US-specific, deducted from US GDP only
// Pi = annual industry revenue (Iron Law: never profit)
// ΔW = βW × Pi (Monte Carlo verified or paper-derived)
// Source: "Monte Carlo" = Monte Carlo simulation in paper; "Paper" = derived from paper text (DA7 extraction overridden); "DA7" = Document Analysis Field 7
const NOTES_DOMAINS = [
  ["Alcohol",                       "Global", 85,    24.96,  2121.4, "Monte Carlo",    ""],
  ["Algorithmic Pricing",           "Global", 40,    5.38,   215.2,  "Monte Carlo",    ""],
  ["AMR (Antimicrobial Resistance)","Global", 550,   1.60,   880,    "Paper", "⚠ DA7 extraction had βW=5.84. Paper (weighted avg) = 1.60, marginal = 2.10. Paper is authoritative."],
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
  ["Factory Farming",               "Global", 2700,  1.02,   2763.7, "Monte Carlo ✓",   "Iron Law corrected: profit→revenue denominator"],
  ["Fast Fashion",                  "Global", 55,    7.01,   385.4,  "Monte Carlo",    ""],
  ["Firearms",                      "Global", 10,    50.99,  509.9,  "Monte Carlo",    ""],
  ["Fisheries & Coral",             "Global", 38,    4.70,   178.6,  "Monte Carlo",    ""],
  ["Frontier AI",                   "Global", 30,    7.51,   225,    "Monte Carlo",    ""],
  ["Gambling & Casinos",            "Global", 45,    7.30,   328.5,  "Monte Carlo",    ""],
  ["Gene Drives",                   "Global", 12.4,  5.77,   71.5,   "DA7",   "⚠ CLAUDE.md table showed ΔW=8.0 (error). Correct: 5.77×12.4=71.5"],
  ["Gig Economy",                   "Global", 45,    0.76,   34.4,   "Monte Carlo",    "Troublesome (βW<1.0)"],
  ["Groundwater (Ogallala)",        "US",     null,  3.46,   32.9,   "Monte Carlo",    "US-specific aquifer. Π not extracted (ΔW from Monte Carlo direct)."],
  ["Human Trafficking",             "Global", 236,   22.62,  5338.1, "Monte Carlo",    ""],
  ["Illicit Drug Trade",            "Global", 500,   7.16,   3579.1, "Monte Carlo ✓",   "Iron Law corrected"],
  ["Industrial Agriculture",        "Global", 205,   7.36,   1510,   "Monte Carlo",    ""],
  ["Insurance & Climate Risk",      "Global", 90,    4.57,   411.1,  "Monte Carlo",    ""],
  ["LIBOR / FX Fixing",             "Global", 3.2,   5.13,   16.4,   "Cover", "Π = manipulator rents (current). See CLAUDE.md for banking-revenue alternative."],
  ["Mining & Rare Earth",           "Global", 150,   11.15,  322,    "Monte Carlo",    "⚠ Ratio inconsistency flagged in CLAUDE.md (βW×Π≠ΔW by factor 2.1). Unresolved."],
  ["Monoculture / Crop Diversity",  "Global", 340,   7.36,   2503,   "Monte Carlo ✓",   "ΔW derived: 7.36×340=2,503. Tobacco paper cross-cites βW=8.6 (minor discrepancy). Iron Law corrected."],
  ["Nuclear Power",                 "Global", 150,   0.53,   80,     "Paper", "ΔW from ΠSA: $150B-$80B=+$70B → ΔW=$80B. DA7 had 2.94 (marginal beta, intentional per CLAUDE.md [^38]). βW=0.53 weighted, 0.70 marginal. Troublesome (βW<1.0)."],
  ["Oil & Gas",                     "Global", 3500,  1.63,   5694.6, "Monte Carlo",    ""],
  ["Opioid Ecosystem",              "Global", 75,    14.96,  1121.9, "Monte Carlo",    "Predominantly US crisis; classified Global given Canada/UK/Australia opioid epidemics."],
  ["Orbital Debris",                "Global", 2.2,   4.82,   8,      "DA7",   ""],
  ["Palm Oil",                      "Global", 68,    6.30,   428.3,  "Monte Carlo",    ""],
  ["Payday Lending",                "US",     44,    7.08,   311.7,  "Monte Carlo",    "US-centric industry structure"],
  ["PE in Healthcare",              "US",     31,    5.24,   162.4,  "Monte Carlo",    "Predominantly US. UK/AUS have some PE in healthcare but ΔW calibrated to US."],
  ["PFAS / Forever Chemicals",      "Global", 186.7, 35.2,   6574,   "Paper", "⚠ DA7 extraction had βW=5.31. Paper = 35.2. CLAUDE.md confirmed list = 35.9. Paper is authoritative. Π = Persistence Premium (revenue attributable to molecular non-degradability, not total chemical industry revenue)."],
  ["Pharmacy Benefit Management",   "US",     60,    6.35,   381,    "Monte Carlo",    "US health system architecture"],
  ["Platform Monopoly",             "Global", 158,   6.33,   999.4,  "Monte Carlo",    ""],
  ["Plastics",                      "Global", 650,   6.67,   3683,   "Monte Carlo",    ""],
  ["POPs Beyond PFAS",              "Global", 70,    6.23,   435.8,  "Monte Carlo",    ""],
  ["Private Military Contractors",  "Global", 260,   2.06,   536.3,  "Monte Carlo",    ""],
  ["Private Prisons",               "US",     8,     12.08,  96.7,   "Monte Carlo",    "US-centric industry"],
  ["Proof-of-Stake / Altcoins",     "Global", 12,    3.14,   37.7,   "DA7",   "⚠ CLAUDE.md table showed ΔW=6.0 (error). Correct: 3.14×12=37.7. Used corrected value in totals."],
  ["Shipping & Maritime",           "Global", 969,   1.34,   1296,   "Monte Carlo",    ""],
  ["Social Media / Youth MH",       "Global", 68,    5.79,   393.5,  "Monte Carlo",    ""],
  ["Sovereign Debt",                "Global", 35,    4.67,   163.5,  "Monte Carlo",    ""],
  ["Stablecoins / Shadow Banking",  "Global", 56,    2.53,   141.7,  "Monte Carlo",    ""],
  ["Student Loan Securitization",   "US",     46.8,  6.36,   297.6,  "Monte Carlo",    "US federal student loan architecture"],
  ["Tax Havens",                    "Global", 492,   6.27,   3084.7, "Monte Carlo",    ""],
  ["Tobacco",                       "Global", 965,   6.50,   6300,   "Monte Carlo",    "Π=$965B global revenue. βW confirmed. ΔW=$6.3T (6 channels: VSL mortality $4,500B, healthcare $422B, productivity $446B, secondhand smoke $315B, environment $40B, governance capture $150B). CI [4.5, 9.6]."],
  ["Topsoil Erosion",               "Global", 255,   4.41,   1123,   "Monte Carlo",    ""],
  ["Ultra-Processed Food",          "Global", 450,   4.06,   1829,   "Monte Carlo ✓",   "Iron Law corrected"],
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

function Chapter9() {
  const [sortCol, setSortCol] = useState(4); // default sort by ΔW desc
  const [sortDir, setSortDir] = useState(-1);
  const sorted = [...NOTES_DOMAINS].sort((a, b) => sortDir * (a[sortCol] - b[sortCol]));
  const toggle = col => { if (sortCol===col) setSortDir(d => -d); else { setSortCol(col); setSortDir(-1); }};

  const globalCadj = GLOBAL_GDP_B - GLOBAL_DW_B;
  const usCadj = US_GDP_B - US_BURDEN_B;

  return (
    <div id="ch9">
      <ChapterHead num={9} title="Data & Methodology Notes" subtitle="Complete domain-level data, computation chain, scope classifications, and source discrepancies. All figures are auditable." time="reference" />

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
            ["VSL", REFORMED_VSL_B, "30.5%", "Mortality & morbidity. Value of statistical life. Welfare improvement — not a GDP flow.", RED],
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
            46 are paper-extracted. Proportions are conservative — e.g., tobacco VSL classified as welfare (not productivity),
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
          ["βW sources", "Monte Carlo = Monte Carlo simulation in published paper (primary). Paper = derived from paper text where DA7 extraction was overridden. DA7 = Document Analysis Field 7 (fallback). See discrepancy flags below."],
          ["US-specific classification", "6 domains classified US-only: Payday Lending, Private Prisons, Student Loans, Pharmacy Benefit Management, PE Healthcare, Ogallala Groundwater. Their ΔW deducts from US GDP only, not global."],
        ].map(([k,v]) => (
          <div key={k} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 12, padding: "10px 14px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
            <div style={{ fontFamily: M, fontSize: 11, color: GOLD }}>{k}</div>
            <div style={{ fontFamily: S, fontSize: 14, color: DIM }}>{v}</div>
          </div>
        ))}
      </div>

      {/* DISCREPANCY FLAGS */}
      <div style={{ fontFamily: M, fontSize: 12, color: RED, letterSpacing: 1, margin: "24px 0 12px" }}>⚠ DATA DISCREPANCIES — RESOLVED</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
        {[
          ["PFAS βW", "DA7 extraction: 5.31", "Paper value: 35.2", "CLAUDE.md confirmed list: 35.9. Paper is authoritative. DA7 value was from earlier paper version. ΔW updated from ~$991B → $6,574B."],
          ["AMR βW", "DA7 extraction: 5.84", "Paper value: 1.60 (weighted)", "Paper is authoritative. Marginal βW = 2.10. DA7 value was from earlier paper version. ΔW updated from ~$3,212B → $880B."],
          ["Proof-of-Stake ΔW", "Table value: $6B", "Correct: $37.7B (3.14×$12B)", "Arithmetic error in CLAUDE.md table. Corrected in totals here."],
          ["Gene Drives ΔW", "Table value: $8B", "Correct: $71.5B (5.77×$12.4B)", "Arithmetic error in CLAUDE.md table. Corrected in totals here."],
          ["Mining & Rare Earth", "Flagged ⚠ in CLAUDE.md", "βW×Π ratio inconsistency (factor 2.1)", "Unresolved. Using table ΔW=$322B as reported."],
          ["Monoculture βW", "This site: 7.36", "Tobacco paper cross-cite: 8.6", "Minor discrepancy. This site uses 7.36 (Monte Carlo verified, Iron Law corrected, Π=$340B). Tobacco paper cross-cite may reference older calibration."],
        ].map(([domain, old, correct, note]) => (
          <div key={domain} style={{ padding: "12px 16px", background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 4 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontFamily: M, fontSize: 12, color: RED, minWidth: 180 }}>{domain}</span>
              <span style={{ fontFamily: M, fontSize: 11, color: MUTED, textDecoration: "line-through" }}>{old}</span>
              <span style={{ fontFamily: M, fontSize: 11, color: GREEN }}>→ {correct}</span>
            </div>
            <div style={{ fontFamily: S, fontSize: 13, color: DIM }}>{note}</div>
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
              {[["Domain",0],["Scope",1],["Π ($B)",2],["βW",3],["ΔW ($B)",4],["Src",5],["Notes",6]].map(([h,col]) => (
                <th key={h} onClick={() => col<=4 && toggle(col)} style={{ fontSize: 9, color: col===sortCol ? GOLD : MUTED, letterSpacing: 2, padding: "8px 10px", textAlign: col>=2&&col<=4 ? "right" : "left", borderBottom: `1px solid ${BORDER}`, whiteSpace: "nowrap", cursor: col<=4 ? "pointer" : "default" }}>
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
                <td style={{ padding:"6px 10px", color: src.includes("⚠")||src==="Paper"?GOLD:MUTED, fontSize:10 }}>{src}</td>
                <td style={{ padding:"6px 10px", color: MUTED, fontSize: 10, fontFamily: S, maxWidth: 300 }}>{notes || "—"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: `2px solid ${BORDER}` }}>
              <td colSpan={2} style={{ padding:"10px", fontFamily:M, fontSize:11, color:GOLD }}>TOTALS</td>
              <td style={{ padding:"10px", textAlign:"right", color:MUTED, fontSize:11 }}>—</td>
              <td style={{ padding:"10px", textAlign:"right", color:MUTED, fontSize:11 }}>—</td>
              <td style={{ padding:"10px", textAlign:"right", color:RED, fontWeight:600, fontSize:13 }}>${(GLOBAL_DW_B/1000).toFixed(1)}T global + ${(US_SPECIFIC_DW_B/1000).toFixed(2)}T US-only</td>
              <td colSpan={2} style={{ padding:"10px", color:MUTED, fontSize:10 }}>Global scope deducted from $107T. US-only deducted from $29.2T.</td>
            </tr>
          </tfoot>
        </table>
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

    for (let i = 1; i <= 9; i++) {
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
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginBottom: 4 }}>TOTAL: ~25 MIN</div>
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
        <Chapter9 />

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
