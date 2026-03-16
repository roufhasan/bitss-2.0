"use client";
import { useEffect, useState, useRef } from "react";
import {
  Menu,
  ShieldCheck,
  X,
  ChevronDown,
  BookOpen,
  Globe,
  Shield,
  Server,
  Mail,
  Lock,
  Loader2,
  Package,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CATEGORY_COLORS = [
  { bg: "bg-red-50 hover:bg-red-100", dot: "bg-red-500" },
  { bg: "bg-orange-50 hover:bg-orange-100", dot: "bg-orange-500" },
  { bg: "bg-amber-50 hover:bg-amber-100", dot: "bg-amber-500" },
  { bg: "bg-sky-50 hover:bg-sky-100", dot: "bg-sky-500" },
  { bg: "bg-violet-50 hover:bg-violet-100", dot: "bg-violet-500" },
  { bg: "bg-emerald-50 hover:bg-emerald-100", dot: "bg-emerald-500" },
  { bg: "bg-teal-50 hover:bg-teal-100", dot: "bg-teal-500" },
  { bg: "bg-indigo-50 hover:bg-indigo-100", dot: "bg-indigo-500" },
];

async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/all-categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const json = await res.json();
  return json.data;
}

const ACADEMY_LINKS = [
  {
    label: "Website Security",
    href: "/security-academy/website-security",
    icon: Globe,
  },
  {
    label: "Malware Protection",
    href: "/security-academy/malware-protection",
    icon: Shield,
  },
  {
    label: "Ransomware Defense",
    href: "/security-academy/ransomware-defense",
    icon: Lock,
  },
  {
    label: "Server Security",
    href: "/security-academy/server-security",
    icon: Server,
  },
  {
    label: "Spam Protection",
    href: "/security-academy/spam-protection",
    icon: Mail,
  },
  {
    label: "Security Basics",
    href: "/security-academy/security-basics",
    icon: BookOpen,
  },
];

const NAV_LINKS = [
  {
    label: "Academy",
    dropdown: [
      {
        group: "Resources",
        items: [
          {
            label: "Security Academy",
            href: "/security-academy",
            description: "Free guides on every attack surface",
            icon: BookOpen,
            highlight: true,
          },
        ],
      },
    ],
  },
  { label: "Pricing", href: "#bundles" },
  { label: "Why BITSS", href: "/why-bitss" }, // ← NEW
  { label: "About", href: "#about" },
];

