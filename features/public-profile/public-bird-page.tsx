import Link from "next/link";
import { Bird } from "lucide-react";

import { BirdProfile } from "@/features/birds/bird-profile";
import { Bird as BirdEntity } from "@/types/domain";

interface PublicBirdPageProps {
  bird: BirdEntity;
  shareSlug: string;
  breeder: {
    aviaryName: string;
    cityState: string;
    yearsBreeding: string;
  };
  relations: {
    father?: BirdEntity | null;
    mother?: BirdEntity | null;
    grandparents?: {
      paternalGrandfather?: BirdEntity | null;
      paternalGrandmother?: BirdEntity | null;
      maternalGrandfather?: BirdEntity | null;
      maternalGrandmother?: BirdEntity | null;
    };
  };
}

export function PublicBirdPage({ bird, shareSlug, breeder, relations }: PublicBirdPageProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6">
      <section className="mb-4 rounded-2xl border bg-white p-4 shadow-card sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary text-white">
              <Bird className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Ficha publica oficial</p>
              <h1 className="text-lg font-extrabold text-slate-900">{breeder.aviaryName}</h1>
              <p className="text-xs text-muted-foreground">
                {breeder.cityState} | {breeder.yearsBreeding}
              </p>
            </div>
          </div>
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            Criar minha plataforma
          </Link>
        </div>
      </section>

      <BirdProfile
        bird={bird}
        shareSlug={shareSlug}
        readOnly
        father={relations.father}
        mother={relations.mother}
        grandparents={relations.grandparents}
      />
    </main>
  );
}
