"use client";
import { useState } from "react";
import { Tip } from "./Glossary";

// ══════════════════════════════════════════════════════════════
// EXECUTIVE BRIEF — Is Your Company in a Hollow Win?
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

const betaColor = (b) => {
  if (b === null || b === undefined) return "rgba(255,255,255,0.35)";
  if (b >= 10) return "#DC2626";
  if (b >= 6) return "#E85D3A";
  if (b >= 4) return "#F59E0B";
  if (b >= 2) return "#D97706";
  return "#059669";
};

// ─── SECTOR EXPOSURE ────────────────────────────────────────
const SECTORS = [
  { sector: "Pharmaceuticals & Healthcare", domains: [
    { name: "Pharmacy Benefit Managers", beta: 6.35, revenue: "$60B (US Pharmacy Benefit Management revenue)", risk: "Structural separation legislation. FTC investigation active. Spread pricing ban. Three companies control 80% of the market — they are the buyer, the seller, and the middleman.", timeline: "2–4 years" },
    { name: "Opioid Ecosystem", beta: 14.96, revenue: "$75B (pain management)", risk: "$50B+ in settlements and counting. Prescription Drug Monitoring Program (PDMP) mandates coming. The synthetic supply chain is entirely outside pharmaceutical regulation. Purdue no longer exists.", timeline: "Active" },
    { name: "Antimicrobial Resistance", beta: 5.84, revenue: "$42B (antibiotics market)", risk: "Two new antibiotic classes in 40 years. Resistance evolving on 20-minute generation cycles. Livestock sub-therapeutic use drives resistance. PASTEUR Act stalled twice. The pharmaceutical pipeline cannot outrun bacterial evolution.", timeline: "Active" },
    { name: "Private Equity in Healthcare", beta: 5.24, revenue: "$31B (PE-owned healthcare revenue)", risk: "Return requirement ceiling: PE fund IRR targets of 20%+ structurally require cost reduction that degrades care quality. Staffing ratios decline post-acquisition. Surprise billing. The patient is the cost center.", timeline: "2–5 years" },
  ]},
  { sector: "Technology & Platforms", domains: [
    { name: "Big Tech Platform Monopoly", beta: 7.81, revenue: "$128B (Big Tech revenue)", risk: "Department of Justice (DOJ) v. Google. Federal Trade Commission (FTC) v. Meta. EU Digital Markets Act (DMA) enforcement. Structural separation. The EU moved first. The US litigation is years from resolution.", timeline: "2–5 years" },
    { name: "Frontier AI", beta: 7.51, revenue: "$30B (AI infrastructure + services)", risk: "No US federal AI legislation. Executive order is revocable. EU AI Act does not address frontier capability scaling. Alignment problem unsolved while capability scaling continues. Voluntary commitments are unenforceable. The race is on and the referee has no whistle.", timeline: "1–3 years" },
    { name: "Algorithmic Pricing", beta: 5.38, revenue: "$40B (rental pricing software)", risk: "DOJ v. RealPage. Machine-learning pricing algorithms reach supracompetitive equilibria (prices higher than any competitive market would produce) without communication. The Sherman Antitrust Act §1 requires 'agreement.' The algorithms don't agree — they converge.", timeline: "1–3 years" },
    { name: "Gig Economy Platforms", beta: 0.76, revenue: "$45B (gig platform revenue)", risk: "EU Platform Work Directive passed. Federal classification reform coming. The platform decides the dispatch, the price, and the deactivation. The worker does not know why.", timeline: "2–4 years" },
    { name: "Social Media & Youth Mental Health", beta: 5.79, revenue: "$68B (social media advertising)", risk: "Engagement optimization algorithms structurally maximize dopaminergic response without regard to user welfare. Internal research suppressed. Kids Online Safety Act (KOSA) advancing. The algorithm does not know the user is fourteen.", timeline: "1–3 years" },
  ]},
  { sector: "Energy & Extractives", domains: [
    { name: "Oil & Gas Extraction", beta: 1.63, revenue: "$3,500B (global O&G revenue)", risk: "Scope 3 (supply chain emissions) disclosure. Methane fees. $20.5B in annual fossil fuel subsidies that could be eliminated. Stranded asset risk on a 15-year horizon.", timeline: "5–15 years" },
    { name: "Coal Combustion", beta: 6.95, revenue: "$990B (global coal revenue)", risk: "Phase-out acceleration. Insurance withdrawal. Carbon pricing trajectory. The question is not whether coal ends — it is how much T* is left.", timeline: "5–10 years" },
    { name: "Deep-Sea Mining", beta: 6.90, revenue: "$5B (polymetallic nodules)", risk: "32 countries calling for moratorium. International Seabed Authority Mining Code not finalized. Nodules form at 10–20 mm per million years. There is no sustainable harvest rate.", timeline: "3–7 years" },
    { name: "Bitcoin Proof-of-Work (PoW) Mining", beta: 5.00, revenue: "$42B (mining rewards)", risk: "Energy disclosure mandates. Carbon fee on computation. The Protocol Welfare Floor guarantees βW ≥ 1.0 — regulation can reduce the beta but cannot eliminate it.", timeline: "3–5 years" },
    { name: "Nuclear Fission", beta: 2.94, revenue: "$44B (global nuclear power)", risk: "Two-beta architecture: marginal beta captures the incremental welfare cost of nuclear waste accumulation per dollar of revenue. Barriers are regulatory and political. Licensing reform for advanced reactors and SMRs is the intervention.", timeline: "Opportunity" },
    { name: "Mining & Rare Earth Extraction", beta: 11.15, revenue: "$150B (global mining revenue)", risk: "Tailings dam failures. Acid mine drainage persists for centuries. Rare earth processing generates radioactive thorium waste. The energy transition requires the minerals. The extraction destroys the communities.", timeline: "3–7 years" },
    { name: "Groundwater / Ogallala Aquifer", beta: 3.46, revenue: "$15B (irrigated agriculture revenue)", risk: "Recharge rate: 0.5 inches/year. Extraction rate: 12+ inches/year. The Ogallala took 10 million years to fill. Kansas will exhaust its share in 25 years. The aquifer is not renewable on any human timescale.", timeline: "Active" },
  ]},
  { sector: "Food & Agriculture", domains: [
    { name: "Ultra-Processed Food", beta: 4.06, revenue: "$450B (global Ultra-Processed Food revenue)", risk: "Front-of-pack warning labels — Chile reduced Ultra-Processed Food consumption 25% in two years. Marketing restrictions. School meal reformulation. The US has not tried.", timeline: "3–7 years" },
    { name: "Palm Oil", beta: 6.30, revenue: "$68B (global palm oil revenue)", risk: "EU Deforestation Regulation (EUDR) enforcement. Import tariffs. Satellite-verified traceability. The forest does not grow back.", timeline: "2–5 years" },
    { name: "Industrial Monoculture", beta: 7.36, revenue: "$340B (monoculture agriculture revenue)", risk: "Crop diversity mandates tied to insurance subsidies. Four companies control 60% of the seed market. The genetic base is narrowing.", timeline: "5–10 years" },
    { name: "Topsoil Erosion", beta: 4.41, revenue: "$255B (irrigated agriculture revenue)", risk: "Erosion rates 10–100× formation rates. Topsoil forms at 1 cm per 100–1,000 years. Conservation Reserve Program enrollment is capped. We are farming the principal and calling it income.", timeline: "5–15 years" },
    { name: "Fisheries", beta: 4.70, revenue: "$38B (global wild capture)", risk: "$35B/year in harmful fishing subsidies globally. Ocean warming changing species location, abundance, and reproduction. The thing destroying the fishery is not fishing — it is climate forcing operating outside fisheries management jurisdiction.", timeline: "Active" },
    { name: "Industrial Agriculture Methane", beta: 7.36, revenue: "$205B (industrial livestock revenue)", risk: "Enteric fermentation is a biological constant — ruminants produce methane. Feed additives reduce but cannot eliminate. 14.5% of global GHG emissions from livestock. The cow is not the problem. The scale is.", timeline: "5–10 years" },
    { name: "Deforestation & Industrial Logging", beta: 7.21, revenue: "$120B (industrial timber + land conversion)", risk: "Carbon stock irreversibility: a mature forest stores 150–300 tC/ha accumulated over centuries. Clearing releases it in days. Replanting takes 80–120 years to restore equivalent carbon stock. The asymmetry is temporal and thermodynamic.", timeline: "Active" },
  ]},
  { sector: "Financial Services & Consumer", domains: [
    { name: "Commercial Real Estate Urban Hollowing", beta: 7.78, revenue: "$13B (Commercial Real Estate revenue)", risk: "$1.5T in distressed loans carried at 2019 valuations. San Francisco office vacancy: 37%. The loans say the buildings are worth what they were. They are not.", timeline: "1–3 years" },
    { name: "Gambling", beta: 7.30, revenue: "$45B (US sports betting + online)", risk: "Mobile sports betting in 38 states with minimal consumer protection. No algorithmic transparency. The house edge is optimized by machine learning. The regulator is using spreadsheets.", timeline: "2–5 years" },
    { name: "Student Loan Securitization", beta: 6.36, revenue: "$46.8B (student loan revenue)", risk: "For-profit sector: 10% of enrollment, 50% of defaults. That ratio is the diagnostic. Gainful employment rule enforcement tightening.", timeline: "2–4 years" },
    { name: "Water Privatization", beta: 5.61, revenue: "$246B (private water utilities)", risk: "Private water utilities charge 59% more than public. Infrastructure investment declines post-privatization. The market cannot discipline a monopolist when the product is survival.", timeline: "3–7 years" },
    { name: "Insurance & Climate Risk Mispricing", beta: 4.57, revenue: "$90B (P&C insurance revenue)", risk: "Fat-tail climate risk cannot be priced by historical loss models. Insurers withdrawing from California, Florida, Louisiana. The market that prices risk is leaving the places where risk is highest. The remaining exposure is socialized.", timeline: "Active" },
    { name: "Stablecoins & Shadow Banking", beta: 2.53, revenue: "$56B (stablecoin issuer revenue)", risk: "Reserve opacity. Tether audit still incomplete. $130B+ in tokens backed by undisclosed commercial paper and Treasury holdings. The peg holds until it doesn't. The run happens in minutes, not days.", timeline: "1–3 years" },
    { name: "Sovereign Debt & Intergenerational Extraction", beta: 4.67, revenue: "$35B (debt service extraction)", risk: "Vulture fund litigation against sovereign restructuring. Argentina, Sri Lanka, Zambia — the pattern repeats. Debt contracted by one generation, serviced by the next. The borrower and the payer are not the same person.", timeline: "Ongoing" },
    { name: "Financial Benchmark Manipulation", beta: 5.13, revenue: "$3.2B (trading desk revenues)", risk: "Self-referential benchmark: the banks setting the rate were the banks trading on it. $350T in contracts mispriced. Replaced by the Secured Overnight Financing Rate (SOFR) but the structural vulnerability — self-reported benchmarks — persists in other markets.", timeline: "Partially resolved" },
  ]},
  { sector: "Chemicals & Materials", domains: [
    { name: "Forever Chemicals (PFAS)", beta: 5.31, revenue: "$187B (Forever Chemicals-using industries)", risk: "Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) strict liability. Class-wide production ban advancing in EU. Remediation costs projected at $100B+. The carbon-fluorine bond has never lost an arbitration.", timeline: "Active" },
    { name: "Cement (Calcination Floor)", beta: 6.74, revenue: "$330B (global cement revenue)", risk: "Carbon Border Adjustment Mechanism (CBAM) tariffs. Calcium carbonate → calcium oxide + carbon dioxide is conservation of mass. No fuel switch eliminates the process emission. The floor is set by the periodic table.", timeline: "5–10 years" },
    { name: "Persistent Organic Pollutants", beta: 6.23, revenue: "$70B (persistent chemical industries)", risk: "Stockholm Convention listing takes 7–10 years per compound. Thousands of persistent chemicals in commerce without adequate assessment. The listing process is slower than the manufacturing process.", timeline: "3–10 years" },
  ]},
  { sector: "Defense & Aerospace", domains: [
    { name: "Weapons of Mass Destruction Capability Diffusion", beta: 21.92, revenue: "$86.4B (dual-use tech revenue)", risk: "Export control expansion. AI-specific Wassenaar Arrangement (international export control regime) annexes. Once a capability is demonstrated, it cannot be undemonstrated. The knowledge diffuses.", timeline: "1–5 years" },
    { name: "Orbital Debris", beta: 4.82, revenue: "$2.2B (space economy revenue)", risk: "Orbital-use fees. Deorbit mandates. 6,000+ Starlink satellites and no one is charging rent. Kessler Syndrome (self-sustaining collision cascade) is a phase transition — once it starts, it cannot stop.", timeline: "3–7 years" },
    { name: "Arms Exports", beta: 2.54, revenue: "$29.6B (global arms trade revenue)", risk: "Arms Trade Treaty not ratified by US, Russia, or China. End-use monitoring resource-constrained. We sell the weapons and then don't have enough staff to check where they went.", timeline: "Ongoing" },
    { name: "Defense Procurement", beta: 4.88, revenue: "$33.7B (US defense procurement revenue)", risk: "Cost-plus contracting structurally rewards cost escalation. The F-35 program: $1.7T lifetime cost, 10+ years behind schedule. The contractor profits more when the project costs more. The incentive is the problem.", timeline: "Ongoing" },
  ]},
  { sector: "Biotech & Environment", domains: [
    { name: "Gene Drives", beta: 5.77, revenue: "$12.4B (gene drive R&D revenue)", risk: "Self-propagating genetic constructs in wild populations with no recall mechanism. Daisy-chain and threshold architectures not yet validated in field trials. The ecological ratchet is one-directional.", timeline: "3–7 years" },
    { name: "Aviation Emissions", beta: 4.97, revenue: "$100B (global aviation revenue)", risk: "No zero-emission technology exists for long-haul flight. Sustainable aviation fuel is less than 1% of jet fuel and costs 3–5× conventional. Carbon Offsetting and Reduction Scheme for International Aviation (CORSIA) offsets growth from 2019 baseline — not absolute reduction. Physics of energy density sets the floor.", timeline: "5–15 years" },
    { name: "Proof-of-Stake Protocols", beta: 3.14, revenue: "$12B (Proof-of-Stake revenue)", risk: "Welfare costs 97% lower than Proof-of-Work. The primary risk is validator concentration — Lido controls 28% of Ethereum staking. Not a priority domain.", timeline: "Low urgency" },
    { name: "Shipping & Maritime Emissions", beta: 1.34, revenue: "$969B (global shipping revenue)", risk: "Flag state arbitrage: 73% of tonnage registered in Panama, Liberia, Marshall Islands — jurisdictions with minimal environmental enforcement. Heavy fuel oil is the dirtiest fossil fuel in commercial use. IMO 2050 targets are non-binding.", timeline: "5–10 years" },
  ]},
  { sector: "Consumer & Criminal Justice", domains: [
    { name: "Fast Fashion", beta: 7.01, revenue: "$55B (fast fashion revenue)", risk: "Textile throughput floor: 92 million tons of textile waste annually. Microfiber pollution in every ocean. Garment workers paid below subsistence. The $5 t-shirt costs $5 because someone else is paying the rest.", timeline: "3–7 years" },
    { name: "Private Prisons & Carceral System", beta: 12.08, revenue: "$8B (private prison revenue)", risk: "Recidivism incentive floor: the operator profits from occupied beds. Per-diem contracts guarantee minimum occupancy. Rehabilitation reduces revenue. The business model requires the customer to return.", timeline: "3–7 years" },
  ]},
];

