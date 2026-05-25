import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnipBop",
  description: "A lightweight Next.js and TypeScript app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
