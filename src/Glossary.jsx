"use client";
import { useId, useState } from "react";

const TERMS = {
  "βW": "Welfare Beta — for every $1 of revenue, how many dollars of system welfare are destroyed. βW > 1 means net destruction.",
  "Hollow Win": "Both parties gain while the system they depend on collapses. The deal looks good on paper. The foundation is crumbling underneath.",
  "Private-Systemic Tension": "Private Systemic Tension — three conditions (overlapping interests, system independence, system dependence) under which the Private Pareto Theorem guarantees system degradation.",
  "T*": "Crossover time — how long until system damage reaches your balance sheet. VW's T* was ~6 years. Tobacco's was ~45.",
  "Π": "Annual industry revenue — the denominator in the welfare beta calculation. Always revenue, never profit.",
  "ΔW": "Annual welfare cost — the total system welfare destroyed per year by the domain. ΔW = Π × βW.",
  "Conflictoring": "Six-agent protocol where Whistleblower, Plaintiff, Regulator, Legislator, Investor, and Supranational agents simultaneously impose costs, making the destructive game more expensive than reform.",
  "Impossibility Theorem": "A domain where no policy or rule-change path escapes the binding floor. The floor can be physical, chemical, biological, informational, or otherwise non-overridable. WMD is informational: capability knowledge cannot be unlearned.",
  "Intractability Theorem": "A domain where rule change can transform the game and create a policy way out, even if the current game contains an impossibility or floor theorem.",
};

export function Tip({ term, children }) {
  const [show, setShow] = useState(false);
  const tooltipId = useId();
  const def = TERMS[term];
  if (!def) return children || term;

  return (
    <span
      style={{ position: "relative", display: "inline" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button
        type="button"
        aria-expanded={show}
        aria-describedby={show ? tooltipId : undefined}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onClick={() => setShow((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setShow(false);
          }
        }}
        style={{
          border: "none",
          padding: 0,
          margin: 0,
          background: "transparent",
          color: "inherit",
          font: "inherit",
          lineHeight: "inherit",
          borderBottom: "1px dotted rgba(245,158,11,0.5)",
          cursor: "help",
        }}
      >
        {children || term}
      </button>
      {show && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{
            position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
            width: 280, padding: "10px 14px", background: "#1a1a1a", border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
            color: "rgba(255,255,255,0.75)", lineHeight: 1.6, zIndex: 100,
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
          }}
        >
          <span style={{ fontWeight: 700, color: "#F59E0B", display: "block", marginBottom: 4 }}>{term}</span>
          {def}
        </span>
      )}
    </span>
  );
}

export default Tip;
