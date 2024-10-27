import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaSatellite, FaSpaceShuttle, FaLaptopCode } from 'react-icons/fa';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { useMediaQuery, Tooltip, Chip } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const experiences = [
  {
    title: 'Full Stack Software Engineer',
    company: 'Centroid Solutions',
    date: 'Mar 2024 - Present',
    description: [
      'Part of the core team developing a new software product, working on both **frontend** and **backend** technologies',
      'Developed frontend components with **React** and **TypeScript**, ensuring a responsive and user-friendly interface',
      'Designed and documented RESTful APIs using **Swagger**, facilitating clear and efficient backend-frontend communication',
      'Built scalable backend services with **Node.js**, **Fastify**, and **Prisma**, optimizing performance and data management',
    ],
    icon: <FaLaptopCode />,
    skills: ['React', 'Next.js', 'Node.js', 'Tailwind', 'TypeScript', 'PostgresSQL'],
  },
  {
    title: 'Web Development Session Lead',
    company: 'Udacity',
    date: 'Dec 2023 - Present',
    description: [
      'Mentored **50+ students** aged 12-17 in **HTML**, **CSS**, and **JavaScript**, enhancing their coding skills and comprehension',
      'Guided students through project implementation, fostering practical application of web development concepts',
      'Provided support and addressed inquiries during Connect sessions, ensuring a supportive learning environment',
    ],
    skills: ['HTML', 'CSS', 'JavaScript'],
    icon: <FaRocket />,
  },
  {
    title: 'Frontend Software Engineer',
    company: 'Bayzat',
    date: 'Oct 2022 - Jan 2024',
    description: [
      'Part of the HR team responsible for developing and optimizing core features using **React** with **TypeScript**',
      'Implemented shift scheduler feature with calendar view, optimized to handle **4,000+ cells** without performance issues',
      'Developed deduction system for admins to set salary deduction policies based on user check-in delays',
      'Contributed to migrating legacy features from **Ember.js**, improving performance and usability',
      'Implemented design system components ensuring consistency across the application',
      'Created automated tests with **Cypress** and utilized **Storybook** for component development',
      'Engaged in entire product development lifecycle, from ideation to deployment',
    ],
    skills: ['React', 'Typescript', 'Material UI', 'Cypress', 'Storybook'],
    icon: <FaSatellite />,
  },
  {
    title: 'Full Stack Software Engineer',
    company: 'Knowledge Officer',
    date: 'Sep 2021 - Aug 2022',
    description: [
      `Led the revamp of the company's online platform using **React** with **TypeScript**`,
      'Implemented automated tests with **Cypress** for integration and component testing',
      'Contributed to backend development using **Ruby on Rails**',
      'Collaborated daily with cross-functional teams to ensure smooth project execution',
      'Resolved customer-reported bugs promptly, improving product quality',
    ],
    skills: ['React', 'Redux', 'Ruby on Rails', 'TypeScript', 'PostgresSQL', 'AWS'],
    icon: <FaSpaceShuttle />,
  },
];

export default function ExperienceSection() {
  const isMobile = useMediaQuery('(max-width:640px)');
  const isTablet = useMediaQuery('(min-width:641px) and (max-width:1024px)');

  return (
    <section id="experience" className="relative overflow-hidden p-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-white">
        Experience
      </h2>
      <div className="container mx-auto px-4">
        <Timeline
          position={isMobile ? 'right' : 'alternate'}
          sx={{
            '& .MuiTimelineItem-root': {
              minHeight: isMobile ? '120px' : isTablet ? '160px' : '200px',
              flexDirection: isMobile ? 'column' : 'row',
            },
          }}
        >
          {experiences.map((exp, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    backgroundColor: 'transparent',
                    border: '2px solid #3b82f6',
                    boxShadow: 'none',
                  }}
                >
                  {React.cloneElement(exp.icon, {
                    style: {
                      fontSize: isMobile ? '14px' : isTablet ? '18px' : '20px',
                      color: '#3b82f6',
                    },
                  })}
                </TimelineDot>
                {index !== experiences.length - 1 && (
                  <TimelineConnector sx={{ backgroundColor: '#3b82f6' }} />
                )}
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <motion.div
                  whileHover={{
                    translateY: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="bg-gray-800/40 text-white p-6 rounded-xl border border-gray-700/50 backdrop-blur-md shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex flex-col mb-4 text-start">
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <h3 className="font-bold text-xl text-blue-400 mb-1">{exp.title}</h3>

                        <Tooltip title={`Duration: ${calculateDuration(exp.date)}`} arrow>
                          <span className="text-gray-400 cursor-help">
                            {exp.date.includes('Present') ? (
                              <>
                                {exp.date.split(' - ')[0]} -{' '}
                                <span className="text-teal-400 font-medium">Present</span>
                              </>
                            ) : (
                              exp.date
                            )}
                          </span>
                        </Tooltip>
                      </div>
                      <span className="text-gray-300">{exp.company}</span>
                    </div>

                    <ul className="space-y-2 mb-4 text-start">
                      {Array.isArray(exp.description) ? (
                        exp.description.map((item, i) => (
                          <li
                            key={i}
                            className="text-start text-gray-300 text-sm inline-flex text-start items-start"
                          >
                            <span className="text-blue-400 mr-2">•</span>
                            <span>
                              <ReactMarkdown
                                components={{
                                  strong: ({ children }) => (
                                    <span className="text-blue-400">{children}</span>
                                  ),
                                }}
                              >
                                {item}
                              </ReactMarkdown>
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-300 text-sm">
                          <ReactMarkdown
                            components={{
                              strong: ({ children }) => (
                                <span className="text-blue-400 font-semibold">{children}</span>
                              ),
                            }}
                          >
                            {exp.description}
                          </ReactMarkdown>
                        </li>
                      )}
                    </ul>

                    {exp.skills && (
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <Chip
                            key={skillIndex}
                            label={skill}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              backdropFilter: 'blur(8px)',
                              color: '#93c5fd',
                              border: '1px solid rgba(147, 197, 253, 0.2)',
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              height: '24px',
                              '&:hover': {
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                borderColor: 'rgba(147, 197, 253, 0.4)',
                                boxShadow: '0 0 12px rgba(147, 197, 253, 0.2)',
                              },
                              transition: 'all 0.2s ease-in-out',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>

      {[FaRocket, FaSatellite, FaSpaceShuttle, FaLaptopCode].map((Icon, index) => {
        const size = Math.random() * 30 + 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={index}
            className="absolute text-blue-500 pointer-events-none"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              zIndex: -1,
            }}
            initial={{
              scale: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: delay,
            }}
          >
            <Icon style={{ fontSize: `${size}px` }} />
          </motion.div>
        );
      })}
    </section>
  );
}

function calculateDuration(dateString: string): string {
  const [start, end] = dateString.split(' - ');
  const startDate = new Date(start);
  const endDate = end === 'Present' ? new Date() : new Date(end);

  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months += endDate.getMonth() - startDate.getMonth();

  months += 1;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (months < 1) {
    const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (years === 0) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${
      remainingMonths !== 1 ? 's' : ''
    }`;
  }
}
