import { useState, useRef, useEffect } from "react";
import Tooltip from "./tooltip";
import styled from "styled-components";

const TdTitleContainer = styled.td`
  max-width: ${({ maxWidth }) => maxWidth || "282px"};
  width: ${({ maxWidth }) => maxWidth || "282px"};
`;

const TdTitleText = styled.div`
  max-width: ${({ maxWidth }) => maxWidth || "230px"};  
  width: ${({ maxWidth }) => maxWidth || "230px"}; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* dynamic style support */
  ${({ customStyle }) => customStyle && customStyle};
`;

const OverflowTooltip = ({ children, text, maxWidth, customStyle, obligation }) => {
  const ref = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (ref.current) {
      setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth);
    }
  }, [text, maxWidth]);

  const content = (
    <TdTitleText ref={ref} maxWidth={maxWidth} customStyle={customStyle}>
      {children}
    </TdTitleText>
  );

  return (
    <TdTitleContainer maxWidth={maxWidth}>
      {isOverflowing ? <Tooltip text={text}>{content}</Tooltip> : content}
    </TdTitleContainer>
  );
};

export default OverflowTooltip;
