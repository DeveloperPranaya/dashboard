    import styled, { css } from 'styled-components';

  export const StyledButton = styled.button`
    background-color: #ffffff;
    font-size:13px;
    color: #1D2025;
    padding: 4px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    margin-right:8px;

    &:hover {
      border:1px solid #8952E0;
      color:#8952E0;
    }

    ${(props) =>
    props.active &&
    css`
    background-color:#FFFFFF00;
    border:1px solid #8952E0;
    color:#8952E0;
      // background-color:${(props) => (props.activebgColor ? props.activebgColor : '#E5DAF8')}; 
      
    `}
  `;

  export const IconButton = styled.button`
    background-color: ${(props) => (props.bgColor ? props.bgColor : 'transparent')};
    width: ${(props) => (props.width ? props.width : '40px')};
    height: ${(props) => (props.height ? props.height : '32px')};
    padding: ${(props) => (props.padding ? props.padding : '0.5rem')};
    cursor: pointer;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right:0px;
    border:1px solid transparent;

  ${(props) =>
    props.active &&
    css`
      background-color:${(props) => (props.activebgColor ? props.activebgColor : '#E5DAF8')}; 
      border:none;
    `}

  &:hover {
    background-color:rgb(203, 179, 241);
     border:1px solid #7434DB;
  }
`;

export const ImageIcon = styled.img`
 width:10px;
 height:7px;
 margin-left:8px;

`;

    