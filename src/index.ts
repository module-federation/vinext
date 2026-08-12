import {
  federation as viteFederation,
  type ModuleFederationOptions,
} from "@module-federation/vite";

export type VinextModuleFederationOptions = ModuleFederationOptions;

/**
 * Applies the small set of defaults needed by a vinext application.
 * User-provided Module Federation options always win.
 */
export function createModuleFederationConfig(
  options: VinextModuleFederationOptions
): ModuleFederationOptions {
  return {
    filename: "remoteEntry.js",
    hostInitInjectLocation: "entry",
    remotes: {},
    exposes: {},
    shared: {
      react: { singleton: true },
      "react/": { singleton: true },
      "react-dom": { singleton: true },
      "react-dom/": { singleton: true },
    },
    ...options,
  };
}

/** Module Federation Vite plugins configured for vinext. */
export function federation(options: VinextModuleFederationOptions): any[] {
  return viteFederation(createModuleFederationConfig(options));
}

export const withModuleFederation = federation;

export default federation;
export type { ModuleFederationOptions } from "@module-federation/vite";
