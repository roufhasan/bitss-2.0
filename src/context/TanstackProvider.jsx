"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CountryProvider } from "@/context/CountryContext";
import { useState } from "react";
import { AuthProvider } from "./AuthContext";

export function TanstackProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 2,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CountryProvider>{children}</CountryProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
