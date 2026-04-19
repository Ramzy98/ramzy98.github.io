'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiStorybook,
  SiCypress,
  SiJasmine,
  SiRubyonrails,
} from 'react-icons/si';

const skills = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'Ruby on Rails', icon: SiRubyonrails, color: '#CC0000' },
  { name: 'SQL', icon: FaDatabase, color: '#4479A1' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Storybook', icon: SiStorybook, color: '#FF4785' },
  { name: 'Cypress', icon: SiCypress, color: '#04C38E' },
  { name: 'Jasmine', icon: SiJasmine, color: '#8A4182' },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-8 relative overflow-visible">
      <div className="container mx-auto max-w-6xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tighter">
            TECH <span className="text-gradient-cyan">STACK</span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl">
            Modern tools and frameworks I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      250px circle at ${mouseX}px ${mouseY}px,
      rgba(0, 240, 255, 0.15),
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onMouseMove={onMouseMove}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="glass-panel relative p-6 rounded-3xl flex flex-col items-center justify-center group shadow-none transition-all duration-300 bg-[#0a0a0a] border-white/5 hover:border-cyan-400/30 overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      
      <div className="relative mb-3 z-10">
        <skill.icon
          className="text-4xl sm:text-5xl transition-all duration-300 grayscale group-hover:grayscale-0"
          style={{ filter: `drop-shadow(0 0 10px rgba(0, 240, 255, 0.1))` }}
        />
        <div className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ backgroundColor: skill.color }} />
      </div>
      <p className="relative z-10 text-[10px] sm:text-[11px] font-bold text-gray-400 group-hover:text-white transition-colors duration-300 uppercase tracking-widest text-center">
        {skill.name}
      </p>
    </motion.div>
  );
}
