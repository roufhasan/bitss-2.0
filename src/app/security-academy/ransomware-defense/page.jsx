"use client";

import { useState, useEffect, useRef } from "react";
import {
  Lock,
  Cpu,
  ShieldOff,
  Network,
  Building2,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import CTA from "@/components/shared/CTA";

const SECTIONS = [
  {
    id: "what-is-ransomware",
    num: "01",
    title: "What is Ransomware",
    icon: Lock,
    accent: "#DC2626",
    accentText: "text-red-600",
    accentBg: "bg-red-50",
    iconBg: "bg-red-100",
    accentDot: "bg-red-500",
    accentBorder: "border-red-200",
    calloutLabel: "Definition",
    callout:
      "Ransomware encrypts your files and locks your systems — then demands cryptocurrency payment before restoring access.",
    body: [
      "Ransomware is a form of malware designed to block access to systems or encrypt files until a ransom payment is made.",
      "Once ransomware infects a system, attackers typically demand payment in cryptocurrency in exchange for the decryption key.",
      "Ransomware attacks can cause significant operational disruption and financial loss for businesses and organizations.",
    ],
    bullets: [
      "File & system encryption",
      "Cryptocurrency ransom demands",
      "Operational disruption",
      "Data loss risk",
    ],
  },
  {
    id: "how-ransomware-works",
    num: "02",
    title: "How Ransomware Attacks Work",
    icon: Cpu,
    accent: "#EA580C",
    accentText: "text-orange-600",
    accentBg: "bg-orange-50",
    iconBg: "bg-orange-100",
    accentDot: "bg-orange-500",
    accentBorder: "border-orange-200",
    calloutLabel: "Attack Chain",
    callout:
      "Ransomware moves fast — from initial entry to full file encryption can happen in under an hour on an unprotected system.",
    body: [
      "Ransomware typically enters systems through phishing emails, malicious downloads, or compromised network access.",
      "Once installed, the ransomware begins encrypting files and disabling system functions.",
      "Attackers then display a ransom message demanding payment in exchange for restoring access to the encrypted data.",
    ],
    bullets: [
      "Phishing email delivery",
      "Malicious file downloads",
      "Compromised remote access",
      "Rapid file encryption",
    ],
  },
  {
    id: "prevention-strategies",
    num: "03",
    title: "Ransomware Prevention Strategies",
    icon: ShieldOff,
    accent: "#D97706",
    accentText: "text-amber-600",
    accentBg: "bg-amber-50",
    iconBg: "bg-amber-100",
    accentDot: "bg-amber-500",
    accentBorder: "border-amber-200",
    calloutLabel: "Best Practice",
    callout:
      "Regular offline backups are the single most effective ransomware countermeasure — no backup, no recovery without paying.",
    body: [
      "Preventing ransomware requires a combination of security strategies including regular data backups, malware detection systems, restricted access controls, and security awareness training.",
      "Systems should be regularly updated and monitored to prevent attackers from exploiting vulnerabilities.",
    ],
    bullets: [
      "Regular offline data backups",
      "Real-time malware detection",
      "Restricted access controls",
      "Security awareness training",
    ],
  },
  {
    id: "how-ransomware-spreads",
    num: "04",
    title: "How Ransomware Spreads",
    icon: Network,
    accent: "#0284C7",
    accentText: "text-sky-600",
    accentBg: "bg-sky-50",
    iconBg: "bg-sky-100",
    accentDot: "bg-sky-500",
    accentBorder: "border-sky-200",
    calloutLabel: "Lateral Movement",
    callout:
      "Once inside one machine, ransomware scans your network for shared drives and admin credentials to infect every connected system.",
    body: [
      "Ransomware often spreads across networks through shared file systems, administrative credentials, and remote access services.",
      "Once an initial infection occurs, the malware attempts to move laterally through the network, infecting additional systems.",
      "Network segmentation and access control policies can significantly limit the spread of ransomware.",
    ],
    bullets: [
      "Shared file system traversal",
      "Credential harvesting",
      "Remote access exploitation",
      "Network segmentation defense",
    ],
  },
  {
    id: "protecting-businesses",
    num: "05",
    title: "Protecting Businesses from Ransomware",
    icon: Building2,
    accent: "#059669",
    accentText: "text-emerald-600",
    accentBg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    accentDot: "bg-emerald-500",
    accentBorder: "border-emerald-200",
    calloutLabel: "Business Priority",
    callout:
      "Rapid response is as critical as prevention — organizations with an incident response plan recover significantly faster after an attack.",
    body: [
      "Businesses must adopt proactive cybersecurity practices to defend against ransomware attacks.",
      "These practices include regular system backups, endpoint protection, access control monitoring, and network security analysis.",
      "Preparedness and rapid response are critical in minimizing the impact of ransomware incidents.",
    ],
    bullets: [
      "Endpoint protection deployment",
      "Access control monitoring",
      "Network security analysis",
      "Incident response planning",
    ],
  },
];

const OTHER_TOPICS = [
  { label: "Website Security", href: "/security-academy/website-security" },
  { label: "Malware Protection", href: "/security-academy/malware-protection" },
  { label: "Server Security", href: "/security-academy/server-security" },
  { label: "Spam Protection", href: "/security-academy/spam-protection" },
  { label: "Security Basics", href: "/security-academy/security-basics" },
];

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

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);
  return active;
}

function Tag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      {children}
    </span>
  );
}

