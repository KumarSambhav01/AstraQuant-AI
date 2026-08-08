"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Newspaper,
  Search,
  Settings,
  Sparkles,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/common/logo";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    label: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Markets",
    href: "/markets",
    icon: BarChart3,
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: BriefcaseBusiness,
  },
  {
    label: "Watchlist",
    href: "/watchlist",
    icon: Star,
  },
  {
    label: "News",
    href: "/news",
    icon: Newspaper,
  },
  {
    label: "Research",
    href: "/research",
    icon: Search,
  },
  {
    label: "Documents",
    href: "/documents",
    icon: FileText,
  },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative hidden h-screen shrink-0 border-r bg-card transition-[width] duration-200 lg:flex lg:flex-col",
        collapsed ? "w-18" : "w-64",
      )}
    >
      <div className="flex h-16 items-center border-b px-3">
        <div className="flex-1 overflow-hidden">
          <Logo collapsed={collapsed} />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="shrink-0"
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  collapsed && "justify-center px-0",
                )}
              >
                <Icon className="size-4 shrink-0" />

                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        <nav className="space-y-1">
          <Link
            href="/ai"
            title={collapsed ? "AI Copilot" : undefined}
            className={cn(
              "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              collapsed && "justify-center px-0",
            )}
          >
            <Sparkles className="size-4 shrink-0" />

            {!collapsed && <span>AI Copilot</span>}
          </Link>

          <Link
            href="/settings"
            title={collapsed ? "Settings" : undefined}
            className={cn(
              "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              collapsed && "justify-center px-0",
            )}
          >
            <Settings className="size-4 shrink-0" />

            {!collapsed && <span>Settings</span>}
          </Link>
        </nav>
      </div>

      {!collapsed && (
        <div className="border-t p-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="size-3.5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-medium">
                  AstraQuant AI
                </p>
                <p className="truncate text-[10px] text-muted-foreground">
                  Financial Intelligence
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}