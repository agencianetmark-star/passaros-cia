import { TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DashboardStat } from "@/types/domain";

interface StatCardProps {
  stat: DashboardStat;
}

export function StatCard({ stat }: StatCardProps) {
  const hasDelta = typeof stat.delta === "number";
  const positive = (stat.delta ?? 0) >= 0;
  const toneClass =
    stat.tone === "success"
      ? "text-emerald-700 bg-emerald-50"
      : stat.tone === "warning"
        ? "text-amber-700 bg-amber-50"
        : "text-slate-700 bg-slate-50";

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{stat.label}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-2">
        <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
        {hasDelta ? (
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold", toneClass)}>
            {positive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
            {Math.abs(stat.delta ?? 0)}
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}
