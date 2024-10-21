import React, { useEffect } from 'react';
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
import { Typography, Paper } from '@mui/material';

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
  useEffect(() => {
    const handleScroll = () => {
      const experienceSection = document.getElementById('experience');
      if (experienceSection) {
        const rect = experienceSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          // If the experience section is in view, update the navbar
          // You might want to use a global state management solution or context to update the navbar
          // For now, we'll just log to the console
          console.log('Experience section in view');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">Experience</h2>
      <div className="container mx-auto px-4">
        <Timeline position="alternate" sx={{ '& .MuiTimelineItem-root': { minHeight: '200px' } }}>
          {experiences.map((exp, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot
                  color="primary"
                  sx={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {React.cloneElement(exp.icon, { style: { fontSize: '24px' } })}
                </TimelineDot>
                {index !== experiences.length - 1 && <TimelineConnector sx={{ height: '120px' }} />}
              </TimelineSeparator>
              <TimelineContent sx={{ py: '40px', px: 2 }}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Paper
                    elevation={1}
                    className="p-6 bg-white bg-opacity-10 text-white rounded-lg relative overflow-hidden transition-all duration-300 hover:bg-opacity-20"
                    style={{
                      backdropFilter: 'blur(5px)',
                    }}
                  >
                    <div className="relative z-10">
                      <Typography variant="h6" component="h3" className="font-semibold mb-2">
                        {exp.title}
                      </Typography>
                      <Typography className="text-blue-200 mb-2">{exp.company}</Typography>
                      <Typography className="text-gray-300 mb-3 text-sm">
                        {exp.description}
                      </Typography>
                      <Typography variant="caption" className="text-gray-400 block">
                        {exp.date.includes('Present') ? (
                          <>
                            {exp.date.split(' - ')[0]} -{' '}
                            <motion.span
                              className="inline-block px-2 py-1 rounded-full border border-teal-400 text-teal-400 font-semibold text-xs transition-all duration-300"
                              whileHover={{
                                backgroundColor: 'rgba(45, 212, 191, 0.1)',
                                transition: {
                                  duration: 0.3,
                                },
                              }}
                            >
                              Present
                            </motion.span>
                          </>
                        ) : (
                          exp.date
                        )}
                      </Typography>
                    </div>
                  </Paper>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>

      {[FaRocket, FaSatellite, FaSpaceShuttle, FaLaptopCode].map((Icon, index) => {
        const size = Math.random() * 40 + 20; // Random size between 20 and 60
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
