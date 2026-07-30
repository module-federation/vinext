# Releasing

Every pull request that should produce a new package version must include a
changeset:

```sh
pnpm run changeset
```

Select the version change, write a short user-facing summary, and commit the
generated file under `.changeset/`.

## Publish a preview

1. Push the branch containing the code and its changeset.
2. Open **Actions → Release → Run workflow**.
3. Select that branch and run the workflow.
4. Open the completed workflow run and copy the install command from its
   summary.

Preview versions use the npm `preview` tag. The latest preview can also be
installed with:

```sh
pnpm add @module-federation/vinext@preview
```

Running the preview workflow does not change the branch or the future stable
version.

## Publish a stable release

1. Merge pull requests containing their changeset files into `main`.
2. The **Release** workflow automatically creates or updates the
   `chore: release` pull request.
3. Review the version and changelog in that release pull request.
4. Merge the release pull request.

The next **Release** workflow run publishes the stable package automatically.
No npm token or manual npm publish is needed.
