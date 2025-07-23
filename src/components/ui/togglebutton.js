import styled from 'styled-components';
import graphIcon from "../../assets/images/navbar/graphIcon.png";
import tableSymbol from "../../assets/images/navbar/tableSymbol.png";
import hamburger from "../../assets/images/navbar/hamburger.png";
import Tooltip from "./tooltip";
import Button from "./Button";

const ViewToggleContainer = styled.div`
  gap: 2px;
  background-color: #F1F1F2;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

function ToggleButton({ clickHandle, setView, view, visibleButtons, filterbar }) {

  return (
    <ViewToggleContainer>
      {visibleButtons && visibleButtons.includes("graph") && (
        <Tooltip text="Graph">
          <Button
            iconOnly
            active={view?.type === "graph"}
            onClick={() => setView({ type: "graph", property: filterbar })}
          >
            <img src={graphIcon} alt="Chart" className="graphicon" />
          </Button>
        </Tooltip>
      )}

      {visibleButtons && visibleButtons.includes("table") && (
        <Tooltip text="Table">
          <Button
            iconOnly
            active={view?.type === "table"}
            onClick={() => setView({ type: "table" })}
          >
            <img src={tableSymbol} alt="Table" className="graphicon" />
          </Button>
        </Tooltip>
      )}

      {visibleButtons && visibleButtons.includes("list") && (
        <Tooltip text="List">
          <Button
            iconOnly
            active={view?.type === "list"}
            onClick={() => setView({ type: "list", property: filterbar })}
          >
            <img src={hamburger} alt="List" className="graphicon" />
          </Button>
        </Tooltip>
      )}
    </ViewToggleContainer>
  );
}

export default ToggleButton;
