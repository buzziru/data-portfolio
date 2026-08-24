import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Each project = one markdown file in src/content/projects/.
// Frontmatter drives the card + detail-page header; the markdown body is the
// full case study rendered on /projects/<slug>.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['completed', 'progress', 'planned']),
    order: z.number(), // card ordering + CASE label
    summary: z.string(), // one-line shown on the card
    domain: z.string(),
    role: z.string(),
    methods: z.array(z.string()),
    tools: z.array(z.string()),
    keyMetric: z.string(),
    date: z.string().optional(),
    // 랜딩 WORK 섹션 — featured 항목은 격자 행으로 펼쳐지고, 나머지는 표 한 줄로 접힌다.
    featured: z.boolean().optional(),
    railNote: z.string().optional(), // 레일 둘째 줄 ("개인 · 2026.07") — featured 전용
    results: z.array(z.object({ v: z.string(), k: z.string() })).optional(), // 판독창 3칸
    // 결과가 점수가 아니라 구조인 프로젝트(ML 하니스)용 — 있으면 판독창 대신 승격 계보를 렌더한다.
    // v=버전, n=단계 이름, k=한 줄 설명. results 는 남겨두고 이 필드만 지우면 판독창으로 되돌아간다.
    stages: z.array(z.object({ v: z.string(), n: z.string(), k: z.string() })).optional(),
    fixes: z.array(z.string()).optional(), // FIXED 불릿 — 고친 것(판단)
    listMetric: z.string().optional(), // 표 한 줄용 축약 지표 (없으면 keyMetric)
    thumb: z.string(), // ProjectThumb SVG key (churn|cnn|forecast|nlp|recsys|…)
    image: z.string().optional(), // 상세 헤더용 실제 스크린샷 (있으면 thumb SVG 대신 사용)
    // 예약 필드 — 지금은 읽는 컴포넌트가 없다. 이 값을 쓰던 카드 그리드는 2026.08 개편에서
    // 사라졌지만, 썸네일을 다시 쓰는 디자인을 대비해 스키마와 기존 값을 남겨 둔다.
    // optional 이라 새 프로젝트를 추가할 때 채울 의무가 없다 — 비워 두면 그만이다.
    thumbImage: z.string().optional(), // (미사용) 카드 썸네일 전용 이미지
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    demoNote: z.string().optional(), // 임베드 데모 안내 문구 (없으면 기본 문구 사용)
  }),
});

// 학습/이력 타임라인 — src/data/timeline.yaml (항목 배열, 각 항목에 고유 id 필요).
const timeline = defineCollection({
  loader: file('src/data/timeline.yaml'),
  schema: z.object({
    order: z.number(), // 표시 순서 (오름차순)
    date: z.string(),
    state: z.enum(['current']).optional(), // 진행 중인 항목만
    title: z.string(),
    org: z.string(),
    // 한 줄이면 문자열, 실제로 여러 건이면 배열 — 배열은 대시 불릿으로 렌더된다.
    // <br /> 로 이어붙인 문자열로 여러 건을 표현하지 않는다 (한 항목처럼 읽힌다).
    desc: z.union([z.string(), z.array(z.string())]),
    tags: z.array(z.string()),
  }),
});

// 기술 스택 그룹 — src/data/skills.yaml (그룹 배열, 각 그룹에 고유 id 필요).
const skills = defineCollection({
  loader: file('src/data/skills.yaml'),
  schema: z.object({
    order: z.number(),
    // 주력 / 사용 중 / 학습 중 세 줄만 쓴다.
    // 4단계 레벨·점수 막대·범례로 되돌리지 않는다 (DESIGN-instrument.md).
    level: z.enum(['core', 'using', 'learning']),
    label: z.string(), // 라틴 대문자 라벨 (CORE / IN USE / LEARNING)
    note: z.string(), // 한글 짧은 설명
    items: z.string(), // ' · ' 로 이어붙인 목록
  }),
});

export const collections = { projects, timeline, skills };
