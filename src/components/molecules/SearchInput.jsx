import React from 'react';

export const SearchInput = ({ value, onChange, onSubmit, placeholder }) => {
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="relative w-full max-w-[680px] mx-auto group">
      {/* Заднее свечение (Glow effect) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] to-[#A855F7] opacity-20 blur-xl rounded-[30px] group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
      
      {/* Контейнер инпута */}
      <div className="relative flex items-center w-full bg-[#1A1A1D] border border-white/10 rounded-full p-2 pl-6 shadow-2xl transition-colors focus-within:border-white/20 hover:border-white/20">
        
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Введите URL"}
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500 text-lg font-light h-12"
        />
        
        {/* Кнопка отправки (Самолетик) */}
        <button 
          onClick={onSubmit}
          className="w-10 h-10 hover:cursor-pointer rounded-full bg-[#2C2C30] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#36363a] transition-all ml-2 active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-ml-0.5 mt-0.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};