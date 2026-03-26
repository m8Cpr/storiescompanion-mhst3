import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { execSync } from "child_process";
import pkg from "./package.json";

function getGitInfo() {
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();
    const hash = execSync("git rev-parse --short HEAD").toString().trim();
    return { branch, hash };
  } catch {
    return { branch: "unknown", hash: "000000" };
  }
}

const { branch, hash } = getGitInfo();

// https://vite.dev/config/
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProd ? "/storiescompanion-mhst3/" : "/",
  server: {
    host: "::",
    port: 8000,
  },
  plugins: [tailwindcss(), svgr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __GIT_BRANCH__: JSON.stringify(branch),
    __GIT_HASH__: JSON.stringify(hash),
  },
});
