// Motion for the descent. The page reads fine without this file: it only animates
// content that is already in the HTML.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initDescent() {
  const scenes = gsap.utils.toArray<HTMLElement>('[data-scene]');
  const gauge = document.querySelector<HTMLElement>('[data-gauge]');
  const gaugeFill = document.querySelector<HTMLElement>('[data-gauge-fill]');
  const gaugeLinks = gsap.utils.toArray<HTMLAnchorElement>('[data-gauge-link]');
  const descent = document.querySelector<HTMLElement>('#descent');
  if (!descent || !scenes.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  // Souls only walk while their scene is on screen (cheap CSS; paused otherwise).
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-active', e.isIntersecting)),
    { rootMargin: '10% 0px' },
  );
  scenes.forEach((s) => io.observe(s));

  // Pins first, so the triggers below are measured with the pin spacing in place.
  const mm = gsap.matchMedia();
  if (!reduce) {

    // Desktop: pin each circle briefly while its card, boss and parallax play out.
    mm.add('(min-width: 900px) and (pointer: fine)', () => {
      scenes.forEach((scene) => {
        const bg = scene.querySelector('[data-scene-bg]');
        const card = scene.querySelector('[data-scene-card]');
        const boss = scene.querySelector('[data-scene-boss]');
        const dormant = scene.querySelector('[data-dormant]');

        gsap.fromTo(bg, { yPercent: -5 }, {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true },
        });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: scene, start: 'top top', end: '+=70%', pin: true, scrub: 0.6, anticipatePin: 1 },
        });
        tl.from(card, { y: 70, opacity: 0, duration: 0.5, ease: 'power2.out' })
          .from(boss, { x: 160, opacity: 0, duration: 0.6, ease: 'back.out(1.4)' }, '-=0.15')
          .to({}, { duration: 0.6 }); // a beat to look at it before moving on
        if (dormant) tl.to(dormant, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, '-=0.6');
      });
    });

    // Phones and tablets: no pinning, just a light reveal and parallax.
    mm.add('(max-width: 899px), (pointer: coarse)', () => {
      scenes.forEach((scene) => {
        const bg = scene.querySelector('[data-scene-bg]');
        const card = scene.querySelector('[data-scene-card]');
        const boss = scene.querySelector('[data-scene-boss]');
        const dormant = scene.querySelector('[data-dormant]');

        gsap.fromTo(bg, { yPercent: -3 }, {
          yPercent: 3,
          ease: 'none',
          scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true },
        });
        gsap.from([card, boss], {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: scene, start: 'top 70%', once: true },
        });
        if (dormant)
          gsap.to(dormant, { opacity: 0, duration: 1.2, scrollTrigger: { trigger: dormant, start: 'top 60%', once: true } });
      });
    });
  }

  // Colour wash, depth gauge and the active numeral.
  const setActive = (scene: HTMLElement) => {
    root.style.setProperty('--wash', scene.dataset.colour ?? '#5f7a6a');
    const n = scene.dataset.scene;
    gaugeLinks.forEach((a) => {
      const on = a.dataset.gaugeLink === n;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };
  // A pinned scene is wrapped in a pin-spacer that covers its whole scroll range.
  const range = (scene: HTMLElement) =>
    scene.parentElement?.classList.contains('pin-spacer') ? scene.parentElement : scene;
  scenes.forEach((scene) =>
    ScrollTrigger.create({
      trigger: range(scene),
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => self.isActive && setActive(scene),
    }),
  );
  ScrollTrigger.create({
    trigger: descent,
    start: 'top 40%',
    end: 'bottom 60%',
    onToggle: (self) => gauge?.classList.toggle('is-visible', self.isActive),
    onUpdate: (self) => gaugeFill && gsap.set(gaugeFill, { scaleY: self.progress }),
  });

  ScrollTrigger.refresh();
}
