import { useState } from "react";

// ══════════════════════════════════════════════════════════════
// ACADEMIC HUB — The Formal Architecture
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
const MUTED = "rgba(255,255,255,0.35)";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "rgba(255,255,255,0.55)";

// ─── FORMAL PROPOSITIONS ────────────────────────────────────
const PROPOSITIONS = [
  { id: "D1", type: "Definition", title: "System Welfare (W)",
    formal: "Let W: Ω → ℝ be a measurable function on the state space Ω of a shared system (market, commons, benchmark, ecosystem). W is system welfare if and only if W cannot be computed as a function of bilateral payoffs: W ≠ f(πᴬ, πᴮ) for any f: ℝ² → ℝ.",
    plain: "W measures whether the system — the market, the benchmark, the ecosystem, the commons — is healthy. The defining property: you cannot compute it from what A got and what B got. It is genuinely independent information. No amount of bilateral data can reconstruct it. That is the whole problem." },
  { id: "D2", type: "Definition", title: "System Beta (βW)",
    formal: "βW = −∂W/∂Π, where Π = πᴬ + πᴮ is the total bilateral payoff. βW measures the marginal rate of system welfare destruction per dollar of private gain.",
    plain: "How many dollars of system welfare does one dollar of private gain destroy? That is βW. Firearms is 50.99. Cybercrime is 31.10. Gig Economy is 0.76 — the lowest. Nuclear is 2.94. 61 domains, calibrated. The number does the work." },
  { id: "D3", type: "Definition", title: "Hollow Win",
    formal: "An outcome (c, a, b) = (0, 1, 1): both private parties gain (πᴬ > πᴬ₀, πᴮ > πᴮ₀) while the system degrades (ΔW < 0). The outcome is Pareto-improving in bilateral space and welfare-destructive in system space.",
    plain: "Both parties win. The system loses. Standard analysis calls this 'mutual gain' and moves on. It is not mutual gain. It is mutual extraction from a shared system that is collapsing. Every framework in negotiation theory classifies this identically to Win-Win-Win. That is the blindness the theorem exposes." },
  { id: "A1", type: "Axiom", title: "Overlapping Interests (PST-1)",
    formal: "∃ shared system C such that both A and B derive value from C: ∂πᴬ/∂W > 0 and ∂πᴮ/∂W > 0 for some range of W.",
    plain: "Both parties need the system to be healthy. The LIBOR traders needed the benchmark to be trusted. The VW dealers needed the emissions regime to be credible. They were destroying the thing they depended on. They did not know it." },
  { id: "A2", type: "Axiom", title: "System Independence (PST-2)",
    formal: "The bilateral payoff function Π(sᴬ, sᴮ) does not include W as an argument. Each party's strategy space and payoff computation are independent of system state.",
    plain: "The parties can compute their own payoffs without knowing what is happening to the system. Their spreadsheets do not have a 'system welfare' line item. This is not laziness — it is structure. The payoff function does not take W as an input. W is outside the space the deal lives in." },
  { id: "A3", type: "Axiom", title: "System Dependence (PST-3)",
    formal: "∃ feedback function η: ΔW → ΔΠ with η > 0, such that system degradation eventually reduces private payoffs: if ΔW < 0 persistently, then ∃ T* such that ΔΠ < 0 for t > T*.",
    plain: "The damage comes home. Degrade the system long enough and your own revenue collapses. T* is when. VW's T* was 6 years. Tobacco's was 45. The question is never whether. The question is when." },
  { id: "T1", type: "Theorem", title: "The Private Pareto Theorem (PPT)",
    formal: "Under PST-1, PST-2, and PST-3, for any bilateral game with βW > 1: no Nash equilibrium exists in which πᴬ > πᴬ₀, πᴮ > πᴮ₀, and ΔW ≥ 0 simultaneously. The cooperative surplus visible to bilateral analysis is temporally unstable with duration T* = δ/(ηλ).",
    plain: "Three axioms. One impossibility. If the axioms hold and β is above 1.0, there is no equilibrium where both parties gain and the system survives. Not with better negotiation. Not with better data. Not with a smarter algorithm. Structurally, constitutively, permanently — bilateral efficiency and system preservation are incompatible." },
  { id: "C1", type: "Corollary", title: "GDSS Blindness",
    formal: "All existing Group Decision Support Systems (INSPIRE, SmartSettle, Negoisst, GMCR) operate in the bilateral payoff space {πᴬ, πᴮ}. Under PST-2, no GDSS that monitors only bilateral payoffs can detect or prevent a Hollow Win outcome.",
    plain: "Every negotiation support system deployed today — INSPIRE, SmartSettle, Negoisst, GMCR — is structurally blind to system welfare. They optimize for the thing that produces Hollow Wins. The tool designed to help is constitutively incapable of detecting the problem." },
  { id: "C2", type: "Corollary", title: "Temporal Instability",
    formal: "For any Hollow Win with βW > 1, ∃ T* = δ/(ηλ) such that the outcome transitions from (0,1,1) to (0,0,0) or (0,0,1) or (0,1,0) at t = T*. The transition is discontinuous when η is threshold-dependent (regulatory enforcement, market collapse, legal liability).",
    plain: "Every Hollow Win has an expiration date. When it expires, the correction is not gradual. It is discontinuous — $35 billion in 48 hours for VW. The cooperative surplus was real. It was also temporary. T* is computable." },
  { id: "P1", type: "Proposition", title: "Monte Carlo Convergence",
    formal: "Under N = 10,000 independent draws with triangular, lognormal, and uniform channel distributions, the βW estimator converges to the population mean with standard error < 2% for all domains with 3+ channels.",
    plain: "10,000 draws. Seed = 42. Reproducible. The estimates are well-converged. The confidence intervals are reliable. A hostile referee who reruns the simulation with a different seed will get the same answer within the reported CI." },
  { id: "P2", type: "Proposition", title: "C-Adjusted GDP",
    formal: "GDP* = GDP − μ · Σᵢ Wᵢ, where Wᵢ = βWᵢ · Πᵢ is the welfare cost of domain i, and μ ∈ [0, 1] is the shadow price of welfare. At μ = 1.0 (full calibration), global GDP* ≈ GDP − $20T.",
    plain: "Subtract the welfare cost from GDP. At full calibration, approximately $20 trillion disappears. That is the Hollow Win embedded in the global economy. GDP counts every dollar — the cancer treatment, the lawsuit, the remediation. C-adjusted GDP stops counting the cost of the fire as output." },
];

