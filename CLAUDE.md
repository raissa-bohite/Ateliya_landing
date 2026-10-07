# Ateliya — Landing page

Ateliya est une application de gestion pour couturiers/ateliers de couture. Ce dépôt contient la landing page (site vitrine), pas l'application elle-même (app web sur malliya.ateliya.com).

## Cadrage initial (06-10-2026)

- **Besoin** : refonte pure du design. Le périmètre fonctionnel ne change pas (mêmes pages, mêmes parcours) — seul le design et la stack technique changent. Motivation : le design de l'ancien site (Astro) ne convient plus.
- **MVP / scope** : migration complète de l'ancien site Astro vers Next.js, page par page :
  1. Accueil (avec hero vidéo scroll-locked) — en premier, pour valider direction design/couleurs
  2. Puis : blog, pricing, inscription (`connexion.astro` → en réalité un formulaire d'inscription), contact, conditions, politique
- **Méthodologie** : itération page par page avec validation à chaque étape avant de passer à la suivante. Backlog = liste des pages restantes ci-dessus.
- **Stack (et pourquoi)** :
  - Next.js (App Router) + TypeScript + Tailwind CSS — demandé explicitement, remplace Astro.
  - Export statique (`output: 'export'`) — le site est 100% vitrine, aucune donnée ne change par requête (même le blog est du contenu statique), donc pas besoin de serveur Node. Ça maximise aussi perf/SEO.
  - Pattern shadcn/ui (`components/ui/`) pour les composants, lucide-react pour les icônes.
- **Sécurité** : le formulaire d'inscription (`src/pages/connexion.astro` dans l'ancien site) crée un vrai compte via l'API Ateliya (`BASE_URL_INSCRIPTION`), et `pricing`/`abonnementService.ts` initie un vrai paiement (Wave/Orange Money/MTN/Moov, flux redirect — pas de saisie carte sur le site). Données sensibles : email, téléphone, mot de passe.
  - Reprendre exactement les mêmes endpoints, passés en variables d'env `NEXT_PUBLIC_*` (pas de secret côté client, les URLs sont déjà publiques).
  - Garder les bonnes pratiques déjà en place dans l'ancien code : `textContent` jamais `innerHTML`, validation stricte des champs, whitelist sur les éléments ciblés par JS.
  - Charger le skill `owasp-security` au moment de reconstruire le formulaire d'inscription et le flux de paiement.
- **Tests** : pas de suite automatisée (Jest/Playwright) pour l'instant — vitrine solo sans logique métier complexe. À chaque page livrée : test manuel systématique si la page touche inscription/paiement, + audit Lighthouse (SEO/perf/accessibilité) sur la page.
- **Déploiement** : hébergement o2switch (mutualisé, pas de Node) → export statique Next.js, upload du dossier `out/` via FTP/cPanel. Pas de CI/CD pour l'instant.
- **Monitoring** : aucun pour l'instant (décision consciente). Pistes pour plus tard si besoin : Google Search Console (indexation/SEO) + UptimeRobot (uptime).
- **Maintenance** : non quantifiée précisément — essentiellement des mises à jour de contenu une fois le site en ligne (textes, images, articles de blog), pas de maintenance de code lourde attendue.
- **Done (MVP)** : toutes les pages migrées + Lighthouse ≥95 sur toutes les pages + formulaires (inscription, paiement) testés en conditions réelles avant bascule définitive sur le nouveau site.

## Design system

Couleurs définies par la cliente (06-10-2026), à utiliser comme tokens Tailwind :

```text
Vert principal   #0c5e3f
Vert foncé       #071f14
Vert clair       #e8f5ee
Or               #e8960a
Or clair         #f5a820
Ivoire           #f8f7f4

Fond général     #f8f7f4
Cartes/popovers  #fffefa
Texte principal  #071f14
Texte secondaire #496458
Bordure          #d7e1db
Rouge danger     #b42318
Gris doux        #6f8f80

Vert legacy 2    #0f7a52
Vert legacy 3    #094a32
Fond doré léger  #fff8e8
Ivoire foncé     #f0ede8
```

Hero d'accueil inspiré d'un composant vidéo scroll-locked (scroll scrub une vidéo plein écran, body pinné le temps de la vidéo), adapté au contexte Ateliya (pas de contenu "THE CITY OPENS" — à remplacer par un message produit).

## Endpoints API existants (à conserver)

```text
BASE_URL              = https://backendprod.ateliya.com/api
BASE_URL_INSCRIPTION  = https://backend.ateliya.com/api
```

## Pages à migrer (état ancien site Astro, pour référence)

- `index.astro` — accueil : Hero, Steps, FeaturesDetails, GalleryCarousel, TestimonialsStats, Download, Blog, FinalCta, Footer
- `blog/blog.astro`, `blog/[id].astro`, `blog/category/[category].astro`
- `pricing.astro` — abonnement + paiement (PricingSection.tsx, AbonnementModal.tsx)
- `connexion.astro` — en réalité une page d'inscription (création compte entreprise + admin)
- `contact.astro`
- `conditions.astro`, `politique.astro`
- `featuresDetails.astro`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
