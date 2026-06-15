"use client";

import { useState, useEffect, useRef } from "react";
import {
  Globe,
  Bug,
  Lock,
  Server,
  MailX,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  Shield,
  CheckCircle2,
  Usb,
} from "lucide-react";
import Link from "next/link";
import CTA from "@/components/shared/CTA";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const TOPICS = [
  {
    label: "Website Security",
    href: "/security-academy/website-security",
    icon: Globe,
    accent: "#DC2626",
    iconBg: "bg-red-100",
    accentText: "text-red-600",
    hoverBorder: "hover:border-red-300",
    desc: "Login protection, admin hardening, firewalls, and WordPress security.",
    articles: 5,
  },
  {
    label: "Malware Protection",
    href: "/security-academy/malware-protection",
    icon: Bug,
    accent: "#EA580C",
    iconBg: "bg-orange-100",
    accentText: "text-orange-600",
    hoverBorder: "hover:border-orange-300",
    desc: "How malware infects sites, scanning techniques, and removal strategies.",
    articles: 5,
  },
  {
    label: "Ransomware Defense",
    href: "/security-academy/ransomware-defense",
    icon: Lock,
    accent: "#D97706",
    iconBg: "bg-amber-100",
    accentText: "text-amber-600",
    hoverBorder: "hover:border-amber-300",
    desc: "How ransomware spreads, prevention strategies, and business protection.",
    articles: 5,
  },
  {
    label: "Server Security",
    href: "/security-academy/server-security",
    icon: Server,
    accent: "#0284C7",
    iconBg: "bg-sky-100",
    accentText: "text-sky-600",
    hoverBorder: "hover:border-sky-300",
    desc: "Firewalls, SSH hardening, DNS protection, and Linux server lockdown.",
    articles: 5,
  },
  {
    label: "Spam Protection",
    href: "/security-academy/spam-protection",
    icon: MailX,
    accent: "#7C3AED",
    iconBg: "bg-violet-100",
    accentText: "text-violet-600",
    hoverBorder: "hover:border-violet-300",
    desc: "Bot detection, CAPTCHA vs AI protection, and form spam defense.",
    articles: 5,
  },
  {
    label: "Security Basics",
    href: "/security-academy/security-basics",
    icon: BookOpen,
    accent: "#059669",
    iconBg: "bg-emerald-100",
    accentText: "text-emerald-600",
    hoverBorder: "hover:border-emerald-300",
    desc: "Core concepts — firewalls, attack types, zero days, and how hackers work.",
    articles: 5,
  },
];

