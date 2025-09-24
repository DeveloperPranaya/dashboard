import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import NoDataAvailable from "./NoDataAvailable";
import ReadMoreText from "./ReadMoreText";
import TooltipWrapper from "./TooltipWrapper";
import CircleImage from "../../assets/images/contractstack/circle.png";
import {
  Container,
  ListData,
  ListFirstData,
  StatusDiv,
  AreaContainer,
  Setarator,
  ItemDescription,
  ListItemText,
  StatusCheckBox,
  ListDataItem,
  Prioritydiv,
  CheckboxWrapper,
  CustomCheck,
  Statusdiv
} from "../../style/itemListStyle.js";
import { ITEMS_PER_PAGE } from "../../mockdata/mockdata.js";
import { updateMileStoneStatus } from "../../API/Api.js";
import Tooltip from "./tooltip.js";

const GenericListItem = ({
  data,
  titleKey,
  status,
  dateKey,
  dateLabel = "Created on",
  ownerKey,
  ownerLabel = "Owned by",
  descriptionLabel = "Description",
  statusApi,
  statusKey,
  businessAreaRead,
  selected
}) => {
  const readOnlyBusinessArea = businessAreaRead.map(item => item.businessAreaName);
  const [currentPage, setCurrentPage] = useState(1);
  const [completedItems, setCompletedItems] = useState({});
  const [processingItems, setProcessingItems] = useState({});
  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);

  // Reset page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Sort data by date before pagination
  const sortedData = [...(data || [])].sort((a, b) => {
    const dateA = a[dateKey] ? new Date(a[dateKey]) : new Date(0); // fallback for missing dates
    const dateB = b[dateKey] ? new Date(b[dateKey]) : new Date(0);
    return dateB - dateA; // ascending order
  });

  // Apply pagination AFTER sorting
  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );



  const handleCheckboxChange = async (rowKey, contractID, statusApi, statusKey) => {
    // 🚨 Guard: if already processing or completed, skip
    if (processingItems[rowKey] || completedItems[rowKey]) return;

    // Mark this row as processing
    setProcessingItems(prev => ({ ...prev, [rowKey]: true }));

    try {
      const response = await updateMileStoneStatus(rowKey, contractID, statusApi, statusKey);
      if (response?.contractID && response?._SecondaryRowKey) {
        setCompletedItems(prev => ({
          ...prev,
          [response._SecondaryRowKey]: true
        }));
      }
    } catch (error) {
      console.error("API error", error);
    } finally {
      // ✅ Remove processing flag once done
      setProcessingItems(prev => {
        const { [rowKey]: _, ...rest } = prev;
        return rest;
      });
    }
  };



  if (!paginatedData || paginatedData.length === 0) {
    return <NoDataAvailable />;
  }

  return (
    <div>
      {/* ✅ Show warning message when user has read-only permission */}
      {businessAreaRead?.some((ba) => ba.businessAreaName !== selected) && (
        <div style={{
          position: "sticky",       // Make it sticky
          top: 0,                   // Stick to the top of its parent container
          zIndex: 100,              // Ensure it appears above other content
          backgroundColor: "#FFF3CD",
          color: "#856404",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "12px",
          fontSize: "14px",
          fontWeight: "500"
        }}>
          🔒 Read-only permission: You can view the data but cannot make modifications.
        </div>
      )}
      {paginatedData.map((item, index) => {
        const dateValue = item[dateKey];
        const formattedDate =
          dateValue
            ? new Date(dateValue.split("T")[0]).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            : "-";

        return (
          <Container key={index}>
            <ListFirstData>
              <ListDataItem>
                <Tooltip text={`${item.Priority} priority`}><Prioritydiv $dynamicBackground={
                  item.Priority === "Low" ? "#7FAFE8" :
                    item.Priority === "High" ? "#E53E3E" :
                      item.Priority === "Medium" ? "#E6B273" :
                        item.Priority === "undefined" ? "" : ""
                } /></Tooltip>
                {item[titleKey]}
              </ListDataItem>

              {item[status] === "" ? "" : item[status] === "Upcoming" || item[status] === "Partial" ? (

                completedItems[item._SecondaryRowKey] || item[status] === "Complete" ? (
                  // ✅ No tooltip if status is Complete
                  <StatusDiv status={item[status]}>
                    Complete
                  </StatusDiv>
                ) : (
                  // ✅ Tooltip only shows if not complete
                  <Tooltip text="Mark as Complete">
                    <StatusDiv status={item[status]}>
                      <CheckboxWrapper>
                        <StatusCheckBox
                          checked={!!completedItems[item._SecondaryRowKey]}
                          disabled={processingItems[item._SecondaryRowKey] || readOnlyBusinessArea.includes(selected)}
                          onChange={() =>
                            handleCheckboxChange(
                              item._SecondaryRowKey,
                              item._ContractID,
                              statusApi,
                              statusKey
                            )
                          }
                        />
                        <CustomCheck />
                        <Statusdiv>{completedItems[item._SecondaryRowKey] ? "Complete" : item[status]}</Statusdiv>
                      </CheckboxWrapper>
                    </StatusDiv>
                  </Tooltip>
                )

              ) : <StatusDiv>{item[status]}</StatusDiv>}
            </ListFirstData>

            <ListData style={{ marginTop: "4px" }}>
              <ItemDescription>
                <AreaContainer style={{ display: "flex" }}>
                  <div style={{ width: "75px" }}>{dateLabel}</div>
                  <ListItemText>{formattedDate ? formattedDate : "-"}</ListItemText>
                </AreaContainer>
                <Setarator><img src={CircleImage} alt="dot" /></Setarator>
                <AreaContainer dynamicWidth="400px" style={{ display: "flex" }}>
                  <div style={{ width: "75px" }}>{ownerLabel}</div>
                  <TooltipWrapper title={item[ownerKey] || "-"} placement="top" customClass={"my-tooltip"}>
                    <ListItemText>{item[ownerKey] || "-"}</ListItemText>
                  </TooltipWrapper>
                </AreaContainer>
              </ItemDescription>
            </ListData>

            <ItemDescription style={{ marginTop: "4px" }}>
              <AreaContainer style={{ display: "flex" }}>
                <div style={{ marginRight: "8px" }}>{descriptionLabel}:</div>
                <ReadMoreText text={item.MilestoneDescription || item.Description || ""} />
              </AreaContainer>
            </ItemDescription>
          </Container>
        );
      })}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default GenericListItem;

