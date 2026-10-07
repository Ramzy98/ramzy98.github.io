'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'motion/react';

export type RevealTone = 'default' | 'bright' | 'accent';

export interface RevealSegment {
  text: string;
  tone?: RevealTone;
}

const TONE_CLASS: Record<RevealTone, string> = {
  default: '',
  bright: 'text-white font-medium',
  accent: 'text-cyan-400 font-medium',
};

/**
 * Paragraph whose words brighten one by one.
 *
 * `mode="scroll"` scrubs the reveal against scroll position — right for copy
 * below the fold. `mode="enter"` runs the same look once on mount, which is
 * what above-the-fold copy needs: a scroll-linked reveal would leave the hero
 * tagline sitting at 20% opacity for anyone who hasn't scrolled yet.
 */
export function RevealWords({
  segments,
  className = '',
  mode = 'scroll',
  enterDelay = 0.6,
}: {
  segments: RevealSegment[];
  className?: string;
  mode?: 'scroll' | 'enter';
  enterDelay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.55'],
  });

  const words = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, tone: segment.tone ?? ('default' as RevealTone) })),
  );

  if (shouldReduceMotion) {
    return (
      <p ref={ref} className={className}>
        {words.map(({ word, tone }, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <span className={TONE_CLASS[tone]}>{word}</span>{' '}
          </React.Fragment>
        ))}
      </p>
    );
  }

  if (mode === 'enter') {
    return (
      <p ref={ref} className={className}>
        {words.map(({ word, tone }, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <motion.span
              className={`inline-block ${TONE_CLASS[tone]}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: enterDelay + i * 0.03, ease: 'easeOut' }}
            >
              {word}
            </motion.span>{' '}
          </React.Fragment>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {/* Real space text nodes between words keep textContent (and copy/paste) intact. */}
      {words.map(({ word, tone }, i) => {
        const start = i / words.length;
        const end = Math.min(start + 1.6 / words.length, 1);
        return (
          <React.Fragment key={`${word}-${i}`}>
            <Word progress={scrollYProgress} range={[start, end]} tone={tone}>
              {word}
            </Word>{' '}
          </React.Fragment>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  tone,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  tone: RevealTone;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block will-change-[opacity,transform] ${TONE_CLASS[tone]}`}
    >
      {children}
    </motion.span>
  );
}

/**
 * Section heading where each word slides up from behind a mask, staggered.
 * Fires once on entry rather than scrubbing — big type reads better with a
 * decisive reveal than with a scroll-scrubbed one.
 */
export function RevealHeading({
  id,
  lead,
  accent,
  className = '',
  as: Tag = 'h2',
}: {
  id?: string;
  lead: string;
  accent?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  const shouldReduceMotion = useReducedMotion();

  const words = [
    ...lead.split(' ').filter(Boolean).map((word) => ({ word, isAccent: false })),
    ...(accent ?? '')
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, isAccent: true })),
  ];

  return (
    <Tag id={id} className={className}>
      {words.map(({ word, isAccent }, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span
              className={`inline-block ${isAccent ? 'text-gradient-cyan' : ''}`}
              initial={shouldReduceMotion ? { y: 0, opacity: 0 } : { y: '110%' }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.75,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>{' '}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/** Small caps label that fades in above a heading. */
export function RevealEyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
