"use client";
import { MapPin, Phone, Pencil, CheckCircle2, AlertCircle } from "lucide-react";

export default function CheckoutDeliveryAddress({
  address,
  onAddressChange,
  phone,
  onPhoneChange,
}) {
  const addressDirty = address.length > 0;
  const addressValid = address.trim().length >= 5;
  const addressInvalid = addressDirty && !addressValid;

  const phoneDirty = phone.length > 0;
  const phoneValid = /^[+\d][\d\s\-().]{6,19}$/.test(phone.trim());
  const phoneInvalid = phoneDirty && !phoneValid;

  return (
    <div className="fu3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-['Barlow_Condensed'] text-[18px] font-black text-slate-900">
            Delivery Address
          </h2>
          <p className="text-[12px] text-slate-400 mt-0.5">
            Where should we deliver this order?
          </p>
        </div>
        <span className="shrink-0 mt-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1 rounded-lg">
          Required
        </span>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {/* Address field */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
            Full Address
          </label>
          <div className="relative">
            <MapPin
              size={15}
              className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none"
            />
            <textarea
              rows={2}
              placeholder="Street, City, Country"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              className={`w-full pl-10 pr-10 py-3 rounded-xl border text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition-all duration-200 resize-none
                ${
                  addressInvalid
                    ? "border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-red-100"
                    : addressValid
                      ? "border-emerald-300 bg-white focus:border-emerald-400 focus:ring-emerald-100"
                      : "border-slate-200 bg-white focus:border-red-400 focus:ring-red-100"
                }`}
            />
            {addressDirty && (
              <div className="absolute right-3.5 top-3.5">
                {addressValid ? (
                  <CheckCircle2 size={15} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={15} className="text-red-400" />
                )}
              </div>
            )}
          </div>
          {addressInvalid && (
            <p className="text-[11px] text-red-400 mt-1.5 font-medium">
              Please enter a valid delivery address (at least 5 characters)
            </p>
          )}
        </div>

        {/* Phone field */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <Phone
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="tel"
              placeholder="e.g. 01712345678"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className={`w-full pl-10 pr-10 py-3 rounded-xl border text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition-all duration-200
                ${
                  phoneInvalid
                    ? "border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-red-100"
                    : phoneValid
                      ? "border-emerald-300 bg-white focus:border-emerald-400 focus:ring-emerald-100"
                      : "border-slate-200 bg-white focus:border-red-400 focus:ring-red-100"
                }`}
            />
            {phoneDirty && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                {phoneValid ? (
                  <CheckCircle2 size={15} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={15} className="text-red-400" />
                )}
              </div>
            )}
          </div>
          {phoneInvalid ? (
            <p className="text-[11px] text-red-400 mt-1.5 font-medium">
              Enter a valid phone number — e.g. 01712345678 or +8801712345678
            </p>
          ) : (
            <p className="text-[11px] text-slate-400 mt-1.5">
              We'll contact you on this number for delivery updates
            </p>
          )}
        </div>

        {/* Pre-fill hint */}
        <p className="text-[11px] text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 leading-snug flex items-start gap-1.5">
          <Pencil size={11} className="mt-0.5 shrink-0 text-slate-400" />
          Address pre-filled from your account — edit freely if delivering
          elsewhere.
        </p>
      </div>
    </div>
  );
}
