"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Globe,
  Lock,
  Flame,
  Server,
  KeyRound,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Zap,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "how-hackers",
    num: "01",
    title: "How Hackers Break Into Websites",
    icon: AlertTriangle,
    accent: "#DC2626",
    accentText: "text-red-600",
    accentBg: "bg-red-50",
    iconBg: "bg-red-100",
    accentDot: "bg-red-500",
    accentBorder: "border-red-200",
    calloutLabel: "Key Threat",
    callout:
      "Automated botnets can scan thousands of websites per minute — making no site too small to target.",
    body: [
      "Modern websites are constantly targeted by automated scanning tools operated by cybercriminal networks. These scanners search the internet for websites with outdated software, weak credentials, exposed administration interfaces, and vulnerable plugins.",
      "Once a vulnerability is discovered, attackers attempt to exploit it through techniques such as credential guessing, code injection, malware uploads, and privilege escalation. Many attacks are performed automatically by botnets capable of scanning thousands of websites every minute.",
      "In many cases, website owners are unaware that their systems are being targeted until an attack successfully compromises the server. A secure website therefore requires multiple defensive layers including login protection, vulnerability monitoring, firewall filtering, and malware detection.",
      "Understanding how hackers gain access to websites is the first step toward building an effective security defense strategy.",
    ],
    bullets: [
      "Outdated plugins & themes",
      "Weak or reused credentials",
      "Exposed admin interfaces",
      "Unpatched CMS vulnerabilities",
    ],
  },
  {
    id: "brute-force",
    num: "02",
    title: "What is Brute Force Attack Protection",
    icon: Lock,
    accent: "#EA580C",
    accentText: "text-orange-600",
    accentBg: "bg-orange-50",
    iconBg: "bg-orange-100",
    accentDot: "bg-orange-500",
    accentBorder: "border-orange-200",
    calloutLabel: "Definition",
    callout:
      "A brute force attack uses automated bots to repeatedly guess login credentials — often attempting millions of combinations per hour.",
    body: [
      "A brute force attack is one of the most common methods used by attackers to gain unauthorized access to website administration panels.",
      "In this type of attack, automated bots repeatedly attempt thousands of username and password combinations in an effort to guess the correct credentials. Because these attacks are automated, a single attacker can attempt millions of login attempts across thousands of websites simultaneously.",
      "Brute force attack protection involves detecting repeated login attempts and blocking suspicious activity before credentials can be guessed. Effective defenses include login throttling, IP filtering, behavioral analysis, and administrative firewall protection.",
      "By preventing automated login attempts, websites can significantly reduce the risk of unauthorized access.",
    ],
    bullets: [
      "Login throttling & lockout",
      "IP reputation filtering",
      "Behavioral anomaly detection",
      "Admin firewall protection",
    ],
  },
  {
    id: "admin-login",
    num: "03",
    title: "How to Protect Admin Login Pages",
    icon: KeyRound,
    accent: "#D97706",
    accentText: "text-amber-600",
    accentBg: "bg-amber-50",
    iconBg: "bg-amber-100",
    accentDot: "bg-amber-500",
    accentBorder: "border-amber-200",
    calloutLabel: "Critical Point",
    callout:
      "The admin login page is the single most targeted URL on any website. Once breached, an attacker has full server control.",
    body: [
      "The administrative login page is one of the most sensitive access points on any website. If an attacker gains access to this area, they can potentially modify content, upload malware, steal data, or take full control of the server.",
      "Securing login pages requires several layers of protection including restricted access controls, login rate limiting, IP reputation filtering, and authentication monitoring.",
      "Additional security mechanisms such as multi-factor authentication, encrypted connections, and login activity monitoring further strengthen the protection of administrative interfaces.",
      "A properly secured login page significantly reduces the likelihood of unauthorized system access.",
    ],
    bullets: [
      "Restricted access controls",
      "Multi-factor authentication",
      "Encrypted connections (HTTPS)",
      "Login activity monitoring",
    ],
  },
  {
    id: "firewall",
    num: "04",
    title: "Website Firewall Explained",
    icon: Flame,
    accent: "#0284C7",
    accentText: "text-sky-600",
    accentBg: "bg-sky-50",
    iconBg: "bg-sky-100",
    accentDot: "bg-sky-500",
    accentBorder: "border-sky-200",
    calloutLabel: "What is a WAF?",
    callout:
      "A Web Application Firewall (WAF) filters all incoming traffic before it reaches your server — blocking attacks at the network edge.",
    body: [
      "A website firewall, also known as a web application firewall (WAF), is a security layer that filters incoming traffic before it reaches a website's server.",
      "The firewall analyzes incoming requests and blocks malicious activity such as SQL injection attacks, cross-site scripting attempts, malicious bots, and vulnerability scans.",
      "Unlike traditional network firewalls, web application firewalls are designed specifically to protect websites and applications from internet-based attacks.",
      "By monitoring traffic patterns and detecting suspicious behavior, website firewalls prevent many attacks before they reach the application itself.",
    ],
    bullets: [
      "SQL injection blocking",
      "Cross-site scripting (XSS) prevention",
      "Malicious bot filtering",
      "Real-time traffic analysis",
    ],
  },
  {
    id: "wordpress",
    num: "05",
    title: "How to Secure WordPress Login",
    icon: Globe,
    accent: "#059669",
    accentText: "text-emerald-600",
    accentBg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    accentDot: "bg-emerald-500",
    accentBorder: "border-emerald-200",
    calloutLabel: "Did You Know?",
    callout:
      "WordPress powers over 40% of all websites — making it the single most targeted CMS platform by automated attack bots.",
    body: [
      "WordPress powers a significant portion of the global internet, making it a common target for cyber attackers. Because of its popularity, automated bots constantly attempt to break into WordPress administration panels.",
      "Common WordPress vulnerabilities include weak passwords, outdated plugins, exposed login pages, and insufficient server protections.",
      "To secure a WordPress login system, administrators must implement strong password policies, login attempt limits, administrative firewalls, and plugin update monitoring.",
      "Proactive login protection significantly reduces the likelihood of a successful attack.",
    ],
    bullets: [
      "Strong password enforcement",
      "Login attempt rate limiting",
      "Plugin update monitoring",
      "Admin URL obfuscation",
    ],
  },
];

