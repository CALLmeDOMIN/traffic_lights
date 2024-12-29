import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "node",
      coverage: {
        provider: "v8",
        reporter: ["json-summary", "html"],
      },
    },
  }),
);
