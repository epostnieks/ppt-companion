import { useState, useRef } from "react";
import PPTCompanion from './ppt-companion'
import Curriculum from './Curriculum'
import SAPMNav from "./SAPMNav";
import SAPMTables from "./SAPMTables";
import ProgramDashboard from "./ProgramDashboard";
import AcademicHub from "./AcademicHub";
import ImpossibilityTheorems from "./ImpossibilityTheorems";
import PolicyLab from "./PolicyLab";
import PSTBreaker from "./PSTBreaker";
import ExecutiveBrief from "./ExecutiveBrief";
import SovereignBrief from "./SovereignBrief";
import AboutAuthor from "./AboutAuthor";

const NAV_BTN = {
  fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#F59E0B",
  background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)",
  padding: "6px 14px", borderRadius: 4, cursor: "pointer", letterSpacing: 1,
};

export default function App() {
  const [view, setView] = useState("dashboard");
  const deepDiveRef = useRef(null);

  const BackBtn = ({ label = "← DASHBOARD" }) => (
    <div style={{ position: "fixed", top: 12, left: 16, zIndex: 999, display: "flex", gap: 8 }}>
      <button onClick={() => setView("dashboard")} style={NAV_BTN}>{label}</button>
    </div>
  );

  if (view === "dashboard") {
    return (
      <>
        <ProgramDashboard onNavigate={setView} />
        <SAPMNav />
      </>
    );
  }

  if (view === "curriculum") {
    return (
      <>
        <BackBtn />
        <Curriculum onDeepDive={() => setView("deepdive")} onTables={() => setView("tables")} />
        <SAPMNav />
      </>
    );
  }

  if (view === "deepdive") {
    return (
      <>
        <BackBtn />
        <PPTCompanion />
        <SAPMNav />
      </>
    );
  }

  if (view === "tables") {
    return (
      <>
        <BackBtn />
        <SAPMTables />
        <SAPMNav />
      </>
    );
  }

  if (view === "academic") {
    return (
      <>
        <BackBtn />
        <AcademicHub />
        <SAPMNav />
      </>
    );
  }

  if (view === "impossibility") {
    return (
      <>
        <BackBtn />
        <ImpossibilityTheorems />
        <SAPMNav />
      </>
    );
  }

  if (view === "policylab") {
    return (
      <>
        <BackBtn />
        <PolicyLab />
        <SAPMNav />
      </>
    );
  }

  if (view === "pstbreaker") {
    return (
      <>
        <BackBtn />
        <PSTBreaker />
        <SAPMNav />
      </>
    );
  }

  if (view === "executive") {
    return (
      <>
        <BackBtn />
        <ExecutiveBrief />
        <SAPMNav />
      </>
    );
  }

  if (view === "sovereign") {
    return (
      <>
        <BackBtn />
        <SovereignBrief />
        <SAPMNav />
      </>
    );
  }

  if (view === "about") {
    return (
      <>
        <BackBtn />
        <AboutAuthor />
        <SAPMNav />
      </>
    );
  }

  // Fallback
  return (
    <>
      <ProgramDashboard onNavigate={setView} />
      <SAPMNav />
    </>
  );
}
