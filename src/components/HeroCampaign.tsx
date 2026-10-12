import React from "react";
import Link from "next/link";
import { ArrowDown, Sparkles } from "lucide-react";

export function HeroCampaign() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 bg-background text-foreground overflow-hidden border-b border-border">
      {/* Background Graphic Visual */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-35 scale-[1.02]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2600&auto=format&fit=crop')`,
            backgroundPosition: "center 30%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/80" />
      </div>

      {/* Top Tagline */}
      <div className="relative z-10 pt-4 flex items-center justify-between border-b border-border/60 pb-3 text-xs tracking-wider uppercase text-muted-foreground font-semibold">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span>Live Catalog Synchronized</span>
        </div>
        <span className="hidden sm:inline">22+ Indian Football Stores</span>
        <span>Every Jersey, One Catalog</span>
      </div>

      {/* Center Campaign Title with Barlow Condensed */}
      <div className="relative z-10 my-auto py-12 sm:py-20 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="size-3.5" />
          <span>Compare Live Prices & Stock</span>
        </div>

        <h1 className="display-title text-5xl sm:text-7xl md:text-8xl font-black text-foreground tracking-tight leading-[0.95] mb-4">
          EVERY JERSEY,
          <br />
          <span className="text-primary">ONE CATALOG.</span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground font-normal max-w-xl leading-relaxed mb-8">
          Compare football jersey prices and stock across 22+ stores in India.
          Player versions, fan editions, retro shirts, and clearance markdowns in one place.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:brightness-110 transition-all shadow-lg hover:shadow-primary/20"
          >
            <span>Explore The Collection</span>
            <span>→</span>
          </Link>
          <Link
            href="/clearance"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary hover:bg-secondary/80 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-primary/50 transition-colors"
          >
            <span>Clearance Markdowns</span>
          </Link>
        </div>
      </div>

      {/* Bottom Campaign Metadata Ticker */}
      <div className="relative z-10 pt-4 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs tracking-wider uppercase text-muted-foreground">
        <div className="flex items-center gap-8">
          <div>
            <span className="font-display text-lg font-bold text-foreground block leading-tight">
              6,500+
            </span>
            <span className="text-[11px] text-muted-foreground font-semibold">Kits Indexed</span>
          </div>
          <div>
            <span className="font-display text-lg font-bold text-primary block leading-tight">
              22+
            </span>
            <span className="text-[11px] text-muted-foreground font-semibold">Verified Stores</span>
          </div>
          <div>
            <span className="font-display text-lg font-bold text-foreground block leading-tight">
              ₹220+
            </span>
            <span className="text-[11px] text-muted-foreground font-semibold">Starting Price</span>
          </div>
        </div>

        <Link
          href="/#catalog"
          className="flex items-center gap-2 text-primary hover:underline text-xs font-semibold"
          aria-label="Scroll to collection"
        >
          <span>Jump to Catalog</span>
          <ArrowDown className="size-3.5 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
