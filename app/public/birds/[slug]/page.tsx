import { notFound } from "next/navigation";

import { PublicBirdPage } from "@/features/public-profile/public-bird-page";
import { findPublicBirdBySlug, resolveParents } from "@/lib/services/birds-service";

interface PublicBirdRouteProps {
  params: {
    slug: string;
  };
}

export default async function PublicBirdRoute({ params }: PublicBirdRouteProps) {
  const { slug } = params;
  const result = await findPublicBirdBySlug(slug);

  if (!result) notFound();

  const relationData = resolveParents(result.bird);

  return (
    <PublicBirdPage
      bird={result.bird}
      shareSlug={slug}
      breeder={{
        aviaryName: "Plantel Ouro Azul",
        cityState: "Sao Paulo, SP",
        yearsBreeding: "12 anos de criacao"
      }}
      relations={relationData}
    />
  );
}
