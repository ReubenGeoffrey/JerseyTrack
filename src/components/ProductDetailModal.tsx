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
import { SpiderInsigniaIcon, SpiderMaskIcon } from "./SpiderIcons";

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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in touch-manipulation overscroll-contain"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] rounded-t-xl sm:rounded-sm border border-border/80 bg-card text-foreground overflow-y-auto sm:overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-spider-glow-lg transition-colors duration-200 overscroll-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Minimalist Close Button - min 44px for thumbs */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 min-h-[44px] min-w-[44px] flex items-center justify-center bg-card/90 hover:bg-card text-foreground border border-border/80 rounded-full sm:rounded-xs transition-colors touch-manipulation active:scale-95"
          aria-label="Close product view"
        >
          <X className="size-4 stroke-[2]" />
        </button>

        {/* Left Column: Image Box */}
        <div className="md:col-span-6 bg-card/50 relative min-h-[300px] sm:min-h-[440px] md:min-h-[580px] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-border">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain md:object-cover max-h-[60vh] sm:max-h-[75vh]"
          />
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-primary text-white font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 shadow-spider-glow flex items-center gap-1.5">
              <SpiderInsigniaIcon size={12} className="text-white" />
              <span>MARKDOWN</span>
            </div>
          )}
          {comparisonOffers.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-primary/40 text-primary font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 flex items-center gap-1.5 shadow-spider-glow">
              <Scale className="size-3 stroke-[2]" />
              <span>{comparisonOffers.length} STORES COMPARED</span>
            </div>
          )}
        </div>

        {/* Right Column: Metadata & Price Comparison */}
        <div className="md:col-span-6 p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] sm:max-h-[90vh] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <div>
            {/* Store & Edition Header */}
            <div className="flex items-center gap-2 text-[10px] font-mono font-medium uppercase tracking-[0.22em] text-muted-foreground mb-2">
              <span className="text-primary font-semibold">
                {product.store.replace(/_/g, " ")}
              </span>
              <span>·</span>
              <span className="text-foreground">
                {product.category?.replace(/_/g, " ") || "JERSEY"}
              </span>
            </div>

            {/* Product Title */}
            <h2
              id="modal-title"
              className="display-title text-xl sm:text-3xl font-normal tracking-[0.04em] text-foreground leading-tight mb-4"
            >
              {product.name}
            </h2>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6 pb-5 border-b border-border/60">
              <span
                className={`text-2xl sm:text-3xl font-bold font-mono leading-none ${
                  hasDiscount ? "text-primary" : "text-foreground"
                }`}
              >
                ₹{product.discountedPrice ?? product.price}
              </span>
              {hasDiscount && (
                <span className="text-sm font-mono text-muted-foreground line-through">
                  ₹{product.price}
                </span>
              )}
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] font-medium text-muted-foreground ml-auto">
                {product.inStock ? "IN STOCK" : "SOLD OUT"}
              </span>
            </div>

            {/* CROSS-STORE PRICE COMPARISON PANEL */}
            {comparisonOffers.length > 1 && (
              <div className="mb-6 border border-border/80 bg-background/60 p-4 rounded-xs shadow-spider-glow">
                <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Scale className="size-3.5 stroke-[1.5] text-primary" />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-foreground">
                      Compare Prices ({comparisonOffers.length} Stores)
                    </span>
                  </div>
                  {bestOffer && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-primary">
                      Lowest: ₹{bestOffer.effectivePrice}
                    </span>
                  )}
                </div>

                <div className="divide-y divide-border/60 max-h-48 overflow-y-auto pr-1">
                  {comparisonOffers.map((offer) => (
                    <div
                      key={offer.storeId}
                      className="py-2.5 flex items-center justify-between text-xs"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-foreground text-xs uppercase tracking-wide">
                            {offer.storeName}
                          </span>
                          {offer.isLowestPrice && (
                            <span className="text-[9px] font-mono font-bold uppercase bg-primary text-white px-1.5 py-0.5 rounded-xs">
                              Best price
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
                          {offer.inStock ? "In stock" : "Check store"}
                          {offer.sizes.length > 0 && ` · Sizes: ${offer.sizes.slice(0, 3).join(", ")}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-foreground">
                            ₹{offer.effectivePrice}
                          </span>
                          {!offer.isLowestPrice && offer.priceDiffFromLowest > 0 && (
                            <span className="text-[10px] font-mono text-muted-foreground block">
                              +₹{offer.priceDiffFromLowest}
                            </span>
                          )}
                        </div>
                        <a
                          href={offer.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[36px] min-w-[36px] flex items-center justify-center border border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors touch-manipulation"
                          title={`View at ${offer.storeName}`}
                        >
                          <ArrowUpRight className="size-4 stroke-[1.8]" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2.5 pt-2 border-t border-border flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  <Clock className="size-3 stroke-[1.5] text-primary" />
                  <span>Verified stock. Direct merchant checkout.</span>
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Sizes at {product.store.replace(/_/g, " ")}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="min-h-[36px] min-w-[36px] grid place-items-center text-[10px] font-mono uppercase font-bold border border-border/80 bg-background text-foreground rounded-xs"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Store Authenticity Note */}
            <div className="space-y-2 py-3 border-y border-border text-[10px] sm:text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 stroke-[1.8] text-primary" />
                <span>Verified Independent Retailer</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="size-3.5 stroke-[1.8] text-primary" />
                <span>Direct dispatch from {product.store.replace(/_/g, " ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="size-3.5 stroke-[1.8] text-primary" />
                <span>Synchronized with 22+ active stores</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-3">
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-spider-primary w-full justify-center text-center"
            >
              <SpiderInsigniaIcon size={18} className="text-white" />
              <span>Purchase at {product.store.replace(/_/g, " ")}</span>
              <ExternalLink className="size-3.5 stroke-[2]" />
            </a>

            <button
              type="button"
              onClick={() => toggleFavorite(product)}
              className="btn-spider-stealth w-full justify-center text-center"
            >
              <Heart
                className={`size-4 stroke-[1.8] ${
                  favorite ? "fill-primary text-primary" : "text-muted-foreground"
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
