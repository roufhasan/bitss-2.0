"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  Server,
  Shield,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import Products from "@/components/pages/home/Products";
import Link from "next/link";
import Hero from "@/components/pages/home/Hero";
import CoreServicesHeader from "@/components/pages/home/CoreServicesHeader";
import CoreServices from "@/components/pages/home/CoreServices";
import Ecosystem from "@/components/pages/home/Ecosystem";
import Tag from "@/components/ui/tag";

const BUNDLES = [
  {
    name: "Web Shield Pack",
    desc: "Complete web-layer security for your online presence.",
    products: ["WAP Protect", "Contact Form Shield", "VWAR for Websites"],
    icon: Globe,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    border: "border-slate-200 hover:border-red-300",
    bg: "bg-white",
    checkColor: "text-red-500",
    btnClass:
      "border border-slate-200 text-slate-700 hover:border-red-400 hover:text-red-600 hover:bg-red-50",
    popular: false,
  },
  {
    name: "Full Coverage",
    desc: "Every entry point secured. One ecosystem, full chain.",
    products: [
      "WAP Protect",
      "Contact Form Shield",
      "VWAR for Websites",
      "VWAR for Windows",
      "USB Key Protection",
    ],
    icon: ShieldCheck,
    iconBg: "bg-red-600",
    iconColor: "text-white",
    border: "border-red-600",
    bg: "bg-white",
    checkColor: "text-red-500",
    btnClass: "bg-red-600 hover:bg-red-700 text-white",
    popular: true,
  },
  {
    name: "Endpoint + Media",
    desc: "Device and removable media protection for your team.",
    products: ["VWAR for Windows", "USB Key Protection"],
    icon: Server,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    border: "border-slate-200 hover:border-sky-300",
    bg: "bg-white",
    checkColor: "text-sky-500",
    btnClass:
      "border border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50",
    popular: false,
  },
];

const TICKER = [
  {
    type: "BLOCKED",
    msg: "Malware payload in contact form submission",
    color: "text-emerald-400",
  },
  {
    type: "BLOCKED",
    msg: "Brute-force login attempt — admin panel",
    color: "text-emerald-400",
  },
  {
    type: "ALERT",
    msg: "Suspicious USB drive detected — WKSTN-07",
    color: "text-amber-400",
  },
  {
    type: "BLOCKED",
    msg: "SQL injection via contact form — neutralized",
    color: "text-emerald-400",
  },
  {
    type: "BLOCKED",
    msg: "Ransomware signature on Windows endpoint",
    color: "text-emerald-400",
  },
  {
    type: "INFO",
    msg: "Threat intelligence updated — 3,841 new IOCs",
    color: "text-sky-400",
  },
];

const WHY = [
  {
    icon: Shield,
    label: "AI-First Defense",
    desc: "Deep learning trained on billions of threat signals.",
  },
  {
    icon: Globe,
    label: "Global Intel",
    desc: "12M sensors across 150+ countries, updated live.",
  },
  {
    icon: Zap,
    label: "Zero-Trust Ready",
    desc: "Every request verified. Every session monitored.",
  },
  {
    icon: CheckCircle2,
    label: "Compliance Built-in",
    desc: "GDPR, ISO 27001, PCI DSS out of the box.",
  },
];

