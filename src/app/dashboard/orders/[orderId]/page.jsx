"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import PrivateRoute from "@/components/shared/PrivateRoute";
import OrderDetailHeader from "@/components/pages/orderDetails/OrderDetailHeader";
import OrderDetailInfo from "@/components/pages/orderDetails/OrderDetailInfo";
import OrderDetailPayments from "@/components/pages/orderDetails/OrderDetailPayments";
import OrderDetailBankInfo from "@/components/pages/orderDetails/OrderDetailBankInfo";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function OrderDetailsInner() {
  const { orderId } = useParams();
  const { token } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order-details", orderId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/orders/order/details/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (!res.ok || json.success === false)
        throw new Error(json.message || "Failed to fetch order details");
      return json;
    },
    enabled: !!token && !!orderId,
    staleTime: 1000 * 60 * 2,
  });

  const order = data?.data ?? null;

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="animate-spin text-red-500" />
          <p className="text-[13px] text-slate-400">Loading order details…</p>
        </div>
      </div>
    );

  if (isError || !order)
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} className="text-red-500" />
          </div>
          <h2 className="font-['Barlow_Condensed'] text-[22px] font-black text-slate-900 mb-2">
            Order Not Found
          </h2>
          <p className="text-[13px] text-slate-400 mb-6">
            {error?.message ?? "Could not load order details."}
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-[14px] font-semibold"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        body{font-family:'DM Sans',sans-serif;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .fu1{animation:fadeUp .5s ease forwards .05s;opacity:0}
        .fu2{animation:fadeUp .5s ease forwards .15s;opacity:0}
        .fu3{animation:fadeUp .5s ease forwards .25s;opacity:0}
        .dot-grid{background-image:radial-gradient(circle,#e2e8f0 1.5px,transparent 1.5px);background-size:26px 26px;}
      `}</style>

      <section className="relative min-h-screen bg-slate-50 overflow-hidden pt-16">
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
          <OrderDetailHeader order={order} />

          <div className="fu2 grid lg:grid-cols-[1fr_360px] gap-6 items-start">
            {/* LEFT */}
            <div className="flex flex-col gap-6">
              <OrderDetailInfo order={order} />
              <OrderDetailPayments
                payments={order.payments}
                currencyIcon={order.country?.currency_icon}
              />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-6">
              <OrderDetailBankInfo
                bankInformations={order.country?.bank_informations}
                payments={order.payments}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function OrderDetails() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-red-500" />
        </div>
      }
    >
      <PrivateRoute>
        <OrderDetailsInner />
      </PrivateRoute>
    </Suspense>
  );
}
