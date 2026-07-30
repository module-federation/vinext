import assert from "node:assert/strict";
import test from "node:test";

test("the package entry point can be imported", async () => {
  const packageModule = await import("../dist/index.js");

  assert.ok(packageModule);
});
