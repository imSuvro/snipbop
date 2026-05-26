import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnipBop",
  description:
    "Paste an image, choose a format, and export it instantly in your browser.",
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
