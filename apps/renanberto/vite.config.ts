import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const alias = (path: string) => fileURLToPath(new URL(`../../${path}`, import.meta.url));

export default defineConfig({
  root: "apps/renanberto",
  base: "/",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  server: {
    host: "0.0.0.0"
  },
  preview: {
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "@openroot/core": alias("packages/core/src/index.ts"),
      "@openroot/content": alias("packages/content/src/index.ts"),
      "@openroot/filesystem": alias("packages/filesystem/src/index.ts"),
      "@openroot/shell": alias("packages/shell/src/index.ts"),
      "@openroot/terminal": alias("packages/terminal/src/index.ts"),
      "@openroot/profile": alias("packages/profile/src/index.ts"),
      "@openroot/themes": alias("packages/themes/src/index.ts"),
      "@openroot/plugins": alias("packages/plugins/src/index.ts"),
      "@openroot/plugin-filesystem": alias("packages/plugin-filesystem/src/index.ts"),
      "@openroot/plugin-portfolio": alias("packages/plugin-portfolio/src/index.ts"),
      "@openroot/plugin-fun": alias("packages/plugin-fun/src/index.ts"),
      "@openroot/plugin-system": alias("packages/plugin-system/src/index.ts"),
      "@openroot/story": alias("packages/story/src/index.ts"),
      "@openroot/graph": alias("packages/graph/src/index.ts"),
      "@openroot/theme-openroot": alias("packages/theme-openroot/src/index.ts")
    }
  }
});
