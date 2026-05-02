"use client";

const M = "'JetBrains Mono', monospace";
const S = "'Newsreader', Georgia, serif";
const BG = "#0D0D0D";
const SURFACE = "#1A1A1A";
const TEXT = "#F5F0E8";
const MUTED = "#C8C8C8";
const GOLD = "#F59E0B";
const RED = "#EF4444";
const GREEN = "#22C55E";
const CYAN = "#22D3EE";
const BORDER = "rgba(255,255,255,0.1)";

const SYSTEM_ROWS = [
  ["Benchmark / institution", "Was the market rule or public reference price preserved?", "Missing from A,B"],
  ["Unrepresented parties", "Who paid costs without being at the table?", "Missing from A,B"],
  ["Future state", "Did the deal consume resilience, trust, liquidity, health, or ecological capacity?", "Missing from A,B"],
  ["Rule-change need", "What rule R would transform game G into G prime?", "Outside same game"],
];

export default function SystemWelfareExhibit({
  eyebrow = "Exhibit: Private Pareto Theorem",
  title = "The missing record is not a third payoff. It is the system account.",
  example = "FX fixing",
}) {
  return (
    <section style={{
      margin: "36px 0 48px",
      padding: 24,
      background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01)), #10151D",
      border: `1px solid ${BORDER}`,
      borderTop: `3px solid ${GOLD}`,
      borderRadius: 6,
      boxShadow: "0 18px 60px rgba(0,0,0,0.28)",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(320px, 1.1fr)", gap: 22, alignItems: "stretch" }}>
        <div style={{ display: "grid", alignContent: "space-between", gap: 18 }}>
          <div>
            <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
              {eyebrow}
            </div>
            <h2 style={{ fontFamily: S, fontSize: 31, lineHeight: 1.15, color: TEXT, fontWeight: 300, margin: "0 0 12px" }}>
              {title}
            </h2>
            <p style={{ fontFamily: S, fontSize: 17, lineHeight: 1.68, color: MUTED, margin: 0 }}>
              A bilateral ledger can prove that both parties gained. It cannot prove that the benchmark, market, commons, institution, or legal regime survived. PPT Theorem 1 is the warning label on that missing account.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
            <Metric value="A > 0" label="Party A payoff" color={GREEN} />
            <Metric value="B > 0" label="Party B payoff" color={GREEN} />
            <Metric value="W ?" label="System welfare" color={RED} />
          </div>

          <div style={{ padding: 16, background: BG, border: `1px solid ${BORDER}`, borderRadius: 6 }}>
            <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
              Reconciliation rule
            </div>
            <div style={{ fontFamily: S, fontSize: 23, color: TEXT, lineHeight: 1.35 }}>
              Private gain + private gain does not equal system preservation.
            </div>
          </div>
        </div>

        <div style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${BORDER}` }}>
            <LedgerHeader title="What standard analysis records" color={GREEN} />
            <LedgerHeader title="What Field 16 must record" color={RED} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ padding: 16, borderRight: `1px solid ${BORDER}` }}>
              <LedgerLine label="A payoff" value="positive" color={GREEN} />
              <LedgerLine label="B payoff" value="positive" color={GREEN} />
              <LedgerLine label="Local verdict" value="mutual gain" color={GOLD} />
              <div style={{ marginTop: 18, padding: 14, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 4 }}>
                <div style={{ fontFamily: M, fontSize: 11, color: GREEN, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
                  Example: {example}
                </div>
                <div style={{ fontFamily: S, fontSize: 15, lineHeight: 1.55, color: TEXT }}>
                  The private transaction can look profitable and contract-compliant inside the parties' own books.
                </div>
              </div>
            </div>

            <div style={{ padding: 16 }}>
              {SYSTEM_ROWS.map(([label, question, status]) => (
                <div key={label} style={{ padding: "0 0 12px", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline", marginBottom: 5 }}>
                    <div style={{ fontFamily: M, fontSize: 12, color: TEXT }}>{label}</div>
                    <div style={{ fontFamily: M, fontSize: 11, color: RED, textAlign: "right", whiteSpace: "nowrap" }}>{status}</div>
                  </div>
                  <div style={{ fontFamily: S, fontSize: 14, color: MUTED, lineHeight: 1.45 }}>{question}</div>
                </div>
              ))}
              <div style={{ padding: 14, background: "rgba(239,68,68,0.09)", border: "1px solid rgba(239,68,68,0.32)", borderRadius: 4 }}>
                <div style={{ fontFamily: M, fontSize: 11, color: RED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
                  Theorem verdict
                </div>
                <div style={{ fontFamily: S, fontSize: 15, lineHeight: 1.55, color: TEXT }}>
                  Local/private bilateral success does not certify system welfare.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 14,
        padding: "12px 14px",
        background: "rgba(45,212,191,0.08)",
        border: "1px solid rgba(45,212,191,0.24)",
        borderRadius: 6,
        fontFamily: S,
        fontSize: 15,
        lineHeight: 1.55,
        color: TEXT,
      }}>
        Disclosure alone may leave the same equilibrium in place. The repair is a rule change R that transforms game G into G prime.
      </div>

      <style jsx>{`
        @media (max-width: 920px) {
          section > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 620px) {
          section {
            padding: 16px !important;
          }

          section div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function Metric({ value, label, color }) {
  return (
    <div style={{ padding: "14px 12px", background: SURFACE, border: `1px solid ${BORDER}`, borderTop: `3px solid ${color}`, borderRadius: 6 }}>
      <div style={{ fontFamily: M, fontSize: 26, color, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: 1.2, textTransform: "uppercase", marginTop: 8 }}>{label}</div>
    </div>
  );
}

function LedgerHeader({ title, color }) {
  return (
    <div style={{ padding: "13px 16px", background: `${color}12`, borderTop: `3px solid ${color}` }}>
      <div style={{ fontFamily: M, fontSize: 11, color, letterSpacing: 2, textTransform: "uppercase" }}>{title}</div>
    </div>
  );
}

function LedgerLine({ label, value, color }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 10, alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ fontFamily: M, fontSize: 12, color: TEXT }}>{label}</div>
      <div style={{ fontFamily: M, fontSize: 12, color, textAlign: "right" }}>{value}</div>
    </div>
  );
}
