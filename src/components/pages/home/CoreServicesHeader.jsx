export default function CoreServicesHeader() {
  return (
    <section className="relative py-16 sm:py-20 bg-white overflow-hidden text-center">
      {/* Dot grid background */}
      <div className="dot-grid absolute inset-0 opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(254,242,242,0.7)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          BITSS Core Services
        </div>

        {/* Headline */}
        <h2
          className="font-['Barlow_Condensed'] font-black text-slate-900 leading-none mb-5"
          style={{ fontSize: "clamp(32px,5vw,58px)" }}
        >
          THREE LAYERS. <span className="text-red-600">ONE</span> SECURITY
          SYSTEM.
        </h2>

        {/* Description */}
        <p className="text-slate-500 text-[15px] leading-relaxed mb-3">
          Bitss protects your business across{" "}
          <strong className="text-slate-700 font-semibold">
            every attack surface
          </strong>{" "}
          — from website login and admin layers to{" "}
          <strong className="text-slate-700 font-semibold">
            blockchain, wallets,
          </strong>{" "}
          and{" "}
          <strong className="text-slate-700 font-semibold">
            digital assets.
          </strong>
        </p>

        <p className="text-slate-800 text-[15px] font-bold">
          One ecosystem. Full chain.
        </p>
      </div>
    </section>
  );
}
