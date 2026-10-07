'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { FaArrowDown, FaLocationDot } from 'react-icons/fa6';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import { openResume } from '@/app/_lib/events';
import { track } from '@/app/_lib/analytics';

const EASE = [0.16, 1, 0.3, 1] as const;
const HIDDEN = { opacity: 0, y: 16 };
const SHOWN = { opacity: 1, y: 0 };

export default function AboutSection({ years }: { years: number }) {
  const fadeUp = (delay: number) => ({
    initial: HIDDEN,
    animate: SHOWN,
    transition: { duration: 0.6, delay, ease: EASE },
  });

  const handleResumeClick = () => {
    openResume();
    track('resume_open', { source: 'hero' });
  };

  return (
    <section
      id="about"
      aria-labelledby="hero-name"
      className="w-full min-h-[calc(100svh-8rem)] flex flex-col justify-center items-center px-6 pb-16 relative"
    >
      <div className="text-center w-full max-w-3xl">
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

        <h1
          id="hero-name"
          aria-label={PORTFOLIO_DATA.name}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6"
        >
          <BouncyWord word="Ahmad" delay={0.05} />{' '}
          <BouncyWord word="Ramzy" delay={0.2} gradient />
        </h1>

        <motion.p
          {...fadeUp(0.3)}
          className="max-w-2xl mx-auto mb-4 text-lg sm:text-xl text-gray-300 leading-relaxed"
        >
          I build products end to end with{' '}
          <span className="text-white font-medium">TypeScript, React and Node.js</span> — from{' '}
          <span className="text-white font-medium">payment systems that can&apos;t fail</span> to{' '}
          <span className="text-white font-medium">real-time apps people use every day.</span>
        </motion.p>

        <motion.p
          {...fadeUp(0.35)}
          className="flex items-center justify-center gap-2 text-sm text-gray-400"
        >
          <FaLocationDot aria-hidden="true" className="text-gray-500" />
          {PORTFOLIO_DATA.location} · working remotely with teams in Dubai and London
        </motion.p>
        <motion.p {...fadeUp(0.4)} className="max-w-xl mx-auto mt-2 mb-10 text-sm text-gray-400">
          {PORTFOLIO_DATA.offTheClock}
        </motion.p>

        <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
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
      </div>

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
function BouncyWord({
  word,
  delay,
  gradient = false,
}: {
  word: string;
  delay: number;
  gradient?: boolean;
}) {
  const letters = word.split('');
  const spring = { type: 'spring', stiffness: 500, damping: 12 } as const;
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
          initial={{ opacity: 0, y: '0.35em' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: delay + i * 0.04, ease: EASE }}
          whileHover={{ y: -14, rotate: i % 2 === 0 ? -6 : 6, transition: spring }}
          whileTap={{ y: -14, scale: 1.1, transition: spring }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}
