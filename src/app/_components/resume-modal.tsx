import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="flex flex-col w-full h-full sm:w-11/12 sm:h-5/6 max-w-5xl rounded-[24px] bg-[#050505] border border-white/10 shadow-2xl relative z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-white/5 bg-white/[0.02]">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  <span className="text-cyan-400">/</span>resume.pdf
                </h2>
                <p className="text-gray-500 text-sm mt-1 font-mono">
                  Highly-optimized professional payload.
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <a
                  href="/Ahmad_Ramzy_Resume.pdf"
                  download
                  title="Download Resume"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
                <button
                  onClick={onClose}
                  title="Close"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-red-400 hover:border-red-400/50 hover:bg-red-400/10 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full bg-black/50 p-6 sm:p-8 overflow-hidden rounded-b-[24px]">
              <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5 relative bg-[#111]">
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 animate-pulse">
                  <span className="font-mono text-sm">Loading PDF Viewer...</span>
                </div>
                <iframe
                  src="/Ahmad_Ramzy_Resume.pdf"
                  className="relative z-10 w-full h-full bg-transparent"
                  title="Ahmad Ramzy Resume"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
