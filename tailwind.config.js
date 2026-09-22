/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        trids: {
          deepBlue: '#070D1E',
          navyDark: '#0A1228',
          navyCard: '#0F1C3F',
          navyLight: '#142552',
          electricBlue: '#2563EB',
          skyBlue: '#38BDF8',
          royalBlue: '#1D4ED8',
          borderBlue: '#1E3A8A',
          red: '#EF4444',
          redDark: '#DC2626',
          redGlow: '#B91C1C',
          yellow: '#FACC15',
          gold: '#F59E0B',
          goldDark: '#D97706',
          emerald: '#10B981',
          emeraldDark: '#059669',
          mint: '#34D399',
          textMuted: '#94A3B8',
          bgLight: '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 30px -5px rgba(250, 204, 21, 0.4)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.4)',
        'glow-blue': '0 0 30px -5px rgba(37, 99, 235, 0.5)',
        'glow-red': '0 0 30px -5px rgba(239, 68, 68, 0.5)',
        'card-dark': '0 20px 40px -15px rgba(7, 13, 30, 0.95)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'tri-color': 'linear-gradient(135deg, #DC2626 0%, #2563EB 50%, #FACC15 100%)',
        'red-blue-gold': 'linear-gradient(135deg, #EF4444 0%, #2563EB 50%, #F59E0B 100%)',
        'gold-yellow': 'linear-gradient(135deg, #FACC15 0%, #F59E0B 50%, #D97706 100%)',
        'deep-blue-mesh': 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.25) 0%, rgba(7, 13, 30, 0) 75%)',
      },
    },
  },
  plugins: [],
};
