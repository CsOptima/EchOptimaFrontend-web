import { useState } from 'react';
import { analyzeSite } from '../api/apiService';

export const useAnalyze = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Можно сразу задать null или объект по умолчанию
  const [metrics, setMetrics] = useState(null); 

  const executeAnalyze = async (url) => {
    setIsLoading(true);
    setError(null);
    setMetrics(null);

    try {
      const data = await analyzeSite(url);
      // data здесь = { m1: int, m2: int, m3: int, m4: int }
      setMetrics(data);
      return data;
    } catch (err) {
      setError(err.message || 'Ошибка при анализе');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    metrics,
    analyze: executeAnalyze
  };
};