// ─── PRODUCTS DROPDOWN (desktop) ─────────────────────────────────────────────
function ProductsDropdown({ onClose }) {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["nav-categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
      <Link
        href="/products"
        onClick={onClose}
        className="group flex items-center gap-3 px-4 py-4 bg-gradient-to-br from-slate-900 to-slate-800 hover:from-red-700 hover:to-red-900 transition-all duration-300"
      >
        <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors">
          <Package size={17} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-white">
              All Products
            </span>
            <span className="text-[9px] font-black text-red-400 group-hover:text-white bg-white/10 px-1.5 py-0.5 rounded-md leading-none tracking-wide uppercase">
              View All
            </span>
          </div>
          <p className="text-[11px] text-slate-400 group-hover:text-white/70 mt-0.5 transition-colors truncate">
            Browse our full security product range
          </p>
        </div>
        <ChevronDown
          size={14}
          className="text-slate-500 group-hover:text-white -rotate-90 shrink-0 transition-colors"
        />
      </Link>

      <div className="p-3">
        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-6 text-slate-400">
            <Loader2 size={15} className="animate-spin" />
            <span className="text-[12px]">Loading categories…</span>
          </div>
        )}
        {isError && (
          <div className="flex items-center justify-center py-6 text-slate-400">
            <span className="text-[12px]">Could not load categories</span>
          </div>
        )}
        {categories && (
          <div className="grid grid-cols-2 gap-1.5">
            {categories.map((cat, i) => {
              const c = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
              return (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  onClick={onClose}
                  className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl ${c.bg} transition-all duration-150 group`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${c.dot}`}
                  />
                  <span className="text-[12px] font-medium text-slate-700 group-hover:text-slate-900 leading-tight">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MOBILE PRODUCTS ACCORDION ────────────────────────────────────────────────
function MobileProductsAccordion({ onClose }) {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["nav-categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="ml-3 mt-1 border-l-2 border-red-100 pl-3 flex flex-col gap-0.5">
      <Link
        href="/products"
        onClick={onClose}
        className="px-2 py-1.5 text-[13px] text-slate-500 hover:text-red-600 rounded-lg transition-colors"
      >
        View all Products
      </Link>
      <div className="my-1 border-t border-slate-100" />
      <p className="px-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-1">
        Categories
      </p>
      {isLoading && (
        <div className="flex items-center gap-2 px-2 py-2 text-slate-400">
          <Loader2 size={12} className="animate-spin" />
          <span className="text-[12px]">Loading…</span>
        </div>
      )}
      {isError && (
        <p className="px-2 py-1 text-[12px] text-slate-400">
          Could not load categories
        </p>
      )}
      {categories?.map((cat) => (
        <Link
          key={cat.id}
          href={`/products?category=${cat.id}`}
          onClick={onClose}
          className="flex items-center gap-2 px-2 py-1.5 text-[13px] text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
          {cat.name}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    clearAuth,
  } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [academyOpen, setAcademyOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  function handleLogout() {
    clearAuth();
    setUserMenuOpen(false);
    router.push("/");
  }

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/img/logo.png" alt="logo" width={48} height={48} />
          <span
            className="font-['Barlow_Condensed'] text-[20px] font-black text-slate-900 tracking-wide leading-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            BITSS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" ref={dropdownRef}>
          {/* ── Products dropdown (dynamic) ── */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "Products" ? null : "Products")
              }
              className="flex items-center hover:cursor-pointer gap-1 px-4 py-2 text-[14px] text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors font-medium"
            >
              Products
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openDropdown === "Products" ? "rotate-180" : ""}`}
              />
            </button>
            {openDropdown === "Products" && (
              <ProductsDropdown onClose={() => setOpenDropdown(null)} />
            )}
          </div>

          {NAV_LINKS.map((l) =>
            l.dropdown ? (
              <div key={l.label} className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === l.label ? null : l.label)
                  }
                  className="flex items-center hover:cursor-pointer gap-1 px-4 py-2 text-[14px] text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                >
                  {l.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === l.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown panel */}
                {openDropdown === l.label && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                    <a
                      href="/security-academy"
                      onClick={() => setOpenDropdown(null)}
                      className="group flex items-center gap-3 px-4 py-4 bg-gradient-to-br from-slate-900 to-slate-800 hover:from-red-700 hover:to-red-900 transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors">
                        <BookOpen size={17} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-bold text-white">
                            Security Academy
                          </span>
                          <span className="text-[9px] font-black text-red-400 group-hover:text-white bg-white/10 px-1.5 py-0.5 rounded-md leading-none tracking-wide uppercase">
                            FREE
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 group-hover:text-white/70 mt-0.5 transition-colors truncate">
                          Free guides on every attack surface
                        </p>
                      </div>
                      <ChevronDown
                        size={14}
                        className="text-slate-500 group-hover:text-white -rotate-90 shrink-0 transition-colors"
                      />
                    </a>

                    <div className="p-3 grid grid-cols-2 gap-1.5">
                      {ACADEMY_LINKS.map(({ label, href, icon: Icon }, i) => {
                        const colors = [
                          {
                            bg: "bg-blue-50 hover:bg-blue-100",
                            icon: "text-blue-500",
                            text: "hover:text-blue-700",
                          },
                          {
                            bg: "bg-orange-50 hover:bg-orange-100",
                            icon: "text-orange-500",
                            text: "hover:text-orange-700",
                          },
                          {
                            bg: "bg-red-50 hover:bg-red-100",
                            icon: "text-red-500",
                            text: "hover:text-red-700",
                          },
                          {
                            bg: "bg-emerald-50 hover:bg-emerald-100",
                            icon: "text-emerald-500",
                            text: "hover:text-emerald-700",
                          },
                          {
                            bg: "bg-violet-50 hover:bg-violet-100",
                            icon: "text-violet-500",
                            text: "hover:text-violet-700",
                          },
                          {
                            bg: "bg-amber-50 hover:bg-amber-100",
                            icon: "text-amber-500",
                            text: "hover:text-amber-700",
                          },
                        ];
                        const c = colors[i % colors.length];
                        return (
                          <Link
                            key={label}
                            href={href}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl ${c.bg} ${c.text} transition-all duration-150 group`}
                          >
                            <Icon size={14} className={`shrink-0 ${c.icon}`} />
                            <span className="text-[12px] font-medium text-slate-700 group-hover:text-inherit leading-tight">
                              {label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className={`px-4 py-2 text-[14px] rounded-lg transition-colors font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50`}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {authLoading ? (
            // Skeleton while auth state loads from localStorage
            <div className="w-20 h-8 bg-slate-100 rounded-lg animate-pulse" />
          ) : isAuthenticated ? (
            // ── Logged in — user avatar + dropdown ──
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-black text-red-600">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-[14px] font-medium text-slate-700 max-w-[100px] truncate">
                  {user?.name?.split(" ")[0]}
                </span>
                <ChevronDown
                  size={13}
                  className={`text-slate-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* User dropdown */}
              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                  {/* User info */}
                  <div className="px-4 py-4 bg-gradient-to-br from-slate-900 to-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                        <span className="text-[14px] font-black text-red-400">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-white truncate">
                          {user?.name}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    {user?.role && (
                      <span className="mt-2 inline-flex text-[9px] font-black tracking-widest uppercase text-red-400 bg-white/10 px-2 py-0.5 rounded-md">
                        {user.role}
                      </span>
                    )}
                  </div>

                  {/* Menu items */}
                  <div className="p-1.5 flex flex-col gap-0.5">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium"
                    >
                      <User size={14} className="text-slate-400 shrink-0" />
                      My Dashboard
                    </Link>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      <LogOut size={14} className="shrink-0" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // ── Logged out — Sign in + Get Protected ──
            <>
              <Link
                href="/login"
                className="text-[14px] text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[14px] font-semibold transition-all duration-200 shadow-sm shadow-red-200 hover:shadow-red-300"
              >
                Get Protected
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-slate-100 px-4 pb-5 pt-3 flex flex-col gap-1">
          {/* Products — dynamic accordion */}
          <div>
            <button
              onClick={() => setProductsOpen((o) => !o)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-[15px] text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              Products
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {productsOpen && (
              <MobileProductsAccordion onClose={() => setMenuOpen(false)} />
            )}
          </div>

          {/* Academy with accordion */}
          <div>
            <button
              onClick={() => setAcademyOpen((o) => !o)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-[15px] text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              Academy
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${academyOpen ? "rotate-180" : ""}`}
              />
            </button>

            {academyOpen && (
              <div className="ml-3 mt-1 border-l-2 border-red-100 pl-3 flex flex-col gap-0.5">
                <Link
                  href="/security-academy"
                  onClick={() => setMenuOpen(false)}
                  className="px-2 py-1.5 text-[13px] text-slate-500 hover:text-red-600 rounded-lg transition-colors"
                >
                  View all Academy
                </Link>
                <div className="my-1 border-t border-slate-100" />
                <p className="px-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-1">
                  Security Academy
                </p>
                {ACADEMY_LINKS.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 text-[13px] text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Icon size={13} className="text-slate-400 shrink-0" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="#bundles"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 text-[15px] text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            Pricing
          </Link>

          {/* Why BITSS — standalone, highlighted in mobile too */}
          <Link
            href="/why-bitss"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 text-[15px] text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            Why BITSS
          </Link>

          <Link
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 text-[15px] text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            About
          </Link>

          <div className="pt-3 mt-1 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                {/* User info row */}
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="w-8 h-8 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-black text-red-600">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-slate-800 truncate">
                      {user?.name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 text-center text-[14px] font-semibold hover:bg-slate-50 transition-colors"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-center text-[14px] font-semibold hover:bg-red-100 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-center text-[15px] font-semibold hover:bg-slate-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-red-600 text-white text-center text-[15px] font-semibold"
                >
                  Get Protected
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
