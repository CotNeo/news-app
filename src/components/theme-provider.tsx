"use client";

import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Theme = "dark" | "light";

const ThemeProviderContext = createContext<{
  theme: Theme;
}>({
  theme: "light",
});

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDarkMode = useSelector((state: RootState) => state.news.darkMode);
  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={{ theme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}; 