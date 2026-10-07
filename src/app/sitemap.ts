import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = "https://ateliya.com";

// trailingSlash est activé (next.config.ts) : les URLs se terminent par « / ».
const ROUTES: { path: string; priority: number; freq: "weekly" | "monthly" }[] =
  [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/fonctionnalites/", priority: 0.8, freq: "monthly" },
    { path: "/tarifs/", priority: 0.8, freq: "monthly" },
    { path: "/inscription/", priority: 0.8, freq: "monthly" },
    { path: "/contact/", priority: 0.6, freq: "monthly" },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
