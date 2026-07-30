import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/widget.tsx",
        "./Counter": "./src/counter.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
      dts: false,
    }),
    react(),
  ],
  build: { target: "chrome89", modulePreload: false, minify: false },
  server: { cors: true, origin: "http://localhost:4174" },
  preview: { cors: true, host: "127.0.0.1", port: 4174, strictPort: true },
});
