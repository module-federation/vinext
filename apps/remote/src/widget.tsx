"use client";

import { useEffect, useState } from "react";

export default function Widget() {
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
      <h2>Remote app</h2>
      <p>Shared React 19 component</p>
      {hydrated && (
        <button onClick={() => setCount((current) => current + 1)}>
          Remote counter: {count}
        </button>
      )}
    </section>
  );
}