// ─── FALSIFICATION ──────────────────────────────────────────
const FALSIFICATION = [
  { criterion: "Find a bilateral game satisfying PST-1, PST-2, and PST-3 with βW > 1 where a Nash equilibrium preserves W.",
    status: "OPEN", note: "This kills the theorem. The proof shows that system independence (PST-2) structurally excludes W from the bilateral optimization. If you can construct a game where it doesn't — where bilateral rationality somehow preserves a variable it cannot see — the theorem falls. I am asking you to try." },
  { criterion: "Demonstrate that W can be computed from bilateral payoffs (πᴬ, πᴮ) without additional information.",
    status: "OPEN", note: "This destroys PST-2. If system welfare is derivable from what the parties received, the whole architecture collapses. The LIBOR case is the canonical counterexample: the benchmark's integrity cannot be computed from any trader's P&L. But show me a domain where it can, and I will retract." },
  { criterion: "Identify a domain where all three PST axioms hold and βW < 1.",
    status: "FOUND", note: "Nuclear fission. βW = 0.53. All three axioms hold. βW is below 1.0. This does not falsify the theorem — it confirms it. The theorem says Hollow Wins occur when βW > 1. Nuclear is below the threshold. The framework correctly identifies the only domain where private activity creates net welfare benefit." },
  { criterion: "Show that a GDSS monitoring only bilateral payoffs successfully prevented a documented Hollow Win.",
    status: "OPEN", note: "This disproves Corollary C1. I have reviewed every published GDSS case study across INSPIRE, SmartSettle, Negoisst, and GMCR. None monitors system welfare. None prevented a Hollow Win. None could. The tool cannot detect the thing it was not designed to detect." },
  { criterion: "Demonstrate systematic bias in the Monte Carlo βW estimates.",
    status: "OPEN", note: "The simulation uses triangular, lognormal, and uniform distributions fitted to published source data. Every channel in every domain has cited sources. Sensitivity analysis shows floor effects — minimum βW under simultaneously hostile assumptions. If you can demonstrate that the channel distributions are systematically wrong, the calibration moves. The classification has not changed under any sensitivity test yet conducted." },
  { criterion: "Find an impossibility theorem in the canon (1-17) that subsumes or contradicts the PPT.",
    status: "OPEN", note: "Arrow addresses preference aggregation. Sen addresses rights versus efficiency. Myerson-Satterthwaite addresses bilateral trade under private information. The PPT addresses bilateral efficiency versus system welfare. Different axis. Different impossibility. If you can show that one of the 17 existing theorems already covers this result, I do not need an 18th." },
];

