// Rasterize the kylix into the PWA/home-screen icon set.
// Run once after changing public/kylix.svg: node scripts/build-icons.mjs

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'icons');
await mkdir(outDir, { recursive: true });

// iOS and maskable icons want an opaque background with padding; the kylix
// sits inside a linen field.
const framed = (pad) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${88 + pad * 2} ${88 + pad * 2}">
  <rect width="100%" height="100%" fill="#EFE8D8"/>
  <g transform="translate(${pad},${pad})">
    <circle cx="44" cy="44" r="36" fill="none" stroke="#B08D3E" stroke-width="4"/>
    <circle cx="44" cy="44" r="36" fill="none" stroke="#7A2E2E" stroke-width="4"
      stroke-linecap="round" stroke-dasharray="226.2" stroke-dashoffset="70"
      transform="rotate(-90 44 44)"/>
    <circle cx="44" cy="44" r="17" fill="#E5DCC7"/>
  </g>
</svg>`);

const targets = [
  { file: 'icon-192.png', size: 192, pad: 10 },
  { file: 'icon-512.png', size: 512, pad: 10 },
  { file: 'maskable-512.png', size: 512, pad: 26 }, // safe zone for maskable
  { file: 'apple-touch-icon.png', size: 180, pad: 14 },
];

for (const t of targets) {
  const png = await sharp(framed(t.pad)).resize(t.size, t.size).png().toBuffer();
  await writeFile(path.join(outDir, t.file), png);
  console.log(`${t.file} (${t.size}px)`);
}
