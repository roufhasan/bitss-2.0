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
 * Returns the price object for a product filtered by variant + country.
 * Includes subscription_pricing[] if present.
 */
export function getBasePrice(prices = [], variantId = null, countryId = null) {
  if (!prices?.length) return null;

  const pool = prices.filter((p) =>
    variantId ? p.variant_id === variantId : p.variant_id === null,
  );

  const match = countryId
    ? (pool.find((p) => String(p.country_id) === String(countryId)) ?? pool[0])
    : pool[0];

  return match ?? null;
}

/**
 * Returns a single subscription pricing entry by subscription_id.
 */
export function getSubscriptionPrice(priceObj, subscriptionId) {
  return (
    priceObj?.subscription_pricing?.find(
      (s) => s.subscription_id === subscriptionId,
    ) ?? null
  );
}
