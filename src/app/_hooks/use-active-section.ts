'use client';

import { useEffect, useState } from 'react';

/** Tracks which section is under the upper third of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      // A thin band a third of the way down the viewport: whichever section
      // crosses it is the one being read.
      { rootMargin: '-33% 0px -66% 0px' }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
