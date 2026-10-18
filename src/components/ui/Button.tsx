import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  href?: string;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-violet-electric text-white hover:bg-violet-deep shadow-[0_8px_30px_-8px_rgba(130,112,255,0.6)] hover:shadow-[0_10px_40px_-6px_rgba(130,112,255,0.75)]',
  secondary:
    'glass text-ink hover:bg-lavender-100/[0.06] hover:border-lavender-100/30',
  ghost: 'text-lavender-100 hover:text-ink hover:bg-lavender-100/[0.05]',
};

export default function Button({
  variant = 'primary',
  children,
  className = '',
  fullWidth,
  href,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-electric focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-900 ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
