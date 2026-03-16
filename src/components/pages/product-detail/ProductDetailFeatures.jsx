"use client";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function ProductDetailFeatures({ product }) {
  if (!product?.details?.length) return null;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            What's Included
          </span>
          <h2
            className="font-['Barlow_Condensed'] font-black text-slate-900 leading-none"
            style={{ fontSize: "clamp(28px,4vw,48px)" }}
          >
            ALL <span className="text-red-600">FEATURES</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.details.map((feature, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-red-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 group-hover:bg-red-100 flex items-center justify-center shrink-0 transition-colors">
                <CheckCircle2
                  size={15}
                  strokeWidth={2}
                  className="text-red-500"
                />
              </div>
              <p className="text-[14px] text-slate-700 font-medium leading-snug pt-1">
                {feature}
              </p>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
          {[
            {
              icon: "🛡️",
              label: "Enterprise-grade",
              sub: "Battle-tested protection",
            },
            {
              icon: "⚡",
              label: "Real-time defense",
              sub: "Instant threat response",
            },
            {
              icon: "📋",
              label: "Compliance-ready",
              sub: "GDPR, ISO 27001, PCI DSS",
            },
          ].map((item) => (
            <div key={item.label} className="bg-white px-6 py-5 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-['Barlow_Condensed'] text-[15px] font-black text-slate-900">
                {item.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
