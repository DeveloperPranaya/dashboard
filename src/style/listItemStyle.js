import styled from 'styled-components';

export const WrapperContainer = styled.div`
    border-top:1px solid #F9F6FD;
    border-bottom:1px solid #F9F6FD;
    padding:10px 10px;
    transition: all 0.3s ease;
    overflow: hidden;
    height: ${({ expanded }) => (expanded ? 'auto' : '60px')};
    border-left: ${({ expanded }) => (expanded ? '1px solid #F9F6FD' : 'none')};
     border-right: ${({ expanded }) => (expanded ? '1px solid #F9F6FD' : 'none')};
   
  `;
export const FlexContainer = styled.div`
display:flex;
margin-top:10px;
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size:13px;
`; 
export const ExpandImage = styled.img`
weight:12px;
height:8px;
cursor:pointer;
`;

export const Title = styled.div`
 font-size: 14px;
  font-weight: 700;
  line-height: 24px;
`;

export const SubContainer = styled.div`
   margin-left:12px;
   color:#52555A;
   font-size:12px;
`;

export const Highlight = styled.div`
font-size:12px;
font-weight:600;
   background:yellow;
  //  padding:2px;
   border-radius:4px;
`;

export const ContainerHeader = styled.div`
  font-size:12px;
  color:#7434DB;
  font-weight:700;
`;

export const ContainerData = styled.div`
   font-size:12px;
   color:#52555A;
`;

export const ExpanedContainer = styled.div`
 border-top: 1px solid #F9F6FD;
 margin-top:10px;
 padding-top:5px;
`;

export const SubExpendedContainer = styled.div`
margin-bottom:20;
`;


export const SubExpendedContainerSide = styled.div`
   margin-left:50px;
   margin-bottom:20;
`;

