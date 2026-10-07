'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import type { Skill } from '@/types/portfolio';
import { RevealHeading, RevealWords } from '../scroll/reveal-text';
import { ScrambleText } from '../scroll/scramble-text';

/** Ring diameter (% of the orbit's width), spin period and direction, inner to outer. */
const RINGS = [
  { size: 42, seconds: 60, reverse: false },
  { size: 68, seconds: 85, reverse: true },
  { size: 93, seconds: 110, reverse: false },
];

const GROUP_ACCENTS = ['#22d3ee', '#818cf8', '#f472b6'];
const RING_NAMES = ['inner', 'middle', 'outer'];

/**
 * The stack as an orbit: one ring per area, spinning slowly around the
 * centre, beside a plain grouped list so it still scans in two seconds.
 * Hovering either side highlights the same skill on the other.
 */
export default function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const groups = PORTFOLIO_DATA.skillGroups;
  const total = groups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="w-full py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <ScrambleText className="section-eyebrow mb-4" text="Skills" />
          <RevealHeading
            id="skills-heading"
            lead="The stack behind"
            accent="the work"
            className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight"
          />
          <RevealWords
            className="text-gray-300 text-lg mb-10"
            segments={[{ text: 'Three rings, three layers of the product. Hover a name to find it in orbit.' }]}
          />

          <div className="space-y-6">
            {groups.map((group, g) => (
              <div key={group.title}>
                <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                  <span
                    aria-hidden="true"
                    className="w-2.5 h-2.5 rounded-full border-2"
                    style={{ borderColor: GROUP_ACCENTS[g] }}
                  />
                  {group.title}
                  <span className="normal-case tracking-normal text-gray-500">· {RING_NAMES[g]} ring</span>
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      onMouseEnter={() => setActive(skill.name)}
                      onMouseLeave={() => setActive(null)}
                      className={`px-3 py-1.5 rounded-lg border text-sm cursor-default transition-colors ${
                        active === skill.name
                          ? 'border-white/40 bg-white/10 text-white'
                          : 'border-white/10 bg-white/[0.03] text-gray-300'
                      }`}
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          // The spin pauses while a skill is highlighted, so it holds still to be read.
          className={`orbit relative mx-auto w-full max-w-[560px] aspect-square ${
            active || shouldReduceMotion ? 'orbit-paused' : ''
          }`}
          aria-hidden="true"
        >
          {RINGS.map((ring, g) => (
            <div
              key={g}
              className="absolute rounded-full border border-dashed border-white/10"
              style={{ inset: `${(100 - ring.size) / 2}%` }}
            />
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[20%] aspect-square rounded-full bg-accent/10 border border-accent/30 shadow-[0_0_60px_rgba(34,211,238,0.25)] flex flex-col items-center justify-center">
              <span className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-none">{total}</span>
              <span className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent">tools</span>
            </div>
          </div>

          {groups.map((group, g) => {
            const ring = RINGS[g];
            const spin = { animationDuration: `${ring.seconds}s` };
            return (
              <div
                key={group.title}
                className={`orbit-spin absolute inset-0 ${ring.reverse ? 'orbit-reverse' : ''}`}
                style={spin}
              >
                {group.skills.map((skill, i) => {
                  const angle = (i / group.skills.length) * Math.PI * 2 + g * 0.6;
                  const r = ring.size / 2;
                  return (
                    <div
                      key={skill.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${50 + Math.cos(angle) * r}%`, top: `${50 + Math.sin(angle) * r}%` }}
                    >
                      {/* Counter-spin so icons stay upright while the ring turns. */}
                      <div className={`orbit-spin ${ring.reverse ? '' : 'orbit-reverse'}`} style={spin}>
                        <OrbitIcon
                          skill={skill}
                          accent={GROUP_ACCENTS[g]}
                          isActive={active === skill.name}
                          onHover={setActive}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function OrbitIcon({
  skill,
  accent,
  isActive,
  onHover,
}: {
  skill: Skill;
  accent: string;
  isActive: boolean;
  onHover: (name: string | null) => void;
}) {
  const Icon = skill.icon;
  return (
    <div
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
      className="relative flex flex-col items-center"
    >
      <div
        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0a0f1c] border transition-all duration-300"
        style={{
          borderColor: isActive ? accent : 'rgba(255,255,255,0.12)',
          boxShadow: isActive ? `0 0 24px ${accent}80` : undefined,
          transform: isActive ? 'scale(1.25)' : undefined,
        }}
      >
        {Icon ? (
          <Icon className="text-lg sm:text-xl" style={{ color: skill.color }} />
        ) : (
          <span className="font-display font-extrabold text-white">{skill.name[0]}</span>
        )}
      </div>
      <span
        className={`pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded-md bg-black/80 px-2 py-0.5 text-[11px] text-white transition-opacity ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {skill.name}
      </span>
    </div>
  );
}
