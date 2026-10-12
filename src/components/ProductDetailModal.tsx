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

  const bestOffer = comparisonOffers.find((o) => o.isLowestPrice);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[100vh] sm:max-h-[92vh] border border-neutral-200 bg-white text-black overflow-y-auto sm:overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl"
      >
        {/* Minimalist Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 size-9 grid place-items-center bg-white/80 hover:bg-white text-black border border-neutral-200 transition-colors"
          aria-label="Close product view"
        >
          <X className="size-4 stroke-[1.5]" />
        </button>

        {/* Left Column: Image Box */}
        <div className="md:col-span-6 bg-neutral-50 relative min-h-[350px] sm:min-h-[480px] md:min-h-[640px] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-neutral-200">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain md:object-cover max-h-[75vh]"
          />
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-medium tracking-[0.2em] uppercase px-3 py-1">
              SALE
            </div>
          )}
          {comparisonOffers.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-white/95 border border-neutral-200 text-black text-[10px] font-medium tracking-[0.2em] uppercase px-3 py-1 flex items-center gap-1.5 shadow-xs">
              <Scale className="size-3 stroke-[1.5]" />
              <span>Available in {comparisonOffers.length} boutiques</span>
            </div>
          )}
        </div>

        {/* Right Column: Metadata & Price Comparison */}
        <div className="md:col-span-6 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto max-h-[92vh]">
          <div>
            {/* Store & Edition Header */}
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-400 mb-2">
              <span className="text-neutral-500">
                {product.store.replace(/_/g, " ")}
              </span>
              <span>·</span>
              <span className="text-black">
                {product.category?.replace(/_/g, " ") || "JERSEY"}
              </span>
            </div>

            {/* Product Title */}
            <h2
              id="modal-title"
              className="display-title text-2xl sm:text-3xl font-normal tracking-[0.04em] text-black leading-tight mb-4"
            >
              {product.name}
            </h2>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-neutral-200">
              <span
                className={`text-2xl font-semibold leading-none ${
                  hasDiscount ? "text-sale" : "text-black"
                }`}
              >
                ₹{product.discountedPrice ?? product.price}
              </span>
              {hasDiscount && (
                <span className="text-sm text-neutral-400 line-through">
                  ₹{product.price}
                </span>
              )}
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400 ml-auto">
                {product.inStock ? "IN STOCK" : "SOLD OUT"}
              </span>
            </div>

            {/* CROSS-STORE PRICE COMPARISON PANEL */}
            {comparisonOffers.length > 1 && (
              <div className="mb-6 border border-neutral-200 bg-neutral-50/50 p-4">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Scale className="size-3.5 stroke-[1.5] text-black" />
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-black">
                      Compare Prices ({comparisonOffers.length} Stores)
                    </span>
                  </div>
                  {bestOffer && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black">
                      Lowest: ₹{bestOffer.effectivePrice}
                    </span>
                  )}
                </div>

                <div className="divide-y divide-neutral-200/80 max-h-48 overflow-y-auto">
                  {comparisonOffers.map((offer) => (
                    <div
                      key={offer.storeId}
                      className="py-2.5 flex items-center justify-between text-xs"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-black text-xs uppercase tracking-wide">
                            {offer.storeName}
                          </span>
                          {offer.isLowestPrice && (
                            <span className="text-[9px] font-medium uppercase bg-black text-white px-1.5 py-0.2">
                              Best price
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                          {offer.inStock ? "In stock" : "Check store"}
                          {offer.sizes.length > 0 && ` · Sizes: ${offer.sizes.slice(0, 3).join(", ")}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs font-semibold text-black">
                            ₹{offer.effectivePrice}
                          </span>
                          {!offer.isLowestPrice && offer.priceDiffFromLowest > 0 && (
                            <span className="text-[10px] text-neutral-400 block">
                              +₹{offer.priceDiffFromLowest}
                            </span>
                          )}
                        </div>
                        <a
                          href={offer.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 border border-neutral-200 hover:border-black text-neutral-600 hover:text-black transition-colors"
                          title={`View at ${offer.storeName}`}
                        >
                          <ArrowUpRight className="size-3.5 stroke-[1.5]" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2.5 pt-2 border-t border-neutral-200 flex items-center gap-1.5 text-[10px] text-neutral-400 uppercase tracking-wider">
                  <Clock className="size-3 stroke-[1.5]" />
                  <span>Prices verified today. Direct merchant checkout.</span>
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 mb-2">
                  Sizes at {product.store.replace(/_/g, " ")}
                </div>
                <div className="flex flex-wrap gap-1">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="size-7 grid place-items-center text-[10px] uppercase font-medium border border-neutral-200 text-black"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Store Authenticity Note */}
            <div className="space-y-2 py-3 border-y border-neutral-200 text-[11px] text-neutral-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 stroke-[1.5] text-black" />
                <span>Verified Independent Retailer</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="size-3.5 stroke-[1.5] text-black" />
                <span>Direct dispatch from {product.store.replace(/_/g, " ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="size-3.5 stroke-[1.5] text-black" />
                <span>Synchronized with 22+ active stores</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-2.5">
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-black text-white hover:bg-neutral-800 transition-colors text-[11px] font-medium uppercase tracking-[0.25em] flex items-center justify-center gap-2"
            >
              <span>Purchase at {product.store.replace(/_/g, " ")}</span>
              <ExternalLink className="size-3.5 stroke-[1.5]" />
            </a>

            <button
              type="button"
              onClick={() => toggleFavorite(product)}
              className="w-full py-3.5 px-6 border border-neutral-200 hover:border-black transition-colors text-[11px] font-medium uppercase tracking-[0.22em] text-black flex items-center justify-center gap-2"
            >
              <Heart
                className={`size-3.5 stroke-[1.5] ${
                  favorite ? "fill-black text-black" : "text-neutral-500"
                }`}
              />
              <span>{favorite ? "Saved to Wishlist" : "Save to Wishlist"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
