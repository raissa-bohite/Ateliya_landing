export const stats = [
  {
    value: "500+",
    label: "Ateliers Actifs",
    icon: "users",
    color: "text-ateliya-primary",
    hoverColor: "group-hover/stat:text-[#D4AF37]",
    delay: "100ms",
  },
  {
    value: "15K+",
    label: "Commandes/Mois",
    icon: "trendingUp",
    color: "text-ateliya-secondary",
    hoverColor: "group-hover/stat:text-[#E07A5F]",
    delay: "200ms",
  },
  {
    value: "98%",
    label: "Satisfaction",
    icon: "heart",
    color: "text-ateliya-accent",
    hoverColor: "group-hover/stat:text-ateliya-dark",
    delay: "300ms",
  },
];

// Points clés
export const highlights = [
  { icon: "zap", text: "Installation en 5 minutes" },
  { icon: "shield", text: "Sécurisé et fiable" },
  { icon: "globe", text: "Support 24/7 en français" },
];

export const steps = [
  {
    number: "01",
    title: "Enregistrez le Client",
    description:
      "Créez une fiche client complète avec préférences et historique de commandes.",
    icon: "user",
  },
  {
    number: "02",
    title: "Créez la Commande",
    description:
      "Détaillez les articles, les tissus, les délais et le budget de production.",
    icon: "document",
  },
  {
    number: "03",
    title: "Prenez les Mesures",
    description:
      "Enregistrez avec précision toutes les mesures de vos clients.",
    icon: "measure",
  },
  {
    number: "04",
    title: "Suivez le Paiement",
    description:
      "Gérez les acomptes, les soldes et l'historique des transactions.",
    icon: "creditCard",
  },
];

export const features = [
  {
    icon: "user",
    title: "Gestion des Clients",
    description:
      "Gérez vos clients, leurs coordonnées, leurs préférences et leur historique complet.",
  },
  {
    icon: "document",
    title: "Gestion de Commandes",
    description:
      "Créez, suivez et gérez vos commandes en temps réel avec notifications.",
  },
  {
    icon: "measure",
    title: "Prise de Mesures",
    description:
      "Enregistrez et retrouvez rapidement toutes les mesures de vos clients.",
  },
  {
    icon: "creditCard",
    title: "Paiements Sécurisés",
    description:
      "Acceptez les paiements via Orange Money, MTN, Moov, Wave en toute sécurité.",
  },
];

export const solutions = [
  {
    icon: "cash",
    title: "Gestion Financière",
    description:
      "Suivi complet des finances, facturation automatique et rapports détaillés.",
  },
  {
    icon: "eye",
    title: "Visibilité Totale",
    description: "Voyez l'état de toutes vos commandes en un coup d'œil.",
  },
  {
    icon: "globe",
    title: "Multi-Devise",
    description:
      "Gérez les transactions dans plusieurs devises automatiquement.",
  },
  {
    icon: "shield",
    title: "Sécurité Robuste",
    description:
      "Chiffrement de bout en bout et conformité aux normes de sécurité.",
  },
];

export const testimonials = [
  {
    text: "Ateliya a complètement transformé la gestion de mon atelier. Je gagne un temps fou sur les commandes et la facturation. C'est l'outil indispensable!",
    author: "Fatou Diop",
    role: "Couturière & Propriétaire",
    rating: 5,
  },
  {
    text: "Depuis que j'utilise Ateliya, je ne gère plus mes clients à la main. Tout est automatisé et organisé. Recommandé!",
    author: "Mariam Sall",
    role: "Directrice d'Atelier",
    rating: 5,
  },
  {
    text: "Le suivi de mes commandes n'a jamais été aussi facile. Ateliya a vraiment augmenté ma productivité.",
    author: "Aïssatou Ba",
    role: "Couturière Indépendante",
    rating: 5,
  },
];

export const blogPosts = [
  {
    title: "5 Astuces pour la Prise de Mesures Parfaite",
    description:
      "Évitez les erreurs courantes et assurez un ajustement impeccable à chaque fois.",
    category: "Conseils",
    date: "15 Nov 2025",
    icon: "measure",
    image: "/blog1.jpg",
  },
  {
    title: "Gérer ses Stocks de Tissus comme un Pro",
    description:
      "Optimisez votre inventaire et ne soyez plus jamais à court de matière première.",
    category: "Gestion",
    date: "01 Nov 2025",
    icon: "package",
    image: "/blog2.jpg",
  },
  {
    title: "L'Impact du Digital sur l'Art de la Couture",
    description:
      "Comment les outils numériques transforment les ateliers traditionnels.",
    category: "Actualités",
    date: "20 Oct 2025",
    icon: "zap",
    image: "/blog3.jpg",
  },
];

export const galleryItems = [
  {
    icon: "",
    label: "",
    description: "Gestion des paiements",
    image: "landing_lebedoo.webp",
  },
  {
    icon: "",
    label: "",
    description: "Suivi des commandes",
    image: "landing_lebedoo.webp",
  },
  {
    icon: "",
    label: "",
    description: "Gestion des clients",
    image: "landing_lebedoo.webp",
  },
  {
    icon: "",
    label: "",
    description: "Analyse financière",
    image: "landing_lebedoo.webp",
  },
  {
    icon: "",
    label: "",
    description: "Analyse financière",
    image: "landing_lebedoo.webp",
  },
  {
    icon: "",
    label: "",
    description: "Analyse financière",
    image: "landing_lebedoo.webp",
  },
];

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Solution {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  rating: number;
  location?: string;
}

export interface BlogPost {
  title: string;
  description: string;
  category: string;
  date: string;
  icon: string;
  image?: string;
}

export interface GalleryItem {
  icon: string;
  label: string;
  description: string;
  image?: string;
}
