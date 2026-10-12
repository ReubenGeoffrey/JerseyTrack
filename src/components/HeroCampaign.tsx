"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SpiderInsigniaIcon, SpiderWebGraphic, SpiderMaskIcon } from "./SpiderIcons";
import { SpidermanThemeButton } from "./SpidermanThemeButton";

export function HeroCampaign() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-8 lg:px-12 bg-background text-foreground overflow-hidden border-b border-border">
      {/* Background Ambience with Spider Web Geometry */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Unsplash Editorial High-Res Jersey Background */}
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-[0.14] scale-[1.02] transition-opacity duration-700"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2600&auto=format&fit=crop')`,
            backgroundPosition: "center 30%",
          }}
        />
        {/* Dark Vignette & Spider Web Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />
        
        {/* Ambient spider web top right corner */}
        <SpiderWebGraphic className="absolute -top-12 -right-12 w-96 h-96 text-primary/10 animate-spiderFloat" />
        
        {/* Ambient glowing radial light */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Top Editorial Bar */}
      <div className="relative z-10 pt-2 flex items-center justify-between border-b border-border/70 pb-3 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-muted-foreground font-medium">
        <div className="flex items-center gap-2">
          <SpiderInsigniaIcon size={14} className="text-primary animate-spiderFloat" />
          <span className="font-mono text-foreground font-semibold">SYMBIOTE SUIT · MILES MORALES ARCHIVE</span>
        </div>
        <span className="hidden sm:inline">22+ VERIFIED INDIAN STOCKISTS</span>
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">●</span>
          <span className="tracking-widest">FOOTBALL TRACKING KIT</span>
        </div>
      </div>

      {/* Center Campaign Title with Zara Editorial / Spider-Man Typography */}
      <div className="relative z-10 my-auto py-10 sm:py-16 lg:py-20 max-w-5xl">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-mono font-medium block">
            DARK SYMBIOTE CURATION · 22 STORES
          </span>
          <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-primary border border-primary/40 px-2.5 py-0.5 rounded-full bg-primary/10 shadow-spider-glow">
            <SpiderMaskIcon size={12} />
            <span>Spider-Man Edition</span>
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-foreground tracking-[0.05em] leading-[0.95] mb-6 select-none">
          THE FOOTBALL
          <br />
          <span className="text-primary drop-shadow-[0_0_25px_rgba(255,23,68,0.55)]">
            COLLECTION.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground font-light max-w-xl leading-relaxed mb-8 sm:mb-10 tracking-wide">
          An editorial discovery platform and live price-comparison index.
          Aggregating player issues, fan cuts, and rare archival shirts across 22+ verified independent stores in India.
        </p>

        {/* Action Buttons with Dark Spider-Man Theme styling */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          <Link
            href="/#catalog"
            className="btn-spider-primary justify-center w-full sm:w-auto"
          >
            <SpiderInsigniaIcon size={18} className="text-white" />
            <span>Explore Collection</span>
          </Link>

          <Link
            href="/clearance"
            className="btn-spider-stealth justify-center w-full sm:w-auto"
          >
            <span>Clearance Markdowns</span>
          </Link>

          {/* Interactive Dark Spider-Man Theme Button */}
          <SpidermanThemeButton variant="banner" className="w-full sm:w-auto" />
        </div>
      </div>

      {/* Bottom Campaign Metadata Ticker */}
      <div className="relative z-10 pt-4 border-t border-border/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
        <div className="flex items-center gap-6 sm:gap-10">
          <div>
            <span className="font-serif text-lg sm:text-xl font-normal text-foreground block leading-none">
              6,569+
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground font-mono">INDEXED SHIRTS</span>
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-normal text-primary block leading-none">
              22+
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground font-mono">ACTIVE BOUTIQUES</span>
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-normal text-foreground block leading-none">
              ₹220+
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground font-mono">STARTING PRICE</span>
          </div>
        </div>

        <Link
          href="/#catalog"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium min-h-[44px] touch-manipulation py-2"
          aria-label="Scroll to collection"
        >
          <span className="tracking-[0.2em] text-[10px] sm:text-[11px]">VIEW FULL CATALOGUE</span>
          <ArrowDown className="size-3.5 stroke-[2] text-primary animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
