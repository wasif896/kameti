/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: 'rgb(28 27 26)',
        maincolor:'rgba(24, 24, 24, 1)',
        // sidebar: 'rgba(36, 36, 36, 1)',
        colorinput:'rgba(55, 55, 55, 1)',
        sidecircle: '#A87F0B',
        sidec: 'rgba(191, 147, 23, 1)',
        paytxt:'rgba(186, 186, 186, 1)',
        payform: 'rgba(72, 71, 75, 1)',
        uploaded: 'rgba(171, 255, 157, 1)',
        paytxt1:'rgba(104, 103, 103, 1)',
        customGold: '#A87F0B',
        graytransparent: '#6A6A6A80',
          customInset: '-2px -9px 17.6px 0px #0000004D inset',
      },
    },
  },
  plugins: [],
};
