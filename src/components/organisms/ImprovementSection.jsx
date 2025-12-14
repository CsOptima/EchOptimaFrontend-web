import React, { useState, useEffect } from 'react';
import { CodeViewer } from '../molecules/CodeViewer';
import { useUpdate } from '../../hooks/useUpdate';

export const ImprovementSection = ({ initialUrl }) => {
  // 1. Достаем error из хука
  const { update, isUpdating, result, error } = useUpdate();
  
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [attemptsLeft, setAttemptsLeft] = useState(3);

  useEffect(() => {
    setCurrentUrl(initialUrl);
  }, [initialUrl]);

  const handleUpdate = () => {
    if (currentUrl.trim() && attemptsLeft > 0) {
      setAttemptsLeft((prev) => prev - 1);
      update(currentUrl);
    }
  };

  const getAttemptsText = (count) => {
    if (count === 0) return 'У вас не осталось попыток.';
    if (count === 1) return 'У вас осталась 1 попытка.';
    return `У вас осталось ${count} попытки.`;
  };

  // Логика стилей бордера: Ошибка > Лимит исчерпан > Обычное состояние
  const getContainerClasses = () => {
    const base = "w-full h-[72px] flex items-center bg-[#1A1A1D] border rounded-full p-2 pl-8 shadow-lg transition-all";
    
    if (error) {
      return `${base} border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]`;
    }
    if (attemptsLeft === 0) {
      return `${base} border-red-500/30 opacity-80`;
    }
    return `${base} border-white/10 focus-within:border-white/20`;
  };

  return (
    <div id="improve" className="w-full max-w-5xl mx-auto mt-32 mb-20 animate-[fadeIn_1s_ease-out]">
      
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">
          Улучшить сайт
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Получите в один клик улучшенный текст с максимальным GEO-показателем и готовый код для немедленного внедрения
        </p>
      </div>

      {/* БЛОК ВВОДА */}
      <div className="flex flex-col gap-2 mb-16">
        <label className={`text-xl font-medium ml-4 transition-colors ${error ? 'text-red-400' : 'text-[#9BA1EF]'}`}>
          {error ? 'Произошла ошибка:' : 'Ваш сайт:'}
        </label>
        
        {/* Контейнер с динамическими классами */}
        <div className={getContainerClasses()}>
          
          <input 
            type="text" 
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={attemptsLeft === 0 || isUpdating}
            className="flex-1 h-full bg-transparent outline-none text-gray-200 text-xl font-light placeholder-gray-600 disabled:text-gray-600"
          />
          
          <button 
            onClick={handleUpdate}
            disabled={isUpdating || attemptsLeft === 0}
            className={`
              h-full px-8 rounded-full text-white font-medium text-lg tracking-wide
              transition-all active:scale-95 shadow-lg
              ${attemptsLeft === 0 
                ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                : 'hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed'
              }
            `}
            style={attemptsLeft > 0 ? {
              background: 'linear-gradient(90deg, #6664F1 0%, #937DC2 50%, #C09E94 100%)'
            } : {}}
          >
            {isUpdating 
              ? 'Генерируем...' 
              : attemptsLeft === 0 
                ? 'Лимит исчерпан' 
                : 'Повысить качество текста'
            }
          </button>

        </div>
        
        {/* Блок сообщений под инпутом */}
        <div className="ml-4 mt-2">
          {/* 1. Если есть ошибка - показываем её красным */}
          {error ? (
            <p className="text-sm text-red-400 font-medium">
              {error}.
            </p>
          ) : (
            /* 2. Иначе показываем количество попыток */
            <p className={`text-sm transition-colors ${attemptsLeft === 0 ? 'text-red-400' : 'text-gray-500'}`}>
              {getAttemptsText(attemptsLeft)}{' '}
              <span className="text-white font-medium cursor-pointer hover:underline hover:text-[#9BA1EF] transition-colors">
                Хотите больше?
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Результат */}
      <div>
        <h3 className="text-2xl font-medium text-[#9BA1EF] mb-4 ml-4">
          Преобразованный код:
        </h3>
        {/* Можно передать ошибку внутрь, если CodeViewer умеет её отображать, 
            либо просто оставить как есть (result будет null при ошибке) */}
        <CodeViewer isLoading={isUpdating} data={result} />
      </div>

    </div>
  );
};