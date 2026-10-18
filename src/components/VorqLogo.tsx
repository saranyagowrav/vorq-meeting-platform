interface LogoProps {
  className?: string;
}

/**
 * VORQ Double-Line V icon.
 * Dark navy rounded square with two parallel angular V shapes:
 * a violet shadow V offset behind a white front V. No blur or gradients.
 */
export function VorqSymbol({ className = '' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="VORQ icon"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rounded square background (dark navy; inverts in light mode) */}
      <rect width="48" height="48" rx="11" fill="var(--logo-symbol-bg)" />

      {/* Shadow V — electric violet, offset down-right */}
      <path
        d="M17 16 L26 16 L35.5 38 L31 38 Z"
        fill="var(--logo-q)"
      />

      {/* Front V — pure white / dark navy, sharp angular chevron */}
      <path
        d="M13 12 L22 12 L31.5 34 L27 34 Z"
        fill="var(--logo-vor)"
      />
    </svg>
  );
}

/**
 * VORQ wordmark — Plus Jakarta Sans SemiBold (600).
 * V, O, R in main text color; Q in accent violet.
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
