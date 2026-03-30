"use client";

import PrivateRoute from "@/components/shared/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle, ShoppingBag } from "lucide-react";
import { Suspense } from "react";
import OrderCard from "@/components/dashboard/OrderCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function DashboardInner() {
  const { token, user } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/orders/index`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (!res.ok || json.success === false)
        throw new Error(json.message || "Failed to fetch orders");
      return json;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 2,
  });

  const orders = data?.data ?? [];

  // compute stats
  const stats = orders.reduce(
    (acc, o) => {
      if (o.status === "active") acc.active++;
      if (o.status === "processing") acc.processing++;
      if (o.status === "expired") acc.expired++;
      return acc;
    },
    { active: 0, processing: 0, expired: 0 },
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
          <DashboardHeader
            user={user}
            orderCount={orders.length}
            stats={stats}
          />

          {/* Orders list */}
          <div className="fu2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-['Barlow_Condensed'] text-[22px] font-black text-slate-900">
                MY ORDERS
              </h2>
              <span className="text-[12px] text-slate-400 font-medium">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </span>
            </div>

            {/* loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 size={28} className="animate-spin text-red-500" />
                <p className="text-[13px] text-slate-400">
                  Loading your orders…
                </p>
              </div>
            )}

            {/* error */}
            {isError && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle
                  size={15}
                  className="text-red-500 shrink-0 mt-0.5"
                />
                <p className="text-red-600 text-[13px]">{error?.message}</p>
              </div>
            )}

            {/* empty */}
            {!isLoading && !isError && orders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <ShoppingBag size={28} className="text-slate-300" />
                </div>
                <div>
                  <p className="font-['Barlow_Condensed'] text-[18px] font-black text-slate-900 mb-1">
                    No orders yet
                  </p>
                  <p className="text-[13px] text-slate-400">
                    Your orders will appear here once you make a purchase.
                  </p>
                </div>
              </div>
            )}

            {/* list */}
            {!isLoading && !isError && orders.length > 0 && (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-red-500" />
        </div>
      }
    >
      <PrivateRoute>
        <DashboardInner />
      </PrivateRoute>
    </Suspense>
  );
}
