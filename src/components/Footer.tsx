"use client";

import React from "react";
import Link from "next/link";
import { SpiderInsigniaIcon, SpiderWebGraphic } from "./SpiderIcons";
import { SpidermanThemeButton } from "./SpidermanThemeButton";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-card/60 border-t border-border/80 text-muted-foreground pt-16 sm:pt-20 pb-[calc(3rem+env(safe-area-inset-bottom))] transition-colors duration-200 overflow-hidden">
      {/* Spider web ambient background in footer */}
      <SpiderWebGraphic className="absolute -bottom-16 -left-16 w-80 h-80 text-primary/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12 mb-14">
          {/* Brand Philosophy */}
          <div className="space-y-4">
            <Link
              href="/"
              className="display-title inline-flex items-center gap-2.5 text-xl sm:text-2xl font-bold tracking-[0.18em] text-foreground hover:text-primary transition-colors"
            >
              <SpiderInsigniaIcon size={22} className="text-primary animate-spiderFloat" />
              <span>FOOTBALL TRACKING KIT</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm tracking-wide">
              An editorial football jersey discovery index and multi-boutique price-comparison engine. Dark Spider-Man edition tracking player issues, fan versions, archival retros, and live prices across 22+ stores in India.
            </p>
            <div className="pt-2 text-[10px] tracking-[0.22em] uppercase font-mono text-muted-foreground font-medium flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>EST. 2025 · 22+ MONITORED BOUTIQUES</span>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-foreground">
              Collections
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-muted-foreground">
              <li>
                <Link
                  href="/?category=player#catalog"
                  className="hover:text-primary transition-colors uppercase min-h-[36px] inline-flex items-center"
                >
                  Player Issue
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=fan#catalog"
                  className="hover:text-primary transition-colors uppercase min-h-[36px] inline-flex items-center"
                >
                  Fan Version
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=retro#catalog"
                  className="hover:text-primary transition-colors uppercase min-h-[36px] inline-flex items-center"
                >
                  Archive & Retro
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=international#catalog"
                  className="hover:text-primary transition-colors uppercase min-h-[36px] inline-flex items-center"
                >
                  National Teams
                </Link>
              </li>
              <li>
                <Link
                  href="/clearance"
                  className="hover:text-primary transition-colors uppercase text-primary font-bold min-h-[36px] inline-flex items-center"
                >
                  Clearance Markdowns
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory & Intel */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-foreground">
              Index & Directory
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-muted-foreground">
              <li>
                <Link
                  href="/stores"
                  className="hover:text-primary transition-colors uppercase min-h-[36px] inline-flex items-center"
                >
                  Verified Boutique Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  className="hover:text-primary transition-colors uppercase min-h-[36px] inline-flex items-center"
                >
                  Store Ratings & Speed
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalog"
                  className="hover:text-primary transition-colors uppercase min-h-[36px] inline-flex items-center"
                >
                  Price Comparison
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="hover:text-primary transition-colors uppercase min-h-[36px] inline-flex items-center"
                >
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Specifications & GitHub */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-foreground">
              Suit & Specifications
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed tracking-wide">
              All prices displayed in Indian Rupees (₹). Listings synchronize directly with verified partner inventories.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <SpidermanThemeButton variant="compact" />

              <a
                href="https://github.com/ReubenGeoffrey/JerseyTrack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/80 bg-background/80 hover:border-primary text-xs font-mono text-muted-foreground hover:text-white transition-all shadow-spider-glow min-h-[44px] touch-manipulation active:scale-95"
                title="View on GitHub"
              >
                <Github className="size-4 text-primary" />
                <span>GitHub Source</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-muted-foreground tracking-[0.2em] font-mono uppercase font-medium">
          <div>
            © {new Date().getFullYear()} FOOTBALL TRACKING KIT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors min-h-[36px] inline-flex items-center">
              Collection
            </Link>
            <Link href="/clearance" className="hover:text-primary transition-colors min-h-[36px] inline-flex items-center">
              Clearance
            </Link>
            <Link href="/stores" className="hover:text-primary transition-colors min-h-[36px] inline-flex items-center">
              Boutiques
            </Link>
            <Link href="/favorites" className="hover:text-primary transition-colors min-h-[36px] inline-flex items-center">
              Wishlist
            </Link>
            <a
              href="https://github.com/ReubenGeoffrey/JerseyTrack"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors min-h-[36px] inline-flex items-center gap-1.5"
            >
              <Github className="size-3.5 text-primary" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
