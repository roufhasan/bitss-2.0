export function buildCheckoutParams(product, activeSub, activeUsbPrice) {
  const params = new URLSearchParams();
  params.set("product_id", product.id);
  params.set("slug", product.slug);

  if (product.is_usb) {
    if (activeUsbPrice?.price_id) {
      params.set("price_id", activeUsbPrice.price_id);
    }
  } else if (activeSub) {
    params.set("sub", activeSub.subscription_id);
  }

  return params.toString();
}
