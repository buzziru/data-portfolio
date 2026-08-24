# ARCHITECTURE

How this portfolio is structured and how it works at runtime. For *editing rules*
and content-authoring steps see `CLAUDE.md`; for the visual language see
`DESIGN-instrument.md`. This document explains the *why* and the *data/render flow*.

## 1. What it is

A **statically generated** personal portfolio (Korean-language, data-analyst).
Build output is plain HTML/CSS/JS in `dist/` — there is no server or database at
runtime. Content is data-driven so the site grows by adding files, not by editing
markup.

| Concern | Choice |
|---|---|
| Framework | Astro 5 (static output) |
| Interactivity | Two small vanilla-TS modules. **No framework islands** — see §3 |
| React | `@astrojs/react`, used **only as a build-time template** for one `.tsx` file |
| Content | Astro Content Collections (Markdown + YAML), Zod-validated |
| Styling | One global stylesheet, CSS custom properties (no CSS framework) |
| Fonts | Self-hosted (`pretendard`, `@fontsource/ibm-plex-*`) — no CDN at runtime |
| Hosting | Any static host (the `dist/` folder); currently Vercel |

## 2. Directory map

```
src/
  pages/                      # routes (file-based)
    index.astro               #   /            — landing page, composes sections
    projects/[slug].astro     #   /projects/*  — one detail page per project
  layouts/
    BaseLayout.astro          # <html>/<head>, fonts, meta/OG, global.css,
                              # Header/Footer, reveal + nav-active scripts
  components/
    Header.astro Footer.astro # shared shell (dark bands)
    Hero.astro                # 히어로 + 판독창 3칸
    Thesis.astro              # 관통 주장 (구 Summary/Strengths 를 대체)
    Work.astro                # WORK — featured 는 격자 행, 나머지는 표 한 줄
    Skills.astro              # STACK   ◀ skills 컬렉션
    Timeline.astro            # LOG     ◀ timeline 컬렉션
    Contact.astro             # CONTACT 밴드
    ProjectThumb.tsx          # inline-SVG thumbnail chosen by `thumb` key [React]
    Process.astro             # ⚠ 고아 — 어디서도 import 하지 않고 CSS 도 없다 (§9)
  content.config.ts           # collection definitions + Zod schemas (the data contract)
  content/projects/*.md       # projects collection (1 file = 1 project)
  data/timeline.yaml          # timeline collection (이력)
  data/skills.yaml            # skills collection (기술 스택)
  lib/text.ts                 # 목록 문자열의 줄 나눔 제어 (NBSP 묶기)
  scripts/reveal.ts           # scroll-reveal IntersectionObserver (global)
  scripts/nav-active.ts       # 현재 섹션에 맞춰 내비 항목 활성화 (global)
  styles/global.css           # entire design system
DESIGN-instrument.md          # 시각 언어 정본 (색·타이포·레이아웃 규칙)
scripts/generate-og.mjs       # public/og.png 재생성 (`npm run og`, sharp 사용)
legacy/index.html             # pre-migration original, reference only (not built)
```

## 3. Rendering model (the key idea)

Astro renders **everything to static HTML at build time**. JavaScript ships only
for components explicitly marked with a `client:*` directive ("islands").

**This site has zero islands.** `ProjectThumb.tsx` is a React component, but it is
used without a `client:*` directive, so Astro renders it to HTML at build time and
ships no React to the browser. React is here purely as a convenient way to write
an SVG-returning `switch`.

```
build time                                     ship to browser
──────────                                     ───────────────
.astro components ── render to HTML ─────────▶ HTML (no JS)
ProjectThumb.tsx ─── render to HTML ─────────▶ HTML (no JS — not an island)
global.css ─────────────────────────────────▶ one <link>
reveal.ts + nav-active.ts ── bundle ─────────▶ one small inline module
```

Because the `react()` integration is configured, Astro still emits its client
runtime as `dist/_astro/client.*.js` (~190 KB). **Nothing links it** — no page has
a `<script src>` — so it is never fetched. It is dead weight in the build output,
not in the page. Removing the integration would require rewriting `ProjectThumb`
as `.astro`.

## 4. Data layer — the contract

`src/content.config.ts` is the single source of truth for content shape. It defines
three collections, each with a loader (where files live) and a Zod schema (what
fields are required). **A missing/invalid field fails the build** — this is the
guardrail that keeps content edits safe.

| Collection | Loader | Source | Renders into |
|---|---|---|---|
| `projects` | `glob` | `src/content/projects/*.md` | WORK rows + `/projects/<slug>` pages |
| `timeline` | `file` | `src/data/timeline.yaml` | `Timeline.astro` items |
| `skills` | `file` | `src/data/skills.yaml` | `Skills.astro` rows |

- **projects**: frontmatter = row/header metadata; the Markdown **body** = the full
  case study rendered on the detail page. `featured: true` promotes an entry from a
  one-line table row to a full grid row (`results` 판독창 · `fixes` 불릿 · `stages`).
- **timeline / skills**: each YAML entry needs a unique `id` (required by the `file`
  loader) and an `order` (components sort by it).

