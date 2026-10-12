"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { Product } from "@/types";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, count } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-background text-foreground min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-muted-foreground hover:text-primary mb-8 transition-colors font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Browse</span>
        </Link>

        {/* Page Header */}
        <div className="border-b border-border pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs tracking-wider uppercase text-primary font-semibold block mb-2">
              Saved Wishlist
            </span>
            <h1 className="display-title text-4xl sm:text-6xl font-black tracking-tight uppercase text-foreground">
              YOUR SAVED KITS
            </h1>
          </div>
          <div className="text-xs tracking-wider uppercase text-muted-foreground font-semibold">
            <span>{count} {count === 1 ? "shirt" : "shirts"} saved</span>
          </div>
        </div>

        {/* Content */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center max-w-md mx-auto">
            <Heart className="w-10 h-10 stroke-[1.5] text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="display-title text-2xl font-bold uppercase text-foreground mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Explore the football collection, save shirts you love, and compare prices across 22+ stores.
            </p>
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground hover:brightness-110 transition-all text-xs font-bold tracking-wider uppercase rounded-md shadow-lg"
            >
              <span>Discover Kits</span>
              <ShoppingBag className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  );
}
