// Regenerate public/og.png (1200×630 social preview card) from scripts/og.svg.
//
//   npm run og
//
// Edit scripts/og.svg, then run this to rebuild the PNG that og:image/twitter:image
// point at. Rendered with sharp (bundled via Astro's image tooling; if it ever
// goes missing, install it explicitly with `npm i -D sharp`).
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(join(here, 'og.svg'));
const out = join(here, '..', 'public', 'og.png');

const info = await sharp(svg, { density: 96 }).resize(1200, 630).png().toFile(out);
console.log(`OG image written to public/og.png (${info.width}×${info.height}, ${info.size} bytes)`);
