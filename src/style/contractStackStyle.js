import styled from "styled-components";

export const ContractStackContainer = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const ContractBox = styled.div`
 width: ${({ isWide }) => (isWide ? '676px' : '446px')};
  height: 132px;
  padding: 16px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

 @media (max-width: 1400px) {
    max-width: ${({ isWide }) => (isWide ? '100%' : '367px')};
  }
`;

export const ContractTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
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