import React, { FC, createContext, useContext, useState } from "react";

import { storageService } from "../services";

interface ThemeContextType {
  setLightTheme: () => void;
  setDarkTheme: () => void;
  switchTheme: () => void;
  darkTheme: boolean | null;
}

export const ThemeContext = createContext<ThemeContextType>({
  setLightTheme: () => undefined,
  setDarkTheme: () => undefined,
  switchTheme: () => undefined,
  darkTheme: storageService.theme,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider: FC = ({ children }) => {
  const [darkTheme, switchTheme] = useState(storageService.theme);

  const themeValues = {
    setLightTheme: () => {
      switchTheme(false);
      storageService.theme = false;
    },
    setDarkTheme: () => {
      switchTheme(true);
      storageService.theme = true;
    },
    switchTheme: () => {
      switchTheme(!darkTheme);
      storageService.theme = !storageService.theme;
    },
    darkTheme,
  };
  return (
    <ThemeContext.Provider value={{ ...themeValues }}>
      {children}
    </ThemeContext.Provider>
  );
};
