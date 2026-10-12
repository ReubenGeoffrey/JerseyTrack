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
      <div className="relative shrink-0 overflow-hidden bg-muted aspect-square w-full mb-3 rounded-xs">
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
          className="size-8 grid place-items-center rounded-full bg-background/80 hover:bg-background border border-border backdrop-blur transition-all absolute top-2.5 right-2.5 z-10"
          aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`size-3.5 stroke-[1.5] transition-colors ${
              favorite
                ? "fill-primary text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          />
        </button>

        {/* Quick Compare Hover Badge */}
        <div className="absolute bottom-2.5 left-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-[9px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
          <Scale className="size-2.5" />
          <span>Compare Stores</span>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="flex flex-1 flex-col gap-1">
        {/* Store & Edition Header */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
          <span className="truncate max-w-[140px] text-muted-foreground/80">
            {product.store.replace(/_/g, " ")}
          </span>
          <span className="text-foreground font-semibold">{editionLabel}</span>
        </div>

        {/* Product Title */}
        <h3 className="line-clamp-1 text-xs font-normal text-foreground tracking-wide group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Pricing Area */}
        <div className="mt-auto flex items-baseline justify-between gap-2 pt-0.5">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-xs font-semibold ${
                hasDiscount ? "text-sale" : "text-foreground"
              }`}
            >
              ₹{product.discountedPrice ?? product.price}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-muted-foreground line-through">
                ₹{product.price}
              </span>
            )}
          </div>

          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            {product.inStock ? "In stock" : "Sold out"}
          </span>
        </div>
      </div>
    </div>
  );
}
