import styled from 'styled-components';

export const Container = styled.div`
// display:flex;
// border:1px solid #E5DAF8;
// background-color:#F9F6FD !important;  
border-radius:9999px;
 position: sticky;
  top: 30px;          /* 👈 stick to the top */
  z-index: 1000;  
  padding:12px; /* keep it above other elements */
`;

export const ToggleBtnContainer = styled.div`
   display:flex;
  align-items: center;
  justify-content: center;
border:1px solid #E5DAF8;
border-radius:9999px;
margin:auto;
width: fit-content;
`;
export const ToggleBtn = styled.div`
  width: 259px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  border-radius: 9999px;
  cursor: pointer;
 

  /* Conditional styles based on props */
  background-color: ${(props) => (props.isActive ? "#E5DAF8" : "transparent")};
  color: ${(props) => (props.isActive ? "#6023C0" : "#1D2025")};

//   &:hover {
//     background-color: #e5daf8;
//     color: #6023c0;
//   }
`;