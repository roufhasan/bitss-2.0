"use client";
import { PAYMENT_METHODS, ACCENT } from "@/utils/constants/checkout";
import { useEffect } from "react";

export default function CheckoutPaymentMethod({
  selected,
  onChange,
  bankInformation,
}) {
  const isBankPaymentIntegrated = bankInformation?.length > 0 || false;

  const availableMethods = isBankPaymentIntegrated
    ? PAYMENT_METHODS
    : PAYMENT_METHODS.filter((m) => m.id !== "bank_transfer");

  useEffect(() => {
    if (!isBankPaymentIntegrated && selected === "bank_transfer") {
      onChange(availableMethods[0]?.id ?? "mobile_banking");
    }
  }, [isBankPaymentIntegrated]);

  return (
    <div className="fu2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="font-['Barlow_Condensed'] text-[18px] font-black text-slate-900">
          Payment Method
        </h2>
        <p className="text-[12px] text-slate-400 mt-0.5">
          Select how you&apos;d like to pay
        </p>
      </div>
      <div className="p-4 grid sm:grid-cols-3 gap-3">
        {availableMethods.map((m) => {
          const isSelected = selected === m.id;
          const a = ACCENT[m.accent];
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => onChange(m.id)}
              className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200
                ${isSelected ? `${a.border} ${a.bg}` : "border-slate-200 hover:border-slate-300 bg-white"}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${isSelected ? "bg-white shadow-sm" : "bg-slate-50"}`}
              >
                <Icon
                  size={16}
                  className={isSelected ? a.text : "text-slate-400"}
                />
              </div>
              <p
                className={`text-[13px] font-bold mb-0.5 ${isSelected ? "text-slate-900" : "text-slate-700"}`}
              >
                {m.label}
              </p>
              <p className="text-[11px] text-slate-400 leading-snug">
                {m.desc}
              </p>
              {isSelected && (
                <div
                  className={`absolute top-3 right-3 w-4 h-4 rounded-full ${a.dot} flex items-center justify-center`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
