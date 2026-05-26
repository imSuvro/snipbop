import type { Metadata } from "next";

export const siteName = "SnipBop";

export const primarySeoPhrase = "save clipboard image as file";

export const supportingSeoPhrases = [
  "paste image and download",
  "convert clipboard image to PNG",
  "save screenshot from clipboard",
];

export const coreSeoKeywords = [
  primarySeoPhrase,
  ...supportingSeoPhrases,
  "clipboard image tool",
  "browser image export",
  "local image converter",
];

export const siteMetadataBase = new URL(getSiteOrigin());

const openGraphImage = {
  url: "/snipbop-preview.png",
  width: 1200,
  height: 630,
  alt: "SnipBop clipboard image export interface",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataInput): Metadata {
  const brandedTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    keywords: uniqueKeywords([...coreSeoKeywords, ...keywords]),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: brandedTitle,
      description,
      url: path,
      siteName,
      type: "website",
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [openGraphImage.url],
    },
  };
}

export function createFaqJsonLd(faqs: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function getSiteOrigin() {
  const configuredSiteUrl = [
    process.env.NEXT_PUBLIC_SNIPBOP_SITE_URL,
    process.env.SNIPBOP_SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ].find((value) => value?.trim());

  if (!configuredSiteUrl) {
    return "http://localhost:3000";
  }

  const siteUrl = configuredSiteUrl.trim();
  const siteUrlWithProtocol = /^https?:\/\//i.test(siteUrl)
    ? siteUrl
    : `https://${siteUrl}`;

  try {
    return new URL(siteUrlWithProtocol).origin;
  } catch {
    return "http://localhost:3000";
  }
}

function uniqueKeywords(keywords: string[]) {
  return Array.from(new Set(keywords));
}
