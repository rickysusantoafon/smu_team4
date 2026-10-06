import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'emerald' | 'amber' | 'blue' | 'purple' | 'indigo' | 'rose' | 'secondary' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    default: 'bg-zinc-800 text-zinc-300 border-zinc-700/60',
    secondary: 'bg-zinc-800/60 text-zinc-400 border-transparent',
    outline: 'bg-transparent text-zinc-400 border-zinc-700',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    blue: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  const sizeStyles = {
    sm: 'text-[10px] font-medium px-2 py-0.5 rounded',
    md: 'text-xs font-medium px-2.5 py-0.5 rounded-md'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
