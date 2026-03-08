import { z } from "zod";

export const createBirdSchema = z.object({
  name: z.string().min(2, "Nome da ave deve ter ao menos 2 caracteres."),
  nickname: z.string().optional().nullable(),
  ringNumber: z.string().min(4, "Informe o numero da anilha."),
  species: z.string().min(2, "Informe a especie."),
  sex: z.enum(["MALE", "FEMALE", "UNKNOWN"]),
  birthDate: z.string().optional().nullable(),
  visibleMutation: z.string().optional().nullable(),
  carrierMutations: z.array(z.string()).optional().default([]),
  probableMutations: z.array(z.string()).optional().default([]),
  fatherId: z.string().optional().nullable(),
  motherId: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  isPublic: z.boolean().optional().default(false),
  isFeatured: z.boolean().optional().default(false)
});

export const shareLinkSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(64)
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minusculas, numeros e hifen."),
  allowedSections: z.array(z.string()).default(["header", "genetics", "pedigree", "media"]),
  isActive: z.boolean().default(true)
});

export type CreateBirdSchema = z.infer<typeof createBirdSchema>;
export type ShareLinkSchema = z.infer<typeof shareLinkSchema>;
