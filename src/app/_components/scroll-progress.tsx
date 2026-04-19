'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar Progress (More subtle) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-400 z-[100] shadow-[0_0_10px_#00F0FF]"
        style={{ scaleX: scaleProgress, transformOrigin: '0%' }}
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-8 right-8 z-[100]"
          >
            <div className="relative group p-1">
              {/* Circular Progress Ring */}
              <svg className="w-14 h-14 transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  strokeLinecap="round"
                  className="text-cyan-400"
                  style={{
                    pathLength: scrollYProgress,
                    filter: 'drop-shadow(0 0 5px #00F0FF)',
                  }}
                />
              </svg>

              {/* Scroll To Top Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="absolute inset-2 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-md rounded-full border border-white/10 text-white hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300 group shadow-2xl"
              >
                <div className="relative">
                   <motion.div 
                     animate={{ y: [0, -2, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity }}
                   >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                   </motion.div>
                </div>
              </button>
              
              {/* Tooltip */}
              <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 px-2 py-1 bg-cyan-400 text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  SCROLL TO TOP
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
