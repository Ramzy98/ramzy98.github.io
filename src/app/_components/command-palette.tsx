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
          <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/90 shadow-[0_0_50px_rgba(0,0,0,0.5)] glass-panel"
            >
              {/* Animated Scanline */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
                <motion.div 
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                />
              </div>

              {/* Terminal Header */}
              <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                <div className="text-cyan-400 font-mono text-sm opacity-50">&gt;_</div>
                <input
                  type="text"
                  autoFocus
                  placeholder="Execute command..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-600 focus:outline-none text-lg font-light tracking-wide lg:text-xl"
                />
                <div className="flex items-center gap-2">
                   <span className="text-[10px] text-gray-500 font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase tracking-tighter">Ctrl</span>
                   <span className="text-[10px] text-gray-500 font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase tracking-tighter text-cyan-400">K</span>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-3 scrollbar-hide">
                {filteredCommands.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-gray-500 text-sm font-mono tracking-widest uppercase">Null result</p>
                    <p className="text-gray-700 text-xs mt-1 italic">No matching commands in system database.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-1">
                    {/* Categories could go here, currently simple list */}
                    {filteredCommands.map((command) => (
                      <button
                        key={command.id}
                        onClick={command.action}
                        className="group w-full flex items-center justify-between px-5 py-4 text-left rounded-xl transition-all duration-200 hover:bg-cyan-400/5 hover:border-cyan-400/20 border border-transparent focus:outline-none focus:bg-cyan-400/5 group"
                      >
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-lg bg-white/5 group-hover:bg-cyan-400/10 transition-colors">
                              {command.icon}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{command.name}</span>
                              <span className="text-[10px] text-gray-600 font-mono group-hover:text-cyan-400/60 uppercase">{command.section}</span>
                           </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
                           <span className="text-cyan-400/50 text-xs font-mono">EXECUTE &rarr;</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Footer status bar */}
              <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
                       SYSTEM ONLINE
                    </div>
                 </div>
                 <p className="text-[10px] font-mono text-gray-600 tracking-tighter">PORTFOLIO_DB_V0.1</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
