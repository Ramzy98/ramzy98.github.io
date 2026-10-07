/**
 * The intro's state lives on <html data-intro="…">, set by an inline script
 * before first paint so the overlay never flashes in or out:
 *   play    → intro will run (page scroll locked)
 *   lifting → curtain is lifting; the page underneath starts animating in
 *   done    → intro finished
 *   skip    → no intro this time (seen this session, reduced motion, deep link)
 */
export const INTRO_DONE_EVENT = 'intro:done';

/** Runs in <head> before anything renders. Keep it tiny and dependency-free. */
export const INTRO_DECIDER_SCRIPT = `(function(){var d=document.documentElement;try{var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=sessionStorage.getItem('intro-seen');var home=location.pathname==='/'&&!location.hash;d.dataset.intro=(!reduce&&!seen&&home)?'play':'skip';}catch(e){d.dataset.intro='skip';}})();`;
