"use client";

import {
  type ChangeEvent,
  type ClipboardEvent as ReactClipboardEvent,
  type DragEvent,
  type SVGProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import styles from "./page.module.css";

type ClipboardState =
  | "idle"
  | "imageFound"
  | "permissionDenied"
  | "noImage"
  | "unsupported"
  | "unsupportedFile"
  | "multipleFiles"
  | "pdfUnsupported"
  | "heicUnsupported"
  | "animatedGifUnsupported";

type OutputFormat = "png" | "jpg" | "webp" | "svg";

type ImagePreview = {
  blob: Blob;
  name: string;
  size: number;
  type: string;
  url: string;
  width: number;
  height: number;
};

type ImageValidationResult =
  | { ok: true; blob: Blob; name: string; width: number; height: number }
  | { ok: false; state: ClipboardState };

type ImageDimensions = {
  width: number;
  height: number;
};

const outputFormats: Array<{ value: OutputFormat; label: string; mimeType: string }> = [
  { value: "png", label: "PNG", mimeType: "image/png" },
  { value: "jpg", label: "JPG", mimeType: "image/jpeg" },
  { value: "webp", label: "WebP", mimeType: "image/webp" },
  { value: "svg", label: "SVG", mimeType: "image/svg+xml" },
];

const imageExtensions = new Set([
  "avif",
  "bmp",
  "gif",
  "heic",
  "heif",
  "ico",
  "jpeg",
  "jpg",
  "png",
  "svg",
  "webp",
]);

const heicMimeTypes = new Set([
  "image/heic",
  "image/heic-sequence",
  "image/heif",
  "image/heif-sequence",
]);

const stateCopy: Record<
  ClipboardState,
  { label: string; title: string; message: string }
> = {
  idle: {
    label: "Waiting for image",
    title: "Add your image",
    message: "Paste an image, choose a file, or drop one here.",
  },
  imageFound: {
    label: "Image found",
    title: "Image ready",
    message: "Preview loaded locally. Pick an export option when it is available.",
  },
  permissionDenied: {
    label: "Permission denied",
    title: "Clipboard access was blocked",
    message:
      "Allow clipboard access in your browser, then try Paste from Clipboard again.",
  },
  noImage: {
    label: "No image in clipboard",
    title: "No image found",
    message: "Copy an image first, or use Choose Image to select one from this device.",
  },
  unsupported: {
    label: "Clipboard API unsupported",
    title: "Clipboard button is unavailable",
    message:
      "This browser cannot read images from the clipboard button. Tap the paste area or choose an image instead.",
  },
  unsupportedFile: {
    label: "Unsupported file",
    title: "That file is not supported",
    message: "Choose a browser-readable image like PNG, JPG, WebP, SVG, HEIC, HEIF, or still GIF.",
  },
  multipleFiles: {
    label: "Too many files",
    title: "Choose one image at a time.",
    message: "Drop or choose a single image file.",
  },
  pdfUnsupported: {
    label: "PDF not supported",
    title: "PDFs are not supported",
    message: "Choose a PNG, JPG, WebP, SVG, HEIC, HEIF, or still GIF image.",
  },
  heicUnsupported: {
    label: "HEIC needs browser support",
    title: "This browser cannot open HEIC or HEIF",
    message:
      "HEIC and HEIF only work when your browser can decode them natively. Try another image format.",
  },
  animatedGifUnsupported: {
    label: "Animated GIF blocked",
    title: "Animated GIFs are not supported yet",
    message:
      "Animated GIF conversion is not available in this MVP. Choose a still image instead.",
  },
};

/**
 * Handles local-only image input from paste, clipboard read, file selection, and drop.
 */
export function ClipboardImageTool() {
  const [clipboardState, setClipboardState] = useState<ClipboardState>("idle");
  const [preview, setPreview] = useState<ImagePreview | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [fileName, setFileName] = useState("screenshot");
  const [isExporting, setIsExporting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [liveMessage, setLiveMessage] = useState(stateCopy.idle.message);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const validationRequestRef = useRef(0);

  const clearPreview = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setPreview(null);
    setIsExporting(false);
  }, []);

  const setImagePreview = useCallback(
    (blob: Blob, name = "Pasted image", dimensions: ImageDimensions) => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }

      const url = URL.createObjectURL(blob);
      const nextFormat = getInitialOutputFormat(blob, name);
      const nextFileName = getBaseFileName(name);
      previewUrlRef.current = url;
      setPreview({
        blob,
        name,
        size: blob.size,
        type: blob.type || "image",
        url,
        width: dimensions.width,
        height: dimensions.height,
      });
      setOutputFormat(nextFormat);
      setFileName(nextFileName);
      setClipboardState("imageFound");
      setLiveMessage(
        `Image loaded. ${formatDimensions(dimensions)}. Original file size ${formatBytes(blob.size)}.`,
      );
    },
    [],
  );

  const showInputState = useCallback(
    (state: ClipboardState) => {
      validationRequestRef.current += 1;
      clearPreview();
      setClipboardState(state);
      setLiveMessage(`${stateCopy[state].title}. ${stateCopy[state].message}`);
    },
    [clearPreview],
  );

  const handleImageBlob = useCallback(
    async (blob: Blob | null | undefined, name?: string) => {
      const requestId = validationRequestRef.current + 1;
      validationRequestRef.current = requestId;
      const validation = await validateImageBlob(blob, name);

      if (requestId !== validationRequestRef.current) {
        return;
      }

      if (!validation.ok) {
        showInputState(validation.state);
        return;
      }

      setImagePreview(validation.blob, validation.name, {
        width: validation.width,
        height: validation.height,
      });
    },
    [setImagePreview, showInputState],
  );

  const handleFiles = useCallback(
    async (files: FileList | File[] | null | undefined) => {
      const fileList = files ? Array.from(files) : [];

      if (fileList.length === 0) {
        showInputState("noImage");
        return;
      }

      if (fileList.length > 1) {
        showInputState("multipleFiles");
        return;
      }

      const [file] = fileList;
      await handleImageBlob(file, file.name);
    },
    [handleImageBlob, showInputState],
  );

  const handlePasteData = useCallback(
    (clipboardData: DataTransfer | null) => {
      if (!clipboardData) {
        showInputState("noImage");
        return;
      }

      const imageItem = Array.from(clipboardData.items).find((item) =>
        item.type.startsWith("image/"),
      );

      void handleImageBlob(imageItem?.getAsFile(), "Pasted image");
    },
    [handleImageBlob, showInputState],
  );

  const handlePaste = useCallback(
    (event: ReactClipboardEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      event.stopPropagation();
      handlePasteData(event.clipboardData);
    },
    [handlePasteData],
  );

  useEffect(() => {
    const handleWindowPaste = (event: ClipboardEvent) => {
      handlePasteData(event.clipboardData);
    };

    window.addEventListener("paste", handleWindowPaste);

    return () => {
      window.removeEventListener("paste", handleWindowPaste);

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, [handlePasteData]);

  const handleClipboardRead = async () => {
    if (!("clipboard" in navigator) || !navigator.clipboard.read) {
      showInputState("unsupported");
      return;
    }

    try {
      const clipboardItems = await navigator.clipboard.read();
      const currentItem = clipboardItems[0];

      if (!currentItem) {
        showInputState("noImage");
        return;
      }

      const imageType = currentItem.types.find((type) => type.startsWith("image/"));

      if (!imageType) {
        showInputState("noImage");
        return;
      }

      const blob = await currentItem.getType(imageType);
      await handleImageBlob(blob, "Clipboard image");
    } catch (error) {
      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError" || error.name === "SecurityError") {
          showInputState("permissionDenied");
          return;
        }

        if (error.name === "NotFoundError") {
          showInputState("noImage");
          return;
        }
      }

      showInputState("unsupported");
    }
  };

  const handleStartOver = () => {
    showInputState("idle");
  };

  const handleExport = async () => {
    if (!preview) {
      return;
    }

    setIsExporting(true);

    try {
      const exportedBlob = await createExportBlob(preview, outputFormat);
      const downloadName = `${getSafeDownloadName(fileName)}.${outputFormat}`;
      triggerBlobDownload(exportedBlob, downloadName);
      setLiveMessage(`Download started for ${downloadName}.`);
    } catch {
      setLiveMessage("Export failed. Try another format or replace the image.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    void handleFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragging(false);

    void handleFiles(event.dataTransfer.files);
  };

  const activeCopy = stateCopy[clipboardState];
  const statusTone = styles[`status_${clipboardState}`] ?? "";

  return (
    <section
      className={`${styles.tool} ${preview ? styles.toolReady : ""}`}
      aria-labelledby={preview ? "ready-title" : "upload-title"}
      onDragEnter={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragLeave={(event) => {
        const nextTarget = event.relatedTarget;

        if (
          !(nextTarget instanceof Node) ||
          !event.currentTarget.contains(nextTarget)
        ) {
          setIsDragging(false);
        }
      }}
      onDrop={handleDrop}
    >
      <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </p>

      {preview ? (
        <div className={styles.readyLayout}>
          <div
            className={`${styles.readyPreviewPanel} ${
              isDragging ? styles.readyPanelDragging : ""
            }`}
          >
            <div className={styles.readyHeader}>
              <span className={styles.readyIcon} aria-hidden="true">
                <CheckIcon />
              </span>
              <div>
                <h2 id="ready-title">
                  Your image is <span>ready!</span>
                </h2>
                <p>Preview it, choose a format, and export.</p>
              </div>
            </div>

            <figure className={styles.previewFigure}>
              {/* Object URLs stay in memory only for this preview and are revoked on replacement/unmount. */}
              <Image
                className={styles.previewImage}
                src={preview.url}
                alt={`Preview of ${preview.name}`}
                width={preview.width}
                height={preview.height}
                unoptimized
                priority
              />
              <figcaption className={styles.previewStats} aria-label="Image details">
                <span>
                  <DimensionIcon aria-hidden="true" />
                  <span className={styles.srOnly}>Dimensions</span>
                  <span>{formatDimensions(preview)}</span>
                </span>
                <span>
                  <FileIcon aria-hidden="true" />
                  <span className={styles.srOnly}>Original file size</span>
                  <span>{formatBytes(preview.size)}</span>
                </span>
              </figcaption>
            </figure>

            <div className={styles.readyActions}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon aria-hidden="true" />
                Replace image
              </button>
              <button
                className={styles.ghostButton}
                type="button"
                onClick={handleStartOver}
              >
                <RefreshIcon aria-hidden="true" />
                Start over
              </button>
            </div>

            <p className={styles.lockNote}>
              <LockIcon aria-hidden="true" />
              Your image never leaves your browser.
            </p>
          </div>

          <form
            className={styles.exportPanel}
            onSubmit={(event) => {
              event.preventDefault();
              void handleExport();
            }}
          >
            <div>
              <p className={styles.eyebrow}>Ready to export</p>
              <h3>Export settings</h3>
            </div>

            <fieldset className={styles.formatField}>
              <legend>Output format</legend>
              <div className={styles.formatOptions} role="radiogroup" aria-label="Output format">
                {outputFormats.map((format) => (
                  <button
                    className={styles.formatButton}
                    data-selected={outputFormat === format.value}
                    type="button"
                    role="radio"
                    aria-checked={outputFormat === format.value}
                    key={format.value}
                    onClick={() => setOutputFormat(format.value)}
                  >
                    {format.label}
                    {outputFormat === format.value ? <CheckSmallIcon aria-hidden="true" /> : null}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className={styles.fileNameField}>
              <span>File name</span>
              <span className={styles.fileNameControl}>
                <FileIcon aria-hidden="true" />
                <input
                  value={fileName}
                  onChange={(event) => setFileName(event.target.value)}
                  aria-label="File name without extension"
                />
                <span>.{outputFormat}</span>
              </span>
            </label>

            <p className={styles.downloadHint}>
              <ZapIcon aria-hidden="true" />
              Downloads instantly. No account needed.
            </p>

            <button className={styles.primaryButton} type="submit" disabled={isExporting}>
              <DownloadIcon aria-hidden="true" />
              {isExporting ? "Preparing..." : "Export Image"}
            </button>
          </form>
        </div>
      ) : (
        <div
          className={`${styles.dropZone} ${
            isDragging ? styles.dropZoneDragging : ""
          }`}
        >
          <ClipboardImageIcon className={styles.uploadIcon} aria-hidden="true" />

          <div>
            <p className={`${styles.statusPill} ${statusTone}`}>
              {activeCopy.label}
            </p>
            <h2 id="upload-title">{activeCopy.title}</h2>
            <p>{activeCopy.message}</p>
          </div>

          <textarea
            className={styles.mobilePasteTarget}
            aria-label="Tap here, then paste an image"
            placeholder="Tap here, then paste"
            rows={1}
            onPaste={handlePaste}
            onInput={(event) => {
              event.currentTarget.value = "";
            }}
          />

          <div className={styles.actions}>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon aria-hidden="true" />
              Choose Image
            </button>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={handleClipboardRead}
            >
              <ClipboardIcon aria-hidden="true" />
              Paste from Clipboard
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept="image/*,.heic,.heif"
        onChange={handleFileChange}
      />

      {!preview ? (
        <p className={styles.lockNote}>
          <LockIcon aria-hidden="true" />
          Your image stays on your device until you export.
        </p>
      ) : null}
    </section>
  );
}

function formatDimensions({ width, height }: ImageDimensions) {
  return `${width} x ${height}`;
}

function formatBytes(size: number) {
  if (size <= 0) {
    return "Size unknown";
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function getBaseFileName(name: string) {
  const withoutExtension = name.replace(/\.[^/.\\]+$/, "");
  const safeName = withoutExtension
    .trim()
    .replace(/[\u0000-\u001f<>:"/\\|?*]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return safeName || "screenshot";
}

function getSafeDownloadName(name: string) {
  return getBaseFileName(name) || "snipbop-image";
}

function getInitialOutputFormat(blob: Blob, name: string): OutputFormat {
  const extension = getExtension(name);

  if (blob.type === "image/jpeg" || extension === "jpg" || extension === "jpeg") {
    return "jpg";
  }

  if (blob.type === "image/webp" || extension === "webp") {
    return "webp";
  }

  if (blob.type === "image/svg+xml" || extension === "svg") {
    return "svg";
  }

  return "png";
}

async function createExportBlob(preview: ImagePreview, format: OutputFormat) {
  if (format === "svg") {
    return createSvgExportBlob(preview);
  }

  const mimeType = outputFormats.find((option) => option.value === format)?.mimeType;

  if (!mimeType) {
    throw new Error("Unsupported export format");
  }

  const image = await loadImageFromUrl(preview.url);
  const canvas = document.createElement("canvas");
  canvas.width = preview.width;
  canvas.height = preview.height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas export is unavailable");
  }

  if (format === "jpg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Export failed"));
          return;
        }

        resolve(blob);
      },
      mimeType,
      0.92,
    );
  });
}

async function createSvgExportBlob(preview: ImagePreview) {
  if (preview.type === "image/svg+xml" || getExtension(preview.name) === "svg") {
    return preview.blob;
  }

  const dataUrl = await readBlobAsDataUrl(preview.blob);
  const svgMarkup = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${preview.width}" height="${preview.height}" viewBox="0 0 ${preview.width} ${preview.height}">`,
    `<image href="${escapeAttribute(dataUrl)}" width="${preview.width}" height="${preview.height}" preserveAspectRatio="xMidYMid meet"/>`,
    "</svg>",
  ].join("");

  return new Blob([svgMarkup], { type: "image/svg+xml" });
}

function loadImageFromUrl(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image could not be loaded"));
    image.src = url;

    if (typeof image.decode === "function") {
      image.decode().then(() => resolve(image)).catch(reject);
    }
  });
}

function readBlobAsDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Could not read image data"));
    };
    reader.onerror = () => reject(new Error("Could not read image data"));
    reader.readAsDataURL(blob);
  });
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function triggerBlobDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

