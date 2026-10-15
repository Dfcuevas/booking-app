import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/page-container";
import { ReservarFlow } from "@/features/booking/components/reservar-flow";
import { getVenueBySlug } from "@/lib/data/repositories/venues";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) return { title: "Reservar" };
  return { title: `Reservar — ${venue.name}` };
}

export default async function ReservarPage({ params }: PageProps) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) notFound();

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold">Reservar en {venue.name}</h1>
      <p className="mt-2 text-foreground/70">
        Elige cancha, fecha y franja horaria.
      </p>
      <div className="mt-8">
        <ReservarFlow venueSlug={venue.slug} courts={venue.courts} />
      </div>
    </PageContainer>
  );
}
