import { PageContainer } from "@/components/layout/page-container";
import { ButtonLink } from "@/components/ui/button";
import { VenueCard } from "@/features/venues/components/venue-card";
import { getVenues } from "@/lib/data/repositories/venues";

export default async function HomePage() {
  const venues = await getVenues();
  const featured = venues.slice(0, 2);

  return (
    <PageContainer>
      <section className="py-8 text-center sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Reserva tu escenario deportivo
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-foreground/70">
          Encuentra canchas y pistas cerca de ti. Elige fecha, hora y confirma
          en minutos.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/escenarios">Ver escenarios</ButtonLink>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Destacados</h2>
        <div className="grid gap-4">
          {featured.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
