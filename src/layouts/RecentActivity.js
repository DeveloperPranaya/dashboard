import { useState, useEffect } from "react";
import ContractHeader from "../components/ui/contractheader.js";
import { CounterpartToolbar } from "../style/counterpartyStyle.js";
import { recentActivity, ITEMS_PER_PAGE } from "../mockdata/mockdata.js";
import Button from "../components/ui/Button.js";
import { CounterPartyToolContainer } from "../style/counterpartyStyle.js";
import CircleImage from "../assets/images/contractstack/circle.png";
import { ListItemContainer } from "../style/upcomingObligationStyle";
import CommonDropdown from "../components/ui/CommonDropDown.js";
import NoDataAvailable from "../components/ui/NoDataAvailable.js";
import Pagination from "../components/ui/Pagination.js";
import OverflowTooltip from "../components/ui/OverflowTooltip.js";
import {
  Container,
  ListData,
  ListFirstData,
  StatusDiv,
  AreaContainer,
  Setarator,
  ItemDescription,
  CenterItem,
  ListItemTextData,
} from "../style/itemListStyle.js";

function RecentActivity({ dataMap, setSelectedData, amendementData, issueData, newContract, expiredContract }) {
  
  const [loading, setLoading] = useState(true);

  const [activeBtn, setActiveBtn] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const selectedData = dataMap[activeBtn];
  const sortedData = [...selectedData].sort((a, b) => new Date(b.Created) - new Date(a.Created));
  const totalPages = Math.ceil((sortedData?.length || 0) / ITEMS_PER_PAGE);
  const paginatedData = sortedData?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ) || [];

  const handleTabChange = (name) => {
    setActiveBtn(name);
    setCurrentPage(1);
  };

  function getDurationFromNow(isoDate) {
    const now = new Date();
    const targetDate = new Date(isoDate);
    const diffMs = now - targetDate;
    if (diffMs < 0) return 'In the future';
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalDays = Math.floor(totalMinutes / 1440);
    const years = Math.floor(totalDays / 360);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else if (totalDays > 0) {
      return `${totalDays} day${totalDays > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hr.`;
    } else if (minutes > 0) {
      return `${minutes} mins`;
    } else {
      return `${seconds} sec${seconds !== 1 ? 's' : ''}`;
    }
  }

  useEffect(() => {
    if (
      dataMap?.All?.length > 0 ||
      dataMap?.Amendments?.length > 0 ||
      dataMap?.Issues?.length > 0 ||
      dataMap?.["New Contracts"]?.length > 0 ||
      dataMap?.["Expired Contracts"]?.length > 0
    ) {
      // Data arrived → stop loading immediately
      setLoading(false);
    } else {
      // Start with skeleton, after e.g. 2s decide if no data
      const timer = setTimeout(() => {
        setLoading(false);
      }, 10000); // adjust delay if needed

      return () => clearTimeout(timer);
    }
  }, [dataMap]);

  // if (loading) {
  //   return <div className="graph-skeleton large" />;
  // }

  // const noData =
  //   dataMap?.All?.length === 0 &&
  //   dataMap?.Amendments?.length === 0 &&
  //   dataMap?.Issues?.length === 0 &&
  //   dataMap?.["New Contracts"]?.length === 0 &&
  //   dataMap?.["Expired Contracts"]?.length === 0;

  // if (noData) {
  //   return <NoDataAvailable />;
  // }





  // if (dataMap && dataMap?.All?.length === 0 && dataMap?.Issues?.length === 0 && dataMap?.Amendments?.length === 0 && dataMap?.["New Contracts"]?.length === 0 &&
  // dataMap?.["Expired Contracts"]?.length === 0  ) {
  //   return <div className="graph-skeleton large" />
  // }



  const renderActivityItem = (value, key) => {
    const result = getDurationFromNow(value.Created);
    return (
      <>
        <Container key={key} >
          <ListFirstData>
            <ListData style={{ marginTop: "4px" }}>
              <ItemDescription>
                <AreaContainer style={{ display: "flex" }}>
                  <ListItemTextData>
                    <div>
                      {result} ago
                    </div>
                  </ListItemTextData>
                </AreaContainer>
                <Setarator><img src={CircleImage} alt="dot" /></Setarator>
                <AreaContainer style={{ display: "flex" }}>
                  <OverflowTooltip
                    text={value.AmendmentTitle ? value.AmendmentTitle : value.IssueName ? value.IssueName : value.BusinessArea}
                    maxWidth="300px"
                    customStyle={`font-size: 14px;line-height: 24px;font-weight: 700;`}
                  >
                    {value.AmendmentTitle ? value.AmendmentTitle : value.IssueName ? value.IssueName : value.BusinessArea}
                  </OverflowTooltip>
                </AreaContainer>
              </ItemDescription>
            </ListData>
            {value.AmendmentTitle ? <StatusDiv>Amendment</StatusDiv> : value.IssueName ? <StatusDiv>Issue</StatusDiv> : value.Status === "New" ? <StatusDiv>New</StatusDiv> : value.Status === "Expired" ? <StatusDiv>Expired</StatusDiv> : ""}
          </ListFirstData>

          <ListFirstData style={{ marginTop: "4px" }}>
            <ListData >{value.AmendmentType ? value.AmendmentType : value.IssueType ? value.IssueType : value.ContractTitle}</ListData>
          </ListFirstData>
          <ListFirstData style={{ marginTop: "4px" }}>
            <ListData >{(value.AmendmentTitle) && value.ContractTitle}</ListData>
          </ListFirstData>

          <ListData style={{ marginTop: "4px" }}>
            <ItemDescription>
              <AreaContainer style={{ display: "flex" }}>
                <ListItemTextData>{value.AmendmentTitle ? "Requested By" : "Created By"}  {value.ReportedBy || value.RequestedBy || value.CreatedBy || "-"}</ListItemTextData>
              </AreaContainer>
            </ItemDescription>
          </ListData>

        </Container>
      </>
    );
  };

  const dropdownData = ["All Activity", "Last 48 hours", "Last 14 days", "Last 1 month"]

  const handleDropdownChange = (e) => {
    setSelectedData(e.target.value);
  };

  return (
    <>
      <div className="renewaltype-container">
        <ListFirstData >
          <ContractHeader heading="Recent Activity"
            desc="Visualizes upcoming renewals categorized by business area and renewal type (e.g., Auto-renewal, Manual). Use the dropdown to select a different business area"
          />
          <CenterItem>
            <CommonDropdown
              dynamicBackground="#ffffff"
              dynamicBorder="1px solid #E7E7E8"
              dynamicFont="14px"
              dynamicfontWight="400"
              label="Choose Framework"
              options={dropdownData}
              onChange={handleDropdownChange}
              name="framework"
            />
          </CenterItem>
        </ListFirstData>
        <CounterpartToolbar>
          <div className='toolbar-counterparty'>
            {recentActivity.map((item, key) => (
              <Button
                reacentactivity
                id={item.id}
                activeIcon={item.activeIcon}
                icon={item.icon}
                key={key}
                children={item.name}
                active={activeBtn === item.name}
                onClick={() => handleTabChange(item.name)}
              />
            ))}
          </div>
        </CounterpartToolbar>
        <CounterPartyToolContainer />
        {!paginatedData || paginatedData.length === 0  || (amendementData.length === 0 && issueData.length === 0 && newContract=== 0 && expiredContract === 0 ) ? (

          <NoDataAvailable />
        ) :
          (
            <ListItemContainer $dynamicHeight="380px">
              {paginatedData && paginatedData.map(renderActivityItem)}
              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </ListItemContainer>
          )}

      </div>

    </>
  );
}

export default RecentActivity;
