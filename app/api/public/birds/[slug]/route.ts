import { failure, success } from "@/lib/api-response";
import { findPublicBirdBySlug, resolveParents } from "@/lib/services/birds-service";

interface PublicBirdRouteProps {
  params: { slug: string };
}

export async function GET(_request: Request, { params }: PublicBirdRouteProps) {
  const { slug } = params;
  const result = await findPublicBirdBySlug(slug);
  if (!result) return failure("Ficha publica indisponivel.", 404);

  const relations = resolveParents(result.bird);

  return success({
    bird: result.bird,
    share: result.link,
    relations
  });
}
