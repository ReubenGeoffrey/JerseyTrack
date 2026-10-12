"use client";

import React, { useEffect } from "react";
import { Product } from "@/types";
import { X, Heart, ExternalLink, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 md:p-10 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[100vh] sm:max-h-[90vh] bg-white text-black overflow-y-auto sm:overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 hover:bg-black hover:text-white transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Left Column: Large Image Gallery */}
        <div className="md:col-span-7 bg-neutral-100 relative min-h-[350px] sm:min-h-[480px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain md:object-cover max-h-[70vh]"
          />
          {hasDiscount && discountPercent && (
            <div className="absolute top-4 left-4 bg-black text-white text-[10px] tracking-[0.2em] font-medium uppercase px-2.5 py-1">
              SALE · {discountPercent}% MARKDOWN
            </div>
          )}
        </div>

        {/* Right Column: Editorial Product Metadata & Buy Action */}
        <div className="md:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header / Category & Boutique */}
            <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-neutral-400 mb-3 border-b border-neutral-100 pb-2">
              <span>{product.store}</span>
              <span>{product.category?.replace("_", " ") || "FOOTBALL KIT"}</span>
            </div>

            {/* Product Title */}
            <h2
              id="modal-title"
              className="text-lg sm:text-xl md:text-2xl font-light tracking-wide uppercase text-black leading-snug mb-4"
            >
              {product.name}
            </h2>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-medium tracking-tight text-black">
                ₹{product.discountedPrice ?? product.price}
              </span>
              {hasDiscount && (
                <span className="text-sm text-neutral-400 line-through">
                  ₹{product.price}
                </span>
              )}
              <span className="text-[11px] text-neutral-500 uppercase tracking-widest ml-auto">
                {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
              </span>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  AVAILABLE SIZES
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="text-xs uppercase tracking-wider px-3 py-1.5 border border-neutral-200 text-neutral-800"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags & Details */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-8">
                <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  SPECIFICATIONS & TAGS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2 py-0.5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Boutique Security Trust Note */}
            <div className="space-y-2 py-4 border-y border-neutral-100 text-[11px] text-neutral-500 tracking-wider">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                <span>Verified boutique inventory indexed by KitScouts</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-neutral-700" />
                <span>Direct fulfillment across India via {product.store}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-neutral-700" />
                <span>Live catalog sync guaranteed</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-8 space-y-3">
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-black text-white hover:bg-neutral-800 transition-colors text-xs tracking-[0.22em] uppercase font-medium flex items-center justify-center gap-2 text-center"
            >
              <span>VIEW AT {product.store}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => toggleFavorite(product)}
              className="w-full py-3 px-6 bg-white border border-neutral-300 hover:border-black transition-colors text-xs tracking-[0.2em] uppercase text-neutral-800 flex items-center justify-center gap-2"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  favorite ? "fill-current text-black" : "text-neutral-500"
                }`}
              />
              <span>{favorite ? "SAVED IN WISHLIST" : "SAVE TO WISHLIST"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
