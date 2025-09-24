
function usePagination(currentPage, totalPages) {
  const delta = 2; // number of pages before/after current
  const range = [];
  const rangeWithDots = [];
  
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }

  return range;
}
export default usePagination;
