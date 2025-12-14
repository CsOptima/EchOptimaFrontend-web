import React from 'react';

export const IconButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-[42px] h-[42px] rounded-full bg-[#2C2C30] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#36363a] transition-all group"
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="relative left-[-2px] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300"
      >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
  );
};