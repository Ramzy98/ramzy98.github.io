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
  offTheClock:
    "Outside work I'm at the gym, watching Formula 1 (Max Verstappen fan) or following FC Barcelona, and I'm working towards a diving licence.",
  email: 'ahmadramzy988@gmail.com',
  siteUrl: 'https://ramzy98.github.io',
  resumePath: '/Ahmad_Ramzy_Software_Engineer_Resume.pdf',
  careerStart: '2021-09-01',
  headline:
    "I build products end to end with TypeScript, React and Node.js — from payment systems that can't fail to real-time apps people use every day.",
  summary:
    "Full-stack engineer who owns features from the database to the UI. I laid the technical foundation of a CRM platform and its payments infrastructure, migrated a large HR product's frontend to React, and ship my own real-time products on the side. I care about clean architecture, reliability, and software that's genuinely pleasant to use.",
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
        'Architected the technical foundation of a **CRM platform** and took it from MVP to a mature product as the team grew around it',
        'Led the initial frontend in **React**, **TypeScript** and **Tailwind CSS**, establishing the design system and core component library',
        'Built backend services with **Node.js**, **Fastify**, **Prisma** and **Redis**, and shared on-call for production reliability',
        'Designed the payment infrastructure: integrated **8+ payment service providers** behind a resilient webhook system with full transaction integrity',
      ],
      skills: ['React', 'TypeScript', 'Node.js', 'Fastify', 'Prisma', 'Redis', 'PostgreSQL'],
    },
    {
      title: 'Web Development Session Lead',
      company: 'Udacity',
      date: 'Dec 2023 – Present',
      location: 'Part-time · Remote',
      highlights: ['Mentor students aged 12–17 through their first projects in **HTML**, **CSS** and **JavaScript**'],
      skills: [],
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
        'The money side of a production CRM. I designed how it talks to payment providers around the world, and the webhook system behind it that never loses a transaction or processes one twice. Fastify, Prisma and Redis underneath, a React design system on top.',
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
        'My friends and I play daily puzzles like Wordle every day, so I built one for geography, except here you can watch each other get it wrong in real time. Three rounds a day, the same countries for everyone, playable right inside Discord or in the browser. Under the hood, one Cloudflare Worker runs it all: a Durable Object per room keeps everyone in sync over WebSockets, and a cron posts each new day to Discord.',
      image: '/projects/globe-party.webp',
      technologies: ['React 19', 'TypeScript', 'three.js', 'Cloudflare Workers', 'Durable Objects', 'WebSockets', 'Discord SDK'],
      liveLink: 'https://globeparty.twograins.app/',
    },
    {
      title: 'Frame Forge',
      kicker: 'Side project · 2026',
      description:
        'I was working with iframes a lot at work and kept wishing I could see every screen size at once, so I built the tool. Frame Forge shows a page in several viewports side by side, lets you inject CSS and JS into it live, and logs the postMessage traffic going both ways.',
      image: '/projects/frame-forge.webp',
      technologies: ['React 19', 'TypeScript', 'Zustand', 'Vite', 'Tailwind CSS'],
      githubLink: 'https://github.com/Ramzy98/frame-forge',
      liveLink: 'https://frame-forge-rho.vercel.app/',
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
