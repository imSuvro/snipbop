**SnipBop**

**Product Direction and Real Life Problem Map**

A steering document for repositioning SnipBop from a clipboard saver into a no-login image export workbench.

Draft v0.1 | 2026-06-14

| Core thesis Operating systems already handle capture. SnipBop should own the painful next step: turning messy screenshots and copied images into clean, renamed, compressed, share-ready files. |
| :---- |

| Old narrow idea | Better product direction |
| :---- | :---- |
| Save a clipboard screenshot as a file. | Paste, drop, or upload images. Rename, convert, compress, resize, and download locally. |
| Mainly useful right after taking a screenshot. | Useful whenever an image needs to become a clean file for tickets, forms, chats, emails, websites, or documents. |
| Clipboard is the whole product. | Clipboard is the fastest input. File upload and drag-drop are equal first-class paths. |

**PRODUCT STRATEGY**

# **1\. Executive summary**

SnipBop should not be positioned as only a clipboard screenshot saver. That framing is fragile because Windows, macOS, phones, browsers, and many screenshot tools already save captured images somewhere. The stronger problem begins after capture: screenshots are badly named, formats are inconsistent, sizes are too large, and users need to send or upload them quickly.

The product should become a small, fast, local image export workbench. The promise is simple: paste, drop, or upload an image, then rename, convert, compress, resize, and download it without account friction or server upload.

The best initial audience is people who handle screenshots as part of work: developers, QA, support, product managers, operations teams, students, freelancers, and anyone who repeatedly prepares images for tickets, forms, chats, emails, and documentation.

| Recommended one-line positioning SnipBop turns screenshots and copied images into clean, compressed, renamed files in seconds. Paste, drop, convert, and download. No login. No upload. |
| :---- |

**CURRENT STATE**

# **2\. What is built today**

The current remote repository shows a lightweight Next.js application using React, TypeScript, ESLint, and the App Router. The README also states that the initial setup intentionally has no authentication layer and no backend service. That is a good match for the local, privacy-first utility angle.

| Area | Current state | Product meaning |
| :---- | :---- | :---- |
| Stack | Next.js, React, TypeScript, ESLint, App Router. | Good for a fast static or mostly client-side utility. |
| Auth and backend | No auth layer and no backend service in the initial setup. | Supports the no-login and no-upload trust promise. |
| Input methods | Paste, clipboard read, file choose, and drag-drop are already represented in the tool code. | Clipboard should remain magic, but upload and drop make the app useful even when screenshots are already files. |
| Export formats | PNG, JPG, and WebP are already modeled as output formats. | Covers the most common web and form submission needs. |
| Quality controls | Small, Balanced, and Best presets exist for JPG and WebP. | This can become the main compression experience. |
| File naming | The tool has a file name field and safe download name handling. | This is one of the strongest real-world problems to lean into. |
| Privacy messaging | Browser-only, no account, and no upload trust badges exist. | This should become a central differentiator, not a footnote. |
| SEO base | Metadata and FAQ JSON-LD helpers exist. | The project is ready for SEO expansion once the positioning is clearer. |

| Recent Codex fix note Codex reported that the ugly issue-state screenshots were caused by CSS chunks being unavailable while app HTML still loaded. The reported fix adds a themed fallback for asset/offline/deployment states. However, a first-ever visit when the server does not respond still needs a service worker or pre-cached offline shell to avoid the browser native network error. |
| :---- |

**PROBLEM FRAMING**

# **3\. The real problem SnipBop should solve**

The app should own the post-capture pipeline. In backend terms, the screenshot tool is only the producer. SnipBop should be the processing pipeline that normalizes the image, gives it a useful name, converts it to the right format, reduces payload size, and exports it cleanly.

| Pain | Why it happens | How SnipBop should solve it |
| :---- | :---- | :---- |
| Screenshots are hard to identify later | Default names like Screenshot (1), Screenshot (2), and image timestamps do not describe the content. | Let users rename files at export time, with smart suggestions and batch naming patterns. |
| File format does not match the destination | Portals, email clients, websites, and tools accept different formats. | Convert to PNG, JPG, WebP, and later AVIF or PDF where useful. |
| Image is too large | Screenshots from modern screens are often several MB. | Show before and after size, quality presets, and target size controls like under 500 KB. |
| Users do not want another account | Tiny utility tasks feel painful when they require login, onboarding, or upload. | Keep the core flow local, instant, and anonymous. |
| Privacy anxiety | Screenshots often contain patient data, financial info, internal dashboards, or personal chats. | Make local-only processing visible and credible. |
| Too many tools for one small job | People switch between Paint, Photos, Preview, TinyPNG, Photoshop, Canva, or browser extensions. | Provide one tiny workflow: input image, set name and output, download. |
| Sharing channels punish large files | Slack, Jira, email, forms, and CMS systems have size and format constraints. | Prepare share-ready images before upload. |
| Saved screenshots create folder clutter | Screenshots are stored in a folder, then users manually open, inspect, rename, and move them. | Let users drag/drop multiple saved screenshots and export cleanly as a named set or zip. |

