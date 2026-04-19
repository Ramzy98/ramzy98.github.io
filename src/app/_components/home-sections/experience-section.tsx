'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FaLaptopCode, FaRocket, FaSatellite, FaSpaceShuttle } from 'react-icons/fa';

import { PORTFOLIO_DATA } from '@/constants/portfolio';

const ICON_MAP: Record<string, React.ReactNode> = {
  FaLaptopCode: <FaLaptopCode />,
  FaRocket: <FaRocket />,
  FaSatellite: <FaSatellite />,
  FaSpaceShuttle: <FaSpaceShuttle />,
};

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-24 px-8 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tighter">
            MY <span className="text-gradient-cyan">JOURNEY</span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl">
             Professional trajectory through the tech ecosystem.
          </p>
        </motion.div>

        <div className="relative">
          {/* Custom Timeline Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-600 via-cyan-400 to-transparent origin-top rounded-full"
          />

          <div className="space-y-24">
            {PORTFOLIO_DATA.experiences.map((exp, index) => (
              <TimelineItem key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ experience, index }: { experience: any, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between md:flex-row flex-col ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Spacer for Desktop */}
      <div className="hidden md:block w-[45%]" />

      {/* Timeline Dot */}
      <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 -ml-[12px] md:-mt-[12px] z-10">
         <motion.div
           initial={{ scale: 0 }}
           whileInView={{ scale: 1 }}
           viewport={{ once: true }}
           className="w-6 h-6 rounded-full bg-gray-950 border-4 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center p-1"
         >
            <div className="text-[10px] text-cyan-400">
               {ICON_MAP[experience.icon] || <FaLaptopCode />}
            </div>
         </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
         initial={{ opacity: 0, x: isEven ? 50 : -50 }}
         whileInView={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.8, delay: 0.2 }}
         viewport={{ once: true }}
         className="w-full md:w-[45%] ml-12 md:ml-0"
      >
        <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cyan-400/30 transition-all duration-500">
           <div className="flex flex-col mb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">{experience.date}</span>
              <h3 className="text-2xl font-bold text-white mb-1">{experience.title}</h3>
              <span className="text-gray-400 font-medium">{experience.company}</span>
           </div>

           <ul className="space-y-2 mb-6">
              {experience.description.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                   <span className="text-cyan-500 pt-1">▹</span>
                   <ReactMarkdown 
                     components={{
                       strong: ({children}) => <span className="text-white font-medium">{children}</span>
                     }}
                   >
                     {item}
                   </ReactMarkdown>
                </li>
              ))}
           </ul>

           <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill: string) => (
                <span key={skill} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                  {skill}
                </span>
              ))}
           </div>
        </div>
      </motion.div>
    </div>
  );
}
