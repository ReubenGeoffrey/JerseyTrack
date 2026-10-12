import { Product } from "@/types";
import { extractTeam, extractSeason, parseEdition } from "./adapters/normalizer";
import { StoreComparisonOffer } from "./adapters/types";

export function findMatchingStoreOffers(
  target: Product,
  allProducts: Product[]
): StoreComparisonOffer[] {
  const targetTeam = extractTeam(target.name).toLowerCase();
  const targetSeason = extractSeason(target.name);
  const targetEdition = parseEdition(target.name, target.tags);
  const targetNameLower = target.name.toLowerCase();

  // Determine kit type: home, away, third, retro
  const isHome = targetNameLower.includes("home");
  const isAway = targetNameLower.includes("away");
  const isThird = targetNameLower.includes("third");

  // Filter candidates from other stores
  const candidates = allProducts.filter((p) => {
    // Avoid duplicate from exact same store & id
    if (p.id === target.id) return false;

    const pTeam = extractTeam(p.name).toLowerCase();
    if (pTeam !== targetTeam || targetTeam === "club / international") {
      return false;
    }

    const pNameLower = p.name.toLowerCase();

    // Match kit type
    if (isHome && !pNameLower.includes("home")) return false;
    if (isAway && !pNameLower.includes("away")) return false;
    if (isThird && !pNameLower.includes("third")) return false;

    // Match edition (player vs fan vs retro)
    const pEdition = parseEdition(p.name, p.tags);
    if (targetEdition === "PLAYER_VERSION" && pEdition !== "PLAYER_VERSION") {
      return false;
    }
    if (targetEdition === "RETRO" && pEdition !== "RETRO") {
      return false;
    }

    // Match season if available
    if (targetSeason) {
      const pSeason = extractSeason(p.name);
      if (pSeason && pSeason !== targetSeason) return false;
    }

    return true;
  });

  // Group by store and pick best price per store
  const storeMap = new Map<string, Product>();
  
  // Include target product first
  storeMap.set(target.store, target);

  for (const c of candidates) {
    const existing = storeMap.get(c.store);
    const cPrice = c.discountedPrice ?? c.price;
    if (!existing) {
      storeMap.set(c.store, c);
    } else {
      const existingPrice = existing.discountedPrice ?? existing.price;
      if (cPrice < existingPrice) {
        storeMap.set(c.store, c);
      }
    }
  }

  // Convert to StoreComparisonOffer
  const offersList = Array.from(storeMap.values()).map((p) => {
    const effectivePrice = p.discountedPrice ?? p.price;
    return {
      storeId: p.store,
      storeName: p.store.replace(/_/g, " "),
      price: p.price,
      discountedPrice: p.discountedPrice,
      effectivePrice,
      inStock: p.inStock,
      sizes: p.sizes || [],
      productUrl: p.productUrl,
      imageUrl: p.imageUrl,
      edition: p.category.replace("_", " "),
      isLowestPrice: false,
      priceDiffFromLowest: 0,
    };
  });

  // Sort by effective price ascending
  offersList.sort((a, b) => a.effectivePrice - b.effectivePrice);

  if (offersList.length > 0) {
    const lowest = offersList[0].effectivePrice;
    offersList.forEach((offer) => {
      offer.isLowestPrice = offer.effectivePrice === lowest;
      offer.priceDiffFromLowest = offer.effectivePrice - lowest;
    });
  }

  return offersList;
}
