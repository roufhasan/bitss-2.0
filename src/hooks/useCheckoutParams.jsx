import { useSearchParams } from "next/navigation";
import { useCountry } from "@/context/CountryContext";

export function useCheckoutParams() {
  const searchParams = useSearchParams();
  const { selectedCountry } = useCountry();

  return {
    productId: searchParams.get("product_id")
      ? Number(searchParams.get("product_id"))
      : null,
    productSlug: searchParams.get("slug") ?? null,
    subId: searchParams.get("sub") ? Number(searchParams.get("sub")) : null,
    variantId: searchParams.get("variant")
      ? Number(searchParams.get("variant"))
      : null,
    unit: searchParams.get("unit") ? Number(searchParams.get("unit")) : null,
    priceId: searchParams.get("price_id")
      ? Number(searchParams.get("price_id"))
      : null,
    countryId: selectedCountry?.id ?? null,
    country: selectedCountry ?? null,
  };
}
