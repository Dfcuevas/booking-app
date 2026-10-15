import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/page-container";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SPORT_LABELS } from "@/lib/constants/sports";
import { formatCents } from "@/lib/utils/currency";
import { getVenueBySlug } from "@/lib/data/repositories/venues";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) return { title: "Escenario no encontrado" };
  return {
    title: venue.name,
    description: venue.description,
  };
}

export default async function VenueDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) notFound();

  return (
    <PageContainer>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{venue.name}</h1>
          <p className="mt-1 text-foreground/70">
            {venue.address}, {venue.city}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {venue.sports.map((sport) => (
              <Badge key={sport}>{SPORT_LABELS[sport]}</Badge>
            ))}
          </div>
        </div>
        <ButtonLink href={`/escenarios/${venue.slug}/reservar`}>
          Reservar
        </ButtonLink>
      </div>

      <p className="mt-6 text-foreground/80">{venue.description}</p>
      <p className="mt-2 text-sm text-foreground/60">
        {venue.cancellationPolicy}
      </p>

      <h2 className="mt-10 text-xl font-semibold">Canchas</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {venue.courts.map((court) => (
          <li key={court.id}>
            <Card>
              <h3 className="font-medium">{court.name}</h3>
              <p className="text-sm text-foreground/70">
                {SPORT_LABELS[court.sport]} · {court.slotDurationMinutes} min
              </p>
              <p className="mt-2 text-sm font-medium">
                {formatCents(court.pricePerSlotCents)} / franja
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
