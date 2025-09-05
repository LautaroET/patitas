import { useState, useEffect } from 'react';
import { fetchRefugioById } from '../services/apiService';

export const useRefugioDetail = (id) => {
  const [refugio, setRefugio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRefugioDetail = async () => {
      if (!id) {
        setIsLoading(false);
        setError("ID de refugio no proporcionado");
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetchRefugioById(id);
        setRefugio(response.data);
        setError(response.error || null);
      } catch (err) {
        setError(err.message || 'Error al cargar el refugio');
      } finally {
        setIsLoading(false);
      }
    };

    getRefugioDetail();
  }, [id]);

  return { refugio, isLoading, error };
};