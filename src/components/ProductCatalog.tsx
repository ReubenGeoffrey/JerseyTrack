"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Product, Store } from "@/types";
import { ProductCard } from "./ProductCard";
import { ProductDetailModal } from "./ProductDetailModal";
import { Search, X, ChevronDown, Info, RotateCcw } from "lucide-react";
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
  subtitle = "Compare 6,500+ authentic football shirts and live prices across 22+ verified stockists.",
}: ProductCatalogProps) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlStore = searchParams.get("store");

  // State
  const [query, setQuery] = useState<string>("");
  const [version, setVersion] = useState<string>(
    urlCategory ? urlCategory.toUpperCase() : "ALL"
  );
  const [selectedStores, setSelectedStores] = useState<string[]>(
    urlStore ? [urlStore.toUpperCase()] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);
  const [jerseysOnly, setJerseysOnly] = useState<boolean>(true);
  const [sort, setSort] = useState<string>("featured");
  const [page, setPage] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAllStores, setShowAllStores] = useState<boolean>(false);

  // Sync if URL query params change
  useEffect(() => {
    if (urlCategory) {
      setVersion(urlCategory.toUpperCase());
    }
  }, [urlCategory]);

  useEffect(() => {
    if (urlStore) {
      setSelectedStores([urlStore.toUpperCase()]);
    }
  }, [urlStore]);

  const PAGE_SIZE = 32;

  // Clean, ordered list of popular stores for the pills
  const priorityStoreOrder = [
    "GOAL THREAD",
    "FULL TIME STORE",
    "THAYYIL SPORTS",
    "SHOPEZZY",
    "STORE 1914",
    "THE FOOTBALL FRENZY",
    "GULLY SPORTS",
    "MS RETRO",
    "KITKREW",
    "HOUSE OF GOAT",
    "JERSEY HUT",
    "CAMPEON SPORTS",
    "JAIHIND SPORTS",
    "THE THIRD STORE",
    "FOOTBALLMONK",
    "CHAMPIONS KIT",
    "RAGEFITS",
    "FANAACS",
    "ZEAL EVINCE",
    "SANSIRO SPORTS",
    "COPYCATZ",
    "JCCLUB",
  ];

  // Discover all distinct store labels
  const allStoreLabels = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.store) set.add(p.store.toUpperCase().replace(/_/g, " "));
    });

    const list = Array.from(set);
    // Sort so priority stores come first, then others alphabetically
    list.sort((a, b) => {
      const idxA = priorityStoreOrder.indexOf(a);
      const idxB = priorityStoreOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return list;
  }, [initialProducts]);

  const visibleStores = showAllStores
    ? allStoreLabels
    : allStoreLabels.slice(0, 14);

  // Toggle store in multi-selection
  const toggleStore = (storeName: string) => {
    setPage(1);
    if (storeName === "ALL") {
      setSelectedStores([]);
      return;
    }

    const norm = storeName.toUpperCase();
    setSelectedStores((prev) => {
      if (prev.includes(norm)) {
        return prev.filter((s) => s !== norm);
      } else {
        return [...prev, norm];
      }
    });
  };

  // Toggle size in multi-selection
  const toggleSize = (sizeVal: string) => {
    setPage(1);
    setSelectedSizes((prev) => {
      if (prev.includes(sizeVal)) {
        return prev.filter((s) => s !== sizeVal);
      } else {
        return [...prev, sizeVal];
      }
    });
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // 1. Search Query
    if (query.trim() !== "") {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.store.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // 2. Version Filter
    if (version !== "ALL") {
      if (version === "PLAYER") {
        result = result.filter((p) => p.category?.includes("PLAYER"));
      } else if (version === "FAN") {
        result = result.filter((p) => p.category?.includes("FAN"));
      } else if (version === "RETRO") {
        result = result.filter(
          (p) =>
            p.category?.includes("RETRO") ||
            (p.tags && p.tags.some((t) => t.toLowerCase().includes("retro")))
        );
      } else if (version === "CLEARANCE") {
        result = result.filter(
          (p) =>
            p.category?.includes("CLEARANCE") ||
            (p.discountedPrice !== null && p.discountedPrice < p.price)
        );
      }
    }

    // 3. Multi-Store Filter
    if (selectedStores.length > 0) {
      result = result.filter((p) => {
        const pStoreNorm = p.store.toUpperCase().replace(/_/g, " ");
        const pStoreRaw = p.store.toUpperCase();
        return selectedStores.some(
          (sel) =>
            sel === pStoreNorm ||
            sel === pStoreRaw ||
            pStoreNorm.includes(sel) ||
            sel.includes(pStoreNorm)
        );
      });
    }

    // 4. Multi-Size Filter
    if (selectedSizes.length > 0) {
      result = result.filter(
        (p) =>
          p.sizes &&
          p.sizes.some((sz) =>
            selectedSizes.some(
              (selSz) => selSz.toUpperCase() === sz.toUpperCase()
            )
          )
      );
    }

    // 5. In Stock Only
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // 6. Jerseys Only (filter out casual jackets or gear if requested)
    if (jerseysOnly) {
      result = result.filter((p) => {
        const cat = p.category?.toUpperCase() || "";
        return cat !== "APPAREL" && !p.name.toLowerCase().includes("jacket");
      });
    }

    // 7. Sort
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
  }, [
    initialProducts,
    query,
    version,
    selectedStores,
    selectedSizes,
    inStockOnly,
    jerseysOnly,
    sort,
  ]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, page * PAGE_SIZE);
  }, [filteredProducts, page]);

  const hasMore = displayedProducts.length < filteredProducts.length;

  const resetAllFilters = () => {
    setQuery("");
    setVersion("ALL");
    setSelectedStores([]);
    setSelectedSizes([]);
    setInStockOnly(true);
    setJerseysOnly(true);
    setSort("featured");
    setPage(1);
  };

  const hasActiveCustomFilters =
    query !== "" ||
    version !== "ALL" ||
    selectedStores.length > 0 ||
    selectedSizes.length > 0 ||
    !inStockOnly ||
    !jerseysOnly ||
    sort !== "featured";

  return (
    <section id="catalog" className="w-full bg-white text-black py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-6 mb-8 gap-4">
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
          <span className="font-semibold text-black text-sm">
            {filteredProducts.length.toLocaleString()}
          </span>
          <span>KITS FOUND</span>
        </div>
      </div>

      {/* EASY ACCESS FILTER CONSOLE (MATCHING USER SCREENSHOT) */}
      <div className="rounded-xl border border-[#202534] bg-[#0c0f17] text-[#cbd5e1] p-4 sm:p-5 shadow-2xl mb-8 space-y-4">
        {/* ROW 1: Search Input & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search jerseys, teams, tags..."
              className="h-10 w-full rounded-md border border-[#23293a] bg-[#141824] pl-9 pr-9 text-xs sm:text-sm text-white placeholder-[#64748b] outline-none transition-colors focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#64748b] hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative sm:w-56 shrink-0">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="h-10 w-full appearance-none rounded-md border border-[#23293a] bg-[#141824] px-3.5 pr-8 text-xs text-white outline-none transition-colors focus:border-[#a3e635] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Biggest Markdowns</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
          </div>
        </div>

        {/* ROW 2: Version Pills & Toggles */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
          {/* VERSION Pills */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
              VERSION
            </span>
            <div className="inline-flex items-center rounded-full border border-[#23293a] bg-[#141824] p-0.5">
              {["ALL", "PLAYER", "FAN", "RETRO"].map((v) => {
                const isActive = version === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => {
                      setVersion(v);
                      setPage(1);
                    }}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "border border-[#a3e635] bg-[#a3e635]/15 text-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.3)]"
                        : "border border-transparent text-[#8e98ab] hover:text-white"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggle: JERSEYS ONLY */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <button
              type="button"
              role="switch"
              aria-checked={jerseysOnly}
              onClick={() => {
                setJerseysOnly(!jerseysOnly);
                setPage(1);
              }}
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                jerseysOnly ? "bg-[#a3e635]" : "bg-[#23293a]"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-[#0c0f17] transition-transform ${
                  jerseysOnly ? "translate-x-4.5" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#cbd5e1]">
              JERSEYS ONLY
            </span>
          </label>

          {/* Toggle: IN STOCK ONLY */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <button
              type="button"
              role="switch"
              aria-checked={inStockOnly}
              onClick={() => {
                setInStockOnly(!inStockOnly);
                setPage(1);
              }}
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                inStockOnly ? "bg-[#a3e635]" : "bg-[#23293a]"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-[#0c0f17] transition-transform ${
                  inStockOnly ? "translate-x-4.5" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#cbd5e1]">
              IN STOCK ONLY
            </span>
          </label>

          {/* Reset Filters Shortcut */}
          {hasActiveCustomFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#8e98ab] hover:text-[#a3e635] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET FILTERS</span>
            </button>
          )}
        </div>

        {/* ROW 3: ALL STORES PILLS (DIRECT ONE-CLICK ACCESS) */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#1d2230]">
          {/* ALL STORES PILL */}
          <button
            type="button"
            onClick={() => toggleStore("ALL")}
            className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-all ${
              selectedStores.length === 0
                ? "border-[#a3e635] bg-[#a3e635]/15 text-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.25)]"
                : "border-[#23293a] bg-[#141824] text-[#8e98ab] hover:border-[#3b4359] hover:text-white"
            }`}
          >
            ALL STORES
          </button>

          {/* INDIVIDUAL STORE PILLS */}
          {visibleStores.map((st) => {
            const isSelected = selectedStores.includes(st);
            return (
              <button
                key={st}
                type="button"
                onClick={() => toggleStore(st)}
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  isSelected
                    ? "border-[#a3e635] bg-[#a3e635]/15 text-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.3)] font-bold"
                    : "border-[#23293a] bg-[#141824] text-[#8e98ab] hover:border-[#3b4359] hover:text-white"
                }`}
              >
                {st}
              </button>
            );
          })}

          {/* SHOW MORE / LESS STORES TOGGLE */}
          {allStoreLabels.length > 14 && (
            <button
              type="button"
              onClick={() => setShowAllStores(!showAllStores)}
              className="rounded-full border border-dashed border-[#343c50] bg-transparent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#a3e635] hover:bg-[#a3e635]/10 transition-colors"
            >
              {showAllStores ? "− LESS STORES" : `+ ${allStoreLabels.length - 14} MORE STORES`}
            </button>
          )}
        </div>

        {/* ROW 4: SIZES PILLS */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#1d2230]">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mr-2">
            <span>SIZE</span>
            <Info className="w-3.5 h-3.5 text-[#64748b]" />
          </div>

          {["S", "M", "L", "XL", "XXL", "3XL"].map((sz) => {
            const isSizeActive = selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                type="button"
                onClick={() => toggleSize(sz)}
                className={`grid min-w-[34px] h-[28px] place-items-center rounded-full border px-2.5 text-[11px] font-bold uppercase transition-all ${
                  isSizeActive
                    ? "border-[#a3e635] bg-[#a3e635]/15 text-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.3)]"
                    : "border-[#23293a] bg-[#141824] text-[#8e98ab] hover:border-[#3b4359] hover:text-white"
                }`}
              >
                {sz}
              </button>
            );
          })}

          {selectedSizes.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedSizes([])}
              className="text-[10px] text-[#64748b] hover:text-white underline ml-2 uppercase tracking-wider"
            >
              CLEAR SIZES
            </button>
          )}
        </div>
      </div>

      {/* Product Results Count Banner */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-100 text-xs text-neutral-500 uppercase tracking-wider">
        <span>
          Showing {displayedProducts.length} of {filteredProducts.length.toLocaleString()} matching shirts
        </span>
        {selectedStores.length > 0 && (
          <span className="text-black font-medium">
            Filtering by {selectedStores.length} {selectedStores.length === 1 ? "store" : "stores"}
          </span>
        )}
      </div>

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
            onClick={resetAllFilters}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-black underline hover:opacity-60"
          >
            RESET ALL FILTERS AND RESTORE COMPLETE CATALOGUE
          </button>
        </div>
      )}

      {/* Load More Action Button */}
      {hasMore && (
        <div className="mt-16 text-center pt-8 border-t border-neutral-100">
          <div className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-4">
            SHOWING {displayedProducts.length} OF {filteredProducts.length.toLocaleString()} KITS
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
