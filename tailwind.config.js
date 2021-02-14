const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

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
      },
      scale: {
        '-100': '-1'
      },
    },
    screens: {
      'xs': '420px',
      ...defaultTheme.screens,
    },
    container: {
      screens: {
        'xs': "100%",
        ...defaultTheme.screens,
      },
      padding: {
        DEFAULT: '1rem',
      }
    }
  },
  variants: {
    extend: {
      margin: ['last'],
      textColor: ['important'],
      display: ['important'],
      borderWidth: ['first', 'last'],
      borderRadius: ['first', 'last'],
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls(decl => {
            decl.important = true
          })
        })
      })
    })
  ],
};
