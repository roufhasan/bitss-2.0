import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Tag from "@/components/ui/tag";
import { PRODUCTS, STATS } from "@/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16">
      <div className="dot-grid absolute inset-0 opacity-60" />
      <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-red-600 via-red-500 to-amber-500" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_30%,rgba(254,242,242,0.9)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 min-h-[calc(100vh-64px)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <div className="fu1 mb-5 sm:mb-6">
              <Tag>Enterprise Cybersecurity Platform</Tag>
            </div>

            <h1 className="fu2 text-5xl md:text-7xl text-balance font-['Barlow_Condensed'] font-black tracking-tight mb-5 sm:mb-6">
              <span className="block text-slate-900">DEFEND Every System.</span>
              <span>
                SECURE <span className="text-red-600">WEB2.</span>{" "}
                <span className="text-slate-900">SECURE</span>{" "}
                <span className=" text-red-600">WEB3.</span>
              </span>
            </h1>

            <p className="fu3 text-slate-500 text-[15px] sm:text-[17px] leading-relaxed max-w-120 mb-8 sm:mb-10">
              Bitss secures your business across every attack surface — from
              website login and admin layers to{" "}
              <strong className="text-slate-700 font-semibold">
                blockchain, wallets and digital assets. One ecosystem. Full
                chain.
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
                Explore Services <ArrowRight size={15} />
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
            <div className="hidden lg:flex relative items-center justify-center h-115 w-full">
              <div className="spin-cw  absolute w-90 h-90 rounded-full border border-dashed border-red-200" />
              <div className="spin-ccw absolute w-[288px] h-72 rounded-full border border-slate-200" />
              <div className="absolute w-105 h-105 rounded-full border border-red-50" />
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
  );
}
