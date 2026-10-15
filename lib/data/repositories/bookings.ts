import type { Booking, CreateBookingInput } from "@/features/booking/types";
import { getSlotById } from "@/lib/data/repositories/availability";

const bookingsStore: Booking[] = [];

function generateBookingId(): string {
  const n = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `BK-${n}`;
}

export async function createBooking(
  input: CreateBookingInput,
  date: string,
): Promise<Booking | null> {
  const slot = await getSlotById(input.courtId, input.slotId, date);
  if (!slot || slot.status !== "available") {
    return null;
  }

  const booking: Booking = {
    id: generateBookingId(),
    courtId: input.courtId,
    venueSlug: input.venueSlug,
    slotId: input.slotId,
    start: slot.start,
    end: slot.end,
    priceCents: slot.priceCents,
    contact: input.contact,
    status: "confirmed",
    paymentStatus: "pending",
    createdAt: new Date().toISOString(),
  };

  bookingsStore.push(booking);
  return booking;
}

export async function getBookingById(id: string): Promise<Booking | null> {
  return bookingsStore.find((b) => b.id === id) ?? null;
}

/** Seed para desarrollo: reserva de ejemplo tras reinicio del servidor. */
export function seedDemoBooking(): void {
  if (bookingsStore.length > 0) return;
  bookingsStore.push({
    id: "BK-DEMO01",
    courtId: "court-1",
    venueSlug: "centro-deportivo-norte",
    slotId: "court-1-2026-10-15-9",
    start: new Date(2026, 9, 15, 9, 0).toISOString(),
    end: new Date(2026, 9, 15, 10, 0).toISOString(),
    priceCents: 8000,
    contact: {
      name: "María López",
      phone: "+34 600 000 000",
      email: "maria@example.com",
    },
    status: "confirmed",
    paymentStatus: "pending",
    createdAt: new Date().toISOString(),
  });
}

seedDemoBooking();
