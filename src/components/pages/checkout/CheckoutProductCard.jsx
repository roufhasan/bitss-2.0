import { durationLabel } from "@/utils/checkoutUtils";
import { Package } from "lucide-react";

export default function CheckoutProductCard({
  product,
  subId,
  variantId,
  unit,
  priceRow,
}) {
  return (
    <div className="fu2 flex items-center gap-4 bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-4">
      <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
        <Package size={20} className="text-red-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
          Product
        </p>
        <p className="font-['Barlow_Condensed'] text-[18px] font-black text-slate-900 leading-tight truncate">
          {product.name}
        </p>
      </div>
      {subId && (
        <span className="ml-auto shrink-0 text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-100 px-2 py-1 rounded-lg">
          {durationLabel(priceRow?.duration_months)}
        </span>
      )}
      {variantId && (
        <span className="ml-auto shrink-0 text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-1 rounded-lg">
          {priceRow?.variant_name ?? `Variant #${variantId}`}
        </span>
      )}
      {unit && !variantId && (
        <span className="ml-auto shrink-0 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg">
          {unit} {unit === 1 ? "Key" : "Keys"}
        </span>
      )}
    </div>
  );
}
