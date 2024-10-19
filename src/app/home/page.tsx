'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'Project Nebula',
    description: 'A cosmic web experience',
    color: '#8A2BE2',
    image: '/profile-picture.png',
  },
  {
    id: 2,
    title: 'Quantum Leap',
    description: 'Revolutionary mobile quantum computing',
    color: '#00CED1',
    image: '/profile-picture.png',
  },
  {
    id: 3,
    title: 'AI Odyssey',
    description: 'Next-gen AI for space exploration',
    color: '#FF4500',
    image: '/profile-picture.png',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const titleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
};

const imageVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

const socialIconVariants = {
  hover: { scale: 1.2, rotate: 15 },
  tap: { scale: 0.8 },
};

export default function Page() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <motion.div
      className='min-h-screen container mx-auto px-4 py-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <motion.h1
        className='text-6xl font-extrabold mb-8 text-center'
        variants={titleVariants}
      >
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'>
          Welcome to My Cosmic Portfolio
        </span>
      </motion.h1>

      <motion.div
        className='flex justify-center items-center mb-12'
        variants={imageVariants}
      >
        <Image
          alt='Profile Picture'
          src={'/profile-picture.png'}
          width={250}
          height={250}
          className='rounded-full shadow-lg border-4 border-indigo-500'
        />
      </motion.div>

      <motion.p
        className='text-2xl mb-12 text-center text-indigo-200'
        variants={itemVariants}
        whileHover={{ scale: 1.05, color: '#ffffff' }}
      >
        Greetings, cosmic traveler! I am a web developer crafting digital
        wonders across the universe.
      </motion.p>

      <motion.div className='flex justify-center space-x-6 mb-12'>
        {[FaGithub, FaLinkedin, FaTwitter].map((Icon, index) => (
          <motion.a
            key={index}
            href='#'
            variants={socialIconVariants}
            whileHover='hover'
            whileTap='tap'
            className='text-3xl text-indigo-300 hover:text-indigo-100'
          >
            <Icon />
          </motion.a>
        ))}
      </motion.div>

      <motion.h2
        className='text-4xl font-bold mb-8 text-center text-indigo-300'
        variants={titleVariants}
      >
        Stellar Projects
      </motion.h2>

      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        variants={containerVariants}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className='relative overflow-hidden rounded-lg shadow-lg'
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredProject(project.id)}
            onHoverEnd={() => setHoveredProject(null)}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className='w-full h-64 object-cover'
            />
            <motion.div
              className='absolute inset-0 flex flex-col justify-end p-6'
              style={{ backgroundColor: `${project.color}CC` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                className='text-2xl font-bold mb-2 text-white'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                className='text-white'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.description}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            className='fixed inset-0 pointer-events-none'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-10'></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
