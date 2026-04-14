"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AXIOMS, ACTORS } from "./pstBreakerData";
import { usePSTData } from "./usePSTData";

// ══════════════════════════════════════════════════════════════
// Reform Pathfinder — How Can You Help?
// Interactive tool: Country × Sector × Actor Level → Break Private-Systemic Tension
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

const AXIOM_COLORS = [GOLD, "#627EEA", RED];

export default function PSTBreaker() {
  const { t } = useTranslation();
  const COUNTRIES = usePSTData();
  const [countryIdx, setCountryIdx] = useState(null);
  const [sectorIdx, setSectorIdx] = useState(null);
  const [actorIdx, setActorIdx] = useState(null);
  const [search, setSearch] = useState("");

  const country = countryIdx !== null ? COUNTRIES[countryIdx] : null;
  const sector = country && sectorIdx !== null ? country.sectors[sectorIdx] : null;

  const filteredCountries = search.trim()
    ? COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase()) || c.region.toLowerCase().includes(search.toLowerCase()))
    : COUNTRIES;

  const reset = () => { setCountryIdx(null); setSectorIdx(null); setActorIdx(null); setSearch(""); };
  const backToCountry = () => { setSectorIdx(null); setActorIdx(null); };
  const backToSector = () => { setActorIdx(null); };

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S, padding: "32px 24px 80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: M, fontSize: 14, color: GOLD, letterSpacing: 3, marginBottom: 8 }}>
            {t("pst.title")}
          </div>
          <h1 style={{ fontFamily: S, fontSize: 28, fontWeight: 300, color: TEXT, margin: 0, lineHeight: 1.3 }}>
            {t("pst.headline")}
          </h1>

          {/* AGGREGATE WELFARE GAP */}
          <div style={{
            marginTop: 20, padding: "20px 24px", background: SURFACE,
            border: `1px solid ${BORDER}`, borderRadius: 4,
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
              <div style={{ fontFamily: M, fontSize: 36, fontWeight: 600, color: GOLD, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {t("pst.globalLoss")}
              </div>
              <div style={{ fontFamily: M, fontSize: 14, color: MUTED, letterSpacing: 1 }}>
                / YEAR
              </div>
            </div>
            <div style={{ fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 1, marginBottom: 10, opacity: 0.7 }}>
              {t("pst.globalLossLabel")}
            </div>
            <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.8 }}>
              {t("pst.globalLossExplain")}
            </div>
          </div>

          <div style={{ fontFamily: S, fontSize: 20, color: DIM, marginTop: 16, fontStyle: "italic", lineHeight: 1.6 }}>
            {t("pst.subtitle")}
          </div>
        </div>

        {/* AXIOM LEGEND */}
        <div style={{
          display: "flex", gap: 20, flexWrap: "wrap", padding: "12px 16px",
          background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 4, marginBottom: 20,
        }}>
          <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 1, alignSelf: "center" }}>AXIOM STATUS:</div>
          {AXIOMS.map((ax, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: AXIOM_COLORS[i], display: "inline-block" }} />
              <span style={{ fontFamily: M, fontSize: 11, color: DIM }}>{ax.short}</span>
            </div>
          ))}
          <div style={{ fontFamily: M, fontSize: 10, color: MUTED, marginLeft: "auto" }}>
            <span style={{ color: RED }}>●</span> Holds (trap active) &nbsp;
            <span style={{ color: GREEN }}>●</span> Broken (reform possible)
          </div>
        </div>

        {/* BREADCRUMB */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
          <span onClick={reset} style={{
            fontFamily: M, fontSize: 14, color: countryIdx !== null ? GOLD : TEXT,
            cursor: countryIdx !== null ? "pointer" : "default",
            borderBottom: countryIdx !== null ? `1px dotted ${GOLD}` : "none",
          }}>
            {t("pst.allCountries")}
          </span>
          {country && (
            <>
              <span style={{ fontFamily: M, fontSize: 14, color: MUTED }}>›</span>
              <span onClick={backToCountry} style={{
                fontFamily: M, fontSize: 14, color: sectorIdx !== null ? GOLD : TEXT,
                cursor: sectorIdx !== null ? "pointer" : "default",
                borderBottom: sectorIdx !== null ? `1px dotted ${GOLD}` : "none",
              }}>
                {country.name.toUpperCase()}
              </span>
            </>
          )}
          {sector && (
            <>
              <span style={{ fontFamily: M, fontSize: 14, color: MUTED }}>›</span>
              <span style={{ fontFamily: M, fontSize: 14, color: TEXT }}>
                {sector.name.toUpperCase()}
              </span>
            </>
          )}
        </div>

        {/* ═══ STEP 1: COUNTRY SELECTION ═══ */}
        {countryIdx === null && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontFamily: M, fontSize: 14, color: MUTED, letterSpacing: 1 }}>
                {t("pst.selectCountry")} ({COUNTRIES.length})
              </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t("pst.searchPlaceholder")}
                style={{
                  fontFamily: M, fontSize: 14, color: TEXT, background: SURFACE,
                  border: `1px solid ${BORDER}`, borderRadius: 4, padding: "6px 12px",
                  outline: "none", width: 200,
                }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {filteredCountries.map((c) => {
                const ci = COUNTRIES.indexOf(c);
                return (
                <div key={c.code} onClick={() => setCountryIdx(ci)} style={{
                  padding: "20px", background: SURFACE, border: `1px solid ${BORDER}`,
                  borderRadius: 4, cursor: "pointer", transition: "border-color 0.2s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                    <div style={{ fontFamily: M, fontSize: 19, fontWeight: 600, color: GOLD }}>{c.name}</div>
                    <div style={{ fontFamily: M, fontSize: 13, color: MUTED }}>{c.region}</div>
                  </div>
                  <div style={{ fontFamily: M, fontSize: 13, color: DIM, marginBottom: 8 }}>
                    {c.sectors.length} {t("pst.sectorsMapped")}
                  </div>
                  <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.6 }}>
                    {c.summary.length > 160 ? c.summary.slice(0, 157) + "..." : c.summary}
                  </div>
                  {/* Private-Systemic Tension dots for each sector */}
                  <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                    {c.sectors.map((s, si) => (
                      <div key={si} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontFamily: M, fontSize: 12, color: MUTED }}>{s.name.split("/")[0].split("(")[0].trim().slice(0, 12)}</span>
                        <div style={{ display: "flex", gap: 2 }}>
                          {s.pst.map((holds, ai) => (
                            <div key={ai} style={{
                              width: 6, height: 6, borderRadius: "50%",
                              background: holds ? RED : GREEN,
                              opacity: holds ? 0.7 : 0.5,
                            }} title={`${AXIOMS[ai].short}: ${holds ? t("pst.holds") : t("pst.broken")}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                );
              })}
            </div>
            {filteredCountries.length === 0 && (
              <div style={{ fontFamily: S, fontSize: 17, color: MUTED, textAlign: "center", padding: 40 }}>
                {t("pst.noResults")}
              </div>
            )}
          </div>
        )}

        {/* ═══ STEP 2: SECTOR SELECTION ═══ */}
        {country && sectorIdx === null && (
          <div>
            <div style={{ fontFamily: M, fontSize: 14, color: MUTED, letterSpacing: 1, marginBottom: 8 }}>
              {country.name.toUpperCase()} — {t("pst.selectSector")}
            </div>
            <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7, marginBottom: 20 }}>
              {country.summary}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
              {country.sectors.map((s, si) => {
                const breakColor = AXIOM_COLORS[s.mostBreakable];
                return (
                  <div key={si} onClick={() => setSectorIdx(si)} style={{
                    padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`,
                    borderRadius: 4, cursor: "pointer", display: "grid",
                    gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center",
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                        <span style={{ fontFamily: M, fontSize: 17, fontWeight: 600, color: TEXT }}>{s.name}</span>
                        <span style={{ fontFamily: M, fontSize: 15, color: s.beta >= 10 ? RED : s.beta >= 5 ? GOLD : DIM }}>
                          β<sub>W</sub> = {s.beta}
                        </span>
                      </div>
                      <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.5 }}>
                        {s.whyBreakable.length > 140 ? s.whyBreakable.slice(0, 137) + "..." : s.whyBreakable}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {/* Private-Systemic Tension status dots */}
                      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                        {s.pst.map((holds, ai) => (
                          <div key={ai} style={{
                            width: 16, height: 16, borderRadius: "50%",
                            background: ai === s.mostBreakable ? `${GREEN}30` : holds ? `${RED}20` : `${GREEN}20`,
                            border: `2px solid ${ai === s.mostBreakable ? GREEN : holds ? `${RED}60` : `${GREEN}60`}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: M, fontSize: 11, color: ai === s.mostBreakable ? GREEN : holds ? RED : GREEN,
                          }}>
                            {ai + 1}
                          </div>
                        ))}
                      </div>
                      <div style={{ fontFamily: M, fontSize: 12, color: breakColor, letterSpacing: 1 }}>
                        BREAK {s.mostBreakable + 1}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ STEP 3: Private-Systemic Tension VULNERABILITY MAP + ACTOR ACTIONS ═══ */}
        {sector && (
          <div>
            {/* SECTOR HEADER */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <div style={{ fontFamily: M, fontSize: 18, fontWeight: 600, color: TEXT }}>{sector.name}</div>
                <div style={{ fontFamily: M, fontSize: 19, color: sector.beta >= 10 ? RED : GOLD }}>
                  β<sub>W</sub> = {sector.beta}
                </div>
              </div>
              <div style={{ fontFamily: S, fontSize: 18, color: DIM, lineHeight: 1.7 }}>
                {sector.whyBreakable}
              </div>
            </div>

            {/* FASTEST PATH CALLOUT */}
            <div style={{ padding: "16px 20px", background: "rgba(34,197,94,0.06)", border: `2px solid rgba(34,197,94,0.2)`, borderRadius: 4, marginBottom: 24 }}>
              <div style={{ fontFamily: M, fontSize: 13, color: GREEN, letterSpacing: 1, marginBottom: 6 }}>
                {t("pst.fastestPath")}
              </div>
              <div style={{ fontFamily: S, fontSize: 19, color: TEXT, lineHeight: 1.7 }}>
                {t("pst.fastestPathIn", { country: country.name, sector: sector.name.split("/")[0].split("(")[0].trim() })} <strong style={{ color: GREEN }}>{t(`axioms.${sector.mostBreakable + 1}.name`)}</strong> ({t(`axioms.${sector.mostBreakable + 1}.short`)}).
              </div>
            </div>

            {/* THREE AXIOM PANELS */}
            <div style={{ fontFamily: M, fontSize: 14, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>
              {t("pst.vulnerabilityMap")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8, marginBottom: 32 }}>
              {AXIOMS.map((ax, ai) => {
                const isMostBreakable = ai === sector.mostBreakable;
                const holds = sector.pst[ai];
                const borderColor = isMostBreakable ? GREEN : holds ? `${RED}40` : `${GREEN}40`;
                return (
                  <div key={ai} style={{
                    padding: "16px 20px",
                    background: isMostBreakable ? "rgba(34,197,94,0.04)" : SURFACE,
                    border: `${isMostBreakable ? "2px" : "1px"} solid ${borderColor}`,
                    borderRadius: 4,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%",
                          background: isMostBreakable ? `${GREEN}30` : holds ? `${RED}20` : `${GREEN}30`,
                          border: `2px solid ${isMostBreakable ? GREEN : holds ? RED : GREEN}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: M, fontSize: 12, color: isMostBreakable ? GREEN : holds ? RED : GREEN,
                        }}>
                          {ai + 1}
                        </div>
                        <span style={{ fontFamily: M, fontSize: 15, fontWeight: 600, color: isMostBreakable ? GREEN : TEXT }}>
                          {t(`axioms.${ai + 1}.name`).toUpperCase()}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {isMostBreakable && (
                          <span style={{ fontFamily: M, fontSize: 12, color: GREEN, background: "rgba(34,197,94,0.1)", padding: "2px 8px", borderRadius: 10, letterSpacing: 1 }}>
                            {t("pst.mostBreakable")}
                          </span>
                        )}
                        <span style={{ fontFamily: M, fontSize: 13, color: holds ? RED : GREEN }}>
                          {holds ? t("pst.holds") : t("pst.broken")}
                        </span>
                      </div>
                    </div>
                    <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7, marginBottom: 8 }}>
                      {t(`axioms.${ai + 1}.desc`)}
                    </div>
                    <div style={{ fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 1, marginBottom: 4 }}>{t("pst.howToBreak")}</div>
                    <div style={{ fontFamily: S, fontSize: 17, color: TEXT, lineHeight: 1.7 }}>
                      {sector.breakPaths[ai]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ACTOR LEVEL ACTIONS */}
            <div style={{ fontFamily: M, fontSize: 14, color: MUTED, letterSpacing: 1, marginBottom: 12 }}>
              {t("pst.whatYouCanDo")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
              {ACTORS.map((actor, ai) => {
                const data = sector.actors.find(a => a.role === actor.key);
                const isOpen = actorIdx === ai;
                return (
                  <div key={ai} onClick={() => setActorIdx(isOpen ? null : ai)} style={{
                    background: isOpen ? "rgba(245,158,11,0.04)" : SURFACE,
                    border: `1px solid ${isOpen ? "rgba(245,158,11,0.2)" : BORDER}`,
                    borderRadius: 4, cursor: "pointer", overflow: "hidden",
                  }}>
                    <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: "50%",
                          background: data ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${data ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.1)"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: M, fontSize: 14, color: data ? GOLD : MUTED, fontWeight: 600,
                        }}>
                          {actor.icon}
                        </div>
                        <div>
                          <div style={{ fontFamily: M, fontSize: 15, color: data ? GOLD : MUTED, letterSpacing: 1 }}>{t(`actors.${actor.key}.label`)}</div>
                          <div style={{ fontFamily: S, fontSize: 14, color: MUTED }}>{t(`actors.${actor.key}.desc`)}</div>
                        </div>
                      </div>
                      <span style={{ fontFamily: M, fontSize: 17, color: MUTED }}>{isOpen ? "−" : "+"}</span>
                    </div>

                    {isOpen && !data && (
                      <div style={{ padding: "12px 20px 16px", borderTop: `1px solid ${BORDER}` }}>
                        <div style={{ fontFamily: S, fontSize: 14, color: MUTED, fontStyle: "italic" }}>
                          Select this agent to explore the reform pathway for {country.name} — {sector.name}.
                        </div>
                      </div>
                    )}

                    {isOpen && data && (
                      <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${BORDER}` }}>
                        <div style={{ fontFamily: M, fontSize: 13, color: GOLD, letterSpacing: 1, marginTop: 16, marginBottom: 10 }}>
                          {data.level.toUpperCase()} — {country.name.toUpperCase()} — {sector.name.toUpperCase()}
                        </div>
                        {data.actions.map((action, i) => (
                          <div key={i} style={{
                            display: "flex", gap: 10, padding: "8px 0",
                            borderBottom: i < data.actions.length - 1 ? `1px solid ${BORDER}` : "none",
                          }}>
                            <span style={{ fontFamily: M, fontSize: 14, color: GREEN, flexShrink: 0, marginTop: 2 }}>→</span>
                            <span style={{ fontFamily: S, fontSize: 17, color: TEXT, lineHeight: 1.7 }}>{action}</span>
                          </div>
                        ))}

                        {/* Infrastructure */}
                        <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 4 }}>
                          <div style={{ fontFamily: M, fontSize: 12, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>
                            {t("pst.infrastructure")}
                          </div>
                          <div style={{ fontFamily: M, fontSize: 13, color: DIM, lineHeight: 1.8 }}>
                            {data.infra}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* SELF-LACERATION */}
            <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(239,68,68,0.06)", border: `1px solid rgba(239,68,68,0.15)`, borderRadius: 4 }}>
              <div style={{ fontFamily: M, fontSize: 13, color: RED, letterSpacing: 1, marginBottom: 6 }}>{t("pst.selfLaceration")}</div>
              <div style={{ fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.8 }}>
                {t("pst.selfLacerationText")}
              </div>
            </div>
          </div>
        )}

        {/* AXIOM REFERENCE — always visible */}
        <div style={{
          marginTop: 48, padding: "20px 24px", background: SURFACE,
          border: `1px solid ${BORDER}`, borderRadius: 4,
        }}>
          <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 2, marginBottom: 16 }}>
            THE THREE AXIOMS — QUICK REFERENCE
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {[
              { num: 1, name: "Overlapping Interests", color: GOLD,
                desc: "Both parties benefit from cooperating — there is a deal to be made. If you eliminate the profitable deal (ban, cap, substitute), this axiom breaks and the trap collapses.",
                breaking: "Ban the product, cap output, or remove the subsidy that makes the deal profitable." },
              { num: 2, name: "System Independence", color: "#627EEA",
                desc: "System welfare cannot be computed from what the parties exchange. The damage is invisible inside the transaction — neither buyer nor seller sees the cost to the system.",
                breaking: "Mandatory disclosure, emissions monitoring, or contamination testing — anything that makes the hidden cost visible." },
              { num: 3, name: "System Dependence", color: RED,
                desc: "The parties' activity actually damages the shared system. Production, consumption, or disposal degrades the environment, benchmark, commons, or public health.",
                breaking: "This axiom is hardest to break — it holds whenever the physics, chemistry, or biology of the activity inherently harms the system." },
            ].map(ax => (
              <div key={ax.num} style={{ padding: "12px 16px", background: BG, borderRadius: 4, border: `1px solid ${BORDER}` }}>
                <div style={{ fontFamily: M, fontSize: 13, color: ax.color, fontWeight: 700, marginBottom: 6 }}>
                  AXIOM {ax.num}: {ax.name.toUpperCase()}
                </div>
                <div style={{ fontFamily: S, fontSize: 14, color: DIM, lineHeight: 1.7, marginBottom: 8 }}>
                  {ax.desc}
                </div>
                <div style={{ fontFamily: M, fontSize: 11, color: GREEN, lineHeight: 1.5 }}>
                  BREAKING IT: {ax.breaking}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
