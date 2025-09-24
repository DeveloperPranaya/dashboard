
import styled from 'styled-components';

export const ContractMain = styled.div` 
`;

export const ContractHeading = styled.div`
 
  font-size: 16px;
  font-weight: 700;
  line-height:28px;
  color: #000000;
`;

export const HedaerContainer = styled.div`
     padding:16px;   
     display:flex;
    align-items: center;
    justify-content: space-between;
    border-bottom:{({obligation})=> obligation ? '1px solid #E5DAF8' : 'none'}
`;

export const Circleicon = styled.div `
  width: 15px;          /* size of the image */
  height: 15px;
  border-radius: 50%;   /* makes it circular */
  border: 2px solid #dcd4d4ff; /* optional border */
  object-fit: cover;    /* keeps image aspect ratio */
  background-color: #fff; /* optional background */
  padding: 5px;         /* optional padding inside circle */
`;

export const Iimage = styled.img`
  width: 16px;          
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius: 50%;   /* makes it circular */
  border: 1px solid #f0e6e6; /* optional border */
  object-fit: cover;    /* keeps image aspect ratio */
  background-color: #fff; /* optional background */
  padding: 2px;  
  margin-left:4px;  
  cirsor:pointer;
`;

   



