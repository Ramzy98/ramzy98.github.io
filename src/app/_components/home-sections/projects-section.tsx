'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import Image from 'next/image';
import { FaArrowUpRightFromSquare, FaFlask, FaGithub } from 'react-icons/fa6';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import type { Project } from '@/types/portfolio';
import { track } from '@/app/_lib/analytics';
import { useMediaQuery } from '@/app/_hooks/use-media-query';
import { RevealHeading, RevealWords } from '../scroll/reveal-text';

export default function ProjectsSection() {
  const stackRef = useRef<HTMLDivElement>(null);
  // The pinned card stack needs room to breathe; phones get a plain list.
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const shouldReduceMotion = useReducedMotion();
  const stacked = isDesktop && !shouldReduceMotion;
  const { projects } = PORTFOLIO_DATA;

  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });

  return (
    <section id="projects" aria-labelledby="projects-heading" className="w-full py-24 px-6 relative z-10">
      <div className="mx-auto max-w-6xl mb-14 lg:mb-4 text-center">
        <p className="section-eyebrow mb-4">Projects</p>
        <RevealHeading
          id="projects-heading"
          lead="Selected"
          accent="work"
          className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight"
        />
        <RevealWords
          className="text-gray-300 text-lg max-w-2xl mx-auto"
          segments={[{ text: 'Production systems I helped build, and the tools I make on the side.' }]}
        />
      </div>

      <div ref={stackRef} className={stacked ? 'relative' : 'mx-auto max-w-6xl flex flex-col gap-6'}>
        {projects.map((project, index) =>
          stacked ? (
            <StackedCard
              key={project.title}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
            />
          ) : (
            <ProjectCard key={project.title} project={project} index={index} />
          )
        )}
      </div>
    </section>
  );
}

/** Each card pins to the viewport while the next one slides over it. */
function StackedCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    // The wrapper fills the viewport but is see-through to clicks; otherwise it
    // sits over the card above it mid-scroll and swallows that card's links.
    <div className="h-[100svh] sticky top-0 flex items-center justify-center pointer-events-none">
      <motion.div
        style={{ scale, top: `calc(-6vh + ${index * 24}px)` }}
        className="relative w-full max-w-6xl origin-top pointer-events-auto"
      >
        <ProjectCard project={project} index={index} fixedHeight />
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index, fixedHeight = false }: { project: Project; index: number; fixedHeight?: boolean }) {
  const displayIndex = String(index + 1).padStart(2, '0');

  return (
    <article
      className={`group flex flex-col lg:flex-row overflow-hidden rounded-[2rem] border border-white/10 bg-[#070b14] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ${
        fixedHeight ? 'lg:h-[min(640px,76svh)]' : ''
      }`}
    >
      <div className="relative lg:w-[58%] bg-[#0b1120] flex items-center justify-center p-5 sm:p-8 lg:p-10 min-h-[220px]">
        {project.image ? (
          <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <MetricsShowcase project={project} />
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-white/10">
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{project.kicker}</p>
          <span aria-hidden="true" className="font-mono text-2xl font-bold text-white/15">
            {displayIndex}
          </span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mb-4">{project.title}</h3>
        <p className="text-gray-300 leading-relaxed mb-8">{project.description}</p>

        <ul aria-label="Technologies" className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="px-3 py-1.5 rounded-full bg-accent/5 border border-accent/15 text-xs font-mono text-cyan-200"
            >
              {tech}
            </li>
          ))}
        </ul>

        {(project.githubLink || project.liveLink || project.internalLink) && (
          <div className="flex items-center gap-6 border-t border-white/10 pt-6">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('project_link_click', { project: project.title, type: 'github' })}
                className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
              >
                <FaGithub aria-hidden="true" size={18} />
                Source
              </a>
            )}
            {project.internalLink && (
              <a
                href={project.internalLink.href}
                className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-white transition-colors"
              >
                <FaFlask aria-hidden="true" size={14} />
                {project.internalLink.label}
                <span aria-hidden="true">→</span>
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('project_link_click', { project: project.title, type: 'live' })}
                className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-accent transition-colors"
              >
                <FaArrowUpRightFromSquare aria-hidden="true" size={14} />
                Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/** Stand-in for a screenshot on client work that can't be shown publicly. */
function MetricsShowcase({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full flex items-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full bg-accent/10 blur-3xl"
      />
      <dl className="relative grid grid-cols-2 gap-3 sm:gap-4 w-full">
        {project.metrics?.map(({ value, label }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
            <dt className="sr-only">{label}</dt>
            <dd>
              <span className="block font-sans text-3xl sm:text-4xl font-bold tracking-tight tabular-nums text-gradient-cyan">{value}</span>
              <span className="mt-2 block text-xs sm:text-sm text-gray-400 leading-snug">{label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
