/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#0A0A0F',
          soft: '#1C1C28',
        },
        ivory: {
          DEFAULT: '#F8F6F1',
          warm: '#EDE9E0',
          pure: '#FFFFFF',
        },
        cobalt: {
          50:  '#EFF4FF',
          100: '#DBE8FF',
          200: '#BFD4FF',
          300: '#93B8FF',
          400: '#6092FF',
          500: '#3B6EFF',
          600: '#1F4EFA',
          700: '#1438E8',
          800: '#172EBB',
          900: '#192D93',
          950: '#131E5C',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C96A',
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bid-flash': 'bidFlash 0.6s ease-out',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bidFlash: {
          '0%': { backgroundColor: '#3B6EFF20' },
          '50%': { backgroundColor: '#3B6EFF40' },
          '100%': { backgroundColor: 'transparent' },
        },
      },
    },
  },
  plugins: [],
}
