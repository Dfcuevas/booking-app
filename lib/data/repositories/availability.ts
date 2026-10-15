import type { TimeSlot } from "@/features/availability/types";
import { getMockSlotsForCourt } from "@/lib/data/mock/availability";
import { getCourtById } from "@/lib/data/repositories/venues";

export async function getAvailability(
  courtId: string,
  date: string,
): Promise<TimeSlot[]> {
  const found = await getCourtById(courtId);
  if (!found) {
    return [];
  }
  return getMockSlotsForCourt(
    courtId,
    date,
    found.court.pricePerSlotCents,
  );
}

export async function getSlotById(
  courtId: string,
  slotId: string,
  date: string,
): Promise<TimeSlot | null> {
  const slots = await getAvailability(courtId, date);
  return slots.find((s) => s.id === slotId) ?? null;
}
