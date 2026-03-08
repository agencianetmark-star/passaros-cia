export type BirdSex = "MALE" | "FEMALE" | "UNKNOWN";
export type BirdStatus = "ACTIVE" | "DECEASED" | "SOLD" | "ARCHIVED";
export type GeneticConfidence = "INFORMED" | "PROBABLE" | "CONFIRMED";
export type ReproductiveStatus = "IDLE" | "PAIRING" | "NESTING" | "RAISING";

export interface Bird {
  id: string;
  breederId: string;
  name: string;
  nickname?: string | null;
  ringNumber: string;
  species: string;
  sex: BirdSex;
  birthDate?: string | Date | null;
  mainColor?: string | null;
  phenotype?: string | null;
  visibleMutation?: string | null;
  carrierMutations: string[];
  probableMutations: string[];
  geneticConfidence: GeneticConfidence;
  fatherId?: string | null;
  motherId?: string | null;
  originBreeder?: string | null;
  reproductiveStatus: ReproductiveStatus;
  isPublic: boolean;
  isFeatured: boolean;
  notes?: string | null;
  status: BirdStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PublicBirdShare {
  id: string;
  birdId: string;
  slug: string;
  isActive: boolean;
  expiresAt?: string | Date | null;
  allowedSections: string[];
  viewCount: number;
}

export interface DashboardStat {
  label: string;
  value: number;
  delta?: number;
  tone?: "default" | "success" | "warning";
}