// ─── DIAGNOSTIC ─────────────────────────────────────────────
const DIAGNOSTIC = [
  { q: "Does your revenue depend on a shared system — a market, a commons, a benchmark, an ecosystem — that you do not control?", meaning: "Private-Systemic Tension Axiom 1 — Overlapping Interests. If the answer is yes, your revenue is embedded in something bigger than your balance sheet.", flag: "yellow" },
  { q: "Can your finance team compute this quarter's earnings without knowing the health of that system?", meaning: "Private-Systemic Tension Axiom 2 — System Independence. If the answer is yes, your internal metrics are structurally blind to the thing your revenue depends on. You are flying without altimeter.", flag: "red" },
  { q: "If the system collapsed, would your revenue survive?", meaning: "Private-Systemic Tension Axiom 3 — System Dependence. If the answer is no, you are extracting from a system you depend on. That is the definition of a Hollow Win.", flag: "red" },
  { q: "What is the β<sub>W</sub> of your primary revenue stream?", meaning: "βW > 1: every dollar earned destroys more than one dollar of system welfare. βW > 6: severe. βW > 10: extreme. Firearms is 50.99. Opioids are 14.96. Coal is 6.95. Gig Economy is 0.76.", flag: "red" },
  { q: "What is your T* — the crossover time until the system damage reaches your balance sheet?", meaning: "T* = δ/(ηλ). VW's T* was about 6 years. Tobacco's was 45. The question is not whether the correction comes. It is when.", flag: "yellow" },
  { q: "Has any regulator, anywhere in the world, begun proceedings related to your domain?", meaning: "The EU typically moves first. Digital Markets Act, EU Deforestation Regulation, Forever Chemicals restriction, Platform Work Directive — all EU-led. US enforcement follows. If Brussels is investigating your industry, Washington is watching.", flag: "yellow" },
  { q: "If system welfare costs were fully priced, would your company's valuation survive?", meaning: "System-adjusted payoff: private profit minus welfare cost. If the result is negative, your entire private payoff is smaller than the welfare cost you impose. You are not creating value. You are consuming it.", flag: "red" },
];

