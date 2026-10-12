"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { SpiderInsigniaIcon, SpiderMaskIcon } from "./SpiderIcons";

interface SpidermanThemeButtonProps {
  variant?: "pill" | "banner" | "compact" | "stealth";
  className?: string;
  onClick?: () => void;
}

export function SpidermanThemeButton({
  variant = "pill",
  className = "",
  onClick,
}: SpidermanThemeButtonProps) {
  const { triggerSpiderPulse } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    triggerSpiderPulse();
    if (onClick) onClick();
    setTimeout(() => setIsPressed(false), 600);
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Dark Spider-Man Suit Pulse"
        title="Dark Spider-Man Mode Active"
        className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 min-h-[44px] min-w-[44px] touch-manipulation select-none active:scale-95 bg-card/90 text-primary border border-primary/50 shadow-spider-glow ${
          isPressed ? "scale-95 ring-2 ring-primary animate-spiderPulse" : "hover:border-primary hover:shadow-spider-glow-lg"
        } ${className}`}
      >
        <SpiderInsigniaIcon size={16} className="text-primary animate-spiderFloat" />
        <span className="hidden sm:inline font-mono tracking-widest text-foreground">
          SYMBIOTE
        </span>
        <span className="size-1.5 rounded-full bg-primary animate-ping" />
      </button>
    );
  }

  if (variant === "stealth") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`btn-spider-stealth ${isPressed ? "scale-95 ring-1 ring-primary" : ""} ${className}`}
      >
        <SpiderMaskIcon size={18} className="text-primary" />
        <span>SPIDER PROTOCOL</span>
      </button>
    );
  }

  if (variant === "banner") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`btn-spider-primary group relative overflow-hidden inline-flex items-center justify-between gap-3 px-6 py-4 rounded-md text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 min-h-[48px] touch-manipulation select-none active:scale-98 ${
          isPressed ? "ring-2 ring-white scale-98 shadow-spider-glow-lg" : ""
        } ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <SpiderInsigniaIcon size={20} className="text-white animate-spiderFloat" />
          <span className="tracking-[0.25em]">DARK SPIDER-MAN SUIT</span>
        </div>
        <span className="text-[10px] uppercase font-mono font-bold text-white/90 tracking-widest px-2.5 py-1 rounded bg-black/50 border border-white/20">
          ONLINE
        </span>
      </button>
    );
  }

  // Default: Sleek glowing pill button
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Dark Spider-Man Pulse"
      className={`btn-spider-primary ${
        isPressed ? "scale-95 ring-2 ring-primary" : ""
      } ${className}`}
    >
      <SpiderInsigniaIcon size={16} className="text-white group-hover:scale-110 transition-transform" />
      <span className="tracking-[0.2em]">SPIDER-MAN DARK</span>
      <span className="size-1.5 rounded-full bg-white animate-ping" />
    </button>
  );
}
