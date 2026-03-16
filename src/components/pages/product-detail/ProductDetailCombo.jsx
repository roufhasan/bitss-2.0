"use client";
import Link from "next/link";
import { Package, Layers, Usb, ChevronRight, CheckCircle2 } from "lucide-react";

const COMBO_COLORS = [
  {
    bg: "bg-red-50",
    border: "border-red-100",
    icon: "text-red-500",
    dot: "bg-red-400",
  },
  {
    bg: "bg-sky-50",
    border: "border-sky-100",
    icon: "text-sky-500",
    dot: "bg-sky-400",
  },
  {
    bg: "bg-violet-50",
    border: "border-violet-100",
    icon: "text-violet-500",
    dot: "bg-violet-400",
  },
  {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    icon: "text-emerald-500",
    dot: "bg-emerald-400",
  },
  {
    bg: "bg-amber-50",
    border: "border-amber-100",
    icon: "text-amber-500",
    dot: "bg-amber-400",
  },
];

function ComboProductCard({ comboProduct, index }) {
  const c = COMBO_COLORS[index % COMBO_COLORS.length];
  return (
    <Link
      href={`/products/${comboProduct.id}`}
      className="group flex items-start gap-4 p-5 rounded-2xl border bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 hover:border-slate-300"
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.bg} border ${c.border}`}
      >
        {comboProduct.is_usb ? (
          <Usb size={18} strokeWidth={1.75} className={c.icon} />
        ) : comboProduct.is_combo ? (
          <Layers size={18} strokeWidth={1.75} className={c.icon} />
        ) : (
          <Package size={18} strokeWidth={1.75} className={c.icon} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-['Barlow_Condensed'] text-[16px] font-black text-slate-900 leading-tight group-hover:text-red-600 transition-colors truncate">
            {comboProduct.name}
          </h4>
          {comboProduct.pivot?.quantity > 1 && (
            <span className="shrink-0 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              ×{comboProduct.pivot.quantity}
            </span>
          )}
        </div>

        {comboProduct.sort_description && (
          <p
            className="text-[12px] text-slate-400 mt-1 line-clamp-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: comboProduct.sort_description }}
          />
        )}
      </div>

      <ChevronRight
        size={15}
        className="text-slate-300 group-hover:text-red-400 shrink-0 mt-1 transition-colors"
      />
    </Link>
  );
}

export default function ProductDetailCombo({ product }) {
  if (!product?.is_combo || !product?.combo_products?.length) return null;

  return (
    <section className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      {/* Sub-grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-[11px] font-semibold tracking-wide uppercase mb-4">
            <Layers size={11} /> Bundle Contents
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-['Barlow_Condensed'] font-black text-slate-900 leading-none"
              style={{ fontSize: "clamp(28px,4vw,48px)" }}
            >
              THIS BUNDLE <span className="text-red-600">INCLUDES</span>
            </h2>
            <p className="text-[14px] text-slate-500">
              {product.combo_products.length} products in one package
            </p>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {product.combo_products.map((cp, i) => (
            <ComboProductCard key={cp.id} comboProduct={cp} index={i} />
          ))}
        </div>

        {/* Value callout */}
        <div className="bg-white rounded-2xl border border-red-100 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} className="text-white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h4 className="font-['Barlow_Condensed'] text-[18px] font-black text-slate-900 mb-1">
              Why Buy the Bundle?
            </h4>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              Purchasing products as a bundle ensures full chain coverage at a
              better price than buying separately. Every entry point is secured
              under a single license.
            </p>
          </div>
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-[14px] transition-all duration-300 whitespace-nowrap shrink-0"
          >
            View Pricing <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
