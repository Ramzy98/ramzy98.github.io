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
import { useMediaQuery } from '@mui/material';

const experiences = [
  {
    title: 'Full Stack Software Engineer',
    company: 'Centroid Solutions',
    date: 'Mar 2024 - Present',
    description:
      'Part of the foundational team developing a new product. Engaged in full-stack development, API documentation, and agile collaboration.',
    icon: <FaLaptopCode />,
  },
  {
    title: 'Web Development Session Lead',
    company: 'Udacity',
    date: 'Dec 2023 - Present',
    description:
      'Conducting weekly sessions in HTML, CSS, and JavaScript for students. Offering hands-on guidance for projects and providing continuous support via community platform.',
    icon: <FaRocket />,
  },
  {
    title: 'Frontend Software Engineer',
    company: 'Bayzat',
    date: 'Oct 2022 - Jan 2024',
    description:
      'Focused on React and Typescript development, driving feature implementation, utilizing Cypress for testing, and collaborating with cross-functional teams.',
    icon: <FaSatellite />,
  },
  {
    title: 'Full Stack Software Engineer',
    company: 'Knowledge Officer',
    date: 'Sep 2021 - Aug 2022',
    description:
      'Improved the main platform and implemented new features to enhance the learning journey for users.',
    icon: <FaSpaceShuttle />,
  },
];

export default function ExperienceSection() {
  const isMobile = useMediaQuery('(max-width:640px)');
  const isTablet = useMediaQuery('(min-width:641px) and (max-width:1024px)');

  return (
    <section id="experience" className="py-8 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
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
                  <div className="bg-gray-800 bg-opacity-30 text-white p-2 sm:p-3 md:p-4 rounded-lg border border-gray-700 backdrop-filter backdrop-blur-sm">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-blue-300 text-xs sm:text-sm mb-1 md:mb-2">{exp.company}</p>
                    <p className="text-gray-400 text-xs mb-1 md:mb-2">{exp.description}</p>
                    <p className="text-gray-500 text-xs">
                      {exp.date.includes('Present') ? (
                        <>
                          {exp.date.split(' - ')[0]} -{' '}
                          <span className="text-teal-400">Present</span>
                        </>
                      ) : (
                        exp.date
                      )}
                    </p>
                  </div>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>

      {[FaRocket, FaSatellite, FaSpaceShuttle, FaLaptopCode].map((Icon, index) => {
        const size = Math.random() * 30 + 10; // Random size between 10 and 40
        const left = Math.random() * 100; // Random horizontal position
        const top = Math.random() * 100; // Random vertical position
        const duration = Math.random() * 20 + 10; // Random animation duration
        const delay = Math.random() * 5; // Random delay for staggered start

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
