import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/",
  plugins: [react()],
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
        kvkk: path.resolve(__dirname, "kvkk/index.html"),
        "cerez-politikasi": path.resolve(__dirname, "cerez-politikasi/index.html"),
        "iade-politikasi": path.resolve(__dirname, "iade-politikasi/index.html"),
        "mesafeli-satis-sozlesmesi": path.resolve(__dirname, "mesafeli-satis-sozlesmesi/index.html"),
        "on-bilgilendirme-formu": path.resolve(__dirname, "on-bilgilendirme-formu/index.html"),
      },
    },
  },
});
