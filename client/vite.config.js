import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pages from "vite-plugin-react-pages";
import path from "path";
import { resolve } from 'path'

import reactRefresh from "@vitejs/plugin-react-refresh";

const root = resolve(__dirname, "src", "page");

export default defineConfig({
  plugins: [react(), reactRefresh(), pages()],
  server: {
    port: process.env.PORT || 3000, // Bind to the port specified by Heroku, or use 3000 if not available
    host: "0.0.0.0", // Bind to any available IP address
  },
  build: {
    outDir: "build",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        post: resolve(root, 'DisplayPage.html'),
        // 'create-post': path.resolve(__dirname, 'src/pages/CreatePost/index.html'),
        // post: path.resolve(__dirname, 'src/pages/Post/index.html'),
        // account: path.resolve(__dirname, 'src/pages/Account/index.html'),
        // 'display-posts': path.resolve(__dirname, 'src/pages/Display/index.html'),
      },
    },
  },
});
