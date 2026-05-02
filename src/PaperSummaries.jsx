"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { buildPaperList as _buildPaperList, getTheoremType, CANONICAL_BETA, FRAMEWORK_PAPERS, OTHER_PAPERS } from "./paperData";
import DOMAINS from "./data/domains";
import { GENERATED_CONTENT } from "./generatedPaperContent";

// ══════════════════════════════════════════════════════════════
// PAPER SUMMARIES — College-Level Summaries of the Ranked Corpus
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
const MUTED = "#C8C8C8";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "#C8C8C8";
const PERSONAL_VOICE_SLUGS = new Set(["hollow-win", "da-1", "ppt", "ppt-long-form"]);

function getTheoremBadgeColor(type) {
  if (type === "Impossibility") return RED;
  if (type === "Intractability") return GOLD;
  if (type === "Foundational") return CYAN;
  return MUTED;
}

// CANONICAL_BETA, FRAMEWORK_PAPERS, OTHER_PAPERS, getTheoremType imported from ./paperData

// ─── SUBSTANTIVE CONTENT FOR TOP 10 PAPERS ────────────────────
export const PAPER_CONTENT = {
  firearms: {
    keyFindings: [
      "The firearms industry generates $509.9 billion in annual welfare destruction against $10 billion in revenue, producing the highest βW (50.99) of any domain in the System Asset Pricing Model canon.",
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
      investor: "Firearms manufacturers (Smith & Wesson/SWBI, Sturm Ruger/RGR, Vista Outdoor) face environmental, social, and governance exclusion from major index funds. BlackRock, Vanguard, and State Street all offer firearms-free fund options. Portfolio exposure is concentrated in small-cap consumer discretionary. The reputational risk exceeds the market capitalization of the entire publicly traded firearms sector ($8B combined).",
      supranational: "The UN Arms Trade Treaty (ATT) regulates international arms transfers but the United States has not ratified it. The Small Arms Survey tracks global firearms flows. Cross-border trafficking (US to Mexico, Eastern Europe to conflict zones) creates welfare spillovers that no single jurisdiction can address. INTERPOL's iARMS database tracks illicit firearms but participation is voluntary.",
    },
    faq: [
      { q: "Why is the firearms βW so much higher than any other domain?", a: "Because the denominator (Π = $10B annual revenue) is small relative to the welfare destruction ($509.9B). Firearms is a low-revenue, high-destruction industry. The $10B figure captures domestic firearms and ammunition sales. The $509.9B captures medical costs, lost productivity, criminal justice costs, employer costs, and quality-of-life losses. The ratio is 51:1." },
      { q: "Does the Second Amendment make reform impossible?", a: "The theorem says reform within the current constitutional framework cannot reduce βW below 3.0. That floor is set by the Constitutional Ratchet. But constitutional amendments are possible — the 18th and 21st Amendments prove it. Australia's 1996 reform required no constitutional change because firearms were never constitutionally entrenched. The impossibility is institutional, not physical." },
      { q: "What would a post-reform βW look like?", a: "Australia's post-Port Arthur βW is approximately 2.1. Japan's is below 0.5. The UK's is approximately 1.8. These are achievable endpoints — but only after removing constitutional entrenchment, PLCAA immunity, and Dickey Amendment suppression. All three peer nations demonstrate that comprehensive reform works." },
      { q: "Why classify firearms as Intractability rather than Impossibility?", a: "The constraint is constitutional/institutional, not physical. The Second Amendment is a legal construct, not a law of nature. It can be amended. Australia proved it. The classification follows the taxonomy: institutional constraints that can be changed given sufficient political will = Intractability. Physical/chemical/biological/informational constraints that no policy can override = Impossibility." },
    ],
  },

  cybercrime: {
    keyFindings: [
      "Cybercrime generates $6.4 trillion in annual welfare destruction against $200 billion in criminal revenue, producing βW = 31.10 — the second-highest in the System Asset Pricing Model canon.",
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
      plaintiff: "Class action litigation following data breaches has expanded significantly since the Supreme Court's standing decisions. Causes of action include negligence, breach of implied contract, state consumer protection violations, and Biometric Information Privacy Act (BIPA) (Illinois). Discovery should target pre-breach security audit reports, board-level risk presentations, and insurance coverage decisions that reveal known-but-unpatched vulnerabilities.",
      regulator: "CISA, FBI (IC3), and SEC share jurisdiction but no single agency has comprehensive enforcement authority. The enforcement gap is most severe for attacks originating from non-cooperative jurisdictions. Mandatory breach reporting (Cyber Incident Reporting for Critical Infrastructure Act (CIRCIA), 2022) addresses the information gap but not the attribution gap. Minimum cybersecurity standards for critical infrastructure remain voluntary in most sectors.",
      legislator: "Federal data privacy legislation remains stalled. The patchwork of state laws (California Consumer Privacy Act (CCPA), New York Department of Financial Services, etc.) creates compliance costs without improving security. Committee jurisdiction: Homeland Security, Intelligence, Commerce. The structural intervention is mandatory minimum security standards tied to liability safe harbors — companies that meet the standard get tort protection; those that do not face strict liability.",
      investor: "Cyber insurance premiums tripled from 2020 to 2023. Companies with material cyber exposure (healthcare, financial services, critical infrastructure) face earnings volatility from breach events. The SEC's cyber disclosure rule creates a new information channel. Portfolio screening should include: days to detect breach, third-party vendor risk score, and board-level cyber oversight structure.",
      supranational: "The Budapest Convention on Cybercrime (2001) has 68 parties but excludes Russia, China, and most of the Global South. The UN Ad Hoc Committee on Cybercrime (2024) produced a treaty that human rights organizations oppose for surveillance provisions. No international framework addresses state-sponsored cybercrime. Mutual Legal Assistance Treaties (MLATs) take 6-24 months — cybercriminals operate in milliseconds.",
    },
    faq: [
      { q: "Why is the Π denominator $200B and not the $6.4T in damages?", a: "Π is the private gain to the perpetrators — criminal revenue. The $6.4T is the welfare cost (ΔW) imposed on victims, including direct losses, remediation costs, business interruption, reputational damage, and regulatory fines. βW = ΔW/Π. The criminals capture $200B while destroying $6.4T — a 31:1 ratio of destruction to gain." },
      { q: "Can AI-powered defense solve the attribution problem?", a: "AI improves detection speed and pattern recognition but does not solve the fundamental attribution problem. The network architecture allows traffic to be routed through non-cooperative jurisdictions. AI can identify that an attack occurred and characterize its methods, but cannot overcome the jurisdictional arbitrage that prevents prosecution." },
      { q: "What would reduce βW?", a: "Three structural interventions: (1) mandatory minimum cybersecurity standards with liability consequences, (2) international law enforcement cooperation treaties that eliminate safe harbors, (3) cryptocurrency regulation that makes ransomware payments traceable. None is sufficient alone. All three together could reduce βW to approximately 10-15." },
    ],
  },

  wmd: {
    keyFindings: [
      "Weapons of Mass Destruction capability diffusion generates $1.9 trillion in annual welfare destruction against $86.4 billion in proliferation-related revenue, producing βW = 21.92.",
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
      whistleblower: "Document dual-use technology transfers that circumvent export controls. The evidence is in end-use certificates that misrepresent the intended application of controlled technology. Universities, research labs, and commercial suppliers handling International Traffic in Arms Regulations-controlled or Export Administration Regulations-controlled items are the primary documentary sources. The A.Q. Khan network was detected through financial transactions, not technical monitoring.",
      plaintiff: "Civil causes of action against companies that facilitate proliferation exist under the Antiterrorism Act (18 USC 2333) and state tort law. Victims of state-sponsored terrorism have recovered billions through FSIA exceptions. Discovery should target export compliance records, know-your-customer documentation for dual-use equipment sales, and internal communications acknowledging proliferation risk.",
      regulator: "The Bureau of Industry and Security (BIS), Nuclear Regulatory Commission (NRC), and State Department (Directorate of Defense Trade Controls) share export control jurisdiction. The enforcement gap is in dual-use technology — items with legitimate commercial applications that also enable weapons development. AI chips, gene synthesis equipment, and advanced materials all fall in this gap. End-use monitoring is resource-constrained.",
      legislator: "The Export Control Reform Act (2018) modernized the framework but enforcement resources have not kept pace with dual-use technology proliferation. Committee jurisdiction: Armed Services, Foreign Affairs, Intelligence. The structural intervention is mandatory AI-assisted screening of all dual-use exports, funded through export license fees rather than discretionary appropriations.",
      investor: "Defense contractors (Lockheed Martin, Raytheon, Northrop Grumman) and dual-use technology companies face proliferation compliance risk. International Traffic in Arms Regulations violations carry penalties up to $500,000 per violation and debarment. environmental, social, and governance screening should include: export control compliance history, dual-use technology revenue share, and board-level proliferation oversight. The financial exposure from a single International Traffic in Arms Regulations violation can exceed annual profit.",
      supranational: "The Nuclear Non-Proliferation Treaty (NPT), Chemical Weapons Convention (CWC), Biological Weapons Convention (BWC), and Missile Technology Control Regime (MTCR) provide the treaty architecture. The NPT has three non-signatories with nuclear weapons (India, Pakistan, Israel) and one withdrawal (North Korea). No binding international treaty addresses Lethal Autonomous Weapons Systems. The Group of Governmental Experts (GGE) process has produced 11 guiding principles but no regulation.",
    },
    faq: [
      { q: "Why is the 90% CI so wide ([13.80, 36.60])?", a: "Weapons of Mass Destruction welfare costs are dominated by low-probability, high-consequence scenarios. The expected annual cost includes the probability-weighted cost of a nuclear detonation, which has enormous uncertainty. The CI width reflects genuine uncertainty about deterrence stability, not measurement imprecision." },
      { q: "Does the NPT work?", a: "The NPT prevented the 'President Kennedy scenario' of 25+ nuclear states by 2000. But it has not prevented all proliferation (India, Pakistan, North Korea, Israel). The treaty architecture slows the ratchet but cannot reverse it. Each new nuclear state demonstrates that the cost of proliferation is bearable." },
      { q: "How does Lethal Autonomous Weapons Systems proliferation differ from nuclear proliferation?", a: "Nuclear weapons require enriched fissile material — a physical bottleneck. Lethal Autonomous Weapons Systems require software and commercially available drones — no physical bottleneck exists. The proliferation timeline for nuclear weapons was decades. For Lethal Autonomous Weapons Systems, it is months to years. The Kargu-2 used off-the-shelf components. The barrier is not technology; it is the decision to deploy." },
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
      investor: "Pharmaceutical companies with opioid exposure face $50B+ in settlement liability. Distributors (McKesson, Cardinal, AmerisourceBergen) face ongoing litigation. Pharmacy Benefit Managers with opioid formulary exposure are the next target. Portfolio screening should include: opioid revenue as percentage of total, litigation reserve adequacy, and suspicious order monitoring program quality.",
      supranational: "The UN Single Convention on Narcotic Drugs (1961) and WHO Essential Medicines List govern international opioid access. The paradox: 80% of the world's population has inadequate access to pain management while the US has catastrophic over-access. The International Narcotics Control Board (INCB) monitors but cannot enforce. Fentanyl precursor chemical controls require cooperation from China and India.",
    },
    faq: [
      { q: "Why did restricting prescriptions increase deaths?", a: "Dependence is pharmacological, not behavioral. When prescription access was restricted after 2012, 2.5 million Americans with opioid use disorder did not stop using opioids — they switched to heroin and then fentanyl. Fentanyl is 50-100x more potent than morphine and has no quality control. The per-dose mortality rate of illicit fentanyl is approximately 20x higher than prescription opioids." },
      { q: "What is the proven solution?", a: "Portugal decriminalized drug possession in 2001 and invested heavily in treatment infrastructure. Drug-related deaths fell 85% over 15 years. Switzerland's heroin-assisted treatment program reduced crime by 60% and increased employment among participants by 40%. The proven model is treatment-on-demand with harm reduction, not supply restriction." },
      { q: "How much did the Sackler family personally benefit?", a: "The Sackler family extracted $10.7 billion from Purdue Pharma between 2007 and 2018 through dividends, transfers, and trust distributions. The bankruptcy settlement required $6 billion in restitution — $4.7 billion less than the extraction. The family retained billions in offshore trusts. The settlement included civil liability releases for individual family members." },
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
      investor: "CoreCivic (CXW) and GEO Group (GEO) converted to REITs to avoid corporate income tax. Both face environmental, social, and governance exclusion from major institutional investors. JPMorgan Chase, Wells Fargo, Bank of America, and Goldman Sachs have all divested from private prison financing. The business model is under existential threat from state-level bans and federal contract restrictions.",
      supranational: "The Nelson Mandela Rules (UN Standard Minimum Rules for the Treatment of Prisoners, revised 2015) establish global standards. The UN Special Rapporteur on Torture has flagged conditions in US private prisons. No international treaty specifically addresses private incarceration, but the ICCPR (Article 10) requires humane treatment of detained persons. The US is exceptional among democracies in the scale of its private prison system.",
    },
    faq: [
      { q: "Why is the βW so high relative to the revenue?", a: "Private prison revenue is $8B, but the total cost of mass incarceration that private prisons incentivize is far larger. The welfare cost includes: direct incarceration costs beyond private payments ($30B), lost earnings of incarcerated individuals ($35B), family welfare costs ($15B), reentry barriers ($10B), and community destabilization ($6.7B). Private prisons are the profit center of a much larger system of welfare destruction." },
      { q: "Does ending private prisons solve mass incarceration?", a: "Private prisons hold only 8% of state and federal inmates. Ending private prisons addresses the incentive misalignment but not the scale of incarceration. Sentencing reform, drug decriminalization, and investment in alternatives to incarceration are the structural interventions. Private prison abolition removes a powerful lobby against those reforms." },
      { q: "What about immigration detention?", a: "ICE detention is 75%+ privatized. Immigration detention contracts are the fastest-growing segment for CoreCivic and GEO Group. Federal private prison restrictions have not affected immigration detention. The same incentive misalignment applies: more detainees means more revenue." },
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
      plaintiff: "Causes of action include Clean Water Act citizen suits, Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) cost recovery, state environmental statutes, and tort claims for property damage and personal injury. The Brumadinho collapse resulted in $7 billion in settlements and criminal charges. Discovery should target geotechnical monitoring data, tailings dam stability assessments, and internal communications about known environmental risks.",
      regulator: "EPA (Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA), CWA), BLM (federal lands), state environmental agencies, and MSHA (safety) share jurisdiction. The enforcement gap: mining operations on federal land pay royalties set in 1872 (General Mining Law) with no inflation adjustment. Hardrock mining has no federal reclamation bonding requirement comparable to coal. Abandoned mines number 500,000+ in the US alone with cleanup costs exceeding $50 billion.",
      legislator: "The Mining Law of 1872 remains the governing federal statute — unchanged for 154 years. The Hardrock Mining and Reclamation Act has been introduced and failed repeatedly. Committee jurisdiction: Energy and Natural Resources, Natural Resources. The structural intervention is modernizing the 1872 Mining Law with: fair royalties, mandatory reclamation bonding, and environmental performance standards.",
      investor: "Mining companies face increasing environmental, social, and governance scrutiny and tailings dam liability. The Global Industry Standard on Tailings Management (2020) was created after Brumadinho but adoption is voluntary. Companies with high-risk tailings facilities (rated by the Church of England Investor Mining & Tailings Safety Initiative) face stranded asset risk. Portfolio screening should include: tailings facility risk rating, reclamation bonding adequacy, and water quality compliance history.",
      supranational: "The Minamata Convention (mercury), Basel Convention (hazardous waste), and EITI (Extractive Industries Transparency Initiative) provide partial international frameworks. No binding international standard governs rare earth processing waste or tailings dam safety. The International Council on Mining and Metals (ICMM) is industry-led and voluntary. The gap is binding international regulation of processing waste, particularly radioactive waste from rare earth refining.",
    },
    faq: [
      { q: "Why is the 90% CI so wide ([4.50, 14.80])?", a: "Mining welfare costs vary enormously by deposit type, extraction method, regulatory regime, and waste management practice. A well-regulated Australian operation has βW around 4-5. An unregulated artisanal mine in the DRC has βW above 15. The wide CI reflects genuine variation in practices, not measurement imprecision." },
      { q: "Can recycling eliminate the need for new extraction?", a: "Urban mining (recycling electronics for rare earths) currently supplies less than 1% of demand. Recycling rates for rare earths are below 5% globally because collection infrastructure does not exist and separation chemistry is expensive. Recycling will reduce but cannot eliminate extraction demand within any foreseeable technology horizon." },
      { q: "What about deep-sea mining as an alternative?", a: "Deep-sea mining replaces terrestrial environmental destruction with abyssal environmental destruction. The welfare cost shifts from land ecosystems to marine ecosystems. The Abyssal Recovery Floor theorem (System Asset Pricing Model Paper #8) proves that deep-sea mining has its own irreducible βW. Substituting one extraction frontier for another does not solve the problem — it relocates it." },
    ],
  },

  "human-trafficking": {
    epigraph: "Demand that cannot be destroyed creates supply that cannot be regulated.",
    keyFindings: [
      "Each dollar of trafficking profit destroys $22.62 in system welfare — the third-highest βW in the System Asset Pricing Model canon.",
      "Total system welfare cost: $5.34 trillion per year, exceeding Japan's entire GDP.",
      "Enforcement ratio of 1:1,966 — for every dollar spent on anti-trafficking enforcement, traffickers generate $1,966 in illicit revenue.",
      "80% re-trafficking rate among rescued victims absent institutional intervention. The rescue without the institution is theater.",
      "Six transmission channels: direct victim welfare destruction, labor market distortion, governance corrosion, supply chain contamination, intergenerational capital loss, enforcement resource diversion.",
    ],
    theorem: {
      formal: "Under Demand Persistence (A1), Victim Vulnerability (A2), and Enforcement Asymmetry (A3): no voluntary market mechanism, Pigouvian tax, or Coasean bargain can reduce the exploitation premium below a positive floor.",
      plain: "Standard economics records human trafficking as sectoral profit. This paper prices it as system welfare destruction. For every dollar traffickers steal, the system absorbs $22.62 in welfare cost through destroyed human capital, institutional corruption, and enforcement failure. The structural impossibility theorem proves no market fix works without redesigning the institutions that sustain the trade.",
    },
    mcResults: { beta: 22.62, ci: "[17.80, 27.50]", dw: 5338.1, pi: 236.0 },
    agents: {
      whistleblower: "Document the gap between reported anti-trafficking expenditure and actual victim outcomes. The supply chain audit industry generates $2.1B in compliance revenue while intercepting fewer than 0.1% of trafficking victims. The paper trail runs through corporate social responsibility reports that describe audits never conducted.",
      plaintiff: "Trafficking Victims Protection Act (TVPA) provides civil causes of action. Forced labor claims under 18 U.S.C. § 1589 have survived summary judgment against hotel chains, agricultural operations, and diplomatic employers. Discovery targets recruitment fee structures and labor broker contracts.",
      regulator: "DHS, DOJ, and DOL share jurisdiction with no single coordinating authority. State-level enforcement varies by orders of magnitude. California's Transparency in Supply Chains Act requires disclosure but not action. The enforcement gap is structural, not budgetary.",
      legislator: "Committee jurisdiction: Judiciary (Senate), Foreign Affairs (House). The TVPA reauthorization cycle creates recurring legislative windows. Corporate supply chain due diligence mandates (EU model) are the structural intervention.",
      investor: "environmental, social, and governance screening for forced labor exposure is expanding but relies on self-reported supplier audits with documented 45%+ failure rates. Portfolio risk concentrates in agriculture, construction, hospitality, and electronics manufacturing.",
      supranational: "The Palermo Protocol (2000) has 190 parties but no enforcement mechanism. ILO conventions set standards without coercive power. The structural gap: no international institution has authority to sanction governments that profit from trafficking.",
    },
    faq: [
      { q: "Why is βW so high relative to other domains?", a: "Because the denominator (Π = $236B in criminal revenue) understates the true extraction — traffickers capture labor value far below market rates — while the numerator (ΔW = $5.34T) captures the full human capital destruction, governance corruption, and intergenerational damage that standard accounting ignores." },
      { q: "Can technology solve the enforcement gap?", a: "Technology improves detection but cannot solve the jurisdictional arbitrage. Traffickers operate across borders that law enforcement cannot cross without bilateral cooperation. AI-powered detection identifies ~15% more cases but prosecution rates remain below 1% because the institutional architecture — not the information — is the binding constraint." },
    ],
  },

  "child-labor": {
    epigraph: "The cheapest hands on Earth belong to the smallest bodies.",
    keyFindings: [
      "Each dollar of revenue associated with child labor destroys $21.83 in system welfare — fifth-highest in the System Asset Pricing Model canon.",
      "160 million children at risk; $381–537B per year in human capital destruction via foregone education alone (9–10% returns per lost school-year).",
      "Elimination requires 11× acceleration of current eradication speed; at current rates, the crossover time T* stretches to 2045–2060.",
      "System-adjusted payoff is deeply negative: −$701B to −$967B annually.",
    ],
    theorem: {
      formal: "Under Poverty Trap (A1: subsistence threshold), Supply Chain Opacity (A2: ≥45% audit failure), and Enforcement Deficit (A3: ILO lacks coercive power): no voluntary governance regime can reduce βW below a critical floor.",
      plain: "Child labor locks families into subsistence, making the next child's labor the only rational choice. When 160 million children are subject to this lock, their cumulative human capital destruction exceeds $500 billion per year. The private gain to extractors is dwarfed by the welfare cost to the children, their families, and the systems that fail to protect them.",
    },
    mcResults: { beta: 21.83, ci: "[18.80, 24.80]", dw: 862.2, pi: 39.5 },
    agents: {
      whistleblower: "Document the gap between corporate audit reports and actual factory-floor conditions. Audit firms conducting 4-hour inspections of facilities employing children in night shifts miss what 72-hour unannounced visits reveal. The evidence is in worker age verification records and school enrollment cross-references.",
      plaintiff: "Alien Tort Statute and state consumer protection laws provide causes of action. Nestlé v. Doe (2021) narrowed federal jurisdiction but state-level claims survive. Discovery targets supplier audit reports, corrective action plans never implemented, and internal communications acknowledging known violations.",
      regulator: "DOL, CBP (Withhold Release Orders), and state labor agencies share jurisdiction. The Uyghur Forced Labor Prevention Act (2021) creates a rebuttable presumption for Xinjiang goods. WROs have been issued against specific suppliers but cover less than 2% of at-risk supply chains.",
      legislator: "Committee jurisdiction: Education and Labor (House), HELP (Senate). The structural intervention is mandatory supply chain due diligence with liability (EU CSDDD model). Current voluntary frameworks (UN Guiding Principles) lack enforcement teeth.",
      investor: "Child labor exposure concentrates in cocoa ($130B), palm oil ($68B), cobalt ($15B), and garment ($1.5T) supply chains. No major index provider screens for child labor below Tier 1 suppliers. The reputational risk exceeds the compliance cost by 12:1.",
      supranational: "ILO Convention 182 (worst forms) has universal ratification but no enforcement mechanism. The Durban Call to Action (2022) set a 2025 target already missed. No international institution has authority to impose trade sanctions for child labor violations.",
    },
    faq: [
      { q: "Why can't supply chain audits solve this?", a: "Because the audit industry is structurally compromised. Auditors are paid by the companies they audit (the same issuer-pays conflict as credit rating agencies). Announced audits allow factories to hide child workers. Even unannounced audits miss home-based and agricultural child labor, which accounts for 70% of the total." },
      { q: "Does economic growth eliminate child labor automatically?", a: "Partially. Rising GDP reduces child labor incidence — but the relationship plateaus around $5,000 GDP per capita. Above that threshold, institutional quality (enforcement, education access, social protection) matters more than income growth. Brazil reduced child labor 65% through Bolsa Família conditional cash transfers, not GDP growth alone." },
    ],
  },

  "conflict-minerals": {
    epigraph: "The mineral is fungible. The blood is not.",
    keyFindings: [
      "Each dollar of revenue from conflict minerals generates $12.60 in system welfare destruction — roughly 10× the DRC's entire GDP.",
      "143% infant mortality increase from Dodd-Frank §1502 de facto embargo, demonstrating regulatory intervention can amplify rather than reduce welfare beta.",
      "97% certification failure rate under Dodd-Frank — companies could not determine whether minerals financed armed groups.",
      "μ* = 0.31: redirecting 31 cents of every dollar of revenue into institutional capacity would theoretically drive welfare beta to unity. Current reinvestment: ~2 cents.",
    ],
    theorem: {
      formal: "Under Geological Concentration (A1), Demand Inelasticity (A2), and Governance Vacuum (A3): no Coasean bargain, Pigouvian tax, or voluntary certification scheme can simultaneously achieve conflict-free sourcing, artisanal livelihood preservation, and supply-chain continuity.",
      plain: "You cannot distinguish blood-funded cobalt from ethically sourced cobalt after it enters the supply chain. Either sourcing becomes expensive (breaking supply chain), sourcing stays cheap (sustaining armed groups), or both simultaneously. The welfare cost of the system's inability to solve this three-way impossibility is $255 billion per year.",
    },
    mcResults: { beta: 12.60, ci: "[9.20, 16.00]", dw: 255.7, pi: 20.3 },
    agents: {
      whistleblower: "Document the gap between smelter certification (RMAP) and actual mineral sourcing. Tagged-bag systems can be defeated by re-bagging at any transit point. The evidence is in export tonnage discrepancies between mine-site records and border crossing data.",
      plaintiff: "Dodd-Frank §1502 disclosure requirements create information for securities fraud claims when companies misrepresent conflict-mineral status. State consumer protection statutes provide additional causes of action for deceptive marketing of 'conflict-free' products.",
      regulator: "SEC (disclosure), Office of Foreign Assets Control (sanctions), CBP (import controls) share jurisdiction. The enforcement gap: smelter audits cover 80% of global tin and tantalum but less than 50% of cobalt. No regulator can trace minerals through Chinese processing facilities.",
      legislator: "Committee jurisdiction: Financial Services (House), Banking (Senate). The EU Conflict Minerals Regulation (2021) provides a stronger model than Dodd-Frank — mandatory due diligence rather than disclosure-only.",
      investor: "Cobalt exposure concentrates in EV battery supply chains. Apple, Samsung, and Tesla face reputational risk from artisanal mining sourcing. Portfolio screening should target: smelter audit coverage, DRC sourcing percentage, and blockchain traceability adoption.",
      supranational: "The OECD Due Diligence Guidance is the de facto international standard but voluntary. The Kimberley Process (diamonds) demonstrates both the potential and limitations of certification schemes — it reduced conflict diamond share from 15% to <1% but failed to prevent human rights abuses in certified mines.",
    },
    faq: [
      { q: "Did Dodd-Frank §1502 work?", a: "It revealed the problem but worsened the outcome. The de facto embargo on DRC minerals increased infant mortality by 143% in mining communities as livelihoods collapsed. The regulation treated the symptom (financing armed groups) without addressing the cause (governance vacuum). The welfare cost increased post-regulation." },
    ],
  },

  "credit-ratings": {
    epigraph: "The issuer pays for the rating. The rating pays for the issuer.",
    keyFindings: [
      "Each dollar of private ratings revenue destroys $11.21 in system welfare on global capital markets.",
      "Rating inflation pre-crisis inflated AAA CDO tranches by 12.1% on average, producing $86.2B in mispricing across 916 sampled CDOs.",
      "Developing nations pay a 77 basis point 'prejudice premium' over identically-rated developed peers, costing Africa $75B annually in excess interest.",
      "Big Three (S&P, Moody's, Fitch) retain 94–96% market share post-2008 reforms. The oligopoly survived the crisis it caused.",
    ],
    theorem: {
      formal: "No institutional arrangement simultaneously satisfying Issuer-Pays Revenue (A1), Oligopolistic Market Structure (A2: ≥90% concentration), and Regulatory Entrenchment (A3) can achieve βW ≤ 1.0.",
      plain: "Three unelected corporations price global debt. They are paid by the borrower, creating an irreconcilable conflict: rate accurately (lose the fee) or rate generously (keep the fee). The issuer-pays model is baked into regulatory frameworks globally, making change structurally impossible within current institutional boundaries.",
    },
    mcResults: { beta: 11.21, ci: "[9.70, 12.70]", dw: 123.3, pi: 11.0 },
    agents: {
      whistleblower: "Document the internal pressure to maintain ratings on deteriorating credits. Pre-2008 emails revealed analysts writing 'we rate every deal — it could be structured by cows and we would rate it.' Similar pressures persist in CLO and sovereign ratings. The evidence is in rating committee minutes and analyst turnover data.",
      plaintiff: "Calpers v. Moody's established that ratings agencies can be held liable for fraud. Discovery should target: internal models vs. published ratings divergence, revenue-per-client concentration, and analyst compensation tied to deal flow.",
      regulator: "SEC (Nationally Recognized Statistical Rating Organization designation), OCC, Federal Reserve share jurisdiction. The structural intervention: remove Nationally Recognized Statistical Rating Organization references from prudential regulation (partially done under Dodd-Frank §939A, but implementation stalled). EU CRA Regulation III provides a stronger model.",
      legislator: "Committee jurisdiction: Banking (Senate), Financial Services (House). The structural reform is mandatory rotation (EU model), subscriber-pays alternatives, and public-utility rating infrastructure for sovereign debt.",
      investor: "Portfolio risk concentrates in structured products where ratings drive regulatory capital treatment. The ratings cliff — mass downgrades triggering forced selling — creates systemic fragility. Monitor: rating transition matrices, notching practices, and lag between credit deterioration and downgrade.",
      supranational: "FSB and International Organization of Securities Commissions (IOSCO) set international standards but cannot override domestic Nationally Recognized Statistical Rating Organization frameworks. The EU's push for a European Credit Rating Agency failed. No international institution can break the Big Three oligopoly because ratings are embedded in Basel III capital requirements.",
    },
    faq: [
      { q: "Why didn't post-2008 reforms fix the problem?", a: "Because the reforms addressed symptoms (disclosure, conflict-of-interest policies) without changing the structural incentive (issuer-pays). The Big Three retained 94–96% market share. Dodd-Frank §939A directed regulators to remove ratings references, but most agencies haven't complied. The architecture survived intact." },
    ],
  },

  big_tech: {
    epigraph: "The acquisition that kills the competitor is the one the market celebrates.",
    keyFindings: [
      "Each dollar of monopoly rent revenue ($128B/yr) destroys approximately $7.81 of system welfare.",
      "Kill zone suppresses venture capital investment by 46% in adjacent sectors; median acquisition time from nascent competitor to absorbed subsidiary is 2.3 years.",
      "Five gatekeepers collectively generate $1.78T in annual revenue; control 90%+ of search, 75% of social media advertising, 99% of mobile app distribution.",
      "$158B in annual monopoly rent protected by $277M lobbying investment — a 570:1 return on political capital.",
    ],
    theorem: {
      formal: "Under Network Effect Dominance (A1), Zero-Price Consumer Lock-in (A2), and Data Feedback Supremacy (A3): no market mechanism can reduce βW below approximately 2.8 through private action alone.",
      plain: "Each user's data becomes collateral for the next acquisition, each acquisition eliminates the next potential competitor, and each elimination raises the cost of the next startup. The ratchet tightens over time. Structural remedies (βW ≈ 3.0) dominate behavioral settlements (βW > 10).",
    },
    mcResults: { beta: 7.81, ci: "[6.00, 9.60]", dw: 999.6, pi: 128.0 },
    agents: {
      whistleblower: "Document internal kill-zone strategies — acquisition memos that evaluate targets not by synergy value but by competitive threat eliminated. Facebook's 'lockdown' memo and Google's internal competition assessments provide the template. The evidence is in M&A committee minutes and competitive intelligence reports.",
      plaintiff: "Sherman Act §2 (monopolization), Clayton Act §7 (anticompetitive mergers), state consumer protection. DOJ v. Google (2024) and FTC v. Meta (2024) establish current litigation paths. Discovery targets: internal market definition documents, self-preferencing algorithms, and API restriction decisions.",
      regulator: "FTC, DOJ Antitrust Division, and EU DG COMP share jurisdiction. The EU Digital Markets Act (2024) provides the strongest current framework — ex ante obligations on gatekeepers with structural remedy authority. The enforcement gap: US antitrust relies on ex post litigation taking 5–10 years.",
      legislator: "Committee jurisdiction: Judiciary (Senate and House), Commerce. The American Innovation and Choice Online Act would ban self-preferencing. The Open App Markets Act would end app store monopolies. Neither has passed. The structural intervention is interoperability mandates.",
      investor: "FAANG concentration risk: five companies represent 25%+ of S&P 500 market cap. Antitrust remedies (structural separation, interoperability mandates) would reduce monopoly rents but may increase competition-driven innovation returns. Monitor: regulatory proceedings, consent decree compliance, and market concentration indices.",
      supranational: "EU Digital Markets Act is the global template. Japan, South Korea, India, and Brazil are implementing similar frameworks. No binding international antitrust framework exists. The gap: cross-border enforcement coordination for platforms operating in 190+ jurisdictions.",
    },
    faq: [
      { q: "Is breaking up Big Tech the right remedy?", a: "Structural separation (breaking up) reduces βW to approximately 3.0. Behavioral remedies (consent decrees, monitoring) historically fail — βW remains above 10 because the incentive structure is unchanged. The System Asset Pricing Model analysis favors structural remedies on welfare grounds, consistent with the AT&T precedent." },
    ],
  },

  cre: {
    epigraph: "Every empty floor accelerates the emptying of the next.",
    keyFindings: [
      "Each dollar of private Commercial Real Estate payoff imposes $7.78 in system welfare destruction.",
      "1,871 banks exceed the 300% Commercial Real Estate-to-equity regulatory threshold; 44% of office loans are in negative equity.",
      "$384 billion in Commercial Real Estate loans extended into 2025 via 'extend and pretend' — deferring, not eliminating, $80–160B in projected losses.",
      "Break-even mitigation rate μ* = 0.12: internalizing just 12% of system welfare costs would eliminate the private extraction surplus.",
    ],
    theorem: {
      formal: "No impossibility theorem — institutional Private-Systemic Tension. Every welfare-destroying channel operates through remediable institutional arrangements: forbearance norms, tax code provisions, zoning capture, assessment lag structures.",
      plain: "Remote work destroyed $557B in office asset value, but the financial system pretends the losses don't exist through forbearance and loan deferrals. Every month a building sits empty makes the next adjacent building's vacancy more likely. The doom loop is institutional, not physical — and therefore fixable.",
    },
    mcResults: { beta: 7.78, ci: "[6.50, 9.10]", dw: 101.1, pi: 13.0 },
    agents: {
      whistleblower: "Document extend-and-pretend practices at regional banks. Loan officers extending maturity dates on underwater Commercial Real Estate loans to avoid loss recognition. The evidence is in call reports showing declining Commercial Real Estate collateral values with stable reported loan quality ratings.",
      plaintiff: "Securities fraud claims against REITs that misstate occupancy projections. Shareholder derivative actions against boards approving dividend payments from entities with negative tangible book value. Discovery targets: internal property valuations vs. reported values.",
      regulator: "OCC, FDIC, Federal Reserve (bank supervision), SEC (REIT disclosure). The enforcement gap: supervisory forbearance allows banks to delay loss recognition for 2–3 years, converting a manageable correction into a systemic risk.",
      legislator: "Committee jurisdiction: Banking (Senate), Financial Services (House). The structural intervention: mandatory mark-to-market for Commercial Real Estate collateral, conversion-friendly zoning reform, and adaptive reuse tax credits.",
      investor: "Regional bank exposure: 67% of Commercial Real Estate loans are held by banks with <$100B in assets. Portfolio screening should target: Commercial Real Estate-to-equity ratios, maturity wall concentration, and geographic exposure to high-vacancy metros (SF, NYC, Chicago, DC).",
      supranational: "Basel III Commercial Real Estate risk weights apply globally but national supervisors exercise discretion in implementation. No international framework addresses the office-to-residential conversion opportunity. The gap is zoning reform, which is purely local.",
    },
    faq: [
      { q: "Is this a banking crisis in waiting?", a: "Not a 2008-scale crisis because Commercial Real Estate is 13% of bank assets (vs. 35% for residential in 2008), and the losses are concentrated in regional banks rather than systemically important institutions. But 1,871 banks exceeding the 300% Commercial Real Estate-to-equity threshold means significant consolidation is coming." },
    ],
  },

  frontier_ai: {
    epigraph: "The capability scales. The alignment does not.",
    keyFindings: [
      "Each dollar of frontier AI revenue destroys approximately $7.51 of system welfare through the capability-safety gap.",
      "The Oversight Crossover Point (~Q2–Q3 2027) marks when AI reasoning complexity exceeds human real-time supervisory capacity.",
      "Only 2% of AI research addresses safety, while 95%+ of compute investment focuses on capability scaling.",
      "3-month replication lag: open-weight models trail proprietary frontier models by only three months, rendering API-level containment obsolete.",
    ],
    theorem: {
      formal: "Under Capability Competition (A1), Deployment Necessity (A2), and Irreversible Diffusion (A3): no voluntary institutional arrangement can reduce βW below the critical threshold before the Oversight Crossover Point.",
      plain: "Frontier AI companies are caught in a competitive trap: slow safety research, lose market share; accelerate capability scaling, approach an oversight ceiling. The theorem proves no voluntary commitment can close the gap before AI agents reason faster than humans can supervise them in real time.",
    },
    mcResults: { beta: 7.51, ci: "[5.50, 9.40]", dw: 225.0, pi: 30.0 },
    agents: {
      whistleblower: "Document the gap between published safety commitments and internal resource allocation. Labs claiming 20% safety investment while allocating 2% of compute to alignment research. The evidence is in GPU allocation logs, researcher headcount ratios, and internal safety review bypass decisions.",
      plaintiff: "Product liability for AI-generated harms (misinformation, discrimination, autonomous decision failures). Causes of action under state consumer protection statutes for deceptive safety claims. Discovery targets: internal risk assessments, capability evaluations conducted but not published, and red-team findings suppressed.",
      regulator: "No single US agency has comprehensive AI authority. NIST AI RMF is voluntary. EU AI Act (2024) provides the strongest framework with prohibited-use categories and conformity assessments for high-risk systems. The enforcement gap: regulatory capacity cannot keep pace with 3-month capability doubling times.",
      legislator: "Committee jurisdiction: Commerce (Senate), Energy & Commerce (House). The structural intervention: mandatory pre-deployment safety evaluations, compute governance thresholds, and international coordination on frontier model development.",
      investor: "Concentration risk: $300B+ in AI infrastructure investment with uncertain return profiles. The winner-take-all dynamics create portfolio concentration in 3–5 frontier labs. Monitor: safety incident rates, regulatory compliance costs, and compute allocation transparency.",
      supranational: "The Bletchley Declaration (2023) and Seoul AI Safety Summit (2024) established voluntary commitments. No binding international framework exists. The gap: no institution has authority to govern frontier model development across US, China, and EU simultaneously.",
    },
    faq: [
      { q: "Is this the only System Asset Pricing Model domain where the impossibility is currently operative?", a: "Yes. Most impossibility theorems describe constraints that have been binding for decades (Forever Chemicals persistence, nuclear waste). Frontier AI is unique: the impossibility theorem is currently activating and the crossover point has not yet been reached, creating a narrow intervention window." },
    ],
  },

  industrial_ag_methane: {
    epigraph: "Feed the world, warm the world. The calorie and the emission are inseparable.",
    keyFindings: [
      "Each dollar of confinement revenue ($205B/yr) destroys approximately $7.36 of system welfare.",
      "Ruminant methanogenesis is metabolically irreducible — the methane IS the digestion. No feed additive eliminates it.",
      "Seven channels: methane climate, soil degradation, water pollution, antimicrobial resistance, biodiversity loss, market concentration, subsidy capture.",
      "$842 billion in annual agricultural subsidies finance welfare destruction at a 7.36:1 ratio.",
    ],
    theorem: {
      formal: "Under Caloric Density Necessity (A1), Concentrated Confinement Deployment (A2), and Metabolic Non-Suppressibility (A3): no market mechanism can reduce βW below approximately 2.0 through private action alone.",
      plain: "A cow must digest what it eats, and enteric fermentation produces methane. You cannot confine 300 million cattle without amplifying methane's climate impact, concentrating waste into lagoons that poison water, or using antibiotics to prevent confinement-driven disease. The production architecture is the problem.",
    },
    mcResults: { beta: 7.36, ci: "[5.70, 9.00]", dw: 1510.0, pi: 205.0 },
    agents: {
      whistleblower: "Document methane emissions underreporting. EPA's bottom-up inventory systematically undercounts by 50–80% relative to satellite-based top-down measurements. The evidence is in TROPOMI satellite data vs. facility-level self-reports.",
      plaintiff: "Clean Water Act citizen suits for Concentrated Animal Feeding Operation waste discharge. Nuisance claims for odor, water contamination, and property value diminution. Discovery targets: manure management plans, waste lagoon monitoring data, and antibiotic usage records.",
      regulator: "EPA (CWA, CAA), USDA (subsidies), state environmental agencies share jurisdiction. The enforcement gap: CAFOs below the 1,000 animal-unit threshold escape federal permitting entirely. Methane is not a criteria pollutant under the CAA.",
      legislator: "Committee jurisdiction: Agriculture (Senate and House), Environment and Public Works. The structural intervention: methane pricing, subsidy reform (redirect $842B from production incentives to transition support), and Concentrated Animal Feeding Operation permitting reform.",
      investor: "Methane regulation risk concentrates in: Tyson ($53B), JBS ($73B), Cargill (private), and Smithfield/WH Group ($24B). Scope 3 emissions disclosure (SEC Climate Rule, EU CSRD) will force supply chain methane accounting. Portfolio screening: methane intensity per unit protein.",
      supranational: "The Global Methane Pledge (2021) targets 30% reduction by 2030 but is non-binding. FAO governance is captured by agricultural exporters. No international framework prices agricultural methane. The gap: binding methane regulation for livestock.",
    },
    faq: [
      { q: "Can feed additives solve the methane problem?", a: "3-NOP (Bovaer) reduces enteric methane by 20–30% in feedlot conditions but is ineffective for pasture-raised cattle (80% of global herd). Even at maximum efficacy, the residual methane floor exceeds what climate targets require. The additive buys time but does not solve the structural problem." },
    ],
  },

  monoculture: {
    epigraph: "All flesh is grass. The Uniformity Premium measures the grass. The welfare beta measures the flesh.",
    keyFindings: [
      "Each dollar of uniformity revenue ($340B/yr) destroys approximately $7.36 of system welfare.",
      "Pathogen-to-breeding generational asymmetry of 730:1 — pathogens evolve in 6 days; crop breeding takes 12 years.",
      "75% of crop genetic diversity lost since 1900 — option value destruction is irreversible.",
      "Six channels: pesticide dependence, pathogen acceleration, genetic erosion, catastrophic loss, ecosystem services, seed market concentration.",
    ],
    theorem: {
      formal: "Under Yield Maximization Necessity (A1), Industrial-Scale Monoculture Deployment (A2), and Evolutionary Non-Stationarity (A3): no market mechanism can reduce βW below approximately 3.0 through private action alone.",
      plain: "Industrial monoculture breeds crops for yield, not robustness. Pathogens evolve in 6 days. Breeders respond every 12 years. The evolutionary asymmetry guarantees perpetual breakdown of resistance genes. Every effort to solve this through selective breeding produces the next boom-and-bust cycle.",
    },
    mcResults: { beta: 7.36, ci: "[5.43, 10.09]", dw: null, pi: 340.0 },
    agents: {
      whistleblower: "Document the gap between seed company genetic diversity claims and actual varietal uniformity. Four companies control 60%+ of global seed sales. The evidence is in plant variety protection certificates showing declining unique parent lines per commercial variety.",
      plaintiff: "Antitrust claims against seed market concentration (Bayer-Monsanto merger increased HHI above 2,500 in multiple crop segments). Patent misuse claims for GURT (terminator) technology that forces annual seed repurchase. State consumer protection for misleading yield guarantee marketing.",
      regulator: "USDA (APHIS, ARS), EPA (pesticide registration), DOJ (antitrust). The enforcement gap: no regulatory framework prices genetic erosion or catastrophic crop failure risk. The Plant Variety Protection Act incentivizes uniformity, not diversity.",
      legislator: "Committee jurisdiction: Agriculture (Senate and House). The structural intervention: mandatory crop diversity requirements (EU-style), seed bank public funding, and antitrust enforcement against further seed industry consolidation.",
      investor: "Concentration risk in Bayer ($50B crop science), Corteva ($17B), Syngenta/ChemChina ($15B), and BASF ($10B). Climate-driven pest pressure increases stranded asset risk for monoculture-dependent operations. Portfolio screening: varietal diversity index per crop portfolio.",
      supranational: "The International Treaty on Plant Genetic Resources (ITPGRFA) and CBD Nagoya Protocol govern seed access and benefit sharing. The Svalbard Global Seed Vault stores 1.2 million samples but cannot substitute for in-field diversity. The gap: no binding international standard for crop genetic diversity minimums.",
    },
    faq: [
      { q: "Why can't gene editing solve the pathogen asymmetry?", a: "CRISPR can accelerate resistance gene insertion from 12 years to 2–3 years, but pathogen evolution still operates in days. The asymmetry shrinks from 730:1 to ~100:1, which helps but does not eliminate the structural vulnerability. And gene-edited varieties still reduce diversity if they converge on the same resistance mechanisms." },
    ],
  },

  gambling: {
    epigraph: "The house always wins. The state always deals.",
    keyFindings: [
      "Each dollar of predatory extraction premium ($45B/yr) destroys $7.30 in system welfare.",
      "70–90% of sports betting revenue derives from individuals experiencing gambling-related harm; 60% of slot machine revenue from problem gamblers.",
      "Cooperative baseline (recreation without addiction mechanics): $27.8B. Current revenue: $72B. The $45B difference is predatory premium.",
      "Break-even welfare conversion efficiency μ* = 0.16; industry achieves 0.024 — a 6.7× shortfall.",
    ],
    theorem: {
      formal: "No impossibility theorem — institutional Private-Systemic Tension. System welfare cost arises from identifiable institutional failures: regulatory capture ($817M lobbying), state fiscal dependence, and product design that deliberately engineers addiction.",
      plain: "Commercial gambling concentrates losses among problem gamblers, who supply 60–90% of revenue. The cooperative baseline — casinos as pure recreation — would earn $27.8B. The current system extracts $72B. The difference is predatory premium. The system absorbs the cost through suicide, family dissolution, bankruptcy, and regulatory capture.",
    },
    mcResults: { beta: 7.30, ci: "[5.30, 9.30]", dw: 328.5, pi: 45.0 },
    agents: {
      whistleblower: "Document product design features that exploit cognitive biases: near-miss algorithms, losses disguised as wins, variable ratio reinforcement schedules. The evidence is in game mathematics filings, player tracking databases, and internal 'player development' strategies targeting high-loss individuals.",
      plaintiff: "Consumer protection claims for deceptive 'free bet' marketing. Negligence claims for failure to implement self-exclusion programs. Class action for algorithmic manipulation of odds displays. Discovery targets: player tracking data showing company knowledge of problem gambling patterns.",
      regulator: "State gaming commissions, FTC (advertising), CFPB (financial products). The enforcement gap: state gaming commissions are funded by the industry they regulate. No federal gambling regulator exists. Sports betting regulation post-Murphy v. NCAA (2018) is fragmented across 38 states.",
      legislator: "Committee jurisdiction: Commerce (Senate), Energy & Commerce (House). The structural intervention: mandatory loss limits, advertising restrictions (Norway model), and state fiscal decoupling from gambling revenue.",
      investor: "Industry consolidation: Flutter ($30B), DraftKings ($20B), MGM ($14B) dominate. Customer acquisition costs ($300–500/bettor) create pressure to maximize lifetime value through addiction mechanics. Monitor: problem gambling prevalence in operating jurisdictions, advertising-to-revenue ratios.",
      supranational: "No binding international framework. The UK Gambling Commission provides the strongest regulatory model (affordability checks, stake limits, advertising restrictions). Australia's interactive gambling regulatory framework demonstrates that online gambling can be restricted. The gap: cross-border online gambling operates outside any jurisdiction.",
    },
    faq: [
      { q: "Isn't gambling a choice?", a: "The product is designed to compromise choice. Variable ratio reinforcement schedules are the most addictive reward structure in behavioral psychology. When 60% of slot revenue comes from problem gamblers and the machines are engineered to exploit cognitive biases, 'choice' is doing heavy lifting in that sentence." },
    ],
  },

  deforestation: {
    epigraph: "A century to grow. An afternoon to fall. A millennium to return.",
    keyFindings: [
      "Each dollar of revenue from deforestation destroys $7.21 in system welfare — $866 billion per year across six channels.",
      "Indonesia and Brazil account for ~84% of commodity-driven deforestation (geographic concentration κ = 0.84).",
      "System-adjusted payoff: −$746 billion per year. The private profit ($120B) is 14% of the welfare destruction it causes.",
    ],
    theorem: {
      formal: "The Private Pareto Theorem applies: βW > 1 establishes that no voluntary Coasean bargain can achieve Pareto improvement because welfare destruction exceeds private surplus.",
      plain: "Tropical deforestation generates $120 billion annually for private actors while destroying $866 billion in system welfare. The activity is massively welfare-negative at system level; the private profit is only 14% of total welfare destruction.",
    },
    mcResults: { beta: 7.21, ci: "[5.30, 9.10]", dw: 865.5, pi: 120.0 },
    agents: {
      whistleblower: "Document satellite imagery discrepancies between concession boundaries and actual clearing. Companies routinely clear beyond permitted areas. The evidence is in GLAD/RADD forest alert data cross-referenced with concession maps filed with national land registries.",
      plaintiff: "Investor claims under fiduciary duty for companies with deforestation-linked supply chains (palm oil, soy, cattle, timber). The EU Deforestation Regulation (2023) creates new liability for importers. Discovery targets: supplier traceability data, GPS coordinates of sourcing areas, and due diligence gaps.",
      regulator: "National forest agencies, EPA (imports), EU DG Environment share jurisdiction. Brazil's IBAMA demonstrated that enforcement works: deforestation dropped 80% from 2004-2012 under aggressive monitoring and fines, then rebounded when enforcement was defunded.",
      legislator: "Committee jurisdiction: Natural Resources (House), Agriculture (Senate). The EU Deforestation Regulation provides the strongest legislative model. The structural intervention is mandatory deforestation-free supply chain certification with liability.",
      investor: "Deforestation risk concentrates in: JBS ($73B, cattle), Cargill (private, soy/palm), Wilmar ($25B, palm oil). The Investor Policy Dialogue on Deforestation (IPDD) engages companies but voluntary commitments have not reduced clearing rates. Portfolio screening: zero-deforestation commitment coverage, satellite monitoring adoption.",
      supranational: "The Glasgow Leaders' Declaration on Forests and Land Use (2021) committed $19B but deforestation rates increased post-pledge. REDD+ has disbursed $5B over 15 years — less than 1% of the annual welfare cost. No binding international framework prohibits deforestation.",
    },
    faq: [
      { q: "Did Brazil prove deforestation is solvable?", a: "Yes. Brazil reduced Amazon deforestation 80% from 2004-2012 through satellite monitoring (DETER), law enforcement (IBAMA), and credit restrictions (Resolution 3545). Then it defunded enforcement and deforestation rebounded. The technology works. The political will is the variable." },
    ],
  },

  "illicit-drugs": {
    epigraph: "Prohibition does not eliminate the market. It eliminates the market's constraints.",
    keyFindings: [
      "Each dollar of trafficking profit destroys $7.16 in system welfare — $3.58 trillion per year (3.4% of global GDP).",
      "The Prohibition Impossibility Theorem proves enforcement-only policy cannot reduce βW below a floor exceeding 1.0.",
      "Three axioms guarantee failure: inelastic demand, enforcement selecting for potency (fentanyl is prohibition's outcome), and geographic displacement.",
    ],
    theorem: {
      formal: "Under Demand Inelasticity (A1), the Prohibition Paradox (A2: enforcement selects for potency), and Supply Displacement (A3): no enforcement-only policy can reduce βW below a positive floor. Prohibition structurally guarantees system welfare destruction exceeding private gain.",
      plain: "Prohibition creates the conditions for its own failure. Enforcement selects for potency (fentanyl replaces heroin because it's cheaper to smuggle per dose). Demand is inelastic (addiction doesn't respond to price signals). Supply displaces geographically (shut down Colombia, Mexico expands). The three axioms are mutually reinforcing.",
    },
    mcResults: { beta: 7.16, ci: "[5.72, 8.58]", dw: 3579.1, pi: 500.0 },
    agents: {
      whistleblower: "Document the gap between enforcement expenditure and interdiction rates. The US spends $35B/year on drug enforcement while interdicting less than 10% of supply. DEA metrics focus on seizures and arrests rather than market disruption. The evidence is in purity-adjusted price data showing stable or declining street prices despite record seizures.",
      plaintiff: "Opioid manufacturer litigation (Purdue, J&J, distributors) established that supply-side actors can be held liable for downstream harm. Causes of action extend to pharmaceutical companies that manufacture precursor chemicals diverted to illicit production.",
      regulator: "DEA, ONDCP, CBP, and state agencies share jurisdiction. The enforcement gap: the US interdicts approximately 5-10% of cocaine and heroin entering the country. Fentanyl's potency-to-volume ratio makes interdiction exponentially harder. 2mg of fentanyl is a lethal dose.",
      legislator: "Committee jurisdiction: Judiciary (Senate and House), Homeland Security. The structural intervention is demand-side policy: decriminalization of personal use (Portugal model), medication-assisted treatment expansion, and harm reduction infrastructure.",
      investor: "Legitimate pharmaceutical companies face litigation risk from opioid-adjacent liability. Cannabis legalization creates a regulatory arbitrage opportunity. Prison and detention companies (GEO, CoreCivic) are directly exposed to drug enforcement policy shifts.",
      supranational: "The UN Single Convention on Narcotic Drugs (1961) established the prohibition framework. The International Narcotics Control Board (INCB) monitors compliance. Portugal's decriminalization (2001) and Uruguay's cannabis legalization (2013) demonstrate alternatives within international law.",
    },
    faq: [
      { q: "Did Portugal's decriminalization work?", a: "Drug-related deaths fell 80% from 2001-2015. HIV infections among drug users fell 95%. Usage rates remained stable or declined. The Portuguese model redirected enforcement spending to treatment infrastructure. βW under the Portuguese model is estimated at 2.5-3.5, compared to 7.16 under prohibition." },
    ],
  },

  "payday-lending": {
    epigraph: "The loan that solves Friday creates the crisis that requires Monday.",
    keyFindings: [
      "Each dollar of payday lending revenue destroys $7.08 in system welfare — $311.7 billion per year.",
      "The debt trap is the unique stable equilibrium: borrowers trapped in 10+ loan sequences account for $134 billion of total welfare damage.",
      "Racial amplifier: Black/Hispanic borrowers 3× more likely to use payday loans; storefronts 2.4× concentrated in communities of color.",
    ],
    theorem: {
      formal: "Under Liquidity Desperation (A1), APR Structural Necessity (A2), and Regulatory Arbitrage (A3): no equilibrium exists where lending simultaneously preserves borrower welfare, sustains lender profitability, and remains regulatorily enforceable.",
      plain: "Payday lending extracts $44 billion while destroying $312 billion in welfare. The debt trap operates as a poverty ratchet; the structural impossibility is that the business model requires repeat borrowing to be profitable, and repeat borrowing is the mechanism of harm.",
    },
    mcResults: { beta: 7.08, ci: "[5.60, 8.60]", dw: 311.7, pi: 44.0 },
    agents: {
      whistleblower: "Document internal revenue models showing that profitability depends on repeat borrowing. Companies that disclose average loans-per-borrower data reveal the debt trap mechanism. The evidence is in customer-level data showing 80%+ of revenue from borrowers with 7+ loans per year.",
      plaintiff: "State consumer protection statutes, TILA violations, and UDAP claims. The CFPB's payday lending rule (2017, gutted 2020) established that ability-to-repay requirements are legally viable. Class actions targeting fee structures that exceed state usury caps.",
      regulator: "CFPB, state financial regulators, and state attorneys general share jurisdiction. The enforcement gap: online lending and tribal lending entities create regulatory arbitrage that state-by-state rate caps cannot reach.",
      legislator: "Committee jurisdiction: Banking (Senate), Financial Services (House). The structural intervention: federal 36% APR cap (Military Lending Act model extended to all consumers), postal banking alternative, and CFPB ability-to-repay rule restoration.",
      investor: "Payday lending companies face regulatory risk from state-by-state rate cap expansion. 18 states plus DC have effective rate caps that eliminate traditional payday lending. Companies operating in remaining states face diminishing addressable markets.",
      supranational: "No international framework governs consumer lending rates. The EU Consumer Credit Directive sets disclosure requirements but no rate caps. The UK FCA imposed rate caps in 2015, reducing payday lending volume 50% without increasing illegal lending.",
    },
    faq: [
      { q: "Don't people need access to emergency credit?", a: "They need access to affordable credit. Postal banking (available in 50+ countries), credit union emergency loans, and employer-based salary advances all provide the same liquidity function at 5-15% APR instead of 400%. The payday loan is not the only way to solve Friday. It's the most expensive way." },
    ],
  },

  fast_fashion: {
    epigraph: "Clothing has never been cheaper. The planet has never paid more.",
    keyFindings: [
      "Each dollar of fast fashion profit destroys $7.01 in system welfare — $385 billion per year.",
      "The planned disposability model requires continuous conversion of environmental integrity and labor dignity into quarterly earnings.",
      "System efficiency κ = 0.12 — the industry captures 12 cents of value per dollar of system welfare destroyed.",
    ],
    theorem: {
      formal: "No impossibility theorem — institutional Private-Systemic Tension. Every channel is susceptible to institutional redesign: labor standards enforcement, extended producer responsibility, textile waste regulation.",
      plain: "Fast fashion generates $55 billion in private revenue while destroying $385 billion in system welfare across environmental degradation ($152B), labor exploitation ($95B), waste colonialism ($76B), consumer welfare distortion ($38B), and governance capture ($19B). The model is institutional, not physical — and therefore fixable.",
    },
    mcResults: { beta: 7.01, ci: "[5.10, 8.90]", dw: 385.4, pi: 55.0 },
    agents: {
      whistleblower: "Document the gap between supplier codes of conduct and actual factory conditions. Rana Plaza (2013) killed 1,134 workers in a building that brands knew was structurally compromised. The evidence is in audit reports filed and ignored, supplier communications requesting structural repairs denied, and production orders placed after safety warnings.",
      plaintiff: "Wrongful death and negligence claims against brands with supplier oversight obligations. The Bangladesh Accord (now International Accord) created binding safety commitments — violations are actionable. Consumer protection claims for greenwashing sustainability marketing.",
      regulator: "No single US agency regulates fast fashion's environmental impact. The EU Strategy for Sustainable Textiles (2022) and proposed Ecodesign for Sustainable Products Regulation provide the strongest framework. The enforcement gap: textile waste exports to Global South are unregulated.",
      legislator: "Committee jurisdiction: Commerce (Senate), Energy & Commerce (House). The structural intervention: extended producer responsibility for textiles, mandatory minimum garment durability standards, and supply chain transparency requirements.",
      investor: "Fast fashion companies (Shein, H&M, Zara/Inditex) face regulatory risk from EU textile strategy and growing consumer awareness. Shein's IPO valuation ($66B) prices zero regulatory risk. Portfolio screening: supply chain audit depth, waste per garment sold, and EPR compliance readiness.",
      supranational: "The UNEP Fashion Industry Charter for Climate Action is voluntary with no enforcement. The Basel Convention Amendment (2019) restricts textile waste exports but enforcement is minimal. No binding international framework governs garment labor standards or textile waste.",
    },
    faq: [
      { q: "Can sustainable fashion compete on price?", a: "The cooperative baseline revenue is $2.4-3.6T/yr — higher than current industry revenue — because internalizing costs raises prices, reduces volume by 60-70%, but increases per-unit margins. The question is not whether sustainable fashion is viable but whether the transition costs are manageable. They are." },
    ],
  },

  coal: {
    epigraph: "The cheapest electricity on Earth is the most expensive thing the atmosphere has ever absorbed.",
    keyFindings: [
      "Each dollar of thermal coal revenue destroys $6.95 in system welfare — $6.88 trillion per year.",
      "Air pollution mortality ($3.76T/yr) alone exceeds total private revenue ($990B). Climate damages add another $2.85 trillion.",
      "The industry survives only because it externalizes ~85% of its true costs.",
    ],
    theorem: {
      formal: "No impossibility theorem — institutional Private-Systemic Tension. Coal operates within existing regulatory authority (EPA §111, EU ETS, PPCA). Unpriced externalities exist but institutional correction is possible.",
      plain: "Coal combustion is catastrophically welfare-negative. Every welfare-destroying channel operates through institutional arrangements that can be reformed: carbon pricing, air quality enforcement, subsidy removal, and managed transition. The physics is remediable. The politics is the obstacle.",
    },
    mcResults: { beta: 6.95, ci: "[5.70, 8.20]", dw: 6884.0, pi: 990.0 },
    agents: {
      whistleblower: "Document emissions underreporting and regulatory capture. Coal plants routinely exceed permitted emission levels during startup/shutdown events classified as 'malfunctions.' The evidence is in continuous emission monitoring system (CEMS) data vs. reported values.",
      plaintiff: "Clean Air Act citizen suits, climate liability litigation (Held v. Montana), and securities fraud for companies misrepresenting stranded asset risk. Discovery targets: internal climate risk assessments, lobbying expenditures to weaken emission standards, and reserve write-down timing decisions.",
      regulator: "EPA (CAA, CWA), FERC (grid), state PUCs share jurisdiction. The enforcement gap: EPA has not updated mercury emission standards since 2012. Coal ash disposal remains inadequately regulated despite the Kingston and Dan River spills.",
      legislator: "Committee jurisdiction: Environment and Public Works (Senate), Energy & Commerce (House). The structural intervention: carbon price ($50-100/tonne), coal ash federal regulation, and just transition funding for coal-dependent communities.",
      investor: "Coal companies face terminal stranded asset risk. Peabody Energy ($3B), Arch Resources ($2B), and CONSOL Energy ($3B) trade at significant discounts to replacement value. environmental, social, and governance exclusion is now standard: 40%+ of global AUM has formal coal exclusion policies. The transition is priced; the timeline is the variable.",
      supranational: "The Powering Past Coal Alliance (PPCA) has 165+ members committed to coal phase-out. The Paris Agreement Article 2.1(c) requires financial flows consistent with low-emission pathways. No binding international agreement mandates coal retirement timelines.",
    },
    faq: [
      { q: "If coal is so destructive, why does it persist?", a: "Three structural protections: (1) fiscal dependency — coal tax revenue exceeds enforcement budgets in producing states, (2) employment concentration — coal jobs are geographically concentrated in politically decisive regions, (3) regulatory capture — the revolving door between EPA and coal industry ensures favorable rule-making. The welfare arithmetic is clear; the political arithmetic isn't." },
    ],
  },

  deep_sea_mining: {
    epigraph: "The extraction premium measures the spell. The welfare beta measures the net.",
    keyFindings: [
      "Each dollar of projected deep-sea mining revenue destroys $6.90 in system welfare — a Pre-Extraction Hollow Win.",
      "Extraction-to-regeneration ratio: 10^6:1 (nodules grow 1-10mm per million years; commercial extraction projects 10.8M tonnes/year).",
      "90% of benthic megafauna are undescribed species — extinction precedes taxonomy.",
    ],
    theorem: {
      formal: "Under Resource Necessity (A1), Extraction-Disruption Identity (A2), and Abyssal Timescale Asymmetry (A3): no market mechanism can reduce βW below ~2.0 through private action alone. Geological irreversibility creates a welfare floor.",
      plain: "Deep-sea mining represents a Pre-Extraction Hollow Win — the welfare destruction hasn't yet occurred at commercial scale but is mathematically certain if mining proceeds. Nodules require millions of years to form; commercial extraction would destroy them in decades. The destruction and the extraction are the same physical act.",
    },
    mcResults: { beta: 6.90, ci: "[5.00, 8.80]", dw: 34.0, pi: 5.0 },
    agents: {
      whistleblower: "Document environmental impact assessment gaps. The Metals Company and other ISA contractors have conducted limited baseline surveys covering less than 5% of licensed areas. The evidence is in species count data showing new species discovered on every dive, indicating profound ignorance of what will be destroyed.",
      plaintiff: "Advisory opinion from the International Tribunal for the Law of the Sea (ITLOS) established state liability for environmental damage from sponsored deep-sea mining activities. Sponsoring states face liability for environmental harm caused by their contractors under United Nations Convention on the Law of the Sea (UNCLOS).",
      regulator: "The International Seabed Authority (ISA) has jurisdiction over the Area (international seabed beyond national jurisdiction). The regulatory gap: the ISA's mandate includes both conservation AND exploitation of seabed resources — a structural conflict of interest. The Mining Code remains unfinished.",
      legislator: "No domestic US legislation specifically addresses deep-sea mining in international waters. Committee jurisdiction: Natural Resources (House), Commerce (Senate). The structural intervention: moratorium on deep-sea mining until baseline ecological surveys are complete and the International Seabed Authority Mining Code is finalized.",
      investor: "The Metals Company (TMC, $500M market cap) is the largest publicly traded deep-sea mining company. Investment risk: regulatory uncertainty, unproven commercial viability, and environmental, social, and governance exclusion. Google, BMW, Samsung, and Volvo have pledged not to source deep-sea minerals.",
      supranational: "United Nations Convention on the Law of the Sea (UNCLOS) Part XI governs seabed mining. The ISA has issued 31 exploration contracts but zero exploitation contracts. 32 countries have called for a moratorium. The precautionary principle (Rio Declaration Principle 15) applies but the ISA has not invoked it.",
    },
    faq: [
      { q: "Don't we need these minerals for the energy transition?", a: "Nickel, cobalt, and manganese can be sourced from terrestrial mines, recycled from batteries, or substituted (LFP batteries eliminate cobalt and nickel entirely). The 'critical minerals' argument for deep-sea mining assumes demand projections that ignore substitution and recycling trajectories. The minerals are not irreplaceable; the abyssal ecosystem is." },
    ],
  },

  cement: {
    epigraph: "Concrete is the most destructive material on Earth.",
    keyFindings: [
      "Each dollar of cement revenue destroys $6.74 in system welfare.",
      "Stoichiometric constraint: 60% of emissions are locked into the raw-material reaction (CaCO3 → CaO + CO2). No fuel switching eliminates this.",
      "Required carbon price: €141-155/tonne — no jurisdiction currently sustains this level.",
    ],
    theorem: {
      formal: "The stoichiometric CO2 release from limestone calcination (0.44 kg CO2/kg CaCO3) constitutes a chemistry-constrained welfare floor that cannot be eliminated through fuel switching alone.",
      plain: "Cement production locks 60% of emissions into the chemistry of the raw material reaction. Burn cleaner fuel — the calcination CO2 remains. Only radical chemistry substitution (geopolymers, LC3, Solidia) or mandatory post-combustion capture can breach the floor.",
    },
    mcResults: { beta: 6.74, ci: "[4.80, 8.70]", dw: 22.0, pi: 3.0 },
    agents: {
      whistleblower: "Document the gap between industry decarbonization pledges and actual capital expenditure. The Global Cement and Concrete Association (GCCA) committed to net-zero by 2050 but member companies have invested less than 2% of capex in alternative chemistries. The evidence is in annual reports showing CCS pilot plants at 0.1% of production capacity.",
      plaintiff: "Climate liability claims (municipal, state) against cement producers for unpriced carbon externalities. Antitrust claims for industry coordination on pricing through trade associations. Discovery targets: internal carbon cost modeling and lobbying expenditures against carbon pricing legislation.",
      regulator: "EPA (CAA NSPS), EU ETS (free allocation phase-out), state air quality agencies share jurisdiction. The enforcement gap: cement plants received 90-100% free EU ETS allowances through 2025, undermining the carbon price signal.",
      legislator: "Committee jurisdiction: Environment and Public Works (Senate), Energy & Commerce (House). The structural intervention: CBAM (Carbon Border Adjustment Mechanism) for cement imports, mandatory clinker-to-cement ratio disclosure, and procurement standards for low-carbon cement in federal infrastructure.",
      investor: "Global cement leaders (LafargeHolcim, CNBM, Heidelberg) face stranded asset risk from carbon pricing. Alternative binders (LC3, geopolymers) are commercially viable at <10% cost premium. Portfolio screening: clinker ratio, CCS deployment timeline, and EU ETS free allocation exposure.",
      supranational: "No binding international framework governs cement emissions. The GCCA Net Zero Roadmap is voluntary. The EU Carbon Border Adjustment Mechanism (2026 full implementation) will be the first cross-border carbon adjustment for cement. The gap: global coordination on cement carbon pricing.",
    },
    faq: [
      { q: "Can CCS solve cement emissions?", a: "CCS can capture the stoichiometric CO2, but no commercial-scale cement CCS plant exists. The Norcem Brevik pilot (Norway) targets 400,000 tonnes/year — 0.01% of global cement production. At current deployment rates, CCS reaches 5% of production by 2040. The chemistry floor is real; the engineering solution exists but is not being deployed." },
    ],
  },

  plastics: {
    epigraph: "Thermodynamics does not negotiate with recycling targets.",
    keyFindings: [
      "Each dollar of resin revenue destroys $6.67 in system welfare — 99.8% of Monte Carlo draws place βW > 3.0.",
      "The Molecular Persistence Impossibility Theorem: the carbon-carbon polymer backbone cannot degrade on civilizational timescales.",
      "Only 9% of all plastic ever produced has been recycled. 1% has been recycled more than once. Every plastic ever made still exists.",
    ],
    theorem: {
      formal: "Under Production Lock-In (P1: $400B+ fossil-fuel-to-petrochemical capital stock), Degradation Impossibility (P2: carbon-carbon backbone resists degradation 10^2-10^5 years), and Recycling Theater (P3: 9% recycled, 1% recycled >once): no voluntary-exchange equilibrium achieves Pareto efficiency.",
      plain: "Plastics satisfy the molecular persistence impossibility theorem — the same structural class as Forever Chemicals. Environmental accumulation is monotonically increasing under any production rate > 0. The recycling narrative is theater: 91% of plastic is landfilled, incinerated, or dumped. The problem is the molecule, not the management.",
    },
    mcResults: { beta: 6.67, ci: "[4.20, 9.10]", dw: 3683.0, pi: 650.0 },
    agents: {
      whistleblower: "Document the plastics industry's decades-long promotion of recycling as a solution it knew would not work. Internal documents from the 1970s-1990s show industry awareness that recycling was economically unviable for most polymer types. The evidence is in American Chemistry Council archives and public records requests.",
      plaintiff: "State AG climate fraud claims (Minnesota v. ExxonMobil, California v. Exxon) targeting deceptive recycling marketing. Product liability for microplastics health effects as epidemiological evidence strengthens. Discovery targets: internal recycling viability analyses and marketing strategy documents.",
      regulator: "EPA (RCRA, Toxic Substances Control Act (TSCA)), FDA (food contact), state environmental agencies share jurisdiction. The EU Single-Use Plastics Directive (2019) provides the strongest regulatory model. The enforcement gap: the US has no federal single-use plastics legislation.",
      legislator: "Committee jurisdiction: Environment and Public Works (Senate), Energy & Commerce (House). The structural intervention: extended producer responsibility (EPR) with material-specific recycling targets, production caps on virgin resin, and treaty participation (Global Plastics Treaty).",
      investor: "Petrochemical companies (ExxonMobil, SABIC, Dow, LyondellBasell) face stranded asset risk from the Global Plastics Treaty and demand shifts. $400B in planned petrochemical capacity expansion may become stranded if production caps are implemented. Portfolio screening: virgin vs. recycled resin ratio, EPR exposure, and treaty compliance readiness.",
      supranational: "The Global Plastics Treaty (INC-5, 2025) aims to create the first binding international agreement on plastic pollution. The treaty scope is contested: production caps vs. waste management. The Basel Convention plastic waste amendment (2021) restricts transboundary movements of contaminated plastic waste.",
    },
    faq: [
      { q: "Why can't we just recycle better?", a: "Because thermodynamics doesn't cooperate. Each recycling pass degrades polymer chain length, reducing material properties. Most plastics can be recycled 1-3 times before becoming unusable. Multi-material packaging (most consumer packaging) cannot be economically separated. Chemical recycling (pyrolysis) consumes more energy than virgin production. The 9% recycling rate is not a failure of effort — it's a consequence of chemistry." },
    ],
  },

  "e-waste": {
    epigraph: "The convention bans the export. The container ship ignores the convention.",
    keyFindings: [
      "Each dollar of consumer electronics revenue destroys $6.59 in system welfare — $6.92 trillion per year.",
      "62 million tonnes of e-waste generated annually; only 22.3% formally recycled.",
      "$62 billion in recoverable precious metals lost annually — thrown away because collection infrastructure doesn't exist.",
    ],
    theorem: {
      formal: "Under Planned Obsolescence (A1), Hazardous Material Inevitability (A2), and Export Displacement (A3): no Pareto improvement exists without restructuring at least two axioms.",
      plain: "The linear electronics economy treats $62 billion in annual recoverable precious metals as waste. Only 22% enters formal recycling; the remainder contaminates Global South processing hubs where informal workers burn circuit boards to recover copper, inhaling lead, mercury, and cadmium.",
    },
    mcResults: { beta: 6.59, ci: "[4.90, 8.30]", dw: 6922.2, pi: 1050.0 },
    agents: {
      whistleblower: "Document planned obsolescence design decisions. Internal product lifecycle planning documents showing intentional durability limitations, software update-driven obsolescence, and proprietary repair barriers. Apple's battery throttling (2017) and John Deere's repair restrictions provide the template.",
      plaintiff: "Right-to-repair legislation enables class actions for repair restriction violations. Consumer protection claims for planned obsolescence. Environmental justice claims for e-waste export to communities of color in Global South nations.",
      regulator: "EPA (RCRA), CBP (export controls), FTC (right-to-repair), state environmental agencies share jurisdiction. The enforcement gap: the US has not ratified the Basel Convention Ban Amendment, making e-waste export enforcement discretionary.",
      legislator: "Committee jurisdiction: Energy & Commerce (House), Commerce (Senate). The structural intervention: federal right-to-repair legislation, extended producer responsibility for electronics, and ratification of the Basel Ban Amendment.",
      investor: "Electronics companies face regulatory risk from EU Battery Regulation (removable batteries by 2027), Ecodesign requirements (repairability scores), and right-to-repair legislation. Companies leading on circular design (Fairphone, Framework) demonstrate the alternative model. Portfolio screening: product lifespan, repairability index, and EPR compliance.",
      supranational: "The Basel Convention governs transboundary e-waste movements. The Minamata Convention addresses mercury in electronics. The E-Waste Coalition (ITU, UNEP, UNITAR) tracks global flows. The gap: enforcement of export bans and harmonized EPR frameworks.",
    },
    faq: [
      { q: "Why not just ban e-waste exports?", a: "The Basel Convention Ban Amendment does exactly this — but only 101 of 190 parties have ratified it, and the US is not among them. Even where bans exist, enforcement is near-impossible: e-waste is mislabeled as 'used electronics for reuse' and shipped in standard containers indistinguishable from legitimate trade. The ban is necessary but insufficient." },
    ],
  },

  tobacco: {
    epigraph: "The tobacco industry kills eight million people a year and charges $965 billion for the privilege.",
    keyFindings: [
      "Each dollar of tobacco revenue destroys $6.50 in system welfare — the largest welfare-destruction ratio of any legal consumer product.",
      "8 million deaths per year globally. System welfare cost: $6.3 trillion per year.",
      "WHO MPOWER package cost: $11.4B/yr; prevents $6.3T/yr — 553:1 ROI. The most cost-effective public health intervention ever calibrated.",
    ],
    theorem: {
      formal: "Under Neurochemical Lock-In (A1: price inelasticity > −0.5), Pipeline Replacement (A2: adolescent initiation faster than cessation), and Fiscal Dependency (A3: governments financially incentivized to perpetuate consumption): βW ≥ 3.6 is guaranteed.",
      plain: "Tobacco is the only legal consumer product that kills when used as directed. Three structural axioms (neurochemical addiction, adolescent pipeline, fiscal dependency) guarantee this outcome cannot be corrected voluntarily. The addiction is the business model.",
    },
    mcResults: { beta: 6.50, ci: "[4.50, 9.60]", dw: 6276.0, pi: 965.0 },
    agents: {
      whistleblower: "Document the gap between harm reduction claims and actual product strategies. Companies marketing heated tobacco products (IQOS) and nicotine pouches as cessation tools while internal documents show marketing targets adolescent non-smokers. The Master Settlement Agreement document repository contains 14 million pages of evidence.",
      plaintiff: "The Master Settlement Agreement (1998) extracted $206B but did not change the business model. Third-wave litigation targets marketing to youth through social media, flavored products, and influencer campaigns. Discovery targets: internal marketing demographics showing adolescent reach, product design decisions maximizing nicotine absorption.",
      regulator: "FDA (CTP), FTC (advertising), state AGs share jurisdiction. FDA gained tobacco authority in 2009 (Family Smoking Prevention and Tobacco Control Act) but has not exercised its power to reduce nicotine to non-addictive levels — the single most impactful available intervention.",
      legislator: "Committee jurisdiction: HELP (Senate), Energy & Commerce (House). The structural intervention: FDA exercise of existing authority to mandate nicotine reduction to non-addictive levels. This requires no new legislation — only regulatory will.",
      investor: "Tobacco stocks (PM, MO, BTI, JT) face terminal volume decline in developed markets. Emerging market growth sustains near-term revenues but faces WHO FCTC implementation pressure. environmental, social, and governance exclusion is now standard: 60%+ of global AUM has formal tobacco exclusion policies.",
      supranational: "The WHO Framework Convention on Tobacco Control (FCTC) is the most widely adopted treaty in UN history (182 parties). MPOWER implementation varies: high-income countries average 4.2 of 6 measures; low-income countries average 1.8. The gap is implementation funding, not framework design.",
    },
    faq: [
      { q: "Why hasn't the WHO FCTC eliminated tobacco?", a: "Implementation, not design. The FCTC provides the framework; national governments must implement it. Tobacco industry lobbying ($541M in the US alone from 1998-2020) systematically delays and weakens implementation. The 553:1 ROI of MPOWER demonstrates that the tools work where they're deployed. The constraint is political will, not policy design." },
    ],
  },

  student_loans: {
    epigraph: "The loan guarantees the tuition. The tuition guarantees the loan.",
    keyFindings: [
      "Each dollar of revenue destroys $6.36 in system welfare — $297.6B per year.",
      "48% twelve-year default rate at for-profit institutions (4× the public sector rate).",
      "$4 billion in unnecessary interest from forbearance steering alone (2010-2015).",
    ],
    theorem: {
      formal: "Under Guaranteed Demand (A1), Tuition Capture (A2), and Discharge Impossibility (A3): the student loan system creates a structural extraction loop where federal guarantees inflate tuition, inflated tuition increases borrowing, and borrowing cannot be discharged.",
      plain: "The student loan system is a guaranteed demand machine. Federal loans flow to institutions with no price discipline. Institutions capture the guaranteed demand as tuition increases. Students cannot discharge the debt in bankruptcy. The loop is self-reinforcing and welfare-destructive.",
    },
    mcResults: { beta: 6.36, ci: "[5.20, 7.50]", dw: 297.6, pi: 46.8 },
    agents: {
      whistleblower: "Document for-profit institutions' internal enrollment targets and default rate manipulation. The 90/10 rule (now 85/15) creates incentives to maximize federal student aid revenue. The evidence is in enrollment advisor scripts, gainful employment data, and cohort default rate management strategies.",
      plaintiff: "Borrower defense to repayment claims for institutional misrepresentation. State AG actions against for-profit institutions (ITT Tech, Corinthian, University of Phoenix). CFPB enforcement against servicer misconduct. Discovery targets: marketing materials, placement rate calculations, and servicer steering documentation.",
      regulator: "Department of Education (FSA), CFPB, FTC, state AGs share jurisdiction. The enforcement gap: the Department of Education is simultaneously the lender, regulator, and guarantor — a structural conflict that makes aggressive enforcement against institutional borrowers politically difficult.",
      legislator: "Committee jurisdiction: HELP (Senate), Education and Workforce (House). The structural intervention: restore bankruptcy discharge (repealed 2005), institutional risk-sharing (skin in the game), and gainful employment standards with teeth.",
      investor: "For-profit education companies face regulatory risk from gainful employment rules and 85/15 compliance. Student loan servicers (Navient, Nelnet) face CFPB enforcement risk. Portfolio screening: cohort default rates, regulatory action history, and revenue concentration from federal sources.",
      supranational: "No international framework governs student lending. Most OECD countries use income-contingent repayment (Australia HECS, UK Plan 2) that caps repayment at income percentages and forgives after 20-30 years. The US system is an outlier in allowing unlimited accumulation with no discharge.",
    },
    faq: [
      { q: "Why can't student loans be discharged in bankruptcy?", a: "The Bankruptcy Abuse Prevention Act (2005) made private student loans non-dischargeable, joining federal loans. The rationale was 'moral hazard' — but no other consumer lending category is exempt from discharge. Medical debt, credit card debt, and business debt are all dischargeable. The exemption is a policy choice, not an economic necessity." },
    ],
  },

  pbm: {
    epigraph: "The middleman sets the price, keeps the spread, and calls it savings.",
    keyFindings: [
      "Each dollar of Pharmacy Benefit Management rebate revenue destroys $6.35 in system welfare.",
      "Big Three Pharmacy Benefit Managers (CVS Caremark, Express Scripts, OptumRx) control 80% of the market and extract $62.7B in DIR fees.",
      "6.6× efficiency gap: μ* = 0.86 vs. demonstrated μ ≈ 0.13 — only 13% of the margin creates genuine system welfare.",
    ],
    theorem: {
      formal: "Under Spread Extraction (A1), Formulary Distortion (A2), and Regulatory Opacity (A3): Pharmacy Benefit Management intermediation structurally increases drug costs while reducing pharmacy access and medication adherence.",
      plain: "Pharmacy Benefit Managers were designed to negotiate lower drug prices. Instead, they capture the spread between negotiated rebates and pharmacy reimbursement. The rebate is the revenue. The patient pays the list price. The pharmacy absorbs the clawback. The system is an extraction machine disguised as a cost-containment tool.",
    },
    mcResults: { beta: 6.35, ci: "[4.90, 7.80]", dw: 381.0, pi: 60.0 },
    agents: {
      whistleblower: "Document spread pricing and DIR fee clawback mechanisms. Independent pharmacies receive reimbursement below acquisition cost on 10-15% of prescriptions. The evidence is in pharmacy reimbursement data (NADAC vs. actual reimbursement), DIR fee reconciliation statements, and formulary placement decisions correlated with rebate size rather than clinical efficacy.",
      plaintiff: "Antitrust claims for vertical integration (CVS-Aetna-Caremark). ERISA claims for fiduciary breach when Pharmacy Benefit Managers steer formularies based on rebate revenue rather than patient outcomes. State AG actions for deceptive practices. Discovery targets: rebate contracts, spread pricing margins, and formulary committee minutes.",
      regulator: "FTC (antitrust), CMS (Medicare Part D), state insurance commissioners share jurisdiction. The FTC's 2024 Pharmacy Benefit Management report documented spread pricing and rebate retention but no enforcement action followed. The enforcement gap: Pharmacy Benefit Managers operate in a regulatory gray zone between insurance and pharmacy.",
      legislator: "Committee jurisdiction: HELP and Finance (Senate), Energy & Commerce and Ways & Means (House). The structural intervention: Pharmacy Benefit Management fiduciary duty requirement, spread pricing prohibition, DIR fee transparency, and delinking Pharmacy Benefit Management compensation from drug list prices.",
      investor: "Pharmacy Benefit Management revenue is embedded in three conglomerates: CVS Health ($357B), UnitedHealth/Optum ($372B), and Cigna/Express Scripts ($190B). Regulatory risk from bipartisan Pharmacy Benefit Management reform legislation. Portfolio exposure is concentrated but underappreciated because Pharmacy Benefit Management revenue is not separately reported.",
      supranational: "No international framework governs Pharmacy Benefit Management-style intermediation. Most countries negotiate drug prices directly (UK NICE, Canada PMPRB) or use reference pricing. The US Pharmacy Benefit Management model is globally unique in creating a for-profit intermediary layer between payer and pharmacy.",
    },
    faq: [
      { q: "Why are Pharmacy Benefit Managers so profitable if they're just middlemen?", a: "Because they capture information asymmetry on both sides. They know the manufacturer's rebate (hidden from the plan sponsor) and the plan sponsor's budget (hidden from the manufacturer). They set the pharmacy reimbursement (hidden from the patient). Three-way opacity creates extraction opportunity at every node." },
    ],
  },

  platform_monopoly: {
    epigraph: "The gatekeepers do not charge rent. They are rent.",
    keyFindings: [
      "Each dollar of monopoly rent destroys $6.33 in system welfare — $999.4B per year.",
      "Kill zone suppresses venture capital investment by 46% in adjacent sectors.",
      "$158B in annual monopoly rent protected by $277M lobbying (570:1 return on political capital).",
    ],
    theorem: {
      formal: "Under Network Effect Dominance (A1), Zero-Price Consumer Lock-in (A2), and Data Feedback Supremacy (A3): no market mechanism can reduce βW below approximately 2.8 through private action alone.",
      plain: "Platform monopoly operates through a Gatekeeper Ratchet: each user's data becomes collateral for the next acquisition, each acquisition eliminates the next competitor, and each elimination raises barriers to entry. Structural remedies (βW ≈ 3.0) dominate behavioral settlements (βW > 10).",
    },
    mcResults: { beta: 6.33, ci: "[4.80, 7.80]", dw: 999.4, pi: 158.0 },
    agents: {
      whistleblower: "Document self-preferencing algorithms and acquisition strategies targeting competitive threats rather than synergies. The evidence is in search ranking algorithms, app store review processes, and M&A committee minutes evaluating targets by competitive threat score.",
      plaintiff: "Sherman Act §2 monopolization, Clayton Act §7 anticompetitive mergers. DOJ v. Google and FTC v. Meta establish current litigation paths. Discovery targets: internal market definition documents, API restriction decisions, and advertising auction manipulation.",
      regulator: "FTC and DOJ Antitrust Division share jurisdiction. The EU Digital Markets Act (2024) provides ex ante obligations on gatekeepers. The enforcement gap: US antitrust relies on ex post litigation taking 5-10 years while platform dominance compounds quarterly.",
      legislator: "Committee jurisdiction: Judiciary (Senate and House). The American Innovation and Choice Online Act would ban self-preferencing. The Open App Markets Act would end app store monopolies. Structural intervention: interoperability mandates and mandatory data portability.",
      investor: "FAANG concentration: five companies represent 25%+ of S&P 500 market cap. Antitrust remedies would reduce monopoly rents but may increase competition-driven innovation returns. The Digital Markets Act creates the first regulatory framework that could structurally reduce platform beta.",
      supranational: "EU Digital Markets Act is the global regulatory template. Japan, South Korea, India, and Brazil are implementing similar frameworks. No binding international antitrust framework exists for platforms operating across 190+ jurisdictions.",
    },
    faq: [
      { q: "Why not just break them up?", a: "Structural separation reduces βW to approximately 3.0. Behavioral remedies (consent decrees, monitoring) historically fail because the incentive structure is unchanged. The AT&T breakup (1982) is the precedent: it worked. The resulting competition produced the internet. The System Asset Pricing Model analysis favors structural remedies on welfare grounds." },
    ],
  },

  palm_oil: {
    epigraph: "The oil is in everything. The forest was everywhere.",
    keyFindings: [
      "Each dollar of palm oil market value destroys $6.30 in system welfare — $428.3B per year.",
      "Peatland conversion drives 48% of welfare destruction; 14% of plantations on peat cause 92% of greenhouse gas footprint.",
      "Indonesia's 2015 peat fires released 1 Gt CO2e, inflicting $16-185B in global welfare loss.",
    ],
    theorem: {
      formal: "Under Substitution Impossibility (A1: palm oil yields 4-10× competitors per hectare), Peatland Irreversibility (A2), and Certification Failure (A3: Roundtable on Sustainable Palm Oil covers only 19% of production): no voluntary certification can achieve welfare neutrality.",
      plain: "Palm oil is in 50% of supermarket products because nothing else yields as much oil per hectare. The 14/92 peatland asymmetry provides a narrow policy lever — ban peat conversion and you eliminate 92% of the greenhouse gas footprint while affecting only 14% of production.",
    },
    mcResults: { beta: 6.30, ci: "[4.60, 8.00]", dw: 428.3, pi: 68.0 },
    agents: {
      whistleblower: "Document Roundtable on Sustainable Palm Oil certification failures. Satellite imagery shows clearing within certified concessions. The evidence is in Roundtable on Sustainable Palm Oil complaint logs, satellite deforestation alerts within certified boundaries, and internal audit reports acknowledging non-compliance.",
      plaintiff: "Environmental justice claims for transboundary haze (Singapore and Malaysia residents affected by Indonesian fires). Land rights claims by indigenous communities. Consumer protection claims for 'sustainable palm oil' marketing that relies on Roundtable on Sustainable Palm Oil certification with documented failures.",
      regulator: "EU Deforestation Regulation (2023) is the strongest regulatory framework. Indonesia's peat moratorium (2011) and permanent peatland protection (2016) demonstrate regulatory will. The enforcement gap: moratorium violations are documented by satellite but rarely prosecuted.",
      legislator: "Committee jurisdiction: Natural Resources (House), Agriculture (Senate). The structural intervention: mandatory deforestation-free supply chain verification (EU model) and import restrictions on products linked to peatland conversion.",
      investor: "Palm oil exposure: Wilmar ($25B), Golden Agri ($3B), IOI Corp ($4B), and downstream processors (Unilever, P&G, Nestlé). The NDPE (No Deforestation, No Peat, No Exploitation) commitment covers 83% of refining capacity but compliance is unverified. Portfolio screening: peatland exposure, NDPE compliance verification, and EU Deforestation Regulation readiness.",
      supranational: "No binding international framework governs palm oil production. The Roundtable on Sustainable Palm Oil is industry-led and voluntary. The Amsterdam Declarations Partnership (7 European countries) committed to deforestation-free supply chains by 2025 but the target was missed. The gap: enforcement of deforestation-free standards.",
    },
    faq: [
      { q: "Should we boycott palm oil?", a: "No. Boycotts shift demand to soy, rapeseed, or sunflower oil — which require 4-10× more land per tonne. The Substitution Trap Law (System Asset Pricing Model Framework Paper #3) proves that banning one Hollow Win without addressing demand shifts welfare destruction to substitute domains. The intervention is peatland conversion bans, not product boycotts." },
    ],
  },

  "tax-havens": {
    epigraph: "Sovereignty is the product. Secrecy is the service.",
    keyFindings: [
      "Each dollar sheltered destroys $6.27 of global welfare — $3.08 trillion annual welfare cost (exceeds UK GDP).",
      "Pillar Two at maximum efficacy recovers ≤12% of calibrated damage.",
      "Developing countries lose 4× relative fiscal capacity compared to developed nations.",
    ],
    theorem: {
      formal: "Under Sovereignty Shield (A1), Capital Mobility (A2), and Jurisdictional Competition (A3): no institutional arrangement can simultaneously preserve national sovereignty, permit free capital movement, and prevent tax base erosion.",
      plain: "Sovereignty is for sale. Tax havens commodify their legislative authority, offering secrecy and zero rates to attract mobile capital. The result: $492B in annual revenue sheltered while $3.08T in welfare is destroyed through fiscal drain, public services degradation, inequality amplification, and governance capture.",
    },
    mcResults: { beta: 6.27, ci: "[5.10, 7.40]", dw: 3084.7, pi: 492.0 },
    agents: {
      whistleblower: "Document the gap between corporate public tax positions and actual effective rates. Country-by-country reporting (CbCR) data reveals profit shifting patterns. The evidence is in misalignment between where value is created (employees, assets) and where profits are booked (zero-tax jurisdictions).",
      plaintiff: "Tax fraud and evasion claims. State AG actions for state tax avoidance through domestic pass-through entities. Whistleblower qui tam actions under IRS Whistleblower Program (awards up to 30% of collected proceeds exceeding $2M).",
      regulator: "IRS, FinCEN (beneficial ownership), state tax agencies share jurisdiction. The Corporate Transparency Act (2024) requires beneficial ownership reporting. The enforcement gap: IRS audit rates for corporations with >$250M assets fell from 17% (2010) to 4.1% (2023).",
      legislator: "Committee jurisdiction: Finance (Senate), Ways and Means (House). The structural intervention: OECD Pillar Two implementation (15% global minimum tax), public CbCR, and elimination of check-the-box regulations that enable entity classification arbitrage.",
      investor: "Companies with high haven exposure face regulatory risk from Pillar Two implementation and reputational risk from public CbCR disclosure. Portfolio screening: effective tax rate vs. statutory rate, percentage of profits in zero-tax jurisdictions, and Pillar Two compliance readiness.",
      supranational: "The OECD Inclusive Framework on Base Erosion and Profit Shifting (Pillar One and Two) is the primary international initiative. Pillar Two (15% minimum tax) took effect 2024 but US implementation is stalled. The gap: the global minimum rate (15%) is below the welfare-neutral rate, and enforcement relies on voluntary adoption.",
    },
    faq: [
      { q: "Will Pillar Two solve the problem?", a: "At best, Pillar Two recovers 12% of calibrated welfare damage. The 15% minimum rate is below the OECD average (23.5%) and well below the welfare-neutral rate implied by βW = 6.27. It's a floor, not a solution. And US Congressional opposition makes even this modest floor uncertain." },
    ],
  },

  pops: {
    epigraph: "The molecule outlasts the civilization that created it.",
    keyFindings: [
      "Each dollar of historical revenue destroyed $6.23 in system welfare.",
      "266B/yr in neurodevelopmental damage from polybrominated diphenyl ethers (11 million lost IQ points annually in the US alone).",
      "10-14 million tonnes of polychlorinated biphenyl-contaminated material remain globally, with <30% on track for 2028 management deadline.",
    ],
    theorem: {
      formal: "Under Bioaccumulation Ratchet (A1), Chemical Assessment Pace Gap (A2: 7-20 years per chemical vs. 1,000-2,000 new chemicals annually), and Remediation Impossibility (A3): legacy Persistent Organic Pollutants impose perpetual welfare costs that no institutional arrangement can eliminate.",
      plain: "Legacy Persistent Organic Pollutants (PCBs, DDT, PBDEs, dioxins) demonstrate that molecular persistence is a welfare ratchet. Once released, bioaccumulation is irreversible on human timescales. Climate change reverses remediation progress via permafrost thaw and wildfire remobilization.",
    },
    mcResults: { beta: 6.23, ci: "[4.40, 8.00]", dw: 435.8, pi: 70.0 },
    agents: {
      whistleblower: "Document ongoing Persistent Organic Pollutants releases from legacy sources. Polychlorinated biphenyl-contaminated buildings (schools, government offices) continue to expose occupants. The evidence is in indoor air monitoring data from pre-1979 buildings and EPA Superfund site monitoring showing ongoing groundwater contamination.",
      plaintiff: "Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) cost recovery for Persistent Organic Pollutants contamination. Product liability for health effects from legacy chemical exposure. Class actions for property value diminution from contaminated sites. Discovery targets: manufacturer knowledge of persistence and toxicity at time of production.",
      regulator: "EPA (Toxic Substances Control Act (TSCA), Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA)), state environmental agencies share jurisdiction. The enforcement gap: Toxic Substances Control Act (TSCA) reform (2016 Lautenberg Act) accelerated chemical evaluation but the pace (20-30 assessments/year) cannot match the 1,000-2,000 new chemicals introduced annually.",
      legislator: "Committee jurisdiction: Environment and Public Works (Senate), Energy & Commerce (House). The structural intervention: mandatory pre-market testing for persistence (EU REACH model), accelerated Toxic Substances Control Act (TSCA) assessment timelines, and Superfund reauthorization with dedicated Persistent Organic Pollutants funding.",
      investor: "Chemical companies (Dow, DuPont, 3M, Bayer) face legacy liability for Persistent Organic Pollutants contamination. The 3M Forever Chemicals settlement ($10.3B) established the scale of potential liabilities. Portfolio screening: legacy chemical production history, Superfund site exposure, and environmental liability reserves.",
      supranational: "The Stockholm Convention on Persistent Organic Pollutants (2001) bans or restricts 35 chemicals. The regulatory pace gap unfixable: chemical-by-chemical assessment takes 7-20 years per substance. The Convention has successfully reduced DDT and PCB production but cannot address the 10-14 million tonnes of legacy contamination already in the environment.",
    },
    faq: [
      { q: "How is climate change making Persistent Organic Pollutants worse?", a: "Permafrost thaw releases Persistent Organic Pollutants deposited in Arctic soils over decades. Boreal wildfires remobilize Persistent Organic Pollutants from contaminated soils. Rising temperatures increase volatilization rates. Three climate-driven pathways are reversing decades of remediation progress — the molecules that were supposed to be 'locked up' in cold soils are being released." },
    ],
  },

  "data-brokerage": {
    epigraph: "Consent is a checkbox. Surveillance is the architecture.",
    keyFindings: [
      "Every dollar of data brokerage revenue generates $6.13 in welfare costs — $1.98 trillion per year.",
      "78% of humans whose data is harvested cannot name a single data broker holding their file.",
      "Regulatory capture ratio 1,500:1: FTC's $430M budget vs. $667B in behavioral ad revenue.",
    ],
    theorem: {
      formal: "Under Consent Fabrication (A1), Architectural Surveillance (A2), and Regulatory Asymmetry (A3): no opt-out strategy can reduce βW below 1.0 under current internet architecture.",
      plain: "Data brokerage extracts $323B in annual revenue by harvesting behavioral data from 4.6 billion humans. The consent model is theater — a checkbox is not informed consent when the alternative is digital exclusion. The impossibility is architectural, not informational.",
    },
    mcResults: { beta: 6.13, ci: "[4.70, 7.60]", dw: 1979.5, pi: 323.0 },
    agents: {
      whistleblower: "Document data collection practices that exceed disclosed purposes. Companies collecting location data 'for app functionality' while selling it to law enforcement, military intelligence, and advertising networks. The evidence is in SDK documentation, data broker transaction records, and FTC enforcement actions.",
      plaintiff: "Biometric Information Privacy Act (BIPA) (Illinois), California Consumer Privacy Act (CCPA) (California), state consumer protection claims. Class actions for undisclosed data sales to third parties. The Clearview AI settlement ($5.5M) and Meta settlement ($725M) established liability precedents.",
      regulator: "FTC (unfair/deceptive practices), state AGs, CFPB (financial data). The enforcement gap: no comprehensive federal privacy law. The patchwork of state laws creates compliance costs without meaningful privacy protection.",
      legislator: "Committee jurisdiction: Commerce (Senate and House). The structural intervention: comprehensive federal privacy law with private right of action, data broker registration requirement, and opt-in (not opt-out) consent framework.",
      investor: "Advertising-dependent companies (Meta, Google/Alphabet) face regulatory risk from privacy legislation. Data broker revenue is concentrated in Experian ($6.3B), Equifax ($5.1B), TransUnion ($3.7B), and hundreds of smaller firms. Apple's ATT framework demonstrated that privacy features can be commercially viable.",
      supranational: "The EU GDPR (2018) provides the strongest international framework. Adequacy decisions govern data transfers. The gap: US companies process EU citizens' data under SCCs (Standard Contractual Clauses) that provide weaker protection than GDPR requires.",
    },
    faq: [
      { q: "If I have nothing to hide, why does this matter?", a: "The welfare cost is not about individual secrets. It's about systemic effects: algorithmic discrimination in housing, employment, and insurance; democratic manipulation through micro-targeted political advertising; identity theft and financial fraud enabled by concentrated personal data stores. The harm is structural, not personal." },
    ],
  },

  amr: {
    epigraph: "Each dollar of revenue depletes $2.10 of the effectiveness commons at the margin.",
    keyFindings: [
      "Marginal βW = 5.84: each dollar of revenue depletes the effectiveness commons.",
      "The Efficacy Ceiling: cure and depletion are the same molecular event — no within-system escape.",
      "100,000 Monte Carlo draws confirm welfare negativity in all draws; classification invariant across perturbations.",
    ],
    theorem: {
      formal: "Under Efficacy Ceiling (A1: antibiotic use is antibiotic depletion), Pipeline Depletion (A2), and Resistance Evolution (A3): no market mechanism can sustain antibiotic effectiveness when the act of using the antibiotic is the act of depleting it.",
      plain: "Every antibiotic prescription simultaneously treats the patient and depletes the commons. The cure and the depletion are the same molecular event. There is no way to use the antibiotic without reducing its future effectiveness. This is the purest impossibility theorem in the System Asset Pricing Model canon.",
    },
    mcResults: { beta: 5.84, ci: "[4.43, 7.26]", dw: null, pi: null },
    agents: {
      whistleblower: "Document inappropriate prescribing rates and agricultural prophylactic use. 30% of outpatient antibiotic prescriptions are unnecessary (CDC estimate). 70% of medically important antibiotics in the US are sold for agricultural use. The evidence is in prescribing data, antibiogram trends, and USDA sales reports.",
      plaintiff: "Product liability for agricultural antibiotic manufacturers whose products accelerate resistance affecting human medicine. Environmental claims for antibiotic contamination of waterways from Concentrated Animal Feeding Operation runoff. Discovery targets: manufacturer knowledge of resistance acceleration from agricultural use.",
      regulator: "FDA (animal antibiotics), CDC (surveillance), CMS (hospital stewardship) share jurisdiction. The enforcement gap: FDA's 2017 Veterinary Feed Directive banned growth promotion but permits 'disease prevention' — a loophole that preserved 90% of agricultural antibiotic use.",
      legislator: "Committee jurisdiction: HELP (Senate), Energy & Commerce (House). The structural intervention: PASTEUR Act (delinking antibiotic revenue from volume), mandatory hospital stewardship requirements with CMS reimbursement penalties, and agricultural antibiotic phase-out.",
      investor: "Pharmaceutical companies have largely exited antibiotic R&D because the optimal use pattern (prescribe less, save for resistance) conflicts with the revenue model (prescribe more, sell volume). Portfolio screening: antibiotic pipeline diversity, stewardship program adoption, and agricultural antibiotic phase-out timeline.",
      supranational: "The WHO Global Action Plan on Antimicrobial Resistance (2015) and UN General Assembly declaration (2016) established international commitments. No binding enforcement mechanism exists. The gap: agricultural antibiotic use is unregulated in most developing countries where use is growing fastest.",
    },
    faq: [
      { q: "Why can't we just develop new antibiotics?", a: "We can, but resistance evolves faster than development. Average antibiotic development: 10-15 years and $1B. Average time to clinically significant resistance: 2-3 years after introduction. The pipeline cannot outrun evolution. The structural solution is stewardship (slow the depletion) plus pull incentives (PASTEUR Act) that delink revenue from volume." },
    ],
  },

  social_media: {
    epigraph: "The feed is optimized. The child is the input.",
    keyFindings: [
      "Each dollar of ad-supported social media revenue destroys $5.79 in welfare — $393.5B per year.",
      "2.6 minutes to harm: CCDH audits document suicide-related content delivery to 13-year-olds within 2.6 minutes of account creation.",
      "31% of youth usage is involuntary per Allcott-Gentzkow-Song (2022).",
    ],
    theorem: {
      formal: "Under Engagement Trap (A1: algorithmic maximization of time-on-platform), Neurological Vulnerability (A2: adolescent prefrontal cortex development), and Network Lock-in (A3): no voluntary platform commitment can reduce youth harm below a structural floor.",
      plain: "The $68B attention economy generates wealth through algorithmic engagement maximization targeting neurologically immature users. The feed is optimized for engagement. The child's developing brain is the input variable. The output is $393.5B in welfare destruction across mental health, cognitive development, epistemic decay, and privacy expropriation.",
    },
    mcResults: { beta: 5.79, ci: "[4.20, 7.40]", dw: 393.5, pi: 68.0 },
    agents: {
      whistleblower: "Document the gap between public safety commitments and internal algorithmic decisions. Frances Haugen's Facebook disclosures (2021) demonstrated that Instagram's internal research showed harm to teenage girls while the company publicly denied it. The evidence is in A/B test results, engagement metric dashboards, and content recommendation algorithm parameters.",
      plaintiff: "State AG multi-district litigation against Meta (42 states). Product liability claims for algorithmic amplification of harmful content to minors. Discovery targets: internal research on youth harm, A/B testing of engagement features on minors, and content moderation policy override decisions.",
      regulator: "FTC (Children's Online Privacy Protection Act (COPPA) enforcement), state AGs, EU DG Connect (Digital Services Act) share jurisdiction. The enforcement gap: Children's Online Privacy Protection Act (COPPA) applies only to children under 13 and requires actual knowledge of age (easily circumvented by age-gating). No federal framework governs algorithmic design.",
      legislator: "Committee jurisdiction: Commerce (Senate and House). The Kids Online Safety Act (KOSA) passed the Senate in 2024. The structural intervention: duty of care for minors, age-appropriate design codes (UK model), and algorithmic transparency requirements.",
      investor: "Meta ($1.3T market cap) derives 97%+ of revenue from advertising, creating structural dependence on engagement maximization. Regulatory risk from youth safety legislation, DSA compliance costs, and advertising market shifts. Portfolio screening: percentage of users under 18, content moderation investment ratio, and regulatory compliance costs.",
      supranational: "The EU Digital Services Act (2024) imposes systemic risk assessments on very large platforms. The UK Online Safety Act (2023) creates a duty of care. Australia's age verification mandate sets a global precedent. No binding international framework governs algorithmic recommendation systems.",
    },
    faq: [
      { q: "Isn't this just moral panic about new technology?", a: "The epidemiological evidence is not ambiguous. Teen depression increased 60% from 2011-2019, coinciding with smartphone adoption. Hospital admissions for self-harm among 10-14 year old girls tripled. Randomized experiments (Allcott et al. 2020) showed deactivating Facebook improved well-being. This is not moral panic — it is measured harm with identified mechanisms." },
    ],
  },

  gene_drives: {
    epigraph: "We are as gods and have gotten good at it but terrible at it.",
    keyFindings: [
      "Each dollar of disease burden averted by gene drives accompanies $5.77 of welfare destruction.",
      "The Ecological Ratchet Floor: no governance mechanism can reduce β below ~4.2 for open-release homing drives.",
      "Contained/open-release bifurcation: Wolbachia β ≈ 2.1 vs. homing drive β > 12. The alternative exists.",
    ],
    theorem: {
      formal: "Under Ecological Irreversibility (A1), Evolutionary Resistance (A2), and Governance Externalization (A3): open-release homing drives cannot be recalled once deployed. The welfare beta floor is set by the irreversibility of ecological cascade effects.",
      plain: "Gene drive deployment is a one-way door. Release a CRISPR homing drive for malaria vector suppression and the gene propagates through wild populations without recall. If the ecological consequences are worse than the disease burden averted, there is no undo button. Wolbachia-based alternatives achieve 77-92% of the disease benefit at βW ≈ 2.1.",
    },
    mcResults: { beta: 5.77, ci: "[4.21, 7.34]", dw: 8.0, pi: 12.4 },
    agents: {
      whistleblower: "Document the gap between contained laboratory results and predicted field-release outcomes. Gene drive efficacy in cage trials has not been replicated in semi-field conditions. The evidence is in unpublished negative results from Target Malaria's field trials.",
      plaintiff: "No legal framework governs gene drive liability. The Cartagena Protocol on Biosafety provides the closest international framework. Precautionary claims under national biosafety laws could be asserted against releasing organizations.",
      regulator: "EPA (FIFRA), USDA (APHIS), FDA (gene therapy) share jurisdiction under the Coordinated Framework for Biotechnology (1986). The enforcement gap: the framework was designed for transgenic crops, not self-propagating genetic modifications. No regulatory pathway exists for open-release gene drives.",
      legislator: "Committee jurisdiction: Agriculture (Senate and House), Energy & Commerce. The structural intervention: moratorium on open-release gene drives pending ecological risk assessment frameworks and international governance agreements.",
      investor: "Gene drive technology is primarily funded by philanthropy (Gates Foundation, Open Philanthropy) rather than commercial capital. Limited direct portfolio exposure. Indirect exposure through agricultural biotech companies exploring gene drive applications in pest control.",
      supranational: "The Convention on Biological Diversity (CBD) Decision XIV/19 establishes a precautionary approach to gene drives. The Cartagena Protocol governs transboundary movement of living modified organisms. No binding international governance framework exists specifically for gene drives.",
    },
    faq: [
      { q: "Can gene drives eradicate malaria?", a: "Possibly — but at what cost? Malaria kills 600,000 annually. A successful gene drive could save most of those lives. But if the ecological cascade from suppressing Anopheles mosquitoes exceeds the disease burden, the net welfare effect is negative. Wolbachia (non-gene-drive, self-limiting) achieves 77-92% of the benefit without the irreversibility." },
    ],
  },

  water_privatization: {
    epigraph: "Thirst does not negotiate.",
    keyFindings: [
      "Each dollar of private water payoff imposes $5.61 in system welfare destruction — $1.38T per year.",
      "Bottled water: 60% is repackaged tap at 240-10,000× markup.",
      "267+ cities across 37 countries have re-municipalized water services. The exit evidence exists.",
    ],
    theorem: {
      formal: "Institutional Private-Systemic Tension (Necessity Monopoly Floor). No impossibility theorem — governance reform is feasible. Water is a natural monopoly with inelastic demand, creating extraction opportunity under private ownership.",
      plain: "Private water utilities extract monopoly rents from a necessity good with zero demand elasticity. You cannot choose not to drink. The cooperative baseline (public utility) achieves lower cost, broader access, and better infrastructure maintenance. 267 cities have already proven it by re-municipalizing.",
    },
    mcResults: { beta: 5.61, ci: "[3.70, 7.50]", dw: 1380.8, pi: 246.0 },
    agents: {
      whistleblower: "Document deferred maintenance under private management. Private utilities systematically underinvest in infrastructure while extracting dividends. The evidence is in EPA compliance data showing increasing water quality violations post-privatization, and capital expenditure reports showing maintenance deferrals.",
      plaintiff: "Rate-setting challenges before state public utility commissions. Environmental justice claims for disparate service quality in low-income communities. Contract fraud claims when private operators fail to meet service obligations.",
      regulator: "EPA (SDWA), state PUCs (rate-setting), state environmental agencies share jurisdiction. The enforcement gap: state PUCs often lack technical capacity to evaluate private utility capital expenditure plans. Rate cases are complex and under-resourced.",
      legislator: "Committee jurisdiction: Environment and Public Works (Senate), Energy & Commerce (House). The structural intervention: public financing for water infrastructure (SRF expansion), restrictions on water utility privatization, and right-to-water legislation.",
      investor: "Water utilities (American Water Works, Essential Utilities) trade at regulated utility multiples. Regulatory risk from re-municipalization trends and rate case denials. Portfolio screening: capital expenditure adequacy, regulatory compliance history, and re-municipalization exposure.",
      supranational: "UN General Assembly Resolution 64/292 (2010) recognizes the human right to water. The Sustainable Development Goal 6 targets universal access by 2030. No binding international framework prevents water privatization. Paris (2010) and Jakarta (2015) re-municipalizations provide implementation models.",
    },
    faq: [
      { q: "Isn't private management more efficient?", a: "The empirical evidence says no. A meta-analysis of 1,600 studies found no systematic efficiency advantage for private water utilities. Private operators reduce costs primarily through labor reductions and maintenance deferrals — which reduce service quality. The 267 re-municipalizations occurred because private management failed to deliver promised efficiencies." },
    ],
  },

  algorithmic_pricing: {
    epigraph: "The algorithms do not collude. They merely converge.",
    keyFindings: [
      "Each dollar of algorithmic coordination surplus destroys $5.38 in welfare — $215.2B per year.",
      "RealPage hub-and-spoke coordination: $3.8B in excess rent per year with 85% landlord compliance.",
      "Autonomous Q-learning algorithms increase margins by 9% (single adoption) to 28% (dual adoption) without communication.",
    ],
    theorem: {
      formal: "Under Tacit Coordination Ceiling (architectural contingency, not thermodynamic necessity): shared pricing algorithms enable coordinated surplus extraction. The DOJ 2025 RealPage consent decree demonstrates institutional redesign works.",
      plain: "When competing landlords feed the same algorithm their cost data and receive the same pricing recommendations, they converge on monopoly pricing without ever communicating. The algorithms do not collude in the legal sense. They merely converge on the same price, and the tenants pay the difference.",
    },
    mcResults: { beta: 5.38, ci: "[3.90, 6.90]", dw: 215.2, pi: 40.0 },
    agents: {
      whistleblower: "Document algorithm compliance rates and override patterns. RealPage recommended prices higher than market in 80%+ of cases; landlords accepted 85% of recommendations. The evidence is in software usage logs, price recommendation acceptance rates, and communications encouraging adherence to algorithmic recommendations.",
      plaintiff: "DOJ antitrust action (hub-and-spoke conspiracy via RealPage). Private class actions for supra-competitive pricing. State AG consumer protection claims. Discovery targets: algorithm training data, compliance monitoring dashboards, and communications between vendors and landlords.",
      regulator: "DOJ Antitrust Division, FTC, state AGs share jurisdiction. The enforcement gap: antitrust law was designed for human collusion. Algorithmic convergence without explicit agreement challenges traditional conspiracy frameworks.",
      legislator: "Committee jurisdiction: Judiciary (Senate and House). The structural intervention: prohibit shared pricing algorithms in concentrated markets, mandate algorithm audit requirements, and update antitrust statutes to address algorithmic coordination.",
      investor: "Real estate platforms (RealPage/Thoma Bravo, Yardi) face antitrust liability. Multifamily REITs using algorithmic pricing face class action exposure. Portfolio screening: pricing software vendor, market concentration in operating areas, and regulatory investigation status.",
      supranational: "No international framework governs algorithmic pricing. The EU Digital Markets Act addresses platform self-preferencing but not third-party algorithmic coordination. The gap: international antitrust coordination for algorithm-mediated markets.",
    },
    faq: [
      { q: "Is this really collusion if the algorithms aren't communicating?", a: "The legal framework is evolving. Hub-and-spoke conspiracy (competitors share data through a common intermediary) is established antitrust law. Whether the intermediary is a human or an algorithm is a distinction without an economic difference. The welfare effect is the same: supra-competitive pricing and consumer harm." },
    ],
  },

  pfas: {
    epigraph: "The remediation-to-application cost ratio is 20,000:1. Thermodynamically irreducible.",
    keyFindings: [
      "βW = 5.31 (Decision Accounting Field 7 extraction, pending full paper verification).",
      "The Molecular Persistence Floor: no market mechanism can reduce β below ~2.5. The carbon-fluorine bond does not break under environmental conditions.",
      "Forever Chemicals contamination is detected in 98% of Americans' blood. There is no unexposed population.",
    ],
    theorem: {
      formal: "Under Molecular Persistence (A1: C-F bond energy 485 kJ/mol), Environmental Ubiquity (A2: 98% population exposure), and Remediation Impossibility (A3: 20,000:1 remediation-to-application cost): no market mechanism can achieve welfare neutrality for persistent fluorinated compounds.",
      plain: "Forever Chemicals are forever chemicals because chemistry says so. The carbon-fluorine bond is the strongest in organic chemistry. No environmental process breaks it. Every molecule of Forever Chemicals ever manufactured still exists in the environment. Remediation costs 20,000× what application costs. The molecule outlasts the civilization that created it.",
    },
    mcResults: { beta: 5.31, ci: "[4.02, 6.61]", dw: null, pi: null },
    agents: {
      whistleblower: "Document manufacturer knowledge of persistence and toxicity. 3M and DuPont internal documents (revealed in Dark Waters litigation) show decades of suppressed research on PFOS and PFOA health effects. The evidence is in corporate archives, EPA Toxic Substances Control Act (TSCA) submissions, and worker health monitoring data.",
      plaintiff: "The 3M Forever Chemicals settlement ($10.3B for municipal water systems) established the liability scale. DuPont/Chemours settlement ($4B). State AG actions for natural resource damages. Private well contamination claims. Discovery targets: manufacturer knowledge timeline, regulatory lobbying, and suppressed health studies.",
      regulator: "EPA (Safe Drinking Water Act maximum contaminant levels for PFOA/PFOS finalized 2024), state environmental agencies (varying MCLs), DOD (military base contamination). The enforcement gap: EPA set MCLs for 6 Forever Chemicals of 15,000+ compounds. State-by-state MCL variation creates compliance patchwork.",
      legislator: "Committee jurisdiction: Environment and Public Works (Senate), Energy & Commerce (House). The structural intervention: class-based regulation (regulate Forever Chemicals as a class, not compound-by-compound), essential use framework, and polluter-pays remediation funding.",
      investor: "Chemical companies (3M, Chemours, Solvay, Daikin) face multi-billion dollar remediation liabilities. Water utilities face unfunded compliance costs for new maximum contaminant levels. Portfolio screening: Forever Chemicals production history, litigation exposure, and remediation reserve adequacy.",
      supranational: "The Stockholm Convention listed PFOS (2009), PFOA (2019), and PFHxS (2022). The EU Forever Chemicals restriction proposal (2023) would ban all Forever Chemicals with limited essential-use exemptions — the most comprehensive international action. No global framework addresses remediation of existing contamination.",
    },
    faq: [
      { q: "Can filtration solve Forever Chemicals contamination?", a: "Granular activated carbon and ion exchange remove Forever Chemicals from drinking water, but the Forever Chemicals is not destroyed — it's concentrated in waste media that must be incinerated at 1,100°C or higher. The cost is $1,500-4,000 per household per year for municipal treatment. Rural private wells have no treatment pathway at scale. Filtration manages exposure; it does not eliminate contamination." },
    ],
  },

  pe_healthcare: {
    epigraph: "The patient is the product. The disease is the business model.",
    keyFindings: [
      "Each dollar of PE healthcare extraction destroys $5.24 in system welfare — $162.4B per year.",
      "20,150 excess nursing home deaths over 12 years attributable to PE ownership.",
      "13% increase in ER mortality after PE acquisition. 25.4% increase in hospital-acquired conditions.",
    ],
    theorem: {
      formal: "Institutional Private-Systemic Tension (Fiduciary Contradiction). No impossibility theorem — institutional corrections already demonstrated in Massachusetts (leaseback bans) and Oregon (veto power).",
      plain: "PE firms acquire hospitals, strip assets through sale-leaseback, load debt onto the operating entity, reduce staffing to minimum regulatory compliance, and extract dividends. Patients die. The financial engineering destroys far more welfare than it extracts. This is solvable — Massachusetts and Oregon proved it.",
    },
    mcResults: { beta: 5.24, ci: "[4.00, 6.50]", dw: 162.4, pi: 31.0 },
    agents: {
      whistleblower: "Document staffing reductions and quality deterioration post-acquisition. The evidence is in CMS star ratings before and after PE acquisition, nurse-to-patient ratios, and incident reports filed with state health departments. Steward Health Care's bankruptcy (2024) after $8B in asset stripping provides the case study.",
      plaintiff: "Wrongful death claims against PE-owned facilities with documented quality deterioration. Fraudulent transfer claims for sale-leaseback transactions that render operating entities judgment-proof. ERISA claims for pension underfunding post-LBO.",
      regulator: "CMS (conditions of participation), state health departments, FTC (HSR Act merger review) share jurisdiction. The enforcement gap: CMS inspections are scheduled and standardized — facilities staff up for inspection weeks and staff down immediately after.",
      legislator: "Committee jurisdiction: HELP and Finance (Senate), Energy & Commerce and Ways & Means (House). The structural intervention: mandatory disclosure of PE ownership, staffing ratio requirements, sale-leaseback restrictions, and EBITDA-based debt caps for healthcare entities.",
      investor: "PE healthcare portfolio companies face regulatory risk from bipartisan scrutiny. Surprise billing legislation (No Surprises Act, 2022) reduced one extraction channel. Portfolio screening: staffing ratios, quality scores, debt-to-EBITDA ratios, and sale-leaseback exposure.",
      supranational: "No international framework governs PE investment in healthcare. The UK CMA has reviewed PE healthcare acquisitions. Most countries prevent for-profit hospital ownership entirely (Canada, many EU countries). The gap: the US is an outlier in permitting leveraged buyouts of essential healthcare infrastructure.",
    },
    faq: [
      { q: "Doesn't PE bring operational efficiency to healthcare?", a: "The empirical evidence says no. A meta-analysis of 55 studies found PE-acquired hospitals had 25% higher patient charges, 13% higher ER mortality, and 25% more hospital-acquired conditions. The 'efficiency' is cost-cutting that degrades care quality. Real operational efficiency would improve outcomes, not worsen them." },
    ],
  },

  "fx-fixing": {
    epigraph: "The fix that values the portfolio is still formed inside the market it is supposed to measure.",
    keyFindings: [
      "FX-Fixing, not LIBOR, is the active benchmark-governance target. LIBOR was structurally resolved through SOFR; the WM/Reuters 4pm FX Fix remains embedded in passive fund valuation and corporate hedging.",
      "βW = 5.13. The paper estimates $16.4B in annual system welfare destruction against $3.2B in dealer fixing extraction.",
      "The live trap is architectural: dealer banks receive client order-flow information before the fix, passive managers are locked into index tracking, and benchmark administrators preserve the valuation convention.",
    ],
    theorem: {
      formal: "Institutional Private-Systemic Tension (Self-Referential Pricing Trap, dual lock-in variant). A benchmark formed through dealer-intermediated fix-window trading remains welfare-destructive when users are fiduciarily and operationally locked into the benchmark.",
      plain: "The problem is not just bad traders in chat rooms. The problem is a benchmark architecture where the dealer executing the order can know directional client demand before the benchmark is formed, while the passive fund manager cannot simply opt out without creating tracking error. Disclosure inside the same game does not solve that. The rule change must transform benchmark construction, index obligations, and fiduciary safe harbors together.",
    },
    mcResults: { beta: 5.13, ci: "[3.42, 8.16]", dw: 16.4, pi: 3.2 },
    agents: {
      whistleblower: "Document order-flow handling, pre-hedging, benchmark-window trading, and transaction-cost analysis around the 4pm fix. The useful evidence is not merely misconduct language; it is the operational record linking client fix orders, dealer positioning, benchmark movement, and beneficiary cost.",
      plaintiff: "Potential claims focus on pension beneficiaries, passive funds, corporate hedgers, and fiduciary monitoring duties. Discovery targets include execution-quality studies, communications with index providers, pre-hedging policies, and internal estimates of implementation shortfall.",
      regulator: "FCA, CFTC, SEC, IOSCO, FSB, central banks, and benchmark supervisors divide authority. The game-changing instrument is not another conduct notice; it is coordinated benchmark transition, transaction-based construction, index-provider migration, and statutory protection for managers during the change.",
      legislator: "The legislative gap is a safe-harbor and transition statute analogous in function to LIBOR transition protection but tailored to FX asset valuation. Without protection, fund managers face fiduciary liability for tracking error even when the alternative benchmark is system-superior.",
      investor: "Institutional investors should demand explicit transaction-cost analysis for FX execution at the fix, benchmark-exposure reporting, and manager justification under DA Field 16. The welfare cost is borne by beneficiaries even when no single trade looks illegal.",
      supranational: "FSB and IOSCO are the natural coordination layer because no single jurisdiction controls the benchmark, index providers, dealer banks, passive funds, and cross-border asset valuation together. Singapore's SORA transition is a proof of institutional possibility, not a complete FX template.",
    },
    faq: [
      { q: "Why is this ranked as Intractability, not Impossibility?", a: "Because the binding constraint is institutional, not physical. LIBOR's SOFR transition proves benchmark architecture can be redesigned. FX-Fixing is harder because it governs asset valuation and is embedded in index tracking, but the obstacle is coordinated rule change, not physics." },
      { q: "Why is LIBOR no longer the active target?", a: "LIBOR was structurally replaced by SOFR for the relevant U.S. dollar rate benchmark. It remains a comparison case and proof that financial infrastructure can be migrated. The active benchmark-source concentration problem is FX-Fixing." },
    ],
  },

  bitcoin: {
    epigraph: "Every Bloomberg terminal prints the gain. None prints the five-dollar invoice the commons receives for each dollar of it.",
    keyFindings: [
      "Each dollar of Bitcoin-related revenue destroys $5.00 of system welfare across six channels.",
      "The Protocol Welfare Floor: no permissionless blockchain can achieve βW < 1.0.",
      "Classification invariant across all 25 sensitivity cells and 10,000 Monte Carlo simulations.",
    ],
    theorem: {
      formal: "Under Permissionless Access (A1), Transaction Irreversibility (A2), and User Sovereignty (A3): the protocol architecture mathematically guarantees βW ≥ 1.0. Regulatory custody rules required.",
      plain: "Proof-of-work consumes enormous energy, mining consolidates, custody recentralizes, and the result is worse welfare than traditional finance despite the decentralization promise. The three axioms that make Bitcoin valuable are the same three axioms that make it welfare-destructive. The impossibility is architectural.",
    },
    mcResults: { beta: 5.00, ci: "[3.20, 7.80]", dw: 210.0, pi: 42.0 },
    agents: {
      whistleblower: "Document mining centralization contradicting decentralization claims. Four mining pools control 70%+ of hash rate. The evidence is in pool distribution data, ASIC manufacturer concentration, and geographic clustering in low-electricity-cost jurisdictions.",
      plaintiff: "Securities fraud for projects making decentralization claims while operating centralized infrastructure. Environmental claims for unpriced energy externalities. Consumer protection for exchange failures and custody losses.",
      regulator: "SEC (securities), CFTC (commodities), FinCEN (money transmission), state regulators share jurisdiction. The enforcement gap: no single agency has comprehensive authority. MiCA (EU) and the GENIUS Act (US stablecoins) provide emerging frameworks.",
      legislator: "Committee jurisdiction: Banking (Senate), Financial Services (House). The structural intervention: energy disclosure mandates for mining, carbon fee on proof-of-work computation, and mandatory custody standards.",
      investor: "Bitcoin mining companies (Marathon, Riot, CleanSpark) face energy price and regulatory risk. Exchange concentration risk (Coinbase, Binance). Portfolio screening: energy source disclosure, mining efficiency (J/TH), and regulatory compliance status.",
      supranational: "No binding international framework governs cryptocurrency mining. MiCA provides the EU template. El Salvador's Bitcoin legal tender experiment provides negative evidence. The gap: international coordination on mining energy standards and cross-border regulatory arbitrage.",
    },
    faq: [
      { q: "Doesn't Bitcoin use renewable energy?", a: "Approximately 50% of mining uses renewable sources, but this is misleading. Bitcoin mining consumes 150+ TWh annually regardless of source. The renewable energy consumed by mining is diverted from other uses. The carbon externality is reduced but the opportunity cost remains. And the protocol welfare floor (βW ≥ 1.0) applies regardless of energy source because the non-energy channels persist." },
    ],
  },

  aviation: {
    epigraph: "Every mile of altitude multiplies the damage on the ground.",
    keyFindings: [
      "Each dollar of aviation revenue destroys $4.97 in system welfare — $497.5B per year.",
      "Non-CO2 forcing (contrails, NOx, water vapor) accounts for two-thirds of total radiative forcing — entirely unpriced.",
      "Top 1% of global population causes 50% of passenger aviation emissions.",
    ],
    theorem: {
      formal: "Institutional Private-Systemic Tension (Altitude Forcing Floor). No impossibility theorem — every channel admits policy correction: carbon pricing, SAF mandates, frequent flyer levies.",
      plain: "Aviation externalities are unpriced. The industry spends $134 million per year on lobbying to keep it that way. The €35.7B annual kerosene tax exemption in the EU alone subsidizes climate damage at a scale that dwarfs most environmental programs.",
    },
    mcResults: { beta: 4.97, ci: "[3.60, 6.40]", dw: 497.5, pi: 100.0 },
    agents: {
      whistleblower: "Document the gap between airline sustainability claims and actual emissions trajectories. Most airline 'net zero by 2050' commitments rely on SAF volumes that do not exist and offset credits that do not work. The evidence is in SAF procurement contracts vs. published commitments.",
      plaintiff: "Greenwashing claims for misleading carbon offset marketing. Environmental justice claims for airport-adjacent community health impacts. State AG consumer protection actions for deceptive sustainability advertising.",
      regulator: "FAA (safety), EPA (emissions), ICAO (international standards) share jurisdiction. The enforcement gap: Carbon Offsetting and Reduction Scheme for International Aviation (CORSIA) (Carbon Offsetting and Reduction Scheme for International Aviation) relies on offset quality that is unverifiable and allows baseline manipulation.",
      legislator: "Committee jurisdiction: Commerce (Senate), Transportation (House). The structural intervention: kerosene tax elimination phase-out, SAF blending mandates with escalating targets, and frequent flyer levy (progressive taxation of aviation consumption).",
      investor: "Airlines face increasing carbon cost exposure from EU ETS expansion and potential kerosene taxation. SAF premium ($2-5/gallon over jet fuel) creates margin pressure. Portfolio screening: fleet fuel efficiency, SAF blending commitments, and carbon cost exposure modeling.",
      supranational: "ICAO governs international aviation standards. Carbon Offsetting and Reduction Scheme for International Aviation (CORSIA) is the primary international climate mechanism but relies on voluntary offset markets. The EU's Fit for 55 package (ReFuelEU Aviation) mandates SAF blending. The gap: non-CO2 forcing remains unpriced in all frameworks.",
    },
    faq: [
      { q: "Can sustainable aviation fuel solve this?", a: "SAF reduces lifecycle CO2 by 50-80% but does not address non-CO2 forcing (contrails, NOx), which is two-thirds of the climate impact. SAF production capacity is 0.1% of global jet fuel demand. Break-even SAF penetration for βW < 1.0 requires ~65% of fuel supply. At current growth rates, that's 2045-2050." },
    ],
  },

  defense_procurement: {
    epigraph: "When only one company can build the weapon, the weapon builds the company.",
    keyFindings: [
      "Each dollar of defense procurement destroys $4.88 in system welfare — $164.4B per year.",
      "54.2% of contract dollars lack genuine competition. 50-100%+ lifecycle cost growth on major programs.",
      "Sweden's Gripen costs $22,100-36,200/flight-hour vs. F-35's $35,000-50,000+. Alternatives exist.",
    ],
    theorem: {
      formal: "Institutional Private-Systemic Tension (Monopsony Lock-In). Not a thermodynamic problem but a market-structure failure from statutory architecture, contractual design, and political incentives.",
      plain: "Five defense contractors enjoy monopsony rents from a single buyer. Cost-plus contracts shift risk to taxpayers. Low competition rates mean billions in excess costs. Lockheed Martin received $1.7B despite the F-35 fleet achieving only 50% availability — 17 points below minimum. The system rewards failure.",
    },
    mcResults: { beta: 4.88, ci: "[4.20, 5.60]", dw: 164.4, pi: 33.7 },
    agents: {
      whistleblower: "Document cost growth concealment and performance metric manipulation. Program offices routinely rebaseline schedules and costs to avoid Nunn-McCurdy breach reporting. The evidence is in Selected Acquisition Reports (SARs), GAO weapons systems reviews, and DOT&E operational testing reports.",
      plaintiff: "False Claims Act (qui tam) for contractor fraud, defective pricing, and performance misrepresentation. The defense industry pays $2-3B annually in FCA settlements. Discovery targets: cost and pricing data (TINA), subcontractor markup chains, and test result modifications.",
      regulator: "DOD (OUSD A&S), GAO (auditing), DOT&E (testing) share jurisdiction. The enforcement gap: DOD has never passed a full financial audit. DCAA (Defense Contract Audit Agency) has a backlog of $300B+ in incurred cost audits.",
      legislator: "Committee jurisdiction: Armed Services (Senate and House), Appropriations. The structural intervention: fixed-price contracts for mature programs, dual-source competition requirements, and independent cost estimation with binding authority.",
      investor: "Defense primes (Lockheed Martin $120B, RTX $74B, Boeing $78B, Northrop $75B, GD $80B) trade at premium multiples reflecting guaranteed demand. Regulatory risk from procurement reform is low given defense industrial base policy. Portfolio screening: competitive win rate, cost growth history, and audit opinion status.",
      supranational: "NATO interoperability requirements constrain procurement alternatives. The EU EDIRPA (European Defence Industry Reinforcement through Common Procurement Act) aims to reduce dependence on US suppliers. No international framework governs defense procurement efficiency.",
    },
    faq: [
      { q: "Why doesn't competition solve this?", a: "Because the market structure prevents competition. Once a platform is selected (F-35, Virginia-class submarine), the contractor has a monopoly for 30-50 years of production and sustainment. Entry barriers ($10B+ in facility investment) prevent new competitors. And the political incentive to spread production across congressional districts ensures programs survive regardless of performance." },
    ],
  },

  orbital_debris: {
    epigraph: "Space is small. Low Earth Orbit is smaller still.",
    keyFindings: [
      "Each dollar of Orbital Access Premium is accompanied by $4.82 of welfare destruction.",
      "Runaway threshold crossed: the 520-1,000km altitude band exceeded Kessler self-sustaining cascade density.",
      "GPS generates $1.4T in cumulative US economic benefits; a cascade outage costs $1B per day.",
    ],
    theorem: {
      formal: "Under Launch Necessity (A1), Debris Generation Identity (A2), and Kessler Cascade Irreversibility (A3): no market mechanism can reduce βW below ~1.5. Article II of the Outer Space Treaty bans both Coasian property rights and Pigouvian taxation.",
      plain: "Satellites fragment at hypervelocity. The debris persists for centuries. The orbital commons has no sovereign authority to enforce property rights or levy environmental taxes. Seven convergent crossover thresholds close the intervention window by 2040-2060.",
    },
    mcResults: { beta: 4.82, ci: "[3.12, 6.52]", dw: 8.0, pi: 2.2 },
    agents: {
      whistleblower: "Document the gap between operator debris mitigation commitments and actual practices. SpaceX Starlink satellites have generated multiple close approach warnings. The evidence is in conjunction data from 18th Space Control Squadron and operator disposal compliance rates.",
      plaintiff: "No established liability framework for orbital debris. The Liability Convention (1972) covers state-to-state claims for damage from space objects but has been invoked only once (Cosmos 954). No private right of action exists under international space law.",
      regulator: "FCC (orbital debris mitigation for US-licensed satellites), FAA (launch licensing), NOAA share jurisdiction. The FCC's 2022 5-year deorbit rule is the strongest US regulation but applies only to new satellites and cannot address legacy debris.",
      legislator: "Committee jurisdiction: Commerce (Senate), Science (House). The structural intervention: orbital use fees (economic incentive for deorbiting), active debris removal mandate, and international space sustainability treaty.",
      investor: "Space companies (SpaceX private, Planet $1.5B, Viasat $3B) face regulatory risk from debris mitigation requirements. Insurance costs for orbital operations are rising. Portfolio screening: debris mitigation compliance, conjunction avoidance capability, and deorbit timeline commitments.",
      supranational: "COPUOS (UN Committee on the Peaceful Uses of Outer Space) develops non-binding guidelines. The Outer Space Treaty (1967) establishes the legal framework but Article II prohibits sovereignty claims — preventing both property rights and taxation. The gap: no enforcement mechanism for debris mitigation standards.",
    },
    faq: [
      { q: "Is Kessler syndrome already happening?", a: "In certain altitude bands, yes. The 520-1,000km band has exceeded the self-sustaining collision threshold — debris generates more debris than natural deorbiting removes. A cascade in this band would render it unusable for decades. The lower LEO bands (300-500km) used by Starlink are self-cleaning due to atmospheric drag, but the mid-altitude bands are not." },
    ],
  },

  fisheries: {
    epigraph: "The ocean does not negotiate. It simply stops producing.",
    keyFindings: [
      "Each dollar of fishing rent destroys $4.70 in system welfare — $178.6B per year.",
      "$552B/yr cooperative baseline achievable under optimal management.",
      "50 stocks rebuilt under US Magnuson-Stevens Act since 2000. The reform template exists.",
    ],
    theorem: {
      formal: "Institutional Private-Systemic Tension (Oceanic Rent Gap). No impossibility theorem — biological reversibility makes welfare recovery feasible on decadal timescales.",
      plain: "Overfishing depletes stocks, subsidies keep unprofitable fleets running, and bycatch destroys habitat. The system destroys $4.70 in welfare for every $1 of revenue. But fishing is reversible through institutional redesign — the Magnuson-Stevens Act and PNA Vessel Day Scheme prove it.",
    },
    mcResults: { beta: 4.70, ci: "[3.80, 5.60]", dw: 178.6, pi: 38.0 },
    agents: {
      whistleblower: "Document IUU (illegal, unreported, unregulated) fishing operations. Satellite vessel tracking (VMS/AIS) shows fishing in marine protected areas and closed zones. The evidence is in Global Fishing Watch data, port inspection records, and transshipment at sea activity.",
      plaintiff: "Trade enforcement claims under the US SIMP (Seafood Import Monitoring Program). Environmental claims for bycatch of protected species (ESA, MMPA). NOAA enforcement actions for quota violations.",
      regulator: "NOAA (federal fisheries), regional fishery management councils, Coast Guard (enforcement) share jurisdiction. The enforcement gap: IUU fishing is estimated at $10-23.5B annually, and enforcement covers less than 5% of ocean fishing activity.",
      legislator: "Committee jurisdiction: Commerce (Senate), Natural Resources (House). The structural intervention: harmful subsidy elimination ($22.2B/yr global capacity-enhancing subsidies), mandatory VMS/AIS for all fishing vessels, and expanded MSA catch share programs.",
      investor: "Publicly traded seafood companies (Thai Union $5B, Mowi $12B, Maruha Nichiro $8B) face supply chain risk from stock depletion and IUU enforcement. Aquaculture companies face feed sourcing risk from forage fish depletion. Portfolio screening: sourcing traceability, IUU risk exposure, and stock sustainability ratings (MSC certification).",
      supranational: "The WTO Agreement on Fisheries Subsidies (2022) is the most significant international fisheries reform in decades. RFMO (Regional Fishery Management Organization) quotas govern high-seas stocks but enforcement varies. The gap: 60% of global catch occurs in national waters governed by domestic law.",
    },
    faq: [
      { q: "Can aquaculture replace wild fishing?", a: "Aquaculture already produces 50%+ of seafood consumed. But fed aquaculture (salmon, shrimp) requires forage fish as feed, creating a dependency on wild fisheries. Unfed aquaculture (seaweed, mussels, oysters) has no such dependency and generates positive ecosystem services. The distinction between fed and unfed aquaculture is critical." },
    ],
  },

  sovereign_debt: {
    epigraph: "The borrower is mortal. The debt is not.",
    keyFindings: [
      "Each dollar of creditor return destroys $4.67 in global welfare — $163.5B per year.",
      "Climate-debt trap adds $5T/yr in deferred damages to developing nations already paying extractive rates.",
    ],
    theorem: {
      formal: "Intergenerational Extraction Floor. Institutional Private-Systemic Tension — solvable through debt restructuring frameworks.",
      plain: "Wealthy nations lend to developing countries at extractive terms, destroying $4.67 in global welfare per dollar of creditor return. The intergenerational extraction is structural: today's lending creates tomorrow's debt service that prevents investment in education, health, and climate adaptation.",
    },
    mcResults: { beta: 4.67, ci: "[3.40, 5.90]", dw: 163.5, pi: 35.0 },
    agents: {
      whistleblower: "Document the gap between official development assistance (ODA) and net financial flows. Many developing countries are net exporters of capital to developed nations when debt service is included. The evidence is in World Bank International Debt Statistics.",
      plaintiff: "Odious debt claims for debts incurred by illegitimate regimes. Vulture fund litigation precedents (NML Capital v. Argentina). Sovereign immunity waivers create litigation risk.",
      regulator: "IMF (surveillance), World Bank (lending standards), national finance ministries share jurisdiction. The enforcement gap: IMF conditionality imposes austerity that deepens the welfare cost while protecting creditor recovery.",
      legislator: "Committee jurisdiction: Foreign Relations (Senate), Financial Services (House). The structural intervention: sovereign debt restructuring mechanism (SDRM), climate-conditional debt relief, and odious debt doctrine codification.",
      investor: "Emerging market sovereign debt ($4.5T) faces default risk concentration. Portfolio screening: debt-to-GDP trajectories, climate vulnerability indices, and restructuring precedent analysis.",
      supranational: "The Paris Club and London Club provide informal restructuring frameworks. The Common Framework for Debt Treatments (G20, 2020) has processed only 4 cases in 6 years. No binding international sovereign bankruptcy framework exists.",
    },
    faq: [
      { q: "Why can't countries just default?", a: "Default triggers capital market exclusion, trade credit withdrawal, and IMF conditionality. The cost of default often exceeds the cost of continued debt service in the short term. This creates a debt trap: countries service unpayable debt because the alternative is worse. The structural solution is a sovereign bankruptcy framework — like Chapter 11 but for nations." },
    ],
  },

  insurance_climate: {
    epigraph: "The industry that prices risk has decided some risks are too real to price.",
    keyFindings: [
      "Each dollar of underwriting profit destroys $4.57 in system welfare — $411.1B per year.",
      "Property stranding pipeline: $1.47T over 30 years.",
      "Regulatory efficiency κ = 0.08 — second-lowest outside Forever Chemicals.",
    ],
    theorem: {
      formal: "Tail Risk Exclusion Ratchet (Institutional Private-Systemic Tension). Not impossibility — institutional correction is feasible through risk-based pricing mandates and public backstop design.",
      plain: "Insurers systematically underprice climate risk in the present and withdraw coverage as risks materialize. The ratchet: underprice today (moral hazard for development in flood/fire zones), then refuse to cover tomorrow (stranded assets). The system socializes the losses that private pricing should have prevented.",
    },
    mcResults: { beta: 4.57, ci: "[3.30, 5.80]", dw: 411.1, pi: 90.0 },
    agents: {
      whistleblower: "Document the gap between internal catastrophe models and filed rates. Insurers routinely use models showing higher risk than reflected in premium filings submitted to regulators. The evidence is in Risk Management Solutions / Applied Insurance Research model outputs vs. rate filings, and internal reinsurance purchasing decisions that price risk higher than retail premiums imply.",
      plaintiff: "Bad faith claims for coverage denial in climate events. Securities fraud for insurers misrepresenting reserve adequacy for climate liabilities. Policyholder class actions for rate inadequacy that leads to insolvency.",
      regulator: "State insurance commissioners (National Association of Insurance Commissioners), Federal Insurance Office (FIO), SEC share jurisdiction. The enforcement gap: state-by-state regulation creates race-to-the-bottom competition on rate adequacy. No federal climate risk standard for insurance pricing.",
      legislator: "Committee jurisdiction: Banking (Senate), Financial Services (House). The structural intervention: federal climate risk disclosure for insurers, National Flood Insurance Program (NFIP) reform (risk-based pricing with means-tested subsidies), and public reinsurance backstop for climate tail risk.",
      investor: "P&C insurers face increasing combined ratio volatility from climate events. Reinsurance costs are rising 20-30% annually for catastrophe-exposed lines. Portfolio screening: geographic exposure concentration, catastrophe model vintage, and reserve adequacy for climate scenarios.",
      supranational: "The IAIS (International Association of Insurance Supervisors) addresses climate risk through its Climate Risk Steering Group. The Task Force on Climate-Related Financial Disclosures framework applies to insurers. The gap: no international standard for climate risk pricing in insurance.",
    },
    faq: [
      { q: "Why are insurers withdrawing from high-risk areas?", a: "Because the risk is real and the pricing is not allowed to reflect it. State regulators limit rate increases to protect affordability, but affordable premiums in wildfire and flood zones create moral hazard — people build where they shouldn't because insurance makes it seem safe. When the premiums can't cover the losses, insurers withdraw. The result is the worst of both worlds: no coverage AND continued development in high-risk areas." },
    ],
  },

  topsoil: {
    epigraph: "A nation that destroys its soils destroys itself.",
    keyFindings: [
      "Each dollar of tillage premium revenue ($255B/yr) destroys $4.41 in welfare — $1.12T per year.",
      "Kinetic mismatch: soil formation 1 inch per 500-1,000 years vs. erosion 1 inch per 25-50 years.",
      "One-third of the US Corn Belt has entirely lost its A-horizon topsoil.",
    ],
    theorem: {
      formal: "Pedogenesis Floor (Impossibility Theorem). Under Formation Asymmetry (A1), Tillage Acceleration (A2), and Carbon Release Irreversibility (A3): industrial tillage depletes topsoil 20-40× faster than nature rebuilds it.",
      plain: "Topsoil forms at 1 inch per 500-1,000 years. Industrial agriculture erodes it at 1 inch per 25-50 years. The arithmetic is unambiguous: we are mining a non-renewable resource and calling it farming. The impossibility is geological — no policy accelerates pedogenesis.",
    },
    mcResults: { beta: 4.41, ci: "[3.40, 5.40]", dw: 1123.0, pi: 255.0 },
    agents: {
      whistleblower: "Document the gap between USDA tolerable soil loss rates (T-values) and actual erosion. T-values assume soil formation rates 10× higher than measured pedogenesis. The evidence is in Natural Resources Conservation Service soil surveys showing declining soil organic matter and erosion rates exceeding T-values on 30%+ of cropland.",
      plaintiff: "Clean Water Act claims for sediment discharge from agricultural operations. Property value diminution claims for eroded farmland. Intergenerational equity claims for destroying the productivity of land held in trust.",
      regulator: "USDA (Natural Resources Conservation Service conservation programs), EPA (CWA sediment), state soil conservation districts share jurisdiction. The enforcement gap: agricultural nonpoint source pollution is exempt from CWA permitting. Conservation compliance requirements are weakly enforced.",
      legislator: "Committee jurisdiction: Agriculture (Senate and House). The structural intervention: soil health standards tied to crop insurance eligibility, cover crop mandates, and conservation compliance enforcement.",
      investor: "Farmland REITs and agricultural companies face long-term productivity decline from topsoil loss. Regenerative agriculture companies represent the transition opportunity. Portfolio screening: soil organic matter trends, erosion rate monitoring, and cover crop adoption rates.",
      supranational: "The UN Convention to Combat Desertification (UNCCD) addresses land degradation. The Global Soil Partnership (FAO) sets voluntary guidelines. The gap: no binding international standard for sustainable soil management in agriculture.",
    },
    faq: [
      { q: "Can regenerative agriculture reverse topsoil loss?", a: "Cover crops, no-till, and diverse rotations can rebuild soil organic matter at approximately 0.1-0.4% per year. Full A-horizon regeneration takes 50-200 years under best practices. Regenerative agriculture slows the loss and begins recovery, but the geological timescale means the damage from the last century will take centuries to fully repair." },
    ],
  },

  upf: {
    epigraph: "The bliss point is engineered. The diabetes is not.",
    keyFindings: [
      "Each dollar of processing-premium profit destroys $4.06 in system welfare — $1.83T per year.",
      "Metabolic-disease channel alone: $1.10T/yr (Hall et al. 2019 RCT basis).",
      "Break-even mitigation: 87% of current welfare damage must be eliminated.",
    ],
    theorem: {
      formal: "Palatability Ratchet (Institutional Private-Systemic Tension). The bliss point engineering creates supra-normal palatability that overrides satiety signaling, driving overconsumption.",
      plain: "Ultra-processed food is engineered to maximize consumption, not nutrition. The Hall RCT (2019) demonstrated that Ultra-Processed Food consumption increases caloric intake by 500 kcal/day without conscious awareness. The bliss point is a design parameter. The metabolic disease is the externality.",
    },
    mcResults: { beta: 4.06, ci: "[3.39, 4.95]", dw: 1829.0, pi: 450.0 },
    agents: {
      whistleblower: "Document industry knowledge of Ultra-Processed Food health effects suppressed in regulatory submissions. Internal research on palatability engineering and consumption optimization. The evidence is in product development files, consumer testing protocols, and lobbying communications targeting dietary guideline committees.",
      plaintiff: "Product liability claims analogous to tobacco litigation — manufacturer knowledge of health effects combined with marketing to vulnerable populations. State AG consumer protection claims for deceptive health marketing. Childhood obesity claims against school food service contracts.",
      regulator: "FDA (food labeling, GRAS), USDA (dietary guidelines, school meals), FTC (advertising) share jurisdiction. The enforcement gap: FDA's GRAS (Generally Recognized as Safe) framework allows industry self-certification of food additives without independent review.",
      legislator: "Committee jurisdiction: HELP (Senate), Energy & Commerce (House). The structural intervention: front-of-package warning labels (Chile model), sugar-sweetened beverage taxes, and Ultra-Processed Food advertising restrictions for children.",
      investor: "Ultra-Processed Food companies (PepsiCo $240B, Nestlé $280B, Kraft Heinz $40B) face regulatory risk from labeling requirements and advertising restrictions. Mexico's front-of-package labels reduced Ultra-Processed Food sales 5-7% in the first year. Portfolio screening: Ultra-Processed Food revenue percentage, reformulation investment, and regulatory exposure by jurisdiction.",
      supranational: "WHO recommends limits on Ultra-Processed Food marketing to children but guidelines are non-binding. The Codex Alimentarius sets food standards but has not addressed Ultra-Processed Food as a category. Chile, Mexico, Colombia, and Israel have implemented front-of-package warning labels. The gap: no international consensus on Ultra-Processed Food classification or regulatory framework.",
    },
    faq: [
      { q: "Is this just about personal choice?", a: "The Hall RCT (2019) showed that people consuming Ultra-Processed Food ate 500 more calories per day than those eating unprocessed food — without intending to, without being aware of it, and despite identical macronutrient availability. The food is engineered to override choice. When the product design overrides the consumer's satiety signaling, 'personal choice' is doing heavy lifting." },
    ],
  },

  groundwater: {
    epigraph: "Every bushel of Kansas wheat costs three hundred gallons of Pleistocene ice.",
    keyFindings: [
      "Each dollar of irrigation extraction premium destroys $3.46 in welfare — $32.9B per year.",
      "Extraction-to-recharge ratio exceeds 10:1. Natural refill time: 500-1,300 years.",
      "Kansas LEMA achieved 25-31% pumping reduction without farm profitability collapse.",
    ],
    theorem: {
      formal: "Aquifer Recharge Floor (Impossibility Theorem). Under Hydrogeological Asymmetry (A1: extraction rate >> recharge rate), Temporal Mismatch (A2: agricultural planning horizon << refill time), and Jurisdictional Fragmentation (A3): no market mechanism can achieve sustainable yield.",
      plain: "The Ogallala Aquifer took 10,000 years to fill. We are draining it in 100. The extraction-to-recharge ratio exceeds 10:1 in the Central and Southern High Plains. Natural refill: 500-1,300 years. The impossibility is hydrogeological — no policy makes water appear faster.",
    },
    mcResults: { beta: 3.46, ci: "[2.30, 4.60]", dw: 32.9, pi: null },
    agents: {
      whistleblower: "Document groundwater depletion rates exceeding reported sustainable yields. Well metering is not required in most High Plains states. The evidence is in USGS groundwater level monitoring data, satellite-based GRACE gravity measurements showing mass loss, and declining well yields.",
      plaintiff: "Water rights disputes between senior and junior appropriators as wells run dry. Property value diminution claims from declining water availability. Interstate compact claims (Kansas v. Colorado, Texas v. New Mexico).",
      regulator: "State water agencies (prior appropriation doctrine), USGS (monitoring), EPA (underground injection) share jurisdiction. The enforcement gap: most High Plains states do not require well metering, making enforcement of extraction limits impossible.",
      legislator: "Committee jurisdiction: Agriculture (Senate and House), Energy and Natural Resources. The structural intervention: mandatory well metering, groundwater management districts with binding allocation authority (Kansas LEMA model), and transition support for dryland agriculture.",
      investor: "Agricultural companies dependent on Ogallala irrigation face long-term productivity decline. Farmland values in heavily depleted areas (Kansas, Texas Panhandle) are declining. Portfolio screening: aquifer depletion rate in operating areas, irrigation efficiency investment, and dryland transition planning.",
      supranational: "No international framework governs transboundary aquifer management. The ISARM (Internationally Shared Aquifer Resources Management) program identifies shared aquifers but has no regulatory authority. The gap: groundwater governance is almost entirely domestic.",
    },
    faq: [
      { q: "Can't we just import water?", a: "Water is heavy (8.3 lbs/gallon) and the distances are vast. Piping water from the Missouri River to western Kansas would cost $18-22 billion for infrastructure alone, plus $500M+ annually in pumping costs. The energy required to move water uphill across hundreds of miles makes large-scale transfer economically unviable at current agricultural commodity prices." },
    ],
  },

  pos: {
    epigraph: "Proof-of-stake eliminates the energy problem. It does not eliminate the welfare problem.",
    keyFindings: [
      "βW ranges from 1.5 (Cardano) to 2.7 (Solana). Ethereum at 2.4.",
      "Proof-of-Stake eliminates Bitcoin's energy channel but predatory transaction ordering (Maximal Extractable Value) replaces energy as the dominant welfare cost.",
      "The custodial floor (βW ≈ 1.1) is universal and chain-agnostic.",
    ],
    theorem: {
      formal: "Protocol Welfare Floor (Impossibility Theorem). Permissionless architecture guarantees βW ≥ 1.0 regardless of consensus mechanism.",
      plain: "Proof-of-Stake eliminates Bitcoin's energy problem but replaces it with validator concentration and front-running. Maximal Extractable Value extracts rent from users through transaction ordering manipulation. The Protocol Welfare Floor still holds: no permissionless blockchain achieves βW < 1.0.",
    },
    mcResults: { beta: 3.14, ci: "[2.31, 3.98]", dw: 6.0, pi: 12.0 },
    agents: {
      whistleblower: "Document Maximal Extractable Value extraction and validator concentration. Flashbots data shows Maximal Extractable Value extraction exceeding $600M annually on Ethereum alone. The evidence is in Maximal Extractable Value-Boost relay data, builder concentration metrics, and sandwich attack frequency.",
      plaintiff: "Securities fraud for Proof-of-Stake projects making decentralization claims while validator sets are concentrated. Consumer protection for Maximal Extractable Value extraction that users cannot detect or avoid.",
      regulator: "SEC (Ethereum securities classification debate), CFTC, state regulators share jurisdiction. MiCA provides EU classification framework. The enforcement gap: Proof-of-Stake token classification remains unresolved in the US.",
      legislator: "Committee jurisdiction: Banking (Senate), Financial Services (House). The structural intervention: Maximal Extractable Value transparency requirements, validator concentration limits, and consumer protection standards for decentralized finance protocols.",
      investor: "Proof-of-Stake token staking yields (3-8%) attract institutional capital but regulatory classification risk remains. Portfolio screening: validator Nakamoto coefficient, Maximal Extractable Value extraction rate, and regulatory classification status by jurisdiction.",
      supranational: "EU MiCA provides the most comprehensive Proof-of-Stake regulatory framework. No international framework addresses Maximal Extractable Value or validator concentration. The gap: cross-border regulatory arbitrage for Proof-of-Stake protocols.",
    },
    faq: [
      { q: "Is Proof-of-Stake better than Proof-of-Work?", a: "On energy: dramatically better (99.9% reduction). On welfare: moderately better (βW 2-3 vs. 5). On decentralization: worse (validator concentration exceeds mining pool concentration). The improvement is real but partial. The Protocol Welfare Floor (βW ≥ 1.0) applies to both." },
    ],
  },

  nuclear: {
    epigraph: "The only energy technology that generates net positive welfare value while leaving an impossibility theorem as the receipt.",
    keyFindings: [
      "Weighted average βW = 0.53 (marginal βW = 0.70). 91% of Monte Carlo draws produce βW < 1.0.",
      "System-adjusted payoff: +$70B/yr — positive but reduced 53% by welfare costs.",
      "A βW < 1 control/comparator, not a Wave 1 market-failure flagship.",
    ],
    theorem: {
      formal: "Control / Comparator. No fuel cycle can guarantee radiotoxicity below any fixed threshold on civilizational timescales, but βW remains below 1.",
      plain: "Nuclear fission is welfare-positive: it produces clean electricity with a system cost well below its social benefit. But the Persistence Floor theorem is real: spent fuel remains radioactive for 100,000+ years. No human institution has survived 10,000 years. The impossibility is temporal, not economic.",
    },
    mcResults: { beta: 0.54, ci: "[0.40, 0.70]", dw: 23.7, pi: 44.0 },
    agents: {
      whistleblower: "Document the gap between decommissioning cost estimates and actual costs. Decommissioning funds are chronically underfunded. The evidence is in NRC decommissioning fund reports, actual vs. estimated decommissioning costs for completed projects, and unfunded liability calculations.",
      plaintiff: "Price-Anderson Act liability cap ($13.6B) socializes catastrophic risk. Claims against DOE for Yucca Mountain inaction (utilities have recovered $10B+ in damages for DOE's failure to accept spent fuel as contractually obligated). Property value diminution claims near nuclear facilities.",
      regulator: "NRC (safety), DOE (waste), EPA (radiation standards), FERC (economics) share jurisdiction. The enforcement gap: no permanent spent fuel repository exists (Yucca Mountain cancelled 2011). 80,000+ tonnes of spent fuel stored at 70+ reactor sites in temporary pools and dry casks.",
      legislator: "Committee jurisdiction: Environment and Public Works (Senate), Energy & Commerce (House). The structural intervention: consent-based siting for geological repository, advanced reactor licensing reform, and production tax credits for existing fleet preservation.",
      investor: "Nuclear utilities (Constellation $70B, Duke $85B, Southern $80B) face favorable policy tailwinds from clean energy demand and AI datacenter power needs. New build risk remains high (Vogtle 3&4: $35B, 7 years late). Portfolio screening: fleet capacity factor, license renewal status, and decommissioning fund adequacy.",
      supranational: "IAEA safeguards and safety standards govern international nuclear governance. The Joint Convention on the Safety of Spent Fuel Management (1997) addresses waste. Finland's Onkalo repository (operational 2025) is the first permanent geological disposal facility. The gap: most nuclear nations have no repository pathway.",
    },
    faq: [
      { q: "If βW < 1, why is nuclear classified as Impossibility?", a: "Because the theorem describes a constraint that no policy can overcome — radioactive decay follows physical law. The welfare cost is positive but low (βW = 0.53). The impossibility is that spent fuel radiotoxicity cannot be eliminated on human timescales. Nuclear is the only domain where the impossibility theorem coexists with net positive welfare. It's an impossibility you can live with." },
    ],
  },

  arms_exports: {
    epigraph: "The export license expires. The weapon does not.",
    keyFindings: [
      "Each dollar of arms export value destroys $2.54 in system welfare — $75B per year.",
      "40% of corruption in international transactions is arms-related.",
      "$7.12B in weapons abandoned in Afghanistan — the largest documented single diversion event.",
    ],
    theorem: {
      formal: "End-Use Enforcement Impossibility (Institutional Private-Systemic Tension). Once exported, weapons cannot be tracked, recalled, or controlled across jurisdictional boundaries.",
      plain: "Arms exports create welfare destruction through conflict prolongation, diversion, corruption, and governance erosion. The export license has an expiration date. The weapon does not. Every rifle, every missile, every armored vehicle persists in the field for decades after export controls lapse.",
    },
    mcResults: { beta: 2.54, ci: "[1.90, 3.20]", dw: 75.0, pi: 29.6 },
    agents: {
      whistleblower: "Document end-use monitoring failures and diversion. US weapons sold to Saudi Arabia and UAE have been documented in the hands of AQAP and Houthi forces. The evidence is in CAR (Conflict Armament Research) field tracing reports and Stockholm International Peace Research Institute (SIPRI) transfer databases.",
      plaintiff: "International Traffic in Arms Regulations violations for unauthorized re-transfer. Alien Tort Statute claims for downstream human rights violations. False Claims Act for misrepresentation of end-use compliance.",
      regulator: "State Department (Defense Security Cooperation Agency/Directorate of Defense Trade Controls), Commerce (BIS), Congress (Arms Export Control Act (AECA) notifications) share jurisdiction. The enforcement gap: post-delivery end-use monitoring covers less than 5% of transferred weapons.",
      legislator: "Committee jurisdiction: Foreign Relations (Senate), Foreign Affairs (House). The structural intervention: mandatory end-use monitoring with recall provisions, civilian harm assessments before transfer approval, and Congressional veto authority expansion.",
      investor: "Defense exporters (Lockheed Martin, RTX, BAE Systems, Thales) face reputational risk from controversial transfers. environmental, social, and governance exclusion for controversial weapons is expanding. Portfolio screening: export destination risk profile, end-use monitoring compliance, and controversial weapons exposure.",
      supranational: "The Arms Trade Treaty (ATT, 2014) establishes transfer control standards but the US, Russia, and China are not parties. The Wassenaar Arrangement covers dual-use technologies. The gap: no binding international framework with universal participation and enforcement authority.",
    },
    faq: [
      { q: "Don't arms exports support allies?", a: "The stated purpose (alliance support) and the measured outcome (welfare destruction) are not contradictory. Arms exports can simultaneously strengthen allied capability and generate welfare costs through diversion, conflict prolongation, and corruption. The βW of 2.54 captures the net effect. The question is whether the security benefit exceeds the welfare cost." },
    ],
  },

  stablecoins: {
    epigraph: "The reserve is a promise. The audit is optional. The run is inevitable.",
    keyFindings: [
      "Each dollar of stablecoin industry revenue destroys $2.53 in system welfare — $141.7B per year.",
      "Stablecoins facilitate 84-86% of illicit crypto volume.",
      "Crypto lobbying: $200M+ in 2024 cycle — largest corporate campaign finance operation.",
    ],
    theorem: {
      formal: "Reserve Opacity Trap (Institutional Private-Systemic Tension). Institutional redesign is feasible — GENIUS Act and MiCA demonstrate the regulatory pathway.",
      plain: "Stablecoins process $27.6T in annual transfer volume while maintaining opacity about reserve composition. The run risk is real (TerraUSD collapsed $40B in 48 hours). The solution is mandatory reserve attestation, not prohibition — and both the US and EU are implementing it.",
    },
    mcResults: { beta: 2.53, ci: "[2.00, 3.10]", dw: 141.7, pi: 56.0 },
    agents: {
      whistleblower: "Document the gap between reserve claims and actual composition. Tether's delayed attestations and commercial paper holdings raised systemic risk concerns. The evidence is in attestation reports, treasury yield discrepancies, and redemption delay patterns during market stress.",
      plaintiff: "Securities fraud for stablecoins marketed as 'fully backed' with inadequate reserves. Consumer protection for depegging events. Class actions against TerraUSD/Luna ecosystem participants.",
      regulator: "OCC, SEC, CFTC, FinCEN, state regulators share jurisdiction with no clear primary authority. The GENIUS Act (if passed) would establish federal stablecoin regulation. MiCA (EU) already requires reserve segregation and real-time attestation.",
      legislator: "Committee jurisdiction: Banking (Senate), Financial Services (House). The GENIUS Act provides the structural intervention: mandatory reserve requirements, issuer licensing, and redemption guarantees.",
      investor: "Circle (USDC, $55B market cap) and Tether (USDT, $120B) dominate. Regulatory clarity from GENIUS Act/MiCA would reduce systemic risk but may compress margins. Portfolio screening: reserve composition quality, attestation frequency, and regulatory licensing status.",
      supranational: "EU MiCA Title III provides the most comprehensive stablecoin framework. FSB recommendations address global stablecoin arrangements. The gap: Tether (BVI-domiciled) operates outside major regulatory perimeters.",
    },
    faq: [
      { q: "Are stablecoins a threat to the dollar?", a: "The opposite. 99%+ of stablecoins are dollar-denominated, creating global demand for US Treasury securities as reserve assets. Stablecoins extend dollar reach into jurisdictions where banking access is limited. The threat is not to dollar supremacy but to financial stability — run risk and illicit finance are the welfare channels, not monetary sovereignty." },
    ],
  },

  pmc: {
    epigraph: "Accountability requires jurisdiction. The contractor operates where jurisdiction ends.",
    keyFindings: [
      "Each dollar of PMSC revenue destroys $2.06 in system welfare — $536.3B per year.",
      "$34-60B in documented wartime fraud and waste (Commission on Wartime Contracting).",
      "80% of four-star generals retiring 2018-2023 transitioned directly to the arms industry.",
    ],
    theorem: {
      formal: "Accountability Void (Institutional Private-Systemic Tension). The welfare cost arises from jurisdictional gaps, conflict-of-interest in contractor oversight, and democratic accountability erosion.",
      plain: "Private military contractors extract $260B in revenue while destroying $536B in system welfare through fraud, conflict prolongation, and democratic erosion. Accountability requires jurisdiction — and contractors operate where jurisdiction ends.",
    },
    mcResults: { beta: 2.06, ci: "[1.70, 2.40]", dw: 536.3, pi: 260.0 },
    agents: {
      whistleblower: "Document waste, fraud, and performance failures in security contracts. SIGIR, SIGAR, and CWC documented systemic contractor performance failures in Iraq and Afghanistan. The evidence is in inspector general reports, contract modification histories, and incident reporting gaps.",
      plaintiff: "False Claims Act for fraud in contract performance. Wrongful death claims for contractor negligence (Blackwater/Academi, Nisour Square). MEJA (Military Extraterritorial Jurisdiction Act) for criminal conduct overseas.",
      regulator: "DOD (DCMA contract administration), GAO (auditing), State IG share jurisdiction. The enforcement gap: DCMA has fewer than 10,000 employees overseeing $400B+ in annual contract obligations. Contractor-to-oversight ratio exceeds 40:1.",
      legislator: "Committee jurisdiction: Armed Services (Senate and House), Oversight (House). The structural intervention: mandatory competition for recurring services, contractor accountability standards with performance-based payment, and revolving door cooling-off period extension.",
      investor: "PMSC revenue is concentrated in five firms (L3Harris, Leidos, CACI, ManTech, Booz Allen). Government services sector trades at lower multiples than defense manufacturing. Portfolio screening: contract type mix (cost-plus vs. fixed-price), protest rate, and inspector general findings.",
      supranational: "The Montreux Document on Private Military and Security Companies (2008) establishes best practices but is non-binding. The UN Working Group on the use of mercenaries monitors PMSC activities. No binding international regulatory framework governs PMSCs.",
    },
    faq: [
      { q: "Why not just use military personnel?", a: "Because contractors allow governments to deploy force without political accountability. Contractor casualties are not counted in official war dead. Contractor deployments do not require congressional authorization under the War Powers Act. The accountability gap IS the value proposition — that's why the welfare cost exists." },
    ],
  },

  oil_gas: {
    epigraph: "The combustion is the product.",
    keyFindings: [
      "Each dollar of oil and gas revenue destroys $1.63 in system welfare — $5.69T per year.",
      "Climate damages (CO2 + CH4) alone: $3.64T/yr — exceeding total industry revenue by $140B.",
      "Cooperative baseline under IEA Net Zero 2050: $350B/yr (90% contraction).",
    ],
    theorem: {
      formal: "Combustion Floor (Institutional Private-Systemic Tension). The welfare cost is overwhelmingly climate-driven and fully addressable through carbon pricing and managed decline.",
      plain: "Oil and gas combustion destroys $1.63 in welfare per dollar of revenue. The welfare cost is dominated by climate damages that exceed the industry's entire revenue. The βW is moderate (1.63) because the denominator ($3.5T) is enormous — but the absolute welfare destruction ($5.69T) is the largest of any single domain.",
    },
    mcResults: { beta: 1.63, ci: "[1.30, 2.00]", dw: 5694.6, pi: 3500.0 },
    agents: {
      whistleblower: "Document methane emissions underreporting and climate risk misrepresentation. Satellite data (TROPOMI, MethaneSAT) shows methane emissions 60-100% higher than industry-reported figures. Internal climate risk analyses contradict public statements about Paris alignment.",
      plaintiff: "Climate liability litigation (California v. ExxonMobil, Honolulu v. Sunoco). Securities fraud for climate risk misrepresentation. State AG consumer protection claims for greenwashing. Discovery targets: internal climate models, 'sow doubt' communications, and stranded asset risk analyses.",
      regulator: "EPA (methane rules), SEC (climate disclosure), FERC (LNG export), BLM (federal leasing) share jurisdiction. The enforcement gap: the US is simultaneously the world's largest oil and gas producer and the primary climate negotiator — a structural conflict.",
      legislator: "Committee jurisdiction: Energy and Natural Resources (Senate), Energy & Commerce (House). The structural intervention: carbon price ($50-100/tonne), methane fee (IRA §60113), and federal leasing reform.",
      investor: "Oil majors (ExxonMobil $460B, Chevron $280B, Shell $220B, BP $100B, TotalEnergies $140B) face terminal demand decline under climate scenarios. Portfolio screening: Scope 1-3 emissions trajectory, capital allocation to renewables, and stranded asset exposure.",
      supranational: "The Paris Agreement Article 2.1(c) requires financial flows consistent with low-emission pathways. COP28 (2023) called for 'transitioning away from fossil fuels.' No binding phase-out timeline exists. The gap: international agreement on managed decline timeline and financial support for producing-country transitions.",
    },
    faq: [
      { q: "Why is βW only 1.63 when oil & gas causes the most absolute damage?", a: "Because βW is a ratio: ΔW/Π. Oil and gas destroys $5.69T but generates $3.5T in revenue. The ratio is 1.63. Firearms destroys $510B but generates only $10B — ratio 51. βW measures the efficiency of destruction per dollar of revenue. Oil and gas is massively destructive in absolute terms but the industry is large enough that the ratio is moderate." },
    ],
  },

  shipping: {
    epigraph: "The flag is a fiction. The emissions are real.",
    keyFindings: [
      "Each dollar of shipping revenue destroys $1.34 in system welfare — $1.30T per year.",
      "250,000 premature deaths annually from SOx/PM2.5/NOx (60%+ of total welfare destruction).",
      "73% of global fleet under flags of convenience — jurisdictional arbitrage by design.",
    ],
    theorem: {
      formal: "Flag State Evasion Floor (Institutional Private-Systemic Tension). Institutional correction is feasible through IMO regulation and port state control.",
      plain: "Maritime shipping transports 80% of world trade while killing 250,000 people annually from air pollution. The scrubber loophole transfers $50-80B per year from atmosphere to ocean. Flags of convenience allow shipowners to register in jurisdictions with minimal environmental standards. The flag is a fiction. The emissions are real.",
    },
    mcResults: { beta: 1.34, ci: "[1.10, 1.60]", dw: 1296.0, pi: 969.0 },
    agents: {
      whistleblower: "Document scrubber discharge violations and emission monitoring gaps. Open-loop scrubbers discharge acidified washwater containing heavy metals and PAHs directly into the ocean. The evidence is in port state inspection reports, satellite-based emission monitoring (TROPOMI SOx), and scrubber discharge sampling data.",
      plaintiff: "Environmental claims for air pollution health effects in port communities. Maritime lien claims for environmental damage from scrubber discharge. Port authority claims for water quality violations.",
      regulator: "IMO (international standards), Coast Guard (flag state enforcement), EPA (ECA zones), port authorities share jurisdiction. The enforcement gap: flag state enforcement is delegated to classification societies with commercial conflicts of interest.",
      legislator: "Committee jurisdiction: Commerce (Senate), Transportation (House). The structural intervention: fuel standard enforcement at ports (port state control), scrubber discharge bans, and carbon intensity standards with penalties.",
      investor: "Shipping companies (Maersk $24B, MSC private, CMA CGM private) face increasing carbon cost exposure from EU ETS maritime inclusion (2024) and IMO CII ratings. Green fuel transition (methanol, ammonia) requires $1.5T in fleet investment. Portfolio screening: fleet age, fuel type mix, and CII rating trajectory.",
      supranational: "IMO MARPOL Annex VI governs shipping emissions. The 2023 IMO GHG Strategy targets net-zero by 2050. EU ETS inclusion (2024) is the first carbon pricing for shipping. The gap: IMO regulation is consensus-based and historically slow — the 2020 sulfur cap took 12 years from adoption to implementation.",
    },
    faq: [
      { q: "How can shipping be fixed if 73% of ships fly flags of convenience?", a: "Port state control. Ships must enter ports to load and discharge cargo. Port authorities can enforce emission standards, fuel quality requirements, and scrubber discharge bans regardless of flag state registration. The EU ETS maritime inclusion demonstrates the mechanism: any ship entering an EU port pays for its emissions, regardless of where it's registered." },
    ],
  },

  alcohol: {
    epigraph: "The product and the poison are the same molecule.",
    keyFindings: [
      "Each dollar of alcohol revenue destroys $1.33 in system welfare — $2.12T per year.",
      "2.6 million deaths per year globally. 68% of revenue from above-guideline drinkers.",
      "$541M in US federal lobbying (1998-2020). The capture is documented.",
    ],
    theorem: {
      formal: "Under Biological Lock-In (A1: ethanol neurotoxicity is dose-dependent), Information Asymmetry (A2: industry-funded research distorts risk perception), and Regulatory Capture (A3: $541M lobbying): the product and the poison are the same molecule.",
      plain: "Alcohol kills 2.6 million people annually while generating $1.6 trillion in revenue. The βW is moderate (1.33) because the industry is enormous — but the absolute welfare destruction ($2.12T) is staggering. The structural impossibility: ethanol is both the product and the poison. You cannot make alcohol safer without making it not alcohol.",
    },
    mcResults: { beta: 1.33, ci: "[1.04, 1.60]", dw: 2121.4, pi: 1600.0 },
    agents: {
      whistleblower: "Document industry-funded research that downplays health risks. The International Alliance for Responsible Drinking (industry-funded) systematically produces research contradicting WHO findings on cancer risk. The evidence is in funding disclosures, publication bias patterns, and communications between industry and researchers.",
      plaintiff: "Product liability for cancer risk (IARC Group 1 carcinogen since 2012). Marketing claims targeting heavy drinkers and underage populations. Wrongful death claims for alcohol-related fatalities with identifiable over-service.",
      regulator: "TTB (labeling, trade practices), FTC (advertising), state ABC commissions share jurisdiction. The enforcement gap: TTB does not require cancer warning labels despite IARC classification. The current warning label (unchanged since 1989) mentions only pregnancy and driving.",
      legislator: "Committee jurisdiction: Finance (Senate), Ways & Means (House). The structural intervention: minimum unit pricing (Scotland model), cancer warning labels, advertising restrictions (Norway/Sweden model), and excise tax increases indexed to inflation.",
      investor: "Alcohol companies (AB InBev $120B, Diageo $90B, Pernod Ricard $55B) face demographic headwinds from declining youth consumption and regulatory risk from health-based restrictions. Portfolio screening: heavy drinker revenue dependence, marketing-to-youth exposure, and regulatory compliance by jurisdiction.",
      supranational: "WHO Global Alcohol Action Plan 2022-2030 recommends SAFER package (Strengthen restrictions, Advance counter-measures, Facilitate access to treatment, Enforce restrictions, Raise prices). No binding international treaty governs alcohol (unlike tobacco FCTC). The gap: the absence of a Framework Convention on Alcohol Control.",
    },
    faq: [
      { q: "Why is βW so much lower than tobacco (1.33 vs. 6.50)?", a: "Because the denominator is enormous. Alcohol revenue ($1.6T global) is 65% larger than tobacco ($965B). The absolute welfare destruction is similar in scale ($2.12T vs. $6.28T). But dividing by the much larger revenue base produces a lower ratio. βW measures destruction efficiency, not absolute destruction." },
    ],
  },

  "factory-farming": {
    epigraph: "The cheapest protein on Earth is the most expensive thing civilization has ever produced.",
    keyFindings: [
      "Each dollar of factory farming profit destroys $1.02 in system welfare — $2.76T per year.",
      "80+ billion animals in net-negative existence annually.",
      "Break-even mitigation: μ* = 2.4% — internalizing just 2.4% of costs eliminates profitability.",
    ],
    theorem: {
      formal: "Under Confinement Necessity (A1), Biological Resistance Amplification (A2: Antimicrobial Resistance from prophylactic antibiotics), and Subsidy Dependency (A3: $38-85B in annual subsidies): industrial animal agriculture operates at welfare parity only because 97.6% of costs are externalized.",
      plain: "Industrial animal agriculture is the most welfare-destructive sustained private activity calibrated when measured by absolute scale. 80 billion animals per year in conditions that constitute net-negative existence. The pandemic/Antimicrobial Resistance risk channel alone ($225B-$2.76T) exceeds total industry profit. Internalizing 2.4% of costs eliminates profitability.",
    },
    mcResults: { beta: 1.02, ci: "[0.76, 1.38]", dw: 2763.7, pi: 2700.0 },
    agents: {
      whistleblower: "Document conditions in CAFOs that violate state cruelty statutes while qualifying for federal inspection exemptions. Ag-gag laws in 8 states criminalize undercover documentation. The evidence is in undercover footage (Mercy for Animals, Animal Equality), USDA FSIS inspection reports, and worker injury data.",
      plaintiff: "Clean Water Act citizen suits for Concentrated Animal Feeding Operation waste discharge. Nuisance claims for odor and water contamination (Smithfield settlements totaling $500M+). EPCRA reporting claims for ammonia and hydrogen sulfide emissions. Environmental justice claims for siting concentration in communities of color.",
      regulator: "EPA (CWA, CAA), USDA (FSIS inspection, animal welfare), state environmental agencies share jurisdiction. The enforcement gap: CAFOs below size thresholds escape federal permitting. USDA has no mandate to regulate animal welfare in food production (AWA excludes farm animals).",
      legislator: "Committee jurisdiction: Agriculture (Senate and House), Environment and Public Works. The structural intervention: subsidy reform (redirect $38-85B from production to transition), Concentrated Animal Feeding Operation permitting reform, and mandatory antibiotic use reporting.",
      investor: "Meat companies (Tyson $20B, JBS $12B, WH Group/Smithfield $8B) face regulatory, pandemic, and consumer preference risk. Alternative protein companies (Beyond Meat $800M, Impossible Foods private) represent the transition opportunity. Portfolio screening: Antimicrobial Resistance exposure, environmental compliance history, and alternative protein investment.",
      supranational: "No binding international framework governs factory farming welfare. OIE (WOAH) animal welfare standards are voluntary. The EU Farm to Fork Strategy targets 25% organic farming by 2030 but implementation is contested. The gap: global coordination on antibiotic use, confinement standards, and subsidy reform.",
    },
    faq: [
      { q: "How can βW be only 1.02 if this is 'the most welfare-destructive'?", a: "Scale. Factory farming generates $2.7T in revenue — the largest denominator of any System Asset Pricing Model domain. The absolute welfare destruction ($2.76T) is also among the largest. But βW is a ratio (ΔW/Π), and dividing $2.76T by $2.7T produces ~1.02. Factory farming is not efficient at destruction per dollar; it's destructive at enormous scale." },
    ],
  },

  gig_economy: {
    epigraph: "The worker is not an employee. The profit is not a wage. The distinction is the business model.",
    keyFindings: [
      "Each dollar of platform take rate destroys $0.76 in system welfare — lowest βW in the System Asset Pricing Model canon.",
      "Effective hourly wage: $5.12/hr (2025 Texas data, 30% below federal minimum wage).",
      "Proposition 22 cost: $205.7M to pass — 40:1 return on political investment.",
    ],
    theorem: {
      formal: "Classification Arbitrage Floor (Institutional Private-Systemic Tension). The welfare cost arises from worker misclassification that shifts employment costs (benefits, insurance, minimum wage) from platforms to workers and public safety net programs.",
      plain: "Gig platforms exploit the gap between employee classification (benefits, minimum wage, workers comp) and independent contractor classification (none of the above). The $45B in platform take rates generates $34.4B in welfare costs by shifting employment costs to workers and taxpayers. The Drivers Cooperative (15% take rate, $30/hr guarantee) proves the alternative works.",
    },
    mcResults: { beta: 0.76, ci: "[0.60, 0.90]", dw: 34.4, pi: 45.0 },
    agents: {
      whistleblower: "Document the gap between platform earnings claims and actual driver compensation after expenses. Platform marketing claims $25+/hr; net earnings after vehicle costs, insurance, and platform fees average $5-12/hr. The evidence is in driver earnings data (Rideshare Guy surveys, DOL investigations) and platform-provided earnings marketing materials.",
      plaintiff: "Worker misclassification claims under state labor codes. California AB5 litigation. Fair Labor Standards Act (FLSA) minimum wage and overtime claims. Discovery targets: algorithmic control mechanisms that contradict independent contractor classification (route assignment, fare-setting, deactivation authority).",
      regulator: "DOL (Fair Labor Standards Act (FLSA)), National Labor Relations Board (organizing rights), state labor agencies, FTC share jurisdiction. The enforcement gap: the federal ABC test (DOL 2024 rule) faces legal challenges. State-by-state classification creates compliance patchwork.",
      legislator: "Committee jurisdiction: HELP (Senate), Education and Workforce (House). The structural intervention: federal classification standard (ABC test), portable benefits framework, and algorithmic management transparency requirements.",
      investor: "Gig companies (Uber $150B, Lyft $7B, DoorDash $60B) face regulatory risk from classification reform. California Prop 22 ($205.7M campaign) created a carve-out but faces constitutional challenge. Portfolio screening: worker classification litigation exposure, benefit cost modeling under reclassification, and regulatory compliance by state.",
      supranational: "The EU Platform Work Directive (2024) establishes a rebuttable presumption of employment for platform workers. No equivalent US federal framework exists. The gap: the US is an outlier among OECD countries in permitting gig platform classification arbitrage at this scale.",
    },
    faq: [
      { q: "Why is gig economy βW so low (0.76)?", a: "Because the welfare destruction per dollar of take rate is genuinely smaller than other domains. The costs (shifted benefits, underpayment, safety net burden) are real but moderate in ratio terms. The total welfare cost ($34.4B) is small relative to other domains. This is a solvable problem with modest institutional reform — classification standards and portable benefits — rather than a deep structural impossibility." },
    ],
  },

  // ─── Private Pareto Theorem FOUNDATIONAL ──────────────────────────────────────────
  ppt: {
    epigraph: "\"The welfare of a nation can scarcely be inferred from a measurement of national income.\" — Simon Kuznets, 1934. He built the tool and told Congress not to use it for the one thing they would use it for. Nobody listened.",
    keyFindings: [
      "Bilateral negotiation is constitutively blind to system welfare. This is not a market failure — it is a mathematical property of the payoff space. No function of Party A's utility and Party B's utility can determine the state of the system they both depend on.",
      "The Private Pareto Theorem proves that under three empirically verifiable axioms — overlapping interests, system independence, system dependence — every Pareto-efficient bilateral agreement is compatible with system destruction. The result is an impossibility, not a tendency.",
      "Eight outcomes exist in three-dimensional space (C, A, B). Standard theory recognizes four (the bilateral quadrant). The other four — including the Hollow Win (0,1,1) — are invisible to every framework that operates in two dimensions.",
      "59 market-failure domain theorems calibrate the welfare beta (βW) across sectors from firearms (βW = 50.99) to factory farming (βW = 1.02), with nuclear and gig economy retained as βW < 1 controls. Total annual welfare destruction remains a working aggregate pending final source harmonization.",
      "The six-agent Conflictoring protocol provides a constructive escape from every Hollow Win. Postnieks's Law: for every Private-Systemic Tension domain, there exists k* ≤ 6 agents whose simultaneous activation makes the Hollow Win strictly dominated.",
    ],
    theorem: {
      formal: "Let G = (A, B; Π_A, Π_B) be a bilateral game satisfying Private-Systemic Tension-1 (overlapping interests), Private-Systemic Tension-2 (system independence: W ∉ σ(Π_A, Π_B)), and Private-Systemic Tension-3 (system dependence: ∂W/∂a ≠ 0). Then for every Pareto-efficient agreement (a*, b*), there exists a system state W* such that W*(a*, b*) < W₀. The bilateral Pareto frontier is uninformative about system welfare.",
      plain: "When two parties negotiate a deal, they optimize their own payoffs. The system they both depend on — the atmosphere, the financial benchmark, the aquifer, the antibiotic arsenal — is not in the room. No amount of bilateral cleverness can detect whether that system is being destroyed. The deal can be Pareto-efficient and catastrophic at the same time. This is not a bug. It is the geometry of two-dimensional optimization in a three-dimensional world.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "How is Private Pareto Theorem different from externality theory?", a: "Externality theory says: the cost exists but is not priced. Coase says: with low transaction costs, parties can bargain to internalize it. Private Pareto Theorem proves something stronger: the cost is not merely unpriced — it is structurally undetectable from within the bilateral payoff space. You cannot internalize what you cannot see. Coase assumes both parties know the externality's value. Private Pareto Theorem proves that no function of their payoffs can reveal it." },
      { q: "Isn't this just a fancy way of saying 'externalities exist'?", a: "No. Externalities are costs imposed on third parties. Private Pareto Theorem identifies a deeper problem: the system itself is a third dimension that no bilateral framework can access. An externality can, in principle, be priced and internalized. A Private Pareto Theorem welfare cost cannot be internalized because the bilateral game does not contain the information needed to compute it. The fix is not a Pigouvian tax. The fix is a fundamentally different measurement architecture." },
      { q: "What are the three Private-Systemic Tension axioms?", a: "Axiom 1 (Overlapping Interests): both parties benefit from cooperation — there is a deal to be made. Axiom 2 (System Independence): system welfare W cannot be computed from the parties' payoffs — W lives outside the bilateral information set. Axiom 3 (System Dependence): the parties' actions affect W — what they do matters for the system. When all three hold simultaneously, the impossibility result applies. Every Pareto-efficient bilateral agreement is compatible with system destruction." },
    ],
  },

  // ─── FRAMEWORK PAPERS ──────────────────────────────────────────
  "fw-reform-dividend": {
    epigraph: "\"That which is seen, and that which is not seen.\" — Frédéric Bastiat, 1850. GDP records the seen. System Asset Pricing Model measures the unseen. The unseen is $89.2 trillion per year.",
    keyFindings: [
      "Across 59 market-failure System Asset Pricing Model-calibrated domains, total annual welfare destruction is $89.2 trillion — approximately the same order as nominal global GDP. This decomposes into four channels: Value of Statistical Life, cleanup GDP, suppressed productivity, and future damages.",
      "Reform produces a net GDP gain, not a loss. Current GDP ($107T) minus cleanup spending removed ($14.6T) plus productivity restored ($17.8T) equals reformed GDP ($110.2T). The standard objection — 'we cannot afford reform' — is arithmetically backwards.",
      "10–15 million preventable deaths per year across tobacco, air pollution, industrial agriculture, Ultra-Processed Food, alcohol, opioids, and occupational exposure. Each death is counted by GDP as healthcare revenue.",
      "The Reform Dividend Law proves that eliminating a Hollow Win releases a dividend equal to ΔW minus transition costs. The dividend is positive whenever transition costs remain below 40% of ΔW — a condition satisfied in every System Asset Pricing Model domain with a proven working model.",
    ],
    theorem: {
      formal: "For any Private-Systemic Tension domain with welfare destruction ΔW and transition cost T, the reform dividend D = ΔW − T > 0 whenever T < 0.4 × ΔW. The aggregate reform dividend across the market-failure domain slate exceeds $50 trillion per year.",
      plain: "Every Hollow Win that gets fixed releases trapped value. The cleanup spending disappears from GDP (that is the point — you no longer need to clean up the mess). The suppressed productivity reappears. The net effect is positive. Reform does not shrink the economy. It grows it. The $89.2 trillion is not a cost of reform. It is the cost of not reforming.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "How can welfare destruction exceed GDP?", a: "Because welfare destruction includes channels that GDP does not measure: the Value of Statistical Life (premature deaths), future damages (climate, ecosystem degradation), and suppressed productivity (foregone innovation in distorted markets). GDP only counts current-year transactions. Welfare destruction counts what those transactions cost, including across time and across the living." },
      { q: "Is the $89.2T number double-counted?", a: "No. Each domain's ΔW is computed independently using domain-specific Monte Carlo simulations with distinct welfare channels. Cross-domain interactions are handled conservatively because each domain's ΔW is calibrated against its own industry revenue Π, not against a single shared environmental stock." },
    ],
  },

  "fw-fiscal-capture": {
    epigraph: "\"It is difficult to get a man to understand something when his salary depends upon his not understanding it.\" — Upton Sinclair. Now replace 'man' with 'government' and 'salary' with 'tax revenue.'",
    keyFindings: [
      "The Fiscal Dependency Index (φ) measures the ratio of government tax revenue from an industry to the political cost of reforming it. When φ ≥ 1.0, the government is structurally Party B in the Hollow Win — not a captured regulator, but a participant whose fiscal survival depends on system degradation continuing.",
      "Norway (φ = 0.22) proves fiscal decoupling is possible: oil revenue flows into the Government Pension Fund Global ($1.7T sovereign wealth fund), spent at 3% per year, completely decoupling fiscal policy from oil prices. Venezuela (φ > 5.0) proves what happens without it — government and industry become the same entity.",
      "Tobacco, gambling, and alcohol generate direct fiscal dependency in most nations. States that operate lotteries are not regulators of gambling — they are the house.",
      "Standard regulatory capture theory (Stigler 1971) is too generous. It assumes the government starts neutral and is corrupted. Fiscal capture shows the government was never neutral — the fiscal architecture creates alignment with the industry from day one.",
    ],
    theorem: {
      formal: "Let φ = R_tax / C_reform where R_tax is government revenue from industry i and C_reform is the political cost of structural reform. When φ ≥ 1.0, the government's optimal strategy is to perpetuate the Hollow Win regardless of regulatory intent. Reform requires fiscal restructuring before regulatory reform.",
      plain: "A state that earns 15% of its revenue from tobacco tax does not need to be bribed to oppose tobacco reform. The fiscal architecture does the work automatically. This is not corruption. This is structural incentive alignment between government revenue and system degradation. To reform the industry, you must first reform the government's dependence on it.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "How does Norway's Government Pension Fund Global solve fiscal capture?", a: "By saving oil revenue in a sovereign wealth fund invested globally — not domestically — Norway decoupled its fiscal policy from oil prices. The spending rule (3% of fund value per year) means the government can fund public services without oil revenue. φ drops from potentially >5.0 (petrostate) to 0.22. The government no longer needs the oil industry to continue operating." },
    ],
  },

  "fw-substitution-trap": {
    epigraph: "\"When you ban one product, the industry produces something worse. You regulated the molecule. You should have regulated the function.\"",
    keyFindings: [
      "Product-level regulation drives markets to more potent, more dangerous substitutes: OxyContin → fentanyl (50–100x more potent), BPA → BPS/BPF (same endocrine disruption, different label), PFOS → GenX (equally persistent, harder to filter).",
      "The formal game: when regulation targets a specific product, the industry's substitution set A' is generically non-empty because regulation targeted the wrong level of abstraction. The function (plasticizer, analgesic, surfactant) was preserved; only the molecule changed.",
      "Functional regulation — targeting the economic function rather than the specific molecule — makes the substitution space empty by construction. All products performing function F are covered. The industry must innovate outside F.",
      "Leaded gasoline → unleaded is the rare success case: catalytic converters physically could not operate with lead. The substitute performed the same function (octane boosting) without the toxin. Blood lead levels dropped 75% within a decade. That was functional regulation by accident.",
    ],
    theorem: {
      formal: "Let A = {products performing function F}. Product regulation targeting a ∈ A leaves the substitution set A' = A\\{a} non-empty. The market equilibrium shifts to a' ∈ A' with potency p(a') ≥ p(a). Functional regulation targeting F makes A' = ∅ by construction.",
      plain: "Ban the molecule and the industry produces a different molecule that does the same thing, often more dangerously. Ban the function and there is nowhere to substitute to. OxyContin to fentanyl is not a market failure. It is a regulatory design failure — targeting the wrong level of abstraction.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "Why is fentanyl more potent than OxyContin?", a: "Richard Cowen's Iron Law of Prohibition: regulatory pressure on a substance drives the market to more potent substitutes because potency concentrates value per unit volume. Smugglers prefer spirits over beer for the same reason drug traffickers prefer fentanyl over heroin. Higher value-to-weight ratio reduces detection and transport risk." },
    ],
  },

  "fw-disclosure-futility": {
    epigraph: "\"Full disclosure to a tempted agent is welfare-inferior to optimal partial disclosure.\" — Lipnowski & Mathevet, 2018. The policy implication is devastating: governments choose full disclosure precisely because it is formally suboptimal.",
    keyFindings: [
      "Three independent formal results prove disclosure fails for Private-Systemic Tension domains: Bernheim-Rangel (neurochemical dependency dominates informational signals), Gul-Pesendorfer (temptation preferences mean more information increases welfare cost), and Lipnowski-Mathevet (full disclosure is welfare-inferior to strategic partial disclosure).",
      "Even setting aside neurochemistry, disclosure fails for a structural reason: W cannot be computed from bilateral payoffs. Disclosing more information about revenues, costs, and margins provides more data in the wrong dimension. No amount of bilateral information reveals the system welfare state.",
      "Governments prefer disclosure because it is ineffective. A disclosure mandate satisfies the appearance of regulatory action without altering the payoff matrix or breaking any Private-Systemic Tension axiom. This is not cynicism — it is a structural prediction from political economy.",
      "Boundary conditions where disclosure can work: Chile's octagon warning labels reduced sugar-sweetened beverage purchases 23.7% by triggering disgust (a visual cue, not a data point). The UK Sugar Levy worked by altering producer incentives — functional fiscal restructuring disguised as a health measure.",
    ],
    theorem: {
      formal: "Let u(a, θ, s) be an agent's utility with action a, state θ, and addictive/temptation state s. Under Bernheim-Rangel preferences (∂u/∂s > 0, addictive), the optimal policy is cue removal, not information provision. Under Gul-Pesendorfer preferences, expanding the information set without restricting the choice set increases disutility. Disclosure is dominated by structural intervention in Private-Systemic Tension domains with neurochemical or temptation lock-in.",
      plain: "Telling a smoker that smoking causes cancer does not make them quit — the nicotine dependency dominates the informational signal. Telling a gambler the expected value is negative does not stop them — the temptation preference dominates the rational calculation. Information operates in the wrong channel. Structural reform operates in the right one.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "Do calorie labels work?", a: "Mostly no. Meta-analyses show calorie labels on restaurant menus reduce average consumption by 0–8 calories per meal — statistically insignificant and practically meaningless. Chile's octagon labels work because they trigger an emotional response (disgust), not a rational calculation. The distinction matters: information-processing interventions fail; salience-and-disgust interventions can succeed, but only for goods without neurochemical lock-in." },
    ],
  },

  "fw-postnieks-law": {
    epigraph: "\"The question is not whether escape is possible. The question is why most jurisdictions have not done what the successful ones already proved works.\"",
    keyFindings: [
      "Postnieks's Law: for every game G satisfying the three Private-Systemic Tension axioms, there exists a coalition K of conflictoring agents with |K| = k* ≤ 6 such that simultaneous activation of all agents in K makes the Hollow Win strategy profile strictly dominated.",
      "39 intractability domains each have at least one jurisdiction that has activated enough agents to escape the Hollow Win. These are not theoretical claims — they are documented existence proofs. Australia (firearms), Brazil (child labor), Norway (gambling, oil & gas), Denmark (Forever Chemicals in food packaging), and global benchmark-rate reform.",
      "The theorem's power is its universal quantifier: for every Private-Systemic Tension domain, not 'for some domains' or 'under favorable conditions.' Each conflictoring agent attacks a distinct structural condition necessary for the Hollow Win to persist. Six agents cover six conditions. Breaking any sufficient subset eliminates the equilibrium.",
      "Leaded gasoline took 75 years and 5 agents. The Montreal Protocol took 13 years and 5 agents. The k* threshold predicts: no Private-Systemic Tension domain escapes the Hollow Win until enough agents are simultaneously active. The protocol requires coordination, not perfection.",
    ],
    theorem: {
      formal: "∀G satisfying Private-Systemic Tension-1, Private-Systemic Tension-2, Private-Systemic Tension-3: ∃K ⊆ {Whistleblower, Plaintiff, Regulator, Legislator, Investor, Supranational} with |K| = k* ≤ 6 such that simultaneous activation of all agents in K makes σ_HW (Hollow Win strategy profile) strictly dominated by σ_WWW (Win-Win-Win alternative).",
      plain: "Every Hollow Win can be ended by a coalition of six or fewer agents. The Whistleblower breaks information asymmetry. The Plaintiff monetizes the welfare cost. The Regulator redesigns the game. The Legislator alters the legal payoff matrix. The Investor reprices capital. The Supranational solves jurisdictional arbitrage. No single agent suffices, but the required coalition is always finite and always small.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "Why exactly six agents?", a: "Because the Hollow Win persists through six structural conditions: information asymmetry, unpunished harm, regulatory tolerance, legal protection, mispriced capital, and jurisdictional arbitrage. Each agent attacks one condition. Fewer than six cannot cover all conditions. More than six would be redundant — there are only six structural conditions to break. The number is not arbitrary; it is derived from the structure of the game." },
    ],
  },

  "fw-conflictoring": {
    epigraph: "\"You are inside a Hollow Win. Here is what you do.\" — The eight-step protocol that every bilateral optimizer should run before accepting any agreement.",
    keyFindings: [
      "The Conflictoring Protocol is an eight-step diagnostic: (1) Name the parties and system, (2) Classify the current outcome, (3) Verify three Private-Systemic Tension axioms, (4) Compute βW and welfare cost, (5) Estimate crossover time T*, (6) Map the response ladder, (7) Select minimum sufficient intervention, (8) Verify escape to Win-Win-Win.",
      "Six agent classes correspond to six structural functions: Whistleblower (information asymmetry), Plaintiff (liability monetization), Regulator (game redesign), Legislator (legal matrix alteration), Investor (capital repricing), Supranational (jurisdictional coordination).",
      "Benchmark Rate/FX Fixing case study: A = dealer banks, B = counterparties, C = global benchmark infrastructure ($400T+ notional). Classification: (0,1,1) Hollow Win. Minimum sufficient intervention: Tier 4 (sovereign coordination — Secured Overnight Financing Rate (SOFR) transition). Escape confirmed: benchmark integrity restored.",
      "Four US whistleblower programs (SEC §21F, CFTC §748, DOJ False Claims Act, IRS §7623) have awarded over $88 billion in recoveries and rewards. The financial incentive for breaking information asymmetry already exists — most people do not know it.",
    ],
    theorem: {
      formal: "The Conflictoring Protocol maps every Private-Systemic Tension game to a minimum sufficient intervention tier. For each domain, the protocol identifies which subset of the six agents must activate simultaneously to make the Hollow Win strictly dominated. The intervention is constructive: it specifies the agents, the mechanism, and the target axiom.",
      plain: "Standard negotiation asks: 'Did both parties gain?' The Conflictoring Protocol asks: 'Did the system survive?' It provides a diagnostic checklist for any agreement in any domain. If the system is being destroyed, the protocol identifies exactly which agents need to act and what they need to do. It does not require perfection or altruism — it requires coordination among agents with existing incentives.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "What is the difference between the Conflictoring Protocol and standard mediation?", a: "Standard mediation operates in the bilateral payoff space — it helps A and B find mutually acceptable terms. The Conflictoring Protocol operates in three dimensions — it adds the system welfare dimension and asks whether the agreement preserves or destroys C. A mediator who achieves Pareto efficiency has done their job. A conflictoring agent who detects a Hollow Win has found that the mediator's job is structurally incomplete." },
    ],
  },

  "fw-hollow-win": {
    epigraph: "\"Getting to Yes taught the world to find mutual gains. It forgot to ask whether the system survived the deal.\" — Written for the Harvard Program on Negotiation. The missing third dimension in sixty years of negotiation theory.",
    keyFindings: [
      "The Ury-Fisher two-by-two outcome matrix (win-win, win-lose, lose-win, lose-lose) is structurally incomplete. It operates in bilateral space (A, B) and has no axis for the system (C). The Hollow Win replaces it with an eight-outcome three-dimensional matrix (C, A, B), where each dimension is binary (preserved/degraded or gains/loses). No equations. No proofs. Just the taxonomy and what it means for anyone who negotiates for a living.",
      "The Hollow Win (0,1,1) is the most consequential outcome: both parties gain while the system they depend on degrades. Standard negotiation analysis — from Getting to Yes through the Harvard PON canon — classifies this as 'mutual gain' and recommends acceptance. Across 59 calibrated market-failure domains, the annual cost of deals that look like wins but destroy the system is $89.2 trillion — approximately the same order as nominal global GDP.",
      "Seven case studies form the empirical backbone: (1) Benchmark Rate/FX Fixing — benchmark manipulation disguised as bilateral cooperation, (2) Volkswagen Dieselgate — emissions fraud as cost optimization, (3) Boeing 737 MAX — safety certification as regulatory efficiency, (4) Wells Fargo cross-selling — account fraud as sales excellence, (5) Lysine cartel — price-fixing as supply chain coordination, (6) Algorithmic collusion — pricing algorithms converging on supracompetitive prices without human communication, (7) Leaded gasoline — 75 years of system destruction classified as economic growth.",
      "The crossover time T* predicts when a Hollow Win collapses into outright failure. Benchmark Rate: the system had already failed by the time regulators noticed. Boeing 737 MAX: 2.1 years between the first crash and the second. Wells Fargo: 14 years of fake accounts before detection. Leaded gasoline: 75 years. Every Hollow Win has a clock. The question is whether anyone is watching it.",
      "The paper connects to the full System Asset Pricing Model architecture without requiring the reader to learn any of it: 59 market-failure papers calibrate the damage across high-leverage domains, with controls used to test the boundary. Six framework papers (Reform Dividend, Fiscal Capture, Substitution Trap, Disclosure Futility, Postnieks's Law, Conflictoring Protocol) provide the tools for escape. The six-agent Conflictoring protocol gives practitioners a concrete action plan — Whistleblower, Plaintiff, Regulator, Legislator, Investor, Supranational — for breaking any Hollow Win. Decision Accounting provides the audit trail. The Hollow Win is the front door to the entire program for non-economists.",
    ],
    theorem: {
      formal: "The Ury-Fisher taxonomy maps outcomes to four cells (win/lose × win/lose). The Private Pareto Theorem taxonomy maps outcomes to eight cells (system preserved/degraded × A gains/loses × B gains/loses). The Hollow Win — both parties gain, system degrades — is invisible in the 2×2 matrix. No bilateral evaluation can distinguish a Hollow Win from a genuine Win-Win-Win. The two-by-two matrix is not an approximation. It is a structural exclusion of the system dimension.",
      plain: "Getting to Yes asks: did both sides gain? If yes, it is a good deal. The Hollow Win asks: did the system survive? If not, the deal is catastrophic regardless of what both sides received. The Benchmark Rate traders gained. The counterparty banks gained. The global benchmark infrastructure — $400 trillion in notional value — was corrupted. Standard analysis calls this 'cooperation.' It is system destruction with bilateral efficiency.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "How does this relate to Getting to Yes?", a: "Getting to Yes (Fisher & Ury, 1981) introduced principled negotiation: separate people from problems, focus on interests not positions, generate options for mutual gain, use objective criteria. The framework is brilliant and correct — within two dimensions. The Hollow Win paper proves it is incomplete. 'Mutual gain' is a two-dimensional concept. In three dimensions, mutual gain is compatible with system destruction. Getting to Yes needs a fifth principle: verify system preservation." },
      { q: "Why seven case studies?", a: "Each case study isolates a different mechanism by which Hollow Wins arise: regulatory arbitrage (VW), benchmark manipulation (Benchmark Rate), safety erosion (Boeing), metric gaming (Wells Fargo), price coordination (Lysine), algorithmic emergence (Q-learning collusion), and temporal displacement (leaded gasoline). Together they prove the Hollow Win is not industry-specific — it is structural. The cases are also the bridge to the 59 market-failure domain papers — Benchmark Rate connects to the Benchmark Rate/FX-Fixing domain (βW = 5.13), VW connects to Industrial Agriculture Methane and Aviation Emissions, leaded gasoline is the canonical existence proof for the Conflictoring Protocol." },
      { q: "Is this paper accessible to non-economists?", a: "By design. The Hollow Win contains no equations, no formal proofs, and no Greek letters. It uses case studies, the 8-outcome taxonomy (a simple 2×2×2 table), and plain language throughout. The formal mathematics lives in the Private Pareto Theorem paper and the market-failure domain papers. The Hollow Win is the entry point for negotiators, lawyers, mediators, executives, and policymakers who need to understand the result without learning the calculus behind it." },
      { q: "How does The Hollow Win connect to the other System Asset Pricing Model papers?", a: "It is the practitioner's front door to the entire program. The seven case studies connect directly to calibrated domain papers (Benchmark Rate, Aviation, Industrial Ag, etc.). The 8-outcome taxonomy comes from the Private Pareto Theorem foundational paper. The escape protocol references the Conflictoring paper. The $89.2T figure comes from the Reform Dividend and c-Adjusted GDP papers. The reason disclosure alone does not fix Hollow Wins is explained in the Disclosure Futility paper. The Hollow Win ties the Wave 1 research slate together for an audience that will never read the formal proofs." },
      { q: "What is the crossover time and how is it estimated?", a: "T* is how long a Hollow Win can continue before the accumulated system damage overwhelms the private gains. Short T* means fast collapse (Boeing: 2.1 years between crashes). Long T* means the damage is real but slow (leaded gasoline: 75 years), which is worse because it accumulates below the detection threshold. Each market-failure domain paper estimates T* for its sector. The Hollow Win paper presents the concept through case studies without the underlying formula." },
    ],
  },

  // ─── OTHER PAPERS ──────────────────────────────────────────────
  "ot-da-chapter1": {
    epigraph: "\"Measurement is the first step that leads to control and eventually to improvement. If you can't measure something, you can't understand it. If you can't understand it, you can't control it.\" — H. James Harrington",
    keyFindings: [
      "The Decision Accounting methodology applies a 15-field audit to every System Asset Pricing Model domain: domain identification, party structure, system boundary, three axiom verifications, βW computation, theorem classification, outcome coding, crossover time estimation, reform pathway, proven model, conflictoring tier, expiry condition, and welfare prediction.",
      "Monte Carlo simulation protocol: N = 10,000 draws, seed = 42, minimum 3 distribution types tested per domain (triangular, lognormal, uniform) to confirm robustness. βW estimates are distribution-robust if they vary less than 15% across distribution assumptions.",
      "Iron Law: Π = annual industry revenue, never profit. Revenue is auditable, consistent across industries, and matches the Private Pareto Theorem framework. Using profit inflates βW by 5–20× for low-margin industries.",
      "Channel decomposition classifies each domain's ΔW into four buckets: Value of Statistical Life, Cleanup GDP, Suppressed Productivity, and Future Damages. Each channel has a different relationship to GDP and a different reform dividend calculation.",
    ],
    theorem: {
      formal: "βW = −dW/dΠ where Π is annual industry revenue. ΔW = βW × Π. c-adjusted GDP = Nominal GDP − Σ(ΔW_i) across the 59 market-failure domains. Each βW is computed via Monte Carlo simulation with N = 10,000 draws across 3+ distribution families.",
      plain: "The welfare beta measures how much system damage each dollar of industry revenue produces. Multiply by total revenue and you get the annual welfare cost. Subtract the market-failure panel's welfare costs from GDP and you get c-adjusted GDP — the number GDP was supposed to be. The methodology is transparent, replicable, and published in public Monte Carlo repositories.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "Why revenue instead of profit?", a: "Profit varies by accounting method, leverage, and tax structure. A firearms company and a tech company with identical revenue can report wildly different profits. Revenue is auditable, consistent, and matches the PPT's framework: βW measures welfare destruction per dollar of private operating activity, not per dollar of residual earnings. Using profit inflates βW by 5–20× for low-margin industries like shipping or factory farming." },
    ],
  },

  "ot-da-chapter5": {
    epigraph: "\"Fifty-nine market failures, two controls. One framework. The pattern holds where βW clears the threshold.\"",
    keyFindings: [
      "Cross-domain analysis reveals a structural break between impossibility domains, where no policy/rule-change path escapes the binding welfare-destroying condition, and intractability domains, where a rule change can transform the game. Intractability papers can still contain impossibility/floor theorems inside the current game.",
      "βW ranges from extreme outliers such as firearms (constitutional entrenchment) to lower-ratio domains that still clear the market-failure threshold. The distribution is right-skewed: most domains cluster in the 4–8 range, with extreme outliers driven by either very small Π or very high ΔW.",
      "Every intractability domain has at least one proven working model — a jurisdiction that has already solved the problem. The cross-domain evidence is the empirical foundation of Postnieks's Law.",
      "Axiom classification is consistent across the market-failure panel and controls: Private-Systemic Tension-1 (overlapping interests) and Private-Systemic Tension-3 (system dependence) hold broadly. Private-Systemic Tension-2 (system independence) is the axiom that distinguishes Private-Systemic Tension domains from standard externality problems.",
    ],
    theorem: {
      formal: "Classification rule: if rule change R can transform game G into G' and create a policy way out, classify the domain as Intractability even when the current-game proof contains an impossibility/floor theorem. If no policy or rule-change path can escape the binding welfare-destroying condition, classify as Impossibility.",
      plain: "The question is not whether the paper proves an impossibility somewhere. All intractability papers can do that. The question is whether there is a policy way out. If yes, it is intractability. If no, it is impossibility. We do science here, not count-fitting.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "Why are there 22 impossibility and 39 intractability domains?", a: "Because most system-degrading industries are constrained by institutional arrangements, not physical laws. Human trafficking is not constrained by chemistry — it is constrained by jurisdictional fragmentation and enforcement capacity. Forever Chemicals is constrained by chemistry — the C-F bond cannot be broken by policy. The 22/39 split reflects the empirical fact that most Hollow Wins are theoretically solvable if the political will exists." },
    ],
  },

  "ot-da-chapter9": {
    epigraph: "\"Each agent attacks a distinct structural condition. Six conditions, six agents. The number is not arbitrary — it is derived from the structure of the game.\"",
    keyFindings: [
      "The six-agent architecture maps to six structural conditions that sustain every Hollow Win: information asymmetry (Whistleblower), unpunished harm (Plaintiff), regulatory tolerance (Regulator), legal protection (Legislator), mispriced capital (Investor), and jurisdictional arbitrage (Supranational).",
      "The k* threshold varies by domain: Benchmark Rate required Tier 4 (supranational coordination for Secured Overnight Financing Rate (SOFR) transition). Leaded gasoline required 5 agents over 75 years. The Montreal Protocol required 5 agents over 13 years. Simpler institutional domains may require only Tier 2-3.",
      "Agent activation is not sequential — the k* theorem requires simultaneous activation. A whistleblower without a regulator produces headlines but no reform. A regulator without legislative authority produces guidelines but no enforcement. The coalition structure matters.",
      "Prat's conformism theorem (2005) provides the micro-foundation: reputation-concerned experts suppress private information and herd. At system scale, this is Private Pareto Theorem conformism — every bilateral optimizer conforms to the two-dimensional framework because deviating (monitoring W) is reputationally costly.",
    ],
    theorem: {
      formal: "For each Private-Systemic Tension domain d, the persistence conditions P(d) = {p₁, ..., p₆} where pᵢ ∈ {information asymmetry, liability immunity, regulatory forbearance, legal shield, capital mispricing, jurisdictional arbitrage}. The k* threshold is k*(d) = |{pᵢ : pᵢ binds in domain d}|. Simultaneous agent activation K with |K| ≥ k* breaks all binding conditions.",
      plain: "Each Hollow Win survives because of specific structural conditions — the information is hidden, the harm is unpunished, the regulator looks away, the law protects the industry, capital is mispriced, and jurisdictions compete to host the damage. Count how many of these conditions bind in your domain. That is your k*. Activate that many agents simultaneously and the Hollow Win collapses.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "Why can't a single agent (e.g., a strong regulator) solve the problem alone?", a: "Because the Hollow Win is sustained by multiple structural conditions simultaneously. A strong regulator can break regulatory forbearance but cannot fix jurisdictional arbitrage (the industry moves offshore), liability immunity (the law protects the industry), or capital mispricing (investors still fund the Hollow Win). Single-agent solutions address one condition while the others sustain the equilibrium. The k* theorem formalizes why coordination is necessary." },
    ],
  },

  "ot-c-adjusted-gdp": {
    epigraph: "\"GDP measures transactions, not welfare. Now we can measure both for the first time. The difference is $89.2 trillion.\"",
    keyFindings: [
      "c-adjusted GDP = GDP − μΣβ_WΠ. At full calibration (μ = 1.0), approximately $89.2 trillion disappears from measured global output. What remains is the economic activity that does not destroy the systems it depends on.",
      "Country-level decomposition for 190 nations reveals massive variation. Norway's c-adjusted GDP is 96% of nominal (low φ, Government Pension Fund Global decoupling). Venezuela's is negative (petroleum revenue dependency exceeds productive output). The United States drops from $29.2T to approximately $5.5T.",
      "The c-adjustment is not a penalty — it is a correction. GDP currently counts cancer treatment, oil spill cleanup, and prison construction as positive output. c-adjusted GDP subtracts the welfare cost of the activity that made those expenditures necessary.",
      "The Reform Pathfinder tool extends this to reform pathfinding: for each of 190 countries, it identifies which domains are reformable given institutional capacity and which proven models are applicable.",
    ],
    theorem: {
      formal: "GDP*(c) = GDP − μ · Σᵢ βW(i) · Π(i), where the sum runs over the market-failure System Asset Pricing Model domains, μ ∈ [0, 1] is the shadow price of welfare, βW(i) is the welfare beta for domain i, and Π(i) is annual industry revenue. At μ = 1.0 (full calibration), GDP* ≈ GDP − $89.2T.",
      plain: "Take global GDP. Subtract what it costs the world for each of the 59 market-failure domains that destroy the systems they depend on. What remains is the economy that is actually sustainable. The number is smaller than anyone expected, and the gap is the reform dividend — the value that reform would release.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "Why does the US drop from $29.2T to ~$5.5T?", a: "Because the US is disproportionately exposed to high-βW domains: firearms (constitutional entrenchment), opioids (pharmaceutical marketing + prescribing culture), private prisons, payday lending, Pharmacy Benefit Managers, student loans, PE in healthcare, and defense procurement are all US-centric or US-dominant. The US also bears 27.3% of global welfare costs from internationally traded domains (fossil fuels, plastics, etc.). The number sounds extreme until you list what it includes." },
    ],
  },

  "ot-pst-breaker": {
    epigraph: "\"190 countries. 59 market-failure domains. For each country, which reforms are achievable given its institutional capacity — and which proven models already exist?\"",
    keyFindings: [
      "Reform Pathfinder provides country-specific reform paths for all 190 nations across the 59 market-failure System Asset Pricing Model domains. Each entry identifies the binding constraint, the applicable proven model, the required k* agents, and the estimated reform dividend.",
      "22-language localization planned — reform pathways must be accessible to policymakers, legislators, and civil society in their own language to be actionable.",
      "Institutional capacity scoring uses a composite of World Bank governance indicators, corruption perception indices, and demonstrated reform history. Countries that have already solved one domain (e.g., Australia on firearms) receive higher feasibility scores for structurally similar reforms.",
      "The tool operationalizes Postnieks's Law at the country level: for each country-domain pair, it identifies which conflictoring agents are already active, which are missing, and what it would take to activate them.",
    ],
    theorem: {
      formal: "For each country c and domain d, Reform Pathfinder computes: Feasibility(c, d) = f(governance_score(c), reform_history(c), k*_active(c, d), proven_model_applicability(c, d)). Reform path = {agent activations needed to reach k*(d) in country c}.",
      plain: "For every country in the world, the tool answers: which of the 59 market-failure Hollow Wins can this country fix, given what it has already demonstrated it can do? If Australia solved firearms with a buyback, which other high-βW domains could it tackle with similar institutional capacity? The answers are specific, actionable, and grounded in proven models.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "Why 190 countries instead of focusing on the worst offenders?", a: "Because Hollow Wins are global. Forever Chemicals contamination, climate forcing, and antibiotic resistance do not respect national borders. A tool that only covers 30 OECD countries misses the jurisdictions where reform is both most needed and most achievable (e.g., Brazil's success with child labor, Chile's success with Ultra-Processed Food labeling). The 190-country scope is not ambition — it is the minimum required for a system-level analysis." },
    ],
  },

  "ot-curriculum": {
    epigraph: "\"From 'The Lie in the Number' through accountability reconstruction — the complete Private Pareto Theorem framework in 17 chapters.\"",
    keyFindings: [
      "The curriculum distills the entire Private Pareto Theorem framework into 17 interactive chapters with an approximately 8.5-hour completion time. From GDP's constitutive blindness through the domain theorems, reform arithmetic, Decision Accounting, and accountability reconstruction.",
      "Interactive elements throughout: hoverable glossary terms, expand/collapse sections, sortable data tables, visual comparisons (GDP ledger vs. welfare ledger), and the full market-failure βW ranking with controls clearly labeled.",
      "Key intellectual pathway: GDP blindness → missing third dimension → eight outcomes → Private Pareto Theorem proof → Capital Asset Pricing Model-to-System Asset Pricing Model → Group Decision Support System problem → Conflictoring protocol → domain theorems → Decision Accounting → six agents → reform dividend → fiscal capture → substitution trap → disclosure futility → Postnieks's Law → accountability reconstruction.",
      "The curriculum is designed for three audiences: policymakers (what to fix and where to start), academics (the formal architecture and proof structure), and practitioners (the eight-step diagnostic protocol).",
    ],
    theorem: {
      formal: "The curriculum covers the complete deductive chain: from the three Private-Systemic Tension axioms through the Private Pareto Theorem, the eight-outcome taxonomy, the System Asset Pricing Model calibration framework, the market-failure domain theorems, and Postnieks's Law (k* ≤ 6 universal escape theorem).",
      plain: "Everything you need to understand why bilateral negotiation fails, how to measure the damage, what to do about it, and how to make accountable decisions reconstructible. Seventeen chapters, roughly eight and a half hours, and the only framework in economics that tells you which deals are destroying the systems they depend on.",
    },
    mcResults: null,
    agents: null,
    faq: [
      { q: "Who is the target audience?", a: "Three groups. Policymakers who need to know which reforms work and where — the curriculum gives them the 39 proven models and the reform dividend arithmetic. Academics who want the formal proof structure — the curriculum presents the axioms, theorems, and the connection to Arrow, Nash, and Coase. Practitioners inside Hollow Wins who need the eight-step diagnostic — the curriculum gives them the Conflictoring Protocol and the whistleblower reward programs." },
    ],
  },
};

