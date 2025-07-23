// import styled, { css } from 'styled-components';

import React from 'react';
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


