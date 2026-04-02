import { getCurrencySymbol, formatDate } from "@/utils/orderHelpers";

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
        {label}
      </span>
      <span className="text-[13px] font-semibold text-slate-700 text-right max-w-[60%]">
        {value}
      </span>
    </div>
  );
}

export default function OrderDetailInfo({ order }) {
  const currency = getCurrencySymbol(order.country?.currency_icon);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="font-['Barlow_Condensed'] text-[17px] font-black text-slate-900">
          Order Details
        </h2>
      </div>
      <div className="px-6 py-2">
        <InfoRow label="Order ID" value={`#${order.order_number}`} />
        <InfoRow
          label="Amount"
          value={`${currency}${Number(order.amount).toLocaleString()}`}
        />
        <InfoRow label="Country" value={order.country?.country_name ?? "—"} />
        <InfoRow label="Started" value={formatDate(order.start_at)} />
        {/* TODO: implement expire date on backend */}
        {/* <InfoRow label="Expires" value={formatDate(order.expire_at)} /> */}
        <InfoRow label="Auto Renew" value={order.is_renew ? "Yes" : "No"} />
        {order.discount && (
          <InfoRow
            label="Discount"
            value={
              order.discount_type === "flat"
                ? `${currency}${order.discount}`
                : `${order.discount}%`
            }
          />
        )}
      </div>
    </div>
  );
}