**USE CASE MAP**

# **4\. Real-life use cases**

| Use case | What happens in real life |
| :---- | :---- |
| Bug report screenshots | A developer or QA tester takes multiple screenshots of a broken flow, then needs to rename them like login-error-step-1, login-error-step-2, and attach them to Jira or GitHub. |
| Support evidence cleanup | A support person receives screenshots from a user, converts them to smaller JPG or WebP files, and gives them clear names before adding them to a case. |
| Form upload constraints | A user needs an image under 500 KB or in JPG format for an application, job portal, school portal, government form, or company system. |
| Documentation images | An engineer, PM, or operations person needs clean screenshots for a SOP, release note, internal wiki, or stakeholder update. |
| Healthcare or sensitive screenshots | A user has images that may include sensitive data and does not want to upload them to a third-party compressor or converter. |
| Before and after UI proof | A frontend engineer wants to collect screenshots before and after a change, name them consistently, and send them as a clean zip. |
| Chat and email sharing | A user wants to reduce screenshot size before sending it in WhatsApp, Slack, Teams, Gmail, or a support ticket. |
| Web asset preparation | A small site owner or developer needs to convert PNG screenshots into WebP for faster web pages. |
| Invoice and receipt cleanup | A freelancer or employee captures receipts and needs clean, named image files before submitting reimbursement proof. |
| Student assignment images | A student captures diagrams, notes, or app screenshots and needs compressed JPG files for LMS upload. |
| Portfolio or case study assets | A product builder wants clean screenshots for a case study, README, landing page, or LinkedIn post. |
| Mobile to desktop handoff | A user saves screenshots on phone or sends them to desktop, then drops them into SnipBop for clean export. |
| Clipboard to file after copy image | A user copies an image from a browser, design tool, chat app, or document and wants a real file without opening a heavy editor. |
| Multiple screenshots from one investigation | A QA tester collects a sequence of screenshots and needs batch numbering, ordering, and zip export. |
| Image compatibility fix | A downloaded WebP or HEIC image does not work in another app, so the user converts it to JPG or PNG where supported by the browser. |

**AUDIENCE**

# **5\. Personas and jobs to be done**

| Persona | Job to be done | Feature promise |
| :---- | :---- | :---- |
| Developer | Prepare screenshots for PRs, bug reports, README files, and Slack threads. | Fast paste/drop, naming, WebP/JPG export, zip. |
| QA tester | Turn a sequence of screenshots into clear proof for defect tickets. | Batch queue, reorder, auto-number names, download all. |
| Support specialist | Compress and rename evidence before adding it to a customer case. | Under-size target, safe names, privacy messaging. |
| Product manager | Attach clean visuals to specs, release notes, and stakeholder updates. | Simple image queue and descriptive file names. |
| Operations/admin user | Prepare images for forms, portals, and internal systems. | Convert to JPG/PNG, resize, target size. |
| Student | Submit screenshots or diagrams within upload limits. | Simple upload, compression, no login. |
| Freelancer | Clean up receipts, proof screenshots, client docs, and portfolio images. | Rename, compress, zip, local-only. |
| Creator or marketer | Prepare lightweight images for posts or websites. | WebP conversion, resize presets, before/after size. |

## **Core job statements**

* When I take several screenshots, I want to name and export them clearly so I can find and share them later.  
* When a portal rejects my image, I want to quickly convert or compress it so I can finish the task.  
* When I handle sensitive screenshots, I want to process them locally so I do not have to trust another upload service.  
* When I need images for a ticket or document, I want a fast queue that makes them organized and share-ready.  
* When I copy an image from anywhere, I want to turn it into a real file without opening a heavy editor.

**CONSTRAINTS**

# **6\. Limitations to document honestly**

This product can be strong because it is honest about browser limits. Do not hide limitations. Explain them in friendly language and always provide a fallback path.

