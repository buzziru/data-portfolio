// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Vercel 배포 도메인. canonical·og:url·og:image 절대 URL 생성에 사용됩니다.
  // 커스텀 도메인을 붙이면 그 값으로 교체하세요.
  site: 'https://data-portfolio-rust.vercel.app',
  integrations: [react()],
});
