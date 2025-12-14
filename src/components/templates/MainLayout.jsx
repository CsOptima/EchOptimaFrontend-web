import React from 'react';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#151517] text-white overflow-x-hidden font-sans antialiased selection:bg-[#7E7CF9] selection:text-white">
      {children}
    </div>
  );
};