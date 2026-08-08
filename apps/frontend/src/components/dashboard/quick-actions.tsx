import Link from "next/link";
import {
  FileSearch,
  Newspaper,
  Search,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Research a company",
    description: "Analyze a company with AI",
    href: "/research",
    icon: Search,
  },
  {
    title: "Ask AI Copilot",
    description: "Start a financial research query",
    href: "/ai",
    icon: Sparkles,
  },
  {
    title: "Read financial news",
    description: "Explore market intelligence",
    href: "/news",
    icon: Newspaper,
  },
  {
    title: "Analyze a document",
    description: "Extract insights from filings",
    href: "/documents",
    icon: FileSearch,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-2 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-4 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium group-hover:text-primary">
                    {action.title}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}