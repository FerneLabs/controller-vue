/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tmaBg: 'var(--tg-theme-bg-color)',
        tmaText: 'var(--tg-theme-text-color)',
        tmaButton: 'var(--tg-theme-button-color)',
        tmaButtonText: 'var(--tg-theme-button-text-color)',
      },
    },
  },
  plugins: [],
}
