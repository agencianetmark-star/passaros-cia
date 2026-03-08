import { FlockGrid } from "@/features/flock/flock-grid";
import { getCurrentUser } from "@/lib/auth/session";
import { listBirdsByBreeder } from "@/lib/services/birds-service";

export default async function FlockPage() {
  const user = await getCurrentUser();
  const birds = await listBirdsByBreeder(user.id);

  return <FlockGrid birds={birds} />;
}
