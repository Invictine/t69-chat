import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Theme } from '@mui/material/styles';
import type { AppThemeOptions } from '../styles/theme';
import {
  themePresets,
  darkTheme   as defaultDarkTheme,
  lightTheme  as defaultLightTheme,
  boringTheme as defaultBoringTheme,
  createAppTheme,
} from '../styles/theme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeName = 'dark' | 'light' | 'boring';

interface ThemeContextType {
  currentTheme: ThemeName;
  themeOptions: AppThemeOptions;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
  boringMode: boolean;
  setBoringMode: (boring: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentThemeName] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('t69-theme') as ThemeName | null;
    return saved || 'dark';
  });

  const [boringMode, setBoringMode] = useState<boolean>(() => {
    return localStorage.getItem('t69-boring-mode') === 'true';
  });

  // Get the active theme based on current selection and boring mode
  const activeThemeName = boringMode ? 'boring' : currentTheme;
  const themeOptions = themePresets[activeThemeName];
  
  const muiTheme = createAppTheme(themeOptions);

  const setTheme = (theme: ThemeName) => {
    setCurrentThemeName(theme);
    localStorage.setItem('t69-theme', theme);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem('t69-boring-mode', boringMode.toString());
  }, [boringMode]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeOptions,
        toggleTheme,
        setTheme,
        boringMode,
        setBoringMode,
      }}
    >
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};