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
    <div className="w-full bg-background text-foreground py-8 divide-y divide-border/60">
      {/* 01 — THE CLUB COLLECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-primary uppercase mb-1">
              01 — Curated Selection
            </div>
            <h2 className="display-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              The Club Collection
            </h2>
          </div>
          <Link
            href="/?category=player#catalog"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1 w-fit"
          >
            <span>View All Club Kits</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {collections.clubs.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/60"
            >
              <div className="relative shrink-0 overflow-hidden bg-muted aspect-square w-full">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => toggleFavorite(product)}
                  className="grid size-8 shrink-0 place-items-center rounded-md border border-border bg-background/70 backdrop-blur transition-colors hover:border-primary/60 hover:bg-background/90 absolute top-2 right-2"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`size-4 ${
                      isFavorite(product.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                <div className="flex flex-wrap items-center gap-1.5 text-[0.68rem] uppercase tracking-wider">
                  <span className="rounded-xs bg-secondary px-2 py-0.5 font-semibold text-secondary-foreground truncate max-w-[120px]">
                    {product.store.replace(/_/g, " ")}
                  </span>
                  <span className="rounded-xs px-2 py-0.5 font-semibold bg-primary/12 text-primary">
                    {product.category.replace(/_/g, " ")}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="mt-auto flex items-end justify-between gap-2 pt-1">
                  <span className="font-display text-xl font-bold leading-none text-foreground">
                    ₹{product.discountedPrice ?? product.price}
                  </span>
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase font-semibold text-muted-foreground hover:text-primary flex items-center gap-0.5"
                  >
                    <span>View</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 02 — ARCHIVE / RETRO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-primary uppercase mb-1">
              02 — The Historic Vault
            </div>
            <h2 className="display-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Archive & Retro Classics
            </h2>
          </div>
          <Link
            href="/?category=retro#catalog"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1 w-fit"
          >
            <span>Explore Vintage Kits</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {collections.archive.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/60"
            >
              <div className="relative shrink-0 overflow-hidden bg-muted aspect-square w-full">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => toggleFavorite(product)}
                  className="grid size-8 shrink-0 place-items-center rounded-md border border-border bg-background/70 backdrop-blur transition-colors hover:border-primary/60 hover:bg-background/90 absolute top-2 right-2"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`size-4 ${
                      isFavorite(product.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                <div className="flex flex-wrap items-center gap-1.5 text-[0.68rem] uppercase tracking-wider">
                  <span className="rounded-xs bg-secondary px-2 py-0.5 font-semibold text-secondary-foreground truncate max-w-[120px]">
                    {product.store.replace(/_/g, " ")}
                  </span>
                  <span className="rounded-xs px-2 py-0.5 font-semibold bg-primary/12 text-primary">
                    RETRO
                  </span>
                </div>
                <h3 className="line-clamp-2 text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="mt-auto flex items-end justify-between gap-2 pt-1">
                  <span className="font-display text-xl font-bold leading-none text-foreground">
                    ₹{product.discountedPrice ?? product.price}
                  </span>
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase font-semibold text-muted-foreground hover:text-primary flex items-center gap-0.5"
                  >
                    <span>View</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — INTERNATIONAL */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-primary uppercase mb-1">
              03 — Global Tournaments
            </div>
            <h2 className="display-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              International Federations
            </h2>
          </div>
          <Link
            href="/?category=international#catalog"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1 w-fit"
          >
            <span>View All National Teams</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {collections.international.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/60"
            >
              <div className="relative shrink-0 overflow-hidden bg-muted aspect-square w-full">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => toggleFavorite(product)}
                  className="grid size-8 shrink-0 place-items-center rounded-md border border-border bg-background/70 backdrop-blur transition-colors hover:border-primary/60 hover:bg-background/90 absolute top-2 right-2"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`size-4 ${
                      isFavorite(product.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                <div className="flex flex-wrap items-center gap-1.5 text-[0.68rem] uppercase tracking-wider">
                  <span className="rounded-xs bg-secondary px-2 py-0.5 font-semibold text-secondary-foreground truncate max-w-[120px]">
                    {product.store.replace(/_/g, " ")}
                  </span>
                  <span className="rounded-xs px-2 py-0.5 font-semibold bg-primary/12 text-primary">
                    NATIONAL
                  </span>
                </div>
                <h3 className="line-clamp-2 text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="mt-auto flex items-end justify-between gap-2 pt-1">
                  <span className="font-display text-xl font-bold leading-none text-foreground">
                    ₹{product.discountedPrice ?? product.price}
                  </span>
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase font-semibold text-muted-foreground hover:text-primary flex items-center gap-0.5"
                  >
                    <span>View</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — THE LAST CHANCE (Clearance) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-sale uppercase mb-1">
              04 — Markdown Deals
            </div>
            <h2 className="display-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              The Last Chance Clearance
            </h2>
          </div>
          <Link
            href="/clearance"
            className="text-xs font-bold uppercase tracking-wider text-sale hover:underline flex items-center gap-1 w-fit"
          >
            <span>View All Clearance Deals</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {collections.clearance.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-sale/60"
            >
              <div className="relative shrink-0 overflow-hidden bg-muted aspect-square w-full">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => toggleFavorite(product)}
                  className="grid size-8 shrink-0 place-items-center rounded-md border border-border bg-background/70 backdrop-blur transition-colors hover:border-sale/60 hover:bg-background/90 absolute top-2 right-2"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`size-4 ${
                      isFavorite(product.id)
                        ? "fill-sale text-sale"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                <div className="flex flex-wrap items-center gap-1.5 text-[0.68rem] uppercase tracking-wider">
                  <span className="rounded-xs bg-secondary px-2 py-0.5 font-semibold text-secondary-foreground truncate max-w-[120px]">
                    {product.store.replace(/_/g, " ")}
                  </span>
                  <span className="rounded-xs px-2 py-0.5 font-semibold bg-sale/15 text-sale">
                    CLEARANCE
                  </span>
                </div>
                <h3 className="line-clamp-2 text-sm font-semibold text-card-foreground group-hover:text-sale transition-colors">
                  {product.name}
                </h3>
                <div className="mt-auto flex items-end justify-between gap-2 pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-xl font-bold leading-none text-sale">
                      ₹{product.discountedPrice ?? product.price}
                    </span>
                    {product.discountedPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase font-semibold text-muted-foreground hover:text-sale flex items-center gap-0.5"
                  >
                    <span>View</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
