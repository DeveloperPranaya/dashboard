import ContractHeader from "../components/ui/contractheader";
import GenericListItem from "../components/ui/listItem";
import { MainContainer, ListItemContainer } from "../style/upcomingObligationStyle";
import { CounterPartyToolContainer } from "../style/counterpartyStyle"
function UpcomingMilestone({ upComingMilestone }) {
  return (
    <MainContainer className="renewaltype-container">
      <ContractHeader heading="Upcoming Milestone" />
      <CounterPartyToolContainer />
      <ListItemContainer><GenericListItem
        data={upComingMilestone}
        titleKey="MilestoneTitle"
        statusKey="Priority"
        dateKey="MilestoneEndDate"
        dateLabel="Due by"
        ownerKey="MilestoneOwner"
        ownerLabel="Owned by"
        descriptionKey="ContractTitle"
        descriptionLabel="Description"
      />
      </ListItemContainer>
    </MainContainer>
  );
}

export default UpcomingMilestone