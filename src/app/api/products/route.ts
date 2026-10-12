import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, filterProducts } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "all";
    const store = searchParams.get("store") || "all";
    const inStockOnly = searchParams.get("inStock") === "true";
    const size = searchParams.get("size") || "all";
    const sort = (searchParams.get("sort") || "featured") as any;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "32", 10)));

    const all = getAllProducts();
    const filtered = filterProducts(all, {
      query,
      category,
      store,
      inStockOnly,
      size,
      sort,
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);

    return NextResponse.json({
      items,
      total,
      page,
      limit,
      totalPages,
      hasMore: page < totalPages,
    });
  } catch (error) {
    console.error("API error /api/products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
