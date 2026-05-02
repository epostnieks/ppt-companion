"use client";
import { useState } from "react";
import COUNTRY_REGULATORS from "./countryRegulators";
import CANONICAL_DOMAINS from "./data/domains";

// ══════════════════════════════════════════════════════════════
// POLICY LAB — Regulatory Triage & Intervention Playbook
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
const MUTED = "#C8C8C8";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "#C8C8C8";

// ═══════════════════════════════════════════════════════════════
// DATA PROVENANCE — POLICY LAB DOMAIN DATA
// Source: CLAUDE.md canonical βW table (2026-04-12, revenue-basis)
// Secondary: MC simulation repos (github.com/epostnieks/sapm-mc-{slug})
// Policy statements: 59 market-failure domains × 6 agents × 190 countries = 67,260 entries
// βW basis: Revenue (Iron Law: Π = annual industry revenue, NEVER profit)
// MC parameters: N=10,000, seed=42, 3+ distribution types per domain
// Last synced: 2026-04-12
// ═══════════════════════════════════════════════════════════════
// ─── DOMAIN DATA (Monte Carlo calibrated, N=10,000, seed=42) ─────────
const DOMAINS = [
  { name: "Weapons of Mass Destruction Capability Diffusion", beta: 21.92, welfCost: 1894, pi: 86.4, jurisdiction: ["Department of Defense (DOD)","State Dept.","National Security Council (NSC)","International Atomic Energy Agency (IAEA)","Chemical Weapons Convention (CWC) / Biological Weapons Convention (BWC)"], addressable: "low", urgency: "critical",
    intervention: "Candidate interventions discussed in the literature: (1) extending the Wassenaar Arrangement to cover AI-relevant dual-use technology; (2) institutional-review requirements for dual-use research at universities and national laboratories; (3) capability-disclosure incentives for synthesis providers, with liability carve-outs for those who report suspected misuse. No single intervention closes the capability-diffusion gap; combination approaches are the norm.",
    existing: ["Export Control Reform Act (2018)","Biological Weapons Convention","Chemical Weapons Convention","Wassenaar Arrangement"],
    gap: "Over 14,000 Forever Chemicals compounds exist. EPA has set enforceable limits for six. No enforceable international treaty covers autonomous weapons or AI-enabled bioweapon design. Dual-use AI models fall outside existing export control categories. The gap is not ignorance. It is architecture.",
    committee: { us: "Armed Services; Foreign Relations; Intelligence", eu: "Security & Defence; Foreign Affairs" } },
  { name: "Orbital Debris", beta: 4.82, welfCost: 8, pi: 2.2, jurisdiction: ["Federal Communications Commission (FCC)","Federal Aviation Administration (FAA)","United Nations Committee on the Peaceful Uses of Outer Space (UN COPUOS)","International Telecommunication Union (ITU)"], addressable: "medium", urgency: "critical",
    intervention: "Orbital-use fee ($235,000/object-year, Rao et al.). Mandatory deorbit within 5 years. Liability regime for constellation operators — not voluntary guidelines, liability.",
    existing: ["Orbital Debris Mitigation Standard Practices (2019)","ITU Radio Regulations","UN Space Debris Mitigation Guidelines"],
    gap: "No binding international debris limit. No orbital-use fee. The 1972 Liability Convention has been invoked exactly once. SpaceX has 6,000+ Starlink satellites in orbit. No one is charging rent.",
    committee: { us: "Commerce, Science & Transportation; Armed Services", eu: "Industry & Energy; Security & Defence" } },
  { name: "Gene Drives", beta: 5.77, welfCost: 8, pi: 12.4, jurisdiction: ["Environmental Protection Agency (EPA)","Food and Drug Administration (FDA)","US Dept. of Agriculture (USDA)","Convention on Biological Diversity (CBD)","Cartagena Protocol"], addressable: "high", urgency: "high",
    intervention: "Moratorium on open-release gene drives until contained architectures — daisy-chain, threshold — are validated in field trials. Not a ban on research. A ban on releasing self-propagating constructs into wild populations.",
    existing: ["Coordinated Framework for Biotechnology (1986)","Cartagena Protocol on Biosafety","EPA Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA) authority over plant-incorporated protectants"],
    gap: "The pesticide law (FIFRA) was designed for pesticides. A gene drive is not a pesticide — it is an organism that replaces a species. No regulatory framework on Earth was built for self-propagating genetic constructs. The Coordinated Framework is 40 years old. Gene drives did not exist when it was written.",
    committee: { us: "Energy & Commerce; Agriculture; Science", eu: "Environment & Public Health; Agriculture" } },
  { name: "Pharmacy Benefit Managers", beta: 6.35, welfCost: 381, pi: 60, jurisdiction: ["Federal Trade Commission (FTC)","Health and Human Services (HHS)","Centers for Medicare & Medicaid Services (CMS)","State Attorneys General"], addressable: "very high", urgency: "high",
    intervention: "Structural separation — Pharmacy Benefit Management cannot own the insurer and the pharmacy. Ban spread pricing. Mandate rebate pass-through to patients at point of sale. Three companies control 80% of the market. They are the buyer, the seller, and the middleman.",
    existing: ["FTC Pharmacy Benefit Management Investigation (2024)","State Pharmacy Benefit Management transparency laws (35+ states)","CMS Medicare Part D rebate rule"],
    gap: "CVS owns Aetna and Caremark. Cigna owns Express Scripts. UnitedHealth owns Optum Rx. The vertical integration is the problem — and no federal law prohibits it. The FTC investigation is active. The structural separation bill does not exist.",
    committee: { us: "Finance; Health, Education, Labor & Pensions; Energy & Commerce; Judiciary", eu: "N/A (US-specific)" } },
  { name: "Forever Chemicals (PFAS)", beta: 5.31, welfCost: 6582, pi: 187, jurisdiction: ["EPA","FDA","DOD","European Chemicals Agency (ECHA)","Stockholm Convention"], addressable: "high", urgency: "critical",
    intervention: "Class-wide production ban — not compound-by-compound, class-wide. Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) hazardous substance designation for all Forever Chemicals. Manufacturer-funded remediation with strict liability. The carbon-fluorine bond does not negotiate. Neither should the regulation.",
    existing: ["EPA Forever Chemicals Strategic Roadmap (2021)","Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) designation (PFOA/PFOS, 2024)","EU Forever Chemicals restriction proposal (European Chemicals Agency, 2023)","Stockholm Convention listings"],
    gap: "14,000+ Forever Chemicals compounds. EPA has enforceable limits for 6. The EU restriction proposal covers ~10,000 but grants 5–12 year exemptions for 'critical uses.' The compound-by-compound approach guarantees the industry manufactures faster than the regulator can list.",
    committee: { us: "Environment & Public Works; Energy & Commerce; Armed Services (DOD sites)", eu: "Environment & Public Health; Industry & Energy" } },
  { name: "Opioid Ecosystem", beta: 14.96, welfCost: 1122, pi: 75, jurisdiction: ["Drug Enforcement Administration (DEA)","FDA","HHS","Substance Abuse and Mental Health Services Administration (SAMHSA)","State Attorneys General"], addressable: "medium", urgency: "high",
    intervention: "Federal Prescription Drug Monitoring Program (PDMP) interoperability mandate — not voluntary, mandatory. Naloxone (opioid overdose reversal drug) over-the-counter expansion. Medication-assisted treatment (MAT) access parity enforcement. Distributor quota reform. None of this addresses the fentanyl supply chain, which is entirely illicit and outside pharmaceutical regulation.",
    existing: ["SUPPORT Act (2018)","DEA Automation of Reports and Consolidated Orders System (ARCOS)","State PDMP programs (50 states)","Naloxone Access Laws (48 states)"],
    gap: "No federal prescription drug monitoring mandate. Fifty state systems that don't talk to each other. DEA quotas were designed for shortages, not diversion. And the synthetic supply chain — fentanyl precursors from China, pressed in Mexico, distributed through social media — operates in a jurisdiction that pharmaceutical regulation cannot reach.",
    committee: { us: "Energy & Commerce; Judiciary; Finance; Health, Education, Labor & Pensions", eu: "Environment & Public Health; Civil Liberties" } },
  { name: "Commercial Real Estate Urban Hollowing", beta: 8.5, welfCost: 111, pi: 14, jurisdiction: ["Federal Reserve","Office of the Comptroller of the Currency (OCC)","Federal Deposit Insurance Corporation (FDIC)","Securities and Exchange Commission (SEC)","Treasury","Municipal"], addressable: "medium", urgency: "high",
    intervention: "Commercial Real Estate loan stress-testing with mark-to-market — not extend-and-pretend, mark-to-market. Adaptive reuse zoning reform. Commercial mortgage-backed securities (CMBS) transparency requirements. The office vacancy rate in San Francisco is 37%. The loans say the buildings are worth what they were worth in 2019. They are not.",
    existing: ["Dodd-Frank stress testing (Comprehensive Capital Analysis and Review / Dodd-Frank Act Stress Tests)","Basel III Commercial Real Estate risk weights","Municipal zoning codes"],
    gap: "$1.5 trillion in distressed Commercial Real Estate loans are being carried at 2019 valuations through extend-and-pretend accounting. No federal adaptive-reuse incentive exists. Commercial mortgage-backed securities servicer conflicts of interest are unaddressed. The banking system is pretending the problem doesn't exist. The buildings are empty.",
    committee: { us: "Banking; Financial Services; Ways & Means", eu: "Economic Affairs" } },
  { name: "Big Tech Platform Monopoly", beta: 6.3, welfCost: 990, pi: 158, jurisdiction: ["FTC","DOJ","European Commission Directorate-General for Competition","Digital Markets Act"], addressable: "high", urgency: "high",
    intervention: "Structural separation — marketplace from private-label. Interoperability mandates. Data portability. Acquisition moratorium for dominant platforms. The EU did this with the Digital Markets Act. The US has not.",
    existing: ["Digital Markets Act (EU, 2023)","American Innovation and Choice Online Act (proposed)","DOJ v. Google (2024)","FTC v. Meta (2024)"],
    gap: "No US equivalent of the Digital Markets Act. The American Innovation and Choice Online Act has been proposed and stalled twice. Current enforcement is case-by-case litigation that takes years. Network effects regenerate market power faster than the Department of Justice can litigate.",
    committee: { us: "Judiciary; Commerce; Intelligence (data/surveillance)", eu: "Internal Market; Legal Affairs; Industry & Energy" } },
  { name: "Palm Oil Deforestation", beta: 6.30, welfCost: 428, pi: 68, jurisdiction: ["USDA","EU Deforestation Regulation","Roundtable on Sustainable Palm Oil (RSPO)","Indonesia/Malaysia national"], addressable: "medium", urgency: "high",
    intervention: "EU Deforestation Regulation enforcement. Satellite-verified supply-chain traceability. Import tariffs on non-certified palm oil.",
    existing: ["EU Deforestation Regulation (2023)","Roundtable on Sustainable Palm Oil Certification","Indonesia/Malaysia moratoria"],
    gap: "The EU Deforestation Regulation covers EU imports — about 15% of global production. No equivalent US legislation. The Roundtable on Sustainable Palm Oil certifies 19% of global supply. Indonesia's moratorium has enforcement gaps measured in millions of hectares. The forest does not grow back on human timescales.",
    committee: { us: "Agriculture; Foreign Affairs; Ways & Means", eu: "Environment & Public Health; International Trade" } },
  { name: "Industrial Monoculture", beta: 7.36, welfCost: 447, pi: 340, jurisdiction: ["USDA","EPA","Food and Agriculture Organization (FAO)","Convention on Biological Diversity"], addressable: "medium", urgency: "high",
    intervention: "Crop diversity requirements tied to crop insurance subsidies. If you want the taxpayer backstop, plant more than one thing. Germplasm banking expansion. Pathogen surveillance for genetically uniform cultivars.",
    existing: ["Federal Crop Insurance Act","International Treaty on Plant Genetic Resources","FAO Commission on Genetic Resources"],
    gap: "Crop insurance incentivizes monoculture — higher yields mean higher coverage. The subsidy structure pays farmers to do the thing that maximizes systemic risk. Four companies control 60% of the global seed market. The genetic base is narrowing, not widening.",
    committee: { us: "Agriculture; Appropriations", eu: "Agriculture; Environment & Public Health" } },
  { name: "Deep-Sea Mining", beta: 6.8, welfCost: 34, pi: 5, jurisdiction: ["International Seabed Authority (ISA)","United Nations Convention on the Law of the Sea (UNCLOS)","EPA","National Oceanic and Atmospheric Administration (NOAA)"], addressable: "high", urgency: "medium",
    intervention: "Mining moratorium until abyssal recovery science exists. Mandatory environmental impact assessments with 100-year modeling horizons. Polymetallic nodules form at 10–20 mm per million years. There is no 'sustainable harvest rate.' There is only permanent removal.",
    existing: ["United Nations Convention on the Law of the Sea (UNCLOS) Part XI / International Seabed Authority Mining Code (in development)","Moratorium calls (France, Germany, 32 countries)"],
    gap: "The International Seabed Authority Mining Code is not finalized. No agreed environmental threshold. 32 countries have called for a moratorium. The Authority has not granted one. Recovery rates are measured in millimeters per million years. 'Sustainable' is not a word that applies.",
    committee: { us: "Foreign Relations; Commerce; Natural Resources", eu: "Environment & Public Health; Fisheries" } },
  { name: "Gambling", beta: 7.30, welfCost: 329, pi: 45, jurisdiction: ["State Gaming Commissions","FTC","Consumer Financial Protection Bureau (CFPB)","UK Gambling Commission"], addressable: "high", urgency: "medium",
    intervention: "Mandatory pre-commitment — deposit and loss limits set before play begins. Real-time loss notifications. Ban on loss-disguised-as-wins. Algorithmic audit of engagement optimization. The slot machine is a computer now. Regulate it like one.",
    existing: ["State gaming regulations","UK Gambling Act 2005 (amended 2023)","CFPB consumer protection authority"],
    gap: "No federal online gambling regulation. State-by-state patchwork. Mobile sports betting is expanding in 38 states with minimal consumer protection. No algorithmic transparency requirement. The house edge is now optimized by machine learning, and the regulator is using spreadsheets.",
    committee: { us: "Commerce; Judiciary; Financial Services", eu: "Internal Market; Culture & Education" } },
  { name: "Coal Combustion", beta: 7.0, welfCost: 6861, pi: 999, jurisdiction: ["EPA","Department of Energy (DOE)","United Nations Framework Convention on Climate Change (UNFCCC)","International Energy Agency (IEA)"], addressable: "medium", urgency: "critical",
    intervention: "Accelerated phase-out. Just transition fund. Carbon pricing at $50+/ton minimum. No new coal plant permits. China, India, and Indonesia burn 75% of the world's coal. This is not a problem the US can solve alone.",
    existing: ["EPA Clean Power Plan (revised)","Paris Agreement Nationally Determined Contributions (NDCs)","EU Emissions Trading System (ETS)","Powering Past Coal Alliance"],
    gap: "Paris Nationally Determined Contributions are voluntary. No binding international phase-out treaty exists. Carbon prices range from $5 to $90/ton across jurisdictions. The EPA's social cost of carbon is $185/ton. The gap between the price and the cost is the subsidy coal receives from the atmosphere.",
    committee: { us: "Energy & Natural Resources; Environment & Public Works; Ways & Means", eu: "Environment & Public Health; Industry & Energy" } },
  { name: "Tobacco", beta: 6.80, welfCost: 6554, pi: 974, jurisdiction: ["FDA Center for Tobacco Products","World Health Organization Framework Convention on Tobacco Control (WHO FCTC)","FTC","State Attorneys General"], addressable: "medium", urgency: "medium",
    intervention: "Nicotine cap regulation. Flavor ban enforcement. Plain packaging. The FDA proposed banning menthol in 2022. It has been delayed three times. 480,000 Americans die per year from tobacco. That number has not changed.",
    existing: ["Family Smoking Prevention and Tobacco Control Act (2009)","WHO FCTC (182 parties)","FDA menthol ban (proposed, delayed)","State tobacco taxes"],
    gap: "The menthol ban is repeatedly delayed. The Framework Convention on Tobacco Control has no enforcement mechanism. E-cigarette regulation lags combustible by a decade. Low- and middle-income countries remain the primary growth markets — tobacco's T* is being extended by geographic arbitrage.",
    committee: { us: "Health, Education, Labor & Pensions; Energy & Commerce; Finance", eu: "Environment & Public Health; International Trade" } },
  { name: "Oil & Gas Extraction", beta: 1.63, welfCost: 5695, pi: 3500, jurisdiction: ["EPA","Department of the Interior / Bureau of Land Management (DOI/BLM)","Federal Energy Regulatory Commission (FERC)","Organization of the Petroleum Exporting Countries (OPEC)","UNFCCC"], addressable: "medium", urgency: "critical",
    intervention: "Methane fee at $1,500/ton. Federal leasing reform. Subsidy elimination — $20.5 billion per year in US fossil fuel subsidies. Mandatory Scope 3 disclosure. The Inflation Reduction Act (IRA) methane fee applies only to facilities emitting >25,000 tons/year. That is the floor, not the ceiling.",
    existing: ["Inflation Reduction Act methane fee","EPA methane rules","SEC climate disclosure rule (stayed)","EU Corporate Sustainability Reporting Directive"],
    gap: "Scope 3 (supply chain emissions) disclosure has been delayed and challenged in court. $20.5B in annual fossil fuel subsidies persist. No production cap mechanism exists. The Securities and Exchange Commission climate rule was stayed before it took effect. The largest welfare cost in the dataset — $22.9 trillion per year — and the disclosure rule can't survive a court challenge.",
    committee: { us: "Energy & Natural Resources; Environment & Public Works; Finance", eu: "Environment & Public Health; Industry & Energy; Economic Affairs" } },
  { name: "Cement (Calcination Floor)", beta: 6.74, welfCost: 22, pi: 3, jurisdiction: ["EPA","EU Emissions Trading System","Carbon Border Adjustment Mechanism","ISO"], addressable: "low", urgency: "medium",
    intervention: "Carbon border adjustments for cement. R&D funding for calcium silicate alternatives. Low-carbon concrete procurement mandates for federal construction. But understand: the process emission is calcium carbonate → calcium oxide + carbon dioxide. That is conservation of mass. No fuel switch eliminates it.",
    existing: ["EU Carbon Border Adjustment Mechanism (CBAM, 2023, transitional)","EPA cement National Emission Standards for Hazardous Air Pollutants","General Services Administration (GSA) Buy Clean","EU Emissions Trading System (ETS) Phase IV"],
    gap: "60% of cement's CO₂ comes from the chemistry, not the fuel. Switching to solar-powered kilns does not change the calcination reaction. No substitute cement exists at >1% market share. Green cement costs 2–4× conventional. The floor is set by the periodic table.",
    committee: { us: "Environment & Public Works; Transportation & Infrastructure; Appropriations", eu: "Environment & Public Health; Industry & Energy" } },
  { name: "Ultra-Processed Food", beta: 4.06, welfCost: 1829, pi: 450, jurisdiction: ["FDA","USDA","FTC","World Health Organization (WHO)","Codex Alimentarius (international food standards)"], addressable: "high", urgency: "high",
    intervention: "Front-of-pack warning labels — Chile, Mexico, and Colombia already have them. Marketing restrictions to children. Supplemental Nutrition Assistance Program (SNAP) / Women, Infants, and Children (WIC) nutritional quality criteria. School meal reformulation mandates.",
    existing: ["Chile Ley 20.606 (warning labels, 2016)","Mexico NOM-051","Colombia warning labels (2023)","US Nutrition Facts label"],
    gap: "No US front-of-pack warning label. Industry self-regulation on children's marketing — the Children's Food and Beverage Advertising Initiative — is voluntary, narrow, and written by the companies it regulates. Food stamps (SNAP) have no nutritional quality restriction. Chile proved warning labels reduce Ultra-Processed Food consumption by 25% in two years. The US has not tried.",
    committee: { us: "Agriculture; Health, Education, Labor & Pensions; Energy & Commerce", eu: "Environment & Public Health; Agriculture" } },
  { name: "Persistent Organic Pollutants", beta: 6.23, welfCost: 436, pi: 70, jurisdiction: ["EPA","European Chemicals Agency","Stockholm Convention","Basel Convention"], addressable: "medium", urgency: "medium",
    intervention: "Accelerate Stockholm Convention listing. Pre-market persistence screening mandate. Extended producer responsibility for persistent chemicals.",
    existing: ["Stockholm Convention (186 parties, 34 listed Persistent Organic Pollutants)","Toxic Substances Control Act (TSCA) (reformed 2016)","EU Registration, Evaluation, Authorisation and Restriction of Chemicals (REACH)","Basel Convention"],
    gap: "Stockholm listing takes 7–10 years per compound. Toxic Substances Control Act (TSCA) reform improved but resource-constrained. Thousands of persistent chemicals in commerce without adequate assessment. The listing process is slower than the manufacturing process. That is the gap.",
    committee: { us: "Environment & Public Works; Energy & Commerce", eu: "Environment & Public Health; Industry & Energy" } },
  { name: "Topsoil Erosion", beta: 4.41, welfCost: 1123, pi: 255, jurisdiction: ["USDA Natural Resources Conservation Service","EPA","Food and Agriculture Organization","United Nations Convention to Combat Desertification"], addressable: "medium", urgency: "high",
    intervention: "Conservation compliance strengthening. Soil health payment programs. Erosion rate disclosure tied to crop insurance. We are farming the principal and calling it income.",
    existing: ["USDA Conservation Reserve Program (CRP)","Environmental Quality Incentives Program (EQIP)","Conservation Stewardship Program","EU Common Agricultural Policy (CAP) conditionality"],
    gap: "Erosion rates are 10–100× formation rates. Topsoil forms at 1 cm per 100–1,000 years. Conservation Reserve Program enrollment is capped. No mandatory soil health reporting exists. Commodity program payments incentivize production over conservation — the subsidy structure rewards mining the soil.",
    committee: { us: "Agriculture; Appropriations", eu: "Agriculture; Environment & Public Health" } },
  { name: "Algorithmic Pricing", beta: 5.38, welfCost: 215, pi: 40, jurisdiction: ["FTC","DOJ","European Commission Competition Directorate","State Attorneys General"], addressable: "very high", urgency: "medium",
    intervention: "Ban shared algorithmic pricing tools — the RealPage model. Mandatory disclosure of algorithm-set pricing. Antitrust guidance on tacit algorithmic collusion. Q-learning algorithms reach supracompetitive equilibria without communication, instruction, or awareness. The Folk Theorem guarantees it.",
    existing: ["DOJ v. RealPage (2024)","FTC Section 5 authority","EU Digital Markets Act","State rent stabilization laws"],
    gap: "No statute explicitly addresses algorithmic tacit collusion. Sherman Act §1 requires 'agreement.' Algorithms achieve supracompetitive pricing without agreement, without communication, without even knowing the other algorithm exists. Calvano et al. (2020) showed this experimentally. The law has not caught up.",
    committee: { us: "Judiciary; Banking (housing); Commerce", eu: "Economic Affairs; Internal Market; Legal Affairs" } },
  { name: "Bitcoin Proof-of-Work", beta: 5.0, welfCost: 210, pi: 42, jurisdiction: ["SEC","Commodity Futures Trading Commission (CFTC)","Financial Crimes Enforcement Network (FinCEN)","IRS","Basel Committee on Banking Supervision"], addressable: "medium", urgency: "medium",
    intervention: "Energy disclosure mandate for mining operations. Carbon fee on proof-of-work computation. Mining facility zoning and permitting reform. The Protocol Welfare Floor guarantees β<sub>W</sub> ≥ 1.0 — the impossibility is architectural, not regulatory.",
    existing: ["Energy Information Administration (EIA) emergency survey (2024, paused)","NY moratorium on fossil-fuel mining","EU Markets in Crypto-Assets Regulation (MiCA, excludes mining)"],
    gap: "No federal energy disclosure for mining. No carbon fee on computation. Miners relocate to the cheapest jurisdiction. And the Protocol Welfare Floor means even perfect regulation cannot reduce βW below 1.0 — permissionless access prevents welfare internalization by design.",
    committee: { us: "Financial Services; Energy; Agriculture (CFTC)", eu: "Economic Affairs; Industry & Energy" } },
  { name: "Aviation Emissions", beta: 4.97, welfCost: 498, pi: 100, jurisdiction: ["FAA","International Civil Aviation Organization (ICAO)","EPA","EU Emissions Trading System"], addressable: "low", urgency: "medium",
    intervention: "Carbon Offsetting and Reduction Scheme for International Aviation (CORSIA) strengthening. Sustainable aviation fuel (SAF) blending mandates — the EU's ReFuelEU model. Frequent-flyer levy. Short-haul rail substitution. There is no technology pathway to zero-emission long-haul flight. SAF is less than 1% of jet fuel.",
    existing: ["ICAO carbon offsetting scheme (Carbon Offsetting and Reduction Scheme for International Aviation (CORSIA), 2027 mandatory phase)","EU ReFuelEU Aviation (2025)","EU Emissions Trading System (ETS) — aviation, intra-EU"],
    gap: "The aviation carbon offsetting scheme is carbon-neutral growth from a 2019 baseline — not absolute reduction. Sustainable aviation fuel is <1% of jet fuel and costs 3–5× conventional. No battery or hydrogen technology exists for flights over 1,000 miles. The physics of energy density sets the floor.",
    committee: { us: "Commerce; Transportation & Infrastructure; Environment & Public Works", eu: "Transport; Environment & Public Health" } },
  { name: "Student Loan Securitization", beta: 6.36, welfCost: 298, pi: 46.8, jurisdiction: ["Department of Education","Consumer Financial Protection Bureau (CFPB)","SEC","FTC","State Attorneys General"], addressable: "high", urgency: "medium",
    intervention: "90/10 rule enforcement. Gainful employment metrics. Borrower defense streamlining. Servicer accountability standards. The for-profit sector enrolls 10% of students and produces 50% of defaults. That ratio is the diagnostic.",
    existing: ["Higher Education Act","CFPB supervision of servicers","Gainful Employment Rule (reinstated 2023)","Borrower Defense Rule"],
    gap: "For-profit institutions game accountability metrics — they have compliance departments specifically designed to hit thresholds. Income-driven repayment complexity obscures the default pipeline. The 90/10 rule (90% federal funding cap) was weakened and then restored but enforcement remains inconsistent.",
    committee: { us: "Health, Education, Labor & Pensions; Education & Labor; Finance; Banking", eu: "N/A (US-specific)" } },
  { name: "Fisheries", beta: 4.70, welfCost: 179, pi: 38, jurisdiction: ["NOAA / National Marine Fisheries Service","Food and Agriculture Organization","Regional Fisheries Management Organizations (RFMOs)","UN Convention on the Law of the Sea"], addressable: "medium", urgency: "high",
    intervention: "Illegal, unreported, and unregulated (IUU) fishing enforcement. Subsidy reform per WTO Agreement. Climate-adaptive quota models. Marine protected area expansion. But the impossibility is jurisdictional: ocean warming operates outside the institutional reach of fisheries management. The thing destroying the fishery is not fishing.",
    existing: ["Magnuson-Stevens Act","WTO Fisheries Subsidies Agreement (2022)","UN Fish Stocks Agreement","EU Common Fisheries Policy"],
    gap: "You cannot manage a fishery when the ocean temperature is changing the location, abundance, and reproductive capacity of every species in it. $35B per year in harmful fishing subsidies persist globally. Climate forcing is the external variable that fisheries management cannot address.",
    committee: { us: "Commerce (NOAA); Natural Resources", eu: "Fisheries; Environment & Public Health" } },
  { name: "Gig Economy", beta: 0.76, welfCost: 34, pi: 45, jurisdiction: ["Department of Labor (DOL)","National Labor Relations Board (NLRB)","IRS","State Labor Agencies","EU"], addressable: "high", urgency: "medium",
    intervention: "Portable benefits framework. Algorithmic management transparency — show the driver why they got deactivated. Classification reform using the ABC test at the federal level. Minimum earnings standard.",
    existing: ["California AB5","EU Platform Work Directive (2024)","DOL independent contractor rule (2024)","Protecting the Right to Organize (PRO) Act (proposed)"],
    gap: "The federal classification test remains a multi-factor balancing act that produces inconsistent results across circuits. No portable benefits legislation exists at the federal level. Algorithmic management — dispatch, surge pricing, deactivation — is entirely unregulated. The platform decides. The worker does not know why.",
    committee: { us: "Health, Education, Labor & Pensions; Education & Labor; Finance (tax classification)", eu: "Employment; Internal Market" } },
  { name: "Water Privatization", beta: 5.61, welfCost: 1381, pi: 246, jurisdiction: ["EPA","State Public Utility Commissions","World Health Organization","World Bank"], addressable: "high", urgency: "medium",
    intervention: "Rate transparency mandates. Service quality metrics tied to rate increases. Public-option preservation. Infrastructure investment requirements — not optional, required as a condition of the franchise.",
    existing: ["Safe Drinking Water Act","Clean Water State Revolving Fund","State Public Utility Commission oversight"],
    gap: "Private water utilities charge 59% more than public systems. Infrastructure investment often declines post-privatization — the incentive is to extract from the asset, not maintain it. Limited competition because water is a natural monopoly. The market cannot discipline a monopolist when the product is survival.",
    committee: { us: "Environment & Public Works; Energy & Commerce; Appropriations", eu: "Environment & Public Health; Internal Market" } },
  { name: "Arms Exports", beta: 2.54, welfCost: 75, pi: 29.6, jurisdiction: ["State Dept. Directorate of Defense Trade Controls","DOD Defense Security Cooperation Agency","Congress","Arms Trade Treaty","Wassenaar Arrangement"], addressable: "medium", urgency: "medium",
    intervention: "Arms Trade Treaty ratification. End-use monitoring expansion. Congressional notification threshold reduction. Human rights conditionality with actual enforcement.",
    existing: ["Arms Export Control Act","Arms Trade Treaty (not ratified by US)","Leahy Law","Conventional Arms Transfer Policy"],
    gap: "The Arms Trade Treaty has not been ratified by the US, Russia, or China. Congressional notification thresholds allow significant sales without oversight. End-use monitoring is resource-constrained — we sell the weapons and then don't have enough staff to check where they went.",
    committee: { us: "Foreign Relations; Foreign Affairs; Armed Services", eu: "Foreign Affairs; Security & Defence" } },
  { name: "Proof of Stake Protocols", beta: 3.14, welfCost: 6, pi: 12, jurisdiction: ["SEC","CFTC","EU Markets in Crypto-Assets Regulation"], addressable: "high", urgency: "low",
    intervention: "Staking-as-a-service regulation. Validator concentration monitoring — Lido controls 28% of Ethereum staking. Governance token disclosure requirements.",
    existing: ["EU Markets in Crypto-Assets Regulation (MiCA, 2024)","SEC staking enforcement actions","CFTC digital commodity guidance"],
    gap: "Proof-of-Stake welfare costs are 97% lower than Proof-of-Work. β<sub>W</sub> = 3.14 — moderate. The primary risk is validator concentration, not energy. Not a priority domain. The system works when you compare it to proof of work.",
    committee: { us: "Financial Services; Agriculture (CFTC)", eu: "Economic Affairs" } },
  { name: "Nuclear Fission", beta: 0.54, welfCost: 23, pi: 44, jurisdiction: ["Nuclear Regulatory Commission (NRC)","Department of Energy","International Atomic Energy Agency","EPA"], addressable: "high", urgency: "low",
    intervention: "Licensing reform for advanced reactors. Spent fuel repository progress. Small modular reactor (SMR) deployment incentives. Nuclear is a βW < 1 control/comparator. The barriers are regulatory and political, not welfare-economic.",
    existing: ["Nuclear Energy Innovation and Modernization Act (2019)","NRC advanced reactor licensing rulemaking (Part 53)","Inflation Reduction Act nuclear production tax credit","IAEA safeguards"],
    gap: "This is the one domain where the answer is 'get out of the way.' Nuclear Regulatory Commission licensing takes 5+ years. The waste problem is political, not technical — Yucca Mountain is an act of Congress, not an act of physics. Nuclear is net welfare-positive per dollar of output. The regulatory burden is the cost.",
    committee: { us: "Environment & Public Works; Energy & Natural Resources; Appropriations", eu: "Industry & Energy; Environment & Public Health" } },
  { name: "Frontier AI", beta: 7.51, welfCost: 225, pi: 30, jurisdiction: ["National Institute of Standards and Technology (NIST)","Department of Commerce Bureau of Industry and Security (BIS)","Federal Trade Commission (FTC)","Office of Science and Technology Policy (OSTP)","European Commission (EU AI Act)","UK AI Safety Institute","United Nations International Telecommunication Union (ITU)"], addressable: "medium", urgency: "critical",
    intervention: "Mandatory pre-deployment safety evaluations for frontier models above a compute threshold — not voluntary commitments, mandatory. Structured access regimes: model weights for models above 10<sup>26</sup> FLOP are not open-released without independent red-teaming. Compute reporting requirements for training runs. Liability framework — if a model causes harm, someone is liable. The EU AI Act exists. The US has an executive order. Neither has teeth for frontier capability.",
    existing: ["EU AI Act (2024, phased enforcement)","Executive Order 14110 on Safe, Secure, and Trustworthy AI (2023)","NIST AI Risk Management Framework","UK AI Safety Institute evaluations","Bletchley Declaration (2023)","G7 Hiroshima AI Process Code of Conduct"],
    gap: "No US federal AI legislation. The executive order is not legislation — it can be revoked by the next president. The EU AI Act classifies by risk tier but does not address frontier capability scaling. No international treaty governs AI development. Voluntary commitments from labs are unenforceable. The alignment problem is unsolved, capability scaling continues, and the regulatory response is a non-binding declaration signed at a country house in England.",
    committee: { us: "Commerce, Science & Transportation; Intelligence; Armed Services; Judiciary", eu: "Internal Market; Civil Liberties; Industry & Energy; Artificial Intelligence (Special Committee)" } },
  { name: "Antimicrobial Resistance", beta: 5.84, welfCost: 88, pi: 42, jurisdiction: ["Food and Drug Administration (FDA)","Centers for Disease Control and Prevention (CDC)","US Department of Agriculture (USDA)","World Health Organization (WHO)","World Organisation for Animal Health (WOAH)","Food and Agriculture Organization (FAO)"], addressable: "medium", urgency: "critical",
    intervention: "Ban sub-therapeutic antibiotic use in livestock — growth promotion, not treatment. Mandatory antibiotic stewardship programs in all hospitals. Pull incentive reform: transferable exclusivity vouchers or market-entry rewards for novel antibiotic classes. The pipeline is dry because antibiotics are not profitable. Fix the economics or accept the consequences.",
    existing: ["WHO Global Action Plan on Antimicrobial Resistance (2015)","US National Action Plan for Combating Antibiotic-Resistant Bacteria","FDA Guidance for Industry #213 (voluntary livestock withdrawal)","EU ban on antibiotic growth promoters (2006)","PASTEUR Act (proposed, not passed)"],
    gap: "FDA guidance on livestock antibiotics is voluntary. 'Medically important' antibiotics are still used for disease prevention in healthy animals — the loophole swallows the rule. The PASTEUR Act, which would create pull incentives for novel antibiotics, has been proposed and stalled twice. Two new antibiotic classes have been approved in 40 years. Resistance is evolving on a 20-minute generation cycle. The pharmaceutical pipeline operates on a 10-year development cycle. The math does not work.",
    committee: { us: "Health, Education, Labor & Pensions; Agriculture; Energy & Commerce; Appropriations", eu: "Environment & Public Health; Agriculture" } },
  { name: "Groundwater / Ogallala Aquifer", beta: 3.46, welfCost: 33, pi: 15, jurisdiction: ["US Geological Survey (USGS)","State Water Boards","EPA","Bureau of Reclamation"], addressable: "low", urgency: "critical",
    intervention: "Groundwater metering and extraction caps. Federal aquifer management framework. Crop insurance reform — stop subsidizing irrigation of marginal land over depleting aquifers. Managed transition to dryland agriculture.",
    existing: ["California SGMA (2014)","Kansas LEMA framework","State groundwater rights (rule of capture in most states)"],
    gap: "The Ogallala recharges at 1 inch per year. It is being pumped at 12 inches per year. In most states, groundwater is governed by the 'rule of capture' — pump what you want, no limit. No federal groundwater management authority exists. Kansas LEMAs are voluntary. California SGMA has a 2040 sustainability deadline that no one believes will be met. The aquifer was filled by Pleistocene glaciation. It will not refill.",
    committee: { us: "Agriculture; Energy & Natural Resources; Appropriations", eu: "N/A (US-specific)" } },
  { name: "Industrial Agriculture Methane", beta: 7.36, welfCost: 1510, pi: 205, jurisdiction: ["EPA","USDA","UNFCCC","Food and Agriculture Organization (FAO)"], addressable: "medium", urgency: "high",
    intervention: "Mandatory methane-reducing feed additives (Bovaer/3-NOP). Carbon pricing on enteric emissions. Subsidy reform — redirect livestock subsidies to alternative protein R&D. The cow is the reactor. The methane is the byproduct. Regulation must address the biology.",
    existing: ["EPA Methane Emissions Reduction Program","EU methane regulation (excludes agriculture)","New Zealand agricultural emissions pricing (abandoned)"],
    gap: "Enteric fermentation produces methane via methanogenic archaea in the rumen. No feed additive eliminates it — Bovaer reduces emissions ~30%. The EU methane regulation explicitly excludes agriculture. New Zealand tried to price agricultural emissions and abandoned the policy under political pressure. The US has no federal methane pricing for agriculture.",
    committee: { us: "Agriculture; Environment & Public Works; Energy & Commerce", eu: "Agriculture; Environment & Public Health" } },
  { name: "Private Equity in Healthcare", beta: 5.24, welfCost: 162, pi: 31, jurisdiction: ["FTC","HHS","CMS","SEC","State Attorneys General"], addressable: "high", urgency: "high",
    intervention: "Mandatory PE healthcare transaction disclosure. Staffing ratio floors for PE-owned facilities. Debt-loading limits on acquired hospitals. The IRR hurdle is 20%. The duty of care requires investment. These two numbers cannot coexist.",
    existing: ["No Surprises Act (2022)","FTC hospital merger review","State PE healthcare transparency laws (CA, OR, MA)","CMS nursing home minimum staffing rule (proposed)"],
    gap: "PE-owned nursing homes have 10% higher mortality rates. Steward Health Care, the largest PE-owned hospital chain, filed for bankruptcy in 2024 after $9B in debt loading. No federal law restricts PE acquisition of healthcare providers. No federal staffing mandate exists. The fiduciary duty runs to the limited partner, not the patient.",
    committee: { us: "Finance; Health, Education, Labor & Pensions; Judiciary; Banking", eu: "Environment & Public Health; Economic Affairs" } },
  { name: "Social Media & Youth Mental Health", beta: 5.79, welfCost: 394, pi: 68, jurisdiction: ["FTC","FDA (if reclassified)","National Institute of Mental Health","EU Digital Services Act"], addressable: "high", urgency: "critical",
    intervention: "Algorithmic feed ban for under-16 users. Mandatory design standards for minors (no infinite scroll, no notification bombardment, no social comparison metrics). Age verification. The business model is the harm — engagement maximization exploits dopaminergic reward circuitry in developing brains.",
    existing: ["Children's Online Privacy Protection Act (COPPA) (1998, pre-social media)","UK Age Appropriate Design Code","EU Digital Services Act","US Surgeon General advisory (2023)","Kids Online Safety Act (KOSA, proposed)"],
    gap: "Children's Online Privacy Protection Act (COPPA) was written before social media existed. It applies to children under 13. Instagram's minimum age is 13. The law and the platform conspire to deliver 13-year-olds to the algorithm. No federal design standard for addictive features exists. Meta's internal research showed Instagram worsens body image for 1 in 3 teen girls. They published the research internally and changed nothing.",
    committee: { us: "Commerce; Judiciary; Health, Education, Labor & Pensions", eu: "Internal Market; Civil Liberties; Culture & Education" } },
  { name: "Defense Procurement", beta: 4.88, welfCost: 164, pi: 33.7, jurisdiction: ["Department of Defense","Government Accountability Office (GAO)","Congressional Armed Services Committees"], addressable: "medium", urgency: "medium",
    intervention: "Fixed-price contract expansion. Competitive prototyping mandates. Revolving-door cooling period extension to 4 years. Geographic subcontract reform — award based on capability, not congressional district.",
    existing: ["Federal Acquisition Regulation (FAR)","Goldwater-Nichols Act (1986)","Better Buying Power initiatives","Section 809 Panel recommendations"],
    gap: "The average Major Defense Acquisition Program runs 25% over budget and 50% behind schedule. Five companies control the majority of prime contracts. Cost-plus contracting rewards cost maximization. The revolving door ensures that the people writing the requirements are the people who will bid on them. The iron triangle — Congress, contractors, Pentagon — is the governance structure, not a corruption of it.",
    committee: { us: "Armed Services; Appropriations; Budget", eu: "Security & Defence" } },
  { name: "Fast Fashion", beta: 7.01, welfCost: 385, pi: 55, jurisdiction: ["FTC","EPA","EU Strategy for Sustainable Textiles","International Labour Organization (ILO)"], addressable: "high", urgency: "medium",
    intervention: "Extended producer responsibility for textiles. Mandatory durability labeling. De minimis loophole closure ($800 threshold enables Shein's model). Microfiber discharge standards. Polyester garments shed microplastics on every wash — that is thermodynamics, not negligence.",
    existing: ["France Loi AGEC textile provisions","EU Strategy for Sustainable and Circular Textiles","UK Environment Act 2021 (EPR framework)","International Accord (successor to Bangladesh Accord)"],
    gap: "Shein produces 6,000+ new styles per day. The average garment is worn fewer than 10 times. Less than 1% of textiles are recycled fiber-to-fiber. The $800 US de minimis threshold allows Shein to ship directly to consumers tariff-free. No federal microfiber discharge standard exists. The business model is disposability. Durability destroys revenue.",
    committee: { us: "Energy & Commerce; Ways & Means; Environment & Public Works", eu: "Environment & Public Health; Internal Market; International Trade" } },
  { name: "Mining & Rare Earth Extraction", beta: 11.15, welfCost: 322, pi: 150, jurisdiction: ["EPA","Bureau of Land Management","International Council on Mining and Metals","EU Critical Raw Materials Act"], addressable: "low", urgency: "high",
    intervention: "Mandatory environmental bonds covering full remediation cost. Tailings dam safety standards (GISTM). Supply chain due diligence for artisanal cobalt. Recycling infrastructure investment. The clean energy transition requires mining expansion — the question is whether the mining is less destructive than what it replaces.",
    existing: ["Dodd-Frank §1502 (conflict minerals)","EU CSDDD","Extractive Industries Transparency Initiative","Global Industry Standard on Tailings Management (2020)"],
    gap: "40,000 children mine cobalt in the DRC. Tailings dams fail at a rate of roughly 2 per year. Acid mine drainage requires perpetual treatment — centuries of water management after the mine closes. The Bayan Obo rare earth complex in Inner Mongolia has a radioactive tailings lake visible from space. The Global Industry Standard on Tailings Management is voluntary.",
    committee: { us: "Energy & Natural Resources; Foreign Relations; Environment & Public Works", eu: "Industry & Energy; Environment & Public Health; International Trade" } },
  { name: "Insurance & Climate Risk Mispricing", beta: 4.57, welfCost: 411, pi: 90, jurisdiction: ["State Insurance Commissioners","Federal Insurance Office (FIO)","FEMA / National Flood Insurance Program (NFIP)","Financial Stability Oversight Council (FSOC)"], addressable: "medium", urgency: "critical",
    intervention: "Actuarially accurate climate risk pricing. National Flood Insurance Program (NFIP) reform — close the $20.5B debt to Treasury. Managed retreat incentives for repetitive-loss properties. Federal reinsurance backstop with risk-accurate premiums.",
    existing: ["National Flood Insurance Program (NFIP) Risk Rating 2.0","State rate approval processes","Task Force on Climate-related Financial Disclosures (TCFD) / International Sustainability Standards Board (ISSB) climate disclosure","Florida Hurricane Catastrophe Fund"],
    gap: "State Farm and Allstate have left California. Florida's property insurance market is collapsing. The National Flood Insurance Program (NFIP) owes $20.5B to the Treasury because it has never charged actuarially accurate rates. Climate risk is non-stationary — the historical loss distribution that actuarial tables rely on no longer describes the future. The models assume stationarity. The climate is not stationary.",
    committee: { us: "Financial Services; Banking; Appropriations; Budget", eu: "Economic Affairs; Environment & Public Health" } },
  { name: "Stablecoins & Shadow Banking", beta: 2.53, welfCost: 142, pi: 56, jurisdiction: ["SEC","CFTC","Treasury/OFR","Federal Reserve","Financial Stability Board"], addressable: "high", urgency: "high",
    intervention: "Full reserve requirements (1:1 HQLA). Real-time reserve attestation. Bank-equivalent regulation for stablecoin issuers above $10B. Deposit insurance or equivalent consumer protection. Tether's reserve composition is an act of faith, not an act of audit.",
    existing: ["EU Markets in Crypto-Assets Regulation (MiCA) stablecoin provisions","US GENIUS Act (proposed)","NY BitLicense","FSB high-level recommendations on global stablecoins"],
    gap: "Tether has $100B+ in assets under management and has never undergone a full independent audit. It has provided 'attestations' — a snapshot, not an audit. No US federal stablecoin legislation has passed. Stablecoins function as money market fund equivalents without money market regulation. There is no lender of last resort. In a run, there is no one to call.",
    committee: { us: "Financial Services; Banking; Agriculture (CFTC)", eu: "Economic Affairs; Internal Market" } },
  { name: "Shipping & Maritime Emissions", beta: 1.34, welfCost: 1296, pi: 969, jurisdiction: ["International Maritime Organization (IMO)","EPA","EU Emissions Trading System","Flag States"], addressable: "low", urgency: "high",
    intervention: "IMO carbon levy on shipping fuel. Flag state minimum environmental standards. Shore power mandates at ports. Heavy fuel oil ban in Arctic waters. 80% of global trade travels by sea. It is regulated by the flag state of the vessel. The flag states are Panama, Liberia, and the Marshall Islands.",
    existing: ["IMO MARPOL Annex VI (sulfur cap)","IMO GHG Reduction Strategy (2023)","EU Emissions Trading System (ETS) maritime inclusion (2024)","FuelEU Maritime"],
    gap: "Shipping produces 2.89% of global CO₂ — more than aviation. The IMO's 2023 GHG strategy targets net-zero by 2050 but contains no binding intermediate targets. 80% of global tonnage is registered under flags of convenience — Panama, Liberia, Marshall Islands — with minimal environmental enforcement. The race to the bottom is not a bug. It is the regulatory architecture.",
    committee: { us: "Commerce; Transportation & Infrastructure; Foreign Relations", eu: "Transport; Environment & Public Health" } },
  { name: "Deforestation & Industrial Logging", beta: 7.21, welfCost: 866, pi: 120, jurisdiction: ["USDA Forest Service","EPA","EU Deforestation Regulation","UNFCCC REDD+","Convention on Biological Diversity"], addressable: "medium", urgency: "critical",
    intervention: "Import bans on deforestation-linked commodities. REDD+ at-scale financing. Satellite-verified supply chain traceability. Indigenous land tenure recognition. Old-growth forest stores 150–400 tC/ha accumulated over centuries. Replanting recovers 20% in 30 years. The carbon stock cannot be recaptured on human timescales.",
    existing: ["EU Deforestation Regulation (2023)","Glasgow Leaders' Declaration on Forests (2021)","REDD+","Lacey Act (US, timber provisions)"],
    gap: "The EU Deforestation Regulation covers EU imports only — 15% of global tropical commodity trade. No US equivalent exists. The Glasgow Declaration pledged to end deforestation by 2030. Deforestation increased in 2022 and 2023. REDD+ has disbursed a fraction of promised funding. The Amazon is now a net carbon source in its eastern regions. The tipping point may have already been crossed.",
    committee: { us: "Agriculture; Foreign Relations; Natural Resources", eu: "Environment & Public Health; International Trade" } },
  { name: "Private Prisons & Carceral System", beta: 12.08, welfCost: 97, pi: 8, jurisdiction: ["Department of Justice (DOJ)","Bureau of Prisons","ICE","State Departments of Correction"], addressable: "very high", urgency: "medium",
    intervention: "End federal private prison contracts. Eliminate occupancy guarantees. Mandate rehabilitation programming standards. Regulate prison services pricing (phone calls, commissary). Revenue equals prisoners times days. Rehabilitation reduces revenue. The profit motive and the social objective are structurally opposed.",
    existing: ["Biden EO ending DOJ private prison contracts (2021)","State private prison bans (CA, NV, IL)","First Step Act (2018)"],
    gap: "CoreCivic and GEO Group contracts include 80–90% occupancy guarantees — the government pays for empty beds if the prison population declines. Prison phone calls cost up to $1/minute through monopoly providers. The Biden executive order applies to DOJ facilities only — not ICE detention, which is expanding. The companies lobby for harsher sentencing through ALEC model legislation. The contract is the impossibility.",
    committee: { us: "Judiciary; Homeland Security; Appropriations", eu: "Civil Liberties" } },
  { name: "Sovereign Debt & Intergenerational Extraction", beta: 4.67, welfCost: 164, pi: 35, jurisdiction: ["Treasury","Congressional Budget Office (CBO)","Federal Reserve","International Monetary Fund (IMF)","European Commission"], addressable: "low", urgency: "high",
    intervention: "Independent fiscal councils with enforcement authority. Structural balance rules (Chilean model). Intergenerational equity reporting. The unborn cannot vote. The discount rate is set by the living. No democratic mechanism represents future taxpayers.",
    existing: ["EU Stability and Growth Pact","Swiss debt brake","CBO long-term projections","IMF Article IV surveillance"],
    gap: "US debt-to-GDP is 124% and rising. Interest on the debt will exceed defense spending by 2025. The EU Stability and Growth Pact has been violated by every major member state. No fiscal rule has survived a genuine political test in the US. Current voters externalize costs to future voters who cannot vote on the borrowing. This is not a policy failure. It is a structural impossibility of democratic governance over intergenerational resources.",
    committee: { us: "Budget; Finance; Ways & Means; Appropriations", eu: "Economic Affairs; Budget" } },
  { name: "Financial Benchmark Manipulation", beta: 5.13, welfCost: 16, pi: 3.2, jurisdiction: ["SEC","CFTC","Financial Conduct Authority (FCA)","European Securities and Markets Authority (ESMA)","DOJ"], addressable: "high", urgency: "medium",
    intervention: "Transaction-based benchmark mandates. Structural separation of benchmark submitters from benchmark users. Criminal liability for benchmark manipulation executives, not just traders and not just fines.",
    existing: ["International Organization of Securities Commissions (IOSCO) Principles for Financial Benchmarks (2013)","EU Benchmarks Regulation","UK Financial Conduct Authority Benchmark Regulation","Benchmark Rate → Secured Overnight Financing Rate (SOFR) transition"],
    gap: "Benchmark Rate was manipulated for 30 years. $350 trillion in contracts referenced a rate set by the banks that traded on it. The referee was the player. Secured Overnight Financing Rate (SOFR) eliminates the judgment-based submission, but credit-sensitive alternatives (term rate SOFR, BSBY) reintroduce self-referential structure. Goodhart's Law applies: when a measure becomes a target, it ceases to be a good measure. The structural impossibility is not Benchmark Rate-specific. It is benchmark-specific.",
    committee: { us: "Financial Services; Banking; Judiciary", eu: "Economic Affairs; Legal Affairs" } },
];