// ─── RESEARCH AGENDA ────────────────────────────────────────
const RESEARCH_AGENDA = [
  { area: "Theoretical Extensions",
    questions: [
      "The PPT is bilateral. Extend it to n parties. Supply chains have dozens of bilateral interactions, each potentially system-destructive. Does the impossibility compound, or does multi-party structure create escape routes?",
      "The Folk Theorem says patient agents can sustain cooperation. Does patience help against Hollow Wins? If agents are sufficiently patient, can a Hollow Win persist indefinitely — or does T* always arrive?",
      "PST-2 is sharp — W is fully independent of bilateral payoffs. Weaken it. Partial system independence — agents see 10% of W, or 50%. Does the impossibility survive? At what visibility threshold does it break?",
      "βW = 1.0 is a knife edge. Nuclear is 0.53 — below, net positive. Gene Drives is 42.5 — off the charts. What happens at β = 1.01? Is there a continuous version of the theorem, or is the threshold genuinely discontinuous?",
    ]},
  { area: "Empirical Calibration",
    questions: [
      "61 domains calibrated and published. All 22 Impossibility and 39 Intractability theorems have formal proofs, Monte Carlo simulations, and falsification bounties. The pipeline of additional domains remains open — suggest new ones.",
      "Can βW be estimated from market data alone — event studies around regulatory announcements, litigation outcomes, enforcement actions — rather than from channel decomposition? A revealed-preference βW would be powerful.",
      "Cross-domain coupling: coal combustion (β = 6.95) acidifies oceans, which destroys fisheries (β = 4.70). PFAS (β = 5.31) contaminates water (β = 5.61). Do coupled domains have additive or multiplicative βW?",
      "Temporal dynamics: how does βW change as regulation tightens, technology shifts, or system damage accumulates? Is Bitcoin's β = 5.00 stable, or is it trending as the halving cycle reduces mining rewards?",
    ]},
  { area: "Mechanism Design",
    questions: [
      "The three GDSS requirements — R1 (independent W-channel), R2 (decomposed payoffs), R3 (trajectory detection) — are derived from the theorem. Build one. What does a W-aware SmartSettle look like? What does it cost?",
      "Optimal Pigouvian tax for a Hollow Win domain: is it τ = βW × Π, or does the non-linearity of system damage — the step function at T* — require a different functional form?",
      "Partial mechanisms: can you reduce βW without eliminating it? A policy that moves Bitcoin from β = 5.0 to β = 2.5 still leaves a Hollow Win, but cuts the welfare cost in half. Is partial reduction welfare-improving, or does it just extend T*?",
      "The Conflictoring protocol — the 8-step diagnostic for identifying and resolving Hollow Wins — has not been tested experimentally. Run the experiment. What is the compliance rate? Does it work?",
    ]},
  { area: "Political Economy",
    questions: [
      "Tobacco's T* was 45 years. What determines T*? Lobbying ($880M for opioids over two decades), manufactured doubt, regulatory capture, geographic arbitrage. Is T*-extension itself a quantifiable investment with measurable ROI?",
      "Does the PPT guarantee eventual correction, or can sufficiently powerful actors sustain a Hollow Win indefinitely? Is there a political equilibrium where the system degrades forever? The thermodynamic theorems suggest no — the C-F bond sets a floor that politics cannot override.",
      "International coordination: the Montreal Protocol worked (ozone). The Paris Agreement has not (climate). What structural features distinguish successful commons governance from unsuccessful? The PPT predicts bilateral agreements fail. Treaty architecture must break PST.",
    ]},
  { area: "Interdisciplinary",
    questions: [
      "Is the Hollow Win → collapse transition a phase transition in the complex-systems sense? Is T* related to critical slowing down? If so, early-warning signals from complexity science (rising autocorrelation, variance increase) could detect approaching T*.",
      "Evolutionary biology: is the Hollow Win an evolutionary trap? Organisms that over-exploit their environment collapse when carrying capacity is exceeded. The analogy is structural, not metaphorical — can evolutionary game theory formalize the dynamics?",
      "Thermodynamics: the domain theorems invoke physical constants — C-F bond energy, radioactive decay rates, pedogenesis. The floor is thermodynamic. Is there a thermodynamic formulation of the PPT? Can entropy production provide a W-channel?",
      "Accounting standards: can SAPM calibrations be integrated into IFRS or GAAP as supplementary welfare-adjusted metrics? The precedent is carbon accounting. The extension is βW-weighted revenue reporting.",
    ]},
];