async function validateImageBlob(
  blob: Blob | null | undefined,
  name = "Image",
): Promise<ImageValidationResult> {
  if (!blob) {
    return { ok: false, state: "noImage" };
  }

  if (isPdf(blob, name)) {
    return { ok: false, state: "pdfUnsupported" };
  }

  if (!isImageLike(blob, name)) {
    return { ok: false, state: "unsupportedFile" };
  }

  if (isGif(blob, name) && (await isAnimatedGif(blob))) {
    return { ok: false, state: "animatedGifUnsupported" };
  }

  const dimensions = await getImageDimensions(blob);

  if (!dimensions) {
    return {
      ok: false,
      state: isHeicOrHeif(blob, name) ? "heicUnsupported" : "unsupportedFile",
    };
  }

  return { ok: true, blob, name, ...dimensions };
}

function getExtension(name: string) {
  const match = /\.([^.]+)$/.exec(name);
  return match?.[1]?.toLowerCase() ?? "";
}

function isPdf(blob: Blob, name: string) {
  return blob.type === "application/pdf" || getExtension(name) === "pdf";
}

function isImageLike(blob: Blob, name: string) {
  const extension = getExtension(name);
  return blob.type.startsWith("image/") || imageExtensions.has(extension);
}

function isGif(blob: Blob, name: string) {
  return blob.type === "image/gif" || getExtension(name) === "gif";
}

