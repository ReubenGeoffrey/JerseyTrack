import { NextRequest, NextResponse } from "next/server";
import { getAllStores } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get("q") || "").toLowerCase().trim();
    const sort = searchParams.get("sort") || "recommend";

    let stores = [...getAllStores()];

    if (query) {
      stores = stores.filter(
        (s) =>
          s.meta.label.toLowerCase().includes(query) ||
          s.meta.location?.toLowerCase().includes(query)
      );
    }

    if (sort === "rating") {
      stores.sort(
        (a, b) => (b.stats.avgOverall ?? 0) - (a.stats.avgOverall ?? 0)
      );
    } else if (sort === "recommend") {
      stores.sort(
        (a, b) =>
          b.stats.recommendPercent - a.stats.recommendPercent ||
          b.stats.reviewCount - a.stats.reviewCount
      );
    } else if (sort === "reviews") {
      stores.sort((a, b) => b.stats.reviewCount - a.stats.reviewCount);
    } else if (sort === "name") {
      stores.sort((a, b) => a.meta.label.localeCompare(b.meta.label));
    }

    return NextResponse.json({ stores });
  } catch (error) {
    console.error("API error /api/stores:", error);
    return NextResponse.json(
      { error: "Failed to fetch stores" },
      { status: 500 }
    );
  }
}
