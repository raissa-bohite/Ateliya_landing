// Hero features showcase
export const heroFeatures = [
  {
    icon: "smartphone",
    text: "App Mobile Native",
    gradient: "from-ateliya-primary to-ateliya-secondary",
  },
  {
    icon: "zap",
    text: "Temps Réel",
    gradient: "from-ateliya-secondary to-ateliya-accent",
  },
  {
    icon: "shield",
    text: "100% Sécurisé",
    gradient: "from-ateliya-dark to-ateliya-primary",
  },
  {
    icon: "globe",
    text: "Mode Hors Ligne",
    gradient: "from-ateliya-accent to-ateliya-secondary",
  },
];

// Workflow steps
export const workflow = [
  {
    step: "1",
    title: "Client arrive",
    description: "Le client entre dans votre atelier avec une idée en tête",
    icon: "user",
    gradient: "from-ateliya-primary to-ateliya-secondary",
  },
  {
    step: "2",
    title: "Mesures & commande",
    description: "Prenez les mesures, ajoutez photos, créez la commande ",
    icon: "edit",
    gradient: "from-ateliya-secondary to-ateliya-accent",
  },
  {
    step: "3",
    title: "Production",
    description: "Suivez l'avancement, recevez des rappels automatiques",
    icon: "package",
    gradient: "from-ateliya-accent to-ateliya-primary",
  },
  {
    step: "4",
    title: "Notification client",
    description: "SMS automatique quand c'est prêt, pas besoin d'appeler",
    icon: "messageCircle",
    gradient: "from-[#B99752] to-[#B8941F]",
  },
  {
    step: "5",
    title: "Livraison & paiement",
    description: "Encaissez, imprimez reçu, client satisfait revient !",
    icon: "check",
    gradient: "from-ateliya-dark to-ateliya-primary",
  },
];

// Interactive demos
export const interactiveDemos = [
  {
    title: "Créer une commande",
    subtitle: "En moins de 2 minutes",
    features: ["Photos du modèle", " Mesures du client", "Date de livraison"],
    icon: "plus",
    gradient: "from-ateliya-primary to-ateliya-secondary",
  },
  {
    title: "Notifications SMS",
    subtitle: "Automatiques à chaque étape",
    features: ["Confirmation commande", "Rappel mesures", " Commande prête"],
    icon: "messageSquare",
    gradient: "from-ateliya-secondary to-ateliya-accent",
  },
  {
    title: "Dashboard en temps réel",
    subtitle: "Vue d'ensemble instantanée",
    features: ["CA du jour", "Commandes en cours", "Paiements en attente"],
    icon: "barChart",
    gradient: "from-ateliya-dark to-ateliya-primary",
  },
];

