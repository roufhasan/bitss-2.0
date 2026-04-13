import ServiceCard from "@/components/card/ServiceCard";
import { coreServices } from "@/data";

export default function CoreServices() {
  return (
    <section className="relative py-16 sm:py-20 bg-white overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(254,242,242,0.6)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            BITSS Core Services
          </div>

          <h2
            className="font-['Barlow_Condensed'] font-black text-slate-900 leading-none mb-4"
            style={{ fontSize: "clamp(30px,5vw,56px)" }}
          >
            ONE ECOSYSTEM. <span className="text-red-600">FULL CHAIN.</span>
          </h2>

          <p className="text-slate-500 text-[15px] leading-relaxed max-w-lg mx-auto">
            Bitss covers every entry point attackers exploit — from your website
            login to your{" "}
            <strong className="text-slate-700 font-semibold">
              blockchain infrastructure.
            </strong>
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-5 justify-center items-stretch">
          {coreServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
