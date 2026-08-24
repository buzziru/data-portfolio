# DESIGN — Instrument

포트폴리오 사이트의 시각 언어 정의. 2026.08 개편(Linear 다크 테마 → Instrument)에서 확정.
**색·크기·간격은 여기서만 바꾼다.** 개별 컴포넌트에서 하드코딩하지 말고 `global.css` 토큰을 고친다.

프로토타입: `landing.dc.html`(랜딩), `case-study.dc.html`(상세). 구현 대상은 Astro 사이트의
`src/styles/global.css` + `src/components/*`.

> **출처** — Claude Design 프로젝트 `7c63509e-41e1-4fa3-91db-7084637bf9d6`에서 가져온 정본.
> 프로토타입 `.dc.html` 파일은 그 프로젝트에만 있고 레포에는 없다(빌드 대상이 아님).
> 이 문서가 `DESIGN-linear.app.md`(이전 다크 테마 정의)를 대체한다.
> **구현 상태** — 랜딩(`landing.dc.html`)은 구현 완료. 상세 페이지는 §8 팔레트 매핑만 적용했고
> 레이아웃 개편(`case-study.dc.html`)은 미구현.

---

## 1. 왜 바꿨나 — 지켜야 할 판단

이전 테마는 Linear 디자인 언어(near-black 캔버스 + 라벤더 인디고 + 어두운 카드 그리드)였다.
문제는 품질이 아니라 **구별 불가능성**이었다: 다크 배경 + 보라 액센트 + 라운드 카드 그리드는
현재 AI 도구로 만든 포트폴리오·슬라이드의 기본값이다. "무난하지만 양산형"으로 읽힌다.

그래서 새 테마의 제약은 다음 네 가지다. 개편 후 어떤 변경도 이 제약을 깨지 않는다.

1. **다크 배경을 쓰지 않는다.** 본문은 밝은 회색 종이(`--paper`). 어두운 면은 헤더와 CTA 밴드에만.
2. **카드를 쓰지 않는다.** 배경색이 다른 둥근 상자로 콘텐츠를 담지 않는다.
   구획은 **1px 괘선과 격자**로 만든다. `border-radius: 0`.
3. **보라·인디고 계열 액센트를 쓰지 않는다.** 신호색은 딥 그린 하나 + 예정 상태의 앰버.
4. **그라디언트·글로우·드롭섀도우를 쓰지 않는다.** 깊이는 면의 명도 차와 괘선으로만.

수치가 주인공이다. 이 사람의 강점은 "지표를 의심하고 재정의한다"이므로,
디자인은 **계측 장비의 판독창**처럼 보여야 한다 — 큰 모노스페이스 숫자, 라벨, 격자.

---

## 2. 색 토큰

```css
:root {
  /* 지면 */
  --paper:        #e8e6e0;  /* 본문 배경 */
  --paper-sunk:   #dedbd3;  /* 판독창·표 셀·강조 블록 (한 단계 낮은 면) */
  --ink:          #101214;  /* 본문 텍스트 · 헤더/CTA 배경 · 강한 괘선 */

  /* 텍스트 */
  --ink-2:        #3d4144;  /* 본문 문단 */
  --ink-muted:    #5c605f;  /* 캡션·보조 설명 */
  --ink-subtle:   #6e7271;  /* 판독창 라벨(한글) */
  --ink-faint:    #7b7f7d;  /* 레일 라벨(라틴, 대문자) */
  --ink-ghost:    #9a9e9b;  /* 목록 번호 */

  /* 괘선 */
  --rule:         #c4c1b8;  /* 기본 1px 괘선 */
  --rule-soft:    #d5d2ca;  /* 표 내부 행 구분 */
  /* 섹션 경계는 --ink (1px solid) */

  /* 신호 */
  --signal:       #0b6e4f;  /* 딥 그린 — 링크, 완료, 개선폭, "FIXED" 라벨 */
  --signal-wash:  #c9e8dc;  /* 채택된 행 하이라이트 · 선택 영역 */
  --pending:      #b3651a;  /* 앰버 — planned / 불채택 */
  --lime:         #c6f24a;  /* 어두운 면 위의 유일한 고채도 — CTA 버튼에만 */

  /* 어두운 면 위 */
  --on-ink:       #e8e6e0;
  --on-ink-2:     #c8ccc9;
  --on-ink-rule:  #2c2f31;
}
```

