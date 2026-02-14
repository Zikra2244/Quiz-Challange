import { useState, useMemo, useCallback } from "react";

export const usePagination = (items = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / pageSize);
  }, [items.length, pageSize]);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }, [items, currentPage, pageSize]);

  const goToPage = useCallback(
    (page) => {
      const pageNumber = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(pageNumber);
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const lastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  const changePageSize = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const getPageNumbers = useCallback(
    (maxVisible = 5) => {
      const pages = [];
      const half = Math.floor(maxVisible / 2);

      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
    [currentPage, totalPages],
  );

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const range = useMemo(() => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, items.length);
    return { start, end };
  }, [items.length, currentPage, pageSize]);

  return {
    currentPage,
    totalPages,
    pageSize,
    currentItems,
    range,

    hasNextPage,
    hasPrevPage,
    isEmpty: items.length === 0,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,

    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    changePageSize,
    getPageNumbers,

    reset: firstPage,
  };
};

export default usePagination;
