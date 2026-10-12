import { NormalizedProduct } from "./types";
import { parseEdition, extractTeam, extractSeason } from "./normalizer";

export interface ShopifyProductRaw {
  id: number | string;
  title: string;
  handle: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  tags?: string[] | string;
  variants?: Array<{
    id: number | string;
    title: string;
    price: string;
    compare_at_price?: string | null;
    available?: boolean;
    option1?: string;
    option2?: string;
  }>;
  images?: Array<{
    id?: number | string;
    src: string;
  }>;
}

export function parseShopifyProducts(
  rawProducts: ShopifyProductRaw[],
  storeId: string,
  storeLabel: string,
  storeBaseUrl: string
): NormalizedProduct[] {
  const result: NormalizedProduct[] = [];

  for (const item of rawProducts) {
    if (!item.title || !item.images || item.images.length === 0) continue;

    const tagsArray = Array.isArray(item.tags)
      ? item.tags
      : typeof item.tags === "string"
      ? item.tags.split(",").map((t) => t.trim())
      : [];

    // Filter out obvious non-jersey accessories if needed, or keep all
    const titleLower = item.title.toLowerCase();
    const isJerseyOrApparel =
      titleLower.includes("kit") ||
      titleLower.includes("jersey") ||
      titleLower.includes("shirt") ||
      titleLower.includes("retro") ||
      titleLower.includes("edition") ||
      titleLower.includes("player") ||
      titleLower.includes("fan") ||
      titleLower.includes("jacket");

    if (!isJerseyOrApparel && tagsArray.length > 0 && !tagsArray.some(t => t.toLowerCase().includes("jersey"))) {
      // Still include if from specialized jersey shop
    }

    const firstVariant = item.variants?.[0];
    const price = firstVariant?.price ? Math.round(parseFloat(firstVariant.price)) : 999;
    const comparePrice = firstVariant?.compare_at_price
      ? Math.round(parseFloat(firstVariant.compare_at_price))
      : null;

    const sizes: string[] = [];
    let inStock = false;

    if (item.variants) {
      for (const v of item.variants) {
        if (v.available) {
          inStock = true;
          const sizeName = v.option1 || v.title;
          if (sizeName && !sizeName.toLowerCase().includes("default")) {
            sizes.push(sizeName.trim());
          }
        }
      }
    }

    const category = parseEdition(item.title, tagsArray);
    const team = extractTeam(item.title);
    const season = extractSeason(item.title);

    const productUrl = `${storeBaseUrl.replace(/\/$/, "")}/products/${item.handle}?utm_source=kitscout&utm_medium=referral`;

    result.push({
      id: `${storeId.toLowerCase()}_${item.id}`,
      store: storeLabel,
      storeId,
      name: item.title,
      category,
      price: comparePrice && comparePrice > price ? comparePrice : price,
      discountedPrice: comparePrice && comparePrice > price ? price : null,
      currency: "INR",
      inStock,
      imageUrl: item.images[0].src,
      productUrl,
      tags: tagsArray,
      sizes: Array.from(new Set(sizes)),
      team,
      season,
      firstSeenAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    });
  }

  return result;
}
