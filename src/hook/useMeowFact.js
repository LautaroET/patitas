import { useEffect, useState } from 'react';
import { getMeowFactES } from '../services/meowService';
import { toastError } from '../utils/toastConfig.jsx';

const CACHE_KEY = 'meowCacheES';
const ROTATE_MIN = 3;

export default function useMeowFact() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);

  const isCacheValid = (ts) => Date.now() - ts < ROTATE_MIN * 60 * 1000;

  const fetchFact = async () => {
    setLoading(true);
    try {
      const newFact = await getMeowFactES();
      setFact(newFact);
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: newFact, ts: Date.now() }));
    } catch {
      toastError('No pudimos traer el dato gatuno 😿');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isCacheValid(parsed.ts)) {
        setFact(parsed.data);
        setLoading(false);
        return;
      }
    }
    fetchFact();
  }, []);

  return { fact, loading, refetch: fetchFact };
}