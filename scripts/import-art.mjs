// Copies the art, font and store text the site uses from the game repo.
// Run with:  npm run import-art            (game repo at ~/hellBreakLooseTD)
//       or:  GAME_REPO=/path/to/game npm run import-art
//
// The results are committed, so the site never needs the Unity project to build.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { compress } from 'wawoff2';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const game = process.env.GAME_REPO ?? path.join(os.homedir(), 'hellBreakLooseTD');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'scripts/art-manifest.json'), 'utf8'));

if (!fs.existsSync(game)) {
  console.error(`Game repo not found at ${game}. Set GAME_REPO.`);
  process.exit(1);
}

const src = (p) => path.join(game, p);
const out = (p) => {
  const full = path.join(root, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  return full;
};
let missing = 0;
const exists = (p) => {
  if (fs.existsSync(src(p))) return true;
  console.warn(`  missing: ${p}`);
  missing++;
  return false;
};

// 1. Paintings: scaled down to a sensible maximum and stored as high-quality WebP.
//    Astro's <Image>/<Picture> makes the AVIF/WebP sizes visitors download.
console.log(`Images (${manifest.images.length})`);
for (const { from, to, max } of manifest.images) {
  if (!exists(from)) continue;
  await sharp(src(from))
    .resize({ width: max[0], height: max[1], fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(out(`src/assets/game/${to}`));
}

// 2. Sprite strips: frames from the baked *_Walk_Painted sheets (any grid layout),
//    rescaled and laid out in one row for CSS steps() animation.
console.log(`Sprites (${manifest.sprites.length})`);
const spriteInfo = {};
for (const { from, to, height } of manifest.sprites) {
  if (!exists(from)) continue;
  const meta = JSON.parse(fs.readFileSync(src(from).replace(/\.png$/, '.json'), 'utf8'));
  const frames = meta.frames;
  const width = Math.round((meta.frameWidth / meta.frameHeight) * height);
  const tiles = await Promise.all(
    frames.map((f, i) =>
      sharp(src(from))
        .extract({ left: f.x, top: f.y, width: f.w, height: f.h })
        .resize(width, height)
        .png()
        .toBuffer()
        .then((input) => ({ input, left: i * width, top: 0 })),
    ),
  );
  await sharp({ create: { width: width * frames.length, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(tiles)
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(out(`public/sprites/${to}`));
  spriteInfo[to.replace(/\.webp$/, '')] = { frames: frames.length, width, height, fps: meta.fps || 8 };
}
fs.writeFileSync(out('src/data/sprites.json'), JSON.stringify(spriteInfo, null, 1) + '\n');

// 3. Heading font: TTF -> WOFF2.
console.log('Font');
if (exists(manifest.font.from)) {
  const woff2 = await compress(fs.readFileSync(src(manifest.font.from)));
  fs.writeFileSync(out(manifest.font.to), woff2);
}

// 4. Favicons from the store icon, and the 1200x630 share card from the key art.
console.log('Icons and share card');
if (exists(manifest.icon.from)) {
  const icon = src(manifest.icon.from);
  await sharp(icon).resize(32, 32).png().toFile(out('public/favicon-32.png'));
  await sharp(icon).resize(180, 180).png().toFile(out('public/apple-touch-icon.png'));
  await sharp(icon).resize(512, 512).png().toFile(out('public/icon-512.png'));
}
if (exists(manifest.ogCard.from)) {
  await sharp(src(manifest.ogCard.from))
    .resize(1200, 630, { fit: 'cover', position: 'left' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out('public/og-card.jpg'));
}

// 5. Store text: privacy policy and support page, the same text the stores link to.
console.log('Text');
for (const { from, to } of manifest.text) {
  if (!exists(from)) continue;
  let md = fs.readFileSync(src(from), 'utf8');
  // The support page uses fenced blocks for its mission/vision quotes; show them as quotes.
  md = md.replace(/```\n([\s\S]*?)\n```/g, (_, body) => body.split('\n').map((l) => `> ${l}`).join('\n'));
  fs.writeFileSync(out(to), `<!-- Imported from the game repo (${from}) by scripts/import-art.mjs. Edit it there, then re-run the import. -->\n\n${md}`);
}

console.log(missing ? `Done, with ${missing} missing file(s).` : 'Done.');
process.exit(missing ? 1 : 0);
