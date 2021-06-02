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
        hero: '35.625rem',
        110: '426px',
        200: '745px',
      },
      width: {
        200: '745px',
        210: '860px',
        220: '960px',
        300: '1224px',
        295: '1144ox',
        110: '426px',
        115: '468px',
        140: '630px',
        500: '1922px',
        carousel: '1922px',
      },
      margin: {
        18: '66px',
      },
      backgroundPosition: {
        50: '50%',
      },
      padding: {
        7.5: '1.875rem',
        3.25: '0.813rem',
        3.75: '0.875rem',
      },
      margin: {
        0.5: '0.125rem',
      },
    },
    fontFamily: {
      display: ['Raleway', 'sans-serif'],
    },
    keyframes: {
      wave1: {
        '0%': {
          backgroundPosition: '0px',
        },
        '100%': {
          backgroundPosition: '3000px',
        },
      },
      wave2: {
        '0%': {
          backgroundPosition: '0px',
        },
        '100%': {
          backgroundPosition: '-3000px',
        },
      },
    },
    animation: {
      wave1: 'wave1 25s linear infinite',
      wave2: 'wave2 18s linear infinite',
      wave3: 'wave1 12s linear infinite',
      wave4: 'wave2 22s linear infinite',
    },
  },
  variants: {
    extend: {
      textColor: ['hovered-difference'],
    },
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
          content: 'attr(search-divider)',
          position: 'absolute',
          top: '8px',
          right: '0',
          bottom: '8px',
          width: '1px',
          backgroundColor: 'rgb(204, 204, 204)',
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
    plugin(({ addVariant, e }) => {
      addVariant('hovered-difference', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `:hover > .hovered-difference\\:${rule.selector.slice(1)}`;
        });
      });
    }),
  ],
};
