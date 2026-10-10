import { PORTFOLIO_DATA } from '@/constants/portfolio';
import type { Experience } from '@/types/portfolio';
import { Highlight } from '@/app/_lib/highlight';
import SectionHeader from '../section-header';

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="w-full py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          id="experience-heading"
          eyebrow="Experience"
          title="Where I've worked"
          description="Remote teams in Dubai and London, where I've owned features from the database to the button."
          className="mb-16"
        />

        <ol className="relative ml-1.5 border-l border-white/10 space-y-12">
          {PORTFOLIO_DATA.experiences.map((exp, i) => (
            <TimelineItem key={`${exp.company}-${exp.title}`} experience={exp} isLatest={i === 0} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineItem({ experience, isLatest }: { experience: Experience; isLatest: boolean }) {
  return (
    <li className="relative pl-8 sm:pl-10">
      <span
        aria-hidden="true"
        className={`absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
          isLatest ? 'bg-accent border-accent shadow-glow' : 'bg-background border-white/30'
        }`}
      />

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-6 gap-y-1">
        <h3 className="text-xl sm:text-2xl font-semibold text-white">{experience.title}</h3>
        <p className="font-mono text-xs text-gray-500 tabular-nums shrink-0">{experience.date}</p>
      </div>
      <p className="text-gray-300 font-medium mt-1">
        {experience.company}
        <span className="text-gray-500 font-normal"> · {experience.location}</span>
      </p>

      <ul className="mt-4 space-y-2.5">
        {experience.highlights.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-gray-400">
            <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-gray-500" />
            <span>
              <Highlight text={item} className="text-gray-100 font-medium" />
            </span>
          </li>
        ))}
      </ul>

      {experience.skills.length > 0 && (
        <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
          {experience.skills.map((skill) => (
            <li key={skill} className="tag">
              {skill}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
