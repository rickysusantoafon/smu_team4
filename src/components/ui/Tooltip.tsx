import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <span
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children || <Info className="w-3.5 h-3.5 text-zinc-400 hover:text-zinc-200 cursor-help transition-colors ml-1" />}
      {isVisible && (
        <span
          role="tooltip"
          className={`absolute z-50 px-2.5 py-1.5 text-xs font-normal text-zinc-100 bg-zinc-900 border border-zinc-700/80 rounded-md shadow-xl whitespace-normal max-w-xs pointer-events-none transition-opacity duration-150 animate-in fade-in ${positionClasses[position]}`}
        >
          {content}
        </span>
      )}
    </span>
  );
};
