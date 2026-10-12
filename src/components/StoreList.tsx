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
  const [sort, setSort] = useState<"recommend" | "rating" | "reviews" | "name">("recommend");

  const filteredStores = useMemo(() => {
    let result = [...initialStores];

    if (query.trim() !== "") {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.meta.label.toLowerCase().includes(q) ||
          (s.meta.location && s.meta.location.toLowerCase().includes(q))
      );
    }

    if (sort === "rating") {
      result.sort((a, b) => (b.stats.avgOverall ?? 0) - (a.stats.avgOverall ?? 0));
    } else if (sort === "recommend") {
      result.sort(
        (a, b) =>
          b.stats.recommendPercent - a.stats.recommendPercent ||
          b.stats.reviewCount - a.stats.reviewCount ||
          (b.stats.avgOverall ?? 0) - (a.stats.avgOverall ?? 0)
      );
    } else if (sort === "reviews") {
      result.sort((a, b) => b.stats.reviewCount - a.stats.reviewCount);
    } else if (sort === "name") {
      result.sort((a, b) => a.meta.label.localeCompare(b.meta.label));
    }

    return result;
  }, [initialStores, query, sort]);

  return (
    <div className="w-full">
      {/* Control Bar: Search and Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-4 mb-8 border-y border-neutral-100 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 stroke-[1.5]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH BOUTIQUES, LOCATIONS..."
            className="w-full pl-9 pr-8 py-2 text-xs tracking-wider uppercase border-none focus:outline-none focus:ring-0 placeholder:text-neutral-400 bg-neutral-50"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-black"
              aria-label="Clear boutique search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
            ORDER BY:
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="appearance-none bg-white border border-neutral-200 px-3 py-2 pr-7 text-[11px] tracking-[0.16em] uppercase text-neutral-800 focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="recommend">MOST RECOMMENDED</option>
              <option value="rating">HIGHEST OVERALL SCORE</option>
              <option value="reviews">MOST REVIEWED</option>
              <option value="name">ALPHABETICAL (A-Z)</option>
            </select>
            <ChevronDown className="w-3 h-3 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
        <div className="py-20 text-center border-t border-neutral-100">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
            NO BOUTIQUE FOUND MATCHING &quot;{query}&quot;
          </p>
          <button
            onClick={() => setQuery("")}
            className="text-xs font-medium tracking-[0.2em] uppercase underline hover:text-neutral-500"
          >
            SHOW ALL BOUTIQUES
          </button>
        </div>
      )}
    </div>
  );
}
