// Compression one-off des images de public/media (en place).
// Usage : node scripts/optimize-media.mjs
// Redimensionne à max 1920px de large et recompresse (JPEG ~72 / PNG ~75).
// Les noms de fichiers restent identiques → aucun changement dans content.ts.

import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const MEDIA_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'media');
const MAX_WIDTH = 1920;
const RASTER = new Set(['.jpg', '.jpeg', '.png', '.avif', '.jfif', '.webp']);

const fmt = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} Mo`;

async function processFile(name) {
  const ext = extname(name).toLowerCase();
  if (!RASTER.has(ext)) return null;

  const src = join(MEDIA_DIR, name);
  const before = (await stat(src)).size;
  const tmp = `${src}.tmp`;

  let pipeline = sharp(src, { failOn: 'none' }).rotate().resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  // .jfif / .avif → on les ré-encode en JPEG mais on GARDE l'extension d'origine
  // (les chemins dans content.ts ne changent pas ; le navigateur lit le contenu, pas l'extension).
  if (ext === '.png') {
    pipeline = pipeline.png({ quality: 75, compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.jpeg({ quality: 72, mozjpeg: true });
  }

  await pipeline.toFile(tmp);
  const after = (await stat(tmp)).size;

  // On ne remplace que si on gagne réellement (évite de gonfler un fichier déjà optimisé).
  if (after < before) {
    await unlink(src);
    await rename(tmp, src);
  } else {
    await unlink(tmp);
  }
  return { name, before, after: Math.min(before, after) };
}

const files = await readdir(MEDIA_DIR);
let totalBefore = 0;
let totalAfter = 0;
const rows = [];

for (const name of files) {
  try {
    const res = await processFile(name);
    if (!res) continue;
    totalBefore += res.before;
    totalAfter += res.after;
    const saved = ((1 - res.after / res.before) * 100).toFixed(0);
    rows.push(`  ${name.padEnd(42)} ${fmt(res.before).padStart(9)} → ${fmt(res.after).padStart(9)}  (-${saved}%)`);
  } catch (err) {
    rows.push(`  ${name.padEnd(42)} ⚠️  ignoré (${err.message})`);
  }
}

console.log(rows.join('\n'));
console.log('  ' + '-'.repeat(72));
console.log(
  `  TOTAL ${fmt(totalBefore)} → ${fmt(totalAfter)} ` +
    `(-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%, ${fmt(totalBefore - totalAfter)} économisés)`,
);
