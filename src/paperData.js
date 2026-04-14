// ══════════════════════════════════════════════════════════════
// PAPER DATA — Pure data module (no "use client", no hooks)
// Shared by PaperSummaries.jsx (client) and /papers/[slug]/page.jsx (server)
// ══════════════════════════════════════════════════════════════

import DOMAINS from "./data/domains";

// ─── THEOREM TYPE DETERMINATION ───────────────────────────────
const IMPOSSIBILITY_CONSTRAINTS = [
  "Thermodynamic", "Physical", "Biological", "Geochemical", "Hydrogeological",
  "Computational", "Informational", "Chemical", "Ecological",
];

export function getTheoremType(domain) {
  if (domain.id === "ppt") return "Foundational";
  if (!domain.theorem?.constraint) return "Unknown";
  const c = domain.theorem.constraint;
  const intractKeywords = ["Institutional", "Jurisdictional", "Economic", "Political", "Legal", "Financial", "Perverse Incentive"];
  for (const kw of intractKeywords) {
    if (c.includes(kw)) return "Intractability";
  }
  return "Impossibility";
}

// ─── CANONICAL βW TABLE ──────────────────────────────────────
export const CANONICAL_BETA = {
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
  "illicit-drugs": { beta: 7.16, ci: "[5.72, 8.58]", dw: 3579.1, pi: 500.0 },
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
  return { beta: domain.beta, ci: domain.betaCI, dw: domain.welfCost, pi: domain.pi };
}

// ─── FRAMEWORK & OTHER PAPERS ────────────────────────────────
export const FRAMEWORK_PAPERS = [
  { id: "fw-reform-dividend", name: "The Reform Dividend Law", shortName: "Reform Dividend", theoremType: "Framework", summary: "Proves that eliminating a Hollow Win releases a reform dividend equal to the welfare cost minus transition costs. The dividend is always positive when transition costs are below 40% of \u0394W." },
  { id: "fw-fiscal-capture", name: "The Fiscal Capture Theorem", shortName: "Fiscal Capture", theoremType: "Framework", summary: "Demonstrates that governments dependent on tax revenue from system-degrading industries face a structural conflict: enforcement reduces the tax base. The theorem explains regulatory paralysis." },
  { id: "fw-substitution-trap", name: "The Substitution Trap Law", shortName: "Substitution Trap", theoremType: "Framework", summary: "Proves that banning one Hollow Win domain without addressing demand shifts welfare destruction to substitute domains. Prohibition of alcohol shifted welfare costs to illicit markets." },
  { id: "fw-disclosure-futility", name: "The Disclosure Futility Theorem", shortName: "Disclosure Futility", theoremType: "Framework", summary: "Shows that mandatory disclosure alone cannot resolve a Hollow Win. Parties already know their bilateral payoffs. The missing information (W) is structurally outside the disclosure space." },
  { id: "fw-postnieks-law", name: "Postnieks\u2019s Law", shortName: "Postnieks\u2019s Law", theoremType: "Framework", summary: "The cross-domain result: in any bilateral game satisfying the three Private Pareto axioms, the time to system collapse T* is inversely proportional to \u03B2W. Higher beta means faster collapse." },
  { id: "fw-conflictoring", name: "The Conflictoring Protocol", shortName: "Conflictoring", theoremType: "Framework", summary: "The six-agent diagnostic protocol that breaks the Private Systemic Tension. When k* agents activate simultaneously, conformism to the trap becomes strictly dominated." },
  { id: "fw-hollow-win", name: "The Hollow Win", shortName: "Hollow Win", theoremType: "Framework", summary: "Written for the Harvard Program on Negotiation (PON) audience. The practitioner\u2019s entry point to the entire System Asset Pricing Model program. Replaces Ury-Fisher\u2019s two-by-two outcome matrix with an eight-outcome three-dimensional classification. Seven case studies \u2014 Benchmark Rate, Volkswagen, Boeing 737 MAX, Wells Fargo, the Lysine cartel, algorithmic collusion, and leaded gasoline \u2014 demonstrate that the most common negotiation outcome is invisible to every bilateral framework. No equations by design. Connects to all 61 domain papers, the six-agent Conflictoring protocol, Decision Accounting, and the $85.3T welfare cost." },
];