규칙

- `--lime`은 **어두운 배경 위에서만**, 최대 페이지당 2곳(헤더 CONTACT, CTA 버튼). 밝은 면 위에 쓰지 않는다.
- `--signal`은 선·텍스트·작은 면적에만. 큰 영역을 초록으로 채우지 않는다.
- 순흑(`#000`)·순백(`#fff`) 금지.
- 상태색은 세 가지뿐: 완료 `--signal` / 예정 `--pending` / 중립 `--ink-muted`.

---

## 3. 타이포그래피

세 가족을 쓰고, **한글은 항상 Pretendard로 떨어지게 스택을 명시한다.**

```css
--font-sans:    Pretendard, 'IBM Plex Sans', system-ui, sans-serif;  /* 본문 */
--font-display: 'IBM Plex Sans', Pretendard, sans-serif;             /* 제목 */
--font-mono:    'IBM Plex Mono', Pretendard, monospace;              /* 숫자·라벨 */
```

`IBM Plex Sans`와 `IBM Plex Mono`에는 한글이 없다. 스택에 Pretendard를 **반드시** 넣는다.
빠뜨리면 한글이 OS 기본 폰트로 떨어져 기기마다 다르게 보인다.

### 스케일

| 역할 | 크기 / 자간 / 굵기 | 가족 |
|---|---|---|
| 히어로 h1 | 58px / −0.035em / 600 | display |
| 상세 페이지 h1 | 52px / −0.035em / 600 | display |
| 섹션 리드 | 26px / −0.025em / 500 | display |
| 본문 h2 | 28px / −0.03em / 600 | display |
| 본문 h3 | 20px / −0.025em / 600 | display |
| 프로젝트 제목 | 27px / −0.03em / 600 | display |
| 본문 문단 | 15–16px / 0 / 400 · line-height 1.75–1.8 | sans |
| 보조 문단 | 14.5px / line-height 1.7 | sans |
| 판독창 숫자 | 24–30px / −0.03em / 500 | mono |
| 표 수치 | 13.5px / 500 | mono |
| 라틴 마이크로 라벨 | 9.5–11px / 0.12–0.18em / 대문자 | mono |
| **한글 라벨** | **11.5–13.5px / ≤0.02em / 500–600 / 대문자 금지** | **sans** |

### 한글 라벨 규칙 (중요)

모노스페이스 + `text-transform: uppercase` + 넓은 자간(0.14em+)은 **라틴 전용** 처리다.
`WORK` `STACK` `FIXED` `P—01` 같은 라벨에만 쓴다.

한글이 들어가는 라벨은:

- 10px대 모노에 넣지 않는다 (한글 자형이 뭉개진다). **최소 11.5px**, 본문 sans로.
- `letter-spacing`은 0.02em 이하. `text-transform: uppercase`는 한글에 아무 효과가 없으니 빼낸다.
- 대안: 라벨 자체를 라틴으로 바꾼다 (`결과` → `RESULTS`, `고친 것` → `FIXED`).

`word-break: keep-all`은 전역 유지. 다절 문장은 의미 단위에서 `<br>`로 끊는다.

---

## 4. 레이아웃

```
--wrap:      1240px   /* 최대 폭 */
--gutter:    32px     /* 좌우 여백 — 이 안쪽에 세로 괘선 */
--rail:      160px    /* 좌측 라벨 레일 */
--body-pad:  44px     /* 콘텐츠 셀 내부 좌우 여백 */
```

기본 골격은 **2열 격자**다.

```
│  RAIL (160px)  │  CONTENT                                      │
│  섹션 라벨      │  제목 · 문단 · 표 · 판독창                      │
│  번호/도메인/상태 │                                              │
```

