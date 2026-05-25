import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Logo />
          <nav className={styles.nav} aria-label="Primary navigation">
            <a href="#workspace">How it works</a>
            <a href="#about">About</a>
          </nav>
          <ThemeToggle />
        </header>

        <section
          id="workspace"
          className={styles.workspace}
          aria-label="SnipBop upload and export workspace"
        >
          <section className={styles.uploadPanel} aria-labelledby="upload-title">
            <div className={styles.intro}>
              <h1 id="upload-title">
                <span className={styles.headlineMain}>Paste an image.</span>
                <span>Export instantly.</span>
              </h1>
              <p>
                SnipBop lets you paste an image, choose a format, name it, and
                download in a snap.
              </p>
              <ul className={styles.featureStack} aria-label="Privacy promises">
                <Feature icon={<ShieldIcon />} label="Runs in your browser" />
                <Feature icon={<PersonIcon />} label="No sign in required" />
                <Feature icon={<CloudIcon />} label="No upload needed" />
              </ul>
            </div>

            <div className={styles.dropZone}>
              <LogoMark className={styles.dropMark} />
              <div>
                <h2>Paste an image or drop it here</h2>
                <p>Press Ctrl + V or Cmd + V</p>
              </div>
              <button className={styles.secondaryButton} type="button">
                <FolderIcon />
                Choose file
              </button>
            </div>
          </section>

          <section className={styles.exportPanel} aria-labelledby="export-title">
            <div className={styles.exportSettings}>
              <div className={styles.readyHeader}>
                <CheckIcon />
                <div>
                  <h2 id="export-title">
                    Your image is <span>ready!</span>
                  </h2>
                  <p>Choose a format, name your file, and export it instantly.</p>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <p className={styles.label}>Output format</p>
                <div className={styles.formatGrid} aria-label="Output format">
                  {["PNG", "JPG", "WebP", "SVG"].map((format) => (
                    <button
                      key={format}
                      className={`${styles.formatButton} ${
                        format === "PNG" ? styles.formatButtonActive : ""
                      }`}
                      type="button"
                      aria-pressed={format === "PNG"}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <p className={styles.label}>File name</p>
                <div className={styles.fileNameField}>
                  <span>screenshot</span>
                  <span>.png</span>
                </div>
              </div>

              <button className={styles.primaryButton} type="button">
                <DownloadIcon />
                Export Image
              </button>

              <p className={styles.note}>
                <LockIcon />
                Your image never leaves your browser.
              </p>
            </div>

            <figure className={styles.previewCard}>
              <Image
                src="/snipbop-preview.png"
                alt="Mountain lake image preview"
                width={736}
                height={472}
                priority
              />
              <figcaption>
                <span>1280 x 853</span>
                <span>1.2 MB</span>
                <button type="button">Preview</button>
              </figcaption>
            </figure>
          </section>
        </section>

        <footer id="about" className={styles.footer}>
          <div>
            <Logo compact />
            <p>The fastest way to save images from your clipboard.</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#workspace">How it works</a>
            <a href="#about">Privacy</a>
            <a href="#about">Terms</a>
            <a href="#about">Contact</a>
          </nav>
          <p className={styles.copyright}>&copy; 2026 snipbop</p>
        </footer>
      </div>
    </main>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={compact ? styles.logoCompact : styles.logo} href="#">
      <LogoMark className={styles.logoMark} />
      <span>
        Snip<span>Bop</span>
      </span>
    </a>
  );
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect className={styles.markBoard} x="15" y="14" width="34" height="42" rx="8" />
      <path className={styles.markClip} d="M25 15h2.8a4.2 4.2 0 0 1 8.4 0H39a4 4 0 0 1 4 4v3H21v-3a4 4 0 0 1 4-4Z" />
      <circle className={styles.markAccent} cx="38" cy="30" r="3.8" />
      <path className={styles.markAccent} d="M20.5 48.5 29 38l6.3 6.8 4.2-4.7 8 8.4H20.5Z" />
    </svg>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li>
      <span>{icon}</span>
      {label}
    </li>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5 19 6v5.4c0 4.5-2.9 7.5-7 9.1-4.1-1.6-7-4.6-7-9.1V6l7-2.5Z" />
      <path d="m9.2 12 1.8 1.8 3.8-4" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7.6" r="3.1" />
      <path d="M5.6 20a6.4 6.4 0 0 1 12.8 0" />
      <path d="M17.6 11.3a3.3 3.3 0 1 0 3.2 3.3" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.8 18.2h9.1a4.1 4.1 0 0 0 .5-8.2 6 6 0 0 0-11.1 1.7A3.4 3.4 0 0 0 7.8 18.2Z" />
      <path d="M9 14.2h6" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 7.8h6l1.7 2h9.3v8.7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7.8Z" />
      <path d="M3.5 7.8V6.6a2 2 0 0 1 2-2h4l1.8 2.1h7.2a2 2 0 0 1 2 2v1.1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.3 12.2 2.3 2.4 5.1-5.3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.8v11" />
      <path d="m7.4 10.4 4.6 4.6 4.6-4.6" />
      <path d="M5 18.6h14" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="10.2" width="12" height="9" rx="2" />
      <path d="M8.4 10.2V8a3.6 3.6 0 0 1 7.2 0v2.2" />
    </svg>
  );
}
