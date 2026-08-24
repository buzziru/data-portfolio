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

The site uses the **Instrument** visual language, defined in full in `DESIGN-instrument.md` (2026.08 개편; replaced `DESIGN-linear.app.md`). 그 문서가 정본이고 아래는 요약이다 — 색·크기·간격은 `DESIGN-instrument.md`에서만 바꾼다. 수치가 주인공이다 — 디자인은 계측 장비의 판독창처럼 보여야 한다: 큰 모노스페이스 숫자, 라벨, 격자.

**네 가지 제약. 어떤 변경도 이걸 깨지 않는다:**

1. **다크 배경을 쓰지 않는다.** 본문은 밝은 회색 종이(`--paper`). 어두운 면은 헤더와 CTA/푸터 밴드에만.
2. **카드를 쓰지 않는다.** 배경색이 다른 둥근 상자로 콘텐츠를 담지 않는다. 구획은 **1px 괘선과 격자**로 만든다. `border-radius: 0` 전역, 예외 없음.
3. **보라·인디고 계열 액센트를 쓰지 않는다.** 신호색은 딥 그린 하나 + 예정 상태의 앰버.
4. **그라디언트·글로우·드롭섀도우를 쓰지 않는다.** 깊이는 면의 명도 차와 괘선으로만.

추가 규칙:

- `--lime`은 **어두운 배경 위에서만**, 페이지당 최대 2곳(헤더 CONTACT, CTA 버튼). 밝은 면 위에 쓰지 않는다.
- `--signal`은 선·텍스트·작은 면적에만. 큰 영역을 초록으로 채우지 않는다.
- 순흑(`#000`)·순백(`#fff`) 금지. 밝은 면은 두 단계만 (`--paper` / `--paper-sunk`) — 세 번째 면을 만들지 않는다.
- 상태색은 셋뿐: 완료 `--signal` / 예정 `--pending` / 중립 `--ink-muted`.
- **한글 라벨을 10px대 모노 대문자에 넣지 않는다.** 모노 + `uppercase` + 넓은 자간(0.14em+)은 라틴 전용(`WORK` `FIXED` `P—01`). 한글 라벨은 최소 11.5px, sans, `letter-spacing ≤ 0.02em`, `uppercase` 없이.
- 폰트 스택에 **Pretendard를 반드시** 넣는다 — IBM Plex 계열에는 한글이 없다.
- 모션: 스크롤 진입 `opacity 0→1` + `translateY(12px→0)` 700ms(`reveal.ts`), hover는 색 전환 150–200ms만. `transform: scale()`·리프트·그림자·패럴랙스 금지.

Token map (`src/styles/global.css` `:root`):

| CSS var | Value | 역할 |
|---|---|---|
| `--paper` | `#e8e6e0` | 본문 배경 |
| `--paper-sunk` | `#dedbd3` | 판독창·표 셀·강조 블록 |
| `--ink` | `#101214` | 본문 텍스트 · 헤더/CTA 배경 · 섹션 경계 |
| `--ink-2` | `#3d4144` | 본문 문단 |
| `--ink-muted` | `#5c605f` | 캡션·보조 설명 |
| `--ink-subtle` | `#6e7271` | 판독창 라벨(한글) |
| `--ink-faint` | `#7b7f7d` | 레일 라벨(라틴, 대문자) |
| `--ink-ghost` | `#9a9e9b` | 목록 번호 |
| `--rule` | `#c4c1b8` | 기본 1px 괘선 |
| `--rule-soft` | `#d5d2ca` | 표 내부 행 구분 |
| `--signal` | `#0b6e4f` | 링크·완료·개선폭·`FIXED` 라벨 |
| `--signal-wash` | `#c9e8dc` | 채택된 행 하이라이트 · 선택 영역 |
| `--pending` | `#b3651a` | planned / 불채택 |
| `--lime` | `#c6f24a` | 어두운 면 위 CTA 전용 |
| `--on-ink` / `--on-ink-2` / `--on-ink-rule` | `#e8e6e0` / `#c8ccc9` / `#2c2f31` | 어두운 면 위 텍스트·괘선 |
| `--font-sans` / `--font-display` / `--font-mono` | Pretendard / IBM Plex Sans / IBM Plex Mono | 본문 / 제목 / 숫자·라벨 |
| `--wrap` `--gutter` `--rail` `--body-pad` | `1240px` `32px` `160px` `44px` | 레이아웃 |

