"use client";

import { Activity, CheckCircle2, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useHealth } from "@/hooks/use-health";

export function HealthCard() {
  const { data, isLoading, isError } = useHealth();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-4" />
            System Health
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data?.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-4" />
            System Health
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-2 text-sm text-destructive">
            <XCircle className="size-4" />
            Backend unavailable
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Unable to reach the AstraQuant API.
          </p>
        </CardContent>
      </Card>
    );
  }

  const health = data.data;
  const healthy = health.status === "ok";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="size-4" />
          System Health
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          {healthy ? (
            <CheckCircle2 className="size-5 text-emerald-500" />
          ) : (
            <XCircle className="size-5 text-destructive" />
          )}

          <span className="text-sm font-medium">
            {healthy ? "All systems operational" : "System issue detected"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Service</p>
            <p className="mt-1 font-medium">{health.service}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Version</p>
            <p className="mt-1 font-medium">{health.version}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Last checked{" "}
          {new Date(health.timestamp).toLocaleTimeString()}
        </p>
      </CardContent>
    </Card>
  );
}