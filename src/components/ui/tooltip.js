import styled, { css } from "styled-components";
import { createPortal } from "react-dom";
import { useState } from "react";

const TooltipText = styled.div`
  position: fixed; /* important: relative to viewport */
  background-color: #171A1D;
  color: #fff;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 10000;
  font-size: 12px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s;
  pointer-events: none;

  ${({ position }) =>
    position === "top" &&
    css`
      transform: translate(-50%, -100%);
    `}
  ${({ position }) =>
    position === "bottom" &&
    css`
      transform: translate(-50%, 0);
    `}
  ${({ position }) =>
    position === "right" &&
    css`
      transform: translate(0, -50%);
    `}
  ${({ position }) =>
    position === "left" &&
    css`
      transform: translate(-100%, -50%);
    `}
`;

function Tooltip({ text, children, position = "top" }) {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    let top = 0,
      left = 0;

    switch (position) {
      case "top":
        top = rect.top - 8;
        left = rect.left + rect.width / 2;
        break;
      case "bottom":
        top = rect.bottom + 8;
        left = rect.left + rect.width / 2;
        break;
      case "right":
        top = rect.top + rect.height / 2;
        left = rect.right + 8;
        break;
      case "left":
        top = rect.top + rect.height / 2;
        left = rect.left - 8;
        break;
      default:
        top = rect.bottom + 8;
        left = rect.left + rect.width / 2;
    }

    setCoords({ top, left });
    setVisible(true);
  };

  const handleMouseLeave = () => setVisible(false);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "pointer" }}
    >
      {children}
      {visible &&
        createPortal(
          <TooltipText
            position={position}
            visible={visible}
            style={{ top: coords.top, left: coords.left }}
          >
            {text}
          </TooltipText>,
          document.body
        )}
    </span>
  );
}

export default Tooltip;
