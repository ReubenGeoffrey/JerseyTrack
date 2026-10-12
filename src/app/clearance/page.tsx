import React, { Suspense } from "react";
import { getClearanceProducts, getAllStores } from "@/lib/data";
import { ProductCatalog } from "@/components/ProductCatalog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "The Archive Sale — Clearance | Football Tracking Kit",
  description:
    "Discounted authentic football shirts across 22+ boutiques. Verified seasonal markdowns on player versions, fan shirts, and rare retros.",
};

export default function ClearancePage() {
  const clearanceProducts = getClearanceProducts();
  const stores = getAllStores();

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-background text-foreground min-h-screen transition-colors duration-200">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Return to Collection</span>
        </Link>

        <div className="border border-border bg-card text-foreground p-8 sm:p-14 lg:p-16 mb-8 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-sale font-medium block mb-3">
              ARCHIVE SALE · LIMITED AVAILABILITY
            </span>
            <h1 className="display-title text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.06em] uppercase mb-4 leading-[0.95]">
              THE ARCHIVE
              <br />
              <span className="text-sale">SALE.</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-lg leading-relaxed tracking-wide">
              Verified seasonal discounts and clearance jerseys across India&apos;s leading football stockists. Marked down pieces are in limited stock and sold on a first-come basis.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 text-[120px] sm:text-[180px] font-normal tracking-tighter text-foreground/5 select-none pointer-events-none pr-6 pb-2 leading-none font-serif">
            SALE
          </div>
        </div>
      </div>

      {/* Catalog Component */}
      <Suspense
        fallback={
          <div className="py-24 text-center text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
            Loading clearance pieces...
          </div>
        }
      >
        <ProductCatalog
          initialProducts={clearanceProducts}
          stores={stores}
          defaultCategory="clearance"
          title="The Archive Sale"
          subtitle="Showing only verified discounted pieces across all retail partners."
        />
      </Suspense>
    </div>
  );
}
