import { NextResponse } from "next/server";
import type { CreateBookingInput } from "@/features/booking/types";
import { createBooking } from "@/lib/data/repositories/bookings";

type PostBody = CreateBookingInput & { date: string };

export async function POST(request: Request) {
  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { courtId, venueSlug, slotId, contact, date } = body;

  if (!courtId || !venueSlug || !slotId || !date || !contact?.email) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios" },
      { status: 400 },
    );
  }

  const booking = await createBooking(
    { courtId, venueSlug, slotId, contact },
    date,
  );

  if (!booking) {
    return NextResponse.json(
      { error: "La franja no está disponible" },
      { status: 409 },
    );
  }

  return NextResponse.json({ id: booking.id }, { status: 201 });
}
