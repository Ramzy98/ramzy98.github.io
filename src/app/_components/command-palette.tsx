'use client';

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaArrowRight, FaCopy, FaFileLines, FaMagnifyingGlass } from 'react-icons/fa6';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import { SECTIONS } from '@/app/_lib/sections';
import { OPEN_PALETTE_EVENT, openResume } from '@/app/_lib/events';
import { track } from '@/app/_lib/analytics';

interface Command {
  id: string;
  label: string;
  group: 'Navigate' | 'Actions' | 'Links';
  icon: React.ReactNode;
  run: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const listId = useId();

  const open = useCallback(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
    track('command_palette_open');
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelected(0);
    restoreFocusRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) close();
        else open();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, open);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, open);
    };
  }, [isOpen, open, close]);

  const commands = useMemo<Command[]>(
    () => [
      ...SECTIONS.map(({ id, label }) => ({
        id,
        label: `Go to ${label}`,
        group: 'Navigate' as const,
        icon: <FaArrowRight />,
        run: () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
      })),
      {
        id: 'fit',
        label: 'Check fit with a job description',
        group: 'Actions',
        icon: <FaMagnifyingGlass />,
        run: () => document.getElementById('fit')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'resume',
        label: 'View resume',
        group: 'Actions',
        icon: <FaFileLines />,
        run: openResume,
      },
      {
        id: 'copy-email',
        label: copied ? 'Email copied!' : `Copy email (${PORTFOLIO_DATA.email})`,
        group: 'Actions',
        icon: <FaCopy />,
        run: () => {
          navigator.clipboard?.writeText(PORTFOLIO_DATA.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
      },
      ...PORTFOLIO_DATA.socialLinks.map(({ platform, link, Icon }) => ({
        id: platform,
        label: platform === 'Email' ? 'Send an email' : `Open ${platform}`,
        group: 'Links' as const,
        icon: <Icon />,
        run: () => window.open(link, '_blank', 'noopener,noreferrer'),
      })),
    ],
    [copied]
  );

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));

  const runCommand = (command: Command) => {
    // Copying keeps the palette open so the confirmation is visible.
    if (command.id !== 'copy-email') close();
    command.run();
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter' && filtered[selected]) {
      e.preventDefault();
      runCommand(filtered[selected]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      // The input is the only focusable element; keep focus inside the dialog.
      e.preventDefault();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-start justify-center p-4 pt-[12vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c]/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 px-5 border-b border-white/10">
              <FaMagnifyingGlass className="text-gray-500 shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                autoFocus
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={filtered[selected] ? `${listId}-${filtered[selected].id}` : undefined}
                aria-label="Search commands"
                placeholder="Type a command or search…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={onInputKeyDown}
                className="flex-1 bg-transparent py-4 text-base text-white placeholder:text-gray-500 focus:outline-none"
              />
              <kbd className="hidden sm:block px-1.5 py-0.5 rounded border border-white/15 text-[11px] font-mono text-gray-400">
                Esc
              </kbd>
            </div>

            <ul id={listId} role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-4 py-10 text-center text-sm text-gray-400">No results.</li>}
              {filtered.map((command, i) => {
                const showGroup = i === 0 || filtered[i - 1].group !== command.group;
                const isSelected = i === selected;
                return (
                  <React.Fragment key={command.id}>
                    {showGroup && (
                      <li role="presentation" className="px-3 pt-3 pb-1 text-[11px] font-mono uppercase tracking-widest text-gray-500">
                        {command.group}
                      </li>
                    )}
                    <li
                      id={`${listId}-${command.id}`}
                      role="option"
                      aria-selected={isSelected}
                      onMouseMove={() => setSelected(i)}
                      onClick={() => runCommand(command)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-colors ${
                        isSelected ? 'bg-accent/10 text-white' : 'text-gray-300'
                      }`}
                    >
                      <span className={isSelected ? 'text-accent' : 'text-gray-500'} aria-hidden="true">
                        {command.icon}
                      </span>
                      {command.label}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>

            <div className="flex gap-4 px-5 py-2.5 border-t border-white/10 text-[11px] font-mono text-gray-500">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
