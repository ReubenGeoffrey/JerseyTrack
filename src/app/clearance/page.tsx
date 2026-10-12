import React, { Suspense } from "react";
import { getClearanceProducts, getAllStores } from "@/lib/data";
import { ProductCatalog } from "@/components/ProductCatalog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SpiderInsigniaIcon, SpiderWebGraphic } from "@/components/SpiderIcons";

export const metadata = {
  title: "The Archive Sale — Clearance | Football Tracking Kit",
  description:
    "Discounted authentic football shirts across 22+ boutiques. Verified seasonal markdowns on player versions, fan shirts, and rare retros in dark Spider-Man edition.",
};

export default function ClearancePage() {
  const clearanceProducts = getClearanceProducts();
  const stores = getAllStores();

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-background text-foreground min-h-screen transition-colors duration-200 relative overflow-hidden">
      {/* Spider web ambient graphic */}
      <SpiderWebGraphic className="absolute top-10 right-0 w-96 h-96 text-primary/5 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-muted-foreground hover:text-primary mb-6 transition-colors font-medium min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.8]" />
          <span>Return to Collection</span>
        </Link>

        <div className="border border-border/80 bg-card/90 text-foreground p-6 sm:p-12 lg:p-14 mb-8 relative overflow-hidden rounded-sm shadow-spider-glow">
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <SpiderInsigniaIcon size={14} className="text-primary animate-spiderFloat" />
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-primary font-bold block">
                ARCHIVE SALE · LIMITED AVAILABILITY
              </span>
            </div>
            <h1 className="display-title text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.06em] uppercase mb-4 leading-[0.95]">
              THE ARCHIVE
              <br />
              <span className="text-primary drop-shadow-[0_0_20px_rgba(255,23,68,0.5)]">SALE.</span>
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
          <div className="py-24 text-center text-xs tracking-[0.2em] uppercase font-mono text-muted-foreground font-medium">
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
