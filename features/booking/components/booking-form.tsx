"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { BookingContact } from "@/features/booking/types";

type BookingFormProps = {
  courtId: string;
  venueSlug: string;
  slotId: string;
  date: string;
  disabled?: boolean;
};

export function BookingForm({
  courtId,
  venueSlug,
  slotId,
  date,
  disabled,
}: BookingFormProps) {
  const router = useRouter();
  const [contact, setContact] = useState<BookingContact>({
    name: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slotId) {
      setError("Selecciona una franja horaria.");
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courtId,
          venueSlug,
          slotId,
          date,
          contact,
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "No se pudo crear la reserva.");
        return;
      }

      const data = (await res.json()) as { id: string };
      router.push(`/reservas/${data.id}`);
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Nombre
        </label>
        <input
          id="name"
          required
          value={contact.name}
          onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-foreground/20 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Teléfono
        </label>
        <input
          id="phone"
          required
          type="tel"
          value={contact.phone}
          onChange={(e) =>
            setContact((c) => ({ ...c, phone: e.target.value }))
          }
          className="mt-1 w-full rounded-lg border border-foreground/20 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          required
          type="email"
          value={contact.email}
          onChange={(e) =>
            setContact((c) => ({ ...c, email: e.target.value }))
          }
          className="mt-1 w-full rounded-lg border border-foreground/20 px-3 py-2 text-sm"
        />
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <Button
        type="submit"
        disabled={disabled || submitting || !slotId}
        className="w-full disabled:opacity-50"
      >
        {submitting ? "Reservando…" : "Confirmar reserva"}
      </Button>
    </form>
  );
}
