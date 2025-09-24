import styled from 'styled-components';

export const TableContainer = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 100%;
`;

export const ContractTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

export const TableHeader = styled.thead`
  background: white;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

export const TableTh = styled.th`
  padding: 12px 8px;
  border-bottom: 1px solid #eee;
  text-align: left;
  color: #444;
`;

export const TableTd = styled.td`
  padding: 12px 8px;
  border-bottom: 1px solid #eee;
  text-align: left;
  color: #444;

  &.col-checkbox {
    width: 50px;
    text-align: center;
  }

  &.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const BookmarkImage = styled.img`
  width: 18px;
  cursor: pointer;

  &.active-bookmark {
    background-color: yellow;
  }
`;

export const IconButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 6px;
`;

export const TooltipRow = styled.div`
  display: flex;
  gap: 2px;
`;

export const NotesPopup = styled.div`
  width: 279px;
  height: auto;
  position: absolute;
  bottom: 100px;
  right: 20px;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ABADAF;
`;

export const NotesTextarea = styled.textarea`
  border: none;
  padding: 10px;
  width: 260px;
  height: 81px;
  border: 1px solid #E7E7E8;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const NotifyDiv = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 6px;
`;

export const NotifyContainer = styled.div`
  display: flex;
  width: 256px;
  height: 66px;
  border: 1px solid #E7E7E8;
  border-radius: 4px;
  background-color: #FFFFFF;
  padding: 4px 12px;
  gap: 10px;
`;

export const NotifyBtn = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: end;
  justify-content: end;
  gap: 4px;
`;

export const ToastCustom = {
  toastClassName: 'toast-custom',
  style: {
    backgroundColor: '#B795EC',
    color: 'white',
    fontWeight: 500,
  }
};

export const ErrorText = styled.div`
  color: rgba(117, 19, 19, 0.57);
  font-weight: 600;
`;

export const NotifyData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  line-height: 20px;
  border-radius: 4px;
  padding: 4px 8px;
  height: 20px;
  background: #E7E7E8;
  font-size: 13px;
`;

export const CloseButton = styled.span`
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

export const HighlightedRow = styled.tr`
  background-color: #e0f0ff;
`;

export const TdTitle = styled.td`
  max-width: ${({ maxWidth }) => maxWidth || "250px"};  
  width: ${({ maxWidth }) => maxWidth || "250px"};        
  white-space: nowrap;      
  overflow: hidden;         
  text-overflow: ellipsis;  
`;

export const TdCounterparty = styled.td`
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TdRenewal = styled.td`
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TdValue = styled.td`
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TdEndDate = styled.td`
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
