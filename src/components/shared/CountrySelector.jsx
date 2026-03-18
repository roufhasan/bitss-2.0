import { useCountry } from "@/context/CountryContext";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CountrySelector() {
  const { selectedCountry, resetCountry } = useCountry();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/countries`);
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  // Close on outside click
  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const { selectCountry } = useCountry();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 text-[13px] font-medium text-slate-600 hover:text-red-600"
      >
        {selectedCountry ? (
          <>
            <span
              dangerouslySetInnerHTML={{
                __html: selectedCountry.currency_icon,
              }}
              className="text-[14px] leading-none"
            />
            <span className="font-mono text-[12px]">
              {selectedCountry.abbreviation}
            </span>
          </>
        ) : (
          <>
            <Globe size={14} />
            <span>Region</span>
          </>
        )}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="flex items-center gap-2">
              <Globe size={13} className="text-red-400" />
              <span className="text-[12px] font-bold text-white tracking-wide uppercase">
                Select Region
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Pricing shown in your local currency
            </p>
          </div>

          {/* Country grid */}
          <div className="p-3 grid grid-cols-3 gap-1.5 max-h-64 overflow-y-auto">
            {countries?.map((country) => (
              <button
                key={country.id}
                onClick={() => {
                  selectCountry(country);
                  setOpen(false);
                }}
                className={`group flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all duration-150 cursor-pointer
                  ${
                    selectedCountry?.id === country.id
                      ? "border-red-300 bg-red-50"
                      : "border-slate-100 hover:border-red-200 hover:bg-red-50"
                  }`}
              >
                <span
                  className={`text-[16px] font-black leading-none transition-colors
                    ${selectedCountry?.id === country.id ? "text-red-600" : "text-slate-700 group-hover:text-red-600"}`}
                  dangerouslySetInnerHTML={{ __html: country.currency_icon }}
                />
                <span className="text-[9px] font-bold text-slate-500 group-hover:text-red-600 transition-colors text-center leading-tight">
                  {country.abbreviation}
                </span>
              </button>
            ))}
          </div>

          {/* Reset */}
          {selectedCountry && (
            <div className="px-3 pb-3">
              <button
                onClick={() => {
                  resetCountry();
                  setOpen(false);
                }}
                className="w-full py-2 rounded-xl border border-slate-200 text-[12px] text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-200"
              >
                Reset region
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
