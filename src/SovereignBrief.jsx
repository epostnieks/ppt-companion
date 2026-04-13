import { useState } from "react";

// ══════════════════════════════════════════════════════════════
// SOVEREIGN BRIEF — National & International Policy Analysis
// For heads of state, ministries, central banks, and int'l bodies
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
const BLUE = "#3B82F6";
const MUTED = "rgba(255,255,255,0.35)";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "rgba(255,255,255,0.55)";

// ─── COUNTRY DATA (illustrative, from c-adjusted GDP) ───────
const COUNTRIES = [
  { name: "United States", gdp: 28700, cAdj: 22900, delta: 5800, pctLoss: 20.2, topDomains: ["Oil & Gas","UPF","Tobacco","Big Tech","PFAS","PBM","Opioids"] },
  { name: "China", gdp: 18500, cAdj: 14200, delta: 4300, pctLoss: 23.2, topDomains: ["Coal","Cement","Industrial Monoculture","PFAS","Rare Earth (POPs)","Big Tech"] },
  { name: "European Union", gdp: 18700, cAdj: 15800, delta: 2900, pctLoss: 15.5, topDomains: ["Oil & Gas","Aviation","Coal","UPF","Palm Oil (imports)","Tobacco"] },
  { name: "India", gdp: 4100, cAdj: 3100, delta: 1000, pctLoss: 24.4, topDomains: ["Coal","Tobacco","Topsoil Erosion","UPF","Water Privatization","Monoculture"] },
  { name: "Japan", gdp: 4400, cAdj: 3700, delta: 700, pctLoss: 15.9, topDomains: ["Coal","PFAS","Fisheries","Tobacco","UPF","CRE"] },
  { name: "Germany", gdp: 4500, cAdj: 3900, delta: 600, pctLoss: 13.3, topDomains: ["Coal (Lignite)","Oil & Gas","Cement","Aviation","UPF","PFAS"] },
  { name: "United Kingdom", gdp: 3500, cAdj: 2900, delta: 600, pctLoss: 17.1, topDomains: ["Oil & Gas","Gambling","Tobacco","UPF","CRE","Big Tech"] },
  { name: "Brazil", gdp: 2200, cAdj: 1700, delta: 500, pctLoss: 22.7, topDomains: ["Palm Oil/Soy Deforestation","Monoculture","Topsoil","Oil & Gas","Tobacco"] },
  { name: "Indonesia", gdp: 1400, cAdj: 950, delta: 450, pctLoss: 32.1, topDomains: ["Palm Oil","Coal","Tobacco","Monoculture","Fisheries","Deep-Sea Mining"] },
  { name: "Russia", gdp: 2100, cAdj: 1400, delta: 700, pctLoss: 33.3, topDomains: ["Oil & Gas","Coal","Arms Exports","Tobacco","PFAS","Nuclear"] },
  { name: "Saudi Arabia", gdp: 1100, cAdj: 500, delta: 600, pctLoss: 54.5, topDomains: ["Oil & Gas (dominant)","Cement","Water","UPF"] },
  { name: "Australia", gdp: 1700, cAdj: 1300, delta: 400, pctLoss: 23.5, topDomains: ["Coal Exports","Oil & Gas","PFAS","Mining (general)","Monoculture"] },
  { name: "Nigeria", gdp: 470, cAdj: 310, delta: 160, pctLoss: 34.0, topDomains: ["Oil & Gas","Monoculture","Topsoil","Tobacco","UPF"] },
  { name: "South Korea", gdp: 1800, cAdj: 1500, delta: 300, pctLoss: 16.7, topDomains: ["Coal","PFAS","Cement","Gambling","UPF","Big Tech"] },
  { name: "Canada", gdp: 2200, cAdj: 1800, delta: 400, pctLoss: 18.2, topDomains: ["Oil Sands","Coal","PFAS","Monoculture","Fisheries","Mining"] },
];