const PRIORITY = {
  "very high": { color: "#22C55E", label: "Very High" },
  "high": { color: "#3B82F6", label: "High" },
  "medium": { color: "#F59E0B", label: "Medium" },
  "low": { color: "#EF4444", label: "Low" },
};

const URGENCY_MAP = {
  "critical": { color: "#EF4444", label: "CRITICAL" },
  "high": { color: "#F59E0B", label: "HIGH" },
  "medium": { color: "#3B82F6", label: "MEDIUM" },
  "low": { color: MUTED, label: "LOW" },
};

const fmtBeta = (b) => b === null || b === undefined ? "—" : b >= 1000 ? b.toLocaleString() : String(b);

const betaColor = (b) => {
  if (b === null || b === undefined) return "#C8C8C8";
  if (b >= 10) return "#DC2626";
  if (b >= 6) return "#E85D3A";
  if (b >= 4) return "#F59E0B";
  if (b >= 2) return "#D97706";
  return "#059669";
};

const TABS = [
  { id: "triage", label: "Triage" },
  { id: "playbooks", label: "Playbooks" },
  { id: "jurisdiction", label: "Jurisdiction" },
  { id: "legislation", label: "Legislation" },
  { id: "howto", label: "How to Use This" },
];

const CONTROL_DOMAIN_IDS = new Set(["nuclear", "gig-economy"]);

