import Link from "next/link";
import { Package, ChevronRight, Usb, Layers, Box } from "lucide-react";
import {
  getCurrencySymbol,
  getProductTypeBadge,
  getStatusBadge,
  getPaymentMethodLabel,
  getPaymentStatusBadge,
  formatDate,
} from "@/utils/orderHelpers";

function ProductIcon({ product }) {
  if (product.is_usb) return <Usb size={18} className="text-violet-500" />;
  if (product.is_combo) return <Layers size={18} className="text-amber-500" />;
  return <Box size={18} className="text-sky-500" />;
}

export default function OrderCard({ order }) {
  const currency = getCurrencySymbol(order.country?.currency_icon);
  const typeBadge = getProductTypeBadge(order.product);
  const statusBadge = getStatusBadge(order.status);
  const payment = order?.payment;

  return (
    <Link
      href={`/dashboard/orders/${order.id}`}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-red-200 hover:shadow-lg hover:shadow-red-50/60 transition-all duration-200 overflow-hidden block"
    >
      {/* top accent on hover */}
      <div className="h-0.5 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* product icon + name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              <ProductIcon product={order.product} />
            </div>
            <div className="min-w-0">
              <p className="font-['Barlow_Condensed'] text-[16px] font-black text-slate-900 leading-tight truncate">
                {order.product.name}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                #{order.order_number}
              </p>
            </div>
          </div>

          {/* order status */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest shrink-0 ${statusBadge.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
            {statusBadge.label}
          </span>
        </div>

        {/* meta row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
              Amount
            </p>
            <p className="text-[14px] font-black text-slate-900 font-['Barlow_Condensed']">
              {currency}
              {Number(order.amount).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
              Started
            </p>
            <p className="text-[13px] font-semibold text-slate-700">
              {formatDate(order.start_at)}
            </p>
          </div>
          {/* TODO: implement expire date on backend */}
          {/* <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
              Expires
            </p>
            <p className="text-[13px] font-semibold text-slate-700">
              {formatDate(order.expire_at)}
            </p>
          </div> */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
              Country
            </p>
            <p className="text-[13px] font-semibold text-slate-700">
              {order.country?.country_name ?? "—"}
            </p>
          </div>
        </div>

        {/* footer row */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            {/* product type */}
            <span
              className={`text-[10px] font-bold border px-2 py-0.5 rounded-md ${typeBadge.color}`}
            >
              {typeBadge.label}
            </span>
            {/* payment method + status */}
            {payment && (
              <>
                <span className="text-[10px] text-slate-400 font-medium">
                  {getPaymentMethodLabel(payment.payment_method)}
                </span>
                <span
                  className={`text-[10px] font-bold border px-2 py-0.5 rounded-md capitalize ${getPaymentStatusBadge(payment.status)}`}
                >
                  {payment.status}
                </span>
              </>
            )}
          </div>
          <ChevronRight
            size={15}
            className="text-slate-300 group-hover:text-red-400 transition-colors shrink-0"
          />
        </div>
      </div>
    </Link>
  );
}