const TESTIMONIALS = [
  {
    q: "After a near-miss ransomware attack we switched to Bitss. Six months in, they've blocked 47 intrusion attempts without a single breach.",
    name: "Md. Rafiqul Islam",
    role: "CTO, Dhaka Commerce Group",
  },
  {
    q: "The SOC team responded in under 3 minutes. Their threat hunting uncovered an APT group dormant in our network for weeks.",
    name: "Sarah Chen",
    role: "CISO, FinTech Global",
  },
  {
    q: "Bitss found 34 critical misconfigurations on day one. ROI was immediate. The compliance reporting alone is worth the cost.",
    name: "James Okonkwo",
    role: "VP Security, Meridian Health",
  },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────

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

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function BundleCard({ b, i }) {
  const [ref, inView] = useInView();
  const Icon = b.icon;
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${i * 0.1}s` }}
      className={`relative w-full sm:flex-1 sm:min-w-[240px] sm:max-w-[340px] rounded-2xl border-2 p-6 sm:p-8 transition-all duration-500
        ${b.border} ${b.bg}
        ${b.popular ? "shadow-2xl shadow-red-100 sm:scale-[1.03]" : "shadow-sm hover:shadow-lg hover:-translate-y-1"}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      {b.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-4 sm:px-5 py-1.5 rounded-full whitespace-nowrap shadow-lg shadow-red-200">
          ★ Most Popular
        </div>
      )}
      <div
        className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 sm:mb-5 ${b.iconBg}`}
      >
        <Icon size={21} strokeWidth={1.75} className={b.iconColor} />
      </div>
      <h3 className="font-['Barlow_Condensed'] text-[22px] sm:text-[24px] font-black text-slate-900 mb-1">
        {b.name}
      </h3>
      <p className="text-slate-500 text-[13px] mb-5 sm:mb-6 leading-relaxed">
        {b.desc}
      </p>
      <ul className="space-y-2.5 mb-6 sm:mb-8">
        {b.products.map((prod) => (
          <li
            key={prod}
            className="flex items-center gap-3 text-[13px] text-slate-700"
          >
            <CheckCircle2
              size={14}
              strokeWidth={2}
              className={`shrink-0 ${b.checkColor}`}
            />
            {prod}
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-[14px] tracking-wide transition-all duration-300 ${b.btnClass}`}
      >
        Request a Demo <ArrowRight size={14} />
      </Link>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        html { scroll-behavior: smooth; }
        body { background:#fff; font-family:'DM Sans',sans-serif; overflow-x:hidden; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#f1f5f9; }
        ::-webkit-scrollbar-thumb { background:#dc2626; border-radius:3px; }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
        @keyframes spinRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ticker   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .fu1{animation:fadeUp .6s ease forwards .08s;opacity:0}
        .fu2{animation:fadeUp .6s ease forwards .20s;opacity:0}
        .fu3{animation:fadeUp .6s ease forwards .33s;opacity:0}
        .fu4{animation:fadeUp .6s ease forwards .46s;opacity:0}
        .fu5{animation:fadeUp .6s ease forwards .60s;opacity:0}
        .shield-float{animation:floatY 4.5s ease-in-out infinite}
        .spin-cw {animation:spinRing 24s linear infinite}
        .spin-ccw{animation:spinRing 18s linear infinite reverse}
        .ticker  {animation:ticker 40s linear infinite}
        .dot-grid{
          background-image:radial-gradient(circle,#e2e8f0 1.5px,transparent 1.5px);
          background-size:26px 26px;
        }
        .sub-grid{
          background-image:
            linear-gradient(rgba(220,38,38,.05) 1px,transparent 1px),
            linear-gradient(90deg,rgba(220,38,38,.05) 1px,transparent 1px);
          background-size:48px 48px;
        }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── THREAT TICKER ──────────────────────────────────────────────── */}
      <div className="relative bg-slate-900 py-2.5 sm:py-3 overflow-hidden">
        <div className="absolute left-0 inset-y-0 z-10 flex items-center px-4 sm:px-5 bg-red-600">
          <span className="font-['Barlow_Condensed'] text-[9px] sm:text-[10px] font-black tracking-[0.22em] text-white uppercase whitespace-nowrap">
            LIVE SHIELD
          </span>
        </div>
        <div className="ml-24 sm:ml-32 overflow-hidden">
          <div className="ticker flex gap-8 sm:gap-10 whitespace-nowrap">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 sm:gap-3 shrink-0"
              >
                <span
                  className={`font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.18em] ${t.color}`}
                >
                  [{t.type}]
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] text-slate-400">
                  {t.msg}
                </span>
                <span className="text-slate-700">·</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-0 inset-y-0 w-12 sm:w-16 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
      </div>

      {/* ── CORE SERVICES HEADER ───────────────────────────────────────── */}
      <CoreServicesHeader />

      {/* ── CORE SERVICES CARDS ────────────────────────────────────────── */}
      <CoreServices />

      {/* ── ECOSYSTEM ──────────────────────────────────────────────────── */}
      {/* <Ecosystem /> */}

      {/* ── PRODUCTS ───────────────────────────────────────────────────── */}
      <Products />

      {/* ── WHY BITSS STRIP ────────────────────────────────────────────── */}
      <div className="bg-slate-900 py-12 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-700/30">
            {WHY.map((item) => {
              const IIcon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-slate-900 p-6 sm:p-7 lg:p-8 hover:bg-slate-800 transition-colors"
                >
                  <IIcon
                    size={20}
                    strokeWidth={1.5}
                    className="text-red-500 mb-3 sm:mb-4"
                  />
                  <h4 className="font-['Barlow_Condensed'] text-[16px] sm:text-[17px] font-black text-white mb-1.5 sm:mb-2 tracking-wide">
                    {item.label}
                  </h4>
                  <p className="text-slate-400 text-[13px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BUNDLES ────────────────────────────────────────────────────── */}
      <section
        id="bundles"
        className="relative py-16 sm:py-20 lg:py-24 bg-slate-50 overflow-hidden"
      >
        <div className="sub-grid absolute inset-0" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-12 sm:mb-16">
            <Tag>Bundle Offers</Tag>
            <h2
              className="font-['Barlow_Condensed'] font-black text-slate-900 mt-4 sm:mt-5 mb-3 sm:mb-4 leading-none"
              style={{ fontSize: "clamp(28px,5vw,54px)" }}
            >
              CHOOSE YOUR <span className="text-red-600">COVERAGE</span>
            </h2>
            <p className="text-slate-500 text-[14px] sm:text-[15px] max-w-sm mx-auto leading-relaxed">
              Bundle packages ensure nothing falls through the cracks — at
              better value than buying separately.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-5 sm:gap-6 items-stretch justify-center">
            {BUNDLES.map((b, i) => (
              <BundleCard key={b.name} b={b} i={i} />
            ))}
          </div>

          <p className="text-center mt-6 sm:mt-8 text-[12px] text-slate-400">
            Bundle pricing available on request · Custom enterprise plans
            supported
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10 sm:mb-14">
            <Tag>Customer Stories</Tag>
            <h2
              className="font-['Barlow_Condensed'] font-black text-slate-900 mt-4 leading-none"
              style={{ fontSize: "clamp(26px,4vw,50px)" }}
            >
              TRUSTED BY <span className="text-red-600">BUSINESSES</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-5 sm:p-7 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="font-['Barlow_Condensed'] text-5xl sm:text-6xl text-red-100 font-black leading-none mb-2 sm:mb-3">
                  "
                </div>
                <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed mb-5 sm:mb-6 italic">
                  "{t.q}"
                </p>
                <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-slate-200">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-black text-[10px] sm:text-[11px] font-['Barlow_Condensed'] shrink-0">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-slate-800 text-[13px] font-semibold">
                      {t.name}
                    </div>
                    <div className="text-slate-400 text-[11px]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative py-20 sm:py-24 lg:py-28 bg-slate-900 overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(220,38,38,0.15)_0%,transparent_70%)]" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Start Today
          </span>

          <h2
            className="font-['Barlow_Condensed'] font-black text-white leading-[0.9] mb-5 sm:mb-6"
            style={{ fontSize: "clamp(44px,8vw,96px)" }}
          >
            READY TO
            <br />
            <span className="text-red-500">FIGHT BACK?</span>
          </h2>

          <p className="text-slate-400 text-[14px] sm:text-[16px] leading-relaxed mb-10 sm:mb-12 px-2 sm:px-0">
            Request a free demo and see Bitss in action across all five security
            layers — or get a custom quote for your organization.
          </p>

          <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-10 sm:mb-14">
            <a
              href="mailto:support@bobosohomail.com"
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-[14px] sm:text-[15px] transition-all duration-300 shadow-lg shadow-red-900/40 hover:-translate-y-0.5 w-full xs:w-auto"
            >
              <Zap size={16} /> Request a Demo
            </a>
            <a
              href="tel:+0033666100010"
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-[14px] sm:text-[15px] transition-all duration-300 hover:bg-slate-800 w-full xs:w-auto"
            >
              Talk to an Expert
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-10 border-t border-slate-800">
            {[
              { icon: Mail, label: "Email", value: "support@bobosohomail.com" },
              { icon: Phone, label: "Hotline", value: "+0033666100010" },
              { icon: Clock, label: "Support", value: "24/7 · 365 days" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center mb-1.5 sm:mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Icon size={15} className="text-red-500" />
                  </div>
                </div>
                <div className="font-mono text-[8px] sm:text-[10px] text-slate-500 tracking-widest uppercase mb-1 sm:mb-1.5">
                  {label}
                </div>
                <div className="text-[11px] sm:text-[13px] text-slate-300 font-medium break-all">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
