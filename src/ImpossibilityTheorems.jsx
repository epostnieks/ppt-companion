"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useScrollStagger, useScrollTriggerEntrance } from "./lib/motion";

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const BG = "#0D0D0D";
const SURFACE = "#1A1A1A";
const TEXT = "#F5F0E8";
const GOLD = "#F59E0B";
const MUTED = "#C8C8C8";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "#C8C8C8";

// ═══════════════════════════════════════════════════════════════════
// THE EXISTING CANON — 17 Impossibility Theorems (1785–2013)
// All operate within social choice theory and mechanism design.
// ═══════════════════════════════════════════════════════════════════
const CANON = [
  { num: 1, year: 1785, name: "Condorcet Paradox", authors: "Condorcet",
    impossible: "A consistent social ranking from majority rule — cycles are unavoidable" },
  { num: 2, year: 1951, name: "Arrow\u2019s General Impossibility Theorem", authors: "Arrow",
    impossible: "A social welfare function satisfying unrestricted domain, Pareto, independence of irrelevant alternatives (IIA), and non-dictatorship" },
  { num: 3, year: 1970, name: "Impossibility of a Paretian Liberal", authors: "Sen",
    impossible: "Simultaneous satisfaction of Pareto efficiency and minimal individual liberty" },
  { num: 4, year: 1973, name: "Gibbard\u2019s Theorem", authors: "Gibbard",
    impossible: "A non-dictatorial voting procedure with \u22653 outcomes that is strategy-proof" },
  { num: 5, year: "1973/1975", name: "Gibbard\u2013Satterthwaite Theorem", authors: "Gibbard, Satterthwaite",
    impossible: "A strategy-proof ordinal voting rule that is non-dictatorial" },
  { num: 6, year: 1976, name: "Blair\u2013Bordes\u2013Kelly\u2013Suzumura Theorem", authors: "Blair, Bordes, Kelly, Suzumura",
    impossible: "Escaping impossibility by dropping collective rationality" },
  { num: 7, year: "1976/1978", name: "Kelly\u2019s Alienable Libertarianism", authors: "Kelly",
    impossible: "Weakening Gibbard\u2019s waiver set enough to avoid impossibility" },
  { num: 8, year: 1977, name: "Green\u2013Laffont Theorem", authors: "Green, Laffont",
    impossible: "An informationally efficient mechanism that is budget-balanced and Pareto optimal" },
  { num: 9, year: 1977, name: "Muller\u2013Satterthwaite Theorem", authors: "Muller, Satterthwaite",
    impossible: "Separating strong positive association from strategy-proofness" },
  { num: 10, year: 1977, name: "Kalai\u2013Muller Domain Restriction", authors: "Kalai, Muller",
    impossible: "Non-dictatorial strategy-proofness outside a precisely characterized domain class" },
  { num: 11, year: 1978, name: "Gibbard\u2019s Probabilistic Theorem", authors: "Gibbard",
    impossible: "Extending manipulation immunity to non-deterministic mechanisms" },
  { num: 12, year: 1980, name: "Hylland\u2019s Theorem", authors: "Hylland",
    impossible: "Avoiding dictatorship in probabilistic voting even with cardinal utilities" },
  { num: 13, year: 1982, name: "Grether\u2013Plott Nonbinary Choice", authors: "Grether, Plott",
    impossible: "Escaping Arrow\u2019s impossibility via set-valued social choice correspondences" },
  { num: 14, year: 1983, name: "Myerson\u2013Satterthwaite Theorem", authors: "Myerson, Satterthwaite",
    impossible: "Bilateral trade that is simultaneously efficient, voluntary, and self-financing" },
  { num: 15, year: 2000, name: "Duggan\u2013Schwartz Theorem", authors: "Duggan, Schwartz",
    impossible: "Strategy-proofness in multi-valued social choice — manipulation persists" },
  { num: 16, year: "1997/2002", name: "Campbell\u2013Kelly Theorem", authors: "Campbell, Kelly",
    impossible: "Eliminating spoiler effects entirely from any ranked voting rule" },
  { num: 17, year: 2013, name: "Man\u2013Takayama Unifying Theorem", authors: "Man, Takayama",
    impossible: "A single meta-impossibility subsuming Arrow, Muller\u2013Satterthwaite, and strategic candidacy" },
];

