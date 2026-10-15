import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { VenueList } from "@/features/venues/components/venue-list";
import { getVenues } from "@/lib/data/repositories/venues";

export const metadata: Metadata = {
  title: "Escenarios",
};

export default async function EscenariosPage() {
  const venues = await getVenues();

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold">Escenarios deportivos</h1>
      <p className="mt-2 text-foreground/70">
        Explora complejos y reserva la cancha que necesitas.
      </p>
      <div className="mt-8">
        <VenueList venues={venues} />
      </div>
    </PageContainer>
  );
}
