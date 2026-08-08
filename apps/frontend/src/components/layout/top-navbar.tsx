"use client";

import { Bell, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/common/theme-toggle";

interface TopNavbarProps {
  onMobileMenuClick: () => void;
}

export function TopNavbar({ onMobileMenuClick }: TopNavbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-background/95 px-4 backdrop-blur">
      <div className="flex flex-1 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMobileMenuClick}
          aria-label="Open navigation"
        >
          <Search className="size-4" />
        </Button>

        <Button
          variant="outline"
          className="hidden h-9 w-full max-w-md justify-start gap-2 text-muted-foreground sm:flex"
        >
          <Search className="size-4" />
          <span>Search markets, companies, news...</span>
          <span className="ml-auto hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] sm:inline">
            ⌘K
          </span>
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          disabled
        >
          <Bell className="size-4" />
        </Button>

        <ThemeToggle />

        <Separator orientation="vertical" className="mx-2 h-6" />

        <Button variant="ghost" className="gap-2 px-2">
          <Avatar className="size-8">
            <AvatarFallback>KS</AvatarFallback>
          </Avatar>

          <div className="hidden text-left md:block">
            <p className="text-xs font-medium">User</p>
            <p className="text-[10px] text-muted-foreground">
              Investor
            </p>
          </div>
        </Button>
      </div>
    </header>
  );
}