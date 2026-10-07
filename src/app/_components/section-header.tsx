import type { ReactNode } from 'react';

/**
 * Eyebrow, heading and intro line shared by every section. Static on purpose:
 * section copy should be readable the moment it's on screen.
 */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: {
  /** Heading id, referenced by the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  description: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <p className="section-eyebrow mb-4">{eyebrow}</p>
      <h2 id={id} className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight">
        {title}
      </h2>
      <p className={`text-gray-300 text-lg ${centered ? 'max-w-2xl mx-auto' : ''}`}>{description}</p>
    </div>
  );
}
