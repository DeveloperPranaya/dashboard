import styled from 'styled-components';

const DropDownWrapper = styled.select`
  width: ${(props) => props.dynamicWidth || '100%'};
  max-width: ${(props) => props.dynamicmaxWidth || '100%'};
  height: ${(props) => props.dynamicHeight || '28px'};
  border: ${(props) => props.dynamicBorder || "none"}; 
  font-size: ${(props) => props.dynamicFont || "18px"};
  color: #0E1012;
  font-weight: ${(props) => props.dynamicfontWight || "700"};
  line-height: ${(props) => props.dynamicLineHeight || "28"}; 
  background: ${(props) => props.dynamicBackground || "#F9F6FD"};
  focus-visible:outline-none !important;
  boxSizing: 'border-box';
`;

const CommonDropdown = ({
  options = [],
  selectedValue,
  onChange,
  id = '',
  name = '',
  dynamicBackground,
  dynamicBorder,
  dynamicWidth,
  dynamicHeight,
  dynamicFont,
  dynamicmaxWidth,
  dynamicLineHeight,
  dynamicfontWight,
  placeholder = '',   // <-- new prop
}) => {
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <DropDownWrapper
      id={id || name}
      name={name}
      value={selectedValue}
      onChange={onChange}
      dynamicBackground={dynamicBackground}
      dynamicBorder={dynamicBorder}
      dynamicWidth={dynamicWidth}
      dynamicHeight={dynamicHeight}
      dynamicFont={dynamicFont}
      dynamicmaxWidth={dynamicmaxWidth}
      dynamicLineHeight={dynamicLineHeight}
      dynamicfontWight={dynamicfontWight}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {safeOptions.map((option, idx) => (
        <option key={idx} value={option}>
          {option && option.replace(/[-_]+/g, ' ').trim()}
        </option>
      ))}
    </DropDownWrapper>
  );
};

export default CommonDropdown;
