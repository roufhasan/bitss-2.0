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
  Star,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: "wap",
    short: "WAP Protect",
    name: "Bitss WAP Protect",
    tag: "Web Admin & Portal",
    icon: Lock,
    color: "#C8102E",
    glow: "rgba(200,16,46,0.25)",
    desc: "Login enforcement, admin-zone hardening, database administration firewall, and proactive protection for your website control layer.",
    features: [
      "Login brute-force prevention",
      "Admin zone lockdown",
      "DB admin firewall",
      "Proactive threat blocking",
    ],
    layer: "Web Layer",
  },
  {
    id: "contact",
    short: "Contact Form Shield",
    name: "Bitss C",
    tag: "Form Protection",
    icon: MailX,
    color: "#E85D04",
    glow: "rgba(232,93,4,0.22)",
    desc: "A dedicated shield for your website contact page — blocks malware payloads, virus uploads, and malicious form submissions before they reach your server.",
    features: [
      "Payload scanning on submit",
      "Malware signature detection",
      "Bot & spam filtering",
      "Clean submission guarantee",
    ],
    layer: "Web Layer",
  },
  {
    id: "vwar-web",
    short: "VWAR for Websites",
    name: "Bitss VWAR Web",
    tag: "Server-Side Defense",
    icon: ScanLine,
    color: "#F5A623",
    glow: "rgba(245,166,35,0.2)",
    desc: "Server-side malware and virus scanning with real-time threat blocking for your website files and database. Keeps your hosting environment clean.",
    features: [
      "Deep file system scanning",
      "Database integrity checks",
      "Real-time threat blocking",
      "Quarantine & reporting",
    ],
    layer: "Server Layer",
  },
  {
    id: "vwar-win",
    short: "VWAR for Windows",
    name: "Bitss VWAR Windows",
    tag: "Endpoint Protection",
    icon: MonitorSmartphone,
    color: "#0EA5E9",
    glow: "rgba(14,165,233,0.2)",
    desc: "Real-time malware and virus protection for Windows laptops and desktops. Constant background defense for every device in your organization.",
    features: [
      "Real-time process monitoring",
      "Behavioral threat detection",
      "Lightweight background agent",
      "Instant quarantine & alerts",
    ],
    layer: "Endpoint Layer",
  },
  {
    id: "usb",
    short: "USB Key Protection",
    name: "Bitss USB Protect",
    tag: "Removable Media",
    icon: Usb,
    color: "#22C55E",
    glow: "rgba(34,197,94,0.2)",
    desc: "Automatically scans and sanitizes USB storage keys the moment they are plugged in — preventing infected drives from spreading malware across your network.",
    features: [
      "Auto-scan on plug-in",
      "Malware removal before access",
      "Drive health reporting",
      "Policy-based USB control",
    ],
    layer: "Media Layer",
  },
];

const BUNDLES = [
  {
    name: "Web Shield Pack",
    desc: "Complete web-layer security",
    products: ["WAP Protect", "Contact Form Shield", "VWAR for Websites"],
    color: "#C8102E",
    popular: false,
    icon: Globe,
  },
  {
    name: "Full Coverage",
    desc: "Every entry point. One ecosystem.",
    products: [
      "WAP Protect",
      "Contact Form Shield",
      "VWAR for Websites",
      "VWAR for Windows",
      "USB Key Protection",
    ],
    color: "#F5A623",
    popular: true,
    icon: ShieldCheck,
  },
  {
    name: "Endpoint + Media Pack",
    desc: "Device & removable media defense",
    products: ["VWAR for Windows", "USB Key Protection"],
    color: "#0EA5E9",
    popular: false,
    icon: Server,
  },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
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

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function SectionTag({ children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "4px 12px",
        border: "1px solid rgba(200,16,46,0.35)",
        color: "#C8102E",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#C8102E",
          display: "inline-block",
        }}
      />
      {children}
    </span>
  );
}

