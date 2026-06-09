#!/usr/bin/env node
/**
 * Image optimization pipeline.
 *
 * Usage:
 *   node tools/optimize-images.mjs <input...>          responsive variants
 *   node tools/optimize-images.mjs --og <input>        1200x630 social image
 *
 * Writes AVIF + WebP + JPEG variants to images/opt/ at the widths below,
 * skipping widths larger than the source. Prints a ready-to-paste
 * <picture> snippet for each input.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';

const OUT_DIR = 'images/opt';
const WIDTHS = [480, 800, 1200, 1600];
const FORMATS = [
  ['avif', { quality: 55 }],
  ['webp', { quality: 72 }],
  ['jpg',  { quality: 75, mozjpeg: true }],
];

const slugify = (file) =>
  basename(file, extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

async function makeOg(input) {
  const slug = slugify(input);
  const out = join(OUT_DIR, `og-${slug}.jpg`);
  const info = await sharp(input)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(out);
  console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

async function makeVariants(input) {
  const slug = slugify(input);
  const meta = await sharp(input).metadata();
  const widths = WIDTHS.filter((w) => w <= meta.width);
  if (!widths.length) widths.push(meta.width);

  for (const w of widths) {
    for (const [fmt, opts] of FORMATS) {
      const out = join(OUT_DIR, `${slug}-${w}.${fmt}`);
      const info = await sharp(input).resize(w).toFormat(fmt === 'jpg' ? 'jpeg' : fmt, opts).toFile(out);
      console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
    }
  }

  const maxW = widths[widths.length - 1];
  const maxH = Math.round(maxW * (meta.height / meta.width));
  const srcset = (fmt) => widths.map((w) => `images/opt/${slug}-${w}.${fmt} ${w}w`).join(', ');
  console.log(`
<picture>
  <source type="image/avif" srcset="${srcset('avif')}" sizes="100vw">
  <source type="image/webp" srcset="${srcset('webp')}" sizes="100vw">
  <img src="images/opt/${slug}-${maxW}.jpg" srcset="${srcset('jpg')}" sizes="100vw"
       width="${maxW}" height="${maxH}" alt="" loading="lazy" decoding="async">
</picture>
`);
}

const args = process.argv.slice(2);
const ogMode = args[0] === '--og';
const inputs = ogMode ? args.slice(1) : args;
if (!inputs.length) {
  console.error('usage: node tools/optimize-images.mjs [--og] <image...>');
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
for (const input of inputs) {
  await (ogMode ? makeOg(input) : makeVariants(input));
}
