import { getCurrentUser } from "@/lib/auth/session";
import { failure, success } from "@/lib/api-response";
import { findBirdById, upsertPublicShareLink } from "@/lib/services/birds-service";

interface BirdRouteProps {
  params: { birdId: string };
}

export async function GET(_request: Request, { params }: BirdRouteProps) {
  const { birdId } = params;
  const user = await getCurrentUser();
  const bird = await findBirdById(user.id, birdId);
  if (!bird) return failure("Ave nao encontrada.", 404);
  return success(bird);
}

export async function PATCH(request: Request, { params }: BirdRouteProps) {
  const { birdId } = params;
  const user = await getCurrentUser();
  const bird = await findBirdById(user.id, birdId);
  if (!bird) return failure("Ave nao encontrada.", 404);

  const payload = (await request.json()) as { isPublic?: boolean };
  if (typeof payload.isPublic === "boolean") bird.isPublic = payload.isPublic;

  if (bird.isPublic) {
    await upsertPublicShareLink({
      birdId: bird.id,
      slug: `${bird.id}-public`,
      isActive: true
    });
  }

  return success(bird);
}
