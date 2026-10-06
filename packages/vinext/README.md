# @module-federation/vinext

Thin Module Federation wrapper for vinext, built on
`@module-federation/vite`.

## Install

```sh
pnpm add @module-federation/vinext
```

## Configure

Register federation before `vinext()` in `vite.config.ts`:

```ts
import { federation } from "@module-federation/vinext";
import { defineConfig } from "vite";
import vinext from "vinext";

export default defineConfig({
  plugins: [
    federation({
      name: "host",
      remotes: {
        catalog: {
          type: "module",
          name: "catalog",
          entry: "https://catalog.example.com/remoteEntry.js",
          entryGlobalName: "catalog",
          shareScope: "default",
        },
      },
    }),
    vinext(),
  ],
});
```

Remote example:

```ts
federation({
  name: "catalog",
  exposes: {
    "./ProductCard": "./app/product-card.tsx",
  },
});
```

The wrapper defaults `filename` to `remoteEntry.js`, injects host startup into
the entry (vinext has no conventional HTML entry), and shares `react` and
`react-dom` as singletons. Explicit options override every default. All
`@module-federation/vite` options remain available.

The default export and `withModuleFederation` are aliases of `federation`.

## Examples

Runnable host, remote, and island applications live in
[`apps/`](https://github.com/module-federation/vinext/tree/main/apps).

## License

MIT
