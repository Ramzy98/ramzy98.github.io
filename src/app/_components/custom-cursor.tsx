'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Track velocity for warping effect
  const xVelocity = useVelocity(cursorX);
  const yVelocity = useVelocity(cursorY);
  
  // Transform velocity into scale and rotation
  const scaleX = useTransform(xVelocity, [-3000, 0, 3000], [1.3, 1, 1.3]);
  const scaleY = useTransform(yVelocity, [-3000, 0, 3000], [1.3, 1, 1.3]);
  const rotate = useTransform([xVelocity, yVelocity], ([latestX, latestY]: any) => {
    return Math.atan2(latestY, latestX) * (180 / Math.PI);
  });

  const springConfig = { damping: 35, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, [role="button"], .interactive'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    updateInteractiveElements();
    const interval = setInterval(updateInteractiveElements, 2000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(interval);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Background Aura (Slow follow) */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none z-[9998] hidden md:block translate-x-[-50%] translate-y-[-50%]"
        style={{
          left: useSpring(cursorX, { damping: 50, stiffness: 100 }),
          top: useSpring(cursorY, { damping: 50, stiffness: 100 }),
        }}
      />

      {/* Main Precision Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] hidden md:flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          scale: isClicked ? 0.8 : 1,
        }}
      >
        {/* Click Ripple */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute w-full h-full border border-cyan-400 rounded-full"
            />
          )}
        </AnimatePresence>

        {/* Warp Wrapper */}
        <motion.div
           style={{
             scaleX: scaleX,
             scaleY: scaleY,
             rotate: isHovering ? 45 : rotate,
           }}
           className="relative flex items-center justify-center"
        >
          {/* Main Ring */}
          <motion.div
            animate={{
              borderColor: isHovering ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 240, 255, 0.3)',
              backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
            }}
            className="absolute w-5 h-5 rounded-full border border-cyan-400/30 transition-colors duration-300 backdrop-blur-[1px]"
          />
          
          {/* Target Crosshair / Node */}
          <motion.div
            animate={{
              rotate: isHovering ? 90 : 0,
              backgroundColor: isHovering ? '#fff' : '#00F0FF',
            }}
            className="w-1.5 h-1.5 rounded-sm shadow-[0_0_10px_#00F0FF] z-10"
          />

          {/* Crosshair Spikes */}
          <AnimatePresence>
             {isHovering && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                   <div className="absolute w-[2px] h-8 bg-cyan-400 top-[-10px]" />
                   <div className="absolute w-[2px] h-8 bg-cyan-400 bottom-[-10px]" />
                   <div className="absolute h-[2px] w-8 bg-cyan-400 left-[-10px]" />
                   <div className="absolute h-[2px] w-8 bg-cyan-400 right-[-10px]" />
                </motion.div>
             )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
