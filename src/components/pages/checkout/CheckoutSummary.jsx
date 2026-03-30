"use client";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { PAYMENT_METHODS } from "@/utils/constants/checkout";
import { durationLabel } from "@/utils/checkoutUtils";

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-700 max-w-[180px] truncate text-right">
        {value}
      </span>
    </div>
  );
}

export default function CheckoutSummary({
  product,
  priceRow,
  subId,
  variantId,
  unit,
  selectedCountry,
  paymentMethod,
  domain,
  displayTotal,
  currencySymbol,
  isSubmitting,
  onSubmit,
  productSlug,
}) {
  return (
    <div className="fu3 sticky top-24">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="p-6">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
            Order Summary
          </p>
          <h3 className="font-['Barlow_Condensed'] text-[19px] font-black text-slate-900 mb-5">
            {product.name}
          </h3>

          <div className="flex flex-col gap-3 pb-4 mb-4 border-b border-slate-100">
            {subId && priceRow?.duration_months && (
              <Row
                label="Duration"
                value={durationLabel(priceRow.duration_months)}
              />
            )}
            {variantId && priceRow?.variant_name && (
              <Row label="Variant" value={priceRow.variant_name} />
            )}
            {unit && !variantId && (
              <Row
                label="Quantity"
                value={`${unit} ${unit === 1 ? "Key" : "Keys"}`}
              />
            )}
            <Row label="Country" value={selectedCountry?.country_name ?? "—"} />
            <Row
              label="Payment"
              value={
                PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label ??
                "—"
              }
            />
            {domain.trim() && <Row label="Domain" value={domain.trim()} />}
            {priceRow?.discount_amount > 0 && (
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-emerald-600">Discount</span>
                <span className="font-semibold text-emerald-600">
                  {priceRow.discount_type === "flat"
                    ? `−${currencySymbol}${priceRow.discount_amount}`
                    : `−${priceRow.discount_amount}%`}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-[13px] font-semibold text-slate-700">
              Total
            </span>
            <span className="font-['Barlow_Condensed'] text-[30px] font-black text-slate-900 leading-none">
              {displayTotal != null
                ? `${currencySymbol}${Number(displayTotal).toFixed(2)}`
                : "—"}
            </span>
          </div>

          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-[14px] transition-all duration-200 shadow-sm shadow-red-200 active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Placing Order…
              </>
            ) : (
              <>
                Place Order <ArrowRight size={14} />
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-slate-400 mt-3">
            Secured · Encrypted · No hidden fees
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link
          href={`/products/${productSlug}`}
          className="inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back to Product
        </Link>
      </div>
    </div>
  );
}
