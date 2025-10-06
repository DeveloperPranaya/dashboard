import { useState } from "react";
import TableHeader from "./TableHeder";
import { ctdTableHeader, counterpartyHeader } from "../../mockdata/mockdata";
import FileImage from "../../assets/images/paginatation/file.png";
import OverflowTooltip from "./OverflowTooltip";
import Pagination from "./Pagination"; // ✅ import pagination
import "../../style/table.css";

function ContractTypeTable({ filteredItems, counterPartyData, contractType }) {
 
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // ✅ Slice items based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <div className="table-container">
      <table className="contract-table">
        {counterPartyData
          ? <TableHeader tableHeaders={counterpartyHeader} />
          : <TableHeader tableHeaders={ctdTableHeader} counterType/>
        }

        <tbody>
          {paginatedItems.length === 0 ? (
            <tr>
              <td colSpan={counterPartyData ? 6 : 5} className="text-center text-muted py-3">
                ❌ No contracts found.
              </td>
            </tr>
          ) : (
            paginatedItems.map((data, index) => (
              <tr key={index}>
                {counterPartyData ? (
                  <>
                    <td style={{ width: "300px" }}>
                      {data.BusinessAreas ? "Regional" : "Global"}
                    </td>
                    <td>
                       {data.CounterpartyName ? (
                      <a
                        className="counterparty-link"
                        href={`https://koztracts-bweuadcmh3gzhccp.eastus-01.azurewebsites.net/Counterparty/CounterpartyDetail?CounterpartyID=${data.RowKey}`}
                        target="_blank"          // ✅ open in new tab
                       rel="noopener noreferrer" // ✅ security best practice
                     >
                     {data.CounterpartyName}
                      </a>
                    ) : (
                      <td>
                        -
                      </td>
                    )}
                    </td>
                    {/* <td>{data.CounterpartyName || "-"}</td> */}
                    <td>{data.CounterpartyType || "-"}</td>
                    <td>
                      {data.Country === 0 || data.Country === "0" || !data.Country ? "Not specified" : data.Country}
                    </td>
                    <td>{data.Status || "-"}</td>
                    <td>
                      {data.Created === ""
                        ? "Not Specified"
                        : new Date(data.Created.split("T")[0]).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </td>
                  </>
                ) : (
                  <>
                      {data.contractTitle ?
                        <OverflowTooltip text={data.contractTitle || "-"} maxWidth="360px">
                          <img src={FileImage} alt="file" className="imageSize" />
                          <a
                            className="contract-link"
                            href={`https://koztracts-bweuadcmh3gzhccp.eastus-01.azurewebsites.net/Contracts/ContractDetails?ContractID=${data.rowKey}`}
                            target="_blank"          // ✅ open in new tab
                       rel="noopener noreferrer" // ✅ security best practice
                          >
                            {data.contractTitle || "-"}
                          </a>
                        </OverflowTooltip>
                        : (
                          <td>
                            -
                          </td>
                        )}
                      {data.counterparty ?
                        <OverflowTooltip text={data.counterparty || "-"} maxWidth="120px">
                          {/* <a
                            className="counterparty-link"
                            href={`https://koztracts-bweuadcmh3gzhccp.eastus-01.azurewebsites.net/Counterparty/CounterpartyDetail?CounterpartyID=${data.rowKey}`}
                          > */}
                            {data.counterparty || "-"}
                          {/* </a> */}
                        </OverflowTooltip>
                        : (
                          <td>
                            -
                          </td>
                        )}
                    <td>{data.createdBy || "-"}</td>
                    <td>{data.status || "-"}</td>
                    <td>
                      {data.createdDate === ""
                        ? "Not Specified"
                        : new Date(data.createdDate.split("T")[0]).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>

      </table>

      {/* ✅ Pagination at bottom */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default ContractTypeTable;
