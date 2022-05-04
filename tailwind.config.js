module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        fantasy: 'fantasy'
      },
      backgroundImage: (theme) => ({
        homepage: 'url(/images/homepage.png)',
        homepage2: 'url(/images/homepage2.png)',
        login: 'url(/images/login.png)',
        signup: 'url(/images/signup.png)',
      }),
    },
  },
  variants: {
    extend: {},
    visibility: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
  important: true,
}
