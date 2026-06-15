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
import CTA from "@/components/shared/CTA";

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
          <CTA />
        </>
      )}
    </>
  );
}
