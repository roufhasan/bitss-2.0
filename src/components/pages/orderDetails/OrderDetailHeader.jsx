import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Usb, Layers, Box } from "lucide-react";
import { getStatusBadge, getProductTypeBadge } from "@/utils/orderHelpers";
import OrderSubscriptionBadge from "./OrderSubscriptionBadge";

function ProductIcon({ product }) {
  if (product.is_usb) return <Usb size={22} className="text-violet-500" />;
  if (product.is_combo) return <Layers size={22} className="text-amber-500" />;
  return <Box size={22} className="text-sky-500" />;
}

export default function OrderDetailHeader({ order }) {
  const statusBadge = getStatusBadge(order.status);
  const typeBadge = getProductTypeBadge(order.product);

  return (
    <div className="fu1 mb-8">
      {/* breadcrumb */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/img/logo.png" alt="BITSS" width={28} height={28} />
          <span className="font-['Barlow_Condensed'] text-[17px] font-black text-slate-900 tracking-wide">
            BITSS
          </span>
        </Link>
        <ChevronRight size={13} className="text-slate-300" />
        <Link
          href="/dashboard"
          className="text-[13px] text-slate-400 hover:text-slate-600 transition-colors"
        >
          Dashboard
        </Link>
        <ChevronRight size={13} className="text-slate-300" />
        <span className="text-[13px] text-slate-600 font-medium">
          Order #{order.order_number}
        </span>
      </div>

      {/* title row */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
            <ProductIcon product={order.product} />
          </div>
          <div>
            <h1
              className="font-['Barlow_Condensed'] font-black text-slate-900 leading-none"
              style={{ fontSize: "clamp(24px,4vw,40px)" }}
            >
              {order.product.name}
            </h1>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="font-mono text-[12px] text-slate-400">
                #{order.order_number}
              </span>
              <span
                className={`text-[10px] font-bold border px-2 py-0.5 rounded-md ${typeBadge.color}`}
              >
                {typeBadge.label}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-bold uppercase tracking-widest ${statusBadge.color}`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${statusBadge.dot}`}
            />
            {statusBadge.label}
          </span>

          {order?.subscription && (
            <OrderSubscriptionBadge
              order={order}
              subscription={order.subscription}
            />
          )}
        </div>
      </div>
    </div>
  );
}
