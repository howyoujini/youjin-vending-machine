import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@exceptions": "/src/exceptions",
    },
  },
});
