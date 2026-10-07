'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { NAV_OFFSET, registerLenis } from '@/app/_lib/smooth-scroll';

/** Inertial page scrolling. Skipped entirely for reduced-motion users. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      // In-page links (#about, #lab…) glide instead of jumping.
      anchors: { offset: NAV_OFFSET },
      // Let the lab log, the command menu and the resume dialog scroll themselves.
      allowNestedScroll: true,
    });
    registerLenis(lenis);

    return () => {
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
