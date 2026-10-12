import React from "react";
import { getAllStores } from "@/lib/data";
import { StoreList } from "@/components/StoreList";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Store Directory & Verified Ratings | KitScouts",
  description:
    "Ratings, live product feeds, and verified reviews for 26 independent football jersey stores across India.",
};

export default function StoresPage() {
  const stores = getAllStores();

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-background text-foreground min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-muted-foreground hover:text-primary mb-8 transition-colors font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Browse</span>
        </Link>

        {/* Heading */}
        <div className="border-b border-border pb-8 mb-8">
          <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-primary font-semibold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Retailer Directory</span>
          </div>
          <h1 className="display-title text-4xl sm:text-6xl font-black tracking-tight uppercase text-foreground mb-3">
            STORE DIRECTORY & REVIEWS
          </h1>
          <p className="text-sm text-muted-foreground tracking-wide max-w-2xl leading-relaxed">
            Community ratings, fulfillment speed, and product authenticity audits for India&apos;s leading football jersey stockists. All listings are monitored continuously.
          </p>

          <div className="mt-6 flex flex-wrap gap-6 text-xs tracking-wider uppercase text-muted-foreground font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>{stores.length} Monitored Stores</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>Direct Checkout Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
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
