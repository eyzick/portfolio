/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#d6ff7f',
        'secondary': '#7bc7bd',
        'accent': '#f7ad55',
        'signal': '#d6ff7f',
        'paper': '#080a09',
        'paper-bright': '#111512',
        'ink': '#f1f1ea',
        'ink-soft': '#a8aea6',
        'line': '#242a25',
        'dark-bg': '#080a09',
        'dark-card': '#111512',
        'text-primary': '#f1f1ea',
        'text-secondary': '#a8aea6',
        'text-muted': '#636963',
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
