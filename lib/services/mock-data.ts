import { Bird, DashboardStat, PublicBirdShare } from "@/types/domain";

const now = new Date();

export const DEMO_USER_ID = "user_demo_01";

export const mockBirds: Bird[] = [
  {
    id: "demo-bird",
    breederId: DEMO_USER_ID,
    name: "Imperador Azul",
    nickname: "Imperador",
    ringNumber: "BR-2025-0045",
    species: "Canario Belga",
    sex: "MALE",
    birthDate: "2024-09-12",
    mainColor: "Azul prateado",
    phenotype: "Fenotipo forte",
    visibleMutation: "Opalino",
    carrierMutations: ["Ino"],
    probableMutations: ["Pastel"],
    geneticConfidence: "CONFIRMED",
    fatherId: "bird-father",
    motherId: "bird-mother",
    originBreeder: "Criatorio Vitoria",
    reproductiveStatus: "PAIRING",
    isPublic: true,
    isFeatured: true,
    notes: "Ave equilibrada, excelente mascara e postura.",
    status: "ACTIVE",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  },
  {
    id: "bird-father",
    breederId: DEMO_USER_ID,
    name: "Titanio",
    nickname: null,
    ringNumber: "BR-2022-0102",
    species: "Canario Belga",
    sex: "MALE",
    birthDate: "2022-08-10",
    mainColor: "Cinza",
    phenotype: "Corpo longo",
    visibleMutation: "Portador opalino",
    carrierMutations: ["Opalino"],
    probableMutations: [],
    geneticConfidence: "CONFIRMED",
    fatherId: null,
    motherId: null,
    originBreeder: "Criatorio Horizonte",
    reproductiveStatus: "IDLE",
    isPublic: false,
    isFeatured: false,
    notes: "",
    status: "ACTIVE",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  },
  {
    id: "bird-mother",
    breederId: DEMO_USER_ID,
    name: "Luna Dourada",
    nickname: "Luna",
    ringNumber: "BR-2023-0078",
    species: "Canario Belga",
    sex: "FEMALE",
    birthDate: "2023-04-23",
    mainColor: "Dourado claro",
    phenotype: "Cabeca arredondada",
    visibleMutation: "Pastel",
    carrierMutations: ["Ino"],
    probableMutations: ["Opalino"],
    geneticConfidence: "PROBABLE",
    fatherId: null,
    motherId: null,
    originBreeder: "Criatorio Aurora",
    reproductiveStatus: "NESTING",
    isPublic: false,
    isFeatured: true,
    notes: "Boa mae em temporada 2025.",
    status: "ACTIVE",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  },
  {
    id: "bird-04",
    breederId: DEMO_USER_ID,
    name: "Safira",
    nickname: null,
    ringNumber: "BR-2025-0092",
    species: "Agapornis",
    sex: "FEMALE",
    birthDate: "2025-02-10",
    mainColor: "Verde oliva",
    phenotype: "Peito largo",
    visibleMutation: "Lutino",
    carrierMutations: [],
    probableMutations: [],
    geneticConfidence: "INFORMED",
    fatherId: null,
    motherId: null,
    originBreeder: "Criatorio Aurora",
    reproductiveStatus: "RAISING",
    isPublic: true,
    isFeatured: false,
    notes: "Filhotes vigorosos na primeira ninhada.",
    status: "ACTIVE",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  },
  {
    id: "bird-05",
    breederId: DEMO_USER_ID,
    name: "Solaris",
    nickname: "Sol",
    ringNumber: "BR-2025-0110",
    species: "Calopsita",
    sex: "UNKNOWN",
    birthDate: "2025-11-04",
    mainColor: "Amarelo",
    phenotype: "Juvenil",
    visibleMutation: "Cara branca",
    carrierMutations: ["Perola"],
    probableMutations: [],
    geneticConfidence: "PROBABLE",
    fatherId: "bird-04",
    motherId: "bird-mother",
    originBreeder: "Interno",
    reproductiveStatus: "IDLE",
    isPublic: false,
    isFeatured: false,
    notes: "Aguardando sexagem.",
    status: "ACTIVE",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  }
];

export const dashboardStats: DashboardStat[] = [
  { label: "Total de aves", value: 128, delta: 12, tone: "default" },
  { label: "Machos", value: 58, delta: 4, tone: "default" },
  { label: "Femeas", value: 54, delta: 5, tone: "default" },
  { label: "Filhotes", value: 16, delta: 3, tone: "success" },
  { label: "Em reproducao", value: 22, delta: -2, tone: "warning" },
  { label: "Genetica observacao", value: 9, delta: 2, tone: "warning" },
  { label: "Genealogia completa", value: 91, delta: 8, tone: "success" },
  { label: "Aves destaque", value: 14, delta: 2, tone: "default" }
];

export const flockGrowth = [
  { month: "Jan", total: 96 },
  { month: "Fev", total: 102 },
  { month: "Mar", total: 108 },
  { month: "Abr", total: 109 },
  { month: "Mai", total: 115 },
  { month: "Jun", total: 120 },
  { month: "Jul", total: 124 },
  { month: "Ago", total: 128 }
];

export const mutationDistribution = [
  { mutation: "Opalino", total: 32 },
  { mutation: "Pastel", total: 24 },
  { mutation: "Lutino", total: 18 },
  { mutation: "Ino", total: 14 },
  { mutation: "Outras", total: 40 }
];

export const sexDistribution = [
  { category: "Machos", value: 58 },
  { category: "Femeas", value: 54 },
  { category: "Sem sexagem", value: 16 }
];

export const ringUsageByMonth = [
  { month: "Jan", used: 10 },
  { month: "Fev", used: 12 },
  { month: "Mar", used: 17 },
  { month: "Abr", used: 21 },
  { month: "Mai", used: 15 },
  { month: "Jun", used: 24 },
  { month: "Jul", used: 18 },
  { month: "Ago", used: 11 }
];

export const mockShareLinks: PublicBirdShare[] = [
  {
    id: "share-01",
    birdId: "demo-bird",
    slug: "demo-golden-finch",
    isActive: true,
    expiresAt: null,
    allowedSections: ["header", "genetics", "pedigree", "media", "awards"],
    viewCount: 187
  }
];

export const recentActivities = [
  {
    id: "up-01",
    label: "Filhote BR-2026-004 foi registrado na ninhada N-220",
    timestamp: "Hoje, 08:12"
  },
  {
    id: "up-02",
    label: "Anilha BR-2026-0412 vinculada a Imperial Azul",
    timestamp: "Ontem, 19:22"
  },
  {
    id: "up-03",
    label: "Nova ficha publica compartilhada no WhatsApp",
    timestamp: "Ontem, 14:03"
  }
];
