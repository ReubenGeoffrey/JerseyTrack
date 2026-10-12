"use client";

import React from "react";
import { Product } from "@/types";
import { Heart, Scale } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const hasDiscount =
    product.discountedPrice !== null &&
    product.discountedPrice < product.price;

  const editionLabel = product.category
    ? product.category.replace(/_/g, " ")
    : "FAN VERSION";

  return (
    <div
      onClick={() => onOpenDetails?.(product)}
      className="group flex flex-col cursor-pointer transition-all duration-200"
    >
      {/* Product Image Box */}
      <div className="relative shrink-0 overflow-hidden bg-neutral-100 aspect-square w-full mb-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Discreet Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
          className="size-8 grid place-items-center rounded-full bg-white/80 hover:bg-white backdrop-blur transition-all absolute top-2.5 right-2.5 z-10"
          aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`size-3.5 stroke-[1.5] transition-colors ${
              favorite
                ? "fill-black text-black"
                : "text-neutral-500 hover:text-black"
            }`}
          />
        </button>

        {/* Quick Compare Hover Badge */}
        <div className="absolute bottom-2.5 left-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[9px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 flex items-center gap-1.5">
          <Scale className="size-2.5" />
          <span>Compare Stores</span>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="flex flex-1 flex-col gap-1">
        {/* Store & Edition Header */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400">
          <span className="truncate max-w-[140px] text-neutral-500">
            {product.store.replace(/_/g, " ")}
          </span>
          <span className="text-neutral-900 font-semibold">{editionLabel}</span>
        </div>

        {/* Product Title */}
        <h3 className="line-clamp-1 text-xs font-normal text-neutral-900 tracking-wide group-hover:text-black transition-colors">
          {product.name}
        </h3>

        {/* Pricing Area */}
        <div className="mt-auto flex items-baseline justify-between gap-2 pt-0.5">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-xs font-semibold ${
                hasDiscount ? "text-sale" : "text-black"
              }`}
            >
              ₹{product.discountedPrice ?? product.price}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-neutral-400 line-through">
                ₹{product.price}
              </span>
            )}
          </div>

          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
            {product.inStock ? "In stock" : "Sold out"}
          </span>
        </div>
      </div>
    </div>
  );
}
