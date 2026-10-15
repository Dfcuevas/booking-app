import { formatSlotTime } from "@/features/availability/utils";
import type { Booking } from "@/features/booking/types";
import { Card } from "@/components/ui/card";
import { formatCents } from "@/lib/utils/currency";
import { formatLongDate } from "@/lib/utils/dates";

type BookingSummaryProps = {
  booking: Booking;
  courtName?: string;
  venueName?: string;
};

export function BookingSummary({
  booking,
  courtName,
  venueName,
}: BookingSummaryProps) {
  const day = new Date(booking.start);

  return (
    <Card>
      <h2 className="text-lg font-semibold">Resumen</h2>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/70">Código</dt>
          <dd className="font-mono font-medium">{booking.id}</dd>
        </div>
        {venueName && (
          <div className="flex justify-between gap-4">
            <dt className="text-foreground/70">Complejo</dt>
            <dd>{venueName}</dd>
          </div>
        )}
        {courtName && (
          <div className="flex justify-between gap-4">
            <dt className="text-foreground/70">Cancha</dt>
            <dd>{courtName}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/70">Fecha</dt>
          <dd className="text-right capitalize">{formatLongDate(day)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/70">Horario</dt>
          <dd>
            {formatSlotTime(booking.start)} – {formatSlotTime(booking.end)}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-foreground/10 pt-2 font-medium">
          <dt>Total</dt>
          <dd>{formatCents(booking.priceCents)}</dd>
        </div>
      </dl>
    </Card>
  );
}
