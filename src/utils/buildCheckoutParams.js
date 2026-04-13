export function buildCheckoutParams(product, activeSub, activeUsbPrice) {
  const p = new URLSearchParams();

  p.set("slug", product.slug);
  p.set("product_id", product.id);

  if (product.is_usb) {
    if (activeUsbPrice?.id != null) p.set("sub", activeUsbPrice.id);
    if (activeUsbPrice?.unit != null) p.set("unit", activeUsbPrice.unit);
    if (product.is_variant && activeUsbPrice?.variant_id != null) {
      p.set("variant", activeUsbPrice.variant_id);
    }
  } else {
    if (activeSub?.id != null) p.set("sub", activeSub.id);
    if (activeSub?.variant_id != null) p.set("variant", activeSub.variant_id);
  }

  return p.toString();
}
