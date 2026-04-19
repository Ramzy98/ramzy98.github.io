'use client';

import { useState, useEffect } from 'react';
import AboutSection from '@/app/_components/home-sections/about-section';
import ExperienceSection from '@/app/_components/home-sections/experience-section';
import Loading from '@/app/_components/loading';
import SkillsSection from '@/app/_components/home-sections/skills-section';
import ProjectsSection from '@/app/_components/home-sections/projects-section';
import ContactSection from '@/app/_components/home-sections/contact-section';
import SectionSeparator from '@/app/_components/SectionSeparator';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to ensure the "Elite Reveal" sequence has impact
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
