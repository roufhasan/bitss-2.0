"use client";
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Loader2,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

// Inner form — must be inside <Elements>
function StripeForm({ orderId, token, displayTotal, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handlePay(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setError(null);
    setLoading(true);

    // Step 1 — Stripe validates the card, stays on page
    const { error: stripeErr, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: "if_required",
    });

    if (stripeErr) {
      setError(stripeErr.message ?? "Payment failed. Please try again.");
      setLoading(false);
      return;
    }

    // Step 2 — Tell your backend to confirm
    try {
      const res = await fetch(`${BASE_URL}/payment/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          payment_intent_id: paymentIntent.id,
          order_id: orderId,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.status === false)
        throw new Error(data.message || "Confirmation failed.");

      queryClient.invalidateQueries({ queryKey: ["user-orders"] });

      setDone(true);
      setTimeout(() => {
        const p = new URLSearchParams();
        p.set("order", orderId);
        p.set("method", "stripe");
        router.push(`/checkout/success?${p.toString()}`);
      }, 1400);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm px-6 py-10 flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
          <CheckCircle2
            size={30}
            className="text-emerald-500"
            strokeWidth={1.5}
          />
        </div>
        <p className="font-['Barlow_Condensed'] text-[20px] font-black text-slate-900">
          Payment Confirmed!
        </p>
        <p className="text-[13px] text-slate-400">Redirecting to your order…</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-violet-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-violet-100 bg-violet-50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white border border-violet-200 flex items-center justify-center shrink-0">
          <ShieldCheck size={15} className="text-violet-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-['Barlow_Condensed'] text-[16px] font-black text-slate-900">
            Card Payment
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Secured by Stripe · End-to-end encrypted
          </p>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[12px] text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft size={13} /> Change
        </button>
      </div>

      {/* Stripe element */}
      <form onSubmit={handlePay} className="p-6 flex flex-col gap-5">
        <PaymentElement />

        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-red-600 text-[13px] leading-snug">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[14px] font-semibold transition-all duration-200 shadow-sm shadow-red-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Processing…
            </>
          ) : (
            <>
              <ShieldCheck size={15} /> Pay {displayTotal}{" "}
              <ChevronRight size={14} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// Outer wrapper — provides Stripe context
export default function CheckoutStripePanel({
  clientSecret,
  orderId,
  token,
  displayTotal,
  onBack,
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#DC2626",
            colorBackground: "#ffffff",
            colorText: "#0f172a",
            colorDanger: "#DC2626",
            fontFamily: "'DM Sans', sans-serif",
            borderRadius: "12px",
          },
        },
      }}
    >
      <StripeForm
        orderId={orderId}
        token={token}
        displayTotal={displayTotal}
        onBack={onBack}
      />
    </Elements>
  );
}
