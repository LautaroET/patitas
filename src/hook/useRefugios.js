import { useState, useEffect } from "react";
import { fetchAllRefugios } from "../services/apiService";

const ITEMS_POR_PAGE = 12;

export const useRefugios = (searchValue = "") => {
  const [refugios, setRefugios] = useState([]);
  const [allRefugios, setAllRefugios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const getRefugios = async () => {
      try {
        const response = await fetchAllRefugios(searchValue);
        const data = Array.isArray(response.data) ? response.data : [];
        setAllRefugios(data);
      } catch (error) {
        setAllRefugios([]);
      } finally {
        setIsLoading(false);
      }
    };
    getRefugios();
  }, [searchValue]);

  useEffect(() => {
    if (Array.isArray(allRefugios)) {
      const startIndex = (currentPage - 1) * ITEMS_POR_PAGE;
      const endIndex = startIndex + ITEMS_POR_PAGE;
      setRefugios(allRefugios.slice(startIndex, endIndex));
    }
  }, [allRefugios, currentPage]);

  const totalPages = Math.ceil(allRefugios.length / ITEMS_POR_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return { refugios, allRefugios, isLoading, totalPages, currentPage, handlePageChange };
};