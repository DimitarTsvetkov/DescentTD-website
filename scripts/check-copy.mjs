// The game's title rule: never "Dante's Inferno", and never the word "Inferno".
// Checks the source (default) or the built site (`node scripts/check-copy.mjs dist`).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, process.argv[2] ?? 'src');
const textExt = new Set(['.astro', '.ts', '.js', '.mjs', '.md', '.json', '.css', '.html', '.xml', '.txt']);
const banned = /inferno/i;

const hits = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (textExt.has(path.extname(e.name))) {
      fs.readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        if (banned.test(line)) hits.push(`${path.relative(root, p)}:${i + 1}: ${line.trim().slice(0, 120)}`);
      });
    }
  }
};
walk(dir);

if (hits.length) {
  console.error('Title rule broken (the word is not allowed anywhere on the site):\n' + hits.join('\n'));
  process.exit(1);
}
console.log(`Copy check passed (${path.relative(root, dir)}).`);
