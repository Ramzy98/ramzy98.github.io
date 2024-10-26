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

const experiences = [
  {
    title: 'Full Stack Software Engineer',
    company: 'Centroid Solutions',
    date: 'Mar 2024 - Present',
    description:
      'Developing new product, full-stack development, API documentation, agile collaboration.',
    icon: <FaLaptopCode />,
    skills: ['React', 'Next.js', 'Node.js', 'Tailwind', 'TypeScript', 'PostgresSQL'],
  },
  {
    title: 'Web Development Session Lead',
    company: 'Udacity',
    date: 'Dec 2023 - Present',
    description:
      'Conducting weekly sessions in HTML, CSS, and JavaScript for students. Offering hands-on guidance for projects and providing continuous support via community platform.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    icon: <FaRocket />,
  },
  {
    title: 'Frontend Software Engineer',
    company: 'Bayzat',
    date: 'Oct 2022 - Jan 2024',
    description:
      'Focused on React and Typescript development, driving feature implementation, utilizing Cypress for testing, and collaborating with cross-functional teams.',
    skills: ['React', 'Typescript', 'Material UI', 'Cypress', 'Storybook'],
    icon: <FaSatellite />,
  },
  {
    title: 'Full Stack Software Engineer',
    company: 'Knowledge Officer',
    date: 'Sep 2021 - Aug 2022',
    description:
      'Improved the main platform and implemented new features to enhance the learning journey for users.',
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
                  <div className="bg-gray-800 bg-opacity-30 text-white p-4 rounded-lg border border-gray-700 backdrop-filter backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-1">{exp.title}</h3>
                    <p className="text-blue-300 text-sm mb-2">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-2">{exp.description}</p>
                    {exp.skills && (
                      <div className="inline-flex flex-wrap gap-2 mb-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <Chip
                            key={skillIndex}
                            label={skill}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              backdropFilter: 'blur(8px)',
                              color: '#a5f3fc',
                              border: '1px solid rgba(165, 243, 252, 0.3)',
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              padding: '4px 10px',
                              borderRadius: '12px',
                              '&:hover': {
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                color: '#22d3ee',
                                borderColor: 'rgba(34, 211, 238, 0.5)',
                                boxShadow: '0 0 12px rgba(34, 211, 238, 0.3)',
                              },
                              transition: 'all 0.3s ease-in-out',
                            }}
                          />
                        ))}
                      </div>
                    )}
                    <Tooltip title={`Duration: ${calculateDuration(exp.date)}`} arrow>
                      <p className="text-gray-500 text-xs cursor-help">
                        {exp.date.includes('Present') ? (
                          <>
                            {exp.date.split(' - ')[0]} -{' '}
                            <span className="text-teal-400">Present</span>
                          </>
                        ) : (
                          exp.date
                        )}
                      </p>
                    </Tooltip>
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
