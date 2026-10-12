import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function HeroCampaign() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 lg:px-12 bg-white text-black overflow-hidden border-b border-neutral-200">
      {/* Editorial High-Fashion Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-[0.22] scale-[1.02]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2600&auto=format&fit=crop')`,
            backgroundPosition: "center 30%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60" />
      </div>

      {/* Top Editorial Bar */}
      <div className="relative z-10 pt-2 flex items-center justify-between border-b border-neutral-200/80 pb-3 text-[11px] tracking-[0.25em] uppercase text-neutral-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-black" />
          <span>AUTUMN / WINTER 2025/26</span>
        </div>
        <span className="hidden sm:inline">22+ VERIFIED INDIAN STOCKISTS</span>
        <span>FOOTBALL TRACKING KIT</span>
      </div>

      {/* Center Campaign Title with Zara Editorial Typography */}
      <div className="relative z-10 my-auto py-12 sm:py-20 max-w-4xl">
        <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-medium block mb-4">
          EDITORIAL ARCHIVE · CURATED INDEX
        </span>

        <h1 className="display-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-black tracking-[0.06em] leading-[0.95] mb-6">
          THE FOOTBALL
          <br />
          COLLECTION.
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 font-light max-w-xl leading-relaxed mb-10 tracking-wide">
          An editorial discovery platform and live price-comparison index.
          Curating player issues, fan cuts, and rare archival shirts across 22+ independent stores in India.
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/#catalog"
            className="inline-flex items-center justify-center px-8 py-4 bg-black text-white hover:bg-neutral-800 transition-colors text-[11px] font-medium tracking-[0.25em] uppercase"
          >
            <span>Explore The Collection</span>
          </Link>
          <Link
            href="/clearance"
            className="inline-flex items-center justify-center px-8 py-4 border border-neutral-300 hover:border-black text-black hover:bg-neutral-50 transition-colors text-[11px] font-medium tracking-[0.25em] uppercase"
          >
            <span>Clearance Markdowns</span>
          </Link>
        </div>
      </div>

      {/* Bottom Campaign Metadata Ticker */}
      <div className="relative z-10 pt-4 border-t border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] tracking-[0.2em] uppercase text-neutral-500">
        <div className="flex items-center gap-10">
          <div>
            <span className="font-serif text-lg font-normal text-black block leading-none">
              6,500+
            </span>
            <span className="text-[10px] text-neutral-400">INDEXED SHIRTS</span>
          </div>
          <div>
            <span className="font-serif text-lg font-normal text-black block leading-none">
              22+
            </span>
            <span className="text-[10px] text-neutral-400">ACTIVE BOUTIQUES</span>
          </div>
          <div>
            <span className="font-serif text-lg font-normal text-black block leading-none">
              ₹220+
            </span>
            <span className="text-[10px] text-neutral-400">STARTING PRICE</span>
          </div>
        </div>

        <Link
          href="/#catalog"
          className="flex items-center gap-2 text-black hover:opacity-60 transition-opacity font-medium"
          aria-label="Scroll to collection"
        >
          <span>VIEW FULL CATALOGUE</span>
          <ArrowDown className="size-3.5 stroke-[1.5] animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
