export type SlotStatus = "available" | "held" | "booked";

export type TimeSlot = {
  id: string;
  courtId: string;
  start: string;
  end: string;
  priceCents: number;
  status: SlotStatus;
};

export type AvailabilityQuery = {
  courtId: string;
  date: string;
};
