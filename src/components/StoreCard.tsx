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
    <div className="rounded-lg border border-border bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-primary/60 transition-colors">
      <div>
        {/* Top Header & Status Badge */}
        <div className="flex items-start justify-between gap-4 mb-4 border-b border-border/60 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                {meta.location || "INDIA"}
              </span>
              <span className="text-border">·</span>
              {storeStatus === "ACTIVE" ? (
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-primary">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Live Feed
                </span>
              ) : storeStatus === "TEMPORARILY_UNAVAILABLE" ? (
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-sale">
                  <span className="size-1.5 rounded-full bg-sale" />
                  Maintenance
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-muted-foreground" />
                  Feed Pending
                </span>
              )}
            </div>

            <h3 className="display-title text-2xl font-bold text-foreground">
              {meta.label}
            </h3>
          </div>

          {stats.recommendPercent > 0 && (
            <div className="text-right">
              <span className="font-display text-xl font-bold text-primary leading-none block">
                {stats.recommendPercent}%
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Recommend
              </span>
            </div>
          )}
        </div>

        {/* Rating Metrics Display */}
        <div className="grid grid-cols-2 gap-3 py-3 rounded-md bg-secondary/40 px-3.5 mb-4 border border-border/50 text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-0.5">
              Overall Rating
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-bold text-primary leading-none">
                {stats.avgOverall ? stats.avgOverall.toFixed(1) : "—"}
              </span>
              <span className="text-xs text-muted-foreground">/ 10</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-0.5">
              Indexed Kits
            </span>
            <span className="font-display text-2xl font-bold text-foreground leading-none block">
              {productCount > 0 ? productCount : "—"}
            </span>
          </div>
        </div>

        {/* Sub-Score Breakdown */}
        <div className="py-2 space-y-1.5 text-xs">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="font-medium">Jersey Quality</span>
            <span className="font-semibold text-foreground">
              {stats.avgQuality ? stats.avgQuality.toFixed(1) : "—"} / 10
            </span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="font-medium">Shipping Speed</span>
            <span className="font-semibold text-foreground">
              {stats.avgShipping ? stats.avgShipping.toFixed(1) : "—"} / 10
            </span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="font-medium">Value for Money</span>
            <span className="font-semibold text-foreground">
              {stats.avgValue ? stats.avgValue.toFixed(1) : "—"} / 10
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-border/60 flex items-center gap-2 mt-4">
        {productCount > 0 ? (
          <Link
            href={`/?store=${encodeURIComponent(meta.label)}#catalog`}
            className="flex-1 py-2 px-3 rounded-md border border-border bg-secondary hover:bg-secondary/80 text-xs font-semibold uppercase tracking-wider text-center text-foreground hover:border-primary/50 transition-colors truncate"
          >
            View Kits ({productCount})
          </Link>
        ) : (
          <div className="flex-1 py-2 px-3 rounded-md bg-secondary/30 text-xs uppercase tracking-wider text-center text-muted-foreground cursor-not-allowed">
            Feed Pending
          </div>
        )}
        <a
          href={meta.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-3.5 rounded-md bg-primary text-primary-foreground hover:brightness-110 transition-colors text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 shrink-0"
        >
          <span>Store</span>
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  );
}