// ─── INTERNATIONAL COORDINATION ──────────────────────────────
const TREATIES = [
  { name: "Montreal Protocol (1987)", domain: "Ozone-Depleting Substances (chemicals that destroy the atmospheric ozone layer)", status: "Success", coverage: "Universal (198 parties)",
    lesson: "The gold standard. Universal participation, binding targets, trade sanctions for defectors, a dedicated funding mechanism. It worked because the conditions were ideal: substitutes existed, the industry was concentrated, the science was unambiguous, and the United States led. None of those conditions hold for most Hollow Win domains — which is why the Protocol is a ceiling, not a floor.",
    applicability: "Direct model for PFAS — class-wide production ban with transition funding. Adaptable for Gene Drives — moratorium structure. Less applicable to domains with diffuse production. You cannot Montreal-Protocol your way out of coal." },
  { name: "Stockholm Convention (2001)", domain: "Persistent Organic Pollutants", status: "Partial Success", coverage: "186 parties (not US)",
    lesson: "Successfully listed and phased out 34 persistent organic pollutants (POPs) — DDT (a pesticide), polychlorinated biphenyls (PCBs, industrial chemicals), and dioxins (toxic byproducts of combustion). The listing process takes 7–10 years per compound. The United States signed but never ratified. PFAS listing is underway but industry resistance is fierce. The Convention demonstrates that persistent chemical governance is achievable. It also demonstrates that achievable and fast are not the same word.",
    applicability: "Direct model for POPs Beyond PFAS. The listing architecture works — the carbon-fluorine bond does not negotiate with legislators any more than it negotiates with enzymes. The bottleneck is political will, not scientific uncertainty." },
  { name: "Paris Agreement (2015)", domain: "Climate (Coal, Oil & Gas, Aviation, Cement)", status: "Insufficient", coverage: "Nearly universal",
    lesson: "Voluntary pledges without enforcement. The 1.5°C target requires emission pathways that no major emitter's Nationally Determined Contribution (NDC) reflects. No carbon price coordination. No fossil fuel phase-out language — the word 'fossil' did not appear in a COP final text until Glasgow, 2021. The architecture of voluntary bilateral agreements cannot solve a Hollow Win. The theorem predicts this: bilateral optimization between nations maximizes bilateral payoffs — economic growth — while the system degrades as a structural byproduct. Paris is a coordination exercise that produced coordination failure.",
    applicability: "Demonstrates the failure mode the PPT predicts. Every domain with diffuse international production and bilateral negotiation structure will reproduce this result. The fix is not more ambitious pledges. The fix is enforcement architecture." },
  { name: "Arms Trade Treaty (2013)", domain: "Arms Exports", status: "Weak", coverage: "113 parties (not US, Russia, China)",
    lesson: "The three largest arms exporters either did not ratify or did not sign. Reporting requirements are voluntary. The Treaty is a case study in what happens when the players whose defection matters most are the ones who defect. The PPT explains the mechanism: each exporter's bilateral calculation — private payoff from the sale — does not include the system variable — regional stability, conflict casualties, displaced populations. PST-2 holds at the international level.",
    applicability: "The failure here is structural, not diplomatic. Arms exports are a Hollow Win with β\u1D42 = 2.54. No voluntary framework will solve this. The question is whether a trade-sanctions enforcement mechanism — Montreal Protocol style — is politically achievable for weapons. The honest answer: not yet." },
  { name: "World Trade Organization (WTO) Fisheries Subsidies Agreement (2022)", domain: "Global Fisheries", status: "New", coverage: "WTO members",
    lesson: "The first WTO agreement to address environmental subsidy harm. Bans subsidies for illegal, unreported, and unregulated (IUU) fishing and overfishing of overfished stocks. Major exception: developing country exemptions. No mechanism addresses climate forcing on fish stocks. The Agreement demonstrates that subsidy reform is achievable through trade architecture — a significant precedent.",
    applicability: "Model for other domains where government subsidies drive Hollow Wins. Fossil fuel subsidies are the obvious target — $7 trillion globally in 2022, per the International Monetary Fund. The WTO demonstrated that the mechanism works. The question is whether anyone will use it." },
];

