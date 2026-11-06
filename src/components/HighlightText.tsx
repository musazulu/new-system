import React from 'react';

interface HighlightTextProps {
  text: string;
  highlight: string;
  className?: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight, className = '' }) => {
  if (!highlight || !highlight.trim()) {
    return <span className={className}>{text}</span>;
  }

  // Escape special regex characters
  const trimmed = highlight.trim();
  const cleanHighlight = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // If highlight is purely digits, allow optional whitespace between digits so searching '78331' matches '078 331'
  const isNumeric = /^\d+$/.test(cleanHighlight);
  const pattern = isNumeric 
    ? cleanHighlight.split('').join('\\s*')
    : cleanHighlight;

  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-amber-200 text-amber-950 font-semibold px-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};
