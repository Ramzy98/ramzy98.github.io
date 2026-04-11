'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import AnimatedLogo from '../animated-logo';
import MobileNavBar from './mobile-nav-bar';
import { useScrollEffect } from '../../_hooks/useScrollEffect';
import { sendGTMEvent } from '@next/third-parties/google';
import { useMagnetic } from '../../_hooks/use-magnetic';

export default function NavBar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('About');
  const tabs = useMemo(() => ['About', 'Experience', 'Projects', 'Contact'], []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeSection = useScrollEffect([
    'about',
    ...tabs.slice(1).map((tab) => tab.toLowerCase()),
  ]);

  useEffect(() => {
    setActiveTab(activeSection.charAt(0).toUpperCase() + activeSection.slice(1));
    sendGTMEvent({ event: 'section_view', section: activeSection });
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
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabClick = (item: string) => {
    setActiveTab(item);
    setIsMenuOpen(false);
    const sectionId = item.toLowerCase();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      window.location.href = `/`;
    }
  };

  const navVariants = {
    visible: { opacity: 1, transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.1 } },
  };

  const tabVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
  };

  return (
    <motion.header
      initial="visible"
      animate="visible"
      variants={navVariants}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
    >
      <motion.nav
        className="py-2.5 px-6 rounded-full flex items-center gap-8 max-w-fit bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] border border-white/10"
      >
        <div className="mr-2">
          <AnimatedLogo />
        </div>

        {!isMobile && (
          <motion.ul className="flex items-center gap-1 list-none m-0 p-0">
            <AnimatePresence>
              {tabs.map((item) => (
                <NavTab
                  key={item}
                  item={item}
                  activeTab={activeTab}
                  onClick={() => handleTabClick(item)}
                  tabVariants={tabVariants}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}

        {isMobile && (
           <MobileNavBar
            isMenuOpen={isMenuOpen}
            isMobile={isMobile}
            tabs={tabs}
            activeTab={activeTab}
            setIsMenuOpen={setIsMenuOpen}
            handleTabClick={handleTabClick}
          />
        )}
      </motion.nav>
    </motion.header>
  );
}

function NavTab({ item, activeTab, onClick, tabVariants }: any) {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);
  const isActive = activeTab === item;

  return (
    <motion.li
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative px-4 py-2"
      variants={tabVariants}
    >
      {isActive && (
        <motion.div
          layoutId="navIndicator"
          className="absolute inset-0 bg-white/5 rounded-full border border-white/10"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
      <button
        onClick={onClick}
        className={`relative z-10 text-sm font-bold transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        <motion.span
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
          className="block"
        >
          {item}
        </motion.span>
      </button>
    </motion.li>
  );
}
