export function getCurrencySymbol(currencyIcon) {
  if (!currencyIcon) return "$";
  return new DOMParser().parseFromString(currencyIcon, "text/html").body
    .textContent;
}

export function getProductTypeBadge(product) {
  if (product.is_usb && product.is_variant)
    return {
      label: "USB Variant",
      color: "bg-violet-50 text-violet-600 border-violet-100",
    };
  if (product.is_usb)
    return {
      label: "USB",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    };
  if (product.is_combo)
    return {
      label: "Combo",
      color: "bg-amber-50 text-amber-600 border-amber-100",
    };
  return {
    label: "Single Product",
    color: "bg-sky-50 text-sky-600 border-sky-100",
  };
}

export function getStatusBadge(status) {
  switch (status) {
    case "active":
      return {
        label: "Active",
        color: "bg-emerald-50 text-emerald-600 border-emerald-100",
        dot: "bg-emerald-500",
      };
    case "processing":
      return {
        label: "Processing",
        color: "bg-amber-50 text-amber-600 border-amber-100",
        dot: "bg-amber-500",
      };
    case "expired":
      return {
        label: "Expired",
        color: "bg-red-50 text-red-600 border-red-100",
        dot: "bg-red-500",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        color: "bg-slate-50 text-slate-500 border-slate-200",
        dot: "bg-slate-400",
      };
    default:
      return {
        label: status,
        color: "bg-slate-50 text-slate-500 border-slate-200",
        dot: "bg-slate-400",
      };
  }
}

export function getPaymentMethodLabel(method) {
  return (
    {
      bank_transfer: "Bank Transfer",
      mobile_banking: "Mobile Banking",
      stripe: "Card / Stripe",
    }[method] ?? method
  );
}

export function getPaymentStatusBadge(status) {
  switch (status) {
    case "paid":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "pending":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "failed":
      return "bg-red-50 text-red-600 border-red-100";
    default:
      return "bg-slate-50 text-slate-500 border-slate-200";
  }
}

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
