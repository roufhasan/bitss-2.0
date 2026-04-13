export function resolveDisplayPrice(product, { subId, variantId, unit }) {
  const subs = product?.subscriptions ?? [];
  if (!subs.length) return null;

  if (subId) {
    const byId = subs.find((s) => s.id === subId);
    if (byId) return byId;
  }

  if (variantId) {
    const byVariant = subs.find((s) => s.variant_id === variantId);
    if (byVariant) return byVariant;
  }

  if (unit != null) {
    const byUnit = subs.find((s) => Number(s.unit) === Number(unit));
    if (byUnit) return byUnit;
  }

  return subs[0];
}

export function durationLabel(months) {
  if (!months) return "One-time";
  if (months === 12) return "1 Year";
  if (months === 24) return "2 Years";
  if (months === 36) return "3 Years";
  return `${months} Months`;
}
