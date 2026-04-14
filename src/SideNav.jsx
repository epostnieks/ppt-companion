"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "./LanguageSelector";
import GlobalSearch from "./GlobalSearch";

// ══════════════════════════════════════════════════════════════
// SIDE NAV — Persistent left-margin navigation
// ══════════════════════════════════════════════════════════════

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const BG = "#0A0A0F";
const GOLD = "#F59E0B";
const MUTED = "rgba(255,255,255,0.3)";
const DIM = "rgba(255,255,255,0.5)";
const TEXT = "rgba(255,255,255,0.85)";
const BORDER = "rgba(255,255,255,0.06)";

// Map view IDs to URL paths
const VIEW_PATHS = {
  dashboard: "/",
  curriculum: "/curriculum",
  deepdive: "/deep-dive",
  summaries: "/summaries",
  tables: "/tables",
  academic: "/academic",
  impossibility: "/impossibility",
  policylab: "/policylab",
  pstbreaker: "/pst-breaker",
  executive: "/executive",
  sovereign: "/sovereign",
  about: "/about",
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", section: "home" },
  { id: "divider-1", divider: true, section: "learn" },
  { id: "curriculum", label: "Curriculum", desc: "15 chapters · 4 hours", section: "learn" },
  { id: "deepdive", label: "Interactive Deep Dive", desc: "Welfare beta explorer", section: "learn" },
  { id: "summaries", label: "Paper Summaries", desc: "75 papers distilled", section: "learn" },
  { id: "divider-2", divider: true, section: "data" },
  { id: "tables", label: "Domain Tables", desc: "61 domains ranked", section: "data" },
  { id: "academic", label: "Academic Hub", desc: "Propositions & falsification", section: "data" },
  { id: "impossibility", label: "Impossibility Canon", desc: "17 prior + 23 new (PPT + 22 domains)", section: "data" },
  { id: "divider-3", divider: true, section: "policy" },
  { id: "policylab", label: "PolicyLab", desc: "190 countries, 61 domains", section: "policy" },
  { id: "pstbreaker", label: "Country Reform Paths", desc: "190 countries, proven models", section: "policy" },
  { id: "executive", label: "Executive Brief", desc: "Corporate exposure", section: "policy" },
  { id: "sovereign", label: "Sovereign Brief", desc: "National policy", section: "policy" },
  { id: "divider-4", divider: true, section: "about" },
  { id: "about", label: "About the Author", section: "about" },
];

const SECTION_LABELS = {
  learn: "LEARN",
  data: "DATA & THEOREMS",
  policy: "POLICY & STRATEGY",
  about: "AUTHOR",
};

export default function SideNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Determine active view from pathname
  const currentView = Object.entries(VIEW_PATHS).find(
    ([, path]) => pathname === path || pathname === path + "/"
  )?.[0] || "dashboard";

  const navContent = (
    <nav style={{
      width: 220,
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      background: BG,
      borderRight: `1px solid ${BORDER}`,
      overflowY: "auto",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Logo / Title */}
      <Link
        href="/"
        onClick={() => setMobileOpen(false)}
        style={{
          padding: "20px 16px 16px",
          borderBottom: `1px solid ${BORDER}`,
          cursor: "pointer",
          textDecoration: "none",
          display: "block",
        }}
      >
        <div style={{ fontFamily: M, fontSize: 10, color: GOLD, letterSpacing: 3, marginBottom: 4 }}>
          System Asset Pricing Model PROGRAM
        </div>
        <div style={{ fontFamily: S, fontSize: 15, color: TEXT, fontWeight: 300 }}>
          System Asset Pricing Model
        </div>
        <div style={{ fontFamily: M, fontSize: 9, color: MUTED, marginTop: 4 }}>
          Erik Postnieks · 2026
        </div>
      </Link>

      {/* Search */}
      <div style={{ padding: "10px 12px 4px" }}>
        <GlobalSearch />
      </div>

      {/* Nav Items */}
      <div style={{ flex: 1, padding: "8px 0" }}>
        {NAV_ITEMS.map((item) => {
          if (item.divider) {
            const label = SECTION_LABELS[item.section];
            return (
              <div key={item.id} style={{
                padding: "16px 16px 6px",
                fontFamily: M,
                fontSize: 9,
                color: GOLD,
                letterSpacing: 2,
              }}>
                {label}
              </div>
            );
          }

          const active = currentView === item.id;
          const href = VIEW_PATHS[item.id] || "/";
          return (
            <Link
              key={item.id}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                width: "100%",
                padding: "8px 16px",
                background: active ? "rgba(245,158,11,0.08)" : "transparent",
                borderLeft: active ? `2px solid ${GOLD}` : "2px solid transparent",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              <div style={{
                fontFamily: M,
                fontSize: 12,
                color: active ? GOLD : DIM,
                fontWeight: active ? 600 : 400,
                lineHeight: 1.3,
              }}>
                {item.label}
              </div>
              {item.desc && (
                <div style={{
                  fontFamily: M,
                  fontSize: 9,
                  color: active ? "rgba(245,158,11,0.5)" : MUTED,
                  marginTop: 2,
                }}>
                  {item.desc}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Language Selector */}
      <div style={{ padding: "8px 16px", borderTop: `1px solid ${BORDER}` }}>
        <LanguageSelector />
      </div>

      {/* Footer */}
      <div style={{
        padding: "12px 16px",
        borderTop: `1px solid ${BORDER}`,
        fontFamily: M,
        fontSize: 9,
        color: MUTED,
        textAlign: "center",
      }}>
        75 papers · 62 theorems · 3M+ words
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <div style={{ display: "block" }} className="sidenav-desktop">
        {navContent}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="sidenav-mobile-toggle"
        style={{
          display: "none", // shown via CSS media query
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 1001,
          width: 40,
          height: 40,
          borderRadius: 4,
          background: mobileOpen ? GOLD : "rgba(245,158,11,0.15)",
          border: `1px solid rgba(245,158,11,0.3)`,
          color: mobileOpen ? "#0A0A0F" : GOLD,
          fontFamily: M,
          fontSize: 16,
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {mobileOpen ? "\u2715" : "\u2261"}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 220,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}

      {/* Inject responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .sidenav-desktop > nav {
            transform: translateX(-100%);
            transition: transform 0.2s ease;
          }
          .sidenav-mobile-toggle {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          .sidenav-desktop > nav {
            ${mobileOpen ? "transform: translateX(0) !important;" : ""}
          }
        }
      `}</style>
    </>
  );
}

export const SIDEBAR_WIDTH = 220;