// ─── METHODOLOGY ────────────────────────────────────────────
const METHODOLOGY = [
  { title: "Monte Carlo Simulation",
    params: [
      "N = 10,000 draws per domain",
      "Seed = 42 — reproducible, deterministic",
      "Channel distributions: triangular (bounded parameters), lognormal (right-skewed costs), uniform (maximum ignorance)",
      "Parameters fitted to published source data — peer-reviewed where available, agency reports and industry disclosures where not",
      "Output: βW point estimate, 5th/95th percentile CI, per-channel contributions, aggregate welfare cost in $B/year",
    ],
    validation: "Each domain dashboard has a Methods tab with per-channel source citations. Every number is traceable. Sensitivity analysis shows βW floor under simultaneously conservative assumptions — the hostile-referee scenario. In no domain tested has conservative respecification changed the classification.",
    selfLaceration: "The channel distributions are fitted, not derived from first principles. A lognormal fitted to three data points (5th, 50th, 95th percentile) is an assumption, not a measurement. The assumption is explicit. The alternative — not computing βW at all — is worse." },
  { title: "βW Computation",
    params: [
      "βW = W / Π = (Σ channel welfare costs) / (total private payoff)",
      "W = Σᵢ wᵢ, where wᵢ is the annual welfare cost of channel i",
      "Π = total annual private payoff (revenue, profit, or market size — domain-specific definition, always stated)",
      "Each wᵢ estimated from 3-point range (low, mid, high) fitted to source data",
    ],
    validation: "βW is dimensionless — dollars of welfare cost per dollar of private gain. Cross-domain comparability is ensured by consistent methodology. The ratio, not the absolute cost, is the measurement.",
    selfLaceration: "The denominator (Π) varies by domain — sometimes revenue, sometimes profit, sometimes market size. This is a choice, stated and justified per domain. A hostile referee can recompute with a different denominator. In the Bitcoin paper, the steelman uses the most generous Π available. Classification unchanged." },
  { title: "T* Estimation",
    params: [
      "T* = δ / (η × λ)",
      "δ = cumulative private surplus ($)",
      "η = feedback coupling (dimensionless, 0 to 1) — the fraction of system damage that feeds back through regulatory, legal, or reputational channels",
      "λ = annual system welfare loss rate ($/year)",
    ],
    validation: "Validated against VW Dieselgate: T* predicted ≈ 8 years, observed = 6 years. The stochastic extension (Proposition 18a) models T* as a first-passage time with heavy left tail — catastrophic early crossover is always possible.",
    selfLaceration: "η is the hardest parameter to estimate. It depends on regulatory enforcement intensity, legal liability regime, and reputational sensitivity — all of which are jurisdiction-specific and time-varying. The VW calibration works. Generalization to other domains requires domain-specific η estimation." },
  { title: "C-Adjusted GDP",
    params: [
      "GDP* = GDP − μ · Σᵢ βWᵢ · Πᵢ",
      "μ = shadow price of welfare — default μ = 0.15 (conservative), range [0, 1]",
      "Aggregation over 190+ countries using World Bank GDP data",
      "Domain-level welfare costs allocated by country using production and consumption shares",
    ],
    validation: "Country-level allocations use best-available production/consumption data. The c-adjusted-gdp.vercel.app dashboard provides interactive country-level analysis.",
    selfLaceration: "Country-level domain allocation is approximate. Not all domains have country-level decomposition. The global aggregate ($20T at μ = 1.0) is better-estimated than individual country figures. The uncertainty is about allocation, not about the aggregate sign." },
];

