export type JerseyCategory =
  | "ALL"
  | "PLAYER_VERSION"
  | "FAN_VERSION"
  | "RETRO"
  | "KIT_VERSION"
  | "CLEARANCE"
  | string;

export interface Product {
  id: string;
  store: string;
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
  firstSeenAt?: string;
}

export interface StoreMeta {
  id: string;
  label: string;
  logoUrl: string;
  location: string;
  websiteUrl: string;
  description: string | null;
  hasCatalog: boolean;
  bg?: string;
}

export interface StoreStats {
  avgOverall: number;
  avgShipping: number;
  avgQuality: number;
  avgSupport: number;
  avgValue: number;
  recommendPercent: number;
  reviewCount: number;
}

export interface Store {
  meta: StoreMeta;
  stats: StoreStats;
}

export interface FilterState {
  query: string;
  category: string; // 'all' | 'player' | 'fan' | 'retro' | 'clearance'
  store: string; // 'all' or specific store
  inStockOnly: boolean;
  jerseysOnly: boolean;
  size: string; // 'all' or specific size
  sort: "featured" | "price-asc" | "price-desc" | "discount" | "newest";
}
