"use client";
import { Globe, CheckCircle2, AlertCircle } from "lucide-react";

export default function CheckoutDomain({ value, onChange, domainRegex }) {
  const isDirty = value.length > 0;
  const isValid = domainRegex.test(value.trim());
  const isInvalid = isDirty && !isValid;

  return (
    <div className="fu3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="font-['Barlow_Condensed'] text-[18px] font-black text-slate-900">
          Domain
        </h2>
        <p className="text-[12px] text-slate-400 mt-0.5">
          Enter the domain this license will be activated for
        </p>
      </div>
      <div className="p-6">
        <div className="relative">
          <Globe
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="yourwebsite.com"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full pl-10 pr-10 py-3 rounded-xl border text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition-all duration-200
              ${
                isInvalid
                  ? "border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-red-100"
                  : isValid
                    ? "border-emerald-300 bg-white focus:border-emerald-400 focus:ring-emerald-100"
                    : "border-slate-200 bg-white focus:border-red-400 focus:ring-red-100"
              }`}
          />
          {/* status icon on the right */}
          {isDirty && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
              {isValid ? (
                <CheckCircle2 size={15} className="text-emerald-500" />
              ) : (
                <AlertCircle size={15} className="text-red-400" />
              )}
            </div>
          )}
        </div>

        {/* feedback message */}
        {isInvalid ? (
          <p className="text-[11px] text-red-400 mt-2 font-medium">
            Enter a valid domain — e.g. yoursite.com or sub.yoursite.com
          </p>
        ) : (
          <p className="text-[11px] text-red-400 mt-2 font-medium">
            * Required — the domain where this product will be deployed
          </p>
        )}
      </div>
    </div>
  );
}
