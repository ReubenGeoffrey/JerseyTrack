import React, { Suspense } from "react";
import { getAllProducts, getAllStores, getEditorialCollections } from "@/lib/data";
import { HeroCampaign } from "@/components/HeroCampaign";
import { EditorialSections } from "@/components/EditorialSections";
import { ProductCatalog } from "@/components/ProductCatalog";

export default function HomePage() {
  const products = getAllProducts();
  const stores = getAllStores();
  const collections = getEditorialCollections();

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. Full-Screen Zara-Inspired Campaign Hero */}
      <HeroCampaign />

      {/* 2. Editorial Curated Sequences */}
      <EditorialSections collections={collections} />

      {/* 3. Interactive Full Product Discovery Grid */}
      <Suspense
        fallback={
          <div className="py-24 text-center text-xs tracking-[0.2em] uppercase text-neutral-400">
            LOADING CATALOGUE...
          </div>
        }
      >
        <ProductCatalog
          initialProducts={products}
          stores={stores}
          defaultCategory="all"
          title="THE COMPLETE CATALOGUE"
          subtitle="Compare 6,500+ authentic football shirts and live prices across 22+ verified stockists."
        />
      </Suspense>
    </div>
  );
}
