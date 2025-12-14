import React from 'react';
import { CircularScore } from '../atoms/CircularScore';
import { MetricCard } from '../molecules/MetricCard';
import { CARDS_CONFIG } from '../../constants';

export const ResultsDashboard = ({ metrics }) => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-16 animate-[fadeIn_1s_ease-out]">
      
      {/* ВЕРХНИЙ БЛОК (КРУГ) */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-24">
        <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-500">
          <h2 className="text-xl font-bold text-center mb-8 text-gray-200 tracking-wide">
            Ваш показатель <br /> авторитета для ИИ
          </h2>
          <CircularScore score={metrics.m4} />
        </div>

        <div className="bg-[#1A1A1D] border border-white/10 rounded-2xl p-8 max-w-md shadow-2xl relative overflow-hidden group">
          {/* Декоративное свечение в углу описания */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#9BA1EF] opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity" />
          
          <h3 className="text-lg font-bold text-white mb-4 relative z-10">Что мы учитываем?</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4 relative z-10">
            Показатель авторитета для ИИ или GEO Score — это специальная метрика (от 0 до 100), показывающая вероятность цитирования вашего контента нейросетями.
          </p>
        </div>
      </div>

      {/* ЗАГОЛОВОК СЕТКИ */}
      <div className="flex items-center justify-center mb-12">
        <h2 className="text-4xl font-medium text-center text-white">
          <span className="text-[#C9C9F0]">Метрики</span>
        </h2>
      </div>

      {/* СЕТКА КАРТОЧЕК */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {CARDS_CONFIG.map((card) => (
          <MetricCard 
            key={card.key}
            title={card.title}
            score={metrics[card.key]} // Передаем число, цвет выберется внутри
            description={card.desc}
            p1={card.p1}
            p2={card.p2}
          />
        ))}
      </div>

    </div>
  );
};