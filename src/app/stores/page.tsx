import React from "react";
import { getAllStores } from "@/lib/data";
import { StoreList } from "@/components/StoreList";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Store Directory & Verified Ratings | KitScouts",
  description:
    "Ratings and reviews for 13+ independent jersey stores across India. Verified delivery speeds, customer support ratings, and jersey quality scores.",
};

export default function StoresPage() {
  const stores = getAllStores();

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-neutral-400 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>RETURN TO HOMEPAGE</span>
        </Link>

        {/* Editorial Heading */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
            <span>VERIFIED RETAIL INDEX</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-[0.14em] uppercase text-black mb-3">
            STORE DIRECTORY & REVIEWS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 tracking-wider max-w-2xl leading-relaxed">
            Community ratings, fulfillment speed, and product authenticity audits for India&apos;s leading football jersey stockists. All listings are monitored continuously.
          </p>

          <div className="mt-6 flex flex-wrap gap-6 text-[11px] tracking-[0.18em] uppercase text-neutral-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              <span>{stores.length} MONITORED STORES</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              <span>DIRECT CHECKOUT DISPATCH</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              <span>INDEPENDENT REVIEWS</span>
            </div>
          </div>
        </div>

        {/* Store List */}
        <StoreList initialStores={stores} />
      </div>
    </div>
  );
}