// ─── MERGE GENERATED + HARDCODED CONTENT ──────────────────────
// Generated content (from Gemini) takes priority; hardcoded content fills gaps.
const MERGED_CONTENT = (() => {
  const merged = { ...PAPER_CONTENT };
  for (const [key, gen] of Object.entries(GENERATED_CONTENT || {})) {
    if (!merged[key]) {
      merged[key] = gen;
    } else {
      // Merge: generated fields override hardcoded, keep hardcoded as fallback
      merged[key] = { ...merged[key], ...gen };
    }
  }
  return merged;
})();

export { MERGED_CONTENT };

// ─── BUILD SORTED PAPER LIST (wraps imported buildPaperList with MERGED_CONTENT) ──
function buildPaperList() {
  return _buildPaperList(MERGED_CONTENT);
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
          fontFamily: M, fontSize: 11, letterSpacing: 1,
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

// ─── EXPANDABLE NUMBERED ITEM ──────────────────────────────────
function ExpandableItem({ number, zinger, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      marginBottom: 6,
      border: `1px solid ${open ? "rgba(245,158,11,0.2)" : BORDER}`,
      borderRadius: 4,
      transition: "border-color 0.2s",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "flex-start", gap: 10, width: "100%",
          padding: "10px 14px", background: open ? "rgba(245,158,11,0.04)" : "rgba(255,255,255,0.02)",
          border: "none", cursor: "pointer", textAlign: "left",
          transition: "background 0.2s",
        }}
      >
        <span style={{
          fontFamily: M, fontSize: 12, fontWeight: 700, color: GOLD,
          minWidth: 22, lineHeight: "1.6",
        }}>
          {number}.
        </span>
        <span style={{
          fontFamily: S, fontSize: 15, color: TEXT, lineHeight: 1.6, flex: 1,
          fontWeight: 600,
        }}>
          {zinger}
        </span>
        <span style={{
          fontFamily: M, fontSize: 14, color: MUTED, minWidth: 16,
          lineHeight: "1.6", textAlign: "center",
        }}>
          {open ? "\u2212" : "+"}
        </span>
      </button>
      {open && (
        <div style={{
          padding: "0 14px 12px 46px",
          fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── EXPANDABLE FAQ ITEM ──────────────────────────────────────
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      marginBottom: 4,
      borderBottom: `1px solid ${BORDER}`,
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "flex-start", gap: 8, width: "100%",
          padding: "10px 4px", background: "transparent",
          border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ fontFamily: M, fontSize: 13, color: GOLD, minWidth: 16, lineHeight: "1.6" }}>
          {open ? "\u2212" : "+"}
        </span>
        <span style={{ fontFamily: M, fontSize: 13, color: TEXT, fontWeight: 600, lineHeight: 1.6, flex: 1 }}>
          {question}
        </span>
      </button>
      {open && (
        <div style={{
          padding: "0 4px 12px 24px",
          fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7,
        }}>
          {answer}
        </div>
      )}
    </div>
  );
}

// ─── ZINGER EXTRACTION ──────────────────────────────────────────
// Pull the first sentence as the zinger/headline; rest is the expandable body
function splitZinger(text) {
  // Split on first period followed by space (but not abbreviations like "βW" or "$89.2T")
  const match = text.match(/^(.+?(?:\$[\d.]+[BTM]?|[A-Z]{2,}|(?:Dr|Mr|Ms|St|vs|etc|e\.g|i\.e)\.)*[^.]*\.)\s+(.+)$/s);
  if (match) return { zinger: match[1], body: match[2] };
  return { zinger: text, body: null };
}

// ─── FULL CONTENT (for papers with PAPER_CONTENT) ────────────────
function FullContent({ paper }) {
  const c = paper.content;
  const showEpigraph = c.epigraph && PERSONAL_VOICE_SLUGS.has(paper.slug);
  return (
    <div style={{ paddingTop: 16 }}>
      {/* ── Epigraph ──────────────────────────────────────────── */}
      {showEpigraph && (
        <div style={{
          fontFamily: S, fontSize: 18, fontStyle: "italic", color: GOLD,
          padding: "16px 24px", marginBottom: 20,
          borderLeft: `3px solid ${GOLD}`, background: "rgba(245,158,11,0.04)",
          lineHeight: 1.7,
        }}>
          {c.epigraph}
        </div>
      )}

      {/* ── Audiocast player ──────────────────────────────────── */}
      <AudioPlayer slug={paper.slug} />

      {/* ── MC Results — headline stat bar ────────────────────── */}
      {c.mcResults && (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10,
          marginBottom: 20,
        }}>
          <MCStatBox label={"\u03B2W"} value={c.mcResults.beta?.toFixed(2)} color={c.mcResults.beta >= 10 ? RED : GOLD} />
          <MCStatBox label="90% CI" value={c.mcResults.ci} color={DIM} />
          <MCStatBox label={"\u0394W ($B/yr)"} value={c.mcResults.dw ? `$${c.mcResults.dw.toLocaleString()}B` : "TBD"} color={RED} />
          <MCStatBox label={"\u03A0 ($B/yr)"} value={c.mcResults.pi ? `$${c.mcResults.pi.toLocaleString()}B` : "TBD"} color={GREEN} />
        </div>
      )}

      {/* ── Key Findings — numbered, expandable ───────────────── */}
      <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10 }}>
        KEY FINDINGS
      </div>
      {(c.keyFindings || []).map((f, i) => {
        const { zinger, body } = splitZinger(typeof f === 'string' ? f : (f?.text || f?.content || JSON.stringify(f)));
        return (
          <ExpandableItem key={i} number={i + 1} zinger={zinger}>
            {body}
          </ExpandableItem>
        );
      })}

      {/* ── The Theorem — always visible, not buried ──────────── */}
      {c.theorem && (
      <div style={{
        margin: "20px 0", padding: "16px 20px",
        background: "rgba(245,158,11,0.04)",
        border: `1px solid rgba(245,158,11,0.15)`,
        borderRadius: 6,
      }}>
        <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10 }}>
          {paper.theoremName ? paper.theoremName.toUpperCase() : "THEOREM"}
        </div>
        <div style={{
          fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7,
          fontStyle: "italic", marginBottom: 14,
          paddingLeft: 14, borderLeft: `2px solid ${GOLD}`,
        }}>
          {c.theorem.formal}
        </div>
        <div style={{
          fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1, marginBottom: 6,
        }}>
          PLAIN ENGLISH
        </div>
        <div style={{ fontFamily: S, fontSize: 16, color: TEXT, lineHeight: 1.8 }}>
          {c.theorem.plain}
        </div>
      </div>
      )}

      {/* ── Six-Agent Advice — numbered expandable ────────────── */}
      {c.agents && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, marginTop: 20 }}>
            SIX-AGENT CONFLICTORING ADVICE
          </div>
          {[
            { key: "whistleblower", label: "Whistleblower — Break Information Asymmetry" },
            { key: "plaintiff", label: "Plaintiff — Monetize Liability" },
            { key: "regulator", label: "Regulator — Redesign the Game" },
            { key: "legislator", label: "Legislator — Change the Law" },
            { key: "investor", label: "Investor — Reprice Capital" },
            { key: "supranational", label: "Supranational — Coordinate Jurisdictions" },
          ].map((agent, i) => {
            const text = c.agents[agent.key];
            if (!text) return null;
            const { zinger, body } = splitZinger(text);
            return (
              <ExpandableItem key={agent.key} number={i + 1} zinger={zinger}>
                {body}
              </ExpandableItem>
            );
          })}
        </>
      )}

      {/* ── FAQ — expandable Q&A ──────────────────────────────── */}
      {c.faq && c.faq.length > 0 && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, marginTop: 20 }}>
            FAQ
          </div>
          {c.faq.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </>
      )}

      {/* ── Online Appendix ───────────────────────────────────── */}
      {c.onlineAppendix && c.onlineAppendix.length > 0 && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: CYAN, letterSpacing: 2, marginBottom: 10, marginTop: 24 }}>
            ONLINE APPENDIX
          </div>
          {c.onlineAppendix.map((section) => {
            const label = `${section.id}. ${section.title.replace(/^Appendix [A-Z]: /, '')}`;
            return (
              <FAQItem key={section.id} question={label} answer={section.body} />
            );
          })}
        </>
      )}

      {/* ── Links ─────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
        <LinkBadge label="SSRN" disabled={true} note="forthcoming" href="" />
        {paper.type === "domain" && (
          <LinkBadge label="Simulation Repo" href={`https://github.com/epostnieks/sapm-mc-${paper.slug}`} />
        )}
        <a href={`/pptx/${paper.slug}.pptx`} download style={{
          fontFamily: M, fontSize: 11, letterSpacing: 1, color: GOLD,
          padding: "6px 14px", background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.2)", borderRadius: 4,
          textDecoration: "none", cursor: "pointer",
        }}>POWERPOINT</a>
      </div>
    </div>
  );
}

// ─── PLACEHOLDER CONTENT ──────────────────────────────────────
function PlaceholderContent({ paper }) {
  return (
    <div style={{ paddingTop: 16 }}>
      {/* Audiocast player */}
      <AudioPlayer slug={paper.slug} />

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

      {/* Links */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
        <LinkBadge label="SSRN" disabled={true} note="forthcoming" href="" />
        {paper.type === "domain" && (
          <LinkBadge label="Simulation Repo" href={`https://github.com/epostnieks/sapm-mc-${paper.slug}`} />
        )}
        <a href={`/pptx/${paper.slug}.pptx`} download style={{
          fontFamily: M, fontSize: 11, letterSpacing: 1, color: GOLD,
          padding: "6px 14px", background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.2)", borderRadius: 4,
          textDecoration: "none", cursor: "pointer",
        }}>POWERPOINT</a>
      </div>
    </div>
  );
}

