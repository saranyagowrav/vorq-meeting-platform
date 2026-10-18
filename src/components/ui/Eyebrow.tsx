import { type ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-violet-electric/30 bg-violet-electric/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-lavender-200 ${className}`}
    >
      {children}
    </span>
  );
}
