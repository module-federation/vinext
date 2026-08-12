"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount((current) => current + 1)}>Host counter: {count}</button>;
}
