"use client";
import { Home, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Banner() {
  const contacts = [
    {
      icon: Home,
      label: "Address",
      lines: ["8 rue de Dublin, 34200, Sète, France"],
      accent: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: Phone,
      label: "Phone",
      lines: ["+0033666100010"],
      accent: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: Mail,
      label: "Email",
      lines: ["support@bobosohomail.com", "bfin@bobosohomail.com"],
      accent: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 sm:pb-20">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle,#e2e8f0 1.5px,transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_40%,rgba(254,242,242,0.85)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* LEFT — Info */}
          <div className="w-full lg:w-1/2">
            {/* Tag */}
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Get In Touch
              </span>
            </div>

            <h1
              className="font-black leading-[0.88] tracking-tight text-slate-900 mb-5"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(44px,7vw,80px)",
              }}
            >
              WE&apos;RE HERE
              <br />
              <span className="text-red-600">TO HELP.</span>
            </h1>

            <p className="text-slate-500 text-[15px] sm:text-[17px] leading-relaxed max-w-[420px] mb-10">
              Reach out through any channel — our security team responds fast.
              Enterprise inquiries, support tickets, and demos all welcome.
            </p>

            {/* Contact cards */}
            <div className="flex flex-col gap-4">
              {contacts.map(
                ({ icon: Icon, label, lines, accent, iconColor }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accent}`}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.75}
                        className={iconColor}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                        {label}
                      </p>
                      {lines.map((l) => (
                        <p
                          key={l}
                          className="text-[14px] text-slate-700 font-medium leading-snug"
                        >
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* RIGHT — Illustration */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3]">
              <Image
                src="/img/contact-banner.svg"
                alt="Contact illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
