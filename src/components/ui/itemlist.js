import Pagination from './Pagination.js'; // ✅ Import your reusable component
import CircleImage from "../../assets/images/contractstack/circle.png";
import Tooltip from './tooltip.js';
import {
  ListData,
  ListFirstData,
  Container,
  StatusDiv,
  AreaContainer,
  Setarator,
  ItemDescription,
} from '../../style/itemListStyle.js';

const ITEMS_PER_PAGE = 15;

function ItemList({ data, currentPage, setCurrentPage}) {
  // const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);

  const paginatedData = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      {paginatedData &&
        paginatedData?.map((value, index) => (
          <Container key={index}>
            <ListFirstData>
              <Tooltip text="Counterparty Name"><ListData>{value.CounterpartyName}</ListData></Tooltip>
              <StatusDiv status={value.Status}>{value.Status}</StatusDiv>
            </ListFirstData>

            <ListData style={{ marginTop: "4px" }}>
              <ItemDescription>
                <Tooltip text="Business Areas"> <AreaContainer>{value.BusinessAreas ? value.BusinessAreas:'-'}</AreaContainer></Tooltip>             
                <Setarator><img src={CircleImage} alt="dot" /></Setarator>
                <Tooltip text="Counterparty Type"><AreaContainer>{value.CounterpartyType? value.CounterpartyType:"-"}</AreaContainer></Tooltip>
              </ItemDescription>
            </ListData>

            <ListFirstData style={{ marginTop: "4px" }}>
              <Tooltip text="Country"> <AreaContainer>{value.Country ? value.Country:"-"}</AreaContainer></Tooltip> 
             
              {/* <FileContainer src={FileImage} alt="file" /> */}
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
