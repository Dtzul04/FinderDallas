import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// react() reads JSX, tsconfigPaths() makes "@/..." imports work in tests
export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom", 
    setupFiles: ["./vitest.setup.ts"],
    env: loadEnv(mode, process.cwd(), ""), // loads .env.local so tests can reach Supabase
  },
}));