function ProductCard({ product, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const Icon = product.icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "28px 24px",
        border: `1px solid ${hovered ? product.color + "60" : "rgba(255,255,255,0.06)"}`,
        background: hovered
          ? `rgba(255,255,255,0.04)`
          : "rgba(255,255,255,0.015)",
        cursor: "default",
        transition: "all 0.4s ease",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${index * 0.1}s`,
        boxShadow: hovered ? `0 0 40px ${product.glow}` : "none",
        backdropFilter: "blur(4px)",
        clipPath:
          "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
      }}
    >
      {/* Layer badge */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          padding: "2px 8px",
          background: product.color + "18",
          border: `1px solid ${product.color}30`,
          fontSize: 9,
          color: product.color,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {product.layer}
      </div>

      {/* Number */}
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 11,
          color: product.color + "70",
          letterSpacing: "0.3em",
          marginBottom: 16,
          fontWeight: 700,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div
        style={{
          marginBottom: 16,
          color: product.color,
          transform: hovered ? "scale(1.15)" : "scale(1)",
          transition: "transform 0.3s ease",
          filter: hovered ? `drop-shadow(0 0 8px ${product.color})` : "none",
        }}
      >
        <Icon size={32} strokeWidth={1.5} />
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 22,
          fontWeight: 900,
          color: "#F0F4FF",
          letterSpacing: "0.02em",
          marginBottom: 4,
          lineHeight: 1.1,
        }}
      >
        {product.name}
      </div>
      <div
        style={{
          fontSize: 11,
          color: product.color,
          marginBottom: 14,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.1em",
        }}
      >
        {product.tag}
      </div>

      {/* Desc */}
      <p
        style={{
          fontSize: 13,
          color: "#8892A4",
          lineHeight: 1.65,
          marginBottom: 20,
        }}
      >
        {product.desc}
      </p>

      {/* Features */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {product.features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "#8892A4",
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: product.color,
                flexShrink: 0,
              }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* Bottom divider + link */}
      <div
        style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <a
          href="#contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: product.color,
            textDecoration: "none",
            transition: "gap 0.2s ease",
            letterSpacing: "0.05em",
          }}
        >
          Learn more <ChevronRight size={13} />
        </a>
      </div>
    </div>
  );
}

function BundleCard({ bundle, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const Icon = bundle.icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "32px 28px",
        border: bundle.popular
          ? `1px solid ${bundle.color}80`
          : "1px solid rgba(255,255,255,0.07)",
        background: bundle.popular
          ? `${bundle.color}08`
          : "rgba(255,255,255,0.02)",
        transition: "all 0.4s ease",
        opacity: inView ? 1 : 0,
        transform: inView
          ? bundle.popular
            ? "scale(1.03)"
            : "scale(1)"
          : "translateY(24px)",
        transitionDelay: `${index * 0.12}s`,
        boxShadow: hovered
          ? `0 0 50px ${bundle.color}25`
          : bundle.popular
            ? `0 0 30px ${bundle.color}15`
            : "none",
        flex: bundle.popular ? "1.1" : "1",
        clipPath:
          "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
      }}
    >
      {bundle.popular && (
        <div
          style={{
            position: "absolute",
            top: -1,
            left: "50%",
            transform: "translateX(-50%)",
            background: bundle.color,
            padding: "4px 20px",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 11,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          ★ Most Popular
        </div>
      )}

      <div style={{ color: bundle.color, marginBottom: 20, opacity: 0.9 }}>
        <Icon size={28} strokeWidth={1.5} />
      </div>

      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 26,
          fontWeight: 900,
          color: "#F0F4FF",
          letterSpacing: "0.03em",
          marginBottom: 6,
        }}
      >
        {bundle.name}
      </div>
      <div style={{ fontSize: 13, color: "#8892A4", marginBottom: 24 }}>
        {bundle.desc}
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 28px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {bundle.products.map((p) => (
          <li
            key={p}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              color: "#C8D0DC",
            }}
          >
            <CheckCircle2
              size={14}
              color={bundle.color}
              strokeWidth={2}
              style={{ flexShrink: 0 }}
            />
            {p}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "13px 0",
          textDecoration: "none",
          background: bundle.popular ? bundle.color : "transparent",
          border: `1px solid ${bundle.popular ? bundle.color : "rgba(255,255,255,0.12)"}`,
          color: bundle.popular ? "#fff" : "#8892A4",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          transition: "all 0.3s ease",
          clipPath:
            "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
        }}
      >
        Request a Demo <ArrowRight size={14} />
      </a>
    </div>
  );
}

// ─── CANVAS PARTICLE BG ──────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.4 + 0.1,
      red: Math.random() > 0.75,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(26,39,68,${0.5 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.red ? "#C8102E" : "#1A2744";
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.5,
      }}
    />
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const heroVisible = mounted;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #060910; color: #F0F4FF; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0A0E1A; }
        ::-webkit-scrollbar-thumb { background: #C8102E; border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shieldFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes shieldPulse {
          0%,100% { filter: drop-shadow(0 0 18px rgba(200,16,46,0.45)); }
          50% { filter: drop-shadow(0 0 45px rgba(200,16,46,0.75)) drop-shadow(0 0 90px rgba(200,16,46,0.2)); }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes pulseDot { 0%,100% { opacity:1; transform: scale(1); } 50% { opacity:0; transform: scale(2.5); } }
        .hero-fade-1 { animation: fadeUp 0.7s ease forwards; animation-delay: 0.1s; opacity: 0; }
        .hero-fade-2 { animation: fadeUp 0.7s ease forwards; animation-delay: 0.28s; opacity: 0; }
        .hero-fade-3 { animation: fadeUp 0.7s ease forwards; animation-delay: 0.44s; opacity: 0; }
        .hero-fade-4 { animation: fadeUp 0.7s ease forwards; animation-delay: 0.6s; opacity: 0; }
        .hero-fade-5 { animation: fadeUp 0.7s ease forwards; animation-delay: 0.76s; opacity: 0; }
        .shield-anim { animation: shieldFloat 5s ease-in-out infinite, shieldPulse 3s ease-in-out infinite; }
        .ring-spin-slow { animation: spin 22s linear infinite; }
        .ring-spin-rev { animation: spin 16s linear infinite reverse; }
        .ticker-track { animation: ticker 38s linear infinite; }
        .grid-bg {
          background-image: linear-gradient(rgba(200,16,46,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(200,16,46,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }
      `}</style>

      <main style={{ background: "#060910", minHeight: "100vh" }}>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <ParticleCanvas />
          <div
            className="grid-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.35 }}
          />
          {/* Red glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 75% 45% at 50% -10%, rgba(200,16,46,0.14) 0%, transparent 70%)",
            }}
          />
          {/* Left accent */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background:
                "linear-gradient(to bottom, transparent, rgba(200,16,46,0.5), transparent)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: 1280,
              margin: "0 auto",
              padding: "120px 40px 80px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Left */}
            <div>
              <div className="hero-fade-1" style={{ marginBottom: 28 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "4px 14px",
                    border: "1px solid rgba(200,16,46,0.35)",
                    fontSize: 10,
                    color: "#C8102E",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#C8102E",
                      display: "inline-block",
                      animation: "pulseDot 2s ease-in-out infinite",
                    }}
                  />
                  Enterprise Cybersecurity Platform
                </span>
              </div>

              <h1
                className="hero-fade-2"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(52px, 7vw, 88px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.01em",
                  marginBottom: 24,
                }}
              >
                <span style={{ display: "block", color: "#F0F4FF" }}>
                  DEFEND
                </span>
                <span
                  style={{
                    display: "block",
                    background: "linear-gradient(90deg, #C8102E, #F5A623)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  EVERY
                </span>
                <span style={{ display: "block", color: "#F0F4FF" }}>
                  ENTRY POINT.
                </span>
              </h1>

              <p
                className="hero-fade-3"
                style={{
                  fontSize: 17,
                  color: "#8892A4",
                  lineHeight: 1.7,
                  maxWidth: 440,
                  marginBottom: 36,
                }}
              >
                Bitss secures your business across every attack surface —
                website login, admin layer, contact forms, Windows devices, and
                USB storage.{" "}
                <strong style={{ color: "#C0C8D8", fontWeight: 500 }}>
                  One ecosystem. Full chain protection.
                </strong>
              </p>

              <div
                className="hero-fade-4"
                style={{
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  marginBottom: 52,
                }}
              >
                <a
                  href="#bundles"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 32px",
                    background: "#C8102E",
                    color: "#fff",
                    textDecoration: "none",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    clipPath:
                      "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                    boxShadow: "0 0 24px rgba(200,16,46,0.35)",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  <ShieldCheck size={16} /> Get Protected Now
                </a>
                <a
                  href="#products"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 32px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#8892A4",
                    textDecoration: "none",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    clipPath:
                      "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                    transition: "color 0.3s, border-color 0.3s",
                  }}
                >
                  Explore Products <ArrowRight size={14} />
                </a>
              </div>

              {/* Stats */}
              <div
                className="hero-fade-5"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 24,
                }}
              >
                {[
                  { v: "5", l: "Security Layers" },
                  { v: "99.9%", l: "Detection Rate" },
                  { v: "24/7", l: "Active Defense" },
                ].map((s) => (
                  <div
                    key={s.l}
                    style={{
                      paddingBottom: 12,
                      borderBottom: "2px solid #C8102E",
                      borderImage:
                        "linear-gradient(90deg, #C8102E, transparent) 1",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 32,
                        fontWeight: 900,
                        color: "#F0F4FF",
                        lineHeight: 1,
                      }}
                    >
                      {s.v}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#8892A4", marginTop: 4 }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Shield visual */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                height: 480,
              }}
            >
              {/* Rings */}
              <div
                className="ring-spin-slow"
                style={{
                  position: "absolute",
                  width: 380,
                  height: 380,
                  borderRadius: "50%",
                  border: "1px solid rgba(200,16,46,0.2)",
                }}
              />
              <div
                className="ring-spin-rev"
                style={{
                  position: "absolute",
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  border: "1px dashed rgba(200,16,46,0.15)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 440,
                  height: 440,
                  borderRadius: "50%",
                  border: "1px solid rgba(26,39,68,0.6)",
                }}
              />

              {/* Central shield icon */}
              <div
                className="shield-anim"
                style={{ position: "relative", zIndex: 2 }}
              >
                <ShieldCheck
                  size={120}
                  color="#C8102E"
                  strokeWidth={1}
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(200,16,46,0.6))",
                  }}
                />
              </div>

              {/* Orbiting product icons */}
              {PRODUCTS.map((p, i) => {
                const angle = (i / PRODUCTS.length) * 360;
                const rad = (angle * Math.PI) / 180;
                const r = 180;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                const PIcon = p.icon;
                return (
                  <div
                    key={p.id}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      zIndex: 3,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: `${p.color}15`,
                        border: `1px solid ${p.color}50`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 0 14px ${p.glow}`,
                      }}
                    >
                      <PIcon size={18} color={p.color} strokeWidth={1.5} />
                    </div>
                    <span
                      style={{
                        fontSize: 8,
                        color: p.color,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: "0.1em",
                        whiteSpace: "nowrap",
                        textTransform: "uppercase",
                      }}
                    >
                      {p.short.split(" ").slice(-1)[0]}
                    </span>
                  </div>
                );
              })}

              {/* Status card */}
              <div
                style={{
                  position: "absolute",
                  right: -20,
                  top: 80,
                  padding: "10px 14px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(6,9,16,0.85)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <div
                  style={{ fontSize: 10, color: "#22C55E", fontWeight: 700 }}
                >
                  ⬤ ALL LAYERS ACTIVE
                </div>
                <div style={{ fontSize: 9, color: "#8892A4", marginTop: 3 }}>
                  5/5 shields online
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: -20,
                  bottom: 100,
                  padding: "10px 14px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(6,9,16,0.85)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <div
                  style={{ fontSize: 10, color: "#C8102E", fontWeight: 700 }}
                >
                  ⬤ 0 THREATS
                </div>
                <div style={{ fontSize: 9, color: "#8892A4", marginTop: 3 }}>
                  Last scan: just now
                </div>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 120,
              background: "linear-gradient(to top, #060910, transparent)",
            }}
          />
        </section>

        {/* ── THREAT TICKER ─────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            background: "#0A0E1A",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            padding: "10px 0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              background: "#C8102E",
            }}
          >
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: "0.25em",
                color: "#fff",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              LIVE SHIELD
            </span>
          </div>
          <div style={{ marginLeft: 110, overflow: "hidden" }}>
            <div
              className="ticker-track"
              style={{ display: "flex", gap: 48, whiteSpace: "nowrap" }}
            >
              {[...Array(2)]
                .flatMap(() => [
                  {
                    t: "BLOCKED",
                    m: "Malware payload in contact form submission",
                    c: "#22C55E",
                  },
                  {
                    t: "BLOCKED",
                    m: "Brute-force login attempt — admin panel",
                    c: "#22C55E",
                  },
                  {
                    t: "ALERT",
                    m: "Suspicious USB drive detected — WKSTN-07",
                    c: "#F5A623",
                  },
                  {
                    t: "BLOCKED",
                    m: "SQL injection via contact form — neutralized",
                    c: "#22C55E",
                  },
                  {
                    t: "BLOCKED",
                    m: "Ransomware signature on Windows endpoint",
                    c: "#22C55E",
                  },
                  {
                    t: "INFO",
                    m: "Threat intelligence updated — 3,841 new IOCs",
                    c: "#0EA5E9",
                  },
                ])
                .map((e, i) => (
                  <div
                    key={i}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        fontWeight: 700,
                        color: e.c,
                        letterSpacing: "0.2em",
                      }}
                    >
                      [{e.t}]
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: "#8892A4",
                      }}
                    >
                      {e.m}
                    </span>
                    <span style={{ color: "#1A2744" }}>|</span>
                  </div>
                ))}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 80,
              background: "linear-gradient(to left, #0A0E1A, transparent)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── PITCH / ECOSYSTEM ─────────────────────────────────────── */}
        <section
          style={{
            padding: "100px 40px",
            background: "#0A0E1A",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="grid-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.2 }}
          />
          <div
            style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}
          >
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <SectionTag>The Bitss Ecosystem</SectionTag>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(40px, 5vw, 64px)",
                  color: "#F0F4FF",
                  marginTop: 20,
                  marginBottom: 16,
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                ONE ECOSYSTEM.{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #C8102E, #F5A623)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  FULL CHAIN.
                </span>
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "#8892A4",
                  maxWidth: 560,
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                Bitss covers every entry point attackers exploit — from your
                website login to the USB stick an employee just plugged in.
              </p>
            </div>

            {/* Chain diagram */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0,
                flexWrap: "wrap",
                rowGap: 16,
              }}
            >
              {PRODUCTS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.id}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                        padding: "20px 16px",
                        minWidth: 110,
                        textAlign: "center",
                        border: `1px solid ${p.color}30`,
                        background: `${p.color}08`,
                        clipPath:
                          "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                      }}
                    >
                      <div
                        style={{
                          color: p.color,
                          filter: `drop-shadow(0 0 6px ${p.color})`,
                        }}
                      >
                        <Icon size={26} strokeWidth={1.5} />
                      </div>
                      <div
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#F0F4FF",
                          letterSpacing: "0.05em",
                          lineHeight: 1.2,
                        }}
                      >
                        {p.short}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          color: p.color,
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {p.layer}
                      </div>
                    </div>
                    {i < PRODUCTS.length - 1 && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0 8px",
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 1,
                            background:
                              "linear-gradient(90deg, rgba(200,16,46,0.6), rgba(245,166,35,0.4))",
                          }}
                        />
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderTop: "1px solid rgba(200,16,46,0.6)",
                            borderRight: "1px solid rgba(200,16,46,0.6)",
                            transform: "rotate(45deg)",
                            marginLeft: -3,
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sub-pitch */}
            <div
              style={{
                marginTop: 56,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                {
                  icon: Globe,
                  label: "Web-to-Server",
                  desc: "Full coverage from public-facing login pages down to the database layer.",
                },
                {
                  icon: Zap,
                  label: "Real-Time Response",
                  desc: "Every product detects and blocks threats the moment they appear — no delays.",
                },
                {
                  icon: ShieldCheck,
                  label: "Endpoint-to-Media",
                  desc: "Windows devices and USB drives covered so no offline vector goes unguarded.",
                },
              ].map((item) => {
                const IIcon = item.icon;
                return (
                  <div
                    key={item.label}
                    style={{ padding: "28px 24px", background: "#0A0E1A" }}
                  >
                    <IIcon
                      size={22}
                      color="#C8102E"
                      strokeWidth={1.5}
                      style={{ marginBottom: 14 }}
                    />
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#F0F4FF",
                        marginBottom: 8,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.label}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#8892A4",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ──────────────────────────────────────────────── */}
        <section
          id="products"
          style={{
            padding: "100px 40px",
            background: "#060910",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background:
                "linear-gradient(to bottom, transparent, rgba(200,16,46,0.3), transparent)",
            }}
          />

          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ marginBottom: 60 }}>
              <SectionTag>5 Products</SectionTag>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 20,
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(38px, 5vw, 60px)",
                    color: "#F0F4FF",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  THE COMPLETE
                  <span
                    style={{
                      background: "linear-gradient(90deg, #C8102E, #F5A623)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {" "}
                    SECURITY SUITE
                  </span>
                </h2>
                <p style={{ fontSize: 15, color: "#8892A4", maxWidth: 480 }}>
                  Every product is purpose-built for a specific attack layer —
                  no overlap, no gaps.
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {PRODUCTS.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── BUNDLES / PRICING ─────────────────────────────────────── */}
        <section
          id="bundles"
          style={{
            padding: "100px 40px",
            background: "#0A0E1A",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,16,46,0.06) 0%, transparent 70%)",
            }}
          />

          <div
            style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}
          >
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <SectionTag>Bundle Offers</SectionTag>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(38px, 5vw, 60px)",
                  color: "#F0F4FF",
                  marginTop: 20,
                  marginBottom: 16,
                  lineHeight: 1,
                }}
              >
                CHOOSE YOUR{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #C8102E, #F5A623)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  COVERAGE
                </span>
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#8892A4",
                  maxWidth: 420,
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                Bundle packages save you more than buying separately — and
                ensure nothing falls through the cracks.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 20,
                alignItems: "stretch",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {BUNDLES.map((b, i) => (
                <BundleCard key={b.name} bundle={b} index={i} />
              ))}
            </div>

            <p
              style={{
                textAlign: "center",
                marginTop: 32,
                fontSize: 12,
                color: "#8892A4",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Bundle pricing available on request. Custom enterprise plans
              supported.
            </p>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section
          id="contact"
          style={{
            padding: "100px 40px",
            background: "#060910",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="grid-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.2 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(200,16,46,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Corner accents */}
          <div
            style={{
              position: "absolute",
              top: 32,
              left: 32,
              width: 48,
              height: 48,
              borderLeft: "2px solid rgba(200,16,46,0.4)",
              borderTop: "2px solid rgba(200,16,46,0.4)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 32,
              right: 32,
              width: 48,
              height: 48,
              borderRight: "2px solid rgba(200,16,46,0.4)",
              borderBottom: "2px solid rgba(200,16,46,0.4)",
            }}
          />

          <div
            style={{
              maxWidth: 700,
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
            }}
          >
            <SectionTag>Start Today</SectionTag>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(52px, 8vw, 96px)",
                color: "#F0F4FF",
                lineHeight: 0.9,
                letterSpacing: "-0.01em",
                margin: "24px 0 20px",
              }}
            >
              READY TO
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #C8102E, #F5A623)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                FIGHT BACK?
              </span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#8892A4",
                marginBottom: 44,
                lineHeight: 1.7,
              }}
            >
              Request a free demo and see Bitss in action across all five
              security layers — or get a custom quote for your organization.
            </p>

            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 60,
              }}
            >
              <a
                href="mailto:security@bitss.com.bd"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 40px",
                  background: "#C8102E",
                  color: "#fff",
                  textDecoration: "none",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  boxShadow: "0 0 30px rgba(200,16,46,0.4)",
                }}
              >
                <Zap size={16} /> Request a Demo
              </a>
              <a
                href="tel:+8801000000000"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 40px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#8892A4",
                  textDecoration: "none",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                }}
              >
                Talk to an Expert
              </a>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
                paddingTop: 40,
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {[
                { icon: "📧", label: "Email", value: "security@bitss.com.bd" },
                { icon: "📞", label: "Hotline", value: "+880 1XXX-XXXXXX" },
                { icon: "🕐", label: "Support", value: "24/7 · 365 days" },
              ].map((c) => (
                <div key={c.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: "#8892A4",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{ fontSize: 13, color: "#C8D0DC", fontWeight: 500 }}
                  >
                    {c.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
