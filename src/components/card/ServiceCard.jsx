import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <div
      className={`flex-1 min-w-[240px] max-w-[340px] rounded-2xl border ${service.accentBorder} bg-white p-6 sm:p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${service.iconBg}`}
        >
          <Icon size={22} strokeWidth={1.75} className={service.iconColor} />
        </div>
        <div>
          <p className="font-['Barlow_Condensed'] text-[18px] font-black text-slate-900 leading-none">
            {service.title}
          </p>
          <p
            className={`font-['Barlow_Condensed'] text-[13px] font-bold tracking-widest uppercase ${service.subtitleColor}`}
          >
            {service.subtitle}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 mb-4" />

      {/* Features */}
      <ul className="flex flex-col gap-2.5 mb-7">
        {service.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2.5 text-[13px] text-slate-600"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: service.accent }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={service.ctaHref}
        target="_blank"
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${service.ctaClass}`}
      >
        {service.cta}
        <ArrowRight size={13} />
      </Link>
    </div>
  );
}
