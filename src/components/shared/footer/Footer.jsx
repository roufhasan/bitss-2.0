import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle,rgba(255,255,255,0.06) 1.5px,transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Thin divider instead of accent bar — CTA above already has the gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-slate-800" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          <FooterBrand />
          <FooterLinks />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
