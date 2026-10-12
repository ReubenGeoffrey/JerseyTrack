"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "zara" | "spiderman";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  isSpiderman: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "zara",
  toggleTheme: () => {},
  setTheme: () => {},
  isSpiderman: false,
});

const STORAGE_KEY = "ftk_theme_mode_v1";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("zara");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (saved === "spiderman" || saved === "zara") {
        setThemeState(saved);
        applyThemeClass(saved);
      }
    } catch (e) {
      console.error("Failed to load theme preference", e);
    }
  }, []);

  const applyThemeClass = (newTheme: ThemeMode) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (newTheme === "spiderman") {
        root.classList.add("theme-spiderman");
        root.classList.remove("theme-zara");
      } else {
        root.classList.remove("theme-spiderman");
        root.classList.add("theme-zara");
      }
    }
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    applyThemeClass(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (e) {
      console.error("Failed to save theme preference", e);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "spiderman" ? "zara" : "spiderman";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isSpiderman: theme === "spiderman",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
