import { expect, test } from "@playwright/test";

const button = (page, name) => page.getByRole("button", { name }).first();

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
  await expect(page.getByRole("button", { name: /Remote counter: 1/ })).toHaveCount(2);

  await button(page, /Island counter: 18/).click();
  await expect(button(page, /Island counter: 19/)).toBeVisible();
});
