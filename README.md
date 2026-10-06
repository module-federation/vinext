# vinext Module Federation

Monorepo for [`@module-federation/vinext`](packages/vinext), a thin Module
Federation wrapper for vinext built on `@module-federation/vite`.

See the [package README](packages/vinext/README.md) for installation and
configuration.

## Repository layout

| Path                                 | Description                                      |
| ------------------------------------ | ------------------------------------------------ |
| [`packages/vinext`](packages/vinext) | `@module-federation/vinext`, published to npm    |
| [`apps/host`](apps/host)             | Vinext/React 19 host, port 4173                  |
| [`apps/remote`](apps/remote)         | React 19 remote shared with the host, port 4174  |
| [`apps/island`](apps/island)         | Isolated React 18 SSR island, port 4175          |
| [`e2e`](e2e)                         | Playwright tests against the production previews |

Tasks run through [Turborepo](https://turborepo.com), which builds workspace
dependencies first and caches results in `.turbo/`.

## Development

```sh
pnpm install
pnpm dev          # watch the package and run every app in dev mode
pnpm build        # build the package and all apps
pnpm preview      # build, then serve the production apps
pnpm check        # typecheck, unit tests, and builds
pnpm test:e2e     # Playwright against `pnpm preview`
```

Scope a task to one workspace with a filter, e.g.
`pnpm turbo run dev --filter=vinext-host` or `pnpm build:package`.

## Release

See [docs/releasing.md](docs/releasing.md).

## License

MIT
