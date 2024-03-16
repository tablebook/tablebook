import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  esbuild: {
    loader: "jsx",
    include: /(src)\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /(src)\/.*\.js$/ }, (args) => ({
              loader: "jsx",
              contents: fs.readFileSync(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
});
