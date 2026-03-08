import Link from "next/link";
import {
  Bird,
  CirclePlus,
  GitBranchPlus,
  Link2,
  ScanLine,
  Share2,
  Sparkles,
  UsersRound
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  { label: "Cadastrar ave", href: "/birds/new", icon: CirclePlus },
  { label: "Cadastrar casal", href: "/birds/new?mode=pairing", icon: GitBranchPlus },
  { label: "Abrir genealogia", href: "/birds/demo-bird/pedigree", icon: GitBranchPlus },
  { label: "Ver meu plantel", href: "/flock", icon: UsersRound },
  { label: "Registrar filhote", href: "/birds/new?mode=offspring", icon: Bird },
  { label: "Registrar anilha", href: "/rings?mode=use", icon: ScanLine },
  { label: "Fichas publicas", href: "/public/birds/demo-golden-finch", icon: Link2 },
  { label: "Compartilhar ave", href: "/birds/demo-bird", icon: Share2 },
  { label: "Aves destaque", href: "/flock?featured=true", icon: Sparkles }
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atalhos rapidos</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex min-h-20 flex-col items-start justify-between rounded-xl border bg-white p-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
          >
            <action.icon className="size-4 text-primary" />
            <span>{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
