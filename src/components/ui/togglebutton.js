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

const viewOptions = {
  graph: {
    icon: graphIcon,
    tooltip: "Graph",
    viewState: (filterbar) => ({ type: "graph", property: filterbar }),
  },
  table: {
    icon: tableSymbol,
    tooltip: "Table",
    viewState: () => ({ type: "table" }),
  },
  list: {
    icon: hamburger,
    tooltip: "List",
    viewState: (filterbar) => ({ type: "list", property: filterbar }),
  },
};

function ToggleButton({ setView, view, visibleButtons = [], filterbar }) {
  const renderButton = (type) => {
    const { icon, tooltip, viewState } = viewOptions[type];
    const isactive = view?.type === type;

    return (
      <Tooltip text={tooltip} key={type}>
        <Button
          iconOnly
          active={isactive}
          onClick={() => setView(viewState(filterbar))}
        >
          <img src={icon} alt={tooltip} className="graphicon" />
        </Button>
      </Tooltip>
    );
  };

  return (
    <ViewToggleContainer>
      {visibleButtons.map((type) => viewOptions[type] && renderButton(type))}
    </ViewToggleContainer>
  );
}

export default ToggleButton;
