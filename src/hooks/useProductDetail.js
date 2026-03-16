"use client";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchProduct(productId, countryId = 1) {
  const res = await fetch(
    `${BASE_URL}/products/${productId}?country_id=${countryId}`,
  );
  if (!res.ok) throw new Error("Failed to fetch product");
  const json = await res.json();
  return json.data;
}

export function useProductDetail(productId, countryId = 1) {
  return useQuery({
    queryKey: ["product-detail", productId, countryId],
    queryFn: () => fetchProduct(productId, countryId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });
}

// ── Price helpers ──────────────────────────────────────────────────────────────

/**
 * Returns the base price for a product (optionally filtered by variant_id).
 */
export function getBasePrice(prices, variantId = null) {
  if (!prices?.length) return null;
  const match = variantId
    ? prices.find((p) => p.variant_id === variantId)
    : prices[0];
  return match ?? prices[0];
}

/**
 * Calculates the final price after discount.
 * discount_type: "percentage" | "percent" | "flat"
 */
export function calcDiscountedPrice(basePrice, discountType, discountAmount) {
  if (!discountAmount || !discountType) return basePrice;
  const type = discountType.toLowerCase();
  if (type === "percentage" || type === "percent") {
    return basePrice - (basePrice * discountAmount) / 100;
  }
  if (type === "flat") {
    return basePrice - discountAmount;
  }
  return basePrice;
}
