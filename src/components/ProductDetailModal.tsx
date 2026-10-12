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
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[100vh] sm:max-h-[92vh] rounded-lg border border-border bg-card text-foreground overflow-y-auto sm:overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-md border border-border bg-background/80 text-foreground hover:border-primary/60 hover:text-primary transition-colors"
          aria-label="Close product view"
        >
          <X className="size-5 stroke-[2]" />
        </button>

        {/* Left Column: Image Box */}
        <div className="md:col-span-6 bg-muted relative min-h-[350px] sm:min-h-[480px] md:min-h-[640px] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-border">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain md:object-cover max-h-[75vh]"
          />
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-sale text-foreground text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded">
              SALE
            </div>
          )}
          {comparisonOffers.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur border border-primary/50 text-primary text-xs font-bold tracking-wider uppercase px-3 py-1 rounded flex items-center gap-1.5 shadow-md">
              <Scale className="size-3.5" />
              <span>Available in {comparisonOffers.length} stores</span>
            </div>
          )}
        </div>

        {/* Right Column: Metadata & Comparison */}
        <div className="md:col-span-6 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[92vh]">
          <div>
            {/* Store & Edition Badge */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="rounded-xs bg-secondary px-2 py-0.5 text-secondary-foreground">
                {product.store.replace(/_/g, " ")}
              </span>
              <span className="rounded-xs px-2 py-0.5 bg-primary/12 text-primary">
                {product.category?.replace(/_/g, " ") || "JERSEY"}
              </span>
            </div>

            {/* Product Title */}
            <h2
              id="modal-title"
              className="display-title text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight mb-3"
            >
              {product.name}
            </h2>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className={`font-display text-3xl sm:text-4xl font-bold leading-none ${
                  hasDiscount ? "text-sale" : "text-foreground"
                }`}
              >
                ₹{product.discountedPrice ?? product.price}
              </span>
              {hasDiscount && (
                <span className="text-base text-muted-foreground line-through">
                  ₹{product.price}
                </span>
              )}
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground ml-auto">
                {product.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>

            {/* CROSS-STORE PRICE COMPARISON PANEL */}
            {comparisonOffers.length > 1 && (
              <div className="mb-6 rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between border-b border-border/80 pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Scale className="size-4 text-primary" />
                    <span className="text-xs font-bold tracking-wider uppercase text-foreground">
                      Compare Across Stores ({comparisonOffers.length})
                    </span>
                  </div>
                  {bestOffer && (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      Lowest: ₹{bestOffer.effectivePrice}
                    </span>
                  )}
                </div>

                <div className="divide-y divide-border/60 max-h-48 overflow-y-auto">
                  {comparisonOffers.map((offer) => (
                    <div
                      key={offer.storeId}
                      className="py-2.5 flex items-center justify-between text-xs"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-foreground text-xs uppercase">
                            {offer.storeName}
                          </span>
                          {offer.isLowestPrice && (
                            <span className="text-[10px] font-bold uppercase bg-primary/20 text-primary px-1.5 py-0.2 rounded">
                              Best price
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {offer.inStock ? "In stock" : "Check store"}
                          {offer.sizes.length > 0 && ` · Sizes: ${offer.sizes.slice(0, 3).join(", ")}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="font-display text-base font-bold text-foreground">
                            ₹{offer.effectivePrice}
                          </span>
                          {!offer.isLowestPrice && offer.priceDiffFromLowest > 0 && (
                            <span className="text-[10px] text-muted-foreground block">
                              +₹{offer.priceDiffFromLowest}
                            </span>
                          )}
                        </div>
                        <a
                          href={offer.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded border border-border hover:border-primary/60 text-muted-foreground hover:text-primary transition-colors"
                          title={`View at ${offer.storeName}`}
                        >
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2.5 pt-2 border-t border-border/60 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <Clock className="size-3 text-muted-foreground" />
                  <span>Prices synced today. Final checkout verified on merchant site.</span>
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Sizes at {product.store.replace(/_/g, " ")}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="text-xs uppercase font-semibold px-2.5 py-1 rounded border border-border bg-card text-foreground"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Tags & Details
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Store Security Note */}
            <div className="space-y-2 py-3 border-y border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                <span>Verified boutique catalog in India</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="size-4 text-primary" />
                <span>Direct delivery via {product.store.replace(/_/g, " ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="size-4 text-primary" />
                <span>Live catalog monitoring across 22+ stores</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-2.5">
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-md bg-primary text-primary-foreground hover:brightness-110 transition-all text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-primary/20"
            >
              <span>View at {product.store.replace(/_/g, " ")}</span>
              <ExternalLink className="size-4" />
            </a>

            <button
              type="button"
              onClick={() => toggleFavorite(product)}
              className="w-full py-3 px-6 rounded-md border border-border bg-secondary hover:bg-secondary/80 transition-colors text-xs font-semibold uppercase tracking-wider text-foreground flex items-center justify-center gap-2"
            >
              <Heart
                className={`size-4 ${
                  favorite ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
              <span>{favorite ? "Saved to Favorites" : "Add to Favorites"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
