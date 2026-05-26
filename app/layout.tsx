import type { Metadata } from "next";
import "./globals.css";
import { coreSeoKeywords, siteMetadataBase, siteName } from "./seo";

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  applicationName: siteName,
  title: {
    default: "SnipBop - Save Clipboard Images as Files",
    template: `%s | ${siteName}`,
  },
  description:
    "SnipBop helps you paste image and download PNG, JPG, or WebP files locally from your browser.",
  keywords: coreSeoKeywords,
  openGraph: {
    title: "SnipBop - Save Clipboard Images as Files",
    description:
      "Paste a clipboard image into SnipBop and export it locally as PNG, JPG, or WebP.",
    url: "/",
    siteName,
    type: "website",
    images: [
      {
        url: "/snipbop-preview.png",
        width: 1200,
        height: 630,
        alt: "SnipBop clipboard image export interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnipBop - Save Clipboard Images as Files",
    description:
      "Paste a clipboard image into SnipBop and export it locally as PNG, JPG, or WebP.",
    images: ["/snipbop-preview.png"],
  },
};

const themeScript = `
(() => {
  try {
    const theme = window.localStorage.getItem("snipbop-theme");
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    }
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
