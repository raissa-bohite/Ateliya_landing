// Layout bento box - colonnes dynamiques
export const bentoLayout = [
  { span: "md:col-span-6 lg:col-span-8", height: "h-[500px]" }, // Large
  { span: "md:col-span-3 lg:col-span-4", height: "h-[500px]" }, // Medium
  { span: "md:col-span-3 lg:col-span-4", height: "h-[420px]" }, // Medium
  { span: "md:col-span-3 lg:col-span-4", height: "h-[420px]" }, // Medium
  { span: "md:col-span-6 lg:col-span-4", height: "h-[420px]" }, // Medium
  { span: "md:col-span-6 lg:col-span-6", height: "h-[380px]" }, // Small
  { span: "md:col-span-6 lg:col-span-6", height: "h-[380px]" }, // Small
];

// src/data/blog.ts

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export interface Category {
  name: string;
  count: number;
  icon: string;
}

export const categories: Category[] = [
  { name: "Tous", count: 50, icon: "grid" },
  { name: "Productivité", count: 12, icon: "lightning" },
  { name: "Gestion", count: 15, icon: "settings" },
  { name: "Technologie", count: 8, icon: "cpu" },
  { name: "Stock", count: 7, icon: "package" },
  { name: "Business", count: 8, icon: "trending" },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Astuces pour Optimiser la Gestion de votre Atelier",
    excerpt:
      "Découvrez comment améliorer votre productivité quotidienne et gagner jusqu'à 10 heures par semaine grâce à ces conseils pratiques d'experts.",
    category: "Productivité",
    date: "15 Nov 2024",
    readTime: "8 min",
    author: "Amara Diallo",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800",
    tags: ["productivité", "organisation", "gestion", "atelier"],
    featured: true,
    content: `
      <p class="lead">Un atelier bien organise ne depend pas seulement du talent du couturier. Il repose aussi sur des habitudes simples, des informations faciles a retrouver et une bonne visibilite sur les commandes en cours.</p>
      <h2>Centraliser les informations client</h2>
      <p>Chaque client doit avoir une fiche claire avec son nom, son telephone, ses mesures, ses preferences et son historique de commandes. Cela evite de chercher dans plusieurs carnets ou conversations au moment de produire une tenue.</p>
      <h2>Decouper chaque commande en etapes</h2>
      <p>Une commande doit passer par des etapes visibles : prise de mesures, choix du modele, coupe, couture, essayage, finition, livraison et paiement. Cette structure aide toute l'equipe a savoir ce qui est urgent.</p>
      <ul>
        <li>Notez la date de livraison des la creation de la commande.</li>
        <li>Ajoutez les photos du modele ou du tissu.</li>
        <li>Indiquez clairement le montant paye et le reste a payer.</li>
        <li>Changez le statut de la commande a chaque avancement.</li>
      </ul>
      <blockquote class="highlight">Un atelier productif sait exactement quoi faire, dans quel ordre, et pourquoi.</blockquote>
    `,
  },
  {
    id: 2,
    title: "Comment Calculer le Prix de vos Créations",
    excerpt:
      "Guide complet pour fixer des prix justes et rentables. Apprenez à valoriser votre travail sans perdre de clients.",
    category: "Business",
    date: "12 Nov 2024",
    readTime: "6 min",
    author: "Kofi Mensah",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800",
    tags: ["tarification", "business", "finance", "rentabilité"],
    content: `
      <p class="lead">Fixer un prix juste est l'une des decisions les plus importantes pour un atelier. Un prix trop bas fatigue l'equipe et reduit la marge. Un prix mal explique peut faire hesiter le client.</p>
      <h2>Commencer par le cout reel</h2>
      <p>Listez tous les couts lies a la creation : tissu, doublure, boutons, fermeture, fil, electricite, transport, temps de coupe, temps de couture et retouches possibles.</p>
      <h2>Ajouter la valeur du savoir-faire</h2>
      <p>Votre prix doit remunerer votre experience, votre precision, votre conseil et votre capacite a livrer un vetement bien fini.</p>
      <ul>
        <li>Calculez le cout des fournitures.</li>
        <li>Estimez le nombre d'heures de travail.</li>
        <li>Ajoutez une marge pour les retouches et les imprevus.</li>
      </ul>
      <blockquote>La bonne tarification protege l'atelier et rassure le client.</blockquote>
    `,
  },
  {
    id: 3,
    title: "Gestion de Stock: Le Guide Complet",
    excerpt:
      "Maîtrisez votre inventaire de tissus et fournitures. Évitez les ruptures de stock et optimisez vos achats.",
    category: "Stock",
    date: "10 Nov 2024",
    readTime: "10 min",
    author: "Fatou Traoré",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800",
    tags: ["stock", "inventaire", "gestion", "organisation"],
    content: `
      <p class="lead">Une bonne gestion de stock evite les achats en urgence, les pertes de tissu et les retards de livraison. Elle permet aussi de mieux negocier avec les fournisseurs.</p>
      <h2>Classer les matieres par usage</h2>
      <p>Regroupez les tissus, boutons, fils, doublures et accessoires par categorie. L'objectif est simple : savoir rapidement ce qui est disponible.</p>
      <h2>Suivre les sorties</h2>
      <p>Chaque fois qu'un tissu est utilise pour une commande, notez la quantite consommee. Cela permet de comprendre quels articles tournent le plus vite.</p>
      <ul>
        <li>Faites un inventaire rapide chaque fin de semaine.</li>
        <li>Identifiez les matieres les plus demandees.</li>
        <li>Gardez un seuil minimum pour les fournitures essentielles.</li>
      </ul>
    `,
  },
  {
    id: 4,
    title: "Digitaliser votre Atelier en 5 Étapes",
    excerpt:
      "Passez au numérique sans stress. Découvrez les outils essentiels pour moderniser votre atelier de couture.",
    category: "Technologie",
    date: "8 Nov 2024",
    readTime: "7 min",
    author: "Amara Diallo",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800",
    tags: ["digital", "technologie", "modernisation", "outils"],
    content: `
      <p class="lead">Digitaliser un atelier ne veut pas dire tout changer en une semaine. Le bon chemin consiste a moderniser progressivement les taches qui prennent le plus de temps.</p>
      <h2>Remplacer les carnets disperses</h2>
      <p>Commencez par mettre les clients, les mesures et les commandes dans un seul outil. Tant que les informations sont eparpillees, les erreurs restent frequentes.</p>
      <h2>Suivre les commandes en temps reel</h2>
      <p>Une commande doit etre visible a tout moment. Le responsable de l'atelier doit savoir ce qui est en attente, en production, pret a livrer ou deja paye.</p>
      <h2>Automatiser les rappels</h2>
      <p>Les rappels clients et les notifications internes permettent de confirmer un rendez-vous, signaler qu'une tenue est prete ou suivre un paiement sans tout faire manuellement.</p>
      <blockquote class="highlight">La digitalisation est reussie quand l'equipe gagne du temps sans perdre ses habitudes essentielles.</blockquote>
    `,
  },
  {
    id: 5,
    title: "5 Erreurs Courantes en Gestion d'Atelier",
    excerpt:
      "Évitez les pièges les plus fréquents qui coûtent temps et argent aux couturiers. Solutions pratiques incluses.",
    category: "Gestion",
    date: "5 Nov 2024",
    readTime: "5 min",
    author: "Kofi Mensah",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800",
    tags: ["erreurs", "gestion", "conseils", "solutions"],
    content: `
      <p class="lead">Beaucoup d'ateliers perdent de l'argent non pas par manque de clients, mais a cause de petites erreurs repetees chaque semaine.</p>
      <h2>Accepter une commande sans date claire</h2>
      <p>Une commande sans date de livraison precise devient vite une source de tension. Notez toujours la date promise, le niveau d'urgence et les conditions de livraison.</p>
      <h2>Ne pas enregistrer les acomptes</h2>
      <p>Les paiements approximatifs creent des malentendus. Chaque acompte doit etre note avec la date, le montant et le reste a payer.</p>
      <h2>Garder les mesures uniquement sur papier</h2>
      <p>Un carnet peut se perdre ou rester avec une seule personne. Les mesures doivent etre disponibles rapidement, surtout quand plusieurs personnes travaillent dans l'atelier.</p>
      <div class="info-box"><strong>Le bon reflexe :</strong> chaque fin de semaine, verifiez les commandes en retard, les paiements ouverts et les livraisons prevues.</div>
    `,
  },
  {
    id: 6,
    title: "Marketing pour Couturiers: Les Bases",
    excerpt:
      "Attirez plus de clients grâce aux réseaux sociaux et au bouche-à-oreille. Stratégies simples et efficaces.",
    category: "Business",
    date: "3 Nov 2024",
    readTime: "9 min",
    author: "Fatou Traoré",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800",
    tags: ["marketing", "réseaux-sociaux", "clients", "communication"],
    content: `
      <p class="lead">Le marketing d'un atelier commence par la confiance. Les clients veulent voir votre travail, comprendre votre methode et sentir que leurs commandes seront suivies avec serieux.</p>
      <h2>Montrer les coulisses</h2>
      <p>Publiez des photos de tissus, de details de finition, d'essayages et de commandes livrees. Les coulisses rendent votre savoir-faire visible.</p>
      <h2>Utiliser les temoignages clients</h2>
      <p>Un avis client vaut souvent plus qu'une longue publicite. Demandez un court retour apres une livraison reussie et partagez-le avec une photo du modele si le client accepte.</p>
      <h2>Creer des offres simples</h2>
      <p>Les offres doivent etre faciles a comprendre : tenue de ceremonie, retouche rapide, uniforme d'equipe, pack famille ou collection saisonniere.</p>
      <ul>
        <li>Publiez regulierement vos meilleures realisations.</li>
        <li>Repondez vite aux messages importants.</li>
        <li>Gardez une fiche pour chaque prospect interesse.</li>
      </ul>
      <blockquote>Un bon marketing montre que l'atelier est fiable du debut a la livraison.</blockquote>
    `,
  },
];

// Fonction pour obtenir les articles par catégorie
export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "Tous") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
}

// Fonction pour obtenir un article par ID
export function getPostById(id: number): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

// Fonction pour obtenir les articles similaires
export function getRelatedPosts(
  currentId: number,
  limit: number = 3
): BlogPost[] {
  const currentPost = getPostById(currentId);
  if (!currentPost) return [];

  return blogPosts
    .filter(
      (post) =>
        post.id !== currentId &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
}

// Fonction pour rechercher des articles
export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}
