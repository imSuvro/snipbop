import type { SVGProps } from "react";
import Link from "next/link";
import { createFaqJsonLd, createPageMetadata } from "../seo";
import { ThemeToggle } from "../theme-toggle";
import { DeviceHelpTabs } from "./device-help-tabs";
import styles from "./page.module.css";

const quickTips = [
  "Copy the image itself, not just the page address.",
  "Click or tap the SnipBop paste area before pasting.",
  "Allow clipboard access if your browser asks.",
  "Use Choose Image when an app does not offer paste.",
];

const checklist = [
  "Copy an image",
  "Focus the paste area",
  "Paste or choose a file",
  "Export from SnipBop",
];

const faqs = [
  {
    question: "How do I paste an image from my clipboard?",
    answer:
      "Copy the image on your device, open SnipBop, click or tap the paste area, then use the normal paste command for your device.",
  },
  {
    question: "Why is the paste button blocked?",
    answer:
      "Browsers can block direct clipboard reads until you give permission. Try the keyboard paste shortcut, tap the paste area, or choose an image file instead.",
  },
  {
    question: "Can I paste clipboard images on mobile?",
    answer:
      "Yes, but mobile browsers vary. If paste is not available, save the image to your photos or files and use Choose Image in SnipBop.",
  },
  {
    question: "Does SnipBop upload my clipboard image?",
    answer:
      "No. SnipBop is designed to preview and export the image in your browser.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata = createPageMetadata({
  title: "Clipboard Help for Pasting Images",
  description:
    "Learn how to paste image and download from SnipBop, convert clipboard image to PNG, and save screenshot from clipboard on desktop and mobile browsers.",
  path: "/clipboard-help",
  keywords: [
    "clipboard help",
    "paste image from clipboard",
    "copy image clipboard",
    "Windows clipboard image",
    "Mac clipboard image",
    "iPhone paste image",
    "Android paste image",
    "ChromeOS clipboard image",
  ],
});

export default function ClipboardHelpPage() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Go to SnipBop">
          <LogoMark className={styles.logoMark} aria-hidden="true" />
          <span className={styles.wordmark}>
            Snip<span>Bop</span>
          </span>
        </Link>

        <div className={styles.headerActions}>
          <nav className={styles.topNav} aria-label="Clipboard help navigation">
            <Link href="/">Main tool</Link>
            <a href="#device-instructions">Devices</a>
            <a href="#clipboard-faq">FAQ</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="clipboard-help-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Clipboard help</p>
          <h1 id="clipboard-help-title">
            Paste clipboard images into SnipBop.
          </h1>
          <p>
            Choose your device for simple, text-only steps. When paste is
            blocked, SnipBop still lets you pick an image file and export it
            locally.
          </p>
        </div>

        <div className={styles.heroPanel} aria-label="Clipboard paste checklist">
          <p className={styles.panelKicker}>Start here</p>
          <ol>
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <Link className={styles.primaryLink} href="/">
            Open main tool
          </Link>
        </div>
      </section>

      <DeviceHelpTabs />

      <section className={styles.quickTips} aria-labelledby="quick-tips-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Quick tips</p>
          <h2 id="quick-tips-title">Make image paste feel predictable.</h2>
        </div>
        <ul>
          {quickTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section
        className={styles.faqSection}
        id="clipboard-faq"
        aria-labelledby="faq-title"
      >
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="faq-title">Clipboard image paste answers.</h2>
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
        <p>Ready to convert your clipboard image?</p>
        <Link href="/">Back to the main SnipBop tool</Link>
      </footer>
    </main>
  );
}

function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 56" fill="none" {...props}>
      <rect
        x="7"
        y="9"
        width="34"
        height="40"
        rx="7"
        stroke="currentColor"
        strokeWidth="4"
      />
      <rect
        x="17"
        y="4"
        width="14"
        height="9"
        rx="3"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M14 39L21 29L28 37L32 32L38 41H14Z"
        fill="var(--color-accent)"
      />
      <circle cx="31" cy="22" r="4" fill="var(--color-accent)" />
    </svg>
  );
}
