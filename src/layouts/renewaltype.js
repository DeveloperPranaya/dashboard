import React, { useState } from "react"
import ContractHeader from "../components/ui/contractheader";
import CommonTable from "../components/ui/CommonTable";
import { contractType } from "../mockdata/mockdata";
import StackedBarChart from "../components/ui/stackbarchat"

function RenewalType({ renewalType }) {
  const [view, setView] = useState({ type: "graph" });

  function transformRenewalData(flatData) {
    const result = {};

    flatData && Object.entries(flatData).forEach(([key, value]) => {
      const match = key.match(/^([A-Za-z]+)Month(.+)$/);
      if (match) {
        const month = match[1];
        const type = match[2];
        if (!result[month]) {
          result[month] = {
            month,
            AutoRenew: 0,
            ManualRenew: 0,
            OneTimeRenew: 0,
          };
        }
        result[month][type] = value;
      }
    });

    // Convert to array and sort by month order (Jan, Feb, Mar...)
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthOrder
      .filter(month => result[month]) // keep only months present in the data
      .map(month => result[month]);
  }

  const transformedData = transformRenewalData(renewalType);
  return (
    <div className="renewaltype-container">
      <ContractHeader heading="Renewals By Type" visibleButtons={["graph", "table"]} view={view}
        setView={setView} />
      {view.type === "graph" ? (
      //  <div className="commoncontractbody">
        <StackedBarChart data={transformedData} height={414}/>
        // </div>

      ) : (
        <div className="scroll-bar commoncontractbody">
          <CommonTable
            headers={contractType}
            renewalType={transformedData}
          />
        </div>
      )}
    </div>
  )
}
export default RenewalType;