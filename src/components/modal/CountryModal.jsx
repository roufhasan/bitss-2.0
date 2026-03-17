"use client";

import { useQuery } from "@tanstack/react-query";
import { useCountry } from "@/context/CountryContext";
import { ShieldCheck, Globe, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchCountries() {
  const res = await fetch(`${BASE_URL}/countries`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  const json = await res.json();
  return json.data;
}

export default function CountryModal() {
  const { hasChosen, selectCountry } = useCountry();

  const {
    data: countries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    enabled: !hasChosen, // only fetch if no country chosen yet
  });

  // Don't render if user already chose a country
  if (hasChosen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-slate-900/30 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

        <div className="overflow-y-auto flex-1 p-8 sm:p-10">
          {/* Logo mark */}
          <div className="flex items-center mb-8">
            <Image src="/img/logo.png" alt="logo" width={48} height={48} />
            <span
              className="font-black text-slate-900 tracking-wide text-[20px]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              BITSS
            </span>
          </div>

          {/* Heading */}
          <div className="mb-2">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase mb-4">
              <Globe size={11} />
              Select Your Region
            </span>
          </div>
          <h2
            className="font-black text-slate-900 leading-tight mb-2"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(24px,4vw,32px)",
            }}
          >
            WHERE ARE YOU BASED?
          </h2>
          <p className="text-slate-500 text-[14px] leading-relaxed mb-8">
            Select your country so we can show you the right pricing and
            products for your region.
          </p>

          {/* States */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Loader2 size={28} className="text-red-500 animate-spin" />
              <p className="text-slate-400 text-[13px]">Loading countries…</p>
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <AlertCircle size={28} className="text-red-400" />
              <p className="text-slate-500 text-[13px] text-center">
                Could not load countries. Please check your connection and
                refresh.
              </p>
            </div>
          )}

          {countries && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {countries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => selectCountry(country)}
                  className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-red-100 cursor-pointer"
                >
                  {/* Currency symbol */}
                  <span
                    className="text-[22px] font-black text-slate-700 group-hover:text-red-600 transition-colors leading-none"
                    dangerouslySetInnerHTML={{ __html: country.currency_icon }}
                  />
                  <span className="font-['Barlow_Condensed'] font-black text-[13px] text-slate-800 group-hover:text-red-700 transition-colors text-center leading-tight">
                    {country.country_name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-red-400 transition-colors">
                    {country.abbreviation}
                  </span>
                </button>
              ))}
            </div>
          )}

          <p className="text-center text-[11px] text-slate-400 mt-6">
            You can change this anytime from the site settings.
          </p>
        </div>
      </div>
    </div>
  );
}
