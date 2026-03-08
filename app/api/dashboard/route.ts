import { getCurrentUser } from "@/lib/auth/session";
import { success } from "@/lib/api-response";
import { getDashboardData } from "@/lib/services/dashboard-service";

export async function GET() {
  const user = await getCurrentUser();
  const data = await getDashboardData(user.id);
  return success(data);
}
