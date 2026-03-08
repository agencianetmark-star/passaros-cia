import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Bird } from "@/types/domain";

interface RecentFeedProps {
  latestBirds: Bird[];
  recentActivities: Array<{ id: string; label: string; timestamp: string }>;
}

export function RecentFeed({ latestBirds, recentActivities }: RecentFeedProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Ultimas aves cadastradas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {latestBirds.map((bird) => (
            <Link
              href={`/birds/${bird.id}`}
              key={bird.id}
              className="flex items-center justify-between rounded-xl border p-3 transition hover:border-primary/40 hover:bg-muted/20"
            >
              <div>
                <p className="font-semibold text-slate-800">{bird.name}</p>
                <p className="text-xs text-muted-foreground">
                  {bird.ringNumber} | {bird.species}
                </p>
              </div>
              <div className="text-right">
                <Badge variant={bird.isPublic ? "success" : "subtle"}>{bird.isPublic ? "Publica" : "Privada"}</Badge>
                <p className="mt-1 text-xs text-muted-foreground">{formatDate(bird.createdAt)}</p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historico recente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentActivities.map((item) => (
            <div key={item.id} className="rounded-xl border border-dashed p-3">
              <p className="text-sm text-slate-700">{item.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.timestamp}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
