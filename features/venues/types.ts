import type { SportType } from "@/lib/constants/sports";

export type Court = {
  id: string;
  venueId: string;
  name: string;
  sport: SportType;
  pricePerSlotCents: number;
  slotDurationMinutes: number;
};

export type Venue = {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  sports: SportType[];
  imageUrl: string;
  description: string;
  cancellationPolicy: string;
  courts: Court[];
};
