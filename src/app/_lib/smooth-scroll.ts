import type Lenis from 'lenis';

/**
 * Shared handle on the page's Lenis instance, so anything can scroll
 * smoothly (or pause scrolling under a dialog) without prop drilling.
 * Falls back to native scrolling when Lenis isn't running, e.g. with
 * reduced motion.
 */
let lenis: Lenis | null = null;

/** Keeps anchor targets clear of the floating nav. */
export const NAV_OFFSET = -96;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export function pauseScroll() {
  lenis?.stop();
}

export function resumeScroll() {
  lenis?.start();
}
