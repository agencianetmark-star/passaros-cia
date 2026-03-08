"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pieColors = ["#2451A6", "#4E7FD0", "#CDA251"];

interface DashboardChartsProps {
  flockGrowth: { month: string; total: number }[];
  sexDistribution: { category: string; value: number }[];
  mutationDistribution: { mutation: string; total: number }[];
  ringUsageByMonth: { month: string; used: number }[];
}

export function DashboardCharts({
  flockGrowth,
  sexDistribution,
  mutationDistribution,
  ringUsageByMonth
}: DashboardChartsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Evolucao do plantel</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={flockGrowth}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2451A6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2451A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="total" stroke="#2451A6" strokeWidth={2} fill="url(#colorGrowth)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Machos x femeas</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Pie data={sexDistribution} dataKey="value" nameKey="category" innerRadius={55} outerRadius={85}>
                {sexDistribution.map((entry, index) => (
                  <Cell key={entry.category} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Aves por mutacao</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mutationDistribution}>
              <XAxis dataKey="mutation" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#4E7FD0" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uso de anilhas por mes</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ringUsageByMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="used" fill="#CDA251" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
