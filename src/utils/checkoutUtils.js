import { getBasePrice } from "@/hooks/useProductDetail";

export function durationLabel(months) {
  if (months === 12) return "1 Year";
  if (months === 24) return "2 Years";
  if (months === 36) return "3 Years";
  return `${months} Months`;
}

export function resolveDisplayPrice(product, params) {
  if (!product) return null;
  const { subId, variantId, unit, countryId } = params;

  if (product.is_usb) {
    const prices = product.prices ?? [];
    const match = product.is_variant
      ? prices.find((p) => p.variant_id === variantId)
      : prices.find((p) => p.unit === unit);
    return match ?? prices[0] ?? null;
  }

  const priceObj = getBasePrice(product.prices, variantId, countryId);
  const subPricing = priceObj?.subscription_pricing ?? [];

  if (subId && subPricing.length) {
    return subPricing.find((s) => s.subscription_id === subId) ?? subPricing[0];
  }

  return priceObj;
}
