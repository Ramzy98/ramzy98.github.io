import AboutSection from '@/app/_components/home-sections/about-section';
import ExperienceSection from '@/app/_components/home-sections/experience-section';
import SkillsSection from '@/app/_components/home-sections/skills-section';
import ProjectsSection from '@/app/_components/home-sections/projects-section';
import LabSection from '@/app/_components/home-sections/lab-section';
import ContactSection from '@/app/_components/home-sections/contact-section';
import { yearsOfExperience } from '@/constants/portfolio';

export default function Page() {
  // Computed at build time and passed down, so server and client agree.
  const years = yearsOfExperience();

  return (
    <div className="flex flex-col items-center w-full">
      <AboutSection years={years} />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <LabSection />
      <ContactSection />
    </div>
  );
}
