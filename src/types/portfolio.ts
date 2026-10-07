import type { IconType } from 'react-icons';

export interface SocialLink {
  platform: string;
  Icon: IconType;
  link: string;
}

export interface Experience {
  title: string;
  company: string;
  date: string;
  location: string;
  /** Bullet points. Wrap a phrase in **double asterisks** to highlight it. */
  highlights: string[];
  skills: string[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  title: string;
  /** Short label shown above the title, e.g. "Case study · Centroid Solutions". */
  kicker: string;
  description: string;
  technologies: string[];
  /** Screenshot path under /public. Projects without one render their metrics instead. */
  image?: string;
  metrics?: Metric[];
  githubLink?: string;
  liveLink?: string;
  /** In-page link, e.g. to the interactive lab. */
  internalLink?: { href: string; label: string };
}

export interface Skill {
  name: string;
  icon?: IconType;
  color?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface Education {
  school: string;
  degree: string;
  date: string;
  location: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  location: string;
  email: string;
  siteUrl: string;
  resumePath: string;
  /** First month of professional experience, used to compute "N+ years". */
  careerStart: string;
  headline: string;
  summary: string;
  socialLinks: SocialLink[];
  skillGroups: SkillGroup[];
  experiences: Experience[];
  projects: Project[];
  education: Education;
}
