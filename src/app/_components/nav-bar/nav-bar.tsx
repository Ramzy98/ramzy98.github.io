'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import AnimatedLogo from '@/app/_components/animated-logo';
import MobileNavBar from '@/app/_components/nav-bar/mobile-nav-bar';
import { useScrollEffect } from '@/app/_hooks/useScrollEffect';

export default function NavBar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('About');
  const tabs = useMemo(() => ['About', 'Experience', 'Skills', 'Projects', 'Contact'], []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeSection = useScrollEffect([
    'about',
    ...tabs.slice(1).map((tab) => tab.toLowerCase()),
  ]);

  useEffect(() => {
    setActiveTab(activeSection.charAt(0).toUpperCase() + activeSection.slice(1));
  }, [activeSection]);

  useEffect(() => {
    const currentPath = pathname?.slice(1) || 'about';
    const currentTab = tabs.find((tab) => tab.toLowerCase() === currentPath);
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [pathname, tabs]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const itemVariants = {
    initial: { scale: 1, opacity: 0.7 },
    hover: {
      scale: 1.1,
      opacity: 1,
      transition: {
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        type: 'spring',
        stiffness: 500,
      },
    },
  };

  const navVariants = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const handleTabClick = (item: string) => {
    setActiveTab(item);
    setIsMenuOpen(false);

    const sectionId = item.toLowerCase();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.header
      initial="visible"
      animate="visible"
      variants={navVariants}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg"
    >
      <motion.nav
        className={`flex items-center ${isMobile ? 'justify-between' : 'justify-center'} p-4`}
      >
        <AnimatedLogo />

        {!isMobile && (
          <div className="flex-grow flex justify-center items-start">
            <motion.ul
              className="flex space-x-6 list-none m-0 p-2 rounded-full relative shadow-lg bg-gray-800"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {tabs.map((item) => (
                  <motion.li key={item} className="relative z-10" variants={tabVariants}>
                    {activeTab === item && (
                      <motion.div
                        className="absolute inset-0 bg-purple-600 rounded-full shadow-md"
                        layoutId="activeTab"
                        initial={false}
                        animate={{
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                          duration: 0.6,
                        }}
                      />
                    )}

                    <button
                      className={`px-4 py-2 relative z-20 block transition-colors duration-300 no-underline ${
                        activeTab === item ? 'text-white' : 'text-gray-300 hover:text-white'
                      }`}
                      onClick={() => handleTabClick(item)}
                    >
                      <motion.span
                        variants={itemVariants}
                        initial="initial"
                        whileHover={{
                          ...itemVariants.hover,
                          textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                          color: activeTab === item ? '#ffffff' : '#a855f7',
                        }}
                        whileTap="tap"
                        animate={activeTab === item ? { rotate: [0, 5, -5, 0] } : {}}
                        transition={{ duration: 0.8 }}
                        style={{
                          color: activeTab === item ? '#ffffff' : '#d1d5db',
                        }}
                      >
                        {item}
                      </motion.span>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        )}

        <MobileNavBar
          isMenuOpen={isMenuOpen}
          isMobile={isMobile}
          tabs={tabs}
          activeTab={activeTab}
          setIsMenuOpen={setIsMenuOpen}
          handleTabClick={handleTabClick}
        />
      </motion.nav>
    </motion.header>
  );
}
