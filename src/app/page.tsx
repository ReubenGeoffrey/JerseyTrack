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
    <div className="w-full flex flex-col bg-white text-black">
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
          title="The Complete Collection"
          subtitle="Discover 6,500+ authentic football shirts and compare live prices across 22+ boutiques."
        />
      </Suspense>
    </div>
  );
}
