import { IconType } from 'react-icons';

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
}

export interface Experience {
  title: string;
  company: string;
  date: string;
  description: string[];
  skills: string[];
  icon: string | 'FaLaptopCode' | 'FaRocket' | 'FaSatellite' | 'FaSpaceShuttle'; // Key for mapping icons
}

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export interface PortfolioData {
  name: string;
  titles: string[];
  about: {
    description: string[];
    socialLinks: {
      platform: string;
      Icon: any;
      link: string;
    }[];
  };
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
}
