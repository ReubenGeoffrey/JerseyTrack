"use client";

import React from "react";
import Link from "next/link";
import { SpidermanThemeButton } from "./SpidermanThemeButton";

export function Footer() {
  return (
    <footer className="bg-secondary/40 border-t border-border text-muted-foreground pt-20 pb-14 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Philosophy */}
          <div className="space-y-4">
            <Link
              href="/"
              className="display-title inline-block text-xl sm:text-2xl font-bold tracking-[0.2em] text-foreground hover:opacity-75 transition-opacity"
            >
              FOOTBALL TRACKING KIT
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm tracking-wide">
              An editorial football jersey discovery index and multi-boutique price-comparison engine. Indexing authentic player editions, fan cuts, and rare archival retros across 22+ verified Indian stockists.
            </p>
            <div className="pt-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground/80 font-medium flex items-center gap-3">
              <span>EST. 2025 · 22+ MONITORED BOUTIQUES</span>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium tracking-[0.22em] uppercase text-foreground">
              Collections
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-muted-foreground">
              <li>
                <Link
                  href="/?category=player#catalog"
                  className="hover:text-primary transition-colors uppercase"
                >
                  Player Issue
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=fan#catalog"
                  className="hover:text-primary transition-colors uppercase"
                >
                  Fan Version
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=retro#catalog"
                  className="hover:text-primary transition-colors uppercase"
                >
                  Archive & Retro
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=international#catalog"
                  className="hover:text-primary transition-colors uppercase"
                >
                  National Teams
                </Link>
              </li>
              <li>
                <Link
                  href="/clearance"
                  className="hover:text-sale transition-colors uppercase text-sale font-medium"
                >
                  Clearance Markdowns
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory & Intel */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium tracking-[0.22em] uppercase text-foreground">
              Index & Directory
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-muted-foreground">
              <li>
                <Link
                  href="/stores"
                  className="hover:text-primary transition-colors uppercase"
                >
                  Verified Boutique Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  className="hover:text-primary transition-colors uppercase"
                >
                  Store Ratings & Speed
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalog"
                  className="hover:text-primary transition-colors uppercase"
                >
                  Price Comparison
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="hover:text-primary transition-colors uppercase"
                >
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium tracking-[0.22em] uppercase text-foreground">
              Theme & Specifications
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed tracking-wide">
              All prices displayed in Indian Rupees (₹). Listings synchronize directly with verified partner inventories.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <SpidermanThemeButton variant="compact" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-medium">
          <div>
            © {new Date().getFullYear()} FOOTBALL TRACKING KIT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6 text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Collection
            </Link>
            <Link href="/clearance" className="hover:text-primary transition-colors">
              Clearance
            </Link>
            <Link href="/stores" className="hover:text-primary transition-colors">
              Boutiques
            </Link>
            <Link href="/favorites" className="hover:text-primary transition-colors">
              Wishlist
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
