import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/data";
import { findMatchingStoreOffers } from "@/lib/comparison";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const all = getAllProducts();
    const target = all.find((p) => p.id === productId);

    if (!target) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const offers = findMatchingStoreOffers(target, all);

    return NextResponse.json({
      targetId: target.id,
      targetName: target.name,
      offers,
      lowestPrice: offers[0]?.effectivePrice ?? target.price,
      storesCount: offers.length,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Comparison API error:", error);
    return NextResponse.json(
      { error: "Failed to generate comparison" },
      { status: 500 }
    );
  }
}
