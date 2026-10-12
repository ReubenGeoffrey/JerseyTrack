import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 text-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Philosophy */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-black">
              KITSCOUTS
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm tracking-wide">
              An editorial football jersey discovery index. Curating authentic player editions, fan cuts, and rare archival retros from India&apos;s leading independent football stockists.
            </p>
            <div className="pt-2 text-[11px] tracking-[0.15em] uppercase text-neutral-400">
              EST. 2025 · INDIA
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-neutral-500">
              <li>
                <Link href="/?category=player#catalog" className="hover:text-black transition-colors uppercase">
                  Player Issue
                </Link>
              </li>
              <li>
                <Link href="/?category=fan#catalog" className="hover:text-black transition-colors uppercase">
                  Fan Version
                </Link>
              </li>
              <li>
                <Link href="/?category=retro#catalog" className="hover:text-black transition-colors uppercase">
                  Archive & Retro
                </Link>
              </li>
              <li>
                <Link href="/?category=international#catalog" className="hover:text-black transition-colors uppercase">
                  National Teams
                </Link>
              </li>
              <li>
                <Link href="/clearance" className="hover:text-black transition-colors uppercase">
                  The Last Chance
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory & Intel */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black">
              INDEX & DIRECTORY
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-neutral-500">
              <li>
                <Link href="/stores" className="hover:text-black transition-colors uppercase">
                  Verified Store Reviews
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-black transition-colors uppercase">
                  Store Ratings & Speed
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-black transition-colors uppercase">
                  Price Comparison
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-black transition-colors uppercase">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black">
              SPECIFICATIONS
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed tracking-wide">
              All prices displayed in Indian Rupees (INR ₹). Listings synchronize with verified partner inventories. Orders are completed directly on the respective retailer&apos;s checkout.
            </p>
            <div className="pt-1 text-[11px] text-neutral-400 uppercase tracking-widest">
              CURRENCY: INR (₹) · ALL TAXES AS APPLICABLE
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 tracking-[0.15em] uppercase">
          <div>
            © {new Date().getFullYear()} KITSCOUTS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-black transition-colors">
              PRIVACY
            </Link>
            <Link href="/" className="hover:text-black transition-colors">
              TERMS
            </Link>
            <Link href="/stores" className="hover:text-black transition-colors">
              STOCKISTS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