- 페이지 전체는 `--wrap` 안쪽에 **좌우 세로 괘선(`--rule`)** 을 그어 도면처럼 닫는다.
- 섹션 사이 경계는 `1px solid var(--ink)`. 섹션 **내부** 행 구분은 `--rule` / `--rule-soft`.
- 산문 최대 폭 **62–66ch**. 라벨·표는 격자 폭 전체.
- 섹션 수직 여백: 랜딩 44px 셀 패딩(밀도 유지), 상세 44px.
- `border-radius: 0` 전역. 예외 없음.
- 밝은 면 두 단계만 쓴다: `--paper`(기본) / `--paper-sunk`(판독창·표·강조 블록).
  세 번째 면을 만들지 않는다.

### 반응형

- ≤1024px: 프로젝트 판독창 3열 → 2열. 레일은 유지.
- ≤820px: 레일을 접고 라벨을 콘텐츠 위로 올린다(1열). 헤더 내비는 스크롤 가능한 한 줄로.
- ≤640px: 표는 가로 스크롤 컨테이너에 담는다. 숫자를 줄여 표기하지 않는다.

---

## 5. 컴포넌트 패턴

### 헤더
어두운 바(`--ink`), 높이 44px, 내비 항목은 `--on-ink-rule` 세로 괘선으로 구분.
마지막 CONTACT만 `--lime` 배경. 로고는 텍스트 워드마크(`CHO INKYOUNG`), 심볼 마크 없음.

### 판독창 (readout)
`--paper-sunk` 셀 + 라벨(11.5px sans) + 큰 모노 수치 + 한 줄 설명.
히어로에서 4개, 프로젝트마다 3개. **수치는 반드시 출처가 있는 실측치.** 장식용 숫자 금지.

### 프로젝트 항목
카드가 아니라 **격자 행**이다. 레일에 `P—01` / 도메인 / 상태, 콘텐츠에 제목 → 요약 →
판독창 3열 → `FIXED` 불릿 → 액션 링크.

`FIXED` 블록이 이전 테마의 "역량(Strengths)" 섹션을 대체한다.
역량은 별도 섹션으로 다시 만들지 않는다 — 각 프로젝트에서 **무엇을 고쳤는지**로 증명한다.

### 표
헤더 행은 `--ink` 배경 + `--on-ink` 텍스트, 라틴 대문자 모노 라벨.
본문 행은 `--paper-sunk`, 행 구분 `--rule-soft`. 수치는 mono·우측 정렬, 라벨은 sans·좌측 정렬.
**채택/최종 행은 `--signal-wash` 배경 + 600 굵기**로 한 줄만 강조한다.

### 판단 블록 (judgement)
`border-left: 3px solid var(--signal)` + `--paper-sunk` 배경 + 라틴 모노 캡션
(`JUDGEMENT` / `WHY IT CLOSED`). 결론이나 트레이드오프를 적는 자리. 페이지당 1–2개.

### 링크·버튼
- 1차: `--ink` 배경 채우기, 모노 라벨. 어두운 면 위에서는 `--lime`.
- 2차: `1px solid var(--ink)` 외곽선, 배경 없음.
- 인라인 링크: `--signal` + 1px 밑줄. hover 시 `--ink`.
- 포커스: `outline: 2px solid var(--signal); outline-offset: 2px`. 브라우저 기본 링 금지.

### 막대 그래프
CSS `div` 높이만으로 그린다(SVG 불필요). `--signal` 단색, 라벨은 모노.
격자 안에 4칸 이하. 축·범례·눈금선을 그리지 않는다 — 숫자를 직접 쓴다.

---

## 6. 모션

이전 수준 유지. 과하게 늘리지 않는다.

- 스크롤 진입: `opacity 0→1`, `translateY(12px→0)`, 700ms ease. `reveal.ts` 그대로 사용.
- hover: 색 전환만 150–200ms. `transform: scale()`·리프트·그림자 금지.
- 패럴랙스·시차 카운터·타이핑 효과 없음.

---

## 7. 콘텐츠 규칙

