import React from 'react';
import rightarrow from "../../assets/images/paginatation/rightarrow.png";
import leftarrow from "../../assets/images/paginatation/leftarrow.png";
import leftpaginatation from "../../assets/images/paginatation/leftpaginatation.png";
import rightpagination from "../../assets/images/paginatation/rightpagination.png";
import usePagination from '../../hooks/usePagination.js';
// import {MainWrapper} from "../../style/paginatationStyle"
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 10px;
`;

const ArrowButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const PageButton = styled.button`
  padding: 6px 12px;
  margin: 0 4px;
  border:${({active}) =>(active? '1px solid #ccc':'none')} ;
  background-color: ${({ active }) => (active ? '#6f42c1' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  cursor: pointer;
`;
function Pagination({ currentPage, totalPages, onPageChange, pagesToShow = [] }) {

   const pageButtons = usePagination(currentPage, totalPages);
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <MainWrapper>
      <ArrowButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <img src={leftpaginatation} alt="Prev" />
      </ArrowButton>

      {pageButtons.map((page, index) => (
        <PageButton
          key={index}
          onClick={() => onPageChange(page)}
          active={currentPage === page}
        >
          {page}
        </PageButton>
      ))}

      <ArrowButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <img src={rightpagination} alt="Next" />
      </ArrowButton>
    </MainWrapper>
  );
}

export default Pagination;
