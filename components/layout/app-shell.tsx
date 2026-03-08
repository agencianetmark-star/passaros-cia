"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Bird,
  ChartNoAxesCombined,
  CircleFadingArrowUp,
  GitBranch,
  LayoutDashboard,
  Menu,
  Plus,
  ScanLine,
  X
} from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Novo passaro", href: "/birds/new", icon: Plus },
  { label: "Meu plantel", href: "/flock", icon: Bird },
  { label: "Arvores", href: "/birds/demo-bird/pedigree", icon: GitBranch },
  { label: "Anilhas", href: "/rings", icon: ScanLine },
  { label: "Publico", href: "/public/birds/demo-golden-finch", icon: CircleFadingArrowUp }
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const title = useMemo(() => {
    const item = navigation.find((entry) => pathname.startsWith(entry.href));
    return item?.label ?? "Painel";
  }, [pathname]);

  return (
    <div className="min-h-screen bg-blue-wave">
      <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-md border p-2 md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-900">
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary text-white">
                <Bird className="size-4" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-extrabold tracking-tight">[NOME DO SISTEMA]</p>
                <p className="text-xs text-muted-foreground">Area do criador</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-lg border bg-white p-2 text-slate-600 hover:text-slate-900">
              <ChartNoAxesCombined className="size-4" />
            </button>
            <button className="rounded-lg border bg-white p-2 text-slate-600 hover:text-slate-900">
              <Bell className="size-4" />
            </button>
            <div className="hidden rounded-full border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground sm:block">
              Criador Pro
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl gap-4 px-4 pb-8 pt-5 sm:px-6">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-20 w-64 border-r bg-white p-4 shadow-soft transition-transform md:static md:translate-x-0 md:rounded-2xl md:border md:shadow-card",
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <div className="mb-4 text-sm font-semibold text-muted-foreground">Navegacao</div>
          <nav className="grid gap-1">
            {navigation.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-primary text-primary-foreground" : "text-slate-700 hover:bg-muted"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-2xl">
          <div className="mb-4 px-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</h1>
            <p className="text-sm text-muted-foreground">
              Controle completo do criatorio com foco em experiencia mobile.
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
