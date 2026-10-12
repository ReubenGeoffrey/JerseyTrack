"use client";

import React from "react";
import { Product } from "@/types";
import { Heart, ArrowUpRight } from "lucide-react";
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

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - (product.discountedPrice ?? 0)) / product.price) * 100
      )
    : null;

  return (
    <div className="group relative flex flex-col bg-white transition-opacity duration-300">
      {/* Product Image Box */}
      <div
        onClick={() => onOpenDetails?.(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Favorite Discreet Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-none bg-white/85 backdrop-blur-sm border border-neutral-200/50 hover:bg-black hover:text-white transition-colors"
          aria-label={favorite ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              favorite
                ? "fill-current text-black group-hover:text-white"
                : "text-neutral-500 hover:text-black"
            }`}
          />
        </button>

        {/* Verified Discount Tag */}
        {hasDiscount && discountPercent && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-black text-white text-[9px] font-medium tracking-[0.15em] uppercase px-1.5 py-0.5">
            -{discountPercent}%
          </div>
        )}

        {/* Category Badge if Retro or Player */}
        {!hasDiscount && product.category?.includes("PLAYER") && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-neutral-900/80 backdrop-blur-sm text-white text-[8px] tracking-[0.2em] uppercase px-1.5 py-0.5">
            PLAYER
          </div>
        )}
        {!hasDiscount && product.category?.includes("RETRO") && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-neutral-900/80 backdrop-blur-sm text-white text-[8px] tracking-[0.2em] uppercase px-1.5 py-0.5">
            RETRO
          </div>
        )}

        {/* Discreet Quick View Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 py-2.5 px-3 bg-white/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-[10px] tracking-[0.16em] uppercase text-black border-t border-neutral-100 hidden sm:flex">
          <span>INSPECT PIECE</span>
          <ArrowUpRight className="w-3 h-3 text-neutral-500" />
        </div>
      </div>

      {/* Metadata Below Image */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-neutral-400 mb-1">
          <span>{product.store}</span>
          <span className={product.inStock ? "text-neutral-500" : "text-neutral-400"}>
            {product.inStock ? "IN STOCK" : "RESERVED"}
          </span>
        </div>

        <h3
          onClick={() => onOpenDetails?.(product)}
          className="text-[11px] sm:text-xs font-normal tracking-wide uppercase text-neutral-900 line-clamp-1 hover:text-neutral-500 transition-colors cursor-pointer"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xs sm:text-sm font-medium tracking-tight text-black">
            ₹{product.discountedPrice ?? product.price}
          </span>
          {hasDiscount && (
            <span className="text-[10px] sm:text-xs text-neutral-400 line-through tracking-normal">
              ₹{product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