const TABS = [
  { id: "propositions", label: "Propositions" },
  { id: "falsification", label: "Falsification" },
  { id: "methodology", label: "Methodology" },
  { id: "agenda", label: "Research Agenda" },
  { id: "citation", label: "Citation" },
];

export default function AcademicHub() {
  const [tab, setTab] = useState("propositions");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
      <main style={{ flex: 1, maxWidth: 900, padding: "0 32px 80px", margin: "0 auto" }}>
        <div style={{ paddingTop: 72, marginBottom: 32 }}>
          <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 3, marginBottom: 8 }}>ACADEMIC HUB</div>
          <h1 style={{ fontFamily: S, fontSize: 32, fontWeight: 300, color: TEXT, margin: 0 }}>
            The Formal Architecture
          </h1>
          <div style={{ fontFamily: S, fontSize: 20, color: DIM, marginTop: 12, lineHeight: 1.7, fontStyle: "italic" }}>
            Three axioms. One impossibility. Sixty-one calibrated domains. 22 Impossibility Theorems. 39 Intractability Theorems. Here is the machinery — definitions, axioms, theorems, corollaries. Here is how to break it.
          </div>
          <div style={{ fontFamily: M, fontSize: 14, color: MUTED, marginTop: 12 }}>
            Postnieks, E. (2026). 73 Working Papers &middot; 62 Theorems &middot; SAPM Program.
          </div>
        </div>

        {/* TABS */}
        <nav style={{ borderBottom: `1px solid ${BORDER}`, marginBottom: 24, display: "flex", gap: 0, overflowX: "auto" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              fontFamily: M, fontSize: 15, padding: "12px 16px", border: "none", cursor: "pointer",
              background: tab === t.id ? "rgba(245,158,11,0.08)" : "transparent",
              color: tab === t.id ? GOLD : MUTED,
              borderBottom: tab === t.id ? `2px solid ${GOLD}` : "2px solid transparent",
              transition: "all 0.2s", whiteSpace: "nowrap",
            }}>{t.label}</button>
          ))}
        </nav>

        {/* ═══ PROPOSITIONS ═══ */}
        {tab === "propositions" && (
          <div>
            {PROPOSITIONS.map(p => {
              const typeColor = p.type === "Theorem" ? RED : p.type === "Axiom" ? GOLD : p.type === "Corollary" ? GREEN : DIM;
              return (
                <div key={p.id} style={{ marginBottom: 16, padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, borderLeft: `3px solid ${typeColor}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div>
                      <span style={{ fontFamily: M, fontSize: 14, color: typeColor, letterSpacing: 1 }}>{p.type.toUpperCase()}</span>
                      <span style={{ fontFamily: M, fontSize: 14, color: MUTED, marginLeft: 8 }}>{p.id}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: M, fontSize: 18, color: TEXT, fontWeight: 600, marginBottom: 12 }}>{p.title}</div>

                  <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 4, marginBottom: 12 }}>
                    <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 6 }}>FORMAL</div>
                    <div style={{ fontFamily: M, fontSize: 15, color: DIM, lineHeight: 1.8 }}>{p.formal}</div>
                  </div>

                  <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.8 }}>{p.plain}</div>
                </div>
              );
            })}

            <div style={{ padding: "20px 24px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 4, marginTop: 24 }}>
              <div style={{ fontFamily: S, fontSize: 20, color: GOLD, lineHeight: 1.8, fontStyle: "italic", textAlign: "center" }}>
                Seventeen impossibility theorems preceded this one. Arrow (1951). Sen (1970). Myerson-Satterthwaite (1983). Man-Takayama (2013). Eight Nobel Prizes among the authors. None addressed bilateral efficiency versus system welfare. The PPT is the 18th. The 61 domain theorems that follow it are the 19th through 79th.
              </div>
            </div>
          </div>
        )}

        {/* ═══ FALSIFICATION ═══ */}
        {tab === "falsification" && (
          <div>
            <div style={{ padding: "16px 20px", background: "rgba(239,68,68,0.04)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4, marginBottom: 24 }}>
              <div style={{ fontFamily: S, fontSize: 20, color: TEXT, lineHeight: 1.8 }}>
                A theorem that cannot be falsified is not a theorem — it is a belief. Below are six ways to kill this one. I am asking you to try.
              </div>
            </div>

            {FALSIFICATION.map((f, i) => (
              <div key={i} style={{ marginBottom: 16, padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, borderLeft: `3px solid ${f.status === "FOUND" ? GREEN : GOLD}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: M, fontSize: 14, color: GOLD }}>CRITERION {i + 1}</span>
                  <span style={{ fontFamily: M, fontSize: 13, color: f.status === "FOUND" ? GREEN : MUTED, padding: "2px 8px", background: f.status === "FOUND" ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.03)", borderRadius: 3 }}>
                    {f.status}
                  </span>
                </div>
                <div style={{ fontFamily: S, fontSize: 18, color: TEXT, lineHeight: 1.8, marginBottom: 10 }}>{f.criterion}</div>
                <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7 }}>{f.note}</div>
              </div>
            ))}

            <div style={{ padding: "20px 24px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 4, marginTop: 24 }}>
              <div style={{ fontFamily: S, fontSize: 19, color: GOLD, lineHeight: 1.8, fontStyle: "italic", textAlign: "center" }}>
                The theorem attacks itself harder than any reviewer will. Every limitation is stated before anyone else can find it. Every sensitivity test is published. If the theorem survives the hostile referee, it deserves to.
              </div>
            </div>
          </div>
        )}

        {/* ═══ METHODOLOGY ═══ */}
        {tab === "methodology" && (
          <div>
            <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.8, marginBottom: 24 }}>
              Everything below is reproducible. Seed = 42. Source citations per channel per domain. The simulation code runs in Python. The numbers are printed. Here is how they were computed — and here is what could be wrong with them.
            </div>

            {METHODOLOGY.map(m => (
              <div key={m.title} style={{ marginBottom: 20, padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                <div style={{ fontFamily: M, fontSize: 18, color: GOLD, fontWeight: 600, marginBottom: 12 }}>{m.title}</div>
                <div style={{ fontFamily: M, fontSize: 13, color: MUTED, letterSpacing: 1, marginBottom: 8 }}>PARAMETERS</div>
                {m.params.map((p, i) => (
                  <div key={i} style={{ fontFamily: M, fontSize: 14, color: DIM, lineHeight: 1.8, paddingLeft: 12, borderLeft: `2px solid ${BORDER}`, marginBottom: 4 }}>
                    {p}
                  </div>
                ))}
                <div style={{ fontFamily: M, fontSize: 13, color: GREEN, letterSpacing: 1, marginTop: 12, marginBottom: 4 }}>VALIDATION</div>
                <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7, marginBottom: 12 }}>{m.validation}</div>
                <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.04)", border: `1px solid rgba(239,68,68,0.1)`, borderRadius: 4 }}>
                  <div style={{ fontFamily: M, fontSize: 13, color: RED, letterSpacing: 1, marginBottom: 4 }}>SELF-LACERATION</div>
                  <div style={{ fontFamily: S, fontSize: 17, color: "rgba(239,68,68,0.7)", lineHeight: 1.7 }}>{m.selfLaceration}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ RESEARCH AGENDA ═══ */}
        {tab === "agenda" && (
          <div>
            <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.8, marginBottom: 24 }}>
              The theorem opens more questions than it closes. These are the ones I cannot answer alone. Contributions, counterexamples, and extensions are welcome. Especially counterexamples.
            </div>

            {RESEARCH_AGENDA.map(area => (
              <div key={area.area} style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: M, fontSize: 17, color: GOLD, letterSpacing: 2, marginBottom: 12 }}>{area.area.toUpperCase()}</div>
                {area.questions.map((q, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, padding: "12px 16px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                    <span style={{ fontFamily: M, fontSize: 14, color: GOLD, flexShrink: 0, marginTop: 2 }}>Q{i + 1}</span>
                    <span style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.8 }}>{q}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ═══ CITATION ═══ */}
        {tab === "citation" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>PRIMARY PAPER</div>
              <div style={{ padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                <div style={{ fontFamily: S, fontSize: 19, color: TEXT, lineHeight: 1.8 }}>
                  Postnieks, E. (2026). "The Private Pareto Theorem: An Impossibility Result for Bilateral Welfare Preservation." Working Paper.
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>BibTeX</div>
              <div style={{ padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                <pre style={{ fontFamily: M, fontSize: 14, color: DIM, lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap" }}>{`@article{postnieks2026ppt,
  title={The Private Pareto Theorem: An Impossibility Result for Bilateral Welfare Preservation},
  author={Postnieks, Erik},
  year={2026},
  note={Working Paper}
}`}</pre>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>THE CANON — 17 IMPOSSIBILITY THEOREMS IN ECONOMICS</div>
              <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.8, marginBottom: 16 }}>
                The Private Pareto Theorem is the 18th. The first 17 span 228 years — from Condorcet (1785) to Man-Takayama (2013). Eight Nobel Prizes among the authors. Arrow, Sen, Hurwicz, Myerson, Roth, Holmström. Every one of them proved that some desirable combination of properties is impossible under minimal axioms. None addressed bilateral efficiency versus system welfare. That is what the 18th does.
              </div>
              {[
                "Arrow, K. J. (1951). Social Choice and Individual Values. Wiley.",
                "Sen, A. K. (1970). The Impossibility of a Paretian Liberal. JPE 78(1).",
                "Myerson, R. B. & Satterthwaite, M. A. (1983). Efficient mechanisms for bilateral trading. JET 29(2).",
                "Kuznets, S. (1934). National Income, 1929–1932. US GPO.",
                "Stiglitz, J. E., Sen, A. & Fitoussi, J.-P. (2009). Report by the Commission on the Measurement of Economic Performance and Social Progress.",
                "Sharpe, W. F. (1964). Capital Asset Prices: A Theory of Market Equilibrium. JoF 19(3).",
                "Nash, J. F. (1950). The Bargaining Problem. Econometrica 18(2).",
                "Calvano, E. et al. (2020). Artificial Intelligence, Algorithmic Pricing, and Collusion. AER 110(10).",
              ].map((cite, i) => (
                <div key={i} style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.8, paddingLeft: 16, borderLeft: `2px solid ${BORDER}`, marginBottom: 6 }}>
                  {cite}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "32px 0", borderTop: `1px solid ${BORDER}`, marginTop: 48, textAlign: "center" }}>
          <div style={{ fontFamily: M, fontSize: 12, color: MUTED }}>
            © 2026 Erik Postnieks · SAPM Program
          </div>
        </div>
      </main>
    </div>
  );
}
