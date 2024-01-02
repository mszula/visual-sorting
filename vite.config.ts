import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as child_process from "node:child_process";

if (process.env.VITE_GIT_COMMIT_REF === undefined) {
  process.env.VITE_GIT_COMMIT_REF = child_process
    .execSync("git rev-parse --short HEAD")
    .toString();
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
});
