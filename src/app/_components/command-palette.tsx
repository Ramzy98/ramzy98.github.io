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
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-lg border border-cyan-400/20 bg-[#050505]/95 shadow-[0_0_50px_rgba(0,240,255,0.1)] backdrop-blur-xl"
            >
              {/* CRT / System Grain Filter */}
              <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.08]">
                 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="crtNoise">
                       <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#crtNoise)" />
                 </svg>
              </div>

              {/* Animated Scanline (High Precision) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                <motion.div 
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-1 bg-cyan-400/10 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                />
              </div>

              {/* Terminal Header */}
              <div className="px-6 pt-6 pb-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-2 h-2 rounded-full bg-red-500/50" />
                   <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                   <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                   <span className="ml-2 text-[10px] font-mono text-gray-500 tracking-tighter uppercase opacity-50">Secure_Shell // Portfolio_Auth // Root</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-cyan-400 font-mono text-lg font-bold animate-pulse">&gt;_</div>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search System Database..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-gray-700 focus:outline-none text-xl font-mono tracking-tight"
                  />
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded font-mono">
                     <span className="text-[10px] text-gray-500">ESC</span>
                     <span className="text-[10px] text-gray-700">TO</span>
                     <span className="text-[10px] text-cyan-400">EXIT</span>
                  </div>
                </div>
              </div>

              <div className="max-h-[50vh] overflow-y-auto p-4 scrollbar-hide bg-[#0a0a0a]/50">
                {filteredCommands.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.1, repeat: Infinity }}
                      className="text-red-500 font-mono text-xs uppercase tracking-[0.5em] mb-2"
                    >
                      [ Access Denied ]
                    </motion.div>
                    <p className="text-gray-700 font-mono text-[10px]">Requested PID not found in kernel logs.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {filteredCommands.map((command) => (
                      <button
                        key={command.id}
                        onClick={command.action}
                        className="group w-full flex items-center justify-between px-4 py-3 rounded border border-transparent hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all duration-150 relative overflow-hidden"
                      >
                        <div className="flex items-center gap-4 relative z-10">
                           <div className="text-gray-600 group-hover:text-cyan-400 transition-colors">
                              {command.icon}
                           </div>
                           <div className="flex items-baseline gap-2">
                              <span className="text-xs font-mono text-gray-500 opacity-40">&gt; EXEC</span>
                              <span className="text-sm font-mono text-gray-300 group-hover:text-white group-hover:pl-2 transition-all">
                                 {command.name.replace('Go to ', '').toUpperCase()}
                              </span>
                              <span className="hidden sm:inline text-[9px] font-mono text-gray-700 group-hover:text-cyan-400/40 uppercase ml-4">
                                 ADDR:{command.section}
                              </span>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-4 relative z-10">
                           <span className="text-[10px] font-mono text-gray-700 group-hover:text-cyan-400 transition-colors">
                              [ STATUS: OK ]
                           </span>
                           <div className="w-1 h-3 bg-cyan-400 opacity-0 group-hover:opacity-100 animate-pulse" />
                        </div>
                        
                        {/* Interactive Glint Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Expandable Meta Footer */}
              <div className="px-6 py-4 border-t border-white/5 bg-[#0a0a0a] flex flex-col gap-3">
                 <div className="flex justify-between items-center opacity-60">
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500">
                          <span className="text-cyan-400">KERNEL:</span> 0.12.8-STABLE
                       </div>
                       <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500">
                          <span className="text-cyan-400">MEMORY:</span> 1.2GB/32GB
                       </div>
                       <div className="hidden sm:flex items-center gap-2 text-[9px] font-mono text-gray-500">
                          <span className="text-cyan-400">UPTIME:</span> 243h
                       </div>
                    </div>
                    <div className="text-[9px] font-mono text-gray-600">LN 1, COL 1</div>
                 </div>

                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500 uppercase tracking-tighter">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       Connection_Secure_TLS_1.3
                    </div>
                    <div className="text-[10px] font-mono text-gray-500">
                       USER@RAMZY_SYSTEM: ~
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
