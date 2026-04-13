import { useState, useMemo } from "react";
import DOMAINS from "./data/domains";

// ══════════════════════════════════════════════════════════════
// PAPER SUMMARIES — College-Level Summaries of All 73 Papers
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
const MUTED = "rgba(255,255,255,0.35)";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "rgba(255,255,255,0.55)";

// ─── THEOREM TYPE DETERMINATION ───────────────────────────────
// Matches the CLAUDE.md taxonomy: institutional/jurisdictional/economic/political/financial/legal → Intractability
// Physical/thermodynamic/biological/geochemical/hydrogeological/computational/informational → Impossibility
const IMPOSSIBILITY_CONSTRAINTS = [
  "Thermodynamic", "Physical", "Biological", "Geochemical", "Hydrogeological",
  "Computational", "Informational", "Chemical", "Ecological",
];

function getTheoremType(domain) {
  if (domain.id === "ppt") return "Foundational";
  if (!domain.theorem?.constraint) return "Unknown";
  const c = domain.theorem.constraint;
  // If any part of the constraint includes institutional/jurisdictional/economic/political/legal/financial → Intractability
  const intractKeywords = ["Institutional", "Jurisdictional", "Economic", "Political", "Legal", "Financial", "Perverse Incentive"];
  for (const kw of intractKeywords) {
    if (c.includes(kw)) return "Intractability";
  }
  return "Impossibility";
}

function getTheoremBadgeColor(type) {
  if (type === "Impossibility") return RED;
  if (type === "Intractability") return GOLD;
  if (type === "Foundational") return CYAN;
  return MUTED;
}

// ─── CANONICAL βW TABLE (from CLAUDE.md) ──────────────────────
// The canonical values override domains.js where they differ
const CANONICAL_BETA = {
  firearms: { beta: 50.99, ci: "[40.50, 62.50]", dw: 509.9, pi: 10.0 },
  cybercrime: { beta: 31.10, ci: "[21.00, 41.00]", dw: 6403.1, pi: 200.0 },
  "human-trafficking": { beta: 22.62, ci: "[17.80, 27.50]", dw: 5338.1, pi: 236.0 },
  wmd: { beta: 21.92, ci: "[13.80, 36.60]", dw: 1894.0, pi: 86.4 },
  "child-labor": { beta: 21.83, ci: "[18.80, 24.80]", dw: 862.2, pi: 39.5 },
  opioids: { beta: 14.96, ci: "[12.60, 17.30]", dw: 1121.9, pi: 75.0 },
  "conflict-minerals": { beta: 12.60, ci: "[9.20, 16.00]", dw: 255.7, pi: 20.3 },
  private_prisons: { beta: 12.08, ci: "[8.80, 15.40]", dw: 96.7, pi: 8.0 },
  "credit-ratings": { beta: 11.21, ci: "[9.70, 12.70]", dw: 123.3, pi: 11.0 },
  mining_rare_earth: { beta: 11.15, ci: "[4.50, 14.80]", dw: 322.0, pi: 150.0 },
  big_tech: { beta: 7.81, ci: "[6.00, 9.60]", dw: 999.6, pi: 128.0 },
  cre: { beta: 7.78, ci: "[6.50, 9.10]", dw: 101.1, pi: 13.0 },
  frontier_ai: { beta: 7.51, ci: "[5.50, 9.40]", dw: 225.0, pi: 30.0 },
  industrial_ag_methane: { beta: 7.36, ci: "[5.70, 9.00]", dw: 1510.0, pi: 205.0 },
  monoculture: { beta: 7.36, ci: "[5.43, 10.09]", dw: null, pi: 340.0 },
  gambling: { beta: 7.30, ci: "[5.30, 9.30]", dw: 328.5, pi: 45.0 },
  deforestation: { beta: 7.21, ci: "[5.30, 9.10]", dw: 865.5, pi: 120.0 },
  "narco-state": { beta: 7.16, ci: "[5.72, 8.58]", dw: 3579.1, pi: 500.0 },
  "payday-lending": { beta: 7.08, ci: "[5.60, 8.60]", dw: 311.7, pi: 44.0 },
  fast_fashion: { beta: 7.01, ci: "[5.10, 8.90]", dw: 385.4, pi: 55.0 },
  coal: { beta: 6.95, ci: "[5.70, 8.20]", dw: 6884.0, pi: 990.0 },
  deep_sea_mining: { beta: 6.90, ci: "[5.00, 8.80]", dw: 34.0, pi: 5.0 },
  cement: { beta: 6.74, ci: "[4.80, 8.70]", dw: 22.0, pi: 3.0 },
  plastics: { beta: 6.67, ci: "[4.20, 9.10]", dw: 3683.0, pi: 650.0 },
  "e-waste": { beta: 6.59, ci: "[4.90, 8.30]", dw: 6922.2, pi: 1050.0 },
  tobacco: { beta: 6.50, ci: "[4.50, 9.60]", dw: 6276.0, pi: 965.0 },
  student_loans: { beta: 6.36, ci: "[5.20, 7.50]", dw: 297.6, pi: 46.8 },
  pbm: { beta: 6.35, ci: "[4.90, 7.80]", dw: 381.0, pi: 60.0 },
  platform_monopoly: { beta: 6.33, ci: "[4.80, 7.80]", dw: 999.4, pi: 158.0 },
  palm_oil: { beta: 6.30, ci: "[4.60, 8.00]", dw: 428.3, pi: 68.0 },
  "tax-havens": { beta: 6.27, ci: "[5.10, 7.40]", dw: 3084.7, pi: 492.0 },
  pops: { beta: 6.23, ci: "[4.40, 8.00]", dw: 435.8, pi: 70.0 },
  "data-brokerage": { beta: 6.13, ci: "[4.70, 7.60]", dw: 1979.5, pi: 323.0 },
  amr: { beta: 5.84, ci: "[4.43, 7.26]", dw: null, pi: null },
  social_media: { beta: 5.79, ci: "[4.20, 7.40]", dw: 393.5, pi: 68.0 },
  gene_drives: { beta: 5.77, ci: "[4.21, 7.34]", dw: 8.0, pi: 12.4 },
  water_privatization: { beta: 5.61, ci: "[3.70, 7.50]", dw: 1380.8, pi: 246.0 },
  algorithmic_pricing: { beta: 5.38, ci: "[3.90, 6.90]", dw: 215.2, pi: 40.0 },
  pfas: { beta: 5.31, ci: "[4.02, 6.61]", dw: null, pi: null },
  pe_healthcare: { beta: 5.24, ci: "[4.00, 6.50]", dw: 162.4, pi: 31.0 },
  libor: { beta: 5.13, ci: "[3.42, 8.16]", dw: 16.4, pi: 3.2 },
  bitcoin: { beta: 5.00, ci: "[3.20, 7.80]", dw: 210.0, pi: 42.0 },
  aviation: { beta: 4.97, ci: "[3.60, 6.40]", dw: 497.5, pi: 100.0 },
  defense_procurement: { beta: 4.88, ci: "[4.20, 5.60]", dw: 164.4, pi: 33.7 },
  orbital_debris: { beta: 4.82, ci: "[3.12, 6.52]", dw: 8.0, pi: 2.2 },
  fisheries: { beta: 4.70, ci: "[3.80, 5.60]", dw: 178.6, pi: 38.0 },
  sovereign_debt: { beta: 4.67, ci: "[3.40, 5.90]", dw: 163.5, pi: 35.0 },
  insurance_climate: { beta: 4.57, ci: "[3.30, 5.80]", dw: 411.1, pi: 90.0 },
  topsoil: { beta: 4.41, ci: "[3.40, 5.40]", dw: 1123.0, pi: 255.0 },
  upf: { beta: 4.06, ci: "[3.39, 4.95]", dw: 1829.0, pi: 450.0 },
  groundwater: { beta: 3.46, ci: "[2.30, 4.60]", dw: 32.9, pi: null },
  pos: { beta: 3.14, ci: "[2.31, 3.98]", dw: 6.0, pi: 12.0 },
  nuclear: { beta: 2.94, ci: "[1.87, 4.01]", dw: null, pi: null },
  arms_exports: { beta: 2.54, ci: "[1.90, 3.20]", dw: 75.0, pi: 29.6 },
  stablecoins: { beta: 2.53, ci: "[2.00, 3.10]", dw: 141.7, pi: 56.0 },
  pmc: { beta: 2.06, ci: "[1.70, 2.40]", dw: 536.3, pi: 260.0 },
  oil_gas: { beta: 1.63, ci: "[1.30, 2.00]", dw: 5694.6, pi: 3500.0 },
  shipping: { beta: 1.34, ci: "[1.10, 1.60]", dw: 1296.0, pi: 969.0 },
  alcohol: { beta: 1.33, ci: "[1.04, 1.60]", dw: 2121.4, pi: 1600.0 },
  "factory-farming": { beta: 1.02, ci: "[0.76, 1.38]", dw: 2763.7, pi: 2700.0 },
  gig_economy: { beta: 0.76, ci: "[0.60, 0.90]", dw: 34.4, pi: 45.0 },
};

function getCanonicalBeta(domain) {
  const c = CANONICAL_BETA[domain.id];
  if (c) return c;
  return {
    beta: domain.beta,
    ci: domain.betaCI,
    dw: domain.welfCost,
    pi: domain.pi,
  };
}

