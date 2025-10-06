import { useState } from "react";
import TableHeader from "./TableHeder";
import {
  counterTypeTableHeader,
  regionTableHeader,
  renewalTableHeader,
} from "../../mockdata/mockdata";
import FileImage from "../../assets/images/paginatation/file.png";
import OverflowTooltip from "./OverflowTooltip";
import Pagination from "./Pagination"; // ✅ import pagination
import "../../style/table.css";

function CounterTypeChartTable({ filteredItems, RegionTypeChart, RenewalTypeChart }) {
  
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // ✅ Slice items based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <div className="table-container">
      <table className="contract-table">
        {RegionTypeChart ? (
          <TableHeader tableHeaders={regionTableHeader} />
        ) : RenewalTypeChart ? (
          <TableHeader tableHeaders={renewalTableHeader} />
        ) : (
          <TableHeader tableHeaders={counterTypeTableHeader} />
        )}
        <tbody>
          {paginatedItems.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-muted py-3">
                ❌ No contract found with this name. Try searching another.
              </td>
            </tr>
          ) : (
            paginatedItems.map((data, index) => (
              <tr key={index}>
                 
                {/* <td className="col-checkbox" style={{ width: "300px" }}> */}
                  {data.contractTitle ?
                    <OverflowTooltip text={data.contractTitle || "-"} maxWidth="290px" style={{ width: "300px" }}>
                      <img src={FileImage} alt="file" className="imageSize" />
                      <a
                        className="contract-link"
                        href={`https://koztracts-bweuadcmh3gzhccp.eastus-01.azurewebsites.net/Contracts/ContractDetails?ContractID=${data.contractRowKey}`}
                        target="_blank"          // ✅ open in new tab
                       rel="noopener noreferrer" // ✅ security best practice
                      >
                        {data.contractTitle || (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "30px",
                            }}
                          >
                            -
                          </div>
                        )}
                      </a>
                    </OverflowTooltip>
                    : (<div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "30px",
                      }}
                    >
                      -
                    </div>)}

                {/* </td> */}
                {/* <td className="col-checkbox" style={{ width: "300px" }}> */}
                  <OverflowTooltip text={data.contractType || "-"} maxWidth="260px">
                    {data.counterParty && data.counterParty !== "-"? (
                      <a
                        className="counterparty-link"
                        href={`https://koztracts-bweuadcmh3gzhccp.eastus-01.azurewebsites.net/Counterparty/CounterpartyDetail?CounterpartyID=${data.counterpartyRowKey}`}
                         target="_blank"          // ✅ open in new tab
      rel="noopener noreferrer" // ✅ security best practice
                      >
                        {data.counterParty}
                      </a>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "30px",
                        }}
                      >
                        -
                      </div>
                    )}
                  </OverflowTooltip>
                {/* </td> */}
                {RegionTypeChart ? null : (
                  <td style={{ width: "150px" }}>
                    {(data.region && data.region !== "Unknown") ? (
                      data.region
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "30px",
                        }}
                      >
                        -
                      </div>
                    )}
                  </td>
                )}
                {!RenewalTypeChart && (
                  <td style={{ width: "180px" }}>
                    {data.renewal === "Yes"
                      ? "Auto Renewal"
                      : data.renewal === "No"
                        ? "Manual"
                        : "-"}
                  </td>
                )}
                <td>
                  {typeof data.contractValue === "number" && !isNaN(data.contractValue)
                    ? `$ ${data.contractValue}`
                    : "-"}

                </td>
                <td>{data.status || "-"}</td>
                <td>
                  {data.createdDate === ""
                    ? "Not Specified"
                    : new Date(data.createdDate.split("T")[0]).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                </td>
                <td>
                  {data.termEndDate === ""
                    ? "Not Specified"
                    : new Date(data.termEndDate.split("T")[0]).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ✅ Pagination at bottom */}
      {totalPages > 1 && paginatedItems.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default CounterTypeChartTable;