| Limitation | User-facing explanation | Product response |
| :---- | :---- | :---- |
| Clipboard permissions vary | Some browsers require a user action or permission before reading clipboard images. | Offer paste area, Paste from Clipboard button, Choose Image, and clear help. |
| Cannot silently read screenshot folders | Web apps cannot just scan a user file system folder without permission. | Make drag-drop and file picker first-class. Later consider File System Access API as an optional advanced path. |
| First visit with no server shows browser error | If no app HTML loads at all, the browser controls the page. | Add service worker and pre-cached offline shell later if PWA direction matters. |
| HEIC and HEIF depend on browser decoding | If the browser cannot decode the source image, SnipBop cannot process it locally without adding a decoder. | Show a specific unsupported state. Later add WASM decoder if demand exists. |
| Animated GIF is not an MVP target | A canvas export can flatten or lose animation. | Block animated GIF or treat it as advanced future work. |
| SVG and PDF are not normal raster images | They need different parsing and rendering behavior. | Keep out of MVP unless a dedicated converter is added. |
| Very large files can hurt memory | Browser canvas processing uses device memory. | Add size warnings and safe maximums. |
| No cloud history | Local-only means SnipBop does not remember previous exports. | This is a feature for privacy. Later add optional local history using IndexedDB if useful. |

**PRODUCT SHAPE**

# **7\. Feature implications**

## **The app should feel like a pipeline**

1. Input: paste, drop, upload, or later folder access with permission.  
2. Queue: show one or many images with preview, file size, dimensions, and source name.  
3. Naming: edit names manually, use prefix, suffix, numbering, and slug cleanup.  
4. Transform: choose format, quality, target size, resize, and later crop.  
5. Export: download one file, download all, or download zip.

## **MVP plus direction**

| Priority | Feature | Why it matters |
| :---- | :---- | :---- |
| P0 | Preserve current single-image paste/drop/upload/export flow. | Do not break what already works. |
| P0 | Reposition homepage copy around paste/drop/upload and post-capture cleanup. | Fixes the narrow clipboard-only story. |
| P0 | Make file naming the hero of the product. | This is the clearest pain from real screenshot workflows. |
| P1 | Batch image queue. | Turns the app from nice utility into real productivity tool. |
| P1 | Download all as zip. | Key for QA, support, docs, and multi-screenshot workflows. |
| P1 | Before and after size display. | Makes compression value obvious. |
| P1 | Target size control. | Solves concrete portal limits like under 500 KB or under 2 MB. |
| P2 | Resize by width, height, percentage, or max dimension. | Useful for portals, websites, documentation, and email. |
| P2 | Smart name suggestions. | Can infer from date, page title, selected preset, or user prefix. |
| P2 | Local history using IndexedDB. | Optional convenience without server account. |
| P3 | PWA offline shell. | Improves trust and handles first-load offline behavior better. |
| P3 | Advanced formats and decoders. | Only if SEO or user demand proves it. |

**EXPERIENCE**

# **8\. UI and UX revamp direction**

The current UI should evolve from a landing page with a tool into a focused workbench. The first screen should make the core action obvious in less than five seconds.

| Area | Recommendation |
| :---- | :---- |
| Hero message | Paste, drop, or upload images. Rename, convert, compress, and download locally. |
| Primary surface | Large calm drop/paste zone with a clear file picker button and keyboard paste guidance. |
| Ready state | Split layout: preview on one side, export settings on the other. |
| Batch state | Queue rail with thumbnails, names, output format, size, and reorder/remove controls. |
| Trust signals | Browser-only, no upload, no account, and local processing should be visible near the workbench. |
| Empty states | Teach the user exactly what to do next. No generic blank panels. |
| Failure states | Explain no image, blocked clipboard, unsupported file, too large file, and offline states in plain language. |
| Mobile | File picker and saved images matter more than clipboard button. Do not make mobile feel broken because paste is inconsistent. |

| Design guardrail SnipBop should not feel like a SaaS dashboard. It should feel like a tiny, polished workbench: one obvious task, calm surface, clear controls, instant result. |
| :---- |

**GROWTH**

# **9\. SEO and content direction**

The current SEO targets clipboard image phrases. Keep those, but broaden the content strategy around real jobs people search for when they are stuck with a screenshot or image file.

| Search intent | Example target phrases | Suggested page or section |
| :---- | :---- | :---- |
| Clipboard to file | save clipboard image as file, paste image and download, download clipboard image | Homepage and clipboard help. |
| Screenshot cleanup | rename screenshot online, organize screenshots, screenshot file namer | Screenshot renamer page. |
| Compression | compress screenshot online, reduce screenshot size, image under 500kb | Compress image page. |
| Format conversion | convert screenshot to jpg, convert png to webp, webp to jpg no upload | Format-specific converter pages. |
| Privacy | image converter no upload, local image converter, private image compressor | Privacy-first section and comparison content. |
| Forms and portals | resize image for upload, make image smaller for form, jpg under 1mb | Target-size workflow page. |
| Developer workflows | compress images for GitHub, screenshots for Jira, bug report screenshot tool | Use-case landing sections. |