// ─── GAME THEORY OF INTERNATIONAL COORDINATION ──────────────
const COORDINATION = [
  { scenario: "First-Mover Advantage",
    description: "The first country to adopt W-monitoring and publish C-adjusted GDP as a supplementary national account gains four things at once: early regulatory framework development, industry transition with a longer runway, competitive advantage in attracting W-aware capital, and reduced system risk exposure. This is not speculative. The EU has done it four times already.",
    examples: "The Digital Markets Act. The Deforestation Regulation. The PFAS restriction proposal. The Platform Work Directive. In each case, the EU's regulatory framework became the de facto global standard — what Bradford (2020) calls the Brussels Effect. First-mover regulatory advantage is not a theory. It is a documented pattern." },
  { scenario: "Free-Rider Problem",
    description: "The standard objection to unilateral regulation: if one country regulates a Hollow Win domain and others do not, production relocates to unregulated jurisdictions. Carbon leakage. Regulatory arbitrage. The objection is real. It is also temporary.",
    counter: "The PPT predicts that free-riding extends T* but does not prevent correction. Carbon leakage does not reduce global emissions — it moves them. PFAS contamination is global regardless of which jurisdiction manufactures the compounds. The carbon-fluorine bond does not respect borders. Neither does the atmosphere. Free-riding delays the inevitable. It does not change the inevitable." },
  { scenario: "Coordination Game",
    description: "International Hollow Win governance is a coordination game, not a prisoner's dilemma. That distinction matters. In a prisoner's dilemma, each player prefers to defect regardless of what the other does. In a coordination game, all parties prefer mutual regulation to mutual inaction. The barrier is coordination, not incentive.",
    evidence: "The Montreal Protocol proves this. Once coordination was achieved — with trade sanctions for non-compliance — universal participation followed. The ozone hole is healing. The problem was never that countries wanted to destroy the ozone layer. The problem was that bilateral optimization — chlorofluorocarbons (CFCs) are cheap and effective — produced system destruction as a structural byproduct. Sound familiar? It should. That is the Private Pareto Theorem." },
  { scenario: "Asymmetric Exposure",
    description: "Countries differ dramatically in their Hollow Win concentration. Saudi Arabia's GDP is 54.5% Hollow Win — Oil & Gas dominant. Indonesia is 32.1% — Palm Oil plus Coal. Germany is 13.3% — more diversified, lower exposure. Transition costs are inversely proportional to economic diversification. This is arithmetic, not opinion.",
    implication: "Any international framework that ignores asymmetric exposure will fail. High-concentration countries will block coordination because the transition cost is existential — not metaphorically, but literally. Saudi Arabia cannot transition away from oil on a five-year timeline. The Montreal Protocol solved this with the Multilateral Fund: transition funding for developing countries. That model is required here. Without it, the countries with the most to lose will veto the countries with the most to gain." },
  { scenario: "China's Position",
    description: "China is the world's largest producer in several high-β\u1D42 domains: coal (β\u1D42 = 6.95), cement (β\u1D42 = 6.74), PFAS (β\u1D42 = 5.31), rare earth processing. China's C-adjusted GDP loss is approximately 23% — $4.3 trillion of its $18.5 trillion GDP is Hollow Win output.",
    opportunity: "China's 14th Five-Year Plan already targets coal peak by 2030 and carbon neutrality by 2060. SAPM calibration provides quantitative backing for those targets — not environmentalist rhetoric, but balance-sheet arithmetic. C-adjusted GDP reframes China's transition narrative from sacrifice to correction. The message writes itself: 'We are not sacrificing growth. We are eliminating the $4.3 trillion illusion in our GDP.' That is a message Beijing can use. And it has the advantage of being true." },
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "countries", label: "Countries" },
  { id: "treaties", label: "Treaties" },
  { id: "coordination", label: "Coordination" },
  { id: "adoption", label: "Adoption Path" },
];

