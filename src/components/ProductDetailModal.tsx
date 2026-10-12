"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { StoreComparisonOffer } from "@/lib/adapters/types";
import {
  X,
  Heart,
  ExternalLink,
  ShieldCheck,
  Truck,
  RotateCcw,
  Scale,
  Sparkles,
  ArrowUpRight,
  Clock,
} from "lucide-react";
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
  const [comparisonOffers, setComparisonOffers] = useState<StoreComparisonOffer[]>([]);
  const [loadingCompare, setLoadingCompare] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      // Fetch cross-store comparison offers
      setLoadingCompare(true);
      fetch(`/api/compare?id=${encodeURIComponent(product.id)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.offers) {
            setComparisonOffers(data.offers);
          } else {
            setComparisonOffers([]);
          }
        })
        .catch((err) => {
          console.error("Failed to load comparisons", err);
          setComparisonOffers([]);
        })
        .finally(() => setLoadingCompare(false));
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

  const bestOffer = comparisonOffers.find((o) => o.isLowestPrice);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-8 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[100vh] sm:max-h-[92vh] bg-white text-black overflow-y-auto sm:overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-white/95 hover:bg-black hover:text-white transition-colors border border-neutral-200"
          aria-label="Close product view"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Left Column: Large Image Gallery */}
        <div className="md:col-span-6 bg-neutral-100 relative min-h-[350px] sm:min-h-[480px] md:min-h-[640px] flex items-center justify-center overflow-hidden border-r border-neutral-200/80">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain md:object-cover max-h-[75vh]"
          />
          {hasDiscount && discountPercent && (
            <div className="absolute top-4 left-4 bg-black text-white text-[10px] tracking-[0.2em] font-medium uppercase px-2.5 py-1">
              SALE · {discountPercent}% MARKDOWN
            </div>
          )}
          {comparisonOffers.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-neutral-300 text-black text-[10px] tracking-[0.16em] uppercase px-3 py-1 flex items-center gap-1.5 shadow-sm">
              <Scale className="w-3 h-3 text-neutral-600" />
              <span>AVAILABLE ACROSS {comparisonOffers.length} STORES</span>
            </div>
          )}
        </div>

        {/* Right Column: Editorial Product Metadata & Buy Action */}
        <div className="md:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[92vh]">
          <div>
            {/* Header / Category & Boutique */}
            <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-neutral-400 mb-3 border-b border-neutral-100 pb-2">
              <span>{product.store}</span>
              <span>{product.category?.replace("_", " ") || "FOOTBALL KIT"}</span>
            </div>

            {/* Product Title */}
            <h2
              id="modal-title"
              className="text-lg sm:text-xl font-light tracking-wide uppercase text-black leading-snug mb-4"
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

            {/* CROSS-STORE PRICE COMPARISON PANEL */}
            {comparisonOffers.length > 1 && (
              <div className="mb-6 bg-neutral-50 border border-neutral-200 p-4">
                <div className="flex items-center justify-between border-b border-neutral-200/80 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Scale className="w-3.5 h-3.5 text-black" />
                    <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-black">
                      COMPARE PRICES ({comparisonOffers.length} STORES)
                    </span>
                  </div>
                  {bestOffer && (
                    <span className="text-[9px] tracking-wider uppercase bg-black text-white px-2 py-0.5 font-medium">
                      BEST: ₹{bestOffer.effectivePrice}
                    </span>
                  )}
                </div>

                <div className="divide-y divide-neutral-200/60 max-h-48 overflow-y-auto">
                  {comparisonOffers.map((offer) => (
                    <div
                      key={offer.storeId}
                      className="py-2.5 flex items-center justify-between text-xs"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium tracking-wide uppercase text-neutral-900 text-[11px]">
                            {offer.storeName}
                          </span>
                          {offer.isLowestPrice && (
                            <span className="text-[8px] tracking-[0.15em] uppercase bg-neutral-200 text-black px-1.5 py-0.2">
                              LOWEST
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-neutral-500">
                          {offer.inStock ? "In stock" : "Check store"}
                          {offer.sizes.length > 0 && ` · Sizes: ${offer.sizes.slice(0, 3).join(", ")}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="font-medium text-black">
                            ₹{offer.effectivePrice}
                          </span>
                          {!offer.isLowestPrice && offer.priceDiffFromLowest > 0 && (
                            <span className="text-[9px] text-neutral-400 block">
                              +₹{offer.priceDiffFromLowest}
                            </span>
                          )}
                        </div>
                        <a
                          href={offer.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 border border-neutral-300 hover:border-black text-black hover:bg-black hover:text-white transition-colors"
                          title={`View at ${offer.storeName}`}
                        >
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-200/60 flex items-center gap-1.5 text-[9px] text-neutral-400 tracking-wider">
                  <Clock className="w-3 h-3" />
                  <span>Prices verified in real time. Final shipping & coupon codes applied at seller checkout.</span>
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  AVAILABLE SIZES AT {product.store}
                </div>
                <div className="flex flex-wrap gap-1.5">
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
              <div className="mb-6">
                <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  SPECIFICATIONS & TAGS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.slice(0, 6).map((tag) => (
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
                <span>Live catalog sync across 22+ partner boutiques</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-3">
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
