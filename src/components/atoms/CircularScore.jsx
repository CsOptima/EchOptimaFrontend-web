import React from 'react';

export const CircularScore = ({ score }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Настройки размеров холста
  const size = 200; // Увеличили холст (было 180)
  const center = size / 2; // Центр теперь 100 (было 90)

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      
      <svg 
        className="w-full h-full transform -rotate-90 overflow-visible" // overflow-visible - чтобы тень точно не резалась браузером
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9BA1EF" />
            <stop offset="50%" stopColor="#FADAE0" />
            <stop offset="100%" stopColor="#B8BFF5" />
          </linearGradient>
        </defs>

        {/* Фон круга */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#27272A"
          strokeWidth="14"
          fill="transparent"
        />

        {/* Активная линия */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#metal-gradient)"
          strokeWidth="14"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          // Тень теперь поместится, так как у нас есть запас места (padding) внутри viewBox
          className="transition-all duration-1000 ease-out drop-shadow-[0_0_15px_rgba(167,139,250,0.6)]"
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-bold text-white tracking-tighter drop-shadow-lg">
          {score}
        </span>
        <span className="text-gray-500 text-lg font-medium mt-1">/ 100</span>
      </div>
      
    </div>
  );
};