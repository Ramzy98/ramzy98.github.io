import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';
import Image from 'next/image';
import { useAnalyticsContext } from '../../_components/analytics-provider';
import ResumeModal from '../../_components/resume-modal';
import { useMagnetic } from '../../_hooks/use-magnetic';

export default function AboutSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = ['Software Engineer', 'Fullstack Engineer', 'Frontend Engineer', 'Problem Solver'];
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const { trackInteraction, trackUserJourney, trackConversion } = useAnalyticsContext();

  const magneticProfile = useMagnetic(0.2);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);
    return () => clearInterval(titleInterval);
  }, []);

  const handleSocialLinkClick = (platform: string) => {
    trackInteraction('social_link_click', { platform, section: 'about', link_type: 'social_media' });
    trackUserJourney('social_media_engagement', 'about');
    if (platform === 'FaLinkedin') trackConversion('linkedin_click', 1);
  };

  const handleResumeClick = () => {
    setIsResumeModalOpen(true);
    trackInteraction('resume_view', { section: 'about', action: 'open_resume_modal' });
    trackUserJourney('resume_view', 'about');
    trackConversion('resume_view', 1);
  };

  return (
    <section id="about" className="min-h-[80vh] flex flex-col justify-center items-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full max-w-5xl"
      >
        {/* Clean Bento Profile Image */}
        <div
          ref={magneticProfile.ref}
          onMouseMove={magneticProfile.handleMouseMove}
          onMouseLeave={magneticProfile.handleMouseLeave}
          className="relative inline-block mb-16"
        >
          <motion.div
            animate={{ x: magneticProfile.position.x, y: magneticProfile.position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            className="group relative w-56 h-56 sm:w-72 sm:h-72 rounded-[2rem] bg-gray-900 border-2 border-white/5 hover:border-cyan-400/50 transition-colors duration-500 shadow-2xl p-2"
          >
            {/* Pulsing Status Badge */}
            <div className="absolute -top-3 -right-3 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] font-mono text-cyan-50 font-bold tracking-widest uppercase">Available</span>
            </div>

            {/* Image Container */}
            <div className="relative w-full h-full overflow-hidden rounded-[1.5rem] bg-black">
              <Image
                src="/me.jpeg"
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* ID Badge overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-start">
                 <span className="text-cyan-400 font-mono text-[10px] tracking-widest mb-1">ID: AR-98</span>
                 <span className="text-white font-bold tracking-widest text-sm uppercase leading-tight relative z-10">Ahmad Ramzy</span>
                 <span className="text-white/50 font-mono text-xs mt-0.5">Lvl: Software Engineer</span>
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-cyan-400/20 blur-[50px] -z-10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>
        </div>

        <motion.h1
          className="text-5xl sm:text-8xl font-black mb-6 tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="text-white">AHMAD</span>{' '}
          <span className="text-gradient-cyan">RAMZY</span>
        </motion.h1>

        <motion.div
          className="text-2xl sm:text-4xl font-bold mb-8 h-12 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${titleIndex}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="text-white/80"
            >
              {titles[titleIndex]}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto mb-10"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.6 },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-light flex flex-wrap justify-center gap-x-1">
            <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>Crafting premium digital experiences where</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-white font-medium">clean architecture</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>meets</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-cyan-400 font-medium">creative design.</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>Specializing in high-performance web applications</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>that push the boundaries of the modern web.</motion.span>
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="flex space-x-6">
            {[
              { Icon: FaGithub, link: 'https://github.com/Ramzy98', platform: 'FaGithub' },
              { Icon: FaLinkedin, link: 'https://www.linkedin.com/in/ahmadramzyag/', platform: 'FaLinkedin' },
              { Icon: FaXTwitter, link: 'https://x.com/amazingramzy', platform: 'FaXTwitter' },
              { Icon: SiGmail, link: 'mailto:ahmadramzy988@gmail.com', platform: 'SiGmail' },
            ].map(({ Icon, link, platform }) => (
              <MagneticItem key={platform} onClick={() => handleSocialLinkClick(platform)} href={link}>
                <Icon className="text-2xl sm:text-3xl" />
              </MagneticItem>
            ))}
          </div>

          <motion.button
            className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
            onClick={handleResumeClick}
          >
            VIEW RESUME
          </motion.button>
        </motion.div>
      </motion.div>
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </section>
  );
}

function MagneticItem({ children, onClick, href }: { children: React.ReactNode; onClick: () => void; href: string }) {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.4);
  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="text-gray-500 hover:text-white transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </motion.a>
  );
}
