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

type ImagePreview = {
  name: string;
  size: number;
  type: string;
  url: string;
};

type ImageValidationResult =
  | { ok: true; blob: Blob; name: string }
  | { ok: false; state: ClipboardState };

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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const validationRequestRef = useRef(0);

  const clearPreview = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setPreview(null);
  }, []);

  const setImagePreview = useCallback((blob: Blob, name = "Pasted image") => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const url = URL.createObjectURL(blob);
    previewUrlRef.current = url;
    setPreview({
      name,
      size: blob.size,
      type: blob.type || "image",
      url,
    });
    setClipboardState("imageFound");
  }, []);

  const showInputState = useCallback(
    (state: ClipboardState) => {
      validationRequestRef.current += 1;
      clearPreview();
      setClipboardState(state);
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

      setImagePreview(validation.blob, validation.name);
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    void handleFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    void handleFiles(event.dataTransfer.files);
  };

  const activeCopy = stateCopy[clipboardState];
  const statusTone = styles[`status_${clipboardState}`] ?? "";

  return (
    <section className={styles.tool} aria-labelledby="upload-title">
      <div
        className={`${styles.dropZone} ${preview ? styles.dropZoneReady : ""} ${
          isDragging ? styles.dropZoneDragging : ""
        }`}
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
        {preview ? (
          <div className={styles.previewShell}>
            {/* Object URLs stay in memory only for this preview and are revoked on replacement/unmount. */}
            <Image
              className={styles.previewImage}
              src={preview.url}
              alt={preview.name}
              width={420}
              height={220}
              unoptimized
            />
            <div className={styles.previewMeta}>
              <span>{activeCopy.label}</span>
              <strong>{preview.name}</strong>
              <small>
                {preview.type} - {formatBytes(preview.size)}
              </small>
            </div>
          </div>
        ) : (
          <ClipboardImageIcon className={styles.uploadIcon} aria-hidden="true" />
        )}

        <div>
          <p className={`${styles.statusPill} ${statusTone}`} role="status">
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

        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept="image/*,.heic,.heif"
          onChange={handleFileChange}
        />
      </div>

      <p className={styles.lockNote}>
        <LockIcon aria-hidden="true" />
        Your image stays on your device until you export.
      </p>
    </section>
  );
}

function formatBytes(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
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

  const canDecode = await canBrowserDecode(blob);

  if (!canDecode) {
    return {
      ok: false,
      state: isHeicOrHeif(blob, name) ? "heicUnsupported" : "unsupportedFile",
    };
  }

  return { ok: true, blob, name };
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

function canBrowserDecode(blob: Blob) {
  if (blob.size === 0) {
    return Promise.resolve(false);
  }

  const url = URL.createObjectURL(blob);

  return new Promise<boolean>((resolve) => {
    const image = new window.Image();
    let settled = false;

    const finish = (didDecode: boolean) => {
      if (settled) {
        return;
      }

      settled = true;
      URL.revokeObjectURL(url);
      resolve(didDecode);
    };

    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    image.src = url;

    if (typeof image.decode === "function") {
      image.decode().then(() => finish(true)).catch(() => finish(false));
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