// ─── AUDIO PLAYER ─────────────────────────────────────────────
function AudioPlayer({ slug }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = new Audio(`/audio/${slug}.m4a`);
    a.preload = "metadata";
    audioRef.current = a;
    const onTime = () => { setCurrentTime(a.currentTime); setProgress(a.currentTime / (a.duration || 1)); };
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.pause();
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [slug]);

  const fmt = (s) => {
    if (!s || isNaN(s)) return "--:--";
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    a.currentTime = ratio * a.duration;
    setProgress(ratio);
  };

  return (
    <div style={{
      margin: "0 0 20px 0", padding: "14px 16px",
      background: "rgba(245,158,11,0.04)", border: `1px solid rgba(245,158,11,0.15)`,
      borderRadius: 6,
    }}>
      <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10 }}>
        AUDIOCAST
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={toggle} style={{
          width: 36, height: 36, borderRadius: "50%",
          background: playing ? "rgba(245,158,11,0.2)" : "rgba(245,158,11,0.12)",
          border: `1px solid rgba(245,158,11,0.4)`,
          color: GOLD, cursor: "pointer", fontSize: 14, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {playing ? "⏸" : "▶"}
        </button>
        <div style={{ flex: 1 }}>
          <div onClick={seek} style={{
            height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2,
            cursor: "pointer", position: "relative",
          }}>
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${progress * 100}%`,
              background: GOLD, borderRadius: 2,
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontFamily: M, fontSize: 11, color: MUTED }}>{fmt(currentTime)}</span>
            <span style={{ fontFamily: M, fontSize: 11, color: MUTED }}>{duration ? fmt(duration) : "loading..."}</span>
          </div>
        </div>
        <a href={`/audio/${slug}.m4a`} download style={{
          fontFamily: M, fontSize: 11, letterSpacing: 1, color: GOLD,
          padding: "5px 10px", background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.2)", borderRadius: 4,
          textDecoration: "none", flexShrink: 0,
        }}>
          ↓ M4A
        </a>
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
      <div style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1, marginTop: 4 }}>{label}</div>
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
      {label} {note && <span style={{ color: MUTED, fontSize: 11 }}>({note})</span>}
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
            Ranked Research Corpus
          </h1>
          <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.7, maxWidth: 650, margin: "0 auto" }}>
            Section-by-section summaries for college-level readers. Key findings, formal theorems in plain English,
            Monte Carlo results, policy translation, six-agent advice, and FAQs.
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
