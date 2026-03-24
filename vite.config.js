import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/",
  server: {
    port: 3001,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        "whatsapp-setup": path.resolve(__dirname, "whatsapp-setup/index.html"),
        privacy: path.resolve(__dirname, "privacy/index.html"),
        terms: path.resolve(__dirname, "terms/index.html"),
      },
    },
  },
});
