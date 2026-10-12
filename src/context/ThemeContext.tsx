"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "spiderman";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  isSpiderman: boolean;
  pulseTrigger: number;
  triggerSpiderPulse: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "spiderman",
  toggleTheme: () => {},
  setTheme: () => {},
  isSpiderman: true,
  pulseTrigger: 0,
  triggerSpiderPulse: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [pulseTrigger, setPulseTrigger] = useState(0);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.add("dark", "theme-spiderman");
      root.classList.remove("theme-zara");
    }
  }, []);

  const triggerSpiderPulse = () => {
    setPulseTrigger((prev) => prev + 1);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: "spiderman",
        toggleTheme: triggerSpiderPulse,
        setTheme: () => {},
        isSpiderman: true,
        pulseTrigger,
        triggerSpiderPulse,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
