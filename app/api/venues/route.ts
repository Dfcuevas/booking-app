import { NextResponse } from "next/server";
import {
  getVenueBySlug,
  getVenues,
} from "@/lib/data/repositories/venues";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const venue = await getVenueBySlug(slug);
    if (!venue) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(venue);
  }

  const venues = await getVenues();
  return NextResponse.json(venues);
}
