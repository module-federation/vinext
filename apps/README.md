# Vinext SSR example

This example contains:

- `host`: Vinext/React 19 host using `@module-federation/vinext`.
- `remote`: React 19 remote shared with the host.
- `island`: isolated React 18 SSR island.

Run all production builds and previews:

```sh
pnpm preview
```

Open <http://localhost:4173>. The shared remote runs on port 4174 and the
isolated island on port 4175.
