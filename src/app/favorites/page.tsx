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
    <div className="pt-24 sm:pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-neutral-400 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>RETURN TO HOMEPAGE</span>
        </Link>

        {/* Page Header */}
        <div className="border-b border-neutral-200 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 block mb-2">
              SAVED PIECES
            </span>
            <h1 className="text-3xl sm:text-5xl font-light tracking-[0.14em] uppercase text-black">
              YOUR WISHLIST
            </h1>
          </div>
          <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">
            <span>{count} {count === 1 ? "PIECE" : "PIECES"} SAVED</span>
          </div>
        </div>

        {/* Content */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-28 text-center max-w-md mx-auto">
            <Heart className="w-8 h-8 stroke-[1] text-neutral-300 mx-auto mb-4" />
            <h3 className="text-base font-light tracking-[0.15em] uppercase text-black mb-2">
              YOUR WISHLIST IS EMPTY
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-8 tracking-wider">
              Explore the football collection, save shirts you love, and track price changes across stores.
            </p>
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-medium tracking-[0.22em] uppercase"
            >
              <span>DISCOVER KITS</span>
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
