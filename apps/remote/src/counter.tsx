"use client";

import * as React from "react";
import { getVinextReact } from "vinext/client";

const { useEffect, useState } = getVinextReact(React);

export default function RemoteCounter() {
  const [count, setCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return (
    <section
      style={{
        background: "#1f2124",
        borderRadius: 10,
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
        color: "white",
        padding: 20,
        textAlign: "center",
        width: 225,
      }}
    >
      <h2>Remote SSR component</h2>
      <p>Rendered by the remote before client hydration.</p>
      {hydrated && (
        <button onClick={() => setCount((current) => current + 1)}>
          Remote counter: {count}
        </button>
      )}
      <p>{hydrated ? "Hydrated" : "SSR"}</p>
    </section>
  );
}
