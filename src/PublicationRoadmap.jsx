"use client";

import Link from "next/link";
import { PUBLICATION_DIRECTORY } from "./publicationDirectoryData";

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const BG = "#0D0D0D";
const SURFACE = "#1A1A1A";
const TEXT = "#F5F0E8";
const GOLD = "#F59E0B";
const MUTED = "#C8C8C8";
const BORDER = "rgba(255,255,255,0.1)";
const GREEN = "#22C55E";
const WAVE_1_EXTRA_SLUGS = new Set([
  "ppt",
  "disclosure-futility",
  "conflictoring",
  "accountability-reconstruction",
  "da-1",
  "fiscal-capture",
  "reform-dividend",
  "postnieks-law",
  "substitution-trap",
  "hart-stakeholder-welfare",
  "kraakman-functional-convergence",
  "porter-shared-value-welfare",
]);
const WAVE_1_EXCLUDED_CONTROL_SLUGS = new Set([
  "nuclear",
  "gig-economy",
]);

function LinkCell({ href, label }) {
  if (!href) return <span style={{ color: MUTED }}>To be determined</span>;
  return (
    <Link href={href} style={{ color: GOLD, textDecoration: "none", fontWeight: 600 }}>
      {label}
    </Link>
  );
}

function DirectoryTable({ title, items }) {
  return (
    <section style={{ marginTop: 40 }}>
      <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 12 }}>
        {title.toUpperCase()} · {items.length}
      </div>
      <div style={{ overflowX: "auto", border: `1px solid ${BORDER}`, borderRadius: 4 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 840 }}>
          <thead>
            <tr style={{ background: "rgba(245,158,11,0.08)" }}>
              {["Rank", "Kind", "Title", "Status", "Target", "SSRN", "Website"].map(h => (
                <th key={h} style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  fontFamily: M,
                  fontSize: 11,
                  color: GOLD,
                  letterSpacing: 1,
                  borderBottom: `1px solid ${BORDER}`,
                  whiteSpace: "nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={`${title}-${item.slug}`} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <td style={{ padding: "10px 12px", fontFamily: M, fontSize: 13, color: TEXT, width: 64 }}>
                  {item.rank}
                </td>
                <td style={{ padding: "10px 12px", fontFamily: M, fontSize: 11, color: GOLD, whiteSpace: "nowrap" }}>
                  {item.kind === "SAPM" ? "Applied Domain" : item.kind}
                </td>
                <td style={{ padding: "10px 12px", fontFamily: S, fontSize: 16, color: TEXT, minWidth: 280 }}>
                  {item.name}
                  {item.blocker && (
                    <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginTop: 3 }}>
                      {item.blocker}
                    </div>
                  )}
                </td>
                <td style={{ padding: "10px 12px", fontFamily: M, fontSize: 11, color: item.status === "Done" ? GREEN : MUTED, whiteSpace: "nowrap" }}>
                  {item.status}
                </td>
                <td style={{ padding: "10px 12px", fontFamily: M, fontSize: 11, color: MUTED, minWidth: 160 }}>
                  {item.journal || item.category || "To be determined"}
                </td>
                <td style={{ padding: "10px 12px", fontFamily: M, fontSize: 11, whiteSpace: "nowrap" }}>
                  <LinkCell href={item.ssrnUrl} label="SSRN" />
                </td>
                <td style={{ padding: "10px 12px", fontFamily: M, fontSize: 11, whiteSpace: "nowrap" }}>
                  <LinkCell href={item.webPath} label="Web page" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function PublicationRoadmap() {
  const { papers } = PUBLICATION_DIRECTORY;
  const launchSlate = papers.filter(p => (p.kind === "SAPM" && !WAVE_1_EXCLUDED_CONTROL_SLUGS.has(p.slug)) || WAVE_1_EXTRA_SLUGS.has(p.slug));

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: S }}>
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px 88px" }}>
        <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 4, marginBottom: 12 }}>
          PUBLICATION ROADMAP
        </div>
        <h1 style={{ fontFamily: S, fontSize: 38, fontWeight: 300, color: TEXT, margin: "0 0 14px", lineHeight: 1.2 }}>
          Publication Launch Slate
        </h1>
        <p style={{ fontFamily: S, fontSize: 21, color: TEXT, lineHeight: 1.65, maxWidth: 900, margin: "0 0 18px" }}>
          This research program develops a formal framework for identifying when private optimization excludes system
          welfare, then applies it first to a curated set of high-leverage domains where that failure can be made
          actionable.
        </p>
        <p style={{ fontFamily: S, fontSize: 19, color: MUTED, lineHeight: 1.7, maxWidth: 880, margin: "0 0 18px" }}>
          This is the public Wave 1 launch slate: 59 applied domain studies documenting market failures where private
          optimization destroys system welfare, nine foundational and bridge papers, and three critical scholar bridge
          papers. Rank represents strategic contribution to the research program, source-backed uniqueness, public-policy
          leverage, corpus propagation value, readiness burden, and scoop risk.
        </p>
        <p style={{ fontFamily: S, fontSize: 17, color: MUTED, lineHeight: 1.65, maxWidth: 880, margin: "0 0 18px" }}>
          SSRN serves as the dated preprint and priority registry, so it contains numerous working-paper drafts beyond
          this slate. This page is the curated publication sequence: the first wave to read, cite, revise, and submit.
          Later-wave papers can displace earlier candidates if they have stronger uniqueness, policy leverage, source
          quality, readiness, or scoop-risk urgency. Books are announced only when they are published or ready for a
          public launch.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          marginTop: 22,
        }}>
          {[
            ["Wave 1 Slate", launchSlate.length],
            ["Pages Live", launchSlate.filter(p => p.webPath).length],
            ["SSRN", "Priority registry"],
            ["Future Waves", "Release date TBD"],
          ].map(([label, value]) => (
            <div key={label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderTop: `3px solid ${GOLD}`, borderRadius: 4, padding: 16 }}>
              <div style={{ fontFamily: M, fontSize: 24, color: GOLD, fontWeight: 700 }}>{value}</div>
              <div style={{ fontFamily: M, fontSize: 11, color: MUTED, marginTop: 4 }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <DirectoryTable title="Wave 1 Papers" items={launchSlate} />

        <p style={{ fontFamily: S, fontSize: 16, color: MUTED, lineHeight: 1.65, maxWidth: 880, margin: "28px 0 0" }}>
          Behind this public launch slate is a larger source-first research backlog of candidate applications,
          jurisdictional extensions, scholar bridges, and policy translations. Most candidates will not become public
          papers; the backlog exists to rank, test, and select the highest-value contributions.
        </p>
      </main>
    </div>
  );
}
