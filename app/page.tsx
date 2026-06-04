import type { SVGProps } from "react";
import Link from "next/link";
import { ClipboardImageTool } from "./clipboard-image-tool";
import { getFeedbackMailto } from "./feedback";
import { createFaqJsonLd, createPageMetadata } from "./seo";
import { ThemeToggle } from "./theme-toggle";
import styles from "./page.module.css";

type NavigationLink = {
  label: string;
  href: string;
  id?: string;
};

const navLinks: NavigationLink[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Help", href: "/clipboard-help" },
  { label: "Privacy", href: "/privacy" },
];

const trustBadges = [
  { label: "Browser-only", icon: ShieldIcon },
  { label: "No account", icon: UserIcon },
  { label: "No upload", icon: CloudIcon },
];

const steps = [
  {
    number: "01",
    title: "Add your image",
    text: "Choose a file, drop one in, or use the clipboard when your browser allows it.",
  },
  {
    number: "02",
    title: "Pick the output",
    text: "Name the file and choose the image format you want to save next.",
  },
  {
    number: "03",
    title: "Export locally",
    text: "Download from the browser. The image does not need an account or a server trip.",
  },
];

const faqs = [
  {
    question: "Does SnipBop upload my image?",
    answer:
      "No. This first shell is designed around local, browser-based image handling.",
  },
  {
    question: "Will clipboard paste work everywhere?",
    answer:
      "Clipboard access depends on browser support and device permissions, especially on mobile.",
  },
  {
    question: "Can I save a screenshot from the clipboard?",
    answer:
      "Yes. Copy the screenshot image, paste it into SnipBop, then download it as PNG, JPG, or WebP when your browser supports image paste.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No sign in is planned for the core image paste and export workflow.",
  },
  {
    question: "Which formats will SnipBop support?",
    answer:
      "The MVP export choices are PNG, JPG, and WebP.",
  },
];

const footerLinks: NavigationLink[] = [
  { label: "Product", href: "#top" },
  { label: "Resources", href: "#how-it-works" },
  { label: "Clipboard help", href: "/clipboard-help" },
  { label: "Privacy", href: "/privacy", id: "privacy" },
  { label: "Terms", href: "/terms", id: "terms" },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata = createPageMetadata({
  title: "Save Clipboard Image as File",
  description:
    "SnipBop helps you save clipboard image as file: paste image and download PNG, JPG, or WebP, convert clipboard image to PNG, and save screenshot from clipboard.",
  path: "/",
  keywords: [
    "paste screenshot and download",
    "download clipboard image",
    "screenshot to PNG",
  ],
});

/**
 * Renders the static SnipBop main page shell for the first paste/export flow.
 */
export default function Home() {
  const feedbackHref = getFeedbackMailto();
  const mainNavLinks = [...navLinks, { label: "Feedback", href: feedbackHref }];
  const siteFooterLinks = [
    ...footerLinks,
    { label: "Feedback", href: feedbackHref },
  ];

  return (
    <main className={styles.page} id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="SnipBop home">
          <LogoMark className={styles.logoMark} />
          <span className={styles.wordmark}>
            Snip<span>Bop</span>
          </span>
        </a>

        <div className={styles.headerActions}>
          <nav className={styles.nav} aria-label="Main navigation">
            {mainNavLinks.map((link) => (
              <NavigationLinkItem link={link} key={link.label} />
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Boptools / SnipBop</p>
          <h1 id="home-title" className={styles.title}>
            <span className={styles.desktopTitle}>
              <span className={styles.titleLine}>Save clipboard</span>
              <span className={styles.titleLine}>
                images as <span className={styles.accentText}>files.</span>
              </span>
            </span>
            <span className={styles.mobileTitle}>
              <span className={styles.titleLine}>Save clipboard</span>
              <span className={styles.titleLine}>
                images as <span className={styles.accentText}>files.</span>
              </span>
            </span>
          </h1>
          <p className={styles.lede}>
            Paste image and download PNG, JPG, or WebP locally. A tiny browser
            workbench for screenshots, copied images, and quick file saves.
          </p>

          <div className={styles.heroLinks}>
            <a href="#how-it-works">How it works</a>
            <Link href="/clipboard-help">Clipboard help</Link>
          </div>

          <div className={styles.trustList} aria-label="SnipBop trust signals">
            {trustBadges.map(({ label, icon: Icon }) => (
              <span className={styles.trustBadge} key={label}>
                <Icon aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <ClipboardImageTool />
      </section>

      <section
        className={`${styles.section} ${styles.howItWorks}`}
        id="how-it-works"
        aria-labelledby="how-title"
      >
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>How it works</p>
          <h2 id="how-title">Three steps from image to file.</h2>
        </div>
        <div className={styles.stepGrid}>
          {steps.map((step) => (
            <article className={styles.step} key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.clipboardHelp}`}
        id="clipboard-help"
        aria-labelledby="clipboard-title"
      >
        <div>
          <p className={styles.eyebrow}>Clipboard help</p>
          <h2 id="clipboard-title">Paste support depends on the browser.</h2>
        </div>
        <p>
          Desktop browsers usually allow paste after keyboard input. Mobile
          browsers may ask for permission or require choosing an image instead.
          {" "}
          <Link className={styles.inlineLink} href="/clipboard-help">
            Open the clipboard help guide.
          </Link>
        </p>
      </section>

      <section
        className={`${styles.section} ${styles.faqSection}`}
        aria-labelledby="faq-title"
      >
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="faq-title">Quick answers before exporting.</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details className={styles.faqItem} key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <a className={styles.brand} href="#top" aria-label="SnipBop home">
            <LogoMark className={styles.logoMark} />
            <span className={styles.wordmark}>
              Snip<span>Bop</span>
            </span>
          </a>
          <p>The fastest way to turn a copied image into a clean download.</p>
        </div>

        <nav className={styles.footerLinks} aria-label="Footer navigation">
          {siteFooterLinks.map((link) => (
            <NavigationLinkItem link={link} key={link.label} />
          ))}
        </nav>
      </footer>
    </main>
  );
}

function NavigationLinkItem({ link }: { link: NavigationLink }) {
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} id={link.id}>
        {link.label}
      </Link>
    );
  }

  return (
    <a href={link.href} id={link.id}>
      {link.label}
    </a>
  );
}

/**
 * Draws the SnipBop clipboard/image logo mark.
 */
function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 56" fill="none" {...props}>
      <rect x="7" y="9" width="34" height="40" rx="7" stroke="currentColor" strokeWidth="4" />
      <rect x="17" y="4" width="14" height="9" rx="3" stroke="currentColor" strokeWidth="4" />
      <path d="M14 39L21 29L28 37L32 32L38 41H14Z" fill="var(--color-accent)" />
      <circle cx="31" cy="22" r="4" fill="var(--color-accent)" />
    </svg>
  );
}

/**
 * Draws the shield icon used by the browser-only trust badge.
 */
function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3L19 6V11.5C19 16 16.2 19.5 12 21C7.8 19.5 5 16 5 11.5V6L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Draws the user icon used by the no-sign-in trust badge.
 */
function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5 20C6.3 16.8 8.6 15 12 15C15.4 15 17.7 16.8 19 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Draws the cloud icon used by the no-upload-needed trust badge.
 */
function CloudIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M8 18H17A4 4 0 0 0 17 10C16.3 6.9 13.8 5 10.8 5C7.9 5 5.5 7.1 5.1 10A4 4 0 0 0 8 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

