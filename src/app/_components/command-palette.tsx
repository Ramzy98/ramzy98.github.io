'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLaptopCode, FaRocket, FaEnvelope, FaFileAlt, FaGithub } from 'react-icons/fa';
import { useAnalyticsContext } from './analytics-provider';

interface Command {
  id: string;
  name: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  section: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { trackInteraction } = useAnalyticsContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
        trackInteraction('command_palette_toggle', { action: isOpen ? 'close' : 'open' });
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, trackInteraction]);

  const runCommand = (command: () => void) => {
    setIsOpen(false);
    setSearch('');
    command();
  };

  const commands: Command[] = [
    {
      id: 'about',
      name: 'Go to About',
      icon: <FaUser className="text-gray-400" />,
      section: 'Navigation',
      action: () => runCommand(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })),
    },
    {
      id: 'experience',
      name: 'Go to Experience',
      icon: <FaRocket className="text-gray-400" />,
      section: 'Navigation',
      action: () => runCommand(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })),
    },
    {
      id: 'projects',
      name: 'Go to Projects',
      icon: <FaLaptopCode className="text-gray-400" />,
      section: 'Navigation',
      action: () => runCommand(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })),
    },
    {
      id: 'contact',
      name: 'Go to Contact',
      icon: <FaEnvelope className="text-gray-400" />,
      section: 'Navigation',
      action: () => runCommand(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })),
    },
    {
      id: 'resume',
      name: 'Download Resume',
      icon: <FaFileAlt className="text-blue-400" />,
      section: 'Actions',
      action: () => runCommand(() => window.open('/Ahmad_Ramzy_Software_Engineer_Resume.pdf', '_blank')),
    },
    {
      id: 'github',
      name: 'GitHub Profile',
      icon: <FaGithub className="text-white" />,
      section: 'Links',
      action: () => runCommand(() => window.open('https://github.com/Ramzy98', '_blank')),
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-gray-900/95 shadow-2xl glass-panel"
            >
              <div className="flex items-center px-4 py-4 border-b border-white/5">
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                />
                <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded">ESC</span>
              </div>

              <div className="max-h-96 overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <p className="text-center text-gray-500 py-8 text-sm">No results found.</p>
                ) : (
                  <div className="space-y-1">
                    {filteredCommands.map((command) => (
                      <button
                        key={command.id}
                        onClick={command.action}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors focus:outline-none focus:bg-white/5"
                      >
                        {command.icon}
                        <span className="flex-1">{command.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
