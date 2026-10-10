export type FeatureTone = "green" | "gold" | "light" | "dark";

export interface Feature {
  icon: "users" | "shirt" | "ruler" | "receipt";
  title: string;
  description: string;
  tone: FeatureTone;
}

export const FEATURES: Feature[] = [
  {
    icon: "users",
    title: "Gestion des clients",
    description:
      "Coordonnées, préférences et historique réunis dans une fiche claire, accessible en un instant.",
    tone: "green",
  },
  {
    icon: "shirt",
    title: "Suivi des commandes",
    description:
      "Visualisez d'un coup d'œil les commandes à traiter et celles déjà terminées.",
    tone: "gold",
  },
  {
    icon: "ruler",
    title: "Prise de mesures",
    description:
      "Conservez les mesures de chaque client pour les retrouver sans jamais les redemander.",
    tone: "light",
  },
  {
    icon: "receipt",
    title: "Paiements intégrés",
    description:
      "Suivez les acomptes, les soldes et toutes les transactions de l'atelier.",
    tone: "dark",
  },
];
