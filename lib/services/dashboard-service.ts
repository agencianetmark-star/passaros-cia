import {
  dashboardStats,
  flockGrowth,
  mockBirds,
  recentActivities,
  ringUsageByMonth,
  sexDistribution,
  mutationDistribution
} from "@/lib/services/mock-data";

export async function getDashboardData(breederId: string) {
  const breederBirds = mockBirds.filter((bird) => bird.breederId === breederId);
  const latestBirds = breederBirds.slice(0, 5);

  return {
    stats: dashboardStats,
    charts: {
      flockGrowth,
      sexDistribution,
      mutationDistribution,
      ringUsageByMonth
    },
    latestBirds,
    activePairings: 12,
    activeNests: 6,
    ringStock: {
      totalBought: 500,
      used: 264,
      remaining: 236,
      seasonUsed: 71
    },
    recentActivities
  };
}
