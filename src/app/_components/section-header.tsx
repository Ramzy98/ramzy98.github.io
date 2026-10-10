import type { ReactNode } from 'react';
import { SECTIONS } from '@/app/_lib/sections';

/**
 * Eyebrow, heading and intro line shared by every section. Static on purpose:
 * section copy should be readable the moment it's on screen.
 */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: {
  /** Heading id (`<section>-heading`), referenced by the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  description: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  const centered = align === 'center';
  // Number sections by their place in the page, like chapters.
  const index = SECTIONS.findIndex((s) => `${s.id}-heading` === id);
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <p className="section-eyebrow mb-4">
        {index >= 0 && <span className="text-accent">{String(index).padStart(2, '0')} </span>}
        <span className="lowercase">{eyebrow}</span>
      </p>
      <h2
        id={id}
        className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-5 tracking-[-0.03em] leading-[1.02]"
      >
        {title}
      </h2>
      <p className={`text-gray-300 text-lg leading-relaxed max-w-[60ch] ${centered ? 'mx-auto' : ''}`}>
        {description}
      </p>
    </div>
  );
}
