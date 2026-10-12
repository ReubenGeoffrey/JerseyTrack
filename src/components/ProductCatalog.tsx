"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Product, Store } from "@/types";
import { ProductCard } from "./ProductCard";
import { ProductDetailModal } from "./ProductDetailModal";
import { Search, X, ChevronDown, Info, RotateCcw, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { SpiderInsigniaIcon } from "./SpiderIcons";

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
  title = "The Complete Catalogue",
  subtitle = "6,569+ authentic football shirts curated across 22+ verified boutiques.",
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

  // Sync with URL params
  useEffect(() => {
    if (urlCategory) setVersion(urlCategory.toUpperCase());
  }, [urlCategory]);

  useEffect(() => {
    if (urlStore) setSelectedStores([urlStore.toUpperCase()]);
  }, [urlStore]);

  const PAGE_SIZE = 32;

  const priorityStoreOrder = [
    "GOAL THREAD",
    "FULL TIME STORE",
    "THAYYIL SPORTS",
    "SHOPEZZY",
    "THE THIRD",
    "MS RETRO",
    "SANSIRO SPORTS",
    "FOOTBALL MONK",
    "STORE 1914",
    "THE FOOTBALL FRENZY",
    "GULLY SPORTS",
    "KITKREW",
    "HOUSE OF GOAT",
    "JERSEY HUT",
    "CAMPEON SPORTS",
    "JAIHIND SPORTS",
    "RAGEFITS",
    "TOP FOOTBALL",
    "ZEALEVINCE",
  ];

  // Distinct stores list
  const allStoreLabels = useMemo(() => {
    const fromStores = stores
      .filter((s: any) => s.status === "ACTIVE" || (s.stats?.productCount && s.stats.productCount > 0))
      .map((s) => s.meta.label.toUpperCase());

    const fromProducts = Array.from(
      new Set(initialProducts.map((p) => p.store.toUpperCase().replace(/_/g, " ")))
    );

    const merged = Array.from(new Set([...fromStores, ...fromProducts]));

    return merged.sort((a, b) => {
      const idxA = priorityStoreOrder.findIndex(
        (p) => a.includes(p) || p.includes(a)
      );
      const idxB = priorityStoreOrder.findIndex(
        (p) => b.includes(p) || p.includes(b)
      );
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [stores, initialProducts]);

  const visibleStores = showAllStores ? allStoreLabels : allStoreLabels.slice(0, 14);

  const toggleStore = (storeName: string) => {
    setPage(1);
    if (storeName === "ALL") {
      setSelectedStores([]);
      return;
    }
    setSelectedStores((prev) =>
      prev.includes(storeName)
        ? prev.filter((s) => s !== storeName)
        : [...prev, storeName]
    );
  };

  const toggleSize = (size: string) => {
    setPage(1);
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search query
    if (query.trim() !== "") {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.store.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Version filter
    if (version !== "ALL") {
      result = result.filter((p) => {
        const cat = (p.category || "").toUpperCase();
        const name = p.name.toUpperCase();
        if (version === "PLAYER") {
          return cat.includes("PLAYER") || name.includes("PLAYER");
        }
        if (version === "FAN") {
          return (
            cat.includes("FAN") ||
            name.includes("FAN") ||
            (!cat.includes("PLAYER") && !cat.includes("RETRO"))
          );
        }
        if (version === "RETRO") {
          return cat.includes("RETRO") || name.includes("RETRO");
        }
        return true;
      });
    }

    // Multi-Store filter
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

    // Multi-Size filter
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

    // In-Stock toggle
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Jerseys-only toggle
    if (jerseysOnly) {
      result = result.filter((p) => {
        const cat = p.category?.toUpperCase() || "";
        return cat !== "APPAREL" && !p.name.toLowerCase().includes("jacket");
      });
    }

    // Sort
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
    <section id="catalog" className="w-full py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-background text-foreground transition-colors duration-200">
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <SpiderInsigniaIcon size={14} className="text-primary animate-spiderFloat" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-primary font-mono font-semibold">
            DARK SYMBIOTE INDEX · 22+ STORES MONITORED
          </span>
        </div>
        <h2 className="display-title text-3xl sm:text-5xl font-normal text-foreground tracking-[0.06em]">
          {title}
        </h2>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground font-normal">{subtitle}</p>
      </header>

      {/* EASY-ACCESS FILTER CONSOLE */}
      <div className="border border-border/70 rounded-sm p-4 sm:p-5 mb-8 space-y-4 sm:space-y-5 bg-card/80 backdrop-blur-sm transition-colors duration-200 shadow-spider-glow">
        {/* ROW 1: Search & Sort Combobox */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground stroke-[1.5]" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="SEARCH SHIRTS, CLUBS, SEASONS, BOUTIQUES..."
              aria-label="Search products"
              autoComplete="off"
              className="h-11 w-full min-w-0 border border-border bg-background pl-10 pr-10 py-2 text-xs tracking-wider uppercase text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground transition-all rounded-xs min-h-[44px]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground touch-manipulation"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-56">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="h-11 w-full appearance-none border border-border bg-background px-3.5 pr-8 text-[11px] font-mono font-medium tracking-[0.16em] uppercase text-foreground outline-none focus:border-primary cursor-pointer transition-colors rounded-xs min-h-[44px]"
              >
                <option value="featured">ORDER: FEATURED</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="discount">BIGGEST MARKDOWNS</option>
                <option value="newest">NEWEST ARRIVALS</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground stroke-[1.5]" />
            </div>
          </div>
        </div>

        {/* ROW 2: Version Pills & Minimalist Switches */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
          {/* VERSION Pills */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground font-medium">
              Edition:
            </span>
            <div className="inline-flex w-fit items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {[
                { key: "ALL", label: "ALL" },
                { key: "PLAYER", label: "PLAYER ISSUE" },
                { key: "FAN", label: "FAN VERSION" },
                { key: "RETRO", label: "ARCHIVE RETRO" },
              ].map(({ key, label }) => {
                const isActive = version === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setVersion(key);
                      setPage(1);
                    }}
                    className={`px-3 py-1.5 min-h-[38px] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] transition-all touch-manipulation select-none active:scale-95 rounded-xs ${
                      isActive
                        ? "bg-primary text-white font-bold shadow-spider-glow border border-primary"
                        : "border border-border/80 bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggle: JERSEYS ONLY */}
          <div className="flex items-center gap-2 select-none min-h-[44px]">
            <button
              type="button"
              role="switch"
              aria-checked={jerseysOnly}
              onClick={() => {
                setJerseysOnly(!jerseysOnly);
                setPage(1);
              }}
              className={`relative inline-flex h-[20px] w-[36px] shrink-0 items-center rounded-full border border-transparent transition-colors outline-none cursor-pointer touch-manipulation ${
                jerseysOnly ? "bg-primary shadow-spider-glow" : "bg-muted"
              }`}
            >
              <span
                className={`pointer-events-none block size-4 rounded-full bg-white transition-transform ${
                  jerseysOnly ? "translate-x-[18px]" : "translate-x-[2px]"
                }`}
              />
            </button>
            <span className="text-[11px] uppercase tracking-[0.16em] font-mono font-medium text-foreground">
              Jerseys only
            </span>
          </div>

          {/* Toggle: IN STOCK ONLY */}
          <div className="flex items-center gap-2 select-none min-h-[44px]">
            <button
              type="button"
              role="switch"
              aria-checked={inStockOnly}
              onClick={() => {
                setInStockOnly(!inStockOnly);
                setPage(1);
              }}
              className={`relative inline-flex h-[20px] w-[36px] shrink-0 items-center rounded-full border border-transparent transition-colors outline-none cursor-pointer touch-manipulation ${
                inStockOnly ? "bg-primary shadow-spider-glow" : "bg-muted"
              }`}
            >
              <span
                className={`pointer-events-none block size-4 rounded-full bg-white transition-transform ${
                  inStockOnly ? "translate-x-[18px]" : "translate-x-[2px]"
                }`}
              />
            </button>
            <span className="text-[11px] uppercase tracking-[0.16em] font-mono font-medium text-foreground">
              In stock only
            </span>
          </div>

          {hasActiveCustomFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="ml-auto inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-mono text-muted-foreground hover:text-primary transition-colors min-h-[44px] touch-manipulation"
            >
              <RotateCcw className="size-3.5 stroke-[1.5]" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* ROW 3: ALL STORES PILLS (Horizontal Scroll on Mobile) */}
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground font-medium">
              Boutiques ({allStoreLabels.length}):
            </span>
            {allStoreLabels.length > 14 && (
              <button
                type="button"
                onClick={() => setShowAllStores(!showAllStores)}
                className="text-[10px] uppercase tracking-[0.16em] font-mono text-primary hover:underline touch-manipulation"
              >
                {showAllStores ? "− Show Less" : `+ View All ${allStoreLabels.length}`}
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-1.5 max-h-36 overflow-y-auto pr-1">
            <button
              type="button"
              onClick={() => toggleStore("ALL")}
              className={`px-3 py-1.5 min-h-[36px] text-[10px] font-mono uppercase tracking-[0.16em] transition-all touch-manipulation active:scale-95 rounded-xs ${
                selectedStores.length === 0
                  ? "bg-primary text-white font-bold shadow-spider-glow border border-primary"
                  : "border border-border/80 bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              All Boutiques
            </button>

            {visibleStores.map((st) => {
              const isSelected = selectedStores.includes(st);
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => toggleStore(st)}
                  className={`px-2.5 py-1.5 min-h-[36px] text-[10px] font-mono uppercase tracking-[0.14em] transition-all touch-manipulation active:scale-95 rounded-xs ${
                    isSelected
                      ? "bg-primary text-white font-bold shadow-spider-glow border border-primary"
                      : "border border-border/80 bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>

        {/* ROW 4: SIZE FILTER PILLS */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/50">
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground font-medium mr-2">
            Size:
            <Info className="size-3 stroke-[1.5]" />
          </span>

          {["S", "M", "L", "XL", "XXL", "3XL"].map((sz) => {
            const isSizeActive = selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                type="button"
                onClick={() => toggleSize(sz)}
                className={`min-h-[36px] min-w-[36px] grid place-items-center text-[11px] font-mono uppercase transition-all touch-manipulation active:scale-95 rounded-xs ${
                  isSizeActive
                    ? "bg-primary text-white font-bold shadow-spider-glow border border-primary"
                    : "border border-border/80 bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
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
              className="text-[10px] font-mono text-muted-foreground hover:text-primary underline ml-2 uppercase tracking-widest min-h-[36px] inline-flex items-center"
            >
              Clear sizes
            </button>
          )}
        </div>
      </div>

      {/* Product Results Count Banner */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-mono font-medium flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span>{filteredProducts.length.toLocaleString()} SHIRTS MONITORED</span>
        </p>
      </div>

      {/* Product Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
      {displayedProducts.length > 0 ? (
        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-border bg-card/40 rounded-sm">
          <SpiderInsigniaIcon size={32} className="text-primary/40 mx-auto mb-3" />
          <p className="text-xs uppercase tracking-[0.22em] font-mono text-muted-foreground mb-3 font-medium">
            No shirts found matching your filter criteria
          </p>
          <button
            onClick={resetAllFilters}
            className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-primary underline hover:opacity-80"
          >
            Clear filters and reset catalogue
          </button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-16 text-center pt-8 border-t border-border flex flex-col items-center">
          <p className="text-[11px] tracking-[0.2em] uppercase font-mono text-muted-foreground mb-4 font-medium">
            Showing {displayedProducts.length} of {filteredProducts.length.toLocaleString()} shirts
          </p>
          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            className="btn-spider-primary"
          >
            <SpiderInsigniaIcon size={16} className="text-white" />
            <span>Load More Shirts</span>
          </button>
        </div>
      )}

      {/* Product Detail Modal with Comparison */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
