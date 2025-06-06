/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          light: '#FF8E8E',
          dark: '#E55555'
        },
        secondary: {
          DEFAULT: '#FF8E53',
          light: '#FFB083',
          dark: '#E57A47'
        },
        accent: '#FFB347',
        surface: {
          50: '#FFFAFA',
          100: '#FFF5F5',
          200: '#FED7D7',
          300: '#FEB2B2',
          400: '#FC8181',
          500: '#F56565',
          600: '#E53E3E',
          700: '#C53030',
          800: '#9B2C2C',
          900: '#742A2A'
        }
      },
      fontFamily: { 
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], 
        heading: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        handwritten: ['Kalam', 'cursive']
      },
      boxShadow: { 
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'paper': '0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.08)'
      },
      borderRadius: { 
        xl: '0.75rem', 
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #FF8E53 0%, #FFB347 100%)',
        'coral-glow': 'radial-gradient(circle at center, rgba(255, 107, 107, 0.1) 0%, transparent 70%)'
      }
    },
  },
  plugins: [],
}