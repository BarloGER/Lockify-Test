import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./", // Dein Basisverzeichnis
  publicDir: "public", // Verzeichnis für statische Assets
  build: {
    outDir: "dist", // Ausgabeverzeichnis
  },
});
