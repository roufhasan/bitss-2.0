"use client";

import { ChevronRight, ShieldCheck, Package, Usb, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── ACCENT COLORS (cycles by index) ──────────────────────────────────────────
const ACCENTS = [
  {
    accent: "#DC2626",
    accentText: "text-red-600",
    accentBg: "bg-red-50",
    accentDot: "bg-red-500",
    accentBtn: "text-red-600 hover:text-red-700",
    iconBg: "bg-red-100",
    layerClass: "bg-red-50 text-red-600 border-red-100",
    hoverBorder: "hover:border-red-300",
  },
  {
    accent: "#EA580C",
    accentText: "text-orange-600",
    accentBg: "bg-orange-50",
    accentDot: "bg-orange-500",
    accentBtn: "text-orange-600 hover:text-orange-700",
    iconBg: "bg-orange-100",
    layerClass: "bg-orange-50 text-orange-600 border-orange-100",
    hoverBorder: "hover:border-orange-300",
  },
  {
    accent: "#D97706",
    accentText: "text-amber-600",
    accentBg: "bg-amber-50",
    accentDot: "bg-amber-500",
    accentBtn: "text-amber-600 hover:text-amber-700",
    iconBg: "bg-amber-100",
    layerClass: "bg-amber-50 text-amber-700 border-amber-100",
    hoverBorder: "hover:border-amber-300",
  },
  {
    accent: "#0284C7",
    accentText: "text-sky-600",
    accentBg: "bg-sky-50",
    accentDot: "bg-sky-500",
    accentBtn: "text-sky-600 hover:text-sky-700",
    iconBg: "bg-sky-100",
    layerClass: "bg-sky-50 text-sky-600 border-sky-100",
    hoverBorder: "hover:border-sky-300",
  },
  {
    accent: "#059669",
    accentText: "text-emerald-600",
    accentBg: "bg-emerald-50",
    accentDot: "bg-emerald-500",
    accentBtn: "text-emerald-600 hover:text-emerald-700",
    iconBg: "bg-emerald-100",
    layerClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
    hoverBorder: "hover:border-emerald-300",
  },
];

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Pick an icon based on product flags
function resolveIcon(product) {
  if (product.is_usb) return Usb;
  if (product.is_combo) return Layers;
  return ShieldCheck;
}

// Resolve the badge label
function resolveBadge(product) {
  if (product.is_usb) return "USB Device";
  if (product.is_combo) return "Combo Pack";
  if (product.is_variant) return "Multi-Variant";
  return "Security Product";
}

export default function ProductCard({ product, i }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);

  const c = ACCENTS[i % ACCENTS.length];
  const Icon = resolveIcon(product);
  const badge = resolveBadge(product);

  // Show first 4 details max
  const features = (product.details || []).slice(0, 4);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ transitionDelay: `${i * 0.06}s` }}
      className={`relative flex flex-col bg-white rounded-2xl border p-5 sm:p-6 cursor-default transition-all duration-500
        ${hov ? `border-transparent shadow-xl shadow-slate-200/80 -translate-y-1 ${c.hoverBorder}` : "border-slate-200 shadow-sm"}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-full transition-all duration-300"
        style={{ background: hov ? c.accent : "transparent" }}
      />

      {/* Badge — desktop */}
      <span
        className={`hidden sm:inline-flex absolute top-4 right-4 text-[9px] font-semibold tracking-wide px-2 py-0.5 rounded-full border ${c.layerClass}`}
      >
        {badge}
      </span>

      {/* Index */}
      <p className="font-mono text-[10px] tracking-widest text-slate-300 mb-3">
        {String(i + 1).padStart(2, "0")}
      </p>

      {/* Icon + badge row (mobile) */}
      <div className="flex items-center justify-between mb-3 sm:block">
        <div
          className={`inline-flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ${c.iconBg} ${hov ? "scale-110" : ""}`}
        >
          <Icon size={20} strokeWidth={1.75} style={{ color: c.accent }} />
        </div>
        <span
          className={`sm:hidden inline-flex text-[9px] font-semibold tracking-wide px-2 py-0.5 rounded-full border ${c.layerClass}`}
        >
          {badge}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-['Barlow_Condensed'] text-[19px] sm:text-[21px] font-black text-slate-900 leading-tight mb-0.5">
        {product.name}
      </h3>

      {/* Combo products tag */}
      {product.is_combo && product.combo_products?.length > 0 && (
        <p
          className={`text-[10px] font-semibold tracking-wide uppercase mb-3 ${c.accentText}`}
        >
          Includes {product.combo_products.length} products
        </p>
      )}
      {!product.is_combo && (
        <p
          className={`text-[10px] font-semibold tracking-wide uppercase mb-3 ${c.accentText}`}
        >
          {badge}
        </p>
      )}

      {/* Description — strip HTML tags if present */}
      <p className="text-slate-500 text-[13px] leading-relaxed mb-4 flex-1">
        {(product.description || "").replace(/<[^>]*>/g, "").slice(0, 100)}
        {(product.description || "").replace(/<[^>]*>/g, "").length > 100
          ? "…"
          : ""}
      </p>

      {/* Features */}
      {features.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-[12px] text-slate-500"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${c.accentDot}`}
              />
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <Link
          href={`/products/${product.id}`}
          className={`inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wide transition-colors ${c.accentBtn}`}
        >
          View Details <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}
