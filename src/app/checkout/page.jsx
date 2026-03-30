"use client";

import { Suspense } from "react";

import { Loader2 } from "lucide-react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import Checkout from "@/components/pages/checkout/Checkout";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-red-500" />
        </div>
      }
    >
      <PrivateRoute>
        <Checkout />
      </PrivateRoute>
    </Suspense>
  );
}
