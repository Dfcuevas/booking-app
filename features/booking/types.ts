export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

export type BookingContact = {
  name: string;
  phone: string;
  email: string;
};

export type Booking = {
  id: string;
  courtId: string;
  venueSlug: string;
  slotId: string;
  start: string;
  end: string;
  priceCents: number;
  contact: BookingContact;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
};

export type CreateBookingInput = {
  courtId: string;
  venueSlug: string;
  slotId: string;
  contact: BookingContact;
};
