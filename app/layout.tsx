"use client";

import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
/**
 * This is called a root layout and is required in every Next.js application
 * @param param0
 * @returns
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
