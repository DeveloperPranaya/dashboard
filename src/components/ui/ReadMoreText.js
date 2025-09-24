import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const TextWrapper = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "unset" : 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ToggleButton = styled.span`
  color: #6023C0;
  cursor: pointer;
  font-weight: 500;
  margin-left: 5px;
`;

const ReadMoreText = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const { scrollHeight, clientHeight } = textRef.current;
      // Only show Read More if scrollHeight > clientHeight (text overflows)
      setIsClamped(scrollHeight > clientHeight);
    }
  }, [text]);

  return (
    <div>
      <TextWrapper ref={textRef} expanded={expanded}>
        {text}
      </TextWrapper>

      {/* Only show Read More / Read Less if text is clamped */}
      {isClamped && (
        <ToggleButton onClick={() => setExpanded(!expanded)}>
          {expanded ? "Read Less" : "Read More"}
        </ToggleButton>
      )}
    </div>
  );
};

export default ReadMoreText;
