'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaArrowUp } from 'react-icons/fa6';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#about"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gray-300 hover:text-accent hover:border-accent/40 transition-colors"
        >
          <FaArrowUp />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
