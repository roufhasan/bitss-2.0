"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
    }
  }, [isAuthenticated, isLoading, pathname, router, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="animate-spin text-red-500" />
          <p className="text-[13px] text-slate-400">Checking authentication…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return children;
}
