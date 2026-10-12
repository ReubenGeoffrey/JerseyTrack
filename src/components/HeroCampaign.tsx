import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function HeroCampaign() {
  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background Editorial Visual */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-45 scale-[1.02] transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2600&auto=format&fit=crop')`,
            backgroundPosition: "center 30%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      </div>

      {/* Top Tagline */}
      <div className="relative z-10 pt-4 flex items-center justify-between border-b border-white/15 pb-4 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-neutral-400">
        <span>EDITORIAL ISSUE 2025 — V.01</span>
        <span className="hidden sm:inline">AUTHENTIC FOOTBALL APPAREL</span>
        <span>INDEXED IN REAL-TIME</span>
      </div>

      {/* Center Campaign Title & Typography */}
      <div className="relative z-10 my-auto py-16 sm:py-24 max-w-5xl">
        <span className="inline-block text-[11px] sm:text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4">
          CURATED ARCHIVE & NEW RELEASES
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-[0.14em] uppercase text-white leading-[1.05] sm:leading-[1] mb-6">
          THE FOOTBALL
          <br />
          <span className="font-normal">COLLECTION</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light tracking-wide max-w-xl leading-relaxed mb-10">
          Iconic shirts. Timeless colours. Your next favourite kit.
          <span className="block text-neutral-400 text-xs sm:text-sm mt-1">
            Compare live prices and verified stock across India&apos;s finest independent football boutiques.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-3 text-xs tracking-[0.22em] uppercase font-medium text-white hover:text-neutral-300 transition-colors group border-b border-white/60 pb-1.5 w-fit"
          >
            <span>EXPLORE THE COLLECTION</span>
            <span className="group-hover:translate-x-1.5 transition-transform">→</span>
          </Link>
          <Link
            href="/clearance"
            className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-neutral-400 hover:text-white transition-colors pb-1.5 w-fit"
          >
            <span>VIEW CLEARANCE MARKDOWNS</span>
          </Link>
        </div>
      </div>

      {/* Bottom Campaign Metadata Ticker */}
      <div className="relative z-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-neutral-400">
        <div className="flex items-center gap-8">
          <div>
            <span className="text-white block font-medium text-xs">5,900+</span>
            <span>INDEXED KITS</span>
          </div>
          <div>
            <span className="text-white block font-medium text-xs">13</span>
            <span>VERIFIED BOUTIQUES</span>
          </div>
          <div>
            <span className="text-white block font-medium text-xs">₹249+</span>
            <span>CLEARANCE ARCHIVE</span>
          </div>
        </div>

        <Link
          href="/#catalog"
          className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
          aria-label="Scroll to collection"
        >
          <span>DISCOVER BELOW</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
