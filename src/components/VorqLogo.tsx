import { useId } from 'react';

interface LogoProps {
  className?: string;
}

/**
 * VORQ Double-Line V icon.
 * Rounded brand square with two parallel angular V shapes:
 * a metallic silver front V over a deep burgundy shadow V. No blur.
 */
export function VorqSymbol({ className = '' }: LogoProps) {
  const gradientId = `vorq-metal-${useId().replace(/:/g, '')}`;
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="VORQ icon"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rounded square background (deep wine in dark mode, burgundy in light mode) */}
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E5E5E8" />
          <stop offset="0.55" stopColor="#BFC1C5" />
          <stop offset="1" stopColor="#8F9298" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill="var(--logo-symbol-bg)" />

      {/* Shadow V — deep burgundy, offset down-right */}
      <path
        d="M17 16 L26 16 L35.5 38 L31 38 Z"
        fill="var(--logo-accent)"
      />

      {/* Front V — metallic silver, sharp angular chevron */}
      <path
        d="M13 12 L22 12 L31.5 34 L27 34 Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

/**
 * VORQ wordmark — Plus Jakarta Sans SemiBold (600).
 * V, O, R in main text color; Q in accent burgundy/silver.
 * Colors follow the active theme via CSS variables.
 */
export function VorqWordmark({ className = '' }: LogoProps) {
  return (
    <span
      className={`font-sans font-semibold tracking-tight ${className}`}
      style={{ fontSize: '1.25rem', lineHeight: 1, color: 'var(--logo-vor)' }}
      aria-label="VORQ"
      role="img"
    >
      VOR
      <span style={{ color: 'var(--logo-q)' }}>Q</span>
    </span>
  );
}