export const features = [
  // Gestion Clients
  {
    icon: "users",
    title: "Gestion des Clients",
    description: "Créez des fiches clients complètes avec coordonnées, photos et historique d'achats.",
    category: "clients"
  },
  {
    icon: "ruler",
    title: "Prise de Mesures",
    description: "Enregistrez toutes les mesures (tour de poitrine, hanches, longueur) pour chaque client.",
    category: "clients"
  },
  {
    icon: "image",
    title: "Photos de Modèles",
    description: "Ajoutez des photos des modèles souhaités directement dans la fiche client.",
    category: "clients"
  },
  {
    icon: "clock",
    title: "Historique Complet",
    description: "Consultez l'historique de toutes les commandes et paiements d'un client.",
    category: "clients"
  },

  // Gestion Commandes
  {
    icon: "package",
    title: "Suivi de Commandes",
    description: "Créez et suivez vos commandes avec statuts personnalisables (En cours, Prêt, Livré).",
    category: "commandes"
  },
  {
    icon: "calendar",
    title: "Dates de Livraison",
    description: "Définissez des dates de livraison et recevez des rappels automatiques.",
    category: "commandes"
  },
  {
    icon: "bell",
    title: "Rappels Automatiques",
    description: "Notifications push pour ne jamais oublier une date de livraison.",
    category: "commandes"
  },
  {
    icon: "message-circle",
    title: "Notifications Clients",
    description: "Envoyez des SMS automatiques à vos clients quand leur commande est prête.",
    category: "commandes"
  },
  {
    icon: "file-text",
    title: "Notes de Commande",
    description: "Ajoutez des notes détaillées, instructions spéciales et préférences.",
    category: "commandes"
  },

  // Gestion Financière
  {
    icon: "dollar-sign",
    title: "Suivi des Paiements",
    description: "Suivez qui a payé, qui doit encore, et gérez les paiements partiels.",
    category: "finance"
  },
  {
    icon: "credit-card",
    title: "Acomptes et Soldes",
    description: "Gérez facilement les acomptes et calculez automatiquement les soldes restants.",
    category: "finance"
  },
  {
    icon: "receipt",
    title: "Reçus Automatiques",
    description: "Générez et imprimez des reçus professionnels pour chaque paiement.",
    category: "finance"
  },
  {
    icon: "trending-up",
    title: "Rapports Financiers",
    description: "Consultez vos revenus, dépenses et bénéfices en temps réel.",
    category: "finance"
  },
  {
    icon: "pie-chart",
    title: "Statistiques Détaillées",
    description: "Graphiques et tableaux pour analyser vos performances.",
    category: "finance"
  },
  /*  {
     icon: "download",
     title: "Export PDF",
     description: "Exportez vos rapports en PDF pour votre comptable.",
     category: "finance"
   }, */

  // Productivité
  {
    icon: "search",
    title: "Recherche Rapide",
    description: "Trouvez n'importe quel client ou commande en quelques secondes.",
    category: "productivite"
  },
  /*  {
     icon: "filter",
     title: "Filtres Avancés",
     description: "Filtrez vos commandes par statut, date, client ou montant.",
     category: "productivite"
   }, */
  {
    icon: "smartphone",
    title: "Mode Hors Ligne",
    description: "Continuez à travailler même sans connexion internet.",
    category: "productivite"
  },
  {
    icon: "cloud",
    title: "Sauvegarde Cloud",
    description: "Vos données sont automatiquement sauvegardées et sécurisées.",
    category: "productivite"
  },
  {
    icon: "share-2",
    title: "Partage Facile",
    description: "Partagez des reçus et factures par WhatsApp, SMS ou email.",
    category: "productivite"
  },
  {
    icon: "printer",
    title: "Impression",
    description: "Imprimez vos reçus, factures et rapports directement depuis l'app.",
    category: "productivite"
  },
];

// Configuration des icônes colorées pour chaque feature
export const featureColors = [
  {
    color: "text-ateliya-primary",
    bgColor: "from-ateliya-primary/20 to-ateliya-primary/10",
    borderColor: "border-ateliya-primary/20",
  },
  {
    color: "text-ateliya-secondary",
    bgColor: "from-ateliya-secondary/20 to-ateliya-secondary/10",
    borderColor: "border-ateliya-secondary/20",
  },
  {
    color: "text-ateliya-accent",
    bgColor: "from-ateliya-accent/20 to-ateliya-accent/10",
    borderColor: "border-ateliya-accent/20",
  },
  {
    color: "text-[#B99752]",
    bgColor: "from-[#B99752]/20 to-[#B99752]/10",
    borderColor: "border-[#B99752]/20",
  },
  {
    color: "text-ateliya-primary",
    bgColor: "from-ateliya-primary/20 to-ateliya-primary/10",
    borderColor: "border-ateliya-primary/20",
  },
  {
    color: "text-ateliya-secondary",
    bgColor: "from-ateliya-secondary/20 to-ateliya-secondary/10",
    borderColor: "border-ateliya-secondary/20",
  },
];

// Avantages supplémentaires
export const benefits = [
  {
    icon: "zap",
    text: "Installation instantanée",
    color: "text-ateliya-primary",
  },
  {
    icon: "shield",
    text: "Données sécurisées",
    color: "text-ateliya-secondary",
  },
  { icon: "clock", text: "Support réactif", color: "text-ateliya-accent" },
];

// Statistiques
export const stats = [
  { value: "99.9%", label: "Disponibilité", icon: "activity" },
  { value: "24/7", label: "Support", icon: "headphones" },
  { value: "50+", label: "Fonctionnalités", icon: "package" },
];
