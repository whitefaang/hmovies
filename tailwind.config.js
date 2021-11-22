module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#9ef01a',
      'primary-muted': '#70e000',
      surface: '#0c1618',
      'surface-muted': '#1b3236',
      color: 'whitesmoke',
      'color-muted': 'CCDBDC',
      transparent: 'transparent'
    },
    fontFamily: {
      monoton: ['Monoton', 'cursive'],
      content: ['Montserrat', 'sans-serif'],
      header: ['Oswald', 'sans-serif']
    },
    tooltipArrows: () => ({
      'right-arrow': {
        borderColor: '#1b3236',
        borderWidth: 1,
        backgroundColor: '#1b3236',
        size: 10,
        offset: 150
      }
    })
  },
  variants: {
    extend: {}
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwindcss-tooltip-arrow-after')(),
    require('tailwindcss-debug-screens')
  ]
}
