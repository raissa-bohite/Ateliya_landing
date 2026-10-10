export type ShowcaseTheme = "green" | "gold" | "dark";

export interface ShowcaseStep {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Clé du mockup (voir imports dans Showcase.astro). */
  screen: "clients" | "commandes" | "activite";
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
    screen: "clients",
    alt: "Fiche client et historique des transactions dans Ateliya",
    theme: "green",
  },
  {
    number: "02",
    eyebrow: "Vos commandes",
    title: "Chaque création, bien suivie.",
    description:
      "Modèle, échéances, avancement et acomptes : gardez chaque commande sous contrôle, du premier essayage à la livraison.",
    screen: "commandes",
    alt: "Catalogue boutique et suivi des stocks dans Ateliya",
    theme: "gold",
  },
  {
    number: "03",
    eyebrow: "Votre activité",
    title: "Votre atelier, en un coup d'œil.",
    description:
      "Transactions, paiements et statistiques réunis. Vous suivez la santé de votre atelier en temps réel, où que vous soyez.",
    screen: "activite",
    alt: "Statistiques de caisse et de stock de l'atelier dans Ateliya",
    theme: "dark",
  },
];
