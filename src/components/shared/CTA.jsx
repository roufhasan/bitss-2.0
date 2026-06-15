import { Clock, Mail, Phone, Zap } from "lucide-react";

const buttons = [
  {
    href: "mailto:support@bobosohomail.com",
    icon: Mail,
    label: "Request a Demo",
    primary: true,
  },
  {
    href: "tel:+0033666100010",
    icon: Phone,
    label: "Talk to an Expert",
    primary: false,
  },
];

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "support@bobosohomail.com",
    href: "mailto:support@bobosohomail.com",
  },
  {
    icon: Phone,
    label: "Hotline",
    value: "+0033 666 100 010",
    href: "tel:+0033666100010",
  },
  {
    icon: Clock,
    label: "Support",
    value: "24/7 · 365 days",
    href: null,
  },
];

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-20 sm:py-24 lg:py-28 bg-slate-900 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(220,38,38,0.15)_0%,transparent_70%)]" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Start Today
        </span>

        <h2
          className="font-['Barlow_Condensed'] font-black text-white leading-[0.9] mb-5 sm:mb-6"
          style={{ fontSize: "clamp(44px,8vw,96px)" }}
        >
          READY TO
          <br />
          <span className="text-red-500">FIGHT BACK?</span>
        </h2>

        <p className="text-slate-400 text-[14px] sm:text-[16px] leading-relaxed mb-10 sm:mb-12 px-2 sm:px-0">
          Request a free demo and see Bitss in action across all five security
          layers — or get a custom quote for your organization.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-10 sm:mb-14">
          {buttons.map(({ href, icon: Icon, label, primary }) =>
            primary ? (
              <a
                key={label}
                href={href}
                className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-[14px] sm:text-[15px] transition-all duration-300 shadow-lg shadow-red-900/40 hover:-translate-y-0.5 w-full xs:w-auto"
              >
                <Icon size={16} /> {label}
              </a>
            ) : (
              <a
                key={label}
                href={href}
                className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-[14px] sm:text-[15px] transition-all duration-300 hover:bg-slate-800 w-full xs:w-auto"
              >
                <Icon size={16} /> {label}
              </a>
            ),
          )}
        </div>

        {/* Contact strip */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-10 border-t border-slate-800">
          {contacts.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="text-center group">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 group-hover:border-red-500/40 group-hover:bg-red-500/10 flex items-center justify-center transition-all duration-300">
                  <Icon size={16} className="text-red-500" />
                </div>
              </div>
              <div className="font-mono text-[8px] sm:text-[10px] text-slate-500 tracking-widest uppercase mb-1 sm:mb-1.5">
                {label}
              </div>
              {href ? (
                <a
                  href={href}
                  className="text-[11px] sm:text-[13px] text-slate-300 hover:text-red-400 font-medium break-all transition-colors duration-200"
                >
                  {value}
                </a>
              ) : (
                <span className="text-[11px] sm:text-[13px] text-slate-300 font-medium">
                  {value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
