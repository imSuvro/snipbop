import { getFeedbackMailto } from "../feedback";
import { LegalPageShell } from "../legal-page-shell";
import { createPageMetadata } from "../seo";
import styles from "../legal-page.module.css";

const privacyHighlights = [
  "No account required.",
  "Images are processed in the browser.",
  "SnipBop does not upload or store the user's image.",
  "SnipBop does not track filenames in MVP.",
];

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "SnipBop privacy notes for local browser image export: no account required, no image upload to SnipBop, and clipboard images processed on your device.",
  path: "/privacy",
  keywords: [
    "SnipBop privacy",
    "local clipboard image privacy",
    "browser image processing",
  ],
});

export default function PrivacyPage() {
  const feedbackHref = getFeedbackMailto("SnipBop privacy feedback");

  return (
    <LegalPageShell
      eyebrow="Privacy"
      title="Privacy notes for the SnipBop MVP."
      intro="SnipBop is built around local image handling. No upload to SnipBop."
    >
      <aside className={styles.summaryPanel} aria-labelledby="privacy-summary">
        <h2 id="privacy-summary">Short version</h2>
        <ul>
          {privacyHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>

      <div className={styles.legalSections}>
        <section className={styles.legalCard} aria-labelledby="privacy-images">
          <h2 id="privacy-images">Image handling</h2>
          <p>
            Images are processed in the browser so you can preview and export
            them on your device. SnipBop does not upload or store the user&apos;s
            image.
          </p>
          <p>No upload to SnipBop.</p>
        </section>

        <section className={styles.legalCard} aria-labelledby="privacy-account">
          <h2 id="privacy-account">Accounts and filenames</h2>
          <ul>
            <li>No account required.</li>
            <li>SnipBop does not track filenames in MVP.</li>
            <li>
              Exported filenames are created in your browser and used for the
              download you start.
            </li>
          </ul>
        </section>

        <section className={styles.legalCard} aria-labelledby="privacy-local">
          <h2 id="privacy-local">Local preferences</h2>
          <p>
            SnipBop can remember your theme preference in this browser so the
            interface opens in the mode you selected.
          </p>
        </section>

        <section className={styles.legalCard} aria-labelledby="privacy-feedback">
          <h2 id="privacy-feedback">Feedback</h2>
          <p>
            The feedback link opens your email app with a mailto draft. Only
            include details you want to send by email.
          </p>
          <p>
            <a href={feedbackHref}>Send privacy feedback</a>
          </p>
        </section>
      </div>
    </LegalPageShell>
  );
}
