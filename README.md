# descenttd.com

The marketing site for **DescentTD: Nine Circles**: Astro 5 (static), GSAP ScrollTrigger and Lenis, plain CSS.
The plan behind it is `Docs/Plans/Website_Plan.md` in the game repo.
//new deploy

## Run it locally

Needs Node 20.3 or newer (`node -v`).

```bash
npm install          # once
npm run dev          # http://localhost:4321, reloads as you edit
```

To check exactly what will be published:

```bash
npm run build        # copy check, then builds into dist/
npm run preview      # serves dist/ at http://localhost:4321
```

To try it on your phone, run `npm run dev -- --host` and open the "Network" address it prints (same Wi-Fi).

## Updating art and text from the game

Everything the site shows from the game is copied in by one script, listed in `scripts/art-manifest.json`:

```bash
npm run import-art                      # game repo at ~/hellBreakLooseTD
GAME_REPO=/path/to/game npm run import-art
```

It writes `src/assets/game/` (paintings), `public/sprites/` + `src/data/sprites.json` (walk strips),
the heading font, favicons, `public/og-card.jpg` and `src/content/privacy.md` / `support.md`.
Commit the results: the deploy build doesn't have the game repo.

The privacy policy and support text live in the game repo (`Docs/Store/`). Edit them there, then re-import.

## Where things are

| What | Where |
|---|---|
| Circle names, jokes, colours, bosses | `src/data/circles.ts` |
| Towers | `src/data/towers.ts` |
| Store links, "Coming soon", contact email | `src/data/site.ts` (set `launched: true` on launch day) |
| Home page sections | `src/components/` |
| Descent motion (pinning, colour wash, depth gauge) | `src/scripts/descent.ts` |
| Colours and type | `src/styles/tokens.css` |

**Title rule:** never use the poem's first-canticle title or "Dante's ..." as a name. `npm run build` fails if the word appears in `src/` or the built site (`scripts/check-copy.mjs`).

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.
`public/CNAME` holds `descenttd.com`. To try the site on `https://<user>.github.io/DescentTD-website/` before the
domain is set up, build with `SITE_BASE=/DescentTD-website/`.
