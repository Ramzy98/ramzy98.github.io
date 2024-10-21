'use client';

import AboutSection from './_components/AboutSection';
// import ProjectsSection from './_components/ProjectsSection';
// import SkillsSection from './_components/SkillsSection';
import ExperienceSection from './_components/experience-section';
// import ContactSection from './_components/ContactSection';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <AboutSection />
      <ExperienceSection />
      {/* <SkillsSection />
      <ProjectsSection />
      <ContactSection /> */}
    </div>
  );
}
