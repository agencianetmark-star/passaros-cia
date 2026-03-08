"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Copy, GitBranch, Share2, Sparkles, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateAgeLabel, formatDate } from "@/lib/utils";
import { Bird } from "@/types/domain";

interface BirdProfileProps {
  bird: Bird;
  shareSlug?: string;
  readOnly?: boolean;
  father?: Bird | null;
  mother?: Bird | null;
  grandparents?: {
    paternalGrandfather?: Bird | null;
    paternalGrandmother?: Bird | null;
    maternalGrandfather?: Bird | null;
    maternalGrandmother?: Bird | null;
  };
}

function ancestorLabel(ancestor?: Bird | null) {
  if (!ancestor) return "Nao informado";
  return `${ancestor.name} (${ancestor.ringNumber})`;
}

export function BirdProfile({ bird, shareSlug, readOnly = false, father, mother, grandparents }: BirdProfileProps) {
  const publicLink = useMemo(() => {
    if (!shareSlug) return "";
    if (typeof window === "undefined") return `/public/birds/${shareSlug}`;
    return `${window.location.origin}/public/birds/${shareSlug}`;
  }, [shareSlug]);

  async function copyLink() {
    if (!publicLink) return;
    await navigator.clipboard.writeText(publicLink);
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-56 bg-gradient-to-r from-slate-900 via-[#2451A6] to-[#4E7FD0] p-5 text-white sm:h-64 sm:p-8">
            <div className="absolute right-4 top-4 flex gap-2">
              <Badge variant="highlight">{bird.isFeatured ? "Destaque" : "Plantel"}</Badge>
              <Badge variant="subtle">{bird.isPublic ? "Publica" : "Privada"}</Badge>
            </div>
            <div className="mt-8 max-w-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-white/80">{bird.species}</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">{bird.name}</h2>
              <p className="mt-1 text-sm text-white/80">
                {bird.ringNumber} | {bird.visibleMutation ?? "Sem mutacao registrada"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="highlight">{bird.sex === "MALE" ? "Macho" : bird.sex === "FEMALE" ? "Femea" : "Nao definido"}</Badge>
                <Badge variant="subtle">{calculateAgeLabel(bird.birthDate)}</Badge>
                <Badge variant="subtle">{bird.geneticConfidence}</Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t bg-white p-4">
            {!readOnly ? (
              <>
                <Button variant="outline" asChild>
                  <Link href={`/birds/${bird.id}/pedigree`}>
                    <GitBranch className="mr-2 size-4" />
                    Abrir genealogia
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/public/birds/${shareSlug ?? `${bird.id}-public`}`} target="_blank">
                    <Share2 className="mr-2 size-4" />
                    Visualizar ficha publica
                  </Link>
                </Button>
                <Button variant="secondary" onClick={copyLink}>
                  <Copy className="mr-2 size-4" />
                  Copiar link
                </Button>
              </>
            ) : null}
            {readOnly ? (
              <Button variant="outline" asChild>
                <Link href="/">Conhecer [NOME DO SISTEMA]</Link>
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Informacoes principais</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground">Data de nascimento</p>
              <p className="font-semibold text-slate-800">{formatDate(bird.birthDate)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Idade</p>
              <p className="font-semibold text-slate-800">{calculateAgeLabel(bird.birthDate)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Origem</p>
              <p className="font-semibold text-slate-800">{bird.originBreeder ?? "Criatorio proprio"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status reprodutivo</p>
              <p className="font-semibold text-slate-800">{bird.reproductiveStatus}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cor e fenotipo</p>
              <p className="font-semibold text-slate-800">
                {[bird.mainColor, bird.phenotype].filter(Boolean).join(" | ") || "-"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Observacoes</p>
              <p className="font-semibold text-slate-800">{bird.notes || "-"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conquistas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border p-2">
              <span className="text-sm font-medium">Ave destaque</span>
              <Sparkles className="size-4 text-amber-600" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-2">
              <span className="text-sm font-medium">Genealogia completa</span>
              <Trophy className="size-4 text-primary" />
            </div>
            <div className="rounded-lg border border-dashed p-2 text-xs text-muted-foreground">
              Base pronta para integrar torneios, selos e ranking premium.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Area genetica</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">Mutacao visivel</p>
              <p className="font-semibold text-slate-800">{bird.visibleMutation ?? "-"}</p>
            </div>
            <div className="rounded-xl border bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">Portador de</p>
              <p className="font-semibold text-slate-800">{bird.carrierMutations.join(", ") || "-"}</p>
            </div>
            <div className="rounded-xl border bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">Mutacao provavel</p>
              <p className="font-semibold text-slate-800">{bird.probableMutations.join(", ") || "-"}</p>
            </div>
            <div className="rounded-xl border bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">Confianca genetica</p>
              <p className="font-semibold text-slate-800">{bird.geneticConfidence}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Midia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="aspect-video rounded-xl border bg-gradient-to-br from-slate-100 to-slate-200" />
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-lg border bg-slate-100" />
              <div className="aspect-square rounded-lg border bg-slate-100" />
              <div className="aspect-square rounded-lg border bg-slate-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Area genealogica</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href={father ? `/birds/${father.id}` : "#"} className="rounded-xl border p-3 hover:bg-muted/30">
            <p className="text-xs text-muted-foreground">Pai</p>
            <p className="font-semibold text-slate-800">{ancestorLabel(father)}</p>
          </Link>
          <Link href={mother ? `/birds/${mother.id}` : "#"} className="rounded-xl border p-3 hover:bg-muted/30">
            <p className="text-xs text-muted-foreground">Mae</p>
            <p className="font-semibold text-slate-800">{ancestorLabel(mother)}</p>
          </Link>
          <Link href={`/birds/${bird.id}/pedigree`} className="rounded-xl border p-3 hover:bg-muted/30">
            <p className="text-xs text-muted-foreground">Arvore completa</p>
            <p className="font-semibold text-slate-800">Abrir visual interativo</p>
          </Link>
          <div className="rounded-xl border p-3">
            <p className="text-xs text-muted-foreground">Avo paterno</p>
            <p className="font-semibold text-slate-800">{ancestorLabel(grandparents?.paternalGrandfather)}</p>
          </div>
          <div className="rounded-xl border p-3">
            <p className="text-xs text-muted-foreground">Avo paterna</p>
            <p className="font-semibold text-slate-800">{ancestorLabel(grandparents?.paternalGrandmother)}</p>
          </div>
          <div className="rounded-xl border p-3">
            <p className="text-xs text-muted-foreground">Avo materna</p>
            <p className="font-semibold text-slate-800">{ancestorLabel(grandparents?.maternalGrandmother)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