const POLICY_DOMAINS = CANONICAL_DOMAINS
  .filter((domain) => domain.policyLab && !CONTROL_DOMAIN_IDS.has(domain.id))
  .map((domain) => ({
    name: domain.name,
    beta: domain.beta,
    welfCost: domain.welfCost,
    pi: domain.pi,
    jurisdiction: domain.policyLab.jurisdiction || [],
    addressable: domain.policyLab.addressable || "medium",
    urgency: domain.policyLab.urgency || "medium",
    intervention: domain.policyLab.intervention || "Policy pathway pending source package upgrade.",
    existing: domain.policyLab.existing || [],
    gap: domain.policyLab.gap || "Gap analysis pending source package upgrade.",
    committee: domain.policyLab.committee || { us: "Pending", eu: "Pending" },
  }));

// ─── GLOBAL REGULATORS (expandable per-domain) ──────────────
function GlobalRegulators({ domainName }) {
  const [open, setOpen] = useState(false);
  const countries = Object.entries(COUNTRY_REGULATORS)
    .filter(([, data]) => data.domains[domainName])
    .sort((a, b) => a[0].localeCompare(b[0]));

  if (countries.length === 0) return null;

  // Group by region
  const byRegion = {};
  countries.forEach(([name, data]) => {
    const r = data.region;
    if (!byRegion[r]) byRegion[r] = [];
    byRegion[r].push({ name, agencies: data.domains[domainName] });
  });

  const regionOrder = ["Africa", "Americas", "Asia", "Europe", "Middle East", "Oceania"];

  return (
    <div style={{ marginTop: 8 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          fontFamily: M, fontSize: 12, color: GOLD, background: "rgba(245,158,11,0.06)",
          border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 3,
          padding: "4px 10px", cursor: "pointer", letterSpacing: 1,
        }}
      >
        {open ? "▾" : "▸"} {countries.length} COUNTRIES
      </button>
      {open && (
        <div style={{ marginTop: 8, padding: "12px 16px", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 4, maxHeight: 400, overflowY: "auto" }}>
          {regionOrder.filter(r => byRegion[r]).map(region => (
            <div key={region} style={{ marginBottom: 12 }}>
              <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 2, marginBottom: 6 }}>{region.toUpperCase()}</div>
              {byRegion[region].map(c => (
                <div key={c.name} style={{ display: "flex", gap: 8, marginBottom: 4, paddingLeft: 8, borderLeft: `2px solid ${BORDER}` }}>
                  <span style={{ fontFamily: M, fontSize: 13, color: TEXT, width: 180, flexShrink: 0 }}>{c.name}</span>
                  <span style={{ fontFamily: M, fontSize: 12, color: DIM, lineHeight: 1.7 }}>{c.agencies.join(" · ")}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PolicyLab() {
  const [tab, setTab] = useState("triage");
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("beta");

  const sorted = [...POLICY_DOMAINS].sort((a, b) => {
    if (sortBy === "beta") return (b.beta || 0) - (a.beta || 0);
    if (sortBy === "addressable") {
      const order = { "very high": 4, "high": 3, "medium": 2, "low": 1 };
      return (order[b.addressable] || 0) - (order[a.addressable] || 0);
    }
    if (sortBy === "urgency") {
      const order = { "critical": 4, "high": 3, "medium": 2, "low": 1 };
      return (order[b.urgency] || 0) - (order[a.urgency] || 0);
    }
    return 0;
  });

  const filtered = filter === "all" ? sorted : sorted.filter(d => d.urgency === filter);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
      <main style={{ flex: 1, maxWidth: 1000, padding: "0 32px 80px", margin: "0 auto" }}>
        <div style={{ paddingTop: 72, marginBottom: 32 }}>
          <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 3, marginBottom: 8 }}>POLICY LAB</div>
          <h1 style={{ fontFamily: S, fontSize: 32, fontWeight: 300, color: TEXT, margin: 0 }}>
            Fifty-nine market-failure domains. Every one of them is a Hollow Win.
          </h1>
          <div style={{ fontFamily: S, fontSize: 20, color: DIM, marginTop: 12, lineHeight: 1.7, fontStyle: "italic" }}>
            The Private Pareto Theorem proves that bilateral negotiation cannot preserve system welfare. That is not a policy recommendation — it is a mathematical result. The policy recommendation follows from it: if no private mechanism can fix the problem, a public one must.
          </div>
          <div style={{ fontFamily: M, fontSize: 14, color: MUTED, marginTop: 12 }}>
            Erik Postnieks · © 2026 · All β<sub>W</sub> values: 10,000-draw Monte Carlo, seed=42
          </div>
        </div>

        {/* KEY INSIGHT */}
        <div style={{ padding: "20px 24px", background: "rgba(239,68,68,0.04)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4, marginBottom: 32 }}>
          <div style={{ fontFamily: S, fontSize: 20, color: TEXT, lineHeight: 1.8 }}>
            Every market-failure domain in this table has point-estimate β<sub>W</sub> {">"} 1: more than $1 of system welfare destruction per $1 of private gain. The question is not whether public institutions need a system-welfare channel. The question is which domains to prioritize first — and the answer is printed in the numbers.
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

        {/* ═══ TRIAGE ═══ */}
        {tab === "triage" && (
          <div>
            {/* Controls */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 4 }}>
                <span style={{ fontFamily: M, fontSize: 13, color: MUTED, padding: "6px 0" }}>SORT:</span>
                {[["beta","βW"],["addressable","ADDRESSABILITY"],["urgency","URGENCY"]].map(([k,l]) => (
                  <button key={k} onClick={() => setSortBy(k)} style={{
                    fontFamily: M, fontSize: 13, padding: "6px 12px", border: `1px solid ${sortBy === k ? GOLD : BORDER}`,
                    background: sortBy === k ? "rgba(245,158,11,0.1)" : "transparent",
                    color: sortBy === k ? GOLD : MUTED, borderRadius: 3, cursor: "pointer",
                  }}>{l}</button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <span style={{ fontFamily: M, fontSize: 13, color: MUTED, padding: "6px 0" }}>FILTER:</span>
                {[["all","ALL"],["critical","CRITICAL"],["high","HIGH"],["medium","MEDIUM"]].map(([k,l]) => (
                  <button key={k} onClick={() => setFilter(k)} style={{
                    fontFamily: M, fontSize: 13, padding: "6px 12px", border: `1px solid ${filter === k ? GOLD : BORDER}`,
                    background: filter === k ? "rgba(245,158,11,0.1)" : "transparent",
                    color: filter === k ? GOLD : MUTED, borderRadius: 3, cursor: "pointer",
                  }}>{l}</button>
                ))}
              </div>
            </div>

            {/* Summary stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                { label: "CRITICAL URGENCY", count: POLICY_DOMAINS.filter(d => d.urgency === "critical").length, color: RED },
                { label: "HIGH ADDRESSABILITY", count: POLICY_DOMAINS.filter(d => d.addressable === "high" || d.addressable === "very high").length, color: GREEN },
                { label: "βW > 10", count: POLICY_DOMAINS.filter(d => d.beta !== null && d.beta >= 10).length, color: "#DC2626" },
                { label: "TOTAL WELFARE COST", count: `$${Math.round(POLICY_DOMAINS.reduce((s,d) => s + (d.welfCost || 0), 0) / 1000)}T/yr`, color: GOLD },
              ].map(s => (
                <div key={s.label} style={{ padding: "12px 16px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                  <div style={{ fontFamily: M, fontSize: 13, color: MUTED, letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontFamily: M, fontSize: 24, color: s.color, marginTop: 4 }}>{s.count}</div>
                </div>
              ))}
            </div>

            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 110px 110px 140px", padding: "8px 12px", borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>β<sub>W</sub></span>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>DOMAIN</span>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>URGENCY</span>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>ADDRESSABLE</span>
              <span style={{ fontFamily: M, fontSize: 13, color: MUTED }}>WELFARE COST</span>
            </div>

            {filtered.map((d, i) => (
              <div key={d.name}>
                <div
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  style={{
                    display: "grid", gridTemplateColumns: "90px 1fr 110px 110px 140px", padding: "10px 12px",
                    background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                    cursor: "pointer", alignItems: "center",
                    borderLeft: `3px solid ${betaColor(d.beta)}`,
                  }}
                >
                  <span style={{ fontFamily: M, fontSize: 17, color: betaColor(d.beta) }}>
                    {fmtBeta(d.beta)}
                  </span>
                  <span style={{ fontFamily: M, fontSize: 15, color: TEXT }}>{d.name}</span>
                  <span style={{ fontFamily: M, fontSize: 13, color: URGENCY_MAP[d.urgency].color }}>{URGENCY_MAP[d.urgency].label}</span>
                  <span style={{ fontFamily: M, fontSize: 13, color: PRIORITY[d.addressable].color }}>{PRIORITY[d.addressable].label}</span>
                  <span style={{ fontFamily: M, fontSize: 14, color: DIM }}>
                    {d.welfCost ? `$${d.welfCost >= 1000 ? (d.welfCost / 1000).toFixed(1) + "T" : d.welfCost + "B"}` : "—"}
                  </span>
                </div>
                {expanded === i && (
                  <div style={{ padding: "16px 24px", background: SURFACE, borderLeft: `3px solid ${betaColor(d.beta)}`, borderBottom: `1px solid ${BORDER}` }}>
                    <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>MINIMUM SUFFICIENT INTERVENTION</div>
                    <div style={{ fontFamily: S, fontSize: 18, color: TEXT, lineHeight: 1.8, marginBottom: 16 }}>{d.intervention}</div>
                    <div style={{ fontFamily: M, fontSize: 14, color: RED, letterSpacing: 1, marginBottom: 8 }}>THE GAP</div>
                    <div style={{ fontFamily: S, fontSize: 18, color: "rgba(239,68,68,0.8)", lineHeight: 1.8, marginBottom: 16 }}>{d.gap}</div>
                    <div style={{ display: "flex", gap: 24 }}>
                      <div>
                        <div style={{ fontFamily: M, fontSize: 13, color: MUTED, letterSpacing: 1, marginBottom: 6 }}>JURISDICTION</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {d.jurisdiction.map(j => (
                            <span key={j} style={{ fontFamily: M, fontSize: 13, color: GOLD, padding: "5px 10px", background: "rgba(245,158,11,0.08)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 3 }}>{j}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: M, fontSize: 13, color: MUTED, letterSpacing: 1, marginBottom: 6 }}>COMMITTEES</div>
                        <div style={{ fontFamily: M, fontSize: 14, color: DIM }}>US: {d.committee.us}</div>
                        <div style={{ fontFamily: M, fontSize: 14, color: DIM }}>EU: {d.committee.eu}</div>
                        <GlobalRegulators domainName={d.name} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══ PLAYBOOKS ═══ */}
        {tab === "playbooks" && (
          <div>
            <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.8, marginBottom: 24 }}>
              Each playbook contains: the minimum sufficient intervention — the smallest regulatory action that breaks the Hollow Win dynamic, existing legislation that partially addresses the domain, and the specific gap that current law leaves open. The intervention is not the maximum. It is the minimum.
            </div>

            {[...POLICY_DOMAINS]
              .sort((a, b) => {
                const uO = { critical: 4, high: 3, medium: 2, low: 1 };
                const aO = { "very high": 4, high: 3, medium: 2, low: 1 };
                return (uO[b.urgency] * aO[b.addressable]) - (uO[a.urgency] * aO[a.addressable]);
              })
              .map((d) => (
                <div key={d.name} style={{ marginBottom: 16, padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, borderLeft: `3px solid ${betaColor(d.beta)}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div>
                      <span style={{ fontFamily: M, fontSize: 19, color: TEXT, fontWeight: 600 }}>{d.name}</span>
                      <span style={{ fontFamily: M, fontSize: 15, color: betaColor(d.beta), marginLeft: 12 }}>β<sub>W</sub> = {fmtBeta(d.beta)}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontFamily: M, fontSize: 13, color: URGENCY_MAP[d.urgency].color, padding: "5px 10px", background: `${URGENCY_MAP[d.urgency].color}15`, border: `1px solid ${URGENCY_MAP[d.urgency].color}30`, borderRadius: 3 }}>{URGENCY_MAP[d.urgency].label}</span>
                      <span style={{ fontFamily: M, fontSize: 13, color: PRIORITY[d.addressable].color, padding: "5px 10px", background: `${PRIORITY[d.addressable].color}15`, border: `1px solid ${PRIORITY[d.addressable].color}30`, borderRadius: 3 }}>{PRIORITY[d.addressable].label}</span>
                    </div>
                  </div>

                  <div style={{ fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>INTERVENTION</div>
                  <div style={{ fontFamily: S, fontSize: 18, color: TEXT, lineHeight: 1.8, marginBottom: 16 }}>{d.intervention}</div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: M, fontSize: 13, color: GREEN, letterSpacing: 1, marginBottom: 6 }}>EXISTS</div>
                      {d.existing.map(e => (
                        <div key={e} style={{ fontFamily: M, fontSize: 14, color: DIM, lineHeight: 1.8, paddingLeft: 12, borderLeft: `2px solid ${BORDER}`, marginBottom: 4 }}>{e}</div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontFamily: M, fontSize: 13, color: RED, letterSpacing: 1, marginBottom: 6 }}>GAP</div>
                      <div style={{ fontFamily: S, fontSize: 17, color: "rgba(239,68,68,0.7)", lineHeight: 1.8 }}>{d.gap}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 12, fontFamily: M, fontSize: 13, color: MUTED }}>
                    US: {d.committee.us} · EU: {d.committee.eu}
                  </div>
                  <GlobalRegulators domainName={d.name} />
                </div>
              ))}
          </div>
        )}

        {/* ═══ JURISDICTION ═══ */}
        {tab === "jurisdiction" && (
          <div>
            <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.8, marginBottom: 24 }}>
              Most high-β<sub>W</sub> domains require multi-agency coordination. The jurisdiction mapping below shows which agencies own what — and where the seams between them create the gaps that Hollow Wins exploit.
            </div>

            <div style={{ fontFamily: M, fontSize: 17, color: GOLD, letterSpacing: 2, marginBottom: 12, marginTop: 24 }}>US FEDERAL AGENCIES</div>
            {[
              { agency: "EPA", full: "Environmental Protection Agency", domains: POLICY_DOMAINS.filter(d => d.jurisdiction.includes("EPA")) },
              { agency: "FTC", full: "Federal Trade Commission", domains: POLICY_DOMAINS.filter(d => d.jurisdiction.includes("FTC")) },
              { agency: "SEC", full: "Securities and Exchange Commission", domains: POLICY_DOMAINS.filter(d => d.jurisdiction.includes("SEC")) },
              { agency: "FDA", full: "Food and Drug Administration", domains: POLICY_DOMAINS.filter(d => d.jurisdiction.some(j => j.startsWith("FDA"))) },
              { agency: "DOJ", full: "Department of Justice", domains: POLICY_DOMAINS.filter(d => d.jurisdiction.includes("DOJ")) },
              { agency: "USDA", full: "Department of Agriculture", domains: POLICY_DOMAINS.filter(d => d.jurisdiction.some(j => j.startsWith("USDA"))) },
              { agency: "DOD", full: "Department of Defense", domains: POLICY_DOMAINS.filter(d => d.jurisdiction.includes("DOD")) },
            ].filter(a => a.domains.length > 0).map(a => (
              <div key={a.agency} style={{ marginBottom: 12, padding: "12px 16px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontFamily: M, fontSize: 17, color: GOLD, fontWeight: 600 }}>{a.agency}</span>
                    <span style={{ fontFamily: M, fontSize: 14, color: MUTED, marginLeft: 8 }}>{a.full}</span>
                  </div>
                  <span style={{ fontFamily: M, fontSize: 14, color: DIM }}>{a.domains.length} domains</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                  {a.domains.map(d => (
                    <span key={d.name} style={{ fontFamily: M, fontSize: 13, color: betaColor(d.beta), padding: "2px 8px", background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 3 }}>
                      {d.name} ({fmtBeta(d.beta)})
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ fontFamily: M, fontSize: 17, color: GOLD, letterSpacing: 2, marginBottom: 12, marginTop: 32 }}>CONGRESSIONAL COMMITTEES — DOMAIN EXPOSURE</div>
            {(() => {
              const committees = {};
                POLICY_DOMAINS.forEach(d => {
                d.committee.us.split(";").map(c => c.trim()).forEach(c => {
                  if (!committees[c]) committees[c] = [];
                  committees[c].push(d);
                });
              });
              return Object.entries(committees)
                .sort((a, b) => b[1].length - a[1].length)
                .map(([name, domains]) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 16px", borderBottom: `1px solid ${BORDER}` }}>
                    <span style={{ fontFamily: M, fontSize: 15, color: TEXT, width: 280 }}>{name}</span>
                    <div style={{ flex: 1, height: 16, background: "rgba(255,255,255,0.03)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: `${(domains.length / POLICY_DOMAINS.length) * 100}%`, height: "100%", background: `rgba(245,158,11,${0.15 + domains.length * 0.03})`, borderRadius: 2 }} />
                    </div>
                    <span style={{ fontFamily: M, fontSize: 14, color: GOLD, width: 30, textAlign: "right" }}>{domains.length}</span>
                  </div>
                ));
            })()}

            <div style={{ fontFamily: M, fontSize: 17, color: GOLD, letterSpacing: 2, marginBottom: 12, marginTop: 32 }}>GLOBAL REGULATORY BODIES — 195 COUNTRIES</div>
            <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.8, marginBottom: 16 }}>
              Every domain below maps the responsible regulatory body in each country where the domain applies. Click any domain to see who owns it — everywhere.
            </div>
            {POLICY_DOMAINS.map(d => (
              <div key={d.name} style={{ marginBottom: 4, padding: "6px 0", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: M, fontSize: 14, color: TEXT, width: 280, flexShrink: 0 }}>{d.name}</span>
                <span style={{ fontFamily: M, fontSize: 13, color: betaColor(d.beta) }}>β<sub>W</sub>={fmtBeta(d.beta)}</span>
                <GlobalRegulators domainName={d.name} />
              </div>
            ))}
          </div>
        )}

        {/* ═══ LEGISLATION ═══ */}
        {tab === "legislation" && (
          <div>
            <div style={{ padding: "20px 24px", background: "rgba(239,68,68,0.04)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4, marginBottom: 24 }}>
              <div style={{ fontFamily: S, fontSize: 20, color: TEXT, lineHeight: 1.8 }}>
                Every domain has existing legislation that partially addresses it. None has legislation sufficient to break the Hollow Win. The gap is not "no regulation." The gap is that existing regulation monitors what A got and what B got — without monitoring what happened to the system. This is exactly what the Private Pareto Theorem predicts: bilateral analysis cannot detect system degradation. Not approximately. Structurally.
              </div>
            </div>

            {POLICY_DOMAINS.map(d => (
              <div key={d.name} style={{ marginBottom: 2, padding: "12px 16px", background: SURFACE, borderLeft: `3px solid ${betaColor(d.beta)}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontFamily: M, fontSize: 15, color: TEXT }}>{d.name}</span>
                  <span style={{ fontFamily: M, fontSize: 14, color: betaColor(d.beta) }}>β<sub>W</sub> = {fmtBeta(d.beta)}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: M, fontSize: 12, color: GREEN, letterSpacing: 1, marginBottom: 4 }}>EXISTS</div>
                    {d.existing.map(e => (
                      <div key={e} style={{ fontFamily: M, fontSize: 13, color: DIM, lineHeight: 1.8 }}>• {e}</div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontFamily: M, fontSize: 12, color: RED, letterSpacing: 1, marginBottom: 4 }}>GAP</div>
                    <div style={{ fontFamily: M, fontSize: 13, color: "rgba(239,68,68,0.7)", lineHeight: 1.8 }}>{d.gap}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ HOW TO USE THIS ═══ */}
        {tab === "howto" && (
          <div>
            <div style={{ fontFamily: S, fontSize: 20, color: TEXT, lineHeight: 1.8, marginBottom: 24 }}>
              This tool prints the number. β<sub>W</sub> tells you how many dollars of system welfare are destroyed per dollar of revenue. The triage table sorts by that number. The playbooks tell you what to do about it. Here is who you are and what you need.
            </div>

            {[
              { who: "COMMITTEE STAFF / LEGISLATIVE COUNSEL",
                steps: [
                  "Use the Triage tab. Find the domains under your committee's jurisdiction.",
                  "Sort by Urgency — five domains are classified CRITICAL. They are not waiting for you.",
                  "Sort by Addressability — Pharmacy Benefit Management, Algorithmic Pricing, Ultra-Processed Food, and Gambling are VERY HIGH or HIGH addressability. Maximum impact per unit of political capital.",
                  "The Playbooks tab has intervention language and the existing legislation your bill would amend.",
                  "βW is the number you use in committee testimony. 'This sector destroys $6.58 of system welfare per dollar of revenue.' That is not rhetoric. It is a Monte Carlo estimate with 10,000 draws.",
                ]},
              { who: "FEDERAL AGENCY STAFF (EPA, FTC, SEC, FDA)",
                steps: [
                  "Jurisdiction tab — find your domains.",
                  "The 'Gap' field tells you where your existing authority has holes.",
                  "The intervention is the minimum sufficient action. Not the maximum. The minimum.",
                  "Cross-reference with other agencies. Oil & Gas involves EPA, DOI, FERC, and UNFCCC. Forever Chemicals involves EPA, FDA, DOD, European Chemicals Agency (ECHA), and the Stockholm Convention. No high-β domain is single-agency.",
                ]},
              { who: "STATE LEGISLATORS / ATTORNEYS GENERAL",
                steps: [
                  "Gambling, Pharmacy Benefit Management, Water Privatization, Student Loans, Gig Economy, Algorithmic Pricing — all have significant state jurisdiction.",
                  "State AG offices have Section 5-equivalent consumer protection authority and Parens Patriae standing.",
                  "California AB5, state Pharmacy Benefit Management transparency laws, state gaming regulations — these are replicable models.",
                  "Federal inaction on online gambling, Ultra-Processed Food, and algorithmic pricing creates state-level opportunity. The EU has moved. The US Congress has not. Your state can.",
                ]},
              { who: "EUROPEAN PARLIAMENT / COMMISSION",
                steps: [
                  "The EU leads on Big Tech (Digital Markets Act), Palm Oil (EU Deforestation Regulation), Forever Chemicals (European Chemicals Agency restriction), Crypto (Markets in Crypto-Assets Regulation), Gig Economy (Platform Work Directive), and Climate (Emissions Trading System (ETS) / Carbon Border Adjustment Mechanism (CBAM)).",
                  "Use βW to prioritize which existing regulations need strengthening. Digital Markets Act covers gatekeepers — but validator concentration in Proof-of-Stake and algorithmic pricing coordination are not yet addressed.",
                  "Carbon Border Adjustment Mechanism (CBAM) applies to cement, steel, and aluminum. Extend it to coal-intensive imports and high-β agricultural commodities.",
                ]},
              { who: "INTERNATIONAL BODIES (UN, WHO, FAO, IAEA)",
                steps: [
                  "Orbital Debris, Weapons of Mass Destruction Diffusion, Gene Drives, and Fisheries (climate forcing) — these cannot be addressed at the national level. The commons is global. The governance must be.",
                  "The Montreal Protocol is the model. Universal participation, binding targets, trade sanctions for non-compliance, dedicated funding mechanism. It worked for ozone. The architecture is transferable.",
                  "The welfare beta is the argument for treaty prioritization. Higher beta means the commons is being destroyed faster per dollar of revenue. Firearms is 50.99. Weapons of Mass Destruction is 21.92. Opioids are 14.96. The numbers do the work.",
                ]},
            ].map(section => (
              <div key={section.who} style={{ marginBottom: 20, padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
                <div style={{ fontFamily: M, fontSize: 15, color: GOLD, fontWeight: 600, marginBottom: 12 }}>{section.who}</div>
                {section.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontFamily: M, fontSize: 14, color: GOLD, flexShrink: 0, width: 20, textAlign: "right" }}>{i + 1}.</span>
                    <span style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.7 }}>{step}</span>
                  </div>
                ))}
              </div>
            ))}

            <div style={{ padding: "20px 24px", background: "rgba(245,158,11,0.06)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 4, marginTop: 24 }}>
              <div style={{ fontFamily: S, fontSize: 18, color: GOLD, lineHeight: 1.8, fontWeight: 600, textAlign: "center" }}>
                The model does not judge these industries. It weighs them. The price tag is printed. The market can no longer refuse to read it.
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "32px 0", borderTop: `1px solid ${BORDER}`, marginTop: 48, textAlign: "center" }}>
          <div style={{ fontFamily: M, fontSize: 12, color: MUTED }}>
            © 2026 Erik Postnieks · System Asset Pricing Model Program · 10,000-draw Monte Carlo, seed=42
          </div>
        </div>
      </main>
    </div>
  );
}
