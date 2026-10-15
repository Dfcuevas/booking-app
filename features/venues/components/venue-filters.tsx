"use client";

import { SPORT_LABELS, SPORT_TYPES } from "@/lib/constants/sports";
import type { SportType } from "@/lib/constants/sports";

type VenueFiltersProps = {
  sport: SportType | "";
  onSportChange: (sport: SportType | "") => void;
};

export function VenueFilters({ sport, onSportChange }: VenueFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label htmlFor="sport-filter" className="text-sm font-medium">
        Deporte
      </label>
      <select
        id="sport-filter"
        value={sport}
        onChange={(e) =>
          onSportChange(e.target.value as SportType | "")
        }
        className="rounded-lg border border-foreground/20 bg-background px-3 py-2 text-sm"
      >
        <option value="">Todos</option>
        {SPORT_TYPES.map((s) => (
          <option key={s} value={s}>
            {SPORT_LABELS[s]}
          </option>
        ))}
      </select>
    </div>
  );
}
