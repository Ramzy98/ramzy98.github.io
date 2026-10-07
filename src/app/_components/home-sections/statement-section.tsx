'use client';

import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';

type Tone = 'default' | 'bright' | 'accent';

const STATEMENT: { text: string; tone?: Tone }[] = [
  { text: 'I own products' },
  { text: 'end to end', tone: 'accent' },
  { text: '— frontend, backend and everything between — and build them to be' },
  { text: 'fast, reliable', tone: 'accent' },
  { text: 'and a pleasure to use.' },
];

const TONE_CLASS: Record<Tone, string> = {
  default: 'text-white',
  bright: 'text-white',
  accent: 'text-gradient-cyan',
};

// Scroll progress (0–1 through the pinned stretch) where each part plays.
const WORDS_START = 0.04;
const WORDS_END = 0.62;
const STATS_AT = 0.66;

/**
 * Pinned manifesto between the hero and the work: the sentence lights up word
 * by word as you scroll, then the numbers count up. Reduced motion gets the
 * finished state with no pinning.
 */
export default function StatementSection({ years }: { years: number }) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [showStats, setShowStats] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= STATS_AT) setShowStats(true);
  });

  const words = STATEMENT.flatMap(({ text, tone = 'default' }) =>
    text.split(' ').map((word) => ({ word, tone }))
  );

  const stats = [
    { to: years, suffix: '+', label: 'years shipping production software' },
    { to: 8, suffix: '+', label: 'payment providers integrated' },
    { to: 99.9, suffix: '%', decimals: 1, label: 'platform reliability' },
    { to: 50, suffix: '+', label: 'students mentored' },
  ];

  const statsVisible = shouldReduceMotion || showStats;

  return (
    <section
      ref={ref}
      aria-label="What I do"
      className={`relative w-full ${shouldReduceMotion ? 'py-24' : 'h-[260vh]'}`}
    >
      <div
        className={`${shouldReduceMotion ? '' : 'sticky top-0 h-[100svh]'} flex flex-col items-center justify-center px-6 pt-20 sm:pt-0`}
      >
        <p className="max-w-5xl text-center font-display text-[1.7rem] sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
          {words.map(({ word, tone }, i) => {
            const span = (WORDS_END - WORDS_START) / words.length;
            const start = WORDS_START + i * span;
            return (
              <span key={i}>
                <Word
                  progress={scrollYProgress}
                  range={[start, start + span * 2.5]}
                  className={TONE_CLASS[tone]}
                  still={!!shouldReduceMotion}
                >
                  {word}
                </Word>{' '}
              </span>
            );
          })}
        </p>

        <dl className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 max-w-5xl w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={false}
              animate={statsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: statsVisible ? i * 0.08 : 0, ease: [0.16, 1, 0.3, 1] }}
              // dt must precede dd in markup; flex-col-reverse puts the number on top visually.
              className="flex flex-col-reverse text-center border-t border-white/10 pt-5"
            >
              <dt className="mt-2 text-sm text-gray-400">{stat.label}</dt>
              <dd className="font-sans text-4xl sm:text-5xl font-bold tracking-tight tabular-nums text-white">
                <CountUp to={stat.to} decimals={stat.decimals} suffix={stat.suffix} run={statsVisible} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  className,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className: string;
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const blur = useTransform(progress, range, [6, 0]);
  const y = useTransform(progress, range, [14, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.span
      style={still ? undefined : { opacity, filter, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

function CountUp({ to, decimals = 0, suffix = '', run }: { to: number; decimals?: number; suffix?: string; run: boolean }) {
  const value = useMotionValue(0);
  const text = useTransform(value, (v) =>
    v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  );

  useEffect(() => {
    if (!run) return;
    const controls = animate(value, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [run, to, value]);

  return (
    <>
      <motion.span>{text}</motion.span>
      {suffix}
    </>
  );
}
