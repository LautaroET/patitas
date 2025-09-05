import { useState, useEffect } from 'react';
import api from '../services/apiService';

export default function usePagination(endpoint, limit = 12) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`${endpoint}?page=${page}&limit=${limit}`)
      .then((res) => {
        setData(res.data.docs);
        setTotalPages(res.data.totalPages);
      })
      .finally(() => setLoading(false));
  }, [page, endpoint, limit]);

  return { data, page, setPage, totalPages, loading };
}