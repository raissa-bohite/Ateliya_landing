export interface FaqItem {
  question: string;
  answer: string;
}

// Contenu à relire/valider avant mise en ligne (sécurité, tarifs, essai).
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Comment fonctionne Ateliya ?",
    answer:
      "Ateliya réunit vos clients, leurs mesures, vos commandes et vos paiements dans une seule application mobile. Vous créez votre atelier en quelques minutes et commencez à enregistrer clients et commandes immédiatement.",
  },
  {
    question: "Puis-je essayer gratuitement ?",
    answer:
      "Oui, vous pouvez créer votre compte et tester Ateliya sans carte bancaire. Vous ne passez à une formule payante que lorsque vous êtes prête.",
  },
  {
    question: "Quels moyens de paiement sont acceptés ?",
    answer:
      "Les paiements se font via Mobile Money : Orange Money, MTN Mobile Money, Moov et Wave. Aucune carte bancaire n'est nécessaire.",
  },
  {
    question: "Ateliya fonctionne-t-il sur Android et iPhone ?",
    answer:
      "Oui, l'application est disponible gratuitement sur le Play Store (Android) et l'App Store (iPhone).",
  },
  {
    question: "Mes données sont-elles en sécurité ?",
    answer:
      "Vos données d'atelier (clients, mesures, paiements) sont stockées de façon sécurisée et restent privées : vous seule accédez à votre atelier.",
  },
  {
    question: "Combien coûte l'abonnement ?",
    answer:
      "Les tarifs sont détaillés sur la page Tarifs. Vous choisissez la formule adaptée à la taille de votre atelier.",
  },
];