// ─── W-AUDIT ────────────────────────────────────────────────
const AUDIT_STEPS = [
  { step: 1, title: "Revenue Stream Decomposition", desc: "Break every revenue stream into System Asset Pricing Model domains. A conglomerate with food, chemicals, and energy divisions has three separate βW exposures. Know them individually." },
  { step: 2, title: "βW Assignment", desc: "Assign the Monte Carlo calibrated βW to each stream. Use the 90% confidence interval, not the point estimate. Firearms: 50.99 [40.50–62.50]. Opioids: 14.96 [12.60–17.30]. The range tells you how much the number could move. The sign does not change." },
  { step: 3, title: "Welfare Cost Computation", desc: "W = Π × βW. Multiply revenue by welfare beta. This is the annual welfare cost your revenue stream imposes. Sum across streams for the total company footprint." },
  { step: 4, title: "System-Adjusted Payoff", desc: "Πˢᵃ = Π − μ·W. At μ = 1.0 — full calibration — this is what your company actually creates after subtracting what it destroys. If negative, your company destroys more than it creates." },
  { step: 5, title: "T* Estimation", desc: "For each stream with βW > 1: T* = δ/(ηλ). δ = cumulative surplus. η = regulatory feedback coupling. λ = annual welfare loss. T* tells you when the correction hits your balance sheet." },
  { step: 6, title: "Risk Classification", desc: "GREEN: βW < 1, net positive. AMBER: 1 < βW < 4. RED: 4 < βW < 10. CRIMSON: βW > 10. The board sees RED and CRIMSON. Everything else is noise." },
  { step: 7, title: "Transition Modeling", desc: "Three scenarios: (1) current trajectory, (2) involuntary correction at T*, (3) voluntary transition to βW < 1. Scenario 3 is typically NPV-positive because voluntary transitions are smooth and involuntary corrections are discontinuous. VW learned this at $35B." },
];

