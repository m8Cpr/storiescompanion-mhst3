import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import pkg from "./package.json";

function getGitInfo() {
  try {
    const [commitTitle, hash] = execSync('git log -1 --format="%s%n%h"')
      .toString()
      .trim()
      .split("\n");

    const branch = execSync("git branch --show-current").toString().trim();

    return { branch, hash, commitTitle };
  } catch {
    return { branch: "unknown", hash: "000000", commitTitle: "unknown" };
  }
}

export default defineConfig(({ mode }) => {
  const base = mode === "production" ? "/storiescompanion-mhst3/" : "/";
  const { branch, hash, commitTitle } = getGitInfo();

  return {
    base,
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
      __GIT_COMMIT__: JSON.stringify(commitTitle),
      __GIT_HASH__: JSON.stringify(hash),
      __BASE_PATH__: JSON.stringify(base),
    },
  };
});
