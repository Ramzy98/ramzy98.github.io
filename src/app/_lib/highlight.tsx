import React from 'react';

/**
 * Renders `**phrase**` spans as highlighted text. Replaces react-markdown,
 * which was a 100kB dependency used only for bold.
 */
export function Highlight({ text, className = 'text-white font-medium' }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className={className}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
