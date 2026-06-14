import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { coreSeoKeywords, siteMetadataBase, siteName } from "./seo";

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  applicationName: siteName,
  title: {
    default: "SnipBop - Save Clipboard Images as Files",
    template: `%s | ${siteName}`,
  },
  description:
    "SnipBop helps you paste image and download PNG, JPG, or WebP files locally from your browser.",
  keywords: coreSeoKeywords,
  openGraph: {
    title: "SnipBop - Save Clipboard Images as Files",
    description:
      "Paste a clipboard image into SnipBop and export it locally as PNG, JPG, or WebP.",
    url: "/",
    siteName,
    type: "website",
    images: [
      {
        url: "/snipbop-preview.png",
        width: 1200,
        height: 630,
        alt: "SnipBop clipboard image export interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnipBop - Save Clipboard Images as Files",
    description:
      "Paste a clipboard image into SnipBop and export it locally as PNG, JPG, or WebP.",
    images: ["/snipbop-preview.png"],
  },
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

const issueStateCriticalCss = `
:root {
  --snipbop-issue-ink: #16130f;
  --snipbop-issue-paper: #fbfff7;
  --snipbop-issue-acid: #d9ff43;
  --snipbop-issue-coral: #ff684c;
  --snipbop-issue-blue: #2f68ff;
  --snipbop-issue-leaf: #1aaf78;
}

.snipbop-app-shell {
  min-height: 100%;
}

html:not([data-snipbop-ui-ready="true"]) .snipbop-app-shell {
  display: none !important;
}

#snipbop-issue-state {
  display: none;
}

#snipbop-issue-state,
#snipbop-issue-state * {
  box-sizing: border-box;
}

html:not([data-snipbop-ui-ready="true"]) body {
  min-height: 100vh;
  margin: 0;
  background: #12100d;
  color: var(--snipbop-issue-paper);
  font-family: Aptos, "Avenir Next", "Trebuchet MS", "Segoe UI Variable", "Segoe UI", sans-serif;
}

html:not([data-snipbop-ui-ready="true"]) #snipbop-issue-state {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: clamp(18px, 5vw, 48px);
  overflow: hidden;
  background:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(180deg, #1a1611 0%, #12100d 58%, #15120f 100%);
  background-size: 44px 44px, 44px 44px, auto;
}

html[data-theme="light"]:not([data-snipbop-ui-ready="true"]) body {
  background: #f2f8ec;
  color: var(--snipbop-issue-ink);
}

html[data-theme="light"]:not([data-snipbop-ui-ready="true"]) #snipbop-issue-state {
  background:
    linear-gradient(rgba(33, 29, 24, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(33, 29, 24, 0.04) 1px, transparent 1px),
    linear-gradient(180deg, #fbfff7 0%, #f2f8ec 54%, #edf5e5 100%);
  background-size: 44px 44px, 44px 44px, auto;
}

.snipbop-issue-card {
  position: relative;
  width: min(100%, 760px);
  overflow: hidden;
  display: grid;
  gap: 24px;
  padding: clamp(28px, 5vw, 48px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  background:
    linear-gradient(180deg, rgba(251, 255, 247, 0.07), rgba(251, 255, 247, 0.035)),
    rgba(34, 29, 23, 0.92);
  box-shadow:
    12px 12px 0 rgba(217, 255, 67, 0.13),
    0 30px 90px rgba(0, 0, 0, 0.34);
}

.snipbop-issue-card::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 8px;
  content: "";
  background: linear-gradient(90deg, var(--snipbop-issue-acid) 0 42%, var(--snipbop-issue-coral) 42% 68%, var(--snipbop-issue-blue) 68% 100%);
}

html[data-theme="light"] .snipbop-issue-card {
  border-color: rgba(33, 29, 24, 0.22);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(251, 255, 247, 0.9)),
    #fbfff7;
  box-shadow:
    10px 10px 0 rgba(22, 19, 15, 0.1),
    0 24px 70px rgba(33, 29, 24, 0.12);
}

.snipbop-issue-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: max-content;
  color: inherit;
  font-family: "Sitka Display", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
  font-size: 1.45rem;
  font-weight: 900;
  line-height: 1;
  text-decoration: none;
}

.snipbop-issue-brand svg {
  flex: 0 0 auto;
  color: currentColor;
  filter: drop-shadow(5px 5px 0 rgba(217, 255, 67, 0.62));
}

.snipbop-issue-brand span span {
  color: var(--snipbop-issue-acid);
}

html[data-theme="light"] .snipbop-issue-brand span span {
  color: #0d8b5c;
}

.snipbop-issue-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 164px;
  gap: clamp(22px, 5vw, 44px);
  align-items: center;
}

.snipbop-issue-copy {
  display: grid;
  gap: 14px;
}

.snipbop-issue-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: max-content;
  max-width: 100%;
  min-height: 30px;
  padding: 5px 10px;
  border: 1px solid rgba(217, 255, 67, 0.42);
  border-radius: 999px;
  color: var(--snipbop-issue-acid);
  background: rgba(217, 255, 67, 0.12);
  font-size: 0.76rem;
  font-weight: 900;
  text-transform: uppercase;
}

.snipbop-issue-eyebrow::before {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  content: "";
}

.snipbop-issue-copy h1 {
  max-width: 560px;
  margin: 0;
  color: inherit;
  font-family: "Sitka Display", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
  font-size: clamp(2.7rem, 7vw, 5rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: 0;
}

.snipbop-issue-copy p {
  max-width: 560px;
  margin: 0;
  color: #d6cfbf;
  font-size: 1rem;
  line-height: 1.62;
}

html[data-theme="light"] .snipbop-issue-copy p {
  color: #5f594e;
}

.snipbop-issue-visual {
  position: relative;
  display: grid;
  place-items: center;
  width: 164px;
  height: 164px;
  border: 1px dashed rgba(217, 255, 67, 0.38);
  border-radius: 14px;
  background:
    linear-gradient(rgba(217, 255, 67, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(217, 255, 67, 0.05) 1px, transparent 1px),
    rgba(217, 255, 67, 0.06);
  background-size: 20px 20px, 20px 20px, auto;
}

.snipbop-issue-visual svg {
  color: var(--snipbop-issue-paper);
  filter: drop-shadow(8px 8px 0 rgba(217, 255, 67, 0.72));
}

html[data-theme="light"] .snipbop-issue-visual {
  border-color: rgba(33, 29, 24, 0.2);
  background:
    linear-gradient(rgba(33, 29, 24, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(33, 29, 24, 0.04) 1px, transparent 1px),
    rgba(217, 255, 67, 0.22);
}

html[data-theme="light"] .snipbop-issue-visual svg {
  color: var(--snipbop-issue-ink);
}

.snipbop-issue-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.snipbop-issue-retry,
.snipbop-issue-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font: inherit;
  font-weight: 900;
  text-decoration: none;
}

.snipbop-issue-retry {
  color: var(--snipbop-issue-ink);
  background: var(--snipbop-issue-acid);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2);
}

.snipbop-issue-link {
  color: inherit;
  background: rgba(255, 255, 255, 0.07);
}

html[data-theme="light"] .snipbop-issue-retry,
html[data-theme="light"] .snipbop-issue-link {
  border-color: rgba(33, 29, 24, 0.2);
}

html[data-theme="light"] .snipbop-issue-link {
  background: rgba(255, 255, 255, 0.7);
}

.snipbop-issue-note {
  margin: 0;
  color: #a79c8d;
  font-size: 0.88rem;
  line-height: 1.5;
}

html[data-theme="light"] .snipbop-issue-note {
  color: #80776a;
}

@media (max-width: 680px) {
  html:not([data-snipbop-ui-ready="true"]) #snipbop-issue-state {
    align-items: stretch;
    padding: 18px;
  }

  .snipbop-issue-card {
    align-content: center;
    min-height: calc(100vh - 36px);
    padding: 28px 20px;
  }

  .snipbop-issue-layout {
    grid-template-columns: 1fr;
  }

  .snipbop-issue-visual {
    order: -1;
    width: 124px;
    height: 124px;
  }

  .snipbop-issue-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .snipbop-issue-retry,
  .snipbop-issue-link {
    width: 100%;
  }
}
`;

const issueStateScript = `
(() => {
  const root = document.documentElement;
  const startedAt = Date.now();
  const states = {
    checking: {
      badge: "Connection check",
      title: "Getting SnipBop ready.",
      message:
        "The app is checking that its interface files are available. If they arrive in a moment, SnipBop will open automatically.",
      note: "This screen protects you from a broken-looking page while the app loads."
    },
    offline: {
      badge: "Offline",
      title: "SnipBop cannot load offline.",
      message:
        "Your browser cannot reach the app files right now. Reconnect to the internet, then retry.",
      note: "Images stay on your device. Nothing has been uploaded."
    },
    server: {
      badge: "Server unavailable",
      title: "SnipBop cannot reach the app server.",
      message:
        "The page started to load, but the app files are not responding. Start the local server or wait for the site to come back.",
      note: "Retry once the server is running again."
    },
    deployment: {
      badge: "Updating",
      title: "SnipBop is refreshing its app files.",
      message:
        "A deployment or build change interrupted this load. Retry in a moment to pick up the latest version.",
      note: "This usually clears as soon as the new build is ready."
    },
    timeout: {
      badge: "Timed out",
      title: "SnipBop is taking longer than usual.",
      message:
        "The connection timed out before the interface files finished loading. Retry, or check the connection if it keeps happening.",
      note: "You can leave this tab open and retry when the connection settles."
    },
    unknown: {
      badge: "Load interrupted",
      title: "SnipBop could not finish loading.",
      message:
        "Something interrupted the app files before the interface was ready. Refresh to try again.",
      note: "The app is hiding the broken layout until it can load cleanly."
    }
  };

  let issueLocked = false;
  let lastState = "unknown";

  function updateText(stateName) {
    const state = states[stateName] || states.unknown;
    lastState = stateName;
    const badge = document.getElementById("snipbop-issue-badge");
    const title = document.getElementById("snipbop-issue-title");
    const message = document.getElementById("snipbop-issue-message");
    const note = document.getElementById("snipbop-issue-note");

    if (badge) badge.textContent = state.badge;
    if (title) title.textContent = state.title;
    if (message) message.textContent = state.message;
    if (note) note.textContent = state.note;
  }

  function showIssue(stateName) {
    root.removeAttribute("data-snipbop-ui-ready");
    root.dataset.snipbopIssueState = stateName;
    updateText(stateName);
  }

  function showApp() {
    if (issueLocked) return;
    root.dataset.snipbopUiReady = "true";
    delete root.dataset.snipbopIssueState;
  }

  function nextAssetUrl(element) {
    return element.href || element.src || "";
  }

  function cssLinks() {
    return Array.from(
      document.querySelectorAll('link[rel="stylesheet"][href*="/_next/static/css/"]')
    );
  }

  function cssReady() {
    const links = cssLinks();
    if (links.length === 0) return true;

    return links.every((link) => {
      const sheet = link.sheet;
      if (!sheet) return false;

      try {
        return sheet.cssRules.length > 0;
      } catch (_) {
        return false;
      }
    });
  }

  async function classifyWithServerProbe(fallbackState) {
    if (!navigator.onLine) {
      showIssue("offline");
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 3200);

    try {
      const response = await fetch(window.location.href.split("#")[0], {
        cache: "no-store",
        method: "HEAD",
        signal: controller.signal
      });

      window.clearTimeout(timeout);

      if ([502, 503, 504].includes(response.status)) {
        showIssue("deployment");
        return;
      }

      if (!response.ok) {
        showIssue("server");
        return;
      }

      showIssue(fallbackState);
    } catch (_) {
      window.clearTimeout(timeout);
      showIssue(navigator.onLine ? "server" : "offline");
    }
  }

  function classifyIssue(reason) {
    if (!navigator.onLine) {
      issueLocked = true;
      showIssue("offline");
      return;
    }

    issueLocked = true;

    if (reason === "resource-error") {
      showIssue("deployment");
      void classifyWithServerProbe("deployment");
      return;
    }

    if (reason === "timeout") {
      showIssue("timeout");
      void classifyWithServerProbe("timeout");
      return;
    }

    showIssue("unknown");
    void classifyWithServerProbe("unknown");
  }

  function evaluate() {
    if (!navigator.onLine) {
      issueLocked = true;
      showIssue("offline");
      return;
    }

    if (cssReady()) {
      showApp();
      return;
    }

    if (Date.now() - startedAt > 2600) {
      classifyIssue("timeout");
    }
  }

  function watchAssets() {
    cssLinks().forEach((link) => {
      link.addEventListener("load", evaluate, { once: true });
      link.addEventListener(
        "error",
        () => classifyIssue("resource-error"),
        { once: true }
      );
    });

    document.addEventListener(
      "error",
      (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const url = nextAssetUrl(target);
        if (!url.includes("/_next/")) return;

        classifyIssue("resource-error");
      },
      true
    );

    window.addEventListener("offline", () => {
      issueLocked = true;
      showIssue("offline");
    });

    window.addEventListener("online", () => {
      issueLocked = false;
      updateText(lastState);
      evaluate();
    });

    const retryLink = document.getElementById("snipbop-issue-retry");
    retryLink?.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.reload();
    });
  }

  function settleWhenReady() {
    evaluate();

    if (root.dataset.snipbopUiReady === "true" || issueLocked) {
      return;
    }

    if (Date.now() - startedAt > 2600) {
      classifyIssue("timeout");
      return;
    }

    window.requestAnimationFrame(settleWhenReady);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        watchAssets();
        settleWhenReady();
      },
      { once: true }
    );
  } else {
    watchAssets();
    settleWhenReady();
  }
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
        <style dangerouslySetInnerHTML={{ __html: issueStateCriticalCss }} />
      </head>
      <body>
        <div className="snipbop-app-shell">{children}</div>
        <section
          id="snipbop-issue-state"
          aria-labelledby="snipbop-issue-title"
          aria-describedby="snipbop-issue-message"
        >
          <div className="snipbop-issue-card" role="status" aria-live="polite">
            <Link className="snipbop-issue-brand" href="/" aria-label="SnipBop home">
              <svg width="36" height="42" viewBox="0 0 48 56" fill="none" aria-hidden="true">
                <rect x="7" y="9" width="34" height="40" rx="7" stroke="currentColor" strokeWidth="4" />
                <rect x="17" y="4" width="14" height="9" rx="3" stroke="currentColor" strokeWidth="4" />
                <path d="M14 39L21 29L28 37L32 32L38 41H14Z" fill="var(--snipbop-issue-acid)" />
                <circle cx="31" cy="22" r="4" fill="var(--snipbop-issue-acid)" />
              </svg>
              <span>
                Snip<span>Bop</span>
              </span>
            </Link>

            <div className="snipbop-issue-layout">
              <div className="snipbop-issue-copy">
                <p className="snipbop-issue-eyebrow" id="snipbop-issue-badge">
                  Load interrupted
                </p>
                <h1 id="snipbop-issue-title">SnipBop could not finish loading.</h1>
                <p id="snipbop-issue-message">
                  The app files did not arrive cleanly. Retry once your connection,
                  local server, or deployment is ready.
                </p>
              </div>

              <div className="snipbop-issue-visual" aria-hidden="true">
                <svg width="92" height="108" viewBox="0 0 48 56" fill="none">
                  <rect x="7" y="9" width="34" height="40" rx="7" stroke="currentColor" strokeWidth="4" />
                  <rect x="17" y="4" width="14" height="9" rx="3" stroke="currentColor" strokeWidth="4" />
                  <path d="M14 39L21 29L28 37L32 32L38 41H14Z" fill="var(--snipbop-issue-acid)" />
                  <circle cx="31" cy="22" r="4" fill="var(--snipbop-issue-coral)" />
                </svg>
              </div>
            </div>

            <div className="snipbop-issue-actions">
              <a className="snipbop-issue-retry" id="snipbop-issue-retry" href="">
                Retry
              </a>
              <Link className="snipbop-issue-link" href="/">
                Open home
              </Link>
            </div>

            <p className="snipbop-issue-note" id="snipbop-issue-note">
              This screen hides the broken layout until SnipBop can load cleanly.
            </p>
          </div>
        </section>
        <script dangerouslySetInnerHTML={{ __html: issueStateScript }} />
      </body>
    </html>
  );
}
