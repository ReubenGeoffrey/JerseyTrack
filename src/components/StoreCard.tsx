import React from "react";
import Link from "next/link";
import { Store } from "@/types";
import { ExternalLink } from "lucide-react";

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  const { meta, stats, status } = store as any;
  const productCount = stats.productCount || 0;
  const storeStatus = status || (meta.hasCatalog ? "ACTIVE" : "MANUAL_FEED_REQUIRED");

  return (
    <div className="border border-neutral-200 bg-white p-6 flex flex-col justify-between hover:border-black transition-colors">
      <div>
        {/* Top Header & Status Badge */}
        <div className="flex items-start justify-between gap-4 mb-5 border-b border-neutral-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
                {meta.location || "INDIA"}
              </span>
              <span className="text-neutral-300">·</span>
              {storeStatus === "ACTIVE" ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-medium tracking-[0.18em] text-black">
                  <span className="size-1.5 rounded-full bg-black" />
                  Live Feed
                </span>
              ) : storeStatus === "TEMPORARILY_UNAVAILABLE" ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-medium tracking-[0.18em] text-sale">
                  <span className="size-1.5 rounded-full bg-sale" />
                  Maintenance
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-medium tracking-[0.18em] text-neutral-400">
                  <span className="size-1.5 rounded-full bg-neutral-300" />
                  Feed Pending
                </span>
              )}
            </div>

            <h3 className="display-title text-2xl font-normal text-black tracking-[0.04em]">
              {meta.label}
            </h3>
          </div>

          {stats.recommendPercent > 0 && (
            <div className="text-right">
              <span className="font-serif text-2xl font-normal text-black leading-none block">
                {stats.recommendPercent}%
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
                Recommend
              </span>
            </div>
          )}
        </div>

        {/* Rating Metrics Display */}
        <div className="grid grid-cols-2 gap-4 py-3 px-4 mb-5 bg-neutral-50 border border-neutral-100 text-xs">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-medium block mb-0.5">
              Overall Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-normal text-black leading-none">
                {stats.avgOverall ? stats.avgOverall.toFixed(1) : "—"}
              </span>
              <span className="text-[10px] text-neutral-400">/ 10</span>
            </div>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-medium block mb-0.5">
              Indexed Shirts
            </span>
            <span className="font-serif text-2xl font-normal text-black leading-none block">
              {productCount > 0 ? productCount : "—"}
            </span>
          </div>
        </div>

        {/* Sub-Score Breakdown */}
        <div className="py-1 space-y-2 text-xs">
          <div className="flex justify-between items-center text-neutral-500">
            <span className="text-[11px] uppercase tracking-wider">Quality Grade</span>
            <span className="font-medium text-black">
              {stats.avgQuality ? stats.avgQuality.toFixed(1) : "—"} / 10
            </span>
          </div>
          <div className="flex justify-between items-center text-neutral-500">
            <span className="text-[11px] uppercase tracking-wider">Fulfillment Speed</span>
            <span className="font-medium text-black">
              {stats.avgShipping ? stats.avgShipping.toFixed(1) : "—"} / 10
            </span>
          </div>
          <div className="flex justify-between items-center text-neutral-500">
            <span className="text-[11px] uppercase tracking-wider">Price-to-Value</span>
            <span className="font-medium text-black">
              {stats.avgValue ? stats.avgValue.toFixed(1) : "—"} / 10
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-5 border-t border-neutral-100 flex items-center gap-2 mt-5">
        {productCount > 0 ? (
          <Link
            href={`/?store=${encodeURIComponent(meta.label)}#catalog`}
            className="flex-1 py-3 px-3 border border-neutral-200 hover:border-black text-[11px] font-medium uppercase tracking-[0.18em] text-center text-black transition-colors truncate"
          >
            View Shirts ({productCount})
          </Link>
        ) : (
          <div className="flex-1 py-3 px-3 border border-neutral-100 bg-neutral-50 text-[11px] uppercase tracking-[0.18em] text-center text-neutral-400 cursor-not-allowed">
            Feed Pending
          </div>
        )}
        <a
          href={meta.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 bg-black text-white hover:bg-neutral-800 transition-colors text-[11px] font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 shrink-0"
        >
          <span>Visit</span>
          <ExternalLink className="size-3 stroke-[1.5]" />
        </a>
      </div>
    </div>
  );
}
