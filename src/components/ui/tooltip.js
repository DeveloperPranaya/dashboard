
import React from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.div`
  visibility: hidden;
  background-color: #7e31e4;
  color: #fff;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  white-space: nowrap;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s;
`;

function Tooltip({ text, children }) {
  return (
    <TooltipContainer>
      {children}
      <TooltipText className="tooltip-text">{text}</TooltipText>
    </TooltipContainer>
  );
}

export default Tooltip;

