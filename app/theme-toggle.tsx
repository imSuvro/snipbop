"use client";

import { useEffect, useState } from "react";
import styles from "./theme-toggle.module.css";

type Theme = "light" | "dark";

const STORAGE_KEY = "snipbop-theme";

/**
 * Reads the persisted SnipBop theme preference from local storage.
 */
function getStoredTheme(): Theme | null {
  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
}

/**
 * Resolves the currently rendered system theme for first-load toggle state.
 */
function getSystemTheme(): Theme {
  const colorScheme = window.getComputedStyle(document.documentElement).colorScheme;

  if (colorScheme.includes("dark")) {
    return "dark";
  }

  if (colorScheme.includes("light")) {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Chooses the stored theme when available, otherwise the current system theme.
 */
function getActiveTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

/**
 * Applies and persists the selected theme on the document root.
 */
function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

/**
 * Renders the light/dark segmented toggle from the SnipBop header designs.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const syncTheme = () => {
      setTheme(getActiveTheme());
    };

    const handleSystemChange = () => {
      if (!getStoredTheme()) {
        syncTheme();
      }
    };

    syncTheme();
    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === "dark"}
      onClick={() => {
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
    >
      <span
        className={`${styles.option} ${
          theme === "light" ? styles.optionActive : ""
        }`}
        aria-hidden="true"
      >
        <SunIcon />
      </span>
      <span
        className={`${styles.option} ${
          theme === "dark" ? styles.optionActive : ""
        }`}
        aria-hidden="true"
      >
        <MoonIcon />
      </span>
    </button>
  );
}

/**
 * Draws the sun glyph for the light theme option.
 */
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M12 4.75V2.5" />
      <path d="M12 21.5v-2.25" />
      <path d="M4.75 12H2.5" />
      <path d="M21.5 12h-2.25" />
      <path d="m6.86 6.86-1.6-1.6" />
      <path d="m18.74 18.74-1.6-1.6" />
      <path d="m17.14 6.86 1.6-1.6" />
      <path d="m5.26 18.74 1.6-1.6" />
      <circle cx="12" cy="12" r="4.15" />
    </svg>
  );
}

/**
 * Draws the moon glyph for the dark theme option.
 */
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M20.2 14.7A7.7 7.7 0 0 1 9.3 3.8 8.7 8.7 0 1 0 20.2 14.7Z" />
    </svg>
  );
}
