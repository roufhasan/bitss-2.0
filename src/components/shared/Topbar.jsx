"use client";
import { useEffect, useState } from "react";
import CountrySelector from "./CountrySelector";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TopBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fn = () => setHidden(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div
      className={`hidden md:flex fixed top-0 inset-x-0 z-[101] h-8 bg-slate-900 border-b border-slate-800 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full flex items-center justify-end gap-2">
        <CountrySelector />
        <div className="w-px h-3.5 bg-slate-200" />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
