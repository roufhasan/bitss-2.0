"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  LayoutDashboard,
  Building2,
} from "lucide-react";
import Image from "next/image";
import { useCountry } from "@/context/CountryContext";

function SuccessInner() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const paymentMethod = searchParams.get("method");

  const { selectedCountry } = useCountry();
  const bankInformations = selectedCountry?.bank_informations ?? [];
  const isBankTransfer = paymentMethod === "bank_transfer";

  const methodLabel =
    {
      bank_transfer: "Bank Transfer",
      mobile_banking: "Mobile Banking",
      stripe: "Card / Stripe",
    }[paymentMethod] ?? null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        body{font-family:'DM Sans',sans-serif;}
        @keyframes scaleIn{from{opacity:0;transform:scale(.6)} to{opacity:1;transform:scale(1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)}}
        @keyframes ripple{0%{transform:scale(1);opacity:.4} 100%{transform:scale(2.2);opacity:0}}
        .si  {animation:scaleIn .5s cubic-bezier(.34,1.56,.64,1) forwards .1s;opacity:0}
        .fu1 {animation:fadeUp .5s ease forwards .4s;opacity:0}
        .fu2 {animation:fadeUp .5s ease forwards .55s;opacity:0}
        .fu3 {animation:fadeUp .5s ease forwards .7s;opacity:0}
        .ripple::before,.ripple::after{
          content:'';position:absolute;inset:0;border-radius:9999px;
          border:2px solid #86efac;animation:ripple 2s ease-out infinite;
        }
        .ripple::after{animation-delay:.6s;}
        .dot-grid{background-image:radial-gradient(circle,#e2e8f0 1.5px,transparent 1.5px);background-size:26px 26px;}
      `}</style>

      <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden pt-16 px-4">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_45%,rgba(240,253,244,0.9)_0%,transparent_70%)]" />

        <div className="relative z-10 text-center max-w-lg w-full">
          {/* Icon */}
          <div className="si relative inline-flex items-center justify-center w-24 h-24 mb-8">
            <div className="ripple absolute inset-0 rounded-full" />
            <div className="relative w-24 h-24 rounded-full bg-emerald-100 border-4 border-emerald-200 flex items-center justify-center shadow-xl shadow-emerald-100">
              <CheckCircle2
                size={44}
                strokeWidth={1.75}
                className="text-emerald-600"
              />
            </div>
          </div>

          {/* Badge */}
          <div className="fu1 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-semibold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Order Confirmed
            </span>
          </div>

          {/* Heading */}
          <div className="fu1">
            <h1
              className="font-['Barlow_Condensed'] font-black text-slate-900 leading-none mb-3"
              style={{ fontSize: "clamp(40px,7vw,72px)" }}
            >
              YOU'RE <span className="text-emerald-600">PROTECTED.</span>
            </h1>
          </div>

          {(orderNumber || methodLabel) && (
            <div className="fu2 inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 mb-5">
              {orderNumber && (
                <>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                    Order
                  </span>
                  <span className="font-mono text-[13px] font-bold text-slate-700">
                    #{orderNumber}
                  </span>
                </>
              )}
              {orderNumber && methodLabel && (
                <span className="w-px h-4 bg-slate-200" />
              )}
              {methodLabel && (
                <>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                    Via
                  </span>
                  <span className="text-[13px] font-bold text-slate-700">
                    {methodLabel}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Message */}
          <p className="fu2 text-slate-500 text-[15px] leading-relaxed mb-10 max-w-sm mx-auto">
            Your order has been received. Our team will review and activate your
            license shortly. You'll be notified via email once it's ready.
          </p>

          {/* What's next card */}
          <div className="fu2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8 text-left">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">
              What happens next
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  step: "01",
                  title: "Order Review",
                  desc: "Our team verifies your order and payment details.",
                },
                {
                  step: "02",
                  title: "License Activation",
                  desc: "Your license is generated and linked to your account.",
                },
                {
                  step: "03",
                  title: "Email Confirmation",
                  desc: "You'll receive confirmation with your license details.",
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <span className="font-mono text-[10px] font-black text-emerald-600">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-slate-400 leading-snug mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bank info */}
          {isBankTransfer && bankInformations.length > 0 && (
            <div className="fu3 bg-white rounded-2xl border border-sky-200 overflow-hidden mb-8 text-left">
              <div className="px-5 py-4 border-b border-sky-100 bg-sky-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-sky-200 flex items-center justify-center shrink-0">
                  <Building2 size={15} className="text-sky-600" />
                </div>
                <div>
                  <h3 className="font-['Barlow_Condensed'] text-[15px] font-black text-slate-900">
                    Send Payment To
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Transfer the exact order amount to one of these accounts
                  </p>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                {bankInformations
                  .filter((b) => b.type_name === "bank_transfer")
                  .map((bank) => (
                    <div
                      key={bank.id}
                      className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <p className="font-['Barlow_Condensed'] text-[15px] font-black text-slate-900 mb-2">
                        {bank.bank_name}
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {[
                          { label: "Account No", value: bank.account_no },
                          { label: "Branch", value: bank.branch },
                          { label: "Routing No", value: bank.routing_number },
                          { label: "Swift Code", value: bank.swift_code },
                        ].map(({ label, value }) => (
                          <div
                            key={label}
                            className="flex items-center justify-between text-[12px]"
                          >
                            <span className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">
                              {label}
                            </span>
                            <span className="font-mono font-bold text-slate-700">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 leading-snug">
                  ⚠ Please use your order number <strong>#{orderNumber}</strong>{" "}
                  as the payment reference.
                </p>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="fu3 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-[14px] transition-all duration-200 shadow-sm shadow-red-200"
            >
              <LayoutDashboard size={15} /> Go to Dashboard
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 font-semibold text-[14px] transition-all duration-200 hover:bg-slate-50"
            >
              Browse Products <ArrowRight size={14} />
            </Link>
          </div>

          {/* Footer branding */}
          <div className="fu3 mt-10 flex items-center justify-center gap-2 opacity-50">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center">
              <Image src="/img/logo.png" alt="BITSS" width={28} height={28} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-red-200 border-t-red-600 animate-spin" />
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
