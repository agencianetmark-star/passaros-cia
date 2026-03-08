"use client";

import Link from "next/link";
import { useMemo } from "react";
import { GitBranch, Pencil, Search, Share2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useBirdFilters } from "@/hooks/use-bird-filters";
import { calculateAgeLabel } from "@/lib/utils";
import { Bird } from "@/types/domain";

interface FlockGridProps {
  birds: Bird[];
}

export function FlockGrid({ birds }: FlockGridProps) {
  const filters = useBirdFilters();

  const speciesOptions = useMemo(() => {
    const values = [...new Set(birds.map((bird) => bird.species))];
    return [{ value: "", label: "Todas especies" }, ...values.map((item) => ({ value: item, label: item }))];
  }, [birds]);

  const mutationOptions = useMemo(() => {
    const values = [...new Set(birds.map((bird) => bird.visibleMutation).filter(Boolean))] as string[];
    return [{ value: "", label: "Todas mutacoes" }, ...values.map((item) => ({ value: item, label: item }))];
  }, [birds]);

  const filtered = useMemo(() => {
    return birds.filter((bird) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match =
          bird.name.toLowerCase().includes(q) ||
          bird.ringNumber.toLowerCase().includes(q) ||
          (bird.nickname ?? "").toLowerCase().includes(q);
        if (!match) return false;
      }

      if (filters.species && bird.species !== filters.species) return false;
      if (filters.sex && bird.sex !== filters.sex) return false;
      if (filters.mutation && bird.visibleMutation !== filters.mutation) return false;
      if (filters.publicOnly && !bird.isPublic) return false;
      if (filters.featuredOnly && !bird.isFeatured) return false;
      return true;
    });
  }, [birds, filters]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filtro do plantel</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Buscar por nome, anilha ou apelido"
              value={filters.search}
              onChange={(event) => filters.setSearch(event.target.value)}
            />
          </div>
          <Select value={filters.species} onChange={(event) => filters.setSpecies(event.target.value)} options={speciesOptions} />
          <Select
            value={filters.sex}
            onChange={(event) => filters.setSex(event.target.value)}
            options={[
              { value: "", label: "Todos sexos" },
              { value: "MALE", label: "Macho" },
              { value: "FEMALE", label: "Femea" },
              { value: "UNKNOWN", label: "Nao definido" }
            ]}
          />
          <Select value={filters.mutation} onChange={(event) => filters.setMutation(event.target.value)} options={mutationOptions} />
          <div className="flex gap-2">
            <label className="flex items-center gap-1 text-xs">
              <input type="checkbox" checked={filters.publicOnly} onChange={(event) => filters.setPublicOnly(event.target.checked)} />
              Publicas
            </label>
            <label className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={filters.featuredOnly}
                onChange={(event) => filters.setFeaturedOnly(event.target.checked)}
              />
              Destaque
            </label>
            <Button type="button" variant="ghost" size="sm" onClick={filters.reset}>
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((bird) => (
          <Card key={bird.id} className="overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-50" />
            <CardContent className="space-y-3 pt-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-lg font-bold text-slate-900">{bird.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {bird.ringNumber} | {bird.species}
                  </p>
                </div>
                <Badge variant={bird.isFeatured ? "highlight" : "subtle"}>{bird.isFeatured ? "Destaque" : "Padrao"}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border bg-muted/20 px-2 py-1">
                  <span className="text-muted-foreground">Sexo</span>
                  <p className="font-semibold text-slate-700">{bird.sex}</p>
                </div>
                <div className="rounded-lg border bg-muted/20 px-2 py-1">
                  <span className="text-muted-foreground">Idade</span>
                  <p className="font-semibold text-slate-700">{calculateAgeLabel(bird.birthDate)}</p>
                </div>
                <div className="col-span-2 rounded-lg border bg-muted/20 px-2 py-1">
                  <span className="text-muted-foreground">Mutacao</span>
                  <p className="font-semibold text-slate-700">{bird.visibleMutation ?? "-"}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-1">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/birds/${bird.id}`}>Ficha</Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Pencil className="size-4" />
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/birds/${bird.id}/pedigree`}>
                    <GitBranch className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/public/birds/${bird.id}-public`}>
                    <Share2 className="size-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
