"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { Heart, ArrowUpRight } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { SpiderInsigniaIcon } from "./SpiderIcons";
import { ProductDetailModal } from "./ProductDetailModal";

interface EditorialSectionsProps {
  collections: {
    clubs: Product[];
    archive: Product[];
    international: Product[];
    clearance: Product[];
  };
  onSelectProduct?: (product: Product) => void;
}

export function EditorialSections({
  collections,
  onSelectProduct,
}: EditorialSectionsProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const handleCardClick = (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      setModalProduct(product);
    }
  };

  const renderProductItem = (product: Product, badgeText: string, isSale: boolean = false) => {
    const favorite = isFavorite(product.id);
    const hasDiscount =
      product.discountedPrice !== null &&
      product.discountedPrice < product.price;

    return (
      <article
        key={product.id}
        onClick={() => handleCardClick(product)}
        className="group spider-card flex flex-col cursor-pointer transition-all duration-300 touch-manipulation select-none p-2 sm:p-2.5 rounded-sm"
      >
        <div className="relative shrink-0 overflow-hidden bg-card/80 aspect-square w-full mb-2.5 sm:mb-3 rounded-xs border border-border/50">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Wishlist button - Min 44px touch target */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product);
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-background/85 hover:bg-background border border-border/80 backdrop-blur-md transition-all active:scale-90 absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 touch-manipulation"
            aria-label="Add to favorites"
          >
            <Heart
              className={`size-4 stroke-[1.8] ${
                favorite
                  ? "fill-primary text-primary filter drop-shadow-[0_0_6px_rgba(255,23,68,0.7)]"
                  : "text-muted-foreground hover:text-primary"
              }`}
            />
          </button>

          {isSale && (
            <div className="absolute top-2 left-2 z-10 bg-primary/95 text-white font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-spider-glow flex items-center gap-1">
              <SpiderInsigniaIcon size={10} className="text-white" />
              <span>MARKDOWN</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground font-medium">
            <span className="truncate max-w-[130px]">{product.store.replace(/_/g, " ")}</span>
            <span className={`font-semibold ${isSale ? "text-primary" : "text-foreground"}`}>
              {badgeText}
            </span>
          </div>
          <h3 className="line-clamp-2 text-xs font-normal text-foreground tracking-wide group-hover:text-primary transition-colors leading-snug">
            {product.name}
          </h3>
          <div className="mt-auto flex items-baseline justify-between gap-1.5 pt-1.5 border-t border-border/30">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className={`text-xs sm:text-sm font-bold ${isSale || hasDiscount ? "text-primary" : "text-foreground"}`}>
                ₹{product.discountedPrice ?? product.price}
              </span>
              {hasDiscount && (
                <span className="text-[10px] text-muted-foreground line-through">
                  ₹{product.price}
                </span>
              )}
            </div>
            <span className="text-[9px] uppercase font-mono tracking-wider text-muted-foreground">
              {product.inStock ? "IN STOCK" : "SOLD OUT"}
            </span>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="w-full bg-background text-foreground divide-y divide-border/70 transition-colors duration-200">
      {/* 01 — THE CLUB COLLECTION */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SpiderInsigniaIcon size={12} className="text-primary animate-spiderFloat" />
              <span className="text-[10px] tracking-[0.28em] font-mono text-primary uppercase font-bold block">
                01 · STARK SUIT GRADE · BATTLE ARMOR
              </span>
            </div>
            <h2 className="display-title text-3xl sm:text-5xl font-normal text-foreground tracking-[0.06em]">
              The Club Collection
            </h2>
            <p className="mt-2 text-xs font-serif italic text-muted-foreground">
              &ldquo;Whatever comes our way, whatever battle we have raging inside us, we always have a choice.&rdquo; — Peter Parker
            </p>
          </div>
          <Link
            href="/?category=player#catalog"
            className="text-[11px] font-mono font-medium uppercase tracking-[0.22em] text-foreground hover:text-primary transition-colors flex items-center gap-1.5 w-fit min-h-[44px]"
          >
            <span>Scan All Club Suits</span>
            <ArrowUpRight className="size-3.5 stroke-[2]" />
          </Link>
        </div>

        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {collections.clubs.slice(0, 4).map((product) =>
            renderProductItem(product, product.category?.replace(/_/g, " ") || "PLAYER")
          )}
        </div>
      </section>

      {/* 02 — ARCHIVE / RETRO */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SpiderInsigniaIcon size={12} className="text-primary animate-spiderFloat" />
              <span className="text-[10px] tracking-[0.28em] font-mono text-primary uppercase font-bold block">
                02 · HISTORIC VAULT · CLASSIC 1962 ARCHIVE
              </span>
            </div>
            <h2 className="display-title text-3xl sm:text-5xl font-normal text-foreground tracking-[0.06em]">
              Archive & Retro Classics
            </h2>
            <p className="mt-2 text-xs font-serif italic text-muted-foreground">
              &ldquo;It&apos;s a leap of faith into football history. That&apos;s all it is — a leap of faith.&rdquo; — Peter B. Parker
            </p>
          </div>
          <Link
            href="/?category=retro#catalog"
            className="text-[11px] font-mono font-medium uppercase tracking-[0.22em] text-foreground hover:text-primary transition-colors flex items-center gap-1.5 w-fit min-h-[44px]"
          >
            <span>Explore Vintage Vault</span>
            <ArrowUpRight className="size-3.5 stroke-[2]" />
          </Link>
        </div>

        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {collections.archive.slice(0, 4).map((product) =>
            renderProductItem(product, "RETRO")
          )}
        </div>
      </section>

      {/* 03 — INTERNATIONAL */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SpiderInsigniaIcon size={12} className="text-primary animate-spiderFloat" />
              <span className="text-[10px] tracking-[0.28em] font-mono text-primary uppercase font-bold block">
                03 · SPIDER-VERSE FEDERATIONS · GLOBAL CRESTS
              </span>
            </div>
            <h2 className="display-title text-3xl sm:text-5xl font-normal text-foreground tracking-[0.06em]">
              International Federations
            </h2>
            <p className="mt-2 text-xs font-serif italic text-muted-foreground">
              &ldquo;In every universe, the passion is the same. Across dimensions, one crest.&rdquo; — Miles Morales
            </p>
          </div>
          <Link
            href="/?category=international#catalog"
            className="text-[11px] font-mono font-medium uppercase tracking-[0.22em] text-foreground hover:text-primary transition-colors flex items-center gap-1.5 w-fit min-h-[44px]"
          >
            <span>View All Dimensions</span>
            <ArrowUpRight className="size-3.5 stroke-[2]" />
          </Link>
        </div>

        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {collections.international.slice(0, 4).map((product) =>
            renderProductItem(product, "NATIONAL")
          )}
        </div>
      </section>

      {/* 04 — THE ARCHIVE SALE (Clearance) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SpiderInsigniaIcon size={12} className="text-primary animate-spiderFloat" />
              <span className="text-[10px] tracking-[0.28em] font-mono text-primary uppercase font-bold block">
                04 · SHADOW STEALTH DROPS · SYMBIOTE LOCKER
              </span>
            </div>
            <h2 className="display-title text-3xl sm:text-5xl font-normal text-foreground tracking-[0.06em]">
              Seasonal Clearance
            </h2>
            <p className="mt-2 text-xs font-serif italic text-muted-foreground">
              &ldquo;With great markdowns comes great responsibility to strike before they vanish into the shadows.&rdquo;
            </p>
          </div>
          <Link
            href="/clearance"
            className="text-[11px] font-mono font-medium uppercase tracking-[0.22em] text-primary hover:opacity-80 transition-opacity flex items-center gap-1.5 w-fit min-h-[44px]"
          >
            <span>Sweep Markdowns</span>
            <ArrowUpRight className="size-3.5 stroke-[2]" />
          </Link>
        </div>

        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {collections.clearance.slice(0, 4).map((product) =>
            renderProductItem(product, "MARKDOWN", true)
          )}
        </div>
      </section>

      {/* Modal for detail view if clicked from editorial section */}
      <ProductDetailModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}
