import styled from 'styled-components';

export const Container = styled.div`
 background-color:#fff;
  width: 630px;
  height: 120px;
  padding: 16px;
  border-radius:16px;
  margin-top:32px;
`;
export const Heading = styled.div`
  font-size:13px;
  font-weight:500;
  line-height:20px;
  margin-bottom:12px;
`;
export const SummerBox = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
`;

export const Image = styled.img`
  width:24px;
  height:24px;
`;

export const Status = styled.div`
  font-size:14px;
  font-weight:500;
  line-height:24;
`;

export const Amount = styled.div`
   font-size:22px;
  font-weight:700;
  line-height:32;
  color:#000000;
`;

export const SummeryContainer = styled.div`
padding:16px;
  display:flex;
  align-items:center;
  justify-content:start;
  gap:8px;
   width:191.33px;
   height:56px;
   border-radius:8px;
   border:${(props) =>
        props.variant === "completed"
            ? "1px solid #9FE3CD"
            : props.variant === "inProgress"
                ? "1px solid #D3BEF4"
                : props.variant === "escalations"
                    ? "1px solid #F1B8B4"
                    : "transparent"};
background-color: ${(props) =>
        props.variant === "completed"
            ? "#F7FDFB"
            : props.variant === "inProgress"
                ? "#F9F6FD"
                : props.variant === "escalations"
                    ? "#FDF6F5"
                    : "transparent"};
`;