// ═══════════════════════════════════════════════════════════════════
// MARKET-FAILURE DOMAIN THEOREMS + CONTROLS
// Current public doctrine: 59 market-failure domains plus two controls.
// The Private Pareto Theorem is rendered separately via PPTCard as the foundational result.
// ═══════════════════════════════════════════════════════════════════
const POSTNIEKS_THEOREMS = [
  {
    id: "I", name: "The Protocol Welfare Floor",
    domain: "Bitcoin", constraint: "Institutional",
    impossible: "Internalizing system welfare costs through Bitcoin\u2019s protocol architecture without abandoning the properties that define it",
    axioms: [
      { id: "A1", name: "Permissionless Access", text: "Bitcoin\u2019s core value proposition requires that any participant can join the network, mine blocks, and transact without authorization from any central entity. This precludes welfare-optimizing entry restrictions." },
      { id: "A2", name: "Transaction Irreversibility", text: "Proof-of-work consensus produces probabilistically final transactions. Once confirmed, transactions cannot be reversed without majority hashpower reorganization \u2014 making welfare-correcting rollbacks structurally impossible." },
      { id: "A3", name: "User Sovereignty (Self-Custody)", text: "Users maintain exclusive control of private keys and can transact without intermediary approval. This precludes the welfare-monitoring intermediary layer that traditional financial regulation relies upon." },
    ],
  },
  {
    id: "II", name: "The Cross-Chain Welfare Floor",
    domain: "Altcoins / Proof-of-Stake", constraint: "Institutional",
    impossible: "Achieving protocol-level welfare internalization in any permissionless blockchain architecture, regardless of consensus mechanism",
    axioms: [
      { id: "P1", name: "Permissionless Access", text: "Any agent can participate in the network without qualification screening. This guarantees unqualified custodians can operate, creating a structural floor on custodial losses." },
      { id: "P2", name: "Transaction Irreversibility", text: "Once confirmed, transactions cannot be reversed. Key loss, erroneous transfers, and theft are permanent. No protocol-level recourse exists." },
      { id: "P3", name: "User Sovereignty", text: "Users bear full responsibility for key management and transaction validation. Self-custody risk is structural, not behavioral \u2014 it follows from the architecture, not from user error." },
    ],
  },
  {
    id: "III", name: "The Molecular Persistence Floor",
    domain: "Per- and Polyfluoroalkyl Substances (PFAS), Microplastics & Persistent Compounds", constraint: "Thermodynamic",
    impossible: "Using Forever Chemicals or persistent polymers at scale without irreversible environmental accumulation",
    axioms: [
      { id: "A1", name: "Functional Necessity", text: "The persistent molecular property (carbon-fluorine bond stability, polymer durability) is required for the product\u2019s primary function. No non-persistent substitute achieves cost/performance parity across all application sectors." },
      { id: "A2", name: "Open-Release Architecture", text: "The product is used where environmental release is structurally inevitable during or after the lifecycle. Textiles shed microfibers; food packaging leaches; aqueous film-forming foam (AFFF), the firefighting foam used at airports and military bases, is sprayed directly into groundwater." },
      { id: "A3", name: "Environmental Non-Degradability", text: "The material does not degrade in any natural process on human-relevant timescales. The carbon-fluorine bond dissociation energy is 485\u2009kJ/mol (kilojoules per mole) \u2014 one of the strongest single bonds in organic chemistry. No known biological pathway can break fully fluorinated carbon chains. The Second Law of Thermodynamics guarantees that collection cost of dispersed Forever Chemicals is irreducible." },
    ],
  },
  {
    id: "IV", name: "The Efficacy Ceiling",
    domain: "Antibiotics / Antimicrobial Resistance (Antimicrobial Resistance)", constraint: "Biological / Evolutionary",
    impossible: "Deploying antibiotics therapeutically without generating the selection pressure that produces resistance",
    axioms: [
      { id: "A1", name: "Therapeutic Necessity", text: "Antibiotics are required for the treatment of bacterial infections. No alternative therapeutic class eliminates bacterial pathogens at equivalent efficacy and scale. Withdrawal is not a welfare-preserving option." },
      { id: "A2", name: "Efficacy-Selection Identity", text: "The mechanism by which an antibiotic kills susceptible bacteria is the same molecular event that selects for resistant mutations. Therapeutic lethality and evolutionary selection pressure are constitutively identical \u2014 cure and depletion are the same molecular event." },
      { id: "A3", name: "Evolutionary Timescale Asymmetry", text: "Bacterial generation time (~20 minutes) exceeds drug development timelines (~10\u201315 years) by five orders of magnitude. The target population evolves resistance faster than any pharmaceutical pipeline can produce novel compounds." },
    ],
  },
  {
    id: "V", name: "The Persistence Floor",
    domain: "Nuclear Fission", constraint: "Physical (Radioactive Decay)",
    impossible: "Generating nuclear fission energy without producing radioactive waste that persists beyond any institutional control period",
    axioms: [
      { id: "F1", name: "Fission Product Necessity", text: "Every fission reaction produces radioactive fission products and actinides (the heavier radioactive elements created during the reaction). Energy release and radioactive fragment generation are the same nuclear event." },
      { id: "F2", name: "Radioactive Persistence", text: "Half-lives are fixed by nuclear physics. Technetium-99 (Tc-99): 211,100 years. Iodine-129 (I-129): 15.7 million years. Neptunium-237 (Np-237): 2.14 million years. Plutonium-239 (Pu-239): 24,100 years. No process can alter them." },
      { id: "F3", name: "Thermodynamic Irreversibility", text: "Fission products cannot be un-fissioned. Transmutation (converting one element into another through nuclear bombardment) reduces but cannot eliminate the radioactive inventory. Residual technetium-99 and iodine-129 persist in all modeled deep geological repository scenarios." },
    ],
  },
  {
    id: "VI", name: "The Genetic Uniformity Floor",
    domain: "Monoculture Agriculture", constraint: "Biological / Evolutionary",
    impossible: "Maintaining industrial-scale monoculture without systemic vulnerability to pathogen adaptation",
    axioms: [
      { id: "A1", name: "Uniformity Requirement", text: "Industrial crop production requires genetic uniformity for mechanical harvesting, standardized inputs, and supply chain logistics \u2014 diverse polyculture is incompatible with existing agricultural infrastructure at scale." },
      { id: "A2", name: "Temporal Mismatch Identity", text: "The 730:1 ratio between pathogen generation time (~6 days) and crop breeding cycle (~12 years) means evolutionary pressure accumulates faster than the system can respond through any private mechanism." },
      { id: "A3", name: "Ecosystem Service Externalization", text: "The welfare cost of pollinator decline, soil degradation, and biodiversity loss cannot be priced into crop genetics decisions because the beneficiaries of ecosystem services are structurally outside the seed-purchase transaction." },
    ],
  },
  {
    id: "VII", name: "The Abyssal Recovery Floor",
    domain: "Deep-Sea Mining", constraint: "Geochemical / Physical",
    impossible: "Extracting polymetallic nodules from the abyssal plain without permanent habitat destruction",
    axioms: [
      { id: "A1", name: "Resource Necessity", text: "Critical minerals in polymetallic nodules — nickel (Ni), cobalt (Co), copper (Cu), manganese (Mn) — serve as inputs to the global energy transition, creating demand pressure that no single actor can eliminate \u2014 though alternative battery chemistries are dissolving this axiom from the demand side." },
      { id: "A2", name: "Extraction-Disruption Identity", text: "The polymetallic nodule (a mineral-rich rock formation on the deep ocean floor) constitutes the primary hard substrate for benthic (seafloor-dwelling) organisms in the Clarion-Clipperton Zone (CCZ), an abyssal plain in the central Pacific Ocean; extracting the nodule and destroying the benthic habitat are the same physical act and cannot be separated by any extraction technology." },
      { id: "A3", name: "Abyssal Timescale Asymmetry", text: "Nodule regeneration rates of 1\u201320\u2009mm per million years and seafloor ecosystem recovery times exceeding 1,000 years exceed any market discount rate, planning horizon, or institutional control period by at least three orders of magnitude." },
    ],
  },
  {
    id: "VIII", name: "The Calcination Floor",
    domain: "Cement Production", constraint: "Thermodynamic (Conservation of Mass)",
    impossible: "Producing Portland cement clinker from limestone without releasing CO\u2082",
    axioms: [
      { id: "A1", name: "Calcination Necessity", text: "Portland cement clinker requires calcium carbonate (CaCO\u2083), the chemical compound in limestone, as its primary feedstock; no demonstrated alternative feedstock produces equivalent binding properties at commercial scale." },
      { id: "A2", name: "Stoichiometric Irreducibility", text: "Calcium carbonate \u2192 calcium oxide + carbon dioxide (CaCO\u2083 \u2192 CaO + CO\u2082) is a conservation-of-mass identity: 100\u2009kg of limestone yields 56\u2009kg of lime and 44\u2009kg of CO\u2082. No process chemistry can eliminate this CO\u2082 while preserving the calcium oxide product." },
      { id: "A3", name: "Institutional Lock-in", text: "The $330B global cement industry\u2019s infrastructure, supply chains, and capital stock are configured for limestone-based production; sovereign regulatory action cancelled the primary alternative funding stream (U.S. Department of Energy Brimstone grant, May 2025)." },
    ],
  },
  {
    id: "IX", name: "The Capability Diffusion Ceiling",
    domain: "Weapons of Mass Destruction and Lethal Autonomous Weapons Systems (LAWS) Proliferation", constraint: "Informational",
    impossible: "Transferring Weapons of Mass Destruction or lethal autonomous weapons capability without permanently enabling independent recipient capability",
    axioms: [
      { id: "A1", name: "Security Necessity", text: "States and well-resourced non-state actors will continue to seek Weapons of Mass Destruction and lethal autonomous weapons capability under interstate security competition; no single actor can eliminate this demand through unilateral action." },
      { id: "A2", name: "Knowledge Transfer Identity", text: "Transferring weapons manufacturing knowledge or lethal autonomous weapons targeting capability and permanently enabling the recipient\u2019s independent capability are the same transactional event; knowledge cannot be re-classified into secrecy after diffusion \u2014 the A.Q. Khan uranium-enrichment centrifuge designs transferred to North Korea cannot be deleted." },
      { id: "A3", name: "Proliferation Ratchet", text: "Each capability demonstration creates new demand nodes: 1 nuclear state in 1945 became 9 in 2026 without reversal except South Africa (which required complete regime change). The Kargu-2 drone\u2019s autonomous combat deployment in Libya permanently demonstrated lethal autonomous targeting viability to all defense establishments worldwide." },
    ],
  },
  {
    id: "X", name: "The Alignment Ceiling",
    domain: "Frontier AI", constraint: "Computational / Institutional",
    impossible: "Scaling frontier AI capability while guaranteeing that demonstrated capabilities cannot be independently replicated or misaligned",
    axioms: [
      { id: "A1", name: "Capability Development Necessity", text: "Competitive pressure \u2014 commercial, military, and scientific \u2014 drives continuous frontier AI capability advancement. No single actor can freeze capability development through unilateral action under current geopolitical and market conditions." },
      { id: "A2", name: "Demonstration-Diffusion Identity", text: "Publication, deployment, or demonstration of an AI capability and the enablement of its independent replication are the same informational event. Once a capability is demonstrated to exist, the search space for reproducing it collapses. Demonstrated capability cannot be unlearned." },
      { id: "A3", name: "Alignment Irreducibility", text: "No known training procedure, reinforcement learning from human feedback (RLHF) method, or constitutional AI (rule-based alignment) approach provides a proof-level guarantee that an AI system\u2019s objectives remain aligned with human welfare at arbitrary capability levels. The alignment problem remains unsolved at the frontier, and capability scaling proceeds independently of alignment progress." },
    ],
  },
  {
    id: "XI", name: "The Orbital Congestion Ceiling",
    domain: "Orbital Debris and Low Earth Orbit (LEO) Congestion", constraint: "Physical / Jurisdictional",
    impossible: "Scaling orbital launch cadence without eventually triggering a self-sustaining collision cascade",
    axioms: [
      { id: "A1", name: "Launch Necessity", text: "Access to orbital space is required for telecommunications, navigation, Earth observation, weather prediction, and national security \u2014 demand that no single actor can eliminate under current technological and geopolitical conditions." },
      { id: "A2", name: "Debris Generation Identity", text: "Every object placed in orbit increases the probability of collision with all existing objects; launch and orbital congestion are the same orbital-mechanics event, and no demonstrated technology removes debris at the rate current launch cadences generate it." },
      { id: "A3", name: "Kessler Cascade Irreversibility", text: "Above a critical orbital density threshold, collisional cascading (the Kessler syndrome: each collision creates debris that causes more collisions) becomes self-sustaining \u2014 each collision generates fragments that cause additional collisions, thermodynamically irreversible without removal rates exceeding any demonstrated technology." },
    ],
  },
  {
    id: "XII", name: "The Ecological Ratchet Floor",
    domain: "Gene Drive Deployment", constraint: "Biological / Evolutionary",
    impossible: "Deploying a gene drive for population-level effect while guaranteeing bounded ecological outcomes",
    axioms: [
      { id: "A1", name: "Functional Deployment Necessity", text: "Gene drives are deployed in wild populations to achieve beneficial outcomes (malaria vector suppression, invasive species control) requiring spread through the target population beyond founder containment." },
      { id: "A2", name: "Ecological Integration Identity", text: "Releasing a gene drive organism and restructuring the target ecosystem\u2019s evolutionary trajectory are constitutively the same genetic event; once the drive allele propagates beyond a founder population, it cannot be recalled." },
      { id: "A3", name: "Evolutionary Unpredictability", text: "The target population\u2019s evolutionary response \u2014 resistance evolution, fitness compensation, horizontal gene transfer (genes jumping between unrelated species), off-target ecological effects \u2014 cannot be predicted with sufficient precision to guarantee bounded welfare outcomes at ecosystem scale." },
    ],
  },
  {
    id: "XIII", name: "The Pedogenesis Floor",
    domain: "Topsoil Erosion", constraint: "Geochemical",
    impossible: "Sustaining intensive tillage agriculture without net topsoil loss on human-relevant timescales",
    axioms: [
      { id: "A1", name: "Cultivation Necessity", text: "Mechanical tillage and monoculture row cropping are required for the private payoff (crop yield at industrial scale) under current agricultural economics and existing supply chain infrastructure." },
      { id: "A2", name: "Erosion-Cultivation Identity", text: "Intensive tillage and topsoil loss are constitutively related \u2014 plowing exposes soil to wind and water erosion at rates 10\u2013100\u00d7 exceeding pedogenesis, and no tillage system in commercial use at scale maintains topsoil depth while achieving equivalent yield." },
      { id: "A3", name: "Pedogenesis Asymmetry", text: "Soil formation rate of ~1 inch per 500\u20131,000 years and erosion rate of ~1 inch per 25\u201350 years under conventional tillage create a 10\u201320:1 depletion ratio that guarantees net soil loss \u2014 a geological-timescale asymmetry that no crop rotation can offset while maintaining current yield economics. Pedogenesis (soil formation) simply cannot keep pace." },
    ],
  },
  {
    id: "XIV", name: "The Gatekeeper Ratchet",
    domain: "Platform Monopoly", constraint: "Institutional",
    impossible: "Restoring competitive market dynamics once network effects, data asymmetry, and regulatory capture co-occur at platform scale",
    axioms: [
      { id: "I1", name: "Network Effects Lock-in", text: "Platform value grows superlinearly with user base, creating winner-take-most dynamics that prevent competitive entry even when incumbents degrade quality or raise prices." },
      { id: "I2", name: "Data Asymmetry Moat", text: "Incumbents\u2019 training data advantage for AI and behavioral targeting is self-reinforcing: more users generate more data, improving services, attracting more users. The feedback loop cannot be broken by a new entrant starting from zero." },
      { id: "I3", name: "Regulatory Capture through Complexity", text: "Platform governance requires technical expertise that regulators lack; the revolving door between Big Tech and regulatory agencies ensures that substantive enforcement is systematically understaffed." },
    ],
  },
  {
    id: "XV", name: "The External Forcing Impossibility",
    domain: "Fisheries / Coral Reefs", constraint: "Climate / Jurisdictional",
    impossible: "Preserving coral reef fisheries welfare through fisheries management when the primary driver of destruction operates outside the management\u2019s institutional jurisdiction",
    axioms: [
      { id: "I1", name: "Open-Access Commons Depletion", text: "Without enforceable property rights over fish stocks, each vessel\u2019s rational response is to maximize current catch before competitors do, driving effort to the bioeconomic equilibrium \u2014 the point where the cost of fishing equals the revenue, eliminating all profit." },
      { id: "I2", name: "Subsidy-Overcapacity Feedback", text: "$22.2B/year in capacity-enhancing subsidies sustain 2.5\u00d7 more fleet than is sustainably necessary, creating a self-reinforcing loop: subsidies \u2192 overcapacity \u2192 depletion \u2192 subsidy dependency." },
      { id: "I3", name: "External Forcing Impossibility", text: "Coral reef fisheries welfare destruction is now constitutively driven by ocean warming operating outside fisheries management\u2019s institutional reach \u2014 no individual transferable quota (ITQ), marine protected area, or catch limit can reduce sea surface temperature below the coral bleaching threshold." },
    ],
  },
  {
    id: "XVI", name: "The Hydrological Recharge Floor",
    domain: "Groundwater / Ogallala Aquifer", constraint: "Geochemical",
    impossible: "Extracting groundwater at agricultural-production rates without irreversible aquifer depletion when recharge operates on geological timescales",
    axioms: [
      { id: "A1", name: "Extraction Necessity", text: "The High Plains agricultural economy depends on Ogallala groundwater for irrigation. No alternative water source exists at equivalent volume and cost. The $20B/year agricultural output is structurally dependent on the aquifer." },
      { id: "A2", name: "Recharge-Extraction Asymmetry Identity", text: "The aquifer recharges at 0.5 inches/year through the Brule clay formation. Extraction rates exceed 12 inches/year. The ratio is 24:1. This is not a management failure — it is the hydraulic conductivity of the geological formation. No pumping schedule reconciles the rates." },
      { id: "A3", name: "Geological Irreversibility", text: "The Ogallala accumulated over 10 million years of Pleistocene glacial melt. Once depleted, the geological conditions that filled it no longer exist. Aquifer compaction from over-pumping permanently reduces storage capacity. The resource is not renewable on any human timescale." },
    ],
  },
  {
    id: "XVII", name: "The Acquisition Kill-Zone",
    domain: "Big Tech Platform Monopoly", constraint: "Institutional",
    impossible: "Restoring competitive entry in platform markets when incumbents can acquire nascent competitors before they reach competitive scale",
    axioms: [
      { id: "A1", name: "Platform Dominance Necessity", text: "Network effects and data feedback loops create winner-take-most dynamics. Once a platform achieves dominance, users cannot coordinate departure — each user\u2019s value depends on other users staying." },
      { id: "A2", name: "Kill-Zone Identity", text: "The acquisition of a nascent competitor and the elimination of the competitive threat are the same corporate event. Instagram (2012, $1B), WhatsApp (2014, $19B), and 800+ acquisitions across five firms — each purchase was simultaneously a product acquisition and a market-foreclosure action." },
      { id: "A3", name: "Regulatory Latency Asymmetry", text: "Antitrust review timelines (12–36 months) exceed the window in which a startup poses a competitive threat. By the time regulators evaluate the acquisition, the alternative competitive trajectory no longer exists. The review process is structurally slower than the market it regulates." },
    ],
  },
  {
    id: "XVIII", name: "The Enteric Fermentation Floor",
    domain: "Industrial Agriculture Methane", constraint: "Biological",
    impossible: "Producing ruminant protein at industrial scale without methane emissions that exceed atmospheric absorption capacity",
    axioms: [
      { id: "A1", name: "Ruminant Production Necessity", text: "Global demand for beef and dairy — 1.5 billion cattle — is embedded in dietary patterns, agricultural infrastructure, and cultural practices that no single actor or policy instrument can eliminate under current conditions." },
      { id: "A2", name: "Fermentation-Emission Identity", text: "Enteric fermentation — the anaerobic microbial process in the rumen that converts cellulose to volatile fatty acids — produces methane as a stoichiometric byproduct. Digestion and emission are the same biochemical event. Feed additives (3-NOP) reduce but cannot eliminate the methane, because the methanogenic archaea are required for cellulose digestion." },
      { id: "A3", name: "Scale-Atmosphere Asymmetry", text: "1.5 billion ruminants produce ~3.1 GtCO\u2082e/year of methane. Atmospheric methane concentration has risen 160% since pre-industrial levels. The biological floor per animal, multiplied by the herd size required for current demand, exceeds the atmosphere\u2019s oxidative capacity." },
    ],
  },
  {
    id: "XIX", name: "The Return Requirement Ceiling",
    domain: "Private Equity in Healthcare", constraint: "Institutional / Financial",
    impossible: "Achieving private equity return targets in healthcare delivery without degrading patient welfare below the standard of care",
    axioms: [
      { id: "A1", name: "Capital Deployment Necessity", text: "PE firms have raised $2T+ in committed capital requiring deployment. Healthcare — 18% of US GDP — is the largest remaining sector with fragmented ownership available for rollup strategies." },
      { id: "A2", name: "Return-Quality Tradeoff Identity", text: "PE fund IRR targets of 20%+ over 3–7 year hold periods require cost reduction at rates that exceed efficiency gains. In healthcare, the remaining cost reduction after operational improvement is staffing — and staffing ratios are the primary determinant of patient outcomes. The return and the care quality draw from the same finite budget." },
      { id: "A3", name: "Information Asymmetry Lock-in", text: "Patients cannot observe staffing ratios, supply quality, or care protocol changes at the point of service. The information asymmetry between operator and patient is structural — the patient discovers the degradation only when the adverse outcome occurs." },
    ],
  },
  {
    id: "XX", name: "The Supply Chain Irreversibility",
    domain: "Opioid Ecosystem", constraint: "Biological / Institutional",
    impossible: "Reversing opioid dependency at population scale when the neurobiological substrate of addiction operates independently of the supply chain that created it",
    axioms: [
      { id: "A1", name: "Therapeutic Origin Necessity", text: "Opioid analgesics are medically necessary for acute and severe pain management. No alternative analgesic class achieves equivalent efficacy for the conditions that originally justified prescription. The supply chain began with a legitimate medical need." },
      { id: "A2", name: "Addiction-Prescription Identity", text: "The molecular mechanism of pain relief (\u03bc-opioid receptor agonism) and the molecular mechanism of physical dependence are the same neurochemical event. Therapeutic use at clinically effective doses produces tolerance and withdrawal in a dose-dependent, deterministic fashion." },
      { id: "A3", name: "Synthetic Supply Ratchet", text: "Once population-level dependency was established through prescription, illicit synthetic supply (fentanyl, nitazenes) filled demand that prescription restrictions created. The supply chain transitioned from regulated pharmaceutical to unregulated synthetic — a transition that cannot be reversed by prescription policy because the demand substrate is neurobiological, not institutional." },
    ],
  },
  {
    id: "XXI", name: "The Engagement Optimization Ceiling",
    domain: "Social Media & Youth Mental Health", constraint: "Computational / Biological",
    impossible: "Maximizing engagement-based advertising revenue without exploiting the neurological vulnerabilities of developing brains",
    axioms: [
      { id: "A1", name: "Advertising Model Necessity", text: "Social media platforms derive 97%+ of revenue from attention-based advertising. Engagement duration is the primary input to revenue. No demonstrated alternative business model sustains equivalent platform scale." },
      { id: "A2", name: "Engagement-Exploitation Identity", text: "The algorithmic features that maximize engagement — variable-ratio reinforcement, social comparison loops, infinite scroll, notification interrupts — exploit the same dopaminergic reward circuits that are structurally vulnerable during adolescent prefrontal cortex development. Maximizing engagement and exploiting developmental neurobiology are the same optimization target." },
      { id: "A3", name: "Age-Gating Impossibility", text: "No demonstrated age-verification technology reliably excludes minors without identity infrastructure that conflicts with privacy law, and platform incentives are structurally misaligned with exclusion of their most engaged demographic." },
    ],
  },
  {
    id: "XXII", name: "The Cost-Plus Ratchet",
    domain: "Defense Procurement", constraint: "Institutional",
    impossible: "Achieving cost-efficient defense procurement under cost-plus contracting when the contractor\u2019s profit margin is a function of total cost",
    axioms: [
      { id: "A1", name: "Procurement Necessity", text: "National defense requires weapons systems, platforms, and technology that only a small number of prime contractors can produce. The defense-industrial base has consolidated to five major primes — competitive bidding is structurally constrained by the supplier market." },
      { id: "A2", name: "Cost-Profit Identity", text: "Under cost-plus-fixed-fee and cost-plus-incentive-fee contracts, contractor profit is calculated as a percentage of allowable costs. Higher costs produce higher profits. The incentive to reduce cost and the incentive to maximize profit point in opposite directions — they are structurally contradictory." },
      { id: "A3", name: "Specification Ratchet", text: "Requirements creep — driven by service branch competition, congressional district employment, and threat inflation — adds scope after contract award. Each requirement change increases cost, which increases profit, which reduces the contractor\u2019s incentive to resist further changes. The F-35: $233B original estimate, $1.7T lifetime cost." },
    ],
  },
  {
    id: "XXIII", name: "The Natural Monopoly Extraction Floor",
    domain: "Water Privatization", constraint: "Institutional",
    impossible: "Privatizing water delivery without extraction above competitive levels when the infrastructure is a natural monopoly and the product is non-substitutable",
    axioms: [
      { id: "A1", name: "Infrastructure Monopoly", text: "Water delivery requires a single pipe network — duplicate infrastructure is economically irrational. The natural monopoly is physical, not regulatory. No market mechanism can create competition in a single-pipe system." },
      { id: "A2", name: "Non-Substitutability Identity", text: "Water has no substitute for human survival. Price elasticity of demand approaches zero at subsistence volumes. The monopolist faces a consumer who cannot exit the market — the standard disciplinary mechanism of competitive markets does not apply." },
      { id: "A3", name: "Regulatory Capture Asymmetry", text: "Private water utilities charge 59% more than public counterparts. Rate-setting commissions are structurally outmatched by utility legal and lobbying resources. The regulator is supposed to simulate competition — but the utility writes the cost models the regulator uses." },
    ],
  },
  {
    id: "XXIV", name: "The Textile Throughput Floor",
    domain: "Fast Fashion", constraint: "Thermodynamic / Institutional",
    impossible: "Sustaining fast fashion profit margins without generating textile waste volumes that exceed recycling and disposal capacity",
    axioms: [
      { id: "A1", name: "Throughput Model Necessity", text: "Fast fashion profitability requires high-volume, low-margin garment production with planned obsolescence cycles of 2–6 weeks. The business model is the throughput — slower cycles at higher quality produce lower returns on capital." },
      { id: "A2", name: "Production-Waste Identity", text: "92 million tons of textile waste annually. Polyester — 60% of all fibers — does not biodegrade. Microfiber shedding during washing releases 500,000 tons of plastic microfibers into the ocean per year. The garment and its environmental persistence are the same material." },
      { id: "A3", name: "Labor Externalization Lock-in", text: "Garment workers in Bangladesh, Vietnam, and Cambodia earn $95–$190/month. The price point that sustains the fast fashion model requires labor costs below subsistence wages in producer countries. The $5 t-shirt is subsidized by the garment worker\u2019s poverty." },
    ],
  },
  {
    id: "XXV", name: "The Extraction Irreversibility Floor",
    domain: "Mining & Rare Earth Extraction", constraint: "Geochemical",
    impossible: "Extracting mineral resources without irreversible environmental degradation when the extraction process exposes reactive geochemistry to surface conditions",
    axioms: [
      { id: "A1", name: "Mineral Necessity", text: "The global energy transition requires lithium, cobalt, nickel, copper, and rare earth elements in quantities that no recycling stream can supply at the rate of demand growth. Extraction is structurally necessary for decarbonization." },
      { id: "A2", name: "Extraction-Exposure Identity", text: "Mining exposes sulfide minerals to oxygen and water, initiating acid mine drainage — a self-sustaining geochemical reaction that produces sulfuric acid and heavy metal leachate for centuries after mine closure. The extraction and the pollution are the same chemical event." },
      { id: "A3", name: "Geological Timescale Irreversibility", text: "Tailings dam failures (Brumadinho, Samarco, Mount Polley) release millions of tons of toxic sediment. Acid mine drainage from Roman-era mines in Spain continues today — 2,000 years and counting. Remediation technologies manage but cannot reverse the geochemical reactions." },
    ],
  },
  {
    id: "XXVI", name: "The Fat-Tail Mispricing Ceiling",
    domain: "Insurance & Climate Risk Mispricing", constraint: "Statistical / Physical",
    impossible: "Pricing climate risk accurately using actuarial models calibrated to historical loss distributions when the underlying physical system has shifted to a non-stationary regime",
    axioms: [
      { id: "A1", name: "Insurance Necessity", text: "Property insurance is required for mortgage lending, which is required for real estate markets, which represent $380T in global asset value. The insurance market is load-bearing infrastructure for the financial system." },
      { id: "A2", name: "Non-Stationarity Identity", text: "Actuarial pricing requires stationary loss distributions — the assumption that past frequency and severity predict future losses. Climate change has made the loss distribution non-stationary. The models are calibrated to a climate that no longer exists. Pricing and mispricing are the same actuarial operation." },
      { id: "A3", name: "Withdrawal-Socialization Ratchet", text: "When insurers withdraw from high-risk markets (California, Florida, Louisiana), the exposure does not disappear — it transfers to state insurers of last resort, FEMA, and ultimately taxpayers. Private insurance retreat socializes climate risk while privatizing the premium income from remaining profitable markets." },
    ],
  },
  {
    id: "XXVII", name: "The Metabolic Engineering Floor",
    domain: "Ultra-Processed Food", constraint: "Biological",
    impossible: "Engineering food products for maximum palatability and shelf stability without overriding the satiety signaling systems that regulate human energy balance",
    axioms: [
      { id: "A1", name: "Formulation Necessity", text: "Ultra-Processed Food manufacturers compete on palatability, convenience, and shelf life. Shareholder value requires formulations that maximize repeat purchase — which is consumption frequency multiplied by portion size." },
      { id: "A2", name: "Palatability-Dysregulation Identity", text: "The combination of sugar, fat, salt, and texture engineering that maximizes palatability (the \u2018bliss point\u2019) is the same formulation that overrides hypothalamic satiety signaling, bypasses leptin and ghrelin feedback, and produces hyperphagia. Making food maximally appealing and disrupting metabolic regulation are the same food-science operation." },
      { id: "A3", name: "Metabolic Ratchet", text: "Chronic Ultra-Processed Food consumption produces insulin resistance, altered gut microbiome composition, and neuroadaptive changes to reward circuitry that increase future Ultra-Processed Food consumption. The product creates its own demand. Chile\u2019s warning label program reduced consumption 25% in two years — proving the mechanism is reversible at the population level with aggressive intervention." },
    ],
  },
  {
    id: "XXVIII", name: "The Securitization Extraction Floor",
    domain: "Student Loan Securitization", constraint: "Institutional",
    impossible: "Structuring student loan securitization for investor return without creating incentives that degrade educational quality at the point of origination",
    axioms: [
      { id: "A1", name: "Capital Market Necessity", text: "Student loan origination requires capital market funding. The $1.7T outstanding balance exceeds any single institution\u2019s balance sheet capacity. Securitization is the structural funding mechanism." },
      { id: "A2", name: "Origination-Quality Tradeoff Identity", text: "Securitization separates the origination decision from the credit risk. The originator profits from volume — more loans, more fees. Quality screening reduces volume. For-profit institutions: 10% of enrollment, 50% of defaults. The ratio is the diagnostic." },
      { id: "A3", name: "Non-Dischargeability Lock-in", text: "Student loans are non-dischargeable in bankruptcy (11 U.S.C. \u00a7 523(a)(8)). This guarantee makes the securitized product risk-free to investors regardless of educational quality — eliminating the market discipline that would otherwise penalize predatory origination." },
    ],
  },
  {
    id: "XXIX", name: "The Classification Arbitrage Floor",
    domain: "Gig Economy Platforms", constraint: "Institutional",
    impossible: "Maintaining platform control over worker dispatch, pricing, and deactivation while classifying workers as independent contractors",
    axioms: [
      { id: "A1", name: "Platform Control Necessity", text: "Algorithmic dispatch, dynamic pricing, and quality control through rating-based deactivation are the platform\u2019s core value proposition — removing any of them would eliminate the service quality that creates platform value." },
      { id: "A2", name: "Control-Classification Contradiction", text: "The economic reality test (IRS, EU Platform Work Directive) defines employment by behavioral control, financial control, and type of relationship. The platform exercises all three while classifying workers as independent. The classification and the control are mutually exclusive under existing legal frameworks." },
      { id: "A3", name: "Regulatory Arbitrage Persistence", text: "Platforms operate across 190+ jurisdictions with varying classification standards. Regulatory harmonization requires international coordination that does not exist. California AB5, EU Platform Work Directive, UK Supreme Court (Uber v Aslam) — each jurisdiction resolves the classification independently, creating permanent arbitrage opportunities." },
    ],
  },
  {
    id: "XXX", name: "The Extend-and-Pretend Ratchet",
    domain: "Commercial Real Estate", constraint: "Institutional",
    impossible: "Resolving commercial real estate distress without recognizing losses that exceed bank capital adequacy thresholds",
    axioms: [
      { id: "A1", name: "Valuation Embedding", text: "$20T in US Commercial Real Estate is embedded in bank balance sheets, pension portfolios, commercial mortgage-backed securities tranches, and insurance company general accounts. The valuation is not an opinion — it is a regulatory input to capital adequacy ratios." },
      { id: "A2", name: "Recognition-Solvency Identity", text: "Marking $1.5T in distressed Commercial Real Estate loans to market would trigger capital adequacy violations at regional banks, commercial mortgage-backed securities downgrades, and pension fund impairments. Recognizing the loss and triggering the solvency crisis are the same accounting event. Every quarter of extend-and-pretend increases the gap between book value and market reality." },
      { id: "A3", name: "Structural Vacancy Permanence", text: "Remote work has permanently reduced office demand. San Francisco office vacancy: 37%. The buildings are not coming back to 2019 utilization. The loans assume they are. The extend-and-pretend continues because the alternative — recognition — is worse for every party except the system." },
    ],
  },
  {
    id: "XXXI", name: "The Reserve Opacity Floor",
    domain: "Stablecoins & Shadow Banking", constraint: "Institutional / Financial",
    impossible: "Operating a stablecoin at scale with full reserve transparency while maintaining the yield advantage that justifies the business model",
    axioms: [
      { id: "A1", name: "Peg Maintenance Necessity", text: "Stablecoin utility requires a credible 1:1 peg to the reference currency. Users treat stablecoins as dollar equivalents for trading, remittance, and decentralized finance collateral. The peg is the product." },
      { id: "A2", name: "Yield-Transparency Contradiction", text: "Stablecoin issuers generate profit by investing reserves in higher-yielding assets (commercial paper, Treasuries, repo). Full, real-time reserve disclosure would reveal the maturity mismatch, credit risk, and concentration — information that, if processed by a rational market, would price the stablecoin below par during stress." },
      { id: "A3", name: "Run Dynamics Asymmetry", text: "Stablecoin redemption operates at blockchain speed — minutes, not days. Traditional bank runs are slowed by withdrawal limits and deposit insurance. No stablecoin has deposit insurance, withdrawal gates, or a lender of last resort. The run completes before any intervention can begin." },
    ],
  },
  {
    id: "XXXII", name: "The Combustion Lock-in Floor",
    domain: "Oil & Gas Extraction", constraint: "Chemical",
    impossible: "Combusting hydrocarbons for energy without releasing CO\u2082, when combustion is the oxidation of carbon",
    axioms: [
      { id: "A1", name: "Energy Demand Necessity", text: "Hydrocarbons supply 80% of global primary energy. Existing infrastructure — vehicles, power plants, industrial heating, petrochemical feedstock — represents $30T+ in sunk capital with 20–50 year asset lives. Demand cannot be eliminated within any policy-relevant timeframe." },
      { id: "A2", name: "Combustion-Emission Identity", text: "Hydrocarbon combustion is the oxidation of carbon: C\u2093H\u2098 + O\u2082 \u2192 CO\u2082 + H\u2082O. The energy release and the CO\u2082 production are the same chemical reaction. No combustion technology separates them — carbon capture intercepts the CO\u2082 after emission, it does not prevent emission." },
      { id: "A3", name: "Stranded Asset Lock-in", text: "Fossil fuel companies hold $40T+ in proven reserves on their balance sheets. Writing down these reserves to reflect carbon budget constraints would reduce valuations by 60–80%. The reserves are simultaneously a geological fact, an accounting asset, and a systemic risk — and the incentive to extract them exceeds the incentive to leave them in the ground." },
    ],
  },
  {
    id: "XXXIII", name: "The Carbon Combustion Floor",
    domain: "Coal Combustion", constraint: "Chemical",
    impossible: "Burning coal for electricity without CO\u2082 emissions that exceed natural carbon cycle absorption capacity",
    axioms: [
      { id: "A1", name: "Baseload Dependency", text: "Coal provides 36% of global electricity generation. Developing economies — India, Indonesia, Vietnam, Bangladesh — have 300+ GW of coal capacity under 15 years old. Premature retirement requires capital that does not exist in the countries that need it." },
      { id: "A2", name: "Carbon-Energy Identity", text: "Coal is 60–90% carbon by weight. Combustion: C + O\u2082 \u2192 CO\u2082. The energy content IS the carbon content — they are the same atomic property. Per unit of energy, coal emits 2\u00d7 natural gas. No fuel switching within coal achieves the required reduction." },
      { id: "A3", name: "Phase-Out Asymmetry", text: "Coal plant lifetimes: 40–60 years. Paris-aligned phase-out requires closure by 2040 in OECD, 2050 globally. The asset owners — state-owned enterprises in China, India, Indonesia — face a $3T stranded asset write-down. The Just Energy Transition Partnerships (JETPs) have pledged $50B. The gap is 60:1." },
    ],
  },
  {
    id: "XXXIV", name: "The Flag State Arbitrage Floor",
    domain: "Shipping & Maritime Emissions", constraint: "Jurisdictional / Physical",
    impossible: "Regulating maritime emissions when the regulatory jurisdiction and the emitting vessel are structurally separated by flag state registration",
    axioms: [
      { id: "A1", name: "Shipping Necessity", text: "Maritime shipping moves 90% of global trade by volume. No alternative transport mode can substitute for transoceanic bulk cargo. The global supply chain is structurally dependent on shipping." },
      { id: "A2", name: "Flag State Separation Identity", text: "73% of global tonnage is registered in Panama, Liberia, and the Marshall Islands — jurisdictions that derive revenue from registration fees, not environmental enforcement. The flag state has regulatory authority. The flag state has no enforcement incentive. Jurisdiction and incentive are structurally separated." },
      { id: "A3", name: "Heavy Fuel Oil Lock-in", text: "Ships burn heavy fuel oil (HFO) — the residual sludge from petroleum refining, the dirtiest fossil fuel in commercial use. 300 million tons/year. Alternative fuels (LNG, ammonia, methanol) require engine replacement and bunkering infrastructure that does not exist at scale. The IMO 2050 targets are non-binding." },
    ],
  },
  {
    id: "XXXV", name: "The Energy Density Lock-in",
    domain: "Aviation Emissions", constraint: "Physical",
    impossible: "Achieving zero-emission commercial aviation when no energy storage technology approaches the gravimetric energy density of jet fuel",
    axioms: [
      { id: "A1", name: "Aviation Necessity", text: "Commercial aviation connects the global economy. 4.5 billion passengers/year, $8.9T in goods transported. No alternative mode substitutes for long-haul air travel within acceptable time constraints." },
      { id: "A2", name: "Energy Density Identity", text: "Jet fuel: 43 MJ/kg. Best lithium-ion batteries: 0.9 MJ/kg. The 48:1 ratio means battery-electric aircraft cannot achieve range beyond ~500 km with current passengers. Sustainable aviation fuel (SAF) is chemically identical to jet fuel — it burns identically and produces identical CO\u2082. The physics of energy density sets the floor." },
      { id: "A3", name: "Growth-Offset Asymmetry", text: "Carbon Offsetting and Reduction Scheme for International Aviation (CORSIA) (Carbon Offsetting and Reduction Scheme for International Aviation) offsets growth from a 2019 baseline — not absolute emissions. Global air traffic is projected to double by 2040. SAF is less than 1% of jet fuel supply and costs 3\u20135\u00d7 conventional. The offset mechanism permits emissions growth while calling it reduction." },
    ],
  },
  {
    id: "XXXVI", name: "The Addictive Commodity Floor",
    domain: "Tobacco", constraint: "Biological",
    impossible: "Selling an addictive combustible product without health outcomes determined by the pharmacology of nicotine addiction and the toxicology of smoke inhalation",
    axioms: [
      { id: "A1", name: "Addiction Maintenance", text: "Nicotine is one of the most addictive substances known — comparable to heroin in dependence liability. 1.3 billion current smokers worldwide. Cessation success rate: 3\u20135% unassisted. The customer base is maintained by neurochemistry, not marketing." },
      { id: "A2", name: "Combustion-Toxicity Identity", text: "Tobacco smoke contains 7,000+ chemicals, 70+ known carcinogens. The delivery mechanism for nicotine (combustion and inhalation) is the same physical process that delivers the carcinogens. Harm reduction (e-cigarettes, heated tobacco) reduces but does not eliminate the toxicological exposure." },
      { id: "A3", name: "Geographic Arbitrage Ratchet", text: "As regulation tightens in OECD countries, tobacco companies shift marketing to developing countries with weaker regulation. 80% of the world\u2019s 1.3 billion smokers live in low- and middle-income countries. The industry\u2019s geographic migration outpaces the WHO Framework Convention on Tobacco Control (FCTC) implementation." },
    ],
  },
  {
    id: "XXXVII", name: "The Carbon Stock Irreversibility",
    domain: "Deforestation & Industrial Logging", constraint: "Biological / Chemical",
    impossible: "Clearing primary forest without releasing centuries of accumulated carbon stock that cannot be re-sequestered within any policy-relevant timeframe",
    axioms: [
      { id: "A1", name: "Land Conversion Necessity", text: "Agricultural expansion (cattle, soy, palm oil) drives 80% of tropical deforestation. Global food demand is projected to increase 50% by 2050. The economic incentive for conversion exceeds the standing forest\u2019s value in every tropical jurisdiction." },
      { id: "A2", name: "Stock-Flow Asymmetry Identity", text: "A mature tropical forest stores 150\u2013300 tonnes of carbon per hectare, accumulated over 200\u2013500 years. Clearing releases this stock in days. Replanting — even if it occurs — requires 80\u2013120 years to approach equivalent carbon density. The release is instantaneous; the recovery is measured in centuries." },
      { id: "A3", name: "Biodiversity Irreversibility", text: "Primary forests contain species assemblages that secondary forests cannot replicate. Tropical forests hold 50% of terrestrial species on 6% of land surface. Species extinction from habitat destruction is permanent. The carbon can theoretically regrow; the species cannot." },
    ],
  },
  {
    id: "XXXVIII", name: "The Deforestation Ratchet",
    domain: "Palm Oil", constraint: "Ecological",
    impossible: "Producing palm oil at current global demand without net tropical deforestation when oil palm yields require the equatorial conditions that forests currently occupy",
    axioms: [
      { id: "A1", name: "Demand Necessity", text: "Palm oil is in 50% of supermarket products. Global production: 77 million tons/year. No substitute oil achieves equivalent yield per hectare (3.8 tonnes/ha vs. 0.7 for soy). Demand substitution would require 4\u20135\u00d7 more land under alternative oilseeds." },
      { id: "A2", name: "Habitat-Plantation Identity", text: "Oil palms require 2,500mm annual rainfall, 25\u201328\u00b0C average temperature, and deep alluvial soils — conditions found exclusively in tropical lowland forests. The plantation and the cleared forest occupy the same ecological niche. Establishment and deforestation are the same land-use event." },
      { id: "A3", name: "Peatland Carbon Ratchet", text: "40% of Indonesian palm oil expansion occurs on peatland. Draining peat for plantation exposes millennia of accumulated organic carbon to aerobic decomposition. Peat fires release 10\u201320\u00d7 more CO\u2082 per hectare than forest clearing alone. The drainage is irreversible — rewetting does not restore the peat structure." },
    ],
  },
  {
    id: "XXXIX", name: "The Algorithmic Exploitation Floor",
    domain: "Gambling", constraint: "Institutional",
    impossible: "Offering real-time algorithmic gambling products without exploiting the cognitive biases that behavioral science has catalogued and the algorithms have been trained to target",
    axioms: [
      { id: "A1", name: "Gambling Demand Necessity", text: "Legal gambling in 38+ US states. $450B+ wagered annually in the US alone. State budgets depend on gambling tax revenue. The political economy prevents prohibition — the regulator is also the beneficiary." },
      { id: "A2", name: "Optimization-Exploitation Identity", text: "Machine-learning algorithms optimize for \u2018player lifetime value\u2019 — the total amount a gambler will lose. The features that maximize lifetime value (variable-ratio reinforcement, near-miss engineering, loss-chasing prompts, micro-betting) are the same features that exploit well-documented cognitive biases. The optimization target and the exploitation mechanism are identical." },
      { id: "A3", name: "Regulatory Asymmetry", text: "Operators deploy PhD-level data science teams running real-time behavioral models. Regulators review static compliance reports quarterly. The information asymmetry between the algorithmic operator and the human regulator is orders of magnitude — the regulator is using spreadsheets against machine learning." },
    ],
  },
  {
    id: "XL", name: "The Recidivism Incentive Floor",
    domain: "Private Prisons & Carceral System", constraint: "Institutional",
    impossible: "Operating for-profit incarceration without creating structural incentives against rehabilitation when revenue is a function of occupied beds",
    axioms: [
      { id: "A1", name: "Incarceration Necessity", text: "2.0 million incarcerated in the US — the highest rate per capita in the world. Private prisons hold 8% of state and 16% of federal prisoners. Capacity demand is driven by sentencing policy, not by the private operators — but the operators lobby for the sentencing policy." },
      { id: "A2", name: "Revenue-Recidivism Identity", text: "Per-diem contracts pay operators for each occupied bed-day. Minimum occupancy guarantees (often 80\u201390%) ensure revenue regardless of crime rates. Rehabilitation reduces future bed-days. The operator\u2019s revenue function and the public\u2019s rehabilitation objective point in opposite directions — they are structurally contradictory." },
      { id: "A3", name: "Lobbying Feedback Loop", text: "Private prison operators spent $25M+ on lobbying and campaign contributions (2000\u20132020). CoreCivic and GEO Group lobby for mandatory minimums, three-strikes laws, and immigration detention expansion. The operator creates the demand for its own product through the political process." },
    ],
  },
  {
    id: "XLI", name: "The Intergenerational Extraction Floor",
    domain: "Sovereign Debt & Intergenerational Extraction", constraint: "Institutional / Temporal",
    impossible: "Structuring sovereign debt for investor return without creating intergenerational extraction when the borrowing generation and the repaying generation are different political entities",
    axioms: [
      { id: "A1", name: "Sovereign Borrowing Necessity", text: "Developing nations require capital market access for infrastructure, healthcare, and economic development. No alternative funding source provides equivalent capital at the scale required. The borrowing is necessary — the terms are the problem." },
      { id: "A2", name: "Temporal Extraction Identity", text: "Debt contracted by one generation\u2019s government is serviced by the next generation\u2019s taxpayers. The borrower and the payer are not the same political entity. Democratic consent for the obligation was given by people who will not bear the cost. Sovereignty in borrowing and intergenerational extraction are the same fiscal event." },
      { id: "A3", name: "Vulture Fund Ratchet", text: "Holdout creditors (vulture funds) purchase distressed sovereign debt at cents on the dollar, then litigate for full face value — blocking restructuring that would benefit the debtor population. Argentina, Zambia, Sri Lanka — the pattern repeats. The legal framework (pari passu, collective action clause limitations) structurally favors holdouts over orderly resolution." },
    ],
  },
  {
    id: "XLII", name: "The Self-Referential Manipulation Floor",
    domain: "Financial Benchmark Manipulation", constraint: "Institutional / Informational",
    impossible: "Operating a self-reported financial benchmark without manipulation when the reporting entities are also the primary traders on the benchmark",
    axioms: [
      { id: "A1", name: "Benchmark Necessity", text: "Financial markets require reference rates for pricing $350T+ in derivatives, loans, and securities. The benchmark is infrastructure — without it, contracts have no reference point." },
      { id: "A2", name: "Self-Reference Identity", text: "Benchmark Rate was set by the banks that traded on it. The reporter and the beneficiary of the report were the same entity. Self-reported benchmarks where the reporter profits from the reported value create an unfalsifiable incentive to manipulate. The reporting mechanism and the manipulation opportunity are the same institutional structure." },
      { id: "A3", name: "Replacement Insufficiency", text: "Benchmark Rate was replaced by Secured Overnight Financing Rate (SOFR) (transaction-based, not self-reported). But self-reported benchmarks persist in other markets — commodity indices, credit default swap pricing, carbon credit registries. The structural vulnerability was addressed in one benchmark while remaining unaddressed in dozens of others." },
    ],
  },
  {
    id: "XLIII", name: "The Tacit Collusion Floor",
    domain: "Algorithmic Pricing", constraint: "Institutional",
    impossible: "Deploying competing pricing algorithms trained on shared market data without convergence to supracompetitive equilibria that replicate cartel outcomes",
    axioms: [
      { id: "A1", name: "Algorithmic Pricing Necessity", text: "Real-time pricing optimization is competitively necessary — firms that do not use algorithmic pricing lose market share to firms that do. The technology is not optional in markets where competitors have adopted it." },
      { id: "A2", name: "Convergence-Collusion Identity", text: "Independent reinforcement-learning algorithms trained on the same market data converge to supracompetitive prices — prices higher than any competitive equilibrium and equivalent to explicit cartel pricing — without communication, agreement, or intent. The Sherman Act \u00a71 requires \u2018agreement.\u2019 The algorithms do not agree. They converge. The legal framework was built for human conspirators." },
      { id: "A3", name: "Detection Impossibility", text: "Algorithmic tacit collusion produces no communications, no meetings, no smoking gun. The evidence is the price level itself — but supracompetitive prices are not illegal without proof of agreement. The enforcement mechanism requires evidence that the collusion mechanism does not produce." },
    ],
  },
  {
    id: "XLIV", name: "The Persistent Accumulation Floor",
    domain: "Persistent Organic Pollutants", constraint: "Chemical",
    impossible: "Manufacturing persistent organic pollutants for commercial use without irreversible environmental bioaccumulation when molecular persistence is the commercially valued property",
    axioms: [
      { id: "A1", name: "Persistence as Feature", text: "Persistent organic pollutants (Persistent Organic Pollutants) are commercially valuable precisely because they resist degradation — flame retardants, pesticides, industrial chemicals designed to last. The property that makes them useful and the property that makes them dangerous are the same molecular characteristic." },
      { id: "A2", name: "Release-Accumulation Identity", text: "Open-system manufacturing and use guarantees environmental release. Once released, the molecular persistence that defines the product class guarantees bioaccumulation. PCBs banned in 1979 are still detected in Arctic wildlife at increasing concentrations. Release and permanent accumulation are the same chemical trajectory." },
      { id: "A3", name: "Listing Latency", text: "The Stockholm Convention listing process takes 7\u201310 years per compound. Chemical innovation produces new persistent compounds faster than the regulatory system can evaluate them. There are an estimated 350,000 chemicals in commerce — fewer than 1% have been assessed for persistence and bioaccumulation." },
    ],
  },
  {
    id: "XLV", name: "The Geopolitical Externality Floor",
    domain: "Arms Exports", constraint: "Institutional",
    impossible: "Exporting weapons systems without creating geopolitical externalities that exceed the transaction value when end-use monitoring is structurally under-resourced",
    axioms: [
      { id: "A1", name: "Export Necessity", text: "Defense industrial base viability requires export volume to sustain production rates. Domestic procurement alone cannot fund the R&D pipeline. The five largest arms exporters (US, Russia, France, China, Germany) account for 76% of global transfers." },
      { id: "A2", name: "Transfer-Empowerment Identity", text: "Selling a weapons system and empowering the buyer\u2019s military capability are the same transaction. The weapon cannot be sold in a way that does not enhance the buyer\u2019s capacity for violence. Arms export and capability diffusion are constitutively identical." },
      { id: "A3", name: "End-Use Monitoring Failure", text: "The US State Department has 3 full-time staff monitoring end-use of arms exports to 170+ countries. Saudi Arabia received $100B+ in US arms and used them in Yemen — creating the world\u2019s worst humanitarian crisis. The monitoring infrastructure is not proportional to the export volume by orders of magnitude." },
    ],
  },
  {
    id: "XLVI", name: "The Vertical Integration Extraction Floor",
    domain: "Pharmacy Benefit Managers", constraint: "Institutional",
    impossible: "Operating a vertically integrated Pharmacy Benefit Management — simultaneously the insurer, the pharmacy, and the formulary manager — without extracting rents from the opacity created by occupying all three positions",
    axioms: [
      { id: "A1", name: "Intermediation Necessity", text: "The pharmaceutical supply chain requires formulary management, rebate negotiation, and pharmacy network administration. Three Pharmacy Benefit Managers (CVS Caremark, Express Scripts, OptumRx) control 80% of the market. Their intermediation is structurally embedded." },
      { id: "A2", name: "Vertical Integration-Opacity Identity", text: "When the Pharmacy Benefit Management owns the insurance company (payer), the pharmacy (dispenser), and the formulary (gatekeeper), it sets the price, negotiates the rebate with itself, and captures the spread at every node. Transparency at any node would reveal the extraction at the others. The vertical integration and the opacity are the same corporate structure." },
      { id: "A3", name: "Regulatory Capture Through Complexity", text: "Pharmacy Benefit Management contracts contain gag clauses, spread-pricing provisions, and retroactive fees that even the payer-clients cannot fully audit. The FTC investigation (2024) found that Pharmacy Benefit Managers inflate insulin costs by redirecting rebates. The complexity of the intermediation is itself the extraction mechanism — the more opaque the structure, the larger the spread." },
    ],
  },
  {
    id: "XLVII", name: "The Constitutional Ratchet",
    domain: "Firearms", constraint: "Constitutional / Institutional",
    impossible: "Regulating firearms as a consumer safety product when constitutional entrenchment removes them from the regulatory design space available to all other consumer goods",
    axioms: [
      { id: "A1", name: "Constitutional Entrenchment", text: "The Second Amendment places firearms outside the regulatory framework that governs every other consumer product. The Consumer Product Safety Commission is explicitly prohibited from regulating firearms or ammunition. The constitutional status is not a policy choice — it is a structural constraint on the design space." },
      { id: "A2", name: "Regulatory Exclusion Identity", text: "The constitutional protection that guarantees access and the regulatory framework that could limit harm operate in mutually exclusive legal domains. Firearms are simultaneously the most lethal consumer product and the only one exempt from consumer safety regulation. The protection and the exemption are the same legal fact." },
      { id: "A3", name: "Judicial Ratchet", text: "District of Columbia v. Heller (2008) and New York State Rifle & Pistol Association v. Bruen (2022) have progressively expanded the scope of constitutional protection while narrowing the regulatory toolkit. Each precedent constrains future regulation more tightly than the last. The jurisprudential trajectory is monotonically expanding." },
    ],
  },
  {
    id: "XLVIII", name: "The Prohibition Paradox",
    domain: "Alcohol", constraint: "Neurochemical / Institutional",
    impossible: "Eliminating alcohol welfare costs through either prohibition or permissive regulation when both strategies produce irreducible harm through different channels",
    axioms: [
      { id: "A1", name: "Neurochemical Demand Necessity", text: "Ethanol\u2019s anxiolytic and euphoric effects operate on GABA-A (gamma-aminobutyric acid) receptors with a pharmacological mechanism that no non-intoxicating substitute replicates. Cultural embeddedness across millennia ensures demand persistence independent of any regulatory regime." },
      { id: "A2", name: "Prohibition-Black Market Identity", text: "The 18th Amendment demonstrated that prohibiting alcohol and creating organized crime revenue streams are the same policy event. Prohibition did not eliminate consumption — it transferred supply from regulated to unregulated channels while increasing potency and toxicity." },
      { id: "A3", name: "Regulatory Capture Asymmetry", text: "The alcohol industry spends $30M+/year on US lobbying. State alcohol control boards derive revenue from the product they regulate. The Three-Tier System (producer-distributor-retailer), originally designed as a post-Prohibition safeguard, has become a rent-extraction mechanism that consolidates distributor market power." },
    ],
  },
  {
    id: "XLIX", name: "The Demand Indestructibility",
    domain: "Human Trafficking and Modern Slavery", constraint: "Jurisdictional / Economic",
    impossible: "Eliminating human trafficking through enforcement alone when demand for exploitable labor operates across jurisdictional boundaries with asymmetric enforcement capacity",
    axioms: [
      { id: "A1", name: "Demand Necessity", text: "Global demand for cheap labor in agriculture, construction, domestic service, and sex work creates a structural market for exploitable workers. The demand operates in legal economies — the exploitation is in the labor conditions, not the industries themselves." },
      { id: "A2", name: "Jurisdictional Arbitrage Identity", text: "Trafficking operates across borders where enforcement capacity, labor standards, and legal frameworks differ by orders of magnitude. The trafficker exploits the gap between the jurisdiction where the victim is recruited and the jurisdiction where exploitation occurs." },
      { id: "A3", name: "Enforcement Asymmetry", text: "An estimated 50 million people are in modern slavery. Global anti-trafficking funding is approximately $375M/year — $7.50 per victim. The enforcement budget is structurally incommensurate with the scale of the problem." },
    ],
  },
  {
    id: "L", name: "The Prohibition Profit Floor",
    domain: "Illicit Drug Trade", constraint: "Institutional / Economic",
    impossible: "Prohibiting drug production without creating the supranormal profit margin that funds the enforcement-resistant organizations prohibition was designed to eliminate",
    axioms: [
      { id: "A1", name: "Demand Inelasticity", text: "Addiction produces price-inelastic demand. Prohibition cannot eliminate consumption because the neurochemical basis of demand operates independently of legal status. Every demand-reduction strategy has failed to reduce global consumption below pre-intervention levels." },
      { id: "A2", name: "Prohibition-Profit Identity", text: "Prohibition creates a risk premium that inflates margins to 300\u2013500\u00d7 above production cost. The same policy designed to eliminate the market creates the profit margin that funds cartel military capacity, judicial corruption, and territorial control. The prohibition and the profit are the same economic event." },
      { id: "A3", name: "State Capture Ratchet", text: "Supranormal drug profits exceed the GDP of the jurisdictions where production is concentrated. The cartel\u2019s budget exceeds the state\u2019s enforcement budget. Institutional capture follows from the financial asymmetry — the state cannot outspend the organization it created through prohibition." },
    ],
  },
  {
    id: "LI", name: "The Attribution Impossibility",
    domain: "Cybercrime and Ransomware", constraint: "Computational / Jurisdictional",
    impossible: "Deterring cybercrime through prosecution when technical attribution is structurally indeterminate and jurisdictional authority does not extend to the attacker\u2019s location",
    axioms: [
      { id: "A1", name: "Digital Infrastructure Necessity", text: "Critical infrastructure — healthcare, energy, finance, government — requires network connectivity. The attack surface is a structural consequence of digitization, not a configuration failure." },
      { id: "A2", name: "Attribution Indeterminacy", text: "IP spoofing, VPN chains, compromised intermediary systems, and cryptocurrency payment channels make definitive technical attribution structurally indeterminate in most cases. The same network architecture that enables legitimate anonymity enables attack anonymity." },
      { id: "A3", name: "Jurisdictional Void", text: "Attackers operate from jurisdictions that lack extradition treaties, have insufficient cyber law enforcement capacity, or actively harbor cybercriminal organizations. Russia, North Korea, and Iran-based groups operate with effective state protection. The prosecution model requires jurisdiction the prosecutor does not have." },
    ],
  },
  {
    id: "LII", name: "The Consent Fabrication Trap",
    domain: "Data Brokerage and Surveillance Capitalism", constraint: "Informational / Institutional",
    impossible: "Obtaining meaningful informed consent for data collection when the complexity and scope of data use structurally exceeds human cognitive processing capacity",
    axioms: [
      { id: "A1", name: "Data Collection Necessity", text: "Digital services require data collection for functionality. Users cannot participate in the digital economy without generating behavioral data. The choice is not between sharing and not sharing — it is between participating and not participating." },
      { id: "A2", name: "Consent-Complexity Impossibility", text: "The average American encounters 1,462 privacy policies per year, each averaging 4,000 words. Reading all of them would require 76 full working days. The legal fiction of \u2018informed consent\u2019 via click-through is structurally impossible — no human can process the volume of consent requests the system generates." },
      { id: "A3", name: "Behavioral Surplus Extraction", text: "Data brokers aggregate behavioral data across sources to create profiles that predict behavior with accuracy the data subject cannot observe or contest. The extraction operates below the threshold of awareness. Acxiom maintains profiles on 2.5 billion individuals. The data subject does not know what is known." },
    ],
  },
  {
    id: "LIII", name: "The Poverty Ratchet",
    domain: "Payday Lending and Predatory Consumer Finance", constraint: "Financial / Institutional",
    impossible: "Providing short-term credit to liquidity-constrained borrowers without creating debt spirals when the loan structure requires refinancing at rates that exceed the borrower\u2019s income growth",
    axioms: [
      { id: "A1", name: "Credit Access Necessity", text: "40% of Americans cannot cover a $400 emergency expense. Traditional banking excludes low-income borrowers through minimum balance requirements and credit scoring. The demand for short-term credit is a structural consequence of income volatility and inadequate social insurance." },
      { id: "A2", name: "Rate-Trap Identity", text: "Payday loans carry effective APRs of 300\u2013500%. The average borrower refinances 8 times, paying $520 in fees on a $375 loan. The loan structure is designed for refinancing — the product and the debt trap are the same financial instrument." },
      { id: "A3", name: "Regulatory Arbitrage Persistence", text: "Payday lenders operate across state lines, partner with tribal entities for sovereign immunity, and restructure as installment lenders when payday regulations tighten. The CFPB payday rule was gutted in 2020. The arbitrage opportunities regenerate faster than regulation can close them." },
    ],
  },
  {
    id: "LIV", name: "The Fungibility Floor",
    domain: "Conflict Minerals and Blood Diamonds", constraint: "Physical / Jurisdictional",
    impossible: "Certifying conflict-free mineral supply chains when the physical fungibility of refined minerals makes origin indistinguishable after processing",
    axioms: [
      { id: "A1", name: "Mineral Demand Necessity", text: "Tantalum, tin, tungsten, and gold (3TG) are essential inputs for electronics, aerospace, and industrial manufacturing. Cobalt is required for lithium-ion batteries. Demand cannot be eliminated without abandoning the technologies that define modern infrastructure." },
      { id: "A2", name: "Fungibility-Traceability Impossibility", text: "Once refined, conflict minerals are chemically identical to ethically sourced minerals. Cobalt from artisanal mines in the DRC using child labor is indistinguishable from cobalt mined under regulated conditions after smelting. The physical fungibility of the refined product makes supply chain certification structurally unfalsifiable." },
      { id: "A3", name: "Certification Capture", text: "The Kimberley Process (diamonds) and Dodd-Frank \u00a71502 (conflict minerals) rely on self-certification by the same actors with economic incentives to misreport. The Kimberley Process certified Zimbabwe\u2019s Marange diamonds despite documented forced labor. The certification system was captured by the entities it was designed to regulate." },
    ],
  },
  {
    id: "LV", name: "The Cost Arbitrage Floor",
    domain: "Child Labor in Global Supply Chains", constraint: "Economic / Jurisdictional",
    impossible: "Eliminating child labor in global supply chains through importing-country regulation when the cost advantage of child labor operates in jurisdictions beyond the regulator\u2019s enforcement reach",
    axioms: [
      { id: "A1", name: "Supply Chain Necessity", text: "Global supply chains require inputs from jurisdictions where 160 million children are in child labor. Cocoa (Ivory Coast, Ghana), cobalt (DRC), garments (Bangladesh, Myanmar), mica (India, Madagascar) — the inputs are geographically concentrated in countries with weak enforcement." },
      { id: "A2", name: "Cost-Exploitation Identity", text: "Child labor reduces production costs by 20\u201340% in affected supply chains. The cost advantage is the exploitation — they are the same economic fact. Supply chain auditing catches visible, formal-sector violations while missing household, agricultural, and subcontracted child labor that comprises the majority." },
      { id: "A3", name: "Enforcement Jurisdiction Gap", text: "Importing-country laws (EU Corporate Sustainability Due Diligence Directive, proposed US legislation) impose obligations on importers but enforcement requires information from jurisdictions that lack the institutional capacity or political will to provide it. The regulatory ambition exceeds the enforcement infrastructure by orders of magnitude." },
    ],
  },
  {
    id: "LVI", name: "The Thermodynamic Degradation Floor",
    domain: "Plastics and Petrochemical Waste", constraint: "Thermodynamic",
    impossible: "Producing synthetic polymers at scale without environmental persistence when the molecular stability that makes plastics useful is the same property that prevents environmental degradation",
    axioms: [
      { id: "A1", name: "Material Necessity", text: "Plastics are embedded in healthcare (disposable syringes, IV bags), food safety (packaging), construction, transportation, and electronics. 400 million tons produced annually. No alternative material class matches the combination of durability, weight, and cost across all application sectors." },
      { id: "A2", name: "Stability-Persistence Identity", text: "The carbon-carbon backbone that gives plastics their useful mechanical properties is the same molecular structure that resists environmental degradation. A PET bottle\u2019s 450-year persistence and its structural integrity are the same polymer chemistry. The useful property and the environmental harm are constitutively identical." },
      { id: "A3", name: "Recycling Thermodynamic Limit", text: "Only 9% of plastics ever produced have been recycled. Mechanical recycling degrades polymer chain length with each cycle. Chemical recycling requires energy inputs that approach virgin production. The Second Law of Thermodynamics guarantees that recycling cannot be a closed loop at scale — entropy increases with each cycle." },
    ],
  },
  {
    id: "LVII", name: "The Sovereignty Arbitrage",
    domain: "Tax Havens and Offshore Finance", constraint: "Jurisdictional / Institutional",
    impossible: "Eliminating tax base erosion when sovereign states compete for capital by offering tax advantages that other sovereigns cannot match without abandoning their own fiscal capacity",
    axioms: [
      { id: "A1", name: "Capital Mobility Necessity", text: "Global capital flows require jurisdictional optionality. $10T+ in assets held offshore. The same capital mobility that enables productive investment enables tax base erosion — they are the same financial infrastructure." },
      { id: "A2", name: "Sovereignty-Competition Identity", text: "Each sovereign state\u2019s right to set its own tax rates is the same legal principle that enables tax competition. Ireland\u2019s 12.5% corporate rate, the Netherlands\u2019 innovation box, Singapore\u2019s territorial system — each is a sovereign exercise of fiscal authority that erodes other sovereigns\u2019 tax bases. Sovereignty and the race to the bottom are the same international law principle." },
      { id: "A3", name: "Race to the Bottom Ratchet", text: "Global average corporate tax rates have fallen from 40% (1980) to 23% (2024). The OECD Pillar Two minimum tax (15%) was immediately arbitraged through qualified domestic minimum top-up taxes and substance-based carve-outs. Each reform creates new optimization opportunities." },
    ],
  },
  {
    id: "LVIII", name: "The Protein Demand Floor",
    domain: "Factory Farming and Industrial Animal Agriculture", constraint: "Biological / Thermodynamic",
    impossible: "Meeting global protein demand at current price points without the concentrated animal feeding operations that produce antimicrobial resistance, zoonotic pandemic risk, and environmental degradation",
    axioms: [
      { id: "A1", name: "Protein Demand Necessity", text: "Global meat consumption: 350 million tons/year, projected to reach 450 million by 2050. Rising incomes in developing economies drive demand growth that no dietary intervention has reversed at population scale." },
      { id: "A2", name: "Concentration-Externality Identity", text: "Concentrated Animal Feeding Operations (CAFOs) achieve the protein-per-dollar ratio the market demands by concentrating thousands of animals in confined spaces. The density that produces the price point also produces: 73% of global antibiotic consumption (Antimicrobial Resistance risk), zoonotic pathogen evolution (pandemic risk), and nutrient runoff (dead zones). The efficiency and the externalities are the same production method." },
      { id: "A3", name: "Thermodynamic Efficiency Ceiling", text: "Feed conversion ratios (FCR) — 2:1 for poultry, 6:1 for beef — are thermodynamic constraints on protein production efficiency. No feeding technology can reduce the FCR below the biological minimum. The caloric loss in converting plant protein to animal protein is a conservation-of-energy identity." },
    ],
  },
  {
    id: "LIX", name: "The Basel Convention Evasion",
    domain: "E-Waste Export and Toxic Dumping", constraint: "Jurisdictional / Classification",
    impossible: "Preventing toxic e-waste dumping in developing countries when classification loopholes allow hazardous material to be exported as \u2018secondhand goods\u2019 or \u2018recyclable material\u2019",
    axioms: [
      { id: "A1", name: "E-Waste Generation Necessity", text: "62 million tonnes of e-waste generated globally in 2022. Average device lifespan declining. The waste stream is a structural consequence of the consumer electronics replacement cycle — shorter product lifecycles produce more waste." },
      { id: "A2", name: "Classification-Evasion Identity", text: "The Basel Convention prohibits export of hazardous waste to developing countries. But e-waste reclassified as \u2018secondhand goods\u2019 or \u2018material for recycling\u2019 is exempt. 75\u201380% of e-waste exported to Ghana\u2019s Agbogbloshie was non-functional on arrival. The classification system and the evasion mechanism are the same regulatory text." },
      { id: "A3", name: "Enforcement Jurisdiction Gap", text: "Receiving countries lack the inspection capacity to verify whether imports are functional secondhand goods or toxic waste. The cost of proper e-waste recycling ($20\u201330/unit in OECD countries) vs. informal dumping ($1\u20132/unit in developing countries) creates an economic gradient that enforcement cannot overcome." },
    ],
  },
  {
    id: "LX", name: "The Issuer-Pays Corruption Floor",
    domain: "Credit Rating Agency Oligopoly", constraint: "Institutional / Informational",
    impossible: "Producing unbiased credit ratings under an issuer-pays model when the rated entity selects and compensates the rating agency",
    axioms: [
      { id: "A1", name: "Rating Necessity", text: "Institutional investors, bank capital adequacy regulations (Basel III), and insurance company portfolio rules require credit ratings from recognized agencies. The rating is not optional — it is a regulatory input. Three agencies (S&P, Moody\u2019s, Fitch) control 95% of the market." },
      { id: "A2", name: "Issuer-Pays Bias Identity", text: "The entity being rated selects which agency to hire and can withdraw the engagement. The agency\u2019s revenue depends on maintaining client relationships. Before 2008, S&P and Moody\u2019s rated 93% of AAA-rated subprime RMBS that subsequently defaulted. The payment model and the bias are the same institutional structure." },
      { id: "A3", name: "Regulatory Entrenchment", text: "Dodd-Frank \u00a7932\u2013939H attempted reform but left the issuer-pays model intact. The SEC\u2019s Nationally Recognized Statistical Rating Organization designation creates a regulatory moat that prevents new entrants from challenging incumbents. The agencies that failed in 2008 remain the only agencies whose ratings carry regulatory force." },
    ],
  },
  {
    id: "LXI", name: "The Accountability Void",
    domain: "Private Military Contractors", constraint: "Jurisdictional / Legal",
    impossible: "Outsourcing military operations to private contractors without creating an accountability void where neither military law nor civilian law effectively governs contractor conduct in conflict zones",
    axioms: [
      { id: "A1", name: "Outsourcing Necessity", text: "The US military depends on private contractors for logistics, security, intelligence, and training. At peak, contractors outnumbered uniformed personnel in Iraq and Afghanistan. The all-volunteer force\u2019s personnel constraints make contractor augmentation structurally necessary for sustained operations." },
      { id: "A2", name: "Legal Jurisdiction Gap Identity", text: "Military contractors are not subject to the Uniform Code of Military Justice (UCMJ) because they are not military personnel. Host-nation law is typically inapplicable in conflict zones. US civilian criminal jurisdiction (MEJA) has produced fewer than 10 prosecutions despite hundreds of documented incidents. Nisour Square (Blackwater, 2007): 17 Iraqi civilians killed, convictions took 7 years and were partially overturned, then pardoned. The jurisdictional gap and the accountability void are the same legal structure." },
      { id: "A3", name: "Accountability Erosion Ratchet", text: "Each successful use of contractors without accountability expands the scope of future outsourcing. The Pentagon\u2019s contractor dependency grows while oversight mechanisms remain static. Status of Forces Agreements (SOFAs) typically grant contractor immunity from host-nation prosecution — the diplomatic framework reinforces the accountability void." },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════
// CLASSIFICATION — Impossibility vs Intractability
// Impossibility = no policy/rule-change path escapes the binding floor.
// The floor can be physical, chemical, biological, informational, or otherwise non-overridable.
// Intractability = a policy/rule-change path can transform the game and create a way out,
// even when the current game contains an impossibility/floor theorem.
// Source: canonical 22-domain Impossibility list from CLAUDE.md.
// ═══════════════════════════════════════════════════════════════════
const IMPOSSIBILITY_IDS = new Set([
  "III",     // PFAS / Persistent Compounds
  "IV",      // Antimicrobial Resistance
  "V",       // Nuclear Fission
  "VI",      // Monoculture Agriculture
  "VII",     // Deep-Sea Mining
  "VIII",    // Cement Production
  "IX",      // WMD / Lethal Autonomous Weapons
  "XII",     // Gene Drive Deployment
  "XIII",    // Topsoil Erosion
  "XVI",     // Groundwater / Ogallala Aquifer
  "XVIII",   // Industrial Agriculture Methane
  "XXI",     // Social Media & Youth Mental Health
  "XXIV",    // Fast Fashion
  "XXV",     // Mining & Rare Earth Extraction
  "XXXII",   // Oil & Gas Extraction
  "XXXIII",  // Coal Combustion
  "XXXV",    // Aviation Emissions
  "XXXVII",  // Deforestation & Industrial Logging
  "XXXVIII", // Palm Oil
  "XLIV",    // Persistent Organic Pollutants
  "LVI",     // Plastics and Petrochemical Waste
  "LVIII",   // Factory Farming
]);

const CONSTRAINT_COLORS = {
  "Institutional": "#A78BFA",
  "Institutional / Financial": "#A78BFA",
  "Institutional / Temporal": "#A78BFA",
  "Institutional / Informational": "#A78BFA",
  "Thermodynamic": "#22D3EE",
  "Thermodynamic (Conservation of Mass)": "#22D3EE",
  "Thermodynamic / Institutional": "#22D3EE",
  "Biological / Evolutionary": "#34D399",
  "Biological": "#34D399",
  "Biological / Institutional": "#34D399",
  "Biological / Chemical": "#34D399",
  "Computational / Biological": "#34D399",
  "Physical (Radioactive Decay)": "#F472B6",
  "Physical / Jurisdictional": "#F472B6",
  "Physical": "#F472B6",
  "Jurisdictional / Physical": "#F472B6",
  "Statistical / Physical": "#F472B6",
  "Geochemical / Physical": "#FB923C",
  "Geochemical": "#FB923C",
  "Chemical": "#FB923C",
  "Ecological": "#FB923C",
  "Informational": "#FCD34D",
  "Computational / Institutional": "#C084FC",
  "Climate / Jurisdictional": "#38BDF8",
  "Constitutional / Institutional": "#A78BFA",
  "Neurochemical / Institutional": "#34D399",
  "Jurisdictional / Economic": "#F472B6",
  "Economic / Jurisdictional": "#F472B6",
  "Institutional / Economic": "#A78BFA",
  "Financial / Institutional": "#A78BFA",
  "Computational / Jurisdictional": "#C084FC",
  "Informational / Institutional": "#FCD34D",
  "Jurisdictional / Classification": "#F472B6",
  "Jurisdictional / Legal": "#F472B6",
  "Biological / Thermodynamic": "#34D399",
};

function getColor(constraint) {
  return CONSTRAINT_COLORS[constraint] || DIM;
}

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{
        fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 2,
        marginBottom: 18, paddingBottom: 8,
        borderBottom: `1px solid ${BORDER}`,
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// THEOREM PROOF FLOW — GSAP teaching sequence
// Animates the 3-step logical architecture of impossibility theorems
// ═══════════════════════════════════════════════════════════════════
function TheoremProofFlow() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const steps = containerRef.current.querySelectorAll(".proof-step");
    const connectors = containerRef.current.querySelectorAll(".proof-connector");
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(steps[0], { opacity: 0, y: 20, duration: 0.6 })
      .from(connectors[0], { scaleX: 0, transformOrigin: "left center", duration: 0.4 }, "-=0.2")
      .from(steps[1], { opacity: 0, y: 20, duration: 0.6 }, "-=0.2")
      .from(connectors[1], { scaleX: 0, transformOrigin: "left center", duration: 0.4 }, "-=0.2")
      .from(steps[2], { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ margin: "24px 0 28px" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr auto 1fr",
        gap: 12,
        alignItems: "center",
        maxWidth: 720,
      }}>
        {/* Step 1 */}
        <div className="proof-step" style={{
          padding: "16px 18px",
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 4,
        }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>
            STEP 1
          </div>
          <div style={{ fontFamily: S, fontSize: 16, color: TEXT, lineHeight: 1.5 }}>
            State axioms, each individually defensible
          </div>
        </div>

        {/* Connector 1 */}
        <div className="proof-connector" style={{
          width: 24, height: 2, background: GOLD,
        }} />

        {/* Step 2 */}
        <div className="proof-step" style={{
          padding: "16px 18px",
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 4,
        }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>
            STEP 2
          </div>
          <div style={{ fontFamily: S, fontSize: 16, color: TEXT, lineHeight: 1.5 }}>
            Prove no mechanism satisfies all axioms simultaneously
          </div>
        </div>

        {/* Connector 2 */}
        <div className="proof-connector" style={{
          width: 24, height: 2, background: GOLD,
        }} />

        {/* Step 3 */}
        <div className="proof-step" style={{
          padding: "16px 18px",
          background: "rgba(245,158,11,0.06)",
          border: `1px solid rgba(245,158,11,0.25)`,
          borderRadius: 4,
        }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>
            STEP 3
          </div>
          <div style={{ fontFamily: S, fontSize: 16, color: TEXT, lineHeight: 1.5 }}>
            Impossibility follows from axioms, not implementation failure
          </div>
        </div>
      </div>
    </div>
  );
}

function CanonTimeline() {
  const staggerRef = useScrollStagger(".canon-row");
  return (
    <div ref={staggerRef} style={{ display: "grid", gap: 1 }}>
      {CANON.map((t) => (
        <div key={t.num} className="canon-row" style={{
          display: "grid", gridTemplateColumns: "40px 72px 1fr",
          gap: 12, alignItems: "baseline",
          padding: "8px 12px",
          background: t.num % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
          borderRadius: 2,
        }}>
          <div style={{ fontFamily: M, fontSize: 13, color: GOLD, textAlign: "right" }}>
            #{t.num}
          </div>
          <div style={{ fontFamily: M, fontSize: 13, color: MUTED }}>
            {t.year}
          </div>
          <div>
            <span style={{ fontFamily: S, fontSize: 18, color: TEXT }}>
              {t.name}
            </span>
            <span style={{ fontFamily: M, fontSize: 13, color: MUTED, marginLeft: 8 }}>
              {t.authors}
            </span>
            <div style={{ fontFamily: S, fontSize: 16, color: DIM, marginTop: 2, fontStyle: "italic" }}>
              {t.impossible}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PPTCard() {
  const entranceRef = useScrollTriggerEntrance();
  return (
    <div ref={entranceRef} style={{
      margin: "24px 0", padding: "24px 28px",
      background: "rgba(245,158,11,0.06)",
      border: `1px solid rgba(245,158,11,0.2)`,
      borderRadius: 6,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
        <div style={{ fontFamily: M, fontSize: 13, color: GOLD, fontWeight: 600 }}>
          Private Pareto Theorem
        </div>
        <div style={{ fontFamily: M, fontSize: 13, color: MUTED }}>2026</div>
        <div style={{ fontFamily: S, fontSize: 18, color: TEXT }}>
          The Private Pareto Theorem
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
        <span style={{
          fontFamily: M, fontSize: 11, letterSpacing: 1,
          color: GOLD, padding: "3px 8px",
          border: `1px solid ${GOLD}33`, borderRadius: 3,
          background: `${GOLD}0D`,
        }}>
          FOUNDATIONAL
        </span>
        <span style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1 }}>
          Logical &mdash; Bilateral Payoff Space
        </span>
      </div>
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, marginBottom: 10 }}>
        POSTNIEKS
      </div>
      <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.85, marginBottom: 14 }}>
        For any bilateral interaction satisfying three axioms &mdash; overlapping interests,
        system independence, and system dependence &mdash; no Nash equilibrium exists in which
        both private parties gain and system welfare is preserved. The cooperative surplus
        visible to bilateral analysis is temporally unstable when &beta;<sub>W</sub> &gt; 1.
      </div>
      <div style={{
        fontFamily: S, fontSize: 18, color: TEXT, lineHeight: 1.7,
        fontStyle: "italic", padding: "12px 16px",
        borderLeft: `2px solid ${GOLD}33`,
        background: "rgba(245,158,11,0.03)",
      }}>
        Impossible: Bilateral Pareto efficiency that preserves system welfare under Private-Systemic Tension axioms.
      </div>

      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 2, marginTop: 18, marginBottom: 10 }}>
        AXIOMS
      </div>
      {[
        { id: "Private-Systemic Tension-1", name: "Overlapping Interests", text: "Both parties share a joint interest in the outcome of the transaction. Their payoff functions overlap on at least one dimension." },
        { id: "Private-Systemic Tension-2", name: "System Independence", text: "Each party\u2019s decision is made without knowledge of, or regard for, system-level welfare consequences. The bilateral payoff space excludes the system." },
        { id: "Private-Systemic Tension-3", name: "System Dependence", text: "The system\u2019s welfare is causally affected by the bilateral outcome. The transaction\u2019s externalities are real, not hypothetical." },
      ].map(ax => (
        <div key={ax.id} style={{ marginBottom: 12, paddingLeft: 16 }}>
          <div style={{ fontFamily: M, fontSize: 13, color: TEXT, marginBottom: 4 }}>
            <span style={{ color: GOLD, marginRight: 8 }}>{ax.id}</span>
            {ax.name}
          </div>
          <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.75 }}>
            {ax.text}
          </div>
        </div>
      ))}
      <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.85, marginTop: 14 }}>
        Private Pareto Theorem fits naturally into the existing canon. Like its predecessors, it demonstrates a structural
        impossibility in welfare aggregation: individually rational bilateral exchange cannot preserve
        the welfare of the system in which the exchange occurs. Its three axioms are
        human-behavioral, in the tradition of Arrow, Sen, and Myerson. What distinguishes Private Pareto Theorem is that
        it also points <em>beyond</em> social choice. The Private-Systemic Tension structure arises wherever private
        transactions affect systems the transacting parties cannot observe &mdash; including systems
        governed by conservation laws, thermodynamic identity, and evolutionary dynamics.
      </div>
    </div>
  );
}

