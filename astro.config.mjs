// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // 배포 후 실제 Vercel 도메인(또는 커스텀 도메인)으로 교체하세요.
  // canonical·og:url·og:image 절대 URL 생성에 사용됩니다.
  site: 'https://portfolio.vercel.app',
  integrations: [react()],
});
