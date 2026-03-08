import { getCurrentUser } from "@/lib/auth/session";
import { failure, success } from "@/lib/api-response";
import { findBirdById, upsertPublicShareLink } from "@/lib/services/birds-service";
import { shareLinkSchema } from "@/lib/validators/bird";

interface ShareLinkRouteProps {
  params: { birdId: string };
}

export async function POST(request: Request, { params }: ShareLinkRouteProps) {
  const user = await getCurrentUser();
  const { birdId } = params;
  const bird = await findBirdById(user.id, birdId);
  if (!bird) return failure("Ave nao encontrada.", 404);

  const body = await request.json();
  const parsed = shareLinkSchema.safeParse(body);
  if (!parsed.success) return failure("Dados invalidos para compartilhamento.", 422, parsed.error.flatten());

  if (!bird.isPublic) {
    bird.isPublic = true;
  }

  const link = await upsertPublicShareLink({
    birdId: bird.id,
    slug: parsed.data.slug,
    allowedSections: parsed.data.allowedSections,
    isActive: parsed.data.isActive
  });

  return success({
    ...link,
    publicUrl: `/public/birds/${link.slug}`
  });
}
