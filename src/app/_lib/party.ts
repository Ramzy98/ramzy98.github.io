const COLORS = ['#5ccfe2', '#94dfeb', '#ffffff', '#fcd34d'];

/** Fires a confetti burst. The library is loaded on first use, so it costs nothing until someone parties. */
export async function party() {
  const { default: confetti } = await import('canvas-confetti');
  const base = { colors: COLORS, zIndex: 300, disableForReducedMotion: true };

  confetti({ ...base, particleCount: 110, spread: 75, startVelocity: 45, origin: { y: 0.65 } });
  setTimeout(() => {
    confetti({ ...base, particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.75 } });
    confetti({ ...base, particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.75 } });
  }, 180);
}
