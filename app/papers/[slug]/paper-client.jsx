"use client";
import { useState, useMemo, useRef } from "react";
import { buildPaperList } from "../../../src/paperData";
import { PAPER_CONTENT, MERGED_CONTENT } from "../../../src/PaperSummaries";

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const BG = "#0D0D0D";
const SURFACE = "#1A1A1A";
const TEXT = "#F5F0E8";
const GOLD = "#F59E0B";
const RED = "#EF4444";
const GREEN = "#22C55E";
const CYAN = "#22D3EE";
const MUTED = "rgba(255,255,255,0.35)";
const BORDER = "rgba(255,255,255,0.1)";
const DIM = "rgba(255,255,255,0.55)";

function splitZinger(text) {
  const match = text.match(/^(.+?(?:\$[\d.]+[BTM]?|[A-Z]{2,}|(?:Dr|Mr|Ms|St|vs|etc|e\.g|i\.e)\.)*[^.]*\.)\s+(.+)$/s);
  if (match) return { zinger: match[1], body: match[2] };
  return { zinger: text, body: null };
}

function ExpandableItem({ number, zinger, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      marginBottom: 6,
      border: `1px solid ${open ? "rgba(245,158,11,0.2)" : BORDER}`,
      borderRadius: 4, transition: "border-color 0.2s",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "flex-start", gap: 10, width: "100%",
        padding: "10px 14px", background: open ? "rgba(245,158,11,0.04)" : "rgba(255,255,255,0.02)",
        border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s",
      }}>
        <span style={{ fontFamily: M, fontSize: 12, fontWeight: 700, color: GOLD, minWidth: 22, lineHeight: "1.6" }}>
          {number}.
        </span>
        <span style={{ fontFamily: S, fontSize: 15, color: TEXT, lineHeight: 1.6, flex: 1, fontWeight: 600 }}>
          {zinger}
        </span>
        <span style={{ fontFamily: M, fontSize: 14, color: MUTED, minWidth: 16, lineHeight: "1.6", textAlign: "center" }}>
          {open ? "\u2212" : "+"}
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 14px 12px 46px", fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>
          {children}
        </div>
      )}
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 4, borderBottom: `1px solid ${BORDER}` }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "flex-start", gap: 8, width: "100%",
        padding: "10px 4px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
      }}>
        <span style={{ fontFamily: M, fontSize: 13, color: GOLD, minWidth: 16, lineHeight: "1.6" }}>
          {open ? "\u2212" : "+"}
        </span>
        <span style={{ fontFamily: M, fontSize: 13, color: TEXT, fontWeight: 600, lineHeight: 1.6, flex: 1 }}>
          {question}
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 4px 12px 24px", fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>
          {answer}
        </div>
      )}
    </div>
  );
}

