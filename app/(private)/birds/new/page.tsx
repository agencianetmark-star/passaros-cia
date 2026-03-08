import { BirdFormWizard } from "@/features/birds/bird-form-wizard";
import { getCurrentUser } from "@/lib/auth/session";
import { listBirdsByBreeder } from "@/lib/services/birds-service";

export default async function NewBirdPage() {
  const user = await getCurrentUser();
  const birds = await listBirdsByBreeder(user.id);
  const possibleParents = birds.map((bird) => ({ id: bird.id, name: bird.name, ringNumber: bird.ringNumber }));

  return <BirdFormWizard possibleParents={possibleParents} />;
}
