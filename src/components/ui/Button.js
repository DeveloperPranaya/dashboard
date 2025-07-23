import React from 'react';
import { StyledButton, IconButton, ImageIcon } from '../../style/StyledButton';
import rightMarkIcon from "../../assets/images/contractstack/rightMark.png"

function Button({
  children,
  onClick,
  iconOnly = false,
  active = false,
  bgColor,
  width,
  height,
  padding
}) {
  if (iconOnly) {
    return (
      <IconButton
        onClick={onClick}
        active={active}
        bgColor={bgColor}
        width={width}
        height={height}
        padding={padding}
      >
        {children}
      </IconButton>
    );
  }

  return (
    <StyledButton
      onClick={onClick}
      active={active}
      bgColor={bgColor}
      width={width}
      height={height}
      padding={padding}
    >
      {children}
    {active && <ImageIcon src={rightMarkIcon} alt="activebtn"/>}
    </StyledButton>
  );
}

export default Button;
