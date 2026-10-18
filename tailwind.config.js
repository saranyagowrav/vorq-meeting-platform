/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        midnight: {
          900: 'rgb(var(--mid-900) / <alpha-value>)',
          800: 'rgb(var(--mid-800) / <alpha-value>)',
          700: 'rgb(var(--mid-700) / <alpha-value>)',
          600: 'rgb(var(--mid-600) / <alpha-value>)',
        },
        violet: {
          electric: 'rgb(var(--vio-electric) / <alpha-value>)',
          soft: 'rgb(var(--vio-soft) / <alpha-value>)',
          deep: 'rgb(var(--vio-deep) / <alpha-value>)',
        },
        lavender: {
          100: 'rgb(var(--lav-100) / <alpha-value>)',
          200: 'rgb(var(--lav-200) / <alpha-value>)',
          300: 'rgb(var(--lav-300) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
        'radial-violet':
          'radial-gradient(circle at 50% 0%, var(--radial-violet), transparent 60%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'pulse-ring': 'pulseRing 2.4s ease-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.25)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
