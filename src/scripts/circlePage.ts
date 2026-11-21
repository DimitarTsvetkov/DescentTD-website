// Interactions for a circle page. All content is already in the HTML; this only adds life.
import sprites from '../data/sprites.json';

type SpriteInfo = { frames: number; width: number; height: number; fps: number };
const SPRITES = sprites as Record<string, SpriteInfo>;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(pointer: fine)').matches;
const BASE = (import.meta.env.BASE_URL as string).replace(/\/$/, '');

const onVisible = (el: Element, cb: (visible: boolean) => void, threshold = 0) =>
  new IntersectionObserver(([e]) => cb(e.isIntersecting), { threshold }).observe(el);

/* ---------- Hero: layered parallax on scroll and pointer ---------- */
function hero() {
  const root = document.querySelector<HTMLElement>('[data-ch-hero]');
  if (!root || reduce) return;
  const layers = [...root.querySelectorAll<HTMLElement>('[data-depth]')].map((el) => ({ el, d: Number(el.dataset.depth) }));
  let mx = 0, my = 0, tx = 0, ty = 0, visible = true, raf = 0;
  const tick = () => {
    mx += (tx - mx) * 0.07;
    my += (ty - my) * 0.07;
    const sy = window.scrollY;
    for (const { el, d } of layers) {
      el.style.transform = `translate3d(${mx * d * 30}px, ${sy * d * 0.35 + my * d * 18}px, 0)`;
    }
    raf = visible ? requestAnimationFrame(tick) : 0;
  };
  onVisible(root, (v) => {
    visible = v;
    if (v && !raf) raf = requestAnimationFrame(tick);
  });
  if (fine)
    root.addEventListener('pointermove', (e) => {
      const r = root.getBoundingClientRect();
      tx = -((e.clientX - r.left) / r.width - 0.5);
      ty = -((e.clientY - r.top) / r.height - 0.5);
    });
}

/* ---------- Briefing: the conversation plays out when it comes into view ---------- */
function briefing() {
  const list = document.querySelector<HTMLElement>('[data-briefing]');
  if (!list) return;
  const lines = [...list.querySelectorAll<HTMLElement>('[data-line]')];
  if (reduce) return;
  lines.forEach((l) => l.classList.add('is-waiting'));
  let played = false;
  onVisible(
    list,
    (v) => {
      if (!v || played) return;
      played = true;
      let delay = 200;
      for (const l of lines) {
        const typing = Math.min(1100, 350 + l.textContent!.trim().length * 18);
        setTimeout(() => l.classList.replace('is-waiting', 'is-typing'), delay);
        setTimeout(() => l.classList.replace('is-typing', 'is-shown'), delay + typing);
        delay += typing + 450;
      }
    },
    0.35,
  );
}

/* ---------- Soul cards: flip to read the gags ---------- */
function soulCards() {
  document.querySelectorAll<HTMLElement>('[data-soul]').forEach((card) => {
    const btn = card.querySelector<HTMLButtonElement>('[data-flip]')!;
    const toggle = () => {
      const on = !card.classList.contains('is-flipped');
      card.classList.toggle('is-flipped', on);
      btn.setAttribute('aria-pressed', String(on));
      btn.textContent = on ? 'Back to the soul' : 'How it loses';
    };
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
    card.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).closest('a,button')) toggle();
    });
  });
}

/* ---------- Bosses: tilt toward the pointer ---------- */
function bossTilt() {
  if (reduce || !fine) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', `${-y * 10}deg`);
      el.style.setProperty('--ry', `${x * 14}deg`);
      el.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
      el.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });
}

/* ---------- New towers: pick a tier ---------- */
function towerTiers() {
  document.querySelectorAll<HTMLElement>('[data-tower-card]').forEach((card) => {
    const big = [...card.querySelectorAll<HTMLElement>('[data-tier-big]')];
    const thumbs = [...card.querySelectorAll<HTMLButtonElement>('[data-tier-thumb]')];
    const label = card.querySelector<HTMLElement>('[data-tier-name]');
    thumbs.forEach((t, i) =>
      t.addEventListener('click', () => {
        big.forEach((b, j) => b.classList.toggle('is-shown', i === j));
        thumbs.forEach((b, j) => b.setAttribute('aria-pressed', String(i === j)));
        if (label) label.textContent = t.dataset.label ?? '';
      }),
    );
  });
}

