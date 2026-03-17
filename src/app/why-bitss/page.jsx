"use client";

import { useEffect, useState, useRef } from "react";
import {
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Eye,
  Ban,
  Wifi,
  KeyRound,
  Bug,
  FileWarning,
  UserX,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Server,
  RefreshCw,
  Users,
  Layers,
} from "lucide-react";
import Link from "next/link";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const COMPARISON = [
  {
    others: "Rely on third party security tools",
    bitss: "We built our own security system from scratch",
  },
  {
    others: "Use VPN which can be a security risk",
    bitss: "We use our own IP filtering — no VPN needed",
  },
  {
    others: "Generic protection for all",
    bitss: "Custom built protection managed by our own team",
  },
  {
    others: "Slow to respond to new threats",
    bitss: "We update our system continuously",
  },
  {
    others: "Off the shelf firewall",
    bitss: "Our own internal firewall — we manage it ourselves",
  },
  {
    others: "Basic login protection",
    bitss: "Multiple layers of access control",
  },
  {
    others: "Limited malware detection",
    bitss: "Full malware, rootkit and virus detection built in",
  },
];

const PROTECTIONS = [
  {
    icon: Ban,
    label: "SQL Injection Protection",
    desc: "No matter how hard hackers try to break into our system through forms or login pages — they simply cannot. We make sure your personal details stay yours, always.",
    accent: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
    hoverBorder: "hover:border-red-300",
    dot: "bg-red-500",
  },
  {
    icon: Eye,
    label: "Cross-Site Scripting (XSS) Protection",
    desc: "We automatically stop any harmful programs or codes from entering our system before they even get close to your data.",
    accent: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    hoverBorder: "hover:border-orange-300",
    dot: "bg-orange-500",
  },
  {
    icon: Lock,
    label: "Brute Force Attack Prevention",
    desc: "If someone tries to guess your password again and again — we detect it straight away and block them automatically. You don't have to do anything.",
    accent: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    hoverBorder: "hover:border-amber-300",
    dot: "bg-amber-500",
  },
  {
    icon: Layers,
    label: "Smart Firewall Filtering",
    desc: "Our system knows exactly who is allowed access and who is not. Anyone who is not supposed to be there gets blocked — automatically, instantly, every time.",
    accent: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
    hoverBorder: "hover:border-sky-300",
    dot: "bg-sky-500",
  },
  {
    icon: FileWarning,
    label: "Phishing & Dangerous URL Blocking",
    desc: "If a harmful or fake link tries to reach you through our system — we catch it first and block it before it causes any problem.",
    accent: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    hoverBorder: "hover:border-violet-300",
    dot: "bg-violet-500",
  },
  {
    icon: Bug,
    label: "Rootkit & Virus Detection",
    desc: "Some viruses try to hide deep inside a system without being noticed. Our system finds them and removes them — before they can do any damage.",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    hoverBorder: "hover:border-emerald-300",
    dot: "bg-emerald-500",
  },
  {
    icon: ShieldCheck,
    label: "Malware Protection",
    desc: "Our contact forms and file uploads are fully protected. Spam, junk files and virus attachments are automatically stopped before they reach us.",
    accent: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    hoverBorder: "hover:border-teal-300",
    dot: "bg-teal-500",
  },
  {
    icon: UserX,
    label: "Unauthorized Access Prevention",
    desc: "If your password ever gets leaked — don't worry. Our system has extra locks in place that stop anyone from getting in, even with the right password.",
    accent: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
    hoverBorder: "hover:border-rose-300",
    dot: "bg-rose-500",
  },
  {
    icon: MapPin,
    label: "IP-Based Access Control",
    desc: "Every login is checked and verified. If someone from an unknown location tries to access your account — they are blocked immediately, no exceptions.",
    accent: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    hoverBorder: "hover:border-indigo-300",
    dot: "bg-indigo-500",
  },
  {
    icon: Wifi,
    label: "VPN-Free Secure Architecture",
    desc: "Most companies use generic off-the-shelf security tools. We built ours from scratch — which means stronger protection, faster response, and no weak spots left by others.",
    accent: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
    hoverBorder: "hover:border-cyan-300",
    dot: "bg-cyan-500",
  },
];

const PROMISES = [
  { label: "Built from scratch", sub: "not copied" },
  { label: "Managed by our own team", sub: "not outsourced" },
  { label: "Updated continuously", sub: "not once a year" },
  { label: "Custom built for every layer", sub: "not generic" },
  { label: "No VPN dependency", sub: "no weak spots" },
];

