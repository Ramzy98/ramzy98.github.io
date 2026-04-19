'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useAnalyticsContext } from '../../_components/analytics-provider';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
}

const projects: Project[] = [
  {
    title: 'Frame Forge',
    description:
      'A modern iframe viewer & tester with device presets, responsive preview, and code injection capabilities.',
    image: '/mockups/frame-forge.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    githubLink: 'https://github.com/Ramzy98/frame-forge',
    liveLink: 'https://frame-forge-rho.vercel.app/',
  },
  {
    title: 'eCommerce Restful API',
    description:
      'A Node.js API for ecommerce with complex relationship handling and secure transaction logic.',
    image: '/mockups/ecommerce-api.png',
    technologies: ['Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    githubLink: 'https://github.com/Ramzy98/ecommerce-website-restful-api',
  },
  {
    title: 'Would You Rather',
    description:
      'React-Redux game with real-time state management and sophisticated user voting mechanisms.',
    image: '/mockups/would-you-rather.png',
    technologies: ['React', 'JavaScript', 'Redux'],
    githubLink: 'https://github.com/Ramzy98/Would-you-rather',
    liveLink: 'https://would-you-rather-coral.vercel.app/',
  },
  {
    title: 'Examify',
    description:
      'React exam app features real-time grading and dynamic test generation for educators.',
    image: '/mockups/examify.png',
    technologies: ['React', 'Axios', 'JavaScript'],
    githubLink: 'https://github.com/Ahmed-HossamElDin/Examify',
    liveLink: 'https://examify.vercel.app/',
  },
];

export default function ProjectsSection() {
  const { trackInteraction, trackUserJourney, trackConversion } = useAnalyticsContext();

  const handleProjectLinkClick = (project: string, type: 'github' | 'live_demo') => {
    trackInteraction('project_link_click', {
      project,
      type,
      section: 'projects',
      link_type: type === 'github' ? 'source_code' : 'live_demo',
    });

    trackUserJourney('project_engagement', 'projects');

    if (type === 'live_demo') trackConversion('project_demo_view', 1);
  };

  return (
    <section id="projects" className="py-32 px-6 sm:px-8 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="mb-20"
        >
          <div className="flex flex-col items-center text-center">
            <span className="text-cyan-400 font-mono tracking-widest text-sm mb-4 uppercase">System Portfolio</span>
            <h2 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tighter">
              Selected <span className="text-gradient-cyan border-b-4 border-cyan-400/30">Works</span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
              A curated collection of scalable, high-performance applications engineered with modern web technologies.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onClickLink={handleProjectLinkClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onClickLink }: { project: Project; index: number; onClickLink: any }) {
  const displayIndex = String(index + 1).padStart(2, '0');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseXSpring}px ${mouseYSpring}px,
      rgba(0, 240, 255, 0.12),
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -10 }}
      onMouseMove={onMouseMove}
      className="group relative flex flex-col w-full bg-[#080808] border border-white/10 rounded-[2rem] overflow-hidden hover:border-cyan-400/30 transition-all duration-500 shadow-2xl"
    >
      {/* Glint Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{ background }}
      />

      {/* Index Number */}
      <div className="absolute top-6 left-6 z-20 text-white/20 font-black text-3xl font-mono tracking-tighter group-hover:text-cyan-400/80 transition-colors duration-500">
        {displayIndex}
      </div>

      {/* Top Zone: The Showcase */}
      <div className="relative w-full h-72 sm:h-80 bg-[#0c101c] overflow-hidden p-8 sm:p-12 flex items-center justify-center">
        {/* Glow underneath image */}
        <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 blur-3xl transition-all duration-700 w-3/4 h-3/4 m-auto rounded-full mix-blend-screen" />
        
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/5 transform group-hover:-translate-y-2 group-hover:scale-[1.02] transition-all duration-500 ease-out z-10">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>
      </div>

      {/* Bottom Zone: Data Console */}
      <div className="flex flex-col flex-1 p-8 sm:p-10 border-t border-white/5 bg-[#030303] z-10">
         <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 gap-2">
            <h3 className="text-3xl font-bold text-white tracking-tight">{project.title}</h3>
         </div>
         
         <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed font-light flex-1">
           {project.description}
         </p>
         
         <div className="flex flex-wrap gap-2 mb-8 mt-auto">
            {project.technologies.map(tech => (
              <span key={tech} className="px-3 py-1.5 bg-cyan-400/5 hover:bg-cyan-400/10 border border-cyan-400/10 rounded-full text-xs text-cyan-200 font-mono tracking-tight transition-colors cursor-default">
                {tech}
              </span>
            ))}
         </div>

         <div className="flex items-center gap-8 border-t border-white/5 pt-6 mt-auto">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => onClickLink(project.title, 'github')}
              className="group/link flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <FaGithub size={20} />
              <span className="text-sm font-semibold tracking-wide">Repo</span>
            </a>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => onClickLink(project.title, 'live_demo')}
                className="group/link flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors"
              >
                <FaExternalLinkAlt size={16} />
                <span className="text-sm font-semibold tracking-wide">Live Demo</span>
                <span className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-300">
                  &rarr;
                </span>
              </a>
            )}
         </div>
      </div>
    </motion.div>
  );
}
