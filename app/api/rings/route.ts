import { success } from "@/lib/api-response";
import { getRingModuleData } from "@/lib/services/rings-service";

export async function GET() {
  const data = await getRingModuleData();
  return success(data);
}
