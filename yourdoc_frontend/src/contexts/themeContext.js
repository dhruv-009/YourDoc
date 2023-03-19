import { createContext } from "react";

export const ThemeContext = createContext({ isLightTheme: false, toggleIsLightTheme: () => null })