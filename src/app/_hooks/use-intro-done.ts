'use client';

import { useSyncExternalStore } from 'react';
import { INTRO_DONE_EVENT } from '@/app/_lib/intro';

const subscribe = (onChange: () => void) => {
  window.addEventListener(INTRO_DONE_EVENT, onChange);
  return () => window.removeEventListener(INTRO_DONE_EVENT, onChange);
};

/** True once the page underneath should animate in. */
export function useIntroDone() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.intro !== 'play',
    () => false
  );
}
