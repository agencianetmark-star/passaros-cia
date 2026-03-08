import Link from "next/link";
import { ArrowRight, Bird, ChartColumnBig, Network, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
  {
    icon: Bird,
    title: "Plantel centralizado",
    text: "Cadastro completo de aves, fichas premium e filtros inteligentes."
  },
  {
    icon: Network,
    title: "Genealogia visual",
    text: "Arvore interativa com leitura rapida de linhagem e mutacoes."
  },
  {
    icon: ChartColumnBig,
    title: "Dashboard estrategico",
    text: "Indicadores para reproducao, temporada e uso de anilhas."
  },
  {
    icon: Share2,
    title: "Compartilhamento publico",
    text: "Links elegantes para divulgar aves sem exigir login."
  }
];

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 pb-12 pt-10 sm:px-8">
      <section className="rounded-3xl border bg-white/90 p-6 shadow-soft sm:p-10">
        <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          Base SaaS pronta para escalar
        </span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
          [NOME DO SISTEMA]
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Plataforma moderna para criadores organizarem plantel, genetica, genealogia, anilhas e
          fichas publicas de forma profissional.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/dashboard">
              Abrir painel do criador
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/public/birds/demo-golden-finch">Ver exemplo de ficha publica</Link>
          </Button>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {highlights.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <item.icon className="size-5 text-primary" />
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{item.text}</CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
