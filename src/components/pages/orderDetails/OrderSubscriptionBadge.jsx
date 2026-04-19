import { CalendarClock, Key, Tag, Usb } from "lucide-react";

function durationLabel(months) {
  if (months === 12) return "1 Year";
  if (months === 24) return "2 Years";
  if (months === 36) return "3 Years";
  return `${months} Months`;
}

export default function OrderSubscriptionBadge({ order, subscription }) {
  if (!subscription?.duration && !subscription?.unit) return null;

  const { duration, discount_type, amount } = subscription;
  const hasDiscount = amount > 0 && discount_type;

  return (
    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-sky-50 border border-sky-100">
      {/* Duration pill */}
      {duration && (
        <div className="flex items-center gap-1.5">
          <CalendarClock size={13} className="text-sky-500 shrink-0" />
          <span className="text-[12px] font-bold text-sky-700 uppercase tracking-wide">
            {durationLabel(duration)}
          </span>
        </div>
      )}

      {/* variant pill */}
      {order?.variant && (
        <div className="flex items-center gap-1.5">
          <Usb size={13} className="text-sky-500 shrink-0" />
          <span className="text-[12px] font-bold text-sky-700 uppercase tracking-wide">
            {order?.variant?.name}
          </span>
        </div>
      )}

      {/* Divider */}
      {(hasDiscount || subscription?.unit) && (
        <span className="w-px h-3.5 bg-sky-200 shrink-0" />
      )}

      {/* Discount pill */}
      {hasDiscount && (
        <div className="flex items-center gap-1.5">
          <Tag size={11} className="text-emerald-500 shrink-0" />
          <span className="text-[11px] font-bold text-emerald-700">
            {discount_type === "percent" || discount_type === "percentage"
              ? `${amount}% off`
              : `-$${amount}`}
          </span>
        </div>
      )}

      {/* unit pill */}
      {subscription?.unit && (
        <div className="flex items-center gap-1.5">
          <Tag size={11} className="text-emerald-500 shrink-0" />
          <span className="text-[11px] font-bold text-emerald-700">
            {subscription?.unit} Key
          </span>
        </div>
      )}
    </div>
  );
}
