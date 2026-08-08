import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://joshi-006.github.io/cisco_ps/, so the base path applies
// in dev and preview too — keeping them identical to production.
export default defineConfig({
  base: "/cisco_ps/",
  plugins: [react()],
  test: {
    environment: "node",
  },
});
