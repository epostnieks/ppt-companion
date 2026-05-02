"use client";
import { useState } from "react";

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const BG = "#0A0A0F";
const SURFACE = "#111118";
const CARD = "#16161E";
const TEXT = "#F5F0E8";
const GOLD = "#F59E0B";
const MUTED = "#C8C8C8";
const BORDER = "rgba(255,255,255,0.08)";

// ── Severity colour ──────────────────────────────────────────────
const sev = (bw) => {
  if (bw > 35) return { bg: "rgba(220,38,38,0.12)", text: "#EF4444", label: "V EXTREME" };
  if (bw > 10) return { bg: "rgba(239,68,68,0.10)", text: "#F87171", label: "IV CRITICAL" };
  if (bw > 3)  return { bg: "rgba(245,158,11,0.10)", text: "#F59E0B", label: "III SEVERE" };
  if (bw > 1)  return { bg: "rgba(217,119,6,0.10)",  text: "#D97706", label: "II MODERATE" };
  return           { bg: "rgba(5,150,105,0.10)",  text: "#10B981", label: "I MILD" };
};

// ── Theorem-type colour ──────────────────────────────────────────
const typeCol = (t) =>
  t === "Impossibility" ? "#EF4444" :
  t === "Intractability" ? "#60A5FA" : "#A78BFA";

// ── Category badge colour ────────────────────────────────────────
const catCol = (c) => {
  if (!c) return "#888";
  const l = c.toLowerCase();
  if (l.includes("thermo") || l.includes("combustion")) return "#F97316";
  if (l.includes("bio") || l.includes("evol")) return "#22C55E";
  if (l.includes("geochem")) return "#A78BFA";
  if (l.includes("physical") || l.includes("physics")) return "#94A3B8";
  if (l.includes("hydro")) return "#38BDF8";
  if (l.includes("institutional") || l.includes("financial") || l.includes("legal")) return "#60A5FA";
  if (l.includes("jurisd")) return "#818CF8";
  if (l.includes("comput") || l.includes("develop")) return "#C084FC";
  if (l.includes("neuro")) return "#E879F9";
  if (l.includes("climate")) return "#34D399";
  if (l.includes("inform")) return "#FCD34D";
  if (l.includes("temporal")) return "#FB923C";
  return "#94A3B8";
};