function isHeicOrHeif(blob: Blob, name: string) {
  const extension = getExtension(name);
  return (
    heicMimeTypes.has(blob.type) ||
    extension === "heic" ||
    extension === "heif"
  );
}

function getImageDimensions(blob: Blob): Promise<ImageDimensions | null> {
  if (blob.size === 0) {
    return Promise.resolve(null);
  }

  const url = URL.createObjectURL(blob);

  return new Promise<ImageDimensions | null>((resolve) => {
    const image = new window.Image();
    let settled = false;

    const finish = (dimensions: ImageDimensions | null) => {
      if (settled) {
        return;
      }

      settled = true;
      URL.revokeObjectURL(url);
      resolve(dimensions);
    };

    const getDimensions = () => ({
      width: Math.max(1, image.naturalWidth || image.width || 1),
      height: Math.max(1, image.naturalHeight || image.height || 1),
    });

    image.onload = () => finish(getDimensions());
    image.onerror = () => finish(null);
    image.src = url;

    if (typeof image.decode === "function") {
      image.decode().then(() => finish(getDimensions())).catch(() => finish(null));
    }
  });
}

async function isAnimatedGif(blob: Blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());

  if (bytes.length < 13 || !isGifHeader(bytes)) {
    return false;
  }

  let offset = 13;
  const packedField = bytes[10];

  if (packedField & 0x80) {
    offset += 3 * 2 ** ((packedField & 0x07) + 1);
  }

  let frameCount = 0;

  const skipSubBlocks = () => {
    while (offset < bytes.length) {
      const blockSize = bytes[offset];
      offset += 1;

      if (blockSize === 0) {
        return true;
      }

      offset += blockSize;
    }

    return false;
  };

  while (offset < bytes.length) {
    const blockType = bytes[offset];
    offset += 1;

    if (blockType === 0x3b) {
      return false;
    }

    if (blockType === 0x21) {
      offset += 1;

      if (!skipSubBlocks()) {
        return false;
      }

      continue;
    }

    if (blockType !== 0x2c) {
      return false;
    }

    frameCount += 1;

    if (frameCount > 1) {
      return true;
    }

    if (offset + 9 > bytes.length) {
      return false;
    }

    offset += 9;
    const imagePackedField = bytes[offset - 1];

    if (imagePackedField & 0x80) {
      offset += 3 * 2 ** ((imagePackedField & 0x07) + 1);
    }

    offset += 1;

    if (!skipSubBlocks()) {
      return false;
    }
  }

  return false;
}

