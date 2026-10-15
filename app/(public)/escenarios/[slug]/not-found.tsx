import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";

export default function VenueNotFound() {
  return (
    <PageContainer className="text-center">
      <h1 className="text-2xl font-bold">Escenario no encontrado</h1>
      <p className="mt-2 text-foreground/70">
        El enlace puede estar roto o el complejo ya no está disponible.
      </p>
      <Link
        href="/escenarios"
        className="mt-6 inline-block text-sm font-medium underline"
      >
        Volver al listado
      </Link>
    </PageContainer>
  );
}
