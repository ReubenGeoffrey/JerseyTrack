import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 text-neutral-600 pt-20 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Philosophy */}
          <div className="space-y-4">
            <Link
              href="/"
              className="display-title inline-block text-xl sm:text-2xl font-bold tracking-[0.2em] text-black hover:opacity-75 transition-opacity"
            >
              FOOTBALL TRACKING KIT
            </Link>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm tracking-wide">
              An editorial football jersey discovery index and multi-boutique price-comparison engine. Indexing authentic player editions, fan cuts, and rare archival retros across 22+ verified Indian stockists.
            </p>
            <div className="pt-2 text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-medium">
              EST. 2025 · 22+ MONITORED BOUTIQUES
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium tracking-[0.22em] uppercase text-black">
              Collections
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-neutral-500">
              <li>
                <Link
                  href="/?category=player#catalog"
                  className="hover:text-black transition-colors uppercase"
                >
                  Player Issue
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=fan#catalog"
                  className="hover:text-black transition-colors uppercase"
                >
                  Fan Version
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=retro#catalog"
                  className="hover:text-black transition-colors uppercase"
                >
                  Archive & Retro
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=international#catalog"
                  className="hover:text-black transition-colors uppercase"
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
            <h4 className="text-[11px] font-medium tracking-[0.22em] uppercase text-black">
              Index & Directory
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-neutral-500">
              <li>
                <Link
                  href="/stores"
                  className="hover:text-black transition-colors uppercase"
                >
                  Verified Boutique Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  className="hover:text-black transition-colors uppercase"
                >
                  Store Ratings & Speed
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalog"
                  className="hover:text-black transition-colors uppercase"
                >
                  Price Comparison
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="hover:text-black transition-colors uppercase"
                >
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium tracking-[0.22em] uppercase text-black">
              Live Index Info
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed tracking-wide">
              All prices displayed in Indian Rupees (₹). Listings synchronize directly with verified partner inventories. Orders are placed directly on each retailer&apos;s checkout.
            </p>
            <div className="pt-1 text-[10px] text-neutral-400 uppercase tracking-widest font-medium">
              CURRENCY: INR (₹) · 6,500+ SHIRTS INDEXED
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-400 tracking-[0.2em] uppercase font-medium">
          <div>
            © {new Date().getFullYear()} FOOTBALL TRACKING KIT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6 text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors">
              Collection
            </Link>
            <Link href="/clearance" className="hover:text-black transition-colors">
              Clearance
            </Link>
            <Link href="/stores" className="hover:text-black transition-colors">
              Boutiques
            </Link>
            <Link href="/favorites" className="hover:text-black transition-colors">
              Wishlist
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
