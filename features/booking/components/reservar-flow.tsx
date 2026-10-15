"use client";

import { useCallback, useEffect, useState } from "react";
import { BookingForm } from "@/features/booking/components/booking-form";
import { SlotGrid } from "@/features/availability/components/slot-grid";
import type { TimeSlot } from "@/features/availability/types";
import { filterAvailableSlots } from "@/features/availability/utils";
import { Card } from "@/components/ui/card";
import { SPORT_LABELS } from "@/lib/constants/sports";
import { formatCents } from "@/lib/utils/currency";
import { toDateInputValue } from "@/lib/utils/dates";
import type { Court } from "@/features/venues/types";

type ReservarFlowProps = {
  venueSlug: string;
  courts: Court[];
};

export function ReservarFlow({ venueSlug, courts }: ReservarFlowProps) {
  const [courtId, setCourtId] = useState(courts[0]?.id ?? "");
  const [date, setDate] = useState(toDateInputValue(new Date()));
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const court = courts.find((c) => c.id === courtId);

  const loadSlots = useCallback(async () => {
    if (!courtId) return;
    setLoading(true);
    setSelectedSlotId(null);
    try {
      const res = await fetch(
        `/api/availability?courtId=${encodeURIComponent(courtId)}&date=${encodeURIComponent(date)}`,
      );
      const data = (await res.json()) as TimeSlot[];
      setSlots(data);
    } catch {
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, [courtId, date]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  const available = filterAvailableSlots(slots);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <h2 className="font-semibold">Cancha</h2>
          <select
            value={courtId}
            onChange={(e) => setCourtId(e.target.value)}
            className="mt-2 w-full rounded-lg border border-foreground/20 px-3 py-2 text-sm"
          >
            {courts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({SPORT_LABELS[c.sport]}) —{" "}
                {formatCents(c.pricePerSlotCents)}/franja
              </option>
            ))}
          </select>
        </Card>

        <Card>
          <h2 className="font-semibold">Fecha</h2>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full rounded-lg border border-foreground/20 px-3 py-2 text-sm"
          />
        </Card>

        <Card>
          <h2 className="mb-3 font-semibold">Franja horaria</h2>
          {loading ? (
            <p className="text-sm text-foreground/70">Cargando…</p>
          ) : (
            <SlotGrid
              slots={slots}
              selectedSlotId={selectedSlotId}
              onSelect={setSelectedSlotId}
            />
          )}
          {!loading && available.length === 0 && slots.length > 0 && (
            <p className="mt-2 text-sm text-foreground/70">
              Todas las franjas están ocupadas este día.
            </p>
          )}
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 font-semibold">Tus datos</h2>
        <BookingForm
          courtId={courtId}
          venueSlug={venueSlug}
          slotId={selectedSlotId ?? ""}
          date={date}
          disabled={!court}
        />
      </Card>
    </div>
  );
}
