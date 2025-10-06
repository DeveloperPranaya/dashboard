import { useState, useEffect } from "react";
import ContractHeader from "../components/ui/contractheader.js";
import { CounterpartToolbar } from "../style/counterpartyStyle.js";
import { recentActivity, ITEMS_PER_PAGE } from "../mockdata/mockdata.js";
import Button from "../components/ui/Button.js";
import { CounterPartyToolContainer } from "../style/counterpartyStyle.js";
import CircleImage from "../assets/images/contractstack/circle.png";
import { ListItemContainer } from "../style/upcomingObligationStyle";
import NoDataAvailable from "../components/ui/NoDataAvailable.js";
import Pagination from "../components/ui/Pagination.js";
import OverflowTooltip from "../components/ui/OverflowTooltip.js";
import Tooltip from "../components/ui/tooltip.js";
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

function RecentActivity({ dataMap, amendementData, issueData, newContract, expiredContract }) {
  const [loading, setLoading] = useState(true);
  const [activeBtn, setActiveBtn] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDropdown, setSelectedDropdown] = useState("All Activity");

  const selectedData = dataMap[activeBtn] || [];

  // Filter based on dropdown selection
  const filteredData = selectedData.filter((item) => {
    const createdDate = new Date(item.Created);
    const now = new Date();

    switch (selectedDropdown) {
      case "Last 48 hours":
        return now - createdDate <= 48 * 60 * 60 * 1000;
      case "Last 14 days":
        return now - createdDate <= 14 * 24 * 60 * 60 * 1000;
      case "Last 1 month":
        return now - createdDate <= 30 * 24 * 60 * 60 * 1000;
      default:
        return true; // "All Activity"
    }
  });

  const sortedData = [...filteredData].sort((a, b) => new Date(b.Created) - new Date(a.Created));
  const totalPages = Math.ceil((sortedData?.length || 0) / ITEMS_PER_PAGE);
  const paginatedData = sortedData?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ) || [];


  const handleTabChange = (name) => {
    setActiveBtn(name);
    setCurrentPage(1);
  };

  const handleDropdownChange = (e) => {
    setSelectedDropdown(e.target.value);
    setCurrentPage(1); // reset to first page
  };

  function getDurationFromNow(isoDate) {
    const now = new Date();
    const targetDate = new Date(isoDate);
    const diffMs = now - targetDate;
    if (diffMs < 0) return "In the future";

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalDays = Math.floor(totalMinutes / 1440);
    const years = Math.floor(totalDays / 360);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;
    if (totalDays > 0) return `${totalDays} day${totalDays > 1 ? "s" : ""}`;
    if (hours > 0) return `${hours} hr.`;
    if (minutes > 0) return `${minutes} mins`;
    return `${seconds} sec${seconds !== 1 ? "s" : ""}`;
  }

  useEffect(() => {
    if (
      dataMap?.All?.length > 0 ||
      dataMap?.Amendments?.length > 0 ||
      dataMap?.Issues?.length > 0 ||
      dataMap?.["New Contracts"]?.length > 0 ||
      dataMap?.["Expired Contracts"]?.length > 0
    ) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => setLoading(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [dataMap]);

  const renderActivityItem = (value, key) => {
    const result = getDurationFromNow(value.Created);
    return (
      <Container key={key}>
        <ListFirstData>
          <ListData style={{ marginTop: "4px" }}>
            <ItemDescription>
              <AreaContainer style={{ display: "flex" }}>
                <Tooltip text="Created" ><ListItemTextData>{result} ago</ListItemTextData></Tooltip>
              </AreaContainer>
              <Setarator>
                <img src={CircleImage} alt="dot" />
              </Setarator>
              <AreaContainer style={{ display: "flex" }}>
                <OverflowTooltip
                  text={value.AmendmentTitle || value.IssueName || value.BusinessArea}
                  maxWidth="300px"
                  customStyle={`font-size: 14px;line-height: 24px;font-weight: 700;`}
                >
                  <Tooltip text="Business Area" >{value.AmendmentTitle || value.IssueName || value.BusinessArea}</Tooltip>
                </OverflowTooltip>
              </AreaContainer>
            </ItemDescription>
          </ListData>
          {value.AmendmentTitle ? (
            <StatusDiv>Amendment</StatusDiv>
          ) : value.IssueName ? (
            <StatusDiv>Issue</StatusDiv>
          ) : value.Status === "New" ? (
            <StatusDiv>New</StatusDiv>
          ) : value.Status === "Expired" ? (
            <StatusDiv>Expired</StatusDiv>
          ) : (
            ""
          )}
        </ListFirstData>

        <ListFirstData style={{ marginTop: "4px" }}>
           <Tooltip text="Type" ><ListData>{value.AmendmentType || value.IssueType || value.ContractTitle}</ListData></Tooltip>
        </ListFirstData>
        <ListFirstData style={{ marginTop: "4px" }}>
          <Tooltip text="Title" ><ListData>{value.AmendmentTitle && value.ContractTitle}</ListData></Tooltip>
        </ListFirstData>

        <ListData style={{ marginTop: "4px" }}>
          <ItemDescription>
            <AreaContainer style={{ display: "flex" }}>
              <ListItemTextData>
                {value.AmendmentTitle ? "Requested By" : "Created By"}{" "}
                {value.ReportedBy || value.RequestedBy || value.CreatedBy || "-"}
              </ListItemTextData>
            </AreaContainer>
          </ItemDescription>
        </ListData>
      </Container>
    );
  };

  const dropdownOptions = ["All Activity", "Last 48 hours", "Last 14 days", "Last 1 month"];

  return (
    <div className="renewaltype-container">
      <ListFirstData>
        <ContractHeader
          heading="Recent Activity"
          desc="This section shows recent actions on contracts, including new entries, amendments, and issues. Filter by activity type for focused insights."
        />
        <CenterItem>
          <select
            value={selectedDropdown}
            onChange={handleDropdownChange}
            style={{
              background: "#ffffff",
              border: "1px solid #E7E7E8",
              fontSize: "14px",
              fontWeight: 400,
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {dropdownOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </CenterItem>
      </ListFirstData>

      <CounterpartToolbar>
        <div className="toolbar-counterparty">
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

      {!paginatedData || paginatedData.length === 0 || (amendementData.length === 0 && issueData.length === 0 && newContract === 0 && expiredContract === 0) ? (
        <NoDataAvailable />
      ) : (
        <ListItemContainer $dynamicHeight="380px">
          {paginatedData.map(renderActivityItem)}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </ListItemContainer>
      )}
    </div>
  );
}

export default RecentActivity;
