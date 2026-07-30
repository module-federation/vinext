import { useState } from "react";

export type IslandCounterProps = {
  initialCount: number;
  renderedAt: string;
};

/** Runs on the host server through the generated island shell. */
export async function load(): Promise<IslandCounterProps> {
  return { initialCount: 18, renderedAt: new Date().toISOString() };
}

export default function IslandCounter({
  initialCount,
  renderedAt,
}: IslandCounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <section
      data-mf-react-version="18"
      style={{
        background: "#35255a",
        borderRadius: 10,
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
        color: "white",
        padding: 20,
        textAlign: "center",
        width: 225,
      }}
    >
      <h2>React 18 SSR island</h2>
      <p>Server rendered remotely; hydrated outside the React 19 host tree.</p>
      <button onClick={() => setCount((current) => current + 1)}>
        Island counter: {count}
      </button>
      <small style={{ display: "block", marginTop: 10 }}>SSR: {renderedAt}</small>
    </section>
  );
}
