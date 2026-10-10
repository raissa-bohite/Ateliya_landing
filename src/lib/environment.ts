// Endpoints de l'API Ateliya.
// Surclassables via des variables d'environnement PUBLIC_* (préfixe requis
// par Astro/Vite pour exposer une variable au client) ; sinon on retombe
// sur les URLs de production (ce sont des URLs publiques, pas des secrets).
export const BASE_URL =
  import.meta.env.PUBLIC_API_URL ?? "https://backendprod.ateliya.com/api";

export const BASE_URL_INSCRIPTION =
  import.meta.env.PUBLIC_API_INSCRIPTION_URL ??
  "https://backend.ateliya.com/api";
