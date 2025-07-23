import { useState } from 'react';
import Pagination from './Pagination.js'; // ✅ Import your reusable component
import CircleImage from "../../assets/images/contractstack/circle.png";
import FileImage from "../../assets/images/contractstack/file.png";
import {
  ItemListBody,
  ItemListExtendedBody,
  ListData,
  ListHeader,
  ListFirstData,
  Container,
  StatusDiv,
  AreaContainer,
  Setarator,
  ItemDescription,
  FileContainer
} from '../../style/itemListStyle.js';

const ITEMS_PER_PAGE = 15;

function ItemList({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);

  const paginatedData = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      {paginatedData &&
        paginatedData.map((value, index) => (
          <Container key={index}>
            <ListFirstData>
              <ListData>{value.CounterpartyName}</ListData>
              <StatusDiv status={value.Status}>{value.Status}</StatusDiv>
            </ListFirstData>

            <ListData style={{ marginTop: "4px" }}>
              <ItemDescription>
                <AreaContainer>{value.BusinessAreas}</AreaContainer>
                <Setarator><img src={CircleImage} alt="dot" /></Setarator>
                <AreaContainer>{value.CounterpartyType}</AreaContainer>
              </ItemDescription>
            </ListData>

            <ListFirstData style={{ marginTop: "4px" }}>
              <AreaContainer>{value.Country}</AreaContainer>
              <FileContainer src={FileImage} alt="file" />
            </ListFirstData>
          </Container>
        ))}

      {/* ✅ Reusable Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ItemList;
