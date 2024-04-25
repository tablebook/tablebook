import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.js",
      coverage: {
        reporter: ["text", "lcov"],
      },
      reporters: ["verbose"],
    },
    esbuild: {
      loader: "jsx",
      include: /(src)\/.*\.jsx?$/,
      exclude: [],
    },
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_PROXY_TARGET,
          changeOrigin: true,
        },
      },
    },
  });
};
