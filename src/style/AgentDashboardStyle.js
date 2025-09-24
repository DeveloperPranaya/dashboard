// AgentDashboardStyle.js
import styled from "styled-components";

export const Container = styled.div`
  background-color: #f9f6fd !important;
  width: 1081px;
  height: 85vh;            /* fixed height */
  display: flex;
  flex-direction: column;  /* stack header + scroll area */
  overflow: hidden;
  // padding: 12px;
  border: 1px solid #e5daf8;
  border-radius: 16px;
  margin-top: 82px;
`;

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;   /* scrolling enabled */

  /* Hide scrollbar (works in Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar (works in Firefox) */
  scrollbar-width: none; 

  /* Hide scrollbar (works in IE/Edge Legacy) */
  -ms-overflow-style: none;
`;

