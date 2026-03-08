import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAgeLabel(birthDate?: Date | string | null) {
  if (!birthDate) return "Sem data";
  const date = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
  if (Number.isNaN(date.getTime())) return "Sem data";

  const today = new Date();
  const years = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  const days = today.getDate() - date.getDate();
  const adjustedYears = monthDiff < 0 || (monthDiff === 0 && days < 0) ? years - 1 : years;

  if (adjustedYears > 0) {
    return `${adjustedYears} ${adjustedYears === 1 ? "ano" : "anos"}`;
  }

  const totalMonths = Math.max(
    0,
    (today.getFullYear() - date.getFullYear()) * 12 + today.getMonth() - date.getMonth()
  );

  if (totalMonths > 0) return `${totalMonths} ${totalMonths === 1 ? "mes" : "meses"}`;

  const diffInMs = today.getTime() - date.getTime();
  const diffInDays = Math.max(0, Math.floor(diffInMs / (1000 * 60 * 60 * 24)));
  return `${diffInDays} ${diffInDays === 1 ? "dia" : "dias"}`;
}

export function formatDate(value?: Date | string | null) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}
