import Image from "next/image";

export default function DashboardHeader({ user, orderCount }) {
  return (
    <div className="fu1 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Image src="/img/logo.png" alt="BITSS" width={32} height={32} />
        <span className="font-['Barlow_Condensed'] text-[20px] font-black text-slate-900 tracking-wide">
          BITSS
        </span>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            My Dashboard
          </span>
          <h1
            className="font-['Barlow_Condensed'] font-black text-slate-900 leading-none"
            style={{ fontSize: "clamp(28px,5vw,48px)" }}
          >
            WELCOME BACK,{" "}
            <span className="text-red-600">
              {user?.name?.split(" ")[0]?.toUpperCase()}.
            </span>
          </h1>
        </div>

        {/* user avatar */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
            <span className="text-[14px] font-black text-red-600">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-800">
              {user?.name}
            </p>
            <p className="text-[11px] text-slate-400">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
        {[
          { label: "Total Orders", value: orderCount ?? "—" },
          { label: "Active", value: "—" },
          { label: "Processing", value: "—" },
          { label: "Expired", value: "—" },
        ].map((s) => (
          <div key={s.label} className="bg-white px-4 py-3 text-center">
            <div className="font-['Barlow_Condensed'] text-[22px] font-black text-slate-900 leading-none">
              {s.value}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
