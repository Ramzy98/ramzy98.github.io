import { FaGithub, FaLinkedin, FaMedium, FaXTwitter, FaEnvelope } from 'react-icons/fa6';
import {
  SiCypress,
  SiDocker,
  SiExpress,
  SiFastify,
  SiGit,
  SiGithubactions,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiRedux,
  SiRuby,
  SiRubyonrails,
  SiStorybook,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest,
} from 'react-icons/si';
import type { PortfolioData } from '@/types/portfolio';

/**
 * Single source of truth for everything the site says about me — the page
 * sections, the resume modal, the command palette and the SEO metadata all
 * read from here.
 */
export const PORTFOLIO_DATA: PortfolioData = {
  name: 'Ahmad Ramzy',
  role: 'Full Stack Software Engineer',
  location: 'Alexandria, Egypt',
  email: 'ahmadramzy988@gmail.com',
  siteUrl: 'https://ramzy98.github.io',
  resumePath: '/Ahmad_Ramzy_Software_Engineer_Resume.pdf',
  careerStart: '2021-09-01',
  headline:
    'I build payment and CRM platforms with TypeScript, Node.js and React — from the first commit to production scale.',
  summary:
    'Full stack engineer driven by clean architecture and measurable impact. I bridge high-performance frontends and scalable backend systems, and I have led technical foundations from zero to production — most recently the payments infrastructure of a CRM platform serving a team of 20+.',
  socialLinks: [
    { Icon: FaGithub, link: 'https://github.com/Ramzy98', platform: 'GitHub' },
    { Icon: FaLinkedin, link: 'https://www.linkedin.com/in/ahmadramzyag/', platform: 'LinkedIn' },
    { Icon: FaMedium, link: 'https://medium.com/@ahmadramzy', platform: 'Medium' },
    { Icon: FaXTwitter, link: 'https://x.com/amazingramzy', platform: 'X' },
    { Icon: FaEnvelope, link: 'mailto:ahmadramzy988@gmail.com', platform: 'Email' },
  ],
  skillGroups: [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'Redux', icon: SiRedux, color: '#764ABC' },
        { name: 'Zustand' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Storybook', icon: SiStorybook, color: '#FF4785' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
        { name: 'Fastify', icon: SiFastify, color: '#FFFFFF' },
        { name: 'Express', icon: SiExpress, color: '#FFFFFF' },
        { name: 'Prisma', icon: SiPrisma, color: '#5A67D8' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
        { name: 'Redis', icon: SiRedis, color: '#FF4438' },
        { name: 'Ruby on Rails', icon: SiRubyonrails, color: '#D30001' },
        { name: 'Ruby', icon: SiRuby, color: '#CC342D' },
        { name: 'REST & Swagger', icon: SiSwagger, color: '#85EA2D' },
      ],
    },
    {
      title: 'Testing & Tooling',
      skills: [
        { name: 'Cypress', icon: SiCypress, color: '#69D3A7' },
        { name: 'Jest', icon: SiJest, color: '#C21325' },
        { name: 'Vitest', icon: SiVitest, color: '#6E9F18' },
        { name: 'Vite', icon: SiVite, color: '#9135FF' },
        { name: 'Docker', icon: SiDocker, color: '#2496ED' },
        { name: 'Git', icon: SiGit, color: '#F05032' },
        { name: 'CI/CD', icon: SiGithubactions, color: '#2088FF' },
      ],
    },
  ],
  experiences: [
    {
      title: 'Full Stack Software Engineer',
      company: 'Centroid Solutions',
      date: 'Mar 2024 – Present',
      location: 'Remote · Dubai, UAE',
      highlights: [
        'Architected the technical foundation of a **CRM platform**, taking it from MVP to a mature product as the team grew to **20+ members**',
        'Led the initial frontend in **React**, **TypeScript** and **Tailwind CSS**, establishing the design system and core component library',
        'Built backend services with **Node.js**, **Fastify**, **Prisma** and **Redis**, keeping **99.9% reliability** through on-call rotations',
        'Designed the payment infrastructure: integrated **8+ payment service providers** and a webhook system processing **2,000+ transactions** with full integrity',
      ],
      skills: ['React', 'TypeScript', 'Node.js', 'Fastify', 'Prisma', 'Redis', 'PostgreSQL'],
    },
    {
      title: 'Web Development Session Lead',
      company: 'Udacity',
      date: 'Dec 2023 – Present',
      location: 'Part-time · Remote',
      highlights: [
        'Mentored **50+ students** aged 12–17 in **HTML**, **CSS** and **JavaScript**',
        'Guided students through project implementation and core web development concepts',
      ],
      skills: ['HTML', 'CSS', 'JavaScript', 'Mentoring'],
    },
    {
      title: 'Frontend Software Engineer',
      company: 'Bayzat',
      date: 'Oct 2022 – Jan 2024',
      location: 'Remote · Dubai, UAE',
      highlights: [
        'Migrated core HR features from **Ember.js** to **React** and **TypeScript**, noticeably improving performance and responsiveness',
        'Built a shift scheduler calendar optimised to render **4,000+ cells** in a single view without jank',
        'Worked with the frontend core team on **design system** components used across product teams',
        'Wrote automated tests with **Cypress** and developed components in **Storybook**',
      ],
      skills: ['React', 'TypeScript', 'Material UI', 'Cypress', 'Storybook'],
    },
    {
      title: 'Full Stack Software Engineer',
      company: 'Knowledge Officer',
      date: 'Sep 2021 – Aug 2022',
      location: 'Remote · London, UK',
      highlights: [
        "Led the revamp of the company's learning platform in **React** with **TypeScript**, lifting user engagement",
        'Implemented integration and component tests with **Cypress**',
        'Shipped backend features and improvements in **Ruby on Rails**',
      ],
      skills: ['React', 'Redux', 'TypeScript', 'Ruby on Rails', 'PostgreSQL', 'AWS'],
    },
  ],
  projects: [
    {
      title: 'Payments & CRM Platform',
      kicker: 'Case study · Centroid Solutions',
      description:
        'Architected the payment infrastructure of a production CRM: integrations with 8+ global payment service providers and a resilient webhook system that processed 2,000+ transactions with 100% integrity. Built on Fastify, Prisma and Redis, with a React design system on top.',
      technologies: ['Node.js', 'Fastify', 'Prisma', 'Redis', 'PostgreSQL', 'React', 'TypeScript'],
      metrics: [
        { value: '8+', label: 'Payment providers integrated' },
        { value: '2,000+', label: 'Webhook transactions, 100% integrity' },
        { value: '99.9%', label: 'Platform reliability' },
        { value: '20+', label: 'Team members building on the foundation' },
      ],
      internalLink: { href: '#lab', label: 'Break it yourself in the Lab' },
    },
    {
      title: 'Globe Party',
      kicker: 'Product · Two Grains · Live',
      description:
        'A daily country-guessing game that runs as a Discord Activity and as an installable website. Three rounds a day, the same countries for everyone, and friends can watch each other play live. One Cloudflare Worker serves it all: a Durable Object per room keeps live state over WebSockets, a cron posts each new day to Discord, and anonymous usage stats land in Analytics Engine.',
      image: '/projects/globe-party.webp',
      technologies: ['React 19', 'TypeScript', 'three.js', 'Cloudflare Workers', 'Durable Objects', 'WebSockets', 'Discord SDK'],
      liveLink: 'https://globeparty.twograins.app/',
    },
    {
      title: 'Frame Forge',
      kicker: 'Side project · 2026',
      description:
        'A multi-viewport iframe tester for validating UI across device sizes at once. A runtime injection engine applies CSS and JS to the framed page live, and a built-in console shows postMessage traffic both ways.',
      image: '/projects/frame-forge.webp',
      technologies: ['React 19', 'TypeScript', 'Zustand', 'Vite', 'Tailwind CSS'],
      githubLink: 'https://github.com/Ramzy98/frame-forge',
      liveLink: 'https://frame-forge-rho.vercel.app/',
    },
    {
      title: 'eCommerce REST API',
      kicker: 'Backend · Open source',
      description:
        'A REST API for an online store built with Express and PostgreSQL: users, products and orders with relational modelling, JWT authentication, bcrypt password hashing and a separate test database.',
      image: '/projects/ecommerce-api.webp',
      technologies: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'JWT'],
      githubLink: 'https://github.com/Ramzy98/ecommerce-website-restful-api',
    },
  ],
  education: {
    school: 'Alexandria University',
    degree: 'B.Sc. Computer and Communications Engineering',
    date: 'Sep 2016 – Aug 2021',
    location: 'Alexandria, Egypt',
  },
};

/** Whole years since `careerStart`, e.g. 5 → rendered as "5+ years". */
export function yearsOfExperience(now: Date = new Date()): number {
  const start = new Date(PORTFOLIO_DATA.careerStart);
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.floor(years);
}
