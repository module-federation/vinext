import assert from "node:assert/strict";
import test from "node:test";

import federation, {
  createModuleFederationConfig,
  federation as namedFederation,
  withModuleFederation,
} from "@module-federation/vinext";

test("exports the federation wrapper", () => {
  assert.equal(federation, namedFederation);
  assert.equal(withModuleFederation, namedFederation);
  assert.ok(namedFederation({ name: "host" }).length > 0);
});

test("applies vinext defaults", () => {
  assert.deepEqual(createModuleFederationConfig({ name: "host" }), {
    name: "host",
    filename: "remoteEntry.js",
    hostInitInjectLocation: "entry",
    remotes: {},
    exposes: {},
    shared: {
      react: { singleton: true },
      "react-dom": { singleton: true },
    },
  });
});

test("preserves explicit Module Federation options", () => {
  const shared = ["react"];
  const config = createModuleFederationConfig({
    name: "remote",
    filename: "custom.js",
    hostInitInjectLocation: "html",
    exposes: { "./Widget": "./app/widget.tsx" },
    shared,
  });

  assert.equal(config.filename, "custom.js");
  assert.equal(config.hostInitInjectLocation, "html");
  assert.deepEqual(config.exposes, { "./Widget": "./app/widget.tsx" });
  assert.equal(config.shared, shared);
});
