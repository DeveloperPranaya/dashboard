// components/CommonDropdown.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DropDownWrapper = styled.select`
    width: ${(props) => props.dynamicHeight || '215px'};
    height: ${(props) => props.dynamicHeight || '28px'};
    border:${(props) => props.dynamicBorder || "none"};
    
   font-size:${(props)=>props.dynamicFont || "18px"};
   color:#0E1012;
   font-weight:${(props) => props.dynamicweidht || "700"};
   line-height:28;
   margin-right:10px;
   background:${(props) => props.dynamicBackground || "#F9F6FD"};
   focus-visible:outline-none !important;
`;
const CommonDropdown = ({
  options = [],
  selectedValue,
  onChange,
  label = '',
  placeholder = 'Select an option',
  className = '',
  id = '',
  name = '',
  dynamicBackground,
  dynamicBorder,
  dynamicWidth,
  dynamicHeight,
  dynamicFont,
  dynamicweidht
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
      dynamicweidht={dynamicweidht}
    >
      <option value="" disabled>{placeholder}</option>
      {safeOptions.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </DropDownWrapper>
  );
};

export default CommonDropdown;