/* ---------- Soul parade: a tiny game. Tap a soul to seal it. ---------- */
function parade() {
  const root = document.querySelector<HTMLElement>('[data-parade]');
  if (!root) return;
  const field = root.querySelector<HTMLElement>('[data-parade-field]')!;
  const sealedEl = root.querySelector<HTMLElement>('[data-sealed]')!;
  const escapedEl = root.querySelector<HTMLElement>('[data-escaped]')!;
  const quip = root.querySelector<HTMLElement>('[data-parade-quip]')!;
  const ids: string[] = JSON.parse(root.dataset.parade || '[]');
  const echo = root.hasAttribute('data-echo');
  if (!ids.length) return;

  let sealed = 0, escaped = 0, running = false, raf = 0, last = 0, nextSpawn = 0;
  type Walker = { el: HTMLElement; x: number; speed: number; scale: number };
  const walkers = new Set<Walker>();

  const quips = {
    sealed: ['Sealed. Virgil nods, slightly.', 'Poof. Dante writes it down.', 'Another one for the Codex.', 'Adequate.', 'Nothing got through. Mark the calendar.'],
    escaped: ['One got out! Is that bad?', 'We’re a very bad dam.', 'Virgil’s face says that’s bad.'],
  };
  const say = (list: string[]) => (quip.textContent = list[Math.floor(Math.random() * list.length)]);

  const spriteStyle = (id: string, scale: number) => {
    const s = SPRITES[id];
    return `--src:url('${BASE}/sprites/${id}.webp');--w:${s.width};--h:${s.height};--n:${s.frames};--fps:${s.fps};--scale:${scale}`;
  };

  const spawn = (x?: number) => {
    const id = ids[Math.floor(Math.random() * ids.length)];
    const scale = 0.5 + Math.random() * 0.18;
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'parade__soul';
    el.setAttribute('aria-label', 'Seal this soul');
    el.innerHTML = `<span class="sprite${echo ? ' sprite--echo' : ''}" style="${spriteStyle(id, scale)}"></span>`;
    const w: Walker = { el, x: x ?? -SPRITES[id].width * scale, speed: 38 + Math.random() * 40, scale };
    el.style.transform = `translateX(${w.x}px)`;
    el.style.bottom = `${8 + Math.random() * 26}px`;
    el.addEventListener('click', () => seal(w));
    field.appendChild(el);
    walkers.add(w);
  };

  const poof = (x: number, bottom: string, scale: number) => {
    const p = document.createElement('span');
    p.className = 'sprite parade__poof';
    p.setAttribute('aria-hidden', 'true');
    p.setAttribute('style', `${spriteStyle('fx-poof', scale)};left:${x}px;bottom:${bottom}`);
    field.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  };

  const seal = (w: Walker) => {
    if (!walkers.has(w)) return;
    walkers.delete(w);
    const width = w.el.offsetWidth;
    poof(w.x + width / 2 - 70, w.el.style.bottom, 0.7);
    w.el.remove();
    sealed++;
    sealedEl.textContent = String(sealed);
    if (sealed % 3 === 1) say(quips.sealed);
  };

  const step = (t: number) => {
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    const W = field.clientWidth;
    if (t > nextSpawn && walkers.size < 5) {
      spawn();
      nextSpawn = t + 1500 + Math.random() * 1600;
    }
    for (const w of walkers) {
      w.x += w.speed * dt;
      w.el.style.transform = `translateX(${w.x}px)`;
      if (w.x > W) {
        walkers.delete(w);
        w.el.remove();
        escaped++;
        escapedEl.textContent = String(escaped);
        if (escaped % 4 === 1) say(quips.escaped);
      }
    }
    if (running) raf = requestAnimationFrame(step);
  };

  if (reduce) {
    // No walking: three souls stand still and can still be sealed.
    const W = field.clientWidth || 600;
    [0.15, 0.45, 0.75].forEach((f) => spawn(W * f));
    return;
  }
  onVisible(root, (v) => {
    running = v;
    cancelAnimationFrame(raf);
    last = 0;
    if (v) raf = requestAnimationFrame(step);
  });
}

hero();
briefing();
soulCards();
bossTilt();
towerTiers();
parade();
