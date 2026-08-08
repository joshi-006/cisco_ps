import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/cisco_ps/" : "/",
  plugins: [react()],
  test: {
    environment: "node",
  },
}));
