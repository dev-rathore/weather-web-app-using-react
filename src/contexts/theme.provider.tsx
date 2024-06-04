import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
type ThemeContextType = {
  isDarkMode: boolean;
  onThemeModeChange: () => void;
};

const ThemeContext = createContext<ThemeContextType>(null!);

export const useThemeContext = (): ThemeContextType => useContext(ThemeContext);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const theme = localStorage.getItem('weatherWebAppTheme')
    if (theme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    } else {
      setIsDarkMode(true)
      localStorage.setItem('weatherWebAppTheme', 'dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  const onThemeModeChange = () => {
    if (!isDarkMode) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
      localStorage.setItem('weatherWebAppTheme', 'dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
      localStorage.setItem('weatherWebAppTheme', 'light')
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        onThemeModeChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
