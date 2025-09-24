import styled from "styled-components";

export const DashBoardContainer = styled.div`
   
   display: flex;
   align-items:center;
   justify-content:center;
   background:#fff;
`;

export const DashboardSettingContainer = styled.div`
  width:1056px;
  height:100%; 
`; 

export const HeadingItem = styled.div`
display:flex;
    align-items:center;
   justify-content:space-between;
   cursor:pointer;
   margin-top: 40px;
   padding:0px 32px 0px 32px;
  font-size:20px;
  font-weight:700;
  line-height:28px;
`;

export const BorderHighlight = styled.div`
margin-top:20px;
 border-bottom: 1px solid #E7E7E8;
`;

export const SettingData = styled.div`
  // overflowY: auto,
  // overflowY: hidden,
  // overflow: overlay;
  //  height:  auto;
  //  min-height: ${(props) => props.dynamicHeight || "100px"};
  // border-bottom: 1px solid #E7E7E8;
  // padding:30px 32px 50px 32px;

  overflow-y: auto;
  min-height: ${(props) => props.dynamicHeight || "100px"};
  border-bottom: 1px solid #E7E7E8;
  padding: 30px 32px 50px 32px;
  display: block;
`;

export const SettingItem = styled.div`
  font-size:14px;
  font-weight:700;
  line-height:24px;
   display:flex;  
`;

export const DropdownLebel = styled.div`
  font-size:13px;
  font-weight:400;
  line-height:20px;
   display:flex;
   align-items:center;
   justify-content:start;
  
`;

export const Refrestcontainer = styled.div`
    font-size:13px;
  font-weight:700;
  line-height:20px;
  color:#6023C0;
   display:flex;
   align-items:center;
   justify-content:start;
   cursor:pointer;
`;

export const RefrestcontainerDeactive = styled.div`
    font-size:13px;
  font-weight:700;
  line-height:20px;
  color:#b3b3c1;
   display:flex;
   align-items:center;
   justify-content:start;
   cursor:pointer;
`;

export const RefreshImage = styled.img`
  width:15px;
  height:15px;
  margin-left:4px;
   display:flex;
   align-items:center;
   justify-content:start;
   cursor:pointer;
`;

export const SettingContainer = styled.div`
  background: #8952E0;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  width: 136px;
  height:40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-right:8px;
`;

export const SettingMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding:70px 32px 32px 32px;



`;