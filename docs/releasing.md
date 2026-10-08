# Releasing

Every pull request that should produce a new package version must include a
changeset:

```sh
pnpm run changeset
```

Select the version change, write a short user-facing summary, and commit the
generated file under `.changeset/`.

Pull request titles must follow
[Conventional Commits](https://www.conventionalcommits.org/) (`feat: …`,
`fix: …`, `chore: …`). Generated `Release …` pull requests are exempt.

## Try a pull request build

Every pull request and every push to `main` is published to
[pkg.pr.new](https://pkg.pr.new). The install command is posted on the pull
request.

## Publish a stable release

1. Merge pull requests containing their changeset files into `main`.
2. Open **Actions → Release Pull Request → Run workflow**, keep `main` and the
   `latest` release type, and run it.
3. Review the version bump and changelog in the generated `Release vX.Y.Z`
   pull request, then merge it.
4. Create a GitHub release from `main` with the tag `X.Y.Z` (no leading `v`),
   matching the version in `packages/vinext/package.json`, and publish it.

Publishing the GitHub release runs the **Release** workflow, which checks that
the tag matches `packages/vinext/package.json`, runs the full checks, packs the
package with pnpm (resolving `catalog:` versions), and publishes the tarball to
npm with the `latest` tag.

Changing an existing pre-release to a full release also runs the **Release**
workflow and publishes `X.Y.Z` with the `latest` tag.

## Publish a prerelease

Either:

- Publish a GitHub release marked as **pre-release**, or
- Open **Actions → Release → Run workflow** on `main` with the `next` version.

Both publish `X.Y.Z-next.<run id>` with the npm `next` tag:

```sh
pnpm add @module-federation/vinext@next
```

Neither changes `main` or the next stable version.

## Repository setup

- Secret `REPO_SCOPED_TOKEN`: a token with `contents` and `pull-requests` write
  access, so the generated release pull request triggers CI.
- Environment `Publish`: used by the **Release** workflow. Add required
  reviewers to gate npm publishes.
- npm Trusted Publishing for `@module-federation/vinext`, pointing at this
  repository, the `release.yml` workflow, and the `Publish` environment. No npm
  token is needed.
- Optional: secret `TURBO_TOKEN` and variable `TURBO_TEAM` enable the Turborepo
  remote cache in the **CI** and **E2E Tests** workflows.
