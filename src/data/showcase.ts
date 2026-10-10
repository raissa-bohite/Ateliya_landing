export type ShowcaseTheme = "green" | "gold" | "dark";

export interface ShowcaseStep {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Clé de capture (voir imports dans Showcase.astro). */
  screen: "accueil" | "gestion" | "rapport";
  alt: string;
  theme: ShowcaseTheme;
}

export const SHOWCASE_STEPS: ShowcaseStep[] = [
  {
    number: "01",
    eyebrow: "Vos clients",
    title: "Chaque client, bien accompagné.",
    description:
      "Coordonnées, préférences et mesures réunies dans une fiche complète. Vous retrouvez tout l'historique d'un client en un instant.",
    screen: "gestion",
    alt: "Fiches clients et gestion de l'atelier dans Ateliya",
    theme: "green",
  },
  {
    number: "02",
    eyebrow: "Vos commandes",
    title: "Chaque création, bien suivie.",
    description:
      "Modèle, échéances, avancement et acomptes : gardez chaque commande sous contrôle, du premier essayage à la livraison.",
    screen: "accueil",
    alt: "Tableau de bord et suivi des commandes dans Ateliya",
    theme: "gold",
  },
  {
    number: "03",
    eyebrow: "Votre activité",
    title: "Votre atelier, en un coup d'œil.",
    description:
      "Transactions, paiements et statistiques réunis. Vous suivez la santé de votre atelier en temps réel, où que vous soyez.",
    screen: "rapport",
    alt: "Rapports et statistiques de l'atelier dans Ateliya",
    theme: "dark",
  },
];