- 언어는 한국어, 톤은 담백한 서술체. 감탄·과장 없음.
- **섹션 번호(§01 …)를 쓰지 않는다.** 내비와 섹션 라벨은 이름으로만
  (`WORK` `STACK` `LOG` `CONTACT`).
- 기술 스택은 **주력 / 사용 중 / 학습 중 세 줄**. 4단계 레벨·점수 막대·범례로 되돌리지 않는다.
- 프로젝트 문구는 항상 두 축으로 적는다: **고친 것**(판단) → **결과**(실측치).
  형용사로 능력을 주장하지 않고, 수치와 결정 근거로 보여준다.
- 모든 수치에는 조건을 붙인다 (test 건수, τ, CI, 기준선). 조건 없는 단독 숫자를 쓰지 않는다.
- 불확실한 것은 불확실하다고 적는다 (판정선 미달, 추정 불가, 재현 편향).
  실패한 갈래도 표로 남긴다 — 이 사이트의 차별점이다.

---

## 8. Astro 적용 시 대응 관계

| 현재 (`global.css`) | 새 값 |
|---|---|
| `--bg` `#010102` | `--paper` `#e8e6e0` |
| `--bg-surface` `#0f1011` | `--paper-sunk` `#dedbd3` |
| `--bg-elevated` / `--bg-deep` | 삭제 (면은 두 단계만) |
| `--fg` `#f7f8f8` | `--ink` `#101214` |
| `--fg-2` `#d0d6e0` | `--ink-2` `#3d4144` |
| `--fg-muted` `#8a8f98` | `--ink-muted` `#5c605f` |
| `--accent` `#5e6ad2` | `--signal` `#0b6e4f` |
| `--accent-light` `#ba9cff` | 삭제 (액센트는 하나) |
| `--accent-pale` | `--signal-wash` `#c9e8dc` |
| `--border` `rgba(255,255,255,.08)` | `--rule` `#c4c1b8` |
| `--r-sm … --r-xl` (4–12px) | 전부 `0` |
| `--font-mono` JetBrains Mono | `'IBM Plex Mono', Pretendard, monospace` |
| — (신규) | `--font-display` `'IBM Plex Sans', Pretendard, sans-serif` |

같이 손봐야 하는 곳

- `BaseLayout.astro` — 폰트 임포트를 `@fontsource/ibm-plex-sans`·`ibm-plex-mono`로 교체
  (JetBrains Mono·Fraunces 제거, Pretendard 유지).
- `Header.astro` — 심볼 마크(`.brand-mark` D 타일) 제거, 내비 라벨에서 번호 제거.
- `Strengths.astro` — 삭제. 내용은 각 프로젝트의 `FIXED` 항목으로 이전
  (프로젝트 frontmatter에 `fixes: string[]`, `results: {v,k}[]` 추가 권장).
- `ProjectsSection.tsx` / `ProjectCard.tsx` — 카드 그리드를 격자 행으로. 썸네일 200px 영역 제거
  (이미지는 상세 페이지에서만 쓴다).
- `ProjectThumb.tsx` — 보라 팔레트 인라인 SVG. 삭제하거나 `--signal`/`--ink`로 다시 그린다.
- `Skills.astro` / `skills.yaml` — `level`을 `core | using | learning` 3단계로 줄이고 범례 제거.
- `og.svg` / `generate-og.mjs` / `favicon.svg` — 새 팔레트로 재생성.

---

## 9. 하지 말 것 (체크리스트)

- [ ] 다크 배경의 본문 섹션
- [ ] 둥근 모서리 · 그림자 · 그라디언트 · 글로우
- [ ] 보라/인디고 액센트, 두 번째 액센트 색
- [ ] 카드 그리드로 되돌아가기
- [ ] 10px 모노 대문자에 한글 넣기
- [ ] 폰트 스택에서 Pretendard 빠뜨리기
- [ ] 섹션 번호(§01), 능력 점수 막대, 이모지
- [ ] 근거 없는 수치, 조건 없는 단독 지표
- [ ] 밝은 면 위의 `--lime`
