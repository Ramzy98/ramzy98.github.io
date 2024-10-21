'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaMedium, FaXTwitter } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: FaGithub, color: 'white', link: 'https://github.com/Ramzy98' },
    {
      Icon: FaLinkedin,
      color: '#0077B5',
      link: 'https://www.linkedin.com/in/ahmadramzyag/',
    },
    { Icon: FaMedium, color: '#00AB6C', link: 'https://medium.com/@aramzy' },
    { Icon: FaXTwitter, color: '#1DA1F2', link: 'https://x.com/amazingramzy' },
    { Icon: SiGmail, color: '#EA4335', link: 'mailto:ahmadramzy988@gmail.com' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white py-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© {currentYear} Ahmad Ramzy. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            {socialLinks.map(({ Icon, color, link }, index) => (
              <motion.a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: color }}
                whileTap={{ scale: 0.9 }}
                className="text-2xl transition-colors duration-300"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.</p>
          <p>
            Deployed on GitHub Pages. View the
            <a
              href="https://github.com/Ramzy98/ramzy98.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              source code
            </a>
            .
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
