"use client";

import { useEffect, useState } from "react";

export default function HostSsrComponent() {
  const [count, setCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return (
    <section className="card host-card">
      <h2>Host SSR component</h2>
      <p>Rendered by the host before client hydration.</p>
      {hydrated && (
        <button onClick={() => setCount((current) => current + 1)}>SSR counter: {count}</button>
      )}
      <p>{hydrated ? "Hydrated" : "SSR"}</p>
    </section>
  );
}
