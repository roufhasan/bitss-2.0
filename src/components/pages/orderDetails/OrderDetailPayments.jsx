import {
  getPaymentMethodLabel,
  getPaymentStatusBadge,
  formatDate,
  getCurrencySymbol,
} from "@/utils/orderHelpers";

export default function OrderDetailPayments({ payments, currencyIcon }) {
  const currency = getCurrencySymbol(currencyIcon);
  if (!payments?.length) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="font-['Barlow_Condensed'] text-[17px] font-black text-slate-900">
          Payment History
        </h2>
      </div>
      <div className="p-4 flex flex-col gap-3">
        {payments.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Barlow_Condensed'] text-[15px] font-black text-slate-900">
                {getPaymentMethodLabel(p.payment_method)}
              </span>
              <span
                className={`text-[10px] font-bold border px-2 py-0.5 rounded-md capitalize ${getPaymentStatusBadge(p.status)}`}
              >
                {p.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  label: "Amount",
                  value: `${currency}${Number(p.amount).toLocaleString()}`,
                },
                { label: "Type", value: p.payment_type },
                { label: "Paid At", value: formatDate(p.paid_at) },
                { label: "Txn ID", value: p.transaction_id ?? "—" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                    {label}
                  </p>
                  <p className="text-[12px] font-semibold text-slate-700 mt-0.5">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
