import { PageContainer } from "@/components/layout/page-container";

export default function EscenariosLoading() {
  return (
    <PageContainer>
      <div className="h-8 w-48 animate-pulse rounded bg-foreground/10" />
      <div className="mt-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl bg-foreground/10"
          />
        ))}
      </div>
    </PageContainer>
  );
}
