import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="home-title">
        <p className={styles.eyebrow}>SnipBop</p>
        <h1 id="home-title">A clean workspace for sharper snippets.</h1>
        <p className={styles.copy}>
          Snip once. Shape quickly. Keep the good parts moving.
        </p>
      </section>
    </main>
  );
}
