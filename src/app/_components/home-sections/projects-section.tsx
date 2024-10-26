import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import { sendGTMEvent } from '@next/third-parties/google';

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
    title: 'eCommerce Restful API',
    description:
      'A Node.js API for ecommerce: users shop, admins manage. Express and PostgreSQL power this digital marketplace.',
    image: '/takemymoney.gif',
    technologies: ['Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    githubLink: 'https://github.com/Ramzy98/ecommerce-website-restful-api',
  },
  {
    title: 'Would You Rather',
    description:
      'React-Redux game: choose between two options. Users face tough choices, selecting between alternatives.',
    image: '/spongebob.gif',
    technologies: ['React', 'JavaScript', 'Redux'],
    githubLink: 'https://github.com/Ramzy98/Would-you-rather',
    liveLink: 'https://would-you-rather-coral.vercel.app/',
  },
  {
    title: 'Examify',
    description:
      'React exam app: create, share, and take tests. Real-time updates and automatic grading make learning a breeze.',
    image: '/mrbean.gif',
    technologies: ['React', 'Axios', 'JavaScript'],
    githubLink: 'https://github.com/Ahmed-HossamElDin/Examify',
    liveLink: 'https://examify.vercel.app/',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden p-8">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white"
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-purple-600 text-xs text-white rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    onClick={() =>
                      sendGTMEvent({
                        event: 'project_link_click',
                        project: project.title,
                        type: 'github',
                      })
                    }
                  >
                    <FaGithub className="inline-block mr-2" />
                    GitHub
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors duration-300"
                      onClick={() =>
                        sendGTMEvent({
                          event: 'project_link_click',
                          project: project.title,
                          type: 'live_demo',
                        })
                      }
                    >
                      <FaExternalLinkAlt className="inline-block mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ProjectsBackground />
    </section>
  );
}

function ProjectsBackground() {
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
