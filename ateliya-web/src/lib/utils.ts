import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatage monétaire FCFA
export function formatXOF(montant: number): string {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

// Formatage monétaire court
export function formatXOFShort(n: number): string {
  if (n >= 1_000_000_000) {
    return (n / 1_000_000_000).toFixed(1) + "B";
  } else if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1) + "M";
  } else if (n >= 1_000) {
    return (n / 1_000).toFixed(1) + "K";
  } else {
    return n.toFixed(0);
  }
}

// Formatage date FR
export function formatDateFR(date: string | Date): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Formatage date FR long
export function formatDateFRLong(date: string | Date): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Formatage date relative
export function formatDateRelative(date: string | Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine(s)`;
  return formatDateFR(date);
}

// Générer une référence unique
export function generateReference(prefix: string = "CMD"): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${year}-${random}`;
}

// Obtenir les initiales d'un nom
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Tronquer un texte
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}
