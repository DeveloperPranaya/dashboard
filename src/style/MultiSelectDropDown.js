import styled from "styled-components"

export const Dropdown = styled.div`
   width:100%;
   height:32px;
`;

export const DropdownHeader = styled.div`
    height: 100px;
    border: 1px solid rgb(204, 204, 204);
    padding: 8px;
    cursor: pointer;
    background: rgb(255, 255, 255);
    border-radius: 4px;
    display: flex;
    flex-wrap:wrap;
    gap:6px;
    overflow-x: scroll;
`;

export const DropdownContainer = styled.div`
    border: "1px solid #ccc";
    padding: "8px";
    cursor: "pointer";
    background: "#fff";
    borderRadius: "4px";
    display: "flex";
    flexWrap: "wrap";
    gap: "6px";
    overflowY: "auto";
    overflowX: "hidden";
    height:"100%";
`;

export const DropDownInnerContainer = styled.div`
    display: "flex";
    alignItems: "center";
    backgroundColor: "#e5e7eb"; 
    padding: "6px";
    borderRadius: "4px";
    fontSize: "14px";
    height:"20px";
`;

export const Dropdownspan = styled.span`
 marginLeft: "6px";
cursor: "pointer";
fontWeight: "bold";
`;

export const DropdownList = styled.div`
  border: "1px solid #ccc";
              background: "#fff";
              marginTop: "2px";
              borderRadius: "4px";
              // maxHeight: "40px";
              overflowY: "auto";
              position: "absolute";
              zIndex: 10;
              width: "612px";
  `;
export const MultiDropdownList = styled.div`
  width: ${(props) => (props.width ? props.width : "993px")};
  height: ${(props) => (props.height ? props.height : "200px")};
  border: 1px solid #ccc;
  background: #fff;
  margin-top: 2px;
  border-radius: 4px;
  overflow-y: auto;
  position: absolute;
  z-index: 20;
`;
