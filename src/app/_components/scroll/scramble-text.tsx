'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>';
const DURATION_MS = 750;

/**
 * A label that "decodes" from random glyphs into its text, left to right, the
 * first time it scrolls into view. Screen readers and crawlers only ever see
 * the real text.
 */
export function ScrambleText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView || shouldReduceMotion) return;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const revealed = Math.floor(progress * text.length);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += i < revealed || ch === ' ' || ch === '·' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, shouldReduceMotion, text]);

  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </p>
  );
}