## **Content principles**

* Write for people with an immediate task, not for people casually browsing tools.  
* Every SEO page should lead into the same core workbench with the right preset selected.  
* Avoid claiming universal clipboard support. Explain browser differences and offer upload/drop fallbacks.  
* Use privacy as a differentiator only if the implementation stays local by default.  
* Use before/after file size as product proof on compression pages.

**EXECUTION PLAN**

# **10\. Suggested roadmap**

| Phase | Goal | Concrete work |
| :---- | :---- | :---- |
| Phase 0: stabilize | Lock the current useful flow and avoid regressions. | Review Codex issue-state fix, commit it safely, run lint/build, verify screenshots, push. |
| Phase 1: reposition | Change the product story from clipboard-only to image export workbench. | Update hero, metadata, README, FAQ, help page, privacy page, and core CTA copy. |
| Phase 2: workbench UI | Make the tool the product, not a small widget inside a marketing page. | Revamp first screen, ready state, error states, mobile flow, and local trust messaging. |
| Phase 3: batch value | Solve the real multi-screenshot pain. | Add queue, batch rename, per-image settings, and zip export. |
| Phase 4: compression power | Turn size reduction into a measurable feature. | Add before/after size, target KB/MB, resize controls, and smarter quality presets. |
| Phase 5: SEO expansion | Capture focused search intent pages. | Create pages for compression, conversion, screenshot renaming, privacy, and target-size workflows. |
| Phase 6: polish and retention | Make it feel sticky without accounts. | Add local history, recent presets, keyboard shortcuts, and optional PWA shell. |

**IMPLEMENTATION HANDOFF**

# **11\. Codex prompts for the next round**

## **Prompt 1: product repositioning audit**

**Use before UI revamp:**

$frontend-design $webapp-testing $playwright-interactive

We are repositioning SnipBop from a clipboard-only saver into a local image export workbench.

Before coding, audit the current repo and list all places where the product is still described too narrowly as only saving clipboard images.

New product direction:  
Paste, drop, or upload images. Rename, convert, compress, resize, and download locally. No login. No upload.

Do not modify code until you return:  
1\. current copy and SEO issues  
2\. files that need changes  
3\. proposed new page hierarchy  
4\. risk areas where existing behavior may break

## **Prompt 2: UI workbench revamp**

$frontend-design $theme-factory $playwright-interactive $webapp-testing

Revamp SnipBop as a dark-first, no-login image export workbench.

The first screen must communicate:  
1\. paste, drop, or upload an image  
2\. rename it  
3\. convert/compress it  
4\. download locally

Keep current working behavior. Improve the UX around it.

Required screens and states:  
\- empty input state  
\- image ready state  
\- export success  
\- clipboard blocked  
\- no image found  
\- unsupported file  
\- mobile upload/paste fallback

Use Playwright screenshots for desktop and mobile. Do not stop at build passing. Iterate until the visual result feels intentional.

**REFERENCES**

# **12\. Source notes used for this document**

* Repository README: current stack, local development scripts, no auth layer, no backend service, SEO environment notes.  
* Repository app/page.tsx: homepage copy, metadata, trust badges, FAQ, and current positioning around saving clipboard images.  
* Repository app/clipboard-image-tool.tsx: paste, clipboard read, file selection, drag-drop, local preview, output formats, quality presets, safe filename handling, validation, and canvas export.  
* Repository app/seo.ts: site metadata helpers, core SEO phrases, FAQ JSON-LD helper, Open Graph metadata.  
* MDN Clipboard API: clipboard reads need secure contexts and can require user activation or browser permission.  
* MDN File API: web apps can ask users to select files using file input or drag and drop, and multiple files can be selected with the multiple attribute.  
* MDN Image format guide: WebP offers strong compression and broad modern browser support, while PNG/JPEG remain important compatibility formats.  
* MDN offline event: browsers fire an offline event when network access is lost and navigator.onLine changes to false.

**CHECKLIST**

# **Appendix: Decision checklist before revamp**

* **Commit safety:** Verify the issue-state fallback locally, commit it, and push only after normal flow still passes.  
* **Positioning:** Stop leading only with clipboard. Lead with paste, drop, upload, rename, convert, compress, download.  
* **MVP boundary:** Do not become a full photo editor. Own the export pipeline.  
* **Privacy:** Keep core processing local. Make this visible and truthful.  
* **SEO:** Create pages around real user tasks, not only generic converter keywords.  
* **Batch:** Prioritize batch queue and zip after single image flow is stable. This creates a real productivity wedge.

Document prepared from the current public GitHub repository state, the latest Codex investigation summary provided by Suvro, and public web platform documentation.