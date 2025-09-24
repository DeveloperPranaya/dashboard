import leftpaginatation from "../../assets/images/paginatation/leftpaginatation.png";
import rightpagination from "../../assets/images/paginatation/rightpagination.png";
import usePagination from '../../hooks/usePagination.js';
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
  border: ${({ active }) => (active ? '1px solid #ccc' : 'none')};
  background-color: ${({ active }) => (active ? '#6f42c1' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  cursor: pointer;
`;

const EllipsisButton = styled.button`
  padding: 6px 12px;
  margin: 0 4px;
  border: none;
  background: transparent;
  color: #999;
  cursor: pointer;
`;



function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageButtons = usePagination(currentPage, totalPages);

  const clamp = (n) => Math.min(totalPages, Math.max(1, n));

  return (
    <MainWrapper>
      <ArrowButton
        onClick={() => onPageChange(clamp(currentPage - 1))}
        disabled={currentPage === 1}
      >
        <img src={leftpaginatation} alt="Prev" />
      </ArrowButton>

      {pageButtons.map((page, index) =>
        page === "..." ? (
          <EllipsisButton
            key={`ellipsis-${index}`}
            // onClick={() => onPageChange(clamp(currentPage + 1))}
            onClick={() => {
              // If ellipsis is before current page, jump 5 pages back
              // If ellipsis is after current page, jump 5 pages forward
              const jump = index < pageButtons.indexOf(currentPage) ? -5 : 5;
              onPageChange(clamp(currentPage + jump));
            }}
          >
            ...
          </EllipsisButton>
        ) : (
          <PageButton
            key={index}
            onClick={() => onPageChange(page)}
            active={currentPage === page}
          >
            {page}
          </PageButton>
        )
      )}

      <ArrowButton
        onClick={() => onPageChange(clamp(currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <img src={rightpagination} alt="Next" />
      </ArrowButton>
    </MainWrapper>
  );
}

export default Pagination;
