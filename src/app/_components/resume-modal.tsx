import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; radius: number; alpha: number; speed: number }[] = [];

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        alpha: Math.random(),
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        star.y += star.speed;
        star.alpha = star.alpha < 0.1 ? 1 : star.alpha - 0.01;

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(animate);
    }

    animate();

    const changeCharacterPosition = () => {
      setIsVisible(false);
      setTimeout(() => {
        const newX = Math.random() * window.innerWidth;
        const newY = Math.random() * window.innerHeight;
        setCharacterPosition({ x: newX, y: newY });
        setIsVisible(true);
      }, 500);
    };

    const intervalId = setInterval(changeCharacterPosition, 5000);

    return () => clearInterval(intervalId);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
          onClick={onClose}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 rounded-3xl p-8 w-11/12 h-5/6 max-w-5xl border-4 border-blue-400 shadow-2xl shadow-blue-500/50 relative z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
                Resume
              </h2>
              <button
                onClick={onClose}
                className="text-blue-300 hover:text-blue-100 transition duration-300 transform hover:rotate-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-blue-200 mb-6 italic text-lg">
              Warning: Reading this resume may cause spontaneous job offers and uncontrollable urges
              to hire.
            </p>
            <div className="relative w-full h-[calc(100%-8rem)] rounded-2xl overflow-hidden shadow-inner shadow-blue-500/50">
              <iframe
                src="/Ahmad_Ramzy_Resume.pdf"
                className="w-full h-full rounded-2xl bg-black bg-opacity-70"
                title="Resume: The Document That Launched a Thousand Careers"
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {isVisible && (
              <motion.div
                key={`${characterPosition.x}-${characterPosition.y}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, filter: 'blur(10px)' }}
                transition={{
                  duration: 0.3,
                  exit: { duration: 0.2 },
                }}
                style={{
                  position: 'fixed',
                  left: characterPosition.x,
                  top: characterPosition.y,
                  zIndex: 60,
                }}
              >
                <Image
                  src="/rickandmorty.webp"
                  alt="Rocket launching with resume"
                  width={120}
                  height={120}
                  className="transform -translate-x-1/2 -translate-y-1/2 filter drop-shadow-lg animate-float"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
