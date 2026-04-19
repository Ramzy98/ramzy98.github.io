import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaDownload, 
  FaBriefcase, 
  FaGraduationCap, 
  FaTerminal,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaGithub
} from 'react-icons/fa';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESUME_DATA = {
  name: "Ahmad Ramzy",
  title: "Fullstack Software Engineer",
  contact: {
    phone: "+201126423940",
    email: "ahmadramzy988@gmail.com",
    github: "github.com/ramzy98",
    website: "ramzy98.github.io"
  },
  summary: "Fullstack Software Engineer with over 4 years of experience, driven by a philosophy of clean architecture and making a tangible impact through careful engineering. I specialize in bridging the gap between high-performance frontend interfaces and scalable backend systems, with a proven ability to lead technical foundations from zero to production.",
  experience: [
    {
      company: "Centroid Solutions",
      role: "Full Stack Software Engineer",
      period: "Mar 2024 – Present",
      location: "Remote - Dubai, UAE",
      highlights: [
        "Architected the technical foundation for a CRM platform, transitioning from MVP to production scale.",
        "Spearheaded initial frontend with React, TS, and Tailwind, establishing standard design systems.",
        "Engineered scalable backend using Node.js, Fastify, Prisma, and Redis with 99.9% reliability.",
        "Orchestrated integration of 8+ global PSPs and engineered a resilient webhook system handling 2,000+ transactions."
      ]
    },
    {
      company: "Bayzat",
      role: "Frontend Software Engineer",
      period: "Oct 2022 – Jan 2024",
      location: "Remote - Dubai, UAE",
      highlights: [
        "Modernized legacy architecture by migrating core features from Ember.js to React and TypeScript.",
        "Implemented a high-performance shift scheduler handling 4,000+ cells in a single render.",
        "Collaborated on design system core components ensuring consistency across cross-functional teams.",
        "Implemented automated testing with Cypress and utilized Storybook for scalable development."
      ]
    },
    {
      company: "KnowledgeOfficer",
      role: "Full Stack Software Engineer",
      period: "Sep 2021 – Aug 2022",
      location: "Remote - London, UK",
      highlights: [
        "Led platform revamp using React/TypeScript, enhancing user engagement and satisfaction.",
        "Implemented end-to-end testing strategies with Cypress.",
        "Contributed to Ruby on Rails backend feature implementation and system enhancements.",
        "Collaborated daily in an agile environment for smooth project execution."
      ]
    }
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Ruby"],
    frontend: ["React", "Next.js", "Redux", "Zustand", "Tailwind CSS", "Storybook"],
    backend: ["Node.js", "Fastify", "Express", "Prisma", "Ruby on Rails", "Redis"],
    tools: ["Cypress", "Jest", "Vitest", "Vite", "Git", "CI/CD", "Docker"]
  },
  education: {
    school: "Alexandria University",
    degree: "Bachelor of Science: Computer and Communications Engineering",
    period: "Sep 2016 – Aug 2021",
    location: "Alexandria, Egypt"
  }
};

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setIsBooting(true);
      timer = setTimeout(() => setIsBooting(false), 800);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="flex flex-col w-full h-[90vh] max-w-6xl rounded-[2.5rem] bg-[#050505] border border-white/10 shadow-2xl relative z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Playful 'Hacker' Status Bar */}
            <div className="flex justify-between items-center px-6 py-3 border-b border-white/5 bg-white/[0.01] overflow-hidden">
               <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <button 
                      onClick={onClose}
                      className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors shadow-sm"
                      title="Close Modal"
                    />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[10px] text-white/30 tracking-widest uppercase">
                    <FaTerminal className="text-cyan-400" />
                    <span>User: Ahmad_Ramzy</span>
                    <span className="hidden sm:inline">Status: Authenticated</span>
                    <span className="hidden sm:inline">Enc: 256-bit</span>
                  </div>
               </div>
            </div>

            {/* Custom Interactive Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-10 pt-10 pb-6 gap-6">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter mb-2 leading-none">
                  {RESUME_DATA.name.split(' ')[0]}<span className="text-gradient-cyan">{RESUME_DATA.name.split(' ')[1]}</span>
                </h2>
                <div className="flex items-center gap-3">
                   <div className="h-1 w-8 bg-cyan-400 rounded-full" />
                   <p className="text-cyan-400/80 font-mono text-sm tracking-[0.2em] font-bold uppercase italic">
                     {RESUME_DATA.title}
                   </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <a
                  href="/Ahmad_Ramzy_Software_Engineer_Resume.pdf"
                  download
                  className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-cyan-400/10 border border-white/10 hover:border-cyan-400/50 rounded-2xl text-white font-bold transition-all duration-300"
                >
                  <FaDownload className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">LEGACY.PDF</span>
                </a>
              </motion.div>
            </div>

            {/* Realtime Body */}
            <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar relative">
              <AnimatePresence mode="wait">
                {isBooting ? (
                  <motion.div 
                    key="boot"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-x-10 top-0 flex flex-col gap-2 font-mono text-cyan-400/40 text-sm mt-8"
                  >
                    <p className="animate-pulse">{">"} INITIALIZING SECURITY_PROTOCOLS...</p>
                    <p className="animate-pulse delay-100">{">"} FETCHING EXPERIENCE_MODS...</p>
                    <p className="animate-pulse delay-200">{">"} COMPILING SKILL_MATRIX...</p>
                    <div className="h-[2px] w-full bg-cyan-400/10 relative overflow-hidden mt-4">
                      <motion.div 
                        initial={{ left: '-100%' }}
                        animate={{ left: '100%' }}
                        transition={{ duration: 0.8, ease: 'linear' }}
                        className="absolute inset-y-0 w-20 bg-cyan-400/40 blur-md"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8"
                  >
                    {/* Main Column: Roles & Projects */}
                    <div className="lg:col-span-8 space-y-12">
                       {/* Summary Area */}
                       <div>
                         <h3 className="text-white/20 font-mono text-[10px] tracking-[0.4em] uppercase mb-4 flex items-center gap-4">
                           <div className="h-px flex-grow bg-white/10" />
                           Briefing
                         </h3>
                         <p className="text-gray-400 text-lg sm:text-xl font-light leading-relaxed max-w-3xl italic">
                           "{RESUME_DATA.summary}"
                         </p>
                       </div>

                       {/* Experience Section */}
                       <div className="space-y-8">
                         <h3 className="text-white/20 font-mono text-[10px] tracking-[0.4em] uppercase mb-6 flex items-center gap-4">
                           <div className="h-px flex-grow bg-white/10" />
                           Field Records
                         </h3>
                         <div className="space-y-10 border-l-2 border-white/5 ml-4 pl-8 pt-4">
                            {RESUME_DATA.experience.map((exp, i) => (
                              <ExperienceItem key={exp.company} exp={exp} index={i} />
                            ))}
                         </div>
                       </div>
                    </div>

                    {/* Sidebar: Skills, Education, Contact */}
                    <div className="lg:col-span-4 space-y-10">
                      {/* Contact Module */}
                      <div className="glass-panel p-6 rounded-3xl border-white/5 bg-white/[0.02]">
                         <h3 className="text-cyan-400 font-mono text-[11px] tracking-widest uppercase mb-6">Comms.Link</h3>
                         <div className="space-y-4">
                            <ContactItem icon={<FaEnvelope />} label="Signal" value={RESUME_DATA.contact.email} href={`mailto:${RESUME_DATA.contact.email}`} />
                            <ContactItem icon={<FaPhoneAlt />} label="Voice" value={RESUME_DATA.contact.phone} href={`tel:${RESUME_DATA.contact.phone}`} />
                            <ContactItem icon={<FaGithub />} label="Git" value="github/ramzy98" href="https://github.com/ramzy98" />
                            <ContactItem icon={<FaGlobe />} label="Web" value={RESUME_DATA.contact.website} href="https://ramzy98.github.io" />
                         </div>
                      </div>

                      {/* Technical Matrix */}
                      <div className="glass-panel p-6 rounded-3xl border-white/5 bg-white/[0.02]">
                         <h3 className="text-purple-400 font-mono text-[11px] tracking-widest uppercase mb-6">Skill.Matrix</h3>
                         <div className="space-y-6">
                            <SkillCluster title="Core" items={RESUME_DATA.skills.languages} color="cyan" />
                            <SkillCluster title="Front" items={RESUME_DATA.skills.frontend} color="purple" />
                            <SkillCluster title="Back" items={RESUME_DATA.skills.backend} color="blue" />
                            <SkillCluster title="Ops" items={RESUME_DATA.skills.tools} color="white" />
                         </div>
                      </div>

                      {/* Education Module */}
                      <div className="glass-panel p-6 rounded-3xl border-white/5 bg-white/[0.02]">
                         <h3 className="text-yellow-400 font-mono text-[11px] tracking-widest uppercase mb-6">Intel.Background</h3>
                         <div>
                            <p className="text-white font-bold text-sm leading-tight mb-2 uppercase tracking-wide">
                              {RESUME_DATA.education.degree}
                            </p>
                            <div className="flex items-center gap-2 text-white/50 text-[10px] font-mono tracking-tighter">
                               <FaGraduationCap className="text-yellow-400/60" />
                               <span>{RESUME_DATA.education.school}</span>
                            </div>
                            <p className="text-white/20 text-[10px] font-mono mt-4">
                              {RESUME_DATA.education.period} // {RESUME_DATA.education.location}
                            </p>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ExperienceItem({ exp, index }: { exp: any, index: number }) {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 * index + 0.5 }}
      whileHover={{ x: 10 }}
      className="relative group "
    >
      {/* Connector Node */}
      <div className="absolute -left-[41px] top-1.25 w-4 h-4 rounded-full bg-[#050505] border-2 border-white/20 group-hover:border-cyan-400 transition-colors z-10" />
      
      <div className="glass-panel p-8 rounded-3xl bg-white/[0.02] border border-white/5 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/[0.02] transition-all duration-500 shadow-xl overflow-hidden">
        {/* Glow */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-400/0 group-hover:bg-cyan-400/5 blur-3xl rounded-full transition-all duration-700" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
           <div>
             <h4 className="text-2xl font-black text-white leading-none mb-2 tracking-tight group-hover:text-cyan-100 transition-colors">
               {exp.company}
             </h4>
             <p className="text-cyan-400 font-bold font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
               <FaBriefcase className="text-cyan-400/40" />
               {exp.role}
             </p>
           </div>
           <div className="text-right flex flex-col items-start sm:items-end">
              <span className="text-white/30 font-mono text-[10px] tracking-tighter uppercase whitespace-nowrap bg-white/5 px-2 py-1 rounded">
                {exp.period}
              </span>
              <span className="text-white/20 text-[9px] mt-2 font-mono">{exp.location}</span>
           </div>
        </div>

        <ul className="space-y-3">
          {exp.highlights.map((h: string, i: number) => (
            <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed font-light">
              <span className="text-cyan-400/40 mt-1.5 shrink-0">•</span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ContactItem({ icon, label, value, href }: { icon: any, label: string, value: string, href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="flex items-center gap-4 group p-2 -m-2 rounded-xl hover:bg-white/5 transition-all"
    >
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-all border border-white/5 group-hover:border-cyan-400/20">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-mono font-bold uppercase text-white/20 tracking-widest">{label}</p>
        <p className="text-xs text-white/60 group-hover:text-white transition-colors truncate max-w-[180px]">{value}</p>
      </div>
    </a>
  );
}

function SkillCluster({ title, items, color }: { title: string, items: string[], color: string }) {
  const colors: Record<string, string> = {
    cyan: "text-cyan-400 bg-cyan-400/5 border-cyan-400/20",
    purple: "text-purple-400 bg-purple-400/5 border-purple-400/20",
    blue: "text-blue-400 bg-blue-400/5 border-blue-400/20",
    white: "text-white/60 bg-white/5 border-white/10"
  };

  return (
    <div className="space-y-3">
      <p className="text-white/20 font-mono text-[9px] uppercase tracking-widest pl-1">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map(item => (
          <span 
            key={item} 
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-tight border transition-all duration-300 hover:scale-105 cursor-default ${colors[color]}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
