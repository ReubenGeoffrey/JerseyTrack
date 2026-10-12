"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { Product } from "@/types";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import { SpiderInsigniaIcon } from "@/components/SpiderIcons";

export default function FavoritesPage() {
  const { favorites, count } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-background text-foreground min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-muted-foreground hover:text-primary mb-8 transition-colors font-medium min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.8]" />
          <span>Return to Collection</span>
        </Link>

        {/* Page Header */}
        <div className="border-b border-border pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SpiderInsigniaIcon size={14} className="text-primary animate-spiderFloat" />
              <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-primary font-bold block">
                SAVED PIECES · SYMBIOTE LOCKER
              </span>
            </div>
            <h1 className="display-title text-4xl sm:text-6xl font-normal tracking-[0.06em] uppercase text-foreground">
              YOUR WISHLIST
            </h1>
          </div>
          <div className="text-[11px] tracking-[0.2em] uppercase font-mono text-muted-foreground font-medium">
            <span>{count} {count === 1 ? "shirt" : "shirts"} saved</span>
          </div>
        </div>

        {/* Content */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
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
            <Heart className="w-10 h-10 stroke-[1.5] text-primary/40 mx-auto mb-4 animate-spiderPulse" />
            <h3 className="display-title text-2xl font-normal uppercase text-foreground mb-2 tracking-[0.06em]">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-8 tracking-wide font-light">
              Explore the football collection, save shirts you love, and track price changes across 22+ stores.
            </p>
            <Link
              href="/#catalog"
              className="btn-spider-primary"
            >
              <SpiderInsigniaIcon size={16} className="text-white" />
              <span>Explore Collection</span>
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
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
