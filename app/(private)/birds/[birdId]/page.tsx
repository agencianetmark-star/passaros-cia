import { notFound } from "next/navigation";

import { BirdProfile } from "@/features/birds/bird-profile";
import { getCurrentUser } from "@/lib/auth/session";
import { findBirdById, resolveParents } from "@/lib/services/birds-service";

interface BirdProfilePageProps {
  params: {
    birdId: string;
  };
}

export default async function BirdProfilePage({ params }: BirdProfilePageProps) {
  const { birdId } = params;
  const user = await getCurrentUser();
  const bird = await findBirdById(user.id, birdId);

  if (!bird) notFound();

  const relationData = resolveParents(bird);

  return (
    <BirdProfile
      bird={bird}
      shareSlug={`${bird.id}-public`}
      father={relationData.father}
      mother={relationData.mother}
      grandparents={relationData.grandparents}
    />
  );
}
