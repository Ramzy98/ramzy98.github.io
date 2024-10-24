import React from 'react';
import { motion } from 'framer-motion';
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
    <section id="skills" className="relative overflow-hidden p-8">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white"
        >
          Skills & Technologies
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gray-800 mb-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                <skill.icon
                  className="text-4xl sm:text-5xl transition-colors duration-300"
                  style={{ color: skill.color }}
                />
              </div>
              <p className="text-center text-white font-semibold group-hover:text-purple-400 transition-colors duration-300">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <SkillsBackground />
    </section>
  );
}

function SkillsBackground() {
  return (
    <div className="absolute inset-0 z-[-1]">
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-purple-500 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random(),
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  );
}
