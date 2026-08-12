import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  builder: {},
  plugins: [
    federation({
      name: "island",
      filename: "remoteEntry.js",
      exposes: { "./Counter": "./src/counter.tsx" },
      experiments: { ssrMode: "ISLAND" },
      shared: {},
      dts: false,
    }),
    react(),
  ],
  environments: {
    ssr: {
      build: {
        ssr: "./src/counter.tsx",
        outDir: "dist/ssr",
      },
    },
  },
  resolve: { dedupe: ["react", "react-dom"] },
  build: { target: "chrome89", modulePreload: false, minify: false },
  server: { cors: true, origin: "http://localhost:4175" },
  preview: { cors: true, host: "127.0.0.1", port: 4175, strictPort: true },
});
