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
    <div className="border border-border bg-card p-6 flex flex-col justify-between hover:border-primary transition-all duration-200">
      <div>
        {/* Top Header & Status Badge */}
        <div className="flex items-start justify-between gap-4 mb-5 border-b border-border/60 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                {meta.location || "INDIA"}
              </span>
              <span className="text-muted-foreground/60">·</span>
              {storeStatus === "ACTIVE" ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-medium tracking-[0.18em] text-primary">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Live Feed
                </span>
              ) : storeStatus === "TEMPORARILY_UNAVAILABLE" ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-medium tracking-[0.18em] text-sale">
                  <span className="size-1.5 rounded-full bg-sale" />
                  Maintenance
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-medium tracking-[0.18em] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                  Feed Pending
                </span>
              )}
            </div>

            <h3 className="display-title text-2xl font-normal text-foreground tracking-[0.04em]">
              {meta.label}
            </h3>
          </div>

          {stats.recommendPercent > 0 && (
            <div className="text-right">
              <span className="font-serif text-2xl font-normal text-primary leading-none block">
                {stats.recommendPercent}%
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Recommend
              </span>
            </div>
          )}
        </div>

        {/* Rating Metrics Display */}
        <div className="grid grid-cols-2 gap-4 py-3 px-4 mb-5 bg-secondary border border-border/70 text-xs">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium block mb-0.5">
              Overall Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-normal text-foreground leading-none">
                {stats.avgOverall ? stats.avgOverall.toFixed(1) : "—"}
              </span>
              <span className="text-[10px] text-muted-foreground">/ 10</span>
            </div>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium block mb-0.5">
              Indexed Shirts
            </span>
            <span className="font-serif text-2xl font-normal text-foreground leading-none block">
              {productCount > 0 ? productCount : "—"}
            </span>
          </div>
        </div>

        {/* Sub-Score Breakdown */}
        <div className="py-1 space-y-2 text-xs">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[11px] uppercase tracking-wider">Quality Grade</span>
            <span className="font-medium text-foreground">
              {stats.avgQuality ? stats.avgQuality.toFixed(1) : "—"} / 10
            </span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[11px] uppercase tracking-wider">Fulfillment Speed</span>
            <span className="font-medium text-foreground">
              {stats.avgShipping ? stats.avgShipping.toFixed(1) : "—"} / 10
            </span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[11px] uppercase tracking-wider">Price-to-Value</span>
            <span className="font-medium text-foreground">
              {stats.avgValue ? stats.avgValue.toFixed(1) : "—"} / 10
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-5 border-t border-border/60 flex items-center gap-2 mt-5">
        {productCount > 0 ? (
          <Link
            href={`/?store=${encodeURIComponent(meta.label)}#catalog`}
            className="flex-1 py-3 px-3 border border-border hover:border-foreground text-[11px] font-medium uppercase tracking-[0.18em] text-center text-foreground transition-colors truncate"
          >
            View Shirts ({productCount})
          </Link>
        ) : (
          <div className="flex-1 py-3 px-3 border border-border bg-secondary text-[11px] uppercase tracking-[0.18em] text-center text-muted-foreground cursor-not-allowed">
            Feed Pending
          </div>
        )}
        <a
          href={meta.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 bg-primary text-primary-foreground hover:opacity-90 transition-all text-[11px] font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
        >
          <span>Visit</span>
          <ExternalLink className="size-3 stroke-[1.5]" />
        </a>
      </div>
    </div>
  );
}
