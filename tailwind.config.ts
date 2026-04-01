import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        openSans: ['Open Sans', 'sans-serif'],
        lora: ['var(--font-lora)'],
        parisienne: ['var(--font-parisienne)'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #3CF239 0%, #DDF239 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
