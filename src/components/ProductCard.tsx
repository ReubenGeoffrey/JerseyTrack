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
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:border-primary/60 cursor-pointer shadow-sm hover:shadow-md"
    >
      {/* Product Image Box */}
      <div className="relative shrink-0 overflow-hidden bg-muted aspect-square w-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
          className="grid size-8 sm:size-9 shrink-0 place-items-center rounded-md border border-border bg-background/70 backdrop-blur transition-colors hover:border-primary/60 hover:bg-background/90 absolute top-2 right-2 z-10"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`size-4 transition-colors ${
              favorite
                ? "fill-primary text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          />
        </button>

        {/* Quick Compare Badge */}
        <div className="absolute bottom-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/40 px-2 py-0.5 rounded flex items-center gap-1">
          <Scale className="w-3 h-3" />
          <span>Compare Prices</span>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="flex flex-1 flex-col gap-2 p-2 sm:p-4">
        {/* Store & Edition Tags */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[0.68rem] uppercase tracking-wider">
          <span className="rounded-xs bg-secondary px-2 py-0.5 font-semibold text-secondary-foreground truncate max-w-[130px]">
            {product.store.replace(/_/g, " ")}
          </span>
          <span className="rounded-xs px-2 py-0.5 font-semibold bg-primary/12 text-primary">
            {editionLabel}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="line-clamp-2 text-sm sm:text-base font-semibold text-card-foreground group-hover:text-primary transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Pricing Area */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex items-baseline gap-2">
            <span
              className={`font-display text-xl sm:text-2xl font-bold leading-none ${
                hasDiscount ? "text-sale" : "text-foreground"
              }`}
            >
              ₹{product.discountedPrice ?? product.price}
            </span>
            {hasDiscount && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through leading-none">
                ₹{product.price}
              </span>
            )}
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {product.inStock ? "In stock" : "Sold out"}
          </span>
        </div>
      </div>
    </div>
  );
}