function MCStatBox({ label, value, color }) {
  return (
    <div style={{
      padding: "10px 12px", background: "rgba(255,255,255,0.03)",
      border: `1px solid ${BORDER}`, borderRadius: 4, textAlign: "center",
    }}>
      <div style={{ fontFamily: M, fontSize: 18, fontWeight: 700, color }}>{value || "TBD"}</div>
      <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 1, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function getTheoremBadgeColor(type) {
  if (type === "Impossibility") return RED;
  if (type === "Intractability") return GOLD;
  if (type === "Foundational") return CYAN;
  return MUTED;
}

function FullContent({ paper }) {
  const c = paper.content;
  return (
    <div style={{ paddingTop: 16 }}>
      {c.epigraph && (
        <div style={{
          fontFamily: S, fontSize: 18, fontStyle: "italic", color: GOLD,
          padding: "16px 24px", marginBottom: 20,
          borderLeft: `3px solid ${GOLD}`, background: "rgba(245,158,11,0.04)",
          lineHeight: 1.7,
        }}>
          {c.epigraph}
        </div>
      )}

      {c.mcResults && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
          <MCStatBox label={"\u03B2W"} value={c.mcResults.beta?.toFixed(2)} color={c.mcResults.beta >= 10 ? RED : GOLD} />
          <MCStatBox label="90% CI" value={c.mcResults.ci} color={DIM} />
          <MCStatBox label={"\u0394W ($B/yr)"} value={c.mcResults.dw ? `$${c.mcResults.dw.toLocaleString()}B` : "TBD"} color={RED} />
          <MCStatBox label={"\u03A0 ($B/yr)"} value={c.mcResults.pi ? `$${c.mcResults.pi.toLocaleString()}B` : "TBD"} color={GREEN} />
        </div>
      )}

      <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10 }}>KEY FINDINGS</div>
      {c.keyFindings.map((f, i) => {
        const { zinger, body } = splitZinger(f);
        return <ExpandableItem key={i} number={i + 1} zinger={zinger}>{body}</ExpandableItem>;
      })}

      <div style={{
        margin: "20px 0", padding: "16px 20px",
        background: "rgba(245,158,11,0.04)", border: `1px solid rgba(245,158,11,0.15)`, borderRadius: 6,
      }}>
        <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10 }}>
          {paper.theoremName ? paper.theoremName.toUpperCase() : "THEOREM"}
        </div>
        <div style={{
          fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7,
          fontStyle: "italic", marginBottom: 14, paddingLeft: 14, borderLeft: `2px solid ${GOLD}`,
        }}>
          {c.theorem.formal}
        </div>
        <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 1, marginBottom: 6 }}>PLAIN ENGLISH</div>
        <div style={{ fontFamily: S, fontSize: 16, color: TEXT, lineHeight: 1.8 }}>{c.theorem.plain}</div>
      </div>

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
            return <ExpandableItem key={agent.key} number={i + 1} zinger={zinger}>{body}</ExpandableItem>;
          })}
        </>
      )}

      {/* Executive Summary */}
      {c.executiveSummary && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, marginTop: 20 }}>EXECUTIVE SUMMARY</div>
          <div style={{ fontFamily: S, fontSize: 16, color: TEXT, lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: c.executiveSummary }} />
        </>
      )}

      {/* Case Studies */}
      {c.caseStudies && c.caseStudies.length > 0 && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, marginTop: 20 }}>CASE STUDIES</div>
          {c.caseStudies.map((cs, i) => (
            <div key={i} style={{ marginBottom: 16, padding: "14px 18px", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 6 }}>
              <div style={{ fontFamily: M, fontSize: 13, color: GOLD, marginBottom: 8 }}>{cs.title}</div>
              <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: cs.content }} />
            </div>
          ))}
        </>
      )}

      {/* Policy Analysis */}
      {c.policyAnalysis && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, marginTop: 20 }}>POLICY ANALYSIS</div>
          {c.policyAnalysis.currentFramework && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 1, marginBottom: 6 }}>CURRENT FRAMEWORK</div>
              <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: c.policyAnalysis.currentFramework }} />
            </div>
          )}
          {c.policyAnalysis.failures && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 1, marginBottom: 6 }}>WHY IT FAILS</div>
              <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: c.policyAnalysis.failures }} />
            </div>
          )}
          {c.policyAnalysis.reform && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: 1, marginBottom: 6 }}>REFORM PATHWAY</div>
              <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: c.policyAnalysis.reform }} />
            </div>
          )}
        </>
      )}

      {/* Welfare Channels Table */}
      {c.channelTable && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, marginTop: 20 }}>WELFARE CHANNEL BREAKDOWN</div>
          <div style={{ overflowX: "auto", marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: c.channelTable }} />
        </>
      )}

      {/* Monte Carlo Methodology */}
      {c.monteCarlo && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, marginTop: 20 }}>MONTE CARLO METHODOLOGY</div>
          <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: c.monteCarlo }} />
        </>
      )}

      {/* Cross-Domain Connections */}
      {c.crossDomain && c.crossDomain.length > 0 && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, marginTop: 20 }}>CROSS-DOMAIN CONNECTIONS</div>
          {c.crossDomain.map((cd, i) => (
            <div key={i} style={{ marginBottom: 12, padding: "10px 16px", background: "rgba(34,211,238,0.03)", border: `1px solid rgba(34,211,238,0.1)`, borderRadius: 6 }}>
              <div style={{ fontFamily: M, fontSize: 12, color: CYAN, marginBottom: 6 }}>{cd.domain}</div>
              <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }}>{cd.connection}</div>
            </div>
          ))}
        </>
      )}

      {/* Methodology */}
      {c.methodology && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, marginTop: 20 }}>METHODOLOGY</div>
          <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: c.methodology }} />
        </>
      )}

      {/* Literature Context */}
      {c.literatureContext && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, marginTop: 20 }}>LITERATURE CONTEXT</div>
          <div style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: c.literatureContext }} />
        </>
      )}

      {c.faq && c.faq.length > 0 && (
        <>
          <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, marginTop: 20 }}>FAQ</div>
          {c.faq.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
        </>
      )}

      <AudioPlayer slug={paper.slug} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
        <LinkBadge label="SSRN" href={`https://papers.ssrn.com/sol3/papers.cfm?abstract_id=${paper.slug}`} />
        {paper.type === "domain" && (
          <LinkBadge label="Simulation Repo" href={`https://github.com/epostnieks/sapm-mc-${paper.slug}`} />
        )}
        <a href={`/pptx/${paper.slug}.pptx`} download style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 14px", background: "rgba(245,158,11,0.08)",
          border: `1px solid rgba(245,158,11,0.3)`, borderRadius: 4,
          color: GOLD, fontFamily: M, fontSize: 12, fontWeight: 600,
          textDecoration: "none", cursor: "pointer", transition: "background 0.2s",
        }}>
          Download PowerPoint
        </a>
      </div>
    </div>
  );
}

