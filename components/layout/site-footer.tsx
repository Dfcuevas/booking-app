export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-foreground/60 sm:px-6">
        © {new Date().getFullYear()} CourtBook — Reserva escenarios deportivos
      </div>
    </footer>
  );
}
