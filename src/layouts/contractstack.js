import styled, { keyframes } from "styled-components";
import { monthNames, newContractDesc, contactSigDesc, activeContractDesc } from "../mockdata/mockdata";
import InformationDescription from "../components/ui/InformationDescription";
import {
  ContractStackContainer,
  ContractBox,
  ContractTitle,
  ContractData
} from "../style/contractStackStyle";
// import { SkeletonLine } from "../pages/skeleton";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

export const SkeletonLine = styled.div`
  display: inline-block;
  height: ${(props) => props.height || "16px"};
  width: ${(props) => props.width || "100%"};
  border-radius: 4px;
  background-color: #e2e2e2;
  background-image: linear-gradient(
    90deg,
    #e2e2e2 0px,
    #f5f5f5 40px,
    #e2e2e2 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;


function ContractStack({ contractStack,  }) {
  const date = new Date();
  const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const lastMonthName = lastMonth.toLocaleString('default', { month: 'long' });
  const requitedMonth = lastMonthName.toUpperCase().slice(0, 3)

  return (
    <ContractStackContainer>
      {Array.isArray(contractStack) && contractStack.length > 0 &&
        contractStack.map((contractData, idx) => (
          <ContractBox key={idx} $isWide={idx === 3 || idx === 4}>
            <div className="item-start marginbtn">
              <ContractTitle>{contractData.Title ?? <SkeletonLine width="80px" />}</ContractTitle>
              <InformationDescription
                title={
                  contractData.Title === 'New Contracts'
                    ? newContractDesc
                    : contractData.Title === 'Contract Signature'
                      ? contactSigDesc
                      : activeContractDesc
                }
              />
            </div>

            <ContractData>
              {contractData.Title === "Active Contract" ? (
                <>
                  <div>Start of Year</div>
                  <div>NA</div>
                </>
              ) : (
                <>
                  <time>
                    {monthNames[new Date().getMonth()]} {date.getFullYear()}
                  </time>
                  <div className="item-start">
                    {contractData.Result?.Data?.["New Contract - Current Month"] ?? <SkeletonLine width="80px" />}
                  </div>
                </>
              )}
            </ContractData>

            <ContractData>
              {contractData.Title === "Active Contract" ? (
                <>
                  <div>Total Active Contracts</div>
                  <div>{contractData.Result?.Data?.['Total Active Contracts'] ?? <SkeletonLine width="80px" />}</div>
                </>
              ) : (
                <>
                  <time>{lastMonthName} {date.getFullYear()}</time>
                  <div>{contractData.Result?.Data?.["New Contract - Last Month"] ?? <SkeletonLine width="80px" />}</div>
                </>
              )}
            </ContractData>

            <ContractData>
              {contractData.Title === "Active Contract" ? (
                <>
                  <div>Upcoming End Date</div>
                  <div>{contractData.Result?.Data?.['Upcoming End Date'] ?? <SkeletonLine width="80px" />}</div>
                </>
              ) : (
                <>
                  <div>This Year Till Date</div>
                  <div>{contractData.Result?.Data?.["Total_Contracts_This_Year_Till_Date"] ?? <SkeletonLine width="80px" />}</div>
                </>
              )}
            </ContractData>
          </ContractBox>
        ))
      }

    </ContractStackContainer>
  );
}

export default ContractStack;