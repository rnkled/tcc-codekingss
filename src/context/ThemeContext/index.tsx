import { createContext, useState, useEffect } from "react";
import AsyncStorage from  '@react-native-community/async-storage';
import {colorsDark, colorsLight} from './colors';
import { Theme } from "../../interfaces/themeInterface";

interface ThemeContextData {
    theme: Theme;
    toggleTheme(): void;
    loadingTheme: boolean;
    mode: string;
}
const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider = ({ children } : any) => {
    
    const [theme, setTheme] = useState<Theme>(colorsDark);
    const [mode, setMode] = useState<string>('light');
    const [loadingTheme, setLoadingTheme] = useState<boolean>(true);

  useEffect(() => {
    
    async function loadStorageData() {
      const storagedThemeMode = await AsyncStorage.getItem('@themeMode');
      if (storagedThemeMode) {
        setMode(storagedThemeMode);
        if(storagedThemeMode === 'light'){
          setTheme(colorsLight);
        }else{
          setTheme(colorsDark);
        }
      } else {
        setMode('light');
        setTheme(colorsLight);
      }
      setLoadingTheme(false);
    }
    loadStorageData();
  }, []);

  useEffect(() => {
    if (mode == 'light') {
      setTheme(colorsLight);
    } else {
      setTheme(colorsDark);
    }
  }, [mode]);

  function toggleTheme() {
      setLoadingTheme(true);
      if(mode === 'light'){
          setMode('dark');
          setTheme(colorsDark);
          AsyncStorage.setItem('@themeMode', 'dark');
          setLoadingTheme(false);
      }else{
          setMode('light');
          setTheme(colorsLight);
          AsyncStorage.setItem('@themeMode', 'light');
          setLoadingTheme(false);
      }
  }

  return(
  <ThemeContext.Provider value={{theme, mode, loadingTheme, toggleTheme}}>
    {children}
  </ThemeContext.Provider>)
};

export default ThemeContext;