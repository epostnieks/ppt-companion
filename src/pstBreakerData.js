// ══════════════════════════════════════════════════════════════
// Reform Pathfinder — Country × Sector × Actor Level Data
// Erik Postnieks © 2026
// Each entry maps the fastest path from Private-Systemic Tension → non-PST
// ══════════════════════════════════════════════════════════════

export const COUNTRIES = [
  {
    code: "US", name: "United States", region: "North America",
    summary: "Strongest whistleblower infrastructure on Earth. Four federal programs, $88B+ in cumulative recoveries. Regulatory fragmentation is the weakness — sector-specific agencies with gaps between them.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1, // Axiom 2 — System Independence
        whyBreakable: "Mandatory emissions disclosure makes W computable from party payoffs. Once Scope 1–3 emissions are disclosed per transaction, system welfare becomes a function of bilateral activity — breaking independence.",
        breakPaths: [
          "Eliminate $20.5B in annual fossil fuel subsidies. Without the subsidy floor, the overlapping interest between producer and consumer in continued extraction weakens — the joint gain from transition investment exceeds the joint gain from extraction.",
          "Mandatory Scope 1–3 disclosure (SEC Climate Rule, currently stayed). Once emissions footprint is disclosed per transaction, W is no longer independent — it becomes a computable function of bilateral activity. Also: EPA methane monitoring via satellite makes W directly observable.",
          "Not breakable by policy alone. Combustion of hydrocarbons releases CO₂ by conservation of mass. Agent activity inherently affects atmospheric composition. This axiom holds by chemistry.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report emissions underreporting via SEC Whistleblower Program §21F (10–30% of sanctions > $1M)",
              "Document subsidy misuse or fraudulent royalty reporting via DOJ False Claims Act qui tam (15–30% of recovered funds)",
              "Use Clean Air Act §113(f) citizen suit provisions for unreported methane emissions",
              "Report pipeline safety violations via PHMSA whistleblower protections",
            ],
            infra: "SEC Whistleblower Program — created by Dodd-Frank §21F in 2010, this program pays whistleblowers 10–30% of sanctions exceeding $1 million. It has paid over $2.2 billion to date and is the most financially successful whistleblower program in history. DOJ False Claims Act (qui tam) — allows private citizens to sue on behalf of the government when companies defraud federal programs. Whistleblowers ('relators') receive 15–30% of recovered funds. Covers fraudulent royalty reporting on federal leases, subsidy fraud, and environmental compliance fraud. Clean Air Act §113(f) — authorizes citizen suits against companies violating emissions standards, allowing individuals to enforce air quality regulations when the EPA fails to act. PHMSA (Pipeline and Hazardous Materials Safety Administration) — the federal agency within the Department of Transportation that regulates pipeline safety. Its whistleblower protections cover employees who report safety violations at pipeline operators.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Adopt internal carbon pricing at $190/ton (EPA social cost of carbon) for all capital allocation decisions",
              "Disclose Scope 1–3 emissions voluntarily ahead of SEC mandate — makes W visible to investors",
              "Commission independent βW audit of major revenue streams — know your welfare cost before the regulator does",
              "Restructure executive compensation to include system-adjusted payoff metrics",
            ],
            infra: "TCFD (Task Force on Climate-related Financial Disclosures) — a framework developed by the Financial Stability Board for companies to report climate risks and opportunities. Voluntary but increasingly expected by institutional investors. ISSB S2 Standard — the International Sustainability Standards Board's climate disclosure standard (IFRS S2), which establishes a global baseline for climate-related financial disclosures. Adopted by multiple jurisdictions as mandatory reporting. SEC Climate Disclosure Rule — finalized in 2024 but currently stayed by litigation, this rule would require publicly traded companies to disclose Scope 1, 2, and material Scope 3 greenhouse gas emissions. If implemented, it is the direct Axiom 2 break for US-listed energy companies. CDP (formerly Carbon Disclosure Project) — a nonprofit that runs the world's largest environmental disclosure system. Over 23,000 companies disclose emissions data through CDP, creating a voluntary transparency channel while mandatory rules remain contested.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "EPA: Finalize methane fee at $1,500/ton for facilities >25,000 tons/year (Inflation Reduction Act §136)",
              "BLM: Reform federal leasing royalty rates from 12.5% to market-clearing rates",
              "SEC: Finalize and defend mandatory climate disclosure — this IS the Axiom 2 break",
              "FERC: Require system welfare impact assessments for pipeline and LNG export approvals",
            ],
            infra: "EPA (Environmental Protection Agency) — the primary federal environmental regulator, with authority under the Clean Air Act to regulate greenhouse gas emissions. The EPA's methane fee under the Inflation Reduction Act charges oil and gas facilities $900–$1,500 per ton of excess methane emissions. BLM (Bureau of Land Management) — manages 245 million acres of federal land and sets the terms for oil and gas leases on public land. Current royalty rates (12.5%) have not been updated since 1920 and are well below market rates. SEC (Securities and Exchange Commission) — the federal securities regulator, with authority to mandate disclosure of material financial risks including climate-related risks. Its climate disclosure rule is the most direct mechanism for making system welfare visible in financial markets. FERC (Federal Energy Regulatory Commission) — regulates interstate energy transmission, including pipeline approvals and LNG export terminal certifications. FERC can require environmental and welfare impact assessments as conditions of approval.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Implement carbon border adjustment (Carbon Border Adjustment Mechanism) for fossil fuel imports — EU operational 2026",
              "Eliminate fossil fuel subsidies per G20 commitment (unfulfilled since 2009)",
              "Negotiate binding production caps via UNFCCC — not just emission targets, production caps",
              "Mandate c-adjusted GDP as supplementary national account alongside BEA GDP reporting",
            ],
            infra: "Paris Agreement NDCs (Nationally Determined Contributions) — the mechanism by which each signatory nation sets its own emissions reduction targets. The US NDC targets 50–52% reduction below 2005 levels by 2030. NDCs are legally binding commitments under international law but lack enforcement mechanisms. G20 Subsidy Phase-out Commitment — in 2009, G20 nations committed to phase out 'inefficient fossil fuel subsidies.' Seventeen years later, global fossil fuel subsidies reached $7 trillion in 2022 (IMF estimate). The commitment remains unfulfilled. EU CBAM (Carbon Border Adjustment Mechanism) — a tariff on carbon-intensive imports entering the EU, operational from 2026. Designed to prevent carbon leakage by equalizing carbon costs between domestic and imported goods. If the US adopted a similar mechanism, it would make W visible in trade pricing. UNFCCC (United Nations Framework Convention on Climate Change) — the international treaty body that governs global climate negotiations, including the Paris Agreement and annual COP summits.",
          },
        ],
      },
      {
        name: "Forever Chemicals (PFAS)", beta: 35.2,
        pst: [true, true, true],
        mostBreakable: 0, // Axiom 1 — Overlapping Interests
        whyBreakable: "Ban Forever Chemicals production class-wide. If the profitable pathway does not exist, there is no overlapping interest to exploit. The Montreal Protocol model — eliminate the product, not the externality.",
        breakPaths: [
          "Class-wide production ban eliminates the deal. No Forever Chemicals production → no overlapping interest between manufacturer and buyer. The Montreal Protocol proved this works: ban CFCs, the ozone layer recovers. Ban Forever Chemicals, the accumulation stops.",
          "Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) hazardous substance designation makes contamination costs computable — W becomes a function of production volume. EPA designated PFOA/PFOS in 2024. 14,000+ compounds remain.",
          "Not breakable. The C-F bond (485 kJ/mol) guarantees that Forever Chemicals production → Forever Chemicals accumulation. No process design can prevent environmental persistence of a molecule designed to persist.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report undisclosed Forever Chemicals contamination at manufacturing sites via EPA Toxic Substances Control Act (TSCA) §16 whistleblower protection",
              "Document Forever Chemicals in consumer products not labeled — report to state AG or FTC",
              "Use DOJ False Claims Act for DOD sites where contractors concealed AFFF contamination",
              "SEC whistleblower for publicly traded companies concealing cleanup liabilities",
            ],
            infra: "EPA Toxic Substances Control Act (TSCA) §16 (Toxic Substances Control Act, Section 16) — provides whistleblower protection for employees who report violations of chemical safety regulations. Covers workers at Forever Chemicals manufacturing facilities, testing laboratories, and disposal sites who report concealed contamination or safety data suppression. DOJ False Claims Act — particularly relevant for Forever Chemicals at military installations, where defense contractors used AFFF (aqueous film-forming foam) firefighting chemicals containing Forever Chemicals. If contractors knew about contamination and failed to disclose it while billing the federal government, qui tam suits allow whistleblowers to recover 15–30% of damages. SEC Whistleblower Program — applies when publicly traded Forever Chemicals manufacturers (3M, Chemours, Corteva) conceal cleanup liabilities from investors. Undisclosed Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) liability is a material omission. State Attorneys General — many state AGs have filed Forever Chemicals suits (e.g., Minnesota v. 3M, settled for $850M). Insiders can report to their state AG office, which can pursue enforcement even when federal agencies are slow to act.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Accelerate transition to non-Forever Chemicals alternatives — GenX is not the answer, non-fluorinated alternatives are",
              "Disclose total Forever Chemicals liability exposure to shareholders (Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) strict liability is coming for balance sheets)",
              "Fund remediation proactively — the cost only increases with delay",
            ],
            infra: "Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) (Comprehensive Environmental Response, Compensation, and Liability Act, also known as Superfund) — imposes strict, joint, and several liability on parties responsible for hazardous substance contamination. In 2024, EPA designated PFOA and PFOS as Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) hazardous substances, meaning any company that manufactured, used, or disposed of these chemicals can be held liable for cleanup costs regardless of when the contamination occurred. This is retroactive strict liability — it cannot be contracted away. SEC Disclosure Obligations — publicly traded companies must disclose material liabilities. With Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) designation, Forever Chemicals cleanup costs are now material liabilities that must appear in financial statements. Failure to disclose exposes officers and directors to personal liability. Shareholder Derivative Actions — if boards fail to disclose or address known Forever Chemicals liabilities, shareholders can sue directors personally for breach of fiduciary duty. The Caremark standard requires boards to implement systems for monitoring known legal compliance risks.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "EPA: Extend Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) designation beyond PFOA/PFOS to full Forever Chemicals class",
              "FDA: Eliminate Forever Chemicals from food contact materials (voluntary phase-out is too slow)",
              "DOD: Mandate Forever Chemicals-free AFFF alternatives at all military installations",
              "State legislatures: Follow Maine's 2030 class-wide ban model",
            ],
            infra: "EPA Forever Chemicals Strategic Roadmap (2021) — the EPA's multi-year plan to address Forever Chemicals contamination through research, restriction, and remediation. Key milestones include Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) hazardous substance designations, drinking water standards (4 ppt for PFOA, 4 ppt for PFOS), and Toxic Substances Control Act (TSCA) reporting rules. Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA) Authority — allows EPA to compel responsible parties to clean up contaminated sites and to recover costs from manufacturers, users, and disposers of Forever Chemicals. The 2024 PFOA/PFOS designation was the first step; class-wide designation would cover all 14,000+ Forever Chemicals compounds. FDA Food Contact Rules — the FDA regulates substances that come into contact with food. Forever Chemicals have been used in food packaging (grease-resistant coatings) and cookware. The FDA announced a voluntary industry phase-out, but voluntary timelines are slow and non-binding. State Bans — Maine enacted the first class-wide Forever Chemicals ban (effective 2030), Minnesota passed comprehensive Forever Chemicals legislation in 2023, and California banned Forever Chemicals in cosmetics and textiles. These state-level actions create a patchwork that pressures federal action.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Expand Stockholm Convention listings to full Forever Chemicals class — not compound-by-compound",
              "Support EU ECHA restriction proposal (covers ~10,000 Forever Chemicals, exemptions 5–12 years)",
              "Establish international Forever Chemicals remediation fund — polluter-pays with manufacturer strict liability",
            ],
            infra: "Stockholm Convention on Persistent Organic Pollutants — an international treaty that bans or restricts the production and use of persistent organic pollutants. PFOS was listed in 2009, PFOA in 2019, and PFHxS in 2022. But with 14,000+ Forever Chemicals compounds, the compound-by-compound approach is too slow. Class-wide listing is needed. EU ECHA Forever Chemicals Restriction Proposal (2023) — the European Chemicals Agency proposed the broadest chemical restriction in regulatory history, covering approximately 10,000 Forever Chemicals compounds. If adopted, it would ban Forever Chemicals use across the EU with sector-specific exemptions lasting 5–12 years for essential uses where alternatives do not yet exist. Basel Convention — governs transboundary movement of hazardous waste, relevant for preventing Forever Chemicals-contaminated waste from being shipped to countries with weaker environmental regulation.",
          },
        ],
      },
      {
        name: "Big Tech / Surveillance", beta: 7.4,
        pst: [true, true, true],
        mostBreakable: 1, // Axiom 2
        whyBreakable: "Algorithmic transparency and data portability make W computable. Once attention costs, epistemic degradation, and labor displacement are measurable per user-hour, system welfare becomes visible inside the payoff space.",
        breakPaths: [
          "Structural separation — marketplace from private-label, social graph from advertising. Eliminates the overlapping interest between data extraction and service provision. EU Digital Markets Act is a partial Axiom 1 break.",
          "Mandatory algorithmic impact assessments + data portability. If engagement optimization's welfare cost is disclosed per user-hour, W becomes computable from platform metrics. Transparency IS the Axiom 2 break.",
          "Interoperability mandates — if users can leave without losing their social graph, the platform's system dependence weakens. But network effects regenerate — this axiom is hard to break durably.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Document algorithmic amplification of harmful content — report to FTC under §5 unfair practices",
              "SEC whistleblower for undisclosed engagement manipulation affecting ad metrics",
              "Report children's privacy violations to FTC under Children's Online Privacy Protection Act (COPPA)",
            ],
            infra: "FTC Section 5 Authority — the Federal Trade Commission has broad authority to prohibit 'unfair or deceptive acts or practices' in commerce. This covers algorithmic manipulation, dark patterns, and deceptive engagement metrics. The FTC has brought enforcement actions against Meta, Epic Games, and Amazon using this authority. SEC Whistleblower Program — applies when publicly traded tech companies mislead investors about user metrics, engagement algorithms, or content moderation practices. The Facebook/Meta whistleblower (Frances Haugen, 2021) demonstrated the pathway: internal research showing platform harm that contradicts public statements is securities-relevant. Children's Online Privacy Protection Act (COPPA) (Children's Online Privacy Protection Act) — prohibits collection of personal information from children under 13 without parental consent. The FTC enforces Children's Online Privacy Protection Act (COPPA) and has imposed significant fines (e.g., $170M against YouTube/Google in 2019). Reports can be filed directly with the FTC. State Attorneys General — California (CPRA), Texas (TDPSA), and other states have their own privacy enforcement authority. State AGs have brought antitrust and privacy actions against major tech platforms independently of federal agencies.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Commission independent welfare impact audit — what does engagement optimization cost users per hour?",
              "Implement algorithmic choice for users — chronological feed default",
              "Pre-comply with EU Digital Markets Act obligations globally, not just in EU markets",
            ],
            infra: "EU Digital Markets Act (DMA) — designates large platforms as 'gatekeepers' and imposes structural obligations including interoperability, data portability, and prohibitions on self-preferencing. Effective March 2024 for designated gatekeepers (Alphabet, Amazon, Apple, ByteDance, Meta, Microsoft). Pre-compliance globally means adopting these structural changes across all markets, not just the EU. EU Digital Services Act (DSA) — requires very large online platforms to conduct systemic risk assessments, provide algorithmic transparency, and give users the option to opt out of recommendation algorithms. Imposes obligations for content moderation transparency and researcher data access. ISSB Disclosure Standards — the International Sustainability Standards Board's frameworks increasingly require disclosure of social impacts, including digital well-being metrics for technology companies.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "FTC: Enforce structural separation of marketplace and private-label",
              "Congress: Pass the American Innovation and Choice Online Act (stalled twice)",
              "FCC: Reclassify broadband under Title II for net neutrality enforcement",
              "DOJ: Complete Google antitrust remedies (search, ad tech)",
            ],
            infra: "FTC Section 5 — the Commission's core enforcement tool for unfair competition and consumer protection. Can be used to mandate structural separation (e.g., requiring Amazon to separate its marketplace from its private-label business). DOJ Antitrust Division — currently prosecuting two landmark cases against Google (search monopoly and ad tech monopoly). Remedies could include structural separation of Google's ad exchange from its ad server, or mandating search engine interoperability. EU Digital Markets Act Compliance Enforcement — the European Commission can fine gatekeepers up to 10% of global turnover for DMA violations, with structural remedies (including breakup) available for systematic non-compliance. State Privacy Laws — California Consumer Privacy Act/CPRA, Texas Data Privacy and Security Act (TDPSA), and similar laws in 15+ states create enforceable privacy rights that state AGs can enforce against tech platforms.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Federal comprehensive privacy law — the US is the only G7 nation without one",
              "Digital trade agreements with algorithmic transparency provisions",
              "International AI governance framework with welfare impact requirements",
            ],
            infra: "EU Digital Markets Act/DSA Model — the most comprehensive digital platform regulation in the world, providing a template for other jurisdictions. The DMA's structural remedies and the DSA's transparency obligations represent a near-complete Axiom 2 break for designated gatekeepers. OECD AI Principles — adopted by 46 countries, these principles call for AI systems that are transparent, fair, and accountable. They are voluntary but increasingly referenced in binding regulation. G7 Hiroshima AI Process — the G7's framework for AI governance, including commitments to algorithmic transparency, risk assessment, and international coordination on AI safety standards.",
          },
        ],
      },
      {
        name: "Bitcoin / Crypto", beta: 5.0,
        pst: [true, true, true],
        mostBreakable: 2, // Axiom 3
        whyBreakable: "Sovereign custody regulation can insulate the financial system from permissionless protocol welfare costs. If exchanges, on-ramps, and custodians are regulated like banks, system dependence weakens — bilateral crypto activity cannot degrade the regulated financial system.",
        breakPaths: [
          "Not easily breakable. Permissionless architecture means overlapping interests in extraction are protocol-guaranteed. No regulation can prevent mining or staking from being privately profitable.",
          "On-chain analytics + mandatory exchange reporting make W partially computable. Chainalysis, Flashbots MEV data, and energy consumption monitoring create W-signals. Partial break only — private wallets remain opaque.",
          "Custody regulation breaks the link between crypto activity and systemic financial risk. If exchanges and custodians are regulated as broker-dealers or banks, failures like FTX cannot cascade into the broader financial system. The protocol welfare floor (β≈1.1) remains, but system dependence above the floor is breakable.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report exchange fraud or wash trading via SEC or CFTC whistleblower programs",
              "Document unreported Maximal Extractable Value extraction or front-running — Commodity Futures Trading Commission has claimed jurisdiction over decentralized finance manipulation",
              "FinCEN SAR filing for exchanges failing AML/KYC obligations",
            ],
            infra: "SEC Whistleblower Program — covers securities fraud at crypto exchanges and token issuers. If a token is classified as a security (under the Howey test), the SEC has enforcement jurisdiction and whistleblowers can receive 10–30% of sanctions exceeding $1M. The SEC has brought enforcement actions against Coinbase, Binance, Ripple, and dozens of token issuers. CFTC Whistleblower Program — the Commodity Futures Trading Commission regulates commodities and derivatives. Bitcoin and Ethereum are classified as commodities, placing spot market manipulation and futures fraud under CFTC jurisdiction. The CFTC has claimed authority over decentralized finance protocols engaged in manipulation (e.g., Ooki DAO enforcement action). FinCEN BSA/AML (Financial Crimes Enforcement Network, Bank Secrecy Act / Anti-Money Laundering) — requires cryptocurrency exchanges to register as Money Services Businesses, implement Know Your Customer (KYC) procedures, and file Suspicious Activity Reports (SARs). Exchanges that fail to comply face criminal prosecution (e.g., Binance's $4.3B settlement in 2023). DOJ Fraud Section — prosecutes criminal fraud at crypto enterprises. The FTX prosecution (Sam Bankman-Fried convicted 2023) demonstrated that traditional wire fraud and securities fraud statutes apply to crypto platforms.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Adopt proof-of-reserves with third-party attestation — voluntarily eliminate the custody opacity",
              "Implement MEV-mitigation strategies (Flashbots Protect, PBS) — reduce extractable value",
              "Pre-comply with MiCA-equivalent obligations for US operations",
            ],
            infra: "State Money Transmitter Licenses — in the absence of a federal framework, US crypto exchanges must obtain individual money transmitter licenses in each state where they operate. New York's BitLicense (administered by New York Department of Financial Services) is the most stringent, requiring detailed compliance, capital reserves, and consumer protection measures. SEC/CFTC Registration — depending on whether tokens are classified as securities or commodities, exchanges may need to register with the SEC as broker-dealers or with the CFTC as designated contract markets. The regulatory ambiguity is itself a risk factor. EU MiCA (Markets in Crypto-Assets Regulation) — the world's first comprehensive crypto regulatory framework, fully operational since December 2024. Requires licensing for crypto-asset service providers, stablecoin reserve requirements, and market abuse prevention. Pre-compliance signals institutional maturity to investors and regulators.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "SEC/CFTC: Resolve jurisdictional ambiguity — which tokens are securities, which are commodities",
              "Fed/OCC: Finalize custody guidance for banks holding digital assets",
              "EPA: Require energy consumption disclosure for proof-of-work mining operations",
            ],
            infra: "SEC Howey Test — the legal test (from SEC v. W.J. Howey Co., 1946) that determines whether a digital asset is a 'security.' If a token involves an investment of money in a common enterprise with an expectation of profits from the efforts of others, it is a security subject to SEC regulation. This test is the source of most jurisdictional disputes in crypto. CFTC Commodity Exchange Act (CEA) Authority — gives the CFTC jurisdiction over commodity spot markets and derivatives. Bitcoin and Ethereum are treated as commodities, meaning the CFTC can pursue manipulation and fraud in those markets. Federal Reserve Supervisory Authority — the Fed supervises bank holding companies and state-chartered banks that are members of the Federal Reserve System. Fed guidance on whether banks can custody digital assets determines how deeply crypto integrates with the traditional financial system. State Energy Regulations — some states (e.g., New York, Texas) have begun regulating the energy consumption of proof-of-work mining operations. New York's moratorium on new fossil-fuel-powered mining operations (2022) was the first such law in the US.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Comprehensive digital asset framework (stalled in Congress since 2022)",
              "International coordination on exchange regulation — FSB framework",
              "Carbon pricing for proof-of-work energy consumption",
            ],
            infra: "EU MiCA (Markets in Crypto-Assets Regulation) — fully operational since 2024, this is the global model for comprehensive crypto regulation. It covers licensing, consumer protection, stablecoin reserves, and market integrity. Any US framework will inevitably be measured against MiCA. FSB (Financial Stability Board) Crypto Asset Framework — the FSB issued recommendations in 2023 for regulating crypto-asset activities and stablecoins. As an international body of central banks and financial regulators, FSB recommendations carry significant weight with G20 nations. Financial Action Task Force (FATF) Travel Rule — the Financial Action Task Force requires virtual asset service providers (VASPs) to share sender and recipient information for transactions above a threshold. This anti-money-laundering rule is being implemented globally and creates a compliance baseline for cross-border crypto transactions.",
          },
        ],
      },
    ],
  },
  {
    code: "GB", name: "United Kingdom", region: "Europe",
    summary: "Post-Brexit regulatory autonomy with strong financial sector oversight (FCA). Gambling Commission is a model regulator. Whistleblower protection via PIDA 1998, but awards are employment-tribunal based, not bounty-based like US programs.",
    sectors: [
      {
        name: "Oil & Gas (North Sea)", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0, // Axiom 1
        whyBreakable: "North Sea production is declining naturally. The Energy Profits Levy (windfall tax at 75%) is already reducing the overlapping interest. Accelerating the decline curve eliminates the profitable pathway.",
        breakPaths: [
          "Energy Profits Levy at 75% already erodes the joint gain. No new drilling licenses (Labour's 2024 commitment) eliminates future overlapping interests. The North Sea basin is naturally depleting — align policy with geology.",
          "UK Emissions Trading Scheme + mandatory Scope 3 reporting under the Companies Act makes W computable for listed firms.",
          "Not breakable — North Sea extraction affects North Atlantic ecosystems and atmospheric CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations to Environment Agency or SEPA (Scotland)",
              "Use PIDA 1998 (Public Interest Disclosure Act) for employment protection — but no financial bounty",
              "Report financial misstatement to FCA whistleblower channel",
            ],
            infra: "PIDA 1998 (Public Interest Disclosure Act) — the UK's primary whistleblower protection law. Unlike US programs, PIDA provides employment protection (protection from dismissal and detriment) but does NOT offer financial bounties. Whistleblowers must prove they made a 'qualifying disclosure' about criminal activity, regulatory breach, environmental damage, or danger to health and safety. Remedies are through Employment Tribunals. FCA Whistleblowing (SYSC 18) — the Financial Conduct Authority operates a dedicated whistleblower channel for reporting financial misconduct. The FCA received over 1,100 whistleblowing reports in 2023. Unlike the SEC, the FCA does not pay financial awards, but it does guarantee confidentiality. Environment Agency — the primary environmental regulator for England, responsible for enforcing environmental permits, pollution control, and waste management. Handles reports of illegal emissions, water contamination, and waste dumping from oil and gas operations. SEPA (Scottish Environment Protection Agency) — Scotland's equivalent of the Environment Agency, with jurisdiction over North Sea operations in Scottish waters. HMRC (His Majesty's Revenue and Customs) — handles reports of tax evasion and fraudulent claims related to oil and gas tax reliefs.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Accelerate transition capital allocation — BP, Shell have UK-listed entities with transition plan disclosure obligations",
              "Task Force on Climate-Related Financial Disclosures-aligned climate reporting (mandatory for premium-listed companies since 2021)",
              "Adopt internal carbon pricing above UK ETS market rate",
            ],
            infra: "UK Task Force on Climate-Related Financial Disclosures Mandate — the UK was the first G7 country to make Task Force on Climate-Related Financial Disclosures-aligned climate disclosures mandatory for premium-listed companies (2021), extended to large private companies (2022). Companies must disclose climate-related risks, governance structures, strategy, and metrics including emissions data. Companies Act §172 Stakeholder Duty — requires directors to 'have regard to' the interests of employees, customers, suppliers, the community, and the environment when making decisions. While not enforceable as a standalone claim, it creates a legal duty to consider stakeholder welfare in boardroom decisions. UK Corporate Governance Code — the 'comply or explain' code administered by the Financial Reporting Council. Requires listed companies to explain their approach to risk management, stakeholder engagement, and long-term value creation. Non-compliance must be publicly explained in the annual report.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "NSTA (North Sea Transition Authority): Enforce climate compatibility checkpoint for new licenses",
              "FCA: Mandate transition plan disclosure for listed energy companies",
              "Ofgem: Accelerate grid connection for renewables (current queue: 10+ years)",
            ],
            infra: "NSTA (North Sea Transition Authority) — formerly the Oil and Gas Authority, renamed in 2022 to reflect its dual mandate of managing existing production AND facilitating the transition to net zero. The NSTA issues exploration and production licenses and introduced a 'climate compatibility checkpoint' that new licenses must pass. FCA Listing Rules — the Financial Conduct Authority sets the disclosure requirements for companies listed on the London Stock Exchange. The FCA has progressively expanded climate-related disclosure requirements and is developing transition plan disclosure rules. Climate Change Act 2008 — the UK's foundational climate legislation, which legally commits the government to net zero emissions by 2050 with five-year carbon budgets set by the independent Climate Change Committee. This Act provides the legal framework for all energy transition policy. UK ETS (Emissions Trading Scheme) — the UK's post-Brexit carbon trading system, replacing participation in the EU ETS. Covers power generation, heavy industry, and aviation. The carbon price creates a direct financial signal that integrates welfare costs into energy production decisions. Ofgem (Office of Gas and Electricity Markets) — the energy market regulator, responsible for protecting consumer interests and enabling the energy transition. Currently managing a 10+ year queue for renewable energy grid connections, which is the primary bottleneck for transition.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Legislate 2030 North Sea production cap aligned with Climate Change Committee pathway",
              "UK Carbon Border Adjustment Mechanism (announced 2027 implementation) — carbon border adjustment on imports",
              "International coordination via COP presidency legacy and NDC ambition",
            ],
            infra: "Climate Change Act 2008 — legally binding net zero by 2050, with interim carbon budgets. The sixth carbon budget (2033–2037) requires a 78% reduction from 1990 levels. This is the legal anchor for all UK climate policy. UK NDC (Nationally Determined Contribution) — the UK's commitment under the Paris Agreement to reduce emissions by at least 68% by 2030 compared to 1990 levels, the most ambitious 2030 target among major economies at the time it was set. COP26 Glasgow Climate Pact (2021) — the UK-hosted summit produced the first explicit reference to fossil fuel phase-down in a COP decision text. The Glasgow Financial Alliance for Net Zero (GFANZ) also launched at COP26, committing financial institutions managing $130 trillion in assets to net zero.",
          },
        ],
      },
      {
        name: "Gambling", beta: 6.3,
        pst: [true, true, true],
        mostBreakable: 1, // Axiom 2
        whyBreakable: "The UK Gambling Commission has the most advanced harm-monitoring infrastructure in the world. Making W visible — real-time loss data, affordability checks, algorithmic transparency — is an Axiom 2 break that existing institutional architecture can deliver.",
        breakPaths: [
          "Outright ban is politically difficult. But advertising restrictions (Gambling Act 2005 review, White Paper 2023) reduce the pathway to overlapping interests. Stake limits (£2 FOBT limit, 2019) are partial Axiom 1 breaks.",
          "Mandatory affordability checks + real-time loss tracking make W computable per user. The Gambling Commission's Single Customer View initiative IS the Axiom 2 break — it makes harm visible inside the operator's payoff space.",
          "Advertising bans insulate non-gamblers from recruitment. But for active gamblers, system dependence (addiction → mental health → family → NHS costs) holds.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report operator violations to Gambling Commission compliance team",
              "Use PIDA 1998 for employment protection when reporting VIP schemes targeting vulnerable gamblers",
              "Report to HMRC if operators are facilitating money laundering",
            ],
            infra: "Gambling Commission — the UK's independent gambling regulator, established by the Gambling Act 2005. It licenses and regulates all commercial gambling in Great Britain (except the National Lottery and spread betting). The Commission has the power to revoke licenses, impose financial penalties, and refer criminal matters to prosecution. It operates a dedicated compliance reporting channel for industry insiders. PIDA 1998 (Public Interest Disclosure Act) — protects gambling industry employees who report violations such as VIP schemes targeting problem gamblers, rigged algorithms, or money laundering facilitation. Qualifying disclosures include criminal offences, regulatory breaches, and dangers to health. HMRC (His Majesty's Revenue and Customs) — gambling operators are required to comply with anti-money laundering regulations. HMRC supervises smaller operators while the Gambling Commission supervises larger ones. Reports of money laundering facilitation through gambling platforms go to HMRC or the National Crime Agency. ASA (Advertising Standards Authority) — regulates gambling advertising in the UK, enforcing rules against targeting minors, vulnerable people, or making misleading claims about odds of winning.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Implement affordability checks ahead of regulatory mandate — the White Paper is coming",
              "Adopt 'Single Customer View' across all brands — know when a customer is in harm",
              "Voluntarily cap advertising spend and end sponsorship of children's sports",
            ],
            infra: "Gambling Commission LCCP (Licence Conditions and Codes of Practice) — the binding conditions attached to every gambling license. The LCCP requires operators to assess customer risk, intervene when signs of problem gambling appear, and implement self-exclusion schemes (GamStop). The 2023 White Paper proposed strengthening these conditions with mandatory affordability checks and enhanced due diligence for high-spending customers. Gambling Act 2005 White Paper (2023) — titled 'High Stakes: Gambling Reform for the Digital Age,' this government white paper proposed the most significant reforms since the Gambling Act itself, including mandatory affordability checks, a statutory levy for gambling harm research and treatment, online stake limits, and enhanced player protection measures. These proposals await legislation. Industry Group for Responsible Gambling (IGRG) — a voluntary industry body whose members commit to responsible gambling practices. While voluntary compliance has been criticized as insufficient, IGRG standards provide a baseline that executives can exceed ahead of mandatory regulation.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Gambling Commission: Finalize mandatory affordability checks from White Paper",
              "Implement statutory levy for gambling harm research/treatment (replacing voluntary system)",
              "DCMS: Extend online stake limits modeled on £2 FOBT precedent",
            ],
            infra: "Gambling Act 2005 (review underway) — the primary legislation governing gambling in Great Britain. The Act created the Gambling Commission and established the licensing framework. The ongoing review, triggered by the 2023 White Paper, is expected to produce the most significant amendments since the Act's passage, particularly around online gambling regulation. White Paper 2023 — 'High Stakes: Gambling Reform for the Digital Age' laid out the government's reform agenda including mandatory affordability checks, a statutory levy to replace voluntary funding of GambleAware, online slot stake limits, and stronger age verification. Gambling Commission Licensing — the Commission issues operating licenses (for companies) and personal management licenses (for individuals in key roles). License conditions are enforceable — breach can result in fines, license suspension, or revocation. The Commission has imposed penalties exceeding £100M since 2017. DCMS (Department for Digital, Culture, Media and Sport) — the government department responsible for gambling policy. DCMS sets the legislative framework that the Gambling Commission implements.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Pass the Gambling Act reform — the White Paper is a plan, not legislation",
              "Mandatory pre-commitment (deposit/loss limits set before play, not during)",
              "NHS gambling treatment expansion — GambleAware funding to statutory footing",
            ],
            infra: "Gambling Act 2005 — the primary legislation, which can only be amended by Parliament. The White Paper proposals require legislative action to become binding. NHS Long Term Plan — includes commitments to expand NHS gambling addiction treatment services. Currently, 15 NHS gambling clinics operate across England, treating approximately 3,000 patients per year against an estimated problem gambling population of 300,000. The gap between need and provision is massive. GambleAware — the charity funded by voluntary industry contributions to support gambling harm research, education, and treatment. The White Paper proposed replacing voluntary contributions with a statutory levy, ensuring stable and adequate funding regardless of industry willingness to pay. Public Health England (now Office for Health Improvement and Disparities) — published a landmark evidence review in 2021 finding that gambling causes significant public health harm, supporting the case for treating gambling regulation as a public health issue rather than purely a consumer choice issue.",
          },
        ],
      },
      {
        name: "Financial Services (Benchmark Rate Legacy)", beta: 5.5,
        pst: [true, true, true],
        mostBreakable: 1, // Axiom 2 — already broken for Benchmark Rate via SONIA
        whyBreakable: "The SONIA transition IS the completed Axiom 2 break. Transaction-based benchmarks make W (benchmark integrity) computable from market activity. The question now is: which other UK financial services remain in Private-Systemic Tension?",
        breakPaths: [
          "For benchmarks: SONIA transition eliminated the overlapping interest in manipulation (no panel submissions to game). For other financial services: ring-fencing (Vickers reforms) partially breaks Axiom 1 for retail banking.",
          "SONIA is transaction-based — benchmark integrity IS a function of market activity. Axiom 2 broken. Model for other benchmarks and financial instruments.",
          "Ring-fencing separates retail deposits from investment banking risk. Axiom 3 partially broken by structural separation.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "FCA whistleblower channel — protected disclosures under PIDA 1998",
              "Report benchmark manipulation or market abuse to FCA Market Abuse team",
              "PRA whistleblower channel for prudential concerns (capital adequacy, risk management)",
            ],
            infra: "FCA Whistleblowing (SYSC 18) — the Financial Conduct Authority's whistleblower channel, governed by the Senior Management Arrangements, Systems and Controls sourcebook (SYSC 18). The FCA encourages and protects disclosures about regulatory breaches, market abuse, and consumer harm. Unlike the SEC, the FCA does not pay financial awards, but guarantees confidentiality and provides guidance on making protected disclosures. PIDA 1998 (Public Interest Disclosure Act) — provides employment protection for financial services workers who report misconduct. Covers disclosures about criminal offences, breaches of legal obligations, and miscarriages of justice. Remedies include compensation for unfair dismissal or detriment, awarded by Employment Tribunals. PRA Whistleblowing — the Prudential Regulation Authority (a subsidiary of the Bank of England) operates a separate whistleblowing channel for prudential concerns including inadequate capital reserves, poor risk management, and threats to financial stability. The PRA's prudential focus complements the FCA's conduct focus. SFO (Serious Fraud Office) — investigates and prosecutes serious or complex fraud, bribery, and corruption. The SFO prosecuted the Benchmark Rate manipulation cases (e.g., Tom Hayes conviction, later overturned). SFO has the power to compel documents and testimony under Section 2 of the Criminal Justice Act 1987.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Ensure all benchmarks have transitioned from panel-based to transaction-based (Benchmark Rate → SONIA model)",
              "Senior Managers & Certification Regime (SM&CR) — personal accountability for system integrity",
              "Conduct internal W-audit: which revenue streams have the highest βW?",
            ],
            infra: "SM&CR (Senior Managers and Certification Regime) — introduced after the Benchmark Rate scandal to ensure personal accountability at the top of financial institutions. Senior managers must have a 'Statement of Responsibilities' defining their individual accountability. If misconduct occurs in their area, they must prove they took 'reasonable steps' to prevent it. This regime makes executives personally liable for system integrity failures — the regulatory response to the 'no one was responsible' defense that characterized the Benchmark Rate scandal. FCA Conduct Rules — eleven rules of individual conduct that apply to all FCA-regulated financial services employees (approximately 60,000 firms). These include obligations to act with integrity, be open with regulators, and treat customers fairly. Breach of conduct rules can result in personal fines and bans. PRA Rulebook — the Prudential Regulation Authority's binding rules on capital adequacy, liquidity, risk management, and governance. The PRA rulebook ensures that financial institutions maintain sufficient buffers to absorb losses without threatening the wider financial system.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "FCA: Extend SONIA model to remaining panel-based benchmarks",
              "PRA: Stress-test ring-fencing adequacy under market stress scenarios",
              "FCA: Mandate W-monitoring for algorithmic trading (MiFID II equivalent post-Brexit)",
            ],
            infra: "Financial Services and Markets Act 2000 (FSMA) — the foundational legislation governing financial services regulation in the UK. FSMA established the regulatory framework, granted the FCA and PRA their powers, and defined the scope of regulated activities. It was significantly amended by the Financial Services Act 2012 (which created the FCA/PRA split) and the Financial Services and Markets Act 2023 (post-Brexit reforms). Ring-fencing (Vickers Reforms, 2019) — following the Independent Commission on Banking (Vickers Commission, 2011), UK banks with more than £25 billion in core deposits must structurally separate their retail banking operations from investment banking. This is a designed Axiom 3 break — insulating depositors from investment banking losses. Barclays, HSBC, Lloyds, and others have established ring-fenced entities. UK MiFID (Markets in Financial Instruments framework) — the UK's post-Brexit version of the EU's MiFID II directive, governing investment services, trading venues, and market transparency. Includes provisions for algorithmic trading controls, best execution requirements, and transaction reporting. FCA Handbook — the comprehensive rulebook governing all FCA-regulated firms, containing thousands of pages of rules, guidance, and evidential provisions organized by sourcebook (e.g., COBS for conduct of business, MAR for market conduct, SYSC for systems and controls).",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Export the SONIA model — advocate transaction-based benchmarks in all FSB jurisdictions",
              "Edinburgh Reforms — use post-Brexit regulatory freedom for W-aware financial regulation",
              "International coordination on algorithmic trading welfare impact through FSB/International Organization of Securities Commissions (IOSCO)",
            ],
            infra: "FSB (Financial Stability Board) — an international body of central banks, finance ministries, and financial regulators from G20 nations plus other major financial centers. The FSB coordinated the global transition from Benchmark Rate to risk-free rates (SONIA in the UK, Secured Overnight Financing Rate (SOFR) in the US, €STR in the eurozone). The FSB's benchmark reform initiative is the institutional template for coordinated Axiom 2 breaks across jurisdictions. International Organization of Securities Commissions (IOSCO) (International Organization of Securities Commissions) — the global standard-setter for securities regulation, representing regulators from 130+ jurisdictions. International Organization of Securities Commissions (IOSCO)'s Principles for Financial Benchmarks (2013) were the direct regulatory response to the Benchmark Rate scandal and established the framework for benchmark integrity that led to the transition to transaction-based rates. Edinburgh Reforms (2022) — a package of 30+ regulatory reforms announced by the UK government to take advantage of post-Brexit regulatory autonomy. Includes reforms to Solvency II (insurance capital), the Prospectus Regime, and wholesale market regulation. Mansion House Reforms (2023) — a further package of financial services reforms focused on pension fund investment, capital markets competitiveness, and fintech regulation.",
          },
        ],
      },
    ],
  },
  {
    code: "DE", name: "Germany", region: "Europe",
    summary: "EU regulatory framework plus strong domestic institutions. Energiewende (energy transition) is the world's most ambitious industrial decarbonization program. Whistleblower protection via HinSchG (2023) transposing EU Whistleblower Directive. Strong industrial base creates sector-specific Private-Systemic Tension challenges in coal, automotive, and cement.",
    sectors: [
      {
        name: "Coal / Lignite (Kohleausstieg)", beta: 6.1,
        pst: [true, true, true],
        mostBreakable: 0, // Axiom 1
        whyBreakable: "Kohleausstieg (coal exit law, 2020) is a legislated Axiom 1 break — the profitable pathway is being eliminated on a fixed timeline. The question is whether to accelerate from 2038 to 2030.",
        breakPaths: [
          "Kohleausstieg IS the Axiom 1 break. Coal exit by 2038 (ideally 2030). The profitable pathway is being legislated out of existence. RWE, LEAG, and Uniper are on notice. Structural adjustment funds (€40B) are allocated.",
          "EU ETS + national CO₂ price make W partially computable. Carbon price signals integrate welfare costs into bilateral pricing. The higher the ETS price, the stronger the Axiom 2 break.",
          "Not breakable — lignite combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report emissions underreporting via HinSchG (Hinweisgeberschutzgesetz, 2023) — Germany's new whistleblower protection law",
              "Use EU Whistleblower Directive protections for cross-border reporting",
              "Report to Umweltbundesamt (Federal Environment Agency) for environmental violations",
            ],
            infra: "HinSchG (Hinweisgeberschutzgesetz, 2023) — Germany's Whistleblower Protection Act, which transposed the EU Whistleblower Directive (2019/1937) into German law in July 2023. The law requires companies with 50+ employees to establish internal reporting channels and protects whistleblowers from retaliation (dismissal, demotion, harassment). Covers reports about criminal offences, regulatory violations, and threats to public health, safety, or the environment. Whistleblowers can report internally first or go directly to the external reporting channel at the Federal Office of Justice (Bundesamt für Justiz). EU Whistleblower Directive 2019/1937 — the EU-wide directive that required all member states to implement whistleblower protection laws by December 2021 (Germany was late, implementing in 2023). Provides a baseline of protections across all EU member states, including protection from retaliation, confidentiality guarantees, and the right to report to competent authorities. Umweltbundesamt (Federal Environment Agency) — Germany's central environmental authority, responsible for monitoring environmental quality, advising the government on environmental policy, and enforcing environmental regulations. Receives reports about emissions violations, illegal waste disposal, and environmental contamination from industrial facilities including coal power plants and mines. Bundeskartellamt (Federal Cartel Office) — Germany's competition authority, relevant when coal companies engage in anti-competitive practices such as coordinated lobbying against climate policy or cartel behavior in energy markets.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Accelerate site decommissioning — voluntary exit before 2038 deadline earns structural adjustment funds",
              "Invest in renewable generation on former mining sites (RWE's Garzweiler model)",
              "CSRD-compliant sustainability reporting covering full coal value chain welfare costs",
            ],
            infra: "EU CSRD (Corporate Sustainability Reporting Directive, 2024) — the most comprehensive corporate sustainability reporting requirement in the world. Large EU companies must report on environmental, social, and governance impacts using the European Sustainability Reporting Standards (ESRS). For coal companies, this means mandatory disclosure of Scope 1, 2, and 3 emissions, transition plans, and climate-related financial risks. The CSRD applies to approximately 50,000 companies across the EU. EU Taxonomy Regulation — a classification system that defines which economic activities qualify as 'environmentally sustainable.' Coal power generation and mining are explicitly excluded from the taxonomy, meaning they cannot be marketed as green investments. This creates a financing squeeze as institutional investors with sustainability mandates divest from non-taxonomy-aligned activities. LkSG (Lieferkettensorgfaltspflichtengesetz — Supply Chain Due Diligence Act, 2023) — requires large German companies to identify, prevent, and mitigate human rights and environmental risks throughout their supply chains. For coal companies, this covers labor conditions at mining sites, community displacement, and environmental destruction. Companies with 1,000+ employees must comply.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Kohlekommission: Advocate for 2030 acceleration (vs current 2038)",
              "BNetzA (Federal Network Agency): Accelerate renewable grid connections to replace coal capacity",
              "EU ETS: Support higher carbon price floor to make coal uneconomic faster",
            ],
            infra: "Kohleausstieg Law (Kohleverstromungsbeendigungsgesetz, 2020) — Germany's Coal Phase-Out Act, which legislated the end of coal-fired power generation by 2038 at the latest, with a review in 2026 on whether to accelerate to 2030. The law allocates up to €40 billion in structural adjustment funds for affected regions (Lausitz, Rhineland, Central Germany) and provides compensation to plant operators for early closure. EU ETS (Emissions Trading System) — the world's largest carbon market, covering approximately 40% of EU greenhouse gas emissions. Power generators, including coal plants, must purchase emission allowances for every ton of CO₂ emitted. The carbon price (fluctuating around €60–100/ton) directly increases the operating cost of coal generation, making it progressively uneconomic compared to renewables. BNetzA (Bundesnetzagentur — Federal Network Agency) — Germany's regulatory authority for electricity, gas, telecommunications, and rail networks. BNetzA manages grid connections for new generation capacity, including renewable energy projects. The speed of renewable grid connections directly determines how quickly coal capacity can be replaced. Strukturstärkungsgesetz (Structural Support Act) — the companion legislation to the Coal Phase-Out Act, allocating €40 billion in federal support for economic restructuring in coal-dependent regions, including infrastructure investment, research institutions, and federal agency relocations.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Accelerate Kohleausstieg from 2038 to 2030 — several German states already committed",
              "EU-level coal exit coordination through Fit for 55 package",
              "Just Transition Fund for Lausitz and Rhineland mining regions",
            ],
            infra: "Kohleausstieg Law — the legal foundation for Germany's coal exit, subject to the 2026 review on acceleration to 2030. North Rhine-Westphalia (home to the Rhineland lignite basin) has already committed to a 2030 coal exit, demonstrating that acceleration is politically feasible at the state level. EU Just Transition Fund — a €17.5 billion EU fund specifically designed to support regions, industries, and workers affected by the transition to climate neutrality. Germany receives approximately €2.3 billion from the fund, primarily directed to coal-dependent regions. Fit for 55 — the EU's legislative package to reduce net greenhouse gas emissions by at least 55% by 2030 (compared to 1990 levels). Includes reforms to the EU ETS, new renewable energy targets, and energy efficiency requirements that collectively make coal generation increasingly unviable. KSG (Klimaschutzgesetz — German Climate Protection Act) — Germany's climate law, amended in 2024, which sets binding sectoral emissions reduction targets and requires climate neutrality by 2045. The energy sector's carbon budget under the KSG is the binding constraint that drives coal phase-out acceleration.",
          },
        ],
      },
      {
        name: "Automotive / Emissions", beta: 5.5,
        pst: [true, true, true],
        mostBreakable: 1, // Axiom 2
        whyBreakable: "Post-Dieselgate, the EU has the world's strongest vehicle emissions testing regime (WLTP + RDE). Real-world emissions monitoring makes W computable. The Axiom 2 break is nearly complete — the question is enforcement.",
        breakPaths: [
          "EU 2035 ICE ban eliminates the overlapping interest in combustion vehicle production. But the timeline allows 10+ years of continued Private-Systemic Tension. Germany fought to include e-fuels exemption — partial Axiom 1 weakening.",
          "WLTP + Real Driving Emissions (RDE) testing makes W directly measurable from vehicle operation data. Post-VW reforms mean emissions are no longer independent of reported performance. The Axiom 2 break is institutional.",
          "Not breakable for ICE vehicles — combustion inherently affects atmospheric composition.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report defeat device software or emissions manipulation via HinSchG (2023)",
              "Use EU Whistleblower Directive for cross-border reporting to EC DG ENV",
              "Report to KBA (Kraftfahrt-Bundesamt) — the authority that missed Dieselgate",
            ],
            infra: "HinSchG (Hinweisgeberschutzgesetz, 2023) — Germany's Whistleblower Protection Act, directly relevant to automotive sector employees who discover emissions manipulation, defeat devices, or test fraud. The law protects against dismissal, demotion, and harassment for reporting to internal channels or the Federal Office of Justice. Post-Dieselgate, this law addresses the exact gap that allowed VW's defeat device to go unreported for years — employees who knew lacked legal protection. KBA (Kraftfahrt-Bundesamt — Federal Motor Transport Authority) — the German authority responsible for vehicle type-approval, vehicle registration, and driver licensing. The KBA is the body that certifies vehicles meet emissions standards. During Dieselgate, the KBA was criticized for relying on manufacturer-provided test data rather than conducting independent verification. Post-scandal reforms have strengthened KBA's independent testing capacity. EU Whistleblower Directive — provides cross-border protection for employees who report to EU institutions (e.g., DG ENV, the European Commission's environment directorate, or DG GROW for internal market) rather than national authorities. Particularly valuable when national authorities (like the KBA during Dieselgate) may be too close to the industry they regulate. Staatsanwaltschaft (Public Prosecutor) — German criminal prosecution authority. Emissions fraud is a criminal offence in Germany. The Braunschweig Public Prosecutor's Office brought criminal charges against VW executives, resulting in convictions and a €1.1 billion fine against VW. Whistleblowers can report criminal conduct directly to the prosecutor.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Accelerate EV transition timelines — VW, BMW, Mercedes all have 2030 targets",
              "Full supply chain emissions disclosure under EU CSRD",
              "Invest in solid-state battery and charging infrastructure — eliminate range anxiety as adoption barrier",
            ],
            infra: "EU CSRD (Corporate Sustainability Reporting Directive) — requires large automotive companies to disclose comprehensive sustainability data including full Scope 1, 2, and 3 emissions across their supply chains. For automakers, Scope 3 includes both upstream (raw materials, battery manufacturing) and downstream (vehicle use-phase emissions) — making the total welfare cost of vehicle production visible to investors and consumers. EU Taxonomy Regulation — classifies which automotive activities qualify as environmentally sustainable. Electric vehicle manufacturing aligns with taxonomy criteria; internal combustion engine (ICE) vehicle manufacturing does not. This classification increasingly determines access to green financing and institutional investment. LkSG (German Supply Chain Due Diligence Act) — requires German automakers to ensure human rights and environmental standards throughout their supply chains, particularly relevant for cobalt mining (Congo), lithium extraction (Chile, Australia), and battery manufacturing (China). VDA (Verband der Automobilindustrie — German Association of the Automotive Industry) — the powerful industry association representing German automakers (VW, BMW, Mercedes-Benz, Continental, Bosch). The VDA lobbied for the e-fuels exemption in the EU 2035 ICE ban. Executives can work within VDA to shift the association's position toward accelerated electrification.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "KBA: Strengthen type-approval independence from manufacturers (post-Dieselgate reform)",
              "Umweltbundesamt: Enforce real-driving emissions compliance with on-road testing",
              "BaFin: Require climate transition plan disclosure for listed automotive companies",
            ],
            infra: "EU Type-Approval Regulation (2018/858) — the post-Dieselgate overhaul of the vehicle type-approval system. This regulation introduced market surveillance (member states can test vehicles already on the road), strengthened the independence of technical services (testing bodies), gave the European Commission authority to conduct its own tests, and established penalty provisions of up to €30,000 per non-compliant vehicle. The regulation directly addresses the failures that allowed defeat devices to go undetected. Euro 7 Emissions Standards — the next generation of EU vehicle emissions standards, applicable from 2025 for new vehicle types. Euro 7 tightens limits on nitrogen oxides (NOx) and particulate matter, introduces real-driving emissions requirements for all vehicle types, and adds new limits on brake and tire particulate emissions. KBA Enforcement Authority — post-Dieselgate reforms have expanded the KBA's powers to include mandatory recall authority, independent on-road testing, and the ability to impose fines for non-compliance. The KBA now operates independently from the industry it regulates, though critics argue the transformation is incomplete. BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht — Federal Financial Supervisory Authority) — Germany's integrated financial services regulator, supervising banks, insurance companies, and securities markets. BaFin can require listed automotive companies to disclose material climate transition risks and sustainability strategies to investors.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Hold the 2035 ICE ban — resist industry pressure for delay",
              "Close the e-fuels loophole — synthetic fuels still produce particulates and NOx",
              "International coordination on EV charging standards and battery recycling",
            ],
            infra: "EU Regulation 2023/851 (2035 ICE Ban) — amends the CO₂ emission performance standards for new cars and light commercial vehicles, effectively banning the sale of new internal combustion engine vehicles from 2035 onwards (with a narrow exception for vehicles running exclusively on e-fuels, negotiated at Germany's insistence). This is a legislated Axiom 1 break on a fixed timeline — eliminating the profitable pathway for ICE vehicle manufacturing. Euro 7 — the latest iteration of EU emissions standards, building on decades of progressively tighter limits (Euro 1 in 1992 through Euro 6d in 2020). Euro 7 represents the final tightening before the 2035 ICE phase-out, ensuring that remaining ICE vehicles on the road are as clean as possible during the transition period. UN ECE (United Nations Economic Commission for Europe) Vehicle Regulations — the international framework for vehicle safety and environmental standards, administered through the World Forum for Harmonization of Vehicle Regulations (WP.29). These regulations set global technical requirements for vehicle emissions testing, safety features, and autonomous driving systems, ensuring cross-border compatibility of vehicle standards.",
          },
        ],
      },
    ],
  },
  {
    code: "NG", name: "Nigeria", region: "West Africa",
    summary: "Petroleum Industry Act 2021 created Host Community Development Trusts — a structural Axiom 3 mechanism. Whistleblower protection is weak: the 2016 Whistleblower Policy covers financial crimes but has no statutory protection for employees. EFCC and NUPRC are the key enforcement bodies.",
    sectors: [
      {
        name: "Oil & Gas (Niger Delta)", beta: 8.1,
        pst: [true, true, true],
        mostBreakable: 2, // Axiom 3
        whyBreakable: "PIA 2021 Host Community Development Trusts structurally separate extraction revenue from community welfare — a designed Axiom 3 break. The mechanism exists. Enforcement is the gap.",
        breakPaths: [
          "Partial: Dangote Refinery (650,000 bpd) shifts value from crude export to domestic refining — changes the overlapping interest structure. Full break requires economic diversification away from oil dependency (oil = 90% of export revenue).",
          "Satellite-verified flaring data (VIIRS nightfire) makes W partially computable. NOAA/World Bank Global Gas Flaring Reduction Partnership provides independent W-signal. The data exists — the institutional channel to use it does not.",
          "PIA 2021 §235–257: Host Community Development Trusts receive 3% of OPEX from operators. Designed to insulate host communities from extraction externalities. If enforced, this breaks the direct link between bilateral extraction activity and community welfare degradation.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report to EFCC (Economic and Financial Crimes Commission) — covers financial crimes related to oil theft and subsidy fraud",
              "Use 2016 Whistleblower Policy (Federal Ministry of Finance) — 2.5–5% of recovered funds, but NO statutory employment protection",
              "Document environmental violations for NOSDRA (National Oil Spill Detection and Response Agency)",
              "International channels: report to OECD National Contact Point if operator is OECD-headquartered (Shell, TotalEnergies, ENI)",
            ],
            infra: "EFCC (Economic and Financial Crimes Commission) — Nigeria's primary financial crime enforcement body, handles oil theft and subsidy fraud. 2016 Whistleblower Policy — pays 2.5–5% of recovered funds but provides NO statutory employment protection (it is an executive policy, not legislation). NOSDRA (National Oil Spill Detection and Response Agency) — receives environmental violation reports but has limited enforcement capacity. OECD National Contact Point — available when the operator is headquartered in an OECD country (Shell Netherlands, TotalEnergies France, ENI Italy).",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Fully fund and operationalize Host Community Development Trusts under PIA 2021",
              "End routine gas flaring — Nigeria Gas Flare Commercialisation Programme provides commercial alternative",
              "Publish environmental impact assessments for all production sites — NESREA requires them, enforcement is weak",
            ],
            infra: "PIA 2021 (Petroleum Industry Act) — the primary law governing Nigeria's oil sector, created the Host Community Development Trusts and restructured the regulatory framework. NESREA (National Environmental Standards and Regulations Enforcement Agency) — Nigeria's environmental regulator, created by the NESREA Act 2007. Nigeria Gas Flare Commercialisation Programme (NGFCP) — government program to capture flared gas for commercial use instead of burning it.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "NUPRC (Nigerian Upstream Petroleum Regulatory Commission): Enforce gas flaring penalties — current $2/Mscf penalty is not collected consistently",
              "NESREA: Exercise enforcement authority under NESREA Act 2007 — currently under-resourced",
              "NEITI (Nigeria Extractive Industries Transparency Initiative): Publish host community trust compliance data",
            ],
            infra: "NUPRC (Nigerian Upstream Petroleum Regulatory Commission) — created by the Petroleum Industry Act 2021, this is the upstream oil and gas regulator responsible for licensing, production monitoring, and environmental compliance. Replaces the former Department of Petroleum Resources (DPR). NUPRC sets and enforces gas flaring penalties, though collection has been inconsistent. NESREA (National Environmental Standards and Regulations Enforcement Agency) — established by the NESREA Act 2007, this is Nigeria's primary environmental regulator. NESREA has authority to enforce environmental standards, conduct environmental audits, and impose penalties for pollution. However, it is chronically under-resourced and its enforcement capacity is limited, particularly against powerful oil companies. NEITI (Nigeria Extractive Industries Transparency Initiative) — Nigeria's chapter of the global EITI, which promotes transparency in the management of revenues from oil, gas, and mining. NEITI publishes annual audit reports on extractive industry payments to government, but enforcement of its recommendations is weak. Federal Ministry of Environment — the cabinet-level ministry responsible for environmental policy, including oil spill response coordination and environmental impact assessment review.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Enact a statutory Whistleblower Protection Act — the 2016 Policy is an executive order, not legislation",
              "Enforce PIA 2021 Host Community Trusts with independent auditing",
              "Diversify beyond oil: agriculture, tech, mining — oil is 90% of export revenue, 50% of government revenue",
              "Niger Delta remediation fund with UNEP Ogoniland assessment implementation (recommended 2011, partially funded)",
            ],
            infra: "PIA 2021 (Petroleum Industry Act) — the comprehensive legislation that restructured Nigeria's oil industry after 20 years of failed reform attempts. Key provisions include the Host Community Development Trust (3% of operator OPEX), the creation of NUPRC and NMDPRA as separate regulators, and fiscal reforms to attract investment while increasing government revenue share. National Oil Spill Contingency Plan — Nigeria's framework for responding to oil spills, though implementation has been hampered by funding constraints, coordination failures, and the sheer scale of contamination in the Niger Delta (over 16,000 documented oil spill sites). UNEP Ogoniland Report (2011) — a landmark United Nations Environment Programme assessment of oil contamination in Ogoniland (Rivers State). The report found that contamination was far more widespread and severe than previously estimated, recommended a 25–30 year cleanup costing $1 billion in the first 5 years alone, and proposed the creation of an Ogoniland Environmental Restoration Authority. Implementation has been slow — the Hydrocarbon Pollution Remediation Project (HYPREP) was established in 2016 but has completed only a fraction of the recommended work. African Charter on Human and Peoples' Rights — the continental human rights treaty, which includes the right to a satisfactory environment (Article 24). The African Commission has ruled that oil pollution in the Niger Delta violates this right (SERAP v. Nigeria), though enforcement of African Commission decisions remains weak.",
          },
        ],
      },
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 0, // Axiom 1
        whyBreakable: "Nigeria's agricultural sector is dominated by cassava, cocoa, and palm oil monocultures. Crop diversification programs — if tied to credit access and extension services — can change the overlapping interest from monoculture yield maximization to resilient multi-crop systems.",
        breakPaths: [
          "Tie agricultural credit and subsidies to crop diversification requirements. The Anchor Borrowers' Programme (CBN) currently incentivizes single-crop production. Restructure to reward polyculture.",
          "Soil health monitoring + yield data transparency would make W computable. FAO Global Soil Partnership provides methodology. Nigeria's soil data is sparse.",
          "Not breakable — monoculture inherently affects soil biodiversity and pathogen evolution. 730:1 generational asymmetry is biological.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Document pesticide misuse or soil degradation at industrial farms — report to NAFDAC or NESREA",
              "Report fraudulent fertilizer subsidies via EFCC or 2016 Whistleblower Policy",
            ],
            infra: "NAFDAC (National Agency for Food and Drug Administration and Control) — Nigeria's regulatory authority for food safety, pharmaceuticals, and agricultural chemicals. NAFDAC registers and regulates pesticides, herbicides, and fertilizers used in agriculture. Reports of banned pesticide use, counterfeit agricultural chemicals, or adulterated food products go to NAFDAC. The agency has the power to seize products, shut down operations, and prosecute offenders. NESREA (National Environmental Standards and Regulations Enforcement Agency) — handles environmental complaints related to agricultural pollution, including soil contamination from excessive chemical use, water pollution from agricultural runoff, and deforestation for farmland expansion. EFCC (Economic and Financial Crimes Commission) — relevant when agricultural subsidies, fertilizer distribution programs, or government agricultural loans are subject to fraud. Nigeria's fertilizer subsidy program has been plagued by diversion and corruption, with subsidized fertilizer often resold at market prices. Federal Ministry of Agriculture — oversees agricultural policy and programs but has limited direct enforcement capacity. Reports about agricultural program fraud or mismanagement can be directed here.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Adopt integrated pest management and polyculture rotations",
              "Fund on-farm germplasm conservation — Nigeria has 40+ indigenous crop varieties at risk",
              "Supply chain diversification for export crops (cocoa, sesame, cashew)",
            ],
            infra: "IITA (International Institute of Tropical Agriculture) — headquartered in Ibadan, Nigeria, IITA is one of the CGIAR research centers. It develops improved crop varieties, farming systems, and post-harvest technologies for tropical agriculture. IITA's mandate includes cassava, yam, cowpea, banana, soybean, and maize — crops critical to Nigerian food security. IITA provides technical assistance, improved germplasm, and training that can support the transition from monoculture to diversified farming systems. National Gene Bank (National Centre for Genetic Resources and Biotechnology, NACGRAB) — located in Ibadan, NACGRAB conserves Nigeria's plant genetic resources, including seeds and tissue cultures of indigenous crop varieties. With over 40 indigenous crop varieties at risk of extinction due to monoculture expansion, the gene bank is a critical resource for maintaining agricultural biodiversity. Cocoa Research Institute of Nigeria (CRIN) — a federal research institute dedicated to improving cocoa and other tree crops (kola, coffee, cashew, tea). CRIN develops improved varieties, pest management strategies, and processing techniques that can support sustainable intensification rather than area expansion.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Federal Ministry of Agriculture: Tie Anchor Borrowers' Programme loans to diversification requirements",
              "NAFDAC: Enforce pesticide safety standards on monoculture farms",
              "National Agricultural Seeds Council: Promote certified diverse seed varieties",
            ],
            infra: "Anchor Borrowers' Programme (ABP) — a Central Bank of Nigeria (CBN) intervention launched in 2015 to provide low-interest loans to smallholder farmers for cultivation of specific crops. The programme links farmers to processors ('anchors') who guarantee off-take. While successful in increasing production, the ABP's single-crop focus (rice, wheat, maize, cotton, cassava) has reinforced monoculture practices. Restructuring loan conditions to reward crop diversification would use existing infrastructure to break Axiom 1. National Agricultural Seeds Council (NASC) — the regulatory body responsible for certifying and controlling the quality of seeds in Nigeria. NASC can promote agricultural diversification by certifying and distributing improved varieties of underutilized crops, making diverse seeds accessible to farmers who currently default to monoculture because improved varieties of alternative crops are unavailable. Agricultural Research Council of Nigeria (ARCN) — the coordinating body for agricultural research in Nigeria, overseeing 15 research institutes covering different crops and ecological zones. ARCN sets research priorities that can either reinforce monoculture (by focusing exclusively on major export crops) or promote diversification (by investing in research on indigenous and underutilized species).",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "National crop diversification mandate tied to climate resilience",
              "Ratify and implement the International Treaty on Plant Genetic Resources",
              "AU Comprehensive Africa Agriculture Development Programme (CAADP) alignment",
            ],
            infra: "CAADP (Comprehensive Africa Agriculture Development Programme) — the African Union's continent-wide framework for agricultural transformation, adopted in 2003 under the Maputo Declaration. CAADP commits African governments to allocating at least 10% of national budgets to agriculture and achieving 6% annual agricultural growth. Nigeria signed the CAADP compact in 2009, but implementation has been uneven. CAADP's pillars include sustainable land and water management, market access, and food security — all of which support diversification over monoculture. FAO (Food and Agriculture Organization of the United Nations) — provides technical assistance on sustainable agriculture, soil health monitoring, and crop diversification. The FAO's Global Soil Partnership and Globally Important Agricultural Heritage Systems (GIAHS) programs offer frameworks for transitioning from monoculture to sustainable production systems. International Treaty on Plant Genetic Resources for Food and Agriculture (ITPGRFA) — an international agreement under the FAO that establishes a multilateral system for sharing plant genetic resources and a benefit-sharing fund. Ratification and implementation would strengthen Nigeria's access to diverse crop varieties and support the conservation of indigenous agricultural biodiversity. AfCFTA (African Continental Free Trade Area) Agricultural Provisions — the AfCFTA's provisions on agricultural trade can support diversification by opening regional markets for crops beyond the traditional export commodities, reducing Nigeria's dependence on cocoa, palm oil, and cassava monocultures.",
          },
        ],
      },
    ],
  },
  {
    code: "SA", name: "Saudi Arabia", region: "Middle East",
    summary: "Vision 2030 is the most explicit sovereign Axiom 1 break in the world — a national strategy to eliminate economic dependence on oil. No whistleblower protection statute. Limited regulatory independence. The sovereign IS the actor at all levels.",
    sectors: [
      {
        name: "Oil & Gas (Aramco)", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0, // Axiom 1
        whyBreakable: "Vision 2030 IS the Axiom 1 break — eliminate the economy's dependence on oil revenue. Saudi Arabia is the only petrostate with a publicly stated, funded, and partially implemented plan to break its own Private-Systemic Tension. The question is speed, not direction.",
        breakPaths: [
          "Vision 2030 economic diversification — reduce oil's share of GDP from 42% (2016) to <20%. NEOM ($500B), The Line, Red Sea tourism, entertainment sector liberalization, PIF sovereign wealth investment in non-oil assets. The overlapping interest in oil extraction weakens as alternative revenue grows.",
          "Saudi Green Initiative (2021): net zero by 2060, 50% renewable energy by 2030. Circular Carbon Economy framework. If carbon accounting becomes standard in Saudi national accounts, W becomes partially computable.",
          "Not breakable — Saudi extraction affects global crude supply and atmospheric CO₂. The kingdom is the world's largest oil exporter. System dependence is structural.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "No domestic whistleblower statute exists. This is the gap.",
              "For Aramco employees at international operations: use host-country whistleblower protections",
              "For foreign nationals: report to home-country regulators or OECD National Contact Points",
              "Document and preserve evidence for potential future international proceedings",
            ],
            infra: "No Statutory Whistleblower Protection — Saudi Arabia has no dedicated whistleblower protection law. This is the single largest institutional gap in Saudi governance relevant to Private-Systemic Tension. Employees who report misconduct have no legal protection from retaliation, and the absence of a protected channel means information about environmental violations, corruption, or safety failures remains trapped inside organizations. Nazaha (National Anti-Corruption Commission, also known as the Control and Anti-Corruption Authority) — Saudi Arabia's anti-corruption body, established by royal decree. Nazaha investigates government corruption, embezzlement, and abuse of power. However, its mandate is limited to public sector corruption and does not extend to environmental violations, safety violations, or private sector misconduct. Reports to Nazaha are not protected by whistleblower legislation. OECD National Contact Point — for foreign employees of Aramco or its international subsidiaries, the OECD Guidelines for Multinational Enterprises provide a complaint mechanism through National Contact Points in OECD member countries. If a foreign employee witnesses misconduct at Aramco's operations abroad (or at joint ventures with OECD-headquartered companies), they can file complaints with their home country's NCP.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Accelerate Aramco's downstream diversification — chemicals, hydrogen, carbon capture",
              "Implement internal carbon pricing for capital allocation (Aramco announced sustainability framework 2024)",
              "Invest PIF capital in non-oil sectors — $620B sovereign wealth fund is the transition vehicle",
            ],
            infra: "Aramco Sustainability Report — Saudi Aramco publishes an annual sustainability report disclosing environmental metrics, carbon intensity, and downstream investment. While the report represents progress in transparency, independent verification of Aramco's environmental data remains limited. Aramco's Scope 3 emissions (from combustion of its products) are among the largest of any company in the world. PIF (Public Investment Fund) Investment Strategy — Saudi Arabia's sovereign wealth fund, with approximately $930 billion in assets under management (2024). PIF is the primary vehicle for Vision 2030's economic diversification, investing in entertainment (Six Flags Qiddiya), tourism (Red Sea Global, NEOM), technology (multiple tech venture investments), sports (Newcastle United FC, LIV Golf), and renewable energy. The shift of PIF capital from oil-dependent to diversified investments IS the financial mechanism for the Axiom 1 break. Saudi Green Initiative (SGI) — announced in 2021 by Crown Prince Mohammed bin Salman, the SGI targets net zero emissions by 2060, 50% renewable energy generation by 2030, planting 10 billion trees across Saudi Arabia, and protecting 30% of the kingdom's land and sea areas. The initiative includes the Circular Carbon Economy framework, which emphasizes carbon capture and utilization alongside emissions reduction. KACARE (King Abdullah City for Atomic and Renewable Energy) — the government body responsible for developing Saudi Arabia's renewable energy and nuclear energy programs. KACARE has set targets for 58.7 GW of renewable energy capacity by 2030, split between solar (40 GW) and wind (18.7 GW).",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Ministry of Energy: Enforce Saudi Green Initiative targets (50% renewables by 2030)",
              "CMA (Capital Market Authority): Mandate environmental, social, and governance disclosure for Tadawul-listed companies",
              "SEEC (Saudi Energy Efficiency Center): Strengthen industrial energy efficiency standards",
            ],
            infra: "Saudi Green Initiative (2021) — the kingdom's flagship climate and environmental program, setting targets for renewable energy deployment, emissions reduction, afforestation, and conservation. The SGI is overseen by the SGI Supreme Committee, chaired by the Crown Prince, giving it the highest level of political authority. CMA (Capital Market Authority) — Saudi Arabia's securities regulator, overseeing the Tadawul stock exchange (the largest in the Middle East by market capitalization). The CMA issued environmental, social, and governance disclosure guidelines in 2021 encouraging listed companies to report on environmental and social risks. Moving from voluntary guidelines to mandatory disclosure requirements would make W visible to investors in Saudi public markets. SEEC (Saudi Energy Efficiency Center) — established in 2010 to develop and implement energy conservation and efficiency measures across Saudi Arabia. SEEC has introduced energy efficiency labels for appliances, fuel economy standards for vehicles, and building energy codes. For the oil and gas sector, SEEC standards determine how efficiently energy is consumed in extraction, refining, and petrochemical operations. KACARE (King Abdullah City for Atomic and Renewable Energy) — manages Saudi Arabia's renewable energy program, including the National Renewable Energy Program (NREP) which auctions renewable energy capacity. KACARE's procurement processes have achieved some of the world's lowest solar energy prices (below $0.02/kWh), demonstrating the economic viability of the transition.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Accelerate Vision 2030 timeline — diversification is the existential priority",
              "Enact whistleblower protection legislation — Saudi Arabia is the largest G20 economy without one",
              "Lead OPEC+ production management toward managed decline, not market share maximization",
              "Implement c-adjusted GDP in national accounting — Saudi Arabia's c-adjusted GDP delta is among the largest in the world",
            ],
            infra: "Vision 2030 — Saudi Arabia's national transformation program, announced in 2016 by Crown Prince Mohammed bin Salman. The plan aims to reduce the kingdom's dependence on oil revenue by developing tourism, entertainment, technology, mining, and financial services sectors. Vision 2030 is the most explicit sovereign Axiom 1 break in existence — a national strategy to eliminate the profitable pathway that sustains Private-Systemic Tension. The question is whether diversification proceeds fast enough to break oil dependence before climate transition costs become unmanageable. Saudi Green Initiative — the environmental component of the national transformation, targeting net zero by 2060 with interim milestones including 50% renewable electricity by 2030 and massive afforestation programs. OPEC+ Framework — Saudi Arabia leads OPEC+ (OPEC plus allied non-member producers), which manages global oil production levels. The kingdom's production decisions affect global crude prices and, consequently, the economic viability of oil extraction worldwide. Shifting OPEC+ from market share maximization to managed decline would be the most impactful single policy change for global decarbonization. G20 Membership — Saudi Arabia joined the G20 in 1999 and hosted the G20 summit in 2020. As a G20 member, Saudi Arabia has committed to fossil fuel subsidy reform and climate action. Enacting whistleblower protection legislation would align Saudi Arabia with G20 governance norms — it is currently the largest G20 economy without such a law. Paris Agreement (ratified 2016) — Saudi Arabia ratified the Paris Agreement and submitted an NDC targeting emission reductions through energy efficiency, renewable energy deployment, and carbon capture. The kingdom's 2060 net zero target extends 10 years beyond the Paris Agreement's implicit timeline.",
          },
        ],
      },
      {
        name: "Water (Desalination & Aquifer Depletion)", beta: 4.2,
        pst: [true, true, true],
        mostBreakable: 1, // Axiom 2
        whyBreakable: "SWCC (Saline Water Conversion Corporation) operates the world's largest desalination fleet. Aquifer depletion is measurable via satellite gravimetry (GRACE data). Making W visible — publishing aquifer drawdown rates alongside extraction data — is the Axiom 2 break.",
        breakPaths: [
          "Difficult. Water is a survival necessity — overlapping interests in extraction are existential, not merely profitable.",
          "GRACE satellite data makes aquifer depletion rates directly measurable. If SWCC and MEWA (Ministry of Environment, Water and Agriculture) publish real-time aquifer levels alongside consumption data, W becomes computable from bilateral water use.",
          "Agricultural water pricing reform can reduce system dependence — Saudi agriculture uses 83% of water, mostly for alfalfa and wheat that could be imported. Reducing agricultural water use insulates aquifers from bilateral farming activity.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "No domestic whistleblower protection for environmental reporting",
              "Document illegal well drilling or aquifer contamination for MEWA",
              "International channels for foreign workers: report to home-country environmental agencies",
            ],
            infra: "No Statutory Protection — as with the oil sector, Saudi Arabia lacks whistleblower protection legislation for environmental reporting. Workers who discover illegal well drilling, aquifer contamination, or water quality violations have no legal protection from retaliation. This gap is particularly acute because foreign workers (who constitute a significant portion of the agricultural and industrial workforce) face additional vulnerabilities including visa-dependent residency. MEWA (Ministry of Environment, Water and Agriculture) — the government ministry responsible for water policy, agricultural regulation, and environmental protection. MEWA manages water allocation between municipal, industrial, and agricultural users, sets well-drilling permits, and monitors water quality. Reports of illegal wells or contamination should be directed to MEWA, though the ministry's enforcement capacity outside urban areas is limited. Nazaha (National Anti-Corruption Commission) — as with the oil sector, Nazaha's mandate covers only government corruption, not environmental or safety violations. It can investigate cases of corrupt officials issuing illegal well-drilling permits or diverting water resources, but it cannot address the underlying environmental harm.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Invest in water recycling and treated sewage effluent (TSE) reuse for non-potable applications",
              "Phase out water-intensive crops (alfalfa, wheat) in favor of imported alternatives",
              "Adopt real-time aquifer monitoring with public disclosure",
            ],
            infra: "SWCC (Saline Water Conversion Corporation) — the world's largest producer of desalinated water, operating 31 desalination plants across Saudi Arabia with a combined capacity exceeding 5.6 million cubic meters per day. SWCC provides approximately 69% of Saudi Arabia's drinking water. The corporation is currently transitioning from thermal desalination (energy-intensive) to reverse osmosis (more energy-efficient), and from fossil-fuel-powered to solar-powered operations. SWCC's transition to renewable-powered desalination is itself an Axiom 2 break — making the energy cost of water production visible and manageable. National Water Strategy 2030 — Saudi Arabia's plan to address water scarcity through demand reduction, supply diversification, and efficiency improvements. Key targets include reducing per capita water consumption (currently among the highest in the world at approximately 263 liters per person per day), increasing wastewater reuse to 70%, and eliminating aquifer over-extraction. MEWA Agricultural Water Allocation — MEWA manages the allocation of water resources between competing uses. Agriculture consumes approximately 83% of Saudi Arabia's water, primarily for animal feed crops (alfalfa) and wheat. MEWA has already phased out wheat cultivation subsidies (completed 2016) and is progressively restricting alfalfa and other water-intensive crops. Reforming agricultural water pricing from near-zero to cost-reflective levels would dramatically reduce agricultural water demand.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "MEWA: Implement tiered water pricing that reflects true scarcity cost",
              "SWCC: Transition desalination to renewable-powered (solar is abundant, current fleet is gas-fired)",
              "Ban new agricultural well permits in critically depleted aquifers",
            ],
            infra: "National Water Strategy 2030 — establishes the regulatory framework for sustainable water management, including targets for reducing non-revenue water losses, increasing treated wastewater reuse, and protecting aquifer recharge areas. SWCC (Saline Water Conversion Corporation) — in addition to its operational role, SWCC conducts research and development on desalination technologies, including solar-powered reverse osmosis and forward osmosis. SWCC's R&D program is one of the world's largest for desalination innovation. MEWA Water Allocation Authority — MEWA has the regulatory authority to issue and revoke well-drilling permits, set water tariffs, and enforce water quality standards. The ministry's ability to implement tiered pricing (where water costs increase with consumption) is the most direct mechanism for reducing water waste and making the true cost of water extraction visible. NWC (National Water Company) — the public utility responsible for water distribution and wastewater collection in Saudi Arabia's major cities. NWC operates under a corporatized model, managing water networks that serve over 10 million connections. NWC's infrastructure investments in leak reduction, smart metering, and wastewater treatment directly affect the efficiency of water use.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Publish aquifer depletion rates as part of national accounts — make the drawdown visible",
              "Phase out agricultural water subsidies — current pricing is 1% of desalination cost",
              "Regional water cooperation framework with GCC states",
            ],
            infra: "Vision 2030 — water security is a critical pillar of Vision 2030, as economic diversification (tourism, industry, urban development) all require sustainable water supplies. The tension between agricultural water use and urban/industrial demand is one of the key resource allocation challenges of the transformation program. National Water Strategy — the strategy document that operationalizes Vision 2030's water objectives, setting quantitative targets for supply, demand, efficiency, and infrastructure investment through 2030. GCC (Gulf Cooperation Council) Cooperation Framework — water scarcity is a shared challenge across all six GCC states (Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman). Regional cooperation on desalination technology, shared aquifer management, and emergency water supply interconnections is coordinated through the GCC. The GCC Interconnection Authority (GCCIA) for electricity could be extended to water infrastructure. UN SDG 6 (Clean Water and Sanitation) — Sustainable Development Goal 6 commits all UN member states to ensuring availability and sustainable management of water and sanitation for all by 2030. Saudi Arabia reports on SDG 6 progress through the UN's Voluntary National Review process, creating an international accountability mechanism for water governance.",
          },
        ],
      },
    ],
  },
  {
    code: "FR", name: "France", region: "Europe",
    summary: "Strong regulatory state with EU framework. Sapin II law (2016) introduced France's first whistleblower protections and created the Agence Française Anticorruption. Nuclear-dominant energy mix (70% of electricity) means France's Private-Systemic Tension challenges are in agriculture, finance, and industrial chemicals rather than power generation.",
    sectors: [
      {
        name: "Industrial Agriculture / Pesticides", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "France's Ecophyto plan targets 50% pesticide reduction. If agricultural subsidies (€9B/year from CAP) are conditioned on reduced chemical inputs, the overlapping interest in intensive monoculture weakens.",
        breakPaths: [
          "Condition CAP subsidies on pesticide reduction targets. France receives €9B/year from the EU Common Agricultural Policy. Tying payments to agroecological transition eliminates the financial incentive for chemical-intensive production.",
          "Mandatory soil health monitoring and pesticide residue disclosure makes W computable per farm. France's RPG (Registre Parcellaire Graphique) already maps every agricultural parcel — adding soil and chemical data creates full transparency.",
          "Not breakable — intensive agriculture inherently degrades soil biodiversity. The biological asymmetry is structural.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report pesticide violations via Sapin II whistleblower protections",
              "Document illegal pesticide use for ANSES (Agence nationale de sécurité sanitaire)",
              "Report CAP subsidy fraud to OLAF (EU Anti-Fraud Office) or Tracfin",
              "Contact your député or sénateur to demand acceleration of Ecophyto targets",
            ],
            infra: "Sapin II Law (2016) — France's anti-corruption and whistleblower protection law, named after Finance Minister Michel Sapin. It created the first statutory whistleblower protections in France, covering employees who report crimes, regulatory violations, or threats to health and the environment. Whistleblowers must follow a graduated disclosure process (internal → regulator → public). The law also created the Agence Française Anticorruption (AFA) to prevent and detect corruption. EU Whistleblower Directive (transposed 2022) — strengthened Sapin II protections, removing the graduated disclosure requirement and allowing direct external reporting. ANSES (Agence nationale de sécurité sanitaire de l'alimentation, de l'environnement et du travail) — France's national agency for food, environmental, and occupational health safety. ANSES evaluates pesticide risks and authorizes their use. Reports of unauthorized pesticide application, falsified safety data, or environmental contamination go to ANSES.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Transition to agroecological practices — France's GIEE (Groupements d'intérêt économique et environnemental) model",
              "Disclose pesticide use per product line under EU CSRD",
              "Invest in biological pest control alternatives",
            ],
            infra: "EU CSRD (Corporate Sustainability Reporting Directive) — requires large French agribusinesses to disclose environmental impacts including pesticide use, soil health metrics, and biodiversity impacts. Loi PACTE (2019) — reformed French corporate law to require companies to consider social and environmental impacts in their corporate purpose. Companies can adopt 'raison d'être' (purpose statement) and become 'société à mission' (mission-driven company), creating legal accountability for environmental commitments.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "ANSES: Accelerate neonicotinoid phase-out (France led the EU ban in 2018)",
              "Ministry of Agriculture: Condition CAP eco-scheme payments on measurable pesticide reduction",
              "Autorité de la concurrence: Investigate pesticide cartel behavior",
            ],
            infra: "Ecophyto Plan — France's national plan to reduce pesticide use by 50%, launched in 2008 and repeatedly delayed. Ecophyto II+ (2018) set a 2025 target that has not been met. The plan funds research into alternatives, provides training for farmers, and establishes indicator-based monitoring. CAP Eco-Schemes — the EU Common Agricultural Policy's new green architecture, which allows member states to reward farmers for environmental practices. France's eco-scheme design determines whether CAP payments incentivize reduced chemical inputs.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your elected representatives (députés, sénateurs) to demand binding pesticide reduction legislation",
              "Support EU Sustainable Use of Pesticides Regulation (proposed 2022, stalled)",
              "Push for Farm to Fork Strategy implementation at EU Council",
            ],
            infra: "EU Farm to Fork Strategy — the European Commission's plan for a fair, healthy, and environmentally-friendly food system. Targets 50% pesticide reduction by 2030 and 25% organic farming. French citizens can write to their député (National Assembly) or sénateur to demand France support binding EU targets rather than voluntary ones. France's Assemblée nationale and Sénat — France's bicameral legislature. Citizens can contact representatives at assemblee-nationale.fr and senat.fr. Committee hearings on agriculture are public and accept written submissions.",
          },
        ],
      },
    ],
  },
  {
    code: "JP", name: "Japan", region: "East Asia",
    summary: "World's third-largest economy with deep industrial Private-Systemic Tension in coal-fired power (32% of electricity) and automotive. Whistleblower Protection Act (2004, amended 2022) provides employment protection but no financial bounties. Keidanren (business federation) has enormous policy influence. Japan's 2050 net zero target faces tension with energy security concerns post-Fukushima.",
    sectors: [
      {
        name: "Coal-Fired Power", beta: 6.1,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Japan's revised Energy Supply Structure Sophistication Act requires detailed emissions reporting per facility. Making W computable through facility-level disclosure is achievable with existing institutional infrastructure.",
        breakPaths: [
          "Phase out coal subsidies including JBIC export finance. Japan is the last G7 country financing overseas coal plants. Eliminating public finance for coal removes the overlapping interest.",
          "Mandatory facility-level emissions disclosure under Japan's GHG Accounting and Reporting System makes W computable. The data infrastructure exists — publication and integration into financial markets is the gap.",
          "Not breakable — coal combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report emissions falsification under Whistleblower Protection Act (公益通報者保護法, 2004, amended 2022)",
              "Document coal plant pollution violations for local prefectural environmental agencies",
              "Report financial misstatement related to stranded asset risk to SESC (Securities and Exchange Surveillance Commission)",
            ],
            infra: "Whistleblower Protection Act (公益通報者保護法, Koueki Tsuuhou-sha Hogo Hou) — Japan's whistleblower law, originally passed in 2004 and significantly strengthened in 2022. The 2022 amendments require companies with 300+ employees to establish internal reporting channels, expanded the scope of protected disclosures to include administrative violations (not just criminal), and extended protection to former employees and officers. However, like the UK's PIDA, there are no financial bounties — protection is limited to employment remedies. SESC (Securities and Exchange Surveillance Commission, 証券取引等監視委員会) — Japan's securities market watchdog, operating under the Financial Services Agency (FSA). SESC investigates market manipulation, insider trading, and disclosure violations. Reports about coal companies concealing stranded asset risks or misrepresenting transition plans go to SESC. Prefectural Environmental Agencies — Japan's 47 prefectures each have environmental departments that enforce local pollution standards, which can be stricter than national standards. Prefectural agencies handle complaints about air and water pollution from specific facilities.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Accelerate coal plant retirement — Japan's 2030 energy mix target still includes 19% coal",
              "Adopt Task Force on Climate-Related Financial Disclosures-aligned disclosure (Japan was an early Task Force on Climate-Related Financial Disclosures adopter)",
              "Transition JERA (Japan's largest power generator) to ammonia co-firing as interim measure, full renewable as target",
            ],
            infra: "Japan's Corporate Governance Code — revised in 2021 to require prime market-listed companies to enhance climate-related disclosure and board-level sustainability oversight. Japan was one of the first countries where Task Force on Climate-Related Financial Disclosures-aligned reporting became effectively mandatory for major listed companies. JERA — a joint venture between TEPCO and Chubu Electric, JERA is Japan's largest power generation company and one of the world's largest coal power operators. JERA's transition strategy includes ammonia co-firing (mixing ammonia into coal combustion to reduce CO₂) as an interim technology.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "METI: Set binding coal phase-out date (currently absent from Japan's energy policy)",
              "FSA: Mandate climate transition plan disclosure for listed energy companies",
              "Environment Ministry: Strengthen carbon pricing under GX (Green Transformation) initiative",
            ],
            infra: "METI (Ministry of Economy, Trade and Industry, 経済産業省) — the ministry responsible for energy policy, including the Strategic Energy Plan that sets Japan's energy mix targets. METI has historically favored a technology-neutral approach that keeps coal in the mix alongside nuclear and renewables. GX (Green Transformation) Initiative — Japan's ¥150 trillion ($1 trillion) plan for decarbonization, including carbon pricing through GX-ETS (emissions trading starting 2026) and a carbon surcharge. The GX strategy is Japan's primary framework for climate policy.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Diet member (国会議員) to demand a coal phase-out date — Japan is the only G7 nation without one",
              "End JBIC and NEXI public finance for overseas coal projects",
              "Strengthen NDC to include absolute coal exit timeline",
              "Support Asia Energy Transition Initiative with binding commitments, not just financing",
            ],
            infra: "Japan's National Diet (国会) — the bicameral legislature consisting of the House of Representatives (衆議院) and House of Councillors (参議院). Japanese citizens can contact their representatives through the Diet website. Energy policy is primarily handled by METI but requires Diet approval for major legislation. JBIC (Japan Bank for International Cooperation) — Japan's export credit agency, which has historically financed coal power plants in Southeast Asia. G7 commitments to end overseas coal finance were adopted in 2021, but implementation has been slow.",
          },
        ],
      },
    ],
  },
  {
    code: "CA", name: "Canada", region: "North America",
    summary: "Oil sands are Canada's primary Private-Systemic Tension challenge — the world's third-largest oil reserves with among the highest extraction emissions per barrel. Strong federal whistleblower framework (PSDPA for public sector, provincial laws for private). Carbon pricing via federal backstop. Indigenous rights add a critical dimension to resource extraction Private-Systemic Tension.",
    sectors: [
      {
        name: "Oil Sands (Alberta)", beta: 7.8,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Canada's federal carbon pricing ($170/tonne by 2030) makes W increasingly computable. The carbon price directly integrates welfare costs into extraction economics. The Axiom 2 break is legislated and escalating.",
        breakPaths: [
          "Cap oil sands emissions at 100 Mt/year (proposed but not legislated). Combined with declining demand, the emissions cap eliminates future overlapping interests in expansion.",
          "Federal carbon pricing at $170/tonne by 2030 makes W computable per barrel of bitumen. At current carbon intensity (70–110 kg CO₂/barrel), carbon costs become 15–25% of breakeven price.",
          "Not breakable — bitumen extraction and upgrading inherently produces CO₂. Oil sands have 3–4× the lifecycle emissions of conventional crude.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations to Alberta Energy Regulator or Environment and Climate Change Canada",
              "Use Alberta's Public Interest Disclosure Act (PIDA, 2013) for provincial public sector employees",
              "Federal public servants: Protected Disclosure Act (PSDPA, 2007)",
              "Report to Canada Energy Regulator for interprovincial pipeline violations",
            ],
            infra: "PSDPA (Public Servants Disclosure Protection Act, 2007) — Canada's federal whistleblower protection law for public servants. Covers disclosures about wrongdoing in the federal public sector, including environmental regulatory failures. The Office of the Public Sector Integrity Commissioner investigates complaints. Alberta PIDA (Public Interest Disclosure Act, 2013) — Alberta's provincial whistleblower law for public sector employees, covering disclosures about regulatory failures in oil sands oversight. Canada Energy Regulator (CER) — the federal body that regulates interprovincial and international pipelines (including Trans Mountain, Keystone), energy exports, and offshore energy projects. The CER replaced the National Energy Board in 2019. Environment and Climate Change Canada — the federal department responsible for environmental regulation, including greenhouse gas emissions reporting under the Greenhouse Gas Pollution Pricing Act.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Set science-based emissions reduction targets for oil sands operations (Pathways Alliance model)",
              "Invest in carbon capture and storage — the Alberta Carbon Trunk Line is operational",
              "Meaningful implementation of duty to consult with Indigenous nations on all projects",
              "Disclose Scope 3 emissions and stranded asset risk under Canadian Securities Administrators guidance",
            ],
            infra: "Pathways Alliance — a consortium of Canada's six largest oil sands producers (Suncor, Canadian Natural Resources, Cenovus, Imperial Oil, MEG Energy, ConocoPhillips Canada) committed to net zero emissions from oil sands operations by 2050. The alliance proposed a $16.5B carbon capture project, partially funded by government. Canadian Securities Administrators (CSA) — Canada's umbrella organization of provincial securities regulators. The CSA issued climate-related disclosure guidance requiring reporting issuers to disclose material climate risks. Duty to Consult — a constitutional obligation arising from Section 35 of the Constitution Act, 1982, requiring the Crown to consult and accommodate Indigenous peoples when government decisions may adversely affect their Aboriginal or treaty rights. This duty is central to every oil sands project approval.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Alberta Energy Regulator: Enforce tailings pond remediation timelines",
              "Environment and Climate Change Canada: Finalize the oil and gas emissions cap",
              "Impact Assessment Agency: Require cumulative effects assessment for oil sands expansion",
            ],
            infra: "Alberta Energy Regulator (AER) — the provincial regulator responsible for oil sands development approvals, operational compliance, and environmental monitoring in Alberta. The AER regulates the entire lifecycle from exploration to reclamation. Greenhouse Gas Pollution Pricing Act (2018) — the federal law establishing Canada's carbon pricing system. Provinces can implement their own system meeting federal stringency benchmarks, or the federal backstop applies. The price escalates to $170/tonne by 2030. Impact Assessment Agency of Canada — conducts environmental and impact assessments for major projects, including oil sands expansions and pipelines.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Member of Parliament to demand the oil and gas emissions cap be legislated, not just proposed",
              "Implement UNDRIP (UN Declaration on the Rights of Indigenous Peoples) — Canada adopted it in 2021 via Bill C-15",
              "Eliminate fossil fuel subsidies — Canada committed to 2025 phase-out, still providing $18.6B annually",
              "Strengthen NDC: Canada's current 40–45% reduction target by 2030 requires oil sands emissions cap to be credible",
            ],
            infra: "Parliament of Canada — bicameral legislature (House of Commons and Senate). Citizens can contact their MP through ourcommons.ca. Energy and environment committee hearings accept public submissions. UNDRIP Act (Bill C-15, 2021) — requires the Government of Canada to align federal laws with the UN Declaration on the Rights of Indigenous Peoples, including the principle of free, prior, and informed consent for resource development on Indigenous territories. Canada's NDC — commits to 40–45% emissions reduction below 2005 levels by 2030 and net zero by 2050. Without binding oil sands emissions constraints, the NDC is not credible.",
          },
        ],
      },
    ],
  },
  {
    code: "AU", name: "Australia", region: "Oceania",
    summary: "World's largest coal exporter and a major LNG exporter. The Safeguard Mechanism (reformed 2023) is Australia's primary industrial emissions policy. Whistleblower protections strengthened in 2019 (Corporations Act Part 9.4AAA). Great Barrier Reef degradation is the visible face of Australian Private-Systemic Tension.",
    sectors: [
      {
        name: "Coal Export", beta: 6.1,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Declining Asian import demand + Safeguard Mechanism baseline decline rates are eliminating the profitable pathway. Australia's coal export revenue peaked in 2022. The overlapping interest is weakening naturally — policy can accelerate.",
        breakPaths: [
          "No new coal mine approvals + managed decline of existing mines. The Safeguard Mechanism requires covered facilities to reduce emissions 4.9% per year. Combined with declining Asian demand, the overlapping interest in new coal investment is disappearing.",
          "National Greenhouse and Energy Reporting (NGER) Act makes facility-level emissions computable. Australia has comprehensive emissions data — integrating it into export pricing would make W visible in trade.",
          "Not breakable — coal combustion releases CO₂ by conservation of mass. Australia's coal exports produce ~1.1 Gt CO₂ when burned — more than Australia's domestic emissions.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations via Corporations Act Part 9.4AAA whistleblower protections (2019)",
              "Document water contamination or habitat destruction for state EPA offices",
              "Report to Clean Energy Regulator for Safeguard Mechanism non-compliance",
              "Use Public Interest Disclosure Act 2013 for federal public servants",
            ],
            infra: "Corporations Act Part 9.4AAA (2019 amendments) — Australia's primary private-sector whistleblower protection, significantly strengthened in 2019. Covers disclosures about misconduct or improper state of affairs at corporations, including environmental violations. Protections include compensation for detriment, injunctions, and civil penalties against retaliators. Covers current and former employees, contractors, suppliers, and their relatives. Public Interest Disclosure Act 2013 (PID Act) — protects federal public servants who disclose wrongdoing in the Commonwealth public sector, including regulatory failures in mining oversight. State EPAs — each Australian state and territory has its own Environmental Protection Authority that handles complaints about mining pollution, water contamination, and habitat destruction.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Set mine closure timelines aligned with Safeguard Mechanism baselines",
              "Invest in mine site rehabilitation and renewable energy generation on former mining land",
              "Disclose Scope 3 export emissions — Australian accounting standards (AASB) now require climate-related financial disclosure",
            ],
            infra: "AASB Climate-Related Financial Disclosure Standards — the Australian Accounting Standards Board adopted ISSB-aligned climate disclosure standards effective from 2025, requiring large listed companies to disclose climate risks, transition plans, and emissions (including Scope 3). Safeguard Mechanism — reformed in 2023 to require Australia's 215 largest industrial emitters (including coal mines and LNG facilities) to reduce emissions by 4.9% per year against declining baselines. Facilities that exceed baselines must purchase Australian Carbon Credit Units (ACCUs).",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Clean Energy Regulator: Enforce Safeguard Mechanism baselines strictly",
              "ASIC: Investigate greenwashing by mining companies making net-zero claims",
              "State mining regulators: Deny new coal mine approvals where climate impacts are unacceptable",
            ],
            infra: "Clean Energy Regulator — administers the Safeguard Mechanism, the National Greenhouse and Energy Reporting scheme, and the Australian Carbon Credit Unit scheme. The CER is the primary federal enforcement body for industrial emissions policy. ASIC (Australian Securities and Investments Commission) — Australia's corporate and financial services regulator. ASIC has brought greenwashing enforcement actions against companies making misleading sustainability claims and has signaled that climate risk disclosure will be an enforcement priority.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Member of Parliament or Senator to support a coal export phase-out timeline",
              "Legislate a date to end new coal mine approvals — the Safeguard Mechanism reduces existing emissions but does not prevent new mines",
              "Strengthen NDC: Australia's 43% by 2030 target is not consistent with 1.5°C",
              "Support Pacific Islands Forum demands for fossil fuel phase-out — Australia's Pacific neighbours face existential climate risk",
            ],
            infra: "Parliament of Australia — bicameral legislature (House of Representatives and Senate). Citizens and residents can contact their MP or Senator through aph.gov.au. The Senate Environment and Communications Committee regularly holds inquiries accepting public submissions. Australia's NDC — commits to 43% emissions reduction below 2005 levels by 2030 and net zero by 2050. The Climate Change Act 2022 enshrined these targets in law. Pacific Islands Forum — Australia's Pacific Island neighbours (Tuvalu, Fiji, Vanuatu, Marshall Islands, etc.) are among the most climate-vulnerable nations on Earth. The Forum's Boe Declaration (2018) declared climate change the 'single greatest threat' to Pacific livelihoods. Australian coal exports directly undermine the survival of these nations.",
          },
        ],
      },
    ],
  },
  {
    code: "BR", name: "Brazil", region: "South America",
    summary: "Amazon deforestation is Brazil's defining Private-Systemic Tension challenge — the world's largest tropical forest is being converted to cattle and soy at rates that threaten global climate stability. Strong environmental legislation (Forest Code) with weak enforcement. Whistleblower protection is nascent (Lei Anticorrupção for corporate, Lei 13.608/2018 for general).",
    sectors: [
      {
        name: "Amazon Deforestation (Cattle & Soy)", beta: 9.5,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Brazil's Forest Code already requires 80% Legal Reserve in the Amazon biome — the law to break Axiom 1 exists. Enforcement is the gap. When enforcement is strong (2004–2012), deforestation drops 80%.",
        breakPaths: [
          "Enforce the Forest Code. The law requires 80% of each property in the Amazon to remain forested. If enforced, the overlapping interest in illegal deforestation disappears because the profitable pathway (clear, burn, graze/plant) becomes illegal with real consequences.",
          "Real-time deforestation monitoring via INPE's DETER satellite system makes W computable per property. Brazil has the world's best deforestation monitoring — integrating it into commodity supply chain certification makes W visible to buyers.",
          "Not breakable — forest removal inherently affects climate, water cycles, and biodiversity. The Amazon is a carbon sink (2.2 Gt CO₂/year absorption) and a continental water pump. Its degradation cannot be insulated from the global system.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report illegal deforestation to IBAMA (Instituto Brasileiro do Meio Ambiente) enforcement hotline",
              "Document illegal burning for INPE satellite verification — ground-truth data strengthens enforcement",
              "Report supply chain fraud (illegal timber/cattle in legal supply chains) to Ministério Público Federal",
              "Use Lei 13.608/2018 whistleblower protections for reporting corruption in environmental licensing",
            ],
            infra: "Lei 13.608/2018 — Brazil's general whistleblower protection law, covering disclosures about crimes, administrative offences, and threats to public interest. The law permits anonymous reporting and provides for proportional rewards from recovered assets. Protection against retaliation is provided but enforcement mechanisms are still developing. Lei Anticorrupção (Clean Company Act, Lei 12.846/2013) — Brazil's corporate anti-corruption law, which holds companies strictly liable for corrupt acts against the public administration, including bribing officials for environmental licenses or land titles. IBAMA (Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renováveis) — Brazil's federal environmental enforcement agency. IBAMA conducts field operations against illegal deforestation, levies fines, seizes equipment, and refers criminal cases to federal prosecutors. IBAMA's effectiveness varies dramatically with political administration — under Lula (2023–), enforcement has been restored after sharp cuts under Bolsonaro. Ministério Público Federal (Federal Prosecutor's Office) — Brazil's independent prosecution service, which has constitutional authority to bring environmental enforcement actions. The MPF has been particularly active in prosecuting environmental crimes in the Amazon.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Implement full traceability in cattle and soy supply chains — zero deforestation commitments with satellite verification",
              "Register all properties in the Rural Environmental Registry (CAR) with accurate boundaries",
              "Restore degraded land rather than clearing new forest — Brazil has 30 million hectares of degraded pasture suitable for intensification",
            ],
            infra: "CAR (Cadastro Ambiental Rural — Rural Environmental Registry) — a national registry requiring all rural properties to map and register their boundaries, Legal Reserve areas (80% in the Amazon), and permanent protection areas (riparian zones, steep slopes). CAR is the foundation for enforcement — once a property is registered, satellite monitoring can detect illegal clearing. As of 2024, over 7 million properties are registered. Amazon Soy Moratorium — a voluntary agreement (since 2006) by major soy traders not to purchase soy from recently deforested Amazon land. The moratorium has been effective for soy but no equivalent exists for cattle (which drives 80% of Amazon deforestation).",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "IBAMA: Maintain enforcement intensity — deforestation drops 80% when enforcement is funded and supported",
              "Central Bank of Brazil: Enforce Resolution 4.943 linking rural credit to Forest Code compliance",
              "CVM (Securities Commission): Mandate deforestation risk disclosure for listed agribusiness companies",
            ],
            infra: "Forest Code (Lei 12.651/2012) — Brazil's primary environmental legislation for rural properties. Requires 80% Legal Reserve in the Amazon, 35% in the Cerrado savanna, and 20% in other biomes. Also requires permanent protection of riparian zones and steep slopes. The law exists — enforcement is the variable. Central Bank Resolution 4.943 — links access to subsidized rural credit (the lifeblood of Brazilian agriculture) to compliance with the Forest Code and registration in the CAR. This is the most powerful economic lever for forest protection — it makes credit conditional on legality.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your deputado federal or senador to demand sustained IBAMA funding regardless of administration",
              "Implement the Amazon Fund at scale — Norway and Germany have contributed $3.4B, disbursement has been slow",
              "EU Deforestation Regulation (EUDR) compliance — make Brazilian exports deforestation-free as a market access requirement",
              "Strengthen NDC to include absolute deforestation halt by 2030",
            ],
            infra: "Brazil's National Congress — bicameral legislature (Câmara dos Deputados and Senado Federal). Citizens can contact representatives through camara.leg.br and senado.leg.br. The Environmental Commission (CMA) holds public hearings on Amazon policy. Amazon Fund (Fundo Amazônia) — created in 2008 to receive donations for deforestation prevention and sustainable development in the Amazon. Norway is the largest donor ($1.2B). The fund was frozen under Bolsonaro (2019–2022) and reactivated under Lula (2023). EU Deforestation Regulation (EUDR) — requires companies placing commodities (soy, cattle, palm oil, wood, coffee, cocoa, rubber) on the EU market to prove they are deforestation-free. This regulation creates external market pressure on Brazilian exporters to clean up supply chains.",
          },
        ],
      },
    ],
  },
  {
    code: "IN", name: "India", region: "South Asia",
    summary: "World's third-largest emitter with massive coal dependence (70% of electricity) alongside rapid renewable deployment. Whistleblower Protection Act 2014 covers public servants; private sector protection is limited to Companies Act 2013 vigil mechanism. India's Private-Systemic Tension is driven by the tension between development needs and environmental costs.",
    sectors: [
      {
        name: "Coal Power", beta: 6.1,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "India's Perform, Achieve, Trade (PAT) scheme and mandatory emissions monitoring at thermal plants make W increasingly computable. Solar is now cheaper than new coal in India — the economic Axiom 1 break is emerging naturally.",
        breakPaths: [
          "Solar is cheaper than new coal in India (₹2.5/kWh solar vs ₹4+/kWh new coal). The overlapping interest in new coal investment is disappearing on economics alone. Policy should accelerate by halting new coal plant approvals.",
          "Continuous Emission Monitoring Systems (CEMS) mandatory at all thermal plants since 2019 make W computable per facility. India's emission data infrastructure exists — publication and financial integration is the gap.",
          "Not breakable — coal combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report emissions violations via Continuous Emission Monitoring data to Central Pollution Control Board (CPCB)",
              "Use Companies Act 2013 vigil mechanism for listed power companies",
              "Report corruption in coal block allocation to CVC (Central Vigilance Commission)",
              "Document health impacts on local communities for National Green Tribunal petitions",
            ],
            infra: "Whistleblower Protection Act 2014 — covers public servants who report corruption, abuse of power, or criminal offences by government officials. Does NOT cover private sector employees — the gap is significant for India's large private and state-owned coal companies. Companies Act 2013, Section 177 — requires listed companies and certain private companies to establish a 'vigil mechanism' (internal whistleblower channel) allowing directors and employees to report concerns. Provides protection against victimization but enforcement is weak. CVC (Central Vigilance Commission) — India's apex anti-corruption body, handling complaints about corruption in central government organizations including Coal India Limited (the world's largest coal mining company, 80% government-owned). National Green Tribunal (NGT) — a specialized environmental court established in 2010 to handle environmental disputes. The NGT can order pollution abatement, award compensation, and enforce environmental laws. Any person can file a petition — it functions as both a court and a complaints mechanism.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Halt new coal plant construction — 27 GW under construction, most will become stranded assets",
              "Accelerate renewable energy investment — India targets 500 GW non-fossil capacity by 2030",
              "Implement Continuous Emission Monitoring compliance and public data disclosure",
              "Coal India: Diversify into renewables and critical minerals — the company controls vast land suitable for solar",
            ],
            infra: "SEBI (Securities and Exchange Board of India) BRSR — Business Responsibility and Sustainability Reporting, mandatory for India's top 1,000 listed companies from 2023. Requires disclosure of energy consumption, emissions, water use, and social impact metrics. India's 500 GW Target — India's commitment to deploy 500 GW of non-fossil electricity generation capacity by 2030, one of the world's most ambitious renewable energy targets. Solar costs in India are among the lowest globally.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "CPCB (Central Pollution Control Board): Enforce emissions standards at thermal plants — compliance is below 30%",
              "Ministry of Environment: Halt environmental clearances for new coal plants",
              "CEA (Central Electricity Authority): Mandate least-cost planning that includes externality costs",
            ],
            infra: "CPCB (Central Pollution Control Board) — India's national environmental regulatory body for water and air pollution. CPCB sets emission standards for thermal power plants (SO₂, NOx, PM, mercury) but compliance enforcement has been weak — as of 2024, fewer than 30% of coal plants meet the 2015 emission standards. Ministry of Environment, Forest and Climate Change (MoEFCC) — grants environmental clearances for industrial projects including power plants. The MoEFCC's clearance decisions determine whether new coal capacity can be built.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Member of Parliament (Lok Sabha or Rajya Sabha) to demand a moratorium on new coal plant approvals",
              "Legislate a coal phase-down timeline — India's NDC mentions 'phase-down' but sets no date",
              "Accelerate International Solar Alliance objectives — India co-founded the ISA",
              "Implement carbon pricing — India's carbon credit trading scheme (launched 2023) needs strengthened ambition",
            ],
            infra: "Parliament of India — bicameral legislature (Lok Sabha and Rajya Sabha). Citizens can contact their MPs through sansad.in. The Standing Committee on Energy holds hearings on energy policy. India's NDC — commits to reducing GDP emissions intensity by 45% by 2030 (from 2005 levels), achieving 50% cumulative electric power from non-fossil sources by 2030, and reaching net zero by 2070. International Solar Alliance (ISA) — co-founded by India and France in 2015, the ISA promotes solar energy deployment in 120+ member countries. India's leadership of the ISA gives it international credibility on renewable energy transition.",
          },
        ],
      },
    ],
  },
  // --- Italy ---
  {
    code: "IT", name: "Italy", region: "Europe",
    summary: "G7 economy with strong manufacturing (14.8% of GDP) and significant ultra-processed food industry. EU regulatory framework provides robust institutional channels. Weak whistleblower protections historically, but 2023 EU Directive transposition improved coverage.",
    sectors: [
      {
        name: "Ultra-Processed Food", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Mandatory nutritional labelling and health-impact disclosure make system welfare computable from product-level data. Italy's resistance to Nutri-Score shows industry lobbying power, but once health costs per product category are disclosed, W becomes a function of sales volume.",
        breakPaths: [
          "Adopt front-of-pack health-impact labelling (Nutri-Score or equivalent). When consumers can see the welfare cost at point of sale, the overlapping interest between manufacturer and retailer in high-margin Ultra-Processed Food weakens — healthier alternatives become competitively viable.",
          "Mandate disclosure of diet-attributable healthcare costs per product category. Italy's SSN (Servizio Sanitario Nazionale) spends an estimated 8-11% of health expenditure on diet-related disease. Making this cost visible per product makes W computable from bilateral transactions.",
          "Not fully breakable by policy alone. Ultra-processing by definition alters food matrix in ways that affect satiety signalling and metabolic response. However, reformulation mandates (sodium, sugar caps) can reduce the magnitude of system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report misleading health claims on food products to AGCM (Autorità Garante della Concorrenza e del Mercato)",
              "Document undisclosed additives or processing methods — report to NAS (Nucleo Antisofisticazioni e Sanità dei Carabinieri)",
              "Use EU Whistleblower Directive protections (transposed into Italian law via D.Lgs. 24/2023)",
            ],
            infra: "AGCM (Autorità Garante della Concorrenza e del Mercato) — Italy's competition and consumer protection authority. AGCM can fine companies for misleading advertising and unfair commercial practices, including deceptive health claims on food packaging. Fines can reach €10 million or 2% of annual revenue. NAS (Nucleo Antisofisticazioni e Sanità dei Carabinieri) — a specialized unit of the Italian military police (Carabinieri) that investigates food fraud, adulteration, and safety violations. NAS conducts inspections of food production facilities and can refer cases for criminal prosecution. D.Lgs. 24/2023 — Italy's transposition of EU Directive 2019/1937 on whistleblower protection. Provides protection against retaliation for employees who report violations of EU or national law, including food safety regulations. Reports can be made through internal channels or to ANAC (Autorità Nazionale Anticorruzione).",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Reformulate product lines to reduce ultra-processing — invest in minimally processed alternatives",
              "Voluntarily adopt front-of-pack nutritional labelling ahead of EU mandate",
              "Commission independent health-impact assessment of product portfolio using System Asset Pricing Model beta methodology",
            ],
            infra: "EU Farm to Fork Strategy — the European Commission's plan to make EU food systems fair, healthy, and environmentally sustainable by 2030. Includes proposals for mandatory front-of-pack nutrition labelling, restrictions on marketing of unhealthy foods, and nutrient profiles for health claims. Companies that move early gain competitive advantage. EFSA (European Food Safety Authority) — headquartered in Parma, Italy, EFSA provides independent scientific advice on food safety risks. EFSA's opinions shape EU food regulation and can trigger product reformulation requirements. Italian companies have direct access to EFSA's scientific processes.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Ministry of Health: Implement mandatory front-of-pack health labelling (Italy has blocked Nutri-Score — develop an Italian alternative that still makes W visible)",
              "AGCM: Enforce stricter standards on 'natural' and 'traditional' marketing claims for industrially processed products",
              "ISS (Istituto Superiore di Sanità): Publish annual diet-attributable disease burden data linked to specific product categories",
            ],
            infra: "Ministero della Salute (Ministry of Health) — oversees food safety policy, nutrition guidelines, and public health campaigns. The Ministry coordinates with regional health authorities (ASL) on food safety inspections. ISS (Istituto Superiore di Sanità) — Italy's national public health institute, providing scientific and technical support to the Ministry of Health. ISS conducts epidemiological research on diet-related disease and publishes nutrition surveillance data. EFSA — while an EU body, EFSA is physically located in Parma and Italian regulators have direct institutional relationships. EFSA's risk assessments on food additives, contaminants, and novel foods directly inform Italian and EU regulation.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your member of the Camera dei Deputati or Senato della Repubblica to demand mandatory health-impact labelling on ultra-processed foods",
              "Support EU-wide adoption of front-of-pack nutritional labelling through the Farm to Fork Strategy",
              "Advocate for WHO FCTC-style international framework on Ultra-Processed Food marketing restrictions",
              "Push for inclusion of diet-attributable health costs in national accounting (c-adjusted GDP methodology)",
            ],
            infra: "Parlamento italiano — bicameral legislature consisting of the Camera dei Deputati (630 members) and the Senato della Repubblica (200 members). Citizens can contact their representatives through the official parliamentary websites (camera.it and senato.it). The Commissione Affari Sociali handles health and food policy legislation. EU Council and European Parliament — Italy's 76 MEPs participate in EU food safety legislation. The Farm to Fork Strategy and proposed food labelling regulation are decided at EU level through co-decision procedure. WHO (World Health Organization) — provides global guidance on diet and nutrition policy. WHO's 2023 guidelines on non-sugar sweeteners and 2024 guidance on Ultra-Processed Food demonstrate growing international consensus on Ultra-Processed Food health impacts.",
          },
        ],
      },
    ],
  },
  // --- Mexico ---
  {
    code: "MX", name: "Mexico", region: "Latin America",
    summary: "Major oil producer (Pemex) with 2.16% combined oil and gas rents. Strong manufacturing base (19.8% of GDP) driven by USMCA trade integration. Pioneering Ultra-Processed Food regulation — Mexico's front-of-pack warning labels and junk food advertising bans are global models.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Mexico's 2013 energy reform opened the sector to private investment, but Pemex remains the dominant player with massive government subsidies ($14B+ annually). Eliminating the subsidy removes the overlapping interest — without state support, many Pemex operations are unprofitable.",
        breakPaths: [
          "Phase out Pemex subsidies and redirect investment to renewable energy. Mexico receives more solar radiation than almost any country on Earth. The overlapping interest between Pemex and government in continued extraction disappears when renewable alternatives are more profitable without subsidy.",
          "Implement mandatory emissions disclosure for all oil and gas operations — Pemex's actual emissions footprint is poorly measured. Satellite methane monitoring and Task Force on Climate-Related Financial Disclosures-aligned reporting would make W computable from production data.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass. Agent activity inherently affects atmospheric composition.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at Pemex facilities to PROFEPA (Procuraduría Federal de Protección al Ambiente)",
              "Document safety failures — Pemex has one of the worst industrial accident records among major oil companies",
              "Report financial irregularities to SFP (Secretaría de la Función Pública) or through Pemex's internal ethics line",
            ],
            infra: "PROFEPA (Procuraduría Federal de Protección al Ambiente) — Mexico's federal environmental enforcement agency, responsible for investigating environmental violations, conducting inspections, and imposing sanctions. PROFEPA can order facility closures and refer cases for criminal prosecution under the Ley General del Equilibrio Ecológico (LGEEPA). SFP (Secretaría de la Función Pública) — the federal ministry responsible for government accountability, including oversight of state-owned enterprises like Pemex. SFP investigates corruption, conflicts of interest, and misuse of public resources. ASEA (Agencia de Seguridad, Energía y Ambiente) — created by the 2013 energy reform to regulate industrial safety and environmental protection in the hydrocarbons sector. ASEA sets safety standards and can sanction operators for non-compliance.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Diversify Pemex investment portfolio toward renewable energy — Mexico's solar potential is enormous",
              "Implement Task Force on Climate-Related Financial Disclosures-aligned climate disclosure for all operations",
              "Address Pemex's $100B+ debt burden through strategic asset restructuring rather than continued government bailouts",
            ],
            infra: "Pemex (Petróleos Mexicanos) — Mexico's state-owned petroleum company and one of the most indebted oil companies in the world (over $100B in financial obligations). Pemex's board is appointed by the president and includes government officials, making it highly politicized. The 2013 energy reform was intended to attract private investment and improve efficiency, but the current administration has reversed many reforms. CNH (Comisión Nacional de Hidrocarburos) — the independent regulator created by the 2013 reform to oversee exploration and production contracts, approve development plans, and ensure efficient resource extraction.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "SEMARNAT: Strengthen environmental impact assessment requirements for new hydrocarbon projects",
              "Commercial Real Estate: Accelerate renewable energy permitting and grid access for solar and wind projects",
              "CNH: Enforce production efficiency standards and flaring reduction targets",
            ],
            infra: "SEMARNAT (Secretaría de Medio Ambiente y Recursos Naturales) — Mexico's federal environment ministry, responsible for environmental policy, climate change strategy, and natural resource management. SEMARNAT issues environmental impact authorizations (MIA) required for energy projects. Commercial Real Estate (Comisión Reguladora de Energía) — the independent energy regulator that oversees electricity and natural gas markets, sets tariffs, and issues permits for power generation. Commercial Real Estate's role in renewable energy permitting is critical for energy transition. CENACE (Centro Nacional de Control de Energía) — the independent system operator for Mexico's electricity grid, responsible for dispatch and grid access. CENACE's operational decisions affect the competitiveness of renewable vs. fossil generation.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Diputado Federal or Senador to demand a timeline for Pemex subsidy phase-out and renewable energy investment targets",
              "Strengthen Mexico's NDC — current targets are widely considered insufficient",
              "Leverage USMCA environmental provisions to align energy transition with North American trade commitments",
              "Support International Energy Agency membership — Mexico is an IEA association country but not a full member",
            ],
            infra: "Congreso de la Unión — Mexico's bicameral legislature, consisting of the Cámara de Diputados (500 members) and the Senado de la República (128 members). Citizens can contact representatives through the official portals (diputados.gob.mx and senado.gob.mx). The Comisión de Energía in both chambers oversees energy legislation. Mexico's NDC (Nationally Determined Contribution) — Mexico was one of the first countries to submit an NDC under the Paris Agreement, but its targets have been criticized as insufficiently ambitious. The current target aims to reduce greenhouse gas emissions 22% below BAU by 2030. USMCA (United States-Mexico-Canada Agreement) — the trilateral trade agreement that replaced NAFTA. Chapter 32.10 includes environmental provisions that can be used to challenge energy policies that create unfair competitive advantages through environmental degradation.",
          },
        ],
      },
    ],
  },
  // --- Spain ---
  {
    code: "ES", name: "Spain", region: "Europe",
    summary: "Services-dominated economy (68.9% of GDP) with growing renewable energy sector. Spain is a European leader in solar and wind deployment but faces Private-Systemic Tension exposure through intensive agriculture, tourism-driven real estate, and legacy coal regions.",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Spain's intensive agriculture (olive monoculture, greenhouse horticulture in Almería, irrigated cereals) depletes aquifers and degrades topsoil. EU CAP reform and water-use disclosure can make system welfare visible in agricultural commodity pricing.",
        breakPaths: [
          "Reform CAP subsidies to reward soil health and biodiversity rather than production volume. Without per-hectare payments that incentivize monoculture, the overlapping interest between large landholders and commodity buyers shifts toward diversified production.",
          "Mandatory water-use and soil-carbon disclosure per farm. Spain's water crisis (depleted aquifers in Murcia, Almería, La Mancha) becomes a computable welfare cost when water extraction volumes are disclosed alongside crop revenues.",
          "Partially breakable. Monoculture inherently reduces biodiversity and soil microbial diversity. However, agroecological transition can reduce the magnitude — Spain's organic farming sector is the largest in the EU by area.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report illegal water extraction (pozos ilegales) to Confederaciones Hidrográficas",
              "Document labor exploitation in agricultural operations — report to Inspección de Trabajo",
              "Report CAP subsidy fraud to OLAF (EU Anti-Fraud Office) or national authorities",
            ],
            infra: "Confederaciones Hidrográficas — Spain's river basin authorities, responsible for managing water resources, granting extraction permits, and enforcing water law. Spain has an estimated 500,000+ illegal wells (pozos ilegales) that deplete aquifers, particularly in southern Spain. The Confederación Hidrográfica del Guadalquivir, del Segura, and del Guadiana manage the most water-stressed basins. Inspección de Trabajo y Seguridad Social — Spain's labor inspectorate, which investigates labor law violations including in the agricultural sector where migrant worker exploitation is documented. OLAF (Office Européen de Lutte Antifraude) — the EU's anti-fraud office that investigates fraud against the EU budget, including misuse of CAP agricultural subsidies.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Transition production toward organic and regenerative agriculture — Spain already has 2.6M hectares of organic farmland",
              "Invest in precision irrigation to reduce water consumption per unit of output",
              "Adopt soil carbon measurement and reporting to demonstrate environmental performance to EU buyers",
            ],
            infra: "EU Common Agricultural Policy (CAP) 2023-2027 — the reformed CAP introduces eco-schemes that reward farmers for environmental practices beyond baseline requirements. Spanish farms can access additional payments for organic conversion, cover cropping, and integrated pest management. MAPA (Ministerio de Agricultura, Pesca y Alimentación) — Spain's agriculture ministry, which administers CAP payments and sets national agricultural policy. MAPA's Strategic Plan for the CAP determines how EU funds are allocated among Spanish farmers.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "MITECO: Enforce water extraction limits and close illegal wells — the Doñana aquifer crisis is a test case",
              "MAPA: Accelerate organic transition support through CAP eco-scheme payments",
              "AEMET/CEDEX: Publish water-stress projections that link agricultural water use to climate adaptation costs",
            ],
            infra: "MITECO (Ministerio para la Transición Ecológica y el Reto Demográfico) — Spain's environment and climate ministry, responsible for water policy, climate change mitigation, and ecological transition. MITECO oversees the Confederaciones Hidrográficas and sets national water planning policy. AEMET (Agencia Estatal de Meteorología) — Spain's national meteorological agency, which provides climate data and projections critical for agricultural water planning. CEDEX (Centro de Estudios y Experimentación de Obras Públicas) — a public research center that studies water resources, infrastructure, and environmental engineering.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Diputado in the Congreso de los Diputados or Senador in the Senado to demand enforcement of water extraction limits and closure of illegal wells",
              "Support stronger CAP conditionality linking subsidies to environmental outcomes",
              "Advocate for EU Water Framework Directive enforcement — Spain has been sanctioned by the ECJ for non-compliance",
              "Push for inclusion of water depletion costs in national GDP accounting",
            ],
            infra: "Cortes Generales — Spain's bicameral parliament, consisting of the Congreso de los Diputados (350 members) and the Senado (265 members). Citizens can contact representatives through congreso.es and senado.es. The Comisión de Agricultura, Pesca y Alimentación and the Comisión de Transición Ecológica handle relevant legislation. EU Water Framework Directive (2000/60/EC) — requires EU member states to achieve 'good status' for all water bodies. Spain has been repeatedly cited by the European Commission and sanctioned by the European Court of Justice for failing to protect water resources, particularly groundwater in the Doñana and Segura basins.",
          },
        ],
      },
    ],
  },
  // --- Netherlands ---
  {
    code: "NL", name: "Netherlands", region: "Europe",
    summary: "Major financial and trade hub with Shell headquarters. Groningen gas field closure (2024) marks a historic transition, but the Netherlands remains exposed through commodity trading, intensive livestock farming, and financial sector fossil fuel financing.",
    sectors: [
      {
        name: "Oil & Gas / Commodity Trading", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "The Netherlands is a global hub for fossil fuel commodity trading (Rotterdam is Europe's largest port) and hosts Shell's global HQ. The Milieudefensie v. Shell ruling (2021) established that corporate emissions reduction obligations are legally enforceable — making W directly computable from corporate activity.",
        breakPaths: [
          "Extend Milieudefensie v. Shell precedent to other major commodity traders (Vitol, Trafigura, Gunvor — all Rotterdam-based). If commodity traders face Scope 3 liability, the overlapping interest in fossil fuel throughput weakens.",
          "Mandatory Scope 3 disclosure for financial institutions (ING, ABN AMRO, Rabobank) and commodity traders. The Dutch Central Bank (DNB) already requires climate stress testing — extending to full emissions disclosure makes W visible.",
          "Not breakable by policy alone. Fossil fuel combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report greenwashing or emissions misreporting to AFM (Autoriteit Financiële Markten)",
              "Use the Huis voor Klokkenluiders (House for Whistleblowers) for protected reporting of environmental or financial misconduct",
              "Document commodity trading practices that circumvent sanctions or environmental regulations",
            ],
            infra: "AFM (Autoriteit Financiële Markten) — the Dutch financial markets authority, responsible for supervising financial markets, including enforcement of disclosure requirements and prevention of market abuse. AFM oversees environmental, social, and governance disclosure by listed companies and financial products. Huis voor Klokkenluiders — the Dutch House for Whistleblowers, an independent government body that provides advice and support to whistleblowers and can investigate reports of wrongdoing in the public and private sectors. Established by the Wet Huis voor Klokkenluiders (2016), strengthened by EU Whistleblower Directive transposition. FIOD (Fiscale Inlichtingen- en Opsporingsdienst) — the Dutch fiscal intelligence and investigation service, which investigates financial and economic crimes including fraud, money laundering, and sanctions violations in the commodity trading sector.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Implement Paris-aligned transition plans with binding interim targets — Shell's plan was found inadequate by the Hague District Court",
              "Disclose full Scope 1-3 emissions including traded commodity volumes",
              "Restructure executive compensation to include climate performance metrics",
            ],
            infra: "Milieudefensie v. Shell (Hague District Court, 2021) — landmark ruling ordering Shell to reduce its global CO₂ emissions by 45% by 2030 (from 2019 levels), including Scope 3 emissions from the use of products sold. This established that corporations have a duty of care under Dutch civil law (Article 6:162 BW) to reduce emissions in line with Paris Agreement targets. The ruling is on appeal but has set a global precedent. Dutch Corporate Governance Code — the Monitoring Commissie Corporate Governance oversees compliance with the code, which increasingly incorporates environmental, social, and governance expectations for listed companies.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "DNB: Expand climate stress testing to include Scope 3 financed emissions",
              "AFM: Enforce green taxonomy compliance for financial products marketed as sustainable",
              "ILT: Strengthen environmental enforcement at Rotterdam port for fossil fuel handling and shipping emissions",
            ],
            infra: "DNB (De Nederlandsche Bank) — the Dutch central bank and prudential supervisor of financial institutions. DNB has been a global leader in climate-related financial risk assessment, publishing pioneering research on stranded assets and climate stress testing. DNB supervises banks (ING, ABN AMRO, Rabobank), insurers, and pension funds. ILT (Inspectie Leefomgeving en Transport) — the Dutch Human Environment and Transport Inspectorate, responsible for environmental enforcement including emissions from shipping, industrial facilities, and waste management at major ports.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your member of the Tweede Kamer (House of Representatives) to demand mandatory Scope 3 disclosure for commodity trading firms headquartered in the Netherlands",
              "Support EU CSRD implementation — the Netherlands should lead on corporate sustainability reporting",
              "Advocate for Rotterdam port authority to implement carbon pricing for fossil fuel throughput",
              "Push for OECD Guidelines enforcement for Dutch-headquartered multinationals",
            ],
            infra: "Staten-Generaal — the Dutch parliament, consisting of the Tweede Kamer (150 members, directly elected) and the Eerste Kamer (75 members, indirectly elected). Citizens can contact their representatives through tweedekamer.nl. The Vaste Commissie voor Economische Zaken en Klimaat handles energy and climate legislation. EU CSRD (Corporate Sustainability Reporting Directive) — requires large companies to report on sustainability using European Sustainability Reporting Standards (ESRS). The Netherlands is a key voice in EU sustainability regulation and its implementation approach influences other member states. OECD National Contact Point (NCP) — the Netherlands' NCP handles complaints about Dutch multinationals' compliance with OECD Guidelines for Multinational Enterprises, including environmental standards.",
          },
        ],
      },
    ],
  },
  // --- Norway ---
  {
    code: "NO", name: "Norway", region: "Europe",
    summary: "Major oil and gas producer (10% combined rents) that paradoxically leads in electric vehicle adoption and renewable energy. The Government Pension Fund Global ($1.7T) is the world's largest sovereign wealth fund, giving Norway extraordinary leverage over global corporate behavior.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Norway's petroleum tax regime captures 78% of oil profits for the state. The Government Pension Fund Global (Government Pension Fund Global) has already divested from coal. Extending divestment to oil and gas eliminates the overlapping interest — if the wealth fund won't invest in fossil fuels, the signal cascades through global capital markets.",
        breakPaths: [
          "Government Pension Fund Global full fossil fuel divestment. The world's largest sovereign wealth fund divesting from oil and gas would remove approximately $40B from fossil fuel equity markets and trigger cascading divestment by funds that benchmark against it. The overlapping interest between capital allocators and fossil producers breaks when the benchmark excludes them.",
          "Expand Norway's carbon tax ($90/ton, among the world's highest) to cover all offshore emissions including methane. Norway already has sophisticated emissions monitoring — mandatory per-field disclosure makes W directly computable.",
          "Not breakable. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental or safety violations at offshore installations to Petroleumstilsynet (Petroleum Safety Authority)",
              "Document emissions underreporting — use Arbeidstilsynet whistleblower protections under arbeidsmiljøloven §2A",
              "Report concerns about Government Pension Fund Global investment decisions to Norges Bank Investment Management ethics council",
            ],
            infra: "Petroleumstilsynet (PSA / Petroleum Safety Authority Norway) — the independent government agency responsible for safety, emergency preparedness, and working environment in the petroleum sector. PSA conducts inspections of offshore installations and can order production shutdowns for safety or environmental violations. Arbeidsmiljøloven (Working Environment Act) §2A — Norway's whistleblower protection law, providing strong legal protections for employees who report misconduct. Norwegian whistleblower protections are among the strongest in Europe, including protection against retaliation and right to anonymous reporting.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Accelerate Equinor's renewable energy transition — current targets allocate only 50% of capex to renewables by 2030",
              "Adopt science-based emissions targets aligned with 1.5°C pathway for all Norwegian continental shelf operations",
              "Implement internal carbon pricing at social cost of carbon for all capital allocation decisions",
            ],
            infra: "Equinor — Norway's largest company (67% state-owned), formerly Statoil. Equinor is the dominant operator on the Norwegian continental shelf and has significant international operations. The company has committed to becoming a 'broad energy company' but continues to invest heavily in oil and gas exploration. Aker BP, Vår Energi — other major operators on the Norwegian continental shelf. Both are publicly listed and subject to Oslo Børs disclosure requirements and EU taxonomy reporting.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Miljødirektoratet: Tighten emissions permits for new field developments on the Norwegian continental shelf",
              "Finanstilsynet: Require climate scenario analysis in financial reporting for petroleum companies",
              "NBIM: Expand responsible investment exclusion criteria to include companies with no credible transition plans",
            ],
            infra: "Miljødirektoratet (Norwegian Environment Agency) — the executive agency under the Ministry of Climate and Environment, responsible for environmental monitoring, regulation, and enforcement. Issues emissions permits for industrial activities including offshore petroleum. Finanstilsynet (Financial Supervisory Authority of Norway) — supervises banks, insurance companies, and securities markets. Oversees climate-related financial disclosure requirements. NBIM (Norges Bank Investment Management) — manages the Government Pension Fund Global, the world's largest sovereign wealth fund ($1.7T+). NBIM's investment decisions, ethical exclusions, and voting guidelines influence corporate governance globally. The fund owns approximately 1.5% of all listed equities worldwide.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your representative in the Storting to demand a timeline for ending new oil and gas exploration licenses",
              "Expand Government Pension Fund Global fossil fuel exclusion criteria from coal-only to include oil and gas companies without Paris-aligned transition plans",
              "Leverage Norway's role as a major Paris Agreement funder to link climate finance to fossil fuel phase-down commitments",
              "Strengthen Norway's carbon tax and extend it to exported hydrocarbons' lifecycle emissions",
            ],
            infra: "Stortinget — Norway's unicameral parliament (169 members). Citizens can contact their representatives through stortinget.no. The Energi- og miljøkomiteen (Energy and Environment Committee) handles climate and petroleum legislation. Norway's carbon tax — at approximately $90/ton, Norway has one of the world's highest carbon prices. However, significant exemptions remain for offshore petroleum and certain industrial processes. Norway's International Climate and Forest Initiative (NICFI) — Norway has committed over $5B to reducing deforestation in tropical countries, giving it significant international credibility on climate issues and leverage in multilateral negotiations.",
          },
        ],
      },
    ],
  },
  // --- Switzerland ---
  {
    code: "CH", name: "Switzerland", region: "Europe",
    summary: "Global commodity trading hub — over 50% of world oil and 35% of metals are traded through Swiss firms (Glencore, Vitol, Trafigura, Gunvor). Financial center with $7.6T in managed assets. Low domestic resource extraction but enormous intermediation-based Private-Systemic Tension exposure.",
    sectors: [
      {
        name: "Commodity Trading / Financial Services", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Swiss commodity traders intermediate over half of global oil trade but face minimal disclosure requirements. Swiss Responsible Business Initiative failed in 2020 but the indirect counterproposal (due diligence obligations) is now law. Making Scope 3 emissions of traded commodities visible breaks system independence.",
        breakPaths: [
          "Mandatory Scope 3 disclosure for commodity trading firms. If Glencore, Vitol, Trafigura must disclose the lifecycle emissions of commodities they trade, the overlapping interest in fossil fuel throughput weakens — buyers and financiers can see the welfare cost.",
          "Extend FINMA climate disclosure requirements to cover commodity trading firms (currently excluded from financial regulation). Making traded commodity emissions visible in financial statements breaks system independence.",
          "Partially breakable. Switzerland's intermediation role means it can be bypassed — commodity traders could relocate. However, Switzerland's banking secrecy and infrastructure create switching costs that give regulation leverage.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental or human rights violations in supply chains to the Swiss National Contact Point for OECD Guidelines",
              "Document commodity trading practices that circumvent sanctions — report to SECO (State Secretariat for Economic Affairs)",
              "Use Swiss whistleblower protections under the revised Code of Obligations (Art. 321a CO) for internal reporting",
            ],
            infra: "Swiss NCP (National Contact Point for the OECD Guidelines) — handles complaints about Swiss companies' compliance with OECD Guidelines for Multinational Enterprises. The Swiss NCP has handled high-profile cases involving Glencore and other commodity traders. SECO (Staatssekretariat für Wirtschaft / State Secretariat for Economic Affairs) — responsible for sanctions implementation and enforcement. SECO monitors compliance with UN and Swiss sanctions regimes relevant to commodity trading. Swiss Code of Obligations Art. 321a — provides limited whistleblower protection for employees who report to their employer. Swiss whistleblower protections are weaker than EU standards and have been criticized by transparency organizations.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Publish full Scope 3 emissions data for all traded commodities — Glencore has led among peers but coverage is incomplete",
              "Implement human rights due diligence per the new Swiss Due Diligence Act",
              "Adopt Task Force on Climate-Related Financial Disclosures reporting voluntarily — Swiss mandatory climate reporting is coming",
            ],
            infra: "Swiss Due Diligence Act (effective January 2023) — requires large Swiss companies to conduct due diligence on child labor and conflict minerals in their supply chains and report publicly. This is the indirect counterproposal to the Responsible Business Initiative that narrowly failed in November 2020. Task Force on Climate-Related Financial Disclosures and ISSB Standards — Switzerland has signaled intent to adopt ISSB sustainability reporting standards. FINMA has issued climate disclosure guidance for banks and insurers, but commodity trading firms are not yet covered.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "FINMA: Extend financial regulation to cover systemically important commodity trading firms",
              "FOEN: Publish annual report on lifecycle emissions of commodities traded through Switzerland",
              "Federal Council: Implement the recommendations of the interdepartmental platform on commodities",
            ],
            infra: "FINMA (Eidgenössische Finanzmarktaufsicht / Swiss Financial Market Supervisory Authority) — regulates banks, securities dealers, insurance companies, and collective investment schemes. FINMA has issued climate disclosure expectations but does not regulate commodity trading firms directly. FOEN (Bundesamt für Umwelt / Federal Office for the Environment) — Switzerland's environmental authority, responsible for climate policy and environmental regulation. The Federal Council's interdepartmental platform on commodities, established in 2013, has issued recommendations on transparency, corporate governance, and human rights due diligence for the commodity sector.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your member of the Nationalrat or Ständerat to demand mandatory emissions disclosure for commodity trading firms headquartered in Switzerland",
              "Support parliamentary initiatives for a comprehensive commodity trading supervision law",
              "Advocate for Switzerland to align its climate policies with EU Carbon Border Adjustment Mechanism and CSRD standards",
              "Push for stronger Swiss National Contact Point enforcement powers for OECD Guidelines complaints",
            ],
            infra: "Federal Assembly (Bundesversammlung) — Switzerland's bicameral parliament, consisting of the Nationalrat (200 members) and the Ständerat (46 members). Switzerland's direct democracy system also allows citizens to launch popular initiatives and referenda. The 2020 Responsible Business Initiative received a popular majority (50.7%) but failed to achieve a cantonal majority. Swiss direct democracy — citizens can collect 100,000 signatures to force a popular vote on any constitutional amendment. This mechanism has been used for environmental and corporate accountability initiatives and remains a powerful tool for policy change.",
          },
        ],
      },
    ],
  },
  // --- United Arab Emirates ---
  {
    code: "AE", name: "United Arab Emirates", region: "Middle East",
    summary: "Petrostate with 17.63% combined oil and gas rents ($97.4B). Aggressively diversifying through real estate, tourism, and financial services (Dubai). ADNOC is state-owned; sovereign wealth funds (ADIA, Mubadala) manage $1.3T+ in assets.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "UAE's mandatory environmental, social, and governance disclosure framework (Abu Dhabi Securities Exchange, 2023) and hosting of COP28 signal willingness to make emissions data visible. Once per-field emissions are disclosed alongside revenue, W becomes computable from production data.",
        breakPaths: [
          "Redirect sovereign wealth fund investment from hydrocarbon expansion to renewable energy. ADNOC plans to spend $150B on oil capacity expansion by 2027 — redirecting this capital removes the overlapping interest between state revenue and continued extraction.",
          "Implement mandatory per-field emissions disclosure for all ADNOC operations. UAE's COP28 presidency commitment to the Global Methane Pledge creates institutional pressure for transparency. When lifecycle emissions are disclosed per barrel, W is computable.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at ADNOC facilities to the Ministry of Climate Change and Environment",
              "Document emissions underreporting — use internal ADNOC compliance channels",
              "Report financial irregularities in sovereign wealth fund energy investments to the Abu Dhabi Accountability Authority",
            ],
            infra: "Ministry of Climate Change and Environment (MoCCAE) — the UAE federal ministry responsible for environmental protection, climate change policy, and biodiversity conservation. MoCCAE sets environmental standards for industrial operations including oil and gas. Abu Dhabi Accountability Authority (ADAA) — the independent oversight body for Abu Dhabi government entities, including ADNOC. ADAA conducts performance audits and financial reviews. Note: UAE lacks comprehensive whistleblower protection legislation; reporting channels are primarily internal.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Accelerate ADNOC's renewable energy diversification beyond the Masdar initiative",
              "Implement Task Force on Climate-Related Financial Disclosures-aligned climate disclosure for all operations and subsidiaries",
              "Adopt internal carbon pricing at social cost of carbon for capital allocation decisions",
            ],
            infra: "ADNOC (Abu Dhabi National Oil Company) — one of the world's largest oil companies, producing approximately 4 million barrels per day. ADNOC is wholly owned by the Abu Dhabi government and its CEO also serves as UAE's Special Envoy for Climate Change. Masdar — Abu Dhabi's clean energy company, a subsidiary of Mubadala Investment Company, focused on renewable energy projects globally. ADIA (Abu Dhabi Investment Authority) — one of the world's largest sovereign wealth funds, managing an estimated $900B+ in assets.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "SCA: Mandate climate risk disclosure for all listed companies on ADX and DFM",
              "MoCCAE: Strengthen environmental impact assessment requirements for new hydrocarbon projects",
              "Central Bank of UAE: Integrate climate stress testing into banking supervision",
            ],
            infra: "SCA (Securities and Commodities Authority) — the UAE's federal securities regulator, overseeing the Abu Dhabi Securities Exchange (ADX) and Dubai Financial Market (DFM). SCA has introduced environmental, social, and governance disclosure requirements for listed companies. EAD (Environment Agency Abu Dhabi) — the environmental regulator for Abu Dhabi emirate, responsible for environmental permitting and monitoring of industrial facilities including ADNOC operations.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Leverage UAE's COP28 presidency legacy to strengthen the Global Stocktake commitments on fossil fuel phase-down",
              "Advocate for IRENA (headquartered in Abu Dhabi) to publish annual assessments of UAE energy transition progress",
              "Push for GCC-wide carbon pricing mechanism through the GCC Secretariat",
              "Support IPCC recommendations on fossil fuel phase-out timelines in multilateral climate negotiations",
            ],
            infra: "Federal National Council (FNC / al-Majlis al-Waṭanī al-Ittiḥādī) — the UAE's consultative parliamentary body (40 members, half elected, half appointed). The FNC has advisory but not legislative power; real authority rests with the Federal Supreme Council of Rulers. IRENA (International Renewable Energy Agency) — headquartered in Abu Dhabi, IRENA promotes renewable energy adoption globally. UAE's hosting of IRENA gives it institutional credibility on energy transition. Note: UAE is not a representative democracy; civic engagement channels are limited to consultation and petition processes through the FNC.",
          },
        ],
      },
    ],
  },
  // --- Afghanistan ---
  {
    code: "AF", name: "Afghanistan", region: "Central Asia",
    summary: "Fragile state under Taliban rule since 2021. Agriculture dominates (34.7% of GDP). Significant untapped mineral resources (lithium, copper, rare earths) estimated at $1-3T. International sanctions and aid suspension have collapsed formal economy.",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Afghanistan's agricultural sector is dominated by opium poppy cultivation and rain-fed cereal monoculture. When crop-level environmental data (water depletion, soil degradation) is made visible through satellite monitoring, W becomes computable from agricultural output data.",
        breakPaths: [
          "International alternative livelihood programs that provide higher returns than poppy cultivation. When legal crop income exceeds opium income (currently ~$1,400/ha for poppy vs $300-500/ha for wheat), the overlapping interest in illicit monoculture breaks.",
          "Satellite-based monitoring of crop patterns, water extraction, and soil degradation published openly. Programs like NASA FEWS NET already provide food security data — extending to environmental cost accounting makes W visible.",
          "Partially breakable. Rain-fed agriculture in arid conditions inherently degrades topsoil without irrigation infrastructure. However, traditional qanat irrigation and dryland farming techniques can reduce system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Document environmental degradation from agricultural practices through local NGOs and community organizations",
              "Report illegal water extraction or land seizures to international monitoring organizations",
              "Provide data to international research institutions studying Afghan agricultural sustainability",
            ],
            infra: "Note: Under Taliban governance (since August 2021), formal institutional channels are severely constrained. International NGOs operating in Afghanistan include WFP (World Food Programme), FAO (Food and Agriculture Organization), and ICRC (International Committee of the Red Cross). Local organizations like the Afghanistan Research and Evaluation Unit (AREU) continue limited research operations. UNAMA (United Nations Assistance Mission in Afghanistan) monitors human rights and governance.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "International agricultural companies: Avoid sourcing from supply chains linked to environmental destruction in Afghanistan",
              "Support alternative crop programs through corporate social responsibility initiatives",
              "Invest in drought-resistant seed varieties adapted to Afghan conditions",
            ],
            infra: "Afghanistan's formal corporate sector is largely non-functional under current conditions. International engagement occurs through multilateral development organizations and humanitarian agencies. The Afghanistan Investment Authority was established to attract foreign investment but is currently non-operational.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "FAO: Expand agricultural extension services and drought-resistant crop programs",
              "UNODC: Continue monitoring and reporting on opium cultivation patterns and alternative livelihood outcomes",
              "World Bank (in trust): Maintain agricultural data collection through the Afghanistan Reconstruction Trust Fund",
            ],
            infra: "FAO (Food and Agriculture Organization) — maintains agricultural programs in Afghanistan focused on food security and sustainable farming. UNODC (United Nations Office on Drugs and Crime) — publishes annual Afghanistan Opium Survey tracking cultivation area, yield, and farm-gate prices. World Bank Afghanistan Reconstruction Trust Fund (ARTF) — the largest single source of development funding for Afghanistan, currently operating in limited capacity under sanctions constraints.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Support targeted sanctions relief for agricultural development programs that demonstrably reduce environmental degradation",
              "Fund satellite-based environmental monitoring of Afghan agricultural land through international climate finance",
              "Advocate for inclusion of Afghan environmental data in global food security monitoring systems",
              "Support Afghan diaspora organizations working on sustainable agriculture knowledge transfer",
            ],
            infra: "Note: Afghanistan under Taliban rule has no elected legislature or representative democratic institutions. International engagement channels include: UN Security Council sanctions regime (Resolution 2255), which allows humanitarian exemptions. The Doha process for political dialogue. Afghan diaspora organizations in Europe, North America, and Australia. International development partners coordinate through the Geneva Conference on Afghanistan.",
          },
        ],
      },
    ],
  },
  // --- Albania ---
  {
    code: "AL", name: "Albania", region: "Europe",
    summary: "EU candidate country with small open economy ($27B GDP). Oil production (1.04% rents) centered in Patos-Marinzë field. Services-dominant (48.7% GDP) with significant hydropower potential (95%+ of electricity from hydro).",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Albania's oil sector is small and concentrated in aging onshore fields. As EU accession negotiations require environmental acquis alignment, the overlapping interest between oil producers and government revenue weakens — EU environmental standards make marginal fields unprofitable.",
        breakPaths: [
          "EU accession environmental alignment eliminates subsidies for marginal oil production. When Albania must meet EU environmental standards, the overlapping interest in continued extraction from aging fields (many dating to communist era) disappears — cleanup costs exceed production revenue.",
          "Implement EU-aligned environmental monitoring and emissions disclosure. Albania's EITI (Extractive Industries Transparency Initiative) membership provides a framework — extending to emissions makes W visible.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental contamination at oil production sites to AKM (National Environment Agency)",
              "Document health impacts on communities near oil fields — report to Institute of Public Health",
              "Use Albania's whistleblower protection law (Law 60/2016) for reporting environmental violations",
            ],
            infra: "AKM (Agjencia Kombëtare e Mjedisit / National Environment Agency) — responsible for environmental monitoring, permitting, and enforcement. AKM conducts environmental impact assessments for energy projects. AKBN (Agjencia Kombëtare e Burimeve Natyrore / National Agency of Natural Resources) — regulates oil and gas exploration and production licenses. Law 60/2016 'On Whistleblowing and Whistleblower Protection' — Albania's whistleblower protection statute, adopted as part of EU accession reforms, providing protection against retaliation for reporting violations of law.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Albpetrol: Develop decommissioning and site remediation plan for aging oil fields",
              "Invest in renewable energy diversification — Albania has significant untapped solar and wind potential",
              "Adopt EITI enhanced reporting standards including environmental metrics",
            ],
            infra: "Albpetrol — Albania's state-owned oil company, managing legacy fields from the communist era. Albpetrol's operations include some of Europe's most contaminated industrial sites. Bankers Petroleum (now Geo-Jade Petroleum, Chinese-owned) — the largest oil producer in Albania, operating the Patos-Marinzë field. EITI (Extractive Industries Transparency Initiative) — Albania has been an EITI member since 2013, publishing annual reports on oil and mining revenues.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "AKM: Enforce environmental remediation requirements at legacy oil production sites",
              "AKBN: Require environmental bonds for all new exploration licenses",
              "ERE (Energy Regulatory Entity): Accelerate renewable energy permitting",
            ],
            infra: "ERE (Enti Rregullator i Energjisë / Energy Regulatory Entity) — Albania's independent energy regulator, responsible for licensing, tariff-setting, and market regulation in the electricity and natural gas sectors. Ministry of Infrastructure and Energy — oversees national energy policy including the National Energy Strategy 2030, which targets significant renewable energy expansion.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your member of the Kuvendi (Albanian Parliament) to demand environmental remediation of legacy oil sites",
              "Support accelerated EU accession negotiations contingent on environmental acquis compliance",
              "Advocate for inclusion of environmental cleanup costs in Albania's EITI reporting",
              "Push for Energy Community Treaty enforcement on renewable energy targets",
            ],
            infra: "Kuvendi i Shqipërisë (Parliament of Albania) — unicameral legislature with 140 members elected by proportional representation. Citizens can contact their deputies through parlament.al. The Komisioni për Veprimtarinë Prodhuese (Committee on Production Activities) handles energy and environmental legislation. Energy Community Treaty — Albania is a member of the Energy Community, which extends EU energy and environmental acquis to Southeast European countries. Non-compliance can result in dispute settlement proceedings.",
          },
        ],
      },
    ],
  },
  // --- Armenia ---
  {
    code: "AM", name: "Armenia", region: "Central Asia",
    summary: "Small landlocked economy ($26B GDP) with significant mining sector (min=6.79% of GDP, primarily copper-molybdenum at Kajaran and Sotk gold mine). Services-dominant (62% GDP). Geopolitical constraints from Nagorno-Karabakh conflict and closed borders with Turkey and Azerbaijan.",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Armenia's mining sector generates significant water pollution (Debed and Voghji rivers) and tailings dam risks. When downstream water quality data is published alongside mine production revenue, W becomes computable from bilateral transactions.",
        breakPaths: [
          "Mandate environmental bonds and rehabilitation deposits that fully internalize mine closure costs. When mining companies must pre-fund environmental remediation, the overlapping interest in extraction without cleanup weakens — marginal mines become unprofitable.",
          "Mandatory real-time water quality monitoring downstream of all mining operations, published openly. Armenia's EITI membership provides a disclosure framework — extending to environmental monitoring data makes W visible from production data.",
          "Partially breakable. Open-pit mining inherently disturbs landscapes and generates acid mine drainage. However, modern tailings management and water treatment can reduce the magnitude of system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at mine sites to the Environmental and Mining Inspection Body",
              "Document water pollution downstream of tailings facilities — report to the Ministry of Environment",
              "Use Armenia's whistleblower protection provisions under the Anti-Corruption Strategy for reporting",
            ],
            infra: "Environmental and Mining Inspection Body (EMIB) — the Armenian government agency responsible for monitoring compliance with environmental regulations at mining operations, conducting inspections, and imposing sanctions. Ministry of Environment — oversees environmental policy, issues environmental impact assessment approvals, and sets water quality standards. Armenia's Anti-Corruption Council — established under the Prime Minister's office, provides channels for reporting corruption and misconduct in the mining sector.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Implement international best practice tailings management (Global Industry Standard on Tailings Management)",
              "Adopt EITI enhanced reporting including environmental impact metrics",
              "Commission independent water quality assessments for all operations",
            ],
            infra: "Zangezur Copper-Molybdenum Combine (ZCMC) — Armenia's largest mining company, operating the Kajaran copper-molybdenum mine. Lydian International / Lydian Armenia — operator of the controversial Amulsar gold mine project. GeoProMining — Russian-owned company operating gold mines in Armenia. EITI — Armenia became an EITI candidate country in 2017, requiring disclosure of mining revenues and contracts.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Ministry of Environment: Strengthen environmental impact assessment requirements for new mining licenses",
              "EMIB: Increase inspection frequency and enforce penalties for water pollution violations",
              "Ministry of Territorial Administration: Require community consent processes for new mine approvals",
            ],
            infra: "Ministry of Territorial Administration and Infrastructure — oversees mining policy and licensing. Competition Protection Commission — monitors market concentration in the mining sector. Armenian EITI Multi-Stakeholder Group — includes government, industry, and civil society representatives overseeing extractive sector transparency.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your member of the Azgayin Zhoghov (National Assembly) to demand mandatory environmental bonds for all mining operations",
              "Support strengthening of EITI reporting requirements to include environmental impact data",
              "Advocate for EU-Armenia CEPA (Comprehensive and Enhanced Partnership Agreement) enforcement on environmental standards",
              "Push for international arbitration standards that include environmental remediation in mining investment disputes",
            ],
            infra: "Azgayin Zhoghov (National Assembly of Armenia) — unicameral parliament with 107 members. Citizens can contact their representatives through parliament.am. Armenia's 2018 revolution established stronger democratic institutions. EU-Armenia CEPA (Comprehensive and Enhanced Partnership Agreement) — signed in 2017, includes provisions on environmental protection and sustainable development that Armenia has committed to implement.",
          },
        ],
      },
    ],
  },
  // --- Angola ---
  {
    code: "AO", name: "Angola", region: "Sub-Saharan Africa",
    summary: "Major African oil producer with 29.28% combined oil and gas rents ($29.6B). Sonangol (state oil company) dominates the economy. Agriculture (22.1% GDP) is largely subsistence. Post-civil war recovery continues with high inequality.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Angola's oil production is declining from mature deepwater fields. As extraction costs rise and global demand plateaus, the overlapping interest between Sonangol and international partners (TotalEnergies, BP, ExxonMobil) weakens — declining reserves make diversification economically rational.",
        breakPaths: [
          "Redirect Sonangol investment from deepwater exploration to renewable energy and agricultural modernization. Angola's solar potential is enormous (2,500+ kWh/m²/year). When renewable returns exceed marginal barrel returns from declining fields, the overlapping interest breaks.",
          "Implement EITI-standard revenue transparency extended to per-block environmental impact data. Angola rejoined EITI in 2020 — extending disclosure to emissions and environmental costs makes W computable per production unit.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at oil facilities to MIREMPET (Ministry of Mineral Resources, Petroleum and Gas)",
              "Document community health impacts near production facilities through local NGOs",
              "Report financial irregularities in Sonangol operations — Angola's anti-corruption framework (Lei 3/20) provides limited protections",
            ],
            infra: "MIREMPET (Ministério dos Recursos Minerais, Petróleo e Gás) — Angola's ministry overseeing oil and gas operations, licensing, and regulation. ANPG (Agência Nacional de Petróleo, Gás e Biocombustíveis) — the national petroleum regulator, created in 2019 to replace Sonangol's dual role as regulator and operator. Lei 3/20 (Law on Public Probity) — Angola's anti-corruption law establishing asset declaration requirements and conflicts of interest rules for public officials. Whistleblower protection remains weak.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Sonangol: Develop strategic diversification plan with binding renewable energy investment targets",
              "International partners (TotalEnergies, BP): Implement Paris-aligned emissions reduction plans for Angolan operations",
              "Adopt Task Force on Climate-Related Financial Disclosures-aligned climate disclosure for all production sharing agreements",
            ],
            infra: "Sonangol E.P. — Angola's state oil company and the country's largest enterprise. Sonangol holds equity in all oil production sharing agreements and manages the state's petroleum interests. The company underwent restructuring in 2019, separating its regulatory functions to ANPG. TotalEnergies, BP, ExxonMobil, Eni — major international oil companies operating deepwater blocks offshore Angola.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "ANPG: Require environmental impact assessments with community consultation for all new production blocks",
              "Ministry of Environment: Strengthen enforcement of environmental regulations in the petroleum sector",
              "Banco Nacional de Angola: Integrate climate risk into financial supervision of oil-dependent lending",
            ],
            infra: "ANPG (Agência Nacional de Petróleo, Gás e Biocombustíveis) — established in 2019 as the independent petroleum regulator, responsible for managing exploration and production contracts, monitoring compliance with license terms, and administering bidding rounds. Ministério do Ambiente — Angola's environment ministry, responsible for environmental policy, impact assessments, and pollution control.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your member of the Assembleia Nacional to demand publication of per-block environmental impact data for all oil operations",
              "Support EITI enhanced reporting with environmental metrics for Angola",
              "Advocate through the African Union for continental renewable energy investment targets",
              "Push for Paris Agreement compliance monitoring through UNFCCC mechanisms",
            ],
            infra: "Assembleia Nacional (National Assembly of Angola) — unicameral legislature with 220 members. Angola's electoral system uses party-list proportional representation. The most recent elections were held in 2022. Citizens can engage through assembleia.ao. Angola is a presidential republic with significant executive power. EITI — Angola was suspended from EITI in 2017 for insufficient progress but successfully reapplied and was readmitted in 2020, committing to enhanced transparency standards.",
          },
        ],
      },
    ],
  },
  // --- Argentina ---
  {
    code: "AR", name: "Argentina", region: "Latin America",
    summary: "G20 economy ($638.4B GDP) with massive Vaca Muerta shale formation (second-largest shale gas, fourth-largest shale oil reserves globally). Agricultural powerhouse (soy, beef) with 5.8% ag GDP share but outsized environmental footprint. Chronic macroeconomic instability.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Argentina's Vaca Muerta development requires massive capital investment ($10B+/year) and government subsidies (Plan Gas). Removing subsidies breaks the overlapping interest — without price guarantees, many Vaca Muerta wells are marginal at global market prices.",
        breakPaths: [
          "Phase out Plan Gas subsidies and redirect capital to renewable energy. Argentina has world-class wind resources in Patagonia and solar in the northwest. When renewable electricity undercuts subsidized gas, the overlapping interest between producers and government in continued fossil expansion breaks.",
          "Mandatory per-well emissions disclosure including methane venting and flaring. Argentina's Secretaría de Energía already collects production data — extending to emissions makes W computable from production statistics.",
          "Not breakable by policy alone. Shale gas extraction and combustion release CO₂ and methane by physical process.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at Vaca Muerta operations to the provincial environmental authority (Secretaría de Ambiente de Neuquén)",
              "Document water contamination from fracking operations — report to AIC (Autoridad Interjurisdiccional de las Cuencas)",
              "Report safety violations to the Secretaría de Trabajo",
            ],
            infra: "Secretaría de Ambiente de Neuquén — Neuquén province's environmental authority, responsible for environmental permitting and monitoring of oil and gas operations in the Vaca Muerta formation. AIC (Autoridad Interjurisdiccional de las Cuencas de los ríos Limay, Neuquén y Negro) — the inter-jurisdictional water authority managing the river basins affected by Vaca Muerta operations. COFEMA (Consejo Federal de Medio Ambiente) — federal-provincial environmental coordination body. Argentina lacks comprehensive federal whistleblower protection legislation, though provincial laws vary.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "YPF: Develop Paris-aligned transition plan with binding emissions reduction targets for Vaca Muerta operations",
              "Implement Task Force on Climate-Related Financial Disclosures-aligned climate disclosure across all operations",
              "Invest in CCUS (carbon capture, utilization, and storage) pilot projects for gas processing facilities",
            ],
            infra: "YPF S.A. — Argentina's largest energy company (51% state-owned), the dominant operator in Vaca Muerta. YPF's strategic decisions on Vaca Muerta development drive national energy policy. Pan American Energy, Vista Energy, TotalEnergies — other major operators in Vaca Muerta. Plan Gas.Ar — the Argentine government's gas production incentive program, guaranteeing minimum prices for domestic gas production to stimulate Vaca Muerta development.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Secretaría de Energía: Publish per-well emissions data for all Vaca Muerta operations",
              "SAyDS: Strengthen federal environmental standards for unconventional hydrocarbon extraction",
              "ENARGAS: Reform natural gas tariff structure to eliminate implicit fossil fuel subsidies",
            ],
            infra: "Secretaría de Energía — Argentina's energy secretariat, responsible for energy policy, production monitoring, and regulatory oversight. SAyDS (Secretaría de Ambiente y Desarrollo Sustentable) — the federal environment secretariat, responsible for environmental policy and climate change. ENARGAS (Ente Nacional Regulador del Gas) — the national gas regulatory authority, overseeing gas transport, distribution, and tariff regulation.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Diputado Nacional or Senador to demand a timeline for fossil fuel subsidy phase-out and transparent per-well emissions reporting",
              "Strengthen Argentina's NDC — current targets are considered insufficient by Climate Action Tracker",
              "Leverage Mercosur-EU trade agreement environmental provisions to align energy transition commitments",
              "Support South American renewable energy integration through regional grid interconnection",
            ],
            infra: "Congreso de la Nación Argentina — bicameral legislature consisting of the Cámara de Diputados (257 members) and the Senado (72 members). Citizens can contact representatives through diputados.gov.ar and senado.gob.ar. The Comisión de Energía y Combustibles handles energy legislation. Argentina's NDC — Argentina submitted an updated NDC in 2021 targeting emissions of no more than 349 MtCO₂e by 2030. Climate Action Tracker rates this as 'highly insufficient.'",
          },
        ],
      },
    ],
  },
  // --- Austria ---
  {
    code: "AT", name: "Austria", region: "Europe",
    summary: "Wealthy EU economy ($534.8B GDP) with strong manufacturing (15.1% of GDP). Low direct fossil fuel exposure but significant Ultra-Processed Food and financial sector Private-Systemic Tension. Major transit hub for Russian gas (Baumgarten hub). High healthcare expenditure (11.83% GDP) suggests diet-related disease burden.",
    sectors: [
      {
        name: "Ultra-Processed Food", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Austria's healthcare system (ASVG social insurance) tracks diet-related disease costs with high granularity. When per-product-category healthcare costs are published alongside retail revenue, W becomes computable from bilateral Ultra-Processed Food transactions.",
        breakPaths: [
          "Implement front-of-pack health-impact labelling through EU Farm to Fork Strategy. When consumers see welfare costs at point of sale, the overlapping interest between Ultra-Processed Food manufacturers and retailers in high-margin processed products weakens.",
          "Mandate publication of diet-attributable healthcare costs per product category using ASVG social insurance data. Austria's comprehensive health insurance system generates the data needed to make W computable.",
          "Not fully breakable. Ultra-processing alters food matrix in ways that affect metabolic response. Reformulation mandates can reduce but not eliminate system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report misleading health claims on food products to the Bundeswettbewerbsbehörde (Federal Competition Authority)",
              "Document undisclosed processing methods — report to AGES (Austrian Agency for Health and Food Safety)",
              "Use the HinweisgeberInnenschutzgesetz (Whistleblower Protection Act, 2023) for protected reporting",
            ],
            infra: "Bundeswettbewerbsbehörde (BWB / Federal Competition Authority) — Austria's competition authority, investigating unfair commercial practices including misleading advertising. AGES (Agentur für Gesundheit und Ernährungssicherheit / Austrian Agency for Health and Food Safety) — the federal agency responsible for food safety, nutrition surveillance, and public health. AGES conducts food inspections and risk assessments. HinweisgeberInnenschutzgesetz (HSchG, 2023) — Austria's transposition of the EU Whistleblower Directive, providing protection for employees reporting violations of EU or national law.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Reformulate product lines to reduce ultra-processing — invest in minimally processed alternatives",
              "Voluntarily adopt front-of-pack nutritional labelling ahead of EU mandate",
              "Commission health-impact assessment of product portfolio using national health insurance data",
            ],
            infra: "EU Farm to Fork Strategy — includes proposals for mandatory front-of-pack nutrition labelling across the EU. Austrian food companies that move early gain competitive advantage in the EU single market. EFSA (European Food Safety Authority) — provides scientific opinions that shape EU food regulation applicable in Austria.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "BMSGPK: Implement mandatory front-of-pack health labelling for Ultra-Processed Food products",
              "AGES: Publish annual diet-attributable disease burden data linked to specific product categories",
              "Hauptverband der Sozialversicherungsträger: Release anonymized diet-related healthcare cost data",
            ],
            infra: "BMSGPK (Bundesministerium für Soziales, Gesundheit, Pflege und Konsumentenschutz / Federal Ministry of Social Affairs, Health, Care and Consumer Protection) — oversees food safety policy, nutrition guidelines, and consumer protection. Hauptverband der österreichischen Sozialversicherungsträger (now Dachverband) — the umbrella organization of Austrian social insurance institutions, managing healthcare data for the entire insured population.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your member of the Nationalrat or Bundesrat to demand mandatory health-impact labelling on ultra-processed foods",
              "Support EU-wide adoption of front-of-pack nutritional labelling",
              "Advocate for inclusion of diet-attributable health costs in national accounting",
              "Push for WHO-aligned Ultra-Processed Food marketing restrictions through EU legislative process",
            ],
            infra: "Österreichisches Parlament — Austria's bicameral parliament consisting of the Nationalrat (183 members) and the Bundesrat (61 members). Citizens can contact representatives through parlament.gv.at. The Gesundheitsausschuss (Health Committee) handles health and food policy legislation.",
          },
        ],
      },
    ],
  },
  // --- Azerbaijan ---
  {
    code: "AZ", name: "Azerbaijan", region: "Central Asia",
    summary: "Oil-dependent economy with 29.57% combined oil and gas rents ($22B). SOCAR (State Oil Company) dominates. Hosted COP29 (2024). Authoritarian governance with limited civil society space. Caspian Sea oil and gas fields (ACG, Shah Deniz) are mature.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Azerbaijan's oil production is declining from mature Caspian fields (ACG peaked in 2010). As production costs rise and reserves deplete, the overlapping interest between SOCAR and international partners (BP) weakens — diversification becomes economically necessary.",
        breakPaths: [
          "Accelerate post-oil diversification using SOFAZ (State Oil Fund) reserves. Azerbaijan's $50B+ sovereign wealth fund can finance renewable energy and non-oil economic development. When SOFAZ investment returns from renewables exceed declining oil returns, the overlapping interest breaks.",
          "Implement per-field emissions disclosure for all Caspian operations. BP already publishes emissions data for ACG — extending to all SOCAR operations makes W computable across the sector.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at oil facilities to the Ministry of Ecology and Natural Resources",
              "Document emissions underreporting through internal SOCAR channels",
              "Report environmental concerns to international partners (BP) through their compliance systems",
            ],
            infra: "Ministry of Ecology and Natural Resources — Azerbaijan's environmental authority, responsible for environmental monitoring, permitting, and enforcement. The Ministry oversees environmental impact assessments for energy projects. SOCAR (State Oil Company of the Azerbaijan Republic) — the national oil company controlling all upstream and downstream petroleum operations. Note: Azerbaijan has no comprehensive whistleblower protection law. Civil society space is severely constrained; independent media and NGOs face significant operational barriers.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "SOCAR: Develop binding renewable energy transition plan with interim emissions targets",
              "BP Azerbaijan: Extend ACG emissions transparency standards to all partner operations",
              "SOFAZ: Adopt environmental, social, and governance investment criteria excluding new fossil fuel development",
            ],
            infra: "SOCAR — Azerbaijan's state oil company, operating the country's refining, petrochemical, and upstream assets. SOCAR also has international operations in Turkey, Georgia, and Europe. BP — the largest international operator in Azerbaijan, managing the Azeri-Chirag-Deepwater Gunashli (ACG) oilfield and Shah Deniz gas field through Production Sharing Agreements. SOFAZ (State Oil Fund of the Republic of Azerbaijan) — the sovereign wealth fund managing Azerbaijan's petroleum revenues, with assets exceeding $50B.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Ministry of Ecology: Strengthen environmental standards for offshore Caspian operations",
              "EITI Azerbaijan: Expand reporting to include environmental impact data per production block",
              "Tariff Council: Reform energy pricing to remove implicit fossil fuel consumption subsidies",
            ],
            infra: "Azerbaijan EITI — Azerbaijan was an early EITI member (2003) and publishes annual reports on extractive industry revenues. The EITI process provides one of the few independent transparency mechanisms in the sector. Tariff (Price) Council — sets regulated energy prices in Azerbaijan. Tehran Convention — the Framework Convention for the Protection of the Marine Environment of the Caspian Sea, which governs environmental standards for offshore operations.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Leverage Azerbaijan's COP29 presidency legacy to strengthen national climate commitments",
              "Advocate through the Tehran Convention for Caspian Sea environmental protection standards",
              "Support EITI enhanced reporting with environmental metrics",
              "Push for European Energy Charter Treaty enforcement on environmental standards in transit countries",
            ],
            infra: "Milli Majlis (National Assembly of Azerbaijan) — unicameral parliament with 125 members. Note: Azerbaijan is rated 'Not Free' by Freedom House; elections are not considered free and fair by international observers. Civic engagement channels are limited. International pressure operates primarily through multilateral forums including the Council of Europe (Azerbaijan is a member), OSCE, and the EITI Board. The EU-Azerbaijan Partnership and Cooperation Agreement provides a framework for dialogue on energy and environmental issues.",
          },
        ],
      },
    ],
  },
  // --- Bosnia and Herzegovina ---
  {
    code: "BA", name: "Bosnia and Herzegovina", region: "Europe",
    summary: "Post-conflict economy ($29.6B GDP) with complex governance (two entities: Federation and Republika Srpska). Coal-dependent energy sector and manufacturing (12.7% GDP). EU candidate country. Significant coal mining and thermal power generation.",
    sectors: [
      {
        name: "Coal", beta: 6.1,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Bosnia's coal sector is heavily subsidized through below-market electricity pricing and state employment guarantees. EU accession requires alignment with the EU ETS — when carbon pricing applies, the overlapping interest between coal producers and the state employment system breaks.",
        breakPaths: [
          "EU accession alignment with EU ETS carbon pricing. When Bosnian coal power must pay the carbon price (~€90/ton), coal-fired electricity becomes uncompetitive with imported renewables. The overlapping interest between mine operators and state employment programs breaks.",
          "Mandatory emissions monitoring and disclosure per power plant. Energy Community Treaty membership requires EU-aligned environmental reporting — implementing this makes W computable from electricity generation data.",
          "Not breakable. Coal combustion releases CO₂, SO₂, and particulate matter by physical process.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at coal mines and power plants to entity-level environmental inspectorates",
              "Document health impacts in communities near coal power plants — report to public health institutes",
              "Report corruption in coal procurement to the Agency for Prevention of Corruption and Coordination of the Fight Against Corruption",
            ],
            infra: "Environmental inspection is split between the Federation of Bosnia and Herzegovina and Republika Srpska, each maintaining separate environmental agencies. Federation: Federalni inspektorat — environmental inspectorate. Republika Srpska: Republička uprava za inspekcijske poslove — inspection administration. Agency for Prevention of Corruption and Coordination of the Fight Against Corruption (APIK) — state-level anti-corruption body. Bosnia lacks comprehensive whistleblower protection legislation, though draft laws have been discussed as part of EU accession reforms.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "State electricity companies (EPBiH, ERS): Develop coal phase-out timelines aligned with Energy Community Treaty obligations",
              "Invest in renewable energy capacity to replace aging coal plants",
              "Implement emissions monitoring per facility ahead of EU ETS alignment",
            ],
            infra: "EPBiH (Elektroprivreda Bosne i Hercegovine) — the Federation's state electricity company, operating coal-fired power plants and hydropower. ERS (Elektroprivreda Republike Srpske) — Republika Srpska's state electricity company. Both companies operate aging coal infrastructure (many plants dating to Yugoslav era) and are major employers in mining communities.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "DERK (State Electricity Regulatory Commission): Reform tariffs to reflect true environmental costs of coal generation",
              "Entity environmental agencies: Enforce air quality standards at coal power plants",
              "Energy Community Secretariat: Use dispute resolution to enforce environmental compliance",
            ],
            infra: "DERK (Državna regulatorna komisija za električnu energiju / State Electricity Regulatory Commission) — the state-level electricity regulator. FERK and RERS are entity-level regulators. Energy Community Treaty — Bosnia is a contracting party, committed to implementing EU energy and environmental acquis including Large Combustion Plants Directive and Industrial Emissions Directive.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your member of the Parlamentarna skupština to demand coal phase-out timelines aligned with Energy Community obligations",
              "Support EU accession negotiations contingent on energy transition commitments",
              "Advocate for just transition funding for coal-dependent communities through IPA III (EU Instrument for Pre-Accession)",
              "Push for Energy Community Treaty enforcement on air quality standards",
            ],
            infra: "Parlamentarna skupština Bosne i Hercegovine (Parliamentary Assembly) — bicameral legislature consisting of the Predstavnički dom (House of Representatives, 42 members) and the Dom naroda (House of Peoples, 15 members). Bosnia's complex governance structure (Dayton Agreement) divides power between state, entity, and cantonal levels. Citizens can contact representatives through parlament.ba.",
          },
        ],
      },
    ],
  },
  // --- Bangladesh ---
  {
    code: "BD", name: "Bangladesh", region: "South Asia",
    summary: "Large economy ($450.1B GDP) driven by garment manufacturing (21.9% mfg share of GDP). High agricultural employment (11.2% GDP). Extreme climate vulnerability — low-lying delta at severe flood and cyclone risk. One of the world's most densely populated countries.",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Bangladesh's rice monoculture depletes groundwater (arsenic contamination) and reduces soil biodiversity. Satellite-based crop monitoring and water quality data from BWDB can make W computable from agricultural output and water extraction volumes.",
        breakPaths: [
          "Reform agricultural subsidies from input-based (fertilizer, diesel) to outcome-based (soil health, water efficiency). When subsidies reward diversification rather than rice intensification, the overlapping interest in monoculture between farmers and input suppliers weakens.",
          "Mandatory groundwater extraction monitoring and arsenic contamination mapping published at upazila level. BWDB already collects water data — extending to public disclosure linked to agricultural output makes W computable.",
          "Partially breakable. Intensive rice cultivation in deltaic conditions inherently alters hydrology and nutrient cycling. However, System of Rice Intensification (SRI) and crop diversification can reduce system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report pesticide misuse or adulteration to DAE (Department of Agricultural Extension)",
              "Document groundwater over-extraction or arsenic contamination — report to DPHE (Department of Public Health Engineering)",
              "Report food safety violations in agricultural supply chains to BFSA (Bangladesh Food Safety Authority)",
            ],
            infra: "DAE (Department of Agricultural Extension) — the primary government agency for agricultural technical support and extension services, operating at union, upazila, and district levels. DPHE (Department of Public Health Engineering) — responsible for water supply and sanitation, including monitoring arsenic contamination in groundwater (affecting ~35 million people). BFSA (Bangladesh Food Safety Authority) — established in 2015 to regulate food safety across the supply chain. Bangladesh lacks comprehensive whistleblower protection legislation.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Agricultural input companies: Develop integrated pest management products as alternatives to chemical-intensive packages",
              "Invest in climate-resilient crop varieties through partnerships with BRRI (Bangladesh Rice Research Institute)",
              "Adopt water-use efficiency targets across supply chains",
            ],
            infra: "BRRI (Bangladesh Rice Research Institute) — the national research institute developing improved rice varieties, including flood-tolerant (BRRI dhan52), salt-tolerant, and drought-resistant varieties. BARI (Bangladesh Agricultural Research Institute) — conducts research on non-rice crops including vegetables, pulses, and oilseeds. BADC (Bangladesh Agricultural Development Corporation) — the government agency responsible for seed production and distribution.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Ministry of Agriculture: Reform subsidy structure from input-based to outcome-based",
              "BWDB: Implement mandatory groundwater monitoring networks in intensive agricultural zones",
              "DoE (Department of Environment): Enforce regulations on agricultural chemical runoff into waterways",
            ],
            infra: "Ministry of Agriculture — oversees agricultural policy, subsidies, and development programs. BWDB (Bangladesh Water Development Board) — responsible for flood control, drainage, and irrigation infrastructure. The BWDB manages the country's water resource data system. DoE (Department of Environment) — Bangladesh's environmental regulatory agency, responsible for environmental clearance of projects and monitoring pollution.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your member of the Jatiya Sangsad to demand reform of agricultural subsidies toward climate resilience and crop diversification",
              "Support Bangladesh's Climate Vulnerable Forum leadership in advocating for agricultural adaptation finance",
              "Advocate for inclusion of groundwater depletion costs in national GDP accounting",
              "Push for international climate finance to support agricultural diversification away from rice monoculture",
            ],
            infra: "Jatiya Sangsad (National Parliament of Bangladesh) — unicameral legislature with 350 members (300 directly elected, 50 reserved for women). Citizens can contact representatives through parliament.gov.bd. The Standing Committee on Ministry of Agriculture handles agricultural policy. Bangladesh Climate Change Strategy and Action Plan (BCCSAP) — the national framework for climate adaptation and mitigation, including agricultural resilience.",
          },
        ],
      },
    ],
  },
  // --- Belgium ---
  {
    code: "BE", name: "Belgium", region: "Europe",
    summary: "EU and NATO headquarters economy ($671.4B GDP). Services-dominant (71% GDP). Major port (Antwerp — Europe's second-largest) handles significant fossil fuel and petrochemical throughput. High healthcare expenditure (10.8% GDP). Federal state with three regions.",
    sectors: [
      {
        name: "Ultra-Processed Food", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Belgium's comprehensive INAMI/RIZIV health insurance system tracks healthcare costs with high granularity. Publishing diet-attributable disease costs per product category makes W computable from retail sales data.",
        breakPaths: [
          "Implement front-of-pack health labelling (Belgium adopted Nutri-Score voluntarily in 2019). Extending to mandatory application and adding health-cost information weakens the overlapping interest in high-margin Ultra-Processed Food.",
          "INAMI/RIZIV publication of anonymized diet-attributable healthcare cost data per product category. Belgium's universal health insurance generates comprehensive data to make W computable.",
          "Not fully breakable. Ultra-processing alters food matrix affecting metabolic response. Reformulation mandates reduce but do not eliminate system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report misleading health claims to SPF Économie (Federal Public Service Economy)",
              "Document food safety violations — report to AFSCA/FAVV (Federal Agency for the Safety of the Food Chain)",
              "Use the Belgian whistleblower protection law (transposition of EU Directive 2019/1937) for protected reporting",
            ],
            infra: "AFSCA/FAVV (Agence fédérale pour la sécurité de la chaîne alimentaire / Federaal Agentschap voor de Veiligheid van de Voedselketen) — Belgium's federal food safety agency, responsible for food chain safety from farm to fork. Conducts inspections, sampling, and enforcement. SPF Économie (Service public fédéral Économie) — the federal economic affairs service handling consumer protection and fair commercial practices.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Reformulate product lines to reduce ultra-processing",
              "Extend voluntary Nutri-Score adoption to all product lines",
              "Commission health-impact assessment of product portfolio",
            ],
            infra: "Fevia (Federation of the Belgian Food Industry) — the trade association representing over 700 food companies in Belgium. Fevia's sustainability commitments influence industry practices. Belgium hosts major food companies including Puratos, Vandemoortele, and Lotus Bakeries.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "SPF Santé publique: Make Nutri-Score mandatory for all packaged food products",
              "AFSCA/FAVV: Strengthen enforcement of marketing claims on Ultra-Processed Food products",
              "INAMI/RIZIV: Publish annual reports linking food consumption patterns to healthcare expenditure",
            ],
            infra: "SPF Santé publique (Federal Public Service Health, Food Chain Safety and Environment) — the federal ministry overseeing public health policy, food safety, and environment. INAMI/RIZIV (Institut national d'assurance maladie-invalidité / Rijksinstituut voor ziekte- en invaliditeitsverzekering) — Belgium's national health insurance institute, managing the compulsory health insurance system and healthcare cost data.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your member of the Chambre des représentants / Kamer van Volksvertegenwoordigers to demand mandatory health-impact labelling",
              "Support EU-wide mandatory Nutri-Score through the Farm to Fork Strategy",
              "Advocate for WHO-aligned Ultra-Processed Food marketing restrictions",
              "Push for inclusion of diet-related health costs in national accounting frameworks",
            ],
            infra: "Parlement fédéral / Federaal Parlement — Belgium's bicameral parliament consisting of the Chambre des représentants / Kamer van Volksvertegenwoordigers (150 members) and the Sénat / Senaat (60 members). Citizens can contact representatives through lachambre.be / dekamer.be. Belgium's federal structure means health policy is shared between federal and regional (community) governments.",
          },
        ],
      },
    ],
  },
  // --- Burkina Faso ---
  {
    code: "BF", name: "Burkina Faso", region: "Sub-Saharan Africa",
    summary: "Low-income Sahelian economy ($23.1B GDP) with dominant gold mining sector (min=15.45% GDP). Agriculture employs 80%+ of population (20.9% GDP). Military junta since 2022 coup. Severe security challenges (jihadist insurgency).",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Burkina Faso's gold mining generates cyanide contamination, mercury pollution (artisanal mining), and community displacement. When environmental and health costs per mine are published alongside production revenue, W becomes computable.",
        breakPaths: [
          "Mandate environmental bonds and community benefit agreements for all industrial mining licenses. When mining companies must pre-fund environmental remediation and community compensation, the overlapping interest in extraction without accountability weakens.",
          "Publish per-mine environmental impact data (water quality, air quality, land disturbance) alongside production revenue through EITI reporting. Burkina Faso's EITI membership provides the framework — extending to environmental data makes W visible.",
          "Partially breakable. Open-pit gold mining inherently disturbs landscapes and generates toxic waste. However, improved tailings management and mercury-free artisanal methods can reduce system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at mine sites to BUNEE (Bureau National des Évaluations Environnementales)",
              "Document community health impacts near mining operations through local health clinics",
              "Report illegal artisanal mining activities and mercury use to provincial authorities",
            ],
            infra: "BUNEE (Bureau National des Évaluations Environnementales) — Burkina Faso's national environmental assessment authority, responsible for environmental impact assessments of mining projects. Ministère de l'Environnement, de l'Énergie, de l'Eau et de l'Assainissement — oversees environmental policy and regulation. Note: Under military rule since 2022, institutional capacity is constrained and civil society space is restricted.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Mining companies (Endeavour Mining, IAMGOLD, Nordgold): Implement Global Industry Standard on Tailings Management",
              "Adopt EITI enhanced reporting including environmental impact metrics",
              "Invest in mercury-free processing technologies for artisanal mining support programs",
            ],
            infra: "Major mining companies operating in Burkina Faso include Endeavour Mining (Houndé, Wahgnion mines), IAMGOLD (Essakane mine), and Nordgold (Bissa-Bouly). These international companies are subject to home-country environmental, social, and governance reporting requirements and international mining standards (ICMM, IFC Performance Standards).",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Ministry of Mines: Strengthen environmental conditions in mining permits and enforce compliance",
              "BUMIGEB (Bureau des Mines et de la Géologie): Improve artisanal mining regulation to reduce mercury use",
              "EITI-BF: Expand reporting to include environmental and community impact data",
            ],
            infra: "Ministère des Mines et des Carrières — the ministry responsible for mining policy, licensing, and regulation. BUMIGEB (Bureau des Mines et de la Géologie du Burkina) — the geological survey and mining technical agency. EITI Burkina Faso — Burkina Faso has been an EITI member since 2009, publishing reports on mining revenues. The 2015 Mining Code establishes environmental obligations for mining companies.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Advocate through ECOWAS for regional mining environmental standards",
              "Support African Mining Vision implementation for sustainable resource governance",
              "Push for international mining companies to adopt binding environmental standards through OECD Due Diligence Guidance",
              "Support Kimberley Process-style certification for gold supply chains to reduce conflict mineral financing",
            ],
            infra: "Note: Burkina Faso is under military rule (Capitaine Ibrahim Traoré since 2022). The Assemblée Législative de Transition (Transitional Legislative Assembly) replaced the elected National Assembly. Democratic institutions are suspended. International engagement channels: ECOWAS (Economic Community of West African States — though Burkina Faso announced withdrawal in 2024), African Union, and international development partners. The African Mining Vision (2009) provides a continental framework for sustainable mining governance.",
          },
        ],
      },
    ],
  },
  // --- Bulgaria ---
  {
    code: "BG", name: "Bulgaria", region: "Europe",
    summary: "EU member economy ($113.3B GDP) with legacy coal dependence (Maritsa East complex is one of Europe's largest lignite basins). Services-dominant (63.8% GDP). EU accession has driven institutional modernization but coal transition remains politically sensitive.",
    sectors: [
      {
        name: "Coal", beta: 6.1,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Bulgaria's coal sector is sustained by implicit subsidies (below-market electricity pricing, state employment). EU ETS carbon pricing makes lignite uncompetitive — when full carbon costs are internalized, the overlapping interest between mine operators and state employment programs breaks.",
        breakPaths: [
          "Full alignment with EU ETS free allowance phase-out. When Bulgarian lignite plants pay the EU carbon price without free allowances, coal-fired electricity becomes uncompetitive. The overlapping interest breaks when renewable alternatives are cheaper.",
          "Mandatory per-plant emissions and health-impact disclosure. Bulgaria's lignite plants (Maritsa East I, II, III) are among Europe's worst air polluters. Publishing health costs per MWh makes W computable from electricity generation data.",
          "Not breakable. Lignite combustion releases CO₂, SO₂, NOx, and particulate matter by physical process.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report emissions violations at coal plants to RIOSV (Regional Inspectorates of Environment and Water)",
              "Document health impacts in communities near Maritsa East complex — report to RZI (Regional Health Inspectorates)",
              "Use Bulgaria's whistleblower protection law (transposition of EU Directive 2019/1937) for protected reporting",
            ],
            infra: "RIOSV (Регионални инспекции по околната среда и водите / Regional Inspectorates of Environment and Water) — 16 regional environmental agencies conducting inspections and enforcement. EEA (Изпълнителна агенция по околна среда / Executive Environment Agency) — the national environmental monitoring agency collecting emissions and air quality data. Bulgaria transposed the EU Whistleblower Directive in 2023.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Maritsa East complex operators: Develop coal phase-out plans with worker transition programs",
              "Invest in renewable energy capacity (Bulgaria has strong solar potential — 1,500+ kWh/m²/year)",
              "Adopt per-unit emissions reporting aligned with EU taxonomy",
            ],
            infra: "Maritsa East complex — comprises three lignite-fired power plants (Maritsa East I, II, III) and the associated Maritsa-Iztok mines. AES Bulgaria operates Maritsa East I; ContourGlobal operates Maritsa East III. The complex is the largest industrial employer in the Stara Zagora region. Mini Maritsa-Iztok — the state-owned lignite mining company supplying the Maritsa East plants.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "KEVR (Energy and Water Regulatory Commission): Reform electricity tariffs to reflect carbon costs",
              "Ministry of Energy: Develop binding coal phase-out timeline aligned with EU Green Deal",
              "Ministry of Environment: Enforce Industrial Emissions Directive compliance at all coal plants",
            ],
            infra: "KEVR (Комисия за енергийно и водно регулиране / Energy and Water Regulatory Commission) — Bulgaria's independent energy regulator, setting electricity tariffs and licensing. Ministry of Energy — oversees energy policy including the National Energy and Climate Plan (NECP). Bulgaria's NECP has been criticized for insufficient coal phase-out ambition.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your member of the Narodno Sabranie (National Assembly) to demand a binding coal phase-out timeline with just transition funding",
              "Support EU Just Transition Fund allocation for Stara Zagora and other coal-dependent regions",
              "Advocate for accelerated EU ETS free allowance phase-out",
              "Push for Territorial Just Transition Plans that include concrete retraining and economic diversification measures",
            ],
            infra: "Narodno Sabranie (Народно събрание / National Assembly of Bulgaria) — unicameral parliament with 240 members. Citizens can contact representatives through parliament.bg. The Комисия по енергетика (Energy Committee) handles energy legislation. EU Just Transition Fund — Bulgaria is eligible for significant JTF funding to support coal transition in affected regions. Bulgaria's Territorial Just Transition Plans cover Stara Zagora, Kyustendil, and Pernik regions.",
          },
        ],
      },
    ],
  },
  // --- Bahrain ---
  {
    code: "BH", name: "Bahrain", region: "Middle East",
    summary: "Small island petrostate ($47.1B GDP) with 16.64% combined oil and gas rents. Bahrain's Abu Safa offshore field (shared with Saudi Arabia) provides the majority of oil revenue. Diversifying into financial services (Bahrain Financial Harbour) and aluminum (Alba smelter).",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Bahrain's oil reserves are the smallest among GCC states (declining production from mature fields). The economic case for diversification is strongest here — when post-oil planning makes renewable investment more attractive than marginal barrel extraction, the overlapping interest breaks.",
        breakPaths: [
          "Accelerate Economic Vision 2030 diversification away from oil dependence. Bahrain's small size and advanced financial sector make it the most transition-ready GCC economy. When financial services and technology revenue exceeds oil revenue, the overlapping interest in extraction breaks.",
          "Publish per-field environmental and emissions data for all Bahrain Petroleum Company (BAPCO) operations. Making lifecycle emissions visible per barrel makes W computable from production data.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at BAPCO facilities to the Supreme Council for Environment",
              "Document emissions or safety concerns through internal BAPCO compliance channels",
              "Report concerns to Bahrain's National Audit Office regarding mismanagement of petroleum revenues",
            ],
            infra: "Supreme Council for Environment (SCE) — Bahrain's environmental authority, responsible for environmental policy, permitting, and enforcement. SCE oversees environmental impact assessments for industrial projects. BAPCO (Bahrain Petroleum Company) — the state-owned oil company operating Bahrain's refinery and upstream assets. National Audit Office — conducts financial audits of government entities including BAPCO. Note: Bahrain has limited whistleblower protection; civil society space is constrained.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "BAPCO: Accelerate the BAPCO Modernization Program to include renewable energy components",
              "Mumtalakat (sovereign wealth fund): Increase renewable energy allocation in investment portfolio",
              "Implement Task Force on Climate-Related Financial Disclosures-aligned climate disclosure for all operations",
            ],
            infra: "BAPCO (Bahrain Petroleum Company) — operates the Sitra refinery (267,000 bpd after modernization) and manages upstream production. Mumtalakat — Bahrain's sovereign wealth fund, managing state assets including BAPCO and Alba (Aluminium Bahrain). Nogaholding — the investment arm of Bahrain's National Oil and Gas Authority, overseeing the country's energy sector investments.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "NOGA: Require emissions disclosure for all petroleum operations",
              "SCE: Strengthen environmental standards for refinery operations",
              "CBB (Central Bank of Bahrain): Integrate climate risk disclosure into financial sector regulation",
            ],
            infra: "NOGA (National Oil and Gas Authority) — the government body responsible for oil and gas policy, licensing, and upstream regulation. CBB (Central Bank of Bahrain) — the financial sector regulator, which has begun integrating environmental, social, and governance considerations into banking supervision. Bahrain Economic Development Board — coordinates the Economic Vision 2030 diversification strategy.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Advocate through GCC Secretariat for regional carbon pricing mechanisms",
              "Support IRENA recommendations on GCC energy transition pathways",
              "Push for enhanced climate disclosure standards through the Bahrain Bourse environmental, social, and governance framework",
              "Leverage Bahrain's UNFCCC commitments to strengthen national emissions reduction targets",
            ],
            infra: "Council of Representatives (Majlis al-Nuwab) — the elected lower house of Bahrain's parliament (40 members) and the Shura Council (Majlis al-Shura, 40 appointed members). Note: Bahrain is a constitutional monarchy with significant royal authority. Political opposition is restricted. The Council of Representatives has limited legislative power. International engagement on climate issues operates through GCC coordination and UNFCCC processes.",
          },
        ],
      },
    ],
  },
  // --- Benin ---
  {
    code: "BJ", name: "Benin", region: "Sub-Saharan Africa",
    summary: "Small West African economy ($21.5B GDP) with dominant agriculture sector (24.2% GDP, primarily cotton). Services growing (48.9% GDP). Cotton is the main export crop — Benin is Africa's largest cotton producer. Climate vulnerability through Sahel desertification and coastal erosion.",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Benin's cotton monoculture degrades soil fertility and increases pesticide exposure. When soil health data and pesticide-related healthcare costs are published alongside cotton production revenue, W becomes computable from agricultural output data.",
        breakPaths: [
          "Reform cotton subsidies to reward soil health and crop diversification. When input subsidies (seeds, fertilizer, pesticides) are redirected from cotton intensification to mixed farming systems, the overlapping interest between cotton traders and input suppliers weakens.",
          "Mandatory publication of soil health metrics (organic matter, nutrient balance) and pesticide-related health costs per cotton-producing commune. Making environmental and health costs visible makes W computable.",
          "Partially breakable. Cotton monoculture inherently depletes soil nutrients and requires pesticide application. However, integrated pest management and organic cotton production can reduce system dependence — Benin has a growing organic cotton sector.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report pesticide misuse or adulteration to DPQC (Direction de la Promotion de la Qualité et du Conditionnement des Produits Agricoles)",
              "Document health impacts of pesticide exposure in cotton-growing communities — report to local health centers",
              "Report corruption in cotton sector management to the Front des Organisations Nationales contre la Corruption (FONAC)",
            ],
            infra: "DPQC (Direction de la Promotion de la Qualité et du Conditionnement des Produits Agricoles) — the government directorate responsible for agricultural product quality and standards. ABE (Agence Béninoise pour l'Environnement) — Benin's environmental agency, responsible for environmental impact assessment and monitoring. FONAC (Front des Organisations Nationales contre la Corruption) — a national anti-corruption coalition of civil society organizations.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "AIC (Association Interprofessionnelle du Coton): Promote integrated pest management to reduce chemical dependency",
              "Invest in organic cotton certification and premium markets",
              "Adopt soil health monitoring across cotton supply chains",
            ],
            infra: "AIC (Association Interprofessionnelle du Coton) — the inter-professional cotton association coordinating relations between producers, ginners, and input suppliers. SODECO (Société de Développement du Coton) — the main cotton ginning company. The cotton sector was partially liberalized but remains state-coordinated through the AIC framework.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "MAEP (Ministry of Agriculture): Reform cotton input subsidy programs to incentivize sustainable practices",
              "ABE: Strengthen environmental impact monitoring in cotton-growing zones",
              "INSAE (National Statistics Institute): Include soil health and agricultural environmental indicators in national surveys",
            ],
            infra: "MAEP (Ministère de l'Agriculture, de l'Élevage et de la Pêche) — Benin's agriculture ministry, responsible for agricultural policy and cotton sector coordination. ABE (Agence Béninoise pour l'Environnement) — conducts environmental monitoring and impact assessments. INSAE (Institut National de la Statistique et de l'Analyse Économique) — Benin's national statistics institute.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Député in the Assemblée Nationale to demand reform of cotton input subsidies toward sustainable agriculture",
              "Advocate through ECOWAS for regional agricultural sustainability standards",
              "Push for Cotton-4 (Benin, Burkina Faso, Chad, Mali) coordination on sustainable cotton production",
              "Support WTO negotiations on cotton subsidy reform to level the playing field for African producers",
            ],
            infra: "Assemblée Nationale du Bénin — unicameral parliament with 109 members. Citizens can contact their deputies through the official Assembly website. Note: Benin's democratic space has narrowed under recent constitutional reforms, though elections continue. Cotton-4 group — Benin, Burkina Faso, Chad, and Mali coordinate on cotton trade policy at the WTO, advocating against subsidies in developed countries that depress global cotton prices.",
          },
        ],
      },
    ],
  },
  // --- Brunei Darussalam ---
  {
    code: "BN", name: "Brunei Darussalam", region: "Southeast Asia",
    summary: "Small wealthy petrostate ($15.3B GDP) with 24.23% combined oil and gas rents. Brunei Shell Petroleum (BSP, 50/50 JV with Shell) dominates the economy. Absolute monarchy. Wawasan Brunei 2035 diversification strategy underway but oil/gas remain 60%+ of government revenue.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Brunei's oil production is in long-term decline (from 220,000 bpd peak to ~100,000 bpd). As reserves deplete, the overlapping interest between BSP and the government in continued extraction weakens — Wawasan 2035 diversification becomes economically necessary.",
        breakPaths: [
          "Accelerate Wawasan 2035 economic diversification using Brunei Investment Agency (BIA) sovereign wealth. When non-oil sectors generate more government revenue than declining oil production, the overlapping interest in extraction breaks.",
          "Implement per-field emissions disclosure for all BSP and Total operations. Shell's global environmental, social, and governance reporting standards can be extended to Brunei operations to make W computable.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at BSP facilities through Shell's global ethics and compliance channels",
              "Document emissions data gaps — report to the Department of Environment, Parks and Recreation",
              "Use BSP's internal reporting mechanisms for safety and environmental concerns",
            ],
            infra: "BSP (Brunei Shell Petroleum) — a 50/50 joint venture between the government of Brunei and Shell, the country's largest oil and gas producer. BSP operates onshore and offshore fields. Department of Environment, Parks and Recreation — under the Ministry of Development, responsible for environmental policy and regulation. Note: Brunei is an absolute monarchy with no elected legislature. There is no whistleblower protection legislation. Reporting channels are primarily internal corporate mechanisms.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "BSP/Shell: Extend Shell's global net-zero commitments to Brunei operations",
              "BIA (Brunei Investment Agency): Diversify sovereign wealth into renewable energy and technology",
              "Implement Task Force on Climate-Related Financial Disclosures-aligned climate disclosure for all Brunei operations",
            ],
            infra: "BSP (Brunei Shell Petroleum) — managed jointly by the Brunei government and Shell. BIA (Brunei Investment Agency) — the sovereign wealth fund managing Brunei's petroleum revenues (estimated $30-40B). Total E&P Borneo — operates deep water gas fields offshore Brunei. PetroleumBRUNEI — the national petroleum authority overseeing the sector.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "PetroleumBRUNEI: Require emissions monitoring and disclosure for all production licenses",
              "Department of Environment: Strengthen environmental impact assessment requirements",
              "AMBD (Autoriti Monetari Brunei Darussalam): Integrate climate risk into financial supervision",
            ],
            infra: "PetroleumBRUNEI — the national petroleum authority responsible for policy, regulation, and management of Brunei's oil and gas resources. AMBD (Autoriti Monetari Brunei Darussalam) — Brunei's central bank and financial regulator. Department of Energy — under the Prime Minister's Office, coordinates energy policy and the Wawasan 2035 energy diversification strategy.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Advocate through ASEAN for regional renewable energy integration and emissions reduction targets",
              "Support UNFCCC mechanisms for small petrostate transition planning",
              "Push for APEC energy working group initiatives on fossil fuel subsidy reform",
              "Leverage Brunei's ASEAN chairmanship rotations to advance regional climate commitments",
            ],
            infra: "Note: Brunei is an absolute monarchy (Sultan Hassanal Bolkiah). There is no elected legislature — the Legislative Council (Majlis Mesyuarat Negara) is appointed and has advisory functions only. Civic engagement operates through petition to the Sultan and through ASEAN and international multilateral channels. ASEAN — Brunei is a founding member. ASEAN's Framework for Circular Economy and declaration on climate change provide regional engagement mechanisms.",
          },
        ],
      },
    ],
  },
  // --- Bolivia ---
  {
    code: "BO", name: "Bolivia", region: "Latin America",
    summary: "Resource-dependent economy ($54.9B GDP) with significant natural gas reserves (gas=1.85% rents) and mining (min=5.91%, lithium in Salar de Uyuni — world's largest deposit). Agriculture at 8.8% GDP with soy expansion driving deforestation. Gas production declining from mature fields.",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Bolivia holds the world's largest lithium reserves in the Salar de Uyuni. Lithium extraction uses massive water volumes in arid regions. When water consumption and brine chemistry data are published alongside production revenue, W becomes computable.",
        breakPaths: [
          "Require community benefit agreements and water rights guarantees for all lithium extraction. When indigenous communities (who hold constitutional land rights under Bolivia's 2009 Constitution) can negotiate fair terms, the overlapping interest in extraction without consent weakens.",
          "Mandatory publication of water extraction volumes, brine chemistry changes, and downstream ecosystem data per lithium operation. Making environmental costs visible makes W computable from production data.",
          "Partially breakable. Lithium brine extraction inherently alters aquifer chemistry and reduces water availability in arid ecosystems. However, direct lithium extraction (DLE) technology can significantly reduce water consumption compared to evaporation ponds.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at mining operations to the Autoridad de Fiscalización y Control Social de Bosques y Tierra (ABT)",
              "Document water contamination or indigenous rights violations — report to the Defensoría del Pueblo",
              "Report safety violations at mining sites to the Ministry of Labor",
            ],
            infra: "AJAM (Autoridad Jurisdiccional Administrativa Minera) — the mining administrative authority responsible for granting and overseeing mining concessions. Defensoría del Pueblo — Bolivia's human rights ombudsman, responsible for investigating complaints about government actions affecting fundamental rights, including indigenous and environmental rights. Bolivia's 2009 Constitution (Article 30) — guarantees indigenous peoples' right to prior consultation on resource extraction in their territories.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "YLB (Yacimientos de Litio Bolivianos): Adopt DLE technology to minimize water consumption",
              "Implement community benefit sharing agreements with affected indigenous communities",
              "Adopt international sustainability standards (IRMA — Initiative for Responsible Mining Assurance)",
            ],
            infra: "YLB (Yacimientos de Litio Bolivianos) — Bolivia's state lithium company, managing lithium industrialization in the Salar de Uyuni. COMIBOL (Corporación Minera de Bolivia) — the state mining corporation overseeing Bolivia's mining sector. YPFB (Yacimientos Petrolíferos Fiscales Bolivianos) — the state hydrocarbons company.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Ministry of Mining: Strengthen environmental requirements for lithium extraction permits",
              "MMAyA (Ministry of Environment and Water): Enforce water extraction limits in Salar de Uyuni basin",
              "AJAM: Require environmental bonds for all mining concessions",
            ],
            infra: "Ministerio de Minería y Metalurgia — Bolivia's mining ministry, responsible for mining policy and regulation. MMAyA (Ministerio de Medio Ambiente y Agua) — the environment and water ministry, overseeing environmental policy and water resource management. SENARECOM (Servicio Nacional de Registro y Control de la Comercialización de Minerales y Metales) — the national service for mineral commerce registration and control.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Diputado or Senador in the Asamblea Legislativa Plurinacional to demand mandatory prior consultation with indigenous communities for all lithium projects",
              "Support ILO Convention 169 enforcement on indigenous consultation rights in extractive industries",
              "Advocate for international standards on sustainable lithium extraction through the Lithium Triangle coordination (Bolivia, Argentina, Chile)",
              "Push for inclusion of water depletion costs in mining revenue accounting",
            ],
            infra: "Asamblea Legislativa Plurinacional (Plurinational Legislative Assembly) — Bolivia's bicameral parliament consisting of the Cámara de Diputados (130 members) and the Cámara de Senadores (36 members). Bolivia's 2009 Constitution establishes a 'plurinational' state recognizing indigenous rights and communitarian democracy. ILO Convention 169 — Bolivia has ratified ILO Convention 169 on Indigenous and Tribal Peoples, requiring free, prior, and informed consultation on resource extraction in indigenous territories.",
          },
        ],
      },
    ],
  },
  // --- Bahamas ---
  {
    code: "BS", name: "Bahamas, The", region: "Caribbean",
    summary: "Small island economy ($15.8B GDP) dominated by tourism and financial services (77.2% services). Extreme climate vulnerability — low-lying islands face existential risk from sea level rise and intensifying hurricanes (Hurricane Dorian, 2019, caused $3.4B damage — 25% of GDP).",
    sectors: [
      {
        name: "Financial Services", beta: 4.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "The Bahamas' offshore financial center enables capital flows that may avoid tax obligations elsewhere. When beneficial ownership information and tax transparency data are published, the system welfare impact of offshore finance becomes computable.",
        breakPaths: [
          "Implement full beneficial ownership transparency in line with Financial Action Task Force (FATF) recommendations. When the competitive advantage of Bahamian financial secrecy is eliminated through transparency, the overlapping interest between offshore service providers and tax-avoiding clients weakens.",
          "Publish aggregate data on capital flows, tax rulings, and beneficial ownership through enhanced OECD Common Reporting Standard participation. Making tax revenue impacts visible to source jurisdictions makes W computable.",
          "Partially breakable. Financial intermediation can relocate — but the Bahamas' geographic proximity to the US and established legal infrastructure create switching costs that give regulation leverage.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report suspicious transactions to the Financial Intelligence Unit (FIU) of The Bahamas",
              "Document beneficial ownership concealment — report to the Securities Commission of The Bahamas",
              "Report regulatory violations to the Central Bank of The Bahamas",
            ],
            infra: "FIU (Financial Intelligence Unit of The Bahamas) — the agency responsible for receiving, analyzing, and disseminating suspicious transaction reports. The FIU works with law enforcement to combat money laundering and terrorist financing. Securities Commission of The Bahamas — regulates the investment funds industry and securities market. Central Bank of The Bahamas — the prudential regulator of banks and trust companies.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Adopt enhanced due diligence procedures for all client relationships",
              "Implement beneficial ownership transparency standards ahead of regulatory mandates",
              "Integrate climate risk assessment into financial products and client advisory services",
            ],
            infra: "The Bahamas is home to approximately 200 licensed banks and trust companies. Major international banks maintain operations in Nassau. The Bahamas Financial Services Board (BFSB) promotes the financial services sector and coordinates industry standards.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Central Bank: Strengthen beneficial ownership disclosure requirements for all licensed financial institutions",
              "Securities Commission: Enforce Financial Action Task Force (FATF) recommendations on transparency and anti-money laundering",
              "Compliance Commission: Increase supervision of designated non-financial businesses and professions",
            ],
            infra: "Central Bank of The Bahamas — the primary financial regulator and supervisor. The Compliance Commission — supervises non-bank financial service providers for anti-money laundering compliance. Financial Action Task Force (FATF) (Financial Action Task Force) — The Bahamas has been subject to Financial Action Task Force (FATF) enhanced monitoring and has implemented reforms to address identified deficiencies in its AML/CFT framework.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Member of Parliament in the House of Assembly to demand enhanced financial transparency legislation",
              "Support OECD Base Erosion and Profit Shifting (BEPS) Inclusive Framework participation",
              "Leverage the Alliance of Small Island States (AOSIS) to link climate finance to financial transparency commitments",
              "Advocate for Caribbean regional coordination on beneficial ownership transparency",
            ],
            infra: "Parliament of The Bahamas — bicameral legislature consisting of the House of Assembly (39 members) and the Senate (16 appointed members). Citizens can contact their MP through the official government portal. The Bahamas is a Westminster-style parliamentary democracy. AOSIS (Alliance of Small Island States) — The Bahamas is an active member, advocating for climate action and sea level rise mitigation. CARICOM — provides regional coordination on financial regulation.",
          },
        ],
      },
    ],
  },
  // --- Botswana ---
  {
    code: "BW", name: "Botswana", region: "Sub-Saharan Africa",
    summary: "Upper-middle-income economy ($19.4B GDP) with diamond mining historically driving growth (Debswana JV with De Beers). Services-dominant (63.5% GDP). One of Africa's most stable democracies. Diversification challenge as lab-grown diamonds threaten natural diamond demand.",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Lab-grown diamonds are disrupting the natural diamond market (30%+ of gem market by volume). As synthetic alternatives become indistinguishable and cheaper, the overlapping interest between Debswana and consumers in natural diamond premium weakens — Botswana must diversify.",
        breakPaths: [
          "Accelerate economic diversification using Pula Fund sovereign wealth. When non-diamond revenue streams (tech, tourism, beef) exceed declining diamond revenues, the overlapping interest in continued diamond dependence breaks naturally.",
          "Publish full lifecycle environmental data (water use, land disturbance, energy consumption) per carat for all mining operations. Making environmental costs visible makes W computable from diamond production data.",
          "Partially breakable. Open-pit diamond mining inherently disturbs landscapes. However, Botswana's mines are in relatively low-biodiversity Kalahari terrain, and rehabilitation programs can reduce long-term system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at mine sites to DEA (Department of Environmental Affairs)",
              "Document community displacement or inadequate compensation — report to the Ombudsman",
              "Report safety violations to the Department of Mines",
            ],
            infra: "DEA (Department of Environmental Affairs) — under the Ministry of Environment and Tourism, responsible for environmental policy, impact assessment, and monitoring. Department of Mines — under the Ministry of Minerals and Energy, responsible for mining safety regulation, licensing, and compliance monitoring. Office of the Ombudsman — investigates complaints against government agencies and public officials.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Debswana: Develop post-diamond economic transition plan with renewable energy investment",
              "De Beers: Extend lifecycle environmental reporting to all Botswana operations",
              "Adopt Kimberley Process Certification Scheme enhanced standards including environmental metrics",
            ],
            infra: "Debswana Diamond Company — a 50/50 joint venture between the Government of Botswana and De Beers Group, operating the Jwaneng and Orapa mines. Debswana is Botswana's largest private employer and the largest contributor to government revenue. De Beers Group (Anglo American subsidiary) — the global diamond company partnering with Botswana. The 2023 renegotiation of the Debswana agreement gave Botswana a greater share of rough diamond sales.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Ministry of Minerals and Energy: Require environmental bonds for all mining licenses",
              "BURS (Botswana Unified Revenue Service): Ensure mineral royalties reflect true environmental costs",
              "Okavango Diamond Company: Lead on sustainability certification for Botswana diamonds",
            ],
            infra: "Ministry of Minerals and Energy — oversees mining policy and the regulatory framework under the Mines and Minerals Act. BURS (Botswana Unified Revenue Service) — the tax authority responsible for collecting mineral royalties and taxes. Pula Fund — Botswana's sovereign wealth fund (managed by the Bank of Botswana), designed to save diamond revenues for future generations.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Member of Parliament in the National Assembly to demand a comprehensive post-diamond economic diversification strategy",
              "Support African Union Mining Vision implementation for sustainable diamond governance",
              "Advocate for Kimberley Process reform to include environmental and social standards",
              "Push for SADC (Southern African Development Community) coordination on mining sustainability",
            ],
            infra: "National Assembly of Botswana — unicameral parliament with 65 members (57 elected, 8 specially elected). Citizens can contact their MPs through the parliamentary website. Botswana is one of Africa's most stable multiparty democracies, with peaceful transfers of power since independence in 1966. The Ntlo ya Dikgosi (House of Chiefs) — an advisory body representing traditional leaders, with input on matters affecting tribal territories including mining.",
          },
        ],
      },
    ],
  },
  // --- Belarus ---
  {
    code: "BY", name: "Belarus", region: "Europe",
    summary: "State-controlled economy ($76B GDP) with significant manufacturing (20.3% GDP). Potash mining (Belaruskali is one of the world's largest producers). Oil refining (Naftan, Mozyr) processes Russian crude. Authoritarian governance under Lukashenko since 1994.",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Belarus is the world's third-largest potash producer (Belaruskali). Potash mining generates massive salt waste (solukhards) that contaminate groundwater and rivers. When downstream water contamination data is published alongside potash production revenue, W becomes computable.",
        breakPaths: [
          "International sanctions (EU, US, UK since 2021) have already weakened the overlapping interest by restricting Belaruskali's market access. When sanctioned export revenues fall below environmental remediation costs, the economic case for continued expansion breaks.",
          "Satellite-based environmental monitoring (salt waste accumulation, water contamination plumes) published by international organizations. Making environmental damage visible from space bypasses domestic data suppression and makes W computable.",
          "Partially breakable. Potash mining inherently generates salt waste. However, solution mining and backfill techniques can reduce surface waste accumulation and groundwater contamination.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Document environmental violations through secure channels to international environmental organizations",
              "Report safety concerns through ILO complaint mechanisms",
              "Provide data to international monitoring organizations (Belarusian diaspora networks)",
            ],
            infra: "Note: Belarus under Lukashenko is rated 'Not Free' by Freedom House. Independent media, civil society, and trade unions face severe repression. There is no effective whistleblower protection. After the 2020 protests, thousands were imprisoned and major independent organizations were forcibly liquidated. Safe reporting channels include the Belarusian diaspora network, international trade union federations (IndustriALL Global Union), and international environmental organizations.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "International potash buyers: Demand environmental certification as condition of purchase (post-sanctions)",
              "Apply IFC Performance Standards to any future investment in Belarusian mining",
              "Require independent environmental audits as part of off-take agreements",
            ],
            infra: "Belaruskali — Belarus's state-owned potash company, one of the world's largest potash producers. Belaruskali operates six mines near Soligorsk. The company has been under EU, US, and UK sanctions since 2021 following the forced diversion of Ryanair Flight 4978 and repression of democratic opposition. BPC (Belarusian Potash Company) — the former exclusive export trading arm of Belaruskali (sanctioned). Competitors include Nutrien (Canada), Mosaic (US), and K+S (Germany).",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "International sanctions bodies: Maintain and strengthen potash export sanctions until environmental and governance reforms are implemented",
              "UNECE: Continue environmental performance reviews of Belarus under the Convention on Environmental Impact Assessment (Espoo Convention)",
              "IndustriALL: Monitor labor rights conditions at Belaruskali",
            ],
            infra: "Note: Domestic regulatory institutions (Ministry of Natural Resources and Environmental Protection) are not independent under authoritarian governance. International mechanisms include: UNECE (United Nations Economic Commission for Europe) — Belarus is party to the Espoo Convention and the Convention on the Protection and Use of Transboundary Watercourses. EU sanctions framework — Council Regulation (EU) restricting trade with Belaruskali and associated entities.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Support maintenance of international sanctions on Belaruskali until environmental and governance reforms are implemented",
              "Advocate through UNECE for transboundary environmental monitoring of potash mining impacts",
              "Support Belarusian democratic opposition's platform for environmental and governance reform",
              "Push for international environmental damage assessment of Soligorsk mining district",
            ],
            infra: "Note: Belarus has no functioning democratic legislature. The National Assembly (Natsionalnoye Sobranie) is not freely elected. International engagement channels: EU Eastern Partnership framework, OSCE (Organization for Security and Co-operation in Europe), United Nations Human Rights Council Universal Periodic Review. The Belarusian democratic opposition in exile (led by Sviatlana Tsikhanouskaya) maintains a platform including environmental governance reform.",
          },
        ],
      },
    ],
  },
  // --- Congo, Dem. Rep. ---
  {
    code: "CD", name: "Congo, Dem. Rep.", region: "Sub-Saharan Africa",
    summary: "Resource-rich but impoverished economy ($71B GDP). Mining dominates (28.81% of GDP) — world's largest cobalt producer (70%+ global supply), significant copper, coltan, and tin. Conflict minerals remain a governance challenge. Agricultural employment is 60%+ but only 9.6% of GDP.",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "DRC's cobalt is essential for EV batteries — downstream manufacturers (Tesla, Samsung SDI, CATL) face increasing environmental, social, and governance pressure. When supply chain traceability makes mine-level environmental and labor conditions visible to end consumers, W becomes computable from cobalt prices.",
        breakPaths: [
          "Mandatory supply chain due diligence (EU Battery Regulation, US Dodd-Frank Section 1502) that requires full traceability to mine site. When artisanal miners must meet labor and environmental standards to access global markets, the overlapping interest in unregulated extraction weakens.",
          "Blockchain or RMI-style traceability systems linking per-mine environmental and labor data to each cobalt lot. The EU Battery Regulation (effective 2027) will require carbon footprint declarations and due diligence — making W computable per unit of cobalt.",
          "Partially breakable. Mining inherently disturbs landscapes and generates waste. However, formalized artisanal mining with proper safety and environmental management can reduce system dependence compared to unregulated extraction.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental or labor violations at mine sites to international monitoring organizations (IPIS, Global Witness)",
              "Document child labor or unsafe working conditions — report through responsible sourcing audit channels (RMI, LBMA)",
              "Report illegal mineral exports to CEEC (Centre d'Évaluation, d'Expertise et de Certification des substances minérales)",
            ],
            infra: "CEEC (Centre d'Évaluation, d'Expertise et de Certification des substances minérales précieuses et semi-précieuses) — the DRC government agency responsible for evaluating, certifying, and controlling mineral exports. SAEMAPE (Service d'Assistance et d'Encadrement du Small Scale Mining) — the agency responsible for regulating artisanal and small-scale mining. IPIS (International Peace Information Service) — an independent research institute mapping mining sites, armed group presence, and supply chain risks in the DRC. Global Witness — international NGO investigating the links between natural resource exploitation and conflict.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Glencore, CMOC (China Moly): Implement full supply chain traceability to mine site for all DRC cobalt",
              "Adopt IRMA (Initiative for Responsible Mining Assurance) certification for industrial operations",
              "Invest in formalization programs for artisanal mining communities",
            ],
            infra: "Glencore — operates Mutanda and Katanga Mining (KCC) copper-cobalt mines, among the world's largest. CMOC (China Molybdenum Co.) — operates Tenke Fungurume, one of the world's largest copper-cobalt mines. Entreprise Générale du Cobalt (EGC) — state-backed enterprise intended to monopolize artisanal cobalt purchasing (established 2019). RMI (Responsible Minerals Initiative) — industry-led supply chain due diligence program used by electronics and automotive manufacturers.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Ministry of Mines: Enforce 2018 Mining Code environmental provisions including community development obligations",
              "CEEC: Strengthen mineral certification to include environmental and labor compliance data",
              "Cellule Technique de Coordination et de Planification Minière (CTCPM): Improve artisanal mining registration and oversight",
            ],
            infra: "Ministry of Mines — oversees mining policy, licensing, and the 2018 Mining Code (Code Minier), which increased royalty rates and introduced strategic substance classification for cobalt. CTCPM (Cellule Technique de Coordination et de Planification Minière) — the technical coordination unit for mining sector planning. ITSCI (ITRI Tin Supply Chain Initiative) — a traceability program for tin, tantalum, and tungsten (3T) minerals from the DRC.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Député national or Sénateur in the Parlement to demand enforcement of the 2018 Mining Code environmental provisions",
              "Support EU Battery Regulation implementation requiring full cobalt supply chain traceability",
              "Advocate through the African Union for continental responsible mining standards",
              "Push for OECD Due Diligence Guidance enforcement for all minerals sourced from DRC",
            ],
            infra: "Parlement de la République démocratique du Congo — bicameral legislature consisting of the Assemblée nationale (500 members) and the Sénat (108 members). The DRC is a semi-presidential republic but governance capacity is limited outside major urban centers. EU Battery Regulation (2023/1542) — effective 2027, requires carbon footprint declarations, recycled content minimums, and supply chain due diligence for batteries containing cobalt. OECD Due Diligence Guidance for Responsible Supply Chains of Minerals from Conflict-Affected and High-Risk Areas — the international standard for mineral supply chain responsibility.",
          },
        ],
      },
    ],
  },
  // --- Congo, Rep. ---
  {
    code: "CG", name: "Congo, Rep.", region: "Sub-Saharan Africa",
    summary: "Oil-dependent economy ($15.7B GDP) with 34.74% combined oil and gas rents — one of Sub-Saharan Africa's highest. TotalEnergies and Eni are major operators. Governance challenges with long-ruling president (Sassou Nguesso since 1997). Significant tropical forest cover.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Congo-Brazzaville's oil production is in long-term decline from mature offshore fields. As extraction costs rise and reserves deplete, the overlapping interest between international operators and government revenue weakens — diversification becomes necessary.",
        breakPaths: [
          "Redirect oil revenues to economic diversification (forestry, agriculture, services) through transparent budget allocation. When non-oil sectors generate more employment and revenue, the overlapping interest in continued extraction from depleting fields breaks.",
          "Implement EITI-standard per-block revenue and emissions disclosure. Congo joined EITI in 2004 — extending to environmental data makes W computable per production unit.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations at oil facilities to the Ministry of Environment",
              "Document revenue discrepancies — report to EITI Congo multi-stakeholder group",
              "Report concerns to international operator compliance channels (TotalEnergies, Eni)",
            ],
            infra: "Ministère de l'Environnement, du Développement Durable et du Bassin du Congo — the environment ministry. SNPC (Société Nationale des Pétroles du Congo) — the national oil company. EITI Congo — the Republic of Congo has been an EITI member since 2004. Note: Whistleblower protections are minimal under current governance.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "TotalEnergies, Eni: Implement Paris-aligned transition plans for Congo operations",
              "SNPC: Develop economic diversification strategy using petroleum revenues",
              "Adopt per-block emissions reporting standards",
            ],
            infra: "TotalEnergies — the largest oil operator in Congo-Brazzaville, operating the Moho Nord deepwater project and other fields. Eni — operates significant offshore concessions. SNPC (Société Nationale des Pétroles du Congo) — the national oil company holding state equity in all production sharing contracts.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "Ministry of Hydrocarbons: Strengthen environmental conditions in production sharing contracts",
              "EITI Congo: Expand reporting to include environmental impact data",
              "Central Bank (BEAC): Integrate resource revenue volatility risk into macroprudential supervision",
            ],
            infra: "Ministère des Hydrocarbures — oversees oil and gas policy and licensing. BEAC (Banque des États de l'Afrique Centrale) — the central bank of the CEMAC monetary zone (shared with Cameroon, CAR, Chad, Equatorial Guinea, Gabon). EITI Congo — publishes annual reports on extractive industry revenues.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Advocate through CEMAC for regional environmental standards in oil and gas extraction",
              "Support EITI enhanced reporting with environmental metrics",
              "Push for Central African Forest Initiative (CAFI) enforcement on forest protection as alternative revenue source",
              "Leverage UNFCCC mechanisms for fossil fuel transition support",
            ],
            infra: "Note: Congo-Brazzaville under President Sassou Nguesso is rated 'Not Free' by Freedom House. The Assemblée nationale (151 members) and Sénat (72 members) do not function as independent democratic institutions. International engagement channels: CEMAC (Communauté Économique et Monétaire de l'Afrique Centrale), African Union, CAFI (Central African Forest Initiative) — a partnership between Central African countries and donors to protect tropical forests.",
          },
        ],
      },
    ],
  },
  // --- Cote d'Ivoire ---
  {
    code: "CI", name: "Cote d'Ivoire", region: "Sub-Saharan Africa",
    summary: "Largest economy in francophone West Africa ($87.1B GDP). World's largest cocoa producer (~45% of global supply). Agriculture is 15.9% of GDP with cocoa, coffee, and palm oil as main cash crops. Growing oil production (oil=0.7%). Rapid economic growth (~7% annual average).",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Côte d'Ivoire's cocoa monoculture has driven 80%+ of original forest loss. EU Deforestation Regulation (EUDR) will require deforestation-free supply chains — when per-farm deforestation data is linked to cocoa transactions, W becomes computable.",
        breakPaths: [
          "EU Deforestation Regulation compliance forces traceability to farm level. When cocoa buyers must verify zero-deforestation, the overlapping interest between traders and smallholders in clearing forest for new plantations breaks — agroforestry becomes the viable model.",
          "Mandatory per-farm environmental data (tree cover, soil carbon, water use) linked to cocoa lot traceability. The Cocoa and Forests Initiative already creates a framework — extending to mandatory data makes W computable from cocoa prices.",
          "Partially breakable. Cocoa monoculture inherently reduces biodiversity compared to native forest. However, cocoa agroforestry systems can maintain significant tree cover and biodiversity — Côte d'Ivoire's National REDD+ Strategy includes agroforestry targets.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report illegal deforestation for cocoa expansion to SODEFOR (Société de Développement des Forêts) or OIPR (Office Ivoirien des Parcs et Réserves)",
              "Document child labor in cocoa production — report to CNS (Comité National de Surveillance des actions de lutte contre le travail des enfants)",
              "Report pesticide misuse — notify ANADER (Agence Nationale d'Appui au Développement Rural)",
            ],
            infra: "SODEFOR (Société de Développement des Forêts) — the state forestry company responsible for managing classified forests, many of which have been illegally cleared for cocoa. OIPR (Office Ivoirien des Parcs et Réserves) — manages national parks and protected areas. CNS (Comité National de Surveillance) — the national committee monitoring child labor in cocoa, coordinated with the International Cocoa Initiative (ICI). ANADER — the national rural development support agency providing agricultural extension services.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "Cocoa traders (Cargill, Barry Callebaut, Olam): Implement full farm-level traceability ahead of EUDR deadline",
              "Invest in cocoa agroforestry systems that maintain tree cover while improving yields",
              "Adopt living income reference price commitments for cocoa farmers",
            ],
            infra: "Major cocoa traders operating in Côte d'Ivoire: Cargill, Barry Callebaut, Olam International, Sucden. These companies intermediate the majority of Ivorian cocoa exports. Cocoa and Forests Initiative (CFI) — a public-private partnership between cocoa-producing countries (Côte d'Ivoire, Ghana) and leading chocolate companies to end deforestation in cocoa supply chains. The Conseil du Café-Cacao (CCC) — the Ivorian cocoa board that sets farmgate prices and regulates the sector.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "CCC (Conseil du Café-Cacao): Enforce traceability requirements and link farmgate prices to environmental compliance",
              "MINEDD (Ministry of Environment): Strengthen enforcement against deforestation in classified forests",
              "ANADER: Scale agroforestry extension programs to all cocoa-growing regions",
            ],
            infra: "CCC (Conseil du Café-Cacao) — the government body regulating Côte d'Ivoire's cocoa and coffee sectors, setting minimum farmgate prices, managing quality standards, and overseeing exports. MINEDD (Ministère de l'Environnement et du Développement Durable) — the environment ministry responsible for forest protection, climate policy, and environmental regulation.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Député in the Assemblée nationale to demand enforcement of the Forest Code and protection of classified forests",
              "Support EU Deforestation Regulation implementation with adequate transition support for smallholder farmers",
              "Advocate through the Cocoa and Forests Initiative for binding deforestation targets",
              "Push for living income benchmarks in international cocoa pricing through ICCO",
            ],
            infra: "Assemblée nationale de Côte d'Ivoire — unicameral parliament with 255 members. Citizens can contact deputies through the official Assembly website. Sénat — the upper house (99 members, established 2020). ICCO (International Cocoa Organization) — the intergovernmental body coordinating global cocoa policy, headquartered in Abidjan. EU Deforestation Regulation (EUDR, 2023/1115) — requires EU importers to verify that commodities including cocoa are not linked to deforestation after December 2020.",
          },
        ],
      },
    ],
  },
  // --- Chile ---
  {
    code: "CL", name: "Chile", region: "Latin America",
    summary: "Upper-middle-income economy ($330.3B GDP) with massive mining sector (16.23% of GDP). World's largest copper producer (~27% of global supply) and second-largest lithium producer. Strong institutions and democratic governance. Renewable energy leader in Latin America (solar in Atacama).",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Chile's copper and lithium mining depletes water resources in the Atacama Desert (one of Earth's driest regions). When per-mine water consumption data is published alongside production revenue, W becomes computable from mining output data.",
        breakPaths: [
          "Implement water pricing that reflects true scarcity in mining regions. When miners pay the real cost of water extraction in hyper-arid zones, the overlapping interest in water-intensive extraction methods weakens — desalination and dry processing become economically preferred.",
          "Mandatory per-mine water balance, tailings chemistry, and emissions disclosure. Chile's SMA (Superintendencia del Medio Ambiente) already collects environmental data — making it publicly accessible per mine makes W computable.",
          "Partially breakable. Mining inherently disturbs landscapes. However, dry processing, desalination, and tailings reprocessing can significantly reduce water dependence and waste generation.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations to SMA (Superintendencia del Medio Ambiente)",
              "Document water rights violations — report to DGA (Dirección General de Aguas)",
              "Use Chile's whistleblower law (Ley 21.015) and environmental complaint channels (denuncia ambiental) for protected reporting",
            ],
            infra: "SMA (Superintendencia del Medio Ambiente) — Chile's environmental enforcement agency, responsible for monitoring compliance with environmental permits (RCA — Resolución de Calificación Ambiental). SMA can impose fines up to $8.2M and order facility closure. DGA (Dirección General de Aguas) — the national water authority managing water rights and monitoring extraction. SEA (Servicio de Evaluación Ambiental) — conducts environmental impact assessments for mining projects.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: [
              "CODELCO (state copper company): Transition to desalinated water for all operations",
              "Adopt Science Based Targets for emissions reduction across mining operations",
              "Implement ICMM Mining Principles including tailings management standards",
            ],
            infra: "CODELCO (Corporación Nacional del Cobre) — Chile's state-owned copper company and the world's largest copper producer. CODELCO operates Chuquicamata, El Teniente, and other major mines. SQM (Sociedad Química y Minera de Chile) — one of the world's largest lithium producers, operating in the Salar de Atacama. Albemarle — US company operating lithium extraction in the Salar de Atacama alongside SQM. BHP, Anglo American — major international copper mining companies operating in Chile.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: [
              "SMA: Increase environmental monitoring frequency and enforce water extraction limits at mining operations",
              "Sernageomin: Strengthen tailings dam safety standards (Chile has 740+ tailings facilities)",
              "Ministry of Mining: Implement the National Lithium Strategy with binding environmental standards",
            ],
            infra: "Sernageomin (Servicio Nacional de Geología y Minería) — the national geological and mining service, responsible for mine safety, tailings dam oversight, and geological surveys. Chile has over 740 tailings facilities, the largest inventory in the world. Ministry of Mining — oversees mining policy including the 2023 National Lithium Strategy, which established state-led lithium development through public-private partnerships.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: [
              "Contact your Diputado or Senador in the Congreso Nacional to demand mandatory water-neutral mining operations through desalination requirements",
              "Support the Escazú Agreement on environmental access rights in Latin America (Chile has not ratified)",
              "Advocate for OECD Due Diligence Guidance enforcement for mining supply chains",
              "Push for international coordination on critical mineral sustainability standards through the Minerals Security Partnership",
            ],
            infra: "Congreso Nacional de Chile — bicameral legislature consisting of the Cámara de Diputadas y Diputados (155 members) and the Senado (50 members). Citizens can contact representatives through camara.cl and senado.cl. Chile is an OECD member with strong democratic institutions. Escazú Agreement — the Regional Agreement on Access to Information, Public Participation and Justice in Environmental Matters in Latin America and the Caribbean. Chile signed but has not ratified.",
          },
        ],
      },
    ],
  },
  // --- Cameroon ---
  {
    code: "CM", name: "Cameroon", region: "Sub-Saharan Africa",
    summary: "Central African economy ($53.3B GDP) with oil production (2.94% combined rents) and significant agriculture (18.5% GDP — cocoa, palm oil, timber). Forest cover declining due to logging and agricultural expansion. Governance challenges and Anglophone crisis.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Cameroon's oil production is declining from mature fields. As extraction costs rise, the overlapping interest between operators (Perenco, Addax) and government revenue weakens — diversification to sustainable forestry and agriculture becomes economically rational.",
        breakPaths: [
          "Redirect declining oil revenues to sustainable forest management and agricultural diversification. Cameroon's forests are a carbon sink worth more standing than cleared. When REDD+ payments exceed marginal oil revenue, the overlapping interest in continued extraction breaks.",
          "Implement EITI-standard per-block environmental disclosure. Cameroon's EITI membership provides the framework — extending to environmental data makes W computable.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: [
              "Report environmental violations to MINEPDED (Ministry of Environment, Nature Protection and Sustainable Development)",
              "Document illegal logging or land seizures — report to international forestry monitoring organizations (Global Forest Watch)",
              "Report through EITI Cameroon multi-stakeholder channels",
            ],
            infra: "MINEPDED (Ministère de l'Environnement, de la Protection de la Nature et du Développement Durable) — Cameroon's environment ministry. SNH (Société Nationale des Hydrocarbures) — the national hydrocarbons company managing state interests in oil and gas. EITI Cameroon — member since 2007. Note: Whistleblower protections are limited.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Perenco, Addax/Sinopec: Implement environmental monitoring and emissions reporting for all Cameroon operations", "SNH: Develop post-oil diversification strategy", "Adopt Task Force on Climate-Related Financial Disclosures-aligned climate disclosure"],
            infra: "Perenco — the largest oil producer in Cameroon. Addax Petroleum (Sinopec subsidiary) — operates offshore concessions. SNH manages the state's petroleum interests and holds equity in production sharing contracts.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["MINMIDT (Ministry of Mines): Strengthen environmental conditions in production licenses", "MINEPDED: Enforce environmental impact assessment requirements", "EITI Cameroon: Expand reporting to environmental data"],
            infra: "MINMIDT (Ministère des Mines, de l'Industrie et du Développement Technologique) — oversees mining and industrial policy. CONAC (Commission Nationale Anti-Corruption) — Cameroon's anti-corruption commission.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your Député in the Assemblée nationale to demand transparent management of declining oil revenues", "Support CAFI (Central African Forest Initiative) for forest conservation as alternative revenue", "Advocate through CEMAC for regional environmental standards", "Push for EITI enhanced reporting"],
            infra: "Assemblée nationale du Cameroun — 180 members. Sénat — 100 members. Note: Cameroon's democratic institutions are constrained under long-ruling President Paul Biya (in power since 1982). International channels: CEMAC, African Union, CAFI.",
          },
        ],
      },
    ],
  },
  // --- Colombia ---
  {
    code: "CO", name: "Colombia", region: "Latin America",
    summary: "Major Latin American economy ($418.8B GDP) with significant oil (3.42% rents) and coal (0.73% rents) production. Ecopetrol is the largest company. Biodiversity hotspot (most biodiverse country per square kilometer). 2016 peace agreement with FARC opened new governance challenges in former conflict zones.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Colombia's current administration (Petro, 2022-) has announced a policy of no new oil exploration licenses. If maintained, the overlapping interest in fossil fuel expansion breaks as existing fields deplete. Colombia's renewable potential (hydro, solar, wind) provides viable alternatives.",
        breakPaths: [
          "Maintain and implement the no-new-exploration-licenses policy while investing transition revenues in renewable energy. When energy investment flows shift from fossil to renewable, the overlapping interest in continued exploration breaks.",
          "Mandatory per-field emissions disclosure for all Ecopetrol and international operator fields. Colombia's ANH (Agencia Nacional de Hidrocarburos) already collects production data — extending to emissions makes W computable.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report environmental violations to ANLA (Autoridad Nacional de Licencias Ambientales)", "Document community health impacts near oil operations — report to Defensoría del Pueblo", "Report through Ecopetrol's ethics line or international operator compliance channels"],
            infra: "ANLA (Autoridad Nacional de Licencias Ambientales) — Colombia's environmental licensing authority, responsible for environmental impact assessment and compliance monitoring for extractive projects. Defensoría del Pueblo — the national human rights ombudsman. Contraloría General de la República — the national audit office overseeing public resource management including oil revenues.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Ecopetrol: Accelerate energy transition strategy with binding renewable targets", "Implement Task Force on Climate-Related Financial Disclosures-aligned reporting across all operations", "Invest in renewable energy in post-conflict zones to provide economic alternatives"],
            infra: "Ecopetrol — Colombia's largest company (88.5% state-owned), responsible for most domestic oil production. Ecopetrol has announced energy transition targets but continues significant upstream investment. ANH (Agencia Nacional de Hidrocarburos) — manages exploration and production contracts.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["MinAmbiente: Strengthen environmental licensing for extractive projects in biodiverse regions", "CREG: Reform energy tariffs to accelerate renewable energy deployment", "ANH: Implement per-field emissions monitoring"],
            infra: "MinAmbiente (Ministerio de Ambiente y Desarrollo Sostenible) — Colombia's environment ministry. CREG (Comisión de Regulación de Energía y Gas) — the energy regulatory commission. CAR (Corporaciones Autónomas Regionales) — regional environmental authorities.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your Representante or Senador in the Congreso to support the energy transition framework legislation", "Strengthen Colombia's NDC with binding sectoral emissions reduction targets", "Leverage OECD membership to advance environmental governance standards", "Support the Leticia Pact for Amazon conservation as alternative economic model"],
            infra: "Congreso de la República de Colombia — bicameral legislature: Cámara de Representantes (188 members) and Senado (108 members). Contact through camara.gov.co and senado.gov.co. Colombia is an OECD member (2020) with strong democratic institutions. The 2016 Peace Agreement (Acuerdo de Paz) created new governance frameworks for former conflict zones that intersect with extractive industry regulation.",
          },
        ],
      },
    ],
  },
  // --- Costa Rica ---
  {
    code: "CR", name: "Costa Rica", region: "Latin America",
    summary: "Upper-middle-income economy ($95.4B GDP) with 98%+ renewable electricity generation. No military since 1948. Services-dominant (68.8% GDP). Leader in ecotourism and environmental policy. Low direct fossil fuel extraction. Main Private-Systemic Tension exposure through agricultural monoculture (pineapple, banana, palm oil).",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Costa Rica's pineapple and banana monoculture uses intensive pesticide application that contaminates waterways. When per-farm pesticide runoff and water contamination data is published alongside export revenue, W becomes computable.",
        breakPaths: [
          "Reform agricultural export incentives to reward biodiversity-positive farming. When export tax benefits require environmental certification, the overlapping interest between monoculture producers and exporters in chemical-intensive production weakens.",
          "Mandatory per-farm water quality monitoring downstream of monoculture operations. Costa Rica's AyA (water utility) and SINAC already collect water data — linking to agricultural output makes W computable.",
          "Partially breakable. Tropical monoculture inherently reduces biodiversity. However, Costa Rica's Payment for Environmental Services (PSA) program demonstrates viable alternatives.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report pesticide violations to SFE (Servicio Fitosanitario del Estado)", "Document water contamination — report to MINAE (Ministry of Environment) or AyA", "Use Costa Rica's labor protections and environmental complaint mechanisms"],
            infra: "SFE (Servicio Fitosanitario del Estado) — the state phytosanitary service regulating pesticide use. MINAE (Ministerio de Ambiente y Energía) — the environment and energy ministry. AyA (Instituto Costarricense de Acueductos y Alcantarillados) — the national water utility. SETENA (Secretaría Técnica Nacional Ambiental) — conducts environmental impact assessments.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Agricultural exporters (Del Monte, Dole, Chiquita): Adopt pesticide reduction targets", "Invest in organic certification and agroforestry transitions", "Implement watershed-level environmental monitoring"],
            infra: "Costa Rica hosts operations of major fruit multinationals: Del Monte, Dole, Chiquita. CORBANA (Corporación Bananera Nacional) — the national banana corporation coordinating the sector. CANAPEP (Cámara Nacional de Productores y Exportadores de Piña) — the pineapple producers' association.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["MAG (Ministry of Agriculture): Reform export incentives to require environmental certification", "MINAE: Strengthen pesticide regulations and enforce water quality standards near monoculture areas", "SETENA: Require cumulative environmental impact assessments for monoculture expansion"],
            infra: "MAG (Ministerio de Agricultura y Ganadería) — Costa Rica's agriculture ministry. The PSA (Pago por Servicios Ambientales) program — Costa Rica's pioneering payment for environmental services program, which pays landowners to maintain forest cover, funded partly by a fuel tax.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your Diputado in the Asamblea Legislativa to demand pesticide reduction legislation for monoculture agriculture", "Support the Escazú Agreement implementation (Costa Rica was an early advocate)", "Leverage Costa Rica's environmental reputation to advance international agricultural sustainability standards", "Push for green trade provisions in bilateral agreements"],
            infra: "Asamblea Legislativa de Costa Rica — unicameral parliament with 57 members. Citizens can contact representatives through asamblea.go.cr. Costa Rica is one of Latin America's strongest democracies and a global environmental leader. The Escazú Agreement — Costa Rica was one of the first signatories of this regional agreement on environmental access rights.",
          },
        ],
      },
    ],
  },
  // --- Cuba ---
  {
    code: "CU", name: "Cuba", region: "Caribbean",
    summary: "Command economy ($107.4B GDP, though estimates vary due to dual currency system). Services-dominant (73.5% GDP, driven by healthcare, education, tourism). Minimal resource extraction. Economic crisis exacerbated by US embargo and collapse of Venezuelan oil subsidies.",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Cuba's sugar industry collapsed after Soviet subsidies ended, but remaining agriculture (state farms, cooperatives) relies on monoculture patterns. Cuba's organic farming necessity (post-Soviet fertilizer shortage) demonstrates alternative models. Making soil health data visible breaks system independence.",
        breakPaths: [
          "Expand the urban agriculture and organoponics model that Cuba developed out of necessity. When organic production meets domestic food needs more reliably than import-dependent monoculture, the overlapping interest in conventional agriculture breaks.",
          "Publish soil health, water quality, and biodiversity data from Cuba's extensive agricultural research system. Cuba's scientific institutions (INIFAT, ICA) generate data that could make W computable.",
          "Partially breakable. Cuba's experience with organic farming post-1991 shows that system dependence on chemical inputs can be dramatically reduced through agroecological methods.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Document environmental degradation through academic research channels", "Report through workplace union structures (CTC — Central de Trabajadores de Cuba)", "Engage with international agricultural research partnerships"],
            infra: "Note: Cuba is a one-party state. Independent civil society, media, and labor organizations are not permitted. Reporting channels operate within state structures. CTC (Central de Trabajadores de Cuba) — the state-controlled trade union federation. INIFAT (Instituto Nacional de Investigaciones Fundamentales en Agricultura Tropical) — the national agricultural research institute. CITMA (Ministerio de Ciencia, Tecnología y Medio Ambiente) — the science and environment ministry.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["State agricultural enterprises: Scale organoponics and agroecological methods", "AZCUBA: Diversify sugar industry toward bioenergy and specialty products", "International partners: Support technology transfer for sustainable agriculture"],
            infra: "AZCUBA (Empresa Azucarera) — Cuba's state sugar enterprise. State agricultural enterprises and UBPCs (Unidades Básicas de Producción Cooperativa) — cooperatives managing most agricultural production. Cuba's urban agriculture program is one of the world's most successful, producing significant food in cities through organoponics.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["MINAG: Expand support for agroecological transition", "CITMA: Strengthen environmental monitoring of agricultural practices", "INIFAT: Publish research on agroecological transition outcomes"],
            infra: "MINAG (Ministerio de la Agricultura) — Cuba's agriculture ministry. CITMA — oversees environmental policy and scientific research. The Asociación Nacional de Agricultores Pequeños (ANAP) — the national small farmers' association, which has been a key partner in agroecological transition.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Support FAO technical cooperation programs for Cuban agricultural sustainability", "Advocate through CELAC for regional agricultural knowledge exchange", "Push for relaxation of US embargo restrictions on agricultural technology transfer", "Support South-South cooperation on agroecological methods developed in Cuba"],
            infra: "Note: Cuba's Asamblea Nacional del Poder Popular (605 members) is the legislature but functions within a one-party system. International engagement channels: FAO (Cuba has received recognition for reducing hunger), CELAC (Community of Latin American and Caribbean States), NAM (Non-Aligned Movement). Cuba's agroecological experience is studied globally as a model for post-petrochemical agriculture.",
          },
        ],
      },
    ],
  },
  // --- Cyprus ---
  {
    code: "CY", name: "Cyprus", region: "Europe",
    summary: "Small EU island economy ($37.6B GDP) with dominant services sector (76.5% GDP, driven by financial services, shipping, and tourism). No significant resource extraction. Post-2013 banking crisis reforms strengthened financial regulation. Division between Republic of Cyprus and northern territory.",
    sectors: [
      {
        name: "Financial Services", beta: 4.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Cyprus's financial services sector has historically facilitated capital flows from Russia and other jurisdictions. EU AML directives and beneficial ownership transparency requirements make the welfare impact of opaque financial intermediation computable.",
        breakPaths: [
          "Full implementation of EU Anti-Money Laundering Directives and beneficial ownership transparency. When financial secrecy is eliminated, the overlapping interest between Cypriot service providers and clients seeking opacity weakens.",
          "Mandatory publication of Country-by-Country Reporting (CbCR) data for entities registered in Cyprus. EU ATAD and DAC6 frameworks provide the mechanism — making tax planning structures visible breaks system independence.",
          "Partially breakable. Financial intermediation can relocate — but Cyprus's EU membership, common law heritage, and timezone advantages create switching costs.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report suspicious transactions to MOKAS (Unit for Combating Money Laundering)", "Document beneficial ownership concealment — report to CySEC (Cyprus Securities and Exchange Commission)", "Use EU Whistleblower Directive protections (transposed 2022)"],
            infra: "MOKAS (Μονάδα Καταπολέμησης Αδικημάτων Συγκάλυψης / Unit for Combating Money Laundering) — Cyprus's financial intelligence unit. CySEC (Cyprus Securities and Exchange Commission) — the securities and financial markets regulator. CBC (Central Bank of Cyprus) — the prudential supervisor of banks. Cyprus transposed the EU Whistleblower Directive in 2022.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Implement enhanced due diligence for all high-risk client relationships", "Adopt full beneficial ownership transparency ahead of EU AMLD6 requirements", "Integrate environmental, social, and governance criteria into financial advisory services"],
            infra: "Cyprus hosts approximately 40 licensed banks and numerous investment firms. The Cyprus Investment Firms sector manages significant cross-border capital flows. CIFA (Cyprus Investment Funds Association) — the industry association representing investment fund managers.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["CySEC: Strengthen beneficial ownership verification requirements", "CBC: Enforce enhanced AML due diligence for correspondent banking relationships", "ICPAC (Institute of Certified Public Accountants): Ensure audit firms enforce transparency standards"],
            infra: "CySEC — responsible for securities regulation and investment firm supervision. CBC (Central Bank of Cyprus) — conducts banking supervision and AML compliance monitoring. ICPAC — the professional body for accountants and auditors in Cyprus.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your Βουλευτής in the Βουλή των Αντιπροσώπων (House of Representatives) to demand full implementation of EU AML directives", "Support EU AMLD6 negotiations for enhanced transparency requirements", "Advocate for OECD Base Erosion and Profit Shifting Inclusive Framework strengthening", "Push for EU-wide beneficial ownership registry interconnection"],
            infra: "Βουλή των Αντιπροσώπων (House of Representatives) — unicameral parliament with 56 elected members (80 seats including 24 reserved for Turkish Cypriot community). Contact through parliament.cy. Cyprus is an EU member with robust democratic institutions. Moneyval (Council of Europe's Committee of Experts on the Evaluation of Anti-Money Laundering Measures) evaluates Cyprus's AML framework.",
          },
        ],
      },
    ],
  },
  // --- Czechia ---
  {
    code: "CZ", name: "Czechia", region: "Europe",
    summary: "Central European industrial economy ($347B GDP) with strong manufacturing (19.9% GDP, automotive-dominated). Small coal sector (lignite in northern Bohemia). EU member. Significant nuclear energy capacity (Dukovany, Temelín). Services at 60.2% GDP.",
    sectors: [
      {
        name: "Coal", beta: 6.1,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Czechia's lignite mining is concentrated in the Ústí nad Labem region (Sokolovská uhelná, Severní energetická). EU ETS carbon pricing makes Czech lignite uncompetitive — the overlapping interest between mine operators and local employment breaks when carbon costs exceed revenue.",
        breakPaths: [
          "Align with EU ETS carbon pricing and eliminate free allowances for Czech lignite power. When plants pay the full carbon price, lignite electricity becomes more expensive than alternatives and the overlapping interest breaks.",
          "Mandatory per-plant emissions and health-impact reporting. Czech lignite plants cause significant air pollution — publishing health costs per MWh makes W computable.",
          "Not breakable. Lignite combustion releases CO₂ and pollutants by physical process.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report emissions violations to ČIŽP (Czech Environmental Inspectorate)", "Document health impacts in mining communities — report to regional public health authorities", "Use the Czech whistleblower protection law (zákon o ochraně oznamovatelů, 2023)"],
            infra: "ČIŽP (Česká inspekce životního prostředí / Czech Environmental Inspectorate) — the enforcement agency for environmental law, conducting inspections and imposing sanctions. MŽP (Ministerstvo životního prostředí / Ministry of the Environment) — oversees environmental policy. Zákon o ochraně oznamovatelů (Act on Protection of Whistleblowers, 2023) — Czech transposition of EU Whistleblower Directive.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["ČEZ (majority state-owned): Accelerate coal phase-out timeline and renewable energy investment", "Sev.en Energy: Develop mine closure and site remediation plans", "Invest in nuclear energy expansion as baseload alternative"],
            infra: "ČEZ Group — Czechia's largest energy company (70% state-owned), operating coal, nuclear, and renewable power plants. Sev.en Energy — the largest private lignite mining and power company. Sokolovská uhelná — operates lignite mines in the Sokolov basin.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["ERÚ: Reform electricity tariffs to reflect carbon costs", "MŽP: Strengthen air quality enforcement in mining regions", "Czech Coal Commission: Implement recommendations on coal phase-out by 2033"],
            infra: "ERÚ (Energetický regulační úřad / Energy Regulatory Office) — the independent energy regulator. Czech Coal Commission (Uhelná komise) — established to recommend a coal phase-out date. Recommended 2033, but implementation timelines remain debated.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your Poslanec or Senátor in the Parlament to demand a binding coal phase-out timeline with just transition measures", "Support EU Just Transition Fund allocation for Ústí nad Labem and Moravian-Silesian regions", "Advocate for accelerated EU ETS reform", "Push for Territorial Just Transition Plans with concrete retraining programs"],
            infra: "Parlament České republiky — bicameral: Poslanecká sněmovna (200 members) and Senát (81 members). Contact through psp.cz and senat.cz. EU Just Transition Fund — Czechia is eligible for significant funding for coal-dependent regions.",
          },
        ],
      },
    ],
  },
  // --- Denmark ---
  {
    code: "DK", name: "Denmark", region: "Europe",
    summary: "Advanced Nordic economy ($424.5B GDP) with global leadership in wind energy (Vestas, Ørsted). Intensive livestock agriculture (28M pigs for 5.8M people) creates significant nitrogen pollution. Services at 63.5% GDP. World's most ambitious climate law (70% reduction by 2030).",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Denmark's intensive pig farming generates nitrogen pollution visible in marine dead zones (inner Danish waters, Baltic Sea). EU Nitrates Directive compliance data makes W computable from farm-level nitrogen balance sheets.",
        breakPaths: [
          "Reform agricultural subsidies to penalize nitrogen surplus per hectare. When the overlapping interest between livestock producers and feed importers is broken by internalizing the nitrogen externality, intensive livestock becomes unprofitable without subsidy.",
          "Mandatory farm-level nitrogen and phosphorus balance disclosure. Denmark already has one of Europe's most detailed agricultural data systems — extending to mandatory public disclosure makes W computable.",
          "Partially breakable. Intensive livestock inherently concentrates nutrients beyond ecosystem absorption. However, Denmark's leadership in biogas from manure demonstrates system dependence can be reduced through circular nutrient management.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report nitrogen limit violations to Miljøstyrelsen (Danish Environmental Protection Agency)", "Document animal welfare violations — report to Fødevarestyrelsen", "Use Danish whistleblower law (Lov om beskyttelse af whistleblowere, 2021)"],
            infra: "Miljøstyrelsen — responsible for environmental regulation including agricultural emissions and water quality. Fødevarestyrelsen (Danish Veterinary and Food Administration) — oversees food safety and animal welfare. Danish Whistleblower Act (2021) — transposition of EU Directive 2019/1937.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Danish Crown, Arla: Invest in plant-based protein alternatives", "Implement nitrogen-neutral farming targets across supply chains", "Adopt Scope 3 agricultural emissions reporting"],
            infra: "Danish Crown — one of Europe's largest meat processors (farmer cooperative). Arla Foods — multinational dairy cooperative headquartered in Denmark. DLG Group — major agricultural input cooperative.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["Miljøministeriet: Tighten nitrogen quotas for marine ecosystem recovery", "Landbrugsstyrelsen: Reform CAP eco-scheme payments to reward nitrogen-negative farming", "Implement the 2021 agreement on green transition of Danish agriculture (55-65% emissions reduction by 2030)"],
            infra: "Miljøministeriet (Ministry of Environment) — environmental policy including agricultural regulation. Landbrugsstyrelsen (Danish Agricultural Agency) — administers CAP payments. The 2021 green agriculture agreement is one of Europe's most ambitious.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your member of the Folketing to demand enforcement of agricultural nitrogen reduction targets", "Support EU-wide mandatory nitrogen balance disclosure", "Advocate for carbon border adjustment on imported animal feed from deforestation regions", "Push for Baltic Sea Action Plan implementation through HELCOM"],
            infra: "Folketinget — unicameral parliament (179 members). Contact through ft.dk. Klimaloven (Climate Act, 2020) — legally binding 70% emissions reduction target by 2030. HELCOM (Helsinki Commission) — the governing body of the Convention on the Protection of the Marine Environment of the Baltic Sea Area.",
          },
        ],
      },
    ],
  },
  // --- Dominican Republic ---
  {
    code: "DO", name: "Dominican Republic", region: "Caribbean",
    summary: "Caribbean's largest economy ($124.3B GDP) with tourism, manufacturing (free trade zones), and mining (2.04% GDP — Pueblo Viejo gold mine, one of the world's largest). Services at 59.8% GDP. Climate vulnerable — hurricanes and sea level rise.",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Pueblo Viejo gold mine (Barrick Gold) generates cyanide and mercury contamination risks. When per-mine water quality and health data is published alongside production revenue, W becomes computable.",
        breakPaths: [
          "Mandate environmental bonds that fully internalize mine closure and remediation costs. When mining companies pre-fund cleanup, the overlapping interest in extraction without environmental accountability weakens.",
          "Mandatory water quality monitoring and health-impact disclosure per mine. Publishing downstream contamination data makes W computable from mining revenue.",
          "Partially breakable. Open-pit mining disturbs landscapes. However, improved tailings management and water treatment can reduce system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report environmental violations to the Ministry of Environment and Natural Resources", "Document community health impacts — report to health authorities", "Report through Barrick Gold's compliance channels"],
            infra: "Ministerio de Medio Ambiente y Recursos Naturales — the environment ministry. Dirección General de Minería — the mining directorate under the Ministry of Energy and Mines. Defensor del Pueblo — the national ombudsman.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Barrick Gold (Pueblo Viejo): Implement GISTM tailings management standards", "Adopt full water quality disclosure for all operations", "Invest in community development programs per mining code requirements"],
            infra: "Barrick Gold — operates Pueblo Viejo, one of the world's largest gold mines (JV with Newmont). The mine produces ~800,000 ounces of gold annually.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["Ministry of Energy and Mines: Strengthen environmental conditions in mining concessions", "Enforce Mining Law 146-71 environmental provisions", "Publish mining sector environmental compliance data"],
            infra: "Ministerio de Energía y Minas — oversees mining policy. Ley 146-71 (Mining Law) — governs mining concessions and environmental obligations.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your Diputado or Senador in the Congreso Nacional to demand mandatory environmental bonds for mining operations", "Support EITI membership for the Dominican Republic", "Advocate through SICA for regional mining environmental standards", "Push for mining revenue transparency"],
            infra: "Congreso Nacional — bicameral: Cámara de Diputados (190 members) and Senado (32 members). The Dominican Republic is a presidential democracy.",
          },
        ],
      },
    ],
  },
  // --- Algeria ---
  {
    code: "DZ", name: "Algeria", region: "North Africa",
    summary: "Major oil and gas producer ($269.3B GDP) with 22.46% combined oil and gas rents. Sonatrach is Africa's largest company. Economy heavily dependent on hydrocarbon exports (90%+ of export revenue). Agriculture at 14% GDP (primarily wheat and dates). Authoritarian governance.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Algeria's oil production is declining from mature Hassi Messaoud and Hassi R'Mel fields. As domestic energy consumption grows (population of 45M+), the exportable surplus shrinks. When production costs exceed export revenue minus domestic consumption, the overlapping interest in continued expansion breaks.",
        breakPaths: [
          "Redirect hydrocarbon revenues to solar energy (Algeria has the Sahara — one of Earth's highest solar irradiance zones). When solar electricity is cheaper than burning domestically-consumed gas, the overlapping interest in gas-fired power generation breaks.",
          "Implement per-field emissions disclosure for Sonatrach operations. Algeria's massive gas flaring (visible from satellite) makes environmental damage measurable — publishing this data makes W computable.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report environmental violations through Sonatrach internal channels", "Document gas flaring data — report to Ministry of Energy and Mines", "Report concerns to international partner compliance systems (Eni, TotalEnergies, Equinor)"],
            infra: "Sonatrach — Algeria's state oil and gas company, Africa's largest company by revenue. Sonatrach controls all upstream and downstream petroleum operations. Note: Algeria has limited press freedom and no comprehensive whistleblower protection. Independent reporting is constrained.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Sonatrach: Develop solar energy division using Saharan land bank", "Implement flaring reduction program", "International partners (Eni, TotalEnergies): Apply global emissions standards to Algerian operations"],
            infra: "Sonatrach operates the world's longest natural gas pipelines (Transmed to Italy, MEG to Spain). Eni, TotalEnergies, Equinor, Occidental — major international partners in Algerian upstream operations.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["ALNAFT: Strengthen environmental conditions in exploration and production contracts", "CREG: Accelerate domestic renewable energy deployment (the PNER 2030 targets 22GW solar)", "ARH: Enforce flaring reduction regulations"],
            infra: "ALNAFT (Agence Nationale pour la Valorisation des Ressources en Hydrocarbures) — the hydrocarbons regulatory agency managing licensing. CREG (Commission de Régulation de l'Électricité et du Gaz) — the electricity and gas regulatory commission. ARH (Autorité de Régulation des Hydrocarbures) — the hydrocarbons sector regulator.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Advocate through OPEC for managed production decline aligned with Paris Agreement", "Support Mediterranean Solar Plan and Desertec-style initiatives for Saharan solar export", "Push for EITI membership for Algeria", "Leverage Algeria's gas supply role to Europe for energy transition dialogue"],
            infra: "Note: Algeria is rated 'Not Free' by Freedom House. The Assemblée populaire nationale (407 members) and Conseil de la Nation (174 members) do not function as independent democratic institutions. International channels: OPEC membership, Mediterranean dialogue (Union for the Mediterranean), African Union, Arab League. Algeria's strategic gas supply position (supplier to Italy, Spain via pipeline) gives it leverage in energy transition negotiations.",
          },
        ],
      },
    ],
  },
  // --- Ecuador ---
  {
    code: "EC", name: "Ecuador", region: "Latin America",
    summary: "Oil-dependent economy ($124.7B GDP) with 6.41% oil rents. PetroEcuador manages state interests. Extraordinary biodiversity (Galápagos, Amazon basin). The 2008 Constitution grants 'rights of nature' (Pachamama). Agriculture at 9.5% GDP (bananas, shrimp, cacao).",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Ecuador's 2023 referendum voted to ban oil extraction in Yasuní National Park (one of the world's most biodiverse areas). This democratic decision to forgo extraction directly breaks the overlapping interest. Extending this precedent to other sensitive areas accelerates the transition.",
        breakPaths: [
          "Implement the Yasuní referendum result (ban extraction in ITT block) and extend the precedent to other ecologically sensitive areas. When democratic decisions override extraction interests, the overlapping interest breaks through civic action.",
          "Mandate per-block environmental impact disclosure for all PetroEcuador and private operator fields. Ecuador's environmental data (Amazon deforestation, water contamination from legacy Texaco/Chevron operations) makes W measurable.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂ by conservation of mass.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report environmental violations to MAATE (Ministry of Environment, Water and Ecological Transition)", "Document community health impacts from oil operations — report to the Defensoría del Pueblo", "Use Ecuador's Constitutional protections for environmental defenders"],
            infra: "MAATE (Ministerio del Ambiente, Agua y Transición Ecológica) — Ecuador's environment ministry. Defensoría del Pueblo — the national ombudsman. Ecuador's 2008 Constitution (Articles 71-74) grants legally enforceable rights to nature (Pachamama), a global first.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["PetroEcuador: Develop transition plan to phase out operations in ecologically sensitive areas", "Implement Task Force on Climate-Related Financial Disclosures-aligned disclosure", "Invest in remediation of legacy contamination (Lago Agrio)"],
            infra: "EP PetroEcuador — the state oil company. PetroAmazonas EP — manages upstream operations in the Amazon basin. The Lago Agrio case (Chevron/Texaco) — one of the world's largest environmental lawsuits over oil contamination in the Ecuadorian Amazon.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["MAATE: Enforce Yasuní referendum result and strengthen environmental licensing", "ARCERNNR: Reform energy regulation to accelerate renewable deployment", "SHE (Secretaría de Hidrocarburos del Ecuador): Align licensing with rights of nature framework"],
            infra: "ARCERNNR (Agencia de Regulación y Control de Energía y Recursos Naturales No Renovables) — the energy and natural resources regulatory agency.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your Asambleísta in the Asamblea Nacional to demand implementation of the Yasuní referendum and extension to other sensitive areas", "Leverage Ecuador's rights of nature framework in international climate negotiations", "Support the Amazon Cooperation Treaty Organization (ACTO) for regional environmental governance", "Push for debt-for-nature swaps to finance the transition away from oil dependence"],
            infra: "Asamblea Nacional del Ecuador — unicameral parliament (137 members). Contact through asambleanacional.gob.ec. Ecuador's rights of nature framework (2008 Constitution) and the 2023 Yasuní referendum are globally significant legal precedents for environmental governance.",
          },
        ],
      },
    ],
  },
  // --- Estonia ---
  {
    code: "EE", name: "Estonia", region: "Europe",
    summary: "Advanced digital economy ($43.1B GDP) with unique oil shale dependence (0.96% oil rents from kukersite extraction). Services-dominant (65.7% GDP). EU and NATO member. World leader in e-governance. Oil shale power generation is Estonia's largest source of CO₂ emissions.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Estonia's oil shale sector is concentrated in Ida-Viru county (Eesti Energia/Enefit). EU ETS carbon costs make oil shale electricity the most expensive fossil option. When carbon pricing fully applies, the overlapping interest between shale operators and electricity consumers breaks.",
        breakPaths: [
          "Full EU ETS alignment without compensation. Oil shale electricity already costs more than wind in the Baltic. When subsidies and free allowances are eliminated, the overlapping interest in oil shale generation breaks — renewables are cheaper.",
          "Mandatory per-plant lifecycle emissions and health-impact disclosure for oil shale processing. Estonia's detailed environmental monitoring makes W computable.",
          "Not breakable. Oil shale processing releases CO₂, particulate matter, and phenolic wastewater by physical and chemical process.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report environmental violations to Keskkonnaamet (Environmental Board)", "Document health impacts in Ida-Viru communities", "Use Estonian whistleblower law (rikkumisest teavitaja kaitse seadus, 2022)"],
            infra: "Keskkonnaamet (Environmental Board) — Estonia's environmental enforcement and permitting authority. Keskkonnaministeerium (Ministry of the Environment) — oversees environmental policy. Estonia transposed the EU Whistleblower Directive in 2022.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Eesti Energia/Enefit: Accelerate transition from oil shale to renewable energy", "Invest in Ida-Viru economic diversification", "Adopt binding emissions reduction targets"],
            infra: "Eesti Energia (Enefit) — the state-owned energy company and dominant oil shale operator. Enefit operates the Narva power plants (the largest oil shale power plants in the world) and oil shale processing facilities.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["Konkurentsiamet: Reform electricity tariffs to reflect full environmental costs", "Ministry of Environment: Strengthen oil shale processing environmental standards", "Implement just transition plan for Ida-Viru county"],
            infra: "Konkurentsiamet (Competition Authority) — also serves as Estonia's energy regulator. Ida-Viru county hosts ~90% of Estonia's oil shale operations and faces significant economic transition challenges.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your member of the Riigikogu to demand a binding oil shale phase-out timeline", "Support EU Just Transition Fund allocation for Ida-Viru region", "Advocate for Baltic energy market integration to enable renewable energy scaling", "Push for HELCOM enforcement on Baltic Sea pollution from oil shale waste"],
            infra: "Riigikogu — Estonia's unicameral parliament (101 members). Contact through riigikogu.ee. Estonia's Climate Ambition target includes significant emissions reduction from the energy sector. EU Just Transition Fund — Estonia receives JTF funding for Ida-Viru transition.",
          },
        ],
      },
    ],
  },
  // --- Egypt ---
  {
    code: "EG", name: "Egypt, Arab Rep.", region: "North Africa",
    summary: "Largest Arab economy by population ($389.1B GDP). Oil and gas rents at 5.04%. Major gas producer (Zohr field, Mediterranean). Agriculture at 13.7% GDP. High military expenditure. Hosted COP27. Suez Canal provides strategic global trade leverage.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Egypt's Zohr gas field (discovered 2015) transformed Egypt from gas importer to exporter. COP27 presidency created domestic pressure for emissions transparency. Per-field emissions disclosure makes W computable.",
        breakPaths: [
          "Redirect gas export revenue to solar energy development. Egypt's solar irradiance is among the world's highest. When solar electricity undercuts gas-fired generation domestically, the overlapping interest in gas-for-domestic-power weakens.",
          "Implement per-field emissions disclosure for Zohr and other major fields. Egypt's COP27 commitments create institutional pressure — making lifecycle emissions visible per unit of production makes W computable.",
          "Not breakable by policy alone. Gas combustion releases CO₂.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report environmental violations to EEAA (Egyptian Environmental Affairs Agency)", "Document emissions data through international partner channels (Eni, BP)", "Report through EGPC internal compliance mechanisms"],
            infra: "EEAA (Egyptian Environmental Affairs Agency) — Egypt's environmental regulatory body. EGPC (Egyptian General Petroleum Corporation) — the state oil and gas company. EGAS (Egyptian Natural Gas Holding Company) — manages natural gas operations. Note: Egypt has severe restrictions on civil society and press freedom. Whistleblower protections are minimal.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Eni (Zohr operator): Implement emissions reduction targets for Egyptian operations", "EGPC: Develop renewable energy investment division", "Adopt Task Force on Climate-Related Financial Disclosures-aligned climate disclosure"],
            infra: "Eni — operates Zohr, the largest gas field in the Mediterranean. BP — major operator in the West Nile Delta. EGPC and EGAS manage state interests in all petroleum operations.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["Ministry of Petroleum: Require per-field emissions monitoring and disclosure", "NREA: Accelerate renewable energy permitting (Egypt targets 42% renewable electricity by 2035)", "EEAA: Strengthen environmental standards for gas processing"],
            infra: "Ministry of Petroleum and Mineral Resources — oversees hydrocarbons policy. NREA (New and Renewable Energy Authority) — responsible for renewable energy development. Egypt's Integrated Sustainable Energy Strategy targets 42% renewable electricity by 2035.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Leverage Egypt's COP27 presidency legacy to strengthen national climate commitments", "Advocate through Arab League for regional emissions reduction coordination", "Support Mediterranean energy transition dialogue through Union for the Mediterranean", "Push for Suez Canal green shipping corridor initiatives"],
            infra: "Note: Egypt under President el-Sisi is rated 'Not Free' by Freedom House. The House of Representatives (Majlis al-Nuwab, 596 members) does not function as an independent democratic institution. International channels: Arab League, African Union (Egypt hosted AU in 2019), Union for the Mediterranean, COP27 legacy initiatives.",
          },
        ],
      },
    ],
  },
  // --- Ethiopia ---
  {
    code: "ET", name: "Ethiopia", region: "Sub-Saharan Africa",
    summary: "Africa's second-most-populous country ($149.7B GDP). Agriculture dominates (34.8% GDP, primarily coffee, teff, livestock). Rapid industrialization drive (industrial parks). Major hydropower (GERD — Grand Ethiopian Renaissance Dam). Post-civil war recovery.",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Ethiopia's agricultural expansion is the primary driver of deforestation (fr=5.6% GDP equivalent in forest rents). When per-farm environmental data (tree cover, soil carbon) is linked to agricultural output, W becomes computable.",
        breakPaths: [
          "Scale Ethiopia's Productive Safety Net Program (PSNP) to include environmental conditionality. When agricultural support payments require soil conservation and tree planting, the overlapping interest in clearing forest for short-term cultivation weakens.",
          "Satellite-based monitoring of forest cover and soil degradation published at woreda level. Ethiopia's Green Legacy Initiative provides political commitment — mandatory monitoring data makes W computable.",
          "Partially breakable. Subsistence agriculture on degraded land inherently affects soil and water systems. However, Ethiopia's traditional conservation agriculture (terracing, agroforestry) can reduce system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report illegal deforestation to regional environmental protection authorities", "Document land grabbing or forced displacement — report to EHRC (Ethiopian Human Rights Commission)", "Report through agricultural development agent (DA) networks at kebele level"],
            infra: "Regional environmental protection authorities — Ethiopia's federal system devolves environmental management to regional states. EHRC (Ethiopian Human Rights Commission) — the national human rights institution. Development Agents (DAs) — government agricultural extension workers deployed at kebele (ward) level throughout rural Ethiopia.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Ethiopian Commodity Exchange (ECX): Integrate environmental certification into coffee and sesame trading", "Agricultural investment companies: Adopt environmental impact monitoring", "Support Green Legacy Initiative reforestation targets"],
            infra: "ECX (Ethiopian Commodity Exchange) — the commodities trading platform for coffee, sesame, and other agricultural products. Ethiopia is Africa's largest coffee producer and coffee is the country's largest export. Industrial parks development corporation — manages Ethiopia's growing manufacturing sector.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["Ministry of Agriculture: Reform the Productive Safety Net Program to include environmental conditionality", "EFCCC: Strengthen forest protection enforcement", "EIA (Ethiopian Investment Authority): Require environmental impact assessments for agricultural investment licenses"],
            infra: "Ministry of Agriculture — oversees agricultural policy and the PSNP. EFCCC (Environment, Forest and Climate Change Commission) — Ethiopia's environmental authority. Green Legacy Initiative — the government's flagship reforestation program targeting 20 billion seedlings.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Support African Forest Landscape Restoration Initiative (AFR100) targets for Ethiopia", "Advocate through African Union (headquartered in Addis Ababa) for continental agricultural sustainability standards", "Push for international climate finance for Ethiopia's agricultural transformation", "Support Nile Basin Initiative cooperation on sustainable watershed management"],
            infra: "Note: Ethiopia is a federal parliamentary republic but democratic governance has been constrained by civil conflict (Tigray war 2020-2022). The House of Peoples' Representatives (547 members) is the lower house. International channels: African Union (HQ in Addis Ababa), Nile Basin Initiative, IGAD (Intergovernmental Authority on Development), AFR100 (Africa's contribution to the Bonn Challenge on forest restoration).",
          },
        ],
      },
    ],
  },
  // --- Finland ---
  {
    code: "FI", name: "Finland", region: "Europe",
    summary: "Advanced Nordic economy ($298.7B GDP) with strong forestry sector. Services at 62.2% GDP, manufacturing at 14.2%. High healthcare expenditure (10.47% GDP). Major pulp and paper producers (UPM, Stora Enso, Metsä Group). EU member with robust environmental regulation.",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Finland's forestry-driven monoculture (pine/spruce plantations replacing natural forests) reduces biodiversity and degrades peatland carbon stocks. When per-harvest biodiversity and carbon data is published alongside timber revenue, W becomes computable.",
        breakPaths: [
          "Reform EU CAP and national forestry subsidies to reward biodiversity and carbon storage rather than timber volume. When subsidies incentivize continuous-cover forestry over clear-cutting, the overlapping interest in plantation monoculture weakens.",
          "Mandatory per-harvest environmental data (biodiversity indicators, soil carbon, water quality). Finland's Metsähallitus (state forest enterprise) already collects extensive data — making it publicly accessible makes W computable.",
          "Partially breakable. Timber plantation inherently reduces biodiversity compared to natural forest. However, continuous-cover forestry and extended rotation lengths can significantly reduce system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report forestry violations to ELY-keskus (Centre for Economic Development, Transport and the Environment)", "Document biodiversity loss in logged areas — report to SYKE (Finnish Environment Institute)", "Use Finnish whistleblower law (ilmoittajansuojelulaki, 2023)"],
            infra: "ELY-keskus — regional authorities responsible for environmental monitoring and enforcement. SYKE (Suomen ympäristökeskus / Finnish Environment Institute) — the national environmental research and monitoring institute. Ilmoittajansuojelulaki (Whistleblower Protection Act, 2023) — Finnish transposition of EU Whistleblower Directive.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["UPM, Stora Enso, Metsä Group: Adopt continuous-cover forestry targets", "Implement per-harvest biodiversity monitoring", "Invest in high-value wood products to reduce harvest volume dependency"],
            infra: "UPM-Kymmene — one of Finland's largest forestry companies. Stora Enso — Finnish-Swedish forestry and paper company. Metsä Group — cooperative of 100,000+ Finnish forest owners. Metsähallitus — state enterprise managing one-third of Finland's land area.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["MMM (Ministry of Agriculture and Forestry): Reform the National Forest Strategy toward biodiversity targets", "SYKE: Publish annual forest biodiversity monitoring data at municipality level", "Strengthen EU Nature Restoration Law implementation in forestry sector"],
            infra: "MMM (Maa- ja metsätalousministeriö) — the ministry responsible for agriculture and forestry policy. National Forest Strategy 2025 — Finland's strategic framework for forestry sector development. EU Nature Restoration Law — requires restoration of degraded ecosystems including forests.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your member of the Eduskunta to demand reform of forestry subsidies toward biodiversity and carbon storage", "Support EU Nature Restoration Law implementation", "Advocate for HELCOM enforcement on Baltic Sea eutrophication from forestry runoff", "Push for inclusion of forestry carbon accounting in Finland's climate targets"],
            infra: "Eduskunta (Parliament of Finland) — unicameral legislature with 200 members. Contact through eduskunta.fi. The Maa- ja metsätalousvaliokunta (Agriculture and Forestry Committee) handles forestry legislation. Finland's climate law targets carbon neutrality by 2035.",
          },
        ],
      },
    ],
  },
  // --- Gabon ---
  {
    code: "GA", name: "Gabon", region: "Sub-Saharan Africa",
    summary: "Oil-dependent Central African economy ($20.9B GDP) with 15.83% combined oil and gas rents. 88% forest cover — one of the world's most forested countries. Low population (2.4M). Military coup August 2023 ended the Bongo family's 55-year rule.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Gabon's oil production is in terminal decline from mature fields (peaked at ~370,000 bpd in 1997, now ~200,000). As production falls, the overlapping interest between operators and government revenue weakens. Gabon's forests offer alternative revenue through carbon credits.",
        breakPaths: [
          "Monetize Gabon's forest carbon stocks through REDD+ and voluntary carbon markets. Gabon received $17M from Norway for forest protection in 2021 — scaling this replaces declining oil revenue and breaks the overlapping interest in extraction.",
          "Implement per-field emissions disclosure for all operators (TotalEnergies, Perenco, Assala Energy). Making environmental costs visible makes W computable.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report environmental violations to ANPN (Agence Nationale des Parcs Nationaux)", "Document oil spills or contamination — report through operator compliance channels", "Report to EITI Gabon"],
            infra: "ANPN (Agence Nationale des Parcs Nationaux) — manages Gabon's 13 national parks (covering 11% of territory). GOC (Gabon Oil Company) — the state oil company. EITI Gabon — member since 2004. Note: Gabon is under military transition government since August 2023 coup.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["TotalEnergies, Perenco, Assala: Implement emissions reduction plans for Gabonese operations", "GOC: Develop forest carbon credit revenue streams", "Adopt biodiversity offset requirements for all operations"],
            infra: "TotalEnergies — the largest oil producer in Gabon. Perenco, Assala Energy — other major operators. GOC (Gabon Oil Company) — the state oil company.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["Ministry of Hydrocarbons: Strengthen environmental licensing requirements", "ANPN: Enforce protected area boundaries against oil exploration", "EITI Gabon: Expand reporting to environmental metrics"],
            infra: "Ministry of Hydrocarbons — oversees oil and gas policy. DGEPN (Direction Générale de l'Environnement et de la Protection de la Nature) — environmental directorate.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Support CAFI (Central African Forest Initiative) for Gabon's forest conservation", "Advocate through OPEC for managed production decline from depleting fields", "Push for international carbon market standards that properly value Gabon's forest carbon", "Support transition governance toward environmental transparency"],
            infra: "Note: Gabon is under military transition government (Comité pour la Transition et la Restauration des Institutions, CTRI) since August 2023. Democratic institutions are suspended. International channels: CEMAC, CAFI, African Union, OPEC membership. Gabon's 2021 deal with Norway's sovereign wealth fund for forest protection is a model for forest-state climate finance.",
          },
        ],
      },
    ],
  },
  // --- Georgia ---
  {
    code: "GE", name: "Georgia", region: "Europe",
    summary: "Small South Caucasus economy ($34.2B GDP) with mining sector (1.28% GDP, primarily manganese and copper). Services-dominant (62% GDP). EU candidate country (2023). Significant hydropower potential. Political tensions between pro-EU and pro-Russia orientations.",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Georgia's manganese mining (Chiatura) and copper mining generate significant water pollution. EU accession environmental alignment will require improved monitoring. When water quality data is linked to mining output, W becomes computable.",
        breakPaths: [
          "EU accession environmental alignment. When Georgia must meet EU environmental standards for mining, the overlapping interest in low-cost extraction without environmental controls weakens.",
          "Mandatory per-mine water quality and emissions disclosure. Georgia's National Environmental Agency collects some data — extending to public disclosure makes W computable.",
          "Partially breakable. Mining disturbs landscapes, but improved tailings management can reduce system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report environmental violations to the Environmental Information and Education Centre", "Document water contamination — report to NEA (National Environmental Agency)", "Use Georgia's whistleblower protection mechanisms"],
            infra: "NEA (National Environmental Agency) — responsible for environmental monitoring, permitting, and enforcement. Ministry of Environmental Protection and Agriculture — oversees environmental and agricultural policy. Georgia's Law on Freedom of Speech and Expression provides some protections for reporting.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Georgian Manganese (Euroasian Resources Group subsidiary): Implement environmental management systems", "Adopt international mining standards (ICMM, IRMA)", "Invest in mine site rehabilitation"],
            infra: "Georgian Manganese — subsidiary of ERG (Eurasian Resources Group), operating the Chiatura manganese mines. RMG Copper — operates copper mines. Georgia's mining sector is primarily controlled by international investors.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["NAPR (National Agency of Public Registry): Strengthen mining license environmental conditions", "NEA: Increase environmental monitoring capacity", "Ministry of Economy: Align mining regulation with EU environmental acquis"],
            infra: "National Agency of Mines — responsible for mining licensing and oversight. Georgia's EU Association Agreement (2014) includes provisions for environmental alignment.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your member of the Sakartvelos Parlamenti (Parliament of Georgia) to demand EU-aligned environmental standards for mining", "Support EU accession conditionality on environmental governance", "Advocate for Energy Community Treaty enforcement on environmental standards", "Push for EITI membership for Georgia"],
            infra: "Sakartvelos Parlamenti (Parliament of Georgia) — unicameral legislature with 150 members. Contact through parliament.ge. Georgia is an EU candidate country (2023) and aspirant to full EU membership. EU Association Agreement — includes Deep and Comprehensive Free Trade Area (DCFTA) with environmental provisions.",
          },
        ],
      },
    ],
  },
  // --- Ghana ---
  {
    code: "GH", name: "Ghana", region: "Sub-Saharan Africa",
    summary: "West African economy ($82.3B GDP) with significant oil (4.06% rents), gold mining (5.17% mineral rents), and cocoa agriculture (20.9% ag share). One of Africa's most stable democracies. Debt crisis (2022 IMF bailout). Illegal artisanal gold mining (galamsey) is a major environmental crisis.",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Ghana's galamsey (illegal artisanal mining) crisis has contaminated water bodies across cocoa-growing regions. When per-mine water quality data is published and linked to gold production, W becomes computable. The galamsey problem is so severe that it threatens Ghana's water supply.",
        breakPaths: [
          "Formalize artisanal mining with environmental standards and alternative livelihood programs. When legal small-scale mining provides comparable income with less environmental damage, the overlapping interest in illegal extraction weakens.",
          "Satellite-based water quality monitoring linked to mining areas. Ghana's Water Resources Commission already monitors water quality — extending to real-time public data makes W computable.",
          "Partially breakable. Mining disturbs landscapes. However, formalized artisanal mining with mercury-free processing (e.g., gravity separation) can significantly reduce system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report illegal galamsey operations to the Inter-Ministerial Committee on Illegal Mining (IMCIM)", "Document water contamination — report to WRC (Water Resources Commission)", "Report through the Minerals Commission complaint mechanisms"],
            infra: "IMCIM (Inter-Ministerial Committee on Illegal Mining) — established to coordinate government response to the galamsey crisis. WRC (Water Resources Commission) — manages Ghana's water resources and monitors water quality. Minerals Commission — the regulatory body for the mining sector, responsible for licensing and compliance monitoring.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Gold Fields, Newmont, AngloGold Ashanti: Support formalization of artisanal mining near concessions", "Implement community development agreements per Ghana's mining law", "Adopt mercury-free processing technology transfer programs"],
            infra: "Gold Fields — operates Tarkwa and Damang mines. Newmont — operates Ahafo and Akyem mines. AngloGold Ashanti — major gold mining company with Ghanaian operations. Ghana is Africa's largest gold producer.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["Minerals Commission: Accelerate small-scale mining formalization with environmental standards", "EPA (Environmental Protection Agency): Strengthen enforcement against water pollution from mining", "Forestry Commission: Protect forest reserves from galamsey encroachment"],
            infra: "EPA (Environmental Protection Agency of Ghana) — responsible for environmental permitting, monitoring, and enforcement. Forestry Commission — manages Ghana's forest reserves, many of which are threatened by illegal mining. EITI Ghana — Ghana has been EITI compliant since 2010.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your Member of Parliament to demand emergency action on the galamsey water contamination crisis", "Support EITI enhanced reporting with environmental metrics", "Advocate through ECOWAS for regional artisanal mining regulation", "Push for Minamata Convention enforcement on mercury use in gold mining"],
            infra: "Parliament of Ghana — unicameral legislature with 275 members. Contact through parliament.gh. Ghana is a presidential democracy with peaceful transfers of power. Minamata Convention on Mercury — Ghana has ratified this treaty requiring phase-down of mercury use in artisanal gold mining.",
          },
        ],
      },
    ],
  },
  // --- Guinea ---
  {
    code: "GN", name: "Guinea", region: "Sub-Saharan Africa",
    summary: "Resource-rich West African economy ($25B GDP) with massive bauxite reserves (world's largest — 7.4B tons). Agriculture at 31% GDP. Military junta since 2021 coup. Guinea supplies ~25% of global bauxite (the ore used to produce aluminum).",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Guinea's bauxite mining displaces communities and contaminates water sources. As aluminum buyers face environmental, social, and governance pressure (EU CSRD, Apple/Tesla supply chain requirements), making per-mine environmental data visible breaks system independence.",
        breakPaths: [
          "International supply chain due diligence (EU CSDDD) requiring environmental and human rights compliance for bauxite. When buyers must verify mine-level conditions, the overlapping interest in low-cost, unregulated extraction weakens.",
          "Per-mine environmental and community impact disclosure through EITI and supply chain traceability. When downstream manufacturers can see the welfare cost per ton of bauxite, W becomes computable.",
          "Partially breakable. Open-pit bauxite mining inherently disturbs landscapes. However, progressive rehabilitation and dust suppression can reduce system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report environmental violations to international monitoring organizations (Human Rights Watch, Inclusive Development International)", "Document community displacement — report through international accountability mechanisms", "Report through mining company compliance channels (Rio Tinto, Alcoa, Emirates Global Aluminium)"],
            infra: "Note: Guinea is under military rule (CNRD — Comité National du Rassemblement et du Développement) since September 2021. Independent civil society operates under severe constraints. Bureau Guinéen des Études et Évaluations Environnementales (BGEEE) — environmental assessment authority. International monitoring: Human Rights Watch and Inclusive Development International have documented impacts of bauxite mining on Guinean communities.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["CBG (Compagnie des Bauxites de Guinée), SMB (Société Minière de Boké): Implement community resettlement standards per IFC Performance Standard 5", "Adopt ASI (Aluminium Stewardship Initiative) certification", "Invest in progressive rehabilitation of mined areas"],
            infra: "CBG (Compagnie des Bauxites de Guinée) — JV of Alcoa, Rio Tinto, and Dadco, one of the world's largest bauxite producers. SMB (Société Minière de Boké) — Chinese-backed consortium (includes Winning International, Shandong Weiqiao). GAC (Guinea Alumina Corporation) — Emirates Global Aluminium subsidiary. ASI (Aluminium Stewardship Initiative) — the industry sustainability standard for the aluminum value chain.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["Ministry of Mines: Enforce 2011 Mining Code environmental provisions", "CPDM (Centre de Promotion et de Développement Minier): Strengthen environmental monitoring capacity", "EITI Guinea: Expand reporting to environmental and community data"],
            infra: "Ministère des Mines et de la Géologie — oversees mining policy and licensing. Code Minier (2011, revised 2013) — Guinea's mining code establishing environmental obligations. EITI Guinea — Guinea has been EITI compliant, publishing reports on mining revenues.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Advocate through ECOWAS for return to democratic governance and strengthened mining regulation", "Support EU CSDDD implementation requiring due diligence for bauxite imports from Guinea", "Push for ASI certification as condition for international bauxite purchases", "Support international accountability mechanisms for mining-affected communities"],
            infra: "Note: Guinea's democratic institutions are suspended under military rule. The Conseil National de la Transition (CNT) serves as a transitional legislature. International channels: ECOWAS (Guinea suspended), African Union, international mining company home-country oversight (UK, Canada, UAE, China). EU Corporate Sustainability Due Diligence Directive (CSDDD) — will require EU companies to address human rights and environmental impacts in their supply chains.",
          },
        ],
      },
    ],
  },
  // --- Equatorial Guinea ---
  {
    code: "GQ", name: "Equatorial Guinea", region: "Sub-Saharan Africa",
    summary: "Small petrostate ($12.8B GDP) with 21.57% combined oil and gas rents. One of Africa's highest per-capita GDPs but extreme inequality. Authoritarian rule (Obiang family since 1979 — world's longest-serving head of state). Oil production declining from mature fields.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "Equatorial Guinea's oil production has declined ~75% from peak. As fields deplete, the overlapping interest between operators and government revenue weakens. Without new discoveries, the economic case for diversification becomes unavoidable.",
        breakPaths: [
          "Economic diversification as oil depletes. When production revenue falls below government operating costs, the overlapping interest in continued extraction from depleting fields breaks — alternative revenue sources become necessary.",
          "Per-field emissions disclosure through international operator reporting (ExxonMobil, Marathon Oil). Making environmental costs visible makes W computable.",
          "Not breakable by policy alone. Hydrocarbon combustion releases CO₂.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report through international operator compliance channels (ExxonMobil, Marathon Oil)", "Document environmental violations to international NGOs", "Report corruption to US DOJ (several Obiang family members have faced kleptocracy investigations)"],
            infra: "Note: Equatorial Guinea is one of the world's most authoritarian states. No independent media, civil society, or labor organizations exist. EG LNG (Equatorial Guinea LNG Holdings) — operates the LNG processing plant. International engagement: US Department of Justice Kleptocracy Asset Recovery Initiative has investigated Obiang family assets. Transparency International consistently ranks Equatorial Guinea among the most corrupt countries.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["ExxonMobil, Marathon Oil: Apply global environmental standards to EG operations", "Report Scope 1-3 emissions for EG operations in global environmental, social, and governance disclosures", "Implement community development programs"],
            infra: "ExxonMobil — the largest oil operator in Equatorial Guinea. Marathon Oil — operates in offshore blocks. GEPetrol — the state national oil company.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["Ministry of Mines and Hydrocarbons: Publish production and revenue data through EITI (EG was suspended from EITI in 2010)", "Strengthen environmental standards for offshore operations", "BEAC: Improve fiscal transparency for hydrocarbon revenues"],
            infra: "Ministry of Mines and Hydrocarbons — oversees oil and gas operations. Note: Equatorial Guinea was suspended from EITI in 2010 for insufficient progress on transparency. BEAC (central bank of CEMAC zone) provides limited macroeconomic oversight.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Support international anti-kleptocracy enforcement for misappropriated oil revenues", "Advocate through CEMAC for regional transparency standards", "Push for re-engagement with EITI transparency requirements", "Support international mechanisms for asset recovery and repatriation of stolen oil revenues"],
            infra: "Note: Equatorial Guinea under President Obiang (in power since 1979) has no democratic institutions. The Cámara de Representantes del Pueblo and Senate are rubber-stamp bodies. International channels: CEMAC, African Union, UN Human Rights Council. Several countries (US, France, Switzerland) have pursued legal action against Obiang family members for corruption and money laundering.",
          },
        ],
      },
    ],
  },
  // --- Greece ---
  {
    code: "GR", name: "Greece", region: "Europe",
    summary: "EU economy ($256.2B GDP) with dominant services sector (68% GDP, tourism-heavy). Low resource extraction. Post-debt-crisis recovery. Major shipping industry (Greek-owned fleet is the world's largest). Agriculture at 3.8% GDP (olives, wine).",
    sectors: [
      {
        name: "Ultra-Processed Food", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Greece's Mediterranean diet is being displaced by Ultra-Processed Food consumption, contributing to rising obesity (Greece has one of Europe's highest childhood obesity rates). When diet-related healthcare costs are published per product category through EOPYY health insurance data, W becomes computable.",
        breakPaths: [
          "Implement front-of-pack health labelling to make welfare costs visible to consumers. When Ultra-Processed Food health costs are visible at point of sale, the overlapping interest between processors and retailers in high-margin Ultra-Processed Food weakens.",
          "EOPYY (National Organization for the Provision of Healthcare Services) publication of diet-attributable disease costs per food category. Greece's national health system generates data to make W computable.",
          "Not fully breakable. Ultra-processing alters food matrix. Reformulation mandates can reduce system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report misleading health claims to EFET (Hellenic Food Authority)", "Document food safety violations", "Use Greek whistleblower law (transposition of EU Directive 2019/1937, 2022)"],
            infra: "EFET (ΕΦΕΤ — Ενιαίος Φορέας Ελέγχου Τροφίμων / Hellenic Food Authority) — Greece's food safety authority. Greece transposed the EU Whistleblower Directive in 2022.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Greek food companies: Invest in traditional Mediterranean diet products over Ultra-Processed Food", "Adopt voluntary front-of-pack labelling", "Commission health-impact assessments"],
            infra: "SEVT (Σύνδεσμος Ελληνικών Βιομηχανιών Τροφίμων / Federation of Hellenic Food Industries) — the food industry trade association. Greece's traditional food sector (olive oil, dairy, honey) provides a competitive alternative to Ultra-Processed Food.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["Ministry of Health: Implement mandatory front-of-pack labelling", "EFET: Strengthen enforcement of marketing claims", "EOPYY: Publish diet-related health expenditure data"],
            infra: "Ministry of Health — oversees health policy. EOPYY (Εθνικός Οργανισμός Παροχής Υπηρεσιών Υγείας / National Organization for the Provision of Healthcare Services) — the national health insurer managing healthcare expenditure data.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your Βουλευτής in the Βουλή των Ελλήνων (Hellenic Parliament) to demand front-of-pack health labelling", "Support EU Farm to Fork Strategy implementation", "Advocate for UNESCO Intangible Heritage protection of Mediterranean diet through policy measures", "Push for WHO-aligned Ultra-Processed Food marketing restrictions"],
            infra: "Βουλή των Ελλήνων (Hellenic Parliament) — unicameral legislature with 300 members. Contact through hellenicparliament.gr. Greece is a parliamentary democracy and EU member.",
          },
        ],
      },
    ],
  },
  // --- Guatemala ---
  {
    code: "GT", name: "Guatemala", region: "Latin America",
    summary: "Central American economy ($113.2B GDP) with agriculture at 9.8% GDP (coffee, sugar, palm oil). Mining at 1.12% GDP (gold, silver — Marlin mine controversy). High inequality and indigenous population (40%+). Remittances significant (~18% of GDP).",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Guatemala's palm oil expansion into Petén and Alta Verapaz drives deforestation and displaces indigenous communities. When per-farm deforestation data is linked to palm oil exports (EUDR compliance), W becomes computable.",
        breakPaths: [
          "EU Deforestation Regulation compliance requiring farm-level traceability. When palm oil exports must prove zero-deforestation origin, the overlapping interest in clearing forest for plantations breaks.",
          "Mandatory per-farm environmental data (tree cover, water use, pesticide application). Guatemala's CONAP (National Council for Protected Areas) can provide monitoring data — linking to agricultural output makes W computable.",
          "Partially breakable. Palm oil monoculture reduces biodiversity. However, agroforestry integration and Roundtable on Sustainable Palm Oil certification can reduce system dependence.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report illegal deforestation to CONAP or INAB (National Forest Institute)", "Document indigenous land rights violations — report to PDH (Procuraduría de los Derechos Humanos)", "Report pesticide violations to MAGA (Ministry of Agriculture)"],
            infra: "CONAP (Consejo Nacional de Áreas Protegidas) — manages Guatemala's protected areas. INAB (Instituto Nacional de Bosques) — the national forest institute. PDH (Procuraduría de los Derechos Humanos) — the national human rights ombudsman. Guatemala has significant challenges with environmental defender safety.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["Palm oil companies (REPSA, NaturAceites): Adopt Roundtable on Sustainable Palm Oil certification and zero-deforestation commitments", "International buyers: Require supply chain traceability for Guatemalan palm oil", "Invest in community benefit-sharing agreements"],
            infra: "REPSA (Reforestadora de Palma del Petén) — major palm oil producer. GREPALMA (Gremial de Palmicultores de Guatemala) — the palm oil producers' association. RSPO (Roundtable on Sustainable Palm Oil) — the international certification standard.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["MARN (Ministry of Environment): Strengthen environmental impact assessment for agricultural expansion", "MAGA: Reform agricultural incentives to require environmental compliance", "CONAP: Enforce protected area boundaries against agricultural encroachment"],
            infra: "MARN (Ministerio de Ambiente y Recursos Naturales) — Guatemala's environment ministry. MAGA (Ministerio de Agricultura, Ganadería y Alimentación) — the agriculture ministry.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your Diputado in the Congreso de la República to demand enforcement of environmental protections for indigenous territories", "Support ILO Convention 169 enforcement on indigenous consultation", "Advocate for Escazú Agreement ratification", "Push for EUDR compliance support for small-scale farmers"],
            infra: "Congreso de la República de Guatemala — unicameral legislature with 160 members. Guatemala has ratified ILO Convention 169 on indigenous peoples' rights. The Inter-American Court of Human Rights has issued rulings on indigenous land rights in Guatemala.",
          },
        ],
      },
    ],
  },
  // --- Guyana ---
  {
    code: "GY", name: "Guyana", region: "Caribbean",
    summary: "Fastest-growing economy globally ($24.7B GDP, up from $5.5B in 2019) due to massive offshore oil discoveries (Stabroek block). Oil rents at 22.08%, mining at 9.38% (gold, bauxite). Small population (800K). At risk of 'resource curse' — extraordinary Private-Systemic Tension exposure from rapid petro-development.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Guyana's 2016 production sharing agreement with ExxonMobil has been widely criticized for giving the government only 2% royalty + 50% profit oil (after cost recovery). When the full fiscal terms and environmental costs are disclosed and understood, W becomes computable from production data.",
        breakPaths: [
          "Renegotiate the Stabroek PSA fiscal terms to capture a fair share of petroleum wealth. When Guyana's government share approaches international norms (60-80% government take), the overlapping interest in an extractive-favorable contract weakens.",
          "Mandatory per-field emissions disclosure and environmental monitoring for all Stabroek block operations. ExxonMobil already reports global emissions — extending to per-field Guyana data makes W computable.",
          "Not breakable by policy alone. Offshore oil production and combustion release CO₂.",
        ],
        actors: [
          {
            level: "Insider / Whistleblower", role: "insider",
            actions: ["Report environmental violations to EPA (Environmental Protection Agency of Guyana)", "Document compliance gaps in Stabroek operations — report through ExxonMobil compliance channels", "Report fiscal irregularities to the Audit Office of Guyana"],
            infra: "EPA (Environmental Protection Agency of Guyana) — responsible for environmental permitting and monitoring of oil and gas operations. Ministry of Natural Resources — oversees petroleum policy. Audit Office of Guyana — conducts financial audits of government revenue management. Note: Guyana's regulatory capacity is severely under-resourced relative to the scale of oil development.",
          },
          {
            level: "Investor / Capital Allocator", role: "investor",
            actions: ["ExxonMobil, Hess, CNOOC (Stabroek partners): Implement per-field emissions disclosure for Guyana operations", "Adopt zero-flaring targets", "Invest in oil spill response capacity (current capacity is minimal for deepwater operations)"],
            infra: "ExxonMobil (45%), Hess (30%), CNOOC (25%) — the Stabroek block partnership. Production began in 2019 and is expected to reach 1.2 million bpd by 2027. The Stabroek Production Sharing Agreement (2016) — governs fiscal terms. The Natural Resource Fund — Guyana's sovereign wealth fund established in 2019 to manage oil revenues.",
          },
          {
            level: "Regulator / Agency", role: "regulator",
            actions: ["EPA: Strengthen environmental monitoring capacity for offshore operations", "Ministry of Natural Resources: Commission independent review of Stabroek PSA terms", "Natural Resource Fund Board: Implement transparent investment and withdrawal rules"],
            infra: "Natural Resource Fund Act (2021) — governs the sovereign wealth fund. The Petroleum Commission (planned) — intended to serve as the independent petroleum regulator, but not yet fully established.",
          },
          {
            level: "Supranational Body / Treaty", role: "supranational",
            actions: ["Contact your Member of Parliament in the National Assembly to demand independent review of Stabroek PSA fiscal terms", "Support establishment of a properly resourced Petroleum Commission as independent regulator", "Advocate for Natural Resource Fund transparency aligned with Santiago Principles for sovereign wealth funds", "Push for Norwegian-style petroleum governance model with high government take and transparent wealth fund management"],
            infra: "National Assembly of Guyana — unicameral legislature with 65 members. Guyana is a cooperative republic with Westminster-style parliamentary democracy. The Natural Resource Governance Institute (NRGI) provides technical assistance on petroleum governance. CARICOM — provides regional coordination.",
          },
        ],
      },
    ],
  },
  // --- Hong Kong ---
  {
    code: "HK", name: "Hong Kong SAR, China", region: "East Asia",
    summary: "Global financial center ($406.9B GDP) with 91.8% services. Major banking and securities hub. Under Chinese sovereignty since 1997 with eroding autonomy. Significant financial intermediation — Hong Kong Stock Exchange is 5th-largest globally by market cap.",
    sectors: [
      {
        name: "Financial Services", beta: 4.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Hong Kong intermediates massive capital flows including fossil fuel financing. When Scope 3 financed emissions are disclosed per financial institution, W becomes computable from financial transaction data.",
        breakPaths: [
          "Mandatory financed emissions disclosure for all HKEX-listed financial institutions. When banks must disclose the emissions their lending supports, the overlapping interest in fossil fuel financing weakens — environmental, social, and governance-aware investors reallocate.",
          "HKMA Green and Sustainable Finance Cross-Agency Steering Group implementation. Making climate risk visible in financial products makes W computable.",
          "Partially breakable. Financial intermediation can relocate. But Hong Kong's infrastructure and China market access create switching costs.",
        ],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report greenwashing to SFC (Securities and Futures Commission)", "Document environmental, social, and governance disclosure violations — report to HKEX listing division", "Report through internal bank compliance channels"], infra: "SFC (Securities and Futures Commission) — regulates securities, futures markets, and listed companies. HKEX (Hong Kong Exchanges and Clearing) — operates the stock exchange and sets listing rules including environmental, social, and governance disclosure requirements. HKMA (Hong Kong Monetary Authority) — the de facto central bank. Note: Under the National Security Law (2020), civil liberties are constrained." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["Adopt Task Force on Climate-Related Financial Disclosures-aligned disclosure across all operations", "Set financed emissions reduction targets", "Integrate climate risk into lending decisions"], infra: "Major banks in Hong Kong: HSBC, Standard Chartered, Bank of China (Hong Kong), Hang Seng Bank. Green and Sustainable Finance Cross-Agency Steering Group — coordinates climate finance policy across HKMA, SFC, and other regulators." },
          { level: "Regulator / Agency", role: "regulator", actions: ["HKMA: Mandate climate stress testing for all authorized institutions", "SFC: Enforce enhanced environmental, social, and governance disclosure for listed companies", "HKEX: Strengthen climate-related listing requirements"], infra: "HKMA — supervises 160+ licensed banks. The HKMA's Climate Risk Management Supervisory Policy Manual (2021) sets expectations for banks' climate risk management." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Advocate through International Organization of Securities Commissions (IOSCO) for global securities regulator coordination on climate disclosure", "Support ISSB sustainability reporting standards adoption in Hong Kong", "Push for Network for Greening the Financial System (NGFS) recommendations implementation", "Leverage Hong Kong's role as a Belt and Road financing hub to require climate standards"], infra: "Note: Hong Kong's Legislative Council (90 members) is not freely elected under the 2021 electoral reform. International engagement operates through financial regulatory cooperation (International Organization of Securities Commissions (IOSCO), BIS, NGFS) and Hong Kong's role as an international financial center." },
        ],
      },
    ],
  },
  // --- Honduras ---
  {
    code: "HN", name: "Honduras", region: "Latin America",
    summary: "Lower-middle-income economy ($37.1B GDP) with agriculture at 11.2% GDP (coffee, palm oil, bananas). Manufacturing at 14.9% (maquiladora sector). Climate-vulnerable — Hurricane Mitch (1998) and Eta/Iota (2020). High emigration. Environmental defenders face severe threats.",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Honduras's palm oil expansion drives deforestation in the Aguán Valley and Mosquitia region. EUDR compliance will require farm-level traceability — when deforestation is linked to specific supply chains, W becomes computable.",
        breakPaths: [
          "EUDR compliance requiring zero-deforestation traceability for palm oil exports. When buyers must verify origin, the overlapping interest in forest conversion for plantations breaks.",
          "Satellite-based deforestation monitoring linked to agricultural export data. ICF (Forest Conservation Institute) data makes W computable.",
          "Partially breakable. Palm oil monoculture inherently reduces biodiversity. Roundtable on Sustainable Palm Oil certification and agroforestry can reduce system dependence.",
        ],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report illegal deforestation to ICF (Instituto de Conservación Forestal)", "Document land rights violations — report to CONADEH (Comisionado Nacional de los Derechos Humanos)", "Report through Roundtable on Sustainable Palm Oil complaint mechanisms"], infra: "ICF (Instituto de Conservación Forestal) — responsible for forest management and conservation. CONADEH — the national human rights commissioner. Note: Honduras is one of the most dangerous countries for environmental defenders — Global Witness documents multiple killings annually." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["Palm oil companies (Dinant, Jaremar): Adopt Roundtable on Sustainable Palm Oil certification and zero-deforestation commitments", "Implement community benefit-sharing agreements", "International buyers: Require traceability"], infra: "Corporación Dinant — Honduras's largest palm oil producer (implicated in Aguán Valley land conflicts). Jaremar — another major palm oil company. IFC (International Finance Corporation) — has faced accountability complaints regarding investments in Honduran palm oil." },
          { level: "Regulator / Agency", role: "regulator", actions: ["MiAmbiente+: Strengthen environmental impact assessment for agricultural expansion", "SAG (Secretariat of Agriculture): Reform agricultural incentives", "ICF: Enforce protected area boundaries"], infra: "MiAmbiente+ (Secretaría de Recursos Naturales y Ambiente) — Honduras's environment ministry. SAG (Secretaría de Agricultura y Ganadería) — the agriculture ministry." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Diputado in the Congreso Nacional to demand enforcement of environmental protections", "Support Escazú Agreement ratification for protection of environmental defenders", "Advocate through SICA for Central American deforestation governance", "Push for international accountability for violence against environmental defenders"], infra: "Congreso Nacional de Honduras — unicameral legislature with 128 members. Honduras is a presidential democracy. SICA (Sistema de la Integración Centroamericana) — the Central American integration system." },
        ],
      },
    ],
  },
  // --- Croatia ---
  {
    code: "HR", name: "Croatia", region: "Europe",
    summary: "EU and Eurozone member ($93B GDP) with dominant services sector (60.8% GDP, tourism-heavy). Small oil sector (INA, partially owned by MOL). Agriculture at 2.9% GDP. Joined the euro and Schengen in 2023.",
    sectors: [
      {
        name: "Ultra-Processed Food", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Croatia's EU-integrated health insurance system (HZZO) tracks healthcare costs. Publishing diet-attributable disease costs per product category makes W computable from retail sales data.",
        breakPaths: ["Implement EU front-of-pack health labelling. Makes welfare costs visible to consumers.", "HZZO publication of diet-attributable healthcare cost data. Croatia's universal health insurance generates data to make W computable.", "Not fully breakable. Ultra-processing alters food matrix. Reformulation mandates reduce system dependence."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report to HAH (Croatian Food Agency)", "Use EU Whistleblower Directive protections (transposed 2022)", "Report misleading claims to AZTN (competition authority)"], infra: "HAH (Hrvatska agencija za hranu / Croatian Food Agency) — food safety authority. AZTN (Agencija za zaštitu tržišnog natjecanja) — competition authority. Croatia transposed the EU Whistleblower Directive in 2022." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["Croatian food companies: Invest in minimally processed alternatives", "Adopt Nutri-Score voluntarily", "Commission health-impact assessments"], infra: "Podravka, Kraš — major Croatian food companies. Agrokor/Fortenova Group — the largest food and retail conglomerate in Southeast Europe." },
          { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Health: Implement mandatory front-of-pack labelling", "HAH: Strengthen marketing claim enforcement", "HZZO: Publish diet-related expenditure data"], infra: "HZZO (Hrvatski zavod za zdravstveno osiguranje) — Croatia's health insurance fund. Ministry of Health oversees nutrition policy." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Zastupnik in the Hrvatski sabor to demand health-impact labelling", "Support EU Farm to Fork Strategy", "Advocate for WHO-aligned Ultra-Processed Food marketing restrictions"], infra: "Hrvatski sabor (Croatian Parliament) — unicameral, 151 members. Contact through sabor.hr. Croatia is an EU and Eurozone member." },
        ],
      },
    ],
  },
  // --- Haiti ---
  {
    code: "HT", name: "Haiti", region: "Caribbean",
    summary: "Fragile state ($25.2B GDP) — Western Hemisphere's poorest country. Agriculture at 15.9% GDP (coffee, mangoes, cocoa). Extreme deforestation (2% forest cover remaining). Gang violence and political instability. Manufacturing at 26.2% GDP (garment assembly).",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 2,
        whyBreakable: "Haiti's near-total deforestation (98% forest loss) means any remaining agriculture operates on severely degraded land. The system dependence is already partially broken — Haiti has experienced the endpoint of deforestation-driven agricultural collapse. Reforestation is the intervention.",
        breakPaths: ["Reform agricultural support to incentivize tree planting and agroforestry. When hillside farmers receive more support for tree crops (coffee, cocoa, fruit) than annual crops on degraded slopes, the overlapping interest in continued deforestation breaks.", "Satellite monitoring of remaining forest cover and soil erosion published at commune level. Making degradation visible makes W computable.", "Extreme system dependence — 98% forest loss means agricultural activity on degraded slopes directly causes erosion, flooding, and further land degradation. Reforestation is the only path to reducing system dependence."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Document deforestation through community organizations", "Report illegal charcoal production to MDE (Ministry of Environment)", "Engage international development organizations"], infra: "MDE (Ministère de l'Environnement) — the environment ministry, severely under-resourced. Note: Haiti's state institutions are largely non-functional due to the ongoing security and governance crisis. International organizations (UN, USAID, EU) provide most environmental programming." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["International agricultural companies: Support sustainable supply chains from Haiti", "Invest in tree crop processing (coffee, cacao, mango)", "Charcoal alternatives: Support LPG transition programs"], infra: "Haiti's private sector is small. The Chambre de Commerce d'Haïti coordinates business activities. International NGOs (Partners in Health, Trees for the Future) implement many development programs." },
          { level: "Regulator / Agency", role: "regulator", actions: ["MDE: Enforce (to extent possible) remaining forest protections", "MARNDR (Agriculture Ministry): Prioritize hillside agroforestry programs", "ONEV: Support reforestation monitoring"], infra: "MARNDR (Ministère de l'Agriculture, des Ressources Naturelles et du Développement Rural) — the agriculture ministry. ONEV (Observatoire National de l'Environnement et de la Vulnérabilité) — environmental monitoring." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support international reforestation and land restoration programs for Haiti", "Advocate through CARICOM for regional environmental support", "Push for debt-for-nature swaps to finance reforestation", "Support Haitian diaspora organizations working on environmental restoration"], infra: "Note: Haiti's democratic institutions are non-functional — no elected parliament since 2023, no elected president. Transitional governance is underway. International channels: UN Integrated Office in Haiti (BINUH), CARICOM, OAS, Haitian diaspora organizations." },
        ],
      },
    ],
  },
  // --- Hungary ---
  {
    code: "HU", name: "Hungary", region: "Europe",
    summary: "EU member ($222.7B GDP) with strong manufacturing (15.8% GDP, automotive-focused). Services at 59.5% GDP. Small oil and gas sector (MOL Group). Agriculture at 2.7% GDP. Democratic backsliding under Orbán government has strained EU relations.",
    sectors: [
      {
        name: "Ultra-Processed Food", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Hungary has one of Europe's highest obesity rates and introduced a 'chip tax' (NETA — népegészségügyi termékadó) on Ultra-Processed Food in 2011. When health insurance data (NEAK) links diet to healthcare costs per product category, W becomes computable.",
        breakPaths: ["Strengthen the NETA tax and extend to broader Ultra-Processed Food categories. Hungary's pioneering public health product tax weakens the overlapping interest in high-margin Ultra-Processed Food by internalizing health costs.", "NEAK publication of diet-attributable healthcare expenditure. Hungary's health insurance system generates data to make W computable.", "Not fully breakable. Ultra-processing alters food matrix. Reformulation targets can reduce system dependence."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report to NÉBIH (National Food Chain Safety Office)", "Document food safety violations", "Use Hungarian whistleblower law (transposition of EU Directive)"], infra: "NÉBIH (Nemzeti Élelmiszerlánc-biztonsági Hivatal) — Hungary's food chain safety authority. GVH (Gazdasági Versenyhivatal) — competition authority enforcing fair advertising. Hungary transposed the EU Whistleblower Directive." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["Hungarian food companies: Reformulate to reduce Ultra-Processed Food", "Invest in traditional Hungarian food products", "Adopt transparent nutritional labelling"], infra: "Major companies: Bonafarm Group, Pick Szeged. International companies operating in Hungary: Nestlé, Coca-Cola, PepsiCo." },
          { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Human Capacities: Strengthen NETA tax and expand coverage", "NÉBIH: Enforce marketing claim standards", "NEAK: Publish diet-related healthcare cost data"], infra: "NETA (népegészségügyi termékadó) — Hungary's public health product tax, one of the world's first Ultra-Processed Food taxes, introduced 2011. NEAK (Nemzeti Egészségbiztosítási Alapkezelő) — national health insurance fund." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Képviselő in the Országgyűlés to demand expansion of the NETA health tax", "Support EU-wide front-of-pack labelling through Farm to Fork Strategy", "Advocate for WHO-aligned Ultra-Processed Food marketing restrictions", "Push for EU cohesion funds for public health nutrition programs"], infra: "Országgyűlés (National Assembly of Hungary) — unicameral parliament, 199 members. Contact through parlament.hu." },
        ],
      },
    ],
  },
  // --- Indonesia ---
  {
    code: "ID", name: "Indonesia", region: "Southeast Asia",
    summary: "G20 economy ($1,396.3B GDP). World's largest palm oil producer (palm oil=~3.5% GDP). Significant coal (1.22% rents), oil/gas (1.61%), and mining (1.91%). Massive archipelago with extraordinary biodiversity. Palm oil expansion has driven catastrophic deforestation.",
    sectors: [
      {
        name: "Palm Oil", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Indonesia produces ~60% of global palm oil. EUDR compliance will require zero-deforestation traceability to plantation level. When per-plantation forest loss data is linked to palm oil transactions, W becomes computable from commodity prices.",
        breakPaths: [
          "EUDR compliance forcing zero-deforestation supply chain traceability. When international buyers require verified deforestation-free palm oil, the overlapping interest in clearing forest for new plantations breaks — productivity improvement on existing land becomes the viable model.",
          "Mandatory per-concession environmental data (fire occurrence, peat depth, biodiversity surveys) linked to ISPO certification. Indonesia's KLHK already monitors deforestation by satellite — publishing per-company data makes W computable.",
          "Partially breakable. Palm oil monoculture inherently reduces biodiversity. However, smallholder agroforestry and yield improvement on existing plantations can reduce pressure for new forest conversion.",
        ],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report illegal deforestation to KLHK (Ministry of Environment and Forestry)", "Document land rights violations — report to Komnas HAM (National Human Rights Commission)", "Report fire-setting to Satgas Karhutla (forest fire task force)"], infra: "KLHK (Kementerian Lingkungan Hidup dan Kehutanan) — the environment and forestry ministry, responsible for forest management, environmental regulation, and fire prevention. Komnas HAM (Komisi Nasional Hak Asasi Manusia) — the national human rights commission. WALHI (Wahana Lingkungan Hidup Indonesia / Friends of the Earth Indonesia) — the largest environmental NGO." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["Wilmar, Golden Agri-Resources, Sinar Mas: Implement full NDPE (No Deforestation, No Peat, No Exploitation) commitments", "Adopt Roundtable on Sustainable Palm Oil certification across all operations", "Invest in yield improvement rather than area expansion"], infra: "Wilmar International — the world's largest palm oil trader. Golden Agri-Resources (Sinar Mas Group) — one of the largest palm oil producers. GAPKI (Gabungan Pengusaha Kelapa Sawit Indonesia) — the Indonesian palm oil association. Roundtable on Sustainable Palm Oil and ISPO (Indonesian Sustainable Palm Oil) — certification standards." },
          { level: "Regulator / Agency", role: "regulator", actions: ["KLHK: Enforce the permanent moratorium on new primary forest and peatland conversion", "Strengthen ISPO mandatory certification with environmental performance metrics", "BPN (National Land Agency): Resolve overlapping land claims through One Map Policy"], infra: "One Map Policy (Kebijakan Satu Peta) — Indonesia's initiative to create a single, authoritative map of land use and forest cover to resolve overlapping concessions. BPDPKS (Badan Pengelola Dana Perkebunan Kelapa Sawit) — the palm oil plantation fund managing the CPO export levy." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the DPR (Dewan Perwakilan Rakyat) to demand enforcement of the forest moratorium and peatland protection", "Support EUDR implementation with adequate transition support for smallholders", "Advocate through ASEAN for regional zero-deforestation commitments", "Push for international tropical forest conservation finance"], infra: "DPR (Dewan Perwakilan Rakyat / People's Representative Council) — lower house, 580 members. DPD (Dewan Perwakilan Daerah / Regional Representative Council) — upper house, 136 members. Contact through dpr.go.id. Indonesia is a presidential democracy and the world's third-largest democracy." },
        ],
      },
    ],
  },
  // --- Ireland ---
  {
    code: "IE", name: "Ireland", region: "Europe",
    summary: "High-income EU economy ($609.2B GDP, inflated by multinational profit booking). Manufacturing at 29.6% GDP (pharma, tech). Major corporate tax hub. Agriculture at 1% GDP but intensive dairy farming with significant methane emissions. Services at 60.6% GDP.",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Ireland's dairy herd expansion post-milk-quota-abolition (2015) increased methane emissions by 20%+. When per-farm greenhouse gas data is published alongside output, W becomes computable from agricultural production data.",
        breakPaths: ["Reform CAP subsidies from production-linked to environmental outcome-linked. When dairy expansion no longer receives per-cow support, the overlapping interest in herd growth weakens.", "Mandatory per-farm greenhouse gas balance disclosure. Ireland's Bord Bia Origin Green program collects data — making it publicly verifiable makes W computable.", "Partially breakable. Ruminant digestion produces methane by biological process. Feed additives (e.g., 3-NOP) can reduce but not eliminate enteric methane."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report environmental violations to EPA Ireland", "Document water pollution from dairy — report to local authority water services", "Use Irish Protected Disclosures Act 2014 for protected reporting"], infra: "EPA (Environmental Protection Agency) — Ireland's environmental regulator. Protected Disclosures Act 2014 (amended 2022) — Ireland's whistleblower protection law, one of the strongest in Europe." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["Kerry Group, Glanbia, Ornua: Set binding methane reduction targets", "Invest in methane-reducing feed technologies", "Adopt Science Based Targets for Irish dairy operations"], infra: "Kerry Group — major food ingredients company. Glanbia — dairy and nutrition company. Ornua (formerly Irish Dairy Board) — manages Kerrygold brand. Teagasc — the agriculture and food development authority providing research and extension." },
          { level: "Regulator / Agency", role: "regulator", actions: ["DAFM: Reform agricultural supports toward emissions reduction", "EPA: Strengthen agricultural emissions monitoring", "Bord Bia: Make Origin Green data independently verifiable"], infra: "DAFM (Department of Agriculture, Food and the Marine) — Ireland's agriculture ministry. Bord Bia (Irish Food Board) — the food marketing agency running the Origin Green sustainability program." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your TD (Teachta Dála) or Senator to demand binding agricultural emissions reduction targets", "Support stronger EU CAP conditionality on methane", "Advocate for inclusion of agricultural methane in EU ETS", "Push for Ireland's Climate Action Plan sectoral emissions ceilings to be enforced"], infra: "Oireachtas (Parliament of Ireland) — bicameral: Dáil Éireann (160 TDs) and Seanad Éireann (60 Senators). Contact through oireachtas.ie. Ireland's Climate Action and Low Carbon Development Act (2021) sets legally binding emissions budgets." },
        ],
      },
    ],
  },
  // --- Israel ---
  {
    code: "IL", name: "Israel", region: "Middle East",
    summary: "High-tech economy ($540.4B GDP) with dominant services (72.5% GDP). High military expenditure (8.78% GDP). Gas production from Leviathan and Tamar fields (0.43% gas rents). Major tech sector — 'Startup Nation.' Water management leader (desalination, drip irrigation).",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Israel's Mediterranean gas fields (Leviathan, Tamar) were discovered in 2009-2010. Per-field emissions disclosure through ISA (Israel Securities Authority) listed company requirements makes W computable from production data.",
        breakPaths: ["Export gas to replace coal in Egypt and Jordan — net emissions benefit if displacing higher-carbon sources. But this locks in gas infrastructure. When renewable alternatives become cheaper for regional electricity, the overlapping interest weakens.", "Mandatory per-field emissions disclosure for Leviathan and Tamar operators. ISA reporting requirements provide the mechanism to make W computable.", "Not breakable by policy alone. Gas combustion releases CO₂."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report environmental violations to the Ministry of Environmental Protection", "Document offshore emissions — report through Delek/Chevron compliance channels", "Report to ISA if environmental, social, and governance disclosures are misleading"], infra: "Ministry of Environmental Protection — Israel's environmental authority. ISA (Israel Securities Authority) — regulates disclosure for listed companies including Delek Group. Israel has whistleblower protections under the Protection of Workers (Exposure of Offenses) Law, 1997." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["NewMed Energy (formerly Delek Drilling), Chevron: Set emissions reduction targets for Leviathan and Tamar", "Invest in regional renewable energy integration", "Adopt Task Force on Climate-Related Financial Disclosures-aligned disclosure"], infra: "NewMed Energy — operates Leviathan field. Chevron — acquired Noble Energy's interest in Tamar. Israel Natural Gas Lines (INGL) — the state-owned gas transmission company." },
          { level: "Regulator / Agency", role: "regulator", actions: ["Petroleum Commissioner: Require per-field emissions monitoring", "Electricity Authority: Accelerate renewable energy targets (Israel aims for 30% renewable by 2030)", "Ministry of Environmental Protection: Strengthen offshore environmental standards"], infra: "Petroleum Commissioner — within the Ministry of Energy, oversees oil and gas licensing. Electricity Authority — the independent electricity regulator. Israel's Electricity Market Reform aims to increase competition and renewable penetration." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the Knesset to demand binding renewable energy targets and gas emissions disclosure", "Support regional energy cooperation through the Eastern Mediterranean Gas Forum (EMGF)", "Advocate for Abraham Accords normalization to include renewable energy cooperation with Gulf states", "Push for OECD environmental performance review recommendations implementation"], infra: "Knesset (כנסת) — Israel's unicameral parliament, 120 members. Contact through knesset.gov.il. Israel is an OECD member. EMGF (Eastern Mediterranean Gas Forum) — regional organization for gas market coordination." },
        ],
      },
    ],
  },
  // --- Iraq ---
  {
    code: "IQ", name: "Iraq", region: "Middle East",
    summary: "Oil-dependent economy ($279.6B GDP) with 43.45% combined oil and gas rents — one of the world's highest. OPEC member producing ~4.5M bpd. Massive gas flaring (Iraq flares more gas than almost any other country). Post-conflict reconstruction ongoing.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Iraq flares $2.5B+ worth of associated gas annually. Capturing and monetizing flared gas makes W computable — the flared gas represents pure waste visible from satellite (World Bank GGFR data).",
        breakPaths: ["Gas capture and monetization. Iraq wastes $2.5B/year in flared gas. When gas capture infrastructure is built, the overlapping interest in flaring (which is cheaper short-term than processing) breaks as captured gas generates revenue.", "Satellite-based flare monitoring (VIIRS nightfire data) already makes gas flaring volumes visible globally. Linking per-field flaring data to production revenue makes W computable.", "Not breakable. Hydrocarbon combustion releases CO₂."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report environmental violations through international operator compliance channels (BP, TotalEnergies, ExxonMobil)", "Document gas flaring volumes — satellite data from World Bank GGFR provides independent verification", "Report through Iraq EITI channels"], infra: "Note: Iraq's institutional capacity for environmental regulation is limited. The Ministry of Oil oversees petroleum operations. EITI Iraq — Iraq has been EITI compliant since 2012. World Bank Global Gas Flaring Reduction Partnership (GGFR) — monitors and reports on global gas flaring using satellite data." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["BP (Rumaila), TotalEnergies (Halfaya), ExxonMobil (West Qurna): Invest in associated gas capture infrastructure", "Implement flare reduction targets", "SOMO (State Organization for Marketing of Oil): Adopt emissions disclosure standards"], infra: "BP operates Rumaila (Iraq's largest field). TotalEnergies has the $27B Gas Growth Integrated Project (GGIP) to capture associated gas. ExxonMobil, Lukoil, PetroChina — other major operators. Basra Oil Company — manages southern oil fields." },
          { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Oil: Enforce gas flaring reduction targets in Technical Service Contracts", "Ministry of Environment: Strengthen air quality enforcement near oil fields", "EITI Iraq: Expand reporting to include flaring and emissions data"], infra: "Ministry of Oil — oversees all petroleum operations and manages Technical Service Contracts (TSCs) with international operators. Ministry of Environment — responsible for environmental policy but severely under-resourced." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support World Bank GGFR zero routine flaring by 2030 initiative for Iraq", "Advocate through OPEC for managed transition and gas monetization investment", "Push for international climate finance for gas capture infrastructure", "Support UN Iraq partnership on environmental governance capacity building"], infra: "Note: Iraq is a parliamentary democracy but governance is fragmented among sectarian and ethnic power blocs. Council of Representatives (Majlis al-Nuwab, 329 members). International channels: OPEC membership, World Bank, UNAMI (UN Assistance Mission for Iraq), GGFR." },
        ],
      },
    ],
  },
  // --- Iran ---
  {
    code: "IR", name: "Iran, Islamic Rep.", region: "Middle East",
    summary: "Major oil and gas producer ($475.3B GDP) with 27.08% combined rents. World's second-largest natural gas reserves (after Russia). Under comprehensive international sanctions. Manufacturing at 20.6% GDP. Theocratic governance limits civic channels.",
    sectors: [
      {
        name: "Oil & Gas", beta: 6.2,
        pst: [true, true, true],
        mostBreakable: 0,
        whyBreakable: "International sanctions have already weakened the overlapping interest by restricting Iran's ability to monetize oil exports at market price. When sanctions enforcement eliminates the discount market, Iran's economic model requires diversification.",
        breakPaths: ["Sanctions enforcement. When Iran cannot sell oil at market prices, the economic case for renewable energy investment (Iran has excellent solar potential) strengthens. The overlapping interest in oil dependence breaks when export revenues are structurally constrained.", "Per-field environmental data is largely unavailable due to sanctions-related opacity. International satellite monitoring (methane detection) provides external data to estimate W.", "Not breakable. Hydrocarbon combustion releases CO₂."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report environmental violations to DoE (Department of Environment)", "Document air pollution and health impacts — Iran's cities rank among the world's most polluted", "Report through international academic and research channels"], infra: "DoE (سازمان حفاظت محیط زیست / Department of Environment) — Iran's environmental authority, which has limited enforcement power. NIOC (National Iranian Oil Company) — the state oil company. Note: Iran has no effective whistleblower protection. Civil society is severely constrained." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["NIOC: Reduce gas flaring and venting at production facilities", "Invest in domestic solar and wind energy development", "Implement emissions monitoring for major fields"], infra: "NIOC — controls all upstream oil and gas operations. NIGC (National Iranian Gas Company) — manages gas production and distribution. Pars Oil and Gas Company — manages South Pars/North Dome gas field operations." },
          { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Petroleum: Implement flaring reduction programs", "DoE: Strengthen air quality enforcement in Tehran and major cities", "Ministry of Energy: Accelerate renewable energy development"], infra: "Ministry of Petroleum — oversees oil and gas policy. Iran's Renewable Energy and Energy Efficiency Organization (SATBA) — responsible for renewable energy development. Iran has installed some solar and wind capacity but it remains a tiny fraction of energy supply." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support international climate cooperation mechanisms that include Iran", "Advocate through OPEC for managed transition planning", "Push for environmental conditionality in any future sanctions relief negotiations", "Support Iranian diaspora environmental advocacy organizations"], infra: "Note: Iran is a theocratic republic. The Islamic Consultative Assembly (Majles, 290 members) has limited power relative to the Supreme Leader and Guardian Council. International channels: OPEC, UNFCCC (Iran signed but did not ratify Paris Agreement), UN Environment Programme." },
        ],
      },
    ],
  },
  // --- Iceland ---
  {
    code: "IS", name: "Iceland", region: "Europe",
    summary: "Small advanced economy ($33.3B GDP) with 100% renewable electricity (geothermal and hydro). Fisheries are 5% of GDP and the largest Private-Systemic Tension exposure — Iceland's fisheries management is globally studied but faces sustainability challenges from ocean warming.",
    sectors: [
      {
        name: "Fisheries", beta: 4.72,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Iceland's ITQ (Individual Transferable Quota) system generates detailed per-vessel catch data. When ecosystem health metrics (stock assessments, bycatch, seabed impact) are published alongside fishing revenue, W becomes computable.",
        breakPaths: ["Reform ITQ allocations to include ecosystem impact costs. When quota holders pay for bycatch and seabed damage, the overlapping interest in maximum extraction weakens.", "Publish per-vessel ecosystem impact data alongside catch revenue. Iceland's Marine and Freshwater Research Institute already conducts stock assessments — linking to economic data makes W computable.", "Partially breakable. Fishing inherently removes biomass from marine ecosystems. However, science-based quota management can keep extraction within sustainable yield limits."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report quota violations to Fiskistofa (Directorate of Fisheries)", "Document bycatch or illegal discarding", "Use Iceland's whistleblower protections"], infra: "Fiskistofa (Directorate of Fisheries) — responsible for fisheries management, quota enforcement, and monitoring. Hafrannsóknastofnun (Marine and Freshwater Research Institute) — conducts stock assessments and marine research." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["Samherji, Íslandsbanki: Adopt sustainability-linked targets for fishing operations", "Implement per-vessel bycatch reduction technology", "Support ecosystem-based fisheries management"], infra: "Samherji — Iceland's largest fishing company. Brim, HB Grandi — other major fishing companies. SFS (Samtök fyrirtækja í sjávarútvegi / Federation of Icelandic Fishing Vessel Owners) — the industry association." },
          { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Food, Agriculture and Fisheries: Reform ITQ system to include ecosystem impact costs", "Marine Research Institute: Publish ecosystem health indicators alongside quota recommendations", "Fiskistofa: Strengthen monitoring and enforcement"], infra: "Ministry of Food, Agriculture and Fisheries — oversees fisheries policy. The ITQ (Individual Transferable Quota) system — Iceland's fisheries management system, one of the world's most studied, allocating catch shares that can be traded." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the Alþingi to demand ecosystem-based fisheries management reform", "Support NEAFC (North-East Atlantic Fisheries Commission) sustainable management measures", "Advocate for Arctic Council fisheries governance coordination", "Push for inclusion of ecosystem health metrics in national accounts"], infra: "Alþingi (Althing) — Iceland's unicameral parliament, 63 members, one of the world's oldest legislatures (established 930 CE). Contact through althingi.is. NEAFC — the regional fisheries management organization for the Northeast Atlantic." },
        ],
      },
    ],
  },
  // --- Channel Islands ---
  {
    code: "JG", name: "Channel Islands", region: "Europe",
    summary: "British Crown Dependencies ($12.5B GDP) — Jersey and Guernsey. Major offshore financial centers (91.2% services). Financial services dominate with significant fund administration and trust structures. Not part of the UK or EU but closely aligned with UK regulatory standards.",
    sectors: [
      {
        name: "Financial Services", beta: 4.2,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Channel Islands' financial services facilitate global capital flows with lower transparency than UK mainland. When beneficial ownership data and tax transparency information are published, W becomes computable from financial intermediation data.",
        breakPaths: ["Full beneficial ownership transparency aligned with UK Economic Crime Act requirements. When financial secrecy is eliminated, the overlapping interest between service providers and opacity-seeking clients weakens.", "Mandatory CRS (Common Reporting Standard) enhanced reporting. Publishing aggregate capital flow data makes W computable.", "Partially breakable. Financial intermediation can relocate but the Channel Islands' proximity to London and established legal infrastructure create switching costs."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report suspicious transactions to JFIU (Joint Financial Intelligence Unit) in Jersey or FIS (Financial Intelligence Service) in Guernsey", "Document regulatory violations — report to JFSC or GFSC", "Report through internal bank compliance channels"], infra: "JFSC (Jersey Financial Services Commission) — Jersey's financial regulator. GFSC (Guernsey Financial Services Commission) — Guernsey's financial regulator. JFIU / FIS — financial intelligence units." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["Implement enhanced beneficial ownership due diligence", "Adopt environmental, social, and governance integration across fund and trust structures", "Align with UK transparency standards ahead of regulatory mandates"], infra: "Channel Islands host operations of major international banks and fund administrators. Jersey Finance and Guernsey Finance promote the financial services sectors." },
          { level: "Regulator / Agency", role: "regulator", actions: ["JFSC/GFSC: Strengthen beneficial ownership verification", "Implement UK Economic Crime Act-aligned transparency", "Enforce enhanced AML due diligence requirements"], infra: "JFSC — Jersey's integrated financial regulator. GFSC — Guernsey's equivalent. Both crown dependencies have their own regulatory frameworks but coordinate closely with UK authorities." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Engage through UK Parliament channels — the Crown Dependencies' constitutional relationship means the UK Parliament has ultimate legislative authority", "Support OECD Global Forum on Transparency standards", "Advocate for Moneyval enhanced evaluation compliance", "Push for alignment with EU AMLD standards"], infra: "States of Jersey (49 members) and States of Guernsey (38 members) — the insular legislatures. Constitutional relationship with UK means UK Parliament can legislate for the Crown Dependencies on international obligations." },
        ],
      },
    ],
  },
  // --- Jamaica ---
  {
    code: "JM", name: "Jamaica", region: "Caribbean",
    summary: "Caribbean island economy ($22B GDP) with tourism and services dominant (60% GDP). Agriculture at 8% GDP. Bauxite/alumina industry historically significant but declining. Climate-vulnerable. High debt burden (IMF structural adjustment).",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Jamaica's agricultural sector is dominated by sugar and banana monoculture on degraded soils. When soil health and watershed degradation data is published alongside agricultural output, W becomes computable.",
        breakPaths: ["Reform agricultural subsidies toward crop diversification and agroforestry. When farmers receive support for diverse crops rather than monoculture sugar, the overlapping interest breaks.", "Publish watershed health and soil erosion data linked to agricultural practices. NEPA collects environmental data — linking to farming output makes W computable.", "Partially breakable. Tropical monoculture inherently degrades soil. Jamaica's Blue Mountain coffee model shows premium diversification is viable."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report environmental violations to NEPA (National Environment and Planning Agency)", "Document agricultural chemical misuse — report to RADA (Rural Agricultural Development Authority)", "Report through industry self-regulation channels"], infra: "NEPA (National Environment and Planning Agency) — Jamaica's environmental authority. RADA — provides agricultural extension services." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["Sugar Company of Jamaica Holdings: Diversify beyond sugar monoculture", "Invest in specialty crop development (Blue Mountain coffee, cocoa)", "Adopt soil health monitoring"], infra: "Sugar Industry Authority — regulates Jamaica's sugar sector. Jamaica Producers Group — diversified agricultural company." },
          { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Agriculture: Reform subsidy structure toward diversification", "NEPA: Strengthen watershed protection enforcement", "SIA (Sugar Industry Authority): Support sugar industry transition"], infra: "Ministry of Agriculture and Fisheries — oversees agricultural policy. SIA — regulates the sugar industry." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Member of Parliament in the House of Representatives or Senator to demand agricultural diversification support", "Support CARICOM agricultural resilience initiatives", "Advocate for climate adaptation finance for Caribbean agriculture", "Push for debt-for-nature swaps"], infra: "Parliament of Jamaica — bicameral: House of Representatives (63 members) and Senate (21 appointed). Jamaica is a Westminster-style parliamentary democracy." },
        ],
      },
    ],
  },
  // --- Jordan ---
  {
    code: "JO", name: "Jordan", region: "Middle East",
    summary: "Water-scarce Middle Eastern economy ($53.4B GDP) with limited natural resources. Services at 60.4% GDP. High military expenditure (4.8% GDP). Manufacturing at 17.7% (phosphate, potash, pharmaceuticals). Among the world's most water-stressed countries.",
    sectors: [
      {
        name: "Mining", beta: 4.7,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Jordan's phosphate and potash mining (Arab Potash Company, Jordan Phosphate Mines Company) depletes Dead Sea water levels and contaminates groundwater. When environmental cost data is published alongside mining revenue, W becomes computable.",
        breakPaths: ["Internalize environmental costs (Dead Sea decline, water depletion) into mining operations through environmental levies. When miners pay for water extraction in one of Earth's most water-stressed countries, the overlapping interest in water-intensive extraction weakens.", "Publish per-mine water consumption and Dead Sea level impact data. Jordan's water authority collects data — linking to mining output makes W computable.", "Partially breakable. Mining inherently uses water. However, water recycling and dry processing can reduce per-ton water consumption."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report environmental violations to the Ministry of Environment", "Document water extraction impacts — report to WAJ (Water Authority of Jordan)", "Report through JPMC or APC compliance channels"], infra: "Ministry of Environment — Jordan's environmental authority. WAJ (Water Authority of Jordan) — manages the country's severely limited water resources. Jordan has approximately 60 cubic meters of renewable water per capita — far below the 500 m³ threshold for absolute water scarcity." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["JPMC (Jordan Phosphate Mines Company): Implement water recycling targets", "APC (Arab Potash Company): Adopt Dead Sea impact mitigation measures", "Both: Adopt per-unit environmental impact reporting"], infra: "JPMC — one of the world's largest phosphate producers. APC (Arab Potash Company) — extracts potash from the Dead Sea." },
          { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Energy: Integrate environmental costs into mining royalty calculations", "WAJ: Enforce water extraction limits for mining operations", "ASEZA (Aqaba Special Economic Zone): Apply environmental standards to industrial activities"], infra: "Ministry of Energy and Mineral Resources — oversees mining policy. NRA (Natural Resources Authority) — the mining regulatory body." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the Majlis al-Nuwab (House of Representatives) to demand water conservation requirements for mining", "Support Red Sea-Dead Sea Canal alternatives for Dead Sea stabilization", "Advocate through World Bank for environmental governance of Dead Sea", "Push for OECD water governance recommendations implementation"], infra: "Majlis al-Umma (Parliament of Jordan) — bicameral: Majlis al-Nuwab (House of Representatives, 130 members, elected) and Majlis al-Ayan (Senate, 65 appointed). Jordan is a constitutional monarchy with limited democratic space." },
        ],
      },
    ],
  },
  // --- Kenya ---
  {
    code: "KE", name: "Kenya", region: "Sub-Saharan Africa",
    summary: "East Africa's largest economy ($120.3B GDP) with agriculture at 22.5% GDP (tea, coffee, horticulture). Services at 55.3%. 90%+ renewable electricity (geothermal, hydro). Vibrant tech sector (M-Pesa). Wildlife tourism. Climate-vulnerable (drought cycles).",
    sectors: [
      {
        name: "Monoculture Agriculture", beta: 8.6,
        pst: [true, true, true],
        mostBreakable: 1,
        whyBreakable: "Kenya's tea and horticulture sectors use intensive farming on shrinking arable land. When per-farm water and pesticide data is published alongside export revenue, W becomes computable. Kenya's M-Pesa infrastructure enables farm-level data collection.",
        breakPaths: ["Reform agricultural export incentives to require environmental certification. When tea and flower exports must demonstrate sustainable water and pesticide use, the overlapping interest in intensive monoculture weakens.", "Farm-level environmental data collection using mobile technology (Kenya's digital infrastructure is advanced). Making water and chemical use visible per farm makes W computable.", "Partially breakable. Intensive horticulture inherently affects water and soil systems. However, Kenya's organic agriculture sector is growing and agroforestry can reduce system dependence."],
        actors: [
          { level: "Insider / Whistleblower", role: "insider", actions: ["Report environmental violations to NEMA (National Environment Management Authority)", "Document water pollution from flower farms — report to WRA (Water Resources Authority)", "Report pesticide violations to PCPB (Pest Control Products Board)"], infra: "NEMA (National Environment Management Authority) — Kenya's environmental regulator, responsible for environmental impact assessments, pollution control, and enforcement. WRA (Water Resources Authority) — manages water resources allocation and monitoring. PCPB (Pest Control Products Board) — regulates pesticide registration and use." },
          { level: "Investor / Capital Allocator", role: "investor", actions: ["KTDA (Kenya Tea Development Agency): Adopt Rainforest Alliance certification across all smallholder operations", "KFC (Kenya Flower Council): Strengthen environmental standards for cut flower production", "Invest in water-efficient irrigation technology"], infra: "KTDA — manages tea production for ~600,000 smallholder farmers. KFC (Kenya Flower Council) — the self-regulatory body for the cut flower industry. Unilever (Lipton/Ekaterra) — major buyer of Kenyan tea." },
          { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Agriculture: Reform agricultural incentives toward climate-resilient farming", "NEMA: Strengthen environmental monitoring in intensive horticulture zones", "AFA (Agriculture and Food Authority): Integrate environmental standards into crop certification"], infra: "Ministry of Agriculture, Livestock, Fisheries and Cooperatives — oversees agricultural policy. AFA — regulates agricultural commodities including tea, coffee, and horticultural products." },
          { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Member of Parliament in the National Assembly or Senator to demand environmental certification for agricultural exports", "Support African Union Comprehensive Africa Agriculture Development Programme (CAADP) sustainability targets", "Advocate for EU Green Deal recognition of Kenyan sustainability certifications", "Push for climate adaptation finance for Kenyan smallholder agriculture"], infra: "Parliament of Kenya — bicameral: National Assembly (349 members) and Senate (67 members). Contact through parliament.go.ke. Kenya's 2010 Constitution includes strong environmental protection provisions (Article 42 — right to a clean and healthy environment)." },
        ],
      },
    ],
  },
  // --- Kyrgyz Republic ---
  { code: "KG", name: "Kyrgyz Republic", region: "Central Asia", summary: "Small mountainous economy ($17.5B GDP) dominated by gold mining (Kumtor mine = 10%+ of GDP, min=11.15%). Agriculture at 8.6% GDP. Remittances from Russia significant. Parliamentary democracy (rare in Central Asia).", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Kumtor gold mine (Centerra Gold, now nationalized) operates near glaciers — tailings and cyanide contamination affect water systems. When environmental monitoring data is published, W becomes computable.", breakPaths: ["Environmental bonds and community benefit agreements for all mining. When remediation costs are internalized, marginal mines become unprofitable.", "Per-mine water quality and glacier impact monitoring published openly. Making environmental costs visible makes W computable.", "Partially breakable. Mining at high altitude inherently affects glacial systems. Improved tailings management can reduce impact."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to SAEPF (State Agency on Environmental Protection and Forestry)", "Document water contamination near Kumtor", "Report through Kyrgyzaltyn channels"], infra: "SAEPF — environmental agency. Kyrgyzaltyn — state gold company that took over Kumtor in 2022." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Kyrgyzaltyn: Implement international tailings management standards at Kumtor", "Adopt EITI enhanced reporting", "Invest in mine rehabilitation"], infra: "Kyrgyzaltyn — manages state mining interests. EITI Kyrgyz Republic — member since 2004." },
    { level: "Regulator / Agency", role: "regulator", actions: ["State Committee for Industry: Strengthen environmental licensing", "SAEPF: Increase monitoring capacity", "EITI: Expand to environmental data"], infra: "State Committee for Industry, Energy and Subsoil Use — mining regulator." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your deputy in the Jogorku Kenesh to demand environmental standards for mining", "Support EITI enhanced reporting", "Advocate for Central Asian regional water governance coordination"], infra: "Jogorku Kenesh (Supreme Council) — unicameral parliament, 90 members. Kyrgyzstan is Central Asia's most democratic country." }
  ]}] },
  // --- Cambodia ---
  { code: "KH", name: "Cambodia", region: "Southeast Asia", summary: "Lower-middle-income economy ($46.4B GDP) with garment manufacturing (27.8% GDP) and agriculture (16.6%). Mekong Delta deforestation ongoing. Authoritarian governance under Hun Manet (succeeded Hun Sen in 2023).", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Cambodia lost 25%+ of tree cover since 2000 — economic land concessions for rubber and sugar monoculture are primary drivers. Satellite monitoring makes deforestation computable.", breakPaths: ["Reform economic land concession system to require environmental compliance. When concession holders face revocation for deforestation, the overlapping interest weakens.", "Satellite-based forest monitoring (Global Forest Watch already tracks Cambodia extensively) linked to concession data makes W computable.", "Partially breakable. Monoculture inherently reduces biodiversity. Community-managed forests demonstrate alternative models."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report illegal logging to international monitoring organizations (Global Witness, LICADHO)", "Document land grabbing — report through international accountability mechanisms", "Report to FAO and development partner channels"], infra: "Note: Cambodia under CPP governance severely restricts civil society. LICADHO (Cambodian League for the Promotion and Defence of Human Rights) — one of the few remaining domestic human rights organizations. Global Witness has documented illegal logging and land concession abuses." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Concession holders: Implement zero-deforestation commitments", "International buyers: Require supply chain traceability for Cambodian rubber and sugar", "Adopt Roundtable on Sustainable Palm Oil/equivalent certification"], infra: "Major economic land concessions are held by politically connected companies and foreign investors (Chinese, Vietnamese, Thai companies). The garment sector (H&M, Gap supply chains) has environmental certification requirements." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Agriculture: Reform economic land concession environmental conditions", "Ministry of Environment: Enforce protected area boundaries", "Forestry Administration: Strengthen community forestry programs"], infra: "Ministry of Agriculture, Forestry and Fisheries — oversees agricultural and forestry policy. Ministry of Environment — manages protected areas. Sub-Decree 146 on Economic Land Concessions governs the ELC system." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Advocate through ASEAN for regional deforestation governance", "Support EU EBA (Everything But Arms) trade preference conditionality on human rights and environmental standards", "Push for Mekong River Commission environmental standards enforcement", "Support international accountability mechanisms for land concession abuses"], infra: "Note: Cambodia's National Assembly (125 members) is dominated by the CPP. The Senate (62 members) is similarly controlled. International channels: ASEAN, Mekong River Commission, EU EBA trade preferences (EU has partially withdrawn preferences citing human rights concerns)." }
  ]}] },
  // --- Kuwait ---
  { code: "KW", name: "Kuwait", region: "Middle East", summary: "Wealthy petrostate ($160.2B GDP) with 29.28% combined oil and gas rents. Kuwait Petroleum Corporation (KPC) manages all oil operations. Kuwait Investment Authority (KIA) is one of the world's oldest sovereign wealth funds. Constitutional monarchy with elected parliament.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Kuwait's Burgan oil field (world's second-largest) is mature. As production costs rise, the overlapping interest weakens. KIA sovereign wealth provides a diversification mechanism.", breakPaths: ["KIA investment diversification away from fossil fuels. When the sovereign wealth fund's returns from non-oil investments exceed declining oil returns, the overlapping interest in oil dependence breaks.", "Per-field emissions disclosure for KPC operations. Making environmental costs visible makes W computable.", "Not breakable. Hydrocarbon combustion releases CO₂."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report environmental violations to EPA Kuwait", "Report through KPC internal channels", "Report to State Audit Bureau"], infra: "EPA Kuwait (Environment Public Authority) — the environmental regulator. KPC (Kuwait Petroleum Corporation) — the state oil company managing all upstream and downstream operations. State Audit Bureau — conducts financial oversight." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["KPC: Develop renewable energy division", "KIA: Adopt environmental, social, and governance investment criteria", "Implement emissions reduction targets"], infra: "KPC — manages Kuwait's entire petroleum value chain. KIA (Kuwait Investment Authority) — sovereign wealth fund, one of the world's largest." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Supreme Petroleum Council: Require emissions disclosure", "EPA: Strengthen environmental standards", "CBK: Integrate climate risk into financial supervision"], infra: "Supreme Petroleum Council — the supreme decision-making body for oil policy. CBK (Central Bank of Kuwait) — the financial regulator." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the Majlis al-Umma (National Assembly, 50 elected members) to demand sovereign wealth diversification and emissions transparency", "Advocate through GCC for regional energy transition coordination", "Support OPEC+ managed transition planning", "Push for IRENA recommendations on Gulf state energy transition"], infra: "Majlis al-Umma (National Assembly) — 50 elected members, one of the most active parliaments in the Gulf. Kuwait is a constitutional monarchy with genuine (if limited) parliamentary debate on oil policy." }
  ]}] },
  // --- Kazakhstan ---
  { code: "KZ", name: "Kazakhstan", region: "Central Asia", summary: "Central Asia's largest economy ($291.5B GDP) with massive oil (14.84%) and gas (2.04%) rents. Tengiz, Kashagan, and Karachaganak are mega-fields. Mining at 9.1% (uranium — world's largest producer, copper, gold). Coal at 0.85%. Authoritarian governance.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Kazakhstan's Kashagan field has suffered repeated delays and environmental incidents (H₂S — hydrogen sulfide). Environmental monitoring of H₂S emissions and Caspian Sea impact makes W computable from production data.", breakPaths: ["Redirect National Fund (sovereign wealth) investment toward economic diversification. When non-oil sectors grow faster than depleting oil revenue, the overlapping interest in continued extraction breaks.", "Per-field emissions and environmental monitoring disclosure (particularly H₂S at Kashagan). Making environmental and health costs visible makes W computable.", "Not breakable. Hydrocarbon extraction and combustion release CO₂ and H₂S."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to Ministry of Ecology and Natural Resources", "Report through Chevron/Shell/ExxonMobil compliance channels (major Tengiz/Kashagan partners)", "Report to EITI Kazakhstan"], infra: "Ministry of Ecology and Natural Resources — environmental authority. KazMunayGas — the national oil company. EITI Kazakhstan — member since 2007. Note: Civil society space is severely constrained." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["KazMunayGas: Develop transition plan with renewable targets", "NCOC (Kashagan), TCO (Tengiz): Implement H₂S management and emissions reduction", "Adopt Task Force on Climate-Related Financial Disclosures reporting"], infra: "NCOC (North Caspian Operating Company) — manages Kashagan (Shell, TotalEnergies, Eni, ExxonMobil, KMG, CNPC, Inpex). TCO (Tengizchevroil) — manages Tengiz (Chevron 50%, ExxonMobil 25%, KMG 20%, Lukoil 5%)." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Energy: Strengthen environmental conditions in production sharing agreements", "EITI Kazakhstan: Expand reporting to environmental data", "Samruk-Kazyna (sovereign wealth fund): Adopt environmental, social, and governance investment criteria"], infra: "Ministry of Energy — oversees oil, gas, and energy policy. Samruk-Kazyna — the national wealth fund holding state shares in KazMunayGas and other state enterprises. National Fund of the Republic of Kazakhstan — the sovereign wealth fund (managed by the National Bank) with $55B+ in assets." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Advocate through Tehran Convention for Caspian Sea environmental protection", "Support EITI enhanced reporting", "Push for Central Asian regional energy transition coordination", "Leverage Kazakhstan's OSCE chairmanship legacy for environmental governance"], infra: "Note: Kazakhstan under President Tokayev is rated 'Not Free.' The Mazhilis (lower house, 107 members) and Senate (50 members) do not function independently. International channels: EITI, Tehran Convention (Caspian environmental cooperation), SCO (Shanghai Cooperation Organisation), OSCE." }
  ]}] },
  // --- Lao PDR ---
  { code: "LA", name: "Lao PDR", region: "Southeast Asia", summary: "Landlocked Southeast Asian economy ($16.5B GDP) with agriculture at 16.8% GDP and mining at 3.89%. Major hydropower producer (dam exports to Thailand). One-party state. Severe debt crisis ($13B+ external debt, primarily to China).", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Laos's mining sector (gold, copper, potash) generates water contamination and community displacement. When environmental monitoring data is published alongside mining revenue, W becomes computable.", breakPaths: ["Environmental bonds for mining licenses. When remediation costs are pre-funded, marginal operations become uneconomic.", "Per-mine environmental data disclosure through international operator reporting. Making environmental costs visible makes W computable.", "Partially breakable. Mining disturbs landscapes but improved management can reduce impact."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through international mining company compliance channels", "Document environmental impacts through international monitoring organizations", "Report to MONRE (Ministry of Natural Resources and Environment)"], infra: "MONRE — Laos's environment ministry. Note: Laos is a one-party state (LPRP). No independent civil society or media." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["MMG (Sepon mine), PanAust (Phu Kham): Implement international environmental standards", "Adopt EITI reporting", "Invest in mine rehabilitation"], infra: "Major operators include MMG (China Minmetals subsidiary), PanAust. Lao government holds equity in major mines." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Energy and Mines: Strengthen environmental licensing", "MONRE: Increase monitoring capacity", "Support EITI candidacy"], infra: "Ministry of Energy and Mines — oversees mining and energy policy. Laos is not yet an EITI member." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Advocate through ASEAN for regional mining environmental standards", "Support Mekong River Commission environmental governance", "Push for international mining company home-country oversight", "Advocate for debt transparency and environmental conditionality in Chinese lending"], infra: "Note: National Assembly (164 members) is controlled by LPRP. International channels: ASEAN, Mekong River Commission, Asian Development Bank, World Bank." }
  ]}] },
  // --- Lebanon ---
  { code: "LB", name: "Lebanon", region: "Middle East", summary: "Collapsed economy ($20.1B GDP, down from $55B in 2018). Banking sector crisis wiped out savings. Services historically dominated. Political system based on sectarian power-sharing (confessionalism). Multiple concurrent crises — economic, political, refugee.", sectors: [{ name: "Financial Services", beta: 4.2, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Lebanon's banking sector collapse (2019-present) represents a Private-Systemic Tension endgame — the overlapping interest has already partially broken through crisis. The remaining Private-Systemic Tension is in the lack of accountability for banking sector losses.", breakPaths: ["Banking sector restructuring with full forensic audit of capital outflows. When accountability is established for the $72B+ in depositor losses, the overlapping interest between banks, politicians, and central bank in opacity breaks.", "Publication of forensic audit results (Alvarez & Marsal was contracted but access was blocked). Making the flow of funds visible makes W computable.", "Partially breakable — the crisis has already revealed system dependence. But without institutional reform, the same dynamics can rebuild."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Support the Alvarez & Marsal forensic audit by providing internal bank records", "Report capital flight data to the Special Investigation Commission", "Document through investigative journalism channels (Lebanon has relatively free press)"], infra: "SIC (Special Investigation Commission) — Lebanon's financial intelligence unit. BDL (Banque du Liban / Central Bank) — the central bank whose financial engineering scheme is at the center of the crisis. Note: Lebanon has some of the region's strongest press freedom." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Banks: Cooperate fully with forensic audit", "Disclose beneficial ownership of related-party lending", "Accept bail-in restructuring rather than socializing losses"], infra: "ABL (Association of Banks in Lebanon) — represents 60+ banks. BDL — the central bank. Lebanon's banking sector losses are estimated at $72B+." },
    { level: "Regulator / Agency", role: "regulator", actions: ["BDL: Complete the forensic audit of central bank operations", "Banking Control Commission: Enforce capital controls equitably", "Ministry of Finance: Implement IMF reform conditions"], infra: "Banking Control Commission — the banking supervisor. IMF — Lebanon reached a staff-level agreement in 2022 but reforms remain unimplemented." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Advocate through international mechanisms for completion of the forensic audit", "Support IMF program conditionality on banking sector transparency", "Push for international asset recovery of illicitly transferred funds", "Support Lebanese civil society accountability initiatives"], infra: "Note: Lebanon's parliament (128 members, elected on confessional basis) is functional but deeply divided. The political system is paralyzed by sectarian power-sharing. International channels: IMF, World Bank, CEDRE conference donors, French-led international support group." }
  ]}] },
  // --- Sri Lanka ---
  { code: "LK", name: "Sri Lanka", region: "South Asia", summary: "Island economy ($99B GDP) recovering from 2022 economic crisis. Agriculture at 8.3% GDP (tea, rubber, coconut). Manufacturing at 17.6% (garments). Tourism significant. Post-crisis IMF program. Historically one of Asia's highest human development indicators.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Sri Lanka's 2021 overnight organic farming mandate (banning chemical fertilizers) demonstrated how agricultural system dependence works — it caused immediate crop failure. The lesson: gradual transition with data makes W computable.", breakPaths: ["Gradual agricultural transition with per-farm soil health monitoring (learning from the 2021 failure). When transition is evidence-based rather than ideological, the overlapping interest in chemical-dependent monoculture weakens sustainably.", "Per-estate environmental data for tea, rubber, and coconut published alongside export revenue. Sri Lanka's Tea Research Institute collects data — making it public makes W computable.", "Partially breakable. Sri Lanka's 2021 experiment showed both the reality of system dependence (sudden decoupling fails) and its reducibility (gradual transition with soil biology rebuilding works)."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report pesticide violations to Registrar of Pesticides", "Document environmental degradation — report to CEA (Central Environmental Authority)", "Report through Plantation Human Development Trust channels"], infra: "CEA (Central Environmental Authority) — Sri Lanka's environmental regulator. Registrar of Pesticides — under the Department of Agriculture, regulates pesticide use. Tea Research Institute — conducts research on sustainable tea production." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Plantation companies: Invest in gradual organic transition with soil biology rebuilding", "Adopt Rainforest Alliance certification", "Implement precision agriculture to reduce chemical input dependency"], infra: "Major plantation companies: Kelani Valley Plantations, Bogawantalawa Tea Estates. Sri Lanka Tea Board — regulates the tea industry." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Agriculture: Develop evidence-based transition plan (learning from 2021 failure)", "Sri Lanka Tea Board: Integrate sustainability certification into export standards", "CEA: Strengthen watershed monitoring in plantation areas"], infra: "Ministry of Agriculture — oversees agricultural policy. Sri Lanka Tea Board — manages quality standards and exports." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of Parliament (Sri Lanka Pārlimēntuva) to demand evidence-based agricultural transition funding", "Support IMF program environmental conditionality", "Advocate for international climate adaptation finance for tea sector transition", "Push for EU GSP+ trade preference environmental standards compliance"], infra: "Parliament of Sri Lanka (225 members). Contact through parliament.lk. Sri Lanka is a semi-presidential republic. EU GSP+ — Sri Lanka benefits from preferential trade access contingent on human rights and environmental governance." }
  ]}] },
  // --- Lithuania ---
  { code: "LT", name: "Lithuania", region: "Europe", summary: "Baltic EU and Eurozone member ($84.9B GDP). Services at 63.6% GDP. Manufacturing at 14% GDP. Achieved energy independence from Russian gas (Klaipėda LNG terminal). Agriculture at 2.6% GDP.", sectors: [{ name: "Ultra-Processed Food", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Lithuania's health insurance system (VLK) tracks healthcare costs. Publishing diet-attributable disease costs makes W computable.", breakPaths: ["EU front-of-pack health labelling implementation.", "VLK publication of diet-related healthcare data.", "Not fully breakable. Reformulation can reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to VMVT (State Food and Veterinary Service)", "Use Lithuanian whistleblower law (2018, updated with EU Directive)"], infra: "VMVT (Valstybinė maisto ir veterinarijos tarnyba) — food and veterinary authority. Lithuania has whistleblower protection since 2018." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Lithuanian food companies: Reformulate Ultra-Processed Food products", "Adopt voluntary front-of-pack labelling"], infra: "Major companies: Vilniaus Pienine, Rokiškio Sūris (dairy)." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Health: Implement mandatory labelling", "VMVT: Enforce marketing standards", "VLK: Publish health expenditure data"], infra: "VLK (Valstybinė ligonių kasa / National Health Insurance Fund) — manages health insurance data." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the Seimas to demand health labelling", "Support EU Farm to Fork Strategy"], infra: "Seimas (Parliament of Lithuania) — unicameral, 141 members. Contact through lrs.lt." }
  ]}] },
  // --- Luxembourg ---
  { code: "LU", name: "Luxembourg", region: "Europe", summary: "Major EU financial center ($93.3B GDP, highest GDP per capita globally). Services at 81.2% GDP. World's second-largest investment fund domicile (after US). EU institutions host. Steel industry legacy (ArcelorMittal).", sectors: [{ name: "Financial Services", beta: 4.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Luxembourg's investment fund industry manages €5T+ in assets. When financed emissions and beneficial ownership are disclosed, W becomes computable from financial intermediation data.", breakPaths: ["Full EU SFDR and AMLD implementation. When fund-level financed emissions and beneficial ownership are transparent, the overlapping interest in opaque financial intermediation weakens.", "CSSF mandatory environmental, social, and governance disclosure for all Luxembourg-domiciled funds. Making climate impact visible per fund makes W computable.", "Partially breakable. Fund domiciliation can relocate, but Luxembourg's legal infrastructure and EU access create switching costs."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to CSSF (Commission de Surveillance du Secteur Financier)", "Report to CRF (Financial Intelligence Unit)", "Use Luxembourg whistleblower law (2023)"], infra: "CSSF — Luxembourg's financial regulator, supervising banks, investment funds, and other financial entities. CRF (Cellule de Renseignement Financier) — financial intelligence unit." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Fund managers: Adopt SFDR Article 9 classification where applicable", "Implement financed emissions reporting", "Adopt Science Based Targets for investment portfolios"], infra: "Luxembourg hosts 3,600+ investment funds. ALFI (Association of the Luxembourg Fund Industry) — the industry association." },
    { level: "Regulator / Agency", role: "regulator", actions: ["CSSF: Strengthen environmental, social, and governance disclosure enforcement", "BCL (Central Bank): Integrate climate risk into financial stability monitoring", "Implement EU Green Taxonomy alignment requirements"], infra: "CSSF — conducts supervision of the fund industry. BCL (Banque centrale du Luxembourg) — participates in ECB monetary policy and macroprudential supervision." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Député in the Chambre des Députés to demand enhanced financial transparency", "Support EU-wide beneficial ownership registry interconnection", "Advocate for OECD Base Erosion and Profit Shifting enforcement", "Push for Luxembourg Green Bond Framework expansion"], infra: "Chambre des Députés — unicameral parliament, 60 members. Contact through chd.lu. Luxembourg was instrumental in establishing the EU Green Bond Standard and hosts the Luxembourg Green Exchange." }
  ]}] },
  // --- Latvia ---
  { code: "LV", name: "Latvia", region: "Europe", summary: "Baltic EU and Eurozone member ($43.7B GDP). Services at 64.6% GDP. Forestry significant. Agriculture at 4% GDP. Post-Soviet economic transformation. NATO member.", sectors: [{ name: "Ultra-Processed Food", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Latvia's NVD health insurance tracks costs. Publishing diet-related data makes W computable.", breakPaths: ["EU front-of-pack labelling.", "NVD diet-related healthcare cost publication.", "Reformulation mandates reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to PVD (Food and Veterinary Service)", "Use Latvian whistleblower law (2022)"], infra: "PVD (Pārtikas un veterinārais dienests) — food and veterinary authority. Latvia transposed EU Whistleblower Directive in 2022." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Latvian food companies: Reformulate products", "Adopt voluntary labelling"], infra: "Major companies: Rīgas Piena kombināts, Latvijas Balzams." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Health: Implement labelling", "PVD: Enforce standards", "NVD: Publish health data"], infra: "NVD (Nacionālais veselības dienests / National Health Service) — manages health insurance." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your deputy in the Saeima to demand health labelling", "Support EU Farm to Fork"], infra: "Saeima — unicameral parliament, 100 members. Contact through saeima.lv." }
  ]}] },
  // --- Libya ---
  { code: "LY", name: "Libya", region: "North Africa", summary: "Oil-dependent fragile state ($48.5B GDP) with 60.96% combined oil and gas rents — one of the world's highest. NOC (National Oil Corporation) manages production (~1.2M bpd when not disrupted). Divided governance (Tripoli vs. eastern-based authorities). Ongoing instability since 2011.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Libya's oil production is repeatedly disrupted by factional conflict (fields and export terminals seized as bargaining chips). The overlapping interest is already partially broken by instability — production is not reliably monetizable.", breakPaths: ["Governance reform that depoliticizes oil revenue distribution. When oil revenue is managed through transparent, rules-based mechanisms (rather than factional control), the overlapping interest in capturing oil infrastructure weakens.", "NOC per-field production and revenue data disclosure. The Libyan Audit Bureau provides some oversight — extending to environmental data makes W computable.", "Not breakable. Hydrocarbon combustion releases CO₂."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through NOC internal channels", "Provide data to international monitoring (UN Panel of Experts on Libya)", "Report to Libyan Audit Bureau"], infra: "NOC (National Oil Corporation) — manages Libya's oil sector. Libyan Audit Bureau — provides financial oversight. UN Panel of Experts on Libya — monitors sanctions compliance and resource governance." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["NOC: Maintain operational independence from factional politics", "International partners (Eni, TotalEnergies, Repsol): Apply global environmental, social, and governance standards to Libyan operations", "Implement emissions monitoring"], infra: "NOC — the national oil company operating most production. Eni, TotalEnergies, Repsol, ConocoPhillips — major international operators." },
    { level: "Regulator / Agency", role: "regulator", actions: ["NOC: Implement transparent revenue management", "CBL (Central Bank of Libya): Unify financial management of oil revenues", "Audit Bureau: Expand environmental auditing"], infra: "CBL (Central Bank of Libya) — manages oil revenue. The division of the CBL between Tripoli and eastern-based institutions has complicated revenue management." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support UN-facilitated governance dialogue including oil revenue-sharing framework", "Advocate through African Union for stabilization with environmental governance", "Push for international monitoring of Libyan oil revenue flows", "Support EITI candidacy for Libya as part of governance reform"], infra: "Note: Libya has no functioning unified government or elected legislature. The House of Representatives (Tobruk) and High Council of State (Tripoli) are rival bodies. International channels: UN Support Mission in Libya (UNSMIL), African Union, Arab League." }
  ]}] },,
  { code: "MA", name: "Morocco", region: "North Africa", summary: "North African economy ($160.6B GDP) with agriculture at 10.6% GDP and growing renewable energy sector (Noor-Ouarzazate solar complex). Major phosphate producer (OCP Group — world's largest). Manufacturing at 15.3% GDP.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Morocco controls 70%+ of global phosphate reserves (OCP Group). Phosphate mining generates cadmium-contaminated waste and depletes water in arid regions. When per-mine environmental data is published alongside production revenue, W becomes computable.", breakPaths: ["Internalize water and cadmium remediation costs into phosphate pricing. When OCP pays for water depletion in already water-stressed regions, the overlapping interest in low-cost extraction weakens.", "Mandatory per-mine environmental disclosure (water use, cadmium levels, waste volumes). OCP already publishes sustainability reports — extending to independently verifiable per-mine data makes W computable.", "Partially breakable. Phosphate rock inherently contains cadmium. However, cadmium removal technologies exist and can reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to the Secrétariat d'État chargé du Développement Durable", "Document water impacts — report to ABH (Agence du Bassin Hydraulique)", "Report through OCP compliance channels"], infra: "Secrétariat d'État chargé du Développement Durable — oversees environmental policy. ABH — river basin agencies managing water resources. OCP Group — the state-owned phosphate company, one of Morocco's largest employers." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["OCP: Expand water recycling and desalination for mining operations", "Invest in cadmium removal technology", "Adopt per-mine environmental impact reporting"], infra: "OCP Group (Office Chérifien des Phosphates) — state-owned, controls ~30% of global phosphate trade. OCP has invested heavily in sustainability initiatives including the Mohammed VI Polytechnic University." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Energy and Mines: Strengthen environmental licensing for phosphate operations", "ONEE (Office National de l'Électricité et de l'Eau Potable): Monitor water impacts", "Department of Environment: Enforce cadmium disposal standards"], infra: "Ministry of Energy, Mines and Environment — oversees mining and environmental policy. ONEE — manages water supply infrastructure." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the Chambre des Représentants to demand water-neutral mining requirements", "Support African Fertilizer and Soil Health Summit commitments on sustainable phosphate use", "Advocate through Union for the Mediterranean for environmental standards", "Push for international cadmium limits in fertilizer trade (Codex Alimentarius)"], infra: "Parlement du Maroc — bicameral: Chambre des Représentants (395 members) and Chambre des Conseillers (120 members). Morocco is a constitutional monarchy with an elected parliament." }
  ]}] },
  { code: "MC", name: "Monaco", region: "Europe", summary: "City-state ($11.1B GDP) with 87.2% services. Major financial center and tourism hub. No income tax for individuals. World's highest GDP per capita and population density. Limited Private-Systemic Tension exposure except through financial intermediation.", sectors: [{ name: "Financial Services", beta: 4.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Monaco's financial services facilitate wealth management with favorable tax treatment. When beneficial ownership and tax transparency data are published, W becomes computable.", breakPaths: ["Full compliance with OECD Global Forum transparency standards and CRS information exchange. When opacity is eliminated, the overlapping interest weakens.", "Publication of aggregate beneficial ownership and capital flow data. Makes W computable.", "Partially breakable. Financial services can relocate but Monaco's brand and geographic advantages create switching costs."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to SICCFIN (Service d'Information et de Contrôle sur les Circuits Financiers)", "Report to CCAF (Commission de Contrôle des Activités Financières)", "Use internal compliance channels"], infra: "SICCFIN — Monaco's financial intelligence unit. CCAF — the financial activities supervisory commission." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Banks: Implement enhanced CRS compliance", "Adopt full beneficial ownership transparency", "Integrate environmental, social, and governance into wealth management"], infra: "Monaco hosts branches of major international banks. Association Monégasque des Activités Financières (AMAF) — the financial industry association." },
    { level: "Regulator / Agency", role: "regulator", actions: ["CCAF: Strengthen AML enforcement", "SICCFIN: Enhance suspicious transaction monitoring", "Government: Align with EU transparency standards"], infra: "CCAF — Monaco's financial regulator. Monaco is not an EU member but has a customs union with France and cooperates on financial regulation." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Engage through the Conseil National (24 members) on financial transparency legislation", "Support OECD Global Forum recommendations", "Align with EU AMLD standards through bilateral agreements", "Support Moneyval evaluations"], infra: "Conseil National — Monaco's unicameral parliament, 24 members. Monaco is a constitutional monarchy (Prince Albert II). Moneyval (Council of Europe) evaluates Monaco's AML framework." }
  ]}] },
  { code: "MD", name: "Moldova", region: "Europe", summary: "Small Eastern European economy ($18.2B GDP). Agriculture at 7.1% GDP (wine, agriculture). Services at 62.3%. EU candidate country (2022). Significant remittance dependence. Energy dependent on Russian gas (via Transnistria).", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Moldova's agricultural sector is dominated by grain monoculture on degraded chernozem soils. When soil health data is linked to agricultural output, W becomes computable.", breakPaths: ["EU accession agricultural alignment — CAP-style environmental conditionality. When subsidies reward soil health, the overlapping interest in exhaustive monoculture weakens.", "Mandatory soil health monitoring per farm. Moldova's fertile chernozem soils are degrading — making this visible makes W computable.", "Partially breakable. Grain monoculture degrades soil. Crop rotation and cover cropping can reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to Environmental Agency", "Document soil degradation — report through ACSA (Agency for Intervention and Payments in Agriculture)"], infra: "Environmental Agency — environmental monitoring. ACSA — manages agricultural payments." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Agricultural companies: Adopt crop rotation and cover cropping", "Invest in soil health measurement", "Target EU market standards ahead of accession"], infra: "Moldova's agricultural sector is fragmented among smallholders and medium enterprises." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Agriculture: Reform subsidies toward environmental conditionality", "Environmental Agency: Strengthen soil monitoring", "Implement EU CAP-alignment measures"], infra: "Ministry of Agriculture and Food Industry — oversees agricultural policy." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your deputy in the Parlamentul Republicii Moldova (101 members) to demand soil health legislation", "Support EU accession environmental alignment", "Advocate for agricultural transition support through EU pre-accession assistance"], infra: "Parlamentul Republicii Moldova — unicameral, 101 members. Contact through parlament.md. Moldova is an EU candidate country." }
  ]}] },
  { code: "MG", name: "Madagascar", region: "Sub-Saharan Africa", summary: "Biodiversity hotspot economy ($17.4B GDP). Agriculture at 22.5% GDP. One of Earth's most biodiverse countries (90%+ species endemic). Devastating deforestation (fr=5.45% forest rents). Mining growing (ilmenite, nickel). Extreme poverty.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Madagascar's slash-and-burn agriculture (tavy) has destroyed 90%+ of original forest. When deforestation data is linked to agricultural output, W becomes computable.", breakPaths: ["Alternative livelihood programs replacing tavy with agroforestry. When tree-crop income exceeds slash-and-burn yields, the overlapping interest in forest clearing breaks.", "Satellite deforestation monitoring linked to commune-level agricultural data. Makes W computable.", "Extreme system dependence. Tavy on degraded laterite soils causes erosion and desertification. Madagascar's red soil runoff is visible from space."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report illegal deforestation to Madagascar National Parks (MNP)", "Document through international conservation organizations (WWF, Conservation International)", "Report rosewood trafficking to CITES authorities"], infra: "MNP (Madagascar National Parks) — manages protected areas. WWF, Conservation International, WCS — major international conservation organizations with Madagascar programs." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Mining companies (Rio Tinto/QMM, Ambatovy): Implement biodiversity offsets", "Vanilla and clove exporters: Adopt sustainable sourcing certification", "International buyers: Require deforestation-free supply chains"], infra: "QMM (QIT Madagascar Minerals, Rio Tinto subsidiary) — ilmenite mining. Ambatovy — nickel and cobalt mine (Sumitomo). Madagascar is the world's largest vanilla producer." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Environment: Enforce protected area boundaries", "Ministry of Agriculture: Support agroforestry transition", "ONE (Office National pour l'Environnement): Strengthen environmental impact assessment"], infra: "ONE (Office National pour l'Environnement) — the environmental assessment authority. MEEF (Ministère de l'Environnement et de l'Écologie et des Forêts) — environment ministry." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Député in the Assemblée nationale (151 members) to demand enforcement of the Forest Code", "Support REDD+ climate finance for Madagascar's forests", "Advocate for CITES enforcement on rosewood trafficking", "Push for international biodiversity finance through GEF and Green Climate Fund"], infra: "Assemblée nationale de Madagascar — 151 members. Sénat — 18 members. Madagascar is a semi-presidential republic." }
  ]}] },
  { code: "MK", name: "North Macedonia", region: "Europe", summary: "Small Western Balkan economy ($17B GDP). Manufacturing at 14.3% GDP. Services at 56.2%. EU candidate country. Coal-dependent energy. Agriculture at 6.1% GDP.", sectors: [{ name: "Coal", beta: 6.1, pst: [true, true, true], mostBreakable: 0, whyBreakable: "North Macedonia's lignite dependence (Bitola power plant) faces EU accession conditionality. EU ETS alignment will make coal uncompetitive.", breakPaths: ["EU accession requiring ETS alignment. Coal becomes uncompetitive at EU carbon prices.", "Per-plant emissions and health cost disclosure. Makes W computable.", "Not breakable. Coal combustion releases pollutants."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to Ministry of Environment and Physical Planning", "Document air pollution health impacts"], infra: "Ministry of Environment and Physical Planning — environmental authority. North Macedonia is an Energy Community member." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["ESM (Elektrani na Severna Makedonija): Develop coal phase-out plan", "Invest in solar energy (excellent potential)"], infra: "ESM — state electricity company operating the Bitola lignite plant." },
    { level: "Regulator / Agency", role: "regulator", actions: ["ERC: Reform tariffs to reflect environmental costs", "Energy Community Secretariat: Enforce environmental compliance"], infra: "ERC (Energy Regulatory Commission) — energy regulator. Energy Community Treaty membership requires EU energy acquis alignment." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Пратеник in the Sobranie (120 members) to demand coal phase-out timeline", "Support EU Just Transition Fund pre-accession assistance", "Advocate through Energy Community for transition support"], infra: "Sobranie (Assembly of North Macedonia) — unicameral, 120 members. EU candidate country." }
  ]}] },
  { code: "ML", name: "Mali", region: "Sub-Saharan Africa", summary: "Sahelian economy ($26.8B GDP) with gold mining (16.18% GDP) and agriculture (33.3% GDP). Military junta since 2020-2021 coups. Security crisis (jihadist insurgency). Third-largest gold producer in Africa.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Mali's gold mining generates mercury contamination (artisanal) and cyanide risks (industrial). When environmental data is published alongside production, W becomes computable.", breakPaths: ["International supply chain due diligence requiring mine-level environmental compliance. When buyers verify conditions, the overlapping interest in unregulated extraction weakens.", "Per-mine environmental monitoring published through EITI. Mali's EITI membership provides the framework.", "Partially breakable. Mining disturbs landscapes. Mercury-free processing can reduce artisanal mining system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through international mining company channels (Barrick Gold, B2Gold)", "Report to DNGM (Direction Nationale de la Géologie et des Mines)", "Document through international monitoring organizations"], infra: "DNGM — national geological and mining directorate. Note: Mali is under military rule (CNSP). Civil society space is restricted." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Barrick Gold (Loulo-Gounkoto), B2Gold (Fekola): Implement international environmental standards", "Support artisanal mining formalization", "Adopt EITI enhanced reporting"], infra: "Barrick Gold — operates Loulo-Gounkoto complex. B2Gold — operates Fekola mine. Resolute Mining — operates Syama mine. EITI Mali — member since 2006." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Mines: Enforce Mining Code environmental provisions", "DNGM: Improve artisanal mining oversight", "EITI Mali: Expand to environmental data"], infra: "Ministry of Mines, Energy and Water — oversees mining policy. Mali's 2019 Mining Code establishes environmental obligations." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Advocate through African Union for return to democratic governance with mining transparency", "Support ECOWAS engagement on governance and environmental standards", "Push for Minamata Convention enforcement on mercury in artisanal mining", "Support international mining company home-country oversight"], infra: "Note: Military transition government. National Transitional Council replaces elected legislature. International channels: ECOWAS (Mali suspended), African Union, EITI Board." }
  ]}] },
  { code: "MM", name: "Myanmar", region: "Southeast Asia", summary: "Resource-rich economy ($74.1B GDP) under military junta since 2021 coup. Gas rents 4.4%. Jade and gem mining (est. $31B/year — more than formal GDP). Agriculture at 20.8% GDP. Civil war affecting multiple regions.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Myanmar's jade industry is largely opaque — estimated at $31B/year but mostly unrecorded. When jade revenue flows are made visible (Global Witness has documented significant flows to military), W becomes computable.", breakPaths: ["International sanctions targeting jade and gem revenues flowing to the military junta. When revenue is blocked, the overlapping interest between the military and jade mining weakens.", "Supply chain transparency for jade and gems using blockchain traceability. Global Witness and others have documented the flows — formalizing this breaks system independence.", "Partially breakable. Mining inherently disturbs landscapes. Myanmar's jade mines in Kachin State have caused catastrophic landslides."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through international monitoring organizations (Global Witness, Justice for Myanmar)", "Document military revenue flows from jade and gems", "Provide data to international sanctions authorities"], infra: "Note: Myanmar under the military junta (State Administration Council) has no functioning civil society space. Global Witness has published extensive reports on Myanmar's jade industry. Justice for Myanmar — international advocacy organization documenting military business interests." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["International gem buyers: Require provenance verification excluding military-linked mines", "Jewelers (Tiffany, Cartier): Adopt Myanmar jade sourcing policies aligned with OECD Due Diligence Guidance", "Apply conflict mineral frameworks to jade and gems"], infra: "Myanmar Gems Enterprise — military-controlled entity managing gem auctions. International buyers increasingly apply conflict mineral frameworks to Myanmar sourcing." },
    { level: "Regulator / Agency", role: "regulator", actions: ["International sanctions authorities: Expand targeted sanctions on military mining revenues", "OECD: Include jade in conflict mineral due diligence guidance", "Responsible Jewellery Council: Strengthen Myanmar sourcing standards"], infra: "International engagement only — domestic regulation under junta is not independent." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support targeted international sanctions on Myanmar military mining revenues", "Advocate through ASEAN for governance reform", "Push for UN Security Council action on Myanmar military's resource exploitation", "Support National Unity Government (NUG) environmental governance framework"], infra: "Note: Myanmar's elected parliament (Pyidaungsu Hluttaw) was dissolved by the military coup. The National Unity Government (NUG) — the democratic opposition government in exile — has proposed alternative governance frameworks. International channels: ASEAN (Special Envoy process), UN Human Rights Council, targeted sanctions by US, EU, UK." }
  ]}] },
  { code: "MN", name: "Mongolia", region: "East Asia", summary: "Resource-dependent landlocked economy ($23.8B GDP). Mining at 26.57% GDP (copper, coal, gold). Coal at 4.89% GDP. Oyu Tolgoi copper-gold mine (Rio Tinto/Turquoise Hill). Parliamentary democracy — rare in the region.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Mongolia's mining sector (particularly coal and copper) generates dust pollution and depletes water in the Gobi. When per-mine environmental data is linked to production revenue, W becomes computable.", breakPaths: ["Environmental bonds and water-use fees reflecting true scarcity. When mining companies pay for water in arid steppe, the overlapping interest in water-intensive extraction weakens.", "Per-mine environmental monitoring data published through EITI Mongolia. Makes W computable.", "Partially breakable. Mining in arid environments inherently affects limited water resources. However, dry processing and water recycling can reduce dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to MNET (Ministry of Nature, Environment and Tourism)", "Document through herder community organizations", "Report through Rio Tinto/Oyu Tolgoi compliance channels"], infra: "MNET — environmental authority. EITI Mongolia — member since 2007. Mongolia has relatively active civil society for the region." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Oyu Tolgoi (Rio Tinto): Implement water recycling and environmental monitoring", "Erdenes Mongol (state mining company): Adopt environmental, social, and governance standards", "Coal miners (Energy Resources, Aspire Mining): Develop transition plans"], infra: "Oyu Tolgoi — the giant copper-gold mine (Rio Tinto 66%, Government 34%). Erdenes Mongol — state mining holding company. Tavan Tolgoi — massive coal deposit." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MRAM (Mineral Resources and Petroleum Authority): Strengthen environmental licensing", "MNET: Enforce water extraction limits", "EITI Mongolia: Expand to environmental data"], infra: "MRAM — the mining regulator. Mongolia's 2006 Minerals Law governs mining licensing." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the State Great Khural (76 members) to demand environmental bonds for all mining licenses", "Support EITI enhanced reporting", "Advocate for Mongolia's Third Neighbour Policy to include environmental governance standards", "Push for herder community consultation rights in mining decisions"], infra: "State Great Khural (Улсын Их Хурал) — unicameral parliament, 76 members. Contact through parliament.mn. Mongolia is a parliamentary democracy with competitive elections since 1990." }
  ]}] },
  { code: "MO", name: "Macao SAR, China", region: "East Asia", summary: "Casino and tourism economy ($49.5B GDP). Services at 83.8% GDP. World's largest gambling market (pre-COVID revenue $36B/year). Under Chinese sovereignty. Highly concentrated gambling concession system.", sectors: [{ name: "Gambling", beta: 6.3, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Macao's gambling industry generates significant social costs (problem gambling, money laundering) that are not captured in concession revenues. When social cost data is published alongside gross gaming revenue, W becomes computable.", breakPaths: ["Mandatory gambling harm data disclosure per concession. When social costs are visible alongside revenues, the overlapping interest in revenue maximization without harm mitigation weakens.", "DICJ publication of problem gambling prevalence, social cost estimates, and AML compliance data per concessionaire. Makes W computable.", "Partially breakable. Gambling inherently creates addiction risk. However, harm reduction measures (exclusion programs, betting limits) can reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report AML violations to DICJ (Gaming Inspection and Coordination Bureau)", "Document problem gambling through internal channels", "Report to GIF (Financial Intelligence Office)"], infra: "DICJ (Direcção de Inspecção e Coordenação de Jogos) — Macao's gaming regulator. GIF (Gabinete de Informação Financeira) — financial intelligence unit." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Concessionaires (Sands China, Galaxy, Wynn, MGM, SJM, Melco): Implement responsible gambling programs", "Adopt independent problem gambling impact assessments", "Strengthen AML controls"], infra: "Six gaming concessionaires hold licenses renewed in 2023. Sands China (Las Vegas Sands subsidiary), Galaxy Entertainment, Wynn Macau, MGM China, SJM Holdings, Melco Resorts — operate 40+ casinos." },
    { level: "Regulator / Agency", role: "regulator", actions: ["DICJ: Strengthen responsible gambling requirements in concession terms", "IAS (Social Welfare Bureau): Expand problem gambling treatment and prevention", "Strengthen AML enforcement"], infra: "DICJ — the gaming regulator overseeing all casino operations. 2023 concession renewal included enhanced responsible gambling requirements." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Engage through the Macao Legislative Assembly (33 members, partially elected) on gambling harm reduction legislation", "Support international responsible gambling standards adoption", "Advocate for Financial Action Task Force (FATF) recommendations implementation on casino AML", "Push for independent gambling harm research funding"], infra: "Assembleia Legislativa de Macau — 33 members (14 directly elected, 12 indirectly elected, 7 appointed). Macao is a Special Administrative Region of China with limited autonomy." }
  ]}] },
  { code: "MR", name: "Mauritania", region: "Sub-Saharan Africa", summary: "Sahelian economy ($10.9B GDP) with mining (iron ore, 9.59% GDP) and agriculture (19.3% GDP). Fisheries significant. New hydrogen and gas projects (GTA — Greater Tortue Ahmeyim). Coal at 0.67%.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "SNIM iron ore mining in Zouérat generates dust and water issues. When environmental monitoring is published, W becomes computable.", breakPaths: ["Environmental bond requirements for mining. When remediation is pre-funded, overlapping interest in unaccountable extraction weakens.", "Per-mine environmental data disclosure. Makes W computable.", "Partially breakable. Mining disturbs landscapes but rehabilitation can reduce impact."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to Ministry of Environment", "Document through international channels"], infra: "Ministry of Environment and Sustainable Development. SNIM (Société Nationale Industrielle et Minière) — state iron ore company." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["SNIM: Implement environmental management systems", "Kinross (Tasiast gold mine): Apply international standards", "BP/Kosmos (GTA gas project): Adopt per-field emissions reporting"], infra: "SNIM — state iron company. Kinross Gold — operates Tasiast mine. BP and Kosmos Energy — developing the GTA gas field." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Mines: Strengthen environmental licensing", "EITI Mauritania: Expand reporting", "Environmental agency: Increase monitoring"], infra: "EITI Mauritania — member since 2005." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the Assemblée nationale (176 members) to demand mining environmental standards", "Support EITI enhanced reporting", "Advocate for African Mining Vision implementation"], infra: "Assemblée nationale de Mauritanie — 176 members. Mauritania is a presidential republic with limited democratic space." }
  ]}] },
  { code: "MT", name: "Malta", region: "Europe", summary: "Small EU island economy ($25B GDP). Services at 81.8% (financial services, gaming, tourism). EU member. Major online gambling hub. No significant natural resources.", sectors: [{ name: "Gambling", beta: 6.3, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Malta licenses ~300 online gambling companies (MGA). When problem gambling and AML data is published per licensee, W becomes computable.", breakPaths: ["Enhanced MGA licensing requirements with harm data disclosure. Makes the overlapping interest in revenue without accountability weaker.", "Per-licensee problem gambling and AML compliance data publication. Makes W computable.", "Partially breakable. Online gambling creates addiction risk. Harm reduction measures can reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to MGA (Malta Gaming Authority)", "Report AML violations to FIAU (Financial Intelligence Analysis Unit)", "Use EU Whistleblower Directive protections"], infra: "MGA (Malta Gaming Authority) — licenses and regulates online gambling. FIAU — financial intelligence unit. Malta transposed EU Whistleblower Directive." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Online gambling operators: Implement responsible gambling programs", "Adopt independent harm assessments", "Strengthen AML compliance"], infra: "Malta hosts ~300 licensed gambling companies including Betsson, Kindred, LeoVegas." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MGA: Strengthen responsible gambling requirements", "FIAU: Enhance AML supervision", "MFSA: Coordinate financial and gambling regulation"], infra: "MGA — the gambling regulator. MFSA (Malta Financial Services Authority) — the financial regulator." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the Kamra tad-Deputati (65 members) to demand enhanced gambling harm disclosure", "Support EU-wide online gambling regulation coordination", "Advocate for Financial Action Task Force (FATF) recommendations implementation"], infra: "Kamra tad-Deputati (House of Representatives) — unicameral, 65+ members. Malta is an EU parliamentary democracy." }
  ]}] },
  { code: "MU", name: "Mauritius", region: "Sub-Saharan Africa", summary: "Upper-middle-income island economy ($14.9B GDP). Services at 64.4% (financial services, tourism). Manufacturing at 11.1% (textiles). Successful economic diversification from sugar to services. Strong institutions.", sectors: [{ name: "Financial Services", beta: 4.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Mauritius is a major offshore financial center, particularly for India-bound investment (India-Mauritius tax treaty). When beneficial ownership and tax data is transparent, W becomes computable.", breakPaths: ["Full CRS and Financial Action Task Force (FATF) compliance. When financial opacity is eliminated, the overlapping interest weakens.", "Publication of beneficial ownership data. Makes W computable.", "Partially breakable. Financial services can relocate but Mauritius's India tax treaty and infrastructure create switching costs."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to FSC (Financial Services Commission)", "Report to FIU Mauritius", "Use Mauritian whistleblower protection (Financial Intelligence and AML Act)"], infra: "FSC — the integrated financial services regulator. FIU — financial intelligence unit." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Banks and management companies: Implement enhanced due diligence", "Adopt environmental, social, and governance criteria in Global Business operations", "Comply with Financial Action Task Force (FATF) recommendations ahead of mandates"], infra: "Mauritius hosts ~900 Global Business companies (Category 1 and 2). Major banks: SBM Holdings, MCB Group." },
    { level: "Regulator / Agency", role: "regulator", actions: ["FSC: Strengthen Global Business licensing", "Bank of Mauritius: Enhance AML supervision", "EDB (Economic Development Board): Promote substance requirements"], infra: "FSC — regulates the Global Business sector. Bank of Mauritius — the central bank. Mauritius was on the Financial Action Task Force (FATF) grey list (2020-2021) and implemented reforms." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the National Assembly (70 members) to demand enhanced financial transparency", "Support OECD Base Erosion and Profit Shifting Inclusive Framework", "Maintain Financial Action Task Force (FATF) compliance", "Advocate for African financial transparency standards"], infra: "National Assembly of Mauritius — 70 members. Mauritius is a parliamentary democracy with strong democratic traditions since independence (1968)." }
  ]}] },
  { code: "MW", name: "Malawi", region: "Sub-Saharan Africa", summary: "Low-income economy ($11.3B GDP). Agriculture at 31.8% GDP — tobacco is the largest export (50%+ of export revenue). One of the world's poorest countries. High climate vulnerability.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Malawi's tobacco dependence is an economic Private-Systemic Tension — tobacco demand is declining globally while the crop depletes soil. As WHO FCTC reduces demand, the overlapping interest between tobacco growers and buyers weakens.", breakPaths: ["Crop diversification as global tobacco demand declines. When alternative crops (legumes, macadamia, soy) provide comparable income, the overlapping interest in tobacco monoculture breaks.", "Publication of soil degradation and health cost data alongside tobacco revenue. Makes W computable.", "Tobacco cultivation depletes soil nutrients and requires heavy pesticide use. Crop rotation can reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to EAD (Environmental Affairs Department)", "Document child labor — report to Ministry of Labour", "Report through tobacco buyer compliance channels (BAT, JTI)"], infra: "EAD (Environmental Affairs Department) — environmental authority. Ministry of Labour — enforces child labor laws." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Limbe Leaf (Alliance One), JTI: Support farmer diversification programs", "Invest in alternative crop development", "Adopt Sustainable Tobacco Programme standards"], infra: "Limbe Leaf (Alliance One International subsidiary) — the largest tobacco buyer. JTI, BAT — international tobacco companies sourcing from Malawi." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Tobacco Commission: Support diversification transition", "Ministry of Agriculture: Scale alternative crop programs", "TCC (Tobacco Control Commission): Implement WHO FCTC provisions"], infra: "Tobacco Commission (now TCC — Tobacco Control Commission) — regulates the tobacco sector. Ministry of Agriculture, Irrigation and Water Development." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Member of Parliament in the National Assembly (193 members) to demand crop diversification investment", "Support WHO FCTC alternative livelihood provisions for tobacco-growing countries", "Advocate for international climate finance for agricultural transition", "Push for fair trade tobacco pricing during transition period"], infra: "National Assembly of Malawi — 193 members. Malawi is a presidential democracy. WHO FCTC Articles 17-18 require support for economically viable alternatives to tobacco growing." }
  ]}] },
  { code: "MY", name: "Malaysia", region: "Southeast Asia", summary: "Upper-middle-income economy ($422.2B GDP). World's second-largest palm oil producer. Oil and gas at 5.2% rents (Petronas). Manufacturing at 22.5% GDP (electronics, automotive). Services at 53.7%.", sectors: [{ name: "Palm Oil", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Malaysia produces ~25% of global palm oil. EUDR and MSPO certification create traceability frameworks. When per-plantation environmental data is linked to trade, W becomes computable.", breakPaths: ["EUDR compliance requiring zero-deforestation traceability. When buyers verify origin, the overlapping interest in forest conversion for plantations breaks.", "Mandatory MSPO (Malaysian Sustainable Palm Oil) certification with independently verifiable environmental data per estate. Makes W computable.", "Partially breakable. Palm oil monoculture reduces biodiversity. But yield improvement on existing plantations can reduce expansion pressure."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to DOE (Department of Environment)", "Document labor violations — report to HR Ministry", "Report through Roundtable on Sustainable Palm Oil complaint mechanisms"], infra: "DOE (Jabatan Alam Sekitar / Department of Environment) — environmental authority. SUHAKAM (Human Rights Commission of Malaysia) — investigates rights complaints including in palm oil sector. Roundtable on Sustainable Palm Oil — Malaysia co-hosts the Roundtable on Sustainable Palm Oil Secretariat." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Sime Darby, IOI, FGV: Achieve 100% Roundtable on Sustainable Palm Oil certification", "Adopt zero-deforestation and no-peat commitments", "Implement full supply chain traceability"], infra: "Sime Darby Plantation — world's largest palm oil company by planted area. IOI Corporation, FGV (Felda Global Ventures) — major plantation companies. MPOB (Malaysian Palm Oil Board) — the government agency overseeing the palm oil industry." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MPOB: Strengthen MSPO certification environmental criteria", "DOE: Enforce peatland drainage regulations", "MPIC (Ministry of Plantation Industries): Mandate full traceability"], infra: "MPOB — oversees palm oil industry regulation and research. MSPO (Malaysian Sustainable Palm Oil) — the national mandatory certification scheme." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Ahli Parlimen in the Dewan Rakyat (222 members) to demand peatland protection enforcement", "Support EUDR implementation with transition assistance for smallholders", "Advocate through ASEAN for regional zero-deforestation commitments", "Push for Roundtable on Sustainable Palm Oil-MSPO mutual recognition with enhanced environmental standards"], infra: "Parliament of Malaysia — bicameral: Dewan Rakyat (222 members) and Dewan Negara (70 members). Contact through parlimen.gov.my. Malaysia is a federal constitutional monarchy and parliamentary democracy." }
  ]}] },
  { code: "MZ", name: "Mozambique", region: "Sub-Saharan Africa", summary: "Resource-rich developing economy ($22.7B GDP). Major gas discoveries (Rovuma Basin — among world's largest LNG projects). Coal at 3.78%, gas at 3.57%. Agriculture at 25.2% GDP. Insurgency in Cabo Delgado province near gas projects.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Mozambique's Rovuma Basin LNG projects (TotalEnergies, ExxonMobil, Eni) are among the world's largest but face force majeure due to insurgency. When per-project environmental and social cost data is published, W becomes computable.", breakPaths: ["Conditional development — LNG projects proceed only with binding community benefit and environmental standards. When development is linked to social outcomes, the overlapping interest in extraction without accountability weakens.", "Per-project environmental disclosure for all Rovuma Basin operations. Makes W computable.", "Not breakable. LNG production and combustion release CO₂ and methane."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to MITADER (Ministry of Land, Environment and Rural Development)", "Document community displacement — report to international accountability mechanisms", "Report through TotalEnergies/ExxonMobil/Eni compliance channels"], infra: "MITADER — environment ministry. INP (Instituto Nacional de Petróleo) — the petroleum regulator. Note: Mozambique has limited whistleblower protections. The Cabo Delgado insurgency complicates civil society operations in the gas-rich north." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["TotalEnergies (Mozambique LNG), ExxonMobil (Rovuma LNG), Eni (Coral FLNG): Implement community development and environmental standards", "Adopt Task Force on Climate-Related Financial Disclosures reporting", "Address security and human rights risks per UN Voluntary Principles"], infra: "TotalEnergies — leads the $20B Mozambique LNG project (currently under force majeure). ExxonMobil — leads Rovuma LNG. Eni — operates Coral South FLNG. ENH (Empresa Nacional de Hidrocarbonetos) — the national hydrocarbons company." },
    { level: "Regulator / Agency", role: "regulator", actions: ["INP: Strengthen environmental licensing for LNG projects", "MIREME (Ministry of Mineral Resources and Energy): Ensure sovereign wealth fund for gas revenues", "Bank of Mozambique: Prepare for resource revenue macroeconomic management"], infra: "INP — the petroleum regulator. MIREME — oversees energy and mining policy. EITI Mozambique — member since 2012." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Deputado in the Assembleia da República (250 members) to demand transparent management of gas revenues", "Support EITI enhanced reporting for Mozambique's gas sector", "Advocate for Cabo Delgado stabilization with environmental governance", "Push for sovereign wealth fund establishment before major LNG revenues flow"], infra: "Assembleia da República de Moçambique — 250 members. Mozambique is a presidential republic. EITI membership since 2012." }
  ]}] },
  { code: "NA", name: "Namibia", region: "Sub-Saharan Africa", summary: "Upper-middle-income economy ($13.4B GDP) with mining at 3.17% (uranium, diamonds). Agriculture at 7.3% GDP. One of Africa's most stable democracies. Major new oil discoveries offshore (TotalEnergies, Shell). Green hydrogen ambitions.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Namibia's uranium mining (Rössing, Husab — two of world's largest) generates radioactive waste and water issues in the Namib Desert. When per-mine environmental monitoring is published, W becomes computable.", breakPaths: ["Environmental bonds and water-use fees for uranium mining. When miners pay for water in one of Earth's driest environments, the overlapping interest in water-intensive extraction weakens.", "Per-mine environmental monitoring disclosure. Makes W computable.", "Partially breakable. Uranium mining generates radioactive tailings. Improved containment can reduce but not eliminate system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to MEFT (Ministry of Environment, Forestry and Tourism)", "Report to NRPA (National Radiation Protection Authority)", "Report through Rössing (Rio Tinto)/Husab (CGN) compliance channels"], infra: "MEFT — environment ministry. NRPA — radiation protection authority. Namibia has relatively strong civil society for the region." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Rössing Uranium (Rio Tinto), Husab (China General Nuclear): Implement international radiation safety and environmental standards", "Adopt per-mine environmental reporting", "Invest in site rehabilitation planning"], infra: "Rössing Uranium — one of world's largest (Rio Tinto). Husab mine — CNNC/CGN (Chinese state-owned). Namibia also has significant diamond mining (Namdeb — De Beers/government JV)." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MME (Ministry of Mines and Energy): Strengthen environmental conditions in mining licenses", "NRPA: Enforce radiation protection standards", "Chamber of Mines of Namibia: Promote industry environmental standards"], infra: "MME — oversees mining policy. Chamber of Mines of Namibia — the industry association." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the National Assembly (104 members) to demand environmental bonds for uranium mining", "Support IAEA environmental standards for uranium producing countries", "Advocate for African Mining Vision implementation", "Push for Namibia's green hydrogen strategy to include mining sector transition"], infra: "Parliament of Namibia — bicameral: National Assembly (104 members) and National Council (42 members). Contact through parliament.na. Namibia is a presidential democracy with strong democratic credentials since independence (1990)." }
  ]}] },
  { code: "NE", name: "Niger", region: "Sub-Saharan Africa", summary: "Sahelian economy ($19.9B GDP). Agriculture at 34.5% GDP. Uranium mining (Arlit — supplies ~5% of world production, Orano/formerly Areva). Oil production growing. Military junta since July 2023 coup.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Niger's uranium mining (Orano operations at Arlit) generates radioactive tailings in water-scarce Sahel. Environmental monitoring data makes W computable.", breakPaths: ["Environmental bonds for uranium operations. When remediation costs are pre-funded, overlapping interest in extraction without accountability weakens.", "Per-mine environmental monitoring. Makes W computable.", "Partially breakable. Uranium mining generates long-lived radioactive waste. Containment reduces but doesn't eliminate system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through Orano compliance channels", "Document through international monitoring (Greenpeace, CRIIRAD have conducted independent monitoring at Arlit)", "Report to EITI Niger"], infra: "BNEE (Bureau National d'Évaluation Environnementale) — environmental assessment authority. Note: Military rule since July 2023." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Orano (formerly Areva): Implement international radiation and environmental standards at Arlit", "Address legacy contamination", "CNNPC (China): Apply standards to new uranium operations"], infra: "Orano — operates SOMAÏR and COMINAK uranium mines at Arlit (COMINAK closed 2021). Chinese companies (CNNPC) have expanding uranium interests." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Mines: Strengthen uranium mining environmental requirements", "EITI Niger: Include environmental data", "IAEA: Support radiation safety standards"], infra: "Ministry of Mines — oversees mining policy. EITI Niger — member since 2005." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Advocate through African Union for democratic governance restoration with mining transparency", "Support IAEA environmental and safety standards enforcement", "Push for Orano legacy contamination remediation at Arlit", "Support EITI enhanced reporting"], infra: "Note: Military junta since July 2023. CNSP (Conseil National pour la Sauvegarde de la Patrie). ECOWAS suspended Niger. International channels: African Union, IAEA, EITI Board." }
  ]}] },
  { code: "NI", name: "Nicaragua", region: "Latin America", summary: "Small Central American economy ($19.7B GDP). Agriculture at 14.4% GDP. Mining at 2.68% (gold). Authoritarian governance under Ortega. Services at 46.8%.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Nicaragua's gold mining generates mercury and cyanide contamination. When environmental data is published, W becomes computable.", breakPaths: ["Supply chain due diligence for gold sourced from Nicaragua.", "Environmental monitoring per mine makes W computable.", "Partially breakable. Mercury-free processing can reduce impact."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through international mining company channels (Calibre Mining, B2Gold)", "Document environmental impacts through diaspora channels"], infra: "MARENA (Ministry of Environment) — environmental authority. Note: Nicaragua under Ortega is highly authoritarian. Civil society is repressed." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Calibre Mining, B2Gold: Apply international environmental standards", "Adopt EITI-style reporting", "Support artisanal mining formalization"], infra: "Calibre Mining — operates gold mines in Nicaragua. B2Gold — formerly operated La Libertad mine." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Energy and Mines: Environmental licensing", "MARENA: Monitoring"], infra: "Ministry of Energy and Mines — mining regulator." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support international human rights monitoring for Nicaragua", "Advocate through OAS for governance reform", "Push for mining company home-country oversight"], infra: "Note: Asamblea Nacional (92 members) is controlled by FSLN. International channels: OAS (though Nicaragua withdrew), UN Human Rights Council, IACHR." }
  ]}] },
  { code: "NP", name: "Nepal", region: "South Asia", summary: "Mountainous South Asian economy ($42.9B GDP). Agriculture at 21.9% GDP. Massive hydropower potential (~83 GW technically feasible, only ~2.3 GW developed). Remittances ~25% of GDP. Climate-vulnerable (glacial lake outburst floods).", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Nepal's agriculture on steep hillsides causes erosion and landslides. When per-district soil loss and water quality data is linked to agricultural output, W becomes computable.", breakPaths: ["Reform agricultural support toward terracing and agroforestry on hillsides. When hillside farmers are incentivized to conserve soil, the overlapping interest in unsustainable cultivation weakens.", "Per-district soil erosion and water quality monitoring. Makes W computable.", "Partially breakable. Agriculture on steep slopes inherently risks erosion. Traditional terracing can reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to DoE (Department of Environment)", "Report through local government channels (municipality/rural municipality)"], infra: "DoE — environmental authority under MOFE (Ministry of Forests and Environment). Nepal's 2015 Constitution devolves significant authority to local governments." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Agricultural companies: Support terracing and agroforestry programs", "Hydropower companies: Invest in watershed protection upstream of reservoirs"], infra: "Nepal's agricultural sector is predominantly smallholder. Hydropower companies (NEA, private developers) have interests in watershed health." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MoALD (Ministry of Agriculture): Reform subsidy structure toward soil conservation", "MOFE: Strengthen watershed management", "DSCWM (Dept of Soil Conservation and Watershed Management): Scale programs"], infra: "MoALD (Ministry of Agriculture and Livestock Development). DSCWM — responsible for soil conservation programs." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the Pratinidhi Sabha (House of Representatives, 275 members) to demand hillside agriculture conservation programs", "Support climate adaptation finance for Nepal's agricultural sector", "Advocate through SAARC for regional watershed management", "Push for GLOF (glacial lake outburst flood) early warning and prevention investment"], infra: "Federal Parliament — bicameral: Pratinidhi Sabha (275 members) and Rashtriya Sabha (59 members). Nepal is a federal democratic republic since 2008." }
  ]}] },
  { code: "NZ", name: "New Zealand", region: "Oceania", summary: "Advanced economy ($260.2B GDP) with intensive dairy farming driving agricultural exports. Agriculture at 4.4% GDP but outsized environmental footprint (dairy is largest export sector). Services at 64.6%. Strong democratic institutions. Ambitious climate targets.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "New Zealand's dairy intensification (6.3M dairy cows) has degraded waterways (nitrogen and E. coli contamination). When per-farm nutrient discharge data is published alongside farm revenue, W becomes computable.", breakPaths: ["Implement the NPS-FM (National Policy Statement for Freshwater Management 2020) requiring bottom lines for water quality. When farmers face enforceable nutrient caps, the overlapping interest in herd expansion weakens.", "Farm Environment Plans with mandatory public nutrient discharge data. NZ's 'He Waka Eke Noa' partnership generates farm-level data — public disclosure makes W computable.", "Partially breakable. Ruminant digestion produces methane biologically. Feed additives can reduce but not eliminate enteric methane. Riparian planting reduces but doesn't eliminate nutrient runoff."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to regional councils (Canterbury, Waikato — primary water quality enforcers)", "Document water quality violations — report to MfE (Ministry for the Environment)", "Use NZ Protected Disclosures Act 2022"], infra: "Regional councils — the primary environmental regulators under the Resource Management Act (RMA). MfE (Ministry for the Environment) — sets national environmental policy. NZ Protected Disclosures (Protection of Whistleblowers) Act 2022 — strong whistleblower protection." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Fonterra: Adopt binding waterway protection targets across all supplier farms", "Implement methane reduction technology (Kowbucha, Zelp)", "Diversify cooperative revenue beyond dairy commodity"], infra: "Fonterra Co-operative Group — the world's largest dairy exporter, processing ~80% of NZ milk. Fonterra's procurement standards directly influence ~10,000 dairy farms." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MfE: Enforce NPS-FM bottom lines for nitrogen and E. coli in waterways", "MPI (Ministry for Primary Industries): Reform farm support toward environmental outcomes", "EPA: Strengthen agricultural chemical regulation"], infra: "NPS-FM (National Policy Statement for Freshwater Management 2020) — requires regional councils to set limits on resource use to achieve environmental bottom lines. MPI — oversees primary sector policy." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Member of Parliament in the House of Representatives (120 members) to demand enforcement of freshwater bottom lines", "Support NZ Emissions Trading Scheme inclusion of agricultural emissions (planned by 2025, now uncertain)", "Advocate for Comprehensive and Progressive Agreement for Trans-Pacific Partnership (CPTPP) environmental provisions", "Push for inclusion of biological methane in national emissions reduction targets"], infra: "New Zealand Parliament (House of Representatives, 120 members, MMP electoral system). Contact through parliament.nz. NZ Climate Change Response (Zero Carbon) Amendment Act 2019 sets separate targets for biogenic methane." }
  ]}] },
  { code: "OM", name: "Oman", region: "Middle East", summary: "Oil-dependent Gulf economy ($107.1B GDP) with 29.21% combined oil and gas rents. PDO (Petroleum Development Oman, 60% government, 34% Shell) is the main operator. Diversifying through Oman Vision 2040. Hydrogen ambitions.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Oman's oil production uses enhanced oil recovery (EOR) including solar-powered steam injection. As EOR costs rise on mature fields, diversification to green hydrogen becomes economically rational.", breakPaths: ["Green hydrogen investment as alternative export commodity. Oman has committed $30B+ to green hydrogen projects. When hydrogen revenue streams are established, the overlapping interest in oil dependence weakens.", "Per-field emissions disclosure for all PDO and other operator operations. Makes W computable.", "Not breakable. Hydrocarbon combustion releases CO₂."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to Environment Authority", "Report through PDO/Shell compliance channels"], infra: "Environment Authority (EA) — Oman's environmental regulator. PDO (Petroleum Development Oman) — Shell manages PDO operations." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["PDO: Accelerate renewable energy integration in operations", "OQ (state energy company): Develop green hydrogen export capacity", "Implement Task Force on Climate-Related Financial Disclosures reporting"], infra: "PDO — produces ~70% of Oman's oil. OQ (formerly Oman Oil Company) — the state energy holding company. Hydrom — the government entity driving Oman's green hydrogen ambitions." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Energy and Minerals: Balance oil production with hydrogen transition", "EA: Strengthen environmental standards", "CBO (Central Bank of Oman): Climate risk in financial supervision"], infra: "Ministry of Energy and Minerals — oversees energy policy. Hydrom — manages green hydrogen project tenders." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Engage through the Majlis al-Shura (advisory, 86 elected members) on energy transition policy", "Advocate through GCC for regional energy transition coordination", "Support IRENA recommendations on Gulf state transition", "Push for Oman Vision 2040 environmental targets enforcement"], infra: "Majlis Oman — bicameral: Majlis al-Shura (86 elected) and Majlis al-Dawla (86 appointed). Oman is a sultanate with limited but growing parliamentary activity." }
  ]}] },
  { code: "PA", name: "Panama", region: "Latin America", summary: "Services-dominant economy ($86.5B GDP) with the Panama Canal generating significant revenue. Financial services hub. Mining at 3.58% (Cobre Panamá copper mine — First Quantum, closed by Supreme Court ruling 2023). Services at 69.3%.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Panama's Supreme Court ruled the Cobre Panamá mining contract unconstitutional in November 2023, following massive public protests. The overlapping interest between the mining company and government has been broken by democratic action.", breakPaths: ["The Cobre Panamá precedent — democratic rejection of mining contracts that do not serve the public interest. This is a direct break of the overlapping interest through civic action and judicial review.", "Environmental monitoring of mine closure and remediation. Making closure costs visible makes W computable.", "Partially breakable. The mine exists — remediation is needed regardless. Closure reduces ongoing system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report environmental violations during mine closure to MiAmbiente (Ministry of Environment)", "Document water quality downstream of Cobre Panamá", "Report through First Quantum compliance channels"], infra: "MiAmbiente — the environment ministry. ANAM (Autoridad Nacional del Ambiente) — environmental authority. Panama's Supreme Court (Corte Suprema de Justicia) — ruled the mining contract unconstitutional." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["First Quantum: Cooperate with orderly mine closure and environmental remediation", "Ensure worker transition support", "Comply with Supreme Court ruling"], infra: "First Quantum Minerals — operated Cobre Panamá, one of the world's largest copper mines ($10B investment). The mine is in preservation and safe management mode following the court ruling." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MiAmbiente: Ensure comprehensive environmental remediation", "Ministry of Commerce: Support economic transition for affected communities", "Comptroller General: Audit mining revenue management"], infra: "Ministerio de Comercio e Industrias — oversees mining concessions. Contraloría General de la República — the national audit office." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Diputado in the Asamblea Nacional (71 members) to demand comprehensive mine closure and remediation legislation", "Support the Cobre Panamá precedent as a model for democratic resource governance", "Advocate for investment treaty reform to protect sovereign environmental decisions", "Push for ICSID (World Bank arbitration) reform on environmental sovereignty"], infra: "Asamblea Nacional de Panamá — unicameral, 71 members. Panama's Cobre Panamá case is a globally significant precedent for democratic control over extractive industries. First Quantum has filed an ICSID arbitration claim." }
  ]}] },
  { code: "PE", name: "Peru", region: "Latin America", summary: "Resource-rich economy ($289.2B GDP) with mining at 12.1% GDP (world's second-largest copper producer, major silver and gold). Agriculture at 7.3%. Services at 51.3%. Social conflicts around mining are frequent.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Peru's mining sector generates over 200 active social conflicts (Defensoría del Pueblo tracks monthly). When environmental monitoring data is publicly linked to mine production revenue, W becomes computable.", breakPaths: ["Prior consultation (consulta previa) enforcement per ILO Convention 169. When indigenous communities can effectively negotiate environmental conditions, the overlapping interest in extraction without consent weakens.", "Mandatory per-mine environmental monitoring data published in real-time (OEFA already collects this). Public disclosure makes W computable.", "Partially breakable. Mining disturbs landscapes. But Peru's mining environmental standards have improved significantly — enforcement is the gap."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to OEFA (Organismo de Evaluación y Fiscalización Ambiental)", "Document community impacts — report to Defensoría del Pueblo", "Report through mining company compliance channels"], infra: "OEFA — Peru's environmental enforcement agency for the mining sector, conducting inspections and imposing sanctions. Defensoría del Pueblo — the national ombudsman, publishes monthly social conflict reports. SENACE (Servicio Nacional de Certificación Ambiental) — conducts environmental impact assessments." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Antamina, Cerro Verde, Las Bambas operators: Implement community development agreements", "Adopt international tailings standards (GISTM)", "Publish per-mine environmental data"], infra: "Major mines: Antamina (BHP/Glencore), Cerro Verde (Freeport-McMoRan), Las Bambas (MMG/China Minmetals). SNMPE (Sociedad Nacional de Minería, Petróleo y Energía) — the industry association." },
    { level: "Regulator / Agency", role: "regulator", actions: ["OEFA: Increase environmental monitoring and enforcement", "MINEM: Strengthen environmental conditions in mining concessions", "ANA (Autoridad Nacional del Agua): Enforce water quality standards downstream of mines"], infra: "MINEM (Ministerio de Energía y Minas) — the energy and mining ministry. ANA — the national water authority. EITI Peru — member since 2012." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Congresista in the Congreso de la República (130 members) to demand enforcement of consulta previa and environmental monitoring", "Support ILO Convention 169 enforcement on indigenous consultation", "Advocate for Escazú Agreement ratification", "Push for EITI enhanced reporting with environmental data"], infra: "Congreso de la República del Perú — unicameral, 130 members. Contact through congreso.gob.pe. Peru has ratified ILO Convention 169. Peru has not ratified the Escazú Agreement." }
  ]}] },
  { code: "PG", name: "Papua New Guinea", region: "Oceania", summary: "Resource-rich Pacific island economy ($31.8B GDP). Mining at 14.41% GDP, gas at 9.14% (PNG LNG). Agriculture at 16.4%. Extraordinary biodiversity (7% of world's species on 1% of land). Customary land ownership covers 97% of territory.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "PNG's mining sector (Ok Tedi, Porgera, Lihir) has a history of catastrophic environmental damage. Ok Tedi mine discharged tailings directly into the Fly River system for decades. Environmental monitoring makes W computable.", breakPaths: ["Mandatory environmental bonds per IFC Performance Standards. When remediation is pre-funded, overlapping interest in low-cost disposal weakens.", "Per-mine environmental monitoring published alongside production revenue. PNG's EITI membership provides the framework. Makes W computable.", "Partially breakable. Mining in tropical environments disturbs highly biodiverse ecosystems. But modern tailings management (not riverine disposal) can reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to CEPA (Conservation and Environment Protection Authority)", "Document community impacts through local NGOs and customary landowner groups", "Report through Barrick Gold/Newcrest compliance channels"], infra: "CEPA — PNG's environmental authority. Department of Mineral Policy and Geohazards Management — mining regulator. Note: PNG's governance capacity is limited outside major urban centers." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Barrick Gold (Porgera), Newmont (Lihir), Ok Tedi Mining: Implement international environmental standards", "Address legacy contamination", "Adopt EITI enhanced reporting"], infra: "Ok Tedi Mining Limited — operates Ok Tedi copper-gold mine (now community-owned). Barrick Gold — Porgera gold mine. Newmont (formerly Newcrest) — Lihir gold mine. ExxonMobil — operates PNG LNG." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MRA (Mineral Resources Authority): Strengthen environmental conditions in mining leases", "CEPA: Enforce environmental standards", "EITI PNG: Expand to environmental data"], infra: "MRA — the mining regulator. EITI PNG — member since 2014." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your member of the National Parliament (111 members) to demand environmental bonds for all mining operations", "Support customary landowner rights in mining negotiations", "Advocate through Pacific Islands Forum for regional environmental standards", "Push for international accountability for mining legacy contamination (Ok Tedi)"], infra: "National Parliament of Papua New Guinea — unicameral, 111 members. PNG is a constitutional monarchy (King Charles III as head of state) with Westminster-style parliamentary democracy." }
  ]}] },
  { code: "PH", name: "Philippines", region: "Southeast Asia", summary: "Major Southeast Asian economy ($461.6B GDP). Services at 63.2% GDP. Agriculture at 9.1%. Mining at 1.52% (nickel — world's second-largest producer). Manufacturing at 15.7% (electronics). Extreme climate vulnerability — typhoons.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Philippines' nickel mining (for EV batteries) generates significant environmental damage on small islands. When per-mine environmental data is linked to nickel exports, W becomes computable.", breakPaths: ["Environmental compliance as condition for mining permits. President Duterte's 2017 mining audit closed 28 mines. Sustained enforcement breaks the overlapping interest in non-compliant extraction.", "Per-mine environmental monitoring and community impact data. DENR already collects data — public disclosure makes W computable.", "Partially breakable. Mining on small islands with fragile ecosystems inherently causes significant damage. But modern methods can reduce impact."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to DENR (Department of Environment and Natural Resources)", "Document community impacts through civil society organizations", "Report to Mines and Geosciences Bureau"], infra: "DENR — the environment and natural resources department. MGB (Mines and Geosciences Bureau) — manages mining regulation. Philippines has relatively active civil society and press freedom." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Nickel Asia, Global Ferronickel: Implement international environmental standards", "Adopt responsible mining certification", "Support community development agreements"], infra: "Nickel Asia Corporation — the country's largest nickel producer. Global Ferronickel Holdings. Philippines is the world's second-largest nickel producer." },
    { level: "Regulator / Agency", role: "regulator", actions: ["DENR: Strengthen environmental monitoring and enforcement", "MGB: Require environmental bonds", "EMB (Environmental Management Bureau): Enforce pollution standards"], infra: "EMB (Environmental Management Bureau) — under DENR, responsible for pollution control. Philippine Mining Act of 1995 — governs mining operations." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Representative in the House of Representatives (316 members) or Senator to demand enforcement of mining environmental standards", "Support Alternative Mining Bill with enhanced environmental protections", "Advocate through ASEAN for regional mining standards", "Push for EU Battery Regulation traceability for Philippine nickel"], infra: "Congress of the Philippines — bicameral: House of Representatives (316 members) and Senate (24 members). Contact through congress.gov.ph. Philippines is a presidential democracy." }
  ]}] },
  { code: "PK", name: "Pakistan", region: "South Asia", summary: "Large economy ($371.6B GDP) with agriculture at 23.7% GDP (cotton, wheat, rice, sugarcane). Manufacturing at 13.2%. Services at 50.7%. Severe climate vulnerability (2022 floods caused $30B+ damage). Water stress. Coal at 0.12%, gas at 0.74%.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Pakistan's cotton-wheat-rice monoculture cycle depletes groundwater and degrades soil. When per-district water table and soil health data is published alongside agricultural output, W becomes computable.", breakPaths: ["Reform agricultural subsidies from input-based to outcome-based. When farmers are rewarded for water efficiency rather than maximum extraction, the overlapping interest in water-intensive monoculture weakens.", "Per-district groundwater monitoring and soil health data. WAPDA already monitors water — linking to agricultural output makes W computable.", "Partially breakable. Irrigated agriculture in semi-arid conditions inherently depletes water. But drip irrigation and crop diversification can reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to Pakistan EPA (Environment Protection Agency)", "Document water contamination — report to WAPDA (Water and Power Development Authority)", "Report through provincial agricultural extension services"], infra: "Pakistan EPA — federal environmental authority. WAPDA — manages water resources and irrigation. Provincial EPAs — each province has its own environmental agency." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Agricultural input companies: Develop water-efficient farming solutions", "Textile companies (reliant on Pakistani cotton): Support sustainable cotton initiatives", "Invest in drip irrigation technology"], infra: "Pakistan's agricultural sector is fragmented among smallholders. Major cotton buyers include Pakistani textile mills and international brands sourcing from Pakistan." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of National Food Security: Reform water pricing for agriculture", "IRSA (Indus River System Authority): Enforce provincial water allocations", "Provincial agriculture departments: Support crop diversification"], infra: "Ministry of National Food Security and Research — federal agricultural policy. IRSA — manages Indus water distribution among provinces. Pakistan Council of Research in Water Resources (PCRWR) — monitors groundwater." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your MNA (Member of National Assembly, 342 members) or Senator to demand agricultural water pricing reform", "Leverage Pakistan's Climate Vulnerable Forum membership to advocate for agricultural adaptation finance", "Support Indus Waters Treaty modernization for climate adaptation", "Push for international climate loss and damage finance (Pakistan's 2022 floods were a catalyzing case)"], infra: "Parliament of Pakistan — bicameral: National Assembly (342 members) and Senate (100 members). Contact through na.gov.pk. Pakistan is a federal parliamentary democracy." }
  ]}] },
  { code: "PL", name: "Poland", region: "Europe", summary: "Major EU economy ($917.8B GDP) with significant coal sector (0.25% rents but coal provides ~70% of electricity). Manufacturing at 16.1% GDP. Services at 59.1%. Coal transition is Poland's central climate challenge — 80,000+ miners.", sectors: [{ name: "Coal", beta: 6.1, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Poland's coal sector is sustained by state subsidies and employment guarantees. EU ETS carbon pricing makes Polish coal uncompetitive. When full carbon costs are internalized, the overlapping interest between miners and state employment programs breaks.", breakPaths: ["EU ETS alignment without free allowances. At €90/ton carbon, Polish coal electricity costs 2-3x renewable alternatives. The overlapping interest breaks when coal plants cannot compete.", "Per-plant emissions and health-impact disclosure. Poland's coal plants cause 4,000+ premature deaths/year. Making health costs visible per MWh makes W computable.", "Not breakable. Coal combustion releases CO₂ and air pollutants."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to GIOŚ (Chief Inspectorate of Environmental Protection)", "Document health impacts in mining regions — report to GIS (Chief Sanitary Inspectorate)", "Use Polish whistleblower law (2024 transposition of EU Directive)"], infra: "GIOŚ (Główny Inspektorat Ochrony Środowiska) — the chief environmental inspectorate. GIS (Główny Inspektorat Sanitarny) — the chief sanitary inspectorate monitoring public health. Poland transposed the EU Whistleblower Directive in 2024." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["PGE, Tauron, Enea, PGG: Develop coal phase-out plans with worker transition", "Invest in offshore wind (Baltic Sea — major potential)", "Adopt per-unit emissions reporting"], infra: "PGE (Polska Grupa Energetyczna) — Poland's largest energy company. Tauron, Enea — other major energy companies. PGG (Polska Grupa Górnicza) — Poland's largest coal mining company (state-owned, ~40,000 employees)." },
    { level: "Regulator / Agency", role: "regulator", actions: ["URE (Energy Regulatory Office): Reform tariffs to reflect carbon costs", "Ministry of Climate: Implement National Energy Policy 2040", "NFEP (National Fund for Environmental Protection): Finance mine closure and remediation"], infra: "URE (Urząd Regulacji Energetyki) — the energy regulator. NFEP (Narodowy Fundusz Ochrony Środowiska) — the environmental fund financing green transition. Poland's coal phase-out agreement with mining unions targets 2049." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Poseł or Senator in the Sejm/Senat to demand accelerated coal phase-out with just transition measures", "Support EU Just Transition Fund maximization for Silesia and other coal regions", "Advocate for EU Green Deal implementation with adequate transition support", "Push for territorial just transition plans with concrete retraining programs"], infra: "Sejm (460 members) and Senat (100 members). Contact through sejm.gov.pl and senat.gov.pl. EU Just Transition Fund — Poland is the largest recipient of JTF funding. Poland's 2020 coal phase-out agreement targets closure of all coal mines by 2049." }
  ]}] },
  { code: "PR", name: "Puerto Rico (US)", region: "Caribbean", summary: "US unincorporated territory ($126B GDP) with pharmaceutical manufacturing (44.1% of GDP — among world's highest pharma concentration). Services at 51.8%. Post-Hurricane Maria (2017) infrastructure challenges. LUMA Energy electricity crisis.", sectors: [{ name: "Ultra-Processed Food", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Puerto Rico has one of the highest obesity rates in the US. Imported Ultra-Processed Food dominates the food supply (85%+ of food is imported). When diet-related healthcare costs (Medicaid/Medicare data) are linked to product categories, W becomes computable.", breakPaths: ["Reform food import tax structure to incentivize fresh food over Ultra-Processed Food. When imported Ultra-Processed Food faces higher tariffs than fresh food, the overlapping interest in high-margin processed imports weakens.", "CMS (Centers for Medicare & Medicaid Services) data on Puerto Rico diet-related healthcare costs per product category. Makes W computable.", "Not fully breakable. Ultra-processing alters food matrix. But Puerto Rico's tropical climate allows significant local food production to reduce import dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to FDA (applies to Puerto Rico as US territory)", "Document food safety violations to Puerto Rico Department of Health", "Use US federal whistleblower protections"], infra: "FDA — the US Food and Drug Administration has jurisdiction in Puerto Rico. Puerto Rico Department of Health — oversees local food safety. US federal whistleblower protections apply." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Food importers: Diversify toward fresh and minimally processed products", "Support local food production development", "Adopt voluntary front-of-pack labelling"], infra: "Major food retailers in Puerto Rico: Walmart, Econo. Empresas Fonalledas — local retail conglomerate." },
    { level: "Regulator / Agency", role: "regulator", actions: ["PR Department of Agriculture: Expand local food production programs", "Department of Health: Implement nutrition education and labelling requirements", "FDA: Apply US food labelling regulations"], infra: "PR Department of Agriculture — supports local agricultural development. Puerto Rico imports ~85% of food consumed." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact Puerto Rico's Resident Commissioner in the US House of Representatives to advocate for food access and local agriculture funding", "Support the Farm Bill provisions for Puerto Rico food sovereignty", "Advocate for SNAP block grant reform to incentivize fresh food", "Push for local food production investment through USDA programs"], infra: "Puerto Rico has a Resident Commissioner in the US House of Representatives (non-voting). Legislatura de Puerto Rico — bicameral: Cámara de Representantes (51 members) and Senado (27 members). As a US territory, many policy decisions are made at the federal level." }
  ]}] },
  { code: "PS", name: "West Bank and Gaza", region: "Middle East", summary: "Occupied territory ($13.7B GDP, severely constrained by occupation). Agriculture at 7.4% GDP. Services at 76.2%. Economy dependent on Israeli work permits and international aid. Water access severely restricted. Active conflict zone.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Palestinian agriculture operates under severe water restrictions (Oslo II Accords limit Palestinian water extraction). When water allocation data is published alongside agricultural output, the systemic welfare impact of occupation on agriculture becomes computable.", breakPaths: ["International pressure for equitable water allocation per Oslo II renegotiation. When Palestinian farmers access fair water shares, the overlapping interest in restricting agricultural development weakens.", "Publication of per-community water allocation and agricultural productivity data. International monitoring (OCHA, World Bank) already collects data — systematic disclosure makes W computable.", "Extreme system dependence. The occupation structurally constrains agricultural development through water restrictions, land access, and movement controls."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Document water access restrictions through Palestinian Water Authority channels", "Report to international monitoring organizations (OCHA, B'Tselem)", "Provide data to academic researchers studying occupation impacts on agriculture"], infra: "PWA (Palestinian Water Authority) — manages water resources under severe constraints. EQA (Environment Quality Authority) — the Palestinian environmental authority. B'Tselem — Israeli human rights organization documenting occupation impacts." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["International agricultural companies: Support Palestinian agricultural development programs", "Fair trade organizations: Expand Palestinian olive oil and agricultural product sourcing", "Invest in water-efficient agriculture technology appropriate for restricted water access"], infra: "Palestinian agricultural sector is predominantly smallholder. Olive oil is the most significant agricultural export. International NGOs and development agencies support agricultural development." },
    { level: "Regulator / Agency", role: "regulator", actions: ["EQA: Document environmental impacts of occupation on agriculture", "PWA: Advocate for equitable water allocation", "PMA (Palestine Monetary Authority): Support agricultural lending"], infra: "PWA — the key institution managing water allocation under occupation constraints. Joint Water Committee (JWC) — the Oslo-established mechanism for water cooperation between Israel and Palestine, widely criticized as inequitable." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support international humanitarian law enforcement on resource access in occupied territories", "Advocate through UN for equitable water allocation", "Push for World Bank monitoring of economic impact of water restrictions on Palestinian agriculture", "Support Palestinian sovereignty over natural resources as enshrined in UNGA resolutions"], infra: "Palestinian Legislative Council (PLC, 132 members) — non-functional since 2007. The Palestinian Authority operates through the executive. International channels: UNGA, UNHRC, ICJ Advisory Opinion on the Wall (2004), UN OCHA, UNRWA." }
  ]}] },
  { code: "PT", name: "Portugal", region: "Europe", summary: "EU economy ($313.3B GDP). Services at 66.3% GDP. Agriculture at 2% (cork, wine, olive oil). Manufacturing at 11.8%. Renewable energy leader (70%+ of electricity from renewables). Successfully phased out coal (2021).", sectors: [{ name: "Ultra-Processed Food", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Portugal's SNS (Serviço Nacional de Saúde) tracks healthcare costs. Publishing diet-related costs per product category makes W computable.", breakPaths: ["Implement EU front-of-pack health labelling.", "SNS diet-related healthcare cost data publication. Makes W computable.", "Not fully breakable. Reformulation mandates reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to ASAE (Authority for Food and Economic Safety)", "Use Portuguese whistleblower law (Lei 93/2021)"], infra: "ASAE (Autoridade de Segurança Alimentar e Económica) — food safety and economic inspection. Lei 93/2021 — Portugal's whistleblower protection law." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Portuguese food companies: Reformulate products", "Adopt front-of-pack labelling"], infra: "Jerónimo Martins (Pingo Doce) — major Portuguese retailer. FIPA (Federação das Indústrias Portuguesas Agro-Alimentares) — food industry federation." },
    { level: "Regulator / Agency", role: "regulator", actions: ["DGS (Directorate-General of Health): Implement labelling", "ASAE: Enforce marketing standards", "SNS: Publish health expenditure data"], infra: "DGS (Direção-Geral da Saúde) — public health authority. SNS — the national health service." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Deputado in the Assembleia da República (230 members) to demand health labelling", "Support EU Farm to Fork Strategy"], infra: "Assembleia da República — unicameral, 230 members. Contact through parlamento.pt. Portugal is a parliamentary democracy." }
  ]}] },
  { code: "PY", name: "Paraguay", region: "Latin America", summary: "Landlocked South American economy ($44.5B GDP). Agriculture at 10.7% GDP (massive soy production — 4th largest exporter globally). Manufacturing at 19% GDP. Services at 48.7%. Itaipú Dam provides 90%+ renewable electricity. Severe deforestation from soy expansion.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Paraguay's soy monoculture has destroyed 90%+ of Atlantic Forest and drives ongoing Chaco deforestation. When per-farm deforestation and soil degradation data is linked to soy exports, W becomes computable.", breakPaths: ["EUDR compliance requiring zero-deforestation soy. When EU buyers require verified deforestation-free origin, the overlapping interest in Chaco clearing for soy breaks.", "Satellite-based deforestation monitoring linked to soy export data. Global Forest Watch already tracks Paraguay extensively — linking to farm-level data makes W computable.", "Partially breakable. Soy monoculture inherently reduces biodiversity. But no-till farming and cover cropping can reduce soil degradation."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report illegal deforestation to SEAM (Secretaría del Ambiente)", "Document indigenous land rights violations — report to INDI (Instituto Paraguayo del Indígena)", "Report through commodity trader compliance channels (Cargill, Bunge, ADM)"], infra: "SEAM (Secretaría del Ambiente) — now MADES (Ministerio del Ambiente y Desarrollo Sostenible). INFONA (Instituto Forestal Nacional) — the forest management authority. INDI — the indigenous affairs institute." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Commodity traders (Cargill, Bunge, ADM, Louis Dreyfus): Implement zero-deforestation soy sourcing for Paraguay", "Adopt Soy Moratorium-style commitments for the Chaco", "Invest in yield improvement on existing farmland"], infra: "Major soy traders operating in Paraguay: Cargill, Bunge, ADM, Louis Dreyfus. CAPPRO (Cámara Paraguaya de Procesadores de Oleaginosas y Cereales) — the oilseed processors' association." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MADES: Enforce the Zero Deforestation Law in the Eastern Region and extend to the Chaco", "SENAVE (Servicio Nacional de Calidad y Sanidad Vegetal): Integrate environmental standards into soy export certification", "INFONA: Strengthen forest monitoring and enforcement"], infra: "MADES — environment ministry. Zero Deforestation Law (Ley 2524/2004) — prohibits conversion of forest to agriculture in the Eastern Region (but not the Chaco, where deforestation continues)." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Diputado or Senador in the Congreso Nacional to demand extension of the Zero Deforestation Law to the Chaco", "Support EUDR implementation with transition support for Paraguayan farmers", "Advocate for Mercosur environmental provisions enforcement", "Push for indigenous land rights recognition in soy expansion zones"], infra: "Congreso Nacional del Paraguay — bicameral: Cámara de Diputados (80 members) and Cámara de Senadores (45 members). Paraguay is a presidential republic." }
  ]}] },,
  { code: "QA", name: "Qatar", region: "Middle East", summary: "Hydrocarbon-dominated economy ($219.2B GDP). Industry at 58.2% GDP. Oil rents 15.28% GDP, gas rents 12.01% GDP — world's largest LNG exporter. Services at 46.1%. Highest per-capita CO₂ emissions globally. Absolute monarchy.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Qatar's LNG dominance faces demand erosion as importing nations (Japan, South Korea, EU) diversify toward renewables and hydrogen. When importers reduce LNG dependence, the overlapping interest weakens.", breakPaths: ["Importer diversification away from Qatari LNG. As Japan, Korea, and Europe invest in renewables and green hydrogen, the overlapping interest in fossil gas dependence weakens.", "Per-field emissions and flaring data disclosure. Qatar Energy already publishes aggregate sustainability data — extending to field-level reporting makes W computable.", "Not breakable. LNG combustion releases CO₂. Carbon capture on LNG (pre-combustion at liquefaction) captures only a fraction of lifecycle emissions."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to QatarEnergy HSE division", "Document through international joint venture partner channels (ExxonMobil, Shell, TotalEnergies)", "Report to Ministry of Environment and Climate Change"], infra: "QatarEnergy (formerly Qatar Petroleum) — the state hydrocarbon company controlling all oil and gas operations. International partners operate under production-sharing agreements." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["QatarEnergy: Accelerate carbon capture at Ras Laffan", "Invest in blue and green hydrogen", "Reduce routine flaring to zero"], infra: "QatarEnergy — state-owned, operates the world's largest LNG facility at Ras Laffan Industrial City. North Field — the world's largest non-associated gas field." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Environment and Climate Change: Enforce air quality standards around Ras Laffan", "KAHRAMAA (Qatar General Electricity & Water Corporation): Mandate energy efficiency", "Qatar National Vision 2030: Integrate emissions reduction targets"], infra: "Ministry of Environment and Climate Change — environmental regulator. KAHRAMAA — electricity and water utility. Qatar National Vision 2030 — the national strategic framework." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Advocate through GCC (Gulf Cooperation Council) for regional emissions standards", "Support Global Methane Pledge commitments", "Push for LNG buyer nations to condition contracts on emissions intensity", "Engage through OPEC for managed fossil fuel transition"], infra: "Qatar is an absolute monarchy — the Emir governs by decree. Advisory Shura Council (45 members, 30 elected since 2021) has limited legislative power. International channels: GCC, OPEC (Qatar withdrew 2019 but re-engaged), COP process." }
  ]}] },
  { code: "RO", name: "Romania", region: "Europe", summary: "EU member economy ($382.6B GDP). Manufacturing at 13.2% GDP. Gas rents 0.53%, oil 0.38%. Services at 62.6%. Significant forestry issues — illegal logging in old-growth Carpathian forests despite EU membership.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Romania's large-scale agricultural land consolidation has created monoculture on former smallholdings. When soil health data is linked to EU CAP payments, W becomes computable.", breakPaths: ["EU CAP eco-scheme conditionality. When subsidy payments depend on crop rotation and soil health metrics, the overlapping interest in exhaustive monoculture weakens.", "Per-farm soil health monitoring through APIA (Agency for Payments and Intervention in Agriculture). Makes W computable.", "Partially breakable. Grain monoculture degrades Romania's fertile black-earth soils. Cover cropping and crop rotation reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report illegal logging to Inspectoratul de Stat pentru Controlul în Silvicultură", "Report to Garda Forestieră (Forest Guard)", "Document through Agent Green or EuroNatur"], infra: "Garda Forestieră — Romania's forest guard, responsible for enforcing the Forest Code. Inspectoratul de Stat pentru Controlul în Silvicultură — state forestry inspectorate. Agent Green — Romanian environmental NGO documenting illegal logging." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Large agricultural companies: Implement EU eco-schemes", "Holzindustrie Schweighofer (now HS Timber): Adopt certified sustainable sourcing", "Agricultural associations: Adopt soil health targets"], infra: "Romania has significant foreign-owned agricultural land. HS Timber (formerly Holzindustrie Schweighofer) — major timber processor, previously linked to illegal logging controversies." },
    { level: "Regulator / Agency", role: "regulator", actions: ["APIA: Condition CAP payments on eco-scheme compliance", "Ministry of Environment: Strengthen Forest Code enforcement", "ANPM (National Environmental Protection Agency): Expand monitoring"], infra: "APIA (Agenția de Plăți și Intervenție pentru Agricultură) — manages EU CAP payments. ANPM — environmental protection agency. Ministry of Environment, Waters and Forests." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Deputat in the Camera Deputaților (330 members) or Senator in the Senat (136 members) to demand Forest Code enforcement", "Submit EU Pilot complaints on illegal logging through European Commission", "Support ECA (European Court of Auditors) reviews of CAP implementation", "Advocate through European Parliament for Carpathian old-growth forest protection"], infra: "Parlamentul României — bicameral: Camera Deputaților (330 members) and Senat (136 members). EU member since 2007. Contact through cdep.ro and senat.ro." }
  ]}] },
  { code: "RS", name: "Serbia", region: "Europe", summary: "Western Balkan economy ($90.1B GDP). Manufacturing at 12.7%. Coal rents 0.24% GDP — but coal supplies ~70% of electricity. EU candidate country. Mining sector growing (Rio Tinto lithium project controversy).", sectors: [{ name: "Coal", beta: 6.1, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Serbia's lignite dependence (Nikola Tesla power plants — among Europe's worst SO₂ emitters) faces EU accession conditionality. EU ETS alignment will make lignite uncompetitive.", breakPaths: ["EU accession requiring LCPD/IED compliance. Retrofitting Nikola Tesla A and B to meet EU emission limits costs more than replacement with renewables.", "Per-plant emissions and health cost data. HEAL (Health and Environment Alliance) has documented thousands of premature deaths. Makes W computable.", "Not breakable. Lignite combustion releases SO₂, PM2.5, and mercury."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to Ministry of Environmental Protection", "Document through CEKOR (Center for Ecology and Sustainable Development)", "Report through EPS (Elektroprivreda Srbije) channels"], infra: "Ministry of Environmental Protection — environmental authority. CEKOR — Serbian environmental NGO. RES Foundation — renewable energy advocacy." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["EPS (Elektroprivreda Srbije): Develop lignite phase-out roadmap", "Invest in solar and wind capacity", "Plan just transition for Kolubara mining basin communities"], infra: "EPS (Elektroprivreda Srbije) — state electricity utility operating Nikola Tesla A (1650 MW) and B (1240 MW) lignite plants. Kolubara mining basin — supplies lignite to these plants." },
    { level: "Regulator / Agency", role: "regulator", actions: ["AERS (Energy Agency): Reform tariffs to reflect environmental costs", "Ministry of Mining and Energy: Adopt Energy Community Decarbonization Roadmap", "Energy Community Secretariat: Enforce compliance"], infra: "AERS (Agencija za energetiku Republike Srbije) — energy regulator. Serbia is an Energy Community Treaty member, requiring alignment with EU energy acquis." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Narodni poslanik in the Narodna skupština (250 members) to demand a coal phase-out timeline", "Support EU accession environmental chapter benchmarks", "Advocate through Energy Community for binding decarbonization targets", "Push for EU Just Transition Fund pre-accession support"], infra: "Narodna skupština (National Assembly) — unicameral, 250 members. EU candidate country since 2012. Energy Community Treaty member." }
  ]}] },
  { code: "RU", name: "Russian Federation", region: "Europe & Central Asia", summary: "Major hydrocarbon economy ($2,173.8B GDP). Oil rents 9.67%, gas rents 5.86%, coal 0.61%, mining 2.05% GDP. World's largest gas exporter, second-largest oil exporter. Military spending 7.05% GDP. Authoritarian governance under international sanctions since 2022.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Russia's oil and gas revenues have been severely constrained by Western sanctions and price caps since 2022. Buyer diversification (EU pivot away from Russian gas) is actively breaking the overlapping interest.", breakPaths: ["Buyer diversification already underway. EU reduced Russian gas imports from ~40% to ~15% of supply. When importers eliminate dependence, the overlapping interest in Russian fossil fuels breaks.", "Sanctions-enforced transparency — G7 price cap mechanism requires attestation of pricing. This partially makes W computable, though enforcement gaps remain.", "Not breakable. Hydrocarbon combustion releases CO₂ regardless of source."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through international channels (Bellona Foundation, Global Witness)", "Provide data to sanctions enforcement authorities", "Document through investigative journalism networks (iStories, Novaya Gazeta Europe)"], infra: "Note: Russia's domestic civil society is severely repressed. Bellona Foundation (Norway-based) — documents Russian environmental issues. iStories, Novaya Gazeta Europe — independent Russian media operating from exile." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["International oil companies that exited Russia: Maintain divestment", "Shipping companies: Comply with price cap attestation requirements", "Insurance companies: Enforce sanctions compliance on Russian oil cargoes"], infra: "Gazprom — state gas monopoly. Rosneft — state oil company. Most Western majors (Shell, BP, ExxonMobil) have exited Russian operations since 2022." },
    { level: "Regulator / Agency", role: "regulator", actions: ["G7 price cap coalition: Strengthen enforcement against evasion", "EU: Close sanctions loopholes on refined products", "IMO (International Maritime Organization): Address dark fleet safety risks"], infra: "G7 Russian Oil Price Cap Coalition — enforces $60/barrel cap through insurance and shipping services. EU sanctions packages (14+ rounds). Office of Foreign Assets Control (US), OFSI (UK) — sanctions enforcement." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support and strengthen international sanctions on Russian fossil fuel revenues", "Advocate for G7 price cap enforcement strengthening", "Push for addressing Russia's shadow fleet environmental risks in Arctic and Baltic", "Support EU energy diversification to permanently reduce Russian gas dependence"], infra: "Note: Russia's Federal Assembly (Federalnoye Sobraniye — State Duma 450 members, Federation Council 170 members) does not function as an independent legislature. International channels: G7/G20 (Russia suspended from G8), UN General Assembly, international sanctions coalitions." }
  ]}] },
  { code: "RW", name: "Rwanda", region: "Sub-Saharan Africa", summary: "Small East African economy ($14.3B GDP). Agriculture at 24.6% GDP. Forest rents 3.97%. Services at 47.6%. Remarkable post-genocide development but authoritarian governance. Strong environmental policy (plastic bag ban pioneer).", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Rwanda's hillside agriculture on steep terrain causes erosion and soil degradation. When soil erosion data is linked to agricultural output per district, W becomes computable.", breakPaths: ["Terracing and agroforestry expansion. Rwanda already has extensive terracing programs — extending to all cultivated hillsides with measurable soil retention targets breaks the overlapping interest.", "Per-district soil erosion monitoring linked to agricultural productivity data. Rwanda's strong data infrastructure supports this. Makes W computable.", "Partially breakable. Hillside cultivation on steep slopes inherently risks erosion. Terracing and contour farming reduce but cannot eliminate system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to REMA (Rwanda Environment Management Authority)", "Document through RAB (Rwanda Agriculture and Animal Resources Development Board)", "Report through district agronomist offices"], infra: "REMA — the environmental management authority. RAB — agricultural research and extension. Rwanda has strong institutional capacity relative to income level." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Agricultural cooperatives: Adopt terracing and cover cropping standards", "Coffee and tea exporters: Require sustainable hillside cultivation practices", "NAEB (National Agricultural Export Development Board): Integrate soil health into export quality standards"], infra: "NAEB — manages agricultural export promotion (coffee, tea, pyrethrum). Rwanda's agricultural sector is organized through cooperatives and imihigo (performance contracts)." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MINAGRI (Ministry of Agriculture): Expand terracing programs to all cultivated slopes", "REMA: Enforce hillside protection zones", "RLMUA (Rwanda Land Management and Use Authority): Integrate erosion data into land management"], infra: "MINAGRI — agriculture ministry. RLMUA — land use authority. Rwanda's Vision 2050 includes environmental sustainability targets." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Engage through available parliamentary channels — note that Rwanda's legislature has limited independence from the executive", "Support Great Lakes environmental cooperation through ICGLR (International Conference on the Great Lakes Region)", "Advocate for climate adaptation funding for hillside agriculture through Green Climate Fund", "Support African Union environmental governance frameworks"], infra: "Inteko Ishinga Amategeko (Parliament) — bicameral: Chamber of Deputies (80 members) and Senate (26 members). Note: Rwanda is effectively a one-party dominant state under RPF (Rwandan Patriotic Front). International channels: EAC (East African Community), AU, ICGLR." }
  ]}] },
  { code: "SD", name: "Sudan", region: "North Africa", summary: "Conflict-affected economy ($49.7B GDP). Agriculture at 22.2% GDP. Mining 6.63% (gold). Oil rents 3.3% (reduced after South Sudan's independence). Civil war since April 2023 between SAF and RSF. Humanitarian catastrophe.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Sudan's artisanal gold mining uses mercury extensively and generates revenue streams funding armed groups. When gold revenue flows are traced, W becomes computable.", breakPaths: ["International supply chain due diligence blocking conflict gold. When refiners verify provenance, the overlapping interest between armed groups and gold revenues weakens.", "Tracing gold flows from artisanal mines to international markets. LBMA (London Bullion Market Association) responsible sourcing standards provide the framework. Makes W computable.", "Partially breakable. Artisanal mining uses mercury (Minamata Convention violation). Mercury-free processing methods exist but require investment."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through international monitoring organizations (UN Panel of Experts on Sudan)", "Document through INGO networks (Global Witness, IPIS)", "Provide data to LBMA on gold provenance"], infra: "Note: Sudan is in active civil war. No functioning domestic oversight exists. UN Panel of Experts — monitors sanctions and conflict dynamics. IPIS (International Peace Information Service) — tracks artisanal mining and conflict resources." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["International gold refiners: Implement enhanced due diligence on Sudanese gold", "UAE gold traders: Apply LBMA responsible sourcing for Sudan-origin gold", "Insurance and logistics companies: Screen for conflict-linked gold shipments"], infra: "Sudan's gold primarily flows through UAE (Dubai) trading hubs. LBMA — sets responsible sourcing standards for gold refiners worldwide." },
    { level: "Regulator / Agency", role: "regulator", actions: ["LBMA: Add Sudan to high-risk origin list", "UAE authorities: Enhance customs screening for Sudanese gold", "International sanctions bodies: Target RSF gold revenue streams"], infra: "LBMA — London Bullion Market Association, responsible sourcing standard-setter. Financial Action Task Force (FATF) (Financial Action Task Force) — can designate jurisdictions for gold laundering risks." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support UN Security Council sanctions on conflict gold flows", "Advocate for enhanced LBMA responsible sourcing enforcement", "Push for UAE cooperation on gold trade transparency", "Support Minamata Convention enforcement on mercury in artisanal mining"], infra: "Note: Sudan's transitional government collapsed with the April 2023 war. No functioning legislature. International channels: UN Security Council, AU (African Union Peace and Security Council), IGAD (Intergovernmental Authority on Development)." }
  ]}] },
  { code: "SE", name: "Sweden", region: "Europe", summary: "Advanced Nordic economy ($603.7B GDP). Manufacturing at 13% GDP. Mining 1% GDP (iron ore — LKAB is Europe's largest). Services at 66.4%. Strong environmental regulations. EU member. Leading in green steel transition (HYBRIT).", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Sweden's iron ore mining (LKAB) in northern Sweden affects Sami reindeer herding land and generates tailings. When per-mine environmental and indigenous impact data is published alongside production, W becomes computable.", breakPaths: ["Full internalization of indigenous land-use costs and environmental remediation. When LKAB pays for herding disruption and tailings management, the overlapping interest in low-cost extraction weakens.", "Per-mine environmental disclosure including impacts on Sami land use. LKAB publishes sustainability reports — extending to independently verified indigenous impact assessments makes W computable.", "Partially breakable. HYBRIT (Hydrogen Breakthrough Ironmaking Technology) — SSAB/LKAB/Vattenfall joint venture — is producing fossil-free steel, demonstrating that mining's downstream system dependence on carbon-intensive processing can be broken."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to Naturvårdsverket (Swedish Environmental Protection Agency)", "Report to Bergsstaten (Mining Inspectorate of Sweden)", "Document through Sametinget (Sami Parliament) channels"], infra: "Naturvårdsverket — environmental protection agency. Bergsstaten — the mining inspectorate, part of SGU (Sveriges geologiska undersökning — Geological Survey of Sweden). Sametinget — the Sami Parliament, representing indigenous Sami rights." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["LKAB: Accelerate HYBRIT fossil-free iron and steel", "SSAB: Scale fossil-free steel production", "Boliden: Implement enhanced tailings management and water recycling"], infra: "LKAB — state-owned iron ore company, Europe's largest. SSAB — steel producer, partner in HYBRIT. Boliden — base metals mining and smelting company. HYBRIT — world's first fossil-free steel initiative." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Bergsstaten: Strengthen environmental conditions in mining permits", "Mark- och miljödomstolarna (Land and Environment Courts): Apply rigorous environmental review", "SGU: Integrate indigenous land-use data into mining assessments"], infra: "Mark- och miljödomstolarna — specialized environmental courts. Sweden's Minerals Act (Minerallagen) governs mining permits." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Riksdagsledamot in the Riksdag (349 members) to demand indigenous consent requirements in mining permits", "Advocate through EU Critical Raw Materials Act for environmental and indigenous rights safeguards", "Support Nordic Council cooperation on Sami rights across borders", "Push for EU taxonomy alignment of mining environmental standards"], infra: "Riksdag — unicameral parliament, 349 members. Contact through riksdagen.se. Sweden is a constitutional monarchy and EU member." }
  ]}] },
  { code: "SG", name: "Singapore", region: "Southeast Asia", summary: "Advanced city-state economy ($547.4B GDP). Services at 73% GDP. Manufacturing at 16.3% (electronics, petrochemicals). No natural resources. Major petrochemical refining hub and global financial center. World's busiest transshipment port.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Singapore is a major petrochemical refining and trading hub — the 'Houston of Asia.' When refinery emissions and fossil fuel trading flows are disclosed per facility, W becomes computable.", breakPaths: ["Carbon tax escalation (Singapore's carbon tax rises to S$25/tCO₂ in 2024, S$45 in 2026, S$50-80 by 2030). When refining margins incorporate carbon costs, the overlapping interest in unpriced emissions weakens.", "Per-refinery emissions and trade-flow disclosure. MAS (Monetary Authority of Singapore) climate disclosure requirements extend to financial flows. Makes W computable.", "Partially breakable. Petrochemical refining inherently emits. However, Singapore's investment in sustainable aviation fuel and green hydrogen can reduce system dependence over time."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to NEA (National Environment Agency)", "Report through MAS whistleblower channels for financial misconduct", "Document through SGX (Singapore Exchange) disclosure requirements"], infra: "NEA (National Environment Agency) — environmental regulator. MAS (Monetary Authority of Singapore) — financial regulator with expanding climate disclosure mandate. SGX — Singapore Exchange, requires climate reporting." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Shell, ExxonMobil (Jurong Island): Implement carbon capture at refineries", "Banks (DBS, OCBC, UOB): Apply coal financing phase-out policies", "Petrochemical companies: Invest in green hydrogen and sustainable feedstocks"], infra: "Jurong Island — Singapore's petrochemical hub hosting Shell, ExxonMobil, and other major refineries. DBS, OCBC, UOB — Singapore's three major banks with significant fossil fuel financing exposure." },
    { level: "Regulator / Agency", role: "regulator", actions: ["NEA: Accelerate carbon tax escalation timeline", "MAS: Strengthen climate-related financial disclosure (Task Force on Climate-Related Financial Disclosures alignment)", "EMA (Energy Market Authority): Mandate renewable energy targets"], infra: "EMA (Energy Market Authority) — energy regulator. Singapore Green Plan 2030 — national sustainability framework. Carbon tax administered by NEA under Carbon Pricing Act." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Engage through available parliamentary channels — Members of Parliament (93 elected, up to 12 non-constituency/nominated)", "Support ASEAN environmental cooperation frameworks", "Advocate through Singapore's Green Finance Action Plan for regional decarbonization", "Push for IMO shipping emissions standards (Singapore is world's largest bunkering port)"], infra: "Parliament of Singapore — unicameral. Singapore is a parliamentary republic with dominant-party governance (PAP — People's Action Party). Note: limited political pluralism in practice. International channels: ASEAN (founding member), IMO, UNFCCC." }
  ]}] },
  { code: "SI", name: "Slovenia", region: "Europe", summary: "Small EU member economy ($73B GDP). Manufacturing at 19.4% GDP. Services at 57.9%. Significant forest cover (60%+ of territory). EU member since 2004. Former Yugoslav republic with strong environmental awareness.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Slovenia's intensive agriculture in lowland areas (Pomurje, Podravje) relies on monoculture grain and livestock. When soil and water quality data is linked to CAP payments, W becomes computable.", breakPaths: ["EU CAP eco-scheme implementation. When subsidy payments require biodiversity and soil health measures, the overlapping interest in exhaustive monoculture weakens.", "Per-farm soil and water quality monitoring through ARSKTRP (Agency for Agricultural Markets and Rural Development). Makes W computable.", "Partially breakable. Grain monoculture and intensive livestock farming degrade soil and pollute groundwater. Organic farming and crop rotation reduce dependence — Slovenia already has 11%+ organic farming share."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to ARSO (Agencija Republike Slovenije za okolje — Environment Agency)", "Report to Inšpektorat za kmetijstvo (Agricultural Inspectorate)", "Document through Slovenian environmental organizations (Focus, Umanotera)"], infra: "ARSO — the Environment Agency of Slovenia. Umanotera — Slovenian Foundation for Sustainable Development. Focus — environmental NGO." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Agricultural cooperatives: Adopt organic and integrated farming practices", "Dairy industry: Implement manure management standards", "Food processors: Source from diversified farming operations"], infra: "Slovenia's agricultural sector is dominated by small family farms (average 7 hectares). Kmetijsko gozdarska zbornica (Chamber of Agriculture and Forestry) — industry association." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Agriculture: Strengthen CAP eco-scheme implementation", "ARSO: Enforce nitrate directive compliance", "ARSKTRP: Condition payments on biodiversity measures"], infra: "ARSKTRP (Agencija za kmetijske trge in razvoj podeželja) — manages CAP payments. Ministry of Agriculture, Forestry and Food — policy ministry." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Poslanec in the Državni zbor (90 members) to demand stronger CAP eco-scheme implementation", "Support EU Farm to Fork Strategy implementation", "Advocate through Alpine Convention for sustainable mountain agriculture"], infra: "Državni zbor (National Assembly) — 90 members. Državni svet (National Council) — 40 members, advisory role. EU member since 2004. Alpine Convention member. Contact through dz-rs.si." }
  ]}] },
  { code: "SK", name: "Slovak Republic", region: "Europe", summary: "Central European EU member ($140.9B GDP). Manufacturing at 16.3% GDP — heavily auto-dependent (Volkswagen, Kia, Stellantis). Services at 60%. EU member since 2004. World's largest per-capita car producer.", sectors: [{ name: "Ultra-Processed Food", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Slovakia's food processing industry produces significant ultra-processed food for regional markets. When per-product health impact data (obesity, diabetes correlations) is disclosed alongside marketing spend, W becomes computable.", breakPaths: ["EU front-of-pack labeling (Nutri-Score or equivalent). When consumers can identify ultra-processing, the overlapping interest in opaque ingredient lists weakens.", "Mandatory per-product health impact disclosure. Slovakia has rising obesity rates (20%+). Linking Ultra-Processed Food consumption data to health outcomes makes W computable.", "Not breakable. Ultra-processing by definition strips nutritional value and adds synthetic additives."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to ŠVPS (Štátna veterinárna a potravinová správa — State Veterinary and Food Administration)", "Report to ÚVZ SR (Úrad verejného zdravotníctva — Public Health Authority)", "Document through consumer protection organizations"], infra: "ŠVPS — the food safety authority. ÚVZ SR — public health authority monitoring dietary health outcomes." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Food processors: Reformulate to reduce ultra-processing", "Retailers (Lidl, Kaufland, Tesco): Adopt front-of-pack labeling", "Advertisers: Restrict Ultra-Processed Food marketing to children"], infra: "Slovakia's food retail is dominated by international chains (Lidl, Kaufland, Tesco, Billa). Slovenská poľnohospodárska a potravinárska komora — food industry chamber." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Health: Implement front-of-pack nutrition labeling", "ŠVPS: Strengthen food composition standards", "Ministry of Agriculture: Support local food production incentives"], infra: "Ministry of Health — oversees dietary health policy. Ministry of Agriculture and Rural Development — food production policy." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Poslanec in the Národná rada (150 members) to demand mandatory front-of-pack labeling", "Support EU Farm to Fork Strategy Ultra-Processed Food reduction targets", "Advocate through WHO Europe for ultra-processed food regulation"], infra: "Národná rada Slovenskej republiky (National Council) — unicameral, 150 members. EU member since 2004. Contact through nrsr.sk." }
  ]}] },
  { code: "SN", name: "Senegal", region: "Sub-Saharan Africa", summary: "West African economy ($32.8B GDP). Agriculture at 16.6% GDP. Mining 2.9% (phosphates, gold, zircon). Offshore oil and gas discoveries (Sangomar field — first oil expected). Fisheries crucial for food security. Democracy with peaceful power transitions.", sectors: [{ name: "Fisheries", beta: 4.72, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Senegal's fisheries face severe overfishing by foreign industrial fleets (EU, China) competing with artisanal pirogues. When per-vessel catch data is published alongside stock assessments, W becomes computable.", breakPaths: ["Reform fishing access agreements to limit foreign industrial fleet catch. When EU and Chinese DWF (Distant Water Fleet) quotas reflect stock sustainability, the overlapping interest in overfishing weakens.", "VMS (Vessel Monitoring System) data publication and per-vessel catch reporting. Senegal has invested in MCS (Monitoring, Control and Surveillance). Makes W computable.", "Partially breakable. Industrial trawling damages benthic habitats. Artisanal fishing with selective gear reduces system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to DPSP (Direction de la Protection et de la Surveillance des Pêches)", "Document through ICSF (International Collective in Support of Fishworkers)", "Report IUU (Illegal, Unreported, Unregulated) fishing to CNSP (Centre National de Surveillance des Pêches)"], infra: "DPSP — fisheries protection directorate. CNSP — national fisheries surveillance center, operates patrol vessels. Senegal has one of West Africa's most developed fisheries monitoring systems." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Foreign fishing companies: Comply with Senegalese fishing access terms", "Fish processing companies: Adopt sustainable sourcing certification (MSC)", "Artisanal fishing cooperatives: Support co-management of nearshore zones"], infra: "Senegal's fisheries employ ~600,000 people. Artisanal pirogues (wooden boats) land ~80% of total catch. GAIPES — fish exporters association." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Fisheries: Reform fishing access agreements with EU and China", "CRODT (Centre de Recherches Océanographiques de Dakar-Thiaroye): Publish stock assessments", "CSRP (Sub-Regional Fisheries Commission): Coordinate regional management"], infra: "Ministry of Fisheries and Maritime Economy. CRODT — oceanographic research center providing stock assessments. CSRP — sub-regional fisheries commission for West Africa." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Député in the Assemblée nationale (165 members) to demand reform of foreign fishing access agreements", "Support CSRP regional fisheries management plans", "Advocate through AU-IBAR for African fisheries sovereignty", "Push for RFMO (Regional Fisheries Management Organization) quotas reflecting stock sustainability"], infra: "Assemblée nationale du Sénégal — unicameral, 165 members. Senegal is a presidential republic with a strong democratic tradition (peaceful power transitions in 2000, 2012, 2024). Contact through assemblee-nationale.sn." }
  ]}] },
  { code: "SO", name: "Somalia", region: "Sub-Saharan Africa", summary: "Fragile state ($12B GDP). Limited economic data available. Forest rents 11.24% GDP (charcoal — major deforestation driver). Charcoal trade linked to Al-Shabaab financing. Ongoing conflict and state fragility.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Somalia's charcoal production devastates acacia forests and finances armed groups. When charcoal trade flows are traced and linked to deforestation data, W becomes computable.", breakPaths: ["UN Security Council charcoal export ban enforcement (Resolution 2036). When the ban is effectively enforced, the overlapping interest between Al-Shabaab revenue and charcoal trade weakens.", "Satellite deforestation monitoring linked to charcoal trade routes. UN Monitoring Group has documented the flows. Makes W computable.", "Not breakable. Charcoal production from slow-growing acacia in arid Somali climate causes irreversible desertification."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to UN Monitoring Group on Somalia and Eritrea", "Document through Somali environmental organizations where operational", "Report charcoal shipments to naval forces (EU NAVFOR, Combined Maritime Forces)"], infra: "UN Monitoring Group on Somalia and Eritrea — monitors sanctions including the charcoal ban. EU NAVFOR (Operation Atalanta) — maritime security operation. Note: domestic institutional capacity is extremely limited." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Shipping companies: Screen for Somali charcoal cargoes", "Gulf state importers (UAE, Saudi Arabia, Oman): Enforce import bans on Somali charcoal", "Alternative energy providers: Invest in LPG distribution as charcoal substitute"], infra: "Somali charcoal is primarily exported to Gulf states via dhow networks. UAE has been the largest market. Some companies are promoting LPG as an alternative cooking fuel." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Federal Government of Somalia: Enforce charcoal export ban", "Gulf state customs: Screen for Somali charcoal imports", "UN SEMG: Strengthen monitoring of charcoal trade networks"], infra: "Federal Government of Somalia — limited authority outside Mogadishu. Federal Member States have varying governance capacity. UN sanctions framework provides the primary regulatory tool." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support UN Security Council charcoal ban enforcement", "Advocate for Gulf state cooperation on import screening", "Push for alternative livelihoods funding through UN Somalia programs", "Support Somali Disaster Resilience Institute environmental programs"], infra: "Federal Parliament of Somalia — bicameral: House of the People (275 members) and Upper House (54 members). Note: clan-based indirect elections, limited institutional capacity. International channels: UN, AU (ATMIS — AU Transition Mission in Somalia), IGAD." }
  ]}] },
  { code: "SV", name: "El Salvador", region: "Central America", summary: "Small Central American economy ($35.4B GDP). Services at 61% GDP. Agriculture at 4.4%. Manufacturing at 12%. Significant remittance dependence (~24% of GDP). Bitcoin adopted as legal tender (2021). State of exception since 2022.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "El Salvador's sugarcane monoculture in coastal lowlands is linked to chronic kidney disease of unknown etiology (CKDu) among agricultural workers — one of the highest rates globally. When CKDu data is linked to agrochemical exposure per farm, W becomes computable.", breakPaths: ["Agrochemical regulation and worker health monitoring. When sugarcane operations internalize CKDu health costs, the overlapping interest in unregulated pesticide/herbicide use weakens.", "Per-farm agrochemical use and worker health outcome data. El Salvador has the world's highest CKDu mortality. Linking these datasets makes W computable.", "Partially breakable. Sugarcane monoculture depletes soils and concentrates agrochemical exposure. Crop diversification and organic practices reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to MARN (Ministerio de Medio Ambiente y Recursos Naturales)", "Document worker health impacts through ISSS (Instituto Salvadoreño del Seguro Social)", "Report to MAG (Ministerio de Agricultura y Ganadería)"], infra: "MARN — Ministry of Environment and Natural Resources. ISSS — social security institute. MAG — agriculture ministry. La Isla Network — international NGO documenting CKDu in Central America." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Sugar mills (ingenios): Implement worker heat stress and agrochemical exposure protocols", "Adopt mechanized harvesting to reduce worker field exposure", "Invest in worker kidney screening programs"], infra: "El Salvador's sugar industry is concentrated among a few large ingenios (sugar mills). CAMAGRO (Cámara Agropecuaria y Agroindustrial) — agricultural industry chamber." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Health: Establish CKDu surveillance and prevention program", "MARN: Regulate agrochemical use in sugarcane production", "MAG: Support crop diversification away from monoculture sugarcane"], infra: "Ministry of Health — responsible for CKDu response. MARN — environmental regulation." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Engage through available legislative channels — Asamblea Legislativa (84 members); note concentrated executive power under current governance", "Support SICA (Central American Integration System) regional CKDu response", "Advocate through PAHO/WHO for CKDu research and prevention funding", "Push for ILO conventions on agricultural worker health protection"], infra: "Asamblea Legislativa — unicameral, 84 members. Note: since 2021, executive dominance over legislature; limited separation of powers in practice. International channels: SICA, PAHO, ILO." }
  ]}] },
  { code: "SY", name: "Syria", region: "Middle East", summary: "War-devastated economy ($23.6B GDP). Agriculture at 43.1% GDP — unusually high due to industrial collapse. Oil rents 4.02%, gas 2.33%. Civil war since 2011 has destroyed infrastructure. Ongoing political transition (2024-2025).", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Syria's oil infrastructure has been contested between factions (SDF/AANES controls northeastern fields, former regime controlled refineries). When oil revenue flows are transparently traced through reconstruction, W becomes computable.", breakPaths: ["Post-conflict transparent governance of oil revenues. When reconstruction frameworks require accountable revenue management, the overlapping interest in opaque extraction weakens.", "Oil revenue flow transparency as condition of reconstruction assistance and sanctions relief. Makes W computable.", "Partially breakable. Oil infrastructure has been extensively damaged — reconstruction offers opportunity to build in environmental standards."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through international monitoring organizations", "Document environmental damage from conflict-era oil infrastructure destruction", "Report through UN OCHA coordination mechanisms"], infra: "Note: Syria is in post-conflict transition. Institutional capacity is severely degraded. Multiple governance structures operate in different regions." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["International reconstruction companies: Adopt environmental standards in oil infrastructure rebuilding", "Apply conflict-sensitivity to investment decisions", "Require transparent revenue sharing in any production agreements"], infra: "Pre-war: Syrian Petroleum Company (state oil company). Current: fragmented control over oil infrastructure." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Transitional governance: Establish transparent hydrocarbon revenue management", "International community: Condition reconstruction support on environmental and governance standards", "EITI: Support Syrian membership as part of governance transition"], infra: "Regulatory capacity must be rebuilt as part of political transition." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support international frameworks conditioning reconstruction assistance on transparent resource governance", "Advocate through UN-led political process for resource revenue transparency", "Push for environmental damage assessment and remediation in reconstruction plans", "Support EITI membership for post-transition Syria"], infra: "Note: Syria is undergoing political transition following the fall of the Assad regime (late 2024). New governance structures are forming. International channels: UN (Security Council, Special Envoy), Arab League (membership restored 2023), reconstruction donor conferences." }
  ]}] },
  { code: "TD", name: "Chad", region: "Sub-Saharan Africa", summary: "Sahelian economy ($19.5B GDP). Oil rents 16.75% GDP. Agriculture at 37.7%. Forest rents 4.58%. One of the world's poorest countries. Military transitional government. Lake Chad shrinking (~90% since 1960s).", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Chad's oil revenues flow through an opaque pipeline (Doba basin to Kribi, Cameroon). The World Bank's original revenue transparency mechanism (Collège de Contrôle) was dismantled. When oil revenue allocation is made transparent, W becomes computable.", breakPaths: ["Restore oil revenue transparency mechanisms. The World Bank's original Chad-Cameroon pipeline project required transparent revenue allocation — this was dismantled. Rebuilding it breaks the overlapping interest in opaque revenue flows.", "Oil revenue flow disclosure through EITI. Chad was suspended from EITI in 2023 for governance failures. Restoring compliance makes W computable.", "Partially breakable. Oil production in arid Sahel strains water resources. However, the Doba basin fields are maturing and production declining."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through international oil company channels (CNPC has major presence)", "Document through international NGOs (Publish What You Pay, SWISSAID)", "Report to international financial institutions"], infra: "Note: Chad's civil society space is severely restricted. Publish What You Pay — international revenue transparency coalition. SWISSAID — has worked on Chad extractives governance." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["CNPC (China National Petroleum Corporation): Implement environmental and transparency standards", "Savannah Energy: Adopt EITI-aligned reporting", "Pipeline operators: Publish transport revenue data"], infra: "CNPC — operates major oil fields after acquiring former ExxonMobil assets. Savannah Energy — British company that acquired former Chevron assets. Chad-Cameroon pipeline — 1,070 km pipeline to Atlantic coast." },
    { level: "Regulator / Agency", role: "regulator", actions: ["SHT (Société des Hydrocarbures du Tchad): Restore revenue transparency", "Ministry of Petroleum: Enforce environmental regulations", "EITI: Support Chad's path to reinstatement"], infra: "SHT — state oil company. Ministry of Petroleum, Mines and Energy — oversees hydrocarbons. Chad was suspended from EITI in 2023." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support international pressure for oil revenue transparency", "Advocate through African Union for governance reform and return to constitutional order", "Push for World Bank re-engagement on revenue management conditionality", "Support Lake Chad Basin Commission environmental programs"], infra: "Note: Military transitional government (Conseil Militaire de Transition, succeeded by elected government of Mahamat Déby, 2024). Conseil National de Transition — 93 members, appointed. International channels: AU, Lake Chad Basin Commission, CEMAC." }
  ]}] },
  { code: "TG", name: "Togo", region: "Sub-Saharan Africa", summary: "Small West African economy ($10.7B GDP). Agriculture at 21.3% GDP. Mining 4.88% (phosphates — world's 5th largest producer). Services at 49.2%. Key transit port (Lomé). Governance concerns with limited political competition.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Togo's phosphate mining (SNPT — Société Nouvelle des Phosphates du Togo) generates cadmium-contaminated waste. When per-mine environmental data is published, W becomes computable.", breakPaths: ["International cadmium standards in phosphate products. When export markets require cadmium limits, the overlapping interest in unprocessed phosphate extraction weakens.", "Per-mine environmental monitoring data including cadmium levels, water contamination, and land rehabilitation. Makes W computable.", "Partially breakable. Phosphate rock contains cadmium. Cadmium removal technology exists and is commercially viable."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to ANGE (Agence Nationale de Gestion de l'Environnement)", "Document through community organizations in phosphate mining regions (Hahotoé-Kpogamé)", "Report through ITIE-Togo (EITI Togo) channels"], infra: "ANGE — national environmental management agency. ITIE-Togo — Togo is an EITI candidate country." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["SNPT: Invest in cadmium removal technology", "Implement mine rehabilitation for exhausted areas", "Adopt international environmental reporting standards"], infra: "SNPT (Société Nouvelle des Phosphates du Togo) — the state phosphate company, privatized then renationalized. Operates mines in the Hahotoé-Kpogamé region." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Mines: Strengthen environmental conditions in mining permits", "ANGE: Enforce environmental impact assessment requirements", "ITIE-Togo: Expand to environmental data disclosure"], infra: "Ministry of Mines and Energy — mining oversight. ANGE — environmental assessment authority." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Engage through available parliamentary channels — note limited political pluralism under current governance", "Support ECOWAS environmental governance frameworks", "Advocate for Codex Alimentarius cadmium limits in phosphate-derived fertilizers", "Push for EITI full membership with environmental disclosure"], infra: "Assemblée nationale du Togo — 113 members. Note: Togo has been governed by the Gnassingbé family since 1967; limited political competition. Constitutional change in 2024 shifted to parliamentary system. International channels: ECOWAS, AU, EITI." }
  ]}] },
  { code: "TH", name: "Thailand", region: "Southeast Asia", summary: "Major Southeast Asian economy ($526.5B GDP). Manufacturing at 24.3% GDP (automotive, electronics, food processing). Agriculture at 8.7%. Services at 59.2%. World's largest rice exporter. Significant petrochemical sector. Constitutional monarchy.", sectors: [{ name: "Ultra-Processed Food", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Thailand is a major Ultra-Processed Food producer and exporter (CP Group — Charoen Pokphand — is one of Asia's largest food conglomerates). When per-product health impact data is linked to marketing and formulation, W becomes computable.", breakPaths: ["Front-of-pack labeling reform. Thailand's existing traffic-light label (GDA) covers some nutrients — extending to ultra-processing indicators weakens the overlapping interest in opaque formulation.", "Per-product health outcome correlation data. Thailand's rising obesity and diabetes rates can be linked to Ultra-Processed Food consumption patterns. Makes W computable.", "Not breakable. Ultra-processing by definition strips nutritional value."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to Thai FDA (Food and Drug Administration)", "Document through Thai Health Promotion Foundation (ThaiHealth)", "Report misleading health claims to OCPB (Office of the Consumer Protection Board)"], infra: "Thai FDA — regulates food safety and labeling. ThaiHealth (สำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ) — independent health promotion agency funded by a 2% surcharge on tobacco and alcohol taxes." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["CP Group (Charoen Pokphand): Reformulate products to reduce ultra-processing", "Thai Union: Adopt transparent nutritional labeling", "Retailers: Promote shelf placement for whole foods"], infra: "CP Group — one of the world's largest agri-food conglomerates. Thai Union — global seafood company (owner of Chicken of the Sea). Thai Beverage (ThaiBev) — major food and beverage company." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Thai FDA: Extend labeling to cover ultra-processing indicators", "Ministry of Public Health: Strengthen sugar tax and Ultra-Processed Food marketing restrictions", "ThaiHealth: Fund Ultra-Processed Food health impact research"], infra: "Ministry of Public Health — health policy. Thai FDA — food regulation. Thailand's sugar tax (2017) is one of the region's most progressive." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your สมาชิกสภาผู้แทนราษฎร (Member of the House of Representatives, 500 members) to demand Ultra-Processed Food labeling reform", "Support ASEAN food labeling harmonization", "Advocate through WHO SEARO for ultra-processed food regulation", "Push for Codex Alimentarius Ultra-Processed Food classification standards"], infra: "รัฐสภา (National Assembly) — bicameral: สภาผู้แทนราษฎร (House of Representatives, 500 members) and วุฒิสภา (Senate, 200 members). Thailand is a constitutional monarchy. Recent democratic restoration (2023 elections)." }
  ]}] },
  { code: "TJ", name: "Tajikistan", region: "Central Asia", summary: "Poorest Central Asian economy ($14.2B GDP). Mining 7.09% GDP (gold, silver, antimony). Agriculture at 19.7%. Aluminum smelting (TALCO). Remittance-dependent (~30% of GDP from Russia). Authoritarian governance.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Tajikistan's mining sector includes artisanal gold mining with mercury use and the TALCO aluminum smelter (one of Central Asia's largest polluters). When per-facility emissions and environmental data are published, W becomes computable.", breakPaths: ["International buyer due diligence on Tajik mineral exports. When aluminum and gold buyers require environmental compliance verification, the overlapping interest in unregulated production weakens.", "Per-facility environmental monitoring data. TALCO's fluoride emissions and gold mining mercury contamination can be measured and disclosed. Makes W computable.", "Partially breakable. TALCO smelter emissions can be reduced with modern pot-lining and scrubbing technology. Mercury-free gold processing exists."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through international partner channels (IFC, EBRD)", "Document through Central Asian environmental networks", "Report through EITI channels (Tajikistan is a candidate country)"], infra: "Note: Civil society space in Tajikistan is severely restricted. International channels provide the primary avenue for environmental reporting. EBRD and IFC have invested in Tajik mining." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["TALCO (Tajik Aluminum Company): Invest in emissions reduction technology", "Gold mining companies: Adopt mercury-free processing", "International buyers: Require environmental compliance in supply contracts"], infra: "TALCO — state aluminum company, one of the world's largest smelters. Operates in Tursunzoda (formerly Regar). Gold mining includes both industrial and artisanal operations." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Committee for Environmental Protection: Strengthen environmental enforcement", "Ministry of Industry: Require TALCO emissions modernization", "EITI Tajikistan: Expand to environmental data"], infra: "Committee for Environmental Protection under the Government — environmental regulator. Ministry of Industry and New Technologies — industrial oversight." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support international pressure for environmental standards in Tajik mining through EBRD and IFC project conditionality", "Advocate through OSCE environmental dimension for monitoring support", "Push for Minamata Convention enforcement on mercury in artisanal mining", "Support EITI candidacy advancement with environmental disclosure"], infra: "Majlisi Oli (Parliament) — bicameral: Majlisi Namoyandagon (lower, 63 members) and Majlisi Milli (upper, 33 members). Note: effectively one-party state (PDPT). International channels: OSCE, SCO, EITI." }
  ]}] },
  { code: "TM", name: "Turkmenistan", region: "Central Asia", summary: "Gas-dependent closed economy ($51.4B GDP). Manufacturing at 18% GDP. One of the world's most authoritarian states. Massive gas reserves (Galkynysh — world's 2nd largest gas field). Data extremely limited — World Bank reports zeros for many indicators due to government opacity.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Turkmenistan is one of the world's largest methane emitters — satellite monitoring (Sentinel-5P, MethaneSAT) has revealed massive methane leaks from gas infrastructure. When methane data is published, W becomes computable despite government opacity.", breakPaths: ["Satellite-based methane monitoring bypasses government opacity. When buyers (China — CNPC pipeline) face pressure to account for upstream methane, the overlapping interest in unmonitored gas production weakens.", "Satellite methane emission monitoring (UNEP's IMEO — International Methane Emissions Observatory — has flagged Turkmenistan). Makes W computable without government cooperation.", "Not breakable. Gas production and transport inherently leak methane, a greenhouse gas 80× more potent than CO₂ over 20 years."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through international channels only — no domestic civil society exists", "Provide data to UNEP IMEO or satellite monitoring organizations", "Document through Crude Accountability or Turkmen.news (exile media)"], infra: "Note: Turkmenistan is one of the world's most closed societies. No independent civil society, media, or judiciary exists. Crude Accountability — international NGO documenting environmental issues in the Caspian region. Turkmen.news — exile media." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["CNPC (Central Asia-China gas pipeline): Account for upstream methane in lifecycle emissions", "International engineering firms: Include methane mitigation in infrastructure contracts", "Buyers: Apply methane intensity standards to Turkmen gas"], infra: "Türkmengaz — state gas company. Türkmennebit — state oil company. CNPC — operates the Central Asia-China gas pipeline (Turkmenistan is the primary source). No independent corporate governance exists." },
    { level: "Regulator / Agency", role: "regulator", actions: ["UNEP IMEO: Continue satellite monitoring and public reporting", "Global Methane Pledge signatories: Press for engagement with Turkmenistan", "IEA: Include Turkmenistan in methane tracker reports"], infra: "No independent domestic regulation exists. International monitoring provides the only oversight: UNEP IMEO, IEA Methane Tracker, satellite platforms (MethaneSAT, Sentinel-5P)." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support satellite-based methane monitoring that bypasses government opacity", "Advocate through UNEP for Turkmenistan's engagement with the Global Methane Pledge", "Push for methane intensity standards in international gas trade", "Support OSCE and UN human rights mechanisms for governance reform"], infra: "Mejlis (Parliament) — 125 members. Turkmenistan is an authoritarian state — the legislature has no independent function. International channels: UN (UNEP, OHCHR), OSCE, CIS. Turkmenistan maintains permanent neutrality status (UN-recognized since 1995)." }
  ]}] },
  { code: "TN", name: "Tunisia", region: "North Africa", summary: "North African economy ($51.3B GDP). Agriculture at 9.7% GDP. Oil rents 1.55%. Manufacturing at 14.8%. Services at 62.6%. Birthplace of the Arab Spring (2011). Governance backsliding since 2021 presidential power consolidation.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Tunisia's oil and gas production is modest but state oil company ETAP's revenue flows lack transparency. When per-field environmental and revenue data is published, W becomes computable.", breakPaths: ["EITI-aligned revenue transparency. Tunisia's oil revenues are small relative to GDP but significant for the state budget. Transparent allocation breaks the overlapping interest in opaque revenue management.", "Per-field environmental monitoring and revenue flow disclosure. Makes W computable.", "Partially breakable. Tunisia's mature fields are declining. Solar energy potential is enormous (Saharan irradiance) and can reduce hydrocarbon dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to ANPE (Agence Nationale de Protection de l'Environnement)", "Document through Tunisian environmental organizations (FTDES — Forum Tunisien pour les Droits Économiques et Sociaux)", "Report through ETAP compliance channels"], infra: "ANPE — environmental protection agency. FTDES — Tunisian economic and social rights forum, active on environmental justice. Tunisia has relatively active civil society despite recent governance concerns." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["ETAP (Entreprise Tunisienne d'Activités Pétrolières): Adopt revenue transparency standards", "Invest in solar energy transition", "International partners (ENI, OMV): Apply home-country environmental, social, and governance standards to Tunisian operations"], infra: "ETAP — state oil company. ENI (Italy), OMV (Austria) — major international operators in Tunisia. Tunisia's South Energy Transition Program targets renewable expansion." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Industry, Mines and Energy: Implement hydrocarbon revenue transparency", "ANPE: Strengthen environmental monitoring at production sites", "ANME (Agence Nationale pour la Maîtrise de l'Énergie): Accelerate renewable energy targets"], infra: "Ministry of Industry, Mines and Energy — hydrocarbons oversight. ANME — energy efficiency and renewable energy agency." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Engage through available parliamentary channels — Assemblée des Représentants du Peuple (161 members); note limited legislative independence under current governance", "Support EU-Tunisia cooperation on energy transition", "Advocate through Union for the Mediterranean for renewable energy investment", "Push for EITI membership as governance transparency measure"], infra: "Assemblée des Représentants du Peuple — unicameral, 161 members. Note: since 2021, presidential power consolidation has weakened legislative independence. International channels: Arab League, AU, Union for the Mediterranean." }
  ]}] },
  { code: "TR", name: "Türkiye", region: "Europe & Central Asia", summary: "Major middle-income economy ($1,359.1B GDP). Manufacturing at 16.8% GDP. Services at 57.5%. NATO member. Mining 0.63%. Agriculture at 5.8%. Significant coal dependence for electricity. G20 member.", sectors: [{ name: "Coal", beta: 6.1, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Türkiye is expanding coal capacity (including imported coal plants) despite having excellent renewable potential. When coal plant health costs are internalized, the overlapping interest in cheap coal power breaks.", breakPaths: ["Carbon pricing or coal plant emission standards aligned with EU CBAM (Carbon Border Adjustment Mechanism). Türkiye's EU customs union makes CBAM relevant to industrial exports. When coal costs include carbon, renewables are cheaper.", "Per-plant emissions and health cost data. Türkiye's coal plants are concentrated near population centers. HEAL and local NGOs have documented health costs. Makes W computable.", "Not breakable. Coal combustion releases SO₂, PM2.5, mercury, and CO₂."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to ÇŞB (Çevre, Şehircilik ve İklim Değişikliği Bakanlığı — Ministry of Environment, Urbanization and Climate Change)", "Document through TEMA Vakfı (Turkish Foundation for Combating Soil Erosion)", "Report through Greenpeace Mediterranean Turkey office"], infra: "ÇŞB — environment ministry. TEMA Vakfı — major Turkish environmental NGO focused on soil and forest protection. Greenpeace Mediterranean — active in Türkiye on coal campaigns." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["EÜAŞ (Elektrik Üretim A.Ş.): Develop coal phase-out timeline", "Private coal operators: Invest in renewable alternatives", "Industrial companies: Switch to renewable electricity procurement"], infra: "EÜAŞ — state electricity generation company. Significant private coal generation. Türkiye's 2053 net-zero target implies eventual coal phase-out but no timeline exists." },
    { level: "Regulator / Agency", role: "regulator", actions: ["EPDK (Enerji Piyasası Düzenleme Kurumu — Energy Market Regulatory Authority): Reform tariffs to reflect environmental costs", "ÇŞB: Implement emission standards aligned with EU IED", "EMRA: Support renewable energy investment framework"], infra: "EPDK — energy market regulator. Türkiye ratified the Paris Agreement in 2021. EU Customs Union makes Carbon Border Adjustment Mechanism compliance relevant for Turkish industrial exports." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Milletvekili in the Türkiye Büyük Millet Meclisi (600 members) to demand coal phase-out timeline and health cost accounting", "Advocate through G20 for coal phase-out commitments", "Push for EU Carbon Border Adjustment Mechanism preparation to accelerate industrial decarbonization", "Support NATO Green Defence Framework environmental standards"], infra: "TBMM (Türkiye Büyük Millet Meclisi — Grand National Assembly) — unicameral, 600 members. Contact through tbmm.gov.tr. Türkiye is a presidential republic, NATO member, G20 member, EU customs union partner." }
  ]}] },
  { code: "TT", name: "Trinidad and Tobago", region: "Caribbean", summary: "Caribbean energy economy ($25.6B GDP). Gas rents 5.09%, oil rents 2.71% GDP. Major petrochemical and LNG producer (Atlantic LNG). Manufacturing at 14.4%. Services at 59.2%. Parliamentary democracy.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Trinidad's petrochemical industry faces maturing gas fields and declining production. As reserves deplete and global LNG competition increases, the overlapping interest in fossil fuel dependence weakens naturally.", breakPaths: ["Declining natural gas reserves force economic diversification. When production costs rise on mature fields, the overlapping interest in fossil fuel dependence weakens as alternative revenue sources become necessary.", "Per-facility emissions and environmental monitoring at Point Lisas industrial estate and Atlantic LNG. Makes W computable.", "Not breakable. LNG and petrochemical processing emit CO₂ and other pollutants."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to EMA (Environmental Management Authority)", "Report to MEEI (Ministry of Energy and Energy Industries)", "Document through Fishermen and Friends of the Sea (environmental NGO)"], infra: "EMA — the Environmental Management Authority, established under the Environmental Management Act 2000. Fishermen and Friends of the Sea — Trinidad's most active environmental NGO." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["NGC (National Gas Company): Develop gas-to-renewables transition plan", "Atlantic LNG: Implement carbon capture at liquefaction facility", "Petrochemical companies (Methanex, Nutrien): Reduce process emissions"], infra: "NGC (National Gas Company of Trinidad and Tobago) — state gas company. Atlantic LNG — joint venture (Shell, BP, NGC). Point Lisas Industrial Estate — petrochemical complex." },
    { level: "Regulator / Agency", role: "regulator", actions: ["EMA: Strengthen air quality monitoring around Point Lisas", "MEEI: Develop renewable energy framework", "RIC (Regulated Industries Commission): Reform energy pricing"], infra: "MEEI — energy ministry. RIC — utilities regulator. Trinidad has extremely low domestic energy prices (subsidized), discouraging efficiency." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Member of Parliament in the House of Representatives (41 members) to demand economic diversification and renewable energy policy", "Support CARICOM energy transition framework", "Advocate through Alliance of Small Island States (AOSIS) for climate finance", "Push for IMO shipping emission standards (Trinidad is a major bunkering port)"], infra: "Parliament of Trinidad and Tobago — bicameral: House of Representatives (41 members) and Senate (31 members). Parliamentary democracy with competitive elections. Contact through ttparliament.org." }
  ]}] },
  { code: "TZ", name: "Tanzania", region: "Sub-Saharan Africa", summary: "East African economy ($78.8B GDP). Agriculture at 23.3% GDP. Mining 4.03% (gold, tanzanite — found only in Tanzania). Forest rents 2.39%. Gas reserves (offshore). Services at 29.6%. Growing economy with improving governance.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Tanzania's gold mining (Barrick/Twiga Minerals, AngloGold Ashanti) generates tailings and mercury contamination (artisanal sector). When per-mine environmental data is published alongside revenue, W becomes computable.", breakPaths: ["Mining Act 2017 local content and transparency requirements. When enforced alongside environmental monitoring, the overlapping interest in opaque extraction weakens.", "Per-mine environmental monitoring data through TEITI (Tanzania Extractive Industries Transparency Initiative). Makes W computable.", "Partially breakable. Mercury-free artisanal mining and improved tailings management reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to NEMC (National Environment Management Council)", "Report to Mining Commission", "Document through LEAT (Lawyers' Environmental Action Team)"], infra: "NEMC — environmental authority. Mining Commission — mining sector regulator. LEAT — Tanzanian environmental law NGO. HakiRasilimali (Publish What You Pay Tanzania) — revenue transparency advocacy." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Twiga Minerals (Barrick/Government JV): Implement international environmental standards", "AngloGold Ashanti (Geita Gold Mine): Adopt enhanced tailings management", "Tanzanite One: Publish environmental and community impact data"], infra: "Twiga Minerals — 50/50 joint venture between Barrick Gold and Government of Tanzania (created after 2017 tax dispute). Geita Gold Mine — AngloGold Ashanti operation. STAMICO (State Mining Corporation) — government mining entity." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Mining Commission: Enforce environmental conditions in mining licenses", "NEMC: Strengthen environmental impact assessment requirements", "TEITI: Expand to include environmental data"], infra: "Mining Commission — established under Mining Act 2017. TEITI (Tanzania Extractive Industries Transparency Initiative) — EITI member since 2009." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Mbunge in the Bunge la Tanzania (393 members) to demand environmental enforcement in mining", "Support EITI enhanced reporting with environmental data", "Advocate through EAC for regional mining environmental standards", "Push for Minamata Convention enforcement on mercury in artisanal mining"], infra: "Bunge la Tanzania (National Assembly) — unicameral, 393 members. Tanzania is a presidential republic with increasing political openness under current administration. Contact through bunge.go.tz. EAC (East African Community) member." }
  ]}] },
  { code: "UA", name: "Ukraine", region: "Europe", summary: "War-affected economy ($190.7B GDP). Mining 5.32% GDP. Military spending 34.48% GDP (wartime). Agriculture at 7.1%. Coal 0.34%. EU candidate country (2022). Under Russian invasion since February 2022. Massive environmental damage from war.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Ukraine's mining sector (iron ore, manganese, titanium) has suffered massive environmental damage from the Russian invasion — flooded mines, destroyed infrastructure, contaminated land. Post-war reconstruction offers opportunity for transparent environmental standards. When reconstruction environmental data is published, W becomes computable.", breakPaths: ["EU accession conditionality requiring environmental standards in post-war reconstruction. When reconstruction adheres to EU environmental acquis, the overlapping interest in rapid but dirty rebuilding weakens.", "Environmental damage assessment and remediation tracking. Ukraine's Ministry of Environmental Protection is already documenting war damage with international support. Makes W computable.", "Partially breakable. Mining inherently disturbs landscapes, but post-war reconstruction can implement best-practice tailings management and water treatment from the start."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to Derzhekoinspektsiia (State Environmental Inspectorate)", "Document through OSCE environmental monitoring", "Report war-related environmental damage through Ukraine's Ecodozor platform"], infra: "Derzhekoinspektsiia — State Environmental Inspectorate. Ministry of Environmental Protection and Natural Resources — documents war-related environmental damage. Ecodozor — citizen reporting platform." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Metinvest (Akhmetov): Implement EU-aligned environmental standards in reconstruction", "ArcelorMittal Kryvyi Rih: Apply global environmental standards", "Reconstruction companies: Adopt green building and environmental remediation standards"], infra: "Metinvest — Ukraine's largest steel and mining group (Rinat Akhmetov). ArcelorMittal Kryvyi Rih — major steel producer. Ferrexpo — iron ore pellet producer." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Environmental Protection: Enforce environmental standards in reconstruction", "State Subsoil Service: Reform mining licensing with environmental conditions", "EU pre-accession assistance: Support environmental governance capacity building"], infra: "Ministry of Environmental Protection and Natural Resources. State Subsoil Service (Derzhgeonadra) — mining licensing. Ukraine's EU candidacy requires environmental acquis alignment." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Narodnyi deputat in the Verkhovna Rada (450 members) to demand environmental standards in reconstruction legislation", "Support Ukraine Recovery Conference environmental commitments", "Advocate through EU accession process for environmental chapter prioritization", "Push for international environmental damage assessment and Russian liability for war-related environmental destruction"], infra: "Verkhovna Rada — unicameral, 450 members. Contact through rada.gov.ua. EU candidate country since 2022. International channels: EU accession process, Ukraine Recovery Conference, International Criminal Court (environmental damage documentation)." }
  ]}] },
  { code: "UG", name: "Uganda", region: "Sub-Saharan Africa", summary: "East African economy ($53.9B GDP). Agriculture at 24.6% GDP. Forest rents 7.48% (one of the highest in the dataset). Oil production beginning (Tilenga and Kingfisher projects, EACOP pipeline). Authoritarian governance.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Uganda's new oil projects (TotalEnergies' Tilenga and CNOOC's Kingfisher, plus EACOP — East African Crude Oil Pipeline) face massive international scrutiny. When project-level environmental data is published, W becomes computable.", breakPaths: ["International environmental, social, and governance pressure on project financiers. When banks and insurers withdraw from EACOP financing, the overlapping interest in unscrutinized pipeline construction weakens. Several major banks have already declined.", "Per-project environmental impact data for Tilenga (in Murchison Falls National Park), Kingfisher, and EACOP. Makes W computable.", "Not breakable. Crude oil production and 1,443-km heated pipeline through sensitive ecosystems inherently create environmental risk."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to NEMA (National Environment Management Authority)", "Document through international environmental organizations (350.org, BankTrack)", "Report through TotalEnergies compliance channels"], infra: "NEMA — environmental authority. Note: Ugandan environmental activists have faced government harassment. International channels are safer: 350.org has led the #StopEACOP campaign. BankTrack monitors EACOP financing." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["TotalEnergies: Implement comprehensive biodiversity offsets for Tilenga (inside Murchison Falls NP)", "CNOOC Uganda: Adopt international environmental standards for Kingfisher", "Banks: Apply Equator Principles to EACOP financing decisions"], infra: "TotalEnergies — operator of Tilenga project and EACOP. CNOOC Uganda — operates Kingfisher project. EACOP (East African Crude Oil Pipeline) — 1,443 km from Hoima to Tanga (Tanzania). UNOC (Uganda National Oil Company) — state oil company." },
    { level: "Regulator / Agency", role: "regulator", actions: ["PAU (Petroleum Authority of Uganda): Enforce environmental conditions in production licenses", "NEMA: Strengthen environmental monitoring of oil projects", "MEMD (Ministry of Energy and Mineral Development): Ensure transparent revenue management"], infra: "PAU — petroleum sector regulator. MEMD — energy and mineral development ministry. Uganda's Petroleum Revenue Management policy is under development." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support international environmental, social, and governance pressure on EACOP project financing", "Advocate through European Parliament for TotalEnergies duty of vigilance enforcement (French Loi de Vigilance)", "Push for EITI membership with environmental disclosure", "Support East African Court of Justice jurisdiction on transboundary environmental issues"], infra: "Parliament of Uganda — unicameral, 529 members. Note: Uganda is effectively under one-party dominant governance (NRM). International channels: EAC (East African Community), African Court on Human and Peoples' Rights, European Parliament (regarding EU-headquartered companies like TotalEnergies)." }
  ]}] },
  { code: "UY", name: "Uruguay", region: "South America", summary: "Small South American economy ($81B GDP). Agriculture at 6.4% GDP. Services at 65.3%. Forest rents 1.91%. Generates nearly 100% of electricity from renewables (wind, hydro, solar, biomass). Strong democracy — one of Latin America's most stable.", sectors: [{ name: "Monoculture Agriculture", beta: 8.6, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Uruguay's soy and eucalyptus monoculture expansion is degrading soils and displacing native grasslands (campos). When soil health and biodiversity data is linked to agricultural production per department, W becomes computable.", breakPaths: ["National soil conservation plan enforcement. Uruguay's Ley de Uso y Conservación de Suelos (Soil Use and Conservation Law) requires mandatory soil plans — strengthening enforcement breaks the overlapping interest in soil-exhaustive monoculture.", "Per-farm soil erosion and grassland conversion monitoring. MGAP already requires Plan de Uso y Manejo de Suelos for farms >50 ha. Publishing compliance data makes W computable.", "Partially breakable. Soy monoculture and eucalyptus plantations degrade native grassland ecosystems. Integrated crop-livestock systems and native grassland preservation reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to DINAMA (Dirección Nacional de Medio Ambiente)", "Report to RENARE (Dirección General de Recursos Naturales Renovables)", "Document through Vida Silvestre Uruguay"], infra: "DINAMA — national environment directorate. RENARE — renewable natural resources directorate under MGAP. Vida Silvestre Uruguay — biodiversity conservation organization." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Large agricultural companies: Strengthen soil conservation plan compliance", "UPM, Montes del Plata (forestry): Maintain native grassland corridors between eucalyptus plantations", "Meat exporters: Adopt pasture-based certification"], infra: "UPM (Finnish company) — major eucalyptus plantation and pulp mill operator. Montes del Plata (UPM/Arauco) — forestry. Large-scale soy farming often by Brazilian/Argentine operators." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MGAP (Ministerio de Ganadería, Agricultura y Pesca): Enforce mandatory soil plans", "DINAMA: Strengthen environmental assessment for land-use change", "INIA (Instituto Nacional de Investigación Agropecuaria): Publish soil health monitoring data"], infra: "MGAP — agriculture, livestock and fisheries ministry. INIA — national agricultural research institute." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Diputado in the Cámara de Representantes (99 members) or Senador in the Cámara de Senadores (30 members) to demand enforcement of the Soil Conservation Law", "Support Mercosur environmental cooperation frameworks", "Advocate for native grassland (campos) conservation in international biodiversity frameworks", "Push for soil carbon accounting in climate commitments"], infra: "Asamblea General — bicameral: Cámara de Representantes (99 members) and Cámara de Senadores (30 members). Contact through parlamento.gub.uy. Uruguay is one of Latin America's strongest democracies." }
  ]}] },
  { code: "UZ", name: "Uzbekistan", region: "Central Asia", summary: "Central Asian economy ($115B GDP). Gas rents 11.04% GDP. Mining 8.5% (gold — Muruntau is world's largest open-pit gold mine, uranium). Agriculture at 18.3%. Manufacturing at 20.2%. Post-Karimov liberalization (since 2016).", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Uzbekistan's gas sector (Uzbekneftegaz) consumes most production domestically at heavily subsidized prices, encouraging waste. When per-field production and domestic consumption data is published, W becomes computable.", breakPaths: ["Gas price reform eliminating subsidies that encourage wasteful consumption. When domestic gas prices reflect market value, the overlapping interest in underpriced energy weakens.", "Per-field production, distribution, and consumption data. Uzbekistan has begun EITI implementation. Makes W computable.", "Partially breakable. Gas combustion emits CO₂. However, Uzbekistan's enormous solar potential (300+ sunny days/year) can displace gas in electricity generation."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to State Committee for Ecology and Environmental Protection", "Report through EITI Uzbekistan channels", "Document through international partner organizations"], infra: "State Committee for Ecology and Environmental Protection (Goskomekologiya) — environmental regulator. EITI Uzbekistan — Uzbekistan became an EITI member in 2021." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Uzbekneftegaz: Publish per-field production and environmental data", "Navoi Mining (NMMC): Adopt international environmental standards for gold and uranium mining", "Reduce methane leakage from gas infrastructure"], infra: "Uzbekneftegaz — state gas company. NMMC (Navoi Mining and Metallurgical Company) — operates Muruntau gold mine (world's largest open-pit) and uranium mines. Almalyk MMC — copper and gold mining." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Energy: Implement gas price reform roadmap", "Goskomekologiya: Strengthen environmental enforcement at mining and gas facilities", "EITI Uzbekistan: Expand to environmental data disclosure"], infra: "Ministry of Energy — energy policy. Goskomekologiya — environmental regulation. Uzbekistan has been implementing significant economic reforms since 2016." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Engage through Oliy Majlis (parliament) — bicameral: Legislative Chamber (150 members) and Senate (100 members)", "Support EITI enhanced reporting with environmental data", "Advocate through EBRD and ADB for gas price reform conditionality", "Push for Aral Sea environmental restoration international cooperation"], infra: "Oliy Majlis — bicameral: Legislative Chamber (Qonunchilik palatasi, 150 members) and Senate, 100 members. Note: limited political pluralism. International channels: EITI, EBRD, ADB, SCO. Aral Sea environmental disaster requires international cooperation." }
  ]}] },
  { code: "VE", name: "Venezuela", region: "South America", summary: "Oil-dependent economy in crisis ($119.8B GDP — severely contracted from peak). World's largest proven oil reserves. Economic data largely unavailable (World Bank reports zeros for most indicators). Hyperinflation, mass emigration. Authoritarian governance.", sectors: [{ name: "Oil & Gas", beta: 6.2, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Venezuela's oil industry has collapsed from ~3.3M bpd (1990s) to ~700K bpd due to mismanagement, underinvestment, and sanctions. The overlapping interest is already weakened by operational failure.", breakPaths: ["Production collapse has already weakened the overlapping interest — PDVSA lacks the capital and technical capacity to maintain production. Sanctions further constrain revenue.", "Oil revenue transparency is impossible under current governance opacity. However, international sanctions monitoring (Office of Foreign Assets Control designations) provides partial W computability.", "Not breakable. Oil extraction and refining emit CO₂. Venezuela's heavy crude (Orinoco Belt) is particularly emissions-intensive to process."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report through international channels (Transparencia Venezuela, PROVEA)", "Document through exile media and research organizations", "Provide data to international sanctions enforcement authorities"], infra: "Note: No independent domestic institutions exist. Transparencia Venezuela — anti-corruption NGO. PROVEA — Venezuelan human rights organization. Operating environment is extremely hostile to civil society." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["International oil companies with remaining interests (Chevron, Repsol, ENI): Apply environmental standards to limited operations", "Chevron: Publish per-facility environmental data for Venezuela operations", "Service companies: Maintain environmental standards in contracted work"], infra: "PDVSA (Petróleos de Venezuela, S.A.) — state oil company, severely degraded operationally. Chevron — received limited US Office of Foreign Assets Control license to operate. Repsol, ENI — maintain limited presence." },
    { level: "Regulator / Agency", role: "regulator", actions: ["OFAC: Maintain sanctions conditionality linked to governance reform", "EU: Coordinate sanctions policy", "OPEC: Address Venezuela's production reporting transparency"], infra: "No independent domestic regulation exists. OFAC (Office of Foreign Assets Control, US Treasury) — administers Venezuela sanctions. EU — maintains sanctions. PDVSA is both regulator and operator — no separation exists." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support international sanctions conditionality requiring democratic governance and environmental standards", "Advocate through Lima Group/International Contact Group for governance reform", "Push for PDVSA operational and environmental transparency as condition of sanctions relief", "Support post-transition EITI membership planning"], infra: "Asamblea Nacional — 277 members. Note: Venezuela's institutions lack independence under current governance. International channels: OAS (Venezuela withdrawn/suspended), International Contact Group, ICC preliminary examination, Lima Group (reduced activity)." }
  ]}] },
  { code: "VN", name: "Viet Nam", region: "Southeast Asia", summary: "Fast-growing economy ($476.4B GDP). Manufacturing at 24.4% GDP. Agriculture at 11.9%. Coal rents 0.38%. Oil 0.67%. Forest rents 1.07%. Major electronics and textile manufacturing hub. One-party state (Communist Party).", sectors: [{ name: "Coal", beta: 6.1, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Viet Nam is rapidly expanding coal power capacity despite excellent renewable potential (solar, wind, offshore wind). JETP (Just Energy Transition Partnership) funding ($15.5B pledged) creates leverage to shift the overlapping interest away from coal.", breakPaths: ["JETP implementation — $15.5B pledged by international partners for coal-to-renewables transition. When JETP funding makes renewables cheaper than new coal, the overlapping interest in coal expansion breaks.", "Per-plant emissions and health cost data. Viet Nam's coal plants are concentrated in the north (Quảng Ninh) and south (Bình Thuận). Makes W computable.", "Not breakable. Coal combustion releases SO₂, PM2.5, and CO₂."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to MONRE (Bộ Tài nguyên và Môi trường — Ministry of Natural Resources and Environment)", "Document through VUSTA (Viet Nam Union of Science and Technology Associations)", "Report through international development partner channels (World Bank, ADB)"], infra: "MONRE — environment and natural resources ministry. VUSTA — umbrella organization for Vietnamese civil society (within party framework). Note: independent civil society is not permitted in Viet Nam's one-party system." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["EVN (Electricity of Viet Nam): Accelerate Power Development Plan VIII renewable targets", "PVN (PetroVietnam): Invest in offshore wind", "International manufacturers (Samsung, Intel): Demand renewable electricity procurement options"], infra: "EVN (Tập đoàn Điện lực Việt Nam) — state electricity utility. PVN (PetroVietnam) — state oil and gas company. TKV (Vinacomin — Tập đoàn Công nghiệp Than - Khoáng sản Việt Nam) — state coal mining company." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MOIT (Ministry of Industry and Trade): Implement PDP VIII renewable targets", "MONRE: Strengthen emission standards for coal plants", "JETP Secretariat: Accelerate disbursement of transition funding"], infra: "MOIT — energy and industrial policy. PDP VIII (Power Development Plan VIII, approved 2023) — sets renewable energy targets. JETP — Just Energy Transition Partnership ($15.5B pledged by IPG partners including US, EU, UK, Japan)." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support JETP implementation monitoring through international partner coordination", "Advocate through ASEAN for regional energy transition cooperation", "Push for JETP transparency and accountability mechanisms", "Support World Bank and ADB renewable energy financing for Viet Nam"], infra: "Quốc hội (National Assembly) — unicameral, 500 members. Viet Nam is a one-party state (Communist Party). JETP International Partners Group provides the primary leverage mechanism. International channels: ASEAN, World Bank, ADB, JETP IPG." }
  ]}] },
  { code: "XK", name: "Kosovo", region: "Europe", summary: "Small Western Balkan economy ($11.2B GDP). Manufacturing at 12.6%. Coal rents 0.38%. Mining 0.55%. Agriculture at 7.3%. Youngest population in Europe. EU candidate status pending. Two aging lignite plants (Kosovo A and B) supply ~95% of electricity.", sectors: [{ name: "Coal", beta: 6.1, pst: [true, true, true], mostBreakable: 0, whyBreakable: "Kosovo's near-total dependence on two aging lignite plants (Kosovo A — one of Europe's worst polluters — and Kosovo B) faces EU accession conditionality and enormous health costs.", breakPaths: ["EU accession pathway requiring IED/LCPD compliance. Kosovo A is scheduled for decommissioning. When environmental compliance costs are applied, new renewables are cheaper than coal retrofit.", "Per-plant emissions and health cost data. Kosovo A and B cause severe air pollution in Pristina — among Europe's worst air quality. Makes W computable.", "Not breakable. Lignite combustion releases SO₂, PM2.5, mercury, and CO₂."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to AMMK (Agjencia për Mbrojtjen e Mjedisit të Kosovës — Kosovo Environmental Protection Agency)", "Document through INDEP or GAP Institute (Kosovo think tanks)", "Report through KEK compliance channels"], infra: "AMMK — environmental protection agency. INDEP (Institute for Development Policy) — research and advocacy. GAP Institute — Kosovo public policy think tank." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["KEK (Korporata Energjetike e Kosovës): Plan Kosovo A decommissioning and Kosovo B modernization or replacement", "Invest in solar and wind capacity", "Implement just transition plans for Obiliq/Kastriot mining communities"], infra: "KEK — Kosovo Energy Corporation, state-owned, operates Kosovo A (5 units, 800 MW, built 1962-1975) and Kosovo B (2 units, 678 MW, built 1983-1984). KOSTT — transmission system operator." },
    { level: "Regulator / Agency", role: "regulator", actions: ["ERO (Energy Regulatory Office): Reform tariffs to incentivize renewable investment", "MMPH (Ministry of Environment): Enforce emission standards", "Energy Community Secretariat: Hold Kosovo accountable for compliance"], infra: "ERO — energy regulator. MMPH (Ministria e Mjedisit, Planifikimit Hapësinor dhe Infrastrukturës) — environment ministry. Kosovo is an Energy Community Treaty member." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Deputet in the Kuvendi i Kosovës (120 members) to demand Kosovo A decommissioning timeline and renewable energy investment", "Support EU integration benchmarks on environmental standards", "Advocate through Energy Community for just transition support", "Push for World Bank and EBRD financing of renewable energy replacement"], infra: "Kuvendi i Kosovës (Assembly of Kosovo) — unicameral, 120 members. Contact through kuvendikosoves.org. Kosovo declared independence in 2008 (recognized by ~100 UN members). Energy Community Treaty member." }
  ]}] },
  { code: "ZA", name: "South Africa", region: "Sub-Saharan Africa", summary: "Largest sub-Saharan economy ($401.1B GDP). Coal rents 2.44% GDP. Mining 3.83% (gold, platinum group metals, chrome, manganese). Manufacturing at 12.8%. Services at 63%. Constitutional democracy. Severe electricity crisis (load shedding).", sectors: [{ name: "Coal", beta: 6.1, pst: [true, true, true], mostBreakable: 0, whyBreakable: "South Africa generates ~80% of electricity from coal (Eskom's aging fleet). JETP funding ($8.5B pledged) and Eskom's operational crisis (load shedding) create dual pressure. When coal plant health costs are internalized, the overlapping interest breaks.", breakPaths: ["JETP implementation and Eskom restructuring. $8.5B pledged for coal-to-renewables transition. When renewable IPPs are cheaper and more reliable than aging coal plants, the overlapping interest in coal dependence breaks.", "Per-plant emissions, health costs, and reliability data. Eskom's coal fleet is extensively documented — multiple plants fail to meet South Africa's own emission standards (granted repeated postponements). Makes W computable.", "Not breakable. Coal combustion releases SO₂, PM2.5, mercury, and CO₂. South Africa's coal is high-ash content, exacerbating particulate emissions."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to DFFE (Department of Forestry, Fisheries and the Environment)", "Report through groundWork or Centre for Environmental Rights", "Document through Public Protector complaints"], infra: "DFFE — the environment department. groundWork — South African environmental justice organization. Centre for Environmental Rights — public interest environmental law organization. Life After Coal campaign — coalition challenging Eskom's coal dependence." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Eskom: Implement coal plant decommissioning schedule aligned with IRP 2019", "Mining companies (Exxaro, Thungela, Seriti): Develop coal transition plans", "Renewable IPPs: Scale deployment to replace coal capacity"], infra: "Eskom — state electricity utility, operates 15 coal-fired power stations. Exxaro Resources — coal mining. Thungela Resources — thermal coal (spun off from Anglo American). Seriti Resources — coal mining. REIPPPP (Renewable Energy Independent Power Producer Procurement Programme) — auction program." },
    { level: "Regulator / Agency", role: "regulator", actions: ["NERSA (National Energy Regulator): Reform tariffs to reflect coal externalities", "DFFE: Enforce Minimum Emission Standards without further postponements", "DMRE (Department of Mineral Resources and Energy): Accelerate IRP 2019 renewable targets"], infra: "NERSA — energy regulator. DMRE — mineral resources and energy department. IRP 2019 (Integrated Resource Plan) — South Africa's electricity plan. JETP Investment Plan — guides $8.5B transition funding." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Member of Parliament in the National Assembly (400 members) or NCOP (National Council of Provinces, 90 members) to demand Eskom emission standard compliance", "Support JETP implementation and accountability mechanisms", "Advocate through BRICS for just energy transition principles", "Push for climate finance delivery through Green Climate Fund"], infra: "Parliament of South Africa — bicameral: National Assembly (400 members) and National Council of Provinces (90 members). Contact through parliament.gov.za. South Africa is a constitutional democracy, G20 member, BRICS member. JETP International Partners Group: France, Germany, UK, US, EU." }
  ]}] },
  { code: "ZM", name: "Zambia", region: "Sub-Saharan Africa", summary: "Southern African economy ($25.3B GDP). Mining 28.25% GDP — one of the highest mining dependencies globally (copper). Forest rents 6.78%. Services at 57.2%. Africa's second-largest copper producer. Democratic governance with peaceful power transitions.", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Zambia's copper mining generates acid mine drainage and SO₂ from smelting (Mopani, KCM — historically among Africa's worst polluters). When per-mine environmental data is published, W becomes computable.", breakPaths: ["Mining royalty reform with environmental earmarking. When mining revenue is partly allocated to environmental remediation, the overlapping interest in externalizing pollution costs weakens.", "Per-mine environmental monitoring data through ZEITI and ZEMA. Makes W computable.", "Partially breakable. Copper smelting emissions can be reduced with modern sulfuric acid capture technology. Mopani smelter upgrade demonstrates this."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to ZEMA (Zambia Environmental Management Agency)", "Document through community organizations in Copperbelt Province", "Report through mining company compliance channels"], infra: "ZEMA — environmental management agency. Copperbelt communities have suffered decades of SO₂ and heavy metal pollution — documented by multiple studies and legal cases (e.g., Vedanta/KCM litigation in UK courts)." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["First Quantum Minerals (Kansanshi): Implement international environmental standards", "Barrick Gold (Lumwana): Adopt enhanced tailings management", "ZCCM-IH (state mining holding): Require environmental compliance from partners"], infra: "First Quantum Minerals — operates Kansanshi (one of Africa's largest copper mines) and Sentinel mines. Barrick Gold — operates Lumwana copper mine. Mopani Copper Mines — majority owned by ZCCM-IH after Glencore divestment. KCM (Konkola Copper Mines) — under provisional liquidation." },
    { level: "Regulator / Agency", role: "regulator", actions: ["ZEMA: Enforce emission standards for copper smelters", "Ministry of Mines: Strengthen environmental conditions in mining licenses", "ZEITI: Expand to include environmental data"], infra: "Ministry of Mines and Minerals Development. ZEITI (Zambia Extractive Industries Transparency Initiative) — EITI member. Mining Cadastre Department — licensing authority." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your Member of Parliament in the National Assembly (156 members) to demand environmental enforcement on the Copperbelt", "Support EITI enhanced reporting with environmental data", "Advocate through SADC for regional mining environmental standards", "Push for responsible mineral supply chain standards (copper is critical for energy transition)"], infra: "National Assembly of Zambia — unicameral, 156 elected members + 8 nominated. Contact through parliament.gov.zm. Zambia is a presidential republic with competitive elections (peaceful transitions in 1991, 2011, 2021). SADC (Southern African Development Community) member." }
  ]}] },
  { code: "ZW", name: "Zimbabwe", region: "Sub-Saharan Africa", summary: "Southern African economy ($41.5B GDP). Mining 4.24% GDP (platinum group metals, gold, lithium, diamonds). Agriculture at 8.7%. Manufacturing at 15.6%. Forest rents 1.82%. Governance concerns. Major lithium reserves (Bikita, Arcadia).", sectors: [{ name: "Mining", beta: 4.7, pst: [true, true, true], mostBreakable: 1, whyBreakable: "Zimbabwe's mining sector is expanding rapidly (lithium — critical for EV batteries — and PGMs). When per-mine environmental data is published alongside revenue, W becomes computable.", breakPaths: ["International supply chain due diligence for critical minerals (lithium for EU Battery Regulation compliance). When EU buyers require environmental verification, the overlapping interest in unregulated extraction weakens.", "Per-mine environmental monitoring through ZEITI (Zimbabwe applied for EITI candidacy). Makes W computable.", "Partially breakable. Lithium mining (hard-rock) generates waste rock and uses water. Best-practice processing and water recycling reduce system dependence."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to EMA (Environmental Management Agency)", "Document through ZELA (Zimbabwe Environmental Law Association)", "Report through international mining company compliance channels"], infra: "EMA — environmental management agency. ZELA — environmental law organization. Note: civil society space is constrained in Zimbabwe." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["Zimplats (Impala Platinum): Implement international environmental standards", "Prospect Lithium (Bikita Minerals): Adopt responsible lithium mining practices", "Zim Integrated (Arcadia): Apply EU Battery Regulation-aligned environmental standards"], infra: "Zimplats — Zimbabwe's largest PGM producer (Impala Platinum subsidiary). Bikita Minerals — lithium mining (Sinomine Resources acquired). Arcadia Lithium — major lithium deposit (Zhejiang Huayou Cobalt acquired). Caledonia Mining — gold." },
    { level: "Regulator / Agency", role: "regulator", actions: ["Ministry of Mines: Enforce environmental conditions in mining licenses", "EMA: Strengthen environmental impact assessment for lithium projects", "ZMDC (Zimbabwe Mining Development Corporation): Require environmental compliance from joint venture partners"], infra: "Ministry of Mines and Mining Development. EMA — environmental regulation. ZMDC — state mining company. Zimbabwe's Mines and Minerals Act governs the sector." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Engage through available parliamentary channels — Parliament of Zimbabwe: National Assembly (270 members) and Senate (80 members); note limited political pluralism in practice", "Support EU Battery Regulation supply chain due diligence requirements for Zimbabwean lithium", "Advocate through SADC Mining Protocol for regional environmental standards", "Push for EITI membership to improve mining transparency"], infra: "Parliament of Zimbabwe — bicameral: National Assembly (270 members) and Senate (80 members). Note: ZANU-PF dominance limits effective legislative oversight. International channels: SADC, AU, EITI (Zimbabwe has expressed interest in joining)." }
  ]}] },
  { code: "CN", name: "China", region: "East Asia", summary: "World's second-largest economy ($18,743.8B GDP). Manufacturing at 24.9% GDP — global factory floor. Coal rents 0.61%. Industry at 36.5%. Services at 56.7%. One-party state (CPC). World's largest CO₂ emitter. Rapid renewable deployment alongside continued coal expansion.", sectors: [{ name: "Coal", beta: 6.1, pst: [true, true, true], mostBreakable: 0, whyBreakable: "China operates ~1,100 GW of coal capacity — more than the rest of the world combined. However, China also deploys more renewable energy annually than any other country. When renewable deployment makes new coal uneconomic, the overlapping interest in coal expansion breaks.", breakPaths: ["Renewable energy cost competitiveness — China's solar and wind are already cheaper than new coal in most provinces. When existing coal plants become more expensive to run than new renewables, the overlapping interest breaks. This is already happening in eastern provinces.", "Per-plant emissions data. China's national ETS (launched 2021) covers ~4.5 billion tonnes CO₂. Expanding coverage from electricity to industry sectors makes W computable.", "Not breakable. Coal combustion releases CO₂, SO₂, PM2.5, and mercury by chemistry."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to MEE (Ministry of Ecology and Environment, 生态环境部)", "Report through provincial environmental protection bureaus", "Document through 12369 environmental complaint hotline"], infra: "MEE (Ministry of Ecology and Environment) — central environmental authority. 12369 hotline — environmental complaint system receiving millions of reports annually. Provincial Environmental Protection Bureaus — local enforcement. IPE (Institute of Public & Environmental Affairs, 公众环境研究中心) — Ma Jun's NGO providing corporate environmental data." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["State energy companies (CHN Energy, Huaneng, Datang, Huadian, SPIC): Accelerate coal-to-renewables transition", "Reduce new coal plant approvals", "Invest in grid-scale storage to enable renewable integration"], infra: "China's 'Big Five' power generators: CHN Energy (国家能源集团), China Huaneng (华能), China Datang (大唐), China Huadian (华电), SPIC (国家电投). All state-owned, collectively operating most coal capacity. Also rapidly scaling renewables." },
    { level: "Regulator / Agency", role: "regulator", actions: ["NEA (National Energy Administration, 国家能源局): Limit new coal approvals to replace-and-retire", "MEE: Accelerate national ETS coverage expansion to cement, steel, aluminum", "NDRC: Align electricity market reform with carbon reduction targets"], infra: "NEA (National Energy Administration) — energy planning and regulation. NDRC (National Development and Reform Commission, 国家发展和改革委员会) — economic planning, sets electricity prices. National ETS — world's largest carbon market by coverage (power sector)." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Support US-China climate cooperation mechanisms (Sunnylands process)", "Advocate through COP process for China's coal phase-down commitments", "Push for national ETS carbon price to rise above marginal abatement cost", "Support technology cooperation on CCS and grid-scale storage"], infra: "National People's Congress (全国人民代表大会) — ~3,000 members. China is a one-party state — the NPC does not function as an independent legislature. International channels: US-China climate bilateral, COP/UNFCCC, G20. China's dual carbon targets: peak CO₂ before 2030, carbon neutrality by 2060." }
  ]}] },
  { code: "KR", name: "South Korea", region: "East Asia", summary: "Advanced economy ($1,875.4B GDP). Manufacturing at 26.6% GDP (semiconductors, automobiles, shipbuilding, petrochemicals). Services at 57.5%. Heavy energy import dependence. Fourth-largest coal importer globally. G20 member. Vibrant democracy.", sectors: [{ name: "Coal", beta: 6.1, pst: [true, true, true], mostBreakable: 0, whyBreakable: "South Korea operates ~37 GW of coal capacity and is the world's 4th-largest coal importer. The 10th Basic Plan for Electricity Supply and Demand targets coal phase-down. When carbon pricing (K-ETS) makes coal uncompetitive versus LNG and renewables, the overlapping interest breaks.", breakPaths: ["K-ETS (Korea Emissions Trading Scheme) carbon price escalation. When carbon costs make coal-fired generation more expensive than LNG and renewables, the overlapping interest in coal dependence breaks.", "Per-plant emissions and health cost data. Korea Environment Institute and Korean medical associations have documented coal plant health impacts. Makes W computable.", "Not breakable. Coal combustion releases SO₂, PM2.5, and CO₂."], actors: [
    { level: "Insider / Whistleblower", role: "insider", actions: ["Report to Ministry of Environment (환경부)", "Document through KFEM (Korean Federation for Environmental Movements, 환경운동연합)", "Report through KEPCO compliance channels"], infra: "Ministry of Environment (환경부) — environmental authority. KFEM (환경운동연합) — South Korea's largest environmental NGO. Solutions for Our Climate (기후솔루션) — climate policy advocacy organization." },
    { level: "Investor / Capital Allocator", role: "investor", actions: ["KEPCO (Korea Electric Power Corporation, 한국전력공사): Implement coal retirement schedule aligned with NDC", "POSCO: Scale hydrogen-based steelmaking (HyREX)", "Samsung, SK, Hyundai: Expand renewable electricity procurement (RE100 commitments)"], infra: "KEPCO — state electricity company (subsidiary gencos operate coal plants). POSCO — steelmaker, major coal consumer. Samsung, SK Group, Hyundai — major conglomerates with growing RE100 commitments." },
    { level: "Regulator / Agency", role: "regulator", actions: ["MOTIE (Ministry of Trade, Industry and Energy, 산업통상자원부): Accelerate coal retirement in Basic Electricity Plan", "Ministry of Environment: Strengthen K-ETS carbon price floor", "KPX (Korea Power Exchange): Reform merit order to disadvantage coal"], infra: "MOTIE — energy and industry ministry. K-ETS — Korea Emissions Trading Scheme (launched 2015, covers ~70% of national emissions). KPX (한국전력거래소) — electricity market operator." },
    { level: "Supranational Body / Treaty", role: "supranational", actions: ["Contact your 국회의원 (Member of the National Assembly, 300 members) to demand coal phase-out timeline in energy legislation", "Support Powering Past Coal Alliance membership", "Advocate through OECD for coal finance phase-out", "Push for G20 commitment to end international coal financing (South Korea pledged to end overseas coal finance in 2021)"], infra: "국회 (National Assembly) — unicameral, 300 members. Contact through assembly.go.kr. South Korea is a presidential republic with competitive elections. G20 member, OECD member, Powering Past Coal Alliance member (joined 2021)." }
  ]}] },
];

// Axiom labels for display
export const AXIOMS = [
  { name: "Overlapping Interests", short: "Axiom 1", desc: "Both parties benefit from cooperating. There is a deal to be made." },
  { name: "System Independence", short: "Axiom 2", desc: "System welfare W cannot be computed from party payoffs." },
  { name: "System Dependence", short: "Axiom 3", desc: "Agent activity affects the shared system." },
];

// Actor level labels — Six-Agent Conflictoring Protocol (Postnieks 2026)
// Each agent breaks the Private-Systemic Tension equilibrium through a distinct mechanism
export const ACTORS = [
  { key: "insider",       label: "INSIDER / WHISTLEBLOWER",      icon: "1", desc: "You are inside the system. You break Axiom 2 from within." },
  { key: "plaintiff",     label: "PLAINTIFF / LITIGANT",         icon: "2", desc: "You break Axiom 2 via discovery. You weaken Axiom 1 via liability." },
  { key: "regulator",     label: "REGULATOR / AGENCY",           icon: "3", desc: "You break Axiom 2 via disclosure mandates." },
  { key: "legislator",    label: "LEGISLATOR / POLICY MAKER",    icon: "4", desc: "You break Axiom 1 (ban/cap) or Axiom 2 at statutory level." },
  { key: "investor",      label: "INVESTOR / CAPITAL ALLOCATOR", icon: "5", desc: "You break Axiom 1 via βW stranded-asset repricing." },
  { key: "supranational", label: "SUPRANATIONAL BODY / TREATY",  icon: "6", desc: "You enable cross-jurisdictional Coasian and Pigouvian correction." },
];
