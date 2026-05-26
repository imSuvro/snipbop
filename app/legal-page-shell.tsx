import type { ReactNode, SVGProps } from "react";
import Link from "next/link";
import { getFeedbackMailto } from "./feedback";
import { ThemeToggle } from "./theme-toggle";
import styles from "./legal-page.module.css";

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function LegalPageShell({
  eyebrow,
  title,
  intro,
  children,
}: LegalPageShellProps) {
  const feedbackHref = getFeedbackMailto();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Go to SnipBop">
          <LogoMark className={styles.logoMark} aria-hidden="true" />
          <span className={styles.wordmark}>
            Snip<span>Bop</span>
          </span>
        </Link>

        <div className={styles.headerActions}>
          <nav className={styles.topNav} aria-label="Legal page navigation">
            <Link href="/">Main tool</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href={feedbackHref}>Feedback</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="legal-page-title">
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 id="legal-page-title">{title}</h1>
        <p>{intro}</p>
      </section>

      <div className={styles.content}>{children}</div>

      <footer className={styles.footer}>
        <p>No upload to SnipBop.</p>
        <nav aria-label="Legal footer navigation">
          <Link href="/">Main tool</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href={feedbackHref}>Feedback</a>
        </nav>
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

