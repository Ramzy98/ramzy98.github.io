'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  
  const logs = [
    'INIT_KERNEL_v1.0.4',
    'LOAD_NEURAL_ASSETS',
    'MOUNT_PROJECT_DB',
    'SYNC_EXPERIENCE_LOGS',
    'ESTABLISH_HANDSHAKE',
    'BYPASS_FIREWALL',
    'SYNCHRONIZATION_COMPLETE'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const inc = Math.floor(Math.random() * 12) + 1;
        return Math.min(prev + inc, 100);
      });
    }, 120);

    const logTimer = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#020202] z-[9999] overflow-hidden">
      {/* Background Matrix/Binary Rain */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex justify-around">
        {Array(15).fill(0).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -500 }}
            animate={{ y: 1000 }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: 'linear' }}
            className="text-cyan-400 font-mono text-[8px] whitespace-pre"
          >
            {Array(50).fill(0).map(() => Math.round(Math.random())).join('\n')}
          </motion.div>
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        {/* Core Geometry Unfolding */}
        <div className="relative mb-12">
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="w-32 h-32 border-[1px] border-cyan-400/20 border-t-cyan-400 border-r-cyan-400 rounded-full"
           />
           <motion.div
             animate={{ rotate: -360 }}
             transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
             className="absolute inset-2 border-[1px] border-white/5 border-b-white/40 rounded-full"
           />
           <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 bg-white rounded-full shadow-[0_0_15px_#ffffff]" 
              />
           </div>
        </div>

        {/* Deciphering Name */}
        <div className="mb-6 h-8 flex items-center justify-center">
           <motion.h1 
             className="text-white font-mono text-2xl tracking-[0.4em] font-bold"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
           >
              {progress < 40 ? '#######' : progress < 80 ? 'R#MZY_8' : 'RAMZY.IO'}
           </motion.h1>
        </div>

        {/* Status Log Line */}
        <div className="h-4 flex items-center gap-3 mb-8">
           <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F0FF] animate-pulse" />
           <span className="text-cyan-400/60 font-mono text-[9px] tracking-widest uppercase">
              [ {logs[logIndex]} ]
           </span>
        </div>

        {/* Progress Container */}
        <div className="w-64 flex flex-col items-center">
           <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_#00F0FF]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
           </div>
           
           <div className="mt-4 flex justify-between w-full font-mono text-[10px]">
              <span className="text-gray-600">SYST_OS_v1.2</span>
              <span className="text-cyan-400">{progress}%</span>
           </div>
        </div>
      </div>
    </div>
  );
}
