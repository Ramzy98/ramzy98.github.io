'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-16 rounded-full"
            style={{ backgroundColor: colors[index] }}
            animate={{
              y: [0, -20, 0],
              backgroundColor: colors,
            }}
            transition={{
              y: {
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: index * 0.2,
              },
              backgroundColor: {
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}
