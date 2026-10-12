import fs from "fs";
import path from "path";
import { Product, Store, FilterState } from "@/types";

let cachedProducts: Product[] | null = null;
let cachedStores: Store[] | null = null;
let cachedClearance: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (cachedProducts) return cachedProducts;
  try {
    const filePath = path.join(process.cwd(), "data", "products.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    cachedProducts = JSON.parse(raw);
    return cachedProducts || [];
  } catch (err) {
    console.error("Error reading products.json", err);
    return [];
  }
}

export function getAllStores(): Store[] {
  if (cachedStores) return cachedStores;
  try {
    const filePath = path.join(process.cwd(), "data", "stores.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    cachedStores = JSON.parse(raw);
    return cachedStores || [];
  } catch (err) {
    console.error("Error reading stores.json", err);
    return [];
  }
}

export function getClearanceProducts(): Product[] {
  if (cachedClearance) return cachedClearance;
  try {
    const filePath = path.join(process.cwd(), "data", "clearance_products.json");
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      cachedClearance = JSON.parse(raw);
      return cachedClearance || [];
    }
  } catch (err) {
    console.error("Error reading clearance_products.json", err);
  }
  // Fallback to filtering products with discounts or clearance category
  const all = getAllProducts();
  return all.filter(
    (p) =>
      p.category === "CLEARANCE" ||
      (p.discountedPrice !== null && p.discountedPrice < p.price)
  );
}

export function filterProducts(
  products: Product[],
  filters: Partial<FilterState>
): Product[] {
  let list = [...products];

  // Search query
  if (filters.query && filters.query.trim() !== "") {
    const q = filters.query.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.store.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  // Category
  if (filters.category && filters.category !== "all") {
    const cat = filters.category.toUpperCase();
    if (cat === "PLAYER") {
      list = list.filter((p) => p.category.includes("PLAYER"));
    } else if (cat === "FAN") {
      list = list.filter((p) => p.category.includes("FAN"));
    } else if (cat === "RETRO") {
      list = list.filter(
        (p) =>
          p.category.includes("RETRO") ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes("retro")))
      );
    } else if (cat === "CLEARANCE") {
      list = list.filter(
        (p) =>
          p.category.includes("CLEARANCE") ||
          (p.discountedPrice && p.discountedPrice < p.price)
      );
    } else if (cat === "INTERNATIONAL") {
      list = list.filter(
        (p) =>
          p.tags &&
          p.tags.some((t) =>
            [
              "international",
              "argentina",
              "brazil",
              "france",
              "portugal",
              "germany",
              "england",
              "italy",
              "spain",
              "japan",
            ].some((country) => t.toLowerCase().includes(country))
          )
      );
    }
  }

  // Store
  if (filters.store && filters.store !== "all") {
    list = list.filter(
      (p) => p.store.toUpperCase() === filters.store?.toUpperCase()
    );
  }

  // In Stock only
  if (filters.inStockOnly) {
    list = list.filter((p) => p.inStock);
  }

  // Size
  if (filters.size && filters.size !== "all") {
    list = list.filter(
      (p) =>
        p.sizes &&
        p.sizes.some(
          (s) => s.toUpperCase() === filters.size?.toUpperCase()
        )
    );
  }

  // Sorting
  switch (filters.sort) {
    case "price-asc":
      list.sort((a, b) => {
        const pA = a.discountedPrice ?? a.price;
        const pB = b.discountedPrice ?? b.price;
        return pA - pB;
      });
      break;
    case "price-desc":
      list.sort((a, b) => {
        const pA = a.discountedPrice ?? a.price;
        const pB = b.discountedPrice ?? b.price;
        return pB - pA;
      });
      break;
    case "discount":
      list.sort((a, b) => {
        const discA = a.discountedPrice ? a.price - a.discountedPrice : 0;
        const discB = b.discountedPrice ? b.price - b.discountedPrice : 0;
        return discB - discA;
      });
      break;
    case "newest":
      list.sort((a, b) => {
        const tA = a.firstSeenAt ? new Date(a.firstSeenAt).getTime() : 0;
        const tB = b.firstSeenAt ? new Date(b.firstSeenAt).getTime() : 0;
        return tB - tA;
      });
      break;
    case "featured":
    default:
      // Keep curated order
      break;
  }

  return list;
}

export function getEditorialCollections() {
  const all = getAllProducts();

  // 01 The Club Collection: Real high-demand club jerseys (Real Madrid, Barca, Arsenal, Bayern, etc.)
  const clubs = all.filter(
    (p) =>
      p.inStock &&
      p.imageUrl &&
      (p.name.includes("Madrid") ||
        p.name.includes("Barcelona") ||
        p.name.includes("Arsenal") ||
        p.name.includes("Manchester") ||
        p.name.includes("Bayern") ||
        p.name.includes("Milan") ||
        p.name.includes("Liverpool"))
  ).slice(0, 8);

  // 02 Archive / Retro: Real iconic retro shirts
  const archive = all.filter(
    (p) =>
      p.imageUrl &&
      (p.category.includes("RETRO") ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes("retro"))))
  ).slice(0, 8);

  // 03 International: Real national team shirts (Argentina, Brazil, Portugal, France, etc.)
  const international = all.filter(
    (p) =>
      p.imageUrl &&
      p.tags &&
      p.tags.some((t) =>
        [
          "argentina",
          "brazil",
          "france",
          "portugal",
          "germany",
          "england",
          "italy",
          "japan",
        ].some((c) => t.toLowerCase().includes(c))
      )
  ).slice(0, 8);

  // 04 The Last Chance: Clearance items with big verified discounts
  const clearance = getClearanceProducts().slice(0, 8);

  return { clubs, archive, international, clearance };
}
