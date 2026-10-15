import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/data/repositories/availability";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courtId = searchParams.get("courtId");
  const date = searchParams.get("date");

  if (!courtId || !date) {
    return NextResponse.json(
      { error: "courtId y date son obligatorios" },
      { status: 400 },
    );
  }

  const slots = await getAvailability(courtId, date);
  return NextResponse.json(slots);
}
