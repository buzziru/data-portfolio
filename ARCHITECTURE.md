# ARCHITECTURE

How this portfolio is structured and how it works at runtime. For *editing rules*
and content-authoring steps see `CLAUDE.md`; this document explains the *why* and
the *data/render flow*.

## 1. What it is

A **statically generated** personal portfolio (Korean-language, data-analyst).
Build output is plain HTML/CSS/JS in `dist/` — there is no server or database at
runtime. Content is data-driven so the site grows by adding files, not by editing
markup.

| Concern | Choice |
|---|---|
| Framework | Astro 5 (`output: static`) |
| Interactivity | React 19 via `@astrojs/react`, used as **islands** only |
| Content | Astro Content Collections (Markdown + YAML), Zod-validated |
| Styling | One global stylesheet, CSS custom properties (no CSS framework) |
| Hosting | Any static host (the `dist/` folder) |

## 2. Directory map

```
src/
  pages/                      # routes (file-based)
    index.astro               #   /            — landing page, composes sections
    projects/[slug].astro     #   /projects/*  — one detail page per project
  layouts/
    BaseLayout.astro          # <html>/<head>, fonts, global.css, Header/Footer, reveal script
  components/
    Header.astro Footer.astro # shared shell
    Hero/Summary/Strengths/   # static landing sections (.astro)
    Process/Skills/Timeline/Contact.astro
    ProjectsSection.tsx        # React island — filter state + grid (client:visible)
    ProjectCard.tsx            # one project card (+ Project type)  [React]
    ProjectThumb.tsx           # inline-SVG thumbnail chosen by `thumb` key [React]
  content.config.ts           # collection definitions + Zod schemas (the data contract)
  content/projects/*.md        # projects collection (1 file = 1 project)
  data/timeline.yaml           # timeline collection (이력)
  data/skills.yaml             # skills collection (기술 스택)
  styles/global.css            # entire design system
  scripts/reveal.ts            # scroll-reveal IntersectionObserver (global)
legacy/index.html             # pre-migration original, reference only (not built)
```

## 3. Rendering model (the key idea)

Astro renders **everything to static HTML at build time**. JavaScript is shipped
only for components explicitly marked with a `client:*` directive ("islands").
Everything else (all `.astro` files) produces zero client JS.

```
build time                                     ship to browser
──────────                                     ───────────────
.astro components ── render to HTML ─────────▶ HTML (no JS)
global.css ─────────────────────────────────▶ one <link>
ProjectsSection.tsx ─ render to HTML  ┐
                     + bundle as JS   ├──────▶ HTML + island JS (hydrates on view)
scripts/reveal.ts ── bundle as JS ────────────▶ small global script
```

In this project there is exactly **one island** (`ProjectsSection`, the project
filter) plus the `reveal.ts` global script. The rest is static.

## 4. Data layer — the contract

`src/content.config.ts` is the single source of truth for content shape. It defines
three collections, each with a loader (where files live) and a Zod schema (what
fields are required). **A missing/invalid field fails the build** — this is the
guardrail that keeps content edits safe.

| Collection | Loader | Source | Renders into |
|---|---|---|---|
| `projects` | `glob` | `src/content/projects/*.md` | project cards + `/projects/<slug>` pages |
| `timeline` | `file` | `src/data/timeline.yaml` | `Timeline.astro` items |
| `skills` | `file` | `src/data/skills.yaml` | `Skills.astro` groups |

- **projects**: frontmatter = card/header metadata (`title`, `status`, `order`,
  `thumb`, optional `github`/`demo`, …); the Markdown **body** = the full case
  study rendered on the detail page.
- **timeline / skills**: each YAML entry needs a unique `id` (required by the
  `file` loader) and an `order` (components sort by it).

## 5. Data flow (page composition)

```
content.config.ts (schemas)
        │ getCollection('projects' | 'timeline' | 'skills')
        ▼
┌─────────────────────────── index.astro ───────────────────────────┐
│ Hero  Summary  Strengths                                           │
│ #projects:  projects[] ──prop──▶ <ProjectsSection client:visible/> │  ← React island
│ Process                                                            │
│ Skills    ◀── getCollection('skills')   (inside Skills.astro)      │
│ Timeline  ◀── getCollection('timeline') (inside Timeline.astro)    │
│ Contact                                                            │
└────────────────────────────────────────────────────────────────────┘

projects/[slug].astro:
  getStaticPaths() ── getCollection('projects') ──▶ one route per project
  render(entry) ──▶ <Content/> (Markdown body)  +  frontmatter → header
```

Note the two patterns: the **projects** data is fetched in `index.astro` and passed
*down as a prop* into the React island (because React can't call `getCollection`
itself); **timeline/skills** are fetched *inside* their own `.astro` components
since those are server-rendered and need no client JS.

## 6. Routing

File-based, fully static:

- `src/pages/index.astro` → `/`
- `src/pages/projects/[slug].astro` → `/projects/churn`, `/projects/cnn`, … — the
  `[slug]` set is enumerated by `getStaticPaths()` from the `projects` collection,
  so adding a `.md` file adds a page with no extra wiring.

`Header.astro` nav links are **absolute** (`/#summary`, …) so the same header works
from a detail page (jumps back to the landing section). Keep nav targets and the
section `id`s in `index.astro` in sync.

## 7. Interactivity (3 pieces, minimal JS)

1. **Project filter** — `ProjectsSection.tsx`, hydrated `client:visible` (JS loads
   when the section scrolls into view). Holds `filter` state in `useState`, filters
   the `projects` prop by `status`, renders `ProjectCard`s. Cards link to their
   detail page; they deliberately do **not** use the `.reveal` class (React owns
   their `className`; a scroll-observer toggling it would fight re-renders).
2. **Scroll reveal** — `scripts/reveal.ts`, a global module loaded once by
   `BaseLayout`. An `IntersectionObserver` adds `.in` to `.reveal` elements and
   `.show` to `.sec-num` as they enter view. Pure DOM, no framework.
3. **Smooth-scroll nav** — native (`html{scroll-behavior:smooth}` + anchor links);
   no JS.

> React files use `className` (not `class`); `.astro` files use `class`.

## 8. Styling system

`src/styles/global.css` is the whole design system, imported once in `BaseLayout`.
All color/spacing tokens are CSS custom properties on `:root` (`--paper`, `--ink`,
`--accent`, …, a paper "research-notebook" palette) — **change a token, not a call
site**. Utility classes shared across components: `.wrap`/`.wrap-narrow`
(containers), `.mono`/`.serif` (font families), `.reveal` (animation hook). Section
styles are grouped by section with comment banners. Thumbnails and the hero diagram
are inline SVG (no image assets); fonts load from CDNs (Pretendard, JetBrains Mono,
Fraunces).

## 9. Conventions & gotchas

- **Adding content never touches markup** — add a project `.md`, or a `timeline`/
  `skills` YAML entry; schemas validate on build. (Steps: `CLAUDE.md`.)
- **New `thumb` key** needs a matching `case` in `ProjectThumb.tsx`, else a generic
  fallback SVG is used.
- **`order`** controls display order in all three collections (ascending).
- **Build = the test.** No unit tests; `npm run build` type-checks and validates all
  content. A green build is the correctness gate.
- **`legacy/index.html`** is reference-only and excluded from the build (it lives
  outside `src/pages`); delete it once the new site is confirmed.

## 10. Commands

```bash
npm run dev       # dev server + HMR        → http://localhost:4321
npm run build     # static build            → dist/
npm run preview   # serve the built dist/   → http://localhost:4321
```
