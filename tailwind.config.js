/* tailwind.config.js — базовые цвета Domio */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        domio: {
          light: '#F3F6FF',
          DEFAULT: '#3A60D8',
          dark: '#2E4CB2',
        },
      },
    },
  },
  plugins: [],
}