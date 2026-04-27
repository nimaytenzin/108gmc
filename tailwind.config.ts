import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Cormorant Garamond', 'serif'],
        sans: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        burgundy: {
          DEFAULT: '#3D1022',
          dark: '#2A0B17',
        },
        gold: '#E9D5A1',
        bronze: '#8E6D4E',
        // keep legacy tokens so nothing breaks during migration
        'sacred-gold': '#E9D5A1',
        'deep-earth': '#3D1022',
        'mindfulness-white': '#3D1022',
      },
      transitionDuration: {
        108: '108ms',
      },
      spacing: {
        108: '108px',
      },
    },
  },
  plugins: [],
};

export default config;
