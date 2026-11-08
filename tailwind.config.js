/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/templates/**/*.html',
    './*/templates/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        ink:   { 950: '#05070D', 900: '#080D17', 850: '#0A101C', 800: '#0B1220', 700: '#111B2E', 600: '#1A2740' },
        brand: { 200: '#A7F3D0', 300: '#6EE7B7', 400: '#34D399', 500: '#10B981', 600: '#059669' },
        aqua:  { 200: '#A5F3FC', 300: '#67E8F9', 400: '#22D3EE', 500: '#06B6D4' },
        iris:  { 300: '#A5B4FC', 400: '#818CF8', 500: '#6366F1', 600: '#4F46E5' }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      boxShadow: {
        card: '0 30px 80px -20px rgba(0,0,0,.75), 0 0 0 1px rgba(255,255,255,.04)',
        panel: 'inset 0 1px 0 rgba(255,255,255,.04), 0 24px 60px -32px rgba(0,0,0,.9)',
        'glow-brand': '0 18px 40px -12px rgba(16,185,129,.55)',
        'glow-aqua': '0 18px 40px -12px rgba(34,211,238,.45)',
        'glow-iris': '0 18px 40px -12px rgba(99,102,241,.45)'
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.22,1,.36,1)'
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-in': {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
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
        'fade-in':      'fade-in .3s ease-out both',
        'slide-in':     'slide-in .28s cubic-bezier(.22,1,.36,1) both',
        'float-slow':   'float-slow 16s ease-in-out infinite',
        'float-slower': 'float-slower 22s ease-in-out infinite',
        'shake':        'shake .45s ease-in-out both'
      }
    }
  },
  plugins: []
}
