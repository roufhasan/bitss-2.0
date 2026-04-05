"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Lock,
  MailX,
  ScanLine,
  MonitorSmartphone,
  Usb,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  Server,
  ChevronRight,
  Shield,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Products from "@/components/pages/home/Products";
import Link from "next/link";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "wap",
    short: "WAP Protect",
    name: "Bitss WAP Protect",
    tag: "Web Admin & Portal",
    icon: Lock,
    accent: "#DC2626",
    accentText: "text-red-600",
    accentBg: "bg-red-50",
    accentDot: "bg-red-500",
    accentBtn: "text-red-600 hover:text-red-700",
    iconBg: "bg-red-100",
    layer: "Web Layer",
    layerClass: "bg-red-50 text-red-600 border-red-100",
    hoverBorder: "hover:border-red-300",
    desc: "Login enforcement, admin-zone hardening, database administration firewall, and proactive protection for your website control layer.",
    features: [
      "Login brute-force prevention",
      "Admin zone lockdown",
      "DB admin firewall",
      "Proactive threat blocking",
    ],
  },
  {
    id: "contact",
    short: "Contact Shield",
    name: "Bitss C",
    tag: "Form Protection",
    icon: MailX,
    accent: "#EA580C",
    accentText: "text-orange-600",
    accentBg: "bg-orange-50",
    accentDot: "bg-orange-500",
    accentBtn: "text-orange-600 hover:text-orange-700",
    iconBg: "bg-orange-100",
    layer: "Web Layer",
    layerClass: "bg-orange-50 text-orange-600 border-orange-100",
    hoverBorder: "hover:border-orange-300",
    desc: "A dedicated shield for your website contact page — blocks malware payloads, virus uploads, and malicious form submissions before they reach your server.",
    features: [
      "Payload scanning on submit",
      "Malware signature detection",
      "Bot & spam filtering",
      "Clean submission guarantee",
    ],
  },
  {
    id: "vwar-web",
    short: "VWAR Web",
    name: "Bitss VWAR Web",
    tag: "Server-Side Defense",
    icon: ScanLine,
    accent: "#D97706",
    accentText: "text-amber-600",
    accentBg: "bg-amber-50",
    accentDot: "bg-amber-500",
    accentBtn: "text-amber-600 hover:text-amber-700",
    iconBg: "bg-amber-100",
    layer: "Server Layer",
    layerClass: "bg-amber-50 text-amber-700 border-amber-100",
    hoverBorder: "hover:border-amber-300",
    desc: "Server-side malware and virus scanning with real-time threat blocking for your website files and database. Keeps your hosting environment clean.",
    features: [
      "Deep file system scanning",
      "Database integrity checks",
      "Real-time threat blocking",
      "Quarantine & reporting",
    ],
  },
  {
    id: "vwar-win",
    short: "VWAR Windows",
    name: "Bitss VWAR Windows",
    tag: "Endpoint Protection",
    icon: MonitorSmartphone,
    accent: "#0284C7",
    accentText: "text-sky-600",
    accentBg: "bg-sky-50",
    accentDot: "bg-sky-500",
    accentBtn: "text-sky-600 hover:text-sky-700",
    iconBg: "bg-sky-100",
    layer: "Endpoint Layer",
    layerClass: "bg-sky-50 text-sky-600 border-sky-100",
    hoverBorder: "hover:border-sky-300",
    desc: "Real-time malware and virus protection for Windows laptops and desktops. Constant background defense for every device in your organization.",
    features: [
      "Real-time process monitoring",
      "Behavioral threat detection",
      "Lightweight background agent",
      "Instant quarantine & alerts",
    ],
  },
  {
    id: "usb",
    short: "USB Protect",
    name: "Bitss USB Protect",
    tag: "Removable Media",
    icon: Usb,
    accent: "#059669",
    accentText: "text-emerald-600",
    accentBg: "bg-emerald-50",
    accentDot: "bg-emerald-500",
    accentBtn: "text-emerald-600 hover:text-emerald-700",
    iconBg: "bg-emerald-100",
    layer: "Media Layer",
    layerClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
    hoverBorder: "hover:border-emerald-300",
    desc: "Auto-scans and sanitizes USB storage keys the moment they are plugged in — preventing infected drives from spreading malware across your network.",
    features: [
      "Auto-scan on plug-in",
      "Malware removal before access",
      "Drive health reporting",
      "Policy-based USB control",
    ],
  },
];

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

