import React from 'react';

export const IconButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-[#2C2C30] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#36363a] transition-all group active:scale-95"
    >
      <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="relative left-[-1px] group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform"
      >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
  );
};