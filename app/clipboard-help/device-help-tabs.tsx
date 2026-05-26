"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import styles from "./page.module.css";

type DeviceGuide = {
  id: string;
  label: string;
  title: string;
  intro: string;
  steps: string[];
  fallback: string;
};

const deviceGuides: DeviceGuide[] = [
  {
    id: "windows",
    label: "Windows",
    title: "Paste clipboard images on Windows",
    intro: "Use the standard Windows copy and paste flow.",
    steps: [
      "Copy an image from a browser, app, or screenshot tool.",
      "Open the SnipBop main tool.",
      "Click the paste area.",
      "Press Ctrl+V, or select Paste from Clipboard.",
      "If your browser asks, allow clipboard access.",
    ],
    fallback: "If paste does not work, save the image and use Choose Image.",
  },
  {
    id: "mac",
    label: "Mac",
    title: "Paste clipboard images on Mac",
    intro: "Mac paste works best after the SnipBop paste area is focused.",
    steps: [
      "Copy an image from Safari, Chrome, Finder, Preview, or another app.",
      "Open the SnipBop main tool.",
      "Click the paste area.",
      "Press Command+V.",
      "Allow clipboard access if your browser requests it.",
    ],
    fallback: "If paste is unavailable, save the image and use Choose Image.",
  },
  {
    id: "linux",
    label: "Linux",
    title: "Paste clipboard images on Linux",
    intro: "Clipboard image support depends on your desktop and browser.",
    steps: [
      "Copy an image from your browser, file manager, or screenshot app.",
      "Open the SnipBop main tool.",
      "Click the paste area.",
      "Press Ctrl+V.",
      "Use Paste from Clipboard if your browser supports direct clipboard reads.",
    ],
    fallback: "If your desktop clipboard does not share the image, upload the saved file.",
  },
  {
    id: "chromeos",
    label: "ChromeOS",
    title: "Paste clipboard images on ChromeOS",
    intro: "ChromeOS works well with copied images and screenshots.",
    steps: [
      "Copy an image, or capture a screenshot and copy it to the clipboard.",
      "Open the SnipBop main tool in Chrome.",
      "Select the paste area.",
      "Press Ctrl+V.",
      "Approve clipboard access if Chrome asks.",
    ],
    fallback: "If the image is saved in Files, use Choose Image instead.",
  },
  {
    id: "iphone-ipad",
    label: "iPhone/iPad",
    title: "Paste clipboard images on iPhone and iPad",
    intro: "Mobile paste support can vary by browser and app.",
    steps: [
      "Touch and hold an image, then tap Copy when the option appears.",
      "Open the SnipBop main tool.",
      "Tap the paste area.",
      "Tap Paste in the edit menu.",
      "Confirm any paste permission prompt.",
    ],
    fallback: "If Paste is not shown, save the image and choose it from Photos or Files.",
  },
  {
    id: "android",
    label: "Android",
    title: "Paste clipboard images on Android",
    intro: "Android paste options depend on the browser, keyboard, and app.",
    steps: [
      "Copy an image from a browser or app when Copy image is available.",
      "Open the SnipBop main tool.",
      "Tap the paste area.",
      "Tap Paste from the keyboard or edit menu.",
      "Allow clipboard access if prompted.",
    ],
    fallback: "If Android does not offer Paste, save the image and use Choose Image.",
  },
];

export function DeviceHelpTabs() {
  const [activeDevice, setActiveDevice] = useState(deviceGuides[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const moveToTab = (index: number) => {
    const nextIndex = (index + deviceGuides.length) % deviceGuides.length;
    setActiveDevice(deviceGuides[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveToTab(index + 1);
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveToTab(index - 1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      moveToTab(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      moveToTab(deviceGuides.length - 1);
    }
  };

  return (
    <section
      className={styles.deviceSection}
      id="device-instructions"
      aria-labelledby="device-instructions-title"
    >
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Device instructions</p>
        <h2 id="device-instructions-title">Choose your device.</h2>
      </div>

      <div className={styles.deviceGuide}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Clipboard help by device"
        >
          {deviceGuides.map((device, index) => {
            const isActive = activeDevice === device.id;

            return (
              <button
                className={styles.tabButton}
                data-active={isActive}
                id={`tab-${device.id}`}
                key={device.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                role="tab"
                type="button"
                aria-controls={`panel-${device.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveDevice(device.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {device.label}
              </button>
            );
          })}
        </div>

        {deviceGuides.map((device) => (
          <article
            className={styles.panel}
            hidden={activeDevice !== device.id}
            id={`panel-${device.id}`}
            key={device.id}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`tab-${device.id}`}
          >
            <p className={styles.panelEyebrow}>{device.label}</p>
            <h3>{device.title}</h3>
            <p className={styles.panelIntro}>{device.intro}</p>
            <ol className={styles.stepList}>
              {device.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className={styles.fallback}>{device.fallback}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
