'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import type { Experience } from '@/types/portfolio';
import { Highlight } from '@/app/_lib/highlight';
import { RevealHeading, RevealWords } from '../scroll/reveal-text';

export default function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.8', 'end 0.6'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="experience-heading" className="w-full py-24 px-6 relative">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="section-eyebrow mb-4">Experience</p>
          <RevealHeading
            id="experience-heading"
            lead="Where I've"
            accent="worked"
            className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight"
          />
          <RevealWords
            className="text-gray-300 text-lg"
            segments={[{ text: 'Product teams in Dubai and London, building for real users at scale.' }]}
          />
        </div>

        <div ref={timelineRef} className="relative">
          <div aria-hidden="true" className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/70 to-transparent origin-top"
          />

          <ol className="space-y-12 md:space-y-16">
            {PORTFOLIO_DATA.experiences.map((exp, index) => (
              <TimelineItem key={`${exp.company}-${exp.title}`} experience={exp} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ experience, index }: { experience: Experience; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <li className={`relative flex md:items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      <div className="hidden md:block md:w-1/2" />

      <span
        aria-hidden="true"
        className="absolute left-3 md:left-1/2 top-7 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-3.5 h-3.5 rounded-full bg-background border-2 border-accent shadow-[0_0_12px_rgba(34,211,238,0.5)]"
      />

      <motion.article
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: isEven ? 32 : -32 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-10%' }}
        className={`w-full md:w-1/2 pl-10 ${isEven ? 'md:pl-0 md:pr-10' : 'md:pl-10'}`}
      >
        <div className="glass-panel p-6 sm:p-7 hover:border-accent/30">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">{experience.date}</p>
          <h3 className="text-xl sm:text-2xl font-semibold text-white">{experience.title}</h3>
          <p className="text-gray-300 font-medium mt-1">
            {experience.company}
            <span className="text-gray-500 font-normal"> · {experience.location}</span>
          </p>

          <ul className="mt-5 space-y-2.5">
            {experience.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-gray-400">
                <span aria-hidden="true" className="text-accent mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>
                  <Highlight text={item} className="text-gray-100 font-medium" />
                </span>
              </li>
            ))}
          </ul>

          <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <li
                key={skill}
                className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-cyan-200"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </li>
  );
}