function SectionBlock({ s, index }) {
  const [ref, inView] = useInView();
  const Icon = s.icon;
  return (
    <div
      id={s.id}
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start gap-4 mb-6">
        <div
          className={`shrink-0 w-12 h-12 rounded-2xl ${s.iconBg} flex items-center justify-center`}
        >
          <Icon size={22} strokeWidth={1.75} style={{ color: s.accent }} />
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-widest text-slate-300 mb-1">
            {s.num}
          </p>
          <h2
            className="font-['Barlow_Condensed'] font-black text-slate-900 leading-tight"
            style={{ fontSize: "clamp(22px,3.5vw,34px)" }}
          >
            {s.title}
          </h2>
        </div>
      </div>

      <div
        className={`flex gap-3 p-4 rounded-2xl border ${s.accentBg} ${s.accentBorder} mb-6`}
      >
        <div className={`shrink-0 mt-1 w-1 rounded-full ${s.accentDot}`} />
        <div>
          <p
            className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${s.accentText}`}
          >
            {s.calloutLabel}
          </p>
          <p className="text-slate-700 text-[13px] leading-relaxed font-medium">
            {s.callout}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {s.body.map((para, i) => (
          <p key={i} className="text-slate-600 text-[15px] leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Key Defenses
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {s.bullets.map((b) => (
            <li
              key={b}
              className="flex items-center gap-2.5 text-[13px] text-slate-600"
            >
              <CheckCircle2
                size={14}
                strokeWidth={2}
                style={{ color: s.accent }}
                className="shrink-0"
              />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function RansomwareDefensePage() {
  const sectionIds = SECTIONS.map((s) => s.id);
  const activeSection = useActiveSection(sectionIds);
  const scrollTo = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24">
          <nav className="fu1 flex items-center gap-2 text-[12px] text-slate-400 mb-8">
            <a href="/" className="hover:text-slate-600 transition-colors">
              Home
            </a>
            <ChevronRight size={12} />
            <a
              href="/security-academy"
              className="hover:text-slate-600 transition-colors"
            >
              Security Academy
            </a>
            <ChevronRight size={12} />
            <span className="text-red-500">Ransomware Defense</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
            <div>
              <div className="fu1 mb-5">
                <Tag>Security Academy</Tag>
              </div>
              <h1
                className="fu2 font-['Barlow_Condensed'] font-black leading-[0.88] tracking-tight text-slate-900 mb-5"
                style={{ fontSize: "clamp(44px,7vw,80px)" }}
              >
                RANSOMWARE
                <br />
                <span className="text-red-600">DEFENSE</span>
              </h1>
              <p className="fu3 text-slate-500 text-[15px] sm:text-[16px] leading-relaxed max-w-md">
                Learn how ransomware enters your systems, how it spreads, and
                the strategies your business needs to prevent and survive an
                attack.
              </p>
            </div>

            <div className="fu3 grid grid-cols-1 gap-2">
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-left transition-all duration-200 group shadow-sm"
                  >
                    <span className="font-mono text-[10px] text-slate-300 w-5 shrink-0">
                      {s.num}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0`}
                    >
                      <Icon size={13} style={{ color: s.accent }} />
                    </div>
                    <span className="text-[13px] text-slate-600 group-hover:text-slate-900 transition-colors font-medium flex-1">
                      {s.title}
                    </span>
                    <ChevronRight
                      size={13}
                      className="text-slate-300 group-hover:text-red-500 transition-colors shrink-0"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="relative bg-slate-50">
        <div className="sub-grid absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-18 lg:py-20">
          <div className="lg:grid lg:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr] gap-12 lg:gap-16 items-start">
            {/* Sticky Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">
                  In This Guide
                </p>
                <nav className="flex flex-col gap-1">
                  {SECTIONS.map((s) => {
                    const isActive = activeSection === s.id;
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${isActive ? "bg-white shadow-sm border border-slate-100" : "hover:bg-white/60"}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? s.iconBg : "bg-slate-100 group-hover:bg-slate-200"}`}
                        >
                          <Icon
                            size={12}
                            style={{ color: isActive ? s.accent : "#94a3b8" }}
                          />
                        </div>
                        <span
                          className={`text-[12px] font-medium leading-tight transition-colors ${isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"}`}
                        >
                          {s.title}
                        </span>
                        {isActive && (
                          <div
                            className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: s.accent }}
                          />
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-8 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center mb-3">
                    <ShieldCheck size={15} className="text-white" />
                  </div>
                  <p className="font-['Barlow_Condensed'] text-[15px] font-black text-white mb-1">
                    DEFEND AGAINST RANSOMWARE
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
                    Bitss VWAR Windows detects ransomware signatures on your
                    endpoints before encryption begins.
                  </p>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-[12px] font-semibold transition-colors"
                  >
                    Get Protected <ArrowRight size={11} />
                  </Link>
                </div>

                <div className="mt-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 px-1">
                    Other Topics
                  </p>
                  <div className="flex flex-col gap-1">
                    {OTHER_TOPICS.map((t) => (
                      <a
                        key={t.label}
                        href={t.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <BookOpen
                          size={11}
                          className="shrink-0 text-slate-300"
                        />
                        {t.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Article Sections */}
            <main className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
              {SECTIONS.map((s, i) => (
                <SectionBlock key={s.id} s={s} index={i} />
              ))}

              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mb-1">
                    Next Topic
                  </p>
                  <a
                    href="/security-academy/server-security"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-slate-800 hover:text-red-600 transition-colors"
                  >
                    Server Security <ChevronRight size={15} />
                  </a>
                </div>
                <a
                  href="/security-academy"
                  className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-800 transition-colors"
                >
                  ← Back to Security Academy
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>

      <CTA />
    </>
  );
}
