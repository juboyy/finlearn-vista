import { useState, useEffect } from 'react';

interface CacheData<T> {
  data: T;
  timestamp: number;
}

interface UseTicketsCacheOptions {
  cacheKey: string;
  ttl?: number; // Time to live em milissegundos (padrão: 5 minutos)
}

export function useTicketsCache<T>(
  fetchFn: () => Promise<T>,
  options: UseTicketsCacheOptions
) {
  const { cacheKey, ttl = 5 * 60 * 1000 } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getCachedData = (): T | null => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return null;

      const { data, timestamp }: CacheData<T> = JSON.parse(cached);
      const now = Date.now();
      
      // Verifica se o cache ainda é válido
      if (now - timestamp < ttl) {
        return data;
      }
      
      // Cache expirado, remove
      localStorage.removeItem(cacheKey);
      return null;
    } catch (err) {
      console.error('Error reading cache:', err);
      return null;
    }
  };

  const setCachedData = (data: T) => {
    try {
      const cacheData: CacheData<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (err) {
      console.error('Error setting cache:', err);
    }
  };

  const invalidateCache = () => {
    localStorage.removeItem(cacheKey);
  };

  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const freshData = await fetchFn();
      setData(freshData);
      setCachedData(freshData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      // Tenta carregar do cache primeiro
      const cachedData = getCachedData();
      
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      // Se não há cache válido, faz a chamada à API
      await refetch();
    };

    loadData();
  }, [cacheKey]);

  return {
    data,
    loading,
    error,
    refetch,
    invalidateCache,
  };
}
