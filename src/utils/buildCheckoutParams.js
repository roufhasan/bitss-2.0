export function buildCheckoutParams(product, activeSub, activeUsbPrice) {
  const params = new URLSearchParams();
  params.set("product_id", product.id);
  params.set("slug", product.slug);

  if (product.is_usb) {
    if (product.is_variant && activeUsbPrice?.variant_id) {
      params.set("variant", activeUsbPrice.variant_id);
    }
    if (!product.is_variant && activeUsbPrice?.unit) {
      params.set("unit", activeUsbPrice.unit);
    }
  } else if (activeSub) {
    params.set("sub", activeSub.subscription_id);
  }

  return params.toString();
}
