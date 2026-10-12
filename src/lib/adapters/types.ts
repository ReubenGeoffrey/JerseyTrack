export type IntegrationType =
  | "shopify"
  | "woocommerce"
  | "custom_feed"
  | "manual";

export type IntegrationStatus =
  | "ACTIVE"
  | "TEMPORARILY_UNAVAILABLE"
  | "MANUAL_FEED_REQUIRED";

export interface StoreIntegrationConfig {
  id: string;
  label: string;
  websiteUrl: string;
  location: string;
  type: IntegrationType;
  feedUrl?: string;
  hasCatalog: boolean;
  status: IntegrationStatus;
  lastSyncedAt: string;
  productCount: number;
  reliabilityScore: number; // 0 to 10
  description: string;
  notes?: string;
}

export interface NormalizedProduct {
  id: string;
  store: string;
  storeId: string;
  name: string;
  category: string;
  price: number;
  discountedPrice: number | null;
  currency: string;
  inStock: boolean;
  imageUrl: string;
  productUrl: string;
  tags: string[];
  sizes: string[];
  edition?: string;
  season?: string;
  team?: string;
  firstSeenAt?: string;
  lastUpdatedAt?: string;
}

export interface StoreComparisonOffer {
  storeId: string;
  storeName: string;
  price: number;
  discountedPrice: number | null;
  effectivePrice: number;
  inStock: boolean;
  sizes: string[];
  productUrl: string;
  imageUrl: string;
  edition?: string;
  isLowestPrice: boolean;
  priceDiffFromLowest: number;
}

export interface ProductComparisonGroup {
  key: string;
  canonicalTitle: string;
  team: string;
  season?: string;
  edition?: string;
  offers: StoreComparisonOffer[];
  lowestPrice: number;
  highestPrice: number;
  storesCount: number;
}