**레이아웃 골격은 2열 격자다** — 좌측 `--rail`(섹션 라벨/번호/상태) + 콘텐츠. 페이지 전체는 `--wrap` 안쪽에 좌우 세로 괘선(`.frame`)을 그어 도면처럼 닫는다. 섹션 경계는 `1px solid var(--ink)`(`.sec-close`), 섹션 내부 행 구분은 `--rule` / `--rule-soft`. 산문 최대 폭 62–66ch.

반응형: ≤1024px 판독창 3열→2열 · ≤820px 레일을 접고 라벨을 콘텐츠 위로(1열), 헤더 내비는 스크롤 가능한 한 줄 · ≤640px 표는 가로 스크롤 컨테이너에(숫자를 줄여 표기하지 않는다).

**콘텐츠 규칙**: 섹션 번호(§01)를 쓰지 않는다 — 이름만(`WORK` `STACK` `LOG` `CONTACT`). 프로젝트 문구는 항상 두 축으로 — **고친 것**(판단) → **결과**(실측치). 모든 수치에 조건을 붙인다(test 건수, τ, CI, 기준선). 판독창 숫자는 반드시 출처가 있는 실측치 — 장식용 숫자 금지. 역량을 별도 섹션으로 만들지 않는다(각 프로젝트의 `fixes`로 증명).

## Architecture

- **Design system** — All theming lives in `src/styles/global.css` via `:root` custom properties. Change tokens there, never at call sites. Recurring utility classes: `.wrap` (container), `.frame` (좌우 세로 괘선), `.rail-grid` + `.rail` + `.body-cell` (2열 격자), `.sec-sunk` / `.sec-close` (섹션 면·경계), `.mono`, `.reveal` (scroll-in hook).

- **Layout & shell** — `src/layouts/BaseLayout.astro` owns `<html>`/`<head>` (fonts, meta, `global.css` import), renders shared `Header`/`Footer`, and loads the `reveal.ts` scroll script. Fonts are self-hosted: Pretendard (dynamic subset) + `@fontsource/ibm-plex-sans` + `@fontsource/ibm-plex-mono`. Every page wraps its content in `BaseLayout` and may pass `title`/`description` props. `Header.astro` nav links are absolute (`/#work`) so they work from detail pages too — keep nav links, the section `id`s in `index.astro`, and the `sectionIds` list in `src/scripts/nav-active.ts` in sync.

- **Landing page** — `src/pages/index.astro` composes the section components in order: `Hero` (히어로 + 판독창 4개) · `Thesis` · `Work` · `Skills` (STACK) · `Timeline` (LOG) · `Contact`. It loads projects via `getCollection('projects')`, sorts by `order`, and passes them to `Work.astro`. `Footer.astro` (BaseLayout이 렌더) is the dark bottom band that continues the `Contact` 밴드.

- **Data-driven content (3 collections)** — All editable content lives in collections defined in `src/content.config.ts` (Zod-validated, so a bad/missing field fails the build):
  - `projects` — `glob` loader over `src/content/projects/*.md` (one file per project).
  - `timeline` — `file` loader over `src/data/timeline.yaml` (이력/학습 로그; `Timeline.astro` reads it via `getCollection`, sorts by `order`).
  - `skills` — `file` loader over `src/data/skills.yaml` (기술 스택 3줄; `Skills.astro` reads it, sorts by `order`).
  - `Hero` 판독창, `Thesis` 본문, `Contact`/`Footer` copy are literal markup in their components (edit the `.astro` file directly).

- **Projects** — **Frontmatter** drives the WORK row and the detail-page header; the **Markdown body** is the full case study (Problem / Data / Approach / … as `##` headings). The slug = filename (`churn.md` → `/projects/churn`).

- **WORK section** — `Work.astro` (plain Astro, no island — the filter toolbar was removed with the redesign). `featured: true` 항목은 격자 행으로 펼쳐진다: 레일에 `P—NN` / `domain` + `railNote` / 상태, 콘텐츠에 제목 → 요약 → `results` 판독창 3칸 → `FIXED` 불릿(`fixes`) → 액션 링크. 나머지는 `OTHER ENTRIES` 표 한 줄(`listMetric`). `ProjectThumb.tsx` (React, `className` not `class`) is still used by the detail page for the `thumb` key SVG (unknown keys fall back to a generic chart).