> `thumbImage` has **no consumer**: the card grid that read it went away in the
> 2026.08 개편. It is kept on purpose, against a future design that wants thumbnails
> again — it is optional, so a new project never has to fill it. Do not "fix" it by
> wiring it into the current WORK row, and do not add further fields on the
> assumption that something reads them.

## 5. Data flow (page composition)

```
content.config.ts (schemas)
        │ getCollection('projects' | 'timeline' | 'skills')
        ▼
┌──────────────────────── index.astro ────────────────────────┐
│ Hero      #hero                                             │
│ Thesis    #thesis                                           │
│ Work      #work    ◀── projects[] ──prop── (sorted by order)│
│ Skills    #stack   ◀── getCollection('skills')   (내부에서)  │
│ Timeline  #log     ◀── getCollection('timeline') (내부에서)  │
│ Contact   #contact                                          │
└─────────────────────────────────────────────────────────────┘

projects/[slug].astro:
  getStaticPaths() ── getCollection('projects') ──▶ one route per project
  render(entry) ──▶ <Content/> (Markdown body)  +  frontmatter → header
                 +  optional <iframe> live demo (height synced by postMessage)
```

`projects` is fetched in `index.astro` and passed down as a prop because `Work` is
one section among several and the sort belongs with the page; `timeline`/`skills`
are fetched inside their own components since nothing else needs them.

## 6. Routing

File-based, fully static:

- `src/pages/index.astro` → `/`
- `src/pages/projects/[slug].astro` → `/projects/patent-cls`, … — the `[slug]` set is
  enumerated by `getStaticPaths()` from the `projects` collection, so adding a `.md`
  file adds a page with no extra wiring.

`Header.astro` nav links are **absolute** (`/#thesis`, `/#work`, `/#stack`, `/#log`,
`/#contact`) so the same header works from a detail page. Three things must stay in
sync: the nav `href`s, the section `id`s (which live in the section components, not
in `index.astro`), and the `sectionIds` array in `src/scripts/nav-active.ts`.

## 7. Interactivity (3 pieces, minimal JS)

1. **Scroll reveal** — `scripts/reveal.ts`. An `IntersectionObserver` adds `.in` to
   `.reveal` elements as they enter view, then unobserves. Pure DOM, no framework.
2. **Active nav** — `scripts/nav-active.ts`. On scroll, marks the nav link whose
   section top has crossed 30% down the viewport; on `/projects/*` it just pins the
   WORK link. Both scripts load once via a single inline module in `BaseLayout`.
3. **Demo iframe height** — an inline module in `projects/[slug].astro`. The embedded
   HF demo posts its content height; the page sets the iframe height to match, so the
   demo never scrolls inside itself. Origin-checked against the demo URL.

> `.tsx` files use `className`; `.astro` files use `class`.

## 8. Styling system

`src/styles/global.css` is the whole design system, imported once in `BaseLayout`.
All tokens are CSS custom properties on `:root` (`--paper`, `--ink`, `--rule`,
`--signal`, …) — **change a token, not a call site**. The palette and its rules are
defined in `DESIGN-instrument.md`; `CLAUDE.md` carries the short version.

Utility classes shared across components: `.wrap` (container), `.frame` (좌우 세로
괘선), `.rail-grid` + `.rail` + `.body-cell` (2열 격자), `.sec-sunk` / `.sec-close`
(섹션 면·경계), `.mono`, `.reveal` (animation hook). Section styles are grouped by
section with comment banners.

Detail pages have their own geometry, driven by two variables on `.detail-main`:
`--detail-measure` (the prose column) and `--detail-rail` (symmetric padding, sized
so the prose sits centred in the frame). Blocks wider than the prose pull back
against the rail with negative margins, which puts every edge on one of two lines —
the frame or the prose column. See the comments in `global.css`.

Figures are inline SVG (in the Markdown body) or standalone files under
`public/projects/`. Both use raw hex, not tokens — markdown and external SVGs cannot
read CSS variables — so they must be remapped by hand whenever the palette changes.

## 9. Conventions & gotchas

- **Adding content never touches markup** — add a project `.md`, or a `timeline`/
  `skills` YAML entry; schemas validate on build. (Steps: `CLAUDE.md`.)
- **New `thumb` key** needs a matching `case` in `ProjectThumb.tsx`, else a generic
  fallback SVG is used.
- **`order`** controls display order in all three collections (ascending), and for
  projects it is also the `P—NN` number, so it must stay 1..N without gaps.
- **`methods`/`tools` are YAML flow sequences** (`[a, b, c]`), so an entry containing
  a comma must be quoted — otherwise YAML splits it into two entries and the join
  renders the seam as a separator.
- **Build = the test.** No unit tests; `npm run build` type-checks and validates all
  content. A green build is the correctness gate.
- **`Process.astro`** is orphaned — nothing imports it and its CSS was removed with
  the 2026.08 개편. Delete it, or wire it back into `index.astro`.
- **`legacy/index.html`** is reference-only and excluded from the build (it lives
  outside `src/pages`); it now predates two design languages. Delete it.

## 10. Commands

```bash
npm run dev       # dev server + HMR        → http://localhost:4321
npm run build     # static build            → dist/
npm run preview   # serve the built dist/   → http://localhost:4321
npm run og        # regenerate public/og.png from scripts/og.svg
```