// ─── FRAMEWORK & OTHER PAPERS (non-domain) ────────────────────
const FRAMEWORK_PAPERS = [
  { id: "fw-reform-dividend", name: "The Reform Dividend Law", shortName: "Reform Dividend", theoremType: "Framework", summary: "Proves that eliminating a Hollow Win releases a reform dividend equal to the welfare cost minus transition costs. The dividend is always positive when transition costs are below 40% of ΔW." },
  { id: "fw-fiscal-capture", name: "The Fiscal Capture Theorem", shortName: "Fiscal Capture", theoremType: "Framework", summary: "Demonstrates that governments dependent on tax revenue from system-degrading industries face a structural conflict: enforcement reduces the tax base. The theorem explains regulatory paralysis." },
  { id: "fw-substitution-trap", name: "The Substitution Trap Law", shortName: "Substitution Trap", theoremType: "Framework", summary: "Proves that banning one Hollow Win domain without addressing demand shifts welfare destruction to substitute domains. Prohibition of alcohol shifted welfare costs to illicit markets." },
  { id: "fw-disclosure-futility", name: "The Disclosure Futility Theorem", shortName: "Disclosure Futility", theoremType: "Framework", summary: "Shows that mandatory disclosure alone cannot resolve a Hollow Win. Parties already know their bilateral payoffs. The missing information (W) is structurally outside the disclosure space." },
  { id: "fw-postnieks-law", name: "Postnieks's Law", shortName: "Postnieks's Law", theoremType: "Framework", summary: "The cross-domain result: in any bilateral game satisfying PST-1 through PST-3, the time to system collapse T* is inversely proportional to βW. Higher beta means faster collapse." },
  { id: "fw-conflictoring", name: "The Conflictoring Protocol", shortName: "Conflictoring", theoremType: "Framework", summary: "The six-agent diagnostic protocol that breaks the Private Pareto Trap. When k* agents activate simultaneously, PST conformism becomes strictly dominated." },
];

const OTHER_PAPERS = [
  { id: "ot-da-chapter1", name: "Domain Analysis Chapter 1: Methodology", shortName: "DA Ch.1", theoremType: "Methodology", summary: "Establishes the channel decomposition methodology, Monte Carlo simulation protocol (N=10,000, seed=42), and βW computation standards used across all 61 domain papers." },
  { id: "ot-da-chapter5", name: "Domain Analysis Chapter 5: Cross-Domain", shortName: "DA Ch.5", theoremType: "Methodology", summary: "Cross-domain analysis comparing all 61 βW estimates, identifying structural patterns across impossibility and intractability domains." },
  { id: "ot-da-chapter9", name: "Domain Analysis Chapter 9: Agent Architecture", shortName: "DA Ch.9", theoremType: "Methodology", summary: "Defines the six-agent architecture (Whistleblower, Plaintiff, Regulator, Legislator, Investor, Supranational) and the conditions under which multi-agent activation breaks PST." },
  { id: "ot-c-adjusted-gdp", name: "C-Adjusted GDP: The Number GDP Was Supposed To Be", shortName: "C-Adjusted GDP", theoremType: "Measurement", summary: "Introduces GDP* = GDP - μΣβWΠ. At full calibration (μ=1.0), approximately $20 trillion disappears from measured global output. Country-level decomposition for 190 nations." },
  { id: "ot-pst-breaker", name: "PST Breaker: 190-Country Reform Pathfinder", shortName: "PST Breaker", theoremType: "Tool", summary: "Country-specific reform paths for all 190 nations across all 61 domains. Identifies which reforms are achievable given each country's institutional capacity." },
  { id: "ot-curriculum", name: "The PPT Curriculum: 8 Chapters in 30 Minutes", shortName: "Curriculum", theoremType: "Education", summary: "The complete PPT framework distilled into an interactive 8-chapter curriculum. From 'The Lie in the Number' through the domain theorems." },
];