// ─── DOMAIN BETAS FOR CALCULATOR ──────────────────────────────
const CALC_DOMAINS = [
  { name: "Firearms", beta: 50.99 }, { name: "Cybercrime", beta: 31.10 }, { name: "Human Trafficking", beta: 22.62 },
  { name: "Weapons of Mass Destruction", beta: 21.92 }, { name: "Child Labor", beta: 21.83 }, { name: "Opioids", beta: 14.96 },
  { name: "Conflict Minerals", beta: 12.60 }, { name: "Private Prisons", beta: 12.08 }, { name: "Credit Rating Agencies", beta: 11.21 },
  { name: "Mining & Rare Earth", beta: 11.15 }, { name: "Big Tech", beta: 7.81 }, { name: "Commercial Real Estate", beta: 7.78 },
  { name: "Frontier AI", beta: 7.51 }, { name: "Industrial Ag Methane", beta: 7.36 }, { name: "Monoculture", beta: 7.36 },
  { name: "Gambling", beta: 7.30 }, { name: "Deforestation", beta: 7.21 }, { name: "Illicit Drugs", beta: 7.16 },
  { name: "Payday Lending", beta: 7.08 }, { name: "Fast Fashion", beta: 7.01 }, { name: "Coal", beta: 6.95 },
  { name: "Deep-Sea Mining", beta: 6.90 }, { name: "Cement", beta: 6.74 }, { name: "Plastics", beta: 6.67 },
  { name: "E-Waste", beta: 6.59 }, { name: "Tobacco", beta: 6.50 }, { name: "Student Loans", beta: 6.36 },
  { name: "Pharmacy Benefit Management", beta: 6.35 }, { name: "Platform Monopoly", beta: 6.33 }, { name: "Palm Oil", beta: 6.30 },
  { name: "Tax Havens", beta: 6.27 }, { name: "Persistent Organic Pollutants", beta: 6.23 }, { name: "Data Brokerage", beta: 6.13 },
  { name: "Antimicrobial Resistance", beta: 5.84 }, { name: "Social Media", beta: 5.79 }, { name: "Gene Drives", beta: 5.77 },
  { name: "Water Privatization", beta: 5.61 }, { name: "Algorithmic Pricing", beta: 5.38 }, { name: "Forever Chemicals (PFAS)", beta: 5.31 },
  { name: "PE Healthcare", beta: 5.24 }, { name: "Benchmark Rate/FX", beta: 5.13 }, { name: "Bitcoin PoW", beta: 5.00 },
  { name: "Aviation", beta: 4.97 }, { name: "Defense Procurement", beta: 4.88 }, { name: "Orbital Debris", beta: 4.82 },
  { name: "Fisheries", beta: 4.70 }, { name: "Sovereign Debt", beta: 4.67 }, { name: "Insurance Climate", beta: 4.57 },
  { name: "Topsoil", beta: 4.41 }, { name: "Ultra-Processed Food", beta: 4.06 }, { name: "Groundwater", beta: 3.46 },
  { name: "Proof-of-Stake", beta: 3.14 }, { name: "Nuclear", beta: 2.94 }, { name: "Arms Exports", beta: 2.54 },
  { name: "Stablecoins", beta: 2.53 }, { name: "Private Military", beta: 2.06 }, { name: "Oil & Gas", beta: 1.63 },
  { name: "Shipping", beta: 1.34 }, { name: "Alcohol", beta: 1.33 }, { name: "Factory Farming", beta: 1.02 },
  { name: "Gig Economy", beta: 0.76 },
];