const PILLARS = [
  {
    icon: Server,
    label: "Built In-House",
    desc: "Every component of our security system was designed and built by our own engineers — no third-party dependencies.",
  },
  {
    icon: RefreshCw,
    label: "Continuously Updated",
    desc: "Our system evolves daily. New threats are countered in real time — not patched once a year like off-the-shelf tools.",
  },
  {
    icon: Users,
    label: "Managed by Our Team",
    desc: "A dedicated internal team monitors, maintains and improves the system around the clock. No outsourcing, no gaps.",
  },
  {
    icon: Globe,
    label: "No VPN Required",
    desc: "We use proprietary IP filtering instead of relying on VPN — removing a common attack vector that most companies ignore.",
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

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function Tag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      {children}
    </span>
  );
}

function ProtectionCard({ item, i }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ transitionDelay: `${i * 0.05}s` }}
      className={`relative flex flex-col bg-white rounded-2xl border p-5 sm:p-6 transition-all duration-500
        ${hov ? `border-transparent shadow-xl shadow-slate-200/80 -translate-y-1 ${item.hoverBorder}` : "border-slate-200 shadow-sm"}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-full transition-all duration-300"
        style={{ background: hov ? "currentColor" : "transparent" }}
      />
      <p className="font-mono text-[10px] tracking-widest text-slate-300 mb-3">
        {String(i + 1).padStart(2, "0")}
      </p>
      <div
        className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 transition-all duration-300 ${item.bg} ${hov ? "scale-110" : ""}`}
      >
        <Icon size={20} strokeWidth={1.75} className={item.accent} />
      </div>
      <h3 className="font-['Barlow_Condensed'] text-[18px] sm:text-[20px] font-black text-slate-900 leading-tight mb-2">
        {item.label}
      </h3>
      <p className="text-slate-500 text-[13px] leading-relaxed flex-1">
        {item.desc}
      </p>
      <div className="pt-4 mt-4 border-t border-slate-100">
        <div
          className={`flex items-center gap-2 text-[12px] font-semibold ${item.accent}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${item.dot} animate-pulse`}
          />
          Active protection
        </div>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function WhyBitssPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        html { scroll-behavior: smooth; }
        body { background:#fff; font-family:'DM Sans',sans-serif; overflow-x:hidden; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#f1f5f9; }
        ::-webkit-scrollbar-thumb { background:#dc2626; border-radius:3px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .fu1{animation:fadeUp .6s ease forwards .08s;opacity:0}
        .fu2{animation:fadeUp .6s ease forwards .22s;opacity:0}
        .fu3{animation:fadeUp .6s ease forwards .36s;opacity:0}
        .fu4{animation:fadeUp .6s ease forwards .46s;opacity:0}
        .dot-grid{ background-image:radial-gradient(circle,#e2e8f0 1.5px,transparent 1.5px); background-size:26px 26px; }
        .sub-grid{
          background-image: linear-gradient(rgba(220,38,38,.05) 1px,transparent 1px), linear-gradient(90deg,rgba(220,38,38,.05) 1px,transparent 1px);
          background-size:48px 48px;
        }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_30%,rgba(254,242,242,0.9)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
          <nav className="fu1 flex items-center gap-2 text-[12px] text-slate-400 mb-8">
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-red-500">Why BITSS</span>
          </nav>

          <div className="max-w-3xl">
            <div className="fu1 mb-5">
              <Tag>Why BITSS</Tag>
            </div>
            <h1
              className="fu2 font-['Barlow_Condensed'] font-black leading-[0.88] tracking-tight text-slate-900 mb-6"
              style={{ fontSize: "clamp(48px,8vw,96px)" }}
            >
              WE DON'T FOLLOW.
              <br />
              <span className="text-red-600">OTHERS FOLLOW US.</span>
            </h1>
            <p className="fu3 text-slate-500 text-[16px] sm:text-[18px] leading-relaxed max-w-xl mb-8">
              While others copy — we build. While others rely on third party
              tools — we created our own. BITSS is not just a security product —
              it is a superior security system built from the ground up.
            </p>
            <div className="fu4 flex flex-col xs:flex-row gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-[14px] transition-all duration-200 shadow-sm shadow-red-200 hover:shadow-red-300 hover:-translate-y-0.5 w-full xs:w-auto"
              >
                <Zap size={15} /> Get Protected
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-semibold text-[14px] transition-all duration-200 hover:bg-slate-50 w-full xs:w-auto"
              >
                See All Protections <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS STRIP ──────────────────────────────────────────────── */}
      <div className="bg-slate-900 py-12 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-700/30">
            {PILLARS.map((item) => {
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

      {/* ── COMPARISON TABLE ───────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-slate-50 overflow-hidden">
        <div className="sub-grid absolute inset-0" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-12 sm:mb-16">
            <Tag>The Difference</Tag>
            <h2
              className="font-['Barlow_Condensed'] font-black text-slate-900 mt-4 sm:mt-5 mb-3 leading-none"
              style={{ fontSize: "clamp(28px,5vw,54px)" }}
            >
              WHY BITSS IS <span className="text-red-600">SUPERIOR</span>
            </h2>
            <p className="text-slate-500 text-[14px] sm:text-[15px] max-w-sm mx-auto leading-relaxed">
              Side by side — what the industry does vs what we built.
            </p>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3">
            <div className="bg-slate-200 rounded-xl px-5 py-3 text-center">
              <span className="font-['Barlow_Condensed'] text-[13px] sm:text-[14px] font-black text-slate-500 tracking-wide uppercase">
                What Others Do
              </span>
            </div>
            <div className="bg-red-600 rounded-xl px-5 py-3 text-center">
              <span className="font-['Barlow_Condensed'] text-[13px] sm:text-[14px] font-black text-white tracking-wide uppercase">
                ✅ What BITSS Does
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-2 sm:gap-3">
            {COMPARISON.map((row, i) => (
              <ComparisonRow key={i} row={row} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROTECTIONS GRID ───────────────────────────────────────────── */}
      <section
        id="protections"
        className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
      >
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
            <div>
              <Tag>Your Safety is Our Priority</Tag>
              <h2
                className="font-['Barlow_Condensed'] font-black text-slate-900 mt-4 leading-none"
                style={{ fontSize: "clamp(28px,5vw,54px)" }}
              >
                10 LAYERS OF <span className="text-red-600">PROTECTION</span>
              </h2>
            </div>
            <p className="text-slate-500 text-[14px] max-w-xs sm:max-w-sm leading-relaxed">
              Every attack vector covered — from SQL injections to hidden
              rootkits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
            {PROTECTIONS.map((item, i) => (
              <ProtectionCard key={item.label} item={item} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROMISE ────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(220,38,38,0.12)_0%,transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <Tag>The BITSS Promise</Tag>
          <h2
            className="font-['Barlow_Condensed'] font-black text-white mt-4 sm:mt-5 mb-4 leading-none"
            style={{ fontSize: "clamp(28px,5vw,54px)" }}
          >
            YOUR DATA IS SAFE —{" "}
            <span className="text-red-500">NOT BECAUSE WE SAY SO.</span>
          </h2>
          <p className="text-slate-400 text-[14px] sm:text-[15px] leading-relaxed mb-12 max-w-lg mx-auto">
            Because we built the system that makes it so.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16">
            {PROMISES.map((p, i) => (
              <PromiseCard key={i} p={p} i={i} />
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
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
        </div>
      </section>
    </>
  );
}

// ─── COMPARISON ROW ───────────────────────────────────────────────────────────

function ComparisonRow({ row, i }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${i * 0.06}s` }}
      className={`grid grid-cols-2 gap-3 sm:gap-4 transition-all duration-500
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      {/* Others */}
      <div className="flex items-center gap-3 bg-white rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 border border-slate-200 shadow-sm">
        <span className="text-slate-300 text-[16px] shrink-0">✗</span>
        <p className="text-slate-500 text-[12px] sm:text-[13px] leading-snug">
          {row.others}
        </p>
      </div>
      {/* BITSS */}
      <div className="flex items-center gap-3 bg-red-50 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 border border-red-100 shadow-sm">
        <span className="text-red-500 text-[16px] shrink-0">✓</span>
        <p className="text-slate-700 text-[12px] sm:text-[13px] font-medium leading-snug">
          {row.bitss}
        </p>
      </div>
    </div>
  );
}

// ─── PROMISE CARD ─────────────────────────────────────────────────────────────

function PromiseCard({ p, i }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${i * 0.08}s` }}
      className={`flex items-start gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 rounded-2xl px-5 py-4 text-left transition-all duration-300
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <CheckCircle2 size={18} className="text-red-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-white font-semibold text-[13px] sm:text-[14px] leading-snug">
          {p.label}
        </p>
        <p className="text-slate-500 text-[11px] sm:text-[12px] mt-0.5">
          — {p.sub}
        </p>
      </div>
    </div>
  );
}
