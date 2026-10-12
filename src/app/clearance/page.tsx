import React, { Suspense } from "react";
import { getClearanceProducts, getAllStores } from "@/lib/data";
import { ProductCatalog } from "@/components/ProductCatalog";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";

export const metadata = {
  title: "Clearance & Markdowns | KitScouts",
  description:
    "Discounted authentic football shirts across 22+ stores. Verified markdowns on player versions, fan shirts, and rare retros.",
};

export default function ClearancePage() {
  const clearanceProducts = getClearanceProducts();
  const stores = getAllStores();

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-muted-foreground hover:text-primary mb-6 transition-colors font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Browse</span>
        </Link>

        <div className="bg-card border border-border text-foreground p-8 sm:p-12 lg:p-14 mb-8 relative overflow-hidden rounded-lg shadow-sm">
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sale/40 bg-sale/10 text-sale text-xs uppercase font-bold tracking-wider mb-3">
              <Tag className="w-3.5 h-3.5" />
              Limited Stock Markdowns
            </span>
            <h1 className="display-title text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase mb-3 leading-[0.95]">
              CLEARANCE
              <br />
              <span className="text-sale">MARKDOWNS.</span>
            </h1>
            <p className="text-sm text-muted-foreground font-normal max-w-lg leading-relaxed">
              Verified seasonal discounts and clearance deals across India&apos;s leading football stockists. Filter by size and compare price cuts in real time.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 text-[120px] sm:text-[180px] font-black tracking-tighter text-sale/5 select-none pointer-events-none pr-6 pb-2 leading-none">
            SALE
          </div>
        </div>
      </div>

      {/* Catalog Component */}
      <Suspense
        fallback={
          <div className="py-24 text-center text-xs tracking-wider uppercase text-muted-foreground font-semibold">
            Loading clearance deals...
          </div>
        }
      >
        <ProductCatalog
          initialProducts={clearanceProducts}
          stores={stores}
          defaultCategory="clearance"
          title="Clearance Markdowns"
          subtitle="Showing verified discounted shirts across all retail partners."
        />
      </Suspense>
    </div>
  );
}
