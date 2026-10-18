import { type InputHTMLAttributes, forwardRef, type ReactNode } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  trailing?: ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, trailing, id, className = '', ...props }, ref) => {
    const inputId = id || `field-${label.replace(/\s+/g, '-').toLowerCase()}`;
    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-lavender-100/80"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`w-full rounded-xl border bg-midnight-900/40 px-4 py-3 text-sm text-ink placeholder:text-lavender-100/40 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-electric focus:ring-offset-2 focus:ring-offset-midnight-900 ${
              error
                ? 'border-rose-500/60'
                : 'border-lavender-100/15 hover:border-lavender-100/25'
            } ${trailing ? 'pr-12' : ''} ${className}`}
            {...props}
          />
          {trailing && (
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2">{trailing}</div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
