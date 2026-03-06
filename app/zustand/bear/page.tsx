"use client";

import { useBearStore } from "@/lib/store";

function BearCounter() {
  // Select only 'bears' to avoid unnecessary re-renders
  const bears = useBearStore((s) => s.bears);
  return <h1>{bears} bears around</h1>;
}

export default BearCounter;
