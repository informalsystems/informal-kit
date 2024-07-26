import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'
import type { PluginUtils } from 'tailwindcss/types/config'

export const sitePalette = {
  brand: {
    50: '#F3F4F8',
    100: '#CED5E4',
    200: '#9DABCB',
    300: '#6C81B0',
    400: '#3B5797',
    500: '#0C2D7C',
    600: '#041E5A',
    700: '#001740',
  },

  teal: {
    50: '#F5F9FA',
    100: '#D5E6ED',
    200: '#ADCFDC',
    300: '#81B7C9',
    400: '#599FB8',
    500: '#2F87A5',
    600: '#05536E',
    700: '#023648',
  },

  rust: {
    50: '#FCF6F6',
    100: '#EFDDDC',
    200: '#DDBAB8',
    300: '#CD9895',
    400: '#BC7571',
    500: '#AC534D',
  },

  fuchsia: {
    50: '#FAF5F9',
    100: '#E7D6E8',
    200: '#CEADCE',
    300: '#B685B6',
    400: '#9F5D9E',
    500: '#873486',
  },

  pink: {
    50: '#FDF8FF',
    100: '#F9E3F8',
    200: '#F3C6F1',
    300: '#ECAAEA',
    400: '#E58CE3',
    500: '#E070DD',
  },

  lavender: {
    50: '#FBF7FE',
    100: '#EDE3FB',
    200: '#DAC9F7',
    300: '#C8AFF3',
    400: '#B695F0',
    500: '#A27AEC',
  },
}

const borderColor = sitePalette.brand['100']

const neutral = colors.slate

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        animateInX: 'animateInX 0.5s ease-in-out both',
        animateInY: 'animateInY 0.5s ease-in-out both',
        animateOutX: 'animateOutX 0.5s ease-in-out both',
        animateOutY: 'animateOutY 0.5s ease-in-out both',
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(closest-side, var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderColor: {
        DEFAULT: borderColor,
      },
      colors: {
        ...sitePalette,
        accent: {
          teal: sitePalette.teal['500'],
          fuchsia: sitePalette.fuchsia['500'],
          rust: sitePalette.rust['500'],
          pink: sitePalette.pink['500'],
          lavender: sitePalette.lavender['500'],
        },
        bgColor: colors.white,
        borderColor,
        brandColor: sitePalette.brand['500'],
        dangerColor: sitePalette.rust,
        fadedTextColor: sitePalette.brand['300'],
        fadedTextColorInDarkMode: sitePalette.brand['100'],
        infoColor: sitePalette.fuchsia,
        neutral,
        shadedBgColor: neutral['200'],
        successColor: sitePalette.teal,
        textColor: sitePalette.brand['500'],
        textColorInDarkMode: colors.white,
        warningColor: colors.amber,
      },
      typography: ({ theme }: PluginUtils) => ({
        branded: {
          css: {
            '--tw-prose-body': theme('colors.textColor'),
            '--tw-prose-headings': theme('colors.textColor'),
            '--tw-prose-lead': theme('colors.brandColor'),
            '--tw-prose-links': theme('colors.accent.teal'),
            '--tw-prose-bold': theme('colors.brandColor'),
            '--tw-prose-counters': theme('colors.brand[600]'),
            '--tw-prose-bullets': theme('colors.accent.fuchsia'),
            '--tw-prose-hr': theme('colors.brand[300]'),
            '--tw-prose-quotes': theme('colors.brandColor'),
            '--tw-prose-quote-borders': theme('colors.brand[300]'),
            '--tw-prose-captions': theme('colors.brand[700]'),
            '--tw-prose-code': theme('colors.brandColor'),
            '--tw-prose-pre-code': theme('colors.brand[100]'),
            '--tw-prose-pre-bg': theme('colors.brandColor'),
            '--tw-prose-th-borders': theme('colors.borderColor'),
            '--tw-prose-td-borders': theme('colors.borderColor'),
            '--tw-prose-invert-body': theme('colors.white'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.white'),
            '--tw-prose-invert-links': theme('colors.teal[100]'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.brand[200]'),
            '--tw-prose-invert-bullets': theme('colors.accent.fuchsia'),
            '--tw-prose-invert-hr': theme('colors.borderColor'),
            '--tw-prose-invert-quotes': theme('colors.brand[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.brand[700]'),
            '--tw-prose-invert-captions': theme('colors.brand[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.brand[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.brand[600]'),
            '--tw-prose-invert-td-borders': theme('colors.brand[700]'),
          },
        },
      }),
      keyframes: {
        animateInX: {
          '0%': {
            opacity: '0',
            transform: 'translateX(100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        animateOutX: {
          '0%': {
            maxHeight: '200px',
            opacity: '1',
            transform: 'translateX(0%)',
          },
          '70%': {
            maxHeight: '200px',
            opacity: '0',
            transform: 'translateX(100%)',
          },
          '100%': {
            maxHeight: '0',
            opacity: '0',
            transform: 'translateX(100%)',
          },
        },

        animateInY: {
          '0%': {
            opacity: '0',
            transform: 'translateY(100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        animateOutY: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0%)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
        },
      },
    },
    fontFamily: {
      body: ['var(--font-inter)', 'sans-serif'],
      display: ['var(--font-glegoo)', 'sans-serif'],
      icon: ["'Font Awesome 6 Pro'"],
      mono: ['monospace'],
    },
  },
  darkMode: ['variant', '&:is(.dark, .dark *):not(.light, .light *)'],
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        'html': {
          fontSize: '24px',
          scrollPaddingTop: theme('spacing.12'),
          scrollBehavior: 'smooth',
        },
        ':is(.dark, .dark *)': {
          color: theme('colors.textColorInDarkMode'),
        },
        ':is(.light, .light *)': {
          color: theme('colors.textColor'),
        },
        '*': {
          scrollbarColor: `${theme('colors.brandColor')} transparent`,
        },
        '*::-webkit-scrollbar': {
          height: theme('spacing.2'),
          width: theme('spacing.2'),
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          background: theme('colors.brandColor'),
          borderRadius: theme('spacing.8'),
        },
        'a, button, input, textarea': {
          touchAction: 'manipulation',
        },
      })
    }),
    // plugin(function ({ addBase, theme }) {
    //   function extractColorVars(
    //     colorObj: Record<string, string | Record<string, string>>,
    //     colorGroup = '',
    //   ): Record<string, string> {
    //     return Object.keys(colorObj).reduce<Record<string, string>>(
    //       (vars, colorKey) => {
    //         const value = colorObj[colorKey]
    //         const cssVariable =
    //           colorKey === 'DEFAULT'
    //             ? `--color${colorGroup}`
    //             : `--color${colorGroup}-${colorKey}`

    //         const newVars =
    //           typeof value === 'string'
    //             ? { [cssVariable]: value }
    //             : extractColorVars(value, `-${colorKey}`)

    //         return { ...vars, ...newVars }
    //       },
    //       {},
    //     )
    //   }

    //   addBase({
    //     ':root': extractColorVars(theme('colors')),
    //   })
    // }),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
