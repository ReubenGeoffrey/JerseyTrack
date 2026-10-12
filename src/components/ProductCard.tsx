"use client";

import React from "react";
import { Product } from "@/types";
import { Heart, Scale } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { SpiderInsigniaIcon } from "./SpiderIcons";

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
    <article
      onClick={() => onOpenDetails?.(product)}
      className="group spider-card flex flex-col cursor-pointer transition-all duration-300 touch-manipulation select-none p-2 sm:p-2.5 rounded-sm"
    >
      {/* Product Image Box */}
      <div className="relative shrink-0 overflow-hidden bg-card/80 aspect-square w-full mb-2.5 sm:mb-3 rounded-xs border border-border/50">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Discreet Wishlist Button - Min 44px Tap Target on Mobile */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-background/85 hover:bg-background border border-border/80 backdrop-blur-md transition-all active:scale-90 absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 touch-manipulation"
          aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`size-4 stroke-[1.8] transition-colors ${
              favorite
                ? "fill-primary text-primary filter drop-shadow-[0_0_6px_rgba(255,23,68,0.7)]"
                : "text-muted-foreground hover:text-primary"
            }`}
          />
        </button>

        {/* Spider Discount Tag */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 z-10 bg-primary/95 text-white font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-spider-glow flex items-center gap-1">
            <SpiderInsigniaIcon size={10} className="text-white" />
            <span>SALE</span>
          </div>
        )}

        {/* Quick Compare Hover Badge */}
        <div className="absolute bottom-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[9px] font-mono font-semibold uppercase tracking-[0.18em] px-2.5 py-1 flex items-center gap-1.5 shadow-spider-glow pointer-events-none">
          <Scale className="size-2.5" />
          <span>Compare Stores</span>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="flex flex-1 flex-col gap-1">
        {/* Store & Edition Header */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] font-mono font-medium text-muted-foreground">
          <span className="truncate max-w-[130px] text-muted-foreground/90">
            {product.store.replace(/_/g, " ")}
          </span>
          <span className="text-primary font-semibold text-[9px]">
            {editionLabel}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="line-clamp-2 text-xs font-normal text-foreground tracking-wide group-hover:text-primary transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Pricing Area */}
        <div className="mt-auto flex items-baseline justify-between gap-1.5 pt-1.5 border-t border-border/30">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-xs sm:text-sm font-bold font-mono ${
                hasDiscount ? "text-primary" : "text-foreground"
              }`}
            >
              ₹{product.discountedPrice ?? product.price}
            </span>
            {hasDiscount && (
              <span className="text-[10px] text-muted-foreground line-through font-mono">
                ₹{product.price}
              </span>
            )}
          </div>

          <span className={`text-[9px] uppercase tracking-wider font-mono font-medium ${
            product.inStock ? "text-muted-foreground" : "text-rose-500/80"
          }`}>
            {product.inStock ? "IN STOCK" : "SOLD OUT"}
          </span>
        </div>
      </div>
    </article>
  );
}
