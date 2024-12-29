import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        provider: "v8",
        reporter: ["json-summary", "html", "text"],
        include: ["src/**"],
        exclude: [
          "src/**/*.test.{js,ts,jsx,tsx}",
          "src/components/**/*.tsx", // Exclude UI components from coverage
          "src/backend/index.ts",
          "src/backend/types/**",
          "src/lib/**",
          "src/*.*",
          "src/vite-env.d.ts",
        ],
      },
      include: ["src/**/*.test.{js,ts,jsx,tsx}"],
    },
  }),
);
