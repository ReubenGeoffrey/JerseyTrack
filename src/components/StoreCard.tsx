import React from "react";
import Link from "next/link";
import { Store } from "@/types";
import { ExternalLink, Star, ThumbsUp, ShieldCheck } from "lucide-react";

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  const { meta, stats } = store;

  return (
    <div className="bg-white border border-neutral-200/90 p-6 sm:p-8 flex flex-col justify-between hover:border-black transition-colors duration-300">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-4 border-b border-neutral-100 pb-4">
          <div>
            <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 mb-1">
              {meta.location || "INDIA"}
            </div>
            <h3 className="text-lg font-light tracking-wide uppercase text-black">
              {meta.label}
            </h3>
          </div>
          {stats.recommendPercent > 0 && (
            <div className="text-right">
              <span className="text-xs font-medium tracking-tight text-black block">
                {stats.recommendPercent}%
              </span>
              <span className="text-[9px] tracking-[0.16em] uppercase text-neutral-400">
                RECOMMEND
              </span>
            </div>
          )}
        </div>

        {/* Rating Metrics Display */}
        <div className="grid grid-cols-2 gap-4 py-4 border-b border-neutral-100 text-xs">
          <div>
            <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400 block mb-0.5">
              OVERALL SCORE
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-medium text-black">
                {stats.avgOverall ? stats.avgOverall.toFixed(1) : "—"}
              </span>
              <span className="text-[10px] text-neutral-400">/ 10</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400 block mb-0.5">
              CUSTOMER REVIEWS
            </span>
            <span className="text-xl font-medium text-black block">
              {stats.reviewCount}
            </span>
          </div>
        </div>

        {/* Sub-Score Breakdown (Quality, Shipping, Support, Value) */}
        <div className="py-4 space-y-2.5 text-[11px] tracking-wider uppercase">
          <div className="flex justify-between items-center text-neutral-600">
            <span>JERSEY QUALITY</span>
            <span className="font-medium text-black">
              {stats.avgQuality ? stats.avgQuality.toFixed(1) : "—"}
            </span>
          </div>
          <div className="flex justify-between items-center text-neutral-600">
            <span>SHIPPING SPEED</span>
            <span className="font-medium text-black">
              {stats.avgShipping ? stats.avgShipping.toFixed(1) : "—"}
            </span>
          </div>
          <div className="flex justify-between items-center text-neutral-600">
            <span>CUSTOMER SUPPORT</span>
            <span className="font-medium text-black">
              {stats.avgSupport ? stats.avgSupport.toFixed(1) : "—"}
            </span>
          </div>
          <div className="flex justify-between items-center text-neutral-600">
            <span>VALUE FOR MONEY</span>
            <span className="font-medium text-black">
              {stats.avgValue ? stats.avgValue.toFixed(1) : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-3">
        {meta.hasCatalog && (
          <Link
            href={`/?store=${encodeURIComponent(meta.label)}#catalog`}
            className="w-full sm:flex-1 py-2.5 px-3 border border-neutral-300 hover:border-black transition-colors text-[10px] tracking-[0.2em] uppercase text-center text-black font-medium"
          >
            VIEW KITS ({meta.label})
          </Link>
        )}
        <a
          href={meta.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto py-2.5 px-4 bg-black text-white hover:bg-neutral-800 transition-colors text-[10px] tracking-[0.2em] uppercase text-center flex items-center justify-center gap-1.5"
        >
          <span>VISIT STORE</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
