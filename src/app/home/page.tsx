'use client';

import { useState, useEffect } from 'react';
import AboutSection from '@/app/home/_components/about-section';
import ExperienceSection from '@/app/home/_components/experience-section';
import Loading from '../_components/loading';
import SkillsSection from '@/app/home/_components/skills-section';
import ProjectsSection from '@/app/home/_components/projects-section';
import ContactSection from '@/app/home/_components/contact-section';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

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

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center lg:space-y-60 md:space-y-40 space-y-20">
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
