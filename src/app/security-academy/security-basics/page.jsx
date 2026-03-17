"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Flame,
  Swords,
  ZapOff,
  ScanSearch,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  {
    id: "what-is-cybersecurity",
    num: "01",
    title: "What is Cybersecurity",
    icon: ShieldCheck,
    accent: "#DC2626",
    accentText: "text-red-600",
    accentBg: "bg-red-50",
    iconBg: "bg-red-100",
    accentDot: "bg-red-500",
    accentBorder: "border-red-200",
    calloutLabel: "Definition",
    callout:
      "Cybersecurity is the discipline of protecting systems, networks, and data from digital attacks — it's not a product you buy, it's a practice you build.",
    body: [
      "Cybersecurity refers to the practice of protecting computer systems, networks, and digital infrastructure from unauthorized access, attacks, and data breaches.",
      "It involves technologies, processes, and policies designed to defend digital assets against malicious activity.",
    ],
    bullets: [
      "System & network protection",
      "Data breach prevention",
      "Security policy enforcement",
      "Digital asset defense",
    ],
  },
  {
    id: "what-is-a-firewall",
    num: "02",
    title: "What is a Firewall",
    icon: Flame,
    accent: "#EA580C",
    accentText: "text-orange-600",
    accentBg: "bg-orange-50",
    iconBg: "bg-orange-100",
    accentDot: "bg-orange-500",
    accentBorder: "border-orange-200",
    calloutLabel: "Core Concept",
    callout:
      "A firewall is the first line of defense for any network — it decides what gets in and what gets blocked before traffic ever reaches your systems.",
    body: [
      "A firewall is a network security system that monitors and controls traffic entering or leaving a network.",
      "It acts as a protective filter that blocks unauthorized connections while allowing legitimate communication.",
    ],
    bullets: [
      "Inbound traffic control",
      "Unauthorized connection blocking",
      "Rule-based filtering",
      "Network boundary enforcement",
    ],
  },
  {
    id: "types-of-cyber-attacks",
    num: "03",
    title: "Types of Cyber Attacks",
    icon: Swords,
    accent: "#D97706",
    accentText: "text-amber-600",
    accentBg: "bg-amber-50",
    iconBg: "bg-amber-100",
    accentDot: "bg-amber-500",
    accentBorder: "border-amber-200",
    calloutLabel: "Threat Landscape",
    callout:
      "No two attacks look the same — understanding the full range of attack types is the foundation of any effective defense strategy.",
    body: [
      "Cyber attacks come in many forms including malware infections, phishing scams, ransomware attacks, denial-of-service attacks, and credential theft.",
      "Understanding these threats helps organizations implement effective defenses.",
    ],
    bullets: [
      "Malware & ransomware",
      "Phishing & social engineering",
      "Denial-of-service attacks",
      "Credential theft",
    ],
  },
  {
    id: "zero-day-attacks",
    num: "04",
    title: "Zero Day Attacks Explained",
    icon: ZapOff,
    accent: "#0284C7",
    accentText: "text-sky-600",
    accentBg: "bg-sky-50",
    iconBg: "bg-sky-100",
    accentDot: "bg-sky-500",
    accentBorder: "border-sky-200",
    calloutLabel: "Why It's Dangerous",
    callout:
      "A zero day exploit is unknown to the software vendor — there's no patch available, meaning every system running that software is exposed.",
    body: [
      "A zero day vulnerability is a security flaw that is unknown to the software developer.",
      "Attackers exploit these vulnerabilities before security patches are available.",
      "Zero day attacks are particularly dangerous because systems may remain vulnerable for extended periods.",
    ],
    bullets: [
      "Unknown software flaws",
      "No patch available at time of attack",
      "Extended exposure window",
      "Behavioral detection as defense",
    ],
  },
  {
    id: "how-hackers-scan",
    num: "05",
    title: "How Hackers Scan the Internet",
    icon: ScanSearch,
    accent: "#059669",
    accentText: "text-emerald-600",
    accentBg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    accentDot: "bg-emerald-500",
    accentBorder: "border-emerald-200",
    calloutLabel: "Always On",
    callout:
      "Automated scanners probe every public IP address on the internet continuously — your server was likely scanned within minutes of going online.",
    body: [
      "Cyber attackers use automated scanning tools to search the internet for vulnerable systems.",
      "These tools probe servers for open ports, outdated software, and exposed services.",
      "Once a vulnerability is identified, attackers may attempt to exploit it automatically.",
    ],
    bullets: [
      "Automated port scanning",
      "Outdated software detection",
      "Exposed service discovery",
      "Immediate exploit attempts",
    ],
  },
];

const OTHER_TOPICS = [
  { label: "Website Security", href: "/security-academy/website-security" },
  { label: "Malware Protection", href: "/security-academy/malware-protection" },
  { label: "Ransomware Defense", href: "/security-academy/ransomware-defense" },
  { label: "Server Security", href: "/security-academy/server-security" },
  { label: "Spam Protection", href: "/security-academy/spam-protection" },
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
          Key Concepts
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

export default function SecurityBasicsPage() {
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
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <a
              href="/security-academy"
              className="hover:text-slate-600 transition-colors"
            >
              Security Academy
            </a>
            <ChevronRight size={12} />
            <span className="text-red-500">Security Basics</span>
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
                SECURITY
                <br />
                <span className="text-red-600">BASICS</span>
              </h1>
              <p className="fu3 text-slate-500 text-[15px] sm:text-[16px] leading-relaxed max-w-md">
                The essential concepts every business owner should understand —
                from what cybersecurity actually means to how attackers find
                their targets.
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
                    PUT IT INTO PRACTICE
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
                    Bitss applies these security fundamentals automatically
                    across every layer of your business.
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

              {/* End of guide — no "next topic", this is the last one */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mb-1">
                    You&apos;ve reached the end
                  </p>
                  <a
                    href="/security-academy"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-slate-800 hover:text-red-600 transition-colors"
                  >
                    Browse all Security Academy topics{" "}
                    <ChevronRight size={15} />
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

      {/* ── CTA ── */}
      <section
        id="contact"
        className="relative py-20 sm:py-24 bg-slate-900 overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(220,38,38,0.15)_0%,transparent_70%)]" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Start Today
          </span>
          <h2
            className="font-['Barlow_Condensed'] font-black text-white leading-[0.9] mb-5"
            style={{ fontSize: "clamp(44px,8vw,88px)" }}
          >
            READY TO
            <br />
            <span className="text-red-500">FIGHT BACK?</span>
          </h2>
          <p className="text-slate-400 text-[14px] sm:text-[16px] leading-relaxed mb-10 px-2 sm:px-0">
            Now that you understand the fundamentals — let Bitss put them into
            practice across every attack surface your business faces.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <a
              href="mailto:support@bobosohomail.com"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-[14px] transition-all duration-300 shadow-lg shadow-red-900/40 hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <Zap size={16} /> Request a Demo
            </a>
            <a
              href="/security-academy"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-[14px] transition-all duration-300 hover:bg-slate-800 w-full sm:w-auto"
            >
              Explore More Topics
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
