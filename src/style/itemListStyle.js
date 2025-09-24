// ItemList.styles.js
import styled from 'styled-components';
export const Container = styled.div`
  padding:16px;;
  border-bottom:1px solid #F9F6FD
`;
export const ListItemContainer = styled.div`
`;
export const ListFirstData = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CenterItem = styled.div`
margin-right:16px;
display:flex;
align-items:center;
justify-content:center;
`;

export const ItemDescription = styled.div`
  display: flex;
  // align-items: center; /* Aligns all children (text and image) vertically */
  gap: 8px; /* Add some space between items */
`;

export const ItemListBody = styled.div`
  padding: 10px;
  font-size: 13px;
  margin-top: 10px;
`;

export const ListData = styled.div`
font-size:14px;
line-height:24px;
font-weight:700;
`;

export const ListDataItem = styled.div`
font-size:14px;
line-height:24px;
font-weight:700;
display:flex;
align-items:center;
`;
export const AreaContainer = styled.div`
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  color: #52555a;
`;

export const StatusDiv = styled.div`
  padding: 8px 12px;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #1D2025;
    background-color: #F1F1F2;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CheckboxWrapper = styled.label`
display:flex;
  // display: inline-block;
  // position: relative;
  cursor: pointer;
  margin-right: 10px;
`;
export const Statusdiv = styled.div`
  margin-left:5px;
`;

export const StatusCheckBox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  position: absolute;
  cursor: pointer;
  height: 0;
  width: 0;
  margin-right:5px;
  margin-left:5px;
`;

export const CustomCheck = styled.span`
  height: 1.3em;
  width: 1.3em;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  position: relative;

  ${StatusCheckBox}:checked + & {
    background-color: #6023C0;
    border-color: #6023C0;
  }

  ${StatusCheckBox}:checked + &::after {
    content: '✓';
    color: white;
    font-size: 0.9em;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
  }
`;

export const ListHeader = styled.div`
  font-size: 13px;
  font-weight: 600;
`;
export const Setarator = styled.div`
  width: 5px;
  height: 5px;
  // display: flex;
  // align-items: center;
  // justify-content: center;
`;
export const ItemListExtendedBody = styled.div`
  height: 90px;
`;
export const FileContainer = styled.img`
 width: 12px;
  height: 12px;
  cursor:pointer;
`;

export const ListItemText = styled.div`
  color:#33373D !important;
  margin-left:4px;
  max-width: ${(props) => props.dynamicWidth || "200px"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ListItemTextData = styled.div`
 color:#33373D !important;
`

export const AmmandmentTitle = styled.div`
  color:#33373D !important;
  font-size:13px;
  display:flex;
      line-height: 24px;
    font-weight: 500;
`;

export const Prioritydiv = styled.div`
  width:8px;
  height:8px;
  border-radius:100%;
  background:${(props) => props.$dynamicBackground || "#7FAFE8"};
  display:flex;
  align-items:center;
  justify-content:center;
  margin-right:6px;
`;




