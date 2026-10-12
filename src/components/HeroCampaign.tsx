"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SpidermanThemeButton } from "./SpidermanThemeButton";
import { useTheme } from "@/context/ThemeContext";

export function HeroCampaign() {
  const { isSpiderman } = useTheme();

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 lg:px-12 bg-background text-foreground overflow-hidden border-b border-border spiderman-web-overlay">
      {/* Editorial High-Fashion Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-[0.2] scale-[1.02] transition-opacity duration-500"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2600&auto=format&fit=crop')`,
            backgroundPosition: "center 30%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
      </div>

      {/* Top Editorial Bar */}
      <div className="relative z-10 pt-2 flex items-center justify-between border-b border-border/80 pb-3 text-[11px] tracking-[0.25em] uppercase text-muted-foreground font-medium">
        <div className="flex items-center gap-2">
          <span className={`size-1.5 rounded-full ${isSpiderman ? "bg-primary animate-pulse" : "bg-foreground"}`} />
          <span>{isSpiderman ? "SYMBIOTE SUIT · MILES MORALES ARCHIVE" : "AUTUMN / WINTER 2025/26"}</span>
        </div>
        <span className="hidden sm:inline">22+ VERIFIED INDIAN STOCKISTS</span>
        <div className="flex items-center gap-2">
          {isSpiderman && <span className="text-xs">🕷️</span>}
          <span>FOOTBALL TRACKING KIT</span>
        </div>
      </div>

      {/* Center Campaign Title with Zara Editorial / Spider-Man Typography */}
      <div className="relative z-10 my-auto py-12 sm:py-20 max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium block">
            {isSpiderman ? "DARK SYMBIOTE CURATION · 22 STORES" : "EDITORIAL ARCHIVE · CURATED INDEX"}
          </span>
          {isSpiderman && (
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary border border-primary/40 px-2 py-0.5 rounded bg-primary/10">
              Spider-Man Mode Active
            </span>
          )}
        </div>

        <h1 className="display-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-foreground tracking-[0.06em] leading-[0.95] mb-6">
          THE FOOTBALL
          <br />
          <span className={isSpiderman ? "text-primary drop-shadow-[0_0_20px_rgba(225,29,72,0.5)]" : "text-foreground"}>
            COLLECTION.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground font-light max-w-xl leading-relaxed mb-10 tracking-wide">
          An editorial discovery platform and live price-comparison index.
          Curating player issues, fan cuts, and rare archival shirts across 22+ independent stores in India.
        </p>

        {/* Action Buttons including Dark Spider-Man theme button */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/#catalog"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground hover:opacity-90 transition-all text-[11px] font-medium tracking-[0.25em] uppercase shadow-md"
          >
            <span>Explore The Collection</span>
          </Link>

          <Link
            href="/clearance"
            className="inline-flex items-center justify-center px-8 py-4 border border-border hover:border-foreground text-foreground hover:bg-secondary transition-colors text-[11px] font-medium tracking-[0.25em] uppercase"
          >
            <span>Clearance Markdowns</span>
          </Link>

          {/* Dark Spider-Man Theme Button */}
          <SpidermanThemeButton variant="banner" className="h-[49px]" />
        </div>
      </div>

      {/* Bottom Campaign Metadata Ticker */}
      <div className="relative z-10 pt-4 border-t border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
        <div className="flex items-center gap-10">
          <div>
            <span className="font-serif text-lg font-normal text-foreground block leading-none">
              6,500+
            </span>
            <span className="text-[10px] text-muted-foreground">INDEXED SHIRTS</span>
          </div>
          <div>
            <span className={`font-serif text-lg font-normal block leading-none ${isSpiderman ? "text-primary" : "text-foreground"}`}>
              22+
            </span>
            <span className="text-[10px] text-muted-foreground">ACTIVE BOUTIQUES</span>
          </div>
          <div>
            <span className="font-serif text-lg font-normal text-foreground block leading-none">
              ₹220+
            </span>
            <span className="text-[10px] text-muted-foreground">STARTING PRICE</span>
          </div>
        </div>

        <Link
          href="/#catalog"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          aria-label="Scroll to collection"
        >
          <span>VIEW FULL CATALOGUE</span>
          <ArrowDown className="size-3.5 stroke-[1.5] animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
