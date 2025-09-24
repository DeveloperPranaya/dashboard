import { StyledButton, IconButton, ImageIcon } from '../../style/StyledButton';
import rightMarkIcon from "../../assets/images/contractstack/rightMark.png";
import TooltipWrapper from './TooltipWrapper';
import { Iimage } from "../../style/contractheading"

function Button({
  children,
  onClick,
  iIcon,
  iconOnly = false,
  active = false,
  bgColor,
  width,
  height,
  padding,
  title,
  zIndex,
  activeDetails,
  totaldata,
  activeDetail = false
}) {
  const commonProps = {
    onClick,
    active,
    bgColor,
    width,
    height,
    padding,
    iIcon,
    title,
    zIndex,
    activeDetails,
    totaldata,
    activeDetail
  };

  const Component = iconOnly ? IconButton : StyledButton;

const content = (
  <>
    {children}
    {!iconOnly && active ? (
      <ImageIcon src={rightMarkIcon} alt="activebtn" loading="lazy" />
    ) : activeDetail ? (
      <div
        className="center-item"
        style={{
          color: "#8952e0",
          border: "1px solid #8952e0",
          padding: "0px 4px",
          borderRadius: "2px",
          fontSize: "12px",
        }}
      >
        {totaldata}
      </div>
    ) : (
      totaldata && (
        <div
          style={{
            color: "#1D2025",
            backgroundColor: "#F1F1F2",
            padding: "1px 4px",
            fontSize: "12px",
          }}
        >
          {totaldata}
        </div>
      )
    )}
  </>
);

  return (
    <Component {...commonProps}>
    {title ? (
      <TooltipWrapper
        title={title}
        placement="top"
        customClass="my-tooltip"
      >
        {content}
      </TooltipWrapper>
    ) : (
      <div style={{ display: "flex", alignItems: "center", gap:"5px" }}>{content}</div>
    )}
  </Component>
  );
}

export default Button;
