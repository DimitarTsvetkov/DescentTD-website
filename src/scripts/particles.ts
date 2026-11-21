// Ambient weather for a circle's hero: mist, petals, rain, coins, bubbles, embers, sparks, snow or stars.
// Runs only while on screen; skipped with reduced motion.
import type { Particle } from '../data/circlePages';

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  t: number; // phase
  s: number; // spin / speed variance
}

interface Preset {
  density: number; // particles per 10,000 px²
  max: number;
  spawn(w: number, h: number, anywhere: boolean): P;
  draw(ctx: CanvasRenderingContext2D, p: P, time: number): void;
  wrap?: 'top' | 'bottom' | 'left';
}

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const base = (w: number, h: number, anywhere: boolean, from: 'top' | 'bottom' | 'left'): P => ({
  x: from === 'left' && !anywhere ? -20 : rnd(0, w),
  y: anywhere ? rnd(0, h) : from === 'top' ? -20 : from === 'bottom' ? h + 20 : rnd(0, h),
  vx: 0,
  vy: 0,
  r: 1,
  a: 1,
  t: rnd(0, Math.PI * 2),
  s: rnd(0.6, 1.4),
});

const glow = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, inner: string, outer: string) => {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
};

const presets: Record<Particle, Preset> = {
  mist: {
    density: 0.06, max: 14, wrap: 'left',
    spawn: (w, h, any) => ({ ...base(w, h, any, 'left'), y: rnd(h * 0.3, h), vx: rnd(0.08, 0.25), r: rnd(90, 220), a: rnd(0.05, 0.12) }),
    draw: (ctx, p) => glow(ctx, p.x, p.y, p.r, `rgba(200,215,205,${p.a})`, 'rgba(200,215,205,0)'),
  },
  petals: {
    density: 0.5, max: 70, wrap: 'left',
    spawn: (w, h, any) => ({ ...base(w, h, any, 'left'), vx: rnd(1.2, 2.8), vy: rnd(-0.3, 0.5), r: rnd(3, 6), a: rnd(0.55, 0.95) }),
    draw: (ctx, p, t) => {
      p.y += Math.sin(t / 500 + p.t) * 0.6;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(t / (300 * p.s) + p.t);
      ctx.scale(1, Math.abs(Math.cos(t / 400 + p.t)) * 0.7 + 0.3);
      ctx.fillStyle = p.s > 1 ? `rgba(240,140,200,${p.a})` : `rgba(175,120,235,${p.a})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r * 1.4, p.r, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
  },
  rain: {
    density: 1.6, max: 220, wrap: 'top',
    spawn: (w, h, any) => ({ ...base(w + 200, h, any, 'top'), vx: -2.2, vy: rnd(9, 14), r: rnd(10, 22), a: rnd(0.18, 0.4) }),
    draw: (ctx, p) => {
      ctx.strokeStyle = `rgba(190,210,225,${p.a})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 1.6, p.y - p.r);
      ctx.stroke();
    },
  },
  coins: {
    density: 0.25, max: 40, wrap: 'top',
    spawn: (w, h, any) => ({ ...base(w, h, any, 'top'), vy: rnd(0.6, 1.4), vx: rnd(-0.2, 0.2), r: rnd(4, 8), a: rnd(0.7, 1) }),
    draw: (ctx, p, t) => {
      const sx = Math.abs(Math.cos(t / (240 * p.s) + p.t));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(Math.max(sx, 0.12), 1);
      ctx.fillStyle = `rgba(242,184,75,${p.a})`;
      ctx.strokeStyle = `rgba(140,90,20,${p.a})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      if (sx > 0.96) glow(ctx, p.x, p.y, p.r * 3, `rgba(255,240,180,${0.5 * p.a})`, 'rgba(255,240,180,0)');
    },
  },
  bubbles: {
    density: 0.3, max: 45, wrap: 'bottom',
    spawn: (w, h, any) => ({ ...base(w, h, any, 'bottom'), vy: -rnd(0.4, 1.1), r: rnd(3, 10), a: rnd(0.3, 0.6) }),
    draw: (ctx, p, t) => {
      p.x += Math.sin(t / 600 + p.t) * 0.4;
      ctx.strokeStyle = `rgba(140,230,215,${p.a})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(220,255,250,${p.a * 0.6})`;
      ctx.beginPath();
      ctx.arc(p.x - p.r * 0.35, p.y - p.r * 0.35, p.r * 0.25, 0, Math.PI * 2);
      ctx.fill();
    },
  },
  embers: {
    density: 0.35, max: 60, wrap: 'bottom',
    spawn: (w, h, any) => ({ ...base(w, h, any, 'bottom'), vy: -rnd(0.4, 1.2), vx: rnd(-0.2, 0.2), r: rnd(1, 2.6), a: rnd(0.5, 1) }),
    draw: (ctx, p, t) => {
      p.x += Math.sin(t / 700 + p.t) * 0.3;
      glow(ctx, p.x, p.y, p.r * 4, `rgba(255,190,100,${p.a})`, 'rgba(255,90,30,0)');
    },
  },
  sparks: {
    density: 0.3, max: 50, wrap: 'bottom',
    spawn: (w, h, any) => ({ ...base(w, h, any, 'bottom'), vy: -rnd(0.3, 0.9), vx: rnd(-0.3, 0.3), r: rnd(1, 2.2), a: rnd(0.4, 0.9) }),
    draw: (ctx, p, t) => {
      const flick = 0.5 + 0.5 * Math.sin(t / 90 + p.t * 5);
      glow(ctx, p.x, p.y, p.r * 4, `rgba(235,225,90,${p.a * flick})`, 'rgba(200,180,40,0)');
    },
  },
  snow: {
    density: 0.6, max: 110, wrap: 'top',
    spawn: (w, h, any) => ({ ...base(w, h, any, 'top'), vy: rnd(0.3, 0.9), r: rnd(1, 3), a: rnd(0.5, 0.95) }),
    draw: (ctx, p, t) => {
      p.x += Math.sin(t / 900 + p.t) * 0.35;
      ctx.fillStyle = `rgba(235,245,255,${p.a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    },
  },
  stars: {
    density: 0.5, max: 90,
    spawn: (w, h) => ({ ...base(w, h, true, 'top'), y: rnd(0, h * 0.75), r: rnd(0.6, 1.8), a: rnd(0.4, 1) }),
    draw: (ctx, p, t) => {
      const tw = 0.35 + 0.65 * Math.abs(Math.sin(t / (900 * p.s) + p.t));
      glow(ctx, p.x, p.y, p.r * 3, `rgba(210,220,255,${p.a * tw})`, 'rgba(150,160,255,0)');
    },
  },
};

export function startParticles(canvas: HTMLCanvasElement, kind: Particle) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const preset = presets[kind];
  const ctx = canvas.getContext('2d');
  if (!preset || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0, ps: P[] = [], running = false, raf = 0;

  const resize = () => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(preset.max, Math.round(((w * h) / 10000) * preset.density));
    ps = Array.from({ length: n }, () => preset.spawn(w, h, true));
  };

  const out = (p: P) => p.y > h + 40 || p.y < -40 || p.x > w + 240 || p.x < -260;

  const frame = (time: number) => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      p.x += p.vx;
      p.y += p.vy;
      if (preset.wrap && out(p)) ps[i] = preset.spawn(w, h, false);
      preset.draw(ctx, ps[i], time);
    }
    if (running) raf = requestAnimationFrame(frame);
  };

  resize();
  window.addEventListener('resize', resize);
  new IntersectionObserver(([e]) => {
    running = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (running) raf = requestAnimationFrame(frame);
  }).observe(canvas);
}
