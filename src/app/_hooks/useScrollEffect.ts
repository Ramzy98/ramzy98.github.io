import { useState, useEffect } from 'react';

export function useScrollEffect(sections: string[]) {
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition < 100) {
        setActiveSection('about');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition + window.innerHeight / 3) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return activeSection;
}
