import styled from "styled-components";

export const ContractStackContainer = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const ContractBox = styled.div`
  min-width: ${({ $isWide }) => ($isWide ? '49.3%' : '32.4%')};
  height: 140px;
  padding: 16px;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid #E5DAF8;

 @media (max-width: 1400px) {
    min-width: ${({ $isWide }) => ($isWide ? '49.3%' : '32.4%')};
  }
`;

export const ContractTitle = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  font-size: 16px;
  font-weight: 700;
`;


export const ContractData = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #52555a;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.data-upper {
    margin-top: 4px;
  }
`;