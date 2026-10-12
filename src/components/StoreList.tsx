"use client";

import React, { useState, useMemo } from "react";
import { Store } from "@/types";
import { StoreCard } from "./StoreCard";
import { Search, X, ChevronDown } from "lucide-react";

interface StoreListProps {
  initialStores: Store[];
}

export function StoreList({ initialStores }: StoreListProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "PENDING">("ALL");
  const [sort, setSort] = useState<"recommend" | "rating" | "products" | "name">("recommend");

  const filteredStores = useMemo(() => {
    let result = [...initialStores];

    // Status filter
    if (statusFilter === "ACTIVE") {
      result = result.filter((s: any) => s.status === "ACTIVE" || (s.stats?.productCount && s.stats.productCount > 0));
    } else if (statusFilter === "PENDING") {
      result = result.filter((s: any) => s.status !== "ACTIVE" && (!s.stats?.productCount || s.stats.productCount === 0));
    }

    // Search query
    if (query.trim() !== "") {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.meta.label.toLowerCase().includes(q) ||
          (s.meta.location && s.meta.location.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sort === "rating") {
      result.sort((a, b) => (b.stats.avgOverall ?? 0) - (a.stats.avgOverall ?? 0));
    } else if (sort === "recommend") {
      result.sort(
        (a, b) =>
          b.stats.recommendPercent - a.stats.recommendPercent ||
          b.stats.reviewCount - a.stats.reviewCount ||
          (b.stats.avgOverall ?? 0) - (a.stats.avgOverall ?? 0)
      );
    } else if (sort === "products") {
      result.sort((a: any, b: any) => (b.stats.productCount || 0) - (a.stats.productCount || 0));
    } else if (sort === "name") {
      result.sort((a, b) => a.meta.label.localeCompare(b.meta.label));
    }

    return result;
  }, [initialStores, query, statusFilter, sort]);

  const activeCount = initialStores.filter(
    (s: any) => s.status === "ACTIVE" || (s.stats?.productCount && s.stats.productCount > 0)
  ).length;
  const pendingCount = initialStores.length - activeCount;

  return (
    <div className="w-full">
      {/* Status Filter Tabs */}
      <div className="flex items-center gap-8 overflow-x-auto pb-3 mb-8 border-b border-border text-xs">
        <button
          type="button"
          onClick={() => setStatusFilter("ALL")}
          className={`pb-2 tracking-[0.2em] uppercase transition-colors relative whitespace-nowrap font-medium ${
            statusFilter === "ALL"
              ? "text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All Boutiques ({initialStores.length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("ACTIVE")}
          className={`pb-2 tracking-[0.2em] uppercase transition-colors relative whitespace-nowrap font-medium ${
            statusFilter === "ACTIVE"
              ? "text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Live Catalogs ({activeCount})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("PENDING")}
          className={`pb-2 tracking-[0.2em] uppercase transition-colors relative whitespace-nowrap font-medium ${
            statusFilter === "PENDING"
              ? "text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Feed Pending ({pendingCount})
        </button>
      </div>

      {/* Control Bar: Search and Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-4 mb-8 border-y border-border text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground stroke-[1.5]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH BOUTIQUES, CITIES..."
            className="w-full pl-9 pr-8 py-2 text-xs tracking-wider uppercase border border-border bg-card text-foreground focus:border-primary focus:outline-none placeholder:text-muted-foreground transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear boutique search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Order by:
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="appearance-none bg-card border border-border px-3 py-2 pr-8 text-[11px] font-medium tracking-[0.16em] uppercase text-foreground focus:outline-none focus:border-primary cursor-pointer transition-colors"
            >
              <option value="recommend">MOST RECOMMENDED</option>
              <option value="rating">HIGHEST SCORE</option>
              <option value="products">LARGEST CATALOG</option>
              <option value="name">ALPHABETICAL (A-Z)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
          </div>
        </div>
      </div>

      {/* Stores Grid: 3 columns desktop, 2 columns tablet, 1 column mobile */}
      {filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStores.map((store) => (
            <StoreCard key={store.meta.id} store={store} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-border bg-secondary/30">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">
            No boutique found matching &quot;{query}&quot;
          </p>
          <button
            onClick={() => {
              setQuery("");
              setStatusFilter("ALL");
            }}
            className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary underline hover:opacity-80"
          >
            Show All Boutiques
          </button>
        </div>
      )}
    </div>
  );
}
