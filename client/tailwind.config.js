const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryColor: '',
      },
      height: {
        hero: '35.625rem'
      },
      backgroundPosition: {
        50: '50%'
      },
      padding: {
        7.5: '1.875rem',
        3.25: '0.813rem',
        3.75: '0.875rem'
      },
      margin: {
        0.5: '0.125rem'
      }
    },
    fontFamily: {
      display: ['Raleway', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('before', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`before${separator}${className}`)}::before`;
        });
      });
      addVariant('after', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`after${separator}${className}`)}::after`;
        });
      });
    }),
    plugin(({ addUtilities }) => {
      const contentUtilities = {
        '.content': {
          content: 'attr(data-content)',
          position: 'absolute',
          top: '8px',
          right: '0',
          bottom: '8px',
          width: '1px',
          backgroundColor: 'rgb(204, 204, 204)'
        },
        '.content-before': {
          content: 'attr(data-before)',
        },
        '.content-after': {
          content: 'attr(data-after)',
        },
      };

      addUtilities(contentUtilities, ['before', 'after']);
    }),
  ],
}
