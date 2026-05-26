import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnipBop",
  description:
    "Paste an image, choose a format, and export it instantly in your browser.",
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
