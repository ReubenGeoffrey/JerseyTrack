"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface SpidermanThemeButtonProps {
  variant?: "pill" | "banner" | "compact";
  className?: string;
}

export function SpidermanThemeButton({
  variant = "pill",
  className = "",
}: SpidermanThemeButtonProps) {
  const { theme, toggleTheme, isSpiderman } = useTheme();

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle Dark Spider-Man theme"
        title={isSpiderman ? "Switch to Zara Luxury White" : "Switch to Dark Spider-Man Mode"}
        className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
          isSpiderman
            ? "bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.6)] border border-rose-400"
            : "bg-neutral-900 text-neutral-200 hover:text-white border border-rose-600/40 hover:border-rose-500 hover:shadow-[0_0_12px_rgba(225,29,72,0.4)]"
        } ${className}`}
      >
        <span className="text-xs">🕷️</span>
        <span className="hidden sm:inline">
          {isSpiderman ? "SPIDER-MODE ON" : "DARK SPIDER"}
        </span>
      </button>
    );
  }

  if (variant === "banner") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`group relative overflow-hidden inline-flex items-center justify-between gap-3 px-5 py-3 rounded-md text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
          isSpiderman
            ? "btn-spiderman-active"
            : "btn-spiderman"
        } ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base animate-pulse">🕷️</span>
          <span>{isSpiderman ? "DARK SPIDER-MAN MODE ACTIVE" : "ACTIVATE DARK SPIDER-MAN THEME"}</span>
        </div>
        <span className="text-[10px] uppercase font-semibold text-rose-300 tracking-widest px-2 py-0.5 rounded bg-black/40 border border-rose-500/30">
          {isSpiderman ? "SWITCH TO ZARA" : "SYMBIOTE SUIT"}
        </span>
      </button>
    );
  }

  // Default: Sleek pill button
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Dark Spider-Man theme"
      className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer ${
        isSpiderman
          ? "bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-[0_0_18px_rgba(225,29,72,0.65)] border border-rose-400 scale-[1.02]"
          : "bg-neutral-950 text-neutral-200 hover:text-white border border-red-600/50 hover:border-red-500 hover:shadow-[0_0_15px_rgba(225,29,72,0.5)]"
      } ${className}`}
    >
      <span className="text-xs transition-transform duration-300 group-hover:scale-125">
        🕷️
      </span>
      <span>{isSpiderman ? "SPIDER-MAN DARK" : "DARK SPIDERMAN"}</span>
      <span
        className={`size-1.5 rounded-full ${
          isSpiderman ? "bg-white animate-ping" : "bg-red-500"
        }`}
      />
    </button>
  );
}
