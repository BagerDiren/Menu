import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Modern Lüks Mısır paleti
        nile: {
          50: '#eef6f8',
          100: '#d2e6ec',
          200: '#a3cdda',
          300: '#6fafc4',
          400: '#3d8ea8',
          500: '#206f8a',
          600: '#14586f',
          700: '#0e4357',
          800: '#0a2f3f',
          900: '#061d2a',
          950: '#03101a'
        },
        // Matte gold — single accent. No raw yellow, no fast-food vibe.
        gold: {
          50: '#f7efd9',
          100: '#ecdcab',
          200: '#dcc475',
          300: '#cba84a',
          400: '#b8860b', // matte gold — PRIMARY (DarkGoldenrod)
          500: '#a07509',
          600: '#7e5d07',
          700: '#604705',
          800: '#473604',
          900: '#2e2402',
          950: '#161101'
        },
        sand: {
          50: '#fbf7f1',
          100: '#f5ecdc',
          200: '#ead6b5',
          300: '#dcb986',
          400: '#cd9a5c',
          500: '#c08344',
          600: '#a86b3a',
          700: '#8a5331',
          800: '#71442d',
          900: '#5e3a28',
          950: '#341d14'
        },
        papyrus: '#f1e3c4',
        lapis: '#1c3f8f',
        carnelian: '#a32d1e'
      },
      fontFamily: {
        display: ['var(--font-display)', '"Cinzel"', 'Georgia', 'serif'],
        body: ['var(--font-body)', '"Lato"', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'Tahoma', 'sans-serif']
      },
      letterSpacing: {
        // Mandatory 0.1em baseline across all body text.
        body: '0.1em',
        luxe: '0.4em'
      },
      lineHeight: {
        // Mandatory 1.6 baseline.
        body: '1.6'
      },
      textShadow: {
        soft: '0 1px 8px rgba(0,0,0,0.5)',
        deep: '0 2px 20px rgba(0,0,0,0.6)'
      },
      boxShadow: {
        gold: '0 8px 32px -8px rgba(184,134,11,0.4)',
        goldGlow:
          '0 0 24px rgba(184,134,11,0.35), 0 0 48px rgba(184,134,11,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
        deepNile: '0 20px 60px -20px rgba(0,0,0,0.85)'
      },
      backgroundImage: {
        'royal-radial':
          'radial-gradient(ellipse at top, rgba(184,134,11,0.10) 0%, rgba(10,10,10,0) 60%), linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)',
        'gold-shine':
          'linear-gradient(135deg, #dcc475 0%, #b8860b 50%, #7e5d07 100%)',
        'papyrus-texture':
          'radial-gradient(circle at 20% 30%, rgba(140,86,20,0.08) 0px, transparent 60px), radial-gradient(circle at 70% 60%, rgba(140,86,20,0.07) 0px, transparent 80px), linear-gradient(180deg, #f1e3c4 0%, #e6d3a8 100%)'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        sandDrift: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateX(30px)', opacity: '0' }
        }
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
        sandDrift: 'sandDrift 8s linear infinite'
      }
    }
  },
  plugins: []
};

export default config;
