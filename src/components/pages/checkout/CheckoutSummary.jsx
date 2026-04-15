"use client";
import Link from "next/link";
import { ArrowRight, Loader2, Truck, MapPin, Phone } from "lucide-react";
import { PAYMENT_METHODS } from "@/utils/constants/checkout";
import { durationLabel } from "@/utils/checkoutUtils";

function Row({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <span
        className={highlight ? "text-blue-600 font-medium" : "text-slate-500"}
      >
        {label}
      </span>
      <span
        className={`font-semibold max-w-[180px] truncate text-right ${highlight ? "text-blue-700" : "text-slate-700"}`}
      >
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
  deliveryAddress,
  deliveryPhone,
  basePrice,
  deliveryCharge,
  displayTotal,
  currencySymbol,
  isSubmitting,
  onSubmit,
  productSlug,
  hideButton,
}) {
  const hasDelivery = deliveryCharge > 0;

  return (
    <div className="fu3 sticky top-24 col-span-12 lg:col-span-5">
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
            {subId && !product?.is_usb && priceRow?.duration && (
              <Row label="Duration" value={durationLabel(priceRow.duration)} />
            )}
            {variantId && priceRow?.variant_name && (
              <Row label="Variant" value={priceRow.variant_name} />
            )}
            {unit && !variantId && (
              <Row
                label="Quantity"
                value={`${unit} ${Number(unit) === 1 ? "Key" : "Keys"}`}
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

            {/* ─── Delivery address rows ──────────────────────────── */}
            {product?.is_delivery_address && deliveryAddress?.trim() && (
              <div className="flex items-start justify-between text-[13px] gap-2">
                <span className="flex items-center gap-1.5 text-slate-500 shrink-0">
                  <MapPin size={11} />
                  Deliver To
                </span>
                <span className="font-semibold text-slate-700 text-right max-w-[180px] line-clamp-2 break-words">
                  {deliveryAddress.trim()}
                </span>
              </div>
            )}
            {product?.is_delivery_address && deliveryPhone?.trim() && (
              <div className="flex items-center justify-between text-[13px] gap-2">
                <span className="flex items-center gap-1.5 text-slate-500 shrink-0">
                  <Phone size={11} />
                  Contact
                </span>
                <span className="font-semibold text-slate-700 text-right max-w-[180px] truncate">
                  {deliveryPhone.trim()}
                </span>
              </div>
            )}
            {/* ─────────────────────────────────────────────────────── */}

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

          {/* Price breakdown — show subtotal + delivery when delivery applies */}
          {hasDelivery ? (
            <div className="flex flex-col gap-2 pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold text-slate-700">
                  {basePrice != null
                    ? `${currencySymbol}${Number(basePrice).toFixed(2)}`
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-1.5 text-blue-600 font-medium">
                  <Truck size={12} />
                  Delivery Charge
                </span>
                <span className="font-semibold text-blue-700">
                  +{currencySymbol}
                  {Number(deliveryCharge).toFixed(2)}
                </span>
              </div>
            </div>
          ) : null}

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

          {!hideButton && (
            <>
              <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-[14px] transition-all duration-200 shadow-sm shadow-red-200 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Placing
                    Order…
                  </>
                ) : (
                  <>
                    {paymentMethod === "stripe"
                      ? "Continue to Payment"
                      : "Place Order"}{" "}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-3">
                Secured · Encrypted · No hidden fees
              </p>
            </>
          )}
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
