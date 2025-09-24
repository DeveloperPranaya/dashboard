import React, { useState } from "react"
import ContractHeader from "../components/ui/contractheader";
import GenericListItem from "../components/ui/listItem";
import { MainContainer, ListItemContainer } from "../style/upcomingObligationStyle";
import { CounterPartyToolContainer } from "../style/counterpartyStyle";
import { CounterpartToolbar } from "../style/counterpartyStyle";
import { upcomingMileStone, mileStoneStatusApi } from "../mockdata/mockdata";
import Button from "../components/ui/Button.js";
import { ToastContainer } from "react-toastify";
function UpcomingMilestone({ upComingMilestone, businessAreaRead, selected }) {
  const mileStoneData = upComingMilestone?.Data;
  const [filterbar, setFilterbar] = useState("All");
  const [activeBtn, setActiveBtn] = useState("All");
  const onClickHandel = (data) => {
    setFilterbar(data.replaceAll(" ", ""))
    setActiveBtn(data);
  }

  if (upComingMilestone && upComingMilestone.length === 0) {
    return <div className="graph-skeleton large" />
  }

  const filterItem = mileStoneData && mileStoneData.filter(data => {
    return filterbar === "All" || data?.MilestoneStatus === filterbar;
  }).sort((a, b) => new Date(b.Created) - new Date(a.Created));

  return (
    <MainContainer className="renewaltype-container">
      <ContractHeader heading="Upcoming Milestone" desc="Displays key upcoming dates and deadlines defined in contracts.  Filter by milestone status" />
      <CounterpartToolbar>
        <div className='toolbar-counterparty'>
          {upcomingMileStone.map((value, key) => {
            return <Button children={value.name} active={activeBtn === value.name} key={key} onClick={() => onClickHandel(value.name)} />
          }
          )}
        </div>
      </CounterpartToolbar>
      <CounterPartyToolContainer />
      <ListItemContainer><GenericListItem
        data={filterItem}
        titleKey="MilestoneTitle"
        status="MilestoneStatus"
        dateKey="MilestoneEndDate"
        dateLabel="Due by"
        ownerKey="MilestoneOwner"
        ownerLabel="Owned by"
        descriptionKey="ContractTitle"
        descriptionLabel="Description"
        statusApi={mileStoneStatusApi}
        statusKey="milestoneStatus"
         businessAreaRead={businessAreaRead}
          selected={selected}
      />
      </ListItemContainer>
      <ToastContainer
        toastClassName="toast-custom"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </MainContainer>

  );
}

export default UpcomingMilestone