function TheoremCard({ theorem }) {
  const color = getColor(theorem.constraint);
  const isImpossibility = IMPOSSIBILITY_IDS.has(theorem.id);
  const classLabel = isImpossibility ? "IMPOSSIBILITY THEOREM" : "INTRACTABILITY THEOREM";
  const classColor = isImpossibility ? "#F87171" : "#FCD34D";
  const entranceRef = useScrollTriggerEntrance();

  return (
    <div ref={entranceRef} style={{
      marginBottom: 36, padding: "24px 28px",
      background: SURFACE,
      border: `1px solid ${BORDER}`,
      borderRadius: 6,
    }}>
      <div style={{ marginBottom: 10 }}>
        <span style={{
          fontFamily: M, fontSize: 11, color: classColor, letterSpacing: 2,
          padding: "3px 9px", border: `1px solid ${classColor}44`,
          borderRadius: 3, background: `${classColor}12`,
          textTransform: "uppercase",
        }}>
          {classLabel}
        </span>
      </div>

      <div style={{ marginBottom: 6 }}>
        <div style={{ fontFamily: S, fontSize: 22, color: TEXT, fontWeight: 400 }}>
          {theorem.name}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 14 }}>
        <span style={{
          fontFamily: M, fontSize: 12, color: color, letterSpacing: 1,
          padding: "3px 8px", border: `1px solid ${color}33`,
          borderRadius: 3, background: `${color}0D`,
        }}>
          {theorem.constraint.toUpperCase()}
        </span>
        <span style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1 }}>
          {theorem.domain}
        </span>
      </div>

      <div style={{
        fontFamily: S, fontSize: 18, color: TEXT, lineHeight: 1.7,
        marginBottom: 18, fontStyle: "italic",
        padding: "12px 16px",
        borderLeft: `2px solid ${GOLD}33`,
        background: "rgba(245,158,11,0.03)",
      }}>
        Impossible: {theorem.impossible}
      </div>

      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 2, marginBottom: 10 }}>
        AXIOMS
      </div>
      {theorem.axioms.map((ax) => (
        <div key={ax.id} style={{ marginBottom: 12, paddingLeft: 16 }}>
          <div style={{ fontFamily: M, fontSize: 13, color: TEXT, marginBottom: 4 }}>
            <span style={{ color: GOLD, marginRight: 8 }}>{ax.id}</span>
            {ax.name}
          </div>
          <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.75 }}>
            {ax.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ImpossibilityTheorems() {
  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S, padding: "32px 24px 80px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 8 }}>
            System Asset Pricing Model RESEARCH PROGRAM
          </div>
          <h1 style={{ fontFamily: S, fontSize: 34, fontWeight: 300, color: TEXT, margin: 0, lineHeight: 1.3 }}>
            The Postnieks Impossibility Theorems
          </h1>
          <div style={{ fontFamily: S, fontSize: 17, color: DIM, marginTop: 8, fontStyle: "italic" }}>
            23 New Impossibility Results (1 Foundational + 22 Domain) &mdash; Plus 39 Intractability Theorems
          </div>
        </div>

        <div style={{
          display: "inline-block",
          fontFamily: M, fontSize: 11, letterSpacing: 2,
          color: "#FCD34D", background: "rgba(252,211,77,0.08)",
          border: "1px solid rgba(252,211,77,0.2)",
          padding: "8px 16px", borderRadius: 4,
          marginBottom: 40,
        }}>
          UNDER PEER REVIEW
        </div>

        {/* ── WHAT IS AN IMPOSSIBILITY THEOREM? ── */}
        <Section label="WHAT IS AN IMPOSSIBILITY THEOREM?">
          <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.85 }}>
            <p style={{ margin: "0 0 14px" }}>
              An impossibility theorem is a proof that a set of individually reasonable axioms cannot be
              simultaneously satisfied by any mechanism, rule, or institution. The impossibility is
              <em> structural</em>, not empirical: it does not claim that existing systems fail, but that
              <em> no possible system</em> can succeed.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              The framework originates with Kenneth Arrow&rsquo;s 1951 proof that no rank-order voting system
              can convert individual preferences into a community-wide ranking while simultaneously satisfying
              unrestricted domain, the Pareto principle, independence of irrelevant alternatives, and
              non-dictatorship. Arrow&rsquo;s contribution was not the identification of a flawed mechanism but
              the demonstration that <span style={{ color: TEXT }}>the flaw is inherent in the problem itself</span>.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              Every impossibility theorem since Arrow has followed the same logical architecture:
            </p>
            <div style={{
              padding: "16px 20px", margin: "0 0 14px",
              background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4,
            }}>
              <div style={{ fontFamily: M, fontSize: 15, color: TEXT, lineHeight: 2.2 }}>
                1. &ensp;State a set of axioms, each individually defensible<br/>
                2. &ensp;Prove that no mechanism satisfies all axioms simultaneously<br/>
                3. &ensp;The impossibility follows from the axioms, not from implementation failure
              </div>
            </div>
            <TheoremProofFlow />
            <p style={{ margin: 0 }}>
              What distinguishes an impossibility theorem from an ordinary negative result is its
              generality: the proof holds for <em>all</em> mechanisms, not merely existing ones. The
              theorem does not say &ldquo;we have not found a solution&rdquo;; it says
              &ldquo;<span style={{ color: TEXT }}>no solution exists</span>.&rdquo;
            </p>
          </div>
        </Section>

        {/* ── THE EXISTING CANON ── */}
        <Section label="THE EXISTING CANON &mdash; 17 THEOREMS (1785&ndash;2013)">
          <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.85, marginBottom: 20 }}>
            <p style={{ margin: "0 0 14px" }}>
              From Condorcet&rsquo;s 1785 voting paradox through the Man&ndash;Takayama unifying theorem in 2013,
              seventeen impossibility theorems have been accepted into the canon of social choice theory and
              mechanism design. Every one of these theorems proves an impossibility in the space
              of <span style={{ color: TEXT }}>decision procedures operating on human preferences</span>. The
              logical constraint is always informational or aggregative. None reaches outside the bilateral
              payoff space into the physical, biological, or geochemical world.
            </p>
          </div>
          <CanonTimeline />
          <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.85, marginTop: 20, fontStyle: "italic" }}>
            Structural observation: all seventeen theorems operate within a single domain &mdash; social choice
            and mechanism design. Their axioms describe properties of human institutions, preferences,
            and information. Their impossibilities constrain the design of human mechanisms. Not one engages
            the physical world.
          </div>
        </Section>

        {/* ── WHY THESE AXIOMS ARE STRONGER ── */}
        <Section label="THE AXIOM CLASS">
          <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.85 }}>
            <p style={{ margin: "0 0 14px" }}>
              The Stanford Encyclopedia of Philosophy states directly: Arrow&rsquo;s conditions
              are <em>&ldquo;not supposed to express more or less indubitable truths.&rdquo;</em> Arrow himself
              characterized his axioms as <span style={{ color: TEXT }}>&ldquo;value judgments&rdquo;</span> that
              &ldquo;express the doctrines of citizens&rsquo; sovereignty and rationality in a very
              general form.&rdquo;
            </p>
            <p style={{ margin: "0 0 14px" }}>
              The canonical seventeen impossibility theorems were built on value judgments. The profession
              canonized them. The Postnieks theorems are built
              on <span style={{ color: TEXT }}>conservation of mass, radioactive decay constants, carbon-fluorine bond
              energetics, and evolutionary selection pressure</span> &mdash; physical laws confirmed by
              centuries of independent experimental replication.
            </p>
            <div style={{
              padding: "16px 20px", margin: "0 0 14px",
              background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4,
              fontFamily: S, fontSize: 18, color: TEXT, lineHeight: 1.85,
            }}>
              Calcium carbonate &rarr; calcium oxide + carbon dioxide is conservation of mass.<br/>
              A radioactive half-life is a nuclear-physics constant.<br/>
              Carbon-fluorine bond dissociation energy of 485&nbsp;kJ/mol is a measured quantity.<br/>
              Cure and resistance selection are the same molecular event.
            </div>
            <p style={{ margin: 0 }}>
              Whether these foundations meet the standard applied to the canonical seventeen is a
              question the profession will have to answer. The axioms are stated plainly so that the
              evaluation can proceed on their merits.
            </p>
          </div>
        </Section>

        {/* ── THE FIVE CONSTRAINT CLASSES ── */}
        <Section label="EIGHT CONSTRAINT CLASSES">
          <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.85, marginBottom: 20 }}>
            <p style={{ margin: "0 0 14px" }}>
              Eight classes of domain science generate impossibility theorems:
            </p>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { cls: "Thermodynamic & Chemical Permanence", ex: "Forever Chemicals — carbon-fluorine bond energy of 485 kJ/mol; Cement — CaCO\u2083 \u2192 CaO + CO\u2082 is conservation of mass; Coal and O&G — hydrocarbon combustion is carbon oxidation; Fast Fashion — polyester persistence; Persistent Organic Pollutants — molecular persistence is the commercially valued property; Plastics — polymer stability is environmental persistence" },
              { cls: "Evolutionary & Biological Arms Races", ex: "Antimicrobial resistance — therapeutic lethality = selection pressure; Monoculture; Gene Drives; Tobacco — nicotine addiction pharmacology; Ultra-Processed Food — metabolic dysregulation; Opioids — \u03bc-receptor agonism and dependence are the same molecular event; Industrial Ag Methane — enteric fermentation is a stoichiometric constant; Alcohol — GABA-A pharmacology; Factory Farming — Concentrated Animal Feeding Operation concentration-externality identity" },
              { cls: "Radioactive Decay & Physical Irreversibility", ex: "Nuclear fission — fission products and radiotoxicity are the same nuclear event; Orbital debris — Kessler cascade; Aviation — energy density lock-in at 48:1 jet fuel vs. battery ratio" },
              { cls: "Irreversible Capability & Knowledge Diffusion", ex: "Frontier AI — demonstrated capability cannot be unlearned; Weapons of Mass Destruction/Lethal Autonomous Weapons Systems — transferred knowledge is permanently enabling; Arms exports — capability diffusion is constitutive" },
              { cls: "Geological & Ecological Irreversibility", ex: "Groundwater/Ogallala — recharge on geological timescales; Mining — acid mine drainage persists for centuries; Deforestation — carbon stock release is instantaneous, recovery takes centuries; Palm Oil — peatland drainage is irreversible; Deep-Sea Mining — nodule regeneration at mm/million years; Topsoil — pedogenesis asymmetry" },
              { cls: "Institutional & Financial Ratchets", ex: "Pharmacy Benefit Managers — vertical integration opacity; Commercial Real Estate — extend-and-pretend; Private Prisons — recidivism incentive; Defense Procurement — cost-plus ratchet; Gig Economy — classification arbitrage; Gambling — algorithmic exploitation; Sovereign Debt — intergenerational extraction; Student Loans — securitization extraction; Firearms — constitutional ratchet; Illicit Drug Trade — prohibition-profit identity; Credit Ratings — issuer-pays bias; Private Military Contractors — jurisdiction gap; Payday Lending — poverty ratchet" },
              { cls: "Statistical, Jurisdictional & Informational Floors", ex: "Insurance/Climate — fat-tail mispricing under non-stationarity; Shipping — flag state arbitrage separates jurisdiction from enforcement; Benchmark Rate — self-referential benchmarks; Stablecoins — reserve opacity; Algorithmic Pricing — tacit collusion without agreement; Social Media — engagement optimization exploits developmental neurobiology; Cybercrime — attribution impossibility; Data Brokerage — consent fabrication; E-Waste — Basel Convention classification evasion; Tax Havens — sovereignty arbitrage; Conflict Minerals — fungibility floor; Child Labor — cost arbitrage floor; Human Trafficking — demand indestructibility" },
            ].map((c, i) => (
              <div key={i} style={{
                padding: "14px 18px", background: SURFACE,
                border: `1px solid ${BORDER}`, borderRadius: 4,
              }}>
                <div style={{ fontFamily: M, fontSize: 12, color: GOLD, marginBottom: 6 }}>
                  {i + 1}. &ensp;{c.cls}
                </div>
                <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.75 }}>
                  {c.ex}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.85, marginTop: 16, fontStyle: "italic" }}>
            The pattern predicts additional theorems in any domain where the conjunction of
            constitutive axioms guarantees an irreducible welfare boundary that no market
            mechanism can cross.
          </div>
        </Section>

        {/* ── EXPIRY CONDITIONS ── */}
        <Section label="EXPIRY CONDITIONS &mdash; FALSIFIABILITY AS A FEATURE">
          <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.85 }}>
            <p style={{ margin: "0 0 14px" }}>
              Each Postnieks theorem has an <span style={{ color: TEXT }}>expiry condition</span> &mdash; a
              precisely specified state of the world under which the impossibility&rsquo;s scope reduces.
              Arrow&rsquo;s theorem has no expiry condition because it does not engage the actual world.
              The Postnieks theorems do.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              If someone invents a non-limestone binder with equivalent performance at scale, the
              Calcination Floor expires. If a biological pathway is discovered that cleaves the C&ndash;F
              bond, the Molecular Persistence Floor narrows. If a viable antibiotic alternative eliminates
              selection pressure, the Efficacy Ceiling lifts.
            </p>
            <p style={{ margin: 0 }}>
              The falsifiability is intentional. Each theorem states the conditions under which its
              scope would narrow, and welcomes the technical or scientific development that would
              narrow it.
            </p>
          </div>
        </Section>

        {/* ── THE 62 THEOREMS — CLASSIFIED ── */}
        <Section label="THE 62 THEOREMS &mdash; IMPOSSIBILITY AND INTRACTABILITY">
          <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.8, marginBottom: 18 }}>
            <p style={{ margin: "0 0 12px" }}>
              The sixty-two theorems divide into two classes by the nature of the binding constraint.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              <span style={{ color: TEXT }}>Twenty-three Impossibility Theorems</span> &mdash; the
              Private Pareto Theorem as the foundational result, plus twenty-two domain theorems in which
              the binding constraint is physical, chemical, biological, informational, or otherwise non-overridable. Conservation of mass, radioactive
              decay, bond-dissociation energies, and evolutionary selection pressure cannot be altered by any
              policy. In these domains, no mechanism can internalize the system-welfare cost.
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ color: TEXT }}>Thirty-nine Intractability Theorems</span> &mdash; the
              binding constraint is institutional, jurisdictional, financial, or political. A sufficiently
              well-designed policy can solve the problem, and in each of the thirty-nine domains at least one
              jurisdiction has demonstrated a proven model: Norway&rsquo;s sovereign-wealth separation, Chile&rsquo;s
              CODELCO structure, the Nordic labor model, Singapore&rsquo;s Monetary Authority regime, the
              United Kingdom&rsquo;s Senior Managers and Certification Regime, Australia&rsquo;s Financial
              Accountability Regime, and others. Intractability is not impossibility; it is a statement about
              how difficult the institutional change has been under the prevailing arrangements.
            </p>
          </div>
          <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>
            Each theorem follows the Arrow architecture: three axioms, structural impossibility.
          </div>

          {/* Private Pareto Theorem — The Foundational Theorem */}
          <div style={{
            fontFamily: M, fontSize: 13, color: GOLD,
            letterSpacing: 2, marginBottom: 16, marginTop: 8,
          }}>
            THE FOUNDATIONAL THEOREM
          </div>
          <PPTCard />

          {/* ── THE TWENTY-TWO IMPOSSIBILITY THEOREMS ── */}
          <div style={{
            fontFamily: M, fontSize: 13, color: GOLD,
            letterSpacing: 2, marginBottom: 12, marginTop: 40,
          }}>
            THE TWENTY-TWO DOMAIN IMPOSSIBILITY THEOREMS
          </div>
          <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.85, marginBottom: 28 }}>
            In each of the twenty-two domains below, the binding constraint is a physical, chemical, or
            biological law &mdash; conservation of mass, radioactive decay, bond-dissociation energy,
            evolutionary selection pressure, the thermodynamics of combustion. No policy alters these
            constraints. The system-welfare cost cannot be internalized by any market mechanism or
            regulatory regime.
          </div>

          {POSTNIEKS_THEOREMS.filter(t => IMPOSSIBILITY_IDS.has(t.id)).map(t => (
            <TheoremCard key={t.id} theorem={t} />
          ))}

          {/* ── THE THIRTY-NINE INTRACTABILITY THEOREMS ── */}
          <div style={{
            fontFamily: M, fontSize: 13, color: GOLD,
            letterSpacing: 2, marginBottom: 12, marginTop: 56,
          }}>
            THE THIRTY-NINE DOMAIN INTRACTABILITY THEOREMS
          </div>
          <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.85, marginBottom: 28 }}>
            In each of the thirty-nine domains below, the binding constraint is institutional,
            jurisdictional, financial, or political. A sufficiently well-designed policy has already been
            demonstrated in at least one jurisdiction &mdash; Norway&rsquo;s sovereign-wealth structure,
            Chile&rsquo;s CODELCO regime, the Nordic labor model, Singapore&rsquo;s Monetary Authority,
            the United Kingdom&rsquo;s Senior Managers and Certification Regime, Australia&rsquo;s
            Financial Accountability Regime, and others. Intractability is a statement about the depth of
            the structural lock-in under the prevailing arrangements, not about the laws of nature.
          </div>

          {POSTNIEKS_THEOREMS.filter(t => !IMPOSSIBILITY_IDS.has(t.id)).map(t => (
            <TheoremCard key={t.id} theorem={t} />
          ))}
        </Section>

        {/* ── THE STRUCTURAL PATTERN ── */}
        <Section label="THE STRUCTURAL PATTERN">
          <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.85 }}>
            <p style={{ margin: "0 0 14px" }}>
              Across all sixty-two theorems, a consistent three-axiom architecture emerges:
            </p>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 14,
            }}>
              {[
                { ax: "A1", name: "Necessity Axiom", desc: "The activity generating the private benefit cannot be eliminated under current conditions. Demand is structurally embedded in existing infrastructure, competitive dynamics, or therapeutic requirements." },
                { ax: "A2", name: "Identity Axiom", desc: "The beneficial act and the harmful consequence are constitutively the same physical, chemical, biological, or computational event. They cannot be separated by any technology, policy, or institutional design. This is the axiom class that distinguishes the Postnieks theorems from their social-science predecessors." },
                { ax: "A3", name: "Irreversibility / Asymmetry Axiom", desc: "The timescale of harm exceeds the timescale of any institutional control, market mechanism, or remediation technology by orders of magnitude. The ratchet turns in one direction. The system cannot recover within any actionable planning horizon." },
              ].map(a => (
                <div key={a.ax} style={{
                  padding: "14px 18px", background: SURFACE,
                  border: `1px solid ${BORDER}`, borderRadius: 4,
                }}>
                  <div style={{ fontFamily: M, fontSize: 12, color: GOLD, marginBottom: 6 }}>
                    {a.ax} &mdash; {a.name}
                  </div>
                  <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.75 }}>
                    {a.desc}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ margin: 0 }}>
              This A1&ndash;A2&ndash;A3 architecture mirrors Arrow&rsquo;s structure precisely. Arrow proved that
              no social welfare function can satisfy unrestricted domain, Pareto, independence of irrelevant alternatives (IIA), and non-dictatorship
              simultaneously. Each Postnieks theorem proves that no mechanism can satisfy necessity, identity,
              and reversibility simultaneously. The impossibility is the same: individually reasonable
              requirements that are <span style={{ color: TEXT }}>mutually incompatible</span>.
            </p>
          </div>
        </Section>

        {/* ── PEER REVIEW STATUS ── */}
        <Section label="PEER REVIEW STATUS">
          <div style={{
            padding: "20px 24px",
            background: "rgba(252,211,77,0.05)",
            border: "1px solid rgba(252,211,77,0.15)",
            borderRadius: 6,
          }}>
            <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.85 }}>
              <p style={{ margin: "0 0 14px" }}>
                These theorems are currently under peer review to determine whether they merit
                inclusion in the existing canon of impossibility theorems in economics and social
                choice theory.
              </p>
              <p style={{ margin: "0 0 14px" }}>
                The author recognizes that extending the impossibility framework beyond social science
                is a significant claim. The theorems are presented here in the spirit of open scholarly
                inquiry, with the expectation that the academic community will evaluate them on their
                merits: the defensibility of the axioms, the validity of the proofs, and the significance
                of the impossibilities they identify.
              </p>

              <p style={{ margin: "0 0 14px", fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, textTransform: "uppercase" }}>
                A Note on the 39 Intractability Theorems
              </p>
              <p style={{ margin: "0 0 14px" }}>
                A natural question arises: if the 39 intractability domains have a theoretical escape &mdash;
                a proven policy solution demonstrated by at least one country &mdash; why present them
                in the formal architecture of an impossibility theorem?
              </p>
              <p style={{ margin: "0 0 14px" }}>
                The answer is that the escape route has been sealed off. Regulatory capture, institutional
                lock-in, jurisdictional fragmentation, lobbying, and revolving-door dynamics &mdash;
                most acutely in the United States &mdash; have rendered the theoretical solution practically
                unreachable for the populations that bear the welfare cost. The formal impossibility
                structure is not a rhetorical flourish. It is the correct analytical tool: by proving
                that no mechanism can simultaneously satisfy necessity, identity, and reversibility under
                the prevailing institutional constraints, the theorem reveals <em>why</em> the escape is
                so difficult and the problem so deeply intractable.
              </p>
              <p style={{ margin: "0 0 14px" }}>
                Only by understanding the depth of the structural lock-in &mdash; the precise axioms that
                bind, the specific mechanisms that fail &mdash; can reformers identify what must change
                and build the political coalition to change it. The Nordic countries, Chile, Estonia, Japan,
                and Australia did not overcome intractability by accident. They overcame it by understanding
                the impossibility architecture they were operating within and dismantling the binding
                constraint. The formal framework is the map.
              </p>

              <p style={{ margin: 0 }}>
                If the axioms are wrong, the theorems fall. That is as it should be. An impossibility
                theorem is only as strong as its weakest axiom &mdash; and the author invites scrutiny
                of every one.
              </p>
            </div>
          </div>
        </Section>

        {/* ── WHY THE PAPERS WERE RELEASED TOGETHER ── */}
        <Section label="A NOTE ON RELEASE TIMING">
          <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.85 }}>
            <p style={{ margin: "0 0 14px" }}>
              The seventy-five papers were released as a single corpus. They were not released as they
              were drafted, and the reason is methodological rather than rhetorical.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              The program is interconnected by design. The Private Pareto Theorem requires an empirical
              panel to test its range of application. The market-failure domain papers require a shared
              welfare-beta methodology so that their results can be compared. The foundational theory
              papers &mdash; the Reform Dividend, the Fiscal Capture Theorem, Disclosure Futility,
              Postnieks&rsquo;s Law &mdash; depend on the completed empirical panel, because each of them
              makes a claim about the aggregate or about a pattern across the market-failure domains. Writing
              the theory papers before the empirical papers were finished would have required guessing at
              the pattern.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              Releasing the domain papers serially would have introduced methodology drift. Each paper
              went through several revision cycles as the welfare-beta specification was refined,
              revenue-denominated rather than profit-denominated, tested against three distributional
              families, and anchored to a consistent Monte Carlo protocol. When a refinement was adopted,
              it was applied as a batch edit across all 59 market-failure domain papers plus controls. The same was done for the
              Decision Accounting sixteen-field record that appears in every paper. Papers that had
              already been posted under earlier conventions could not have been retrofitted cleanly, and
              a reader comparing a 2024 draft against a 2026 draft would have been comparing across
              different methodological vintages.
            </p>
            <p style={{ margin: 0 }}>
              The consequence is a corpus in which every paper follows the same protocol, every
              welfare-beta is auditable against the same assumptions, and the theory papers rest on the
              finished empirical panel rather than a partial one. The trade-off was a longer silent
              interval before publication in exchange for a corpus that could be evaluated as a whole.
            </p>
          </div>
        </Section>

        {/* ── FOOTER ── */}
        <div style={{
          marginTop: 40, paddingTop: 20,
          borderTop: `1px solid ${BORDER}`,
          fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1,
        }}>
          &copy; 2026 Erik Postnieks &middot; System Asset Pricing Model Research Program
        </div>
      </div>
    </div>
  );
}
