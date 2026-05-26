import { getFeedbackMailto } from "../feedback";
import { LegalPageShell } from "../legal-page-shell";
import { createPageMetadata } from "../seo";
import styles from "../legal-page.module.css";

const termHighlights = [
  "Use SnipBop for images you own or are allowed to process.",
  "Clipboard and export support depends on your browser and device.",
  "No upload to SnipBop.",
];

export const metadata = createPageMetadata({
  title: "Terms",
  description:
    "SnipBop terms for local browser image export, clipboard paste support, supported use, and browser-based PNG, JPG, and WebP downloads.",
  path: "/terms",
  keywords: [
    "SnipBop terms",
    "clipboard image terms",
    "browser image export terms",
  ],
});

export default function TermsPage() {
  const feedbackHref = getFeedbackMailto("SnipBop terms feedback");

  return (
    <LegalPageShell
      eyebrow="Terms"
      title="Terms for using SnipBop."
      intro="These MVP terms keep the local image export workflow clear. No upload to SnipBop."
    >
      <aside className={styles.summaryPanel} aria-labelledby="terms-summary">
        <h2 id="terms-summary">Short version</h2>
        <ul>
          {termHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>

      <div className={styles.legalSections}>
        <section className={styles.legalCard} aria-labelledby="terms-use">
          <h2 id="terms-use">Using SnipBop</h2>
          <p>
            SnipBop helps you add an image, preview it, choose an output format,
            and download the result from your browser.
          </p>
          <p>
            You are responsible for the images you choose and for using the
            exported files lawfully.
          </p>
        </section>

        <section className={styles.legalCard} aria-labelledby="terms-local">
          <h2 id="terms-local">Local image processing</h2>
          <p>
            Images are processed in the browser. SnipBop does not upload or
            store the user&apos;s image.
          </p>
          <p>No upload to SnipBop.</p>
        </section>

        <section className={styles.legalCard} aria-labelledby="terms-limits">
          <h2 id="terms-limits">MVP limitations</h2>
          <ul>
            <li>Clipboard access can vary by browser, device, and permission.</li>
            <li>Export formats depend on browser support.</li>
            <li>SnipBop is provided as an MVP and may change over time.</li>
          </ul>
        </section>

        <section className={styles.legalCard} aria-labelledby="terms-feedback">
          <h2 id="terms-feedback">Feedback</h2>
          <p>
            The feedback link uses a mailto draft for MVP. By sending feedback,
            you allow SnipBop to use it to improve the product.
          </p>
          <p>
            <a href={feedbackHref}>Send terms feedback</a>
          </p>
        </section>
      </div>
    </LegalPageShell>
  );
}
