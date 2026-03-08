import { getCurrentUser } from "@/lib/auth/session";
import { getDashboardData } from "@/lib/services/dashboard-service";
import { DashboardCharts } from "@/features/dashboard/dashboard-charts";
import { QuickActions } from "@/features/dashboard/quick-actions";
import { RecentFeed } from "@/features/dashboard/recent-feed";
import { StatCard } from "@/features/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const data = await getDashboardData(user.id);

  return (
    <div className="space-y-4 pb-8">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Resumo da temporada</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <SummaryItem label="Cruzamentos ativos" value={data.activePairings} />
            <SummaryItem label="Ninhadas ativas" value={data.activeNests} />
            <SummaryItem label="Anilhas em estoque" value={data.ringStock.remaining} />
            <SummaryItem label="Anilhas usadas na temporada" value={data.ringStock.seasonUsed} />
          </CardContent>
        </Card>
        <QuickActions />
      </section>

      <DashboardCharts
        flockGrowth={data.charts.flockGrowth}
        sexDistribution={data.charts.sexDistribution}
        mutationDistribution={data.charts.mutationDistribution}
        ringUsageByMonth={data.charts.ringUsageByMonth}
      />

      <RecentFeed latestBirds={data.latestBirds} recentActivities={data.recentActivities} />
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-muted/20 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p>
    </div>
  );
}
