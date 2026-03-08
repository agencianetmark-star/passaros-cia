import { Bird } from "@/types/domain";

export interface BirdCardViewModel {
  id: string;
  title: string;
  subtitle: string;
  mutation: string;
  isPublic: boolean;
  isFeatured: boolean;
}

export function toBirdCardViewModel(bird: Bird): BirdCardViewModel {
  return {
    id: bird.id,
    title: bird.name,
    subtitle: `${bird.ringNumber} | ${bird.species}`,
    mutation: bird.visibleMutation ?? "-",
    isPublic: bird.isPublic,
    isFeatured: bird.isFeatured
  };
}