// ═══════════════════════════════════════════════════════════════
// DATA PROVENANCE — CANONICAL βW TABLE
// Source: Notion Production Pipeline (collection://33ae2345-fce7-818e-b823-000b15f7ac47)
// Secondary: MC simulation repos (github.com/epostnieks/sapm-mc-{slug})
// βW basis: Revenue (Iron Law: Π = annual industry revenue, NEVER profit)
// MC parameters: N=10,000, seed=42, 3+ distribution types per domain
// Known Iron Law corrections: Alcohol, Cybercrime, Factory Farming, Ultra-Processed Food, Illicit Drugs, Monoculture
// Last synced: 2026-04-21. Public table contains 59 market-failure domains; nuclear and gig economy are controls/comparators.
// ═══════════════════════════════════════════════════════════════
const DOMAINS = [
  { rank:1,  slug:"firearms",          name:"Firearms",                   theorem:"Constitutional Ratchet",              type:"Intractability", cat:"Constitutional / Institutional", bw:50.99, ci:[40.50,62.50], pi:10.0,   dw:509.9   },
  { rank:2,  slug:"cybercrime",        name:"Cybercrime & Ransomware",    theorem:"Attribution Impossibility",           type:"Intractability", cat:"Computational / Jurisdictional",  bw:31.10, ci:[21.00,41.00], pi:200.0,  dw:6403.1  },
  { rank:3,  slug:"human-trafficking", name:"Human Trafficking",          theorem:"Demand Indestructibility",            type:"Intractability", cat:"Jurisdictional / Economic",       bw:22.62, ci:[17.80,27.50], pi:236.0,  dw:5338.1  },
  { rank:4,  slug:"wmd",               name:"Weapons of Mass Destruction",          theorem:"Capability Diffusion Ceiling",        type:"Impossibility",  cat:"Informational",                   bw:21.92, ci:[13.80,36.60], pi:86.4,   dw:1894.0  },
  { rank:5,  slug:"child-labor",       name:"Child Labor",                theorem:"Cost Arbitrage Floor",                type:"Intractability", cat:"Economic / Jurisdictional",       bw:21.83, ci:[18.80,24.80], pi:39.5,   dw:862.2   },
  { rank:6,  slug:"opioids",           name:"Opioid Ecosystem",           theorem:"Prescription Ratchet",                type:"Intractability", cat:"Neurochemical / Institutional",   bw:14.96, ci:[12.60,17.30], pi:75.0,   dw:1121.9  },
  { rank:7,  slug:"conflict-minerals", name:"Conflict Minerals",          theorem:"Fungibility Floor",                   type:"Intractability", cat:"Physical / Jurisdictional",       bw:12.60, ci:[9.20,16.00],  pi:20.3,   dw:255.7   },
  { rank:8,  slug:"private-prisons",   name:"Private Prisons",            theorem:"Occupancy Guarantee Trap",            type:"Intractability", cat:"Institutional",                   bw:12.08, ci:[8.80,15.40],  pi:8.0,    dw:96.7    },
  { rank:9,  slug:"credit-rating",     name:"Credit Rating Agencies",     theorem:"Issuer-Pays Corruption Floor",        type:"Intractability", cat:"Institutional / Informational",   bw:11.21, ci:[9.70,12.70],  pi:11.0,   dw:123.3   },
  { rank:10, slug:"mining-rare-earth", name:"Mining & Rare Earth",        theorem:"Ore Grade Depletion Floor",           type:"Impossibility",  cat:"Geochemical",                     bw:11.15, ci:[4.50,14.80],  pi:150.0,  dw:322.0   },
  { rank:11, slug:"big-tech",          name:"Big Tech Acquisitions",      theorem:"Kill Zone Ratchet",                   type:"Intractability", cat:"Institutional",                   bw:7.81,  ci:[6.00,9.60],   pi:128.0,  dw:999.6   },
  { rank:12, slug:"cre",               name:"Commercial Real Estate",     theorem:"Vacancy Doom Loop",                   type:"Intractability", cat:"Institutional / Financial",       bw:7.78,  ci:[6.50,9.10],   pi:13.0,   dw:101.1   },
  { rank:13, slug:"frontier-ai",       name:"Frontier AI",                theorem:"Alignment Ceiling",                   type:"Intractability", cat:"Computational / Institutional",   bw:7.51,  ci:[5.50,9.40],   pi:30.0,   dw:225.0   },
  { rank:14, slug:"industrial-ag",     name:"Industrial Agriculture",     theorem:"Caloric Emissions Floor",             type:"Impossibility",  cat:"Thermodynamic / Biological",      bw:7.36,  ci:[5.70,9.00],   pi:205.0,  dw:1510.0  },
  { rank:15, slug:"monoculture",       name:"Monoculture Agriculture",    theorem:"Genetic Uniformity Floor",            type:"Impossibility",  cat:"Biological / Evolutionary",       bw:7.36,  ci:[5.43,10.09],  pi:340.0,  dw:null    },
  { rank:16, slug:"gambling",          name:"Gambling & Casinos",         theorem:"Sovereign Operator Paradox",          type:"Intractability", cat:"Institutional / Neurochemical",   bw:7.30,  ci:[5.30,9.30],   pi:45.0,   dw:328.5   },
  { rank:17, slug:"deforestation",     name:"Deforestation & Logging",    theorem:"Canopy Regeneration Floor",           type:"Impossibility",  cat:"Biological / Temporal",           bw:7.21,  ci:[5.30,9.10],   pi:120.0,  dw:865.5   },
  { rank:18, slug:"illicit-drugs",     name:"Illicit Drug Trade",         theorem:"Prohibition Profit Floor",            type:"Intractability", cat:"Institutional / Economic",        bw:7.16,  ci:[5.72,8.58],   pi:500.0,  dw:3579.1  },
  { rank:19, slug:"payday-lending",    name:"Payday Lending",             theorem:"Poverty Ratchet",                     type:"Intractability", cat:"Financial / Institutional",       bw:7.08,  ci:[5.60,8.60],   pi:44.0,   dw:311.7   },
  { rank:20, slug:"fast-fashion",      name:"Fast Fashion",               theorem:"Throughput Floor",                    type:"Impossibility",  cat:"Thermodynamic / Temporal",        bw:7.01,  ci:[5.10,8.90],   pi:55.0,   dw:385.4   },
  { rank:21, slug:"coal",              name:"Coal",                       theorem:"Carbon Intensity Floor",              type:"Impossibility",  cat:"Thermodynamic",                   bw:6.95,  ci:[5.70,8.20],   pi:990.0,  dw:6884.0  },
  { rank:22, slug:"deep-sea-mining",   name:"Deep-Sea Mining",            theorem:"Abyssal Recovery Floor",              type:"Impossibility",  cat:"Geochemical / Physical",          bw:6.90,  ci:[5.00,8.80],   pi:5.0,    dw:34.0    },
  { rank:23, slug:"cement",            name:"Cement & Concrete",          theorem:"Calcination Floor",                   type:"Impossibility",  cat:"Thermodynamic",                   bw:6.74,  ci:[4.80,8.70],   pi:3.0,    dw:22.0    },
  { rank:24, slug:"plastics",          name:"Plastics",                   theorem:"Thermodynamic Degradation Floor",     type:"Impossibility",  cat:"Thermodynamic",                   bw:6.67,  ci:[4.20,9.10],   pi:650.0,  dw:3683.0  },
  { rank:25, slug:"ewaste",            name:"Electronic Waste Export",             theorem:"Basel Convention Evasion",            type:"Intractability", cat:"Jurisdictional / Classification",  bw:6.59,  ci:[4.90,8.30],   pi:1050.0, dw:6922.2  },
  { rank:26, slug:"tobacco",           name:"Tobacco",                    theorem:"Addiction Ratchet",                   type:"Intractability", cat:"Neurochemical / Institutional",   bw:6.50,  ci:[4.50,9.60],   pi:965.0,  dw:6276.0  },
  { rank:27, slug:"student-loans",     name:"Student Loan Securitization",theorem:"Guaranteed Demand Trap",              type:"Intractability", cat:"Institutional / Financial",       bw:6.36,  ci:[5.20,7.50],   pi:46.8,   dw:297.6   },
  { rank:28, slug:"pbm",               name:"Pharmacy Benefit Management",      theorem:"Spread Extraction Trap",              type:"Intractability", cat:"Institutional / Financial",       bw:6.35,  ci:[4.90,7.80],   pi:60.0,   dw:381.0   },
  { rank:29, slug:"platform-monopoly", name:"Platform Monopoly",          theorem:"Gatekeeper Ratchet",                  type:"Intractability", cat:"Institutional",                   bw:6.33,  ci:[4.80,7.80],   pi:158.0,  dw:999.4   },
  { rank:30, slug:"palm-oil",          name:"Palm Oil",                   theorem:"Substitution Impossibility",          type:"Impossibility",  cat:"Biological / Agricultural",       bw:6.30,  ci:[4.60,8.00],   pi:68.0,   dw:428.3   },
  { rank:31, slug:"tax-havens",        name:"Tax Havens",                 theorem:"Sovereignty Arbitrage",               type:"Intractability", cat:"Jurisdictional / Institutional",  bw:6.27,  ci:[5.10,7.40],   pi:492.0,  dw:3084.7  },
  { rank:32, slug:"pops",              name:"Persistent Organic Pollutants",           theorem:"Bioaccumulation Ratchet",             type:"Impossibility",  cat:"Thermodynamic / Chemical",        bw:6.23,  ci:[4.40,8.00],   pi:70.0,   dw:435.8   },
  { rank:33, slug:"data-brokerage",    name:"Data Brokerage",             theorem:"Consent Fabrication Trap",            type:"Intractability", cat:"Informational / Institutional",   bw:6.13,  ci:[4.70,7.60],   pi:323.0,  dw:1979.5  },
  { rank:34, slug:"amr",               name:"Antimicrobial Resistance",   theorem:"Efficacy Ceiling",                    type:"Impossibility",  cat:"Biological / Evolutionary",       bw:5.84,  ci:[4.43,7.26],   pi:null,   dw:null    },
  { rank:35, slug:"social-media",      name:"Social Media / Youth Mental Health",    theorem:"Engagement Trap",                     type:"Impossibility",  cat:"Computational / Developmental",   bw:5.79,  ci:[4.20,7.40],   pi:68.0,   dw:393.5   },
  { rank:36, slug:"gene-drives",       name:"Gene Drives",                theorem:"Ecological Ratchet Floor",            type:"Impossibility",  cat:"Biological / Evolutionary",       bw:5.77,  ci:[4.21,7.34],   pi:12.4,   dw:8.0     },
  { rank:37, slug:"water-priv",        name:"Water Privatization",        theorem:"Necessity Monopoly Floor",            type:"Intractability", cat:"Hydrogeological / Institutional", bw:5.61,  ci:[3.70,7.50],   pi:246.0,  dw:1380.8  },
  { rank:38, slug:"alg-pricing",       name:"Algorithmic Pricing",        theorem:"Tacit Coordination Ceiling",          type:"Intractability", cat:"Computational / Legal",           bw:5.38,  ci:[3.90,6.90],   pi:40.0,   dw:215.2   },
  { rank:39, slug:"pfas",              name:"Forever Chemicals (PFAS)",   theorem:"Molecular Persistence Floor",         type:"Impossibility",  cat:"Thermodynamic",                   bw:5.31,  ci:[4.02,6.61],   pi:null,   dw:null    },
  { rank:40, slug:"pe-healthcare",     name:"Private Equity Healthcare",  theorem:"Fiduciary Contradiction",             type:"Intractability", cat:"Institutional",                   bw:5.24,  ci:[4.00,6.50],   pi:31.0,   dw:162.4   },
  { rank:41, slug:"fx-fixing",         name:"FX-Fixing",                      theorem:"Self-Referential Pricing Trap",       type:"Intractability", cat:"Institutional / Informational",   bw:5.13,  ci:[3.42,8.16],   pi:3.2,    dw:16.4    },
  { rank:42, slug:"bitcoin",           name:"Bitcoin / Proof-of-Work",    theorem:"Protocol Welfare Floor",              type:"Intractability", cat:"Institutional",                   bw:5.00,  ci:[3.20,7.80],   pi:42.0,   dw:210.0   },
  { rank:43, slug:"aviation",          name:"Aviation Emissions",         theorem:"Altitude Forcing Floor",              type:"Impossibility",  cat:"Physical / Thermodynamic",        bw:4.97,  ci:[3.60,6.40],   pi:100.0,  dw:497.5   },
  { rank:44, slug:"defense",           name:"Defense Procurement",        theorem:"Monopsony Lock-In",                   type:"Intractability", cat:"Institutional / Political",       bw:4.88,  ci:[4.20,5.60],   pi:33.7,   dw:164.4   },
  { rank:45, slug:"orbital-debris",    name:"Orbital Debris",             theorem:"Orbital Congestion Ceiling",          type:"Intractability", cat:"Physical / Jurisdictional",       bw:4.82,  ci:[3.12,6.52],   pi:2.2,    dw:8.0     },
  { rank:46, slug:"fisheries",         name:"Fisheries / Coral",          theorem:"External Forcing Impossibility",      type:"Intractability", cat:"Climate / Jurisdictional",        bw:4.70,  ci:[3.80,5.60],   pi:38.0,   dw:178.6   },
  { rank:47, slug:"sovereign-debt",    name:"Sovereign Debt",             theorem:"Intergenerational Extraction Floor",  type:"Intractability", cat:"Institutional / Temporal",        bw:4.67,  ci:[3.40,5.90],   pi:35.0,   dw:163.5   },
  { rank:48, slug:"insurance",         name:"Insurance & Climate Risk",   theorem:"Tail Risk Exclusion Ratchet",         type:"Intractability", cat:"Institutional / Temporal",        bw:4.57,  ci:[3.30,5.80],   pi:90.0,   dw:411.1   },
  { rank:49, slug:"topsoil",           name:"Topsoil Erosion",            theorem:"Pedogenesis Floor",                   type:"Impossibility",  cat:"Geochemical",                     bw:4.41,  ci:[3.40,5.40],   pi:255.0,  dw:1123.0  },
  { rank:50, slug:"upf",               name:"Ultra-Processed Food",       theorem:"Palatability Ratchet",                type:"Intractability", cat:"Neurochemical / Institutional",   bw:4.06,  ci:[3.39,4.95],   pi:450.0,  dw:1829.0  },
  { rank:51, slug:"groundwater",       name:"Groundwater (Ogallala)",     theorem:"Recharge Floor",                      type:"Impossibility",  cat:"Hydrogeological",                 bw:3.46,  ci:[2.30,4.60],   pi:null,   dw:32.9    },
  { rank:52, slug:"pos",               name:"Altcoins / Proof-of-Stake",  theorem:"Cross-Chain Welfare Floor",           type:"Intractability", cat:"Institutional",                   bw:3.14,  ci:[2.31,3.98],   pi:12.0,   dw:6.0     },
  { rank:53, slug:"arms-exports",      name:"Arms Exports",               theorem:"End-Use Enforcement Impossibility",   type:"Intractability", cat:"Institutional / Jurisdictional",  bw:2.54,  ci:[1.90,3.20],   pi:29.6,   dw:75.0    },
  { rank:54, slug:"stablecoins",       name:"Stablecoins / Shadow Banking",theorem:"Reserve Opacity Trap",              type:"Intractability", cat:"Institutional / Financial",       bw:2.53,  ci:[2.00,3.10],   pi:56.0,   dw:141.7   },
  { rank:55, slug:"private-military",  name:"Private Military Contractors",theorem:"Accountability Void",               type:"Intractability", cat:"Jurisdictional / Legal",           bw:2.06,  ci:[1.70,2.40],   pi:260.0,  dw:536.3   },
  { rank:56, slug:"oil-gas",           name:"Oil & Gas",                  theorem:"Combustion Floor",                    type:"Impossibility",  cat:"Thermodynamic",                   bw:1.63,  ci:[1.30,2.00],   pi:3500.0, dw:5694.6  },
  { rank:57, slug:"shipping",          name:"Shipping & Maritime",        theorem:"Flag State Evasion Floor",            type:"Intractability", cat:"Jurisdictional / Physical",        bw:1.34,  ci:[1.10,1.60],   pi:969.0,  dw:1296.0  },
  { rank:58, slug:"alcohol",           name:"Alcohol",                    theorem:"Prohibition Paradox",                 type:"Intractability", cat:"Neurochemical / Institutional",   bw:1.33,  ci:[1.04,1.60],   pi:1600.0, dw:2121.4  },
  { rank:59, slug:"factory-farming",   name:"Factory Farming",            theorem:"Protein Demand Floor",                type:"Impossibility",  cat:"Biological / Thermodynamic",      bw:1.02,  ci:[0.76,1.38],   pi:2700.0, dw:2763.7  },
];