const OTHER_TOPICS = [
  { label: "Malware Protection", href: "/security-academy/malware-protection" },
  { label: "Ransomware Defense", href: "/security-academy/ransomware-defense" },
  { label: "Server Security", href: "/security-academy/server-security" },
  { label: "Spam Protection", href: "/security-academy/spam-protection" },
  { label: "Security Basics", href: "/security-academy/security-basics" },
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

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

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
      {/* Section header */}
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

      {/* Callout box */}
      <div
        className={`flex gap-3 p-4 rounded-2xl border ${s.accentBg} ${s.accentBorder} mb-6`}
      >
        <div className={`shrink-0 mt-0.5 w-1 rounded-full ${s.accentDot}`} />
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

      {/* Body paragraphs */}
      <div className="space-y-4 mb-6">
        {s.body.map((para, i) => (
          <p key={i} className="text-slate-600 text-[15px] leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {/* Bullet list */}
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function WebsiteSecurityPage() {
  const sectionIds = SECTIONS.map((s) => s.id);
  const activeSection = useActiveSection(sectionIds);

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

      <Navbar />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_30%,rgba(254,242,242,0.9)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24">
          {/* Breadcrumb */}
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
            <span className="text-red-500">Website Security</span>
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
                WEBSITE
                <br />
                <span className="text-red-600">SECURITY</span>
              </h1>
              <p className="fu3 text-slate-500 text-[15px] sm:text-[16px] leading-relaxed max-w-md">
                Everything you need to know about securing your website — from
                login pages to server-side firewalls.
              </p>
            </div>

            {/* Topic index cards */}
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

      {/* ── MAIN CONTENT ───────────────────────────────────────────────────── */}
      <div className="relative bg-slate-50">
        <div className="sub-grid absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-18 lg:py-20">
          <div className="lg:grid lg:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr] gap-12 lg:gap-16 items-start">
            {/* ── STICKY SIDEBAR ─────────────────────────────────────────── */}
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
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                          isActive
                            ? "bg-white shadow-sm border border-slate-100"
                            : "hover:bg-white/60"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? s.iconBg
                              : "bg-slate-100 group-hover:bg-slate-200"
                          }`}
                        >
                          <Icon
                            size={12}
                            style={{ color: isActive ? s.accent : "#94a3b8" }}
                          />
                        </div>
                        <span
                          className={`text-[12px] font-medium leading-tight transition-colors ${
                            isActive
                              ? "text-slate-900"
                              : "text-slate-500 group-hover:text-slate-700"
                          }`}
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

                {/* Sidebar CTA */}
                <div className="mt-8 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center mb-3">
                    <ShieldCheck size={15} className="text-white" />
                  </div>
                  <p className="font-['Barlow_Condensed'] text-[15px] font-black text-white mb-1">
                    PROTECT YOUR SITE
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
                    Apply everything in this guide automatically with Bitss WAP
                    Protect.
                  </p>
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-[12px] font-semibold transition-colors"
                  >
                    Get Protected <ArrowRight size={11} />
                  </a>
                </div>

                {/* Other topics */}
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

            {/* ── ARTICLE SECTIONS ───────────────────────────────────────── */}
            <main className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
              {SECTIONS.map((s, i) => (
                <SectionBlock key={s.id} s={s} index={i} />
              ))}

              {/* Bottom nav */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mb-1">
                    Next Topic
                  </p>
                  <a
                    href="/security-academy/malware-protection"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-slate-800 hover:text-red-600 transition-colors"
                  >
                    Malware Protection <ChevronRight size={15} />
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

      {/* ── CTA STRIP ──────────────────────────────────────────────────────── */}
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
            Apply every defense in this guide automatically — with Bitss WAP
            Protect covering your admin login, firewall, and brute-force
            protection.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <a
              href="mailto:security@bitss.com.bd"
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
