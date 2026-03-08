"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createBirdSchema, type CreateBirdSchema } from "@/lib/validators/bird";

interface BirdFormWizardProps {
  possibleParents: Array<{ id: string; name: string; ringNumber: string }>;
}

const steps = [
  { id: "basic", label: "Basico" },
  { id: "genetics", label: "Genetica" },
  { id: "media", label: "Midia" },
  { id: "review", label: "Revisao" }
] as const;

export function BirdFormWizard({ possibleParents }: BirdFormWizardProps) {
  const [activeStep, setActiveStep] = useState<(typeof steps)[number]["id"]>("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const parentOptions = useMemo(
    () => possibleParents.map((parent) => `${parent.name} (${parent.ringNumber})|${parent.id}`),
    [possibleParents]
  );

  const form = useForm<CreateBirdSchema>({
    resolver: zodResolver(createBirdSchema),
    defaultValues: {
      name: "",
      nickname: "",
      ringNumber: "",
      species: "",
      sex: "UNKNOWN",
      birthDate: "",
      visibleMutation: "",
      carrierMutations: [],
      probableMutations: [],
      fatherId: "",
      motherId: "",
      notes: "",
      isPublic: false,
      isFeatured: false
    }
  });

  const values = form.watch();

  const handleParentValue = (value: string) => value.split("|")[1] ?? "";

  async function onSubmit(payload: CreateBirdSchema) {
    setIsSubmitting(true);
    const response = await fetch("/api/birds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setIsSubmitting(false);

    if (!response.ok) {
      form.setError("root", { message: "Nao foi possivel cadastrar a ave. Verifique os campos e tente novamente." });
      return;
    }

    const data = (await response.json()) as { data: { id: string } };
    router.push(`/birds/${data.data.id}`);
  }

  const stepIndex = steps.findIndex((step) => step.id === activeStep);

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Cadastro de aves por etapas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {steps.map((step, index) => (
              <button
                type="button"
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                  activeStep === step.id
                    ? "border-primary bg-primary text-white"
                    : index < stepIndex
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-border bg-white text-slate-600"
                }`}
              >
                {index + 1}. {step.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {activeStep === "basic" ? (
        <Card>
          <CardHeader>
            <CardTitle>Informacoes principais</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Nome da ave</Label>
              <Input id="name" {...form.register("name")} placeholder="Ex.: Imperador Azul" />
              {form.formState.errors.name ? <p className="mt-1 text-xs text-red-600">{form.formState.errors.name.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="nickname">Apelido</Label>
              <Input id="nickname" {...form.register("nickname")} placeholder="Opcional" />
            </div>
            <div>
              <Label htmlFor="ringNumber">Numero da anilha</Label>
              <Input id="ringNumber" {...form.register("ringNumber")} placeholder="BR-2026-0001" />
              {form.formState.errors.ringNumber ? (
                <p className="mt-1 text-xs text-red-600">{form.formState.errors.ringNumber.message}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="species">Especie</Label>
              <Input id="species" {...form.register("species")} placeholder="Canario Belga" />
            </div>
            <div>
              <Label htmlFor="sex">Sexo</Label>
              <Select
                id="sex"
                value={values.sex}
                onChange={(event) => form.setValue("sex", event.target.value as CreateBirdSchema["sex"])}
                options={[
                  { label: "Macho", value: "MALE" },
                  { label: "Femea", value: "FEMALE" },
                  { label: "Nao definido", value: "UNKNOWN" }
                ]}
              />
            </div>
            <div>
              <Label htmlFor="birthDate">Data de nascimento</Label>
              <Input id="birthDate" type="date" {...form.register("birthDate")} />
            </div>
            <div>
              <Label htmlFor="father">Pai (autocomplete)</Label>
              <Input
                id="father"
                list="fathers-list"
                placeholder="Digite para buscar"
                onChange={(event) => form.setValue("fatherId", handleParentValue(event.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="mother">Mae (autocomplete)</Label>
              <Input
                id="mother"
                list="mothers-list"
                placeholder="Digite para buscar"
                onChange={(event) => form.setValue("motherId", handleParentValue(event.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      ) : null}

      {activeStep === "genetics" ? (
        <Card>
          <CardHeader>
            <CardTitle>Genetica e status</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="visibleMutation">Mutacao visivel</Label>
              <Input id="visibleMutation" {...form.register("visibleMutation")} placeholder="Opalino" />
            </div>
            <div>
              <Label htmlFor="carrierMutations">Mutacoes portadoras (separadas por virgula)</Label>
              <Input
                id="carrierMutations"
                placeholder="Ino, Pastel"
                onChange={(event) =>
                  form.setValue(
                    "carrierMutations",
                    event.target.value
                      .split(",")
                      .map((value) => value.trim())
                      .filter(Boolean)
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="probableMutations">Mutacoes provaveis (separadas por virgula)</Label>
              <Input
                id="probableMutations"
                placeholder="Satine"
                onChange={(event) =>
                  form.setValue(
                    "probableMutations",
                    event.target.value
                      .split(",")
                      .map((value) => value.trim())
                      .filter(Boolean)
                  )
                }
              />
            </div>
            <div className="flex items-end gap-3">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  className="size-4 rounded border-border"
                  checked={values.isPublic}
                  onChange={(event) => form.setValue("isPublic", event.target.checked)}
                />
                Visibilidade publica
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  className="size-4 rounded border-border"
                  checked={values.isFeatured}
                  onChange={(event) => form.setValue("isFeatured", event.target.checked)}
                />
                Ave destaque
              </label>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="notes">Observacoes</Label>
              <Textarea id="notes" {...form.register("notes")} placeholder="Anotacoes do criador..." />
            </div>
          </CardContent>
        </Card>
      ) : null}

      {activeStep === "media" ? (
        <Card>
          <CardHeader>
            <CardTitle>Fotos e videos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
              Estrutura pronta para upload em storage externo (S3, Cloudinary ou R2). Nesta base, o fluxo
              ja esta preparado para anexar foto principal, galeria e videos sem alterar arquitetura.
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Input type="url" placeholder="URL da foto principal" />
              <Input type="url" placeholder="URL da galeria 1" />
              <Input type="url" placeholder="URL do video" />
            </div>
          </CardContent>
        </Card>
      ) : null}

      {activeStep === "review" ? (
        <Card>
          <CardHeader>
            <CardTitle>Preview da ficha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border bg-white p-4 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{values.name || "Sem nome"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {values.ringNumber || "Sem anilha"} | {values.species || "Sem especie"}
                  </p>
                </div>
                <Badge variant={values.isPublic ? "success" : "subtle"}>
                  {values.isPublic ? "Publica" : "Privada"}
                </Badge>
              </div>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Mutacao principal</dt>
                  <dd className="font-semibold text-slate-800">{values.visibleMutation || "-"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="font-semibold text-slate-800">{values.isFeatured ? "Destaque" : "Padrao"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Portadoras</dt>
                  <dd className="font-semibold text-slate-800">{values.carrierMutations?.join(", ") || "-"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Provaveis</dt>
                  <dd className="font-semibold text-slate-800">{values.probableMutations?.join(", ") || "-"}</dd>
                </div>
              </dl>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <datalist id="fathers-list">
        {parentOptions.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>
      <datalist id="mothers-list">
        {parentOptions.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>

      {form.formState.errors.root ? <p className="text-sm text-red-600">{form.formState.errors.root.message}</p> : null}

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-white p-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Eye className="size-4" />
          Formulario otimizado para celular e usuarios nao tecnicos.
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" asChild>
            <Link href="/flock">Cancelar</Link>
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setActiveStep(steps[Math.max(0, stepIndex - 1)].id)}
            disabled={stepIndex === 0}
          >
            Voltar
          </Button>
          {stepIndex < steps.length - 1 ? (
            <Button type="button" onClick={() => setActiveStep(steps[stepIndex + 1].id)}>
              Proximo
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              Salvar ave
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
