import { ShieldCheck, Zap, Globe } from "lucide-react";
import Tag from "@/components/ui/tag";
import { PRODUCTS } from "@/data";

export default function Ecosystem() {
  return (
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
            Bitss covers every entry point attackers exploit — from your website
            login to the USB stick an employee just plugged in.
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
                  <IIcon size={20} strokeWidth={1.75} className={item.color} />
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
  );
}
