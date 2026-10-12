"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Product, Store } from "@/types";
import { ProductCard } from "./ProductCard";
import { ProductDetailModal } from "./ProductDetailModal";
import { Search, X, SlidersHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface ProductCatalogProps {
  initialProducts: Product[];
  stores: Store[];
  defaultCategory?: string;
  title?: string;
  subtitle?: string;
}

export function ProductCatalog({
  initialProducts,
  stores,
  defaultCategory = "all",
  title = "THE CATALOGUE",
  subtitle = "Index of authentic match and fan editions.",
}: ProductCatalogProps) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [category, setCategory] = useState<string>(urlCategory || defaultCategory);
  const [query, setQuery] = useState<string>("");
  const [selectedStore, setSelectedStore] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);
  const [sort, setSort] = useState<string>("featured");
  const [page, setPage] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  // Sync category if URL parameter changes
  useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [urlCategory]);

  const PAGE_SIZE = 32;

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search query
    if (query.trim() !== "") {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.store.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Category
    if (category !== "all") {
      const cat = category.toUpperCase();
      if (cat === "PLAYER") {
        result = result.filter((p) => p.category?.includes("PLAYER"));
      } else if (cat === "FAN") {
        result = result.filter((p) => p.category?.includes("FAN"));
      } else if (cat === "RETRO") {
        result = result.filter(
          (p) =>
            p.category?.includes("RETRO") ||
            (p.tags && p.tags.some((t) => t.toLowerCase().includes("retro")))
        );
      } else if (cat === "INTERNATIONAL") {
        result = result.filter(
          (p) =>
            p.tags &&
            p.tags.some((t) =>
              [
                "international",
                "argentina",
                "brazil",
                "france",
                "portugal",
                "germany",
                "england",
                "italy",
                "spain",
                "japan",
              ].some((country) => t.toLowerCase().includes(country))
            )
        );
      } else if (cat === "CLEARANCE") {
        result = result.filter(
          (p) =>
            p.category?.includes("CLEARANCE") ||
            (p.discountedPrice !== null && p.discountedPrice < p.price)
        );
      }
    }

    // Store
    if (selectedStore !== "all") {
      result = result.filter(
        (p) => p.store.toUpperCase() === selectedStore.toUpperCase()
      );
    }

    // Size
    if (selectedSize !== "all") {
      result = result.filter(
        (p) =>
          p.sizes &&
          p.sizes.some(
            (s) => s.toUpperCase() === selectedSize.toUpperCase()
          )
      );
    }

    // In Stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => {
          const pA = a.discountedPrice ?? a.price;
          const pB = b.discountedPrice ?? b.price;
          return pA - pB;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          const pA = a.discountedPrice ?? a.price;
          const pB = b.discountedPrice ?? b.price;
          return pB - pA;
        });
        break;
      case "discount":
        result.sort((a, b) => {
          const dA = a.discountedPrice ? a.price - a.discountedPrice : 0;
          const dB = b.discountedPrice ? b.price - b.discountedPrice : 0;
          return dB - dA;
        });
        break;
      case "newest":
        result.sort((a, b) => {
          const tA = a.firstSeenAt ? new Date(a.firstSeenAt).getTime() : 0;
          const tB = b.firstSeenAt ? new Date(b.firstSeenAt).getTime() : 0;
          return tB - tA;
        });
        break;
      case "featured":
      default:
        break;
    }

    return result;
  }, [initialProducts, category, query, selectedStore, selectedSize, inStockOnly, sort]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, page * PAGE_SIZE);
  }, [filteredProducts, page]);

  const hasMore = displayedProducts.length < filteredProducts.length;

  const categories = [
    { id: "all", label: "ALL EDITIONS" },
    { id: "player", label: "PLAYER ISSUE" },
    { id: "fan", label: "FAN VERSION" },
    { id: "retro", label: "ARCHIVE / RETRO" },
    { id: "international", label: "NATIONAL TEAMS" },
    { id: "clearance", label: "CLEARANCE SALE" },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const uniqueStoreNames = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.store) set.add(p.store);
    });
    return Array.from(set).sort();
  }, [initialProducts]);

  const clearAllFilters = () => {
    setCategory("all");
    setQuery("");
    setSelectedStore("all");
    setSelectedSize("all");
    setInStockOnly(false);
    setSort("featured");
    setPage(1);
  };

  const hasActiveFilters =
    category !== "all" ||
    query !== "" ||
    selectedStore !== "all" ||
    selectedSize !== "all" ||
    !inStockOnly ||
    sort !== "featured";

  return (
    <section id="catalog" className="w-full bg-white text-black py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Editorial Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-8 mb-8 gap-4">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 block mb-1">
            DISCOVERY INDEX
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.14em] uppercase text-black">
            {title}
          </h2>
          <p className="text-xs text-neutral-500 tracking-wider uppercase mt-1">
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs tracking-[0.18em] uppercase text-neutral-500">
          <span className="font-medium text-black">
            {filteredProducts.length}
          </span>
          <span>PIECES CATALOGUED</span>
        </div>
      </div>

      {/* Zara Category Navigation Bar */}
      <div className="flex items-center gap-6 overflow-x-auto pb-4 mb-6 border-b border-neutral-100 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setCategory(c.id);
              setPage(1);
            }}
            className={`text-xs font-medium tracking-[0.18em] uppercase whitespace-nowrap transition-colors pb-1 relative ${
              category === c.id
                ? "text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-black"
                : "text-neutral-400 hover:text-black"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Control Bar: Search, Filters toggle, Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-3 mb-8 border-y border-neutral-100 text-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 stroke-[1.5]" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="SEARCH TEAMS, RETRO, PLAYERS..."
            className="w-full pl-9 pr-8 py-2 text-xs tracking-wider uppercase border-none focus:outline-none focus:ring-0 placeholder:text-neutral-400 bg-neutral-50"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-black"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Filters and Sorting Buttons */}
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          {/* Filter Drawer Toggle */}
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-3 py-2 border tracking-[0.16em] uppercase text-[11px] transition-colors ${
              filtersOpen || hasActiveFilters
                ? "border-black bg-black text-white"
                : "border-neutral-200 text-neutral-700 hover:border-black"
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>FILTER</span>
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="appearance-none bg-white border border-neutral-200 px-3 py-2 pr-7 text-[11px] tracking-[0.16em] uppercase text-neutral-800 focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="featured">SORT: FEATURED</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
              <option value="discount">LARGEST MARKDOWNS</option>
              <option value="newest">NEWEST ARRIVALS</option>
            </select>
            <ChevronDown className="w-3 h-3 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Expandable Discreet Filter Tray */}
      {filtersOpen && (
        <div className="p-6 bg-neutral-50 border border-neutral-200 mb-8 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-neutral-200/60 pb-3">
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium text-black">
              REFINE CATALOGUE
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[10px] tracking-[0.18em] uppercase text-neutral-500 hover:text-black underline"
              >
                RESET ALL FILTERS
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Store Filter */}
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 block mb-2">
                INDEPENDENT BOUTIQUE
              </span>
              <select
                value={selectedStore}
                onChange={(e) => {
                  setSelectedStore(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-white border border-neutral-200 px-3 py-2 text-xs tracking-wider uppercase focus:outline-none focus:border-black"
              >
                <option value="all">ALL 13+ STORES</option>
                {uniqueStoreNames.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 block mb-2">
                SIZE SPECIFICATION
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSize("all");
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 text-[11px] tracking-wider uppercase border ${
                    selectedSize === "all"
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-black"
                  }`}
                >
                  ALL
                </button>
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => {
                      setSelectedSize(sz);
                      setPage(1);
                    }}
                    className={`px-3 py-1.5 text-[11px] tracking-wider uppercase border ${
                      selectedSize === sz
                        ? "border-black bg-black text-white"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-black"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 block mb-2">
                AVAILABILITY
              </span>
              <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    setPage(1);
                  }}
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <span className="text-xs uppercase tracking-wider text-neutral-800">
                  IN-STOCK PIECES ONLY
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid: 4 columns desktop, 3 columns tablet, 2 columns mobile */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border-t border-neutral-100">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
            NO PIECES MATCH YOUR CURRENT FILTER CRITERIA
          </p>
          <button
            onClick={clearAllFilters}
            className="text-xs font-medium tracking-[0.2em] uppercase underline hover:text-neutral-500"
          >
            CLEAR ALL FILTERS AND RESTORE CATALOGUE
          </button>
        </div>
      )}

      {/* Load More Action Button */}
      {hasMore && (
        <div className="mt-16 text-center pt-8 border-t border-neutral-100">
          <div className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-4">
            SHOWING {displayedProducts.length} OF {filteredProducts.length} KITS
          </div>
          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            className="px-10 py-4 bg-white border border-black text-black hover:bg-black hover:text-white transition-colors text-xs font-medium tracking-[0.22em] uppercase"
          >
            LOAD MORE PIECES
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
