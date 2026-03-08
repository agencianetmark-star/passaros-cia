import { notFound } from "next/navigation";

import { PedigreeTree } from "@/features/pedigree/pedigree-tree";
import { getCurrentUser } from "@/lib/auth/session";
import { findBirdById, resolveParents } from "@/lib/services/birds-service";

interface BirdPedigreePageProps {
  params: {
    birdId: string;
  };
}

export default async function BirdPedigreePage({ params }: BirdPedigreePageProps) {
  const { birdId } = params;
  const user = await getCurrentUser();
  const bird = await findBirdById(user.id, birdId);

  if (!bird) notFound();

  const relationData = resolveParents(bird);

  return (
    <PedigreeTree bird={bird} father={relationData.father} mother={relationData.mother} grandparents={relationData.grandparents} />
  );
}
