'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15);
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#050505] z-[9999] overflow-hidden pointer-events-none">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,240,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative flex justify-center items-center w-72 h-72">
        {/* Breathing Aura */}
        <motion.div
           className="absolute w-32 h-32 bg-cyan-500/20 rounded-full blur-[60px]"
           animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
           transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Data Rings */}
        <motion.div
          className="absolute w-64 h-64 border-2 border-cyan-400/20 rounded-full border-t-cyan-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="absolute w-56 h-56 border border-white/5 rounded-full border-b-white/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Binary Stream (Subtle) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-20">
           <div className="text-[8px] font-mono whitespace-nowrap animate-marquee vertical text-cyan-400/50">
              {Array(10).fill('101001101010 011010101001 ').join('\n')}
           </div>
        </div>

        {/* Center Neural Node */}
        <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: ['0 0 10px #00F0FF', '0 0 30px #00F0FF', '0 0 10px #00F0FF']
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-12 h-12 bg-[#0a0a0a] border border-cyan-400/50 rounded-xl flex items-center justify-center transform rotate-45 overflow-hidden"
            >
               <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-transparent flex items-center justify-center -rotate-45">
                  <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
               </div>
            </motion.div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="mt-12 flex flex-col items-center gap-2">
        <div className="flex items-center gap-4 text-cyan-400 font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="opacity-40">System_Status:</span>
          <span className="font-bold text-white transition-all duration-300">
             {progress < 100 ? 'Establishing Neural Link...' : 'Synchronization Complete'}
          </span>
        </div>
        
        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
           <motion.div 
             className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_#00F0FF]"
             initial={{ width: 0 }}
             animate={{ width: `${progress}%` }}
           />
        </div>

        <div className="text-cyan-400/50 font-mono text-[12px] mt-1">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}
