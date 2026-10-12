import React, { Suspense } from "react";
import { getClearanceProducts, getAllStores } from "@/lib/data";
import { ProductCatalog } from "@/components/ProductCatalog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "The Last Chance — Clearance | KitScouts",
  description:
    "Discounted authentic football shirts across all stores. Significant verified markdowns on fan, player, and archival editions.",
};

export default function ClearancePage() {
  const clearanceProducts = getClearanceProducts();
  const stores = getAllStores();

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-white min-h-screen">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-neutral-400 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>RETURN TO HOMEPAGE</span>
        </Link>

        <div className="bg-[#0f0f0f] text-white p-8 sm:p-14 lg:p-16 mb-8 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 block mb-3">
              ARCHIVAL ARCHIVE · LIMITED INVENTORY
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.14em] uppercase mb-4 leading-tight">
              THE LAST
              <br />
              <span className="font-normal">CHANCE</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 tracking-wide font-light max-w-lg leading-relaxed">
              Verified seasonal discounts and clearance jerseys across India&apos;s premier stockists. Marked down pieces are in limited stock and sold on a first-come basis.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 text-[120px] sm:text-[180px] font-extralight tracking-tighter text-white/5 select-none pointer-events-none pr-6 pb-2">
            SALE
          </div>
        </div>
      </div>

      {/* Catalog Component */}
      <Suspense
        fallback={
          <div className="py-24 text-center text-xs tracking-[0.2em] uppercase text-neutral-400">
            LOADING CLEARANCE PIECES...
          </div>
        }
      >
        <ProductCatalog
          initialProducts={clearanceProducts}
          stores={stores}
          defaultCategory="clearance"
          title="CLEARANCE MARKDOWNS"
          subtitle="Showing only verified discounted pieces across all retail partners."
        />
      </Suspense>
    </div>
  );
}
