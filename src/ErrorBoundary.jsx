"use client";
import { Component } from "react";

const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";
const GOLD = "#F59E0B";
const SURFACE = "#1A1A1A";
const TEXT = "#F5F0E8";
const DIM = "#C8C8C8";
const BORDER = "rgba(255,255,255,0.1)";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: "100vh", background: "#0D0D0D", padding: 32,
        }}>
          <div style={{
            maxWidth: 520, padding: "40px 48px", background: SURFACE,
            border: `1px solid ${BORDER}`, borderRadius: 4, textAlign: "center",
          }}>
            <div style={{ fontFamily: M, fontSize: 12, color: GOLD, letterSpacing: 3, marginBottom: 16 }}>
              SYSTEM ERROR
            </div>
            <h1 style={{ fontFamily: S, fontSize: 24, fontWeight: 300, color: TEXT, margin: "0 0 16px" }}>
              Something went wrong
            </h1>
            <p style={{ fontFamily: S, fontSize: 15, color: DIM, lineHeight: 1.7, margin: "0 0 24px" }}>
              The application encountered an unexpected error. Reload the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                fontFamily: M, fontSize: 13, color: "#0D0D0D", background: GOLD,
                border: "none", borderRadius: 4, padding: "10px 24px", cursor: "pointer",
                letterSpacing: 1,
              }}
            >
              RELOAD
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
