import { useState } from "react";
import {
  AreaContainer,
  ListItemText,
} from "../../style/itemListStyle.js";

const OwnerDisplay = ({ owners = [], ownerLabel }) => {
  const [showAll, setShowAll] = useState(false);

  if (!owners || owners.length === 0) {
    return (
      <AreaContainer dynamicWidth="400px" style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "75px" }}>{ownerLabel} </div>
        <ListItemText>-</ListItemText>
      </AreaContainer>
    );
  }

  const firstTwo = owners.slice(0, 2);
  const remaining = owners.slice(2);

  return (
    <AreaContainer dynamicWidth="400px" style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: "75px" }}>{ownerLabel} </div>
      {firstTwo.map((owner, idx) => (
        <ListItemText key={idx} style={{ marginRight: "4px" }}>
          {owner}
        </ListItemText>
      ))}

      {remaining.length > 0 && !showAll && (
        <ListItemText
          style={{ color: "#6f42c1", cursor: "pointer" }}
          onClick={() => setShowAll(true)}
        >
          +{remaining.length} more
        </ListItemText>
      )}

      {showAll &&
        remaining.map((owner, idx) => (
          <ListItemText key={idx + 2} style={{ marginRight: "4px" }}>
            {owner}
          </ListItemText>
        ))}
    </AreaContainer>
  );
};

export default OwnerDisplay;