const TABS = [
  { id: "diagnostic", label: "Diagnostic" },
  { id: "exposure", label: "Sector Exposure" },
  { id: "calculator", label: "W-Audit Calculator" },
  { id: "audit", label: "W-Audit Method" },
  { id: "fiduciary", label: "Fiduciary" },
  { id: "cases", label: "Case Studies" },
];

export default function ExecutiveBrief() {
  const [tab, setTab] = useState("diagnostic");
  const [answers, setAnswers] = useState({});
  const [expandedSector, setExpandedSector] = useState(null);
  const [streams, setStreams] = useState([{ domain: "", revenue: "" }]);

  const addStream = () => setStreams([...streams, { domain: "", revenue: "" }]);
  const updateStream = (i, field, val) => {
    const s = [...streams];
    s[i] = { ...s[i], [field]: val };
    setStreams(s);
  };
  const removeStream = (i) => setStreams(streams.filter((_, j) => j !== i));

  const calcResults = streams.map(s => {
    const d = CALC_DOMAINS.find(c => c.name === s.domain);
    const rev = parseFloat(s.revenue) || 0;
    if (!d || !rev) return null;
    const welfareCost = rev * d.beta;
    const adjusted = rev - welfareCost;
    const risk = d.beta >= 10 ? "CRIMSON" : d.beta >= 4 ? "RED" : d.beta >= 1 ? "AMBER" : "GREEN";
    const riskColor = d.beta >= 10 ? "#DC2626" : d.beta >= 4 ? RED : d.beta >= 1 ? GOLD : GREEN;
    return { name: d.name, beta: d.beta, revenue: rev, welfareCost, adjusted, risk, riskColor };
  }).filter(Boolean);

  const totalRevenue = calcResults.reduce((s, r) => s + r.revenue, 0);
  const totalWelfareCost = calcResults.reduce((s, r) => s + r.welfareCost, 0);
  const weightedBeta = totalRevenue ? totalWelfareCost / totalRevenue : 0;
  const overallRisk = weightedBeta >= 10 ? "CRIMSON" : weightedBeta >= 4 ? "RED" : weightedBeta >= 1 ? "AMBER" : "GREEN";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
      <main style={{ flex: 1, maxWidth: 1000, padding: "0 32px 80px", margin: "0 auto" }}>
        <div style={{ paddingTop: 72, marginBottom: 32 }}>
          <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 3, marginBottom: 8 }}>EXECUTIVE BRIEF</div>
          <h1 style={{ fontFamily: S, fontSize: 32, fontWeight: 300, color: TEXT, margin: 0 }}>
            Is Your Company in a <Tip term="Hollow Win">Hollow Win</Tip>?
          </h1>
          <div style={{ fontFamily: S, fontSize: 20, color: DIM, marginTop: 12, lineHeight: 1.7, fontStyle: "italic" }}>
            Your P&L says you are winning. Your share price says you are winning. The system you are built on is collapsing. By the time the collapse reaches your balance sheet, the adjustment is not gradual. It is discontinuous.
          </div>
          <div style={{ fontFamily: M, fontSize: 14, color: MUTED, marginTop: 12 }}>
            Erik Postnieks · © 2026
          </div>
        </div>

        {/* VW anchor */}
        <div style={{ padding: "20px 24px", background: "rgba(239,68,68,0.04)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4, marginBottom: 32 }}>
          <div style={{ fontFamily: S, fontSize: 20, color: TEXT, lineHeight: 1.8 }}>
            VW Dieselgate: six years of record earnings. Every quarterly report showed growth. The "clean diesel" campaign won awards. β<sub>W</sub> = 6.8. T* predicted ≈ 8 years. Observed: 6 years. On September 18, 2015 — $35 billion in fines, recalls, buybacks, criminal charges, and market cap loss. In 48 hours.
          </div>
          <div style={{ fontFamily: M, fontSize: 17, color: RED, marginTop: 12, fontWeight: 600 }}>
            The information existed. It was never recorded.
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

        {/* ═══ DIAGNOSTIC ═══ */}
        {tab === "diagnostic" && (
          <div>
            <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.8, marginBottom: 24 }}>
              Seven questions. Answer them for your primary revenue stream. If three or more come back red, commission a W-audit. The framework is in the next tab.
            </div>

            {DIAGNOSTIC.map((d, i) => (
              <div key={i} style={{ marginBottom: 16, padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, borderLeft: `3px solid ${d.flag === "red" ? RED : GOLD}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: M, fontSize: 14, color: GOLD, marginBottom: 8 }}>QUESTION {i + 1}</div>
                    <div style={{ fontFamily: S, fontSize: 19, color: TEXT, lineHeight: 1.8, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: d.q }} />
                    <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7 }}>{d.meaning}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginLeft: 16, flexShrink: 0, marginTop: 24 }}>
                    {["YES", "NO", "?"].map(a => (
                      <button key={a} onClick={() => setAnswers({ ...answers, [i]: a })} style={{
                        fontFamily: M, fontSize: 13, padding: "6px 12px", border: `1px solid ${answers[i] === a ? GOLD : BORDER}`,
                        background: answers[i] === a ? "rgba(245,158,11,0.15)" : "transparent",
                        color: answers[i] === a ? GOLD : MUTED, borderRadius: 3, cursor: "pointer",
                      }}>{a}</button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {Object.keys(answers).length >= 3 && (
              <div style={{ padding: "20px 24px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 4, marginTop: 24 }}>
                <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>RESULT</div>
                <div style={{ fontFamily: S, fontSize: 19, color: TEXT, lineHeight: 1.8 }}>
                  {Object.values(answers).filter(a => a === "YES").length >= 3
                    ? "Three or more yes answers. Your company may be in a Hollow Win. Use the W-Audit tab to quantify the exposure — or keep not looking. VW didn't look either."
                    : Object.values(answers).filter(a => a === "YES").length >= 1
                    ? "Some indicators present. Check the Sector Exposure tab. Know your βW. The number tells you what the P&L cannot."
                    : "Low Hollow Win indicators on current answers. Continue monitoring — domain conditions change as regulation evolves."}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ SECTOR EXPOSURE ═══ */}
        {tab === "exposure" && (
          <div>
            {SECTORS.map((s, si) => (
              <div key={s.sector} style={{ marginBottom: 16 }}>
                <div
                  onClick={() => setExpandedSector(expandedSector === si ? null : si)}
                  style={{ padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div>
                    <div style={{ fontFamily: M, fontSize: 18, color: TEXT, fontWeight: 600 }}>{s.sector}</div>
                    <div style={{ fontFamily: M, fontSize: 14, color: MUTED, marginTop: 4 }}>
                      {s.domains.length} domains · Max β<sub>W</sub> = {Math.max(...s.domains.filter(d => d.beta !== null).map(d => d.beta)).toLocaleString()}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {s.domains.map(d => (
                      <span key={d.name} style={{ fontFamily: M, fontSize: 14, color: betaColor(d.beta), padding: "2px 8px", background: "rgba(255,255,255,0.03)", borderRadius: 3 }}>
                        {d.beta === null ? "—" : d.beta >= 1000 ? (d.beta/1000).toFixed(0)+"K" : d.beta}
                      </span>
                    ))}
                  </div>
                </div>

                {expandedSector === si && s.domains.map(d => (
                  <div key={d.name} style={{ padding: "16px 24px", background: "rgba(255,255,255,0.01)", borderLeft: `3px solid ${betaColor(d.beta)}`, borderBottom: `1px solid ${BORDER}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontFamily: M, fontSize: 17, color: TEXT }}>{d.name}</span>
                      <span style={{ fontFamily: M, fontSize: 17, color: betaColor(d.beta) }}>β<sub>W</sub> = {d.beta === null ? "uncalibrated" : d.beta >= 1000 ? d.beta.toLocaleString() : d.beta}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                      <div>
                        <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>REVENUE AT RISK</div>
                        <div style={{ fontFamily: M, fontSize: 15, color: GOLD }}>{d.revenue}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>CORRECTION TIMELINE</div>
                        <div style={{ fontFamily: M, fontSize: 15, color: d.timeline === "Active" ? RED : DIM }}>{d.timeline}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: M, fontSize: 12, color: RED, letterSpacing: 1, marginBottom: 4 }}>PRIMARY RISK</div>
                        <div style={{ fontFamily: S, fontSize: 15, color: "rgba(239,68,68,0.7)", lineHeight: 1.7 }}>{d.risk}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ═══ W-AUDIT CALCULATOR ═══ */}
        {tab === "calculator" && (
          <div>
            <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.8, marginBottom: 24 }}>
              Enter your company's revenue streams by System Asset Pricing Model domain. The calculator computes your company-wide welfare beta and risk classification.
            </div>

            {streams.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
                <select
                  value={s.domain}
                  onChange={e => updateStream(i, "domain", e.target.value)}
                  aria-label={`Revenue stream ${i + 1} domain`}
                  style={{
                    flex: 2, fontFamily: M, fontSize: 13, padding: "10px 12px",
                    background: SURFACE, color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 4,
                  }}
                >
                  <option value="">Select domain...</option>
                  {CALC_DOMAINS.map(d => (
                    <option key={d.name} value={d.name}>{d.name} (βW = {d.beta})</option>
                  ))}
                </select>
                <div style={{ position: "relative", flex: 1 }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontFamily: M, fontSize: 13, color: MUTED }}>$</span>
                  <input
                    type="number"
                    placeholder="Revenue (M)"
                    value={s.revenue}
                    onChange={e => updateStream(i, "revenue", e.target.value)}
                    aria-label={`Revenue stream ${i + 1} amount in millions`}
                    style={{
                      width: "100%", fontFamily: M, fontSize: 13, padding: "10px 12px 10px 24px",
                      background: SURFACE, color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 4,
                    }}
                  />
                </div>
                <span style={{ fontFamily: M, fontSize: 11, color: MUTED }}>M</span>
                {streams.length > 1 && (
                  <button onClick={() => removeStream(i)} aria-label="Remove stream" style={{
                    fontFamily: M, fontSize: 16, color: MUTED, background: "transparent",
                    border: "none", cursor: "pointer", padding: "4px 8px",
                  }}>{"\u2715"}</button>
                )}
              </div>
            ))}

            <button onClick={addStream} style={{
              fontFamily: M, fontSize: 12, color: GOLD, background: "rgba(245,158,11,0.08)",
              border: `1px solid rgba(245,158,11,0.2)`, borderRadius: 4, padding: "8px 16px",
              cursor: "pointer", marginTop: 8, marginBottom: 24,
            }}>+ Add Revenue Stream</button>

            {calcResults.length > 0 && (
              <div style={{ border: `1px solid ${BORDER}`, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", background: "rgba(245,158,11,0.04)", borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 12 }}>COMPANY W-AUDIT RESULT</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: M, fontSize: 24, fontWeight: 700, color: weightedBeta >= 4 ? RED : GOLD }}>{weightedBeta.toFixed(2)}</div>
                      <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 1 }}>WEIGHTED βW</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: M, fontSize: 24, fontWeight: 700, color: TEXT }}>${totalRevenue.toLocaleString()}M</div>
                      <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 1 }}>TOTAL REVENUE</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: M, fontSize: 24, fontWeight: 700, color: RED }}>${totalWelfareCost.toLocaleString()}M</div>
                      <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 1 }}>WELFARE COST</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: M, fontSize: 24, fontWeight: 700, color: overallRisk === "GREEN" ? GREEN : overallRisk === "AMBER" ? GOLD : RED }}>{overallRisk}</div>
                      <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 1 }}>RISK CLASS</div>
                    </div>
                  </div>
                </div>

                {calcResults.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 20px", borderBottom: `1px solid rgba(255,255,255,0.04)`, borderLeft: `3px solid ${r.riskColor}` }}>
                    <span style={{ fontFamily: M, fontSize: 13, color: TEXT, flex: 2 }}>{r.name}</span>
                    <span style={{ fontFamily: M, fontSize: 13, color: r.riskColor, width: 80 }}>βW = {r.beta}</span>
                    <span style={{ fontFamily: M, fontSize: 13, color: DIM, width: 100 }}>${r.revenue.toLocaleString()}M</span>
                    <span style={{ fontFamily: M, fontSize: 13, color: RED, width: 120 }}>−${r.welfareCost.toLocaleString()}M</span>
                    <span style={{ fontFamily: M, fontSize: 11, color: r.riskColor, width: 70, textAlign: "right" }}>{r.risk}</span>
                  </div>
                ))}

                <div style={{ padding: "12px 20px", background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>
                    System-adjusted payoff: ${totalRevenue.toLocaleString()}M − ${totalWelfareCost.toLocaleString()}M = <span style={{ color: (totalRevenue - totalWelfareCost) < 0 ? RED : GREEN, fontWeight: 700 }}>${(totalRevenue - totalWelfareCost).toLocaleString()}M</span>.
                    {(totalRevenue - totalWelfareCost) < 0 && " Your company destroys more system welfare than it creates in revenue."}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ W-AUDIT ═══ */}
        {tab === "audit" && (
          <div>
            <div style={{ padding: "16px 20px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 4, marginBottom: 24 }}>
              <div style={{ fontFamily: S, fontSize: 19, color: GOLD, lineHeight: 1.8, fontStyle: "italic" }}>
                A W-audit is to welfare economics what a financial audit is to accounting. It prints the number your P&L cannot see — the system welfare cost of your revenue.
              </div>
            </div>

            {AUDIT_STEPS.map(s => (
              <div key={s.step} style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <div style={{ fontFamily: M, fontSize: 24, color: GOLD, width: 40, flexShrink: 0, textAlign: "center", paddingTop: 12 }}>{s.step}</div>
                <div style={{ flex: 1, padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                  <div style={{ fontFamily: M, fontSize: 17, color: TEXT, fontWeight: 600, marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.8 }}>{s.desc}</div>
                </div>
              </div>
            ))}

            <div style={{ padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, marginTop: 24 }}>
              <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>OUTPUT</div>
              <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.8 }}>
                Company-wide β<sub>W</sub> weighted by revenue share. Π<sup>sa</sup> for each stream. T* for every stream above 1.0. Three-scenario transition cost model. GREEN/AMBER/RED/CRIMSON classification for the board dashboard.
              </div>
            </div>
          </div>
        )}

        {/* ═══ FIDUCIARY ═══ */}
        {tab === "fiduciary" && (
          <div>
            <div style={{ padding: "20px 24px", background: "rgba(239,68,68,0.04)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4, marginBottom: 24 }}>
              <div style={{ fontFamily: S, fontSize: 20, color: TEXT, lineHeight: 1.8 }}>
                If β<sub>W</sub> {">"} 1 and the board knows it — or should know it — is there a fiduciary duty to act? The question is not theoretical. After Caremark, Marchand v. Barnhill, and the Revlon line, the answer is converging.
              </div>
            </div>

            {[
              { title: "Caremark and the Duty to Monitor",
                content: "After Caremark (Del. 1996), directors have a duty to monitor known risks. After Marchand v. Barnhill (Del. 2019), this extends to 'mission-critical' compliance risks. A βW calibration quantifies the risk. Once the board has the number, ignoring it is a Caremark exposure. Not because the law says 'welfare.' Because the law says 'known risk.'" },
              { title: "T* and the Short-Termism Problem",
                content: "A Hollow Win is temporally unstable — that is the definition. The cooperative surplus visible to bilateral analysis is real, but it has a duration. T* estimates that duration. A board that maximizes extraction past T* is destroying long-term shareholder value. The quarterly earnings look great. The building is on fire. Both are true simultaneously." },
              { title: "Environmental, Social, and Governance Investing Is Not W-Monitoring",
                content: "Environmental, social, and governance investing is voluntary, self-reported, and focused on process — policies, committees, reports. A βW calibration is quantitative, independent, and measures actual welfare destruction per dollar of revenue. Environmental, social, and governance investing asks: 'Do you have a sustainability policy?' System Asset Pricing Model asks: 'How many dollars of system welfare did your revenue destroy this year?' One is a brochure. The other is a number." },
              { title: "Universal Owners and Cross-Domain Risk",
                content: "BlackRock, Vanguard, State Street, and pension funds hold diversified portfolios. A Hollow Win in one holding damages the system that other holdings depend on. A pension fund that owns both a pharmacy benefit manager (β = 6.35) and a hospital chain is funding the destruction of the system its hospital chain depends on. β-adjusted portfolio risk is not the sum of individual risks — it includes cross-domain system degradation." },
              { title: "The Voluntary Transition Advantage",
                content: "Companies that transition before T* avoid the discontinuity. VW waited — $35B in 48 hours. Companies that voluntarily disclosed Forever Chemicals exposure before Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) hazardous substance designation faced lower litigation costs. The math: voluntary transition cost < involuntary correction cost, because voluntary transitions are smooth and involuntary corrections are step functions. The CEO who moves early looks expensive today and prescient at T*." },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 16, padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                <div style={{ fontFamily: M, fontSize: 17, color: GOLD, fontWeight: 600, marginBottom: 10 }}>{s.title}</div>
                <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.8 }}>{s.content}</div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ CASE STUDIES ═══ */}
        {tab === "cases" && (
          <div>
            <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.8, marginBottom: 24 }}>
              Four Hollow Wins. Four collapses. Four autopsies with the same finding: the information existed. It was never recorded.
            </div>

            {[
              { name: "VW Dieselgate", beta: "6.8", period: "2009–2015", hollow: "6 years", collapse: "September 18, 2015",
                private: "$3.7B additional profit from defeat-device-equipped vehicles. 'Clean diesel' won Green Car of the Year.",
                system: "Nitrogen oxide (NOx) emissions 40× legal limits. Environmental Protection Agency (EPA) testing regime lost credibility. Ozone and particulate damage — real people, real lungs, real hospitals.",
                correction: "$35B+ in fines, recalls, buybacks, criminal charges. CEO arrested. T* predicted ≈ 8 years, observed = 6.",
                lesson: "Six years of Hollow Win — invisible to every analyst, every auditor, every quarterly report. The correction was not gradual. It was 48 hours." },
              { name: "Benchmark Rate Manipulation", beta: "12.0", period: "2005–2012", hollow: "7 years", collapse: "2012",
                private: "$2.3B in trading desk revenues across 16+ banks.",
                system: "$350 trillion in contracts mispriced. The benchmark — the thing the entire interest-rate market is built on — was a lie. The London Interbank Offered Rate (Benchmark Rate) was supposed to be the most trusted number in finance.",
                correction: "$9B+ in fines. Criminal prosecutions. Benchmark Rate replaced by the Secured Overnight Financing Rate (SOFR). The benchmark that underpinned the global financial system was decommissioned.",
                lesson: "GDP recorded $12.3 billion of positive output from Benchmark Rate manipulation. Every dollar of cleanup counted the same as every dollar of fraud. GDP cannot tell them apart. That is Proposition 19." },
              { name: "Opioid Manufacturers", beta: "12.5", period: "1996–2019", hollow: "23 years", collapse: "Ongoing",
                private: "OxyContin: $35B+ in revenue. McKinsey consulting fees. Distributor margins.",
                system: "600,000+ overdose deaths. $1.5T+ in economic costs. Communities destroyed. Families destroyed. Children orphaned.",
                correction: "$50B+ in settlements. Purdue dissolved. Sackler name stripped from buildings. McKinsey: $600M settlement. Twenty-three years of T*.",
                lesson: "The longest Hollow Win in the dataset. T* was extended by $880M in lobbying over two decades. But the correction came. It always comes. The Sacklers did not need to pimp opioids." },
              { name: "Tobacco", beta: "6.8", period: "1950s–1998", hollow: "~45 years", collapse: "1998 MSA",
                private: "$800B+ in cumulative revenues during the Hollow Win period.",
                system: "480,000 deaths per year in the US. $300B per year in healthcare costs and lost productivity. Every year. Still.",
                correction: "$246B Master Settlement Agreement. Advertising restrictions. Surgeon General warnings. Indoor smoking bans.",
                lesson: "Forty-five years of Hollow Win. The maximum observed T*. Manufactured doubt, regulatory capture, geographic arbitrage to developing countries. But the correction came. The only variable was T*." },
            ].map(c => (
              <div key={c.name} style={{ marginBottom: 24, padding: "24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, borderLeft: `3px solid ${RED}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: M, fontSize: 18, color: TEXT, fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontFamily: M, fontSize: 14, color: MUTED, marginTop: 4 }}>{c.period} · β<sub>W</sub> = {c.beta} · Hollow Win: {c.hollow}</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: M, fontSize: 13, color: GREEN, letterSpacing: 1, marginBottom: 6 }}>WHAT THE P&L SHOWED</div>
                    <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7 }}>{c.private}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: M, fontSize: 13, color: RED, letterSpacing: 1, marginBottom: 6 }}>WHAT THE P&L COULD NOT SHOW</div>
                    <div style={{ fontFamily: S, fontSize: 17, color: "rgba(239,68,68,0.7)", lineHeight: 1.7 }}>{c.system}</div>
                  </div>
                </div>

                <div style={{ fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>THE CORRECTION</div>
                <div style={{ fontFamily: S, fontSize: 17, color: GOLD, lineHeight: 1.7, marginBottom: 12 }}>{c.correction}</div>

                <div style={{ padding: "12px 16px", background: "rgba(245,158,11,0.04)", border: `1px solid rgba(245,158,11,0.1)`, borderRadius: 4 }}>
                  <div style={{ fontFamily: S, fontSize: 17, color: GOLD, lineHeight: 1.7, fontStyle: "italic" }}>{c.lesson}</div>
                </div>
              </div>
            ))}

            <div style={{ padding: "20px 24px", background: "rgba(245,158,11,0.06)", border: `2px solid rgba(245,158,11,0.2)`, borderRadius: 4, marginTop: 16 }}>
              <div style={{ fontFamily: S, fontSize: 18, color: GOLD, lineHeight: 1.8, fontWeight: 600, textAlign: "center" }}>
                Every catastrophe in this table has the same autopsy. The information existed. It was never recorded.
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "32px 0", borderTop: `1px solid ${BORDER}`, marginTop: 48, textAlign: "center" }}>
          <div style={{ fontFamily: M, fontSize: 12, color: MUTED }}>
            © 2026 Erik Postnieks · System Asset Pricing Model Program · Not investment advice.
          </div>
        </div>
      </main>
    </div>
  );
}
