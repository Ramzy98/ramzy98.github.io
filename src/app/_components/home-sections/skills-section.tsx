'use client';

import { motion, useReducedMotion } from 'motion/react';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import type { Skill } from '@/types/portfolio';
import { RevealHeading, RevealWords } from '../scroll/reveal-text';

export default function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" aria-labelledby="skills-heading" className="w-full py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="section-eyebrow mb-4">Skills</p>
          <RevealHeading
            id="skills-heading"
            lead="Tools I"
            accent="ship with"
            className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight"
          />
          <RevealWords
            className="text-gray-300 text-lg"
            segments={[{ text: 'The stack behind the work above, grouped by where it lives.' }]}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {PORTFOLIO_DATA.skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-6 sm:p-7"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 mb-5">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillChip({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <li className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-gray-200 hover:border-white/25 transition-colors">
      {Icon && <Icon aria-hidden="true" className="text-base shrink-0" style={{ color: skill.color }} />}
      {skill.name}
    </li>
  );
}
