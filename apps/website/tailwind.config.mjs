import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Montserrat Alternates'],
        action: ['Lato'],
        serif: ['Hahmlet Variable'],
        sans: ['Lato'],
        'serif-text': ['Crimson Pro Variable'],
      },
      colors: {
        'tiny-black': 'rgb(42, 42, 42)',
        'light-black': '#181818',
        'small-gray': '#7a7a7a',
        'esmerald': '#50C878'
      },
      letterSpacing: {
        'bigger': '0.1em',
        'huge': '0.3em',
      },
      spacing: {
        'far': '130%',
      },
      fontSize: {
        xss: '0.6rem',
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-in-out',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
};
