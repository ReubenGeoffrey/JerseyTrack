import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#07090e] border-t border-border text-muted-foreground pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Philosophy */}
          <div className="space-y-4">
            <Link
              href="/"
              className="display-title inline-block text-2xl font-black tracking-tight text-foreground hover:opacity-90 transition-opacity"
            >
              Kit<span className="text-primary">Scout</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm tracking-wide">
              An all-in-one football jersey discovery and price-comparison engine. Indexing authentic player editions, fan cuts, and rare retros across 22+ verified Indian stockists.
            </p>
            <div className="pt-2 text-[11px] tracking-[0.15em] uppercase text-muted-foreground/60 font-semibold">
              EST. 2025 · 22+ MONITORED STORES
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-muted-foreground">
              <li>
                <Link
                  href="/?category=player#catalog"
                  className="hover:text-primary transition-colors uppercase font-medium"
                >
                  Player Editions
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=fan#catalog"
                  className="hover:text-primary transition-colors uppercase font-medium"
                >
                  Fan Versions
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=retro#catalog"
                  className="hover:text-primary transition-colors uppercase font-medium"
                >
                  Archive & Retros
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=international#catalog"
                  className="hover:text-primary transition-colors uppercase font-medium"
                >
                  National Teams
                </Link>
              </li>
              <li>
                <Link
                  href="/clearance"
                  className="hover:text-sale transition-colors uppercase font-medium text-sale"
                >
                  Clearance Markdowns
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory & Intel */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground">
              Directory & Intel
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-muted-foreground">
              <li>
                <Link
                  href="/stores"
                  className="hover:text-primary transition-colors uppercase font-medium"
                >
                  Verified Store Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  className="hover:text-primary transition-colors uppercase font-medium"
                >
                  Store Ratings & Speed
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalog"
                  className="hover:text-primary transition-colors uppercase font-medium"
                >
                  Price Comparison
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="hover:text-primary transition-colors uppercase font-medium"
                >
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground">
              Live Index Info
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed tracking-wide">
              All prices displayed in Indian Rupees (₹). Listings synchronize directly with verified partner inventories. Orders are placed directly on each retailer&apos;s checkout.
            </p>
            <div className="pt-1 text-[11px] text-muted-foreground/60 uppercase tracking-widest font-semibold">
              CURRENCY: INR (₹) · 6,500+ KITS INDEXED
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground tracking-[0.15em] uppercase font-semibold">
          <div>
            © {new Date().getFullYear()} KITSCOUT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Browse
            </Link>
            <Link href="/clearance" className="hover:text-foreground transition-colors">
              Clearance
            </Link>
            <Link href="/stores" className="hover:text-foreground transition-colors">
              Stores
            </Link>
            <Link href="/favorites" className="hover:text-foreground transition-colors">
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