function isGifHeader(bytes: Uint8Array) {
  return (
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38 &&
    (bytes[4] === 0x37 || bytes[4] === 0x39) &&
    bytes[5] === 0x61
  );
}

function ClipboardImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" {...props}>
      <rect x="34" y="34" width="52" height="58" rx="10" stroke="currentColor" strokeWidth="8" />
      <rect x="49" y="24" width="22" height="15" rx="5" fill="currentColor" />
      <path d="M42 79L54 63L66 78L72 71L83 86H42Z" fill="var(--color-accent)" />
      <circle cx="57" cy="53" r="5" fill="var(--color-accent)" />
      <path d="M90 31L101 20" stroke="var(--color-accent)" strokeWidth="5" strokeLinecap="round" />
      <path d="M95 42H108" stroke="var(--color-accent)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function ImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5.5 17L10 12L13 15L15 13L19 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ClipboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 5H7.5A2.5 2.5 0 0 0 5 7.5V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5A2.5 2.5 0 0 0 16.5 5H15" stroke="currentColor" strokeWidth="2" />
      <rect x="9" y="3" width="6" height="4" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10V8A4 4 0 0 1 16 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M7.8 12.2L10.5 14.8L16.2 8.9" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckSmallIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <circle cx="9" cy="9" r="8" fill="currentColor" opacity="0.16" />
      <path d="M5.4 9.1L8 11.6L12.9 6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DimensionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 17L17 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 4H17V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 7V17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 3H14L19 8V21H7A2 2 0 0 1 5 19V5A2 2 0 0 1 7 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 3V8H19" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 13H15M9 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M20 12A8 8 0 1 1 17.7 6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 3V7H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ZapIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M13 2L4 14H11L10 22L20 9H13L13 2Z" fill="currentColor" />
    </svg>
  );
}

function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 4V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 20H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