const PRODUCTS = [
  {
    name: "Bitss WAP",
    full: "Web Admin Protection",
    icon: ShieldCheck,
    iconBg: "bg-red-100",
    accent: "#DC2626",
    accentText: "text-red-600",
    desc: "Monitors login activity, filters suspicious IPs, and blocks automated brute-force attempts on admin panels.",
    points: [
      "Login brute-force prevention",
      "Suspicious IP filtering",
      "Admin zone lockdown",
    ],
  },
  {
    name: "Bitss VWAR",
    full: "Malware & Ransomware Defense",
    icon: Bug,
    iconBg: "bg-orange-100",
    accent: "#EA580C",
    accentText: "text-orange-600",
    desc: "Detects malicious software through file analysis, behavioral monitoring, and threat intelligence — isolating threats before they spread.",
    points: [
      "File & behavior analysis",
      "Threat isolation & quarantine",
      "Ransomware signature detection",
    ],
  },
  {
    name: "Bitss C",
    full: "Contact Form & Bot Protection",
    icon: MailX,
    iconBg: "bg-amber-100",
    accent: "#D97706",
    accentText: "text-amber-600",
    desc: "Analyzes submission behavior to identify bots, blocking spam and malicious payloads before they reach your server.",
    points: [
      "Bot submission blocking",
      "Malicious payload filtering",
      "Spam prevention",
    ],
  },
  {
    name: "Bitss DNS/IP",
    full: "Server Access Control",
    icon: Server,
    iconBg: "bg-sky-100",
    accent: "#0284C7",
    accentText: "text-sky-600",
    desc: "Monitors incoming connections and verifies request origins — blocking unauthorized access before it reaches critical infrastructure.",
    points: [
      "Connection origin verification",
      "Unauthorized access blocking",
      "Intrusion prevention",
    ],
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

function TopicCard({ t, i }) {
  const [ref, inView] = useInView();
  const Icon = t.icon;
  return (
    <Link
      ref={ref}
      href={t.href}
      style={{ transitionDelay: `${i * 0.06}s` }}
      className={`group relative flex flex-col bg-white rounded-2xl border border-slate-200 ${t.hoverBorder} p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: t.accent }}
      />

      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl ${t.iconBg} flex items-center justify-center`}
        >
          <Icon size={20} strokeWidth={1.75} style={{ color: t.accent }} />
        </div>
        <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
          {t.articles} articles
        </span>
      </div>

      <h3 className="font-['Barlow_Condensed'] text-[20px] font-black text-slate-900 mb-2 leading-tight">
        {t.label}
      </h3>
      <p className="text-slate-500 text-[13px] leading-relaxed flex-1 mb-4">
        {t.desc}
      </p>

      <div
        className={`inline-flex items-center gap-1.5 text-[12px] font-semibold ${t.accentText} transition-colors`}
      >
        Read articles{" "}
        <ChevronRight
          size={13}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </div>
    </Link>
  );
}

function ProductCard({ p, i }) {
  const [ref, inView] = useInView();
  const Icon = p.icon;
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${i * 0.08}s` }}
      className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-10 h-10 rounded-xl ${p.iconBg} flex items-center justify-center shrink-0`}
        >
          <Icon size={18} strokeWidth={1.75} style={{ color: p.accent }} />
        </div>
        <div>
          <h3 className="font-['Barlow_Condensed'] text-[18px] font-black text-slate-900 leading-tight">
            {p.name}
          </h3>
          <p
            className={`text-[10px] font-semibold uppercase tracking-wide ${p.accentText}`}
          >
            {p.full}
          </p>
        </div>
      </div>
      <p className="text-slate-500 text-[13px] leading-relaxed mb-4">
        {p.desc}
      </p>
      <ul className="space-y-1.5">
        {p.points.map((pt) => (
          <li
            key={pt}
            className="flex items-center gap-2 text-[12px] text-slate-600"
          >
            <CheckCircle2
              size={12}
              strokeWidth={2}
              style={{ color: p.accent }}
              className="shrink-0"
            />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function SecurityAcademyPage() {
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

      {/* ── HERO ── */}
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
            <span className="text-red-500">Security Academy</span>
          </nav>

          <div className="max-w-3xl">
            <div className="fu1 mb-5">
              <Tag>Free Resource</Tag>
            </div>
            <h1
              className="fu2 font-['Barlow_Condensed'] font-black leading-[0.88] tracking-tight text-slate-900 mb-6"
              style={{ fontSize: "clamp(48px,8vw,88px)" }}
            >
              SECURITY
              <br />
              <span className="text-red-600">ACADEMY</span>
            </h1>
            <p className="fu3 text-slate-500 text-[16px] sm:text-[18px] leading-relaxed max-w-xl mb-8">
              Free cybersecurity guides written for business owners — covering
              every attack surface from website login pages to server
              infrastructure.
            </p>
            <div className="fu4 flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-2 text-[13px] text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 6
                topics
              </span>
              <span className="flex items-center gap-2 text-[13px] text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 30
                articles
              </span>
              <span className="flex items-center gap-2 text-[13px] text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                Always free
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOPICS GRID ── */}
      <section className="relative bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="sub-grid absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-10 sm:mb-14">
            <Tag>Browse Topics</Tag>
            <h2
              className="font-['Barlow_Condensed'] font-black text-slate-900 mt-4 leading-none"
              style={{ fontSize: "clamp(28px,5vw,52px)" }}
            >
              CHOOSE YOUR <span className="text-red-600">TOPIC</span>
            </h2>
            <p className="text-slate-500 text-[14px] mt-3 max-w-md leading-relaxed">
              Each topic covers a specific attack surface with practical,
              authoritative guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOPICS.map((t, i) => (
              <TopicCard key={t.label} t={t} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW BITSS PROTECTS ── */}
      <section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Intro */}
          <div className="max-w-3xl mb-14 sm:mb-18">
            <Tag>How Bitss Protects Against This</Tag>
            <h2
              className="font-['Barlow_Condensed'] font-black text-slate-900 mt-4 mb-5 leading-none"
              style={{ fontSize: "clamp(28px,5vw,52px)" }}
            >
              PROACTIVE DEFENSE.{" "}
              <span className="text-red-600">EVERY LAYER.</span>
            </h2>
            <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed mb-4">
              Cyber threats described across this academy are part of the daily
              reality of the modern internet. Automated attack systems
              continuously scan websites, servers, and networks looking for
              vulnerabilities they can exploit.
            </p>
            <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed mb-4">
              At Bitss, we design cybersecurity technologies specifically to
              detect, block, and neutralize these types of threats before they
              can cause damage. Our security systems focus on proactive
              protection rather than simply reacting after an attack has already
              occurred.
            </p>
            <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed">
              By monitoring behavior patterns, filtering malicious traffic, and
              detecting abnormal system activity, Bitss solutions help prevent
              attacks at the earliest stages.
            </p>
          </div>

          {/* Product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.name} p={p} i={i} />
            ))}
          </div>

          {/* Layered defense callout */}
          <div className="relative rounded-3xl bg-slate-900 overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_0%_50%,rgba(220,38,38,0.10)_0%,transparent_70%)]" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-3">
                  A Layered Security Approach
                </p>
                <h3
                  className="font-['Barlow_Condensed'] font-black text-white leading-tight mb-4"
                  style={{ fontSize: "clamp(24px,4vw,42px)" }}
                >
                  ONE ECOSYSTEM.{" "}
                  <span className="text-red-500">FULL CHAIN.</span>
                </h3>
                <p className="text-slate-400 text-[14px] sm:text-[15px] leading-relaxed">
                  Cybersecurity threats rarely rely on a single attack method.
                  Most successful compromises occur when multiple
                  vulnerabilities are exploited together. Bitss security
                  technologies operate as a layered defense system — login
                  protection, malware detection, traffic filtering, and
                  behavioral monitoring working together to reduce your attack
                  surface.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: Shield,
                    label: "Login Protection",
                    desc: "Admin & portal hardening",
                  },
                  {
                    icon: Bug,
                    label: "Malware Detection",
                    desc: "File & behavior scanning",
                  },
                  {
                    icon: ShieldCheck,
                    label: "Traffic Filtering",
                    desc: "Block before it arrives",
                  },
                  {
                    icon: Usb,
                    label: "Media Control",
                    desc: "USB & removable devices",
                  },
                ].map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-colors"
                  >
                    <Icon
                      size={16}
                      className="text-red-400 mb-2"
                      strokeWidth={1.75}
                    />
                    <p className="text-[12px] font-semibold text-white mb-0.5">
                      {label}
                    </p>
                    <p className="text-[11px] text-slate-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
