"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertTriangle, ScanLine } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RingsDashboardProps {
  data: {
    kpis: {
      totalBought: number;
      stock: number;
      used: number;
      seasonRemaining: number;
    };
    bySeason: Array<{ season: string; bought: number; used: number }>;
    byLot: Array<{ lot: string; start: string; end: string; used: number; left: number }>;
    usageTimeline: Array<{ month: string; used: number }>;
    warning: {
      lowStock: boolean;
      femalesNeedingRings: number;
      estimatedNext30Days: number;
    };
    recentUsage: Array<{ ring: string; bird: string; date: string; nest: string }>;
  };
}

export function RingsDashboard({ data }: RingsDashboardProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi title="Total comprado" value={data.kpis.totalBought} />
        <Kpi title="Em estoque" value={data.kpis.stock} />
        <Kpi title="Ja usadas" value={data.kpis.used} />
        <Kpi title="Restantes temporada" value={data.kpis.seasonRemaining} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Timeline de uso de anilhas</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.usageTimeline}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="used" fill="#2451A6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas operacionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-xl border bg-muted/20 p-3">
              <p className="text-muted-foreground">Femeas com ninhadas ativas</p>
              <p className="text-xl font-extrabold text-slate-900">{data.warning.femalesNeedingRings}</p>
            </div>
            <div className="rounded-xl border bg-muted/20 p-3">
              <p className="text-muted-foreground">Previsao de uso (30 dias)</p>
              <p className="text-xl font-extrabold text-slate-900">{data.warning.estimatedNext30Days}</p>
            </div>
            <div
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${
                data.warning.lowStock ? "border-amber-300 bg-amber-50 text-amber-700" : "border-emerald-300 bg-emerald-50 text-emerald-700"
              }`}
            >
              <AlertTriangle className="size-4" />
              {data.warning.lowStock ? "Estoque baixo. Repor lote." : "Estoque saudavel."}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lotes por temporada</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Temporada</TableHead>
                  <TableHead>Compradas</TableHead>
                  <TableHead>Usadas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.bySeason.map((row) => (
                  <TableRow key={row.season}>
                    <TableCell>{row.season}</TableCell>
                    <TableCell>{row.bought}</TableCell>
                    <TableCell>{row.used}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lotes em estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lote</TableHead>
                  <TableHead>Faixa</TableHead>
                  <TableHead>Uso</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.byLot.map((row) => (
                  <TableRow key={row.lot}>
                    <TableCell>{row.lot}</TableCell>
                    <TableCell>
                      {row.start} a {row.end}
                    </TableCell>
                    <TableCell>
                      {row.used} usadas / {row.left} livres
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historico recente de uso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.recentUsage.map((usage) => (
            <div key={usage.ring} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <ScanLine className="size-4 text-primary" />
                <span className="font-semibold">{usage.ring}</span>
                <span className="text-muted-foreground">vinculada a {usage.bird}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {usage.date} | {usage.nest}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Kpi({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p>
      </CardContent>
    </Card>
  );
}
