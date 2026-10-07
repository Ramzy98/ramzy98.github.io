/** Page sections in scroll order — drives the nav, the command palette and the active-section tracker. */
export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'lab', label: 'Lab' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];
