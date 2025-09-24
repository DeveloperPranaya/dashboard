import styled from 'styled-components';

export const CounterpartyContainer = styled.div`

`;

export const ToolbarCounterparty = styled.div`
  /* Add specific toolbar styles here if needed */
`;

export const CounterpartHeaderButton = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
`;
export const CounterPartyToolContainer = styled.div`
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom:1px solid #E5DAF8;
`;

export const CounterpartToolbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 16px 16px 16px;
    
`;
 


export const CounterpartyBody = styled.div`
  position: relative;
  height: 320px;
  padding: 0px 10px 10px 10px;
  overflow-y: auto;
`;

export const CounterpartyList = styled.div`
  /* Optional scrollbar styling or list styles */
`;

export const ToggleButtonWrapper = styled.div`
  margin-top: 10px;
`;

export const SubToolbarCounterparty = styled.div`
  font-size: 13px;
  font-weight: 500;
  line-height:20px;
`;

export const Dropdown = styled.select`
  // width:190px;
  height:32px;
  width: 200px;          /* fixed width */
  overflow: hidden;      /* hide overflow */
  text-overflow: ellipsis; /* add "..." for long text */
  white-space: nowrap;   /* prevent text from wrapping */
`;

export const FilterText = styled.div`
  font-size: 12px;
`;

export const CounterpartFilter = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;
export const StackBar = styled.div`
    
`;
/* You can add media queries if necessary */