const STATS = [
  { v: "500K+", l: "Endpoints Protected" },
  { v: "99.9%", l: "Detection Rate" },
  { v: "< 1ms", l: "Response Time" },
  { v: "24/7", l: "Monitoring" },
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

function Tag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      {children}
    </span>
  );
}

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
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_30%,rgba(254,242,242,0.9)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 min-h-[calc(100vh-64px)] flex items-center">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
            {/* LEFT */}
            <div className="order-2 lg:order-1">
              <div className="fu1 mb-5 sm:mb-6">
                <Tag>Enterprise Cybersecurity Platform</Tag>
              </div>

              <h1
                className="fu2 font-['Barlow_Condensed'] font-black leading-[0.88] tracking-tight mb-5 sm:mb-6"
                style={{ fontSize: "clamp(44px,8vw,88px)" }}
              >
                <span className="block text-slate-900">DEFEND</span>
                <span className="block text-red-600">EVERY</span>
                <span className="block text-slate-900">ENTRY POINT.</span>
              </h1>

              <p className="fu3 text-slate-500 text-[15px] sm:text-[17px] leading-relaxed max-w-[480px] mb-8 sm:mb-10">
                Bitss secures your business across every attack surface —
                website login, admin layer, contact forms, Windows devices, and
                USB storage.{" "}
                <strong className="text-slate-700 font-semibold">
                  One ecosystem. Full chain.
                </strong>
              </p>

              <div className="fu4 flex flex-col xs:flex-row flex-wrap gap-3 mb-10 sm:mb-14">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-[15px] transition-all duration-300 shadow-lg shadow-red-200 hover:shadow-red-300 hover:-translate-y-0.5 w-full xs:w-auto"
                >
                  <ShieldCheck size={17} /> Get Protected
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 font-semibold text-[15px] transition-all duration-300 hover:bg-slate-50 w-full xs:w-auto"
                >
                  Explore Products <ArrowRight size={15} />
                </Link>
              </div>

              {/* Stats */}
              <div className="fu5 grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                {STATS.map((s) => (
                  <div
                    key={s.l}
                    className="bg-white px-3 sm:px-4 py-3 sm:py-4 text-center"
                  >
                    <div className="font-['Barlow_Condensed'] text-[20px] sm:text-[22px] font-black text-slate-900 leading-none">
                      {s.v}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 leading-tight">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — orbital visual, hidden on mobile, shown md+ */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              {/* Mobile: simple product icon grid instead of orbital */}
              <div className="lg:hidden w-full">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-white shadow-2xl shadow-red-100 border border-red-100 flex items-center justify-center">
                    <ShieldCheck
                      size={42}
                      strokeWidth={1.25}
                      className="text-red-600"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
                  {PRODUCTS.map((p) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={p.id}
                        className="flex flex-col items-center gap-1"
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${p.iconBg}`}
                        >
                          <Icon
                            size={17}
                            strokeWidth={1.75}
                            style={{ color: p.accent }}
                          />
                        </div>
                        <span className="text-[8px] text-slate-400 text-center leading-tight font-medium">
                          {p.short.split(" ")[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Status badges row on mobile */}
                <div className="flex gap-3 justify-center mt-5">
                  <div className="bg-white rounded-xl px-3 py-2 shadow-md border border-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-semibold text-emerald-600">
                      All shields active
                    </span>
                  </div>
                  <div className="bg-white rounded-xl px-3 py-2 shadow-md border border-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-red-600">
                      0 threats
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop orbital */}
              <div className="hidden lg:flex relative items-center justify-center h-[460px] w-full">
                <div className="spin-cw  absolute w-[360px] h-[360px] rounded-full border border-dashed border-red-200" />
                <div className="spin-ccw absolute w-[288px] h-[288px] rounded-full border border-slate-200" />
                <div className="absolute w-[420px] h-[420px] rounded-full border border-red-50" />
                <div className="absolute w-36 h-36 rounded-full bg-red-50/60 blur-3xl" />

                <div className="shield-float relative z-10 flex items-center justify-center w-24 h-24 rounded-3xl bg-white shadow-2xl shadow-red-100 border border-red-100">
                  <ShieldCheck
                    size={50}
                    strokeWidth={1.25}
                    className="text-red-600"
                  />
                </div>

                {PRODUCTS.map((p, i) => {
                  const angle = (i / PRODUCTS.length) * 360 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const r = 162;
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.id}
                      className="absolute z-10"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(calc(-50% + ${Math.cos(rad) * r}px),calc(-50% + ${Math.sin(rad) * r}px))`,
                      }}
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm border border-white ${p.iconBg}`}
                        >
                          <Icon
                            size={19}
                            strokeWidth={1.75}
                            style={{ color: p.accent }}
                          />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-400 whitespace-nowrap">
                          {p.short}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="absolute -right-2 top-14 bg-white rounded-xl px-4 py-2.5 shadow-xl shadow-slate-200/80 border border-slate-100">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />{" "}
                    All shields active
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    5/5 layers online
                  </div>
                </div>
                <div className="absolute -left-2 bottom-20 bg-white rounded-xl px-4 py-2.5 shadow-xl shadow-slate-200/80 border border-slate-100">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-red-600">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />{" "}
                    0 threats detected
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    Last scan: just now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* ── ECOSYSTEM ──────────────────────────────────────────────────── */}
      <section
        id="ecosystem"
        className="relative py-16 sm:py-20 lg:py-24 bg-slate-50 overflow-hidden"
      >
        <div className="sub-grid absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-12 sm:mb-16">
            <Tag>The Bitss Ecosystem</Tag>
            <h2
              className="font-['Barlow_Condensed'] font-black text-slate-900 mt-4 sm:mt-5 mb-3 sm:mb-4 leading-none"
              style={{ fontSize: "clamp(30px,5vw,58px)" }}
            >
              ONE ECOSYSTEM. <span className="text-red-600">FULL CHAIN.</span>
            </h2>
            <p className="text-slate-500 text-[14px] sm:text-[15px] max-w-lg mx-auto leading-relaxed px-4">
              Bitss covers every entry point attackers exploit — from your
              website login to the USB stick an employee just plugged in.
            </p>
          </div>

          {/* Chain — scrollable on mobile */}
          <div className="mb-12 sm:mb-16 -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto">
            <div className="flex items-center min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center gap-y-4 mx-auto pb-2 sm:pb-0">
              {PRODUCTS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={p.id} className="flex items-center">
                    <div
                      className={`flex flex-col items-center gap-2 px-4 sm:px-5 py-4 sm:py-5 w-[100px] sm:min-w-[112px] text-center bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                    >
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${p.iconBg}`}
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.75}
                          style={{ color: p.accent }}
                        />
                      </div>
                      <span className="font-['Barlow_Condensed'] text-[12px] sm:text-[13px] font-bold text-slate-800 leading-tight">
                        {p.short}
                      </span>
                      <span
                        className={`text-[8px] sm:text-[9px] font-semibold tracking-widest uppercase ${p.accentText}`}
                      >
                        {p.layer}
                      </span>
                    </div>
                    {i < PRODUCTS.length - 1 && (
                      <div className="flex items-center px-1.5 sm:px-2">
                        <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-red-300 to-slate-200" />
                        <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-red-300 rotate-45 -ml-1" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3 pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Globe,
                label: "Web-to-Server",
                desc: "Full coverage from public-facing login pages down to the database layer.",
                bg: "bg-red-50",
                color: "text-red-600",
              },
              {
                icon: Zap,
                label: "Real-Time Response",
                desc: "Every product detects and blocks threats the moment they appear — zero delays.",
                bg: "bg-amber-50",
                color: "text-amber-600",
              },
              {
                icon: ShieldCheck,
                label: "Endpoint-to-Media",
                desc: "Windows devices and USB drives covered so no offline vector goes unguarded.",
                bg: "bg-sky-50",
                color: "text-sky-600",
              },
            ].map((item) => {
              const IIcon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-4 sm:mb-5 ${item.bg}`}
                  >
                    <IIcon
                      size={20}
                      strokeWidth={1.75}
                      className={item.color}
                    />
                  </div>
                  <h4 className="font-['Barlow_Condensed'] text-[17px] sm:text-[19px] font-black text-slate-900 mb-2">
                    {item.label}
                  </h4>
                  <p className="text-slate-500 text-[13px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
