import type { TimeSlot } from "@/features/availability/types";
import { parseDateInput } from "@/lib/utils/dates";

function slotId(courtId: string, date: string, hour: number): string {
  return `${courtId}-${date}-${hour}`;
}

function buildDaySlots(
  courtId: string,
  date: string,
  priceCents: number,
  hours: number[],
  bookedHours: number[] = [],
): TimeSlot[] {
  const base = parseDateInput(date);
  return hours.map((hour) => {
    const start = new Date(base);
    start.setHours(hour, 0, 0, 0);
    const end = new Date(start);
    end.setHours(hour + 1, 0, 0, 0);
    const status = bookedHours.includes(hour) ? "booked" : "available";
    return {
      id: slotId(courtId, date, hour),
      courtId,
      start: start.toISOString(),
      end: end.toISOString(),
      priceCents,
      status,
    };
  });
}

const defaultHours = [8, 9, 10, 11, 12, 16, 17, 18, 19, 20, 21];

export function getMockSlotsForCourt(
  courtId: string,
  date: string,
  priceCents: number,
): TimeSlot[] {
  const booked =
    courtId === "court-1" ? [10, 18] : courtId === "court-2" ? [17] : [];
  return buildDaySlots(courtId, date, priceCents, defaultHours, booked);
}
