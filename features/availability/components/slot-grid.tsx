import { formatSlotTime } from "@/features/availability/utils";
import type { TimeSlot } from "@/features/availability/types";
import { formatCents } from "@/lib/utils/currency";

type SlotGridProps = {
  slots: TimeSlot[];
  selectedSlotId: string | null;
  name?: string;
  onSelect?: (slotId: string) => void;
};

export function SlotGrid({
  slots,
  selectedSlotId,
  name = "slot",
  onSelect,
}: SlotGridProps) {
  if (slots.length === 0) {
    return (
      <p className="text-sm text-foreground/70">
        No hay franjas para esta fecha.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {slots.map((slot) => {
        const disabled = slot.status !== "available";
        const selected = selectedSlotId === slot.id;
        const label = `${formatSlotTime(slot.start)} – ${formatSlotTime(slot.end)} · ${formatCents(slot.priceCents)}`;

        if (onSelect) {
          return (
            <label
              key={slot.id}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm transition ${
                disabled
                  ? "cursor-not-allowed border-foreground/10 opacity-40"
                  : selected
                    ? "border-foreground bg-foreground/10"
                    : "border-foreground/20 hover:border-foreground/40"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={slot.id}
                disabled={disabled}
                checked={selected}
                onChange={() => onSelect(slot.id)}
                className="sr-only"
              />
              {formatSlotTime(slot.start)}
              <span className="mt-0.5 block text-xs text-foreground/60">
                {formatCents(slot.priceCents)}
              </span>
            </label>
          );
        }

        return (
          <div
            key={slot.id}
            className="rounded-lg border border-foreground/20 px-3 py-2 text-center text-sm"
            title={label}
          >
            {formatSlotTime(slot.start)}
          </div>
        );
      })}
    </div>
  );
}
