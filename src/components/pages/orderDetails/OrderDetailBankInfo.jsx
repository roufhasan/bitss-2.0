import { Building2 } from "lucide-react";

function CopyValue({ value }) {
  function copy() {
    navigator.clipboard.writeText(value);
  }
  return (
    <button
      onClick={copy}
      className="font-mono text-[12px] font-bold text-slate-700 hover:text-red-600 transition-colors text-right"
    >
      {value}
    </button>
  );
}

export default function OrderDetailBankInfo({ bankInformations, payments }) {
  const isBankTransfer = payments?.[0]?.payment_method === "bank_transfer";
  const banks =
    bankInformations?.filter((b) => b.type_name === "bank_transfer") ?? [];
  if (!isBankTransfer || !banks.length) return null;

  return (
    <div className="bg-white rounded-2xl border border-sky-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-sky-100 bg-sky-50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white border border-sky-200 flex items-center justify-center shrink-0">
          <Building2 size={15} className="text-sky-600" />
        </div>
        <div>
          <h2 className="font-['Barlow_Condensed'] text-[16px] font-black text-slate-900">
            Bank Transfer Details
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Transfer the exact amount to one of these accounts
          </p>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
          >
            <p className="font-['Barlow_Condensed'] text-[15px] font-black text-slate-900 mb-2">
              {bank.bank_name}
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                { label: "Account No", value: bank.account_no },
                { label: "Branch", value: bank.branch },
                { label: "Routing No", value: bank.routing_number },
                { label: "Swift Code", value: bank.swift_code },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                    {label}
                  </span>
                  <CopyValue value={value} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
          ⚠ Allow 1–2 business days for confirmation after transfer.
        </p>
      </div>
    </div>
  );
}
