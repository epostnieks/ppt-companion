"use client";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "./i18n";

const M = "'JetBrains Mono',monospace";
const GOLD = "#F59E0B";
const SURFACE = "#1A1A1A";
const BORDER = "rgba(255,255,255,0.1)";
const TEXT = "#F5F0E8";
const MUTED = "rgba(255,255,255,0.35)";

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Set document direction for RTL languages
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div ref={ref} style={{ position: "relative", zIndex: 1000 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          fontFamily: M,
          fontSize: 13,
          color: GOLD,
          background: "rgba(245,158,11,0.06)",
          border: `1px solid rgba(245,158,11,0.15)`,
          padding: "6px 12px",
          borderRadius: 4,
          cursor: "pointer",
          letterSpacing: 1,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 14 }}>&#127760;</span>
        {current.native}
        <span style={{ fontSize: 11, opacity: 0.6 }}>{open ? "\u25B2" : "\u25BC"}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute",
          top: "100%",
          right: 0,
          marginTop: 4,
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 6,
          padding: "6px 0",
          minWidth: 220,
          maxHeight: 400,
          overflowY: "auto",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "8px 16px",
                background: lang.code === i18n.language ? "rgba(245,158,11,0.08)" : "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: M,
                fontSize: 14,
                color: lang.code === i18n.language ? GOLD : TEXT,
                textAlign: "left",
              }}
            >
              <span>{lang.native}</span>
              <span style={{ fontSize: 13, color: MUTED }}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
