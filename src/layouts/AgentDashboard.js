// AgentDashboard.jsx
import { useState } from "react";
import AgentToggleButton from "../components/ui/kozmoAgent/AgentToggleButton";
import AgentActivitySummery from "../components/ui/kozmoAgent/AgentActivitySummery";
import ActivityDetailGraph from "../components/ui/kozmoAgent/ActivityDetailGraph";
import ActivityDetails from "../components/ui/kozmoAgent/ActivityDetails";
import { Container, ScrollArea } from "../style/AgentDashboardStyle";

function AgentDashboard() {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="center-item">
      <Container>
        {/* Sticky header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            background: "#F9F6FD",
          }}
        >
            <div>
                <AgentToggleButton activeId={activeId} setActiveId={setActiveId} />
            </div>
         
        </div>

        {/* Scrollable area */}
        {/* <ScrollArea> */}
          {activeId === 1 ? (
            <div className="center-item">
                <div>
              <AgentActivitySummery />
              <ActivityDetailGraph />
              </div>
            </div>
          ) : (
            <ActivityDetails />
          )}
        {/* </ScrollArea> */}
      </Container>
    </div>
  );
}

export default AgentDashboard;
