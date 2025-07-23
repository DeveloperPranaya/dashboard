import React, { useState } from "react";
import CircleImage from "../../assets/images/contractstack/circle.png";
import Pagination from "./Pagination";
import {
  Container,
  ListData,
  ListFirstData,
  StatusDiv,
  AreaContainer,
  Setarator,
  ItemDescription,
  ListItemText,
} from "../../style/itemListStyle.js";

const ITEMS_PER_PAGE = 15;

const GenericListItem = ({
  data,
  titleKey,
  statusKey,
  dateKey,
  dateLabel = "Created on",
  ownerKey,
  ownerLabel = "Owned by",
  descriptionKey,
  descriptionLabel = "Description",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);

  const paginatedData = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      {paginatedData?.map((item, index) => {
        const dateValue = item[dateKey];
        const formattedDate =
          dateValue !== null && dateValue
            ? new Date(dateValue?.split("T")[0]).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "- - -";

        return (
          <Container key={index}>
            <ListFirstData>
              <ListData>{item[titleKey]}</ListData>
              <StatusDiv status={item[statusKey]}>{item[statusKey]}</StatusDiv>
            </ListFirstData>

            <ListData style={{ marginTop: "4px" }}>
              <ItemDescription>
                <AreaContainer style={{ display: "flex" }}>
                  {dateLabel} <ListItemText>{formattedDate}</ListItemText>
                </AreaContainer>
                <Setarator>
                  <img src={CircleImage} alt="dot" />
                </Setarator>
                <AreaContainer style={{ display: "flex" }}>
                  {ownerLabel}{" "}
                  <ListItemText>{item[ownerKey]}</ListItemText>
                </AreaContainer>
              </ItemDescription>
            </ListData>

            <ItemDescription style={{ marginTop: "4px" }}>
              <AreaContainer style={{ display: "flex" }}>
                {descriptionLabel}: {item[descriptionKey]}
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
