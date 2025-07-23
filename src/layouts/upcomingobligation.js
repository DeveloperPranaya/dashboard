import ContractHeader from "../components/ui/contractheader";
import GenericListItem from "../components/ui/listItem";
import { MainContainer, ListItemContainer } from "../style/upcomingObligationStyle";
import { CounterPartyToolContainer } from "../style/counterpartyStyle";
import CommonDropdown from "../components/ui/CommonDropDown";
import {
  ListFirstData,
  CenterItem
} from "../style/itemListStyle.js";
import ItemList from "../components/ui/itemlist";

function UpComingObligation({ upcomingObligation }) {
    return (
        <MainContainer className="renewaltype-container">
            <ListFirstData >
                <ContractHeader heading="Obligations" obligation />
                <CenterItem>
                    <CommonDropdown
                        dynamicBackground="#ffffff"
                        dynamicBorder="1px solid #E7E7E8"
                        dynamicFont="14px"
                        dynamicweidht="400"
                        label="Choose Framework"
                        // options={dropdownData}
                        // onChange={handleDropdownChange}
                        name="framework"
                    />
                </CenterItem>
            </ListFirstData>

            <CounterPartyToolContainer />
            <ListItemContainer><GenericListItem
                data={upcomingObligation}
                titleKey="ObligationTitle"
                statusKey="ObligationStatus"
                dateKey="Created"
                dateLabel="Created on"
                ownerKey="ObligationOwner"
                ownerLabel="Owned by"
                descriptionKey="Description"
                descriptionLabel="Description"
            />
            </ListItemContainer>
        </MainContainer>
    )
}

export default UpComingObligation