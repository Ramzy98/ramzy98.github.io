'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { SECTIONS } from '@/app/_lib/sections';
import { openCommandPalette } from '@/app/_lib/events';
import { useActiveSection } from '@/app/_hooks/use-active-section';

const SECTION_IDS = SECTIONS.map((s) => s.id);
const noopSubscribe = () => () => {};

export default function NavBar() {
  const active = useActiveSection(SECTION_IDS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => true
  );

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-100 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="relative w-full md:w-auto flex items-center justify-between gap-4 md:gap-6 py-2 pl-5 pr-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-float"
      >
        <a href="#about" className="font-mono text-base text-white shrink-0" aria-label="Ahmad Ramzy — back to top">
          <span className="text-accent">&lt;</span>AR<span className="text-accent"> /&gt;</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {SECTIONS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <a
                  href={`#${id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Open command menu"
          >
            <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/5">{isMac ? '⌘' : 'Ctrl'}</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/5">K</kbd>
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden p-2.5 rounded-full text-white hover:bg-white/10 transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full inset-x-0 mt-2 p-2 rounded-3xl bg-surface/95 backdrop-blur-xl border border-white/10 shadow-float"
            >
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={active === id ? 'true' : undefined}
                    className={`block px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                      active === id ? 'text-white bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
