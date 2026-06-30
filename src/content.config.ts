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
    thumb: z.string(), // ProjectThumb SVG key (churn|cnn|forecast|nlp|recsys|…)
    image: z.string().optional(), // 상세 헤더용 실제 스크린샷 (있으면 thumb SVG 대신 사용)
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
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
    desc: z.string(),
    tags: z.array(z.string()),
  }),
});

// 기술 스택 그룹 — src/data/skills.yaml (그룹 배열, 각 그룹에 고유 id 필요).
const skills = defineCollection({
  loader: file('src/data/skills.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    tag: z.string(),
    pills: z.array(
      z.object({
        name: z.string(),
        level: z.enum(['core', 'using', 'learning', 'next']),
        tip: z.string(),
      }),
    ),
  }),
});

export const collections = { projects, timeline, skills };
