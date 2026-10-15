import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/page-container";
import { BookingSummary } from "@/features/booking/components/booking-summary";
import { getBookingById } from "@/lib/data/repositories/bookings";
import { getCourtById } from "@/lib/data/repositories/venues";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Tu reserva",
};

export default async function ReservaDetailPage({ params }: PageProps) {
  const { id } = await params;
  const booking = await getBookingById(id);
  if (!booking) notFound();

  const courtInfo = await getCourtById(booking.courtId);

  return (
    <PageContainer className="max-w-lg">
      <h1 className="text-2xl font-bold">Reserva confirmada</h1>
      <p className="mt-2 text-foreground/70">
        Guarda tu código <strong>{booking.id}</strong>. Te hemos enviado un
        resumen a {booking.contact.email} (simulado en MVP).
      </p>
      <div className="mt-8">
        <BookingSummary
          booking={booking}
          courtName={courtInfo?.court.name}
          venueName={courtInfo?.venue.name}
        />
      </div>
      <Link
        href={`/escenarios/${booking.venueSlug}`}
        className="mt-6 inline-block text-sm font-medium underline"
      >
        Volver al escenario
      </Link>
    </PageContainer>
  );
}
