import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { DeviceHelpTabs } from "./device-help-tabs";
import styles from "./page.module.css";

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

const faqJsonLd = {
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

export const metadata: Metadata = {
  title: "Clipboard Help: Paste Images on Any Device | SnipBop",
  description:
    "Simple clipboard image paste instructions for Windows, Mac, Linux, ChromeOS, iPhone, iPad, and Android.",
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
};

export default function ClipboardHelpPage() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Go to SnipBop">
          <span className={styles.logoMark} aria-hidden="true">
            SB
          </span>
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
            How to copy and paste images into SnipBop.
          </h1>
          <p>
            Pick your device, follow the short steps, then return to the main
            image tool to export your file.
          </p>
        </div>

        <div className={styles.heroActions} aria-label="Primary actions">
          <Link className={styles.primaryLink} href="/">
            Open the main tool
          </Link>
          <a className={styles.secondaryLink} href="#device-instructions">
            Choose your device
          </a>
        </div>
      </section>

      <DeviceHelpTabs />

      <section className={styles.quickTips} aria-labelledby="quick-tips-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Quick tips</p>
          <h2 id="quick-tips-title">Make clipboard paste work smoothly.</h2>
        </div>
        <ul>
          <li>Copy the image itself, not just the page address.</li>
          <li>Click or tap the SnipBop paste area before pasting.</li>
          <li>Allow clipboard access if your browser asks.</li>
          <li>Use Choose Image when a browser or app does not offer paste.</li>
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
