import { PageContainer } from "@/components/layout/page-container";

export default function ReservarLoading() {
  return (
    <PageContainer>
      <div className="h-8 w-64 animate-pulse rounded bg-foreground/10" />
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="h-96 animate-pulse rounded-xl bg-foreground/10" />
        <div className="h-96 animate-pulse rounded-xl bg-foreground/10" />
      </div>
    </PageContainer>
  );
}
