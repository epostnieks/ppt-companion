import { useTranslation } from "react-i18next";

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const BG = "#0D0D0D";
const SURFACE = "#1A1A1A";
const TEXT = "#F5F0E8";
const GOLD = "#F59E0B";
const MUTED = "rgba(255,255,255,0.35)";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "rgba(255,255,255,0.55)";

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 2,
        marginBottom: 14, paddingBottom: 6,
        borderBottom: `1px solid ${BORDER}`,
      }}>
        {label}
      </div>
      <div style={{ fontFamily: S, fontSize: 19, color: DIM, lineHeight: 1.85 }}>
        {children}
      </div>
    </div>
  );
}

function Highlight({ children }) {
  return <span style={{ color: TEXT }}>{children}</span>;
}

export default function AboutAuthor() {
  const { t } = useTranslation();

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S, padding: "32px 24px 80px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 8 }}>
            ABOUT THE AUTHOR
          </div>
          <h1 style={{ fontFamily: S, fontSize: 32, fontWeight: 300, color: TEXT, margin: 0, lineHeight: 1.3 }}>
            Erik Postnieks
          </h1>
          <div style={{ fontFamily: S, fontSize: 20, color: DIM, marginTop: 8, fontStyle: "italic" }}>
            Economist &middot; Quantitative Fund Manager &middot; SAPM Program Author
          </div>
        </div>

        {/* EDUCATION */}
        <Section label="EDUCATION">
          <p style={{ margin: "0 0 14px" }}>
            Erik Postnieks holds a <Highlight>B.A. in Economics from Cornell University</Highlight> (1988)
            and an <Highlight>M.B.A. from the Amos Tuck School of Business at Dartmouth College</Highlight> (1993).
          </p>
          <p style={{ margin: "0 0 14px" }}>
            At Cornell, he studied under <Highlight>Richard Thaler</Highlight> and
            co-authored <Highlight>&ldquo;The Smart Crash of October 19th&rdquo;</Highlight> (<em>Harvard
            Business Review</em>, May&ndash;June 1988) with Avner Arbel and Steven Carvell.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            At Tuck, he conducted an independent study on cognitive biases and institutional
            decision-making under Professors <Highlight>Robert Hansen</Highlight> and <Highlight>Vic
            McGee</Highlight>, applying the frameworks of Thaler, Kahneman, and Tversky to financial services.
          </p>
          <p style={{ margin: 0 }}>
            In the early 2000s, he participated in three <Highlight>Harvard Kennedy School behavioral
            finance programs</Highlight> organized by Richard Zeckhauser, studying
            under Zeckhauser, <Highlight>Daniel Kahneman</Highlight>, Terrance Odean, and other
            leading researchers in behavioral economics and finance.
          </p>
        </Section>

        {/* BANKERS TRUST */}
        <Section label="BANKERS TRUST — 1993&ndash;1997">
          <p style={{ margin: "0 0 14px" }}>
            From 1993 to 1997, Postnieks worked at <Highlight>Bankers Trust</Highlight> as
            an Associate and Vice President in the Private Bank Derivatives Group.
          </p>
        </Section>

        {/* PARAMETRIC CAPITAL MANAGEMENT */}
        <Section label="PARAMETRIC CAPITAL MANAGEMENT — 1996&ndash;2003">
          <p style={{ margin: "0 0 14px" }}>
            In 1996, while BT was still dying, he founded <Highlight>Parametric Capital
            Management (PCM)</Highlight>, a multi-asset-class quantitative hedge fund.
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
                <div style={{ fontFamily: M, fontSize: 22, fontWeight: 600, color: GOLD }}>
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
            PCM exploited asynchronous pricing across equity, credit, commodity, and currency
            markets through a systematic multi-asset-class trading strategy, barely registering
            the crash of 2000. Audited by KPMG. Approximately two-thirds the volatility of the
            S&P 500.
          </p>
        </Section>

        {/* WOOSTER ASSET MANAGEMENT */}
        <Section label="WOOSTER ASSET MANAGEMENT — 2004&ndash;2009">
          <p style={{ margin: 0 }}>
            In 2004, Postnieks founded <Highlight>Wooster Asset Management (WAM)</Highlight> and
            pursued a G-10 foreign-exchange carry strategy using a proprietary seismograph-inspired
            risk management system. WAM produced an <Highlight>average annual alpha of 8%</Highlight> on
            peak assets of <Highlight>$125 million</Highlight> from 2005 to 2009.
          </p>
        </Section>

        {/* TECHNOLOGY INVESTING */}
        <Section label="TECHNOLOGY INVESTING — 2011&ndash;2023">
          <p style={{ margin: 0 }}>
            From 2011 to 2023, Postnieks focused on technology investing. His most successful
            investment was as the <Highlight>founding investor (and only outside investor)</Highlight> in
            a telecommunications company that holds a <Highlight>nineteen-patent portfolio</Highlight> with
            a 2009 priority date. These patents solved the identity fragmentation problem: the ability
            to maintain a single communications identity across all devices, with carrier-based
            infrastructure synchronizing calls, text messages, emails, and video across smartphones,
            tablets, computers, and watches, even when the primary device is powered off. The patent
            portfolio has been <Highlight>independently valued at nine figures</Highlight> and is
            currently being monetized.
          </p>
        </Section>

        {/* THE SAPM PROGRAM */}
        <Section label="THE SAPM PROGRAM — 2025&ndash;2026">
          <p style={{ margin: "0 0 14px" }}>
            In 2025, Postnieks began the <Highlight>System Asset Pricing Model (SAPM)</Highlight> program,
            applying three decades of quantitative finance methodology to welfare economics. The result
            is the largest single-author research program in the field: <Highlight>73 working papers</Highlight>,
            {" "}<Highlight>62 original theorems</Highlight>, and over <Highlight>3 million words</Highlight> of
            formal economic analysis.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            The foundational result is the <Highlight>Private Pareto Theorem (PPT)</Highlight> &mdash;
            the 18th impossibility theorem in economics &mdash; which proves that bilateral efficiency
            and system welfare preservation are structurally incompatible under three minimal axioms.
            The program calibrates a new measurement, <Highlight>&beta;<sub>W</sub></Highlight> (the welfare
            beta), across 61 domains via Monte Carlo simulation, identifying <Highlight>$86.3 trillion</Highlight> in
            annual welfare destruction &mdash; approximately 83% of global GDP.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            The 61 domain theorems are classified into <Highlight>22 Impossibility Theorems</Highlight> (physical,
            chemical, or biological constraints no policy can override) and <Highlight>39 Intractability
            Theorems</Highlight> (institutional constraints with proven policy solutions). Five cross-domain
            framework papers complete the architecture: the Reform Dividend, the Conflictoring Protocol,
            the Fiscal Capture Theorem, the Substitution Trap Law, and the Disclosure Futility Theorem.
          </p>
          <p style={{ margin: 0 }}>
            All Monte Carlo simulations are publicly available in <Highlight>61 open-source
            repositories</Highlight> (seed = 42, N = 10,000 draws, three distribution types).
            The companion website provides interactive dashboards, policy analysis for 190 countries
            in 22 languages, and a falsification bounty for each theorem.
          </p>
        </Section>

        {/* FOOTER */}
        <div style={{
          marginTop: 40, paddingTop: 20,
          borderTop: `1px solid ${BORDER}`,
          fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1,
        }}>
          &copy; 2026 Erik Postnieks
        </div>
      </div>
    </div>
  );
}
