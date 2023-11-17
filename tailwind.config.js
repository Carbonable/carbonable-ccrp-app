/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        americana: [ "americana", "sans-serif" ],
        inter: [ "Inter", "sans-serif"]
      },
      colors: {
        white: '#EBECF0',
        black: '#030305',
        green: "#0AF2AD",
        neutral: {
          100: '#D0D1D6',
          200: '#A8ABB3',
          300: '#878A94',
          400: '#555861',
          500: '#363840',
          600: '#2B2E36',
          700: '#1F2128',
          800: '#13151C',
          900: '#0B0D13',
        },
        greenish: {
          100: '#DDF6EB',
          200: '#BAEED7',
          300: '#75D9AD',
          400: '#47C48E',
          500: '#29A46F',
          600: '#22875B',
          700: '#1B6B49',
          800: '#145136',
          900: '#0E3725',
          1000: '#082015',
        },
        primary: {
          DEFAULT: '#0AF2AD',
          dark: '#087353',
          light: '#A9FCE4'
        },
        orange: {
          DEFAULT: '#CFBD70',
          dark: '#877B44',
          light: '#D9CC96'
        },
        blue: {
          DEFAULT: '#9EBAF0',
          dark: '#334566',
          light: '#C5D7FA'
        },
        opacityLight: {
          5: 'rgba(208, 209, 214, 0.05)',
          10: 'rgba(208, 209, 214, 0.1)',
          80: 'rgba(208, 209, 214, 0.8)',
        },
        opacityDark: {
          40: 'rgba(11, 13, 19, 0.4)',
          50: 'rgba(11, 13, 19, 0.5)',
          60: 'rgba(11, 13, 19, 0.6)',
          70: 'rgba(11, 13, 19, 0.7)',
          80: 'rgba(11, 13, 19, 0.8)',
          90: 'rgba(11, 13, 19, 0.9)',
        }
      },
      backgroundImage: {
        'green-blue': 'linear-gradient(270deg, #A8C4EF 39.58%, #0AF2AD 100%);',
        'planification': "linear-gradient(50.39deg, rgba(11, 13, 19, 0.5) 15.27%, rgba(19, 21, 28, 0.5) 46.91%, rgba(31, 33, 40, 0.5) 91.42%), url('/assets/images/backgrounds/bg-planification.png');",
        'menu-selected': "linear-gradient(rgba(10, 247, 177, 0.05), rgba(9, 173, 124, 0.05), rgba(8, 112, 81, 0.05));",
        'beta-button': "linear-gradient(180deg, rgba(11, 255, 138, 0.4) 0%, rgba(113, 170, 255, 0.4) 100%);",
        'allocation': "linear-gradient(166.49deg, #13151B 32.69%, rgba(0, 0, 0, 0) 170.72%), linear-gradient(180deg, #A1BCF0 0%, #7B90BA 40.1%, #394D73 100%);",
      }
    }
  },
  plugins: [],
}