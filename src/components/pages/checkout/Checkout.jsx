import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import CheckoutBreadcrumb from "./CheckoutBreadcrumb";
import CheckoutProductCard from "./CheckoutProductCard";
import CheckoutPaymentMethod from "./CheckoutPaymentMethod";
import CheckoutDomain from "./CheckoutDomain";
import CheckoutBankInfo from "./CheckoutBankInfo";
import CheckoutSummary from "./CheckoutSummary";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCountry } from "@/context/CountryContext";
import { useCheckoutParams } from "@/hooks/useCheckoutParams";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { resolveDisplayPrice } from "@/utils/checkoutUtils";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

export default function Checkout() {
  const router = useRouter();
  const { token } = useAuth();
  const { selectedCountry } = useCountry();
  const params = useCheckoutParams();
  const { productId, productSlug, subId, variantId, unit, countryId } = params;

  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [domain, setDomain] = useState("");
  const [validationError, setValidationError] = useState(null);
  const bankInformation = selectedCountry?.bank_informations || [];

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["checkout-product", productSlug, countryId],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/products/${productSlug}?country_id=${countryId}`,
      );
      const json = await res.json();
      if (!res.ok || json.status === false)
        throw new Error(json.message || "Failed to load product");
      return json.data ?? json;
    },
    enabled: !!productSlug && !!countryId,
    staleTime: 1000 * 60 * 5,
  });

  const priceRow = resolveDisplayPrice(product, params);
  const displayTotal = product?.is_usb
    ? priceRow?.price_after_discount
    : (priceRow?.final_price ?? priceRow?.price_after_discount);

  const currencySymbol = selectedCountry?.currency_icon
    ? new DOMParser().parseFromString(
        selectedCountry.currency_icon,
        "text/html",
      ).body.textContent
    : "$";

  // ---> Order Mutation <---
  const {
    mutate: placeOrder,
    isPending: isSubmitting,
    error: submitError,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`${BASE_URL}/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.status === false)
        throw new Error(data.message || "Order failed.");
      return data;
    },
    onSuccess: (data) => {
      const order = data?.order ?? {};
      const params = new URLSearchParams();
      params.set("order", order.order_number ?? order.id ?? "");
      params.set("method", data?.payment?.payment_method ?? "");
      router.push(`/checkout/success?${params.toString()}`);
    },
  });

  const handleSubmit = () => {
    resetMutation();
    setValidationError(null);

    if (!domain.trim()) {
      setValidationError("Please enter the domain for this license.");
      return;
    }

    if (!DOMAIN_REGEX.test(domain.trim())) {
      setValidationError("Please enter a valid domain — e.g. yoursite.com");
      return;
    }

    if (!productId || !countryId || displayTotal == null) {
      setValidationError("Missing order info. Please go back and try again.");
      return;
    }

    placeOrder({
      product_id: productId,
      amount: displayTotal,
      payment_method: paymentMethod,
      country_id: countryId,
      subscription_period_id: subId ?? null,
      variant_id: variantId ?? null,
      domain: domain.trim() || null,
    });
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="animate-spin text-red-500" />
          <p className="text-[13px] text-slate-400">Loading your order…</p>
        </div>
      </div>
    );

  if (error || !product)
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} className="text-red-500" />
          </div>
          <h2 className="font-['Barlow_Condensed'] text-[22px] font-black text-slate-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-[13px] text-slate-400 mb-6">
            {error?.message ?? "Could not load product details."}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-[14px] font-semibold"
          >
            Back to Products
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

      <section className="relative min-h-screen bg-white overflow-hidden pt-16">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_20%,rgba(254,242,242,0.8)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
          <CheckoutBreadcrumb productName={product.name} />

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            <div className="flex flex-col gap-6">
              {(validationError || submitError) && (
                <div className="fu2 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle
                    size={15}
                    className="text-red-500 shrink-0 mt-0.5"
                  />
                  <p className="text-red-600 text-[13px] leading-snug">
                    {validationError ?? submitError?.message}
                  </p>
                </div>
              )}
              <CheckoutProductCard
                product={product}
                subId={subId}
                variantId={variantId}
                unit={unit}
                priceRow={priceRow}
              />
              <CheckoutPaymentMethod
                selected={paymentMethod}
                onChange={setPaymentMethod}
                bankInformation={bankInformation}
              />
              <CheckoutDomain
                value={domain}
                onChange={setDomain}
                domainRegex={DOMAIN_REGEX}
              />
              {paymentMethod === "bank_transfer" && (
                <CheckoutBankInfo
                  bankInformations={selectedCountry?.bank_informations}
                />
              )}
            </div>

            <CheckoutSummary
              product={product}
              priceRow={priceRow}
              subId={subId}
              variantId={variantId}
              unit={unit}
              selectedCountry={selectedCountry}
              paymentMethod={paymentMethod}
              domain={domain}
              displayTotal={displayTotal}
              currencySymbol={currencySymbol}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              productSlug={productSlug}
            />
          </div>
        </div>
      </section>
    </>
  );
}
