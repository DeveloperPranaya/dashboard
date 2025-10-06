import  { useState, useEffect } from "react";
import ContractHeader from "../components/ui/contractheader";
import GenericListItem from "../components/ui/listItem";
import { MainContainer, ListItemContainer } from "../style/upcomingObligationStyle";
import { CounterPartyToolContainer, CounterpartToolbar } from "../style/counterpartyStyle";
import Button from "../components/ui/Button.js";
import { obligations, obligationStatusApi } from "../mockdata/mockdata";
import { ListFirstData } from "../style/itemListStyle.js";

function UpComingObligation({ upcomingObligation, businessAreaRead, selected }) {
  const obligationData = upcomingObligation ?.Data;
  const [filterbar, setFilterbar] = useState("All");
  const [activeBtn, setActiveBtn] = useState("All");
  const [filteredData, setFilteredData] = useState(obligationData || []);

  const onClickHandel = (data) => {
    setFilterbar(data.replaceAll(" ", ""));
    setActiveBtn(data);
  };

  // Filter and sort whenever filter changes or data changes
  useEffect(() => {
    const filtered = (obligationData || [])
      .filter(item => filterbar === "All" || item?.ObligationStatus === filterbar)
      .sort((a, b) => new Date(b.Created) - new Date(a.Created));
    setFilteredData(filtered);
  }, [filterbar, obligationData]);

  if(upcomingObligation && upcomingObligation.length === 0){
          return <div className="graph-skeleton large" />
        }

  return (
    <MainContainer className="renewaltype-container">
      <ListFirstData>
        <ContractHeader
          heading="Obligations"
          obligation
          desc="This section lists contractual obligations grouped by category. Use the filters to view upcoming, delayed, completed, partial, or canceled obligations"
        />
      </ListFirstData>

      <CounterpartToolbar>
        <div className="toolbar-counterparty">
          {obligations.map((value, key) => (
            <Button
              key={key}
              children={value.name}
              active={activeBtn === value.name}
              onClick={() => onClickHandel(value.name)}
            />
          ))}
        </div>
      </CounterpartToolbar>

      <CounterPartyToolContainer />

      <ListItemContainer>
        <GenericListItem
          data={filteredData} // Pass the filtered data here
          titleKey="ObligationTitle"
          status="ObligationStatus"
          dateKey="Created"
          dateLabel="Created on"
          ownerKey="ObligationOwner"
          ownerLabel="Owned by"
          descriptionKey="Description"
          descriptionLabel="Description"
          statusApi={obligationStatusApi}
          statusKey="obligationStatus"
          businessAreaRead={businessAreaRead}
          selected={selected}
        />
      </ListItemContainer>
    </MainContainer>
  );
}

export default UpComingObligation;

