# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A Korean-language portfolio site for a junior data analyst, built with **Astro 5 + React**. It was migrated from a single `index.html` (preserved at `legacy/index.html` as the visual reference) into a component-based, data-driven structure. The landing page is one long scroll of seven numbered sections; each project also has its own static detail page. Output is a fully static site (no server).

## Commands

```bash
npm run dev       # dev server with HMR at http://localhost:4321
npm run build     # static build → dist/
npm run preview   # serve the production build at http://localhost:4321
```

There is no test suite or separate lint step; `astro build` type-checks `.astro`/`.ts(x)` and validates content-collection frontmatter against the Zod schema, so a clean build is the verification gate. Fonts load from CDNs (Pretendard, JetBrains Mono, Fraunces) — previewing needs a network connection for correct typography.

## Design System

This site follows the **Linear design language** documented in `source/DESIGN-linear.app.md`. All visual decisions must conform to these principles:

- **Canvas**: `#010102` — near-pure black as the base surface. Never use `#000000`.
- **Surface ladder**: `#0f1011` → `#141516` → `#18191a` for cards, panels, lifted tiles. Never skip levels.
- **Accent**: `#5e6ad2` lavender-blue — used only for brand mark, primary CTA, focus rings, link emphasis. Never as a section background or decorative fill. Hover: `#828fff`.
- **Hairline borders**: `#23252a` (1px) for cards and dividers. `#34343a` for stronger borders.
- **Text**: `#f7f8f8` (primary) · `#d0d6e0` (muted) · `#8a8f98` (subtle) · `#62666d` (tertiary).
- **Typography**: negative letter-spacing on display type (−0.035em at heading sizes); body at weight 400; display/heading at weight 500–600. Never 700+ on display.
- **No atmospheric gradients, no spotlight cards, no second chromatic accent.**
- **Border radius**: buttons `8px`, cards `12px`, screenshot panels `16px`, pills `9999px`.
- **Depth via surface lift + hairline border** — not drop shadows.

Token map (CSS custom properties → Linear spec):

| CSS var | Value | Linear token |
|---|---|---|
| `--bg` | `#010102` | canvas |
| `--bg-surface` | `#0f1011` | surface-1 |
| `--bg-elevated` | `#141516` | surface-2 |
| `--bg-deep` | `#18191a` | surface-3 |
| `--border` | `#23252a` | hairline |
| `--border-mid` | `#34343a` | hairline-strong |
| `--fg` | `#f7f8f8` | ink |
| `--fg-2` | `#d0d6e0` | ink-muted |
| `--fg-muted` | `#8a8f98` | ink-subtle |
| `--accent` | `#5e6ad2` | primary |
| `--accent-light` | `#828fff` | primary-hover |

## Architecture

- **Design system** — All theming lives in `src/styles/global.css` via `:root` custom properties. Change tokens there, never at call sites. Recurring utility classes: `.wrap`/`.wrap-narrow` (containers), `.mono`/`.serif` (fonts), `.reveal` (scroll-in hook).

- **Layout & shell** — `src/layouts/BaseLayout.astro` owns `<html>`/`<head>` (fonts, meta, `global.css` import), renders shared `Header`/`Footer`, and loads the `reveal.ts` scroll script. Every page wraps its content in `BaseLayout` and may pass `title`/`description` props. `Header.astro` nav links are absolute (`/#summary`) so they work from detail pages too — keep nav links and the section `id`s in `index.astro` in sync.

- **Landing page** — `src/pages/index.astro` composes the section components (`Hero`, `Summary`, `Strengths`, `Process`, `Skills`, `Timeline`, `Contact`) and the projects section. It loads projects via `getCollection('projects')`, sorts by `order`, and passes them to the `ProjectsSection` island.

- **Data-driven content (3 collections)** — All editable content lives in collections defined in `src/content.config.ts` (Zod-validated, so a bad/missing field fails the build):
  - `projects` — `glob` loader over `src/content/projects/*.md` (one file per project).
  - `timeline` — `file` loader over `src/data/timeline.yaml` (이력/학습 로그; `Timeline.astro` reads it via `getCollection`, sorts by `order`).
  - `skills` — `file` loader over `src/data/skills.yaml` (기술 스택 그룹; `Skills.astro` reads it, sorts by `order`).
  - `Process`, `Strengths`, the `Summary` profile, and `Hero`/`Contact` copy are still literal markup in their components (edit the `.astro` file directly).

- **Projects** — **Frontmatter** drives the card and the detail-page header; the **Markdown body** is the full case study (Problem / Data / Approach / … as `##` headings). The slug = filename (`churn.md` → `/projects/churn`).

- **Projects island** — `ProjectsSection.tsx` (`client:visible`) renders the filter toolbar + grid and holds the filter state (`all`/`completed`/`progress`/`planned`, matched against each project's `status`). `ProjectCard.tsx` renders one card and links to `/projects/<slug>` plus optional GitHub/Demo. `ProjectThumb.tsx` returns the per-project inline-SVG thumbnail selected by the `thumb` key (unknown keys fall back to a generic chart). **React files use `className`, not `class`.** Cards intentionally do not use `.reveal` (React owns their className; an IntersectionObserver toggle would fight re-renders).

- **Detail pages** — `src/pages/projects/[slug].astro` uses `getStaticPaths()` over the collection; renders frontmatter into the header (`.detail-*` styles) and the body via `await render(entry)` → `<Content />`.

## Adding / editing content

- **New project** — create `src/content/projects/<slug>.md` with the frontmatter from `content.config.ts` (`title`, `status`, `order`, `summary`, `domain`, `role`, `methods[]`, `tools[]`, `keyMetric`, `thumb`, optional `github`/`demo`) and write the case study as the Markdown body. The card and `/projects/<slug>` page are generated automatically. For a brand-new `thumb` key, add a matching `case` in `ProjectThumb.tsx` (otherwise the generic fallback SVG is used). The existing 5 files are dummy samples to be replaced with real projects.
- **이력 (timeline)** — edit `src/data/timeline.yaml`: copy a block, give it a unique `id` and an `order` (ascending = top→bottom). Set `state: current` on the in-progress item only; omit it on the rest.
- **기술 스택 (skills)** — edit `src/data/skills.yaml`: groups and their `pills`. Each pill's `level` must be `using` | `learning` | `next` (drives the pill style + legend).
- Schemas validate on build, so a typo or missing field is caught by `npm run build` (or live in `npm run dev`).

## Editing notes

- Content is Korean; preserve language and tone.
- **Korean line breaking** — never let an 어절(word) split mid-character. The site sets `word-break:keep-all` globally on `body` (`global.css`), so in-site content breaks only at spaces; keep that. For multi-clause copy (안내 문구 등), break at meaning-unit boundaries (절·문장 단위) with an explicit `<br>` rather than relying on reflow — e.g. a sentence describing one action stays on one line. Standalone embedded pages (HF demo iframes) don't inherit `global.css`, so set `word-break:keep-all` on their text elements explicitly.
- Placeholders to replace before real deployment: the resume link points to `/resume.pdf` (add the PDF to `public/`); `https://github.com` links, `hello@example.com`, and the `OO대학교 OO학과` timeline entry are stubs; the dummy projects' `github` values are placeholders.
- Version/date strings (`v0.3`, `last update 2024.11`) live in `Header.astro`, `Contact.astro`, `Footer.astro`, and the project-count text in `ProjectsSection.tsx` — update them together.
- `legacy/index.html` is the pre-migration reference only; it is not part of the build. Delete it once the new site is confirmed.
