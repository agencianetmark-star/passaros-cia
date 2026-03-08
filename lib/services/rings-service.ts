export async function getRingModuleData() {
  return {
    kpis: {
      totalBought: 500,
      stock: 236,
      used: 264,
      seasonRemaining: 129
    },
    bySeason: [
      { season: "2024", bought: 120, used: 117 },
      { season: "2025", bought: 180, used: 147 },
      { season: "2026", bought: 200, used: 71 }
    ],
    byLot: [
      { lot: "L-26-A", start: "BR-2026-0001", end: "BR-2026-0100", used: 64, left: 36 },
      { lot: "L-26-B", start: "BR-2026-0101", end: "BR-2026-0200", used: 7, left: 93 }
    ],
    usageTimeline: [
      { month: "Jan", used: 10 },
      { month: "Fev", used: 12 },
      { month: "Mar", used: 17 },
      { month: "Abr", used: 21 },
      { month: "Mai", used: 15 },
      { month: "Jun", used: 24 },
      { month: "Jul", used: 18 },
      { month: "Ago", used: 11 }
    ],
    warning: {
      lowStock: false,
      femalesNeedingRings: 8,
      estimatedNext30Days: 28
    },
    recentUsage: [
      { ring: "BR-2026-0412", bird: "Imperador Azul", date: "2026-03-07", nest: "N-220" },
      { ring: "BR-2026-0411", bird: "Aurora Filhote 03", date: "2026-03-07", nest: "N-220" },
      { ring: "BR-2026-0410", bird: "Safira Filhote 02", date: "2026-03-06", nest: "N-217" }
    ]
  };
}
