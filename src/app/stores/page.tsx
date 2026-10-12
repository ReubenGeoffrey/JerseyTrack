import React from "react";
import { getAllStores } from "@/lib/data";
import { StoreList } from "@/components/StoreList";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Boutique Directory & Verified Ratings | Football Tracking Kit",
  description:
    "Ratings, live product feeds, and verified reviews for 26 independent football jersey boutiques across India.",
};

export default function StoresPage() {
  const stores = getAllStores();

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-neutral-400 hover:text-black mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Return to Collection</span>
        </Link>

        {/* Heading */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-medium mb-2">
            <ShieldCheck className="w-3.5 h-3.5 stroke-[1.5] text-black" />
            <span>VERIFIED RETAIL INDEX</span>
          </div>
          <h1 className="display-title text-4xl sm:text-6xl font-normal tracking-[0.06em] uppercase text-black mb-3">
            BOUTIQUE DIRECTORY & REVIEWS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 tracking-wide max-w-2xl leading-relaxed font-light">
            Community ratings, fulfillment speed, and product authenticity audits for India&apos;s leading football jersey stockists. All listings are monitored continuously.
          </p>

          <div className="mt-6 flex flex-wrap gap-6 text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              <span>{stores.length} Monitored Boutiques</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              <span>Direct Checkout Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              <span>Independent Ratings</span>
            </div>
          </div>
        </div>

        {/* Store List */}
        <StoreList initialStores={stores} />
      </div>
    </div>
  );
}
