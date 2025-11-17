/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '3mt-primary': '#51247A',
        '3mt-secondary': '#962A8B',
        'gold': '#FFD700',
        'silver': '#C0C0C0',
        'bronze': '#CD7F32',
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'pulse-silver': 'pulseSilver 2s ease-in-out infinite',
        'pulse-bronze': 'pulseBronze 2s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.8)' },
        },
        pulseSilver: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(192, 192, 192, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(192, 192, 192, 0.8)' },
        },
        pulseBronze: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(205, 127, 50, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(205, 127, 50, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

