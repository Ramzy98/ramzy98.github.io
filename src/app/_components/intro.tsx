'use client';

import { useEffect, useRef } from 'react';
import { INTRO_DONE_EVENT } from '@/app/_lib/intro';

interface Particle {
  x0: number;
  y0: number;
  tx: number;
  ty: number;
  delay: number;
  color: string;
}

const ASSEMBLE_S = 0.85;
const MAX_DELAY_S = 0.3;
const HOLD_S = 0.3;
const LIFT_MS = 750;
const MAX_PARTICLES = 2600;

/** Pending “unlock the page” after an unmount, cancelled if the intro remounts (React dev double-mount). */
let unlockTimer: ReturnType<typeof setTimeout> | undefined;

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Where to draw the name: on top of the real hero heading, in its exact font. */
function nameLayout() {
  const words = document.querySelectorAll<HTMLElement>('#hero-name [data-word]');
  const heading = document.getElementById('hero-name');
  if (!heading || words.length === 0) return null;
  const style = getComputedStyle(heading);
  return {
    font: `800 ${style.fontSize} ${style.fontFamily}`,
    letterSpacing: style.letterSpacing,
    words: Array.from(words).map((el) => ({
      text: el.dataset.word ?? '',
      gradient: el.dataset.gradient === 'true',
      rect: el.getBoundingClientRect(),
    })),
  };
}

/** Samples the lit pixels of the rendered name into particle targets. */
function buildParticles(width: number, height: number): Particle[] {
  const layout = nameLayout();
  if (!layout) return [];

  const off = document.createElement('canvas');
  off.width = width;
  off.height = height;
  const ctx = off.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];
  ctx.font = layout.font;
  // Canvas ignores CSS letter-spacing unless told; tracking-tight matters at this size.
  ctx.letterSpacing = layout.letterSpacing;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  layout.words.forEach(({ text, rect }) => ctx.fillText(text, rect.left, rect.top + rect.height / 2));

  const data = ctx.getImageData(0, 0, width, height).data;
  const lit: { x: number; y: number }[] = [];
  for (let gap = 3; gap < 12; gap++) {
    lit.length = 0;
    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        if (data[(y * width + x) * 4 + 3] > 128) lit.push({ x, y });
      }
    }
    if (lit.length <= MAX_PARTICLES) break;
  }

  const cx = width / 2;
  const cy = height / 2;
  const reach = Math.max(width, height);
  return lit.map(({ x, y }) => {
    const word = layout.words.find((w) => y >= w.rect.top - 10 && y <= w.rect.bottom + 10 && x >= w.rect.left - 10);
    const along = word ? (x - word.rect.left) / Math.max(word.rect.width, 1) : 0;
    // Gradient words fade cyan → white across the word, like the CSS heading.
    const color = word?.gradient
      ? `rgb(${Math.round(lerp(34, 255, along))},${Math.round(lerp(211, 255, along))},${Math.round(lerp(238, 255, along))})`
      : '#ffffff';
    const angle = Math.random() * Math.PI * 2;
    const radius = reach * (0.55 + Math.random() * 0.6);
    return {
      x0: cx + Math.cos(angle) * radius,
      y0: cy + Math.sin(angle) * radius,
      tx: x,
      ty: y,
      // Sweep left to right so the name "writes" itself.
      delay: (x / width) * MAX_DELAY_S * 0.7 + Math.random() * MAX_DELAY_S * 0.3,
      color,
    };
  });
}

/**
 * First-visit intro: particles fly in and assemble into the name exactly where
 * the hero heading sits, then the curtain lifts and the real heading takes
 * over in place. Any click, key or scroll skips straight to the lift.
 */
export default function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    clearTimeout(unlockTimer);
    if (html.dataset.intro !== 'play') return;
    try {
      sessionStorage.setItem('intro-seen', '1');
    } catch {
      /* private mode: the intro may just replay next visit */
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const curtain = curtainRef.current;
    if (!canvas || !ctx || !curtain) return;

    let frame = 0;
    let lifted = false;
    let cancelled = false;

    const lift = () => {
      if (lifted) return;
      lifted = true;
      html.dataset.intro = 'lifting';
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));

      canvas.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, easing: 'ease-out', fill: 'forwards' });
      const anim = curtain.animate([{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)' }], {
        duration: LIFT_MS,
        easing: 'cubic-bezier(0.77, 0, 0.18, 1)',
        fill: 'forwards',
      });
      const finish = () => {
        cancelAnimationFrame(frame);
        html.dataset.intro = 'done';
      };
      anim.onfinish = finish;
      // Belt and braces in case the animation never reports finishing.
      setTimeout(finish, LIFT_MS + 150);
    };

    // Whatever happens (an exception, a zero-size viewport, a throttled
    // background tab), the visitor is never left stuck behind the overlay.
    const watchdog = setTimeout(lift, 4000);

    const skip = () => lift();
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, skip, { passive: true, once: true }));

    const start = async () => {
      const heading = document.getElementById('hero-name');
      const family = heading ? getComputedStyle(heading).fontFamily : 'sans-serif';
      // Wait (briefly) for the display font so the particles match the heading.
      await Promise.race([document.fonts.load(`800 64px ${family}`), new Promise((r) => setTimeout(r, 500))]);
      if (cancelled || lifted) return;
      // Browser restored a scroll position: the heading is off-screen, so just reveal.
      if (window.scrollY > 40) {
        lift();
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w === 0 || h === 0) {
        lift();
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const particles = buildParticles(w, h);
      if (particles.length === 0) {
        lift();
        return;
      }

      const size = particles.length > 1800 ? 1.6 : 2;
      const t0 = performance.now();

      const draw = (now: number) => {
        const t = (now - t0) / 1000;
        const settled = t > ASSEMBLE_S + MAX_DELAY_S;

        // Translucent wipe instead of a clear: leaves short light trails in flight.
        ctx.fillStyle = settled ? '#03060d' : 'rgba(3, 6, 13, 0.32)';
        ctx.fillRect(0, 0, w, h);

        for (const p of particles) {
          const k = easeOutExpo(Math.min(Math.max((t - p.delay) / ASSEMBLE_S, 0), 1));
          // A slight curve on the way in reads as motion, not a straight teleport.
          const swirl = (1 - k) * 60;
          const x = lerp(p.x0, p.tx, k) + Math.sin(p.ty * 0.05 + t * 6) * swirl;
          const y = lerp(p.y0, p.ty, k) + Math.cos(p.tx * 0.05 + t * 6) * swirl;
          ctx.fillStyle = p.color;
          ctx.fillRect(x, y, size, size);
        }

        if (t > ASSEMBLE_S + MAX_DELAY_S + HOLD_S) lift();
        if (!cancelled) frame = requestAnimationFrame(draw);
      };
      frame = requestAnimationFrame(draw);
    };

    start().catch(lift);

    return () => {
      cancelled = true;
      clearTimeout(watchdog);
      cancelAnimationFrame(frame);
      events.forEach((e) => window.removeEventListener(e, skip));
      // If we unmount mid-intro for good, never leave the page locked behind it.
      unlockTimer = setTimeout(() => {
        if (html.dataset.intro === 'play') {
          html.dataset.intro = 'done';
          window.dispatchEvent(new Event(INTRO_DONE_EVENT));
        }
      }, 100);
    };
  }, []);

  return (
    <div id="intro" ref={rootRef} aria-hidden="true" className="fixed inset-0 z-[400]">
      <div ref={curtainRef} className="absolute inset-0 bg-[#03060d]">
        <p className="absolute bottom-8 inset-x-0 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-gray-500">
          Click or press any key to skip
        </p>
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
