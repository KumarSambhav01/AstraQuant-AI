import { BarChart3, BriefcaseBusiness, TrendingUp } from "lucide-react";

import { HealthCard } from "@/components/dashboard/health-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { StatCard } from "@/components/dashboard/stat-card";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { AppShell } from "@/components/layout/app-shell";

export default function HomePage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 md:p-6">
        <WelcomeCard />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Portfolio Value"
            value="₹0.00"
            description="Portfolio module coming next"
            icon={BriefcaseBusiness}
          />

          <StatCard
            title="Watchlist"
            value="0"
            description="No tracked companies yet"
            icon={TrendingUp}
          />

          <StatCard
            title="Market Status"
            value="Ready"
            description="Market data integration coming next"
            icon={BarChart3}
          />

          <HealthCard />
        </section>

        <section>
          <QuickActions />
        </section>
      </div>
    </AppShell>
  );
}