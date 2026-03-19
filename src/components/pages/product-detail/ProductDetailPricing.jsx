"use client";
import { useState } from "react";
import { CheckCircle2, Zap, ArrowRight, Tag, LogIn } from "lucide-react";
import { calcDiscountedPrice, getBasePrice } from "@/hooks/useProductDetail";
import { useCountry } from "@/context/CountryContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// ── Duration label helper ─────────────────────────────────────────────────────
function durationLabel(months) {
  if (months === 12) return "1 Year";
  if (months === 24) return "2 Years";
  if (months === 36) return "3 Years";
  return `${months} Months`;
}

// ── Savings badge ─────────────────────────────────────────────────────────────
function SavingsBadge({
  discountType,
  discountAmount,
  basePrice,
  currencySymbol,
}) {
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

// ── Variant selector ──────────────────────────────────────────────────────────
function VariantSelector({
  variants,
  prices,
  selectedVariant,
  onSelect,
  currencySymbol,
}) {
  if (!variants?.length) return null;
  return (
    <div className="mb-8">
      <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
        Select Variant
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const priceObj = prices?.find((p) => p.variant_id === v.id);
          const isSelected = selectedVariant === v.id;
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              className={`px-4 py-2 rounded-xl border-2 text-[13px] font-semibold transition-all duration-200
                ${
                  isSelected
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
            >
              {v.name}
              {priceObj?.price != null && (
                <span className="ml-2 text-[11px] font-normal text-slate-400">
                  {currencySymbol}
                  {priceObj.price}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
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

  const [selectedPeriod, setSelectedPeriod] = useState(
    product?.subscription_period?.[0]?.id ?? null,
  );

  function handleGetProtected() {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    // TODO: navigate to checkout or open order flow
    router.push(`/checkout?product=${product.id}`);
  }

  if (!product) return null;

  // For USB products with no subscription_period, show one-time price
  const isOneTime = product.is_usb || !product.subscription_period?.length;
  const priceObj = getBasePrice(
    product.prices,
    selectedVariantId,
    selectedCountry?.id,
  );
  const basePrice = priceObj?.price ?? null;

  const activePeriod =
    product.subscription_period?.find((p) => p.id === selectedPeriod) ??
    product.subscription_period?.[0];

  const countryAdjustedPrice = calcDiscountedPrice(
    basePrice,
    priceObj?.discount_type,
    priceObj?.discount_amount, // note: prices[] uses discount_amount, not amount
  );

  const periodFinalPrice =
    activePeriod && countryAdjustedPrice != null
      ? calcDiscountedPrice(
          countryAdjustedPrice,
          activePeriod.discount_type,
          activePeriod.amount, // subscription_period[] uses amount, not discount_amount
        )
      : countryAdjustedPrice;

  return (
    <section
      id="pricing"
      className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden"
    >
      {/* Sub-grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,.05) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section header */}
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
          {/* LEFT — Period cards */}
          <div>
            {/* Variant selector */}
            {product.is_variant && (
              <VariantSelector
                variants={product.variants}
                prices={product.prices}
                selectedVariant={selectedVariantId}
                onSelect={onVariantChange}
                currencySymbol={currencySymbol}
              />
            )}

            {isOneTime ? (
              /* One-time purchase */
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
                {basePrice != null && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-slate-500">Base Price</span>
                    <span className="font-semibold text-slate-700">
                      {currencySymbol}
                      {countryAdjustedPrice.toFixed(2)} {/* ← was basePrice */}
                    </span>
                  </div>
                )}
                <p className="text-[12px] text-slate-400">
                  one-time · no renewal
                </p>
              </div>
            ) : (
              /* Subscription periods */
              <div className="grid sm:grid-cols-2 gap-4">
                {product.subscription_period.map((period) => {
                  const isSelected = selectedPeriod === period.id;

                  const finalPrice =
                    countryAdjustedPrice != null
                      ? calcDiscountedPrice(
                          countryAdjustedPrice,
                          period.discount_type,
                          period.amount,
                        )
                      : null;

                  const hasPeriodDiscount =
                    period.amount != null && period.discount_type != null;

                  const isPopular = period.status === 1 && period.amount;

                  return (
                    <button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.id)}
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
                            {durationLabel(period.duration)}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                            isSelected
                              ? "border-red-500 bg-red-500"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>

                      {finalPrice != null ? (
                        <div className="flex items-end gap-2 mb-2">
                          <span className="font-['Barlow_Condensed'] text-[34px] font-black text-slate-900 leading-none">
                            {currencySymbol}
                            {finalPrice.toFixed(2)}
                          </span>
                          {/* Only show strikethrough if period has its own discount */}
                          {hasPeriodDiscount &&
                            countryAdjustedPrice != null && (
                              <span className="text-[14px] text-slate-400 line-through mb-1">
                                {currencySymbol}
                                {countryAdjustedPrice.toFixed(2)}
                              </span>
                            )}
                        </div>
                      ) : (
                        <p className="text-[16px] text-slate-500 mb-2">
                          Contact for pricing
                        </p>
                      )}

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] text-slate-400">
                          per license
                        </span>
                        {hasPeriodDiscount && (
                          <SavingsBadge
                            discountType={period.discount_type}
                            discountAmount={period.amount}
                            basePrice={countryAdjustedPrice}
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

          {/* RIGHT — Summary card */}
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
                {activePeriod && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-semibold text-slate-700">
                      {durationLabel(activePeriod.duration)}
                    </span>
                  </div>
                )}
                {basePrice != null && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-slate-500">Base Price</span>
                    <span className="font-semibold text-slate-700">
                      {currencySymbol}
                      {countryAdjustedPrice.toFixed(2)} {/* ← was basePrice */}
                    </span>
                  </div>
                )}
                {/* Show period discount if exists */}
                {activePeriod?.amount != null &&
                  activePeriod?.discount_type && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-emerald-600">
                        Discount (
                        {activePeriod.discount_type === "flat"
                          ? `${currencySymbol}${activePeriod.amount} off`
                          : `${activePeriod.amount}% off`}
                        )
                      </span>
                      <span className="font-semibold text-emerald-600">
                        −{currencySymbol}
                        {(countryAdjustedPrice - periodFinalPrice).toFixed(
                          2,
                        )}{" "}
                        {/* ← was basePrice */}
                      </span>
                    </div>
                  )}
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-[13px] font-semibold text-slate-700">
                  Total
                </span>
                <span className="font-['Barlow_Condensed'] text-[28px] font-black text-slate-900 leading-none">
                  {periodFinalPrice != null
                    ? `${currencySymbol}${periodFinalPrice.toFixed(2)}`
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
