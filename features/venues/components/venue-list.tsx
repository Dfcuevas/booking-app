"use client";

import { useMemo, useState } from "react";
import { VenueCard } from "@/features/venues/components/venue-card";
import { VenueFilters } from "@/features/venues/components/venue-filters";
import type { Venue } from "@/features/venues/types";
import type { SportType } from "@/lib/constants/sports";

type VenueListProps = {
  venues: Venue[];
};

export function VenueList({ venues }: VenueListProps) {
  const [sport, setSport] = useState<SportType | "">("");

  const filtered = useMemo(() => {
    if (!sport) return venues;
    return venues.filter((v) => v.sports.includes(sport));
  }, [venues, sport]);

  return (
    <div className="space-y-6">
      <VenueFilters sport={sport} onSportChange={setSport} />
      <div className="grid gap-4">
        {filtered.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-foreground/70">
          No hay escenarios para este deporte.
        </p>
      )}
    </div>
  );
}
