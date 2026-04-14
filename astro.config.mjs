import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  image: {
    domains: ['images.unsplash.com'],
  },
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      minify: "esbuild",
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/lucide")) {
              return "icons";
            }
          },
        },
      },
    },
  },
});
