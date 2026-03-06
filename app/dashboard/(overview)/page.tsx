"use client";

import CardWrapper from "@/ui/dashboard/cards";
import RevenueChart from "@/ui/dashboard/revenue-chart";
import LatestInvoices from "@/ui/dashboard/latest-invoices";
import { lusitana } from "@/ui/fonts";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/ui/skeletons";
/**
 * Holes are locations where dynamic content will load asynchronously at request time.
 * @returns
 */
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
    </main>
  );
}
