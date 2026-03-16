"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useCountry } from "@/context/CountryContext";
import ProductCard from "@/components/card/ProductCard";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Loader2,
  SlidersHorizontal,
  Zap,
} from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ─── FETCH HELPERS ────────────────────────────────────────────────────────────

async function fetchProducts({ countryId, categoryId }) {
  const params = new URLSearchParams({ country_id: countryId });
  if (categoryId) params.set("category_id", categoryId);
  const res = await fetch(`${BASE_URL}/all-products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const json = await res.json();
  return json.data;
}

async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/all-categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const json = await res.json();
  return json.data;
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function Tag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      {children}
    </span>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedCountry } = useCountry();

  const activeCategoryId = searchParams.get("category")
    ? Number(searchParams.get("category"))
    : null;

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["nav-categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  // Fetch products — refetches automatically when category or country changes
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", selectedCountry?.id, activeCategoryId],
    queryFn: () =>
      fetchProducts({
        countryId: selectedCountry?.id,
        categoryId: activeCategoryId,
      }),
    enabled: !!selectedCountry?.id,
    staleTime: 1000 * 60 * 5,
  });

  const activeCategory = categories?.find((c) => c.id === activeCategoryId);

  function handleCategory(id) {
    if (id === null) {
      router.push("/products");
    } else {
      router.push(`/products?category=${id}`);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        body { background:#fff; font-family:'DM Sans',sans-serif; overflow-x:hidden; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#f1f5f9; }
        ::-webkit-scrollbar-thumb { background:#dc2626; border-radius:3px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .fu1{animation:fadeUp .6s ease forwards .08s;opacity:0}
        .fu2{animation:fadeUp .6s ease forwards .22s;opacity:0}
        .fu3{animation:fadeUp .6s ease forwards .36s;opacity:0}
        .dot-grid{ background-image:radial-gradient(circle,#e2e8f0 1.5px,transparent 1.5px); background-size:26px 26px; }
        .sub-grid{
          background-image: linear-gradient(rgba(220,38,38,.05) 1px,transparent 1px), linear-gradient(90deg,rgba(220,38,38,.05) 1px,transparent 1px);
          background-size:48px 48px;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_30%,rgba(254,242,242,0.9)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
          {/* Breadcrumb */}
          <nav className="fu1 flex items-center gap-2 text-[12px] text-slate-400 mb-8">
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            {activeCategory ? (
              <>
                <Link
                  href="/products"
                  className="hover:text-slate-600 transition-colors"
                >
                  Products
                </Link>
                <ChevronRight size={12} />
                <span className="text-red-500">{activeCategory.name}</span>
              </>
            ) : (
              <span className="text-red-500">Products</span>
            )}
          </nav>

          <div className="max-w-3xl">
            <div className="fu1 mb-5">
              <Tag>{activeCategory ? activeCategory.name : "All Products"}</Tag>
            </div>
            <h1
              className="fu2 font-['Barlow_Condensed'] font-black leading-[0.88] tracking-tight text-slate-900 mb-6"
              style={{ fontSize: "clamp(44px,8vw,88px)" }}
            >
              {activeCategory ? (
                <>
                  {activeCategory.name
                    .toUpperCase()
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}
                  <br />
                  <span className="text-red-600">
                    {activeCategory.name
                      .toUpperCase()
                      .split(" ")
                      .slice(2)
                      .join(" ") || "PRODUCTS"}
                  </span>
                </>
              ) : (
                <>
                  THE COMPLETE
                  <br />
                  <span className="text-red-600">SECURITY SUITE</span>
                </>
              )}
            </h1>
            <p className="fu3 text-slate-500 text-[15px] sm:text-[17px] leading-relaxed max-w-xl">
              {activeCategory
                ? activeCategory.sort_description ||
                  "Browse products in this category."
                : "Every product purpose-built for a specific attack layer — no overlap, no gaps."}
            </p>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER TABS ── */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-1.5 py-3 overflow-x-auto scrollbar-hide">
            <SlidersHorizontal
              size={14}
              className="text-slate-400 shrink-0 mr-1"
            />

            {/* All tab */}
            <button
              onClick={() => handleCategory(null)}
              className={`shrink-0 px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                !activeCategoryId
                  ? "bg-red-600 text-white shadow-sm shadow-red-200"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              All
            </button>

            {/* Category tabs */}
            {categories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className={`shrink-0 px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeCategoryId === cat.id
                    ? "bg-red-600 text-white shadow-sm shadow-red-200"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCTS GRID ── */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <Tag>
                {isLoading
                  ? "Loading…"
                  : `${products?.length} Product${products?.length !== 1 ? "s" : ""}`}
              </Tag>
              <h2
                className="font-['Barlow_Condensed'] font-black text-slate-900 mt-4 leading-none"
                style={{ fontSize: "clamp(24px,4vw,44px)" }}
              >
                {activeCategory ? (
                  <>
                    <span className="text-red-600">{activeCategory.name}</span>
                  </>
                ) : (
                  <>
                    ALL <span className="text-red-600">PRODUCTS</span>
                  </>
                )}
              </h2>
            </div>
            {selectedCountry && (
              <div className="flex items-center gap-2 text-[13px] text-slate-400">
                <span
                  dangerouslySetInnerHTML={{
                    __html: selectedCountry.currency_icon,
                  }}
                  className="text-slate-600 font-semibold"
                />
                <span>
                  Showing prices for{" "}
                  <span className="text-slate-700 font-semibold">
                    {selectedCountry.country_name}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center gap-3 py-24 text-slate-400">
              <Loader2 size={22} className="animate-spin text-red-500" />
              <span className="text-[14px]">Loading products…</span>
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <p className="text-slate-500 text-[14px]">
                Could not load products. Please try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[13px] font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && products?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                <SlidersHorizontal size={22} className="text-slate-400" />
              </div>
              <p className="text-slate-500 text-[14px] text-center max-w-xs">
                No products found in this category for your region.
              </p>
              <button
                onClick={() => handleCategory(null)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-red-300 text-slate-600 hover:text-red-600 text-[13px] font-semibold transition-all duration-200"
              >
                View all products <ArrowRight size={13} />
              </button>
            </div>
          )}

          {/* Grid */}
          {!isLoading && !isError && products?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} i={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 sm:py-24 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(220,38,38,0.15)_0%,transparent_70%)]" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Start Today
          </span>
          <h2
            className="font-['Barlow_Condensed'] font-black text-white leading-[0.9] mb-5 sm:mb-6"
            style={{ fontSize: "clamp(44px,8vw,88px)" }}
          >
            READY TO
            <br />
            <span className="text-red-500">FIGHT BACK?</span>
          </h2>
          <p className="text-slate-400 text-[14px] sm:text-[16px] leading-relaxed mb-10 sm:mb-12">
            Request a free demo and see Bitss in action across all security
            layers — or get a custom quote for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="mailto:security@bitss.com.bd"
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-[14px] sm:text-[15px] transition-all duration-300 shadow-lg shadow-red-900/40 hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <Zap size={16} /> Request a Demo
            </a>
            <a
              href="tel:+8801000000000"
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-[14px] sm:text-[15px] transition-all duration-300 hover:bg-slate-800 w-full sm:w-auto"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
