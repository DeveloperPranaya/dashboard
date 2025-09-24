import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 20px;

  /* make container a column-flex with a fixed viewport-based height */
  height: calc(100vh - 140px); /* <-- adjust 140px to account for header/navbar/margins */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* prevent outer scrollbar */
`;

export const ButtonContainer = styled.div`
  padding:0px 24px 8px 24px;
`;

export const Bordercontainer = styled.div`
  border:1px solid #E5DAF8;
`;
// styled.js
export const DateContainer = styled.div`
display:flex;
  align-items:center;
  justify-content:start;
color:#000;
 padding-top: ${({  paddingTop }) => paddingTop || "0px"};
 padding-Bottom:${({  paddingBottom }) => paddingBottom || "0px"};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-weight: ${({ fontWeight }) => fontWeight || "700"};
  line-height: ${({ lineHeight }) => lineHeight || "28px"};
`;



export const IntakeAgentDescription = styled.div`
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;         /* take remaining space in Container */
  min-height: 0;   /* IMPORTANT — allows inner ScrollArea to overflow properly */
`;


export const ContractDescription = styled.div`
  // width:100%;
  // height:88px;
  // background-color:#fff;
`;

export const CommonImage = styled.img`
  width:12px;
  height:12px;
  margin-right:4px;
  // display:flex;
  // align-items:center;
  // justify-content:center;
`;

export const CommonDiv = styled.div`
  display:flex;
  align-items:center;
  // justify-content:center;
    font-size: 12px;
    font-weight: 500;
    line-height:16px;
    border-radius: 25px;
    width: fit-content;
     border-radius: 100px;
      margin-top: 8px;
    padding: 4px 8px 4px 8px;

  /* conditional styles */
  ${({ status }) =>
    status === "Completed"?
    `
      background-color: #D2F2E7;
      color: #07563C;
    `:status === "InProgress"? `
    background-color: #F9EBDB;
      color: #624B0E;
    `:` background-color: #F1F1F2;
      color: #000;`}


  
`;

export const ScrollArea = styled.div`
  flex: 1;               /* fills remaining height in IntakeAgentDescription */
  min-height: 0;         /* IMPORTANT — allows overflow to work inside flex item */
  overflow-y: auto;      /* scrolling enabled */
  

  /* smooth touch scrolling on iOS */
  -webkit-overflow-scrolling: touch;

  /* hide scrollbar visuals but keep scroll behavior */
  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const Accordionbody = styled.div`
width:100%;
background-color:#F5F5F6;
border;1px solid #E7E7E8;
border-radius:8px;
padding:16px;
`;

export const Headingcontainer = styled.div`
  font-size: ${({ fontSize }) => fontSize || "12px"};
  font-weight: ${({ fontWeight }) => fontWeight || "800"};
  line-height: ${({ lineHeight }) => lineHeight || "16px"};
`;

export const ContainerDivision = styled.div`
    margin-bottom:15px;
`;



