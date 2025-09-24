
import styled from 'styled-components';

export const DashboardContainer = styled.div` 
   min-height: 100vh; 
   width: 100%;
   display: flex;
   flex-direction: column;
   overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;

export const MainContainer = styled.div`
    margin:auto;
    width:100%;
    max-width: 1400px;
    padding: 70px 1rem 1rem 1rem !important;
    background-color: #F9F6FD;
      @media (max-width: 768px) {
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
    @media (min-width: 1200px) and (max-width: 1400px) {
      padding: 16px 20px 0px 16px; 
}  
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

export const HeaderText = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
`;

export const UpDownImg = styled.img`
  margin-left: 12px;
`;
export const IconGroup = styled.div`
  display: flex;
  gap: 4px;
`;
export const Icon = styled.img`
  width: 32px;
  height: 40px;
  cursor: pointer;
  border:1px solid #E7E7E8;
  padding:12px 8px;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalContainer = styled.div`
   display:flex;
   align-items:center;
   margin-bottom:16px;
`;

export const Heading = styled.div`
  font-size:14px;
  font-weight:700;
  line-height:24px;
`;

export const Description = styled.div`
  font-size:14px;
  font-weight:500;
  line-height:24px;
`;

export const DownLoadIcon = styled.img`
   display:flex;
   align-items:center;
   jsutify-content:center;
   width:14px;
   height:14px;
   margin-right:4px;
`;
export const ButtonContainer = styled.div`
  width: ${(props) => props.dynamicWidth || '83px'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 12px;
  height: 40px;
  border: 1px solid #E5DAF8;
  border-radius: 4px;
  font-size: ${(props) => props.dynamicFontSize || '14px'};
  font-weight: ${(props) => props.dynamicFontWeight || '600'};
  background: ${(props) => props.dynamicBackground || 'white'};
  color: ${(props) => props.dynamicColor || 'black'};
  cursor: pointer;
`;
