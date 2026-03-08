import { getCurrentUser } from "@/lib/auth/session";
import { failure, success } from "@/lib/api-response";
import { createBird, listBirdsByBreeder } from "@/lib/services/birds-service";
import { createBirdSchema } from "@/lib/validators/bird";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  const { searchParams } = new URL(request.url);
  const birds = await listBirdsByBreeder(user.id, {
    search: searchParams.get("search") ?? undefined,
    species: searchParams.get("species") ?? undefined,
    sex: searchParams.get("sex") ?? undefined,
    mutation: searchParams.get("mutation") ?? undefined,
    publicOnly: searchParams.get("publicOnly") === "true",
    featuredOnly: searchParams.get("featuredOnly") === "true"
  });

  return success(birds);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  const payload = await request.json();
  const parsed = createBirdSchema.safeParse(payload);
  if (!parsed.success) {
    return failure("Dados invalidos para cadastro de ave.", 422, parsed.error.flatten());
  }

  const currentBirds = await listBirdsByBreeder(user.id);
  const ringAlreadyUsed = currentBirds.some((bird) => bird.ringNumber === parsed.data.ringNumber);
  if (ringAlreadyUsed) {
    return failure("Esta anilha ja esta vinculada a outra ave do criador.", 409);
  }

  if (parsed.data.fatherId) {
    const father = currentBirds.find((bird) => bird.id === parsed.data.fatherId);
    if (!father) return failure("Pai selecionado nao pertence ao criador.", 403);
  }

  if (parsed.data.motherId) {
    const mother = currentBirds.find((bird) => bird.id === parsed.data.motherId);
    if (!mother) return failure("Mae selecionada nao pertence ao criador.", 403);
  }

  const bird = await createBird({
    breederId: user.id,
    name: parsed.data.name,
    nickname: parsed.data.nickname ?? undefined,
    ringNumber: parsed.data.ringNumber,
    species: parsed.data.species,
    sex: parsed.data.sex,
    birthDate: parsed.data.birthDate ?? undefined,
    visibleMutation: parsed.data.visibleMutation ?? undefined,
    carrierMutations: parsed.data.carrierMutations,
    probableMutations: parsed.data.probableMutations,
    fatherId: parsed.data.fatherId ?? undefined,
    motherId: parsed.data.motherId ?? undefined,
    notes: parsed.data.notes ?? undefined,
    isPublic: parsed.data.isPublic,
    isFeatured: parsed.data.isFeatured
  });

  return success(bird, 201);
}
