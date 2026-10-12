"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="w-full bg-white text-black py-12 divide-y divide-neutral-200">
      {/* 01 — THE CLUB COLLECTION */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase mb-2">
              01 — THE SELECTION
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.12em] uppercase">
              THE CLUB COLLECTION
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-xs text-neutral-500 max-w-xs tracking-wider uppercase hidden sm:block">
              European elite, domestic giants & modern concept silhouettes.
            </p>
            <Link
              href="/?category=player#catalog"
              className="text-xs font-medium tracking-[0.18em] uppercase border-b border-black pb-1 hover:text-neutral-500 transition-colors"
            >
              VIEW ALL CLUBS →
            </Link>
          </div>
        </div>

        {/* Asymmetrical Layout: 1 Featured Large + 3 Side Items */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {collections.clubs[0] && (
            <div className="lg:col-span-6 group relative bg-neutral-50 flex flex-col justify-between">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                <img
                  src={collections.clubs[0].imageUrl}
                  alt={collections.clubs[0].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(collections.clubs[0]);
                  }}
                  className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-none border border-neutral-200/60 hover:bg-black hover:text-white transition-colors"
                  aria-label="Save item"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite(collections.clubs[0].id)
                        ? "fill-current text-black group-hover:text-white"
                        : "text-neutral-600"
                    }`}
                  />
                </button>
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] bg-black text-white px-2 py-1">
                  FEATURED PIECE
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between gap-3 bg-white border-t border-neutral-100">
                <div className="flex items-center justify-between text-[11px] tracking-[0.16em] uppercase text-neutral-500">
                  <span>{collections.clubs[0].store}</span>
                  <span>{collections.clubs[0].category.replace("_", " ")}</span>
                </div>
                <h3 className="text-base sm:text-lg font-light tracking-wide uppercase line-clamp-1">
                  {collections.clubs[0].name}
                </h3>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-base font-medium tracking-tight">
                    ₹{collections.clubs[0].discountedPrice ?? collections.clubs[0].price}
                  </span>
                  <a
                    href={collections.clubs[0].productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-black hover:underline"
                  >
                    <span>ACQUIRE AT STORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Side 3 Club Items */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {collections.clubs.slice(1, 5).map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-neutral-50"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product);
                    }}
                    className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm border border-neutral-200/60 hover:bg-black hover:text-white transition-colors"
                    aria-label="Save item"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFavorite(product.id)
                          ? "fill-current text-black hover:text-white"
                          : "text-neutral-500"
                      }`}
                    />
                  </button>
                </div>
                <div className="p-4 flex flex-col gap-1.5 bg-white border-t border-neutral-100 flex-1">
                  <div className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">
                    {product.store}
                  </div>
                  <h4 className="text-xs font-light tracking-wider uppercase line-clamp-2 min-h-[2rem]">
                    {product.name}
                  </h4>
                  <div className="mt-auto pt-2 flex items-center justify-between text-xs">
                    <span className="font-medium">
                      ₹{product.discountedPrice ?? product.price}
                    </span>
                    <a
                      href={product.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-[0.16em] text-neutral-600 hover:text-black flex items-center gap-0.5"
                    >
                      <span>VIEW</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — ARCHIVE / RETRO */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase mb-2">
              02 — THE VAULT
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.12em] uppercase">
              ARCHIVE / RETRO
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-xs text-neutral-500 max-w-xs tracking-wider uppercase hidden sm:block">
              Vintage aesthetics, historic campaigns & collectible heritage.
            </p>
            <Link
              href="/?category=retro#catalog"
              className="text-xs font-medium tracking-[0.18em] uppercase border-b border-black pb-1 hover:text-neutral-500 transition-colors"
            >
              EXPLORE ARCHIVE →
            </Link>
          </div>
        </div>

        {/* 4 Column Editorial Display */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {collections.archive.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white border border-neutral-100"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-50">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(product);
                  }}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm border border-neutral-200/60 hover:bg-black hover:text-white transition-colors"
                  aria-label="Save item"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isFavorite(product.id)
                        ? "fill-current text-black hover:text-white"
                        : "text-neutral-500"
                    }`}
                  />
                </button>
                <div className="absolute bottom-2 left-2 text-[9px] uppercase tracking-[0.2em] bg-white/90 px-1.5 py-0.5 border border-neutral-200">
                  RETRO EDITION
                </div>
              </div>
              <div className="p-3.5 sm:p-4 flex flex-col gap-1.5 flex-1">
                <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">
                  {product.store}
                </span>
                <h4 className="text-xs font-light tracking-wider uppercase line-clamp-2 min-h-[2rem]">
                  {product.name}
                </h4>
                <div className="mt-auto pt-2 flex items-center justify-between text-xs">
                  <span className="font-medium">
                    ₹{product.discountedPrice ?? product.price}
                  </span>
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 hover:text-black flex items-center gap-0.5"
                  >
                    <span>DETAILS</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — INTERNATIONAL */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase mb-2">
              03 — GLOBAL GLORY
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.12em] uppercase">
              INTERNATIONAL
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-xs text-neutral-500 max-w-xs tracking-wider uppercase hidden sm:block">
              World cups, continental tourneys & federation colours.
            </p>
            <Link
              href="/?category=international#catalog"
              className="text-xs font-medium tracking-[0.18em] uppercase border-b border-black pb-1 hover:text-neutral-500 transition-colors"
            >
              VIEW FEDERATIONS →
            </Link>
          </div>
        </div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {collections.international.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white border border-neutral-100"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-50">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(product);
                  }}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm border border-neutral-200/60 hover:bg-black hover:text-white transition-colors"
                  aria-label="Save item"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isFavorite(product.id)
                        ? "fill-current text-black hover:text-white"
                        : "text-neutral-500"
                    }`}
                  />
                </button>
              </div>
              <div className="p-3.5 sm:p-4 flex flex-col gap-1.5 flex-1">
                <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">
                  {product.store}
                </span>
                <h4 className="text-xs font-light tracking-wider uppercase line-clamp-2 min-h-[2rem]">
                  {product.name}
                </h4>
                <div className="mt-auto pt-2 flex items-center justify-between text-xs">
                  <span className="font-medium">
                    ₹{product.discountedPrice ?? product.price}
                  </span>
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 hover:text-black flex items-center gap-0.5"
                  >
                    <span>BUY</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — THE LAST CHANCE (Clearance) */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto bg-neutral-900 text-white my-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase mb-2">
              04 — ARCHIVAL CLEARANCE
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.12em] uppercase text-white">
              THE LAST CHANCE
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-xs text-neutral-400 max-w-xs tracking-wider uppercase hidden sm:block">
              Verified seasonal markdowns starting from ₹249. Limited quantity.
            </p>
            <Link
              href="/clearance"
              className="text-xs font-medium tracking-[0.18em] uppercase border-b border-white pb-1 hover:text-neutral-400 transition-colors"
            >
              VIEW FULL CLEARANCE (180+ KITS) →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {collections.clearance.slice(0, 4).map((product) => {
            const hasDiscount =
              product.discountedPrice && product.discountedPrice < product.price;
            const savings = hasDiscount
              ? Math.round(
                  ((product.price - (product.discountedPrice ?? 0)) /
                    product.price) *
                    100
                )
              : null;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-neutral-950 border border-neutral-800"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product);
                    }}
                    className="absolute top-3 right-3 z-10 p-2 bg-black/80 backdrop-blur-sm border border-neutral-700 hover:bg-white hover:text-black transition-colors"
                    aria-label="Save item"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFavorite(product.id)
                          ? "fill-current text-white hover:text-black"
                          : "text-neutral-400"
                      }`}
                    />
                  </button>
                  {savings && (
                    <div className="absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase bg-white text-black font-semibold px-2 py-0.5">
                      -{savings}% OFF
                    </div>
                  )}
                </div>
                <div className="p-3.5 sm:p-4 flex flex-col gap-1.5 flex-1 bg-neutral-950">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">
                    {product.store}
                  </span>
                  <h4 className="text-xs font-light tracking-wider uppercase text-neutral-200 line-clamp-2 min-h-[2rem]">
                    {product.name}
                  </h4>
                  <div className="mt-auto pt-2 flex items-baseline justify-between text-xs">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-white">
                        ₹{product.discountedPrice ?? product.price}
                      </span>
                      {hasDiscount && (
                        <span className="text-[11px] text-neutral-400 line-through">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                    <a
                      href={product.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-[0.16em] text-neutral-400 hover:text-white flex items-center gap-0.5"
                    >
                      <span>SHOP</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
