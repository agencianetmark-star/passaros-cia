import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "criador@demo.local" },
    update: {},
    create: {
      email: "criador@demo.local",
      fullName: "Criador Demo",
      breederProfile: {
        create: {
          aviaryName: "Plantel Ouro Azul",
          city: "Sao Paulo",
          state: "SP",
          workedSpecies: ["Canario Belga", "Agapornis", "Calopsita"]
        }
      }
    }
  });

  const father = await prisma.bird.upsert({
    where: {
      breederId_ringNumber: {
        breederId: user.id,
        ringNumber: "BR-2022-0102"
      }
    },
    update: {},
    create: {
      breederId: user.id,
      name: "Titanio",
      ringNumber: "BR-2022-0102",
      species: "Canario Belga",
      sex: "MALE",
      birthDate: new Date("2022-08-10"),
      visibleMutation: "Portador opalino",
      carrierMutations: ["Opalino"],
      reproductiveStatus: "IDLE"
    }
  });

  const mother = await prisma.bird.upsert({
    where: {
      breederId_ringNumber: {
        breederId: user.id,
        ringNumber: "BR-2023-0078"
      }
    },
    update: {},
    create: {
      breederId: user.id,
      name: "Luna Dourada",
      ringNumber: "BR-2023-0078",
      species: "Canario Belga",
      sex: "FEMALE",
      birthDate: new Date("2023-04-23"),
      visibleMutation: "Pastel",
      carrierMutations: ["Ino"],
      reproductiveStatus: "NESTING"
    }
  });

  const bird = await prisma.bird.upsert({
    where: {
      breederId_ringNumber: {
        breederId: user.id,
        ringNumber: "BR-2025-0045"
      }
    },
    update: {},
    create: {
      breederId: user.id,
      name: "Imperador Azul",
      ringNumber: "BR-2025-0045",
      species: "Canario Belga",
      sex: "MALE",
      birthDate: new Date("2024-09-12"),
      visibleMutation: "Opalino",
      carrierMutations: ["Ino"],
      probableMutations: ["Pastel"],
      fatherId: father.id,
      motherId: mother.id,
      isPublic: true,
      isFeatured: true,
      reproductiveStatus: "PAIRING"
    }
  });

  await prisma.publicShareLink.upsert({
    where: { slug: "demo-golden-finch" },
    update: {},
    create: {
      birdId: bird.id,
      slug: "demo-golden-finch",
      isActive: true,
      allowedSections: ["header", "genetics", "pedigree", "media", "awards"],
      createdByUserId: user.id
    }
  });

  console.log("Seed finalizado.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
