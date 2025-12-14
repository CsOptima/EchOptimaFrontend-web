import React from 'react';

export const GradientButton = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full md:w-auto px-8 py-4 rounded-xl font-medium text-white text-lg
        transition-all duration-300 transform active:scale-95 shadow-lg
        bg-gradient-to-r from-[#6366F1] to-[#C4B5FD] hover:to-[#E0E7FF]
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      style={{
        // Точный градиент как на скрине (примерно)
        backgroundImage: 'linear-gradient(90deg, #6366F1 0%, #A78BFA 50%, #D4B499 100%)' 
      }}
    >
      {children}
    </button>
  );
};