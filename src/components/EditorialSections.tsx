"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { Heart, ArrowUpRight } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

interface EditorialSectionsProps {
  collections: {
    clubs: Product[];
    archive: Product[];
    international: Product[];
    clearance: Product[];
  };
  onSelectProduct?: (product: Product) => void;
}

export function EditorialSections({
  collections,
  onSelectProduct,
}: EditorialSectionsProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="w-full bg-background text-foreground divide-y divide-border transition-colors duration-200">
      {/* 01 — THE CLUB COLLECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase font-medium block mb-2">
              01 · CURATED SELECTION
            </span>
            <h2 className="display-title text-3xl sm:text-5xl font-normal text-foreground tracking-[0.06em]">
              The Club Collection
            </h2>
          </div>
          <Link
            href="/?category=player#catalog"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground hover:text-primary transition-colors flex items-center gap-1.5 w-fit"
          >
            <span>View All Club Kits</span>
            <ArrowUpRight className="size-3.5 stroke-[1.5]" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {collections.clubs.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct?.(product)}
              className="group flex flex-col cursor-pointer"
            >
              <div className="relative shrink-0 overflow-hidden bg-muted aspect-square w-full mb-3 rounded-xs">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                  className="size-8 grid place-items-center rounded-full bg-background/80 hover:bg-background border border-border backdrop-blur transition-all absolute top-2.5 right-2.5 z-10"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`size-3.5 stroke-[1.5] ${
                      isFavorite(product.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  <span className="truncate max-w-[140px]">{product.store.replace(/_/g, " ")}</span>
                  <span className="text-foreground">{product.category.replace(/_/g, " ")}</span>
                </div>
                <h3 className="line-clamp-1 text-xs font-normal text-foreground tracking-wide group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="text-xs font-semibold text-foreground">
                    ₹{product.discountedPrice ?? product.price}
                  </span>
                  {product.discountedPrice && product.discountedPrice < product.price && (
                    <span className="text-[11px] text-muted-foreground line-through">
                      ₹{product.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 02 — ARCHIVE / RETRO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase font-medium block mb-2">
              02 · HISTORIC VAULT
            </span>
            <h2 className="display-title text-3xl sm:text-5xl font-normal text-foreground tracking-[0.06em]">
              Archive & Retro Classics
            </h2>
          </div>
          <Link
            href="/?category=retro#catalog"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground hover:text-primary transition-colors flex items-center gap-1.5 w-fit"
          >
            <span>Explore Vintage Kits</span>
            <ArrowUpRight className="size-3.5 stroke-[1.5]" />
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {collections.archive.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct?.(product)}
              className="group flex flex-col cursor-pointer"
            >
              <div className="relative shrink-0 overflow-hidden bg-muted aspect-square w-full mb-3 rounded-xs">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                  className="size-8 grid place-items-center rounded-full bg-background/80 hover:bg-background border border-border backdrop-blur transition-all absolute top-2.5 right-2.5 z-10"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`size-3.5 stroke-[1.5] ${
                      isFavorite(product.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  <span className="truncate max-w-[140px]">{product.store.replace(/_/g, " ")}</span>
                  <span className="text-foreground">RETRO</span>
                </div>
                <h3 className="line-clamp-1 text-xs font-normal text-foreground tracking-wide group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="text-xs font-semibold text-foreground">
                    ₹{product.discountedPrice ?? product.price}
                  </span>
                  {product.discountedPrice && product.discountedPrice < product.price && (
                    <span className="text-[11px] text-muted-foreground line-through">
                      ₹{product.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — INTERNATIONAL */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase font-medium block mb-2">
              03 · GLOBAL TOURNAMENTS
            </span>
            <h2 className="display-title text-3xl sm:text-5xl font-normal text-foreground tracking-[0.06em]">
              International Federations
            </h2>
          </div>
          <Link
            href="/?category=international#catalog"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground hover:text-primary transition-colors flex items-center gap-1.5 w-fit"
          >
            <span>View All National Teams</span>
            <ArrowUpRight className="size-3.5 stroke-[1.5]" />
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {collections.international.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct?.(product)}
              className="group flex flex-col cursor-pointer"
            >
              <div className="relative shrink-0 overflow-hidden bg-muted aspect-square w-full mb-3 rounded-xs">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                  className="size-8 grid place-items-center rounded-full bg-background/80 hover:bg-background border border-border backdrop-blur transition-all absolute top-2.5 right-2.5 z-10"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`size-3.5 stroke-[1.5] ${
                      isFavorite(product.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  <span className="truncate max-w-[140px]">{product.store.replace(/_/g, " ")}</span>
                  <span className="text-foreground">NATIONAL</span>
                </div>
                <h3 className="line-clamp-1 text-xs font-normal text-foreground tracking-wide group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="text-xs font-semibold text-foreground">
                    ₹{product.discountedPrice ?? product.price}
                  </span>
                  {product.discountedPrice && product.discountedPrice < product.price && (
                    <span className="text-[11px] text-muted-foreground line-through">
                      ₹{product.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — THE ARCHIVE SALE (Clearance) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.28em] text-sale uppercase font-medium block mb-2">
              04 · MARKDOWN ARCHIVE
            </span>
            <h2 className="display-title text-3xl sm:text-5xl font-normal text-foreground tracking-[0.06em]">
              Seasonal Clearance
            </h2>
          </div>
          <Link
            href="/clearance"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-sale hover:opacity-80 transition-opacity flex items-center gap-1.5 w-fit"
          >
            <span>View All Markdowns</span>
            <ArrowUpRight className="size-3.5 stroke-[1.5]" />
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {collections.clearance.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct?.(product)}
              className="group flex flex-col cursor-pointer"
            >
              <div className="relative shrink-0 overflow-hidden bg-muted aspect-square w-full mb-3 rounded-xs">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                  className="size-8 grid place-items-center rounded-full bg-background/80 hover:bg-background border border-border backdrop-blur transition-all absolute top-2.5 right-2.5 z-10"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`size-3.5 stroke-[1.5] ${
                      isFavorite(product.id)
                        ? "fill-sale text-sale"
                        : "text-muted-foreground hover:text-sale"
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-sale font-medium">
                  <span className="truncate max-w-[140px] text-muted-foreground">{product.store.replace(/_/g, " ")}</span>
                  <span>SALE</span>
                </div>
                <h3 className="line-clamp-1 text-xs font-normal text-foreground tracking-wide group-hover:text-sale transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="text-xs font-semibold text-sale">
                    ₹{product.discountedPrice ?? product.price}
                  </span>
                  {product.discountedPrice && product.discountedPrice < product.price && (
                    <span className="text-[11px] text-muted-foreground line-through">
                      ₹{product.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
