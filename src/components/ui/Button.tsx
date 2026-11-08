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
    'bg-violet-electric text-white shadow-[inset_0_1px_0_rgba(229,229,232,0.25),0_8px_30px_-8px_rgba(101,21,47,0.6)] hover:-translate-y-0.5 hover:bg-violet-deep hover:ring-1 hover:ring-silver/60 hover:shadow-[inset_0_1px_0_rgba(229,229,232,0.45),0_12px_36px_-8px_rgba(101,21,47,0.75)]',
  secondary:
    'glass text-ink hover:-translate-y-0.5 hover:border-silver/40 hover:bg-lavender-100/[0.06] hover:shadow-[0_12px_32px_-14px_rgba(0,0,0,0.45)]',
  ghost: 'text-lavender-100 hover:-translate-y-0.5 hover:text-ink hover:bg-lavender-100/[0.06] hover:shadow-[0_8px_24px_-14px_rgba(0,0,0,0.4)]',
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
