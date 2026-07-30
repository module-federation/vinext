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

## Example applications

- Vinext host: `apps/host`, port 4173
- Shared React remote: `apps/remote`, port 4174
- Isolated React 18 island: `apps/island`, port 4175

```sh
pnpm dev
pnpm preview
```

## Development

```sh
pnpm install
pnpm run check
pnpm run build:package
pnpm run build
```

## Release

See [docs/releasing.md](docs/releasing.md).

## License

MIT
