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
display:flex;
align-items:center;
justify-content:center;
`;

export const ItemDescription = styled.div`
  display: flex;
  align-items: center; /* Aligns all children (text and image) vertically */
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
export const AreaContainer = styled.div`
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  color: #52555a;
`;

export const StatusDiv = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: ${({ status }) => (status === "Inactive" ? "#A40000" : "#07563C")};
  padding: 1px 5px;
  background-color: ${({ status }) => (status === "Inactive" ? "#FCDDDD" : "#D2F2E7")};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListHeader = styled.div`
  font-size: 13px;
  font-weight: 600;
`;
export const Setarator = styled.div`
  width: 5px;
  height: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
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
`;


