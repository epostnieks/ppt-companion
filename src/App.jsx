import { useState } from "react";
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
import PaperSummaries from "./PaperSummaries";
import SideNav, { SIDEBAR_WIDTH } from "./SideNav";

export default function App() {
  const [view, setView] = useState("dashboard");

  const renderContent = () => {
    switch (view) {
      case "dashboard":
        return <ProgramDashboard onNavigate={setView} />;
      case "curriculum":
        return <Curriculum onDeepDive={() => setView("deepdive")} onTables={() => setView("tables")} />;
      case "deepdive":
        return <PPTCompanion />;
      case "tables":
        return <SAPMTables />;
      case "academic":
        return <AcademicHub />;
      case "impossibility":
        return <ImpossibilityTheorems />;
      case "policylab":
        return <PolicyLab />;
      case "pstbreaker":
        return <PSTBreaker />;
      case "executive":
        return <ExecutiveBrief />;
      case "sovereign":
        return <SovereignBrief />;
      case "summaries":
        return <PaperSummaries />;
      case "about":
        return <AboutAuthor />;
      default:
        return <ProgramDashboard onNavigate={setView} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0D0D0D" }}>
      <SideNav currentView={view} onNavigate={setView} />
      <div className="sapm-main-content" style={{
        marginLeft: SIDEBAR_WIDTH,
        flex: 1,
        minWidth: 0,
      }}>
        {renderContent()}
        <SAPMNav />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sapm-main-content {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
