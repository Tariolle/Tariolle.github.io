import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://tariolle.github.io",
  output: "static",
  devToolbar: {
    enabled: false,
  },
  build: {
    format: "directory",
  },
  vite: {
    build: {
      target: "esnext",
      // The homepage-only Three.js renderer is isolated in its own 526 kB minified chunk.
      chunkSizeWarningLimit: 550,
    },
  },
});
