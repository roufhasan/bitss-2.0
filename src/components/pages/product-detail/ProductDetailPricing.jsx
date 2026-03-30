"use client";
import { useState } from "react";
import { Zap, ArrowRight, Tag, LogIn } from "lucide-react";
import { getBasePrice } from "@/hooks/useProductDetail";
import { useCountry } from "@/context/CountryContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { buildCheckoutParams } from "@/utils/buildCheckoutParams";

// ── Duration label ────────────────────────────────────────────────────────────
function durationLabel(months) {
  if (months === 12) return "1 Year";
  if (months === 24) return "2 Years";
  if (months === 36) return "3 Years";
  return `${months} Months`;
}

// ── Savings badge ─────────────────────────────────────────────────────────────
function SavingsBadge({ discountType, discountAmount, currencySymbol }) {
  if (!discountAmount) return null;
  const type = discountType?.toLowerCase();
  if (type === "percentage" || type === "percent") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
        <Tag size={9} /> Save {discountAmount}%
      </span>
    );
  }
  if (type === "flat") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
        <Tag size={9} /> Save {currencySymbol}
        {discountAmount}
      </span>
    );
  }
  return null;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProductDetailPricing({
  product,
  selectedVariantId,
  onVariantChange,
}) {
  const { selectedCountry } = useCountry();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const currencySymbol = selectedCountry?.currency_icon
    ? new DOMParser().parseFromString(
        selectedCountry.currency_icon,
        "text/html",
      ).body.textContent
    : "$";

  // ─────────────────────────────────────────────────────────────────────────
  // Determine product type
  // Case A: USB with variant   → is_usb=true,  is_variant=true  → key by variant_id
  // Case B: USB no variant     → is_usb=true,  is_variant=false → key by unit
  // Case C: Subscription       → is_usb=false, subscription_pricing.length > 0
  // Case D: One-time           → is_usb=false, subscription_pricing.length === 0
  // ─────────────────────────────────────────────────────────────────────────

  const allUsbPrices = product?.is_usb ? (product?.prices ?? []) : [];

  // USB: key by variant_id if variant, else by unit
  const usbKey = product?.is_variant ? "variant_id" : "unit";
  const [selectedUsbKey, setSelectedUsbKey] = useState(
    allUsbPrices[0]?.[usbKey] ?? null,
  );
  const activeUsbPrice =
    allUsbPrices.find((p) => String(p[usbKey]) === String(selectedUsbKey)) ??
    allUsbPrices[0] ??
    null;
  const usbHasDiscount =
    activeUsbPrice?.discount_type && activeUsbPrice?.discount_amount > 0;

  // Subscription / one-time: use first matching country price
  const priceObj = getBasePrice(
    product?.prices,
    selectedVariantId,
    selectedCountry?.id,
  );
  const originalPrice = priceObj?.original_price ?? null;
  const displayPrice = priceObj?.price_after_discount ?? originalPrice;
  const hasCountryDiscount =
    priceObj?.discount_type && priceObj?.discount_amount > 0;
  const subscriptionPricing = priceObj?.subscription_pricing ?? [];
  const isOneTime = !product?.is_usb && !subscriptionPricing.length;

  const [selectedSubId, setSelectedSubId] = useState(
    subscriptionPricing[0]?.subscription_id ?? null,
  );

  const activeSub =
    subscriptionPricing.find((s) => s.subscription_id === selectedSubId) ??
    subscriptionPricing[0] ??
    null;
  const periodFinalPrice = activeSub?.final_price ?? displayPrice;
  const periodBeforeDiscount = activeSub?.total_before_sub_discount ?? null;
  const hasPeriodDiscount =
    activeSub?.discount_type && activeSub?.discount_amount > 0;

  // Summary total — pick the right value based on product type
  const summaryTotal = product?.is_usb
    ? activeUsbPrice?.price_after_discount
    : periodFinalPrice;

  const handleGetProtected = () => {
    const checkoutUrl = `/checkout?${buildCheckoutParams(product, activeSub, activeUsbPrice)}`;

    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(checkoutUrl)}`);
      return;
    }

    router.push(checkoutUrl);
  };

  if (!product) return null;

  return (
    <section
      id="pricing"
      className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,.05) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Pricing & Plans
          </span>
          <h2
            className="font-['Barlow_Condensed'] font-black text-slate-900 leading-none"
            style={{ fontSize: "clamp(28px,4vw,48px)" }}
          >
            CHOOSE YOUR <span className="text-red-600">PLAN</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* LEFT */}
          <div>
            {product.is_usb ? (
              /* ── CASE A & B: USB (variant or unit) ── */
              <div className="grid sm:grid-cols-2 gap-4">
                {allUsbPrices.map((p) => {
                  const isSelected =
                    String(p[usbKey]) === String(selectedUsbKey);
                  const hasDisco = p.discount_type && p.discount_amount > 0;
                  const cardLabel = product.is_variant
                    ? p.variant_name
                    : `${p.unit} ${p.unit === 1 ? "Key" : "Keys"}`;
                  const cardSubLabel = product.is_variant
                    ? "Variant"
                    : "Quantity";

                  return (
                    <button
                      key={p[usbKey]}
                      onClick={() => setSelectedUsbKey(p[usbKey])}
                      className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-200 w-full
                        ${
                          isSelected
                            ? "border-red-500 bg-white shadow-xl shadow-red-100/60"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                        }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                            {cardSubLabel}
                          </p>
                          <p className="font-['Barlow_Condensed'] text-[22px] font-black text-slate-900 leading-tight mt-0.5">
                            {cardLabel}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors
                          ${isSelected ? "border-red-500 bg-red-500" : "border-slate-300"}`}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-end gap-2 mb-2">
                        <span className="font-['Barlow_Condensed'] text-[34px] font-black text-slate-900 leading-none">
                          {currencySymbol}
                          {Number(p.price_after_discount).toFixed(2)}
                        </span>
                        {hasDisco && (
                          <span className="text-[14px] text-slate-400 line-through mb-1">
                            {currencySymbol}
                            {Number(p.original_price).toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] text-slate-400">
                          one-time · no renewal
                        </span>
                        {hasDisco && (
                          <SavingsBadge
                            discountType={p.discount_type}
                            discountAmount={p.discount_amount}
                            currencySymbol={currencySymbol}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : isOneTime ? (
              /* ── CASE D: One-time (non-USB, no subscription) ── */
              <div className="bg-white rounded-2xl border-2 border-red-500 shadow-xl shadow-red-100/40 p-7">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                      One-time Purchase
                    </p>
                    <h3 className="font-['Barlow_Condensed'] text-[28px] font-black text-slate-900 mt-0.5">
                      Lifetime License
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                    <Zap size={22} className="text-red-500" />
                  </div>
                </div>
                {displayPrice != null && (
                  <div className="flex items-end gap-2 mb-2">
                    <span className="font-['Barlow_Condensed'] text-[40px] font-black text-slate-900 leading-none">
                      {currencySymbol}
                      {Number(displayPrice).toFixed(2)}
                    </span>
                    {hasCountryDiscount && originalPrice != null && (
                      <span className="text-[15px] text-slate-400 line-through mb-1">
                        {currencySymbol}
                        {Number(originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[12px] text-slate-400">
                    one-time · no renewal
                  </p>
                  {hasCountryDiscount && (
                    <SavingsBadge
                      discountType={priceObj.discount_type}
                      discountAmount={priceObj.discount_amount}
                      currencySymbol={currencySymbol}
                    />
                  )}
                </div>
              </div>
            ) : (
              /* ── CASE C: Subscription ── */
              <div className="grid sm:grid-cols-2 gap-4">
                {subscriptionPricing.map((sub) => {
                  const isSelected = selectedSubId === sub.subscription_id;
                  const hasDisco = sub.discount_type && sub.discount_amount > 0;
                  const isPopular = hasDisco;

                  return (
                    <button
                      key={sub.subscription_id}
                      onClick={() => setSelectedSubId(sub.subscription_id)}
                      className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-200 w-full
                        ${
                          isSelected
                            ? "border-red-500 bg-white shadow-xl shadow-red-100/60"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                        }`}
                    >
                      {isPopular && (
                        <div className="absolute -top-3 left-4 bg-red-600 text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                          ★ Best Value
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                            Duration
                          </p>
                          <p className="font-['Barlow_Condensed'] text-[22px] font-black text-slate-900 leading-tight mt-0.5">
                            {durationLabel(sub.duration_months)}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors
                          ${isSelected ? "border-red-500 bg-red-500" : "border-slate-300"}`}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-end gap-2 mb-2">
                        <span className="font-['Barlow_Condensed'] text-[34px] font-black text-slate-900 leading-none">
                          {currencySymbol}
                          {Number(sub.final_price).toFixed(2)}
                        </span>
                        {hasDisco && sub.total_before_sub_discount != null && (
                          <span className="text-[14px] text-slate-400 line-through mb-1">
                            {currencySymbol}
                            {Number(sub.total_before_sub_discount).toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] text-slate-400">
                          per license
                        </span>
                        {hasDisco && (
                          <SavingsBadge
                            discountType={sub.discount_type}
                            discountAmount={sub.discount_amount}
                            currencySymbol={currencySymbol}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT — Order summary */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden sticky top-24">
            <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
            <div className="p-6">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Order Summary
              </p>
              <h3 className="font-['Barlow_Condensed'] text-[20px] font-black text-slate-900 mb-5">
                {product.name}
              </h3>

              <div className="flex flex-col gap-3 pb-4 mb-4 border-b border-slate-100">
                {/* USB: variant or quantity row */}
                {product.is_usb && activeUsbPrice && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-slate-500">
                      {product.is_variant ? "Variant" : "Quantity"}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {product.is_variant
                        ? activeUsbPrice.variant_name
                        : `${activeUsbPrice.unit} ${activeUsbPrice.unit === 1 ? "Key" : "Keys"}`}
                    </span>
                  </div>
                )}

                {/* USB: discount row */}
                {product.is_usb && usbHasDiscount && activeUsbPrice && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-emerald-600">
                      Discount (
                      {activeUsbPrice.discount_type === "flat"
                        ? `${currencySymbol}${activeUsbPrice.discount_amount} off`
                        : `${activeUsbPrice.discount_amount}% off`}
                      )
                    </span>
                    <span className="font-semibold text-emerald-600">
                      −{currencySymbol}
                      {(
                        activeUsbPrice.original_price -
                        activeUsbPrice.price_after_discount
                      ).toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Subscription: duration row */}
                {!product.is_usb && activeSub && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-semibold text-slate-700">
                      {durationLabel(activeSub.duration_months)}
                    </span>
                  </div>
                )}

                {/* Subscription: base price row */}
                {!product.is_usb && periodBeforeDiscount != null && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-slate-500">Base Price</span>
                    <span className="font-semibold text-slate-700">
                      {currencySymbol}
                      {Number(periodBeforeDiscount).toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Subscription: discount row */}
                {!product.is_usb &&
                  hasPeriodDiscount &&
                  periodBeforeDiscount != null && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-emerald-600">
                        Discount (
                        {activeSub.discount_type === "flat"
                          ? `${currencySymbol}${activeSub.discount_amount} off`
                          : `${activeSub.discount_amount}% off`}
                        )
                      </span>
                      <span className="font-semibold text-emerald-600">
                        −{currencySymbol}
                        {(periodBeforeDiscount - periodFinalPrice).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[13px] font-semibold text-slate-700">
                  Total
                </span>
                <span className="font-['Barlow_Condensed'] text-[28px] font-black text-slate-900 leading-none">
                  {summaryTotal != null
                    ? `${currencySymbol}${Number(summaryTotal).toFixed(2)}`
                    : "—"}
                </span>
              </div>

              <button
                onClick={handleGetProtected}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold text-[14px] transition-all duration-200"
              >
                {isAuthenticated ? (
                  <>
                    {" "}
                    Get Protected <ArrowRight size={14} />{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    Sign in to Continue <LogIn size={14} />{" "}
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-3">
                Contact us for custom enterprise pricing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
