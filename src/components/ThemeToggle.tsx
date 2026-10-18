import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

/**
 * Sun/moon theme toggle for the navbar.
 * Shows the icon of the theme you'll switch TO:
 * sun in dark mode (switch to light), moon in light mode (switch to dark).
 */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg text-lavender-100/80 transition-colors hover:bg-lavender-100/[0.06] hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-electric focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-900"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={!isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sun
          className={`absolute h-5 w-5 transition-all duration-300 ${
            isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
          }`}
          strokeWidth={2}
        />
        <Moon
          className={`absolute h-5 w-5 transition-all duration-300 ${
            isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
          strokeWidth={2}
        />
      </span>
    </button>
  );
}
