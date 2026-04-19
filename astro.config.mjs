import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [tailwind(), react()],
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
            if (id.includes("node_modules/react") || id.includes("node_modules/scheduler")) {
              return "react-vendor";
            }
          },
        },
      },
    },
  },
});
