"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const p = useSearchParams();

  return <p>Customers Page{p.get("a")}</p>;
}
