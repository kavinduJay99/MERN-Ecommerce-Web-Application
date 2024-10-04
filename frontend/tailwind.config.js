/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(199, 100%, 33%)',
        secondary: 'hsl(187, 87%, 43%)',
        whit: 'hsl(0, 0%, 100%)',
        blac: 'hsl(201, 33%, 16%)',
        tex: 'hsl(240, 4%, 36%)',
        whiteDim: 'hsl(0, 0%, 93%)',
        greyText: 'rgb(190, 190, 190)',
        inpt: 'rgb(239, 239, 239)',
        bdy: 'rgba(240, 240, 246, 0.5)',
        cardBg: 'rgb(255, 255, 255)',
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, hsl(187, 85%, 43%), hsl(199, 100%, 33%))',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        'animated-background': {
          '0%': { 'background-position': '0 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0 50%' },
        },
      },
      animation: {
        'animated-background': 'animated-background 10s infinite ease-in-out',
      },
      backgroundImage: {
        'animated-gradient': 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)',
      },
      backgroundSize: {
        '400x400': '400% 400%',
      },
    },
  },
  variants: {},
  plugins: [],
}