// ─── SUBSTANTIVE CONTENT FOR TOP 10 PAPERS ────────────────────
const PAPER_CONTENT = {
  firearms: {
    keyFindings: [
      "The firearms industry generates $509.9 billion in annual welfare destruction against $10 billion in revenue, producing the highest βW (50.99) of any domain in the SAPM canon.",
      "The Constitutional Ratchet (Second Amendment entrenchment + PLCAA tort immunity + Dickey Amendment research suppression) creates a triple lock that removes firearms from the regulatory design space available to every other consumer product.",
      "The United States is the only high-income country where firearms are constitutionally entrenched. Every peer nation that implemented comprehensive reform (Australia 1996, UK 1997, Japan continuous) achieved βW below 5.0.",
      "Gun violence costs $509.9 billion annually through medical costs ($35B), lost productivity ($229B), criminal justice ($28B), employer costs ($47B), and quality-of-life losses ($170B). Every dollar of firearms revenue destroys $51 of societal welfare.",
      "The Protection of Lawful Commerce in Arms Act (2005) is the only federal statute granting a specific industry blanket immunity from tort liability. No other consumer product manufacturer enjoys this protection.",
    ],
    theorem: {
      formal: "Under Constitutional Entrenchment (A1), Regulatory Exclusion Identity (A2), and Judicial Ratchet (A3): no regulatory intervention within the current constitutional framework can reduce βW below 3.0. The Constitutional Ratchet guarantees a welfare floor that no legislature, regulator, or court can breach without constitutional amendment.",
      plain: "Firearms are the only consumer product in America that cannot be regulated as a consumer product. The Second Amendment removes them from CPSC jurisdiction. PLCAA removes them from tort liability. The Dickey Amendment removed them from federal research funding for two decades. Three locks. No key that does not require a constitutional amendment.",
    },
    mcResults: { beta: 50.99, ci: "[40.50, 62.50]", dw: 509.9, pi: 10.0 },
    agents: {
      whistleblower: "Internal documents from firearms manufacturers reveal suppression of safety research, marketing strategies targeting high-risk demographics, and lobbying expenditures to maintain PLCAA immunity. Document the internal cost-benefit analyses that weigh litigation risk against unit sales. The paper trail exists in marketing departments and government affairs offices.",
      plaintiff: "The PLCAA blocks most tort claims, but exceptions exist: negligent entrustment, defective product design, and violations of state consumer protection statutes. Sandy Hook families prevailed against Remington under Connecticut's Unfair Trade Practices Act by targeting marketing, not manufacturing. The litigation path runs through advertising and distribution practices, not product liability.",
      regulator: "ATF has jurisdiction but Congress has systematically defunded enforcement. The Tiahrt Amendment prohibits ATF from releasing trace data. The agency cannot require inventory audits of licensed dealers more than once per year. The enforcement gap is not accidental — it is legislated. State-level regulation (California, New York, New Jersey) demonstrates what is possible within constitutional constraints.",
      legislator: "Universal background checks poll at 83-90% support across party lines but cannot pass the Senate due to filibuster and NRA scoring. The Bipartisan Safer Communities Act (2022) was the first federal gun legislation in 28 years. Committee jurisdiction: Judiciary (Senate), Energy & Commerce (House). Red flag laws, safe storage mandates, and assault weapons bans are all constitutionally permissible under Heller.",
      investor: "Firearms manufacturers (Smith & Wesson/SWBI, Sturm Ruger/RGR, Vista Outdoor) face ESG exclusion from major index funds. BlackRock, Vanguard, and State Street all offer firearms-free fund options. Portfolio exposure is concentrated in small-cap consumer discretionary. The reputational risk exceeds the market capitalization of the entire publicly traded firearms sector ($8B combined).",
      supranational: "The UN Arms Trade Treaty (ATT) regulates international arms transfers but the United States has not ratified it. The Small Arms Survey tracks global firearms flows. Cross-border trafficking (US to Mexico, Eastern Europe to conflict zones) creates welfare spillovers that no single jurisdiction can address. INTERPOL's iARMS database tracks illicit firearms but participation is voluntary.",
    },
    faq: [
      { q: "Why is the firearms βW so much higher than any other domain?", a: "Because the denominator (Π = $10B annual revenue) is small relative to the welfare destruction ($509.9B). Firearms is a low-revenue, high-destruction industry. The $10B figure captures domestic firearms and ammunition sales. The $509.9B captures medical costs, lost productivity, criminal justice costs, employer costs, and quality-of-life losses. The ratio is 51:1." },
      { q: "Does the Second Amendment make reform impossible?", a: "The theorem says reform within the current constitutional framework cannot reduce βW below 3.0. That floor is set by the Constitutional Ratchet. But constitutional amendments are possible — the 18th and 21st Amendments prove it. Australia's 1996 reform required no constitutional change because firearms were never constitutionally entrenched. The impossibility is institutional, not physical." },
      { q: "What would a post-reform βW look like?", a: "Australia's post-Port Arthur βW is approximately 2.1. Japan's is below 0.5. The UK's is approximately 1.8. These are achievable endpoints — but only after removing constitutional entrenchment, PLCAA immunity, and Dickey Amendment suppression. All three peer nations demonstrate that comprehensive reform works." },
      { q: "Why classify firearms as Intractability rather than Impossibility?", a: "The constraint is constitutional/institutional, not physical. The Second Amendment is a legal construct, not a law of nature. It can be amended. Australia proved it. The classification follows the taxonomy: institutional constraints that can be changed given sufficient political will = Intractability. Physical/chemical/biological constraints that no policy can override = Impossibility." },
    ],
  },

  cybercrime: {
    keyFindings: [
      "Cybercrime generates $6.4 trillion in annual welfare destruction against $200 billion in criminal revenue, producing βW = 31.10 — the second-highest in the SAPM canon.",
      "The Attribution Impossibility theorem proves that the structural anonymity of internet architecture makes perfect attribution of cyber attacks impossible. Every attribution method has a false-negative floor set by network architecture.",
      "Ransomware payments doubled from 2022 to 2024, reaching $1.1 billion in tracked cryptocurrency payments alone. The actual figure is 3-5x higher due to unreported payments.",
      "The cybercrime ecosystem operates as a service economy: Ransomware-as-a-Service (RaaS), initial access brokers, and cryptocurrency mixing services create a division-of-labor supply chain that is resilient to individual takedowns.",
      "Nation-state actors (Russia, China, North Korea, Iran) provide safe harbor for cybercriminal organizations, creating jurisdictional arbitrage that no single law enforcement agency can overcome.",
    ],
    theorem: {
      formal: "Under Attribution Impossibility (A1), Jurisdictional Fragmentation (A2), and Attack Surface Expansion (A3): no enforcement regime operating within existing internet architecture can reduce the false-negative attribution rate below the floor set by network-layer anonymity. βW is bounded below by the ratio of unattributable attack costs to total criminal revenue.",
      plain: "You cannot catch what you cannot identify. The internet was designed for resilience, not attribution. Every packet can be routed through jurisdictions that will not cooperate. Every ransomware operator can be paid in cryptocurrency that crosses no border checkpoint. The architecture that makes the internet valuable is the same architecture that makes cybercrime unprosecutable.",
    },
    mcResults: { beta: 31.10, ci: "[21.00, 41.00]", dw: 6403.1, pi: 200.0 },
    agents: {
      whistleblower: "Document the gap between reported and actual breach costs. Companies routinely understate breach impact to minimize stock price damage and regulatory exposure. SEC cyber disclosure rules (2023) require material incident reporting within four business days — but 'material' is self-assessed. The underreporting rate exceeds 60% for mid-market breaches.",
      plaintiff: "Class action litigation following data breaches has expanded significantly since the Supreme Court's standing decisions. Causes of action include negligence, breach of implied contract, state consumer protection violations, and BIPA (Illinois). Discovery should target pre-breach security audit reports, board-level risk presentations, and insurance coverage decisions that reveal known-but-unpatched vulnerabilities.",
      regulator: "CISA, FBI (IC3), and SEC share jurisdiction but no single agency has comprehensive enforcement authority. The enforcement gap is most severe for attacks originating from non-cooperative jurisdictions. Mandatory breach reporting (CIRCIA, 2022) addresses the information gap but not the attribution gap. Minimum cybersecurity standards for critical infrastructure remain voluntary in most sectors.",
      legislator: "Federal data privacy legislation remains stalled. The patchwork of state laws (CCPA, NYDFS, etc.) creates compliance costs without improving security. Committee jurisdiction: Homeland Security, Intelligence, Commerce. The structural intervention is mandatory minimum security standards tied to liability safe harbors — companies that meet the standard get tort protection; those that do not face strict liability.",
      investor: "Cyber insurance premiums tripled from 2020 to 2023. Companies with material cyber exposure (healthcare, financial services, critical infrastructure) face earnings volatility from breach events. The SEC's cyber disclosure rule creates a new information channel. Portfolio screening should include: days to detect breach, third-party vendor risk score, and board-level cyber oversight structure.",
      supranational: "The Budapest Convention on Cybercrime (2001) has 68 parties but excludes Russia, China, and most of the Global South. The UN Ad Hoc Committee on Cybercrime (2024) produced a treaty that human rights organizations oppose for surveillance provisions. No international framework addresses state-sponsored cybercrime. Mutual Legal Assistance Treaties (MLATs) take 6-24 months — cybercriminals operate in milliseconds.",
    },
    faq: [
      { q: "Why is the Π denominator $200B and not the $6.4T in damages?", a: "Π is the private gain to the perpetrators — criminal revenue. The $6.4T is the welfare cost (ΔW) imposed on victims, including direct losses, remediation costs, business interruption, reputational damage, and regulatory fines. βW = ΔW/Π. The criminals capture $200B while destroying $6.4T — a 31:1 ratio of destruction to gain." },
      { q: "Can AI-powered defense solve the attribution problem?", a: "AI improves detection speed and pattern recognition but does not solve the fundamental attribution problem. The network architecture allows traffic to be routed through non-cooperative jurisdictions. AI can identify that an attack occurred and characterize its methods, but cannot overcome the jurisdictional arbitrage that prevents prosecution." },
      { q: "What would reduce βW?", a: "Three structural interventions: (1) mandatory minimum cybersecurity standards with liability consequences, (2) international law enforcement cooperation treaties that eliminate safe harbors, (3) cryptocurrency regulation that makes ransomware payments traceable. None is sufficient alone. All three together could reduce βW to approximately 10-15." },
    ],
  },

  "human-trafficking": {
    keyFindings: [
      "Human trafficking generates $5.3 trillion in annual welfare destruction against $236 billion in criminal revenue (ILO estimate), producing βW = 22.62.",
      "The Demand Indestructibility theorem proves that enforcement alone cannot eliminate trafficking when demand for exploitable labor operates across jurisdictional boundaries with asymmetric enforcement capacity.",
      "An estimated 49.6 million people are in conditions of modern slavery globally (ILO 2022). Prosecution rates remain below 1% of estimated cases. The conviction-to-victim ratio is approximately 1:800.",
      "Forced labor generates the majority of trafficking revenue ($236B), not sex trafficking. Supply chains in agriculture, construction, domestic work, and manufacturing are the primary channels.",
      "The Nordic model (criminalize demand, decriminalize victims) reduces sex trafficking demand by 40-60% where implemented, but addresses only one trafficking channel.",
    ],
    theorem: {
      formal: "Under Demand Necessity (A1), Jurisdictional Arbitrage Identity (A2), and Enforcement Asymmetry (A3): no enforcement regime can eliminate trafficking when the labor cost differential between jurisdictions exceeds the expected penalty discounted by the probability of prosecution. βW is bounded below by the ratio of undetected trafficking welfare costs to total trafficking revenue.",
      plain: "As long as a worker in Bangladesh earns $95/month and a worker in Qatar earns $2,000/month for the same work, the arbitrage exists. As long as prosecution rates remain below 1%, the expected cost of trafficking is negligible relative to the profit. The demand is not for cruelty — it is for cheap labor. That demand is structural, not psychological.",
    },
    mcResults: { beta: 22.62, ci: "[17.80, 27.50]", dw: 5338.1, pi: 236.0 },
    agents: {
      whistleblower: "Document the supply chain audit failures. Tier-1 suppliers pass audits; Tier-3 and Tier-4 subcontractors use forced labor. The evidence is in procurement records that show unit costs below the minimum wage floor of the production country. If the landed cost of a garment implies a labor cost below $0.50/hour, forced labor is the explanation. Audit the math, not the factory.",
      plaintiff: "The Trafficking Victims Protection Act (TVPA) provides civil remedies including treble damages. Class actions against companies with supply chain exposure are viable under the Alien Tort Statute (limited post-Kiobel to US-connected conduct) and state consumer protection statutes. Discovery should target supplier audit reports, procurement pricing models, and communications acknowledging supply chain risk.",
      regulator: "DHS (ICE/HSI), DOJ, and the State Department's TIP Office share jurisdiction. The enforcement gap is most severe at the intersection of immigration and labor law — victims fear deportation more than traffickers fear prosecution. T-visa issuance (for trafficking victims) averages 1,500/year against millions of estimated victims. The structural intervention is decoupling victim protection from immigration enforcement.",
      legislator: "The TVPA (reauthorized 2022) is the primary federal framework. The Uyghur Forced Labor Prevention Act (2021) created a rebuttable presumption that goods from Xinjiang involve forced labor. Committee jurisdiction: Judiciary, Foreign Affairs, Homeland Security. Extend the Xinjiang presumption to all high-risk supply chains. Mandate supply chain due diligence with liability for failures.",
      investor: "Supply chain exposure to forced labor is concentrated in apparel, electronics, agriculture, and construction. The EU Corporate Sustainability Due Diligence Directive (2024) creates mandatory due diligence obligations for large companies. ESG screening should include: supply chain audit depth (Tier 1 only vs. full chain), grievance mechanism accessibility, and remediation track record.",
      supranational: "The Palermo Protocol (2000) provides the international legal framework. The ILO Forced Labour Convention and its 2014 Protocol require states to implement prevention, protection, and remedy. The EU Anti-Trafficking Directive (2011) harmonizes criminalization across member states. The gap is enforcement: no international body has jurisdiction to prosecute transnational trafficking networks.",
    },
    faq: [
      { q: "Why is forced labor the primary revenue channel, not sex trafficking?", a: "The ILO estimates forced labor generates $236B annually, of which sex trafficking is approximately $99B. Forced labor in agriculture, construction, manufacturing, and domestic work accounts for the majority. The media focus on sex trafficking obscures the scale of labor exploitation in legitimate supply chains." },
      { q: "Does supply chain regulation work?", a: "The UK Modern Slavery Act (2015) and French Duty of Vigilance Law (2017) show that disclosure requirements alone do not reduce trafficking. The EU CSDDD (2024) adds liability, which changes the calculus. Companies that face financial consequences for supply chain failures invest in due diligence. Companies that face only reporting requirements do not." },
      { q: "What would reduce βW to below 10?", a: "Three structural interventions: (1) mandatory supply chain due diligence with strict liability for failures down to Tier 4, (2) T-visa expansion and decoupling victim protection from immigration enforcement, (3) demand-side criminalization extending beyond sex trafficking to labor exploitation. No single intervention is sufficient." },
    ],
  },

  wmd: {
    keyFindings: [
      "WMD capability diffusion generates $1.9 trillion in annual welfare destruction against $86.4 billion in proliferation-related revenue, producing βW = 21.92.",
      "The Capability Diffusion Ceiling proves that knowledge transfer and permanent capability enablement are the same event. Once a state or non-state actor acquires weapons-relevant knowledge, it cannot be un-acquired.",
      "The proliferation ratchet has moved in one direction for 80 years: 1 nuclear state in 1945, 9 in 2026. Only one state (South Africa) has voluntarily denuclearized, and that required complete regime change.",
      "The A.Q. Khan network demonstrated that a single individual can transfer centrifuge designs across multiple state boundaries. The network operated for 15 years before detection.",
      "Lethal Autonomous Weapons Systems (LAWS) represent the next proliferation frontier. The Kargu-2 drone's autonomous combat deployment in Libya (2020) permanently demonstrated targeting viability to every defense establishment on Earth.",
    ],
    theorem: {
      formal: "Under Security Necessity (A1), Knowledge Transfer Identity (A2), and Proliferation Ratchet (A3): no arms control regime can prevent capability diffusion when knowledge transfer and permanent capability enablement are constitutively identical. Each new capability demonstration creates demand nodes that cannot be suppressed by any feasible enforcement mechanism.",
      plain: "You cannot un-teach nuclear physics. You cannot un-demonstrate autonomous targeting. The A.Q. Khan centrifuge designs that reached North Korea cannot be deleted from the engineers' minds. Every capability demonstration — every nuclear test, every autonomous weapons deployment — permanently expands the set of actors who know it is possible and seek to replicate it. The ratchet turns one way.",
    },
    mcResults: { beta: 21.92, ci: "[13.80, 36.60]", dw: 1894.0, pi: 86.4 },
    agents: {
      whistleblower: "Document dual-use technology transfers that circumvent export controls. The evidence is in end-use certificates that misrepresent the intended application of controlled technology. Universities, research labs, and commercial suppliers handling ITAR-controlled or EAR-controlled items are the primary documentary sources. The A.Q. Khan network was detected through financial transactions, not technical monitoring.",
      plaintiff: "Civil causes of action against companies that facilitate proliferation exist under the Antiterrorism Act (18 USC 2333) and state tort law. Victims of state-sponsored terrorism have recovered billions through FSIA exceptions. Discovery should target export compliance records, know-your-customer documentation for dual-use equipment sales, and internal communications acknowledging proliferation risk.",
      regulator: "The Bureau of Industry and Security (BIS), Nuclear Regulatory Commission (NRC), and State Department (DDTC) share export control jurisdiction. The enforcement gap is in dual-use technology — items with legitimate commercial applications that also enable weapons development. AI chips, gene synthesis equipment, and advanced materials all fall in this gap. End-use monitoring is resource-constrained.",
      legislator: "The Export Control Reform Act (2018) modernized the framework but enforcement resources have not kept pace with dual-use technology proliferation. Committee jurisdiction: Armed Services, Foreign Affairs, Intelligence. The structural intervention is mandatory AI-assisted screening of all dual-use exports, funded through export license fees rather than discretionary appropriations.",
      investor: "Defense contractors (Lockheed Martin, Raytheon, Northrop Grumman) and dual-use technology companies face proliferation compliance risk. ITAR violations carry penalties up to $500,000 per violation and debarment. ESG screening should include: export control compliance history, dual-use technology revenue share, and board-level proliferation oversight. The financial exposure from a single ITAR violation can exceed annual profit.",
      supranational: "The Nuclear Non-Proliferation Treaty (NPT), Chemical Weapons Convention (CWC), Biological Weapons Convention (BWC), and Missile Technology Control Regime (MTCR) provide the treaty architecture. The NPT has three non-signatories with nuclear weapons (India, Pakistan, Israel) and one withdrawal (North Korea). No binding international treaty addresses LAWS. The Group of Governmental Experts (GGE) process has produced 11 guiding principles but no regulation.",
    },
    faq: [
      { q: "Why is the 90% CI so wide ([13.80, 36.60])?", a: "WMD welfare costs are dominated by low-probability, high-consequence scenarios. The expected annual cost includes the probability-weighted cost of a nuclear detonation, which has enormous uncertainty. The CI width reflects genuine uncertainty about deterrence stability, not measurement imprecision." },
      { q: "Does the NPT work?", a: "The NPT prevented the 'President Kennedy scenario' of 25+ nuclear states by 2000. But it has not prevented all proliferation (India, Pakistan, North Korea, Israel). The treaty architecture slows the ratchet but cannot reverse it. Each new nuclear state demonstrates that the cost of proliferation is bearable." },
      { q: "How does LAWS proliferation differ from nuclear proliferation?", a: "Nuclear weapons require enriched fissile material — a physical bottleneck. LAWS require software and commercially available drones — no physical bottleneck exists. The proliferation timeline for nuclear weapons was decades. For LAWS, it is months to years. The Kargu-2 used off-the-shelf components. The barrier is not technology; it is the decision to deploy." },
    ],
  },

  "child-labor": {
    keyFindings: [
      "Child labor in global supply chains generates $862.2 billion in annual welfare destruction against $39.5 billion in cost savings to employers, producing βW = 21.83.",
      "The Cost Arbitrage Floor proves that as long as child labor provides a cost advantage exceeding the expected penalty, rational firms will use it in jurisdictions where enforcement is weak.",
      "160 million children are in child labor globally (ILO 2020), of which 79 million are in hazardous work. Sub-Saharan Africa and South Asia account for 86% of the total.",
      "Child labor fell steadily from 2000 to 2016, then reversed. The COVID-19 pandemic pushed an additional 8.4 million children into labor. The trend line is now moving in the wrong direction.",
      "Cobalt mining in the DRC, cocoa harvesting in Cote d'Ivoire, and garment production in Bangladesh are the three highest-profile supply chains, but child labor pervades agriculture globally — 70% of all child labor is agricultural.",
    ],
    theorem: {
      formal: "Under Cost Advantage Necessity (A1), Jurisdictional Enforcement Asymmetry (A2), and Supply Chain Opacity (A3): no voluntary corporate commitment or unilateral regulatory action can eliminate child labor when the cost savings from child labor exceed the expected penalty discounted by detection probability across jurisdictional boundaries.",
      plain: "A cocoa farmer in Cote d'Ivoire can pay a child $0.50/day or an adult $3.00/day. The probability of detection is below 5%. The expected penalty upon detection is a supply chain audit, not criminal prosecution. The arithmetic is clear: child labor is profitable, enforcement is weak, and supply chains are opaque enough to hide it. Voluntary pledges have not changed the numbers in 25 years.",
    },
    mcResults: { beta: 21.83, ci: "[18.80, 24.80]", dw: 862.2, pi: 39.5 },
    agents: {
      whistleblower: "Document the gap between corporate public commitments and actual supply chain practices. The evidence is in procurement pricing: if the landed cost of cocoa implies a farmgate price below the cost of adult labor, child labor is the explanation. Internal audit reports that identify child labor at Tier 2+ suppliers and the corporate response (or lack thereof) are the critical documents.",
      plaintiff: "The Alien Tort Statute (limited post-Nestlé v. Doe, 2021) and the Trafficking Victims Protection Act provide federal causes of action. State consumer protection statutes (California, New York) enable claims based on supply chain misrepresentation. Discovery should target supplier audit reports, corrective action plans, and internal communications showing knowledge of child labor in the supply chain.",
      regulator: "The Department of Labor's Bureau of International Labor Affairs (ILAB) maintains the List of Goods Produced by Child Labor (TVPRA List). Customs and Border Protection (CBP) enforces the Tariff Act's forced labor import ban through Withhold Release Orders (WROs). The enforcement gap: CBP issued 63 WROs total from 2016-2024. The import volume from child-labor-risk countries is millions of shipments per year.",
      legislator: "The TVPRA requires the DOL to maintain a list of goods produced by child labor but imposes no import restrictions based on inclusion. The Tariff Act (19 USC 1307) prohibits forced labor imports but enforcement is complaint-driven. Committee jurisdiction: Ways and Means, Education and Labor, Foreign Affairs. The structural intervention is mandatory import certification for child-labor-risk commodities.",
      investor: "Companies with supply chain exposure to child labor face regulatory risk (EU CSDDD), litigation risk (Nestlé v. Doe progeny), and reputational risk. Cocoa (Hershey, Mondelez, Nestle), cobalt (Apple, Samsung, Tesla), and fast fashion (H&M, Zara, Shein) are the highest-exposure sectors. ESG screening should include supply chain audit depth and remediation investment as a percentage of procurement spend.",
      supranational: "ILO Convention 182 (Worst Forms of Child Labour) is the most widely ratified ILO convention (187 parties). The UN Guiding Principles on Business and Human Rights (2011) establish the Protect-Respect-Remedy framework. The EU CSDDD (2024) creates mandatory due diligence obligations. The gap is enforcement: no international body can compel supply chain transparency or impose sanctions for non-compliance.",
    },
    faq: [
      { q: "Why has child labor increased since 2016?", a: "Three structural drivers: (1) COVID-19 pushed 8.4 million additional children into labor as household income collapsed, (2) climate change is reducing agricultural yields, pushing families to deploy all available labor, (3) commodity price pressure from global buyers compresses farmgate prices below the adult-labor cost floor." },
      { q: "Do corporate pledges work?", a: "Mars, Nestle, and Hershey pledged to eliminate child labor from cocoa supply chains by 2005, then 2010, then 2020. As of 2026, an estimated 1.56 million children work in cocoa harvesting in West Africa. The pledges did not change the economic arithmetic. Only price floors, enforcement, and mandatory due diligence with liability change the arithmetic." },
      { q: "What is the proven solution?", a: "Brazil reduced child labor by 65% from 1992 to 2015 through Bolsa Familia (conditional cash transfers tied to school attendance), labor inspections with real penalties, and progressive universalization of education. The program cost approximately $12B/year. The welfare benefit exceeded $40B/year. The reform dividend was 3:1." },
    ],
  },

  opioids: {
    keyFindings: [
      "The opioid ecosystem generates $1.1 trillion in annual welfare destruction against $75 billion in industry revenue, producing βW = 14.96.",
      "The Supply Chain Irreversibility theorem proves that once opioid dependence is established through legitimate prescribing, the patient's demand is pharmacologically locked in. Cutting supply does not cut demand — it redirects it to illicit markets.",
      "Purdue Pharma's internal documents showed the company knew OxyContin's abuse potential by 1997 — eight years before the first enforcement action. The company spent $880 million lobbying over two decades to maintain prescribing access.",
      "Prescription opioid deaths peaked in 2017 but total opioid deaths continued rising as fentanyl replaced prescription drugs. Supply-side interventions shifted the source; they did not reduce the demand.",
      "The Sackler family extracted $10.7 billion from Purdue before bankruptcy. The bankruptcy settlement immunized family members from civil liability in exchange for $6 billion — less than the extraction.",
    ],
    theorem: {
      formal: "Under Pharmacological Lock-in (A1), Supply-Demand Decoupling (A2), and Illicit Substitution (A3): no supply-side intervention can reduce total opioid welfare costs below the floor set by existing dependence prevalence. Restricting prescription supply without addressing dependence redirects demand to illicit markets with higher per-dose mortality.",
      plain: "You cannot un-addict 2.5 million Americans by restricting prescriptions. The dependence was created by the prescribing. Cutting the prescription does not cut the dependence — it sends the patient to the street, where fentanyl is cheaper, more potent, and more lethal. Every supply restriction that does not include treatment access increases mortality. The DEA's prescription crackdown after 2012 correlates precisely with the fentanyl surge after 2014.",
    },
    mcResults: { beta: 14.96, ci: "[12.60, 17.30]", dw: 1121.9, pi: 75.0 },
    agents: {
      whistleblower: "Document the prescribing incentive structure. Pharmaceutical sales representatives' call notes, speaker program payments (Open Payments database), and internal marketing materials that target high-prescribing physicians are the critical evidence. The 'pill mill' pattern is detectable in prescription monitoring program data: physicians prescribing 90+ MME/day to 50+ patients simultaneously.",
      plaintiff: "State attorneys general secured $50B+ in opioid settlements from manufacturers (Purdue, J&J), distributors (McKesson, Cardinal, AmerisourceBergen), and pharmacy chains (Walgreens, CVS, Walmart). Municipal litigation under public nuisance theory succeeded in multiple jurisdictions. The next litigation wave targets pharmacy benefit managers who profited from opioid distribution through formulary placement.",
      regulator: "DEA controls scheduling and production quotas. FDA controls approval and labeling. CMS controls Medicaid/Medicare reimbursement. The enforcement gap: DEA suspended only 285 registrations from 2010-2020 despite tens of thousands of suspicious prescribing patterns. PDMP (prescription drug monitoring program) data is available but interstate sharing remains incomplete. SAMHSA treatment funding is chronically below need.",
      legislator: "The SUPPORT Act (2018) expanded treatment access and PDMP requirements. The Mainstreaming Addiction Treatment Act (2021) removed the X-waiver barrier to buprenorphine prescribing. Committee jurisdiction: HELP, Energy & Commerce, Judiciary. The structural intervention is treatment-on-demand with guaranteed 72-hour access to medication-assisted treatment for anyone who requests it.",
      investor: "Pharmaceutical companies with opioid exposure face $50B+ in settlement liability. Distributors (McKesson, Cardinal, AmerisourceBergen) face ongoing litigation. PBMs with opioid formulary exposure are the next target. Portfolio screening should include: opioid revenue as percentage of total, litigation reserve adequacy, and suspicious order monitoring program quality.",
      supranational: "The UN Single Convention on Narcotic Drugs (1961) and WHO Essential Medicines List govern international opioid access. The paradox: 80% of the world's population has inadequate access to pain management while the US has catastrophic over-access. The International Narcotics Control Board (INCB) monitors but cannot enforce. Fentanyl precursor chemical controls require cooperation from China and India.",
    },
    faq: [
      { q: "Why did restricting prescriptions increase deaths?", a: "Dependence is pharmacological, not behavioral. When prescription access was restricted after 2012, 2.5 million Americans with opioid use disorder did not stop using opioids — they switched to heroin and then fentanyl. Fentanyl is 50-100x more potent than morphine and has no quality control. The per-dose mortality rate of illicit fentanyl is approximately 20x higher than prescription opioids." },
      { q: "What is the proven solution?", a: "Portugal decriminalized drug possession in 2001 and invested heavily in treatment infrastructure. Drug-related deaths fell 85% over 15 years. Switzerland's heroin-assisted treatment program reduced crime by 60% and increased employment among participants by 40%. The proven model is treatment-on-demand with harm reduction, not supply restriction." },
      { q: "How much did the Sackler family personally benefit?", a: "The Sackler family extracted $10.7 billion from Purdue Pharma between 2007 and 2018 through dividends, transfers, and trust distributions. The bankruptcy settlement required $6 billion in restitution — $4.7 billion less than the extraction. The family retained billions in offshore trusts. The settlement included civil liability releases for individual family members." },
    ],
  },

  "conflict-minerals": {
    keyFindings: [
      "Conflict mineral extraction generates $255.7 billion in annual welfare destruction against $20.3 billion in revenue, producing βW = 12.60.",
      "The Fungibility Floor proves that mineral commodities are physically indistinguishable by origin once processed. No certification scheme can guarantee conflict-free status through a multi-stage refining supply chain.",
      "Armed groups in the DRC generated an estimated $185 million annually from artisanal mining of tin, tantalum, tungsten, and gold (3TG) — funding that directly sustains conflicts responsible for 5.4 million deaths since 1998.",
      "The Dodd-Frank Section 1502 conflict minerals rule increased compliance costs but did not reduce armed group revenue. Minerals were simply rerouted through neighboring countries (Rwanda, Uganda, Burundi) and relabeled.",
      "Cobalt — not covered by 3TG regulations — is the largest conflict mineral by revenue. The DRC produces 70% of global cobalt, with 15-30% from artisanal mines using child labor.",
    ],
    theorem: {
      formal: "Under Commodity Fungibility (A1), Refining Opacity (A2), and Demand Inelasticity (A3): no traceability system can guarantee conflict-free mineral sourcing when the commodity is physically indistinguishable by origin after smelting and global demand exceeds conflict-free supply capacity.",
      plain: "A kilogram of refined cobalt from the DRC is chemically identical to a kilogram from Australia. Once smelted, the atoms carry no passport. Every certification scheme relies on paper trails, and paper trails can be forged for less than $1 per shipment. The conflict mineral is not a different mineral — it is the same mineral with a different receipt.",
    },
    mcResults: { beta: 12.60, ci: "[9.20, 16.00]", dw: 255.7, pi: 20.3 },
    agents: {
      whistleblower: "Document the gap between smelter certifications and actual sourcing practices. The Responsible Minerals Initiative (RMI) audits smelters, but audit scope is limited to documentation review. Physical isotope tracing can identify geographic origin but is not commercially deployed at scale. The evidence trail runs through transit countries' export records that exceed domestic production capacity.",
      plaintiff: "Causes of action under the Alien Tort Statute (limited), TVPA, and state consumer protection statutes. Apple, Google, Dell, Microsoft, and Tesla were named in a 2019 lawsuit (IRAdvocates v. Apple) alleging cobalt supply chain complicity in child labor deaths. Discovery should target supplier due diligence reports and procurement decisions that prioritized cost over verified conflict-free sourcing.",
      regulator: "SEC administers Dodd-Frank 1502 reporting. CBP enforces the Tariff Act forced labor import ban. The enforcement gap: SEC reporting is self-certified with no independent verification requirement. The EU Conflict Minerals Regulation (2021) covers 3TG importers but exempts downstream manufacturers. No regulator covers cobalt comprehensively.",
      legislator: "Dodd-Frank 1502 remains the primary US framework but has been weakened by SEC non-enforcement since 2017. The EU Conflict Minerals Regulation applies to importers above volume thresholds. Committee jurisdiction: Financial Services, Foreign Affairs. The structural intervention is extending mandatory due diligence to cobalt and all critical minerals with conflict-risk sourcing.",
      investor: "Technology companies (Apple, Samsung, Tesla) and automotive manufacturers face supply chain risk from conflict mineral exposure. The EU Battery Regulation (2023) requires due diligence for battery supply chains including cobalt. ESG screening should include: percentage of minerals sourced from CAHRA (Conflict-Affected and High-Risk Areas), smelter audit completion rate, and remediation investment.",
      supranational: "The OECD Due Diligence Guidance for Responsible Supply Chains (2011) is the international standard. The EU Conflict Minerals Regulation (2021) implemented mandatory due diligence for EU importers. The Kimberley Process (diamonds) demonstrated that certification without independent enforcement creates a legitimacy facade. The gap is cobalt — the largest conflict mineral by revenue — which no international framework comprehensively covers.",
    },
    faq: [
      { q: "Why did Dodd-Frank 1502 fail to reduce conflict financing?", a: "The rule required disclosure but not action. Companies reported their supply chain status but faced no penalty for reporting 'unable to determine.' Armed groups adapted by routing minerals through neighboring countries. The compliance cost ($500M+/year across all filers) exceeded the armed group revenue it was supposed to eliminate ($185M/year). The intervention was more expensive than the problem it targeted." },
      { q: "Can blockchain solve mineral traceability?", a: "Blockchain creates an immutable record of transactions but cannot verify the physical origin of the mineral entered into the system. 'Garbage in, garbage out' applies: if a smelter enters false origin data, the blockchain faithfully records the lie. Physical traceability (isotope analysis, spectral fingerprinting) is more promising but not commercially scalable." },
      { q: "What about synthetic alternatives?", a: "Lithium iron phosphate (LFP) batteries eliminate cobalt entirely and now account for 40%+ of global EV battery production. This is demand-side dissolution of the Hollow Win — the most effective intervention is making the conflict mineral unnecessary. Tesla's shift to LFP demonstrates the pathway." },
    ],
  },

  private_prisons: {
    keyFindings: [
      "The private prison industry generates $96.7 billion in annual welfare destruction against $8 billion in revenue, producing βW = 12.08.",
      "The Recidivism Incentive Floor proves that private prison operators face a structural incentive to maximize recidivism. Every re-incarceration is a repeat customer. Reducing recidivism reduces revenue.",
      "CoreCivic and GEO Group control 75% of the private prison market. Their combined lobbying expenditure exceeded $25 million from 2000 to 2024, targeting sentencing policy and immigration detention contracts.",
      "Private prison contracts include 'lockup quotas' (minimum occupancy guarantees) in 65% of facilities. Arizona's contract guarantees 100% occupancy — the state pays for empty beds.",
      "States that eliminated private prisons (Illinois 2009, New York 2007) saw no increase in incarceration costs and significant improvements in reentry program quality.",
    ],
    theorem: {
      formal: "Under Revenue-Recidivism Identity (A1), Occupancy Guarantee Lock-in (A2), and Rehabilitation-Revenue Conflict (A3): no private prison operator can simultaneously maximize shareholder value and minimize recidivism. The profit function is positively correlated with the welfare cost function.",
      plain: "The business model requires prisoners. More prisoners means more revenue. Lower recidivism means fewer prisoners means less revenue. No amount of corporate social responsibility reporting changes the arithmetic. When rehabilitation reduces your customer base, you will not invest in rehabilitation. The incentive is structural, not moral.",
    },
    mcResults: { beta: 12.08, ci: "[8.80, 15.40]", dw: 96.7, pi: 8.0 },
    agents: {
      whistleblower: "Document the gap between rehabilitation program claims and actual investment. Private prison operators report rehabilitation spending in investor presentations but the per-inmate expenditure on programming is 40-60% lower than in comparable public facilities. Internal budget documents, staffing ratios for educational and vocational programs, and recidivism tracking data are the critical evidence.",
      plaintiff: "Causes of action include 42 USC 1983 (constitutional violations by state actors), breach of contract (failure to meet contractual programming requirements), and state tort claims for negligent conditions. Class actions have succeeded against both CoreCivic and GEO Group for inadequate medical care, violence, and understaffing. Discovery should target occupancy quota contracts, lobbying expenditures on sentencing policy, and internal communications about rehabilitation program budgets.",
      regulator: "The Bureau of Prisons (federal), state corrections departments (state), and ICE (immigration detention) oversee private facilities. The enforcement gap: facility inspections are typically announced in advance, allowing temporary improvements. DOJ Inspector General reports documented significant quality disparities between private and public facilities. The Biden executive order (2021) restricted new federal private prison contracts but did not affect state or immigration facilities.",
      legislator: "The Private Prison Information Act would require disclosure of private prison performance data. The Justice is Not for Sale Act would ban federal private prison contracts entirely. Committee jurisdiction: Judiciary. The structural intervention is ending occupancy guarantee contracts and requiring performance-based contracts where payment is inversely correlated with recidivism.",
      investor: "CoreCivic (CXW) and GEO Group (GEO) converted to REITs to avoid corporate income tax. Both face ESG exclusion from major institutional investors. JPMorgan Chase, Wells Fargo, Bank of America, and Goldman Sachs have all divested from private prison financing. The business model is under existential threat from state-level bans and federal contract restrictions.",
      supranational: "The Nelson Mandela Rules (UN Standard Minimum Rules for the Treatment of Prisoners, revised 2015) establish global standards. The UN Special Rapporteur on Torture has flagged conditions in US private prisons. No international treaty specifically addresses private incarceration, but the ICCPR (Article 10) requires humane treatment of detained persons. The US is exceptional among democracies in the scale of its private prison system.",
    },
    faq: [
      { q: "Why is the βW so high relative to the revenue?", a: "Private prison revenue is $8B, but the total cost of mass incarceration that private prisons incentivize is far larger. The welfare cost includes: direct incarceration costs beyond private payments ($30B), lost earnings of incarcerated individuals ($35B), family welfare costs ($15B), reentry barriers ($10B), and community destabilization ($6.7B). Private prisons are the profit center of a much larger system of welfare destruction." },
      { q: "Does ending private prisons solve mass incarceration?", a: "Private prisons hold only 8% of state and federal inmates. Ending private prisons addresses the incentive misalignment but not the scale of incarceration. Sentencing reform, drug decriminalization, and investment in alternatives to incarceration are the structural interventions. Private prison abolition removes a powerful lobby against those reforms." },
      { q: "What about immigration detention?", a: "ICE detention is 75%+ privatized. Immigration detention contracts are the fastest-growing segment for CoreCivic and GEO Group. Federal private prison restrictions have not affected immigration detention. The same incentive misalignment applies: more detainees means more revenue." },
    ],
  },

  "credit-ratings": {
    keyFindings: [
      "The credit rating agency oligopoly generates $123.3 billion in annual welfare destruction against $11 billion in revenue, producing βW = 11.21.",
      "The Issuer-Pays Corruption Floor proves that when the entity being rated pays for the rating, the incentive to inflate ratings is structural. The issuer-pays model makes rating accuracy inversely correlated with revenue.",
      "Moody's, S&P, and Fitch control 95% of the global ratings market. In 2006-2007, these agencies rated 73% of subprime CDOs as AAA. The 2008 financial crisis destroyed $10 trillion in household wealth.",
      "The SEC's NRSRO designation creates a regulatory moat: only designated agencies' ratings satisfy regulatory capital requirements. Three agencies have held this designation since the 1970s.",
      "Post-crisis reforms (Dodd-Frank, EU CRA Regulation) added disclosure requirements but did not change the issuer-pays business model. Rating shopping — seeking the most favorable rating across agencies — remains standard practice.",
    ],
    theorem: {
      formal: "Under Issuer-Pays Identity (A1), NRSRO Regulatory Moat (A2), and Rating Shopping Equilibrium (A3): no disclosure-based reform can eliminate the incentive to inflate ratings when the issuer selects and pays the rating agency. The Nash equilibrium of the rating game is systematic inflation, because the agency that rates most favorably wins the most business.",
      plain: "The company being graded pays the grader. The grader who gives the best grades gets the most business. This is not a market failure — it is the market working exactly as designed. Dodd-Frank added transparency but did not change who pays. As long as the issuer pays, the rating is a sales tool, not an assessment.",
    },
    mcResults: { beta: 11.21, ci: "[9.70, 12.70]", dw: 123.3, pi: 11.0 },
    agents: {
      whistleblower: "Document the internal pressure to maintain issuer relationships. Rating analysts' emails and internal communications showing commercial pressure on analytical decisions are the critical evidence. The Financial Crisis Inquiry Commission published internal S&P communications stating 'Let's hope we are all wealthy and retired by the time this house of cards falters.' Similar evidence exists in every rating cycle.",
      plaintiff: "Rating agencies have historically claimed First Amendment protection for ratings as 'opinions.' Post-crisis litigation (Abu Dhabi Commercial Bank v. Morgan Stanley, Calpers v. S&P) established that ratings issued for a fee to a limited audience may be actionable. Discovery should target the gap between internal risk assessments and published ratings, and communications showing commercial pressure on rating committees.",
      regulator: "SEC oversees NRSROs under the Credit Rating Agency Reform Act (2006) and Dodd-Frank. The enforcement gap: SEC has revoked zero NRSRO designations since the program began in 1975. The regulatory moat protects the oligopoly while the SEC lacks the resources or willingness to challenge it. The EU's ESMA has been marginally more aggressive with fines but has not altered market structure.",
      legislator: "Dodd-Frank Section 939 required the SEC to study removing NRSRO references from regulation — a study that recommended removal, which was never implemented. Committee jurisdiction: Banking, Financial Services. The structural intervention is replacing issuer-pays with investor-pays or platform-pays models and removing NRSRO designations from regulatory capital requirements.",
      investor: "Portfolio managers who rely on credit ratings for regulatory compliance are exposed to systematic inflation risk. The 2008 crisis demonstrated that AAA ratings provided false assurance. Internal credit analysis capacity, independent credit research (CreditSights, Gimme Credit), and credit default swap spreads as market-based risk measures reduce dependence on agency ratings.",
      supranational: "The Financial Stability Board (FSB) recommended reducing reliance on external credit ratings in 2010. The Basel Committee incorporated the recommendation into Basel III. The EU CRA Regulation (2009, amended 2013) requires registration, disclosure, and rotation for structured finance ratings. The gap: no international framework addresses the issuer-pays model or the global oligopoly structure.",
    },
    faq: [
      { q: "Why did the agencies face so little accountability after 2008?", a: "Three structural protections: (1) First Amendment defense for ratings as 'opinions,' (2) the SEC's dependence on NRSROs for regulatory capital compliance, and (3) the 'essential facility' argument — the financial system cannot function without credit ratings, so destroying the agencies would create systemic risk. The agencies are too embedded to punish." },
      { q: "Does the investor-pays model work?", a: "The Egan-Jones model (investor-pays) produces more timely downgrades and less rating inflation than issuer-pays agencies. But Egan-Jones has 2% market share because regulatory capital requirements reference NRSRO ratings, and the three incumbent NRSROs control 95% of the market. The model works; the regulatory architecture prevents adoption." },
      { q: "What happened to the Franken Amendment?", a: "Senator Al Franken proposed a CRA assignment board that would randomly assign rating agencies to structured finance deals, eliminating rating shopping. The amendment passed the Senate but was stripped in conference and replaced with a 'study' requirement. The SEC studied it, found it would work, and did not implement it. The issuer-pays lobby prevailed." },
    ],
  },

  mining_rare_earth: {
    keyFindings: [
      "Mining and rare earth extraction generates $322 billion in annual welfare destruction against $150 billion in revenue, producing βW = 11.15.",
      "The Extraction Irreversibility Floor proves that mineral extraction and environmental destruction are the same physical act. No extraction technology separates the mineral from the ecosystem without permanent damage to the ecosystem.",
      "China controls 60% of rare earth mining and 90% of processing. This supply chain concentration creates both environmental and geopolitical welfare costs — environmental from unregulated processing, geopolitical from supply weaponization.",
      "Rare earth processing generates radioactive thorium and uranium waste. The Lynas Malaysia processing facility produces 450 tonnes of radioactive waste annually. No commercially viable thorium disposal method exists.",
      "The tailings dam failure rate is 1.5% per year. The Brumadinho dam collapse (Brazil, 2019) killed 270 people. The Mount Polley failure (Canada, 2014) released 25 million cubic meters of contaminated water. These are not accidents — they are actuarial certainties.",
    ],
    theorem: {
      formal: "Under Extraction-Disruption Identity (A1), Waste Persistence (A2), and Tailings Accumulation (A3): no extraction method can separate mineral value from environmental destruction when the ore body and the ecosystem occupy the same physical space. The welfare cost floor is set by the irreversibility of landscape transformation and the persistence of processing waste.",
      plain: "You cannot mine without a hole. The hole is permanent. The tailings are permanent. The acid drainage is permanent. Every ton of rare earth oxide produces 2,000 tons of toxic waste including radioactive thorium. The mountain does not grow back. The aquifer does not un-contaminate. The extraction and the destruction are the same physical act.",
    },
    mcResults: { beta: 11.15, ci: "[4.50, 14.80]", dw: 322.0, pi: 150.0 },
    agents: {
      whistleblower: "Document the gap between environmental impact assessments and actual operational practices. Mine operators routinely underestimate water contamination extent, tailings volume, and acid drainage duration. The evidence is in groundwater monitoring data downstream of operations, satellite imagery showing unauthorized expansion, and worker health records showing elevated heavy metal exposure.",
      plaintiff: "Causes of action include Clean Water Act citizen suits, CERCLA cost recovery, state environmental statutes, and tort claims for property damage and personal injury. The Brumadinho collapse resulted in $7 billion in settlements and criminal charges. Discovery should target geotechnical monitoring data, tailings dam stability assessments, and internal communications about known environmental risks.",
      regulator: "EPA (CERCLA, CWA), BLM (federal lands), state environmental agencies, and MSHA (safety) share jurisdiction. The enforcement gap: mining operations on federal land pay royalties set in 1872 (General Mining Law) with no inflation adjustment. Hardrock mining has no federal reclamation bonding requirement comparable to coal. Abandoned mines number 500,000+ in the US alone with cleanup costs exceeding $50 billion.",
      legislator: "The Mining Law of 1872 remains the governing federal statute — unchanged for 154 years. The Hardrock Mining and Reclamation Act has been introduced and failed repeatedly. Committee jurisdiction: Energy and Natural Resources, Natural Resources. The structural intervention is modernizing the 1872 Mining Law with: fair royalties, mandatory reclamation bonding, and environmental performance standards.",
      investor: "Mining companies face increasing ESG scrutiny and tailings dam liability. The Global Industry Standard on Tailings Management (2020) was created after Brumadinho but adoption is voluntary. Companies with high-risk tailings facilities (rated by the Church of England Investor Mining & Tailings Safety Initiative) face stranded asset risk. Portfolio screening should include: tailings facility risk rating, reclamation bonding adequacy, and water quality compliance history.",
      supranational: "The Minamata Convention (mercury), Basel Convention (hazardous waste), and EITI (Extractive Industries Transparency Initiative) provide partial international frameworks. No binding international standard governs rare earth processing waste or tailings dam safety. The International Council on Mining and Metals (ICMM) is industry-led and voluntary. The gap is binding international regulation of processing waste, particularly radioactive waste from rare earth refining.",
    },
    faq: [
      { q: "Why is the 90% CI so wide ([4.50, 14.80])?", a: "Mining welfare costs vary enormously by deposit type, extraction method, regulatory regime, and waste management practice. A well-regulated Australian operation has βW around 4-5. An unregulated artisanal mine in the DRC has βW above 15. The wide CI reflects genuine variation in practices, not measurement imprecision." },
      { q: "Can recycling eliminate the need for new extraction?", a: "Urban mining (recycling electronics for rare earths) currently supplies less than 1% of demand. Recycling rates for rare earths are below 5% globally because collection infrastructure does not exist and separation chemistry is expensive. Recycling will reduce but cannot eliminate extraction demand within any foreseeable technology horizon." },
      { q: "What about deep-sea mining as an alternative?", a: "Deep-sea mining replaces terrestrial environmental destruction with abyssal environmental destruction. The welfare cost shifts from land ecosystems to marine ecosystems. The Abyssal Recovery Floor theorem (SAPM Paper #8) proves that deep-sea mining has its own irreducible βW. Substituting one extraction frontier for another does not solve the problem — it relocates it." },
    ],
  },
};

