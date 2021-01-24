const plugin = require('tailwindcss/plugin');

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
    extend: {
      margin: ['last'],
      textColor: ['important'],
      display: ['important']
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
