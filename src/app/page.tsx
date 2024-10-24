'use client';

import { useState, useEffect } from 'react';
import AboutSection from '@/app/_components/home-sections/about-section';
import ExperienceSection from '@/app/_components/home-sections/experience-section';
import Loading from '@/app/_components/loading';
import SkillsSection from '@/app/_components/home-sections/skills-section';
import ProjectsSection from '@/app/_components/home-sections/projects-section';
import ContactSection from '@/app/_components/home-sections/contact-section';
import { motion } from 'framer-motion';

const SectionSeparator = () => (
  <motion.div
    className="w-full max-w-6xl mx-auto my-20 md:my-32"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
  </motion.div>
);

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <AboutSection />
      <SectionSeparator />
      <ExperienceSection />
      <SectionSeparator />
      <SkillsSection />
      <SectionSeparator />
      <ProjectsSection />
      <SectionSeparator />
      <ContactSection />
    </div>
  );
}