// ─── BUILD SORTED PAPER LIST ──────────────────────────────────
function buildPaperList() {
  // Domain papers sorted by canonical βW descending
  const domainPapers = DOMAINS
    .filter(d => d.id !== "ppt")
    .map(d => {
      const canonical = getCanonicalBeta(d);
      return {
        type: "domain",
        id: d.id,
        name: d.name,
        shortName: d.shortName,
        paperNumber: d.paperNumber,
        beta: canonical.beta,
        ci: canonical.ci,
        dw: canonical.dw,
        pi: canonical.pi,
        theoremType: getTheoremType(d),
        theoremName: d.theorem?.name || null,
        summary: d.paper?.summary || d.risk || "Domain paper in the SAPM series.",
        content: PAPER_CONTENT[d.id] || null,
        slug: d.id,
      };
    })
    .sort((a, b) => (b.beta || 0) - (a.beta || 0));

  // PPT foundational paper
  const pptDomain = DOMAINS.find(d => d.id === "ppt");
  const pptPaper = {
    type: "foundational",
    id: "ppt",
    name: pptDomain.name,
    shortName: "PPT",
    paperNumber: 1,
    beta: null,
    ci: null,
    dw: null,
    pi: null,
    theoremType: "Foundational",
    theoremName: "The Private Pareto Theorem",
    summary: pptDomain.paper.summary,
    content: null,
    slug: "ppt",
  };

  // Framework papers
  const fwPapers = FRAMEWORK_PAPERS.map((p, i) => ({
    type: "framework",
    id: p.id,
    name: p.name,
    shortName: p.shortName,
    paperNumber: 62 + i + 1,
    beta: null,
    ci: null,
    dw: null,
    pi: null,
    theoremType: p.theoremType,
    theoremName: p.name,
    summary: p.summary,
    content: null,
    slug: p.id,
  }));

  // Other papers
  const otherPapers = OTHER_PAPERS.map((p, i) => ({
    type: "other",
    id: p.id,
    name: p.name,
    shortName: p.shortName,
    paperNumber: 68 + i + 1,
    beta: null,
    ci: null,
    dw: null,
    pi: null,
    theoremType: p.theoremType,
    theoremName: p.name,
    summary: p.summary,
    content: null,
    slug: p.id,
  }));

  return [...domainPapers, pptPaper, ...fwPapers, ...otherPapers];
}

