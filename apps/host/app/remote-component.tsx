"use client";

import * as React from "react";
import type { ComponentType } from "react";

type RemoteModule = { default: ComponentType };

const LazyRemoteWidget = React.lazy(
  () =>
    // @ts-expect-error Module Federation provides this virtual module.
    import("remote/Widget") as Promise<RemoteModule>
);
const LazyRemoteCounter = React.lazy(
  () =>
    // @ts-expect-error Module Federation provides this virtual module.
    import("remote/Counter") as Promise<RemoteModule>
);

export function RemoteWidget() {
  return (
    <React.Suspense fallback={<RemoteLoading label="remote/Widget" />}>
      <LazyRemoteWidget />
    </React.Suspense>
  );
}

export function RemoteCounter() {
  return (
    <React.Suspense fallback={<RemoteLoading label="remote/Counter" />}>
      <LazyRemoteCounter />
    </React.Suspense>
  );
}

function RemoteLoading({ label }: { label: string }) {
  return <section className="card">Loading {label}…</section>;
}
