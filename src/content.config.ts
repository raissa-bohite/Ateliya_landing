import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.enum([
      "Productivité",
      "Gestion",
      "Technologie",
      "Stock",
      "Business",
    ]),
    pubDate: z.coerce.date(),
    readTime: z.string(),
    author: z.string(),
    // URL distante (stock photo) le temps d'avoir de vraies photos d'atelier.
    image: z.string().url(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
