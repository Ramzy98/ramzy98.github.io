/**
 * The resume dialog and command palette are mounted once in the layout.
 * Anything on the page can open them by dispatching these window events.
 */
export const OPEN_RESUME_EVENT = 'resume:open';
export const OPEN_PALETTE_EVENT = 'palette:open';

export function openResume() {
  window.dispatchEvent(new Event(OPEN_RESUME_EVENT));
}

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}