- **Detail pages** — `src/pages/projects/[slug].astro` uses `getStaticPaths()` over the collection; renders frontmatter into the header (`.detail-*` styles) and the body via `await render(entry)` → `<Content />`.

## Adding / editing content

- **New project** — create `src/content/projects/<slug>.md` with the frontmatter from `content.config.ts` (`title`, `status`, `order`, `summary`, `domain`, `role`, `methods[]`, `tools[]`, `keyMetric`, `thumb`, optional `github`/`demo`) and write the case study as the Markdown body. `order` is also the `P—NN` number on the landing page, so it must stay 1..N without gaps. The WORK row and `/projects/<slug>` page are generated automatically. For a brand-new `thumb` key, add a matching `case` in `ProjectThumb.tsx` (otherwise the generic fallback SVG is used).
- **랜딩 WORK 항목** — 펼쳐 보일 프로젝트에는 `featured: true` + `railNote` ("개인 · 2026.07") + `results: [{v,k}×3]` + `fixes: [string]` 를 추가한다. `results`의 `v`는 조건이 붙은 실측치, `k`는 그 조건. 접히는 항목에는 `listMetric`(표 한 줄용 축약 지표)만 넣는다.
- **이력 (timeline)** — edit `src/data/timeline.yaml`: copy a block, give it a unique `id` and an `order` (ascending = top→bottom). Set `state: current` on the in-progress item only; omit it on the rest.
- **기술 스택 (skills)** — edit `src/data/skills.yaml`: 세 줄뿐이다 (`level`: `core` | `using` | `learning`), 각 줄은 라틴 `label` + 한글 `note` + `' · '` 로 이어붙인 `items` 문자열. 4단계 레벨·점수 막대·범례로 되돌리지 않는다.
- Schemas validate on build, so a typo or missing field is caught by `npm run build` (or live in `npm run dev`).

## Editing notes

- Content is Korean; preserve language and tone.
- **Never run a markdown formatter over `src/content/projects/*.md`.** These files are not plain markdown: they carry Zod-validated YAML frontmatter and raw HTML/SVG that the detail page renders (`.detail-split`, `<figure>`, inline charts). A formatter treats both as prose — it promotes `title:` to a heading, drops the closing `---`, and rewrites frontmatter URLs as markdown links (all three fail the build), and it flattens SVG blocks into concatenated plain text (**this one passes the build silently** — the chart just disappears). `.vscode/settings.json` and `.prettierignore` disable it; if a chart goes missing, diff against the last commit and restore the `<figure>` block from there.
- **Korean line breaking** — never let an 어절(word) split mid-character. The site sets `word-break:keep-all` globally on `body` (`global.css`), so in-site content breaks only at spaces; keep that. For multi-clause copy (안내 문구 등), break at meaning-unit boundaries (절·문장 단위) with an explicit `<br>` rather than relying on reflow — e.g. a sentence describing one action stays on one line. Standalone embedded pages (HF demo iframes) don't inherit `global.css`, so set `word-break:keep-all` on their text elements explicitly.
- Placeholders to replace before real deployment: `https://github.com` links, `hello@example.com`, and the `OO대학교 OO학과` timeline entry are stubs; the dummy projects' `github` values are placeholders.
- Date strings live in the `N ENTRIES · LAST SYNC 2026.08` line of `Work.astro` and the `© 2026` line of `Footer.astro` — update them together.
- **Inline SVG figures in `src/content/projects/*.md` use raw hex, not tokens** (markdown can't read CSS vars). They were remapped to the Instrument palette in the 2026.08 개편: `#0b6e4f` 신호 · `#5c605f` 보조 계열 · `#3d4144` 본문 · `#c4c1b8` 괘선 · `#101214` 잉크, 면은 `rgba(16,18,20,α)`. 새 도식도 이 값만 쓴다 — 보라 계열(`#5e6ad2`, `#ba9cff`)이나 `rgba(255,255,255,α)` 를 다시 넣지 않는다.
- `legacy/index.html` is the pre-migration reference only; it is not part of the build. Delete it once the new site is confirmed.
