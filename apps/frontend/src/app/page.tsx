import { AppShell } from "@/components/layout/app-shell";

export default function HomePage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6">
        <section className="flex min-h-[calc(100vh-7rem)] items-center justify-center rounded-xl border border-dashed">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <span className="text-xl">✦</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              AstraQuant AI
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              AI-powered financial intelligence platform
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Dashboard foundation is ready.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}