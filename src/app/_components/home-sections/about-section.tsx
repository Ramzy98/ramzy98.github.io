'use client';

import { useRef } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { FaArrowDown, FaLocationDot } from 'react-icons/fa6';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import { openResume } from '@/app/_lib/events';
import { track } from '@/app/_lib/analytics';
import { RevealWords } from '../scroll/reveal-text';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function AboutSection({ years }: { years: number }) {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // The hero recedes gently as it scrolls away.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  const handleResumeClick = () => {
    openResume();
    track('resume_open', { source: 'hero' });
  };

  return (
    <section
      id="about"
      ref={heroRef}
      aria-labelledby="hero-name"
      className="w-full min-h-[calc(100svh-8rem)] flex flex-col justify-center items-center px-6 pb-16 relative"
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { scale, opacity, filter }}
        className="text-center w-full max-w-3xl"
      >
        <motion.div {...fadeUp(0)} className="relative inline-block mb-8">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-[1.75rem] p-1.5 bg-white/5 border border-white/10 shadow-2xl">
            <Image
              src="/me.webp"
              alt="Portrait of Ahmad Ramzy"
              width={640}
              height={788}
              priority
              className="w-full h-full object-cover rounded-[1.4rem]"
            />
          </div>
        </motion.div>

        <motion.p {...fadeUp(0.05)} className="section-eyebrow mb-5">
          {PORTFOLIO_DATA.role} · {years}+ years
        </motion.p>

        <motion.h1
          id="hero-name"
          aria-label={PORTFOLIO_DATA.name}
          {...fadeUp(0.1)}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6"
        >
          <BouncyWord word="Ahmad" />{' '}
          <BouncyWord word="Ramzy" gradient />
        </motion.h1>

        <div className="max-w-2xl mx-auto mb-4">
          <RevealWords
            mode="enter"
            enterDelay={0.25}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed text-center"
            segments={[
              { text: 'I build' },
              { text: 'payment and CRM platforms', tone: 'bright' },
              { text: 'with' },
              { text: 'TypeScript, Node.js and React', tone: 'accent' },
              { text: '— from the first commit to production scale.' },
            ]}
          />
        </div>

        <motion.p
          {...fadeUp(0.35)}
          className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-10"
        >
          <FaLocationDot aria-hidden="true" className="text-accent/80" />
          {PORTFOLIO_DATA.location} · working remotely with teams in Dubai and London
        </motion.p>

        <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <button
            type="button"
            onClick={handleResumeClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-accent transition-colors active:scale-[0.98]"
          >
            View resume
          </button>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/15 text-white font-semibold hover:border-accent/60 hover:text-accent transition-colors"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.a
          {...fadeUp(0.5)}
          href="#fit"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-accent transition-colors"
        >
          Hiring? Paste your job description and see how I fit
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </motion.a>

        <motion.ul {...fadeUp(0.55)} className="flex justify-center gap-2">
          {PORTFOLIO_DATA.socialLinks.map(({ Icon, link, platform }) => (
            <li key={platform}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                onClick={() => track('social_click', { platform, source: 'hero' })}
                className="flex items-center justify-center w-11 h-11 rounded-full text-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Icon />
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <a
        href="#experience"
        aria-label="Scroll to experience"
        className="absolute bottom-2 left-1/2 -translate-x-1/2 p-3 text-gray-500 hover:text-accent transition-colors motion-safe:animate-bounce"
      >
        <FaArrowDown />
      </a>
    </section>
  );
}

/** Each letter springs up when hovered or tapped — a small reward for poking at the name. */
function BouncyWord({ word, gradient = false }: { word: string; gradient?: boolean }) {
  const letters = word.split('');
  return (
    <span aria-hidden="true" className="inline-block whitespace-nowrap">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className={`inline-block cursor-default select-none ${gradient ? '' : 'text-white'}`}
          // Slice one continuous gradient across the letters so the word still reads as one sweep.
          style={
            gradient
              ? {
                  backgroundImage: 'linear-gradient(to right, var(--color-accent), #ffffff)',
                  backgroundSize: `${letters.length * 100}% 100%`,
                  backgroundPosition: `${(i / Math.max(letters.length - 1, 1)) * 100}% 0`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
              : undefined
          }
          whileHover={{ y: -14, rotate: i % 2 === 0 ? -6 : 6 }}
          whileTap={{ y: -14, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 12 }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}
