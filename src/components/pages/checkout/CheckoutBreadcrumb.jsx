import Link from "next/link";
import { ShieldCheck, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function CheckoutBreadcrumb({ productName }) {
  return (
    <div className="fu1 mb-10">
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center">
          <Image src="/img/logo.png" alt="BITSS" width={28} height={28} />
        </div>
        <ChevronRight size={13} className="text-slate-300" />
        <Link
          href="/products"
          className="text-[13px] text-slate-400 hover:text-slate-600 transition-colors"
        >
          Products
        </Link>
        <ChevronRight size={13} className="text-slate-300" />
        <span className="text-[13px] text-slate-400 truncate max-w-[120px]">
          {productName}
        </span>
        <ChevronRight size={13} className="text-slate-300" />
        <span className="text-[13px] text-slate-600 font-medium">Checkout</span>
      </div>
      <h1
        className="font-['Barlow_Condensed'] font-black text-slate-900 leading-none"
        style={{ fontSize: "clamp(30px,5vw,48px)" }}
      >
        COMPLETE YOUR <span className="text-red-600">ORDER</span>
      </h1>
    </div>
  );
}
