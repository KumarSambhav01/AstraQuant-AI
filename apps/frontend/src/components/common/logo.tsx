import Link from "next/link";
import { Sparkles } from "lucide-react";

interface LogoProps {
  collapsed?: boolean;
}

export function Logo({ collapsed = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 overflow-hidden rounded-lg px-2 py-2 transition-colors hover:bg-accent"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Sparkles className="size-5" />
      </div>

      {!collapsed && (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">
            AstraQuant
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            AI Financial Intelligence
          </p>
        </div>
      )}
    </Link>
  );
}