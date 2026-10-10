export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Ateliya a complètement transformé la gestion de mon atelier. Je gagne un temps fou sur les commandes et la facturation. C'est l'outil indispensable !",
    author: "Fatou Diop",
    role: "Couturière & propriétaire d'atelier",
  },
  {
    quote:
      "Depuis que j'utilise Ateliya, je ne gère plus mes clients à la main. Tout est automatisé et organisé. Recommandé !",
    author: "Mariam Sall",
    role: "Directrice d'atelier",
  },
  {
    quote:
      "Le suivi de mes commandes n'a jamais été aussi facile. Ateliya a vraiment augmenté ma productivité.",
    author: "Aïssatou Ba",
    role: "Couturière indépendante",
  },
];
