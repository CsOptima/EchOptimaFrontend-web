import { useState } from 'react';
import { updateSite } from '../api/apiService'; // Импортируем метод из твоего файла

export const useUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const update = async (url) => {
    setIsUpdating(true);
    setError(null);
    setResult(null);
    
    try {
      // Вызываем реальную функцию из apiService
      const data = await updateSite(url);
      
      setResult(data);
      return data;
    } catch (err) {
      console.error(err);
      setError(err.message || 'Ошибка генерации кода');
    } finally {
      setIsUpdating(false);
    }
  };

  return { 
    isUpdating, 
    error, 
    result, 
    update 
  };
};