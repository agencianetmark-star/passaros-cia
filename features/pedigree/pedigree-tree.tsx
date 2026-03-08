"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Expand, Minus, Plus, RotateCw, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bird } from "@/types/domain";

interface PedigreeTreeProps {
  bird: Bird;
  father?: Bird | null;
  mother?: Bird | null;
  grandparents?: {
    paternalGrandfather?: Bird | null;
    paternalGrandmother?: Bird | null;
    maternalGrandfather?: Bird | null;
    maternalGrandmother?: Bird | null;
  };
}

function NodeCard({ bird, role }: { bird?: Bird | null; role: string }) {
  const ring = bird?.ringNumber ?? "Sem anilha";
  return (
    <div className="min-w-[180px] rounded-xl border bg-white p-3 shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{role}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{bird?.name ?? "Nao informado"}</p>
      <p className="text-xs text-muted-foreground">{ring}</p>
      {bird ? (
        <div className="mt-2 flex flex-wrap gap-1">
          <Badge variant={bird.sex === "MALE" ? "default" : bird.sex === "FEMALE" ? "highlight" : "subtle"}>
            {bird.sex}
          </Badge>
          <Badge variant="subtle">{bird.visibleMutation ?? "Sem mutacao"}</Badge>
        </div>
      ) : (
        <div className="mt-2">
          <Badge variant="warning">Genealogia incompleta</Badge>
        </div>
      )}
      {bird ? (
        <Button variant="ghost" size="sm" className="mt-2 h-8 px-2" asChild>
          <Link href={`/birds/${bird.id}`}>Abrir ficha</Link>
        </Button>
      ) : null}
    </div>
  );
}

export function PedigreeTree({ bird, father, mother, grandparents }: PedigreeTreeProps) {
  const [zoom, setZoom] = useState(1);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");

  const hasMissingData = useMemo(
    () => !father || !mother || !grandparents?.paternalGrandfather || !grandparents?.maternalGrandmother,
    [father, mother, grandparents]
  );

  const repeatedLineage = useMemo(() => {
    const ids = [father?.id, mother?.id, grandparents?.paternalGrandfather?.id, grandparents?.maternalGrandfather?.id].filter(
      Boolean
    );
    const uniqueCount = new Set(ids).size;
    return uniqueCount !== ids.length;
  }, [father, mother, grandparents]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Arvore genealogica interativa</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setZoom((value) => Math.max(0.7, value - 0.1))}>
              <Minus className="size-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoom((value) => Math.min(1.4, value + 0.1))}>
              <Plus className="size-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setOrientation((value) => (value === "horizontal" ? "vertical" : "horizontal"))}>
              <RotateCw className="mr-1 size-4" />
              {orientation === "horizontal" ? "Vertical" : "Horizontal"}
            </Button>
            <Button variant="outline" size="sm">
              <Expand className="mr-1 size-4" />
              Tela cheia
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasMissingData ? (
            <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
              <TriangleAlert className="size-4" />
              Genealogia incompleta: alguns ancestrais ainda nao foram vinculados.
            </div>
          ) : null}

          {repeatedLineage ? (
            <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              <TriangleAlert className="size-4" />
              Repeticao de ancestral detectada na linhagem.
            </div>
          ) : null}

          <div className="overflow-auto rounded-xl border bg-slate-50 p-4">
            <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}>
              {orientation === "horizontal" ? (
                <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
                  <div className="space-y-3">
                    <NodeCard bird={grandparents?.paternalGrandfather} role="Avo paterno" />
                    <NodeCard bird={grandparents?.paternalGrandmother} role="Avo paterna" />
                  </div>
                  <div className="hidden lg:flex items-center justify-center text-muted-foreground">{"->"}</div>
                  <div className="space-y-3">
                    <NodeCard bird={father} role="Pai" />
                    <NodeCard bird={mother} role="Mae" />
                  </div>
                  <div className="hidden lg:flex items-center justify-center text-muted-foreground">{"->"}</div>
                  <div className="space-y-3">
                    <NodeCard bird={bird} role="Ave principal" />
                    <NodeCard bird={grandparents?.maternalGrandfather} role="Avo materno" />
                    <NodeCard bird={grandparents?.maternalGrandmother} role="Avo materna" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <NodeCard bird={grandparents?.paternalGrandfather} role="Avo paterno" />
                  <NodeCard bird={grandparents?.paternalGrandmother} role="Avo paterna" />
                  <NodeCard bird={father} role="Pai" />
                  <NodeCard bird={mother} role="Mae" />
                  <NodeCard bird={bird} role="Ave principal" />
                  <NodeCard bird={grandparents?.maternalGrandfather} role="Avo materno" />
                  <NodeCard bird={grandparents?.maternalGrandmother} role="Avo materna" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
