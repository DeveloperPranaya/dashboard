import styled from 'styled-components';

export const MainContainer = styled.div`
border-bottom: 1px solid #F9F6FD;
  
  `;

export const Title = styled.div`
     font-size: 16px;
     font-weight: 700;
     line-height:28px;
     color: #000000;
     border-bottom:1px solid black; 
  `;
  export const ListItemContainer = styled.div`
   overflow-y:auto;
    position: relative;
    height: ${(props) => props.$dynamicHeight || '380px'};
    padding: 0px 10px 10px 10px;
    overflow-y: auto;
  `;