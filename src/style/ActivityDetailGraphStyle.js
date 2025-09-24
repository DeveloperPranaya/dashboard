import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
width:630px;
height:100%;
background-color:#fff;
margin-top:16px;
border:1px solid #F1F1F2;
border-radius:16px;
padding:16px;
`;
export const GrapherHeading = styled.div`
  font-size:13px;
  font-width:500;
  line-height:20px;
  color:#000;
`;

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const GraphSkeleton = styled.div`
  width: 100%;
   height: ${(props) => props.height || "300px"};
  border-radius: 8px;
  background: #eee;
  background-image: linear-gradient(
    to right,
    #eeeeee 0%,
    #dddddd 20%,
    #eeeeee 40%,
    #eeeeee 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  display: inline-block;
  position: relative;
  animation: ${shimmer} 1.2s infinite linear;
`;
