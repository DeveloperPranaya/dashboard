import styled from 'styled-components';
export const ContractRenewalBody = styled.div`
  background-color: #ffffff;
  max-width: 100%;
  min-height:100%;
  padding: 20px 16px;
  margin-top: 16px;
  max-width:1200px
  border: 1px solid #E5DAF8 !important;
  border-radius: 12px;

  @media (max-width: 1400px) {
    width:1400px;
    width: 100%;
    padding: 12px;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const ContractRenewalTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 28px;
  color: #000000;
`;

export const ToolbarMain = styled.div`
  // max-height: 632px;
  max-height:100%;
  background-color: #ffffff;
  padding: 16px;
  margin-top: 16px;
  border: 1px solid #e7e7e8;
  border-radius: 16px;

  @media (max-width: 1400px) {
    padding: 12px;
    margin-top: 12px;
    border-radius: 12px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
    min-height: 460px;
  }
`;

export const ButtonContainer = styled.div`
   display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  width: 100%;
`;

export const LeftSection = styled.div`
  flex: 0;
  display: flex;
  justify-content: flex-start;
`;

export const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const EndSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
`;

export const ContractRenewalBarChart = styled.div`
  position:relative;
  width: 100%;
  max-width: 1300px;
  max-height: 484px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 16px; 

  @media (max-width: 700px) {
    height: 326px;
  }
`;

export const GraphIcon = styled.img`
  width: 13px;
  height: 13px;
`;