// Private Pareto Theorem foundational entry for Table 2
const PPT = { name:"Private Pareto Theorem", theorem:"The Private Pareto Theorem", type:"Foundational", cat:"Logical / Mathematical" };

// ── Shared styles ────────────────────────────────────────────────
const TH = { fontFamily: M, fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2,
  padding: "10px 14px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.1)",
  whiteSpace: "nowrap", position: "sticky", top: 0, background: "#0E0E16", zIndex: 2 };
const TD = { fontFamily: M, fontSize: 11, padding: "8px 14px",
  borderBottom: "1px solid rgba(255,255,255,0.04)", verticalAlign: "middle" };

function Badge({ label, color, bg }) {
  return (
    <span style={{ fontFamily: M, fontSize: 11, letterSpacing: 1, padding: "2px 7px",
      borderRadius: 2, background: bg, color, border: `1px solid ${color}33`, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// TABLE 1 — βW Rankings
// ═══════════════════════════════════════════════════════════════
function BetaTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
        <thead>
          <tr>
            {["RANK","DOMAIN","THEOREM","βW","90% CI","Π ($B)","ΔW ($B)","CATEGORY","TYPE"].map(h => (
              <th key={h} style={TH}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DOMAINS.map((d, i) => {
            const s = sev(d.bw);
            const rowBg = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)";
            return (
              <tr key={d.slug} style={{ background: rowBg, transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.04)"}
                onMouseLeave={e => e.currentTarget.style.background = rowBg}>
                {/* Rank */}
                <td style={{ ...TD, color: "rgba(255,255,255,0.25)", width: 40, textAlign: "center" }}>
                  {d.rank}
                </td>
                {/* Domain */}
                <td style={{ ...TD, color: TEXT, fontWeight: 500, maxWidth: 200 }}>
                  {d.name}
                </td>
                {/* Theorem */}
                <td style={{ ...TD, color: "#C8C8C8", fontStyle: "italic", maxWidth: 220 }}>
                  {d.theorem}
                </td>
                {/* βW */}
                <td style={{ ...TD, textAlign: "right", width: 64 }}>
                  <span style={{ color: s.text, fontWeight: 700, fontSize: 12 }}>
                    {d.bw.toFixed(2)}
                  </span>
                </td>
                {/* CI */}
                <td style={{ ...TD, color: MUTED, whiteSpace: "nowrap", width: 120 }}>
                  [{d.ci[0]}, {d.ci[1]}]
                </td>
                {/* Π */}
                <td style={{ ...TD, textAlign: "right", color: "#60A5FA", width: 80 }}>
                  {d.pi !== null ? d.pi.toLocaleString() : <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}
                </td>
                {/* ΔW */}
                <td style={{ ...TD, textAlign: "right", color: "#F87171", width: 90 }}>
                  {d.dw !== null ? d.dw.toLocaleString() : <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}
                </td>
                {/* Category */}
                <td style={{ ...TD, maxWidth: 180 }}>
                  <span style={{ fontSize: 11, color: catCol(d.cat), fontFamily: M }}>
                    {d.cat}
                  </span>
                </td>
                {/* Type */}
                <td style={{ ...TD, width: 120 }}>
                  <Badge
                    label={d.type === "Impossibility" ? "IMPOSSIBILITY" : "INTRACTABILITY"}
                    color={typeCol(d.type)}
                    bg={d.type === "Impossibility" ? "rgba(239,68,68,0.08)" : "rgba(96,165,250,0.08)"}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TABLE 2 — Theorem & Axiom Classification
// ═══════════════════════════════════════════════════════════════
const IMPOSSIBILITY = DOMAINS.filter(d => d.type === "Impossibility");
const INTRACTABILITY = DOMAINS.filter(d => d.type === "Intractability");

function SectionHeader({ label, color, count, description }) {
  return (
    <tr>
      <td colSpan={5} style={{ padding: "20px 14px 10px", background: "transparent" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontFamily: M, fontSize: 11, letterSpacing: 3, color, borderBottom: `2px solid ${color}`, paddingBottom: 2 }}>
            {label}
          </span>
          <span style={{ fontFamily: M, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            {count} THEOREMS
          </span>
          <span style={{ fontFamily: "'Newsreader',serif", fontSize: 12, color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>
            {description}
          </span>
        </div>
      </td>
    </tr>
  );
}

function TheoremTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
        <thead>
          <tr>
            {["RANK","DOMAIN","THEOREM NAME","CONSTRAINT CATEGORY","TYPE"].map(h => (
              <th key={h} style={TH}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Foundational */}
          <tr>
            <td colSpan={5} style={{ padding: "20px 14px 10px" }}>
              <span style={{ fontFamily: M, fontSize: 11, letterSpacing: 3, color: "#A78BFA",
                borderBottom: "2px solid #A78BFA", paddingBottom: 2 }}>
                FOUNDATIONAL
              </span>
              <span style={{ fontFamily: M, fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 12 }}>
                1 THEOREM — underpins 59 market-failure domain theorems
              </span>
            </td>
          </tr>
          <tr style={{ background: "rgba(167,139,250,0.04)" }}>
            <td style={{ ...TD, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>—</td>
            <td style={{ ...TD, color: TEXT, fontWeight: 500 }}>Private Pareto Theorem</td>
            <td style={{ ...TD, color: "#A78BFA", fontStyle: "italic" }}>The Private Pareto Theorem</td>
            <td style={{ ...TD, color: catCol("Logical") }}>Logical / Mathematical</td>
            <td style={{ ...TD }}><Badge label="FOUNDATIONAL" color="#A78BFA" bg="rgba(167,139,250,0.08)" /></td>
          </tr>

          {/* Impossibility */}
          <SectionHeader
            label="IMPOSSIBILITY THEOREMS"
            color="#EF4444"
            count={IMPOSSIBILITY.length}
            description="Binding physical, chemical, biological, informational, or equivalent floor — no rule-change path escapes it"
          />
          {IMPOSSIBILITY.map((d, i) => (
            <tr key={d.slug}
              style={{ background: i % 2 === 0 ? "rgba(239,68,68,0.02)" : "transparent", transition: "background 0.1s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "rgba(239,68,68,0.02)" : "transparent"}>
              <td style={{ ...TD, color: "rgba(255,255,255,0.25)", textAlign: "center", width: 44 }}>{d.rank}</td>
              <td style={{ ...TD, color: TEXT, fontWeight: 500 }}>{d.name}</td>
              <td style={{ ...TD, color: "#FCA5A5", fontStyle: "italic" }}>{d.theorem}</td>
              <td style={{ ...TD }}>
                <span style={{ fontSize: 11, color: catCol(d.cat), fontFamily: M }}>{d.cat}</span>
              </td>
              <td style={{ ...TD }}>
                <Badge label="IMPOSSIBILITY" color="#EF4444" bg="rgba(239,68,68,0.08)" />
              </td>
            </tr>
          ))}

          {/* Intractability */}
          <SectionHeader
            label="INTRACTABILITY THEOREMS"
            color="#60A5FA"
            count={INTRACTABILITY.length}
            description="Binding current-game floor with a policy or rule-change path out"
          />
          {INTRACTABILITY.map((d, i) => (
            <tr key={d.slug}
              style={{ background: i % 2 === 0 ? "rgba(96,165,250,0.02)" : "transparent", transition: "background 0.1s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(96,165,250,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "rgba(96,165,250,0.02)" : "transparent"}>
              <td style={{ ...TD, color: "rgba(255,255,255,0.25)", textAlign: "center", width: 44 }}>{d.rank}</td>
              <td style={{ ...TD, color: TEXT, fontWeight: 500 }}>{d.name}</td>
              <td style={{ ...TD, color: "#93C5FD", fontStyle: "italic" }}>{d.theorem}</td>
              <td style={{ ...TD }}>
                <span style={{ fontSize: 11, color: catCol(d.cat), fontFamily: M }}>{d.cat}</span>
              </td>
              <td style={{ ...TD }}>
                <Badge label="INTRACTABILITY" color="#60A5FA" bg="rgba(96,165,250,0.08)" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LEGEND
// ═══════════════════════════════════════════════════════════════
function Legend() {
  const sevItems = [
    { label: "V — EXTREME", color: "#EF4444", desc: "βW > 35" },
    { label: "IV — CRITICAL", color: "#F87171", desc: "βW 10–35" },
    { label: "III — SEVERE", color: "#F59E0B", desc: "βW 3–10" },
    { label: "II — MODERATE", color: "#D97706", desc: "βW 1–3" },
    { label: "I — MILD", color: "#10B981", desc: "βW ≤ 1" },
  ];
  const catItems = [
    { label: "Thermodynamic", color: "#F97316" },
    { label: "Biological / Evolutionary", color: "#22C55E" },
    { label: "Geochemical", color: "#A78BFA" },
    { label: "Physical", color: "#94A3B8" },
    { label: "Institutional / Financial / Legal", color: "#60A5FA" },
    { label: "Computational", color: "#C084FC" },
    { label: "Hydrogeological", color: "#38BDF8" },
    { label: "Neurochemical", color: "#E879F9" },
    { label: "Informational", color: "#FCD34D" },
    { label: "Jurisdictional", color: "#818CF8" },
  ];

  return (
    <div style={{ display: "flex", gap: 40, flexWrap: "wrap", padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div>
        <div style={{ fontFamily: M, fontSize: 11, letterSpacing: 2, color: MUTED, marginBottom: 8 }}>HARM SEVERITY</div>
        {sevItems.map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
            <span style={{ fontFamily: M, fontSize: 11, color: s.color }}>{s.label}</span>
            <span style={{ fontFamily: M, fontSize: 11, color: MUTED }}>{s.desc}</span>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontFamily: M, fontSize: 11, letterSpacing: 2, color: MUTED, marginBottom: 8 }}>CONSTRAINT CATEGORY</div>
        {catItems.map(c => (
          <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color, flexShrink: 0 }} />
            <span style={{ fontFamily: M, fontSize: 11, color: c.color }}>{c.label}</span>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontFamily: M, fontSize: 11, letterSpacing: 2, color: MUTED, marginBottom: 8 }}>THEOREM TYPE</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: "#EF4444", flexShrink: 0 }} />
          <span style={{ fontFamily: M, fontSize: 11, color: "#EF4444" }}>IMPOSSIBILITY</span>
          <span style={{ fontFamily: M, fontSize: 11, color: MUTED }}>Physical/chemical/biological/informational — no escape path</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: "#60A5FA", flexShrink: 0 }} />
          <span style={{ fontFamily: M, fontSize: 11, color: "#60A5FA" }}>INTRACTABILITY</span>
          <span style={{ fontFamily: M, fontSize: 11, color: MUTED }}>Current-game floor — policy or rule-change path exists</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: "#A78BFA", flexShrink: 0 }} />
          <span style={{ fontFamily: M, fontSize: 11, color: "#A78BFA" }}>FOUNDATIONAL</span>
          <span style={{ fontFamily: M, fontSize: 11, color: MUTED }}>Logical/mathematical — underpins all theorems</span>
        </div>
        <div style={{ marginTop: 12, fontFamily: M, fontSize: 11, color: MUTED }}>
          Π = annual industry revenue (Iron Law — never profit)<br />
          βW = ΔW / Π · welfare-to-revenue ratio<br />
          {IMPOSSIBILITY.length} Impossibility · {INTRACTABILITY.length} Intractability · 1 Foundational
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════
export default function SAPMTables() {
  const [tab, setTab] = useState("beta");

  const imp = DOMAINS.filter(d => d.type === "Impossibility").length;
  const intr = DOMAINS.filter(d => d.type === "Intractability").length;

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT, fontFamily: M }}>
      {/* Header */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{ fontFamily: M, fontSize: 11, letterSpacing: 4, color: GOLD, marginBottom: 10 }}>
          System Asset Pricing Model PROGRAM · ERIK POSTNIEKS · 2026
        </div>
        <h1 style={{ fontFamily: S, fontSize: 32, fontWeight: 300, color: TEXT, margin: "0 0 8px" }}>
          System Asset Pricing Model Master Tables
        </h1>
        <p style={{ fontFamily: S, fontSize: 15, color: "#C8C8C8", margin: "0 0 6px", fontStyle: "italic" }}>
          59 market-failure domain theorems ranked by βW · Π = annual revenue (Iron Law) · Updated 2026-04-12
        </p>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: 24, margin: "20px 0 0", flexWrap: "wrap" }}>
          {[
            { label: "MARKET-FAILURE DOMAINS", val: "59" },
            { label: "IMPOSSIBILITY", val: imp.toString(), color: "#EF4444" },
            { label: "INTRACTABILITY", val: intr.toString(), color: "#60A5FA" },
            { label: "MAX βW", val: "50.99", color: "#EF4444" },
            { label: "TOTAL ΔW", val: "$" + (DOMAINS.reduce((s,d) => s + (d.dw||0), 0) / 1000).toFixed(0) + "T", color: "#F59E0B" },
          ].map(s => (
            <div key={s.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "10px 16px" }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: MUTED, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: s.color || TEXT }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginTop: 28, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { id: "beta",    label: "TABLE 1 — βW RANKINGS" },
            { id: "theorem", label: "TABLE 2 — THEOREM CLASSIFICATION" },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              fontFamily: M, fontSize: 11, letterSpacing: 2, padding: "12px 24px",
              background: "transparent", border: "none", cursor: "pointer",
              color: tab === t.id ? GOLD : "#C8C8C8",
              borderBottom: tab === t.id ? `2px solid ${GOLD}` : "2px solid transparent",
              marginBottom: -1, transition: "color 0.15s",
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table area */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ marginTop: 24, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 6, overflow: "hidden" }}>
          {tab === "beta" ? <BetaTable /> : <TheoremTable />}
        </div>

        <Legend />

        <div style={{ fontFamily: M, fontSize: 11, color: "rgba(255,255,255,0.15)", marginTop: 16, textAlign: "center" }}>
          © 2026 Erik Postnieks · System Asset Pricing Model · All βW values revenue-denominated per Iron Law
        </div>
      </div>
    </div>
  );
}