export const OTHER_PAPERS = [
  { id: "ot-da-chapter1", name: "Domain Analysis Chapter 1: Methodology", shortName: "Decision Accounting Ch.1", theoremType: "Methodology", summary: "Establishes the channel decomposition methodology, Monte Carlo simulation protocol (N=10,000, seed=42), and \u03B2W computation standards used across all 61 domain papers." },
  { id: "ot-da-chapter5", name: "Domain Analysis Chapter 5: Cross-Domain", shortName: "Decision Accounting Ch.5", theoremType: "Methodology", summary: "Cross-domain analysis comparing all 61 \u03B2W estimates, identifying structural patterns across impossibility and intractability domains." },
  { id: "ot-da-chapter9", name: "Domain Analysis Chapter 9: Agent Architecture", shortName: "Decision Accounting Ch.9", theoremType: "Methodology", summary: "Defines the six-agent architecture (Whistleblower, Plaintiff, Regulator, Legislator, Investor, Supranational) and the conditions under which multi-agent activation breaks the Private Systemic Tension." },
  { id: "ot-c-adjusted-gdp", name: "C-Adjusted GDP: The Number GDP Was Supposed To Be", shortName: "C-Adjusted GDP", theoremType: "Measurement", summary: "Introduces GDP* = GDP - \u03BC\u03A3\u03B2W\u03A0. At full calibration (\u03BC=1.0), approximately $20 trillion disappears from measured global output. Country-level decomposition for 190 nations." },
  { id: "ot-pst-breaker", name: "Reform Pathfinder: 190 Countries \u00D7 61 Domains", shortName: "Reform Pathfinder", theoremType: "Tool", summary: "Country-specific reform paths for all 190 nations across all 61 domains. Identifies which reforms are achievable given each country\u2019s institutional capacity." },
  { id: "ot-curriculum", name: "The Private Pareto Theorem Curriculum: 15 Chapters \u00B7 4 Hours", shortName: "Curriculum", theoremType: "Education", summary: "The complete System Asset Pricing Model framework in 15 interactive chapters. From \u2018The Lie in the Number\u2019 through Decision Accounting, the six-agent Conflictoring protocol, all 61 domain theorems, and the five structural laws. Interactive charts and glossary tooltips throughout." },
  { id: "da_1", name: "General Equilibrium Properties of Process Disclosure: Five Theorems on Governance Documentation", shortName: "DA-1: GE Theory", theoremType: "Foundational", summary: "Develops the general equilibrium theory of process disclosure. Five theorems establish threshold adoption, coordination cascades, under-adoption, cost-of-capital amplification, and strategic complementarity. Resolves Prat\u2019s (2005) conformism paradox through multi-audience common agency." },
  { id: "da_2", name: "Regulatory Convergence: Independent Discovery of Governance Documentation Standards", shortName: "DA-2: Convergence", theoremType: "Foundational", summary: "Documents the empirical finding that sixteen independent regulatory jurisdictions converged on structurally identical governance documentation requirements. Thirteen of fifteen fields appear in all sixteen regimes with probability < 0.001 under random assignment." },
  { id: "da_3", name: "Behavioral Properties of Governance Documentation: From Nudge to Guardrail", shortName: "DA-3: Behavioral", theoremType: "Foundational", summary: "Establishes four behavioral properties of governance documentation: nudge insufficiency for governance, decay transformation, normalization resistance, and noise reduction. Introduces the guardrail as a structural intervention distinct from both nudges and mandates." },
  { id: "da_4", name: "The Decision Record Chain Standard: Technical Specification and Research Agenda", shortName: "DA-4: DRCS Spec", theoremType: "Foundational", summary: "Presents the Decision Record Chain Standard v2.0 \u2014 an open technical specification for tamper-evident governance decision records. Sixteen-field data model, Merkle tree integrity, Gaming Signature Index, prediction-outcome pairing, and ten research designs." },
];

// ─── PAPER CONTENT (substantive summaries for populated papers) ──
// Imported separately to keep this file from bloating — re-exported from PaperSummaries
// For the server-side generateStaticParams/generateMetadata, we only need slugs and metadata,
// not the full PAPER_CONTENT (which is client-only rendering data)

// ─── BUILD SORTED PAPER LIST ──────────────────────────────────
export function buildPaperList(paperContent = {}) {
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
        summary: d.paper?.summary || d.risk || "Domain paper in the System Asset Pricing Model series.",
        content: paperContent[d.id] || null,
        slug: d.id,
      };
    })
    .sort((a, b) => (b.beta || 0) - (a.beta || 0));

  const pptDomain = DOMAINS.find(d => d.id === "ppt");
  const pptPaper = {
    type: "foundational",
    id: "ppt",
    name: pptDomain.name,
    shortName: "Private Pareto Theorem",
    paperNumber: 1,
    beta: null, ci: null, dw: null, pi: null,
    theoremType: "Foundational",
    theoremName: "The Private Pareto Theorem",
    summary: pptDomain.paper.summary,
    content: paperContent["ppt"] || null,
    slug: "ppt",
  };

  const fwPapers = FRAMEWORK_PAPERS.map((p, i) => ({
    type: "framework",
    id: p.id,
    name: p.name,
    shortName: p.shortName,
    paperNumber: 62 + i + 1,
    beta: null, ci: null, dw: null, pi: null,
    theoremType: p.theoremType,
    theoremName: p.name,
    summary: p.summary,
    content: paperContent[p.id] || null,
    slug: p.id,
  }));

  const otherPapers = OTHER_PAPERS.map((p, i) => ({
    type: "other",
    id: p.id,
    name: p.name,
    shortName: p.shortName,
    paperNumber: 69 + i + 1,
    beta: null, ci: null, dw: null, pi: null,
    theoremType: p.theoremType,
    theoremName: p.name,
    summary: p.summary,
    content: paperContent[p.id] || null,
    slug: p.id,
  }));

  return [...domainPapers, pptPaper, ...fwPapers, ...otherPapers];
}
