import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SPORT_LABELS } from "@/lib/constants/sports";
import type { Venue } from "@/features/venues/types";

type VenueCardProps = {
  venue: Venue;
};

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link href={`/escenarios/${venue.slug}`} className="block">
      <Card className="transition hover:border-foreground/25">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex h-24 w-full shrink-0 items-center justify-center rounded-lg bg-foreground/5 sm:w-32">
            <img
              src={venue.imageUrl}
              alt=""
              className="h-12 w-12 opacity-70"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold">{venue.name}</h2>
            <p className="text-sm text-foreground/70">
              {venue.address}, {venue.city}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {venue.sports.map((sport) => (
                <Badge key={sport}>{SPORT_LABELS[sport]}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