function PlaceholderContent({ paper }) {
  return (
    <div style={{ paddingTop: 16 }}>
      {paper.beta !== null && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
          <MCStatBox label="\u03B2W" value={paper.beta?.toFixed(2)} color={paper.beta >= 10 ? RED : GOLD} />
          <MCStatBox label="90% CI" value={paper.ci || "TBD"} color={DIM} />
          <MCStatBox label="\u0394W ($B/yr)" value={paper.dw ? `$${paper.dw.toLocaleString()}B` : "TBD"} color={RED} />
          <MCStatBox label="\u03A0 ($B/yr)" value={paper.pi ? `$${paper.pi.toLocaleString()}B` : "TBD"} color={GREEN} />
        </div>
      )}
      {paper.theoremName && (
        <div style={{ fontFamily: M, fontSize: 12, color: DIM, marginBottom: 12 }}>Theorem: {paper.theoremName}</div>
      )}
      <AudioPlayer slug={paper.slug} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
        <LinkBadge label="SSRN" href={`https://papers.ssrn.com/sol3/papers.cfm?abstract_id=${paper.slug}`} />
        {paper.type === "domain" && (
          <LinkBadge label="Simulation Repo" href={`https://github.com/epostnieks/sapm-mc-${paper.slug}`} />
        )}
      </div>
    </div>
  );
}

function AudioPlayer({ slug }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); }
  };

  const seek = (e) => {
    if (!ref.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    ref.current.currentTime = pct * duration;
  };

  return (
    <div style={{
      marginTop: 20, padding: "14px 16px",
      background: "rgba(245,158,11,0.04)",
      border: `1px solid rgba(245,158,11,0.2)`, borderRadius: 6,
    }}>
      <div style={{ fontFamily: M, fontSize: 10, color: GOLD, letterSpacing: 2, marginBottom: 10 }}>
        AUDIOCAST — ~75 MIN
      </div>
      <audio
        ref={ref}
        src={`/audio/${slug}.m4a`}
        onLoadedMetadata={() => { setDuration(ref.current.duration); setLoaded(true); }}
        onTimeUpdate={() => setProgress(ref.current.currentTime / (ref.current.duration || 1))}
        onEnded={() => setPlaying(false)}
        preload="metadata"
      />
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Play/Pause button */}
        <button onClick={toggle} style={{
          width: 36, height: 36, borderRadius: "50%", border: `1px solid rgba(245,158,11,0.4)`,
          background: "rgba(245,158,11,0.1)", color: GOLD, cursor: "pointer",
          fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {playing ? "⏸" : "▶"}
        </button>
        {/* Progress bar */}
        <div style={{ flex: 1 }}>
          <div
            onClick={seek}
            style={{
              height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2,
              cursor: "pointer", position: "relative",
            }}
          >
            <div style={{
              position: "absolute", left: 0, top: 0, height: "100%",
              width: `${progress * 100}%`, background: GOLD, borderRadius: 2,
              transition: "width 0.5s linear",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontFamily: M, fontSize: 10, color: MUTED }}>
            <span>{fmt(ref.current?.currentTime)}</span>
            <span>{loaded ? fmt(duration) : "loading..."}</span>
          </div>
        </div>
        {/* Download */}
        <a href={`/audio/${slug}.m4a`} download style={{
          fontFamily: M, fontSize: 10, color: GOLD, letterSpacing: 1,
          padding: "5px 10px", background: "rgba(245,158,11,0.08)",
          border: `1px solid rgba(245,158,11,0.2)`, borderRadius: 4,
          textDecoration: "none", flexShrink: 0,
        }}>
          ↓ M4A
        </a>
      </div>
    </div>
  );
}

function LinkBadge({ label, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      fontFamily: M, fontSize: 11, letterSpacing: 1, color: GOLD,
      padding: "6px 14px", background: "rgba(245,158,11,0.08)",
      border: `1px solid rgba(245,158,11,0.2)`, borderRadius: 4,
      textDecoration: "none", cursor: "pointer",
    }}>
      {label}
    </a>
  );
}

