import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as child_process from "node:child_process";

const commitHash = child_process
  .execSync("git rev-parse --short HEAD")
  .toString();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  define: {
    __COMMIT_HASH__: process.env.COMMIT_HASH || JSON.stringify(commitHash),
  },
});
