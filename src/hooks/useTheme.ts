import { useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark';

export const STORAGE_KEY = 'vorq-theme';

/**
 * Reads the initial theme from the class set by the no-flash
 * inline script in index.html (or localStorage). Falls back to dark.
 */
function getInitialTheme(): Theme {
  if (typeof document !== 'undefined') {
    if (document.documentElement.classList.contains('light')) return 'light';
    if (document.documentElement.classList.contains('dark')) return 'dark';
  }
  return 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const applyTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage failures */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  // Keep in sync if the theme was changed elsewhere (e.g. another tab).
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        applyTheme(e.newValue as Theme);
        setTheme(e.newValue as Theme);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [applyTheme]);

  return { theme, toggle };
}
