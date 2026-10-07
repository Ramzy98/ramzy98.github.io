'use client';

import React, { useEffect, useRef } from 'react';
import { FaDownload, FaEnvelope, FaGithub, FaGlobe, FaGraduationCap, FaLinkedin, FaXmark } from 'react-icons/fa6';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import { OPEN_RESUME_EVENT } from '@/app/_lib/events';
import { Highlight } from '@/app/_lib/highlight';
import { track } from '@/app/_lib/analytics';

const { name, role, email, siteUrl, resumePath, summary, experiences, skillGroups, education, socialLinks } =
  PORTFOLIO_DATA;
const linkedIn = socialLinks.find((s) => s.platform === 'LinkedIn')?.link;
const github = socialLinks.find((s) => s.platform === 'GitHub')?.link;

/**
 * Resume rendered as a native modal <dialog>: the browser handles the focus
 * trap, Escape-to-close, and making the page behind it inert.
 */
export default function ResumeModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const open = () => {
      if (dialog.open) return;
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    };
    const onClose = () => {
      document.documentElement.style.overflow = '';
    };

    window.addEventListener(OPEN_RESUME_EVENT, open);
    dialog.addEventListener('close', onClose);
    return () => {
      window.removeEventListener(OPEN_RESUME_EVENT, open);
      dialog.removeEventListener('close', onClose);
    };
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="resume-title"
      // Clicks on the backdrop land on the <dialog> element itself.
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto w-[min(72rem,calc(100%-2rem))] max-h-[90svh] rounded-[2rem] border border-white/10 bg-[#070b14] text-white shadow-2xl p-0 backdrop:bg-transparent open:flex flex-col overflow-hidden"
    >
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 px-6 sm:px-10 pt-8 pb-6 border-b border-white/10">
        <div>
          <h2 id="resume-title" className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            {name}
          </h2>
          <p className="mt-2 font-mono text-sm uppercase tracking-widest text-accent">{role}</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={resumePath}
            download
            onClick={() => track('resume_download')}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-accent transition-colors"
          >
            <FaDownload aria-hidden="true" />
            Download PDF
          </a>
          <button
            type="button"
            onClick={close}
            aria-label="Close resume"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <FaXmark size={18} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <section aria-labelledby="resume-summary">
            <h3 id="resume-summary" className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">
              Summary
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {summary}
            </p>
          </section>

          <section aria-labelledby="resume-experience">
            <h3 id="resume-experience" className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400 mb-5">
              Experience
            </h3>
            <ol className="space-y-5">
              {experiences.map((exp) => (
                <li key={`${exp.company}-${exp.title}`} className="glass-panel p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white">{exp.company}</h4>
                      <p className="text-sm text-accent">{exp.title}</p>
                    </div>
                    <div className="sm:text-right text-sm text-gray-400">
                      <p className="font-mono">{exp.date}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>
                          <Highlight text={h} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <section aria-labelledby="resume-contact" className="glass-panel p-6">
            <h3 id="resume-contact" className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <ContactItem icon={<FaEnvelope />} label={email} href={`mailto:${email}`} />
              {linkedIn && <ContactItem icon={<FaLinkedin />} label="LinkedIn" href={linkedIn} />}
              {github && <ContactItem icon={<FaGithub />} label="GitHub" href={github} />}
              <ContactItem icon={<FaGlobe />} label={siteUrl.replace('https://', '')} href={siteUrl} />
            </ul>
          </section>

          <section aria-labelledby="resume-skills" className="glass-panel p-6">
            <h3 id="resume-skills" className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
              Skills
            </h3>
            <div className="space-y-5">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-xs text-gray-400 mb-2">{group.title}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.skills.map((s) => (
                      <li
                        key={s.name}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-200"
                      >
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="resume-education" className="glass-panel p-6">
            <h3 id="resume-education" className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
              Education
            </h3>
            <p className="flex items-start gap-2 text-white font-medium">
              <FaGraduationCap aria-hidden="true" className="mt-1 text-accent shrink-0" />
              {education.degree}
            </p>
            <p className="mt-2 text-sm text-gray-300">{education.school}</p>
            <p className="mt-1 text-sm text-gray-400">
              {education.date} · {education.location}
            </p>
          </section>
        </aside>
      </div>
    </dialog>
  );
}

function ContactItem({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  const isExternal = href.startsWith('http');
  return (
    <li>
      <a
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
      >
        <span aria-hidden="true" className="text-accent">
          {icon}
        </span>
        <span className="truncate">{label}</span>
      </a>
    </li>
  );
}
