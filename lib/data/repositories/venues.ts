import type { Court, Venue } from "@/features/venues/types";
import { mockVenues } from "@/lib/data/mock/venues";

export async function getVenues(): Promise<Venue[]> {
  return mockVenues;
}

export async function getVenueBySlug(slug: string): Promise<Venue | null> {
  return mockVenues.find((v) => v.slug === slug) ?? null;
}

export async function getCourtById(courtId: string): Promise<{
  court: Court;
  venue: Venue;
} | null> {
  for (const venue of mockVenues) {
    const court = venue.courts.find((c) => c.id === courtId);
    if (court) {
      return { court, venue };
    }
  }
  return null;
}
