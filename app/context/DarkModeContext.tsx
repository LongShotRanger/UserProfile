'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  // setDarkModeExplicit: (value: boolean) => void;
};

const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  // setDarkModeExplicit: () => {},
});

export const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('dark_mode');
    const enabled = saved === 'true';
    setDarkMode(enabled);
    document.documentElement.classList.toggle('dark', enabled);
  }, []);

  useEffect(() => {
    if (darkMode !== null) {
      localStorage.setItem('dark_mode', darkMode.toString());
      document.documentElement.classList.toggle('dark', darkMode);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => prev !== null ? !prev : true);
  };
  
  if (darkMode === null) return null; // avoid hydration mismatch

  // const setDarkModeExplicit = (value: boolean) => {
  //   setDarkMode(value);
  //   localStorage.setItem('dark_mode', value.toString());
  
  //   if (value) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
