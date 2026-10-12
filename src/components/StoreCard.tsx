import React from "react";
import Link from "next/link";
import { Store } from "@/types";
import { ExternalLink } from "lucide-react";
import { SpiderInsigniaIcon } from "./SpiderIcons";

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  const { meta, stats, status } = store as any;
  const productCount = stats.productCount || 0;
  const storeStatus = status || (meta.hasCatalog ? "ACTIVE" : "MANUAL_FEED_REQUIRED");

  return (
    <div className="spider-card border border-border/80 bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-primary transition-all duration-300 rounded-sm">
      <div>
        {/* Top Header & Status Badge */}
        <div className="flex items-start justify-between gap-4 mb-4 border-b border-border/60 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                {meta.location || "INDIA"}
              </span>
              <span className="text-muted-foreground/60">·</span>
              {storeStatus === "ACTIVE" ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-[0.18em] text-primary">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse" />
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

            <h3 className="display-title text-xl sm:text-2xl font-normal text-foreground tracking-[0.04em] flex items-center gap-2">
              <SpiderInsigniaIcon size={16} className="text-primary/70 shrink-0" />
              <span>{meta.label}</span>
            </h3>
          </div>

          {stats.recommendPercent > 0 && (
            <div className="text-right">
              <span className="font-mono text-2xl font-bold text-primary leading-none block">
                {stats.recommendPercent}%
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-muted-foreground font-medium">
                Recommend
              </span>
            </div>
          )}
        </div>

        {/* Rating Metrics Display */}
        <div className="grid grid-cols-2 gap-4 py-3 px-4 mb-4 bg-background/70 border border-border/70 text-xs rounded-xs font-mono">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium block mb-0.5">
              Overall Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground leading-none">
                {stats.avgOverall ? stats.avgOverall.toFixed(1) : "—"}
              </span>
              <span className="text-[10px] text-muted-foreground">/ 10</span>
            </div>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium block mb-0.5">
              Indexed Shirts
            </span>
            <span className="text-2xl font-bold text-primary leading-none block">
              {productCount > 0 ? productCount : "—"}
            </span>
          </div>
        </div>

        {/* Sub-Score Breakdown */}
        <div className="py-1 space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] uppercase tracking-wider">Quality Grade</span>
            <span className="font-medium text-foreground">
              {stats.avgQuality ? stats.avgQuality.toFixed(1) : "—"} / 10
            </span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] uppercase tracking-wider">Fulfillment Speed</span>
            <span className="font-medium text-foreground">
              {stats.avgShipping ? stats.avgShipping.toFixed(1) : "—"} / 10
            </span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] uppercase tracking-wider">Price-to-Value</span>
            <span className="font-medium text-foreground">
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
            className="flex-1 min-h-[44px] flex items-center justify-center py-2.5 px-3 border border-border/80 hover:border-primary text-[10px] font-mono font-medium uppercase tracking-[0.18em] text-foreground hover:text-primary transition-colors truncate touch-manipulation active:scale-95 rounded-xs"
          >
            View Shirts ({productCount})
          </Link>
        ) : (
          <div className="flex-1 min-h-[44px] flex items-center justify-center py-2.5 px-3 border border-border/50 bg-secondary/50 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground cursor-not-allowed rounded-xs">
            Feed Pending
          </div>
        )}
        <a
          href={meta.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] py-2.5 px-4 bg-primary text-white hover:opacity-90 transition-all text-[10px] font-mono font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 shrink-0 shadow-spider-glow touch-manipulation active:scale-95 rounded-xs"
        >
          <span>Visit</span>
          <ExternalLink className="size-3.5 stroke-[2]" />
        </a>
      </div>
    </div>
  );
}
