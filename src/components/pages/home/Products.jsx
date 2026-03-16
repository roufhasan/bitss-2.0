"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/card/ProductCard";
import { useCountry } from "@/context/CountryContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function Tag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      {children}
    </span>
  );
}

async function fetchProducts(countryId) {
  const res = await fetch(`${BASE_URL}/all-products?country_id=${countryId}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const json = await res.json();
  return json.data;
}

export default function Products() {
  const { selectedCountry } = useCountry();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products-preview", selectedCountry?.id],
    queryFn: () => fetchProducts(selectedCountry?.id),
    enabled: !!selectedCountry?.id,
    staleTime: 1000 * 60 * 5,
  });

  // Show only first 5 products in this section
  const preview = (products || []).slice(0, 5);

  return (
    <section
      id="products"
      className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
    >
      <div className="dot-grid absolute inset-0 opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div>
            <Tag>
              {isLoading ? "Products" : `${products?.length ?? 0} Products`}
            </Tag>
            <h2
              className="font-['Barlow_Condensed'] font-black text-slate-900 mt-4 leading-none"
              style={{ fontSize: "clamp(28px,5vw,54px)" }}
            >
              THE COMPLETE <span className="text-red-600">SECURITY SUITE</span>
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-3">
            <p className="text-slate-500 text-[14px] max-w-xs sm:max-w-sm leading-relaxed">
              Every product purpose-built for a specific attack layer — no
              overlap, no gaps.
            </p>
            {/* See all products button */}
            {!isLoading && !isError && (
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                See all products <ArrowRight size={13} />
              </Link>
            )}
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center gap-3 py-20 text-slate-400">
            <Loader2 size={20} className="animate-spin text-red-500" />
            <span className="text-[14px]">Loading products…</span>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex items-center justify-center py-20">
            <p className="text-slate-400 text-[14px]">
              Could not load products. Please try again later.
            </p>
          </div>
        )}

        {/* Products grid */}
        {!isLoading && !isError && preview.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
              {preview.map((product, i) => (
                <ProductCard key={product.id} product={product} i={i} />
              ))}
            </div>

            {/* Bottom CTA — only show if there are more than 5 */}
            {products?.length > 5 && (
              <div className="mt-10 sm:mt-12 text-center">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-slate-200 hover:border-red-300 text-slate-700 hover:text-red-600 hover:bg-red-50 text-[14px] font-semibold transition-all duration-200"
                >
                  View all {products?.length} products <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </>
        )}

        {/* No products state */}
        {!isLoading && !isError && preview.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-slate-400 text-[14px]">
              No products available for your region.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
