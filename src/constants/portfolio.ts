import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiGmail, SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiStorybook, SiCypress, SiJasmine, SiRubyonrails } from 'react-icons/si';

export const PORTFOLIO_DATA = {
  name: 'AHMAD RAMZY',
  titles: ['Software Engineer', 'Fullstack Engineer', 'Frontend Engineer', 'Problem Solver'],
  about: {
    description: [
      'Crafting premium digital experiences where',
      'clean architecture',
      'meets',
      'creative design.',
      'Specializing in high-performance web applications',
      'that push the boundaries of the modern web.'
    ],
    socialLinks: [
      { Icon: FaGithub, link: 'https://github.com/Ramzy98', platform: 'GitHub' },
      { Icon: FaLinkedin, link: 'https://www.linkedin.com/in/ahmadramzyag/', platform: 'LinkedIn' },
      { Icon: FaXTwitter, link: 'https://x.com/amazingramzy', platform: 'Twitter' },
      { Icon: SiGmail, link: 'mailto:ahmadramzy988@gmail.com', platform: 'Gmail' },
    ],
  },
  skills: [
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'Ruby on Rails', icon: SiRubyonrails, color: '#CC0000' },
    { name: 'SQL', icon: FaDatabase, color: '#4479A1' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Storybook', icon: SiStorybook, color: '#FF4785' },
    { name: 'Cypress', icon: SiCypress, color: '#04C38E' },
    { name: 'Jasmine', icon: SiJasmine, color: '#8A4182' },
  ],
  experiences: [
    {
      title: 'Full Stack Software Engineer',
      company: 'Centroid Solutions',
      date: 'Mar 2024 - Present',
      description: [
        'Part of the core team developing a new software product, working on both **frontend** and **backend** technologies',
        'Developed frontend components with **React** and **TypeScript**, ensuring a responsive and user-friendly interface',
        'Designed and documented RESTful APIs using **Swagger**',
        'Built scalable backend services with **Node.js**, **Fastify**, and **Prisma**',
      ],
      icon: 'FaLaptopCode',
      skills: ['React', 'Next.js', 'Node.js', 'Tailwind', 'TypeScript', 'PostgresSQL'],
    },
    {
      title: 'Web Development Session Lead',
      company: 'Udacity',
      date: 'Dec 2023 - Present',
      description: [
        'Mentored **50+ students** aged 12-17 in **HTML**, **CSS**, and **JavaScript**',
        'Guided students through project implementation and web development concepts',
      ],
      skills: ['HTML', 'CSS', 'JavaScript'],
      icon: 'FaRocket',
    },
    {
      title: 'Frontend Software Engineer',
      company: 'Bayzat',
      date: 'Oct 2022 - Jan 2024',
      description: [
        'Developed and optimized core HR features using **React** with **TypeScript**',
        'Implemented shift scheduler feature optimized for **4,000+ cells**',
        'Migrated legacy features from **Ember.js**, improving performance',
        'Created automated tests with **Cypress** and utilized **Storybook**',
      ],
      skills: ['React', 'Typescript', 'Material UI', 'Cypress', 'Storybook'],
      icon: 'FaSatellite',
    },
    {
      title: 'Full Stack Software Engineer',
      company: 'Knowledge Officer',
      date: 'Sep 2021 - Aug 2022',
      description: [
        "Led the revamp of the company's online platform using **React** with **TypeScript**",
        'Implemented automated tests with **Cypress** and contributed to **Ruby on Rails** backend',
      ],
      skills: ['React', 'Redux', 'Ruby on Rails', 'TypeScript', 'PostgresSQL', 'AWS'],
      icon: 'FaSpaceShuttle',
    },
  ],
  projects: [
    {
      title: 'Frame Forge',
      description:
        'A modern iframe viewer & tester with device presets, responsive preview, and code injection capabilities.',
      image: '/mockups/frame-forge.png',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      githubLink: 'https://github.com/Ramzy98/frame-forge',
      liveLink: 'https://frame-forge-rho.vercel.app/',
    },
    {
      title: 'eCommerce Restful API',
      description:
        'A Node.js API for ecommerce with complex relationship handling and secure transaction logic.',
      image: '/mockups/ecommerce-api.png',
      technologies: ['Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
      githubLink: 'https://github.com/Ramzy98/ecommerce-website-restful-api',
    },
    {
      title: 'Would You Rather',
      description:
        'React-Redux game with real-time state management and sophisticated user voting mechanisms.',
      image: '/mockups/would-you-rather.png',
      technologies: ['React', 'JavaScript', 'Redux'],
      githubLink: 'https://github.com/Ramzy98/Would-you-rather',
      liveLink: 'https://would-you-rather-coral.vercel.app/',
    },
    {
      title: 'Examify',
      description:
        'React exam app features real-time grading and dynamic test generation for educators.',
      image: '/mockups/examify.png',
      technologies: ['React', 'Axios', 'JavaScript'],
      githubLink: 'https://github.com/Ahmed-HossamElDin/Examify',
      liveLink: 'https://examify.vercel.app/',
    },
  ],
};
