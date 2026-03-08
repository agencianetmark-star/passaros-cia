import { RingsDashboard } from "@/features/rings/rings-dashboard";
import { getRingModuleData } from "@/lib/services/rings-service";

export default async function RingsPage() {
  const data = await getRingModuleData();
  return <RingsDashboard data={data} />;
}
