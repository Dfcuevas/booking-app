import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-foreground/10 bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          CourtBook
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/escenarios"
            className="text-foreground/80 transition hover:text-foreground"
          >
            Escenarios
          </Link>
        </nav>
      </div>
    </header>
  );
}
