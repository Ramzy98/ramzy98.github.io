'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  const [text, setText] = useState('INITIALIZING');

  useEffect(() => {
    const dots = setInterval(() => {
      setText((t) => (t.length >= 15 ? 'INITIALIZING' : t + '.'));
    }, 400);
    return () => clearInterval(dots);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-transparent backdrop-blur-sm z-50 overflow-hidden pointer-events-none">
      <div className="relative flex justify-center items-center w-64 h-64">
        {/* Core Glow */}
        <motion.div
           className="absolute w-16 h-16 bg-cyan-400 rounded-full blur-[40px]"
           animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
           transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Outer Ring */}
        <motion.div
          className="absolute w-48 h-48 border-[1px] border-white/10 rounded-full border-t-cyan-400/80"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Ring (Reverse) */}
        <motion.div
          className="absolute w-32 h-32 border-[1px] border-white/5 rounded-full border-b-white/80"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Node */}
        <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#00F0FF]" />
      </div>

      <motion.div 
        className="mt-8 text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase w-48 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {text}
      </motion.div>
    </div>
  );
}
