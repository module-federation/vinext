import { expect, test } from "@playwright/test";

const button = (page, name) => page.getByRole("button", { name }).first();

test("shared remote components are server-rendered", async ({ request }) => {
  const html = await (await request.get("/")).text();

  // The remote components must arrive as server-rendered HTML, not as
  // Suspense fallbacks that React later client-renders (error #419).
  expect(html).toContain("Remote app");
  expect(html).toContain("Remote SSR component");
  // React SSR splits adjacent text nodes with <!-- --> separators, so the
  // fallback serializes as "Loading <!-- -->remote/Widget…" — a plain
  // toContain("Loading remote/Widget") could never fail.
  expect(html).not.toMatch(/Loading (<!-- -->)?remote\/Widget/);
  expect(html).not.toMatch(/Loading (<!-- -->)?remote\/Counter/);
  // React marks a server-errored Suspense boundary with a digest template.
  expect(html).not.toContain("<template data-dgst=");
});

test("host, shared remotes, and island hydrate", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Vinext host")).toBeVisible();
  await expect(page.getByText("Host SSR component")).toBeVisible();
  await expect(page.getByText("Remote app")).toBeVisible();
  await expect(page.getByText("Remote SSR component")).toBeVisible();
  await expect(page.getByText("React 18 SSR island")).toBeVisible();

  await button(page, /Host counter: 0/).click();
  await expect(button(page, /Host counter: 1/)).toBeVisible();
  await button(page, /SSR counter: 0/).click();
  await expect(button(page, /SSR counter: 1/)).toBeVisible();

  const remoteCounters = page.getByRole("button", {
    name: /Remote counter: 0/,
  });
  await expect(remoteCounters).toHaveCount(2);
  await remoteCounters.first().click();
  await remoteCounters.last().click();
  await expect(
    page.getByRole("button", { name: /Remote counter: 1/ }),
  ).toHaveCount(2);

  await button(page, /Island counter: 18/).click();
  await expect(button(page, /Island counter: 19/)).toBeVisible();
});
