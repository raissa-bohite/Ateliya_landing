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
    image: "https://images.unsplash.com/photo-1558769132-cb1aea3c1c2d?w=800",
    tags: ["digital", "technologie", "modernisation", "outils"],
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
    image: "https://images.unsplash.com/photo-1558769132-cb1aea3c1c2d?w=800",
    tags: ["marketing", "réseaux-sociaux", "clients", "communication"],
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
