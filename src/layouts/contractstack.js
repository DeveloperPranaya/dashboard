import { monthNames } from "../mockdata/mockdata";
import {
  ContractStackContainer,
  ContractBox,
  ContractTitle,
  ContractData
} from "../style/contractStackStyle";

function ContractStack({ contractStack }) {
  const date = new Date();
  const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const lastMonthName = lastMonth.toLocaleString('default', { month: 'long' });
  return (
    <ContractStackContainer>
      {contractStack &&
        contractStack.map((contractData, idx) => (
          <ContractBox key={idx} isWide={idx === 3 || idx === 4}>
            <ContractTitle>{contractData.Title}</ContractTitle>

            <ContractData>
              {contractData.Title === "Contract Workflows" ? (
                <>
                  <div>In Progress</div>
                  <div>{contractData.Result.Data['In Progress']}</div>
                </>
              ) : (
                <>
                  <time>
                    {monthNames[new Date().getMonth()]} {date.getFullYear()}
                  </time>
                  <div>{contractData.Result.Data["New Contract - Current Month"]}</div>
                </>
              )}
            </ContractData>

              <ContractData>
              {contractData.Title === "Contract Workflows" ? (
                <>
                  <div>Time for Completion</div>
                  <div>{contractData.Result.Data['Time to Completion']}</div>
                </>
              ) : (
                <>
                  <time>{lastMonthName} {date.getFullYear()}</time>
              <div>{contractData.Result.Data["New Contract - Last Month"]}</div>
                </>
              )}
            </ContractData>

              <ContractData>
              {contractData.Title === "Contract Workflows" ? (
                <>
                  <div>Task for Workflow</div>
                  <div>{contractData.Result.Data['Task per workflow']}</div>
                </>
              ) : (
                <>
                  <div>This Year Till Date</div>
              <div>{contractData.Result.Data["Total Contracts - This Year Till Date"]}</div>
                </>
              )}
            </ContractData>
          </ContractBox>
        ))}
    </ContractStackContainer>
  );
}

export default ContractStack;