// ─── COLLAPSIBLE SECTION ──────────────────────────────────────
function CollapsibleSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 8 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 8, width: "100%",
          padding: "10px 12px", background: "rgba(255,255,255,0.03)",
          border: `1px solid ${BORDER}`, borderRadius: 4, cursor: "pointer",
          textAlign: "left", transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
      >
        <span style={{ fontFamily: M, fontSize: 12, color: GOLD, minWidth: 12 }}>
          {open ? "\u25BE" : "\u25B8"}
        </span>
        <span style={{ fontFamily: M, fontSize: 12, color: TEXT, letterSpacing: 1 }}>
          {title}
        </span>
      </button>
      <div style={{
        maxHeight: open ? 5000 : 0,
        overflow: "hidden",
        transition: "max-height 0.4s ease-in-out",
        opacity: open ? 1 : 0,
      }}>
        <div style={{ padding: "12px 16px", borderLeft: `2px solid ${BORDER}`, marginLeft: 6, marginTop: 4 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── PAPER CARD ───────────────────────────────────────────────
function PaperCard({ paper, rank }) {
  const [expanded, setExpanded] = useState(false);
  const badgeColor = getTheoremBadgeColor(paper.theoremType);
  const hasContent = !!paper.content;

  return (
    <div style={{
      background: SURFACE,
      border: `1px solid ${expanded ? "rgba(245,158,11,0.3)" : BORDER}`,
      borderRadius: 6,
      marginBottom: 10,
      transition: "border-color 0.3s",
    }}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex", alignItems: "center", gap: 12, width: "100%",
          padding: "16px 20px", background: "transparent", border: "none",
          cursor: "pointer", textAlign: "left",
        }}
      >
        {/* Rank */}
        {paper.beta !== null && (
          <div style={{
            fontFamily: M, fontSize: 11, color: MUTED, minWidth: 28, textAlign: "right",
          }}>
            #{rank}
          </div>
        )}

        {/* Beta badge */}
        {paper.beta !== null ? (
          <div style={{
            fontFamily: M, fontSize: 14, fontWeight: 700,
            color: paper.beta >= 10 ? RED : paper.beta >= 5 ? GOLD : GREEN,
            minWidth: 52, textAlign: "right",
          }}>
            {paper.beta.toFixed(2)}
          </div>
        ) : (
          <div style={{ minWidth: paper.type === "domain" ? 80 : 0 }} />
        )}

        {/* Name */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: S, fontSize: 17, color: TEXT, lineHeight: 1.3,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {paper.name}
          </div>
          <div style={{
            fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.5, marginTop: 2,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {paper.summary?.slice(0, 120)}{paper.summary?.length > 120 ? "..." : ""}
          </div>
        </div>

        {/* Theorem type badge */}
        <div style={{
          fontFamily: M, fontSize: 10, letterSpacing: 1,
          color: badgeColor, padding: "3px 10px",
          background: `${badgeColor}15`,
          border: `1px solid ${badgeColor}30`,
          borderRadius: 3, whiteSpace: "nowrap",
        }}>
          {paper.theoremType.toUpperCase()}
        </div>

        {/* Expand indicator */}
        <span style={{ fontFamily: M, fontSize: 14, color: MUTED, minWidth: 16, textAlign: "center" }}>
          {expanded ? "\u25BE" : "\u25B8"}
        </span>
      </button>

      {/* Expanded content */}
      <div style={{
        maxHeight: expanded ? 20000 : 0,
        overflow: "hidden",
        transition: "max-height 0.5s ease-in-out",
        opacity: expanded ? 1 : 0,
      }}>
        <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${BORDER}` }}>
          {hasContent ? (
            <FullContent paper={paper} />
          ) : (
            <PlaceholderContent paper={paper} />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── FULL CONTENT (for top 10 papers) ─────────────────────────
function FullContent({ paper }) {
  const c = paper.content;
  return (
    <div style={{ paddingTop: 16 }}>
      {/* Key Findings */}
      <CollapsibleSection title="KEY FINDINGS" defaultOpen>
        <ul style={{ margin: 0, paddingLeft: 20, listStyleType: "none" }}>
          {c.keyFindings.map((f, i) => (
            <li key={i} style={{
              fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.7,
              marginBottom: 10, position: "relative", paddingLeft: 4,
            }}>
              <span style={{ color: GOLD, position: "absolute", left: -16 }}>&#8226;</span>
              {f}
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* The Theorem */}
      <CollapsibleSection title="THE THEOREM">
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>
            {paper.theoremName}
          </div>
          <div style={{
            fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7,
            fontStyle: "italic", padding: "12px 16px",
            background: "rgba(245,158,11,0.04)", borderLeft: `3px solid ${GOLD}`,
            borderRadius: "0 4px 4px 0",
          }}>
            {c.theorem.formal}
          </div>
        </div>
        <div style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1, marginBottom: 6 }}>
          PLAIN ENGLISH
        </div>
        <div style={{ fontFamily: S, fontSize: 16, color: TEXT, lineHeight: 1.8 }}>
          {c.theorem.plain}
        </div>
      </CollapsibleSection>

      {/* Monte Carlo Results */}
      <CollapsibleSection title="MONTE CARLO RESULTS">
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 12,
        }}>
          <MCStatBox label="\u03B2W" value={c.mcResults.beta?.toFixed(2)} color={c.mcResults.beta >= 10 ? RED : GOLD} />
          <MCStatBox label="90% CI" value={c.mcResults.ci} color={DIM} />
          <MCStatBox label="\u0394W ($B/yr)" value={c.mcResults.dw ? `$${c.mcResults.dw.toLocaleString()}B` : "TBD"} color={RED} />
          <MCStatBox label="\u03A0 ($B/yr)" value={c.mcResults.pi ? `$${c.mcResults.pi.toLocaleString()}B` : "TBD"} color={GREEN} />
        </div>
        <div style={{ fontFamily: M, fontSize: 11, color: MUTED }}>
          N=10,000 draws | Seed=42 | Triangular + lognormal + uniform distributions
        </div>
      </CollapsibleSection>

      {/* Six-Agent Advice */}
      <CollapsibleSection title="SIX-AGENT ADVICE">
        {[
          { key: "whistleblower", label: "WHISTLEBLOWER", icon: "\uD83D\uDCE3" },
          { key: "plaintiff", label: "PLAINTIFF", icon: "\u2696\uFE0F" },
          { key: "regulator", label: "REGULATOR", icon: "\uD83C\uDFDB\uFE0F" },
          { key: "legislator", label: "LEGISLATOR", icon: "\uD83D\uDCDC" },
          { key: "investor", label: "INVESTOR", icon: "\uD83D\uDCC8" },
          { key: "supranational", label: "SUPRANATIONAL", icon: "\uD83C\uDF10" },
        ].map(agent => (
          <div key={agent.key} style={{ marginBottom: 14 }}>
            <div style={{
              fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 1, marginBottom: 4,
            }}>
              {agent.label}
            </div>
            <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>
              {c.agents[agent.key]}
            </div>
          </div>
        ))}
      </CollapsibleSection>

      {/* FAQ */}
      <CollapsibleSection title="FREQUENTLY ASKED QUESTIONS">
        {c.faq.map((item, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{
              fontFamily: M, fontSize: 13, color: TEXT, fontWeight: 600, marginBottom: 6,
            }}>
              Q: {item.q}
            </div>
            <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>
              {item.a}
            </div>
          </div>
        ))}
      </CollapsibleSection>

      {/* Links */}
      <CollapsibleSection title="LINKS">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <LinkBadge label="SSRN" href="#" disabled note="Coming soon" />
          <LinkBadge label="Simulation Repo" href={`https://github.com/epostnieks/sapm-mc-${paper.slug}`} />
          <LinkBadge label="Companion Site" href="#" disabled note="Coming soon" />
        </div>
      </CollapsibleSection>
    </div>
  );
}

// ─── PLACEHOLDER CONTENT ──────────────────────────────────────
function PlaceholderContent({ paper }) {
  return (
    <div style={{ paddingTop: 16 }}>
      {/* MC Results if available */}
      {paper.beta !== null && (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16,
        }}>
          <MCStatBox label="\u03B2W" value={paper.beta?.toFixed(2)} color={paper.beta >= 10 ? RED : GOLD} />
          <MCStatBox label="90% CI" value={paper.ci || "TBD"} color={DIM} />
          <MCStatBox label="\u0394W ($B/yr)" value={paper.dw ? `$${paper.dw.toLocaleString()}B` : "TBD"} color={RED} />
          <MCStatBox label="\u03A0 ($B/yr)" value={paper.pi ? `$${paper.pi.toLocaleString()}B` : "TBD"} color={GREEN} />
        </div>
      )}

      {paper.theoremName && (
        <div style={{ fontFamily: M, fontSize: 12, color: DIM, marginBottom: 12 }}>
          Theorem: {paper.theoremName}
        </div>
      )}

      <div style={{
        fontFamily: S, fontSize: 16, color: MUTED, lineHeight: 1.7,
        padding: "20px", textAlign: "center",
        background: "rgba(255,255,255,0.02)", borderRadius: 4,
        border: `1px dashed ${BORDER}`,
      }}>
        Full summary coming soon. Key findings, six-agent advice, FAQ, and section-by-section breakdown
        will be added as each paper is finalized.
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
        <LinkBadge label="SSRN" href="#" disabled note="Coming soon" />
        {paper.type === "domain" && (
          <LinkBadge label="Simulation Repo" href={`https://github.com/epostnieks/sapm-mc-${paper.slug}`} />
        )}
      </div>
    </div>
  );
}

// ─── HELPER COMPONENTS ────────────────────────────────────────
function MCStatBox({ label, value, color }) {
  return (
    <div style={{
      padding: "10px 12px", background: "rgba(255,255,255,0.03)",
      border: `1px solid ${BORDER}`, borderRadius: 4, textAlign: "center",
    }}>
      <div style={{ fontFamily: M, fontSize: 18, fontWeight: 700, color }}>{value || "TBD"}</div>
      <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 1, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function LinkBadge({ label, href, disabled = false, note }) {
  return (
    <a
      href={disabled ? undefined : href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: M, fontSize: 11, letterSpacing: 1,
        color: disabled ? MUTED : GOLD,
        padding: "6px 14px",
        background: disabled ? "rgba(255,255,255,0.02)" : "rgba(245,158,11,0.08)",
        border: `1px solid ${disabled ? BORDER : "rgba(245,158,11,0.2)"}`,
        borderRadius: 4,
        textDecoration: "none",
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {label} {note && <span style={{ color: MUTED, fontSize: 10 }}>({note})</span>}
    </a>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function PaperSummaries() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const allPapers = useMemo(() => buildPaperList(), []);

  const filtered = useMemo(() => {
    let papers = allPapers;

    // Filter by theorem type
    if (filter !== "All") {
      papers = papers.filter(p => p.theoremType === filter);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      papers = papers.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortName?.toLowerCase().includes(q) ||
        p.summary?.toLowerCase().includes(q) ||
        p.theoremName?.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    }

    return papers;
  }, [allPapers, search, filter]);

  // Compute ranks for display (based on βW descending among domain papers)
  const domainRanks = useMemo(() => {
    const ranked = allPapers
      .filter(p => p.type === "domain" && p.beta !== null)
      .sort((a, b) => b.beta - a.beta);
    const map = {};
    ranked.forEach((p, i) => { map[p.id] = i + 1; });
    return map;
  }, [allPapers]);

  const filterButtons = ["All", "Impossibility", "Intractability", "Foundational", "Framework", "Methodology"];
  const domainCount = filtered.filter(p => p.type === "domain").length;
  const populatedCount = filtered.filter(p => p.content).length;

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* HEADER */}
        <div style={{ paddingTop: 72, marginBottom: 32, textAlign: "center" }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 4, marginBottom: 12 }}>
            PAPER SUMMARIES
          </div>
          <h1 style={{ fontFamily: S, fontSize: 32, fontWeight: 300, color: TEXT, margin: "0 0 12px", lineHeight: 1.3 }}>
            73 Working Papers in 15 Minutes Each
          </h1>
          <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.7, maxWidth: 650, margin: "0 auto" }}>
            Section-by-section summaries for college-level readers. Key findings, formal theorems in plain English,
            Monte Carlo results, six-agent advice, and FAQs.
          </div>
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginTop: 12 }}>
            {populatedCount} papers with full summaries | {allPapers.length} total
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div style={{ marginBottom: 24 }}>
          {/* Search */}
          <input
            type="text"
            placeholder="Search papers by name, domain, or keyword..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px", fontFamily: M, fontSize: 13,
              background: SURFACE, color: TEXT, border: `1px solid ${BORDER}`,
              borderRadius: 4, outline: "none", boxSizing: "border-box",
              marginBottom: 12,
            }}
            onFocus={e => e.target.style.borderColor = GOLD}
            onBlur={e => e.target.style.borderColor = BORDER}
          />

          {/* Filter buttons */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {filterButtons.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontFamily: M, fontSize: 11, letterSpacing: 1,
                  color: filter === f ? BG : (f === "Impossibility" ? RED : f === "Intractability" ? GOLD : f === "Foundational" ? CYAN : DIM),
                  background: filter === f
                    ? (f === "Impossibility" ? RED : f === "Intractability" ? GOLD : f === "Foundational" ? CYAN : DIM)
                    : "transparent",
                  border: `1px solid ${f === "Impossibility" ? RED + "40" : f === "Intractability" ? GOLD + "40" : f === "Foundational" ? CYAN + "40" : BORDER}`,
                  padding: "6px 14px", borderRadius: 4, cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginTop: 10 }}>
            Showing {filtered.length} of {allPapers.length} papers
            {filter !== "All" && ` | Filter: ${filter}`}
            {search && ` | Search: "${search}"`}
          </div>
        </div>

        {/* PAPER LIST */}
        {filtered.map(paper => (
          <PaperCard
            key={paper.id}
            paper={paper}
            rank={domainRanks[paper.id] || null}
          />
        ))}

        {filtered.length === 0 && (
          <div style={{
            padding: "40px 20px", textAlign: "center",
            fontFamily: S, fontSize: 18, color: MUTED,
          }}>
            No papers match your search criteria.
          </div>
        )}

        {/* FOOTER */}
        <div style={{ padding: "32px 0", borderTop: `1px solid ${BORDER}`, textAlign: "center", marginTop: 24 }}>
          <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7, marginBottom: 8 }}>
            Full summaries are generated from the working papers and verified against the published text.
            Monte Carlo results are reproducible (N=10,000, seed=42).
          </div>
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED }}>
            © 2026 Erik Postnieks · Independent Researcher · Salt Lake City
          </div>
        </div>
      </main>
    </div>
  );
}
