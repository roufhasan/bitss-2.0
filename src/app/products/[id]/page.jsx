"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useProductDetail } from "@/hooks/useProductDetail";
import ProductDetailHero from "@/components/pages/product-detail/ProductDetailHero";
import ProductDetailPricing from "@/components/pages/product-detail/ProductDetailPricing";
import ProductDetailFeatures from "@/components/pages/product-detail/ProductDetailFeatures";
import ProductDetailCombo from "@/components/pages/product-detail/ProductDetailCombo";
import ProductDetailSkeleton from "@/components/pages/product-detail/ProductDetailSkeleton";
import { useCountry } from "@/context/CountryContext";

// ── Error state ───────────────────────────────────────────────────────────────
function ProductDetailError({ message }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
          <AlertCircle size={24} className="text-red-500" />
        </div>
        <h2 className="font-['Barlow_Condensed'] text-[28px] font-black text-slate-900 mb-2">
          PRODUCT NOT FOUND
        </h2>
        <p className="text-slate-500 text-[14px] mb-6">
          {message ?? "We couldn't load this product. Please try again."}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-[14px] transition-all"
        >
          <ArrowLeft size={14} /> Back to Products
        </Link>
      </div>
    </div>
  );
}

// ── CTA section at bottom ─────────────────────────────────────────────────────
function ProductDetailCTA({ productName }) {
  return (
    <section
      id="contact"
      className="relative py-20 sm:py-24 bg-slate-900 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(220,38,38,0.15)_0%,transparent_70%)]" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Get Started Today
        </span>

        <h2
          className="font-['Barlow_Condensed'] font-black text-white leading-[0.9] mb-5"
          style={{ fontSize: "clamp(40px,7vw,80px)" }}
        >
          READY TO
          <br />
          <span className="text-red-500">FIGHT BACK?</span>
        </h2>

        <p className="text-slate-400 text-[14px] sm:text-[16px] leading-relaxed mb-10 px-2 sm:px-0">
          Request a free demo of{" "}
          <span className="text-white font-semibold">{productName}</span> and
          see it in action — or get a custom quote for your organization.
        </p>

        <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
          <a
            href="mailto:support@bobosohomail.com"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-[14px] sm:text-[15px] transition-all duration-300 shadow-lg shadow-red-900/40 hover:-translate-y-0.5 w-full xs:w-auto"
          >
            Request a Demo
          </a>
          <a
            href="tel:+0033666100010"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-[14px] sm:text-[15px] transition-all duration-300 hover:bg-slate-800 w-full xs:w-auto"
          >
            Talk to an Expert
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id;

  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const { selectedCountry } = useCountry();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductDetail(productId, selectedCountry?.id);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        body { font-family:'DM Sans',sans-serif; }
        html { scroll-behavior: smooth; }

        /* Fix SunEditor image sizing */
        #editor_description img {
        max-width: 100% !important;
        width: 100% !important;
        height: auto !important;
        border-radius: 12px;
  }

  /* Also remove the inline style SunEditor sometimes injects */
  #editor_description figure {
    margin: 0 !important;
    width: 100% !important;
  }

      `}</style>

      {isLoading && <ProductDetailSkeleton />}

      {isError && <ProductDetailError message={error?.message} />}

      {product && (
        <>
          {/* Breadcrumb */}
          <div
            className={`fixed inset-x-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100 ${scrolled ? "top-15.5" : "top-24"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-10 flex items-center gap-2 text-[12px] text-slate-400">
              <Link href="/" className="hover:text-slate-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/products"
                className="hover:text-slate-600 transition-colors"
              >
                Products
              </Link>
              <span>/</span>
              <span className="text-slate-700 font-medium truncate max-w-[200px]">
                {product.name}
              </span>
            </div>
          </div>

          {/* Hero */}
          <ProductDetailHero
            product={product}
            selectedVariantId={selectedVariantId}
          />

          {/* Features */}
          <ProductDetailFeatures product={product} />

          {/* Combo products (only shown for bundles) */}
          <ProductDetailCombo product={product} />

          {/* Pricing */}
          <ProductDetailPricing
            product={product}
            selectedVariantId={selectedVariantId}
            onVariantChange={setSelectedVariantId}
          />

          {/* CTA */}
          <ProductDetailCTA productName={product.name} />
        </>
      )}
    </>
  );
}
