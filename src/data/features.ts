export type FeatureTone = "green" | "gold" | "light" | "dark";

export interface Feature {
  /** Clé de l'illustration (voir imports dans Features.astro). */
  illustration: "clients" | "commandes" | "mesures" | "paiements";
  title: string;
  description: string;
  tone: FeatureTone;
}

export const FEATURES: Feature[] = [
  {
    illustration: "clients",
    title: "Gestion des clients",
    description:
      "Coordonnées, préférences et historique réunis dans une fiche claire, accessible en un instant.",
    tone: "green",
  },
  {
    illustration: "commandes",
    title: "Suivi des commandes",
    description:
      "Visualisez d'un coup d'œil les commandes à traiter et celles déjà terminées.",
    tone: "gold",
  },
  {
    illustration: "mesures",
    title: "Prise de mesures",
    description:
      "Conservez les mesures de chaque client pour les retrouver sans jamais les redemander.",
    tone: "light",
  },
  {
    illustration: "paiements",
    title: "Paiements intégrés",
    description:
      "Suivez les acomptes, les soldes et toutes les transactions de l'atelier.",
    tone: "dark",
  },
];
