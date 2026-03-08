import { randomUUID } from "node:crypto";

import { Bird } from "@/types/domain";

import { mockBirds, mockShareLinks } from "./mock-data";

export interface BirdFilters {
  search?: string;
  species?: string;
  sex?: string;
  mutation?: string;
  publicOnly?: boolean;
  featuredOnly?: boolean;
}

export interface CreateBirdInput {
  breederId: string;
  name: string;
  nickname?: string;
  ringNumber: string;
  species: string;
  sex: "MALE" | "FEMALE" | "UNKNOWN";
  birthDate?: string;
  visibleMutation?: string;
  carrierMutations?: string[];
  probableMutations?: string[];
  fatherId?: string;
  motherId?: string;
  isPublic?: boolean;
  isFeatured?: boolean;
  notes?: string;
}

export async function listBirdsByBreeder(breederId: string, filters: BirdFilters = {}) {
  const normalized = filters.search?.toLowerCase().trim();
  return mockBirds.filter((bird) => {
    if (bird.breederId !== breederId) return false;
    if (filters.species && bird.species !== filters.species) return false;
    if (filters.sex && bird.sex !== filters.sex) return false;
    if (filters.mutation && bird.visibleMutation !== filters.mutation) return false;
    if (filters.publicOnly && !bird.isPublic) return false;
    if (filters.featuredOnly && !bird.isFeatured) return false;
    if (!normalized) return true;

    return (
      bird.name.toLowerCase().includes(normalized) ||
      bird.ringNumber.toLowerCase().includes(normalized) ||
      (bird.nickname ?? "").toLowerCase().includes(normalized)
    );
  });
}

export async function findBirdById(breederId: string, birdId: string) {
  return mockBirds.find((bird) => bird.breederId === breederId && bird.id === birdId) ?? null;
}

export async function findPublicBirdBySlug(slug: string) {
  const link = mockShareLinks.find((item) => item.slug === slug && item.isActive);
  if (!link) return null;
  const bird = mockBirds.find((item) => item.id === link.birdId && item.isPublic);
  if (!bird) return null;
  return { bird, link };
}

export async function createBird(input: CreateBirdInput): Promise<Bird> {
  const newBird: Bird = {
    id: randomUUID(),
    breederId: input.breederId,
    name: input.name,
    nickname: input.nickname ?? null,
    ringNumber: input.ringNumber,
    species: input.species,
    sex: input.sex,
    birthDate: input.birthDate ?? null,
    mainColor: null,
    phenotype: null,
    visibleMutation: input.visibleMutation ?? null,
    carrierMutations: input.carrierMutations ?? [],
    probableMutations: input.probableMutations ?? [],
    geneticConfidence: "INFORMED",
    fatherId: input.fatherId ?? null,
    motherId: input.motherId ?? null,
    originBreeder: "Interno",
    reproductiveStatus: "IDLE",
    isPublic: Boolean(input.isPublic),
    isFeatured: Boolean(input.isFeatured),
    notes: input.notes ?? null,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  mockBirds.unshift(newBird);
  return newBird;
}

export async function upsertPublicShareLink(input: {
  birdId: string;
  slug?: string;
  allowedSections?: string[];
  isActive?: boolean;
}) {
  const current = mockShareLinks.find((link) => link.birdId === input.birdId);
  if (current) {
    current.slug = input.slug ?? current.slug;
    current.allowedSections = input.allowedSections ?? current.allowedSections;
    current.isActive = input.isActive ?? current.isActive;
    return current;
  }

  const next = {
    id: randomUUID(),
    birdId: input.birdId,
    slug: input.slug ?? `${input.birdId}-public`,
    isActive: input.isActive ?? true,
    expiresAt: null,
    allowedSections: input.allowedSections ?? ["header", "genetics", "pedigree", "media"],
    viewCount: 0
  };
  mockShareLinks.push(next);
  return next;
}

export function resolveParents(bird: Bird) {
  const father = mockBirds.find((item) => item.id === bird.fatherId) ?? null;
  const mother = mockBirds.find((item) => item.id === bird.motherId) ?? null;
  const paternalGrandfather = father ? mockBirds.find((item) => item.id === father.fatherId) ?? null : null;
  const paternalGrandmother = father ? mockBirds.find((item) => item.id === father.motherId) ?? null : null;
  const maternalGrandfather = mother ? mockBirds.find((item) => item.id === mother.fatherId) ?? null : null;
  const maternalGrandmother = mother ? mockBirds.find((item) => item.id === mother.motherId) ?? null : null;

  return {
    father,
    mother,
    grandparents: {
      paternalGrandfather,
      paternalGrandmother,
      maternalGrandfather,
      maternalGrandmother
    }
  };
}
