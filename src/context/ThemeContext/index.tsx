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
    
    const [theme, setTheme] = useState<Theme>(colorsDark as Theme);
    const [mode, setMode] = useState<string>('light');
    const [loadingTheme, setLoadingTheme] = useState<boolean>(true);

  useEffect(() => {
    
    async function loadStorageData() {
      
      const storagedThemeMode = await AsyncStorage.getItem('@themeMode');

      if (storagedThemeMode) {
        setMode(storagedThemeMode);
      } else {
        setMode('dark');
        setTheme(colorsDark as Theme);
      }
      setLoadingTheme(false);
    }
    loadStorageData();
  }, []);

  useEffect(() => {
      if (mode == 'light') {
        setTheme(colorsLight as Theme);
      } else {
        setTheme(colorsDark as Theme);
      }
    }, [mode]);

    function toggleTheme() {
        if(mode === 'light'){
            setMode('dark');
            AsyncStorage.setItem('@themeMode', 'dark');
        }else{
            setMode('light');
            AsyncStorage.setItem('@themeMode', 'light');
        }
    }

  return(
  <ThemeContext.Provider value={{theme, mode, loadingTheme, toggleTheme}}>
    {children}
  </ThemeContext.Provider>)
};

export default ThemeContext;