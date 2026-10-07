export const contactMethods = [
  {
    icon: "mail",
    title: "Email",
    description: "Notre équipe vous répond sous 24h",
    value: "support@ateliya.com",
    href: "mailto:support@ateliya.com",
    color: "from-ateliya-primary/20 to-ateliya-primary/10",
    iconColor: "text-ateliya-primary",
  },
  {
    icon: "phone",
    title: "Téléphone",
    description: "Lun - Ven, 9h - 18h GMT",
    value: "+225 27 XX XX XX XX",
    href: "tel:+22527XXXXXXXX",
    color: "from-ateliya-secondary/20 to-ateliya-secondary/10",
    iconColor: "text-ateliya-secondary",
  },
  {
    icon: "mapPin",
    title: "Adresse",
    description: "Visitez notre bureau",
    value: "Abidjan, Côte d'Ivoire",
    href: "#",
    color: "from-ateliya-accent/20 to-ateliya-accent/10",
    iconColor: "text-ateliya-accent",
  },
];

// FAQ rapide
export const faqs = [
  {
    question: "Comment puis-je commencer avec Ateliya ?",
    answer:
      "Téléchargez l'application depuis l'App Store ou Google Play, créez votre compte et profitez de 14 jours d'essai gratuit.",
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous acceptons Orange Money, MTN Mobile Money, Moov Money, Wave et d'autres moyens via Hub2.",
  },
  {
    question: "Puis-je annuler mon abonnement à tout moment ?",
    answer:
      "Oui, vous pouvez annuler votre abonnement à tout moment depuis les paramètres de l'application.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Absolument. Nous utilisons un chiffrement SSL/TLS et suivons les meilleures pratiques de sécurité pour protéger vos données.",
  },
];

// Réseaux sociaux
export const socialLinks = [
  {
    icon: "facebook",
    href: "#",
    label: "Facebook",
    color: "hover:bg-blue-500",
  },
  { icon: "twitter", href: "#", label: "Twitter", color: "hover:bg-sky-500" },
  {
    icon: "instagram",
    href: "#",
    label: "Instagram",
    color: "hover:bg-pink-500",
  },
  {
    icon: "linkedin",
    href: "#",
    label: "LinkedIn",
    color: "hover:bg-blue-600",
  },
];

// FAQ avec catégories
export const faqCategories = [
  {
    name: "Général",
    faqs: [
      {
        question: "Comment commencer avec Ateliya ?",
        answer:
          "Téléchargez l'application, créez votre compte et profitez de 14 jours d'essai gratuit. Notre équipe d'onboarding vous accompagne.",
      },
      {
        question: "Ateliya fonctionne-t-il hors ligne ?",
        answer:
          "Oui ! Vous pouvez gérer vos commandes hors ligne. Les données se synchronisent automatiquement dès la reconnexion.",
      },
    ],
  },
  {
    name: "Facturation",
    faqs: [
      {
        question: "Quels modes de paiement acceptez-vous ?",
        answer:
          "Orange Money, MTN Money, Moov Money, Wave et carte bancaire via notre plateforme sécurisée Hub2.",
      },
      {
        question: "Puis-je annuler mon abonnement ?",
        answer:
          "Oui, à tout moment depuis les paramètres. Aucuns frais cachés, aucun engagement de durée.",
      },
    ],
  },
];

// Quick stats
export const stats = [
  { value: "5000+", label: "Artisans actifs" },
  { value: "24h", label: "Temps de réponse" },
  { value: "99%", label: "Satisfaction" },
];
