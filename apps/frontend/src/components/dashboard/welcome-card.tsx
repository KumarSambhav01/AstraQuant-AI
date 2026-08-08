import { Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function WelcomeCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="relative p-6">
        <div className="absolute right-0 top-0 size-32 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">
          <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="size-5 text-primary" />
          </div>

          <p className="text-sm text-muted-foreground">
            Welcome to AstraQuant AI
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Your financial intelligence, amplified.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Research markets, understand companies, monitor your
            portfolio, and use AI to turn financial information into
            actionable insights.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
