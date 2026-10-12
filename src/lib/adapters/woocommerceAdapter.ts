import { NormalizedProduct } from "./types";
import { parseEdition, extractTeam, extractSeason } from "./normalizer";

export interface WooProductRaw {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  short_description?: string;
  description?: string;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_code: string;
    currency_minor_unit: number;
  };
  images: Array<{
    id: number;
    src: string;
    thumbnail?: string;
  }>;
  is_in_stock: boolean;
  tags?: Array<{ id: number; name: string }>;
  categories?: Array<{ id: number; name: string }>;
  attributes?: Array<{
    id: number;
    name: string;
    terms?: Array<{ id: number; name: string }>;
  }>;
}

export function parseWooCommerceProducts(
  rawProducts: WooProductRaw[],
  storeId: string,
  storeLabel: string
): NormalizedProduct[] {
  const result: NormalizedProduct[] = [];

  for (const item of rawProducts) {
    if (!item.name || !item.images || item.images.length === 0) continue;

    const minorUnit = item.prices.currency_minor_unit ?? 2;
    const factor = Math.pow(10, minorUnit);

    const priceRaw = parseFloat(item.prices.price) / factor;
    const regularPriceRaw = parseFloat(item.prices.regular_price) / factor;
    const salePriceRaw = parseFloat(item.prices.sale_price) / factor;

    const hasDiscount = salePriceRaw > 0 && regularPriceRaw > salePriceRaw;
    const price = Math.round(hasDiscount ? regularPriceRaw : priceRaw);
    const discountedPrice = hasDiscount ? Math.round(salePriceRaw) : null;

    const tags: string[] = [];
    if (item.tags) {
      item.tags.forEach((t) => tags.push(t.name));
    }
    if (item.categories) {
      item.categories.forEach((c) => tags.push(c.name));
    }

    const sizes: string[] = [];
    if (item.attributes) {
      const sizeAttr = item.attributes.find((a) =>
        a.name.toLowerCase().includes("size")
      );
      if (sizeAttr && sizeAttr.terms) {
        sizeAttr.terms.forEach((t) => sizes.push(t.name));
      }
    }

    const category = parseEdition(item.name, tags);
    const team = extractTeam(item.name);
    const season = extractSeason(item.name);

    const productUrl = `${item.permalink}${item.permalink.includes("?") ? "&" : "?"}utm_source=kitscout&utm_medium=referral`;

    result.push({
      id: `${storeId.toLowerCase()}_${item.id}`,
      store: storeLabel,
      storeId,
      name: item.name,
      category,
      price,
      discountedPrice,
      currency: "INR",
      inStock: item.is_in_stock,
      imageUrl: item.images[0].src,
      productUrl,
      tags,
      sizes: Array.from(new Set(sizes)),
      team,
      season,
      firstSeenAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    });
  }

  return result;
}
