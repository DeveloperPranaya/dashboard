import React, { useState } from "react";
import { useSelector } from 'react-redux';
import ContractHeader from "../components/ui/contractheader.js";
import { CounterpartToolbar } from "../style/counterpartyStyle.js";
import { recentActivity } from "../mockdata/mockdata.js";
import Button from "../components/ui/Button.js";
import { CounterPartyToolContainer } from "../style/counterpartyStyle.js";
import CircleImage from "../assets/images/contractstack/circle.png";
import { getTimeDifference, filterByLast48Hours, filterByLast14Days, filterByLast30Days} from "../commonFunction/commonfunction.js";
import { ListItemContainer } from "../style/upcomingObligationStyle";
import CommonDropdown from "../components/ui/CommonDropDown.js";
import {
  Container,
  ListData,
  ListFirstData,
  StatusDiv,
  AreaContainer,
  Setarator,
  ItemDescription,
  ListItemText,
  CenterItem
} from "../style/itemListStyle.js";

function RecentActivity() {
  const { data: cardContainer } = useSelector((state) => state.dashboard);
  const [activeBtn, setActiveBtn] = useState("Amendments");
  const [selected, setSelected] = useState('');
  const amendmentsData = cardContainer?.WG014?.Result?.Data || [];
  const issuesData = cardContainer?.WG015?.Result?.Data || [];
  const newContract = cardContainer?.WG016?.Result?.Data?.Contracts_New || [];
  const expiredContracts = cardContainer?.WG017?.Result?.Data?.Contracts_Expired || [];
  const dataMap = {
    Amendments: (selected === "Last 14 days" ? filterByLast48Hours(amendmentsData) :"Last 48 hours"? filterByLast14Days(amendmentsData) : "Last 1 month"? filterByLast30Days(amendmentsData): amendmentsData),
    Issues: (selected === "Last 14 days" ? filterByLast48Hours(issuesData) :"Last 48 hours"? filterByLast14Days(issuesData): "Last 1 month"? filterByLast30Days(issuesData) : issuesData),
    "New Contracts": (selected === "Last 14 days" ? filterByLast48Hours(newContract):"Last 48 hours"? filterByLast14Days(newContract): "Last 1 month"? filterByLast30Days(newContract) : newContract),
    "Expired Contracts": (selected === "Last 14 days" ? filterByLast48Hours(expiredContracts):"Last 48 hours"? filterByLast14Days(expiredContracts): "Last 1 month"? filterByLast30Days(expiredContracts) : expiredContracts),
  };

  const handleTabChange = (name) => setActiveBtn(name);

  const renderActivityItem = (value, key) => {
    const result = getTimeDifference(value.Created);
    return (
      <Container key={key}>
        <ListFirstData>
          <ListData style={{ marginTop: "4px" }}>
            <ItemDescription>
              <AreaContainer style={{ display: "flex" }}>
                <ListItemText>
                  {result.isExactDay
                    ? `${result.days} day${result.days !== 1 ? 's' : ''}`
                    : `${result.hours} hr. ${result.minutes} mins`}
                </ListItemText>
              </AreaContainer>
              <Setarator><img src={CircleImage} alt="dot" /></Setarator>
              <AreaContainer style={{ display: "flex" }}>
                <ListItemText>{value.AmendmentTitle}</ListItemText>
              </AreaContainer>
            </ItemDescription>
          </ListData>
          <StatusDiv>{value.Status}</StatusDiv>
        </ListFirstData>

        <ListFirstData style={{ marginTop: "4px" }}>
          <ListData>{value.BusinessArea}</ListData>
        </ListFirstData>

        <ListData style={{ marginTop: "4px" }}>
          <ItemDescription>
            <AreaContainer style={{ display: "flex" }}>
              Contract Title: <ListItemText>{value.ContractTitle}</ListItemText>
            </AreaContainer>
            <Setarator><img src={CircleImage} alt="dot" /></Setarator>
            <AreaContainer style={{ display: "flex" }}>
              <ListItemText>{value.RequestedBy}</ListItemText>
            </AreaContainer>
          </ItemDescription>
        </ListData>
        {/* <CounterPartyToolContainer style={{marginTop:"8px"}}/> */}
      </Container>
    );
  };

  const selectedData = dataMap[activeBtn];

  const dropdownData = ["Last 14 days", "Last 48 hours", "Last 1 month"]

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setSelected(e.target.value);
  };

  return (
    <div className="renewaltype-container">
      <ListFirstData >
        <ContractHeader heading="Recent Activity" />
        <CenterItem>
          <CommonDropdown
            dynamicBackground="#ffffff"
            dynamicBorder="1px solid #E7E7E8"
            dynamicFont="14px"
            dynamicweidht="400"
            label="Choose Framework"
            options={dropdownData}
            // selectedValue={selected}
            onChange={handleDropdownChange}
            // placeholder="Select a Business Area"
            name="framework"
          />
        </CenterItem>

      </ListFirstData>



      <CounterpartToolbar>
        <div className='toolbar-counterparty'>
          {recentActivity.map((item, key) => (
            <Button
              key={key}
              children={item.name}
              active={activeBtn === item.name}
              onClick={() => handleTabChange(item.name)}
            />
          ))}
        </div>
      </CounterpartToolbar>

      <CounterPartyToolContainer />
      <ListItemContainer dynamicHeight="360px">
        {selectedData && selectedData.map(renderActivityItem)}
      </ListItemContainer>

    </div>
  );
}

export default RecentActivity;
