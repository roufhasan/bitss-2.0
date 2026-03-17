"use client";
import {
  ShieldCheck,
  Package,
  Layers,
  Usb,
  Tag,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { getBasePrice } from "@/hooks/useProductDetail";
import { useCountry } from "@/context/CountryContext";
import Link from "next/link";

// ── Badge helpers ─────────────────────────────────────────────────────────────
function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-slate-100 text-slate-600 border-slate-200",
    combo: "bg-violet-50 text-violet-700 border-violet-200",
    usb: "bg-emerald-50 text-emerald-700 border-emerald-200",
    variant: "bg-sky-50 text-sky-700 border-sky-200",
    red: "bg-red-50 text-red-600 border-red-100",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

// ── Animated pulse dot ────────────────────────────────────────────────────────
function LiveDot({ color = "bg-red-500" }) {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color}`}
      />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function ProductDetailHero({ product, selectedVariantId }) {
  const { selectedCountry } = useCountry();

  const priceObj = getBasePrice(product?.prices, selectedVariantId);
  const basePrice = priceObj?.price ?? null;
  const hasDiscount =
    priceObj?.discount_type && priceObj?.discount_amount != null;
  const discountedPrice = hasDiscount
    ? priceObj?.discount_type === "percentage" ||
      priceObj?.discount_type === "percent"
      ? basePrice - (basePrice * priceObj?.discount_amount) / 100
      : basePrice - priceObj?.discount_amount
    : basePrice;

  const currencySymbol = selectedCountry?.currency_icon
    ? new DOMParser().parseFromString(
        selectedCountry.currency_icon,
        "text/html",
      ).body.textContent
    : "$";

  if (!product) return null;

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Top accent bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle,#e2e8f0 1.5px,transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_40%,rgba(254,242,242,0.85)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-32 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* LEFT — Text */}
          <div>
            {/* Badges row */}
            <div className="flex flex-wrap gap-2 mb-5">
              {product.is_combo && (
                <Badge variant="combo">
                  <Layers size={11} /> Bundle Pack
                </Badge>
              )}
              {product.is_usb && (
                <Badge variant="usb">
                  <Usb size={11} /> USB Product
                </Badge>
              )}
              {product.is_variant && (
                <Badge variant="variant">
                  <Tag size={11} /> Multiple Variants
                </Badge>
              )}
              <Badge variant="red">
                <LiveDot color="bg-red-500" /> Available Now
              </Badge>
            </div>

            {/* Name */}
            <h1
              className="font-['Barlow_Condensed'] font-black leading-[0.9] text-slate-900 mb-4"
              style={{ fontSize: "clamp(36px,5vw,68px)" }}
            >
              {product.name}
            </h1>

            {/* Rich HTML description from SunEditor */}
            {product.description && (
              <div
                className="sun-editor-content text-slate-500 text-[15px] sm:text-[16px] leading-relaxed max-w-[500px] mb-8"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {/* Top features preview */}
            {product.details?.length > 0 && (
              <ul className="flex flex-col gap-2 mb-8">
                {product.details.slice(0, 4).map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-3 text-[14px] text-slate-700"
                  >
                    <CheckCircle2 size={15} className="text-red-500 shrink-0" />
                    {d}
                  </li>
                ))}
                {product.details.length > 4 && (
                  <li className="flex items-center gap-2 text-[13px] text-slate-400 pl-6">
                    <ChevronRight size={12} />+{product.details.length - 4} more
                    features below
                  </li>
                )}
              </ul>
            )}

            {/* CTA */}
            <div className="flex flex-col xs:flex-row gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-[14px] transition-all duration-300 shadow-lg shadow-red-200 hover:shadow-red-300 hover:-translate-y-0.5 w-full xs:w-auto"
              >
                <ShieldCheck size={16} /> Get Protected
              </Link>
            </div>
          </div>

          {/* RIGHT — Price card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-100/80 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
              <div className="p-7">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5">
                  {product.is_combo ? (
                    <Layers
                      size={26}
                      strokeWidth={1.5}
                      className="text-red-600"
                    />
                  ) : product.is_usb ? (
                    <Usb size={26} strokeWidth={1.5} className="text-red-600" />
                  ) : (
                    <Package
                      size={26}
                      strokeWidth={1.5}
                      className="text-red-600"
                    />
                  )}
                </div>

                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                  Starting from
                </p>

                {basePrice != null ? (
                  <div className="flex items-end gap-2 mb-1">
                    <span
                      className="font-['Barlow_Condensed'] font-black text-slate-900 leading-none"
                      style={{ fontSize: "clamp(36px,5vw,52px)" }}
                    >
                      {currencySymbol}
                      {discountedPrice?.toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-[15px] text-slate-400 line-through mb-1">
                        {currencySymbol}
                        {basePrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-[16px] text-slate-500 mb-1">
                    Contact for pricing
                  </p>
                )}

                <p className="text-[12px] text-slate-400 mb-6">
                  per license · billed annually
                </p>

                {/* Divider */}
                <div className="border-t border-slate-100 mb-5" />

                {/* Feature bullets */}
                <ul className="space-y-2.5 mb-6">
                  {product.details?.slice(0, 5).map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-3 text-[13px] text-slate-700"
                    >
                      <CheckCircle2
                        size={13}
                        strokeWidth={2}
                        className="text-red-500 shrink-0"
                      />
                      {d}
                    </li>
                  ))}
                </ul>

                <a
                  href="#pricing"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-[14px] transition-all duration-300"
                >
                  View Plans <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
