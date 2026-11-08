/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/templates/**/*.html',
    './*/templates/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        ink:   { 950: '#05070D', 900: '#080D17', 800: '#0B1220', 700: '#111B2E' },
        brand: { 300: '#6EE7B7', 400: '#34D399', 500: '#10B981', 600: '#059669' },
        aqua:  { 300: '#67E8F9', 400: '#22D3EE', 500: '#06B6D4' },
        iris:  { 400: '#818CF8', 500: '#6366F1' }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      boxShadow: {
        card: '0 30px 80px -20px rgba(0,0,0,.75), 0 0 0 1px rgba(255,255,255,.04)',
        'glow-brand': '0 18px 40px -12px rgba(16,185,129,.55)'
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float-slow': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%':     { transform: 'translate3d(0,-24px,0) scale(1.06)' }
        },
        'float-slower': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1.04)' },
          '50%':     { transform: 'translate3d(18px,20px,0) scale(0.98)' }
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%':     { transform: 'translateX(-4px)' },
          '40%':     { transform: 'translateX(4px)' },
          '60%':     { transform: 'translateX(-2px)' },
          '80%':     { transform: 'translateX(2px)' }
        }
      },
      animation: {
        'fade-up':      'fade-up .6s cubic-bezier(.22,1,.36,1) both',
        'float-slow':   'float-slow 16s ease-in-out infinite',
        'float-slower': 'float-slower 22s ease-in-out infinite',
        'shake':        'shake .45s ease-in-out both'
      }
    }
  },
  plugins: []
}
