import React from 'react';

export const MetricCard = ({ title, score, description, p1, p2}) => {
  
  // Функция выбора цвета в зависимости от баллов
  const getGradientByScore = (val) => {
    if (val >= 75) {
        return 'from-[#17C964] to-[#1F573A] shadow-[0_0_20px_rgba(52,211,153,0.3)]';
    } 
    if (val >= 50) {
        return 'from-[#006FEE] to-[#10345E] shadow-[0_0_20px_rgba(251,191,36,0.3)]';
    }
    if (val >= 25) {
        return 'from-[#F5A524] to-[#694F26] shadow-[0_0_20px_rgba(251,191,36,0.3)]';
    }

    return 'from-[#F31260] to-[#232327] shadow-[0_0_20px_rgba(248,113,113,0.3)]';
  };

  const gradientClass = getGradientByScore(score);

  return (
    <div className="flex flex-col rounded-3xl overflow-hidden bg-[#1A1A1D] border border-white/5 hover:scale-[1.02] transition-transform duration-300 shadow-2xl group">
      
      {/* 
          ВЕРХНЯЯ ЧАСТЬ
          bg-gradient-to-r - делаем градиент горизонтальным для красоты
          justify-between - разносим текст по краям
      */}
      <div className={`h-24 w-full flex items-center justify-between px-6 bg-gradient-to-r ${gradientClass}`}>
        
        {/* Заголовок */}
        <h3 className="text-xl font-bold text-white drop-shadow-md w-2/3 leading-tight">
          {title}
        </h3>

        {/* Балл (Справа) */}
        <div className="flex flex-col items-end">
          <span className="text-3xl font-black text-white drop-shadow-lg tracking-tight">
            {score}
          </span>
          <span className="text-[10px] font-medium text-white/80 uppercase tracking-wider">
            / 100
          </span>
        </div>

      </div>
      
      {/* НИЖНЯЯ ЧАСТЬ С ТЕКСТОМ */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        <p className="text-sm text-gray-300 leading-relaxed">
          {description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-white/5">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">Мы проверяем:</p>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
            <li>{p1}</li>
            <li>{p2}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};