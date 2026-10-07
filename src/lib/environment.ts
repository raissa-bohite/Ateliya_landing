// Endpoints de l'API Ateliya.
// Surclassables via des variables d'environnement NEXT_PUBLIC_* ; sinon on
// retombe sur les URLs de production (ce sont des URLs publiques, pas des secrets).
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://backendprod.ateliya.com/api";

export const BASE_URL_INSCRIPTION =
  process.env.NEXT_PUBLIC_API_INSCRIPTION_URL ??
  "https://backend.ateliya.com/api";