export default function PaperPage({ slug }) {
  const allPapers = useMemo(() => buildPaperList(MERGED_CONTENT || PAPER_CONTENT), []);
  const paper = allPapers.find(p => p.slug === slug);

  if (!paper) {
    return (
      <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px 80px" }}>
          <h1 style={{ fontFamily: S, fontSize: 28, fontWeight: 300, color: TEXT }}>Paper not found</h1>
          <p style={{ fontFamily: S, fontSize: 16, color: MUTED }}>The paper "{slug}" does not exist in the System Asset Pricing Model collection.</p>
        </main>
      </div>
    );
  }

  const badgeColor = getTheoremBadgeColor(paper.theoremType);
  const domainPapers = allPapers.filter(p => p.type === "domain" && p.beta !== null).sort((a, b) => b.beta - a.beta);
  const rank = domainPapers.findIndex(p => p.id === paper.id) + 1;

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>
        {/* Header */}
        <div style={{ paddingTop: 72, marginBottom: 32 }}>
          {/* Breadcrumb */}
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginBottom: 16 }}>
            <a href="/summaries/" style={{ color: GOLD, textDecoration: "none" }}>Paper Summaries</a>
            <span style={{ margin: "0 8px" }}>/</span>
            <span>{paper.shortName || paper.name}</span>
          </div>

          {/* Type badge + rank */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{
              fontFamily: M, fontSize: 10, letterSpacing: 1, fontWeight: 700,
              color: badgeColor, background: badgeColor + "15",
              padding: "3px 10px", borderRadius: 3,
              border: `1px solid ${badgeColor}30`,
            }}>
              {paper.theoremType?.toUpperCase()}
            </span>
            {rank > 0 && (
              <span style={{ fontFamily: M, fontSize: 11, color: MUTED }}>
                #{rank} of 61 by \u03B2W
              </span>
            )}
            <span style={{ fontFamily: M, fontSize: 11, color: MUTED }}>
              Paper #{paper.paperNumber}
            </span>
          </div>

          <h1 style={{
            fontFamily: S, fontSize: 32, fontWeight: 300, color: TEXT,
            margin: "0 0 12px", lineHeight: 1.3,
          }}>
            {paper.name}
          </h1>

          <p style={{
            fontFamily: S, fontSize: 17, color: DIM, lineHeight: 1.7,
            margin: 0, maxWidth: 750,
          }}>
            {paper.summary}
          </p>
        </div>

        {/* Content */}
        {paper.content ? <FullContent paper={paper} /> : <PlaceholderContent paper={paper} />}

        {/* Related Papers */}
        {paper.type === "domain" && (() => {
          const related = allPapers
            .filter(p => p.type === "domain" && p.slug !== paper.slug && p.beta)
            .sort((a, b) => Math.abs((a.beta || 0) - (paper.beta || 0)) - Math.abs((b.beta || 0) - (paper.beta || 0)))
            .slice(0, 4);
          return related.length > 0 ? (
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
              <div style={{ fontFamily: M, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 14 }}>RELATED BY WELFARE BETA</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {related.map(r => (
                  <a key={r.slug} href={`/papers/${r.slug}/`} style={{
                    padding: "12px 16px", background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${BORDER}`, borderRadius: 4, textDecoration: "none",
                    display: "block",
                  }}>
                    <div style={{ fontFamily: M, fontSize: 12, color: r.beta >= 10 ? RED : GOLD, fontWeight: 700 }}>
                      {"\u03B2"}W = {r.beta}
                    </div>
                    <div style={{ fontFamily: S, fontSize: 14, color: TEXT, marginTop: 4, lineHeight: 1.4 }}>
                      {r.shortName || r.name}
                    </div>
                    <div style={{ fontFamily: M, fontSize: 10, color: MUTED, marginTop: 4 }}>
                      {r.theoremType}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : null;
        })()}

        {/* Footer */}
        <div style={{ padding: "32px 0", borderTop: `1px solid ${BORDER}`, textAlign: "center", marginTop: 24 }}>
          <div style={{ fontFamily: M, fontSize: 11, color: MUTED }}>
            {"\u00A9"} 2026 Erik Postnieks {"\u00B7"} Independent Researcher {"\u00B7"} Salt Lake City
          </div>
        </div>
      </main>
    </div>
  );
}
