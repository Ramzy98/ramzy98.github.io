'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import AnimatedLogo from '@/app/_components/AnimatedLogo';
import MobileNavBar from '@/app/_components/NavBar/MobileNavBar';
export default function NavBar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('Home');
  const tabs = useMemo(() => ['Home', 'Resume', 'Blog', 'Contact'], []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const currentPath = pathname.slice(1) || 'home';
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
  };

  return (
    <motion.header initial="visible" animate="visible" variants={navVariants} className="relative">
      <motion.nav className="flex items-center justify-between p-4">
        <AnimatedLogo />

        <div className="flex-grow flex justify-center items-start">
          <motion.ul
            className="hidden md:flex space-x-6 list-none m-0 p-2 rounded-full relative shadow-lg bg-white"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {tabs.map((item) => (
                <motion.li key={item} className="relative z-10" variants={tabVariants}>
                  {activeTab === item && (
                    <motion.div
                      className="absolute inset-0 bg-[#f94706] rounded-full shadow-md"
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

                  <Link
                    href={`/${item.toLowerCase()}`}
                    className={`px-4 py-2 relative z-20 block transition-colors duration-300 no-underline ${
                      activeTab === item ? 'text-white' : 'text-gray-800 hover:text-gray-600'
                    }`}
                  >
                    <motion.span
                      variants={itemVariants}
                      initial="initial"
                      whileHover={{
                        ...itemVariants.hover,
                        textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                        color: activeTab === item ? '#ffffff' : '#f94706',
                      }}
                      whileTap="tap"
                      onClick={() => handleTabClick(item)}
                      animate={activeTab === item ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 0.8 }}
                      style={{
                        color: activeTab === item ? '#ffffff' : 'black',
                      }}
                    >
                      {item}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>

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
