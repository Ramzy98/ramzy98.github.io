'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';

const projects = [
  {
    id: 1,
    title: 'AI-Powered Code Assistant',
    tech: ['Python', 'TensorFlow', 'NLP'],
    description:
      'An intelligent code assistant that helps developers write better code faster.',
  },
  {
    id: 2,
    title: 'Blockchain Voting System',
    tech: ['Solidity', 'Ethereum', 'React'],
    description:
      'A secure and transparent voting system built on blockchain technology.',
  },
  {
    id: 3,
    title: 'Quantum Algorithm Simulator',
    tech: ['Q#', 'Python', 'Linear Algebra'],
    description: 'A simulator for testing and visualizing quantum algorithms.',
  },
];

const skills = [
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Machine Learning',
  'Blockchain',
  'Quantum Computing',
  'Cloud Architecture',
  'DevOps',
  'Data Science',
];

const companies = [
  { name: 'Google', role: 'Senior Quantum Engineer', period: '2020-Present' },
  { name: 'IBM', role: 'Quantum Research Scientist', period: '2018-2020' },
  { name: 'Microsoft', role: 'Software Engineer', period: '2015-2018' },
];

export default function Page() {
  const [activeSection, setActiveSection] = useState('intro');
  const parallaxRef = useRef<IParallax>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition =
          parallaxRef.current.current / parallaxRef.current.space;
        if (scrollPosition < 0.75) setActiveSection('intro');
        else if (scrollPosition < 1.5) setActiveSection('projects');
        else if (scrollPosition < 2.25) setActiveSection('companies');
        else setActiveSection('skills');
      }
    };

    const parallaxContainer = parallaxRef.current?.container.current;
    if (parallaxContainer) {
      parallaxContainer.addEventListener('scroll', handleScroll);
      return () =>
        parallaxContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <Parallax pages={3.5} ref={parallaxRef}>
      <ParallaxLayer offset={0} speed={0.5}>
        <section
          id='intro'
          className={`min-h-screen flex flex-col justify-center items-center p-8 ${
            activeSection === 'intro' ? 'active' : ''
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <motion.div
              className='w-64 h-64 mx-auto mb-8 relative overflow-hidden rounded-full border-4 border-purple-500 shadow-2xl'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src='/me.jpeg'
                alt='Profile Picture'
                layout='fill'
                objectFit='cover'
                className='transition-all duration-300 ease-in-out'
                priority
              />
              <motion.div
                className='absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-0'
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              >
                <div className='h-full flex flex-col items-center justify-center text-white'>
                  <span className='text-3xl mb-2'>👋</span>
                  <span className='text-lg font-semibold'>
                    Hello, I&apos;m John!
                  </span>
                </div>
              </motion.div>
            </motion.div>
            <motion.h1
              className='text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              John Doe
            </motion.h1>
            <motion.h2
              className='text-3xl text-white mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Quantum Software Engineer
            </motion.h2>
            <motion.p
              className='text-lg mb-8 max-w-2xl mx-auto text-gray-300'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Pushing the boundaries of computation at the intersection of
              quantum mechanics and artificial intelligence. Crafting the
              future, one qubit at a time.
            </motion.p>
            <motion.div
              className='flex justify-center space-x-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {[FaGithub, FaLinkedin, FaEnvelope].map((Icon, index) => (
                <motion.a
                  key={index}
                  href='#'
                  whileHover={{
                    scale: 1.2,
                    color: '#F3B61F',
                  }}
                  whileTap={{ scale: 0.9 }}
                  className='text-3xl text-white transition-colors duration-300'
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.2}>
        <section id='projects' className='min-h-screen py-16 px-8'>
          <h2 className='text-4xl font-bold mb-8 text-center text-white'>
            Innovative Projects
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className='bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-xl'
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 0 20px rgba(255,255,255,0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className='text-xl font-semibold mb-3 text-white'>
                    {project.title}
                  </h3>
                  <p className='text-white mb-3'>{project.description}</p>
                  <div className='flex flex-wrap gap-2'>
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className='bg-purple-600 text-white px-2 py-1 rounded text-sm'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </ParallaxLayer>

      <ParallaxLayer offset={2} speed={0.3}>
        <section id='companies' className='min-h-screen py-16 px-8'>
          <h2 className='text-4xl font-bold mb-8 text-center text-white'>
            Companies I&apos;ve Worked For
          </h2>
          <div className='flex flex-col items-center space-y-6'>
            {companies.map((company, index) => (
              <motion.div
                key={index}
                className='bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-xl w-full max-w-2xl'
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className='text-2xl font-semibold text-white'>
                  {company.name}
                </h3>
                <p className='text-lg text-gray-300'>{company.role}</p>
                <p className='text-sm text-gray-400'>{company.period}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </ParallaxLayer>

      <ParallaxLayer offset={3} speed={0.5}>
        <section id='skills' className='min-h-screen py-16 px-8'>
          <h2 className='text-4xl font-bold mb-8 text-center text-white'>
            Cutting-Edge Skills
          </h2>
          <div className='flex flex-wrap justify-center gap-4'>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className='bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white px-4 py-2 rounded-full text-lg'
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 15px rgba(255,255,255,0.5)',
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </section>
      </ParallaxLayer>
    </Parallax>
  );
}
