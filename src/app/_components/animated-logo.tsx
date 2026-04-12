import { useEffect, useState } from 'react';

export default function AnimatedLogo() {
  const [displayText, setDisplayText] = useState('');
  const fullName = 'Ahmad Ramzy';

  useEffect(() => {
    let isTyping = true;
    let i = 0;

    const animateText = () => {
      if (isTyping) {
        if (i <= fullName.length) {
          setDisplayText(fullName.slice(0, i));
          i++;
        } else {
          isTyping = false;
        }
      } else {
        if (i > 0) {
          setDisplayText(fullName.slice(0, i));
          i--;
        } else {
          isTyping = true;
        }
      }

      setTimeout(animateText, isTyping ? 180 : 100);
    };

    animateText();

    return () => {};
  }, []);

  return (
    <div className="text-white font-mono text-lg flex-shrink-0 w-[200px]">
      <span className="text-cyan-400 font-bold">&lt;</span>
      {displayText}
      <span className="animate-pulse text-gray-500">_</span>
      <span className="text-cyan-400 font-bold">/&gt;</span>
    </div>
  );
}
