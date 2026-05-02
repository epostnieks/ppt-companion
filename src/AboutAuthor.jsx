"use client";
import { useTranslation } from "react-i18next";

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const BG = "#0D0D0D";
const SURFACE = "#1A1A1A";
const TEXT = "#F5F0E8";
const GOLD = "#F59E0B";
const MUTED = "#C8C8C8";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "#C8C8C8";

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{
        fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 1.6,
        marginBottom: 16, paddingBottom: 7,
        borderBottom: `1px solid ${BORDER}`,
      }}>
        {label}
      </div>
      <div style={{ fontFamily: S, fontSize: 21, color: DIM, lineHeight: 1.85 }}>
        {children}
      </div>
    </div>
  );
}

export default function AboutAuthor() {
  const { t } = useTranslation();

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S, padding: "42px 28px 88px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* HEADER WITH PHOTO */}
        <div style={{ marginBottom: 48, display: "flex", gap: 36, alignItems: "flex-start", flexWrap: "wrap" }}>
          <img
            src="/erik-headshot.jpg"
            alt="Erik Postnieks"
            style={{
              width: 184, height: 230, borderRadius: 6,
              objectFit: "cover", objectPosition: "center top",
              border: `2px solid ${BORDER}`,
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 2.4, marginBottom: 10 }}>
              ABOUT THE AUTHOR
            </div>
            <h1 style={{ fontFamily: S, fontSize: 44, fontWeight: 300, color: TEXT, margin: 0, lineHeight: 1.18 }}>
              Erik Postnieks
            </h1>
            <div style={{ fontFamily: S, fontSize: 24, color: DIM, marginTop: 12, fontStyle: "italic", lineHeight: 1.45 }}>
              Economist &middot; Author &middot; Former Quantitative Fund Manager &middot; High-Tech and Angel Investor
            </div>
          </div>
        </div>

        {/* EDUCATION */}
        <Section label="EDUCATION">
          <p style={{ margin: "0 0 14px" }}>
            B.A. in Economics, Cornell University, 1988. M.B.A., Amos Tuck School of Business at Dartmouth College, 1993.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            At Cornell, studied under Richard Thaler. Co-authored &ldquo;The Smart Crash of October 19th&rdquo; (<em>Harvard Business Review</em>, May&ndash;June 1988) with Avner Arbel and Steven Carvell.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            At Tuck, conducted an independent study on cognitive biases and institutional decision-making under Professors Robert Hansen and Vic McGee, applying the frameworks of Thaler, Kahneman, and Tversky to financial services.
          </p>
          <p style={{ margin: 0 }}>
            In the early 2000s, participated in three Harvard Kennedy School behavioral finance programs organized by Richard Zeckhauser, studying under Zeckhauser, Daniel Kahneman, Terrance Odean, and other leading researchers in behavioral economics and finance.
          </p>
        </Section>

        {/* BANKERS TRUST */}
        <Section label="BANKERS TRUST — 1993&ndash;1997">
          <p style={{ margin: 0 }}>
            Associate and Vice President in the Private Bank Derivatives Group at Bankers Trust, 1993 to 1997.
          </p>
        </Section>

        {/* PARAMETRIC CAPITAL MANAGEMENT */}
        <Section label="PARAMETRIC CAPITAL MANAGEMENT — 1996&ndash;2003">
          <p style={{ margin: "0 0 14px" }}>
            Founded Parametric Capital Management in 1996 while Bankers Trust was still dying. Multi-asset-class quantitative hedge fund.
          </p>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12, marginBottom: 20,
          }}>
            {[
              { label: "ANNUAL RETURN", value: "26.8%", sub: "compound, 6.5 yrs" },
              { label: "CUMULATIVE", value: "369.2%", sub: "1997–2003" },
              { label: "SHARPE RATIO", value: "1.7", sub: "risk-adjusted return" },
              { label: "PEAK AUM", value: "$440M", sub: "multi-asset" },
            ].map((stat, i) => (
              <div key={i} style={{
                padding: "14px 16px", background: SURFACE,
                border: `1px solid ${BORDER}`, borderRadius: 4, textAlign: "center",
              }}>
                <div style={{ fontFamily: M, fontSize: 22, color: GOLD }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginTop: 4 }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: M, fontSize: 12, color: DIM, marginTop: 2 }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
          <p style={{ margin: 0 }}>
            Exploited asynchronous pricing across equity, credit, commodity, and currency markets. Barely registered the crash of 2000. Audited by KPMG. Approximately two-thirds the volatility of the S&P 500.
          </p>
        </Section>

        {/* WOOSTER ASSET MANAGEMENT */}
        <Section label="WOOSTER ASSET MANAGEMENT — 2004&ndash;2009">
          <p style={{ margin: 0 }}>
            Founded Wooster Asset Management in 2004. G-10 foreign-exchange carry strategy using a proprietary seismograph-inspired risk management system. Average annual alpha of 8% on peak assets of $125 million, 2005 to 2009.
          </p>
        </Section>

        {/* TECHNOLOGY INVESTING */}
        <Section label="TECHNOLOGY INVESTING — 2011&ndash;2023">
          <p style={{ margin: 0 }}>
            From 2011 to 2023, focused on technology investing. Founding investor (and only outside investor) in a telecommunications company that holds a nineteen-patent portfolio with a 2009 priority date. These patents solved the identity fragmentation problem: maintaining a single communications identity across all devices, with carrier-based infrastructure synchronizing calls, text messages, emails, and video across smartphones, tablets, computers, and watches, even when the primary device is powered off. The patent portfolio has been independently valued at nine figures and is currently being monetized.
          </p>
        </Section>

        {/* THE SAPM PROGRAM */}
        <Section label="THE SYSTEM ASSET PRICING MODEL PROGRAM">
          <p style={{ margin: "0 0 14px" }}>
            Began the System Asset Pricing Model program to apply three decades of quantitative finance methodology to welfare economics. The public Wave 1 program contains seventy-one working-paper drafts and approximately three million words of formal analysis, released as a coherent corpus for the reasons set out on the theorems page.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            The foundational result is the Private Pareto Theorem, which addresses a question the earlier impossibility theorems did not pose in this form: bilateral Pareto efficiency versus system welfare preservation. Under three specified axioms &mdash; overlapping interests, system independence, and system dependence &mdash; the theorem proves the two are incompatible. Whether it belongs alongside Arrow (1951), Sen (1970), and Myerson&ndash;Satterthwaite (1983) is for the profession to decide.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            The program calibrates a welfare-beta (&beta;<sub>W</sub>) for fifty-nine market-failure domains via Monte Carlo simulation under three distributional families. The aggregate across the market-failure domains, summed with uniform channel weights and no adjustment for cross-domain dependencies, is approximately $89.2 trillion per year &mdash; of the same order as nominal global GDP. This is a working aggregate; confidence intervals are wide and the sum is sensitive to channel methodology, which is why each domain paper reports its own interval independently.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            The fifty-nine market-failure domain theorems divide between Impossibility Theorems (no policy or rule-change path escapes the binding physical, chemical, biological, informational, or equivalent floor) and Intractability Theorems (a policy or rule-change path can transform the game). Four core theory papers now anchor the program: the Private Pareto Trap, Disclosure Futility, Game-Change / Institutional Transformation, and Accountability Reconstruction. The Reform Dividend, Conflictoring Protocol, Fiscal Capture, Substitution Trap, and Postnieks's Law translate the theorem layer into reform arithmetic and institutional design.
          </p>
          <p style={{ margin: 0 }}>
            Monte Carlo simulations are publicly available in open-source repositories (seed = 42, N = 10,000 draws, three distribution types). The companion website provides interactive dashboards, policy analysis for 190 countries in 22 languages, and a falsification bounty for each theorem.
          </p>
        </Section>

        {/* INTELLECTUAL LINEAGE */}
        <Section label="INTELLECTUAL LINEAGE">
          <p style={{ margin: "0 0 14px" }}>
            The System Asset Pricing Model program draws on three intellectual traditions. The impossibility theorem tradition (Arrow 1951, Sen 1970, Hurwicz 1972, Gibbard 1973, Myerson-Satterthwaite 1983) proves that certain desirable properties cannot coexist. The Private Pareto Theorem extends this by proving that bilateral Pareto efficiency and system welfare preservation are structurally incompatible.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            The asset pricing tradition (Sharpe 1964, Lintner 1965, Fama-French 1993) provides the measurement architecture. The System Asset Pricing Model applies the same beta-decomposition logic that the Capital Asset Pricing Model uses for market risk to welfare destruction: &beta;<sub>W</sub> = &minus;dW/d&Pi;, calibrated via Monte Carlo across the market-failure panel.
          </p>
          <p style={{ margin: 0 }}>
            The behavioral economics tradition (Kahneman-Tversky 1979, Thaler 1980, Bernheim-Rangel 2004, Gul-Pesendorfer 2001) explains why disclosure and nudges fail to resolve Hollow Wins. Postnieks studied under Thaler at Cornell and Kahneman at Harvard Kennedy School. The Decision Accounting paper's resolution of Prat's (2005) conformism problem through multi-audience common agency synthesizes all three traditions.
          </p>
        </Section>

        {/* PUBLICATION LIST */}
        <Section label="PUBLICATIONS — PUBLIC WAVE 1 WORKING PAPERS">
          <p style={{ margin: "0 0 14px", fontFamily: M, fontSize: 14, color: DIM }}>
            All public Wave 1 papers are forthcoming on SSRN. Monte Carlo replication repositories publicly accessible.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { cat: "FOUNDATIONAL", papers: [
                { title: "The Private Pareto Theorem: Bilateral Efficiency and System Welfare Cannot Coexist", ssrn: "https://ssrn.com/abstract=_PPT" },
              ]},
              { cat: "FRAMEWORK (9 PAPERS)", papers: [
                { title: "Decision Accounting: Principles and Practice", ssrn: "https://ssrn.com/abstract=_DA" },
                { title: "The Conflictoring Protocol: Private Pareto Theorem to non-Private Pareto Theorem Game Transformation", ssrn: "https://ssrn.com/abstract=_CP" },
                { title: "The Reform Dividend: $89.2 Trillion in Annual Welfare Destruction", ssrn: "https://ssrn.com/abstract=_RD" },
                { title: "Fiscal Capture: When Governments Are Party B", ssrn: "https://ssrn.com/abstract=_FC" },
                { title: "The Substitution Trap: Why Product Regulation Fails", ssrn: "https://ssrn.com/abstract=_ST" },
                { title: "Disclosure Futility: Three Formal Results", ssrn: "https://ssrn.com/abstract=_DF" },
                { title: "Accountability Reconstruction: Decision Records in Personal-Liability Regimes", ssrn: "https://ssrn.com/abstract=_AR" },
                { title: "Postnieks's Law: k* \u2264 6 for Every Private-Systemic Tension Domain", ssrn: "https://ssrn.com/abstract=_PL" },
                { title: "The Hollow Win Theorem", ssrn: "https://ssrn.com/abstract=_HW" },
              ]},
              { cat: "IMPOSSIBILITY THEOREMS", papers: [
                "Forever Chemicals / Molecular Persistence Floor", "Antimicrobial Resistance / Resistance Ratchet",
                "Monoculture / Genetic Uniformity Vulnerability", "Deep-Sea Mining / Manganese Nodule Irreversibility",
                "Cement / Calcination Irreversibility", "Weapons of Mass Destruction / Capability Diffusion Ceiling", "Gene Drives / Ecological Irreversibility",
                "Topsoil Erosion / Pedogenesis Rate Floor", "Groundwater / Ogallala Overdraft Irreversibility",
                "Industrial Agriculture Methane / Enteric Fermentation Floor", "Fast Fashion / Fiber Degradation Cascade",
                "Mining and Rare Earth / Tailings Permanence", "Oil and Gas / Combustion CO2 Irreversibility",
                "Coal / Thermal Efficiency Ceiling", "Aviation / Kerosene Energy Density Lock-in",
                "Deforestation / Old-Growth Irreversibility", "Palm Oil / Peatland Carbon Release",
                "Persistent Organic Pollutants / Bioaccumulation Ratchet", "Plastics / Microplastic Fragmentation Cascade",
                "Factory Farming / Zoonotic Spillover Threshold", "Social Media / Developmental Window Irreversibility",
              ].map(p => typeof p === "string" ? { title: p, ssrn: "https://ssrn.com/abstract=" } : p) },
              { cat: "INTRACTABILITY THEOREMS", papers: [
                "Firearms / Constitutional Ratchet", "Cybercrime / Attribution Impossibility",
                "Human Trafficking / Demand Indestructibility", "Child Labor / Poverty Threshold Theorem",
                "Opioid Ecosystem / Neurochemical Lock-in", "Conflict Minerals / Supply Chain Opacity",
                "Private Prisons / Demand Creation Paradox", "Credit Rating Agencies / Issuer-Pays Corruption",
                "Big Tech / Platform Entrenchment", "Commercial Real Estate / Stranded Asset Cascade",
                "Frontier AI / Capability Overhang", "Gambling / Variable-Ratio Reinforcement",
                "Illicit Drug Trade / Prohibition Potency Ratchet", "Payday Lending / Debt Trap Equilibrium",
                "Electronic Waste Export / Basel Convention Failure", "Tobacco / Nicotine Receptor Hijacking",
                "Student Loans / Securitization Moral Hazard", "Pharmacy Benefit Management / Rebate Opacity Theorem",
                "Platform Monopoly / Network Effect Lock-in", "Tax Havens / Jurisdictional Arbitrage",
                "Data Brokerage / Consent Impossibility", "Water Privatization / Natural Monopoly Extraction",
                "Algorithmic Pricing / Tacit Collusion Automation", "Private Equity Healthcare / Leverage Extraction",
                "Benchmark Rate Fixing / Benchmark Corruption", "Bitcoin / Proof-of-Work Energy Floor",
                "Defense Procurement / Cost-Plus Moral Hazard", "Fisheries / Tragedy of Open Access",
                "Sovereign Debt / Odious Debt Persistence", "Insurance-Climate / Retreat Spiral",
                "Ultra-Processed Food / Bliss Point Engineering", "Proof-of-Stake / Validator Concentration",
                "Arms Exports / End-User Certificate Failure", "Stablecoins / Shadow Banking Opacity",
                "Private Military / Accountability Vacuum", "Shipping / Flag-of-Convenience Arbitrage",
                "Alcohol / Excise Dependency Trap", "Orbital Debris / Kessler Cascade Threshold",
              ].map(p => typeof p === "string" ? { title: p, ssrn: "https://ssrn.com/abstract=" } : p) },
            ].map(group => (
              <div key={group.cat} style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>{group.cat}</div>
                {group.papers.map((p, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}>
                    <span style={{ fontFamily: S, fontSize: 16, color: DIM, lineHeight: 1.45 }}>{p.title}</span>
                    <span style={{ fontFamily: M, fontSize: 11, color: MUTED, flexShrink: 0, marginLeft: 12 }}>forthcoming</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>

        {/* HOW TO CITE */}
        <Section label="HOW TO CITE THIS WORK">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ padding: "14px 18px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
              <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>APA FORMAT</div>
              <div style={{ fontFamily: M, fontSize: 13, color: DIM, lineHeight: 1.7 }}>
                Postnieks, E. (2026). The Private Pareto Theorem: Bilateral efficiency and system welfare cannot coexist. <em>Working paper</em>. Forthcoming on SSRN.
              </div>
            </div>
            <div style={{ padding: "14px 18px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
              <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>BIBTEX</div>
              <pre style={{ fontFamily: M, fontSize: 12, color: DIM, lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>
{`@unpublished{postnieks2026ppt,
  author = {Postnieks, Erik},
  title = {The Private Pareto Theorem: Bilateral Efficiency
           and System Welfare Cannot Coexist},
  year = {2026},
  note = {Working paper}
}`}
              </pre>
            </div>
            <div style={{ padding: "14px 18px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
              <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>FULL PROGRAM CITATION</div>
              <div style={{ fontFamily: M, fontSize: 13, color: DIM, lineHeight: 1.7 }}>
                Postnieks, E. (2026). The System Asset Pricing Model program: 59 market-failure domains. Available at https://ppt-companion.vercel.app. Monte Carlo replications at https://github.com/epostnieks/sapm-mc-[slug].
              </div>
            </div>
          </div>
        </Section>

        {/* CONTACT */}
        <Section label="ACADEMIC CORRESPONDENCE">
          <p style={{ margin: 0 }}>
            For academic correspondence, collaboration inquiries, or peer review requests, contact through the GitHub repositories linked from each paper's Monte Carlo replication page. The replication repositories accept issues and pull requests.
          </p>
        </Section>

        <Section label="CURRENT WORK">
          <p style={{ margin: "0 0 14px" }}>
            Erik Postnieks is the founder of the Center for Decision Accounting.
          </p>
          <a
            href="https://decisionaccounting.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontFamily: M,
              fontSize: 12,
              color: GOLD,
              letterSpacing: 1,
              textDecoration: "none",
              padding: "12px 16px",
              border: `1px solid ${BORDER}`,
              borderRadius: 4,
              background: SURFACE,
            }}
          >
            CENTER FOR DECISION ACCOUNTING
          </a>
        </Section>

        {/* FOOTER */}
        <div style={{
          marginTop: 40, paddingTop: 20,
          borderTop: `1px solid ${BORDER}`,
          fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1,
        }}>
          &copy; 2026 Erik Postnieks &middot; Economist &middot; Author &middot; Salt Lake City
        </div>
      </div>
    </div>
  );
}
