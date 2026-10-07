'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import { party } from '@/app/_lib/party';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/** Small rewards for the curious: a console greeting and the Konami code. */
export default function EasterEggs() {
  const [toast, setToast] = useState<string | null>(null);
  const progress = useRef(0);

  useEffect(() => {
    console.info(
      '%c👋 Hey, fellow engineer.%c\n\nIf you are reading the console, we should talk.\n' +
        `→ ${PORTFOLIO_DATA.email}\n\n` +
        'Psst: try the Konami code, or press Ctrl/⌘ + K.',
      'font-size:16px;font-weight:700;color:#22d3ee',
      'font-size:12px;color:#9aa4b2'
    );
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, [contenteditable="true"]')) return;

      const expected = KONAMI[progress.current];
      progress.current = e.key.toLowerCase() === expected.toLowerCase() ? progress.current + 1 : e.key === KONAMI[0] ? 1 : 0;

      if (progress.current === KONAMI.length) {
        progress.current = 0;
        party();
        setToast('Cheat code accepted. +30 lives, and a standing invite to say hi.');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[310] max-w-[calc(100%-2rem)] px-5 py-3 rounded-full bg-white text-black text-sm font-semibold shadow-2xl"
        >
          🎮 {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
