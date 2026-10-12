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
  title = "Every jersey, one catalog",
  subtitle = "Live listings pulled from 22+ stores.",
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

  const allStoreLabels = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.store) set.add(p.store.toUpperCase().replace(/_/g, " "));
    });

    const list = Array.from(set);
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

    // Version filter
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
    <section id="catalog" className="w-full py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header matching original KitScouts */}
      <header className="mb-6">
        <h2 className="display-title text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </header>

      {/* FILTER CONSOLE MATCHING EXACT REFERENCE SCREENSHOT */}
      <div className="sm:rounded-lg border border-border bg-card/60 p-4 mb-6 space-y-4">
        {/* ROW 1: Search & Sort Combobox */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search jerseys, teams, tags..."
              aria-label="Search products"
              autoComplete="off"
              className="h-9 w-full min-w-0 rounded-md border border-border bg-transparent pl-8 pr-8 py-1 text-sm shadow-xs transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-52">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="h-9 w-full appearance-none rounded-md border border-border bg-card px-2.5 pr-8 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Biggest Markdowns</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* ROW 2: Version Pill Tablist & Switches */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
          {/* VERSION Pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Version
            </span>
            <div className="inline-flex w-fit items-center rounded-full border border-border bg-transparent p-0.5">
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
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isActive
                        ? "border border-primary bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggle: JERSEYS ONLY */}
          <div className="flex items-center gap-2 select-none">
            <button
              type="button"
              role="switch"
              aria-checked={jerseysOnly}
              onClick={() => {
                setJerseysOnly(!jerseysOnly);
                setPage(1);
              }}
              className={`relative inline-flex h-[18.4px] w-[32px] shrink-0 items-center rounded-full border border-transparent transition-colors outline-none cursor-pointer ${
                jerseysOnly ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`pointer-events-none block size-4 rounded-full bg-background transition-transform ${
                  jerseysOnly ? "translate-x-[calc(100%-2px)]" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-xs uppercase tracking-wider font-semibold text-foreground">
              Jerseys only
            </span>
          </div>

          {/* Toggle: IN STOCK ONLY */}
          <div className="flex items-center gap-2 select-none">
            <button
              type="button"
              role="switch"
              aria-checked={inStockOnly}
              onClick={() => {
                setInStockOnly(!inStockOnly);
                setPage(1);
              }}
              className={`relative inline-flex h-[18.4px] w-[32px] shrink-0 items-center rounded-full border border-transparent transition-colors outline-none cursor-pointer ${
                inStockOnly ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`pointer-events-none block size-4 rounded-full bg-background transition-transform ${
                  inStockOnly ? "translate-x-[calc(100%-2px)]" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-xs uppercase tracking-wider font-semibold text-foreground">
              In stock only
            </span>
          </div>

          {hasActiveCustomFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* ROW 3: ALL STORES PILLS */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/50">
          <button
            type="button"
            onClick={() => toggleStore("ALL")}
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
              selectedStores.length === 0
                ? "border-primary bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            All stores
          </button>

          {visibleStores.map((st) => {
            const isSelected = selectedStores.includes(st);
            return (
              <button
                key={st}
                type="button"
                onClick={() => toggleStore(st)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/15 text-primary font-bold"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {st}
              </button>
            );
          })}

          {allStoreLabels.length > 14 && (
            <button
              type="button"
              onClick={() => setShowAllStores(!showAllStores)}
              className="rounded-full border border-dashed border-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors"
            >
              {showAllStores ? "− Fewer stores" : `+ ${allStoreLabels.length - 14} more stores`}
            </button>
          )}
        </div>

        {/* ROW 4: SIZE FILTER PILLS */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/50">
          <span className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground font-semibold mr-1">
            Size
            <Info className="size-3.5" />
          </span>

          {["S", "M", "L", "XL", "XXL", "3XL"].map((sz) => {
            const isSizeActive = selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                type="button"
                onClick={() => toggleSize(sz)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isSizeActive
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
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
              className="text-xs text-muted-foreground hover:text-foreground underline ml-2 uppercase tracking-wider"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Product Results Count Banner */}
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
        {filteredProducts.length.toLocaleString()} kits found
      </p>

      {/* Product Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
      {displayedProducts.length > 0 ? (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-border rounded-lg bg-card/40">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
            No kits found matching your search and filter criteria
          </p>
          <button
            onClick={resetAllFilters}
            className="text-xs font-semibold tracking-wider uppercase text-primary underline hover:opacity-80"
          >
            Clear filters and reset catalog
          </button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-12 text-center pt-6 border-t border-border">
          <p className="text-xs tracking-wider uppercase text-muted-foreground mb-4 font-semibold">
            Showing {displayedProducts.length} of {filteredProducts.length.toLocaleString()} kits
          </p>
          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-md border border-border bg-secondary hover:bg-secondary/80 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary/50 transition-colors"
          >
            Load More Kits
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