export default function SovereignBrief() {
  const [tab, setTab] = useState("overview");
  const [sortCountries, setSortCountries] = useState("delta");

  const sortedCountries = [...COUNTRIES].sort((a, b) => {
    if (sortCountries === "delta") return b.delta - a.delta;
    if (sortCountries === "pct") return b.pctLoss - a.pctLoss;
    if (sortCountries === "gdp") return b.gdp - a.gdp;
    return 0;
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
      <main style={{ flex: 1, maxWidth: 1000, padding: "0 32px 80px", margin: "0 auto" }}>
        <div style={{ paddingTop: 48, marginBottom: 32 }}>
          <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 3, marginBottom: 8 }}>SOVEREIGN BRIEF</div>
          <h1 style={{ fontFamily: S, fontSize: 32, fontWeight: 300, color: TEXT, margin: 0 }}>
            Your GDP Is Lying to You
          </h1>
          <div style={{ fontFamily: M, fontSize: 15, color: MUTED, marginTop: 8 }}>
            National strategy & international coordination for heads of state, ministers, and central banks
          </div>
          <div style={{ fontFamily: M, fontSize: 14, color: DIM, marginTop: 4 }}>
            Erik Postnieks · © 2026
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

        {/* ═══ OVERVIEW ═══ */}
        {tab === "overview" && (
          <div>
            <div style={{ padding: "20px 24px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 4, marginBottom: 32 }}>
              <div style={{ fontFamily: S, fontSize: 18, color: GOLD, lineHeight: 1.8, fontStyle: "italic" }}>
                Global GDP is approximately $105 trillion. Approximately $20 trillion of that — 19% — is Hollow Win output: private gain that destroys the systems it depends on. C-adjusted GDP subtracts this. What remains is the actual productive capacity of the global economy. The number your ministry reports to the IMF is not that number.
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 32 }}>
              {[
                { label: "GLOBAL GDP", value: "$105T", color: DIM },
                { label: "HOLLOW WIN OUTPUT", value: "~$20T", color: RED },
                { label: "C-ADJUSTED GDP", value: "~$85T", color: GREEN },
                { label: "HOLLOW WIN SHARE", value: "~19%", color: GOLD },
              ].map(s => (
                <div key={s.label} style={{ padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                  <div style={{ fontFamily: M, fontSize: 13, color: MUTED, letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontFamily: M, fontSize: 28, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: M, fontSize: 17, color: GOLD, letterSpacing: 2, marginBottom: 12 }}>THE SOVEREIGN CASE</div>

            {[
              { title: "GDP Counts Destruction as Production",
                content: "GDP counts every transaction with a positive sign. Cancer treatment from industrial pollution counts. Remediation of PFAS-contaminated aquifers counts. Legal fees from financial fraud count. LIBOR manipulation added $12.3 billion to GDP — the bonuses, the legal fees, the compliance overhauls, all of it registered as economic activity. A nation that measures its economy by GDP alone cannot distinguish production from destruction. It is flying a $28 trillion aircraft with a broken altimeter." },
              { title: "C-Adjusted GDP Is the Instrument That Works",
                content: "C-adjusted GDP — GDP* = GDP − μ·Σβ\u1D42·Π — subtracts the welfare cost of system-degrading activity. The subtraction is not subjective. It uses Monte Carlo-calibrated β\u1D42 values derived from channel-level data — 10,000 draws per domain, seed = 42, reproducible by any competent statistician. At μ = 0.15 (conservative), the global adjustment is approximately $3 trillion. At full calibration (μ = 1.0), it is approximately $20 trillion. The number is large. The number is also correct." },
              { title: "Early Adoption Is Competitive Advantage",
                content: "The first country to publish C-adjusted GDP as a supplementary national account will attract W-aware capital, develop regulatory frameworks before trading partners can react, position domestic industries for transition with maximum runway, and gain credibility in international negotiations by leading with arithmetic rather than rhetoric. The EU has demonstrated this pattern four times — DMA, EUDR, PFAS restrictions, Platform Work Directive. In each case, Brussels set the standard and the world followed. The next standard to set is GDP*." },
              { title: "The Alternative Is Discontinuous Correction",
                content: "Every Hollow Win domain has a T* — a crossover time after which system damage feeds back and destroys private payoffs. Countries that wait for T* do not experience gradual adjustment. They experience discontinuous correction: financial crises, environmental disasters, public health emergencies, infrastructure failures. Silicon Valley Bank (SVB) collapsed in 48 hours. The opioid crisis killed 600,000 Americans before the correction arrived. Volkswagen lost $30 billion in market capitalization in two weeks. Countries that manage the transition proactively convert a discontinuity into a gradient. Countries that wait get the discontinuity." },
            ].map(s => (
              <div key={s.title} style={{ marginBottom: 16, padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                <div style={{ fontFamily: M, fontSize: 17, color: TEXT, fontWeight: 600, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.8 }}>{s.content}</div>
              </div>
            ))}

            {/* Self-laceration block */}
            <div style={{ padding: "16px 20px", background: "rgba(239,68,68,0.06)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4, marginTop: 24 }}>
              <div style={{ fontFamily: M, fontSize: 13, color: RED, letterSpacing: 1, marginBottom: 6 }}>WHAT THIS BRIEF DOES NOT DO</div>
              <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.8 }}>
                This brief does not prescribe policy. It does not tell any country what to regulate, how fast to transition, or which industries to subsidize. It provides a diagnostic instrument — β<sub>W</sub> calibration — and a corrected metric — GDP*. What a sovereign government does with that instrument is a political decision. The author has no vote in your parliament. He has arithmetic. The arithmetic is available to anyone who wants it.
              </div>
            </div>
          </div>
        )}

        {/* ═══ COUNTRIES ═══ */}
        {tab === "countries" && (
          <div>
            <div style={{ fontFamily: M, fontSize: 14, color: MUTED, letterSpacing: 1, marginBottom: 16 }}>
              COUNTRY-LEVEL C-ADJUSTED GDP (ILLUSTRATIVE, $B)
            </div>

            <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED, padding: "6px 0" }}>SORT:</span>
              {[["delta","HOLLOW WIN $"],["pct","% LOSS"],["gdp","GDP"]].map(([k,l]) => (
                <button key={k} onClick={() => setSortCountries(k)} style={{
                  fontFamily: M, fontSize: 13, padding: "6px 12px", border: `1px solid ${sortCountries === k ? GOLD : BORDER}`,
                  background: sortCountries === k ? "rgba(245,158,11,0.1)" : "transparent",
                  color: sortCountries === k ? GOLD : MUTED, borderRadius: 3, cursor: "pointer",
                }}>{l}</button>
              ))}
            </div>

            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "180px 90px 90px 90px 70px 1fr", padding: "8px 12px", borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>COUNTRY</span>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>GDP</span>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>GDP*</span>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>Δ (LOSS)</span>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>%</span>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>TOP DOMAINS</span>
            </div>

            {sortedCountries.map((c, i) => (
              <div key={c.name} style={{
                display: "grid", gridTemplateColumns: "180px 90px 90px 90px 70px 1fr",
                padding: "10px 12px", alignItems: "center",
                background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                borderLeft: `3px solid ${c.pctLoss >= 30 ? RED : c.pctLoss >= 20 ? GOLD : c.pctLoss >= 15 ? "#D97706" : GREEN}`,
              }}>
                <span style={{ fontFamily: M, fontSize: 15, color: TEXT }}>{c.name}</span>
                <span style={{ fontFamily: M, fontSize: 14, color: DIM }}>${(c.gdp/1000).toFixed(1)}T</span>
                <span style={{ fontFamily: M, fontSize: 14, color: GREEN }}>${(c.cAdj/1000).toFixed(1)}T</span>
                <span style={{ fontFamily: M, fontSize: 14, color: RED }}>−${(c.delta/1000).toFixed(1)}T</span>
                <span style={{ fontFamily: M, fontSize: 14, color: c.pctLoss >= 30 ? RED : c.pctLoss >= 20 ? GOLD : DIM }}>{c.pctLoss}%</span>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {c.topDomains.slice(0, 4).map(d => (
                    <span key={d} style={{ fontFamily: M, fontSize: 12, color: MUTED, padding: "1px 6px", background: "rgba(255,255,255,0.03)", borderRadius: 2 }}>{d}</span>
                  ))}
                  {c.topDomains.length > 4 && <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>+{c.topDomains.length - 4}</span>}
                </div>
              </div>
            ))}

            {/* Visual bar chart */}
            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 1, marginBottom: 12 }}>HOLLOW WIN AS % OF GDP</div>
              {[...COUNTRIES].sort((a, b) => b.pctLoss - a.pctLoss).map(c => (
                <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                  <span style={{ fontFamily: M, fontSize: 13, color: DIM, width: 120, textAlign: "right" }}>{c.name}</span>
                  <div style={{ flex: 1, height: 18, background: "rgba(255,255,255,0.03)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                      width: `${(c.pctLoss / 55) * 100}%`, height: "100%",
                      background: c.pctLoss >= 30 ? "rgba(239,68,68,0.6)" : c.pctLoss >= 20 ? "rgba(245,158,11,0.5)" : "rgba(59,130,246,0.4)",
                      borderRadius: 2,
                    }} />
                  </div>
                  <span style={{ fontFamily: M, fontSize: 13, color: c.pctLoss >= 30 ? RED : c.pctLoss >= 20 ? GOLD : DIM, width: 40 }}>{c.pctLoss}%</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "16px 20px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 4, marginTop: 24 }}>
              <div style={{ fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>A NOTE ON PRECISION</div>
              <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.8 }}>
                Country-level allocations are illustrative estimates based on production and consumption shares and domain-level welfare costs from Monte Carlo simulation. The precise allocation depends on data availability per country per domain — and that data is uneven. The author does not pretend otherwise. The C-Adjusted GDP dashboard (c-adjusted-gdp.vercel.app) provides detailed country-level analysis for 190+ countries. The directional conclusions — Saudi Arabia is more exposed than Germany, Indonesia more than Japan — are not sensitive to the allocation methodology. The rank order is robust. The decimal places are not.
              </div>
            </div>
          </div>
        )}

        {/* ═══ TREATIES ═══ */}
        {tab === "treaties" && (
          <div>
            <div style={{ fontFamily: M, fontSize: 14, color: MUTED, letterSpacing: 1, marginBottom: 8 }}>
              INTERNATIONAL TREATY ANALYSIS
            </div>
            <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.7, marginBottom: 24 }}>
              Five international agreements. One success, one partial success, one failure, one irrelevance, and one too new to judge. The pattern is instructive: treaties work when they have enforcement mechanisms and fail when they rely on voluntary compliance. The PPT predicts this. Bilateral optimization without enforcement produces system degradation as a structural byproduct — whether the bilateral actors are firms or nations.
            </div>

            {TREATIES.map(t => {
              const statusColor = t.status === "Success" ? GREEN : t.status === "Partial Success" ? GOLD : t.status === "New" ? BLUE : RED;
              return (
                <div key={t.name} style={{ marginBottom: 20, padding: "24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, borderLeft: `3px solid ${statusColor}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: M, fontSize: 19, color: TEXT, fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontFamily: M, fontSize: 14, color: MUTED, marginTop: 4 }}>{t.domain}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontFamily: M, fontSize: 13, color: statusColor, padding: "5px 10px", background: `${statusColor}15`, border: `1px solid ${statusColor}30`, borderRadius: 3 }}>{t.status.toUpperCase()}</span>
                      <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>{t.coverage}</span>
                    </div>
                  </div>

                  <div style={{ fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>LESSON</div>
                  <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.8, marginBottom: 16 }}>{t.lesson}</div>

                  <div style={{ fontFamily: M, fontSize: 13, color: MUTED, letterSpacing: 1, marginBottom: 6 }}>APPLICABILITY TO OTHER DOMAINS</div>
                  <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7 }}>{t.applicability}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ COORDINATION ═══ */}
        {tab === "coordination" && (
          <div>
            <div style={{ fontFamily: M, fontSize: 14, color: MUTED, letterSpacing: 1, marginBottom: 8 }}>
              GAME THEORY OF INTERNATIONAL COORDINATION
            </div>
            <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.7, marginBottom: 24 }}>
              International Hollow Win governance is a game. Not metaphorically — literally. Five scenarios define the strategic landscape. The author presents them without optimism or pessimism, because the game theory does not require either. It requires analysis.
            </div>

            {COORDINATION.map(c => (
              <div key={c.scenario} style={{ marginBottom: 20, padding: "24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                <div style={{ fontFamily: M, fontSize: 18, color: GOLD, fontWeight: 600, marginBottom: 12 }}>{c.scenario}</div>
                <div style={{ fontFamily: S, fontSize: 18, color: TEXT, lineHeight: 1.8, marginBottom: 12 }}>{c.description}</div>
                {c.examples && (
                  <div>
                    <div style={{ fontFamily: M, fontSize: 13, color: GREEN, letterSpacing: 1, marginBottom: 6 }}>EVIDENCE</div>
                    <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7 }}>{c.examples}</div>
                  </div>
                )}
                {c.counter && (
                  <div>
                    <div style={{ fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>THE COUNTER-ARGUMENT — AND WHY IT IS TEMPORARY</div>
                    <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7 }}>{c.counter}</div>
                  </div>
                )}
                {c.evidence && (
                  <div>
                    <div style={{ fontFamily: M, fontSize: 13, color: GREEN, letterSpacing: 1, marginBottom: 6 }}>EVIDENCE</div>
                    <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7 }}>{c.evidence}</div>
                  </div>
                )}
                {c.implication && (
                  <div>
                    <div style={{ fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>IMPLICATION</div>
                    <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7 }}>{c.implication}</div>
                  </div>
                )}
                {c.opportunity && (
                  <div>
                    <div style={{ fontFamily: M, fontSize: 13, color: GREEN, letterSpacing: 1, marginBottom: 6 }}>THE OPPORTUNITY</div>
                    <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7 }}>{c.opportunity}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══ ADOPTION PATH ═══ */}
        {tab === "adoption" && (
          <div>
            <div style={{ fontFamily: M, fontSize: 14, color: MUTED, letterSpacing: 1, marginBottom: 8 }}>
              IMPLEMENTATION ROADMAP
            </div>
            <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.7, marginBottom: 24 }}>
              Four phases. Ten years. The timeline is aggressive — and it is the conservative version. The system degradation documented in the SAPM program does not wait for phase gates. But governments move at government speed, and the author is not naive about that. The roadmap below is designed for institutions, not revolutionaries.
            </div>

            {[
              { phase: "PHASE 1", title: "Publication (Year 1)", color: BLUE, items: [
                "Publish C-adjusted GDP as a supplementary national account alongside traditional GDP. Not a replacement — a companion metric. The political cost is near zero. The informational value is enormous.",
                "Commission independent verification of β\u1D42 calibrations for domestically relevant domains. The Monte Carlo methodology is open-source and reproducible. Any national statistics office with a competent quant can run it.",
                "Establish a SAPM unit within the national statistics office — Bureau of Labor Statistics, Bureau of Economic Analysis, Office for National Statistics, or whichever national statistics agency applies. Three people. One economist, one statistician, one domain specialist. That is all it takes to start.",
                "Publish domain-level welfare cost estimates for the top 10 domestic exposure domains. The data already exists in scattered form — environmental reports, health statistics, insurance claims. SAPM organizes it.",
              ]},
              { phase: "PHASE 2", title: "Regulatory Integration (Years 2–3)", color: GOLD, items: [
                "Integrate β\u1D42 thresholds into existing regulatory frameworks — environmental review, financial regulation, antitrust. This does not require new legislation. It requires new inputs to existing processes.",
                "Mandate W-monitoring for industries with β\u1D42 > 6 — severe classification and above. This is where the rubber meets the road. The mandate says: you must measure what you are doing to the system. Not stop doing it. Measure it.",
                "Establish whistleblower incentives for Hollow Win reporting. The Securities and Exchange Commission (SEC) / Commodity Futures Trading Commission (CFTC) model works: percentage of recovered welfare costs. The incentive structure is proven. Apply it to system welfare, not just financial fraud.",
                "Begin bilateral coordination with major trading partners on Carbon Border Adjustment Mechanism (CBAM)-style border adjustments for high-β\u1D42 exports. The EU's CBAM is the template. Extend it beyond carbon.",
              ]},
              { phase: "PHASE 3", title: "International Coordination (Years 3–5)", color: GREEN, items: [
                "Propose C-adjusted GDP as an IMF and World Bank supplementary metric. The International Monetary Fund (IMF) already publishes purchasing power parity adjustments. GDP* is the same concept applied to system welfare. The intellectual infrastructure exists.",
                "Lead treaty initiative for the highest-β\u1D42 domains requiring international coordination: WMD Proliferation (β\u1D42 = 21.92), Firearms (β\u1D42 = 50.99), Opioid Ecosystem (β\u1D42 = 14.96). These are the domains with the highest welfare destruction per dollar of revenue. These are the domains where the numbers are terrifying.",
                "Establish a multilateral transition fund — Montreal Protocol model — for high-exposure developing countries. Indonesia at 32.1% Hollow Win cannot transition without support. Nigeria at 34.0% cannot either. The fund is not charity. It is coordination cost.",
                "Publish an annual SAPM World Report ranking countries by C-adjusted GDP, domain exposure, and transition progress. Sunlight is a disinfectant. Rankings are sunlight.",
              ]},
              { phase: "PHASE 4", title: "Full Integration (Years 5–10)", color: "#8B5CF6", items: [
                "C-adjusted GDP becomes the primary metric for fiscal policy evaluation. Not the only metric — GDP, employment, inflation all survive. But the headline number includes the correction. The broken altimeter is replaced.",
                "Trade agreements include Hollow Win clauses — carbon border adjustments extended to all high-β\u1D42 domains, not just carbon. Countries that export system destruction pay the border adjustment. Countries that internalize costs do not.",
                "An international SAPM standards body — equivalent to the International Organization for Standardization (ISO) — governs β\u1D42 calibration methodology. Independent. Transparent. Auditable. The same institutional architecture that governs financial accounting standards, applied to welfare accounting.",
                "Domain-level T* monitoring with automatic regulatory escalation triggers. When a domain's system degradation approaches the crossover time, regulation tightens automatically — not through political negotiation, but through pre-committed thresholds. The thermostat, not the argument about the thermostat.",
              ]},
            ].map(phase => (
              <div key={phase.phase} style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontFamily: M, fontSize: 14, color: phase.color, padding: "4px 12px", background: `${phase.color}15`, border: `1px solid ${phase.color}30`, borderRadius: 3, letterSpacing: 1 }}>{phase.phase}</span>
                  <span style={{ fontFamily: M, fontSize: 18, color: TEXT, fontWeight: 600 }}>{phase.title}</span>
                </div>
                {phase.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, padding: "10px 16px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, borderLeft: `3px solid ${phase.color}` }}>
                    <span style={{ fontFamily: M, fontSize: 14, color: phase.color, flexShrink: 0 }}>{i + 1}.</span>
                    <span style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}

            <div style={{ padding: "24px", background: "rgba(245,158,11,0.06)", border: `2px solid rgba(245,158,11,0.2)`, borderRadius: 4, marginTop: 32 }}>
              <div style={{ fontFamily: S, fontSize: 20, color: GOLD, lineHeight: 1.8, fontStyle: "italic", textAlign: "center" }}>
                The first country to publish C-adjusted GDP will redefine what economic performance means. Every country after that will be responding to the standard that country set. The question is not whether this happens. The question is who goes first — and who gets credit for the correction.
              </div>
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
