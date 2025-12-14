import React, { createContext, useState, useContext } from 'react';

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  return (
    <AnalysisContext.Provider value={{ isNavVisible, setIsNavVisible }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);