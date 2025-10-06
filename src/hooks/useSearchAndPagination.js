import { useState, useMemo } from "react";

export const useSearchAndPagination = (items = [], itemsPerPage = 5) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter((item) =>
      item.contractTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Reset page if items or search term changes
  const setSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return {
    searchTerm,
    setSearchTerm: setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
    filteredItems,
  };
};
