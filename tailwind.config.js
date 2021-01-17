module.exports = {
  purge: {
    content: [
      './*.js',
      './pages/*.js',
      './pages/**/*.js',
      './components/*.js',
      './components/**/*.js',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        zero: '0',
        xxs: ['0.688rem', { lineHeight: '1rem' }],
      },
      fontFamily: {
        'display': ['Merriweather', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        'body': ['Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"',],
      },
      padding: {
        'full': '100%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
