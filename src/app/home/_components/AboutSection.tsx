import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useTransform, useScroll } from 'framer-motion';
import { FaGithub, FaLinkedin, FaMedium, FaXTwitter } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';
import Image from 'next/image';

export default function AboutSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = ['Software Engineer', 'Fullstack Engineer', 'Frontend Engineer', 'Pizza Lover 🍕'];

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    canvas.width = 256;
    canvas.height = 256;

    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
    const fontSize = 10;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);

    return () => clearInterval(titleInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('intro');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.section
      id="home"
      className="flex flex-col justify-center items-center sm:p-8 relative"
      style={{
        backgroundImage: "url('/path-to-your-background-image.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 300]),
        }}
        className="absolute inset-0 z-0"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full max-w-4xl relative z-10"
      >
        <motion.div
          className="w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6 sm:mb-8 relative overflow-hidden rounded-full border-4 border-purple-500 shadow-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/me.jpeg"
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="transition-all duration-300 ease-in-out"
            priority
          />
          <canvas ref={canvasRef} className="absolute inset-0 mix-blend-overlay opacity-30" />
          <motion.div
            className="absolute inset-0 bg-purple-600 opacity-0"
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full flex flex-col items-center justify-center text-white">
              <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">👋</span>
              <span className="text-base sm:text-lg font-semibold">Hello, I&apos;m Ramzy!</span>
            </div>
          </motion.div>
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Ahmad Ramzy
        </motion.h1>
        <motion.div
          className="text-2xl sm:text-3xl text-gray-800 dark:text-white mb-4 sm:mb-6 h-12 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={titleIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text"
            >
              {titles[titleIndex]}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <motion.p
          className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Passionate Full Stack Software Engineer dedicated to crafting innovative digital
          solutions. I thrive on solving complex problems and creating seamless user experiences.
          With a background in teaching and a love for continuous learning. Always eager to dive
          into new challenges, both in code and underwater! 🤿
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4 sm:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {[
            { Icon: FaGithub, color: 'white', link: '#' },
            { Icon: FaLinkedin, color: '#0077B5', link: '#' },
            { Icon: FaMedium, color: '#00AB6C', link: '#' },
            { Icon: FaXTwitter, color: '#1DA1F2', link: '#' },
            { Icon: SiGmail, color: '#EA4335', link: '#' },
          ].map(({ Icon, color, link }, index) => (
            <motion.a
              key={index}
              href={link}
              whileHover={{
                scale: 1.2,
                color: color,
              }}
              whileTap={{ scale: 0.9 }}
              className="text-2xl sm:text-3xl text-gray-800 dark:text-white transition-colors duration-300"
            >
              <Icon />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}