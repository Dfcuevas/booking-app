import type { Venue } from "@/features/venues/types";

export const mockVenues: Venue[] = [
  {
    id: "ven-1",
    slug: "centro-deportivo-norte",
    name: "Centro Deportivo Norte",
    address: "Av. del Deporte 12",
    city: "Madrid",
    sports: ["football", "padel", "tennis"],
    imageUrl: "/window.svg",
    description:
      "Complejo con césped sintético, pistas de pádel cubiertas y tenis al aire libre. Vestuarios y cafetería.",
    cancellationPolicy: "Cancelación gratuita hasta 24 h antes del inicio.",
    courts: [
      {
        id: "court-1",
        venueId: "ven-1",
        name: "Fútbol 7 — Campo A",
        sport: "football",
        pricePerSlotCents: 8000,
        slotDurationMinutes: 60,
      },
      {
        id: "court-2",
        venueId: "ven-1",
        name: "Pádel 1",
        sport: "padel",
        pricePerSlotCents: 2400,
        slotDurationMinutes: 90,
      },
      {
        id: "court-3",
        venueId: "ven-1",
        name: "Tenis central",
        sport: "tennis",
        pricePerSlotCents: 1800,
        slotDurationMinutes: 60,
      },
    ],
  },
  {
    id: "ven-2",
    slug: "polideportivo-sur",
    name: "Polideportivo Sur",
    address: "Calle Olímpica 4",
    city: "Madrid",
    sports: ["basketball", "volleyball", "football"],
    imageUrl: "/file.svg",
    description:
      "Pabellón y pistas exteriores. Ideal para equipos y torneos locales.",
    cancellationPolicy: "Cancelación gratuita hasta 12 h antes del inicio.",
    courts: [
      {
        id: "court-4",
        venueId: "ven-2",
        name: "Pabellón principal",
        sport: "basketball",
        pricePerSlotCents: 4500,
        slotDurationMinutes: 60,
      },
      {
        id: "court-5",
        venueId: "ven-2",
        name: "Vóley playa cubierto",
        sport: "volleyball",
        pricePerSlotCents: 3200,
        slotDurationMinutes: 60,
      },
    ],
  },